<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\AbsensiController;


Route::get('/', function () {
    return Inertia::render('dashboard');
})->middleware(['auth', 'verified'])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('/absensi/{id}', function ($id) {
        return Inertia::render('user/absensi', ['id' => $id]);
    })->name('user.absensi');
});


Route::get('/admin/dashboard', function () {
    return Inertia::render('admin/Dashboard');
})->name('admin.dashboard');

Route::middleware(['auth'])->group(function () {
    Route::post('/absensi/store', [AbsensiController::class, 'store'])->name('absensi.store');
});


Route::middleware(['auth'])->group(function () {
    Route::post('/absensi/store', [AbsensiController::class, 'store'])->name('absensi.store');
    Route::get('/absensi/riwayat', [AbsensiController::class, 'getRiwayat'])->name('absensi.riwayat');

    Route::get('/absensi', function () {
        return Inertia::render('CatatKehadiran');
    })->name('absensi');
});

require __DIR__ . '/settings.php';
