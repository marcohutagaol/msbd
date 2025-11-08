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
        'tanggal_beli',
        'total_harga',
        'status',
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
        return $this->belongsTo(Request::class);
    }
}
