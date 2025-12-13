<?php

namespace App\Http\Controllers;

use App\Models\Karyawan;
use App\Models\User;
use Illuminate\Http\Request;
use App\Models\Absen;
use Illuminate\Support\Facades\Auth;
use Cloudinary\Cloudinary;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;
use App\Models\AbsensiGenerate;



class AbsensiController extends Controller
{
public function store(Request $request)
{
    try {

        // =============================
        // VALIDASI DATA
        // =============================
        $validator = Validator::make($request->all(), [
            'foto' => 'required|image|mimes:jpg,jpeg,png|max:2048',
            'tipe_absen' => 'required|in:masuk,pulang',
            'id_absensi_generate' => 'required|integer', // ★ WAJIB ADA
            'waktu_absen' => 'required|string',
            'lokasi' => 'required|string',
            'device_info' => 'required|string',
            'ip_address' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $validated = $validator->validated();


        // =============================
        // UPLOAD CLOUDINARY
        // =============================
        if (!$request->hasFile('foto')) {
            return response()->json(['success' => false, 'message' => 'Tidak ada foto'], 400);
        }

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


        // =============================
        // AMBIL DATA KARYAWAN
        // =============================
        $idKaryawan = Auth::user()->id_karyawan;

        $karyawan = Karyawan::where('id_karyawan', $idKaryawan)->first();


        // =============================
        // AMBIL DATA ABSENSI GENERATE
        // =============================
        $generate = AbsensiGenerate::find($validated['id_absensi_generate']);

        if (!$generate) {
            return response()->json([
                'success' => false,
                'message' => 'ID absensi generate tidak ditemukan.'
            ], 404);
        }

        $jamMasukDefault = Carbon::parse($generate->jam_masuk_default);
        $jamKeluarDefault = Carbon::parse($generate->jam_keluar_default);

        // Total menit kerja default → jadi 100%
        $totalMenitKerja = $jamKeluarDefault->diffInMinutes($jamMasukDefault);


        // =============================
        // HITUNG TERLAMBAT
        // =============================
        $jamAbsen = Carbon::parse($validated['waktu_absen']);
        $isLate = $jamAbsen->greaterThan($jamMasukDefault);
        $statusAbsen = $isLate ? 'TERLAMBAT' : 'HADIR';


        // =============================
        // SIMPAN ABSENSI
        // =============================
        Absen::create([
            'id_karyawan' => $idKaryawan,
            'kode_department' => $karyawan->kode_department,
            'tanggal_absen' => date('Y-m-d'),
            'tipe_absen' => strtoupper($validated['tipe_absen']) === 'MASUK' ? 'DATANG' : 'BALIK',

            // waktu absen
            'jam_datang' => $jamAbsen,

            // lokasi + foto
            'lokasi_datang' => $validated['lokasi'],
            'link_gambar_datang' => $imageUrl,

            // status hadir / terlambat
            'status_absen' => $statusAbsen,

            // sistem informasi
            'device_info' => $validated['device_info'],
            'ip_address' => $validated['ip_address'],

            // tambahkan default bekerja
            'total_menit_kerja_default' => $totalMenitKerja,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Absensi berhasil disimpan',
            'foto' => $imageUrl,
            'terlambat' => $isLate,
            'total_menit_kerja_default' => $totalMenitKerja
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
