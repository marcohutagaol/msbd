<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RequestDetail extends Model
{
    protected $table = 'request_items';

    public function request() 
    {
      return $this->belongsTo(AdminRequestItem::class, 'request_id', 'id');
    }
}
