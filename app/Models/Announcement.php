<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Announcement extends Model
{
  protected $table = 'announcement';

  protected $fillable = [
    'link_gambar',
    'title',
    'kategori',
    'isi',
    'created_by'
  ];
}

