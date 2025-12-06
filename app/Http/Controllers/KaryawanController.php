<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\DetailKaryawan;
use App\Models\Karyawan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KaryawanController extends Controller
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
          "tanggalBergabung" => $k->created_at->format('Y-m-d'),
        ];
      })
      ->sortBy('nama')
      ->values();

    return Inertia::render('admin/karyawan', [
      'karyawanData' => $karyawanData,
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
    $request->validate([
      'nama' => 'required',
      'jabatan' => 'required',
      'department' => 'required',
      'status_aktif' => 'required',   // <-- diperbaiki
    ]);

    $id = 'ID' . rand(10000, 99999);

    Karyawan::create([
      'id_karyawan' => $id,
      'jabatan' => $request->jabatan,
      'kode_department' => $request->department,
      'status_aktif' => $request->status_aktif,  // <-- benar
    ]);

    DetailKaryawan::create([
      'id_karyawan' => $id,
      'nama' => $request->nama,
    ]);

    return redirect()->back();
  }



  public function update(Request $request, $id)
  {
    $request->validate([
      'nama' => 'required',
      'department' => 'required',
      'jabatan' => 'required',
      'status_aktif' => 'required',
    ]);

    $karyawan = Karyawan::where('id_karyawan', $id)->firstOrFail();
    $detail = DetailKaryawan::where('id_karyawan', $id)->firstOrFail();

    $karyawan->update([
      'jabatan' => $request->jabatan,
      'kode_department' => $request->department,
      'status_aktif' => $request->status_aktif,
    ]);

    $detail->update([
      'nama' => $request->nama,
    ]);


    return redirect()->back();
  }


  public function detail($id)
  {
    $karyawan = Karyawan::with('detailKaryawan', 'department')
      ->where('id_karyawan', $id)
      ->first();

    if (!$karyawan) {
      abort(404);
    }

    // Hitung masa kerja pakai created_at
    $tglJoin = Carbon::parse($karyawan->created_at);
    $tglNow = Carbon::now();

    $diff = $tglJoin->diff($tglNow);

    $masaKerja = $diff->y . " Tahun " . $diff->m . " Bulan";

    $karyawan = [
      "id_karyawan" => $karyawan->id_karyawan,
      "nama" => $karyawan->detailKaryawan?->nama ?? "-",
      "department" => $karyawan->department?->nama_department ?? "-",
      "jabatan" => $karyawan->jabatan,
      "status_aktif" => $karyawan->status_aktif,
      "tanggalBergabung" => $karyawan->created_at->format('Y-m-d'),
      "masaKerja" => $masaKerja,
      "tempat_lahir" => $karyawan->detailKaryawan->tempat_lahir ?? "-",
      "tanggal_lahir" => $karyawan->detailKaryawan->tanggal_lahir ?? "-",
      "no_telepon" => $karyawan->detailKaryawan->no_telepon ?? "-",
      "alamat" => $karyawan->detailKaryawan->alamat ?? "-",
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


}
