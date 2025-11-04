<?php

namespace App\Http\Controllers;

use App\Models\Permission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PermissionController extends Controller
{
    public function index()
    {
        $permissions = Permission::where('user_id', auth()->id())
            ->with('user')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($permission) {
                return [
                    'id' => (string) $permission->id,
                    'type' => $permission->type,
                    'status' => $permission->status,
                    'createdBy' => $permission->user->name ?? 'Unknown',
                    'createdDate' => $permission->created_at ? $permission->created_at->format('Y-m-d') : now()->format('Y-m-d'),
                    'startDate' => $permission->start_date ? $permission->start_date->format('Y-m-d') : null,
                    'endDate' => $permission->end_date ? $permission->end_date->format('Y-m-d') : null,
                    'days' => $permission->days,
                    'sickType' => $permission->sick_type,
                    'notes' => $permission->notes,
                    'date' => $permission->permission_date ? $permission->permission_date->format('Y-m-d') : null,
                    'reason' => $permission->reason,
                    'permissionType' => $permission->permission_type,
                    'time' => $permission->time,
                    'vacationType' => $permission->vacation_type,
                    'location' => $permission->location,
                ];
            });

        return response()->json($permissions);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'type' => 'required|in:sick,permission,vacation',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'sick_type' => 'nullable|in:ringan,sedang,berat',
            'notes' => 'nullable|string',
            'permission_date' => 'nullable|date',
            'reason' => 'nullable|string',
            'permission_type' => 'nullable|in:Tidak hadir,datang terlambat,WFH',
            'vacation_type' => 'nullable|in:Cuti Tahunan,Cuti Bersama,Cuti Sakit,Cuti Maternity',
            'vacation_reason' => 'nullable|string',
            'document' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:2048',
        ]);

        // Validasi khusus untuk datang terlambat
        if ($request->permission_type === 'datang terlambat' && 
            $request->permission_date === now()->format('Y-m-d')) {
            return response()->json([
                'message' => 'Izin datang terlambat tidak dapat dibuat pada hari yang sama'
            ], 422);
        }

        // Calculate days
        if ($request->start_date && $request->end_date) {
            $start = new \DateTime($request->start_date);
            $end = new \DateTime($request->end_date);
            $validated['days'] = $end->diff($start)->days + 1;
        }

        // Handle file upload
        if ($request->hasFile('document')) {
            $path = $request->file('document')->store('permissions', 'public');
            $validated['document_path'] = $path;
        }

        $validated['user_id'] = auth()->id();
        $validated['status'] = 'pending';
        $validated['location'] = $request->type === 'vacation' ? 'TBD' : 'Online';
        
        // Set time for permission
        if ($request->type === 'permission') {
            $validated['time'] = now()->format('H:00') . ' - ' . now()->addHour()->format('H:00');
        }

        $permission = Permission::create($validated);
        $permission->load('user');

        return response()->json([
            'message' => 'Permission berhasil dibuat',
            'permission' => [
                'id' => (string) $permission->id,
                'type' => $permission->type,
                'status' => $permission->status,
                'createdBy' => $permission->user->name ?? 'Unknown',
                'createdDate' => $permission->created_at->format('Y-m-d'),
                'startDate' => $permission->start_date ? $permission->start_date->format('Y-m-d') : null,
                'endDate' => $permission->end_date ? $permission->end_date->format('Y-m-d') : null,
                'days' => $permission->days,
                'sickType' => $permission->sick_type,
                'notes' => $permission->notes,
                'date' => $permission->permission_date ? $permission->permission_date->format('Y-m-d') : null,
                'reason' => $permission->reason,
                'permissionType' => $permission->permission_type,
                'time' => $permission->time,
                'vacationType' => $permission->vacation_type,
                'location' => $permission->location,
            ]
        ], 201);
    }

    public function destroy($id)
    {
        $permission = Permission::where('user_id', auth()->id())->findOrFail($id);
        
        if ($permission->document_path) {
            Storage::disk('public')->delete($permission->document_path);
        }
        
        $permission->delete();

        return response()->json(['message' => 'Permission berhasil dihapus']);
    }
}