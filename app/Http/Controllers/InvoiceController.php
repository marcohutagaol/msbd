<?php

namespace App\Http\Controllers;

use App\Models\Purchase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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

            if (!$purchase) {
                continue; // skip jika purchase tidak ditemukan
            }

            // ✅ Ambil jumlah_disetujui dari request_items secara MANUAL
            $jumlah = DB::table('request_items')
                ->where('id', $purchase->request_item_id)
                ->value('jumlah_disetujui');

            // ✅ Fallback jika NULL
            if (!$jumlah) {
                $jumlah = 1;
            }

            $purchase->update([
                'harga_item'  => $item['harga'],
                'total_harga' => $jumlah * $item['harga']
            ]);
        }

        // ✅ PANGGIL STORED PROCEDURE (MASUK KE TABEL INVOICE)
        DB::statement("CALL make_invoice_from_purchases(?)", [
            $request->request_id
        ]);

        DB::commit();

        return back()->with('success', 'Invoice berhasil dibuat!');
    } catch (\Exception $e) {
        DB::rollBack();
        dd($e->getMessage()); // debug terakhir jika masih gagal
    }
}


}
