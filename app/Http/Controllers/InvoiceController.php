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
        $request->validate([
            'request_id' => 'required',
            'price_data' => 'required|array'
        ]);

        foreach ($request->price_data as $item) {

            $purchase = Purchase::where('id', $item['item_id'])->first();

            if (!$purchase) continue;

            $jumlah = DB::table('request_items')
                ->where('id', $purchase->request_item_id)
                ->value('jumlah_disetujui') ?? 1;

            $purchase->update([
                'harga_item'  => $item['harga'],
                'total_harga' => $jumlah * $item['harga']
            ]);
        }

        DB::statement("CALL make_invoice_from_purchases(?)", [
            $request->request_id
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
                    'total_harga' => $p->total_harga,
                ];
            }),
        ]
    ]);
}


}




