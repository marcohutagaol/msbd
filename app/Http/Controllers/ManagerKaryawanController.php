<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\DetailKaryawan;
use App\Models\Karyawan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ManagerKaryawanController extends Controller
{
    public function index()
    {
        $karyawanData = Karyawan::with('detailKaryawan', 'department')
            ->get()
            ->map(function ($k) {
                return [
                    "id" => $k->id_karyawan,
                    "nama" => $k->detailKaryawan?->nama ?? "-",
                    "department" => $k->department?->nama_department ?? "-",
                    "jabatan" => $k->jabatan,
                    "status_aktif" => $k->status_aktif,
                    "status_kerja" => $this->getStatusKerja($k->id_karyawan),
                    "foto" => $k->detailKaryawan?->foto ?? "https://ui-avatars.com/api/?name=" . urlencode($k->detailKaryawan?->nama ?? 'User') . "&background=4789A8&color=fff",
                    "tanggalBergabung" => $k->created_at->format('Y-m-d'),
                ];
            })
            ->sortBy('nama')
            ->values();

        // Hitung statistik
        $totalKaryawan = Karyawan::count();
        $totalAktif = Karyawan::where('status_aktif', 'AKTIF')->count();
        $totalNONAKTIF = Karyawan::where('status_aktif', 'NONAKTIF')->count();

        // Data untuk chart
        $attendanceData = [
            ['name' => 'Hadir', 'value' => $this->getHadirCount()],
            ['name' => 'Sakit', 'value' => $this->getSakitCount()],
            ['name' => 'Izin', 'value' => $this->getIzinCount()],
            ['name' => 'Cuti', 'value' => $this->getCutiCount()],
        ];

        // Data ranking karyawan (contoh berdasarkan absensi)
        $rankData = $this->getRankData();

        return Inertia::render('manager/karyawan', [
            'karyawanData' => $karyawanData,
            'totalKaryawan' => $totalKaryawan,
            'totalAktif' => $totalAktif,
            'totalNONAKTIF' => $totalNONAKTIF,
            'attendanceData' => $attendanceData,
            'rankData' => $rankData,
            'departments' => \App\Models\Department::all()->map(function ($dept) {
                return [
                    'kode' => $dept->kode_department,
                    'nama' => $dept->nama_department
                ];
            }),
        ]);
    }

    private function getStatusKerja($idKaryawan)
    {
        // Logika untuk menentukan status kerja hari ini
        // Contoh sederhana: random status untuk demo
        $statuses = ['Hadir', 'Sakit', 'Izin', 'Cuti'];
        return $statuses[array_rand($statuses)];
    }

    private function getHadirCount()
    {
        // Logika untuk menghitung karyawan hadir hari ini
        return rand(5, 15);
    }

    private function getSakitCount()
    {
        return rand(0, 3);
    }

    private function getIzinCount()
    {
        return rand(0, 2);
    }

    private function getCutiCount()
    {
        return rand(0, 1);
    }

    private function getRankData()
    {
        // Data ranking contoh
        return [
            ['rank' => '1#', 'name' => 'Rizky Rahmad Maulana', 'badge' => '⭐'],
            ['rank' => '2#', 'name' => 'Susan Nila', 'badge' => '⭐'],
            ['rank' => '3#', 'name' => 'Rudi Asri', 'badge' => '⭐'],
        ];
    }

    public function detail($id)
    {
        $karyawan = Karyawan::with('detailKaryawan', 'department')
            ->where('id_karyawan', $id)
            ->first();

        if (!$karyawan) {
            abort(404);
        }

        // Hitung masa kerja
        $tglJoin = Carbon::parse($karyawan->created_at);
        $tglNow = Carbon::now();
        $diff = $tglJoin->diff($tglNow);
        $masaKerja = $diff->y . " Tahun " . $diff->m . " Bulan";

        // Data statistik kehadiran (contoh)
        $stats = [
            'hadir' => rand(15, 25),
            'tepatWaktu' => rand(12, 20),
            'telat' => rand(0, 5),
            'izin' => rand(1, 3),
            'sakit' => rand(0, 2),
            'cuti' => rand(0, 1),
        ];

        // Badges/awards (contoh)
        $badges = [
            ['id' => '1', 'name' => 'Employee of The Month', 'type' => 'award'],
            ['id' => '2', 'name' => 'Best Performer', 'type' => 'award'],
        ];

        $karyawanData = [
            "id_karyawan" => $karyawan->id_karyawan,
            "nama" => $karyawan->detailKaryawan?->nama ?? "-",
            "department" => $karyawan->department?->nama_department ?? "-",
            "jabatan" => $karyawan->jabatan,
            "status_aktif" => $karyawan->status_aktif,
            "tanggalBergabung" => $karyawan->created_at->format('d F Y'),
            "masaKerja" => $masaKerja,
            "tempat_lahir" => $karyawan->detailKaryawan->tempat_lahir ?? "-",
            "tanggal_lahir" => $karyawan->detailKaryawan->tanggal_lahir ?? "-",
            "no_telepon" => $karyawan->detailKaryawan->no_telepon ?? "-",
            "alamat" => $karyawan->detailKaryawan->alamat ?? "-",
            "email" => $karyawan->detailKaryawan->email ?? "tidak.ada@email.com",
            "foto" => $karyawan->detailKaryawan?->foto ?? "https://ui-avatars.com/api/?name=" . urlencode($karyawan->detailKaryawan?->nama ?? 'User') . "&background=4789A8&color=fff&size=128",
            "stats" => $stats,
            "badges" => $badges,
        ];

        return Inertia::render('manager/detail-karyawan', [
            'karyawan' => $karyawanData
        ]);
    }

    public function filterByDepartment($department)
    {
        $karyawanData = Karyawan::with('detailKaryawan', 'department')
            ->whereHas('department', function ($query) use ($department) {
                $query->where('nama_department', $department);
            })
            ->get()
            ->map(function ($k) {
                return [
                    "id" => $k->id_karyawan,
                    "nama" => $k->detailKaryawan?->nama ?? "-",
                    "department" => $k->department?->nama_department ?? "-",
                    "jabatan" => $k->jabatan,
                    "status_aktif" => $k->status_aktif,
                    "status_kerja" => $this->getStatusKerja($k->id_karyawan),
                    "foto" => $k->detailKaryawan?->foto ?? "https://ui-avatars.com/api/?name=" . urlencode($k->detailKaryawan?->nama ?? 'User') . "&background=4789A8&color=fff",
                ];
            });

        return response()->json($karyawanData);
    }
}