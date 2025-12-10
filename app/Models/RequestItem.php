<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RequestItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'request_id',
        'kode_barang',
        'nama_barang',
        'jumlah_diajukan',
        'jumlah_disetujui',
        'status',
        'departemen', 
        'catatan',
        'satuan'
    ];

    public function request(): BelongsTo
    {
        return $this->belongsTo(Request::class);
    }

    public function purchase()
{
    return $this->hasOne(Purchase::class, 'request_item_id');
}

protected static function booted()
{
    static::deleted(function ($item) {

        if ($item->request && $item->request->items()->count() === 0) {
            $item->request->delete(); 
        }

    });
}

}
