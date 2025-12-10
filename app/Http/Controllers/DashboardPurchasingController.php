<?php

namespace App\Http\Controllers;

use App\Models\Request;
use App\Models\RequestItem;
use Inertia\Inertia;

class DashboardPurchasingController extends Controller
{
    public function index()
    {
        // ✅ Statistik utama (Cards)
        $stats = [
            'total_requests' => Request::count(),
            'pending_requests' => Request::where('status', 'Pending')->count(),
            'approved_requests' => Request::where('status', 'Approved')->count(),
            'completed_requests' => Request::where('status', 'Completed')->count(),
            'rejected_requests' => Request::where('status', 'Rejected')->count(),
            'total_items' => RequestItem::count(),
        ];

        // ✅ ✅ ✅ DASHBOARD LIST = PER REQUEST (BUKAN PER DEPARTEMEN)
        $departmentStats = Request::select(
                'id',
                'request_number',
                'department',
                'status',
                'created_at'
            )
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($request) {

                $totalItems = RequestItem::where('request_id', $request->id)->count();

                return [
                    'id' => $request->request_number,        // ✅ dipakai untuk URL
                    'name' => $request->request_number,     // ✅ tampilan utama
                    'nama_department' => $request->department,
                    'total_items' => $totalItems,
                    'total_requests' => 1,
                    'pending_count' => $request->status === 'Pending' ? 1 : 0,
                    'approved_count' => $request->status === 'Approved' ? 1 : 0,
                    'completed_count' => $request->status === 'Completed' ? 1 : 0,
                ];
            });

        // ✅ Recent Requests (5 terbaru)
        $recentRequests = Request::with(['user', 'items'])
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get()
            ->map(function ($request) {
                return [
                    'id' => $request->id,
                    'request_number' => $request->request_number,
                    'department' => $request->department,
                    'user_name' => $request->user->name ?? 'Unknown',
                    'status' => $request->status,
                    'request_date' => $request->request_date->format('d M Y'),
                    'items_count' => $request->items->count(),
                    'created_at' => $request->created_at->diffForHumans(),
                ];
            });

        return Inertia::render('table/dashboard-purchasing', [
            'stats' => $stats,
            'departments' => $departmentStats,
            'recentRequests' => $recentRequests,
        ]);
    }


    public function getDepartmentDetails($departmentId)
    {
        $departmentName = ucwords(str_replace('-', ' ', $departmentId));
        
        // PERBAIKAN: Ambil data dari request_items dengan relasi request
        $requestItems = RequestItem::where('departemen', $departmentName)
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
                    'request_date' => $item->request->request_date->format('d M Y') ?? 'Unknown',
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
        $totalRequests = Request::count();
        $totalItems = RequestItem::count();
        
        $pendingRequests = Request::where('status', 'Pending')->count();
        $approvedRequests = Request::where('status', 'Approved')->count();
        $completedRequests = Request::where('status', 'Completed')->count();
        $rejectedRequests = Request::where('status', 'Rejected')->count();

        // Department stats dengan items
        $departmentStats = RequestItem::select('departemen')
            ->selectRaw('count(*) as total_items')
            ->selectRaw('count(distinct request_id) as total_requests')
            ->selectRaw('sum(case when status = "Pending" then 1 else 0 end) as pending_count')
            ->selectRaw('sum(case when status = "Approved" then 1 else 0 end) as approved_count')
            ->selectRaw('sum(case when status = "Completed" then 1 else 0 end) as completed_count')
            ->whereNotNull('departemen')
            ->groupBy('departemen')
            ->get()
            ->map(function ($item) {
                return [
                    'id' => strtolower(str_replace(' ', '-', $item->departemen)),
                    'name' => $item->departemen,
                    'total_requests' => $item->total_requests,
                    'total_items' => $item->total_items,
                    'pending_count' => $item->pending_count,
                    'approved_count' => $item->approved_count,
                    'completed_count' => $item->completed_count,
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
            'departments' => $departmentStats
        ]);
    }
}