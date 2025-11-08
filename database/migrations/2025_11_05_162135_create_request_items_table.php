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
        Schema::create('request_items', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('request_id')->unsigned();
            $table->string('kode_barang', 50)->nullable();
            $table->string('nama_barang', 100);
            $table->integer('jumlah_diajukan')->default(0);
            $table->integer('jumlah_disetujui')->default(0)->nullable();
            $table->enum('status', ['Pending', 'Approved', 'Rejected', 'Completed'])->default('Pending');
            $table->text('catatan')->nullable();
            $table->string('satuan', 20);
            $table->timestamps();
            
            // Foreign key ke tabel requests
            $table->foreign('request_id')->references('id')->on('requests')->onDelete('cascade');
            
            // Index untuk performa
            $table->index('request_id');
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('request_items');
    }
};