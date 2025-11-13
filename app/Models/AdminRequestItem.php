<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AdminRequestItem extends Model
{
  protected $table = 'requests';

  public function department()
  {
    return $this->belongsTo(Department::class, 'kode_department', 'kode_department');
  }

  public function detail() 
  {
    return $this->hasMany(RequestDetail::class, 'request_id', 'id');
  }
}