<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\GudangController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\AbsensiController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\RequestController;
use App\Http\Controllers\KaryawanController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\InventoryController;
use App\Http\Controllers\InputPriceController;
use App\Http\Controllers\LogRequestController;
use App\Http\Controllers\MonitoringController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\ReportItemController;
use App\Http\Controllers\AdminInvoiceController;
use App\Http\Controllers\AnnouncementController;
use App\Http\Controllers\DepartemenItemController;
use App\Http\Controllers\ManagerAbsensiController;
use App\Http\Controllers\TransferBarangController;
use App\Http\Controllers\PurchasingDetailController;
use App\Http\Controllers\MonitoringRequestController;
use App\Http\Controllers\RequestManagementController;
use App\Http\Controllers\ManagerAnnouncementController;
use App\Http\Controllers\ManagerKaryawanController;
use App\Http\Controllers\DashboardPurchasingController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ChatSemanticController;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Auth;

// =======================
// AUTH | HOME
// =======================
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('home');
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
});

// =======================
// AUTHENTICATED ROUTES
// =======================
Route::middleware(['auth'])->group(function () {
    // =======================
    // ANNOUNCEMENT ROUTES (Untuk User Biasa dan Manager)
    // =======================
    Route::get('/announcement', [ManagerAnnouncementController::class, 'index'])->name('announcement');
    
    // Announcement API Routes untuk User Biasa dan Manager
    Route::prefix('api/announcements')->group(function () {
        Route::get('/', [ManagerAnnouncementController::class, 'getAnnouncements'])->name('announcements.get');
        Route::post('/', [ManagerAnnouncementController::class, 'store'])->name('announcements.store');
        Route::get('/{id}', [ManagerAnnouncementController::class, 'show'])->name('announcements.show');
        Route::delete('/{id}', [ManagerAnnouncementController::class, 'destroy'])->name('announcements.destroy');
    });

    // =======================
    // ABSENSI
    // =======================
    Route::get('/absensi', fn() => Inertia::render('CatatKehadiran'))->name('absensi');
    Route::get('/absensi/{id}', fn($id) => Inertia::render('user/absensi', ['id' => $id]))->name('user.absensi');
    Route::post('/absensi/store', [AbsensiController::class, 'store'])->name('absensi.store');
    Route::get('/absensi/riwayat', [AbsensiController::class, 'getRiwayat'])->name('absensi.riwayat');

  // =======================
  // PURCHASING & REQUEST
  // =======================
  Route::get('/dashboard-purchasing', [DashboardPurchasingController::class, 'index'])
    ->name('dashboard-purchasing');
  Route::get('/purchasing/{request_number}', [PurchasingDetailController::class, 'show'])
    ->name('purchasing.show');

  
Route::post('/purchasing-detail/{requestNumber}/approve-all', [PurchasingDetailController::class, 'approveAll']);
  Route::post('/purchasing-detail/item/{itemId}/update-status', [PurchasingDetailController::class, 'updateStatus'])->name('purchasing.update-status');
    // =======================
    // REQUEST & PURCHASING
    // =======================
    Route::get('/request', fn() => Inertia::render('table/request'))->name('request');
    Route::get('/request-item', [RequestController::class, 'index'])->name('request-item');
    Route::post('/requests', [RequestController::class, 'store'])->name('requests.store');
    Route::get('/requests/history', [RequestController::class, 'getRequestHistory'])->name('requests.history');
    
    Route::get('/purchasing/{request_number}', [PurchasingDetailController::class, 'show'])->name('purchasing.show');
    Route::post('/purchasing-detail/{requestNumber}/approve-all', [PurchasingDetailController::class, 'approveAll']);
    Route::post('/purchasing-detail/item/{itemId}/update-status', [PurchasingDetailController::class, 'updateStatus'])->name('purchasing.update-status');

    // =======================
    // MONITORING
    // =======================
    Route::get('/monitoring-item/{request_number}', [MonitoringController::class, 'index'])->name('monitoring-item');
    Route::patch('/request-items/{id}', [MonitoringController::class, 'update'])->name('request-items.update');
    Route::delete('/request-items/{id}', [MonitoringController::class, 'destroy'])->name('request-items.destroy');
    Route::get('/monitoring-request', [MonitoringRequestController::class, 'index'])->name('monitoring-request');

    // =======================
    // PERMISSION
    // =======================
    Route::get('/permission', fn() => Inertia::render('permission/page'))->name('permission');
    Route::get('/api/permissions', [PermissionController::class, 'index'])->name('permissions.index');
    Route::post('/api/permissions', [PermissionController::class, 'store'])->name('permissions.store');
    Route::delete('/api/permissions/{id}', [PermissionController::class, 'destroy'])->name('permissions.destroy');

    // =======================
    // INVENTORY
    // =======================
    Route::get('/inventory', fn() => Inertia::render('inventory/page'))->name('inventory');
    Route::get('/table-inventory', fn() => Inertia::render('inventory/table-inventory'))->name('table-inventory');

    // =======================
    // INPUT PRICE
    // =======================
    Route::get('/input-price/{request_number}', [InputPriceController::class, 'index'])->name('input-price.show');
    Route::post('/input-price/save-invoice', [InputPriceController::class, 'saveInvoice']);
    Route::post('/input-price/confirm-preorder', [InputPriceController::class, 'confirmPreorder'])->name('input-price.confirm-preorder');
    Route::post('/input-price/mark-arrived', [InputPriceController::class, 'markAsArrived'])->name('input-price.mark-arrived');
    Route::post('/input-price/mark-all-arrived', [InputPriceController::class, 'markAllArrived'])->name('input-price.mark-all-arrived');

    // =======================
    // TRANSFER BARANG
    // =======================
    Route::get('/transfer', [TransferBarangController::class, 'index'])->name('transfer.index');
    Route::post('/api/transfer/batch', [TransferBarangController::class, 'transferBatch'])->name('transfer.batch');
    Route::get('/api/department/items', [TransferBarangController::class, 'getDepartmentItems'])->name('department.items');
    Route::patch('/api/department/items/{id}/quantity', [TransferBarangController::class, 'updateDepartmentItemQuantity'])->name('department.items.update-quantity');
    Route::post('/api/inventory/transfer', [TransferBarangController::class, 'saveTransfer']);
    Route::get('/api/inventory/departemen', [TransferBarangController::class, 'getDepartemenItems']);

    // =======================
    // INVOICE
    // =======================
    Route::get('/invoice/{invoice_number}', [InvoiceController::class, 'show'])->name('invoice.show');
    Route::get('/invoice/{id}/download', function ($id) {
        $invoice = \App\Models\Invoice::with('purchases')->findOrFail($id);
        $pdf = Pdf::loadView('pdf.struk', ['invoice' => $invoice])
            ->setPaper([0, 0, 226.77, 600], 'portrait');
        return $pdf->download("invoice-{$invoice->invoice_number}.pdf");
    });

    // =======================
    // REPORT
    // =======================
    Route::get('/report', fn() => Inertia::render('report/page'))->name('report');

    // =======================
    // MANAGER PAGES (untuk role manager)
    // =======================
    Route::middleware(['role:manager'])->group(function () {
        Route::get('/manager', fn() => Inertia::render('manager/page'))->name('manager.page');
        
        // Manager Absensi
        Route::get('/manager-absensi', [ManagerAbsensiController::class, 'index'])->name('manager.absensi');
        Route::post('/manager-absensi', [ManagerAbsensiController::class, 'store'])->name('manager.absensi.store');
        Route::post('/manager-absensi/filter', [ManagerAbsensiController::class, 'filter'])->name('manager.absensi.filter');
        
        // Manager Karyawan
        Route::get('/manager-karyawan', [ManagerKaryawanController::class, 'index'])->name('manager.karyawan');
        Route::get('/manager-karyawan/{id}', [ManagerKaryawanController::class, 'detail'])->name('manager.detail-karyawan');
        Route::get('/api/manager-karyawan/filter/{department}', [ManagerKaryawanController::class, 'filterByDepartment']);
    });

    // =======================
    // ADMIN ROUTES
    // =======================
    Route::prefix('admin')->name('admin.')->middleware('role:admin')->group(function () {
        // Dashboard
        Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('dashboard');
        Route::get('/dashboard/detail/{status}', fn($status) => Inertia::render('admin/StatusDetail', ['status' => $status]))->name('dashboard.detail');

        // Pages
        Route::get('/absensi', [AdminController::class, 'absensi'])->name('absensi');
        Route::get('/inventory', [AdminController::class, 'inventory'])->name('inventory');
        Route::get('/permission', [AdminController::class, 'permission'])->name('permission');
        Route::get('/requestitem', fn() => Inertia::render('admin/RequestItem'))->name('requestitem');
        Route::get('/requestdetail/{kode_department}', fn($kode_department) => Inertia::render('admin/RequestDetailPage', ['kode_department' => $kode_department]))->name('requestdetail');

        // Invoice
        Route::get('/invoice', [AdminInvoiceController::class, 'index'])->name('invoice');

        // Log Request
        Route::get('/LogRequest', [LogRequestController::class, 'index'])->name('log_request');
        Route::get('/LogRequest/export/pdf', [LogRequestController::class, 'exportPDF'])->name('logs.export.pdf');
        Route::get('/LogRequest/export/csv', [LogRequestController::class, 'exportCSV'])->name('logs.export.csv');
        Route::get('/LogRequest/export/all', [LogRequestController::class, 'exportAll'])->name('logs.export.all');

        // Report Item
        Route::get('/ReportItem', [ReportItemController::class, 'index'])->name('report_item');

        // Request Management
        Route::get('/requests-management', [RequestManagementController::class, 'index'])->name('requests-management');
        Route::get('/requests-detail/{kodeDepartment}', [RequestManagementController::class, 'showDetail'])->name('requests-detail');

        // Karyawan Management
        Route::get('/karyawan', [KaryawanController::class, 'index'])->name('karyawan');
        Route::post('/karyawan/store', [KaryawanController::class, 'store'])->name('karyawan.store');
        Route::put('/karyawan/update/{id}', [KaryawanController::class, 'update'])->name('karyawan.update');
        Route::get('/detailKaryawan/{id}', [KaryawanController::class, 'detail'])->name('karyawan.detail');
        Route::get('/mantanKaryawan', [KaryawanController::class, 'mantan'])->name('karyawan.mantan');

Route::post('/input-price/mark-all-arrived', 
    [InputPriceController::class, 'markAllArrived']
)->name('input-price.mark-all-arrived');

// =========================
// VIEW INVOICE
// =========================
Route::get('/invoice/{invoice_number}', [InvoiceController::class, 'show'])
    ->name('invoice.show');

Route::get('/invoice/{id}/download', function ($id) {
    $invoice = \App\Models\Invoice::with('purchases')->findOrFail($id);

    $pdf = Pdf::loadView('pdf.struk', ['invoice' => $invoice])
    ->setPaper([0, 0, 650, 926.77], 'landscape');



    return $pdf->download("invoice-{$invoice->invoice_number}.pdf");
});

  // =======================
  // TRANSFER
  // =======================
  Route::get('/transfer', [TransferBarangController::class, 'index'])->name('transfer.index');
  Route::post('/api/transfer/batch', [TransferBarangController::class, 'transferBatch'])->name('transfer.batch');
  Route::get('/api/department/items', [TransferBarangController::class, 'getDepartmentItems'])->name('department.items');
  Route::patch('/api/department/items/{id}/quantity', [TransferBarangController::class, 'updateDepartmentItemQuantity'])->name('department.items.update-quantity');
  Route::post('/api/inventory/transfer', [TransferBarangController::class, 'saveTransfer']);
  Route::get('/api/inventory/departemen', [TransferBarangController::class, 'getDepartemenItems']);

  // =======================
  // TOKO
  // =======================
  Route::get('/toko', fn() => Inertia::render('table/searchtoko'))->name('searchtoko');

  // =======================
  // ADMIN ROUTES
  // =======================
  Route::prefix('admin')->name('admin.')->middleware('role:admin')->group(function () {
    Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('dashboard');

    Route::get('/absensi', [AdminController::class, 'absensi'])->name('absensi');

    Route::get('/inventory', [AdminController::class, 'inventory'])->name('inventory');

    Route::get('/invoice', [AdminInvoiceController::class, 'index'])->name('invoice');
    Route::get('/LogRequest', [LogRequestController::class, 'index'])->name('log_request');
    Route::get('/LogRequest/export/pdf', [LogRequestController::class, 'exportPDF'])->name('logs.export.pdf');
    Route::get('/LogRequest/export/csv', [LogRequestController::class, 'exportCSV'])->name('logs.export.csv');
    Route::get('/LogRequest/export/all', [LogRequestController::class, 'exportAll'])->name('logs.export.all');

    Route::get('/ReportItem', [ReportItemController::class, 'index'])->name('report_item');

    Route::get('/requestitem', fn() => Inertia::render('admin/RequestItem'))->name('requestitem');
    Route::get('/requestdetail/{kode_department}', fn($kode_department) => Inertia::render('admin/RequestDetailPage', ['kode_department' => $kode_department]))->name('requestdetail');
    Route::get('/dashboard/detail/{status}', fn($status) => Inertia::render('admin/StatusDetail', ['status' => $status]))->name('dashboard.detail');
    Route::get('/requests-management', [RequestManagementController::class, 'index'])->name('requests-management');
    Route::get('/requests-detail/{kodeDepartment}', [RequestManagementController::class, 'showDetail'])->name('requests-detail');

    Route::get('/karyawan', [KaryawanController::class, 'index'])->name('karyawan');
    Route::post('/karyawan/store', [KaryawanController::class, 'store']);
    Route::put('/karyawan/update/{id}', [KaryawanController::class, 'update'])->name('karyawan.update');
    Route::get('/detailKaryawan/{id}', [KaryawanController::class, 'detail']);
    Route::get('/mantanKaryawan', [KaryawanController::class, 'mantan']);
    Route::delete('/karyawan/delete/{id}', [KaryawanController::class, 'destroy'])->name('karyawan.destroy');


    Route::get('/permission', [AdminController::class, 'permission']);

    Route::get('/Announcement', [AnnouncementController::class, 'index'])->name('announcement.index');
    Route::post('/Announcement', [AnnouncementController::class, 'store'])->name('announcement.store');
    Route::put('/Announcement/{id}', [AnnouncementController::class, 'update'])->name('announcement.update');
    Route::delete('/Announcement/{id}', [AnnouncementController::class, 'destroy'])->name('announcement.destroy');

    Route::get('/Report', [ReportController::class, 'index'])->name('report.index');
    Route::delete('/Report/{id}', [ReportController::class, 'destroy'])->name('report.destroy');


    Route::get('/RequestItem', function () {
      return Inertia::render('admin/RequestItem');
    })->name('admin.RequestItem');


  });
  Route::post('/logout', function () {
    Auth::logout();
    request()->session()->invalidate();
    request()->session()->regenerateToken();

    return redirect('/login');
  })->name('logout');


  // =======================
  // REQUEST MANAGEMENT API
  // =======================
  Route::get('/api/requests-by-department/{kode_department}', [RequestManagementController::class, 'getRequestsByDepartment']);
        // Announcement
        Route::get('/Announcement', [AnnouncementController::class, 'index'])->name('announcement.index');
        Route::post('/Announcement', [AnnouncementController::class, 'store'])->name('announcement.store');
        Route::put('/Announcement/{id}', [AnnouncementController::class, 'update'])->name('announcement.update');
        Route::delete('/Announcement/{id}', [AnnouncementController::class, 'destroy'])->name('announcement.destroy');

        // Report
        Route::get('/Report', [ReportController::class, 'index'])->name('report.index');
        Route::delete('/Report/{id}', [ReportController::class, 'destroy'])->name('report.destroy');
    });
});

