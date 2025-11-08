<?php

use Inertia\Inertia;
use Laravel\Fortify\Features;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AbsensiController;
use App\Http\Controllers\PermissionController;


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

Route::middleware(['auth'])->group(function () {
    Route::get('/permission', function () {
        return Inertia::render('permission/page');
    })->name('permission');
    
    Route::get('/api/permissions', [App\Http\Controllers\PermissionController::class, 'index'])->name('permissions.index');
    Route::post('/api/permissions', [App\Http\Controllers\PermissionController::class, 'store'])->name('permissions.store');
    Route::delete('/api/permissions/{id}', [App\Http\Controllers\PermissionController::class, 'destroy'])->name('permissions.destroy');
});
Route::get('/inventory', function () {
    return Inertia::render('inventory/page');
});

Route::get('/table-inventory', function () {
    return Inertia::render('inventory/table-inventory');
});


Route::get('/admin/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');
Route::get('/admin/absensi', [AdminController::class, 'absensi'])->name('admin.absensi');
Route::get('/admin/inventory', [AdminController::class, 'inventory'])->name('admin.inventory');


Route::get('/admin/requestitem', function () {
    return Inertia::render('admin/RequestItem');
})->name('admin.requestitem');
;
Route::get('/admin/requestdetail', function () {
    return Inertia::render('admin/RequestDetailPage');
})->name('admin.requestdetail');
;


Route::get('/admin/dashboard/detail/{status}', function ($status) {
        return Inertia::render('admin/StatusDetail', [
            'status' => $status,
        ]);
    })->name('admin.dashboard.detail');






require __DIR__.'/settings.php';
require __DIR__.'/settings.php';
