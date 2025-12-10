<?php

namespace App\Http\Controllers;

use App\Models\Request as RequestModel;
use App\Models\RequestItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class RequestController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        $department = DB::table('karyawan')
            ->join('department', 'karyawan.kode_department', '=', 'department.kode_department')
            ->where('karyawan.id_karyawan', $user->id_karyawan)
            ->select('department.nama_department')
            ->first();

        return Inertia::render('OrdersPage', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'department' => $department?->nama_department,
            ],
        ]);
    }


    public function store(Request $request)
    {
        Log::info('Data received:', $request->all());

        $validated = $request->validate([
            'notes' => 'nullable|string',
            'items' => 'required|array|min:1',
            'items.*.kode_barang' => 'nullable|string|max:50',
            'items.*.nama_barang' => 'required|string|max:100',
            'items.*.jumlah' => 'required|integer|min:1',
            'items.*.satuan' => 'required|string|max:20',
            'items.*.catatan' => 'nullable|string',
        ]);

        $user = Auth::user();

        // ✅ AMBIL NAMA + KODE SEKALIGUS
        $department = DB::table('karyawan')
            ->join('department', 'karyawan.kode_department', '=', 'department.kode_department')
            ->where('karyawan.id_karyawan', $user->id_karyawan)
            ->select(
                'department.kode_department',
                'department.nama_department'
            )
            ->first();

        if (!$department) {
            return redirect()->back()->withErrors([
                'department' => 'Departemen user tidak ditemukan.',
            ]);
        }

        DB::beginTransaction();
        try {
            $requestNumber = $this->generateRequestNumber();

            // ✅ SIMPAN NAMA DEPARTMENT KE REQUEST
            $requestModel = RequestModel::create([
                'request_number' => $requestNumber,
                'user_id' => $user->id,
                'department' => $department->nama_department,
                'request_date' => now()->toDateString(),
                'status' => 'Pending',
                'notes' => $validated['notes'] ?? null,
            ]);

            // ✅ SIMPAN KODE DEPARTMENT KE REQUEST ITEMS
            foreach ($validated['items'] as $item) {
                RequestItem::create([
                    'request_id' => $requestModel->id,
                    'kode_barang' => $item['kode_barang'] ?? null,
                    'nama_barang' => $item['nama_barang'],
                    'jumlah_diajukan' => $item['jumlah'],
                    'satuan' => $item['satuan'],
                    'catatan' => $item['catatan'] ?? null,
                    'status' => 'Pending',
                    'departemen' => $department->nama_department, 
                    'jumlah_disetujui' => 0,
                ]);
            }

            DB::commit();

            return redirect()->back()->with([
                'success' => true,
                'message' => 'Request berhasil dikirim!',
                'request_number' => $requestNumber
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error creating request: ' . $e->getMessage());

            return redirect()->back()->withErrors([
                'message' => 'Gagal mengirim request: ' . $e->getMessage()
            ]);
        }
    }

    private function generateRequestNumber()
    {
        $date = now()->format('Ymd');
        $prefix = "REQ-{$date}-";

        $lastRequest = RequestModel::where('request_number', 'like', $prefix . '%')
            ->orderBy('request_number', 'desc')
            ->first();

        if ($lastRequest) {
            $lastNumber = (int) substr($lastRequest->request_number, -3);
            $newNumber = str_pad($lastNumber + 1, 3, '0', STR_PAD_LEFT);
        } else {
            $newNumber = '001';
        }

        return $prefix . $newNumber;
    }
}
