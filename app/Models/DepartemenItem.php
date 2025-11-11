<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DepartemenItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'departemen',
        'nama_barang',
        'stok',
        'satuan'
    ];
}