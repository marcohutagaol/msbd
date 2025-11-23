<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Karyawan extends Model
{
    use HasFactory;

    protected $table = 'karyawan';
    protected $primaryKey = 'id_karyawan';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id_karyawan',
        'jabatan',
        'kode_department',
        'status_aktif'
    ];

    public function department()
    {
        return $this->belongsTo(Department::class, 'kode_department', 'kode_department');
    }

    public function detailKaryawan()
    {
        return $this->hasOne(DetailKaryawan::class, 'id_karyawan', 'id_karyawan');
    }

    public function absensi()
    {
        return $this->hasMany(Absen::class, 'id_karyawan', 'id_karyawan');
    }

    public function permissions()
    {
        return $this->hasMany(Permission::class, 'user_id', 'id_karyawan');
    }
}