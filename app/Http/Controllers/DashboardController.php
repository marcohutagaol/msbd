<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
   public function index()
{
    $user = Auth::user();

    // Ambil departemen user
    $department = DB::table('karyawan')
        ->join('department', 'karyawan.kode_department', '=', 'department.kode_department')
        ->where('karyawan.id_karyawan', $user->id_karyawan)
        ->value('department.nama_department');
    $today = date('Y-m-d');

    $absen = DB::table('absen')
        ->where('id_karyawan', $user->id_karyawan)
        ->where('tanggal_absen', $today)
        ->first();


    $status = "Belum Masuk";

    if ($absen) {
        if ($absen->jam_datang !== null && $absen->jam_balik !== null) {
            $status = "Pulang";  
        } elseif ($absen->jam_datang !== null) {
            $status = "Masuk";   
        }
    }

    return Inertia::render('dashboard', [
        'user' => [
            'id'          => $user->id,
            'name'        => $user->name,
            'email'       => $user->email,
            'id_karyawan' => $user->id_karyawan,
            'departemen'  => $department ?? 'Belum Isi',
            'role'        => $user->role,
            'created_at'  => $user->created_at->format('d M Y'),
        ],
        'absen_status' => $status,
    ]);
}


}
