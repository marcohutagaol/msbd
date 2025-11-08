<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AbsensiController;
use App\Http\Controllers\RequestController;
use App\Http\Controllers\InputPriceController;
use App\Http\Controllers\MonitoringController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\PurchasingDetailController;
use App\Http\Controllers\DashboardPurchasingController;

// Home Route
Route::get('/', function () {
    return Inertia::render('dashboard');
})->middleware(['auth', 'verified'])->name('home');

// Dashboard Routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

// Absensi Routes
Route::middleware(['auth'])->group(function () {
    Route::get('/absensi', function () {
        return Inertia::render('CatatKehadiran');
    })->name('absensi');
    
    Route::get('/absensi/{id}', function ($id) {
        return Inertia::render('user/absensi', ['id' => $id]);
    })->name('user.absensi');
    
    Route::post('/absensi/store', [AbsensiController::class, 'store'])->name('absensi.store');
    Route::get('/absensi/riwayat', [AbsensiController::class, 'getRiwayat'])->name('absensi.riwayat');
});

// Purchasing & Request Routes
Route::middleware(['auth'])->group(function () {
    // Dashboard Purchasing
    Route::get('/dashboard-purchasing', [DashboardPurchasingController::class, 'index'])
        ->name('dashboard-purchasing');
    
    // Detail per departemen
    Route::get('/dashboard-purchasing/department/{id}', [DashboardPurchasingController::class, 'getDepartmentDetails'])
        ->name('dashboard-purchasing.department');
    
    // Detail purchasing by department
    Route::get('/purchasing/{departmentId}', [PurchasingDetailController::class, 'show'])
        ->name('purchasing.detail');
    
    Route::get('/request', function () {
        return Inertia::render('table/request');
    })->name('request');
    
    // Request Item
    Route::get('/request-item', [RequestController::class, 'index'])->name('request-item');
    Route::post('/requests', [RequestController::class, 'store'])->name('requests.store');
    Route::get('/requests/history', [RequestController::class, 'getRequestHistory'])->name('requests.history');
    
    // Monitoring Item
    Route::get('/monitoring-item', [MonitoringController::class, 'index'])->name('monitoring-item');
    Route::patch('/request-items/{id}', [MonitoringController::class, 'update'])->name('request-items.update');
    Route::delete('/request-items/{id}', [MonitoringController::class, 'destroy'])->name('request-items.destroy');
});

// Permission Routes
Route::middleware(['auth'])->group(function () {
    Route::get('/permission', function () {
        return Inertia::render('permission/page');
    })->name('permission');
    
    Route::get('/api/permissions', [PermissionController::class, 'index'])->name('permissions.index');
    Route::post('/api/permissions', [PermissionController::class, 'store'])->name('permissions.store');
    Route::delete('/api/permissions/{id}', [PermissionController::class, 'destroy'])->name('permissions.destroy');
});

// Inventory Routes
Route::middleware(['auth'])->group(function () {
    Route::get('/inventory', function () {
        return Inertia::render('inventory/page');
    })->name('inventory');
    
    Route::get('/table-inventory', function () {
        return Inertia::render('inventory/table-inventory');
    })->name('table-inventory');
});


// ADMIN
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
});

// Toko Route
Route::get('/toko', function () {
    return Inertia::render('table/searchtoko');
})->name('searchtoko');

// Purchasing Approval Routes
Route::post('/purchasing-detail/{departmentId}/approve-all', [PurchasingDetailController::class, 'approveAll'])
    ->name('purchasing.approve-all');

Route::post('/purchasing-detail/item/{itemId}/update-status', [PurchasingDetailController::class, 'updateStatus'])
    ->name('purchasing.update-status');

// Input Price Routes
Route::middleware(['auth'])->group(function () {
    Route::get('/input-price', [InputPriceController::class, 'index'])->name('input-price');
    Route::get('/input-price/summary/{requestId}', [InputPriceController::class, 'getSummary'])->name('input-price.summary');
    Route::get('/input-price/items/{requestId}', [InputPriceController::class, 'getRequestItems'])->name('input-price.items');
    Route::post('/input-price/confirm-preorder', [InputPriceController::class, 'confirmPreorder'])->name('input-price.confirm');
    Route::post('/input-price/mark-arrived', [InputPriceController::class, 'markAsArrived'])->name('input-price.arrived');
});

// Settings Routes (only include once)
require __DIR__.'/settings.php';