<?php

use App\Http\Controllers\AdminController;
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

Route::get('/purchasing', function () {
    return Inertia::render('table/purchasing');
});

Route::get('/request', function () {
    return Inertia::render('table/request');
});

Route::get('/dashboard-purchasing', function () {
    return Inertia::render('table/dashboard-purchasing');
});

Route::get('/monitoring-item', function () {
    return Inertia::render('table/monitoring-item');
});

Route::get('/input-price', function () {
    return Inertia::render('table/input-price');
});

Route::get('/admin/dashboard', [AdminController::class, 'index'])->name('admin.dashboard');

Route::get('/admin/absensi', function () {
    return Inertia::render('admin/Absensi');
})->name('admin.absensi');

    Route::get('/admin/dashboard/detail/{status}', function ($status) {
        return Inertia::render('admin/StatusDetail', [
            'status' => $status,
        ]);
    })->name('admin.dashboard.detail');
require __DIR__.'/settings.php';

