<?php

namespace App\Http\Controllers;

use App\Models\Absensi;
use App\Models\Karyawan;
use App\Models\Permission;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
  public function index()
  {
    $hadir = Absensi::whereDate('created_at', today())->count();
    $sakit = Permission::where('reason', 'like', '%sakit')->whereDate('created_at', today())->count();
    $izin = Permission::where('status', 'approved')->whereDate('created_at', today())->count();
    $belum_absen = Karyawan::with('absensi')->
      whereNotIn('id_karyawan', function ($query) {
        $query->select('id_absensi')
          ->from('detail_absen')
          ->whereDate('created_at', today());
      })->count();
    $tanpa_keterangan = Karyawan::whereNotIn('id_karyawan', function ($query) {
      $query->select('id_absensi')
        ->from('detail_absen')
        ->whereDate('created_at', today());
    })
      ->whereNotIn('id_karyawan', function ($query) {
        $query->select('id_karyawan')
          ->from('permissions')
          ->whereDate('created_at', today());
      })
      ->count();


    $employees = Karyawan::with(['department'])
      ->get()
      ->map(function ($karyawan) {
        $absen = Absensi::where('id_absensi', $karyawan->id_karyawan)
          ->whereDate('created_at', today())
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
      'hadir' => $hadir,
      'sakit' => $sakit,
      'izin' => $izin,
      'belum_absen' => $belum_absen,
      'tanpa_keterangan' => $tanpa_keterangan,
      'employees' => $employees
    ]);
  }


}
