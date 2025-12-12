<?php

namespace App\Http\Controllers;

use App\Models\Purchase;
use App\Models\Invoice;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class InvoiceController extends Controller
{
  public function confirmPreorder(Request $request)
{
    DB::beginTransaction();

    try {
        $validated = $request->validate([
            'request_id' => 'required',
            'price_data' => 'required|array'
        ]);

        // 🟩 Ambil request berdasarkan request_id yang dikirim frontend
        $requestModel = \App\Models\Request::findOrFail($validated['request_id']);

        // Update harga pada purchase
        foreach ($validated['price_data'] as $item) {

    // 🟢 Cari purchase berdasarkan request_item_id (INI YANG BENAR)
$purchase = Purchase::where('request_item_id', $item['request_item_id'])->first();





    if (!$purchase) continue;

    // Ambil jumlah disetujui
    $jumlah = DB::table('request_items')
        ->where('id', $purchase->request_item_id)
        ->value('jumlah_disetujui') ?? 1;

    // Update harga & total
    $purchase->update([
    'harga_item'  => $item['harga'],
    'total_harga' => $jumlah * $item['harga'],
    'request_id'  => $requestModel->id, // <= WAJIB ADA!
]);

}
        // 🟩 Panggil SP dengan request_id YANG BENAR
        DB::statement("CALL make_invoice_from_purchases(?)", [
            $requestModel->id
        ]);

        DB::commit();

        return back()->with('success', 'Invoice berhasil dibuat!');

    } catch (\Exception $e) {
        DB::rollBack();

        if (str_contains($e->getMessage(), 'Invoice untuk request ini sudah dibuat')) {
            return back()->with('info', 'Invoice sudah pernah dibuat sebelumnya.');
        }

        return back()->with('error', $e->getMessage());
    }
}


public function show($invoice_number)
{
    $invoice = Invoice::where('invoice_number', $invoice_number)
        ->with(['purchases.requestItem'])
        ->firstOrFail();

    return Inertia::render('invoice/view', [
        'invoice' => [
            'id' => $invoice->id,
            'invoice_number' => $invoice->invoice_number,
            'total_harga' => $invoice->total_harga,
            'purchases' => $invoice->purchases->map(function ($p) {
                return [
                    'id' => $p->id,
                    'nama_barang' => $p->requestItem->nama_barang ?? 'N/A',
                    'jumlah' => $p->requestItem->jumlah_disetujui ?? 0,
                    'harga_item' => $p->harga_item,
                    'harga_satuan' => $p->requestItem->harga ?? null, 
                    'total_harga' => $p->total_harga,
                ];
            }),
        ]
    ]);
}


}




