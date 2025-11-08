<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('purchases', function (Blueprint $table) {
            $table->id();

            // relasi ke tabel requests berdasarkan request_number
            $table->string('request_number');
            $table->foreign('request_number')
                  ->references('request_number')
                  ->on('requests')
                  ->onDelete('cascade')
                  ->onUpdate('cascade');

            $table->date('tanggal_beli')->nullable();
            $table->decimal('total_harga', 15, 2)->default(0);
            $table->enum('status', ['Pending', 'Approved', 'Rejected'])->default('Pending');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('purchases');
    }
};
