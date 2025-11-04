<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Permission extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'type',
        'status',
        'start_date',
        'end_date',
        'days',
        'notes',
        'sick_type',
        'permission_date',
        'reason',
        'permission_type',
        'time',
        'vacation_type',
        'vacation_reason',
        'location',
        'document_path',
    ];

    // JANGAN PAKAI CASTS untuk date
    // Biarkan sebagai string saja

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}