<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddHargaToRequestItemsTable extends Migration
{
    public function up()
    {
        Schema::table('request_items', function (Blueprint $table) {
            $table->decimal('harga', 15, 2)->nullable()->after('catatan');
        });
    }

    public function down()
    {
        Schema::table('request_items', function (Blueprint $table) {
            $table->dropColumn('harga');
        });
    }
}