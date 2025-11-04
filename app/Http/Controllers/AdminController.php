<?php

namespace App\Http\Controllers;

use App\Models\Absensi;
use App\Models\Karyawan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
  public function index()
  {
    $employees = Karyawan::with(['department'])
      ->get()
      ->map(function ($karyawan) {
        $absen = Absensi::where('id_absensi', $karyawan->id_karyawan)
          ->first();

        return [
          'id' => $karyawan->id_karyawan,
          'name' => $karyawan->nama,
          'department' => $karyawan->department->nama_department,
          'time' => $absen->waktu_absen ?? '',
          'status' => $absen->tipe_absen ?? ''
        ];
      });

    return Inertia::render('admin/Dashboard', [
      'employees' => $employees
    ]);
  }


}
