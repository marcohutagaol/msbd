<?php

namespace App\Http\Controllers;

use App\Models\RequestItem;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
use Inertia\Inertia;

class LogRequestController extends Controller
{
  public function index(Request $request)
  {
    $query = RequestItem::with(['request.user'])
      ->orderBy('created_at', 'desc');

    // FILTER SEARCH
    if ($request->search) {
      $query->where(function ($q) use ($request) {
        $q->where('nama_barang', 'like', '%' . $request->search . '%')
          ->orWhere('kode_barang', 'like', '%' . $request->search . '%')
          ->orWhere('satuan', 'like', '%' . $request->search . '%');
      });
    }

    // FILTER TYPE
    if ($request->type) {
      $typeMap = [
        'add' => ['Pending'],
        'edit' => ['Approved', 'Completed'],
        'delete' => ['Rejected']
      ];

      if (isset($typeMap[$request->type])) {
        $query->whereIn('status', $typeMap[$request->type]);
      }
    }

    // FIX FILTER USER (normalisasi role)
    if ($request->user) {
      $query->whereHas('request.user', function ($q) use ($request) {
        $q->whereRaw('LOWER(role) = ?', [strtolower($request->user)]);
      });
    }

    // PAGINATION
    $items = $query->paginate(10)->withQueryString();

    // MAP LOG
    $logs = collect($items->items())->map(function ($item) {
      $type = match ($item->status) {
        'Pending' => 'Add',
        'Approved', 'Completed' => 'Edit',
        'Rejected' => 'Delete',
        default => 'Edit'
      };

      return [
        'log_id' => 'LOG-' . str_pad($item->id, 6, '0', STR_PAD_LEFT),
        'tanggal' => $item->created_at->format('d M Y'),
        'jam' => $item->created_at->format('H:i:s'),
        'user' => $item->request->user->name ?? 'Unknown User',
        'email' => $item->request->user->email ?? '-',
        'type' => $type,
        'request_id' => $item->request->request_number ?? '-',
        'detail' => $item->nama_barang . ' - ' . $item->jumlah_diajukan . ' ' . $item->satuan,
        'status' => $item->status,
      ];
    });

    // STATISTICS
    $all = RequestItem::all();

    return Inertia::render('admin/LogRequest', [
      'logs' => [
        'data' => $logs,
        'current_page' => $items->currentPage(),
        'last_page' => $items->lastPage(),
        'total' => $items->total(),
        'from' => $items->firstItem(),
        'to' => $items->lastItem(),
      ],
      'stats' => [
        'total' => $all->count(),
        'add' => $all->where('status', 'Pending')->count(),
        'edit' => $all->whereIn('status', ['Approved', 'Completed'])->count(),
        'delete' => $all->where('status', 'Rejected')->count(),
      ],
      'role' => $item->request->user->role ?? '-',
    ]);
  }

  public function exportPDF()
  {
    $items = RequestItem::with(['request.user'])
      ->orderBy('created_at', 'desc')
      ->get();

    $data = $items->map(function ($item) {
      return [
        'id' => $item->id,
        'tanggal' => $item->created_at->format('d M Y'),
        'jam' => $item->created_at->format('H:i:s'),
        'user' => $item->request->user->name ?? '-',
        'email' => $item->request->user->email ?? '-',
        'status' => $item->status,
        'detail' => $item->nama_barang,
      ];
    });

    $pdf = Pdf::loadView('exports.logs_pdf', ['logs' => $data]);

    return $pdf->download('log_request.pdf');
  }


  public function exportCSV()
  {
    $fileName = 'log_request.csv';

    $items = RequestItem::with(['request.user'])
      ->orderBy('created_at', 'desc')
      ->get();

    $headers = [
      "Content-type" => "text/csv",
      "Content-Disposition" => "attachment; filename=$fileName",
    ];

    $callback = function () use ($items) {
      $handle = fopen('php://output', 'w');
      fputcsv($handle, ['ID', 'Tanggal', 'Jam', 'User', 'Email', 'Status', 'Detail']);

      foreach ($items as $item) {
        fputcsv($handle, [
          $item->id,
          $item->created_at->format('d M Y'),
          $item->created_at->format('H:i:s'),
          $item->request->user->name ?? '-',
          $item->request->user->email ?? '-',
          $item->status,
          $item->nama_barang
        ]);
      }

      fclose($handle);
    };

    return response()->stream($callback, 200, $headers);
  }


  public function exportAll()
  {
    $items = RequestItem::with(['request.user'])
      ->orderBy('created_at', 'desc')
      ->get();

    return response()->json([
      'logs' => $items
    ]);
  }
}
