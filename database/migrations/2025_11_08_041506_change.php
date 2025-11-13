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
            // 1. Drop foreign key constraint terlebih dahulu (jika ada)
            // Cek nama foreign key yang sebenarnya di database Anda
            // Biasanya Laravel membuat nama otomatis seperti: purchases_request_number_foreign
            $table->dropForeign(['request_number']); // atau bisa spesifik: dropForeign('purchases_request_number_foreign')
            
            // 2. Drop kolom request_number
            $table->dropColumn('request_number');
            
            // 3. Tambah kolom request_id sebagai foreign key
            $table->unsignedBigInteger('request_id')->after('id');
            $table->foreign('request_id')
                  ->references('id')
                  ->on('requests')
                  ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('purchases', function (Blueprint $table) {
            // Kembalikan ke struktur lama
            $table->dropForeign(['request_id']);
            $table->dropColumn('request_id');
            
            $table->string('request_number', 255)->after('id');
            $table->index('request_number', 'purchases_request_number_foreign');
        });
    }
};