<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AbsensiGenerate extends Model
{
    protected $table = 'absensi_generate';

    protected $primaryKey = 'id_generate';

    public $timestamps = false;

    protected $fillable = [
        'tanggal_mulai',
        'tanggal_selesai',
        'jam_masuk_default',
        'jam_keluar_default',
        'dibuat_oleh',
        'waktu_dibuat',
        'keterangan'
    ];
}