// =======================
// PUBLIC API ROUTES
// =======================
Route::get('/api/inventory/gudang', [GudangController::class, 'index']);
Route::get('/api/inventory/gudang/{id}', [GudangController::class, 'show']);
Route::get('/api/departemen-items', [DepartemenItemController::class, 'index'])->name('departemen-items.index');
Route::get('/api/departemen-items/{departemen}', [DepartemenItemController::class, 'getByDepartemen'])->name('departemen-items.show');
Route::get('/api/departemen', [DepartemenItemController::class, 'getDepartemen'])->name('departemen.list');

// =======================
// SETTINGS
// =======================
require __DIR__ . '/settings.php';

// =======================
// SEMANTIC ROUTES
// =======================
Route::prefix('semantic')->group(function () {
    // API Endpoints (HARUS DIDEFINISIKAN DULUAN)
    Route::post('/chat', [ChatSemanticController::class, 'handle'])->name('semantic.chat');
    Route::get('/search', [SearchController::class, 'index'])->name('semantic.search');
    Route::get('/product/{id}', [ProductController::class, 'show'])->name('semantic.product.detail');

    // Halaman UI (SESUDAH API)
    Route::get('/toko', function () {
        return Inertia::render('table/searchtoko');
    })->name('toko.index');

    Route::get('/products/{id}', function ($id) {
        return Inertia::render('table/productdetail', ['id' => $id]);
    })->name('products.detail');
});
