<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminInvoiceController extends Controller
{
  public function index()
  {
    $invoices = Invoice::with([
      'request.user',
      'request.departemen',
      'purchases'
    ])
      ->orderBy('created_at', 'desc')
      ->get()
      ->map(function ($inv) {

        return [
          'id' => $inv->invoice_number,
          'departemen' => $inv->request->departemen->nama ?? '-',
          'tanggalRequest' => $inv->tanggal_invoice,
          'namaPemohon' => $inv->request->user->name ?? '-',
          'status' => $inv->request->status ?? 'Pending',
          'totalPesanan' => (float) $inv->total_harga,

          // === DETAIL ITEMS ===
          'items' => $inv->purchases->map(fn($p) => [
            'id' => $p->id,
            'namaBarang' => $p->nama_barang,
            'harga' => (float) $p->harga,
            'jumlah' => (int) $p->jumlah,
            'satuan' => $p->satuan,
            'subtotal' => (float) $p->subtotal,
          ])
        ];
      });

    return Inertia::render('admin/invoice', [
      'invoices' => $invoices
    ]);
  }
}
