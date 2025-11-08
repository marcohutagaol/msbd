<?php

namespace App\Http\Controllers;

use App\Models\RequestItem;
use Inertia\Inertia;
use Illuminate\Http\Request;

class MonitoringController extends Controller
{
    public function index()
    {
        // Ambil data dari request_items dengan relasi request
        $requestItems = RequestItem::with(['request' => function($query) {
            $query->select('id', 'department', 'request_date', 'notes');
        }])
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
                    'department' => $item->request->department,
                    'request_date' => $item->request->request_date,
                    'notes' => $item->request->notes,
                ] : null,
                'created_at' => $item->created_at,
                'updated_at' => $item->updated_at,
            ];
        });

        return Inertia::render('table/monitoring-item', [
            'requestItems' => $requestItems
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
}