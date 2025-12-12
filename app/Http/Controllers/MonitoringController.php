<?php

namespace App\Http\Controllers;

use App\Models\RequestItem;
use Inertia\Inertia;
use Illuminate\Http\Request;

class MonitoringController extends Controller
{
public function index($request_number)
{
    $requestItems = RequestItem::with(['request'])
        ->whereHas('request', function ($query) use ($request_number) {
            $query->where('request_number', $request_number);
        })
        ->orderBy('created_at', 'desc')
        ->get()
        ->map(function ($item) {
            return [
                'id' => $item->id,
                'kode_barang' => $item->kode_barang,
                'nama_barang' => $item->nama_barang,
                'jumlah_diajukan' => $item->jumlah_diajukan,
                'jumlah_disetujui' => $item->jumlah_disetujui,
                'satuan' => $item->satuan,
                'catatan' => $item->catatan,
                'status' => $item->status,
                'request' => $item->request ? [
                    'request_date' => $item->request->request_date,
                ] : null,
            ];
        });

    return Inertia::render('table/monitoring-item-detail', [
        'orders' => $requestItems,      // ✅ HARUS PERSIS INI
        'requestNumber' => $request_number,
    ]);
}



    public function update(Request $request, $id)
    {
        $request->validate([
            'jumlah_diajukan' => 'required|integer|min:1',
            'catatan' => 'nullable|string|max:500',
        ]);

        $requestItem = RequestItem::findOrFail($id);
        
        $requestItem->update([
            'jumlah_diajukan' => $request->jumlah_diajukan,
            'catatan' => $request->catatan,
        ]);

        return redirect()->back()->with('success', 'Item berhasil diperbarui');
    }

    public function destroy($id)
    {
        $requestItem = RequestItem::findOrFail($id);
        $requestItem->delete();

        return redirect()->back()->with('success', 'Item berhasil dihapus');
    }

    private function updateRequestStatusIfAllDone($request_id)
{
    $totalItems = RequestItem::where('request_id', $request_id)->count();

    $doneItems = RequestItem::where('request_id', $request_id)
        ->whereIn('status', ['Completed', 'Arrived'])
        ->count();

    if ($totalItems > 0 && $totalItems === $doneItems) {
        Request::where('id', $request_id)->update([
            'status' => 'Completed'
        ]);
    }
}

}