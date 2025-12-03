<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Inventory extends Model
{
    protected $table = 'items_department';

    public function department()
    {
        return $this->belongsTo(Department::class, 'department_id', 'kode_department');
    }
}
