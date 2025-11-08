<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('purchases', function (Blueprint $table) {
            // Ubah tanggal_beli menjadi date atau datetime
            $table->date('tanggal_beli')->nullable()->change();
            
            // Atau jika ingin datetime:
            // $table->datetime('tanggal_beli')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('purchases', function (Blueprint $table) {
            // Kembalikan ke tipe semula jika perlu
            $table->string('tanggal_beli')->nullable()->change();
        });
    }
};