<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\RequestItem;
use App\Models\Request as RequestModel;
use App\Models\Purchase;
use App\Models\Invoice;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class InputPriceController extends Controller
{
    /**
     * Tampilkan halaman input price dengan data request items
     * yang sudah disetujui tapi belum ada purchase-nya
     */
  public function index($request_number)
{
  

$request = RequestModel::where('request_number', $request_number)->firstOrFail();

$requestItems = RequestItem::with(['request.user', 'purchase'])
    ->where('request_id', $request->id)
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
            'harga' => $item->purchase?->harga_item,
            'total_harga' => $item->purchase?->total_harga,

            'request' => [
                'id' => $item->request->id,
                'request_number' => $item->request->request_number,
                'department' => $item->request->department,
                'request_date' => $item->request->request_date,
                'notes' => $item->request->notes,
            ],
        ];
    });

$invoiceCount = Invoice::where('request_id', $request->id)->count();
$invoiceNumber = Invoice::where('request_id', $request->id)->value('invoice_number');

return Inertia::render('table/input-price', [
    'orders' => $requestItems,
    'requestNumber' => $request_number,
    'invoice_count' => $invoiceCount,
'invoice_number' => $invoiceNumber,
    'request_id' => $request->id,
]);

}

public function saveInvoice(Request $request)
{
    $request->validate([
        'item_id' => 'required|exists:request_items,id',
        'harga' => 'required|numeric|min:1',
    ]);

    try {
        DB::beginTransaction();

        DB::statement("CALL make_purchase_from_item(?, ?)", [
            $request->item_id,
            $request->harga
        ]);

        DB::commit();

        return redirect()->back()->with('success', 'Invoice berhasil dibuat!');
    } catch (\Throwable $e) {
        DB::rollBack();
        return back()->withErrors([
            'error' => $e->getMessage()
        ]);
    }
}



    /**
     * Konfirmasi preorder - simpan harga dan update status jadi Completed
     */
    public function confirmPreorder(Request $request)
{
    $validated = $request->validate([
        'request_id' => 'required',
        'price_data' => 'required|array'
    ]);

    $requestModel = \App\Models\Request::findOrFail($validated['request_id']);

    DB::beginTransaction();
    try {

        foreach ($validated['price_data'] as $item) {

            $purchase = Purchase::where('request_item_id', $item['request_item_id'])->first();
            if (!$purchase) continue;

            $jumlah = DB::table('request_items')
                ->where('id', $purchase->request_item_id)
                ->value('jumlah_disetujui') ?? 1;

            $purchase->update([
                'harga_item'  => $item['harga'],
                'total_harga' => $jumlah * $item['harga'],
                'request_id'  => $requestModel->id,
            ]);
        }

        DB::commit(); // COMMIT SEBELUM CALL

    } catch (\Exception $e) {
        DB::rollBack();
        return back()->with('error', $e->getMessage());
    }

    // CALL SP DI LUAR TRANSACTION
    try {
        DB::unprepared("CALL make_invoice_from_purchases($requestModel->id)");
    } catch (\Exception $e) {
        return back()->with('error', $e->getMessage());
    }

    return back()->with('success', 'Invoice berhasil dibuat!');
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