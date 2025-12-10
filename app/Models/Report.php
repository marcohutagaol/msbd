<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
  protected $table = 'reports';

  protected $fillable = [
    'id',
    'title',
    'department',
    'isi',
    'link_gambar',
    'created_by',
    'report_date',
    'created_at',
    'updated_at'
  ];
}
