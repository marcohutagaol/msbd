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

    public function inventory() {
      return $this->hasMany(Inventory::class);
    }

    public function request() {
      return $this->hasMany(RequestItem::class);
    }
}
