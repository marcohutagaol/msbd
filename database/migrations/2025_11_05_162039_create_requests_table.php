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
        Schema::create('requests', function (Blueprint $table) {
            $table->id();
            $table->string('request_number', 50)->unique(); // Nomor request otomatis
            $table->bigInteger('user_id')->unsigned(); // User yang membuat request
            $table->string('department', 100);
            $table->date('request_date');
            $table->enum('status', ['Pending', 'Approved', 'Rejected', 'Completed'])->default('Pending');
            $table->text('notes')->nullable();
            $table->bigInteger('approved_by')->unsigned()->nullable(); // User yang approve
            $table->timestamp('approved_at')->nullable();
            $table->timestamps();
            
            // Index untuk performa
            $table->index('user_id');
            $table->index('department');
            $table->index('status');
            $table->index('request_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('requests');
    }
};