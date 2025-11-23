<?php
// File: app/Http/Controllers/RequestManagementController.php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\Request as RequestModel;
use App\Models\RequestItem;
use App\Models\Purchase;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RequestManagementController extends Controller
{
    /**
     * Mapping kode department ke nama department
     */
    private function getDepartmentMapping()
    {
        return [
            'FNB' => 'Food & Beverage Department',
            'FO' => 'Front Office Department',
            'HK' => 'Housekeeping Department',
            'LS' => 'Landscape Department',
            'ENG' => 'Engineering & Maintenance Department',
            'SEC' => 'Security Department',
            'ACC' => 'Accounting & Administration Department',
            'MKT' => 'Marketing Department'
        ];
    }

    /**
     * Get departments with real-time request statistics
     */
    public function getDepartmentsStats()
    {
        try {
            $departments = Department::all();
            $departmentMapping = $this->getDepartmentMapping();

            $statsData = $departments->map(function ($dept) use ($departmentMapping) {
                $departmentName = $departmentMapping[$dept->kode_department] ?? $dept->nama_department;

                // Count requests per status
                $requests = RequestModel::where('department', $departmentName)
                    ->selectRaw('status, COUNT(*) as count')
                    ->groupBy('status')
                    ->get()
                    ->keyBy('status');

                $completed = (int)($requests['Completed']->count ?? 0) + (int)($requests['Arrived']->count ?? 0);
                $pending = (int)($requests['Pending']->count ?? 0) + (int)($requests['Approved']->count ?? 0);
                $canceled = (int)($requests['Canceled']->count ?? 0);
                $rejected = (int)($requests['Rejected']->count ?? 0);
                $totalRequest = $completed + $pending + $canceled + $rejected;

                // Calculate total cost from purchases
                $totalCost = RequestModel::where('department', $departmentName)
                    ->join('purchases', 'requests.id', '=', 'purchases.request_id')
                    ->sum('purchases.total_harga') ?? 0;

                // Calculate growth
                $currentWeekTotal = RequestModel::where('department', $departmentName)
                    ->whereDate('created_at', '>=', now()->subDays(7))
                    ->count();

                $previousWeekTotal = RequestModel::where('department', $departmentName)
                    ->whereDate('created_at', '>=', now()->subDays(14))
                    ->whereDate('created_at', '<', now()->subDays(7))
                    ->count();

                $growth = $previousWeekTotal > 0
                    ? (int)(((($currentWeekTotal - $previousWeekTotal) / $previousWeekTotal) * 100))
                    : ($currentWeekTotal > 0 ? 100 : 0);

                return [
                    'id_department' => $dept->id_department,
                    'kode_department' => $dept->kode_department,
                    'nama_department' => $departmentName,
                    'jumlah_pegawai' => $dept->jumlah_pegawai,
                    'totalRequest' => $totalRequest,
                    'completed' => $completed,
                    'pending' => $pending,
                    'canceled' => $canceled,
                    'rejected' => $rejected,
                    'growth' => $growth,
                    'isPositive' => $growth >= 0,
                    'totalCost' => (float)$totalCost,
                ];
            });

            return response()->json($statsData);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Get all request items for a specific department
     */
    public function getRequestsByDepartment($kodeDepartment)
    {
        try {
            $departmentMapping = $this->getDepartmentMapping();
            $departmentName = $departmentMapping[$kodeDepartment] ?? $kodeDepartment;

            // Get all request items for this department
            $allItems = RequestItem::where('departemen', $departmentName)
                ->orderBy('created_at', 'desc')
                ->get()
                ->map(function ($item) {
                    return [
                        'id' => $item->id,
                        'request_id' => $item->request_id,
                        'nama_barang' => $item->nama_barang,
                        'jumlah_diajukan' => $item->jumlah_diajukan,
                        'jumlah_disetujui' => $item->jumlah_disetujui,
                        'status' => $item->status,
                        'satuan' => $item->satuan,
                        'departemen' => $item->departemen,
                        'catatan' => $item->catatan,
                        'created_at' => $item->created_at->format('Y-m-d'),
                    ];
                });

            // Get total cost
            $totalCost = RequestModel::where('department', $departmentName)
                ->join('purchases', 'requests.id', '=', 'purchases.request_id')
                ->sum('purchases.total_harga') ?? 0;

            // Get latest request for reference
            $latestRequest = RequestModel::where('department', $departmentName)
                ->orderBy('request_date', 'desc')
                ->first();

            // Get weekly chart data
            $chartData = $this->getWeeklyChartData($departmentName);

            // Count by status for this department
            $completedItems = $allItems->where('status', 'Completed')->count() + $allItems->where('status', 'Arrived')->count();
            $pendingItems = $allItems->where('status', 'Pending')->count() + $allItems->where('status', 'Approved')->count();

            return response()->json([
                'request_number' => $latestRequest?->request_number ?? 'REQ-' . now()->format('Ymd') . '-001',
                'status' => $latestRequest?->status ?? 'Pending',
                'request_date' => $latestRequest?->request_date ?? now()->format('Y-m-d'),
                'totalItems' => $allItems->count(),
                'totalCost' => (float)$totalCost,
                'completed' => $completedItems,
                'pending' => $pendingItems,
                'items' => $allItems,
                'chartData' => $chartData,
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Get weekly chart data for department
     */
    private function getWeeklyChartData($departmentName)
    {
        $chartData = [];
        $days = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];

        for ($i = 6; $i >= 0; $i--) {
            $date = now()->subDays($i);
            $dayName = $days[$date->dayOfWeek] ?? $days[0];
            
            $count = RequestModel::where('department', $departmentName)
                ->whereDate('created_at', $date->format('Y-m-d'))
                ->count();

            $chartData[] = [
                'day' => $dayName,
                'date' => $date->format('d M'),
                'total' => $count,
            ];
        }

        return $chartData;
    }

    /**
     * Show request management dashboard
     */
    public function index()
    {
        return Inertia::render('RequestManagement');
    }

    /**
     * Show request detail page for specific department
     */
    public function showDetail($kodeDepartment)
    {
        $departmentMapping = $this->getDepartmentMapping();
        $departmentName = $departmentMapping[$kodeDepartment] ?? $kodeDepartment;

        $department = Department::where('kode_department', $kodeDepartment)->first();

        if (!$department) {
            return redirect()->back()->with('error', 'Department not found');
        }

        return Inertia::render('RequestDetail', [
            'departmentCode' => $kodeDepartment,
            'departmentName' => $departmentName,
        ]);
    }
}