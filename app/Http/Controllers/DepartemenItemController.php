<?php

namespace App\Http\Controllers;

use App\Models\DepartemenItem;
use Illuminate\Http\Request;

class DepartemenItemController extends Controller
{
    /**
     * Get semua items atau filter berdasarkan departemen
     */
    public function index(Request $request)
    {
        $query = DepartemenItem::query();

        // Filter berdasarkan departemen jika ada parameter
        if ($request->has('departemen')) {
            $query->where('departemen', $request->departemen);
        }

        $items = $query->get();

        return response()->json($items);
    }

    /**
     * Get items berdasarkan departemen spesifik
     */
    public function getByDepartemen($departemen)
    {
        $items = DepartemenItem::where('departemen', $departemen)->get();

        return response()->json($items);
    }

    /**
     * Get semua departemen yang unik
     */
    public function getDepartemen()
    {
        $departemen = DepartemenItem::distinct()->pluck('departemen');

        return response()->json($departemen);
    }
}