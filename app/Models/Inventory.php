<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Request;

class Inventory extends Model
{
  protected $table = 'gudang';

  public function request()
  {
    return $this->belongsTo(Request::class, 'request_id', 'id');
  }

}
