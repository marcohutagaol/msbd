<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetailKaryawan extends Model
{
    use HasFactory;

    protected $table = 'detail_karyawan';
    protected $primaryKey = 'id_detail';

    protected $fillable = [
        'id_karyawan',
        'nama',
        'alamat',
        'tanggal_lahir',
        'tempat_lahir',
        'no_telepon'
    ];

    public function karyawan()
    {
        return $this->belongsTo(Karyawan::class, 'id_karyawan', 'id_karyawan');
    }
}