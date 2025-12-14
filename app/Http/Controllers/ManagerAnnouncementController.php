<?php
// app/Http\Controllers/AnnouncementController.php

namespace App\Http\Controllers;

use App\Models\Announcement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class ManagerAnnouncementController extends Controller
{
    // GET: Halaman utama pengumuman
    public function index()
    {
        try {
            // Query langsung ke database dengan join untuk mendapatkan nama karyawan
            $announcements = DB::table('announcement as a')
                ->leftJoin('karyawan as k', 'a.created_by', '=', 'k.id_karyawan')
                ->leftJoin('detail_karyawan as dk', 'k.id_karyawan', '=', 'dk.id_karyawan')
                ->select(
                    'a.id',
                    'a.title',
                    'a.kategori',
                    'a.isi as content',
                    'a.link_gambar as image',
                    'a.created_by',
                    'a.created_at',
                    DB::raw("DATE_FORMAT(a.created_at, '%H:%i') as time"),
                    DB::raw("DATE_FORMAT(a.created_at, '%Y-%m-%d') as date"),
                    DB::raw("SUBSTRING(a.isi, 1, 100) as description"),
                    DB::raw("COALESCE(dk.nama, 'Admin') as created_by_name")
                )
                ->orderBy('a.created_at', 'desc')
                ->get()
                ->map(function ($announcement) {
                    return [
                        'id' => $announcement->id,
                        'title' => $announcement->title,
                        'category' => $announcement->kategori,
                        'content' => $announcement->content,
                        'time' => $announcement->time ?? '00:00',
                        'date' => $announcement->created_at,
                        'image' => $announcement->image,
                        'description' => $announcement->description ? $announcement->description . '...' : '',
                        'created_by' => $announcement->created_by_name,
                    ];
                });

            return Inertia::render('announcement/page', [
                'announcements' => $announcements
            ]);

        } catch (\Exception $e) {
            return Inertia::render('announcement/page', [
                'announcements' => [],
                'error' => 'Gagal memuat data pengumuman'
            ]);
        }
    }

    // POST: Simpan pengumuman baru
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'category' => 'required|string|in:Event,Vacation,News,Announcement',
                'content' => 'required|string',
            ]);

            // Ambil user ID karyawan dari user yang login
            $userId = Auth::id();
            $idKaryawan = null;

            if ($userId) {
                // Cari id_karyawan dari user
                $user = DB::table('users')->where('id', $userId)->first();
                if ($user) {
                    $idKaryawan = $user->id_karyawan;
                }
            }

            // Jika tidak ada id_karyawan, gunakan default
            if (!$idKaryawan) {
                $idKaryawan = 'ID10571'; // Default admin
            }

            // Simpan ke database
            $id = DB::table('announcement')->insertGetId([
                'title' => $validated['title'],
                'kategori' => $validated['category'],
                'isi' => $validated['content'],
                'link_gambar' => $request->input('image', null),
                'created_by' => $idKaryawan,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            // Ambil data yang baru dibuat
            $announcement = DB::table('announcement')
                ->where('id', $id)
                ->first();

            return response()->json([
                'success' => true,
                'message' => 'Pengumuman berhasil ditambahkan!',
                'data' => [
                    'id' => $announcement->id,
                    'title' => $announcement->title,
                    'category' => $announcement->kategori,
                    'content' => $announcement->isi,
                    'time' => date('H:i', strtotime($announcement->created_at)),
                    'date' => $announcement->created_at,
                    'image' => $announcement->link_gambar,
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal menambahkan pengumuman: ' . $e->getMessage()
            ], 500);
        }
    }

    // GET: Ambil semua pengumuman untuk API
    public function getAnnouncements(Request $request)
    {
        $query = DB::table('announcement')
            ->select(
                'id',
                'title',
                'kategori as category',
                'isi as content',
                'link_gambar as image',
                'created_at',
                DB::raw("DATE_FORMAT(created_at, '%H:%i') as time"),
                DB::raw("DATE_FORMAT(created_at, '%Y-%m-%d') as date_only"),
                DB::raw("SUBSTRING(isi, 1, 100) as description")
            )
            ->orderBy('created_at', 'desc');

        // Filter berdasarkan tanggal
        if ($request->has('filter') && $request->filter !== 'all') {
            $filter = $request->filter;
            $now = now();

            switch ($filter) {
                case 'week':
                    $query->where('created_at', '>=', $now->subWeek());
                    break;
                case 'month':
                    $query->where('created_at', '>=', $now->subMonth());
                    break;
                case '6months':
                    $query->where('created_at', '>=', $now->subMonths(6));
                    break;
                case 'year':
                    $query->where('created_at', '>=', $now->subYear());
                    break;
            }
        }

        $announcements = $query->get()->map(function ($announcement) {
            return [
                'id' => $announcement->id,
                'title' => $announcement->title,
                'category' => $announcement->category,
                'content' => $announcement->content,
                'time' => $announcement->time ?? '00:00',
                'date' => $announcement->created_at,
                'image' => $announcement->image,
                'description' => $announcement->description ? $announcement->description . '...' : '',
            ];
        });

        return response()->json($announcements);
    }

    // GET: Detail pengumuman
    public function show($id)
    {
        $announcement = DB::table('announcement as a')
            ->leftJoin('karyawan as k', 'a.created_by', '=', 'k.id_karyawan')
            ->leftJoin('detail_karyawan as dk', 'k.id_karyawan', '=', 'dk.id_karyawan')
            ->select(
                'a.id',
                'a.title',
                'a.kategori as category',
                'a.isi as content',
                'a.link_gambar as image',
                'a.created_at',
                DB::raw("DATE_FORMAT(a.created_at, '%H:%i') as time"),
                DB::raw("COALESCE(dk.nama, 'Admin') as created_by_name")
            )
            ->where('a.id', $id)
            ->first();

        if (!$announcement) {
            return response()->json([
                'success' => false,
                'message' => 'Pengumuman tidak ditemukan'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => [
                'id' => $announcement->id,
                'title' => $announcement->title,
                'category' => $announcement->category,
                'content' => $announcement->content,
                'time' => $announcement->time ?? '00:00',
                'date' => $announcement->created_at,
                'image' => $announcement->image,
                'created_by' => $announcement->created_by_name,
            ]
        ]);
    }

    // DELETE: Hapus pengumuman
    public function destroy($id)
    {
        try {
            $deleted = DB::table('announcement')->where('id', $id)->delete();

            if ($deleted) {
                return response()->json([
                    'success' => true,
                    'message' => 'Pengumuman berhasil dihapus!'
                ]);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Pengumuman tidak ditemukan'
                ], 404);
            }

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal menghapus pengumuman'
            ], 500);
        }
    }
}