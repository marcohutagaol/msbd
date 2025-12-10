<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    // ✅ Nama tabel (kalau tidak standar jamak "invoices")
    protected $table = 'invoice';

    // ✅ Kolom yang boleh diisi
    protected $fillable = [
        'request_id',
        'invoice_number',
        'tanggal_invoice',
        'total_harga',
    ];

    /**
     * ✅ RELASI: INVOICE MILIK 1 REQUEST
     */
    public function request()
    {
        return $this->belongsTo(Request::class, 'request_id');
    }

    /**
     * ✅ RELASI: INVOICE MEMILIKI BANYAK PURCHASES
     * (melalui request_id)
     */
    public function purchases()
    {
        return $this->hasMany(Purchase::class, 'request_id', 'request_id');
    }
}
