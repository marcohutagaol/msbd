<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Grant permissions untuk user 
        // user tidak bisa memakai tabel purchases
        DB::statement("GRANT SELECT, INSERT, UPDATE ON kawaland.absen TO 'karyawan'@'localhost'");
        DB::statement("GRANT SELECT, INSERT, UPDATE ON kawaland.absensi_generate TO 'karyawan'@'localhost'");
        DB::statement("GRANT SELECT ON kawaland.announcement TO 'karyawan'@'localhost'");
        DB::statement("GRANT ALL ON kawaland.cache TO 'karyawan'@'localhost'");
        DB::statement("GRANT ALL ON kawaland.cache_locks TO 'karyawan'@'localhost'");
        DB::statement("GRANT SELECT, UPDATE ON kawaland.departemen_items TO 'karyawan'@'localhost'");
        DB::statement("GRANT SELECT, UPDATE ON kawaland.department TO 'karyawan'@'localhost'");
        DB::statement("GRANT SELECT, INSERT, UPDATE ON kawaland.detail_absen TO 'karyawan'@'localhost'");
        DB::statement("GRANT SELECT ON kawaland.detail_karyawan TO 'karyawan'@'localhost'");
        DB::statement("GRANT ALL ON kawaland.failed_jobs TO 'karyawan'@'localhost'");
        DB::statement("GRANT SELECT, INSERT, UPDATE ON kawaland.gudang TO 'karyawan'@'localhost'");
        DB::statement("GRANT ALL ON kawaland.jobs TO 'karyawan'@'localhost'");
        DB::statement("GRANT ALL ON kawaland.job_batches TO 'karyawan'@'localhost'");
        DB::statement("GRANT SELECT ON kawaland.karyawan TO 'karyawan'@'localhost'");
        DB::statement("GRANT SELECT, INSERT, UPDATE ON kawaland.log_absensi TO 'karyawan'@'localhost'");
        DB::statement("GRANT ALL ON kawaland.migrations TO 'karyawan'@'localhost'");
        DB::statement("GRANT ALL ON kawaland.password_reset_tokens TO 'karyawan'@'localhost'");
        DB::statement("GRANT SELECT, INSERT, UPDATE ON kawaland.permissions TO 'karyawan'@'localhost'");
        DB::statement("GRANT SELECT, INSERT, UPDATE ON kawaland.reports TO 'karyawan'@'localhost'");
        DB::statement("GRANT SELECT, INSERT, UPDATE ON kawaland.requests TO 'karyawan'@'localhost'");
        DB::statement("GRANT SELECT, INSERT, UPDATE ON kawaland.request_items TO 'karyawan'@'localhost'");
        DB::statement("GRANT ALL ON kawaland.sessions TO 'karyawan'@'localhost'");
        DB::statement("GRANT SELECT, UPDATE ON kawaland.users TO 'karyawan'@'localhost'");
        DB::statement("GRANT SELECT, INSERT, UPDATE ON kawaland.warehouse_logs TO 'karyawan'@'localhost'");


        DB::statement("GRANT EXECUTE ON PROCEDURE kawaland.proses_gudang_ke_departemen TO 'user'@'localhost'");
        DB::statement("GRANT EXECUTE ON PROCEDURE kawaland.proses_request_approved TO 'user'@'localhost'");
        DB::statement("GRANT EXECUTE ON PROCEDURE kawaland.tambah_search_barang TO 'user'@'localhost'");


        // Grant permissions untuk purchaser
        // purchaser tidak bisa memakai tabel request tapi masi bisa melihat
        DB::statement("GRANT SELECT, INSERT, UPDATE ON kawaland.purchases TO 'purchaser'@'localhost'");
        DB::statement("GRANT SELECT, INSERT, UPDATE ON kawaland.absen TO 'purchaser'@'localhost'");
        DB::statement("GRANT SELECT, INSERT, UPDATE ON kawaland.absensi_generate TO 'purchaser'@'localhost'");
        DB::statement("GRANT SELECT ON kawaland.announcement TO  'purchaser'@'localhost'");
        DB::statement("GRANT ALL ON kawaland.cache TO 'purchaser'@'localhost'");
        DB::statement("GRANT ALL ON kawaland.cache_locks TO 'purchaser'@'localhost'");
        DB::statement("GRANT SELECT, UPDATE ON kawaland.departemen_items TO 'purchaser'@'localhost'");
        DB::statement("GRANT SELECT, UPDATE ON kawaland.department TO 'purchaser'@'localhost'");
        DB::statement("GRANT SELECT, INSERT, UPDATE ON kawaland.detail_absen TO 'purchaser'@'localhost'");
        DB::statement("GRANT SELECT, UPDATE ON kawaland.detail_karyawan TO 'purchaser'@'localhost'");
        DB::statement("GRANT ALL ON kawaland.failed_jobs TO 'purchaser'@'localhost'");
        DB::statement("GRANT SELECT, INSERT, UPDATE ON kawaland.gudang TO 'purchaser'@'localhost'");
        DB::statement("GRANT ALL ON kawaland.jobs TO 'purchaser'@'localhost'");
        DB::statement("GRANT ALL ON kawaland.job_batches TO 'purchaser'@'localhost'");
        DB::statement("GRANT SELECT ON kawaland.karyawan TO 'purchaser'@'localhost'");
        DB::statement("GRANT SELECT, INSERT, UPDATE ON kawaland.log_absensi TO 'purchaser'@'localhost'");
        DB::statement("GRANT ALL ON kawaland.migrations TO 'purchaser'@'localhost'");
        DB::statement("GRANT ALL ON kawaland.password_reset_tokens TO 'purchaser'@'localhost'");
        DB::statement("GRANT SELECT, INSERT, UPDATE ON kawaland.permissions TO 'purchaser'@'localhost'");
        DB::statement("GRANT SELECT, INSERT, UPDATE ON kawaland.reports TO 'purchaser'@'localhost'");
        DB::statement("GRANT SELECT, UPDATE ON kawaland.requests TO 'purchaser'@'localhost'");
        DB::statement("GRANT SELECT, UPDATE ON kawaland.request_items TO 'purchaser'@'localhost'");
        DB::statement("GRANT ALL ON kawaland.sessions TO 'purchaser'@'localhost'");
        DB::statement("GRANT SELECT, UPDATE ON kawaland.users TO 'purchaser'@'localhost'");
        DB::statement("GRANT SELECT, INSERT, UPDATE ON kawaland.warehouse_logs TO 'purchaser'@'localhost'");

        // Grant permissions untuk mengeksekusi stored procedures dan functions
        DB::statement("GRANT EXECUTE ON PROCEDURE kawaland.make_invoice_from_purchases TO 'purchaser'@'localhost'");
        DB::statement("GRANT EXECUTE ON PROCEDURE kawaland.make_purchase_from_item TO 'purchaser'@'localhost'");
        DB::statement("GRANT EXECUTE ON PROCEDURE kawaland.proses_gudang_ke_departemen TO 'purchaser'@'localhost'");
        DB::statement("GRANT EXECUTE ON PROCEDURE kawaland.proses_purchasing_sampai_gudang TO 'purchaser'@'localhost'");
        DB::statement("GRANT EXECUTE ON PROCEDURE kawaland.tambah_search_barang TO 'purchaser'@'localhost'");


        // grant permissions untuk manager
        // manager tidak bisa insert pada request dan purchases
        DB::statement("GRANT SELECT, UPDATE ON kawaland.purchases TO 'manager'@'localhost'");
        DB::statement("GRANT SELECT, INSERT, UPDATE ON kawaland.absen TO 'manager'@'localhost'");
        DB::statement("GRANT SELECT, INSERT, UPDATE ON kawaland.absensi_generate TO 'manager'@'localhost'");
        DB::statement("GRANT SELECT, INSERT, UPDATE ON kawaland.announcement TO  'manager'@'localhost'");
        DB::statement("GRANT ALL ON kawaland.cache TO 'manager'@'localhost'");
        DB::statement("GRANT ALL ON kawaland.cache_locks TO 'manager'@'localhost'");
        DB::statement("GRANT SELECT, UPDATE ON kawaland.departemen_items TO 'manager'@'localhost'");
        DB::statement("GRANT SELECT, UPDATE ON kawaland.department TO 'manager'@'localhost'");
        DB::statement("GRANT SELECT, INSERT, UPDATE ON kawaland.detail_absen TO 'manager'@'localhost'");
        DB::statement("GRANT SELECT, UPDATE ON kawaland.detail_karyawan TO 'manager'@'localhost'");
        DB::statement("GRANT ALL ON kawaland.failed_jobs TO 'manager'@'localhost'");
        DB::statement("GRANT SELECT, INSERT, UPDATE ON kawaland.gudang TO 'manager'@'localhost'");
        DB::statement("GRANT ALL ON kawaland.jobs TO 'manager'@'localhost'");
        DB::statement("GRANT ALL ON kawaland.job_batches TO 'manager'@'localhost'");
        DB::statement("GRANT SELECT ON kawaland.karyawan TO 'manager'@'localhost'");
        DB::statement("GRANT SELECT, INSERT, UPDATE ON kawaland.log_absensi TO 'manager'@'localhost'");
        DB::statement("GRANT ALL ON kawaland.migrations TO 'manager'@'localhost'");
        DB::statement("GRANT ALL ON kawaland.password_reset_tokens TO 'manager'@'localhost'");
        DB::statement("GRANT SELECT, INSERT, UPDATE ON kawaland.permissions TO 'manager'@'localhost'");
        DB::statement("GRANT SELECT, INSERT, UPDATE ON kawaland.reports TO 'manager'@'localhost'");
        DB::statement("GRANT SELECT, UPDATE ON kawaland.requests TO 'manager'@'localhost'");
        DB::statement("GRANT SELECT, UPDATE ON kawaland.request_items TO 'manager'@'localhost'");
        DB::statement("GRANT ALL ON kawaland.sessions TO 'manager'@'localhost'");
        DB::statement("GRANT SELECT, UPDATE ON kawaland.users TO 'manager'@'localhost'");
        DB::statement("GRANT SELECT, INSERT, UPDATE ON kawaland.warehouse_logs TO 'manager'@'localhost'");

        //grant permissions untuk mengeksekusi stored procedures dan functions
        DB::statement("GRANT EXECUTE ON kawaland.* TO 'manager'@'localhost'");


        // grant persmissions untuk admin
        DB::statement("GRANT ALL ON kawaland.* TO 'admin'@'localhost'");


        // Reload privileges untuk apply changes
        DB::statement("FLUSH PRIVILEGES");
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Reload privileges
        DB::statement("FLUSH PRIVILEGES");
    }
};