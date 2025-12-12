<?php

namespace App\Http\Controllers;

use App\Models\Announcement;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class AnnouncementController extends Controller
{
  public function index()
  {
    $data = Announcement::orderBy('created_at', 'desc')->paginate(5);

    return Inertia::render('admin/Announcement', [
      'announcements' => $data
    ]);
  }

  public function store(Request $request)
  {
    $request->validate([
      'title' => 'required',
      'kategori' => 'required',
      'isi' => 'required',
    ]);

    Announcement::create([
      'title' => $request->title,
      'kategori' => $request->kategori,
      'isi' => $request->isi,
      'created_by' => Auth::user()->id_karyawan,
    ]);

    return back()->with('success', 'Pengumuman berhasil dibuat.');
  }

  public function update(Request $request, $id)
  {
    $request->validate([
      'title' => 'required',
      'kategori' => 'required',
      'isi' => 'required',
    ]);

    $announcement = Announcement::findOrFail($id);

    $announcement->update([
      'title' => $request->title,
      'kategori' => $request->kategori,
      'isi' => $request->isi,
    ]);

    return back()->with('success', 'Pengumuman berhasil diperbarui.');
  }

  public function destroy($id)
  {
    Announcement::findOrFail($id)->delete();

    return back()->with('success', 'Pengumuman berhasil dihapus.');
  }

}
