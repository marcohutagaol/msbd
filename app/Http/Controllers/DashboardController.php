<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Carbon\Carbon;

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

        // Ambil data absen hari ini
        $absen = DB::table('absen')
            ->where('id_karyawan', $user->id_karyawan)
            ->where('tanggal_absen', $today)
            ->first();

        // Tentukan status
        $status = "Belum Masuk";
        $absenMasukTime = null;

        if ($absen) {
            if (!empty($absen->jam_datang)) {
                $status = "Masuk";
                $absenMasukTime = Carbon::parse($absen->jam_datang)->toIso8601String();

            }

            if (!empty($absen->jam_datang) && !empty($absen->jam_balik)) {
                $status = "Pulang";
            }

            if ($absen->status_absen === "TERLAMBAT") {
                $status = "Terlambat";
            }
        }

        $generate = DB::table('absensi_generate')
            ->where('tanggal_mulai', '<=', $today)
            ->where('tanggal_selesai', '>=', $today)
            ->first();

        // Jika tidak ada yang aktif, ambil generate terbaru
        if (!$generate) {
            $generate = DB::table('absensi_generate')
                ->orderBy('id_generate', 'desc')
                ->first();
        }

        // Default values
        $jamMasukDefault = $generate ? $generate->jam_masuk_default : null;
        $jamKeluarDefault = $generate ? $generate->jam_keluar_default : null;

        // Hitung total menit kerja default (untuk progress bar)
        // Hitung total menit kerja default (FIX + AKURAT)
$totalMenitDefault = null;

if ($jamMasukDefault && $jamKeluarDefault) {
    $start = Carbon::parse($today . ' ' . $jamMasukDefault);
    $end   = Carbon::parse($today . ' ' . $jamKeluarDefault);

    // kalau jam keluar lebih kecil (lintas hari)
    if ($end->lessThan($start)) {
        $end->addDay();
    }

    $totalMenitDefault = $end->diffInMinutes($start);
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
            'absen_masuk_time' => $absenMasukTime,
            'jam_masuk_default' => $jamMasukDefault,
            'jam_keluar_default' => $jamKeluarDefault,
            'total_menit_default' => $totalMenitDefault,
        ]);
    }
}
