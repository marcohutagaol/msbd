<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Request extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'request_number',
        'department',
        'request_date',
        'notes',
        'status'
    ];

    protected $casts = [
        'request_date' => 'date',
    ];

    /**
     * Relasi ke User
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relasi ke RequestItems
     */
    public function items(): HasMany
    {
        return $this->hasMany(RequestItem::class);
    }

    /**
     * Relasi ke Purchase (one-to-one)
     */
    public function purchase(): HasOne
    {
        return $this->hasOne(Purchase::class);
    }
}