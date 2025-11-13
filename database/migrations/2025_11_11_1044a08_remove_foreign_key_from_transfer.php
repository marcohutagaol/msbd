<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('transfer_barang', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('gudang_id')->nullable(); // relasi ke tabel gudang
            $table->string('nama_barang');
            $table->integer('jumlah');
            $table->string('satuan')->nullable();
            $table->timestamps();

            $table->foreign('gudang_id')->references('id')->on('gudang')->onDelete('set null');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('transfer_barang');
    }
};
