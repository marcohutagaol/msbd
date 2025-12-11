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

  protected $table = 'requests';

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
  public function items()
  {
    return $this->hasMany(RequestItem::class, 'request_id');
  }

  /**
   * Relasi ke Purchase (one-to-one)
   */
  public function purchase(): HasOne
  {
    return $this->hasOne(Purchase::class);
  }

  public function invoice()
  {
    return $this->hasOne(Invoice::class, 'request_id');
  }

  public function departemen()
  {
    return $this->belongsTo(Department::class, 'departemen_id');
  }



}