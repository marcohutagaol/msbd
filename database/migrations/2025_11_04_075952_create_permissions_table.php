<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('permissions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->enum('type', ['sick', 'permission', 'vacation']);
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
            
            // Fields untuk semua tipe
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();
            $table->integer('days')->nullable();
            $table->text('notes')->nullable();
            
            // Fields untuk sick leave
            $table->enum('sick_type', ['ringan', 'sedang', 'berat'])->nullable();
            
            // Fields untuk permission
            $table->date('permission_date')->nullable();
            $table->string('reason')->nullable();
            $table->enum('permission_type', ['Tidak hadir', 'datang terlambat', 'WFH'])->nullable();
            $table->string('time')->nullable();
            
            // Fields untuk vacation
            $table->enum('vacation_type', ['Cuti Tahunan', 'Cuti Bersama', 'Cuti Sakit', 'Cuti Maternity'])->nullable();
            $table->text('vacation_reason')->nullable();
            
            // Common fields
            $table->string('location')->nullable();
            $table->string('document_path')->nullable();
            
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('permissions');
    }
};