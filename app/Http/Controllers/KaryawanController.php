<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\User;
use Carbon\Carbon;
use App\Models\DetailKaryawan;
use App\Models\Karyawan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KaryawanController extends Controller
{
  public function index()
  {
    // Ambil semua karyawan dengan relasi department
    $karyawanData = Karyawan::with('detailKaryawan', 'department')
      ->get()
      ->map(function ($k) {
        return [
          "id" => $k->id_karyawan,
          "nama" => $k->detailKaryawan?->nama ?? "",
          "alamat" => $k->detailKaryawan?->alamat ?? "",
          "tanggal_lahir" => $k->detailKaryawan?->tanggal_lahir ?? "",
          "tempat_lahir" => $k->detailKaryawan?->tempat_lahir ?? "",
          "no_telepon" => $k->detailKaryawan?->no_telepon ?? "",
          "jabatan" => $k->jabatan,
          "department" => $k->kode_department,
          "status_aktif" => $k->status_aktif,
        ];
      })
      ->sortBy('nama')
      ->values();

    // Ambil department untuk dropdown (sesuai DB)
    $departments = Department::select('kode_department', 'nama_department')
      ->orderBy('nama_department')
      ->get();

    return Inertia::render('admin/karyawan', [
      'karyawanData' => $karyawanData,
      'departments' => $departments,

      // Statistik
      'totalKaryawan' => Karyawan::count(),
      'totalKaryawanAktif' => Karyawan::where('status_aktif', 'AKTIF')->count(),
      'totalMantanKaryawan' => Karyawan::where('status_aktif', 'NONAKTIF')->count(),
    ]);
  }

  private function generateIdKaryawan()
  {
    $last = Karyawan::orderBy('id_karyawan', 'DESC')->first();

    if (!$last) {
      return 'ID10001';
    }

    $lastNumber = intval(substr($last->id_karyawan, 2));
    $newNumber = $lastNumber + 1;

    return 'ID' . $newNumber;
  }

  public function store(Request $request)
  {
    $id = $this->generateIdKaryawan(); // <-- 1. bikin ID dulu

    // 2. buat karyawan utama
    Karyawan::create([
      'id_karyawan' => $id,
      'kode_department' => $request->department,
      'jabatan' => $request->jabatan,
      'status_aktif' => $request->status_aktif,
    ]);

    // 3. buat detail karyawan
    DetailKaryawan::create([
      'id_karyawan' => $id,
      'nama' => $request->nama,
      'alamat' => $request->alamat,
      'tanggal_lahir' => $request->tanggal_lahir,
      'tempat_lahir' => $request->tempat_lahir,
      'no_telepon' => $request->no_telepon,
    ]);

    return back()->with('success', 'Karyawan berhasil ditambahkan');
  }

  public function update(Request $request, $id)
  {
    $request->validate([
      'nama' => 'required',
      'jabatan' => 'required',
      'department' => 'required',
      'status_aktif' => 'required',
      'tanggal_lahir' => 'required|date',
      'tempat_lahir' => 'required',
      'alamat' => 'nullable',
      'no_telepon' => 'nullable'
    ]);

    // UPDATE TABEL KARYAWAN
    Karyawan::where('id_karyawan', $id)->update([
      'jabatan' => $request->jabatan,
      'kode_department' => $request->department,
      'status_aktif' => $request->status_aktif
    ]);

    // UPDATE / INSERT DETAIL
    DetailKaryawan::updateOrCreate(
      ['id_karyawan' => $id],
      [
        'nama' => $request->nama,
        'alamat' => $request->alamat,
        'tanggal_lahir' => $request->tanggal_lahir,
        'tempat_lahir' => $request->tempat_lahir,
        'no_telepon' => $request->no_telepon
      ]
    );

    return back()->with('success', 'Data karyawan berhasil diperbarui.');
  }

  public function detail($id)
  {
    $karyawan = Karyawan::with('detailKaryawan', 'department')
      ->where('id_karyawan', $id)
      ->first();

    if (!$karyawan) {
      abort(404);
    }

    // Ambil data user (bisa null)
    $user = User::where('id_karyawan', $id)->first();

    // Hitung masa kerja pakai created_at dari tabel karyawan
    $tglJoin = Carbon::parse($karyawan->created_at);
    $diff = $tglJoin->diff(Carbon::now());
    $masaKerja = "{$diff->y} Tahun {$diff->m} Bulan";

    // DATA YANG DIKIRIM KE FRONTEND
    $karyawan = [
      "id_karyawan" => $karyawan->id_karyawan,
      "nama" => $karyawan->detailKaryawan->nama ?? "-",
      "department" => $karyawan->department->nama_department ?? "-",
      "jabatan" => $karyawan->jabatan,
      "status_aktif" => $karyawan->status_aktif,
      "tanggalBergabung" => $karyawan->created_at->format('Y-m-d'),
      "masaKerja" => $masaKerja,

      "tempat_lahir" => $karyawan->detailKaryawan->tempat_lahir ?? "-",
      "tanggal_lahir" => $karyawan->detailKaryawan->tanggal_lahir ?? "-",
      "no_telepon" => $karyawan->detailKaryawan->no_telepon ?? "-",
      "alamat" => $karyawan->detailKaryawan->alamat ?? "-",

      // === INFORMASI AKUN (AMAN NULL) ===
      "username" => $user?->name ?? "-",
      "email" => $user?->email ?? "-",
      "role" => $user?->role ?? "-",
      "tanggalAkun" => $user?->created_at
        ? $user->created_at->format('Y-m-d')
        : "-",
    ];

    return Inertia::render('admin/detailKaryawan', [
      'karyawan' => $karyawan
    ]);
  }



  public function mantan()
  {
    $mantanKaryawan = Karyawan::with('detailKaryawan', 'department')
      ->where('status_aktif', 'NONAKTIF')
      ->get()
      ->map(function ($k) {
        return [
          "id" => $k->id_karyawan,
          "nama" => $k->detailKaryawan?->nama ?? "-",
          "departemen" => $k->department?->nama_department ?? "-",
          "foto" => $k->detailKaryawan?->foto ?? "https://i.pravatar.cc/150",
          "tanggalKeluar" => $k->updated_at->format('d M Y'),
          "status" => "deactive",
        ];
      });

    return Inertia::render('admin/mantanKaryawan', [
      'mantanKaryawan' => $mantanKaryawan,
    ]);
  }

  public function destroy($id)
  {
    try {
      // Hapus detail_karyawan dulu (foreign key)
      DetailKaryawan::where('id_karyawan', $id)->delete();

      // Hapus data karyawan utama
      $karyawan = Karyawan::where('id_karyawan', $id)->first();

      if (!$karyawan) {
        return back()->withErrors(['msg' => 'Karyawan tidak ditemukan.']);
      }

      $karyawan->delete();

      return back()->with([
        'success' => 'Karyawan berhasil dihapus.'
      ]);

    } catch (\Exception $e) {
      return back()->withErrors(['msg' => 'Gagal menghapus karyawan: ' . $e->getMessage()]);
    }
  }

}
