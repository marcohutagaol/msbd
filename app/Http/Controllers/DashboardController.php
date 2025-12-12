<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        // ✅ AMBIL DEPARTEMEN DARI TABEL KARYAWAN + DEPARTMENT
        $department = DB::table('karyawan')
            ->join('department', 'karyawan.kode_department', '=', 'department.kode_department')
            ->where('karyawan.id_karyawan', $user->id_karyawan)
            ->value('department.nama_department');

        return Inertia::render('dashboard', [
            'user' => [
                'id'          => $user->id,
                'name'        => $user->name,
                'email'       => $user->email,
                'id_karyawan' => $user->id_karyawan,
                'departemen'  => $department ?? 'Belum Isi', 
                'role'        => $user->role,
                'created_at' => $user->created_at->format('d M Y'),
            ]
        ]);
    }
}
