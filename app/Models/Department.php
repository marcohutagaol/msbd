<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    protected $table = 'department';

    public function karyawan()
    {
        return $this->hasMany(Karyawan::class);
    }
}
