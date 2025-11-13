<?php

namespace App\Http\Controllers;

use App\Models\Absensi;
use App\Models\Inventory;
use App\Models\Karyawan;
use App\Models\Permission;
use App\Models\RequestDetail;
use App\Models\RequestItem;
use Carbon\Carbon;
use DB;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
  public function dashboard()
  {
    $hadir = Absensi::whereDate('waktu_absen', today())->count();
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
        // Ambil absensi HARI INI berdasarkan id_karyawan
        $absen = Absensi::where('id_absensi', $karyawan->id_karyawan)
          ->whereDate('waktu_absen', today())
          ->first();

        $time = $absen && $absen->waktu_absen
          ? Carbon::parse($absen->waktu_absen)->format('H:i')
          : '';

        return [
          'id' => $karyawan->id_karyawan,
          'name' => $karyawan->nama,
          'department' => $karyawan->department->nama_department,
          'time' => $time,
          'status' => $absen->tipe_absen ?? '',
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

  public function absensi()
  {
    $today = now()->toDateString();

    // === DETAIL HARIAN ===
    $employees = Karyawan::with(['department'])
      ->get()
      ->map(function ($karyawan) use ($today) {
        // Ambil data absen berdasarkan karyawan & tanggal hari ini
        $absenMasuk = Absensi::where('id_absensi', $karyawan->id_karyawan)
          ->where('tipe_absen', 'DATANG')
          ->whereDate('waktu_absen', $today)
          ->first();

        $absenKeluar = Absensi::where('id_absensi', $karyawan->id_karyawan)
          ->where('tipe_absen', 'BALIK')
          ->whereDate('waktu_absen', $today)
          ->first();

        // Format waktu absen (jam:menit)
        $masuk = $absenMasuk && $absenMasuk->waktu_absen
          ? Carbon::parse($absenMasuk->waktu_absen)->format('H:i')
          : '-';

        $keluar = $absenKeluar && $absenKeluar->waktu_absen
          ? Carbon::parse($absenKeluar->waktu_absen)->format('H:i')
          : '-';

        // Tentukan status absensi
        $status = $absenMasuk ? 'Hadir' : 'Tanpa Keterangan';

        return [
          'id' => $karyawan->id_karyawan,
          'name' => $karyawan->nama,
          'department' => $karyawan->department->nama_department ?? '-',
          'jam_kerja' => '08.00 - 12.00',
          'absen_masuk' => $masuk,
          'absen_keluar' => $keluar,
          'status' => $status,
        ];
      });

    // === REKAP MINGGUAN ===
    $weeklyData = collect(range(0, 6))->map(function ($i) {
      $date = now()->startOfWeek()->addDays($i);

      $hadir = Absensi::whereDate('waktu_absen', $date)
        ->where('tipe_absen', 'DATANG')
        ->count();

      $izin = Permission::where('status', 'approved')
        ->whereDate('created_at', $date)
        ->count();

      $sakit = Permission::where('reason', 'like', '%sakit%')
        ->whereDate('created_at', $date)
        ->count();

      $total = Karyawan::count();
      $tanpa = max($total - ($hadir + $izin + $sakit), 0);

      return [
        'day' => $date->translatedFormat('D'), // contoh: Sen, Sel, Rab
        'date' => $date->format('d M'),
        'hadir' => $hadir,
        'izin' => $izin,
        'sakit' => $sakit,
        'tanpa' => $tanpa,
      ];
    });

    return Inertia::render('admin/Absensi', [
      'absensiData' => $employees,
      'weeklyData' => $weeklyData,
    ]);
  }

  public function inventory()
  {
    $inventories = Inventory::with('department')
      ->get()
      ->map(function ($inventory) {

        return [
          'id' => $inventory->id,
          'nama_barang' => $inventory->nama_barang,
          'department' => $inventory->department->nama_department ?? '-',
          'stok' => $inventory->stok,

        ];
      });


    return Inertia::render('admin/Inventory', [
      'inventories' => $inventories
    ]);
  }

  public function requestItem()
  {
    $requests = RequestItem::with(['department', 'detail'])
      ->get()
      ->groupBy('kode_department')
      ->map(function ($group) {
        // Ambil semua detail dari request_items
        $detail = $group->flatMap->detail;

        return [
          'name' => $group->first()->department->nama_department ?? 'Unknown',
          'totalRequest' => $group->count(),
          'completed' => $detail->where('status', 'Completed')->count(),
          'pending' => $detail->where('status', 'Pending')->count(),
          'canceled' => $detail->where('status', 'Rejected')->count(),
          'growth' => rand(-5, 10),
          'isPositive' => rand(0, 1) == 1,
          'totalCost' => $detail->sum('total_cost') ?? 0,
        ];
      })
      ->sortByDesc('totalRequest')
      ->values();

    return inertia('admin/RequestItem', [
      'departments' => $requests,
    ]);
  }



}
