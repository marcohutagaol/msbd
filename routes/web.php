<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

// Route::get('/', function () {
//     return Inertia::render('index', [
//         'canRegister' => Features::enabled(Features::registration()),
//     ]);
// })->name('home');

Route::get('/', function () {
    return Inertia::render('dashboard');
})->middleware(['auth', 'verified'])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    
 Route::get('/detail-absen', function () {
    return Inertia::render('detailpages/DetailAbsen');
})->name('detail-absen');
});

<<<<<<< HEAD
Route::get('/admin/dashboard', function () {
    return Inertia::render('admin/Dashboard');
})->name('admin.dashboard');

require __DIR__.'/settings.php';

Route::get('/absensi', function () {
        return Inertia::render('user/absensi');
    })->name('user.absensi');
=======
require __DIR__.'/settings.php';
>>>>>>> main
