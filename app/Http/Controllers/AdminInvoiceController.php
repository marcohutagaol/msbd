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
      'request.department',
      'purchases'
    ])
      ->orderBy('created_at', 'desc')
      ->get()
      ->map(function ($inv) {

        // ambil nama departemen dengan aman
        $deptName = $inv->request->department->nama_department
          ?? $inv->request->department
          ?? '-';

        return [
          'id' => $inv->invoice_number,
          'departemen' => $deptName,
          'tanggalRequest' => $inv->tanggal_invoice,
          'namaPemohon' => $inv->request->user->name ?? '-',
          'status' => $inv->request->status ?? 'Pending',
          'totalPesanan' => (float) $inv->total_harga,

          'items' => $inv->purchases->map(function ($p) {
            return [
              'id' => $p->id,
              'namaBarang' => $p->requestItem->nama_barang ?? '-',
              'harga' => (float) $p->harga_item,
              'jumlah' => (int) ($p->requestItem->jumlah_diajukan ?? 0),
              'satuan' => $p->requestItem->satuan ?? '-',
              'subtotal' => (float) $p->total_harga,
            ];
          })

        ];
      });

    return Inertia::render('admin/invoice', [
      'invoices' => $invoices
    ]);
  }

}
