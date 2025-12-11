<?php

namespace App\Http\Controllers;

use App\Models\Request;
use App\Models\RequestItem;
use Inertia\Inertia;

class ReportItemController extends Controller
{
  public function index()
  {
    // 1. Total Permintaan Barang
    $totalOrders = Request::count();

    // 2. Total Barang Dipesan
    $totalItems = RequestItem::sum('jumlah_diajukan');


    // 3. Departemen Terbanyak
    $topDepartment = Request::all()
      ->groupBy('department')
      ->sortByDesc(fn($group) => $group->count())
      ->keys()
      ->first();


    // 4. Barang Terpopuler
    $mostOrderedItem = RequestItem::all()
      ->groupBy('nama_barang')
      ->map(fn($i) => $i->sum('jumlah_diajukan'))
      ->sortDesc()
      ->keys()
      ->first();


    // 5. Rekap Bulanan (totalOrders + totalItems per bulan)
    $monthly = RequestItem::all()
      ->groupBy(fn($i) => $i->created_at->format('M'))
      ->map(function ($group) {
        return [
          'month' => $group->first()->created_at->format('M'),
          'totalOrders' => $group->count(),
          'totalItems' => $group->sum('jumlah_diajukan'),
        ];
      })
      ->values();


    // 6. Barang paling sering dipesan (Tabel)
    $popularItems = RequestItem::all()
      ->groupBy('nama_barang')
      ->map(function ($group) {
        return [
          'name' => $group->first()->nama_barang,
          'category' => '-', // Tidak ada field kategori
          'totalOrders' => $group->sum('jumlah_diajukan'),
          'avgMonthly' => round($group->sum('jumlah_diajukan') / 12, 1),
          'lastOrder' => $group->max('created_at')->format('d M Y'),
        ];
      })
      ->sortByDesc('totalOrders')
      ->values();


    // 7. Departemen Table (GroupBy ORM)
    $departments = Request::with('items')
      ->get()
      ->groupBy('department')
      ->map(function ($group) {
        $pending = $group->where('status', 'Pending')->count();
        $completed = $group->where('status', 'Approved')->count();

        return [
          'name' => $group->first()->department,
          'manager' => '-', // kalau ada manager tinggal tambahkan relasi
          'totalOrders' => $group->count(),
          'pending' => $pending,
          'completed' => $completed,
          'color' => '#4789A8',
        ];
      })
      ->values();

    $lastUpdate = RequestItem::latest('updated_at')->value('updated_at');


    return Inertia::render('admin/ReportItem', [
      'stats' => [
        'totalOrders' => $totalOrders,
        'totalItems' => $totalItems,
        'topDepartment' => $topDepartment,
        'mostOrderedItem' => $mostOrderedItem,
      ],
      'monthly' => $monthly,
      'popularItems' => $popularItems,
      'departments' => $departments,
      'startDate' => $startDate ?? now()->startOfYear()->toDateString(),
      'endDate' => $endDate ?? now()->endOfYear()->toDateString(),
      'lastUpdate'   => $lastUpdate ? $lastUpdate->format('Y-m-d H:i:s') : null,
    ]);
  }
}
