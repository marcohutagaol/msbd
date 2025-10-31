<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Absensi extends Model
{
    use HasFactory;

    protected $table = 'detail_absen';
    protected $primaryKey = 'id_detail_absen';

    protected $fillable = [
        'id_absensi',
        'tipe_absen',
        'waktu_absen',
        'lokasi',
        'link_gambar',
        'device_info',
        'ip_address'
    ];

    public $timestamps = true;
    const CREATED_AT = 'created_at';
    const UPDATED_AT = null;

    // Relasi ke user
    public function user()
    {
        return $this->belongsTo(User::class, 'id_absensi', 'id');
    }
}