<?php

namespace App\Http\Controllers;

use App\Models\Request as RequestModel;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class MonitoringRequestController extends Controller
{
    public function index()
    {
        try {
            $user = Auth::user();

            // Ambil nama departemen user login
            $departmentName = DB::table('karyawan')
                ->join('department', 'karyawan.kode_department', '=', 'department.kode_department')
                ->where('karyawan.id_karyawan', $user->id_karyawan)
                ->value('department.nama_department');

            if (!$departmentName) {
                return Inertia::render('table/monitoring-item', [
                    'requests' => [],
                    'departmentName' => null,
                    'error' => 'Departemen tidak ditemukan',
                ]);
            }

            // Ambil semua request milik departemen
            $requests = RequestModel::where('department', $departmentName)
                ->with('items')
                ->orderBy('request_date', 'desc')
                ->get()
                ->map(function ($req) {

                    $totalItems = $req->items->count();
                    $completeCount = $req->items->whereIn('status', ['Completed', 'Arrived'])->count();
                    $lateCount     = $req->items->whereIn('status', ['Rejected', 'Canceled'])->count();
                    $processCount  = $req->items->whereIn('status', ['Pending', 'Approved'])->count();

                    // Tentukan status final
                    if ($totalItems > 0 && $completeCount === $totalItems) {
                        $finalStatus = 'Completed';
                    } elseif ($lateCount > 0 && $processCount === 0) {
                        $finalStatus = 'Late';
                    } else {
                        $finalStatus = 'On Process';
                    }

                    return [
                        'id' => $req->id,
                        'request_number' => $req->request_number,
                        'department' => $req->department,

                        // Format tanggal
                        'request_date' => $req->request_date
                            ? $req->request_date->toISOString()
                            : null,

                        'created_at' => $req->created_at->toISOString(),

                        'status' => $finalStatus,
                        'total_items' => $totalItems,
                    ];
                });

            return Inertia::render('table/monitoring-item', [
                'requests' => $requests,
                'departmentName' => $departmentName,
            ]);

        } catch (\Exception $e) {
            return Inertia::render('table/monitoring-item', [
                'requests' => [],
                'departmentName' => null,
                'error' => $e->getMessage(),
            ]);
        }
    }
}
