<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    use HasFactory;

    protected $table = 'department';
    protected $primaryKey = 'id_department';

    protected $fillable = [
        'kode_department',
        'nama_department',
        'jumlah_pegawai'
    ];

    public function karyawan()
    {
        return $this->hasMany(Karyawan::class, 'kode_department', 'kode_department');
    }

    public function inventory()
    {
        return $this->hasMany(Inventory::class);
    }

    public function request()
    {
        return $this->hasMany(RequestItem::class);
    }
}