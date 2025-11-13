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
        // Cari request items yang approved dan belum ada purchase-nya
        $requestItems = RequestItem::with(['request.user', 'request.purchase'])
            ->where('status', 'Approved')
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
                    'harga' => $item->harga, // Harga dari database (jika ada)
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
     * Konfirmasi preorder - simpan semua harga sekaligus ke purchases
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
            
            // Group by request_id untuk membuat/mengupdate purchases
            $purchasesData = [];
            $updatedItemIds = [];
            
            foreach ($priceData as $data) {
                $requestItem = RequestItem::with('request')->find($data['item_id']);
                
                if (!$requestItem) {
                    continue;
                }
                
                $requestId = $requestItem->request->id;
                $jumlah = $requestItem->jumlah_disetujui ?? $requestItem->jumlah_diajukan;
                $hargaSatuan = $data['harga'];
                $totalHargaItem = $hargaSatuan * $jumlah;
                
                // Update harga di request_item
                $requestItem->update(['harga' => $hargaSatuan]);
                $updatedItemIds[] = $requestItem->id;
                
                if (!isset($purchasesData[$requestId])) {
                    $purchasesData[$requestId] = [
                        'request_id' => $requestId,
                        'total_harga' => 0,
                        'items' => []
                    ];
                }
                
                $purchasesData[$requestId]['total_harga'] += $totalHargaItem;
                $purchasesData[$requestId]['items'][] = [
                    'item_id' => $data['item_id'],
                    'harga' => $hargaSatuan,
                    'total' => $totalHargaItem
                ];
            }

            // Create or update purchases
            foreach ($purchasesData as $requestId => $purchaseData) {
                $purchase = Purchase::where('request_id', $requestId)->first();
                
                if ($purchase) {
                    $purchase->update([
                        'total_harga' => $purchaseData['total_harga'],
                        'status' => 'Approved',
                        'tanggal_beli' => now()
                    ]);
                } else {
                    Purchase::create([
                        'request_id' => $requestId,
                        'total_harga' => $purchaseData['total_harga'],
                        'status' => 'Approved',
                        'tanggal_beli' => now()
                    ]);
                }

                // Update status request items menjadi Completed
                RequestItem::whereIn('id', $updatedItemIds)
                    ->where('request_id', $requestId)
                    ->update(['status' => 'Completed']);
            }

            DB::commit();

            return redirect()->back()->with([
                'success' => 'Preorder berhasil dikonfirmasi dan semua harga telah disimpan!',
                'purchases_created' => count($purchasesData)
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            
            return redirect()->back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }

    /**
     * Tandai barang sudah sampai
     */
    public function markAsArrived(Request $request)
    {
        $validated = $request->validate([
            'item_ids' => 'required|array',
            'item_ids.*' => 'exists:request_items,id',
        ]);

        $itemIds = $validated['item_ids'];
        
        try {
            // Update status dan tanggal terima
            RequestItem::whereIn('id', $itemIds)
                ->update([
                    'status' => 'Completed',
                    'received_date' => now()
                ]);

            return redirect()->back()->with('success', 'Barang berhasil ditandai sudah diterima!');

        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }

    /**
     * Get summary data dari purchases untuk request tertentu
     */
    public function getSummary(Request $request, $requestId)
    {
        $purchase = Purchase::where('request_id', $requestId)
            ->with('request')
            ->first();
        
        if (!$purchase) {
            // Jika belum ada purchase, ambil data request
            $requestModel = RequestModel::find($requestId);
            
            return response()->json([
                'id' => null,
                'request_id' => (int) $requestId,
                'request_number' => $requestModel?->request_number ?? '',
                'total_harga' => 0,
                'status' => 'Pending',
                'tanggal_beli' => null
            ]);
        }
        
        return response()->json([
            'id' => $purchase->id,
            'request_id' => (int) $requestId,
            'request_number' => $purchase->request->request_number,
            'total_harga' => (float) $purchase->total_harga,
            'status' => $purchase->status,
            'tanggal_beli' => $purchase->tanggal_beli
        ]);
    }

    /**
     * Get detail items untuk request tertentu (optional)
     */
    public function getRequestItems($requestId)
    {
        $items = RequestItem::where('request_id', $requestId)
            ->where('status', 'Approved')
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'nama_barang' => $item->nama_barang,
                    'jumlah_diajukan' => $item->jumlah_diajukan,
                    'jumlah_disetujui' => $item->jumlah_disetujui,
                    'satuan' => $item->satuan,
                    'harga' => $item->harga,
                    'catatan' => $item->catatan,
                ];
            });

        return response()->json($items);
    }
}