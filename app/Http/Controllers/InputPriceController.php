<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\RequestItem;
use App\Models\Request as RequestModel;
use App\Models\Purchase;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class InputPriceController extends Controller
{
    /**
     * Tampilkan halaman input price dengan data request items
     * yang sudah disetujui tapi belum ada purchase-nya
     */
    public function index()
    {
        // Cari request items yang approved dan belum completed/arrived
        $requestItems = RequestItem::with(['request.user', 'request.purchase'])
            ->whereIn('status', ['Approved', 'Completed', 'Arrived'])
            ->whereDoesntHave('request.purchase') // Hanya yang belum ada purchase
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
                    'harga' => $item->harga,
                    'request' => [
                        'id' => $item->request->id,
                        'request_number' => $item->request->request_number,
                        'department' => $item->request->department,
                        'request_date' => $item->request->request_date,
                        'notes' => $item->request->notes,
                    ],
                ];
            });

        return Inertia::render('table/input-price', [
            'orders' => $requestItems
        ]);
    }

    /**
     * Konfirmasi preorder - simpan harga dan update status jadi Completed
     */
    public function confirmPreorder(Request $request)
    {
        $validated = $request->validate([
            'price_data' => 'required|array',
            'price_data.*.item_id' => 'required|exists:request_items,id',
            'price_data.*.harga' => 'required|numeric|min:1',
        ]);

        try {
            DB::beginTransaction();

            $priceData = $validated['price_data'];
            $successCount = 0;
            
            foreach ($priceData as $data) {
                $requestItem = RequestItem::find($data['item_id']);
                
                // Hanya update item yang berstatus Approved
                if ($requestItem && $requestItem->status === 'Approved') {
                    $requestItem->update([
                        'harga' => $data['harga'],
                        'status' => 'Completed'
                    ]);
                    $successCount++;
                }
            }

            DB::commit();

            if ($successCount > 0) {
                return redirect()->back()->with([
                    'success' => 'Preorder berhasil dikonfirmasi! ' . $successCount . ' item telah diproses.'
                ]);
            } else {
                return redirect()->back()->with([
                    'error' => 'Tidak ada item yang dapat diproses. Pastikan item berstatus Approved.'
                ]);
            }

        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }

    /**
     * Tandai barang sudah sampai - ubah status dari Completed ke Arrived
     * Support untuk single item atau multiple items
     */
    public function markAsArrived(Request $request)
    {
        $validated = $request->validate([
            'item_ids' => 'required|array',
            'item_ids.*' => 'exists:request_items,id',
        ]);

        try {
            DB::beginTransaction();

            $itemIds = $validated['item_ids'];
            $updatedCount = 0;
            $skippedCount = 0;

            foreach ($itemIds as $itemId) {
                $requestItem = RequestItem::find($itemId);
                
                // Hanya update jika status adalah Completed
                if ($requestItem) {
                    if ($requestItem->status === 'Completed') {
                        $requestItem->update([
                            'status' => 'Arrived',
                            'received_date' => now()
                        ]);
                        $updatedCount++;
                    } else {
                        $skippedCount++;
                    }
                }
            }

            DB::commit();

            if ($updatedCount > 0) {
                $message = $updatedCount . ' barang berhasil ditandai sudah sampai!';
                if ($skippedCount > 0) {
                    $message .= ' (' . $skippedCount . ' item dilewati karena bukan status Completed)';
                }
                return redirect()->back()->with('success', $message);
            } else {
                return redirect()->back()->with('error', 'Tidak ada barang yang dapat ditandai. Pastikan status barang adalah Completed.');
            }

        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }

    /**
     * Tandai semua barang yang Completed jadi Arrived
     */
    public function markAllArrived(Request $request)
    {
        try {
            DB::beginTransaction();

            // Update status semua item yang Completed jadi Arrived
            $updatedItems = RequestItem::where('status', 'Completed')
                ->update([
                    'status' => 'Arrived',
                    'received_date' => now()
                ]);

            DB::commit();

            if ($updatedItems > 0) {
                return redirect()->back()->with('success', $updatedItems . ' barang berhasil ditandai sudah sampai!');
            } else {
                return redirect()->back()->with('error', 'Tidak ada barang dengan status Completed.');
            }

        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }
}