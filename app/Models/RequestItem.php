<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RequestItem extends Model
{
  use HasFactory;

  protected $table = 'request_items';

  protected $fillable = [
    'request_id',
    'kode_barang',
    'nama_barang',
    'jumlah_diajukan',
    'jumlah_disetujui',
    'status',
    'departemen', // Tambahkan departemen ke fillable
    'catatan',
    'satuan'
  ];

  public function request()
  {
    return $this->belongsTo(Request::class, 'request_id');
  }

  public function purchase()
  {
    return $this->hasOne(Purchase::class, 'request_item_id');
  }

  public function user()
  {
    return $this->request->user();
  }

}
