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
        'document_path', // Full path disimpan di sini
    ];

    // Accessor untuk mendapatkan full URL
    public function getDocumentUrlAttribute()
    {
        return $this->document_path ? \Illuminate\Support\Facades\Storage::url($this->document_path) : null;
    }

    // Accessor untuk mendapatkan nama file asli
    public function getDocumentNameAttribute()
    {
        if (!$this->document_path) {
            return null;
        }
        
        $parts = explode('_', $this->document_path);
        if (count($parts) > 2) {
            // Hapus timestamp dan uniqid di depan
            array_shift($parts); // hapus timestamp
            array_shift($parts); // hapus uniqid
            return implode('_', $parts);
        }
        
        return basename($this->document_path);
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}