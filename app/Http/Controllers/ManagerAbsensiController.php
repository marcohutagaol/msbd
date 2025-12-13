<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ManagerAbsensiController extends Controller
{
    /**
     * ============================
     * MENAMPILKAN HALAMAN ABSENSI
     * ============================
     */
    public function index()
    {
        /* =========================
           DATA GENERATE ABSENSI
        ========================= */
        $absensi = DB::table('absensi_generate')
            ->orderBy('tanggal_mulai', 'desc')
            ->get();

        /* =========================
           STATISTIK ABSENSI (REAL)
        ========================= */
        $attendanceStats = DB::table('absen')
            ->select('status_absen', DB::raw('COUNT(*) as total'))
            ->groupBy('status_absen')
            ->get()
            ->mapWithKeys(fn ($item) => [$item->status_absen => $item->total]);

        $statsFormatted = [
            'HADIR'        => $attendanceStats['HADIR'] ?? 0,
            'TERLAMBAT'    => $attendanceStats['TERLAMBAT'] ?? 0,
            'IZIN'         => $attendanceStats['IZIN'] ?? 0,
            'CUTI'         => $attendanceStats['CUTI'] ?? 0,
            'TIDAK_HADIR'  => $attendanceStats['TIDAK_HADIR'] ?? 0,
        ];

        /* =========================
           DATA TABLE ABSENSI (REAL)
        ========================= */
        $attendanceTable = DB::table('absen')
            ->join('karyawan', 'absen.id_karyawan', '=', 'karyawan.id_karyawan')
            ->select(
                'absen.id_absensi',
                'absen.jam_datang',
                'absen.jam_balik',
                'absen.status_absen',
                'karyawan.id_karyawan',
                'karyawan.jabatan',
                'absen.kode_department'
            )
            ->orderBy('absen.tanggal_absen', 'desc')
            ->get()
            ->map(function ($row) {
                return [
                    'id'            => $row->id_absensi,
                    'name'          => $row->id_karyawan . ' - ' . $row->jabatan,
                    'department'    => $row->kode_department,
                    'arrivalTime'   => $row->jam_datang
                        ? date('H:i', strtotime($row->jam_datang))
                        : '-',
                    'departureTime' => $row->jam_balik
                        ? date('H:i', strtotime($row->jam_balik))
                        : '-',
                    'status'        => $row->status_absen,
                ];
            });

        return Inertia::render('manager/absensi', [
            'absensi'        => $absensi,
            'stats'          => $statsFormatted,
            'attendanceTable'=> $attendanceTable,
        ]);
    }

    /**
     * ============================
     * SIMPAN ABSENSI GENERATE
     * ============================
     */
    public function store(Request $request)
    {
        $request->validate([
            'tanggal_mulai'   => 'required|date',
            'tanggal_selesai' => 'required|date|after_or_equal:tanggal_mulai',
            'jam_masuk'       => 'required',
            'jam_keluar'      => 'required',
            'keterangan'      => 'nullable|string'
        ]);

        $user = Auth::user();
        $dibuatOleh = $user->id_karyawan ?? $user->id;

        DB::table('absensi_generate')->insert([
            'tanggal_mulai'      => $request->tanggal_mulai,
            'tanggal_selesai'    => $request->tanggal_selesai,
            'jam_masuk_default'  => $request->jam_masuk,
            'jam_keluar_default' => $request->jam_keluar,
            'dibuat_oleh'        => $dibuatOleh,
            'waktu_dibuat'       => now(),
            'keterangan'         => $request->keterangan
        ]);

        return back()->with('success', 'Absensi berhasil dibuat');
    }
}
