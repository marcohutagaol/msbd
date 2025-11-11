<?php

namespace App\Http\Controllers;

use App\Models\Gudang;
use Illuminate\Http\JsonResponse;

class GudangController extends Controller
{
    public function index(): JsonResponse
    {
        try {
            $items = Gudang::all();
            return response()->json($items);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function show($id): JsonResponse
    {
        try {
            $item = Gudang::find($id);
            if (!$item) {
                return response()->json(['error' => 'Data tidak ditemukan'], 404);
            }
            return response()->json($item);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}