<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Purchase extends Model
{
    use HasFactory;

    protected $fillable = [
        'request_id',
        'request_item_id',
        'tanggal_beli',
        'harga_item',
        'total_harga',
    ];

    protected $casts = [
        'tanggal_beli' => 'date', // Ubah dari datetime ke date sesuai database
        'total_harga' => 'decimal:2',
    ];

    /**
     * Relasi ke Request
     */
    public function request(): BelongsTo
    {
        return $this->belongsTo(Request::class, 'request_id', 'id');
    }
    
    public function invoice()
    {
        return $this->belongsTo(Invoice::class, 'request_id', 'request_id');
    }
  public function requestItem()
{
    return $this->belongsTo(RequestItem::class, 'request_item_id', 'id');
}



}
