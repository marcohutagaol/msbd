<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // Tambahkan opsi 'arrived' ke ENUM existing
        DB::statement("ALTER TABLE request_items MODIFY COLUMN status ENUM('Pending', 'Approved', 'Rejected', 'Completed', 'Arrived') DEFAULT 'Pending'");
    }

    public function down(): void
    {
        // Kembalikan ke enum sebelumnya (hapus opsi 'Arrived')
        DB::statement("ALTER TABLE request_items MODIFY COLUMN status ENUM('Pending', 'Approved', 'Rejected', 'Completed') DEFAULT 'Pending'");
    }
};