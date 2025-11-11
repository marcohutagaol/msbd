<?php
// app/Http/Controllers/TransferBarangController.php

namespace App\Http\Controllers;

use App\Models\Gudang;
use App\Models\DepartemenItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class TransferBarangController extends Controller
{
    public function saveTransfer(Request $request)
    {
        $request->validate([
            'items' => 'required|array',
            'items.*.id' => 'required|exists:gudang,id',
            'items.*.jumlah' => 'required|integer|min:1'
        ]);

        try {
            DB::transaction(function () use ($request) {
                // Ambil departemen dari user yang login
                $userDepartemen = Auth::user()->departemen ?? 'Marketing'; // Default fallback
                $items = $request->items;

                foreach ($items as $itemData) {
                    // 1. Dapatkan item dari gudang
                    $gudangItem = Gudang::find($itemData['id']);
                    
                    // 2. Validasi stok mencukupi
                    if ($gudangItem->stok < $itemData['jumlah']) {
                        throw new \Exception("Stok tidak mencukupi untuk {$gudangItem->nama_barang}. Stok tersedia: {$gudangItem->stok}");
                    }

                    // 3. Kurangi stok di gudang
                    $gudangItem->stok -= $itemData['jumlah'];
                    $gudangItem->save();

                    // 4. Tambah/update stok di departemen
                    $departemenItem = DepartemenItem::where('departemen', $userDepartemen)
                        ->where('nama_barang', $gudangItem->nama_barang)
                        ->first();

                    if ($departemenItem) {
                        // Update stok jika barang sudah ada
                        $departemenItem->stok += $itemData['jumlah'];
                        $departemenItem->save();
                    } else {
                        // Buat baru jika barang belum ada
                        DepartemenItem::create([
                            'departemen' => $userDepartemen,
                            'nama_barang' => $gudangItem->nama_barang,
                            'stok' => $itemData['jumlah'],
                            'satuan' => $gudangItem->satuan
                        ]);
                    }
                }
            });

            return response()->json([
                'success' => true,
                'message' => 'Transfer berhasil disimpan'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Transfer gagal: ' . $e->getMessage()
            ], 500);
        }
    }

    // Method untuk mendapatkan barang di departemen (opsional)
    public function getDepartemenItems()
    {
        $userDepartemen = Auth::user()->departemen ?? 'Marketing';
        
        $items = DepartemenItem::where('departemen', $userDepartemen)
            ->orderBy('nama_barang')
            ->get();

        return response()->json($items);
    }
}