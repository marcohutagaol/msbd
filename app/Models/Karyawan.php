<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Karyawan extends Model
{
    protected $table = 'karyawan';

    public function department()
    {
        return $this->belongsTo(Department::class, 'kode_department', 'kode_department');
    }

    public function permissions() { 
      return $this->hasMany(Permission::class, 'id_karyawan', 'id_karyawan'); 
    }
}
