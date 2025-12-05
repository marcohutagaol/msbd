<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Absen extends Model
{
    use HasFactory;

    protected $table = 'absen';
    protected $primaryKey = 'id_absensi';

    protected $fillable = [
        'tanggal_absen',
        'jam_datang',
        'jam_balik',
        'lokasi_datang',
        'lokasi_balik',
        'status_absen',
        'link_gambar_datang',
        'keterangan',
        'id_karyawan',
        'kode_department'
    ];

    protected $casts = [
        'tanggal_absen' => 'date',
        'jam_datang' => 'datetime',
        'jam_balik' => 'datetime',
    ];

    public function karyawan()
    {
        return $this->belongsTo(Karyawan::class, 'id_karyawan', 'id_karyawan');
    }

    public function department()
    {
        return $this->belongsTo(Department::class, 'kode_department', 'kode_department');
    }
}