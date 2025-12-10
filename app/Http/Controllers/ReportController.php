<?php

namespace App\Http\Controllers;

use App\Models\Report;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReportController extends Controller
{
  public function index()
  {
    $reports = Report::orderBy('report_date', 'desc')->paginate(5);
    $totalReports = Report::count();
    $totalDepartments = Report::distinct('department')->count('department');

    return Inertia::render('admin/Report', [
      'reports' => $reports,
      'totalReports' => $totalReports,
      'totalDepartments' => $totalDepartments
    ]);
  }

  public function destroy($id)
  {
    $report = Report::findOrFail($id);
    $report->delete();

    return back()->with('success', 'Laporan berhasil dihapus');
  }
}
