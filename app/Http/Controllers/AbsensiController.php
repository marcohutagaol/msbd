<?php

namespace App\Http\Controllers;

use App\Models\Karyawan;
use App\Models\User;
use Illuminate\Http\Request;
use App\Models\Absen;
use Illuminate\Support\Facades\Auth;
use Cloudinary\Cloudinary;

class AbsensiController extends Controller
{
  public function store(Request $request)
{
    try {

        // =============================
        // VALIDASI (status_absen dihapus)
        // =============================
        $validated = $request->validate([
            'foto' => 'required|image|mimes:jpg,jpeg,png|max:2048',
            'tipe_absen' => 'required|in:masuk,pulang',
            'waktu_absen' => 'required|string',
            'lokasi' => 'required|string',
            'device_info' => 'required|string',
            'ip_address' => 'required|string'
        ]);

        // =============================
        // CEK FILE FOTO
        // =============================
        if (!$request->hasFile('foto')) {
            return response()->json([
                'success' => false,
                'message' => 'Tidak ada file foto dikirim ke server.'
            ], 400);
        }

        // =============================
        // UPLOAD KE CLOUDINARY
        // =============================
        try {
            $cloudinary = new Cloudinary([
                'cloud' => [
                    'cloud_name' => env('CLOUDINARY_CLOUD_NAME'),
                    'api_key' => env('CLOUDINARY_KEY'),
                    'api_secret' => env('CLOUDINARY_SECRET'),
                ],
                'url' => ['secure' => true]
            ]);

            $uploadResult = $cloudinary->uploadApi()->upload(
                $request->file('foto')->getRealPath(),
                ['folder' => 'absensi_kawaland']
            );

            $imageUrl = $uploadResult['secure_url'];

        } catch (\Exception $e) {
            \Log::error('Cloudinary upload gagal:', [$e->getMessage()]);
            return response()->json([
                'success' => false,
                'message' => 'Upload ke Cloudinary gagal: ' . $e->getMessage(),
            ], 500);
        }

        // =============================
        // AMBIL DATA KARYAWAN
        // =============================
        $idKaryawan = Auth::user()->id_karyawan; // dari tabel users

        if (!$idKaryawan) {
            return response()->json([
                'success' => false,
                'message' => 'User tidak memiliki ID karyawan.'
            ], 404);
        }

        $karyawan = Karyawan::where('id_karyawan', $idKaryawan)->first();

        if (!$karyawan) {
            return response()->json([
                'success' => false,
                'message' => 'Data karyawan tidak ditemukan.'
            ], 404);
        }

        // =============================
        // GENERATE DATA ABSENSI
        // =============================
        $isMasuk = strtoupper($validated['tipe_absen']) === 'MASUK';

        $statusAbsen = $isMasuk ? 'HADIR' : 'PULANG';

        // =============================
        // SIMPAN ABSENSI
        // =============================
        Absen::create([
            'id_karyawan' => $idKaryawan,
            'kode_department' => $karyawan->kode_department,
            'tanggal_absen' => date('Y-m-d'),
            'tipe_absen' => $isMasuk ? 'DATANG' : 'BALIK',
            'jam_datang' => date('Y-m-d H:i:s', strtotime($validated['waktu_absen'])),
            'lokasi_datang' => $validated['lokasi'],
            'link_gambar_datang' => $imageUrl,   // ✔ masuk ke DB
            'status_absen' => $statusAbsen,       // ✔ otomatis
            'device_info' => $validated['device_info'],
            'ip_address' => $validated['ip_address']
        ]);

        return response()->json([
            'success' => true,
            'url' => $imageUrl
        ]);

    } catch (\Exception $e) {

        return response()->json([
            'success' => false,
            'message' => 'Gagal menyimpan absensi: ' . $e->getMessage()
        ], 500);
    }
}



  public function getRiwayat()
  {
    $absensi = Absen::where('id_absensi', Auth::id())
      ->orderBy('waktu_absen', 'desc')
      ->get();

    return response()->json([
      'success' => true,
      'data' => $absensi
    ]);
  }
}
