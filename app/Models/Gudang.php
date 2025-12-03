<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Gudang extends Model
{
    protected $table = 'gudang';
    protected $fillable = [
        'nama_barang',
        'stok',
        'satuan',
    ];

    public $timestamps = true;
}