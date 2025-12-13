<?php

namespace App\Http\Controllers;

use App\Models\Request;
use App\Models\RequestItem;
use Inertia\Inertia;

class DashboardPurchasingController extends Controller
{
   public function index()
{
    // Statistik utama boleh tetap seperti ini dulu (opsional nanti dibenahi)
    $stats = [
        'total_requests'      => Request::whereHas('items')->count(),
        'pending_requests'    => Request::whereHas('items')->where('status', 'Pending')->count(),
        'approved_requests'   => Request::whereHas('items')->where('status', 'Approved')->count(),
        'completed_requests'  => Request::whereHas('items')->where('status', 'Completed')->count(),
        'rejected_requests'   => Request::whereHas('items')->where('status', 'Rejected')->count(),
        'total_items'         => RequestItem::count(),
    ];

    $departmentStats = Request::whereHas('items')
        ->with('items') 
        ->orderBy('created_at', 'desc')
        ->get()
        ->map(function ($request) {
            $pendingItems   = $request->items->where('status', 'Pending')->count();
            $approvedItems  = $request->items->where('status', 'Approved')->count();
            $completedItems = $request->items
                                ->whereIn('status', ['Completed', 'Arrived'])
                                ->count();

       return [
    'id' => $request->request_number,
    'name' => $request->request_number,
    'nama_department' => $request->department,
    'total_items' => $request->items->count(),
    'total_requests' => 1,
    'pending_count' => $pendingItems,
    'approved_count' => $approvedItems,
    'completed_count' => $completedItems,

    // 🔥 Tambahkan ini!
    'request_date' => $request->request_date
        ? $request->request_date->toISOString()
        : null,

    'created_at' => $request->created_at->toISOString(),
];



        });

    // Recent requests biarin saja
    $recentRequests = Request::with(['user', 'items'])
        ->whereHas('items')
        ->orderBy('created_at', 'desc')
        ->take(5)
        ->get()
        ->map(function ($request) {
            return [
                'id'            => $request->id,
                'request_number'=> $request->request_number,
                'department'    => $request->department,
                'user_name'     => $request->user->name ?? 'Unknown',
                'status'        => $request->status,
                'request_date'  => $request->request_date->format('d M Y'),
                'items_count'   => $request->items->count(),
                'created_at'    => $request->created_at->diffForHumans(),
            ];
        });

    return Inertia::render('table/dashboard-purchasing', [
        'stats'          => $stats,
        'departments'    => $departmentStats,
        'recentRequests' => $recentRequests,
    ]);
}

public function getDepartmentDetails($departmentId)
{
    // ✅ Convert slug jadi nama asli departemen
    $departmentName = ucwords(str_replace('-', ' ', $departmentId));

    // ✅ HANYA ambil item yang BENAR-BENAR punya request
    $requestItems = RequestItem::whereHas('request') // ✅ FILTER AMAN
        ->where('departemen', $departmentName)
        ->with(['request.user'])
        ->orderBy('created_at', 'desc')
        ->get()
        ->map(function ($item) {
            return [
                'id' => $item->id,
                'request_id' => $item->request_id,
                'request_number' => $item->request->request_number ?? 'Unknown',
                'user_name' => $item->request->user->name ?? 'Unknown',
                'nama_barang' => $item->nama_barang,
                'jumlah_diajukan' => $item->jumlah_diajukan,
                'satuan' => $item->satuan,
                'status' => $item->status,
                'departemen' => $item->departemen,
                'catatan' => $item->catatan,
                'request_date' => optional($item->request->request_date)->format('d M Y') ?? 'Unknown',
                'created_at' => $item->created_at->diffForHumans(),
            ];
        });

    return response()->json([
        'department' => $departmentName,
        'items' => $requestItems,
        'total_items' => $requestItems->count(),
    ]);
}


    // Method untuk mendapatkan statistik real-time
   public function getDashboardStats()
{
    $totalRequests = Request::whereHas('items')->count();
    $totalItems = RequestItem::count();

    $pendingRequests = Request::whereHas('items')->where('status', 'Pending')->count();
    $approvedRequests = Request::whereHas('items')->where('status', 'Approved')->count();
    $completedRequests = Request::whereHas('items')->where('status', 'Completed')->count();
    $rejectedRequests = Request::whereHas('items')->where('status', 'Rejected')->count();

   $departmentStats = Request::whereHas('items')
    ->with('items')
    ->orderBy('created_at', 'desc')
    ->get()
    ->map(function ($request) {

        return [
            'id'              => $request->request_number,
            'name'            => $request->request_number,
            'nama_department' => $request->department,

            'total_items'     => $request->items->count(),
            'total_requests'  => 1,

            'pending_count'   => $request->items->where('status', 'Pending')->count(),
            'approved_count'  => $request->items->where('status', 'Approved')->count(),
            'completed_count' => $request->items->whereIn('status', ['Completed','Arrived'])->count(),

            'request_date' => $request->request_date
                ? \Carbon\Carbon::parse($request->request_date)->toISOString()
                : null,

            // 🔥 DAN INI
            'created_at' => $request->created_at
                ? \Carbon\Carbon::parse($request->created_at)->toISOString()
                : null,
        ];
    });

    return response()->json([
        
        'stats' => [
            
            'total_requests' => $totalRequests,
            'total_items' => $totalItems,
            'pending_requests' => $pendingRequests,
            'approved_requests' => $approvedRequests,
            'completed_requests' => $completedRequests,
            'rejected_requests' => $rejectedRequests,
        ],
 'departments' => $departmentStats,


    ]);
}

}