<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Absensi;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class AbsensiController extends Controller
{
    public function store(Request $request)
    {
        try {
            // Validasi data
            $validated = $request->validate([
                'tipe_absen' => 'required|in:masuk,pulang',
                'waktu_absen' => 'required|string',
                'lokasi' => 'required|string',
                'link_gambar' => 'required|string',
                'device_info' => 'required|string',
                'ip_address' => 'required|ip'
            ]);

            // Konversi tipe_absen
            $tipeAbsen = strtoupper($validated['tipe_absen']) === 'MASUK' ? 'DATANG' : 'BALIK';

            // Konversi waktu
            $waktuAbsen = date('Y-m-d H:i:s', strtotime($validated['waktu_absen']));

            // Simpan gambar
            $imagePath = $this->saveBase64Image($validated['link_gambar']);

            // Insert langsung ke detail_absen
            $absensi = Absensi::create([
                'id_absensi' => Auth::id(),
                'tipe_absen' => $tipeAbsen,
                'waktu_absen' => $waktuAbsen,
                'lokasi' => $validated['lokasi'],
                'link_gambar' => $imagePath,
                'device_info' => $validated['device_info'],
                'ip_address' => $validated['ip_address']
            ]);

               return redirect()->back()->with('success', 'Absensi berhasil dicatat!');

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal menyimpan absensi: ' . $e->getMessage()
            ], 500);
        }
    }

    private function saveBase64Image($base64Image)
    {
        if (preg_match('/^data:image\/(\w+);base64,/', $base64Image, $type)) {
            $image = substr($base64Image, strpos($base64Image, ',') + 1);
            $type = strtolower($type[1]);

            if (!in_array($type, ['jpg', 'jpeg', 'png', 'gif'])) {
                throw new \Exception('Format gambar tidak didukung');
            }

            $image = base64_decode($image);
            if ($image === false) {
                throw new \Exception('Base64 decode failed');
            }
        } else {
            throw new \Exception('Format base64 tidak valid');
        }

        $fileName = 'absensi_' . Auth::id() . '_' . time() . '.' . $type;
        $filePath = 'absensi/' . $fileName;

        Storage::disk('public')->put($filePath, $image);

        return $filePath;
    }

    public function getRiwayat()
    {
        $absensi = Absensi::where('id_absensi', Auth::id())
            ->orderBy('waktu_absen', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $absensi
        ]);
    }
}