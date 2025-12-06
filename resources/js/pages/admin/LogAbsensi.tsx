'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, Calendar, User, Clock, FileText, Download, ChevronDown } from 'lucide-react';
import Header from '../../components/admin/dashboard/Header';
import Sidebar from '../../components/admin/dashboard/Sidebar';

// Tipe data untuk log absensi
interface LogAbsensi {
  id_log: string;
  id_karyawan: string;
  nama_karyawan: string;
  tanggal_waktu: string;
  jenis_aksi: 'Add' | 'Delete' | 'Edit';
  user_hr: string;
  keterangan?: string;
}

export default function LogAbsensiPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [logs, setLogs] = useState<LogAbsensi[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<LogAbsensi[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // State untuk filter
  const [filterTanggal, setFilterTanggal] = useState<'hari-ini' | 'rentang' | 'bulan' | 'semua'>('semua');
  const [tanggalMulai, setTanggalMulai] = useState<string>('');
  const [tanggalSelesai, setTanggalSelesai] = useState<string>('');
  const [bulan, setBulan] = useState<string>('');
  const [tahun, setTahun] = useState<string>(new Date().getFullYear().toString());
  
  // Filter aksi
  const [filterAksi, setFilterAksi] = useState<'semua' | 'Add' | 'Delete' | 'Edit'>('semua');
  
  // Search
  const [searchQuery, setSearchQuery] = useState('');
  
  // Untuk dropdown filter
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  
  // Inisialisasi data contoh (gantikan dengan data real dari API)
  useEffect(() => {
    // Data contoh untuk log absensi
    const contohLogs: LogAbsensi[] = [
      {
        id_log: 'LOG001',
        id_karyawan: 'K001',
        nama_karyawan: 'Ahmad Fauzi',
        tanggal_waktu: '2024-03-15 08:30:15',
        jenis_aksi: 'Add',
        user_hr: 'HR001 - Siti Nurhaliza',
        keterangan: 'Menambahkan absensi masuk untuk Ahmad Fauzi'
      },
      {
        id_log: 'LOG002',
        id_karyawan: 'K002',
        nama_karyawan: 'Budi Santoso',
        tanggal_waktu: '2024-03-15 09:15:22',
        jenis_aksi: 'Edit',
        user_hr: 'HR002 - Dewi Lestari',
        keterangan: 'Mengubah jam masuk dari 08:00 menjadi 08:30'
      },
      {
        id_log: 'LOG003',
        id_karyawan: 'K003',
        nama_karyawan: 'Citra Dewi',
        tanggal_waktu: '2024-03-14 14:45:10',
        jenis_aksi: 'Delete',
        user_hr: 'HR001 - Siti Nurhaliza',
        keterangan: 'Menghapus data absensi yang keliru'
      },
      {
        id_log: 'LOG004',
        id_karyawan: 'K004',
        nama_karyawan: 'Dian Pratama',
        tanggal_waktu: '2024-03-14 16:20:05',
        jenis_aksi: 'Add',
        user_hr: 'HR003 - Rizky Abdullah',
        keterangan: 'Menambahkan absensi pulang untuk Dian Pratama'
      },
      {
        id_log: 'LOG005',
        id_karyawan: 'K005',
        nama_karyawan: 'Eka Putri',
        tanggal_waktu: '2024-03-13 10:05:30',
        jenis_aksi: 'Edit',
        user_hr: 'HR002 - Dewi Lestari',
        keterangan: 'Memperbarui keterangan absensi dari Sakit menjadi Izin'
      },
      {
        id_log: 'LOG006',
        id_karyawan: 'K006',
        nama_karyawan: 'Fajar Ramadhan',
        tanggal_waktu: '2024-03-12 11:30:45',
        jenis_aksi: 'Add',
        user_hr: 'HR001 - Siti Nurhaliza',
        keterangan: 'Menambahkan absensi untuk karyawan baru'
      },
      {
        id_log: 'LOG007',
        id_karyawan: 'K007',
        nama_karyawan: 'Gita Ayu',
        tanggal_waktu: '2024-03-11 13:15:20',
        jenis_aksi: 'Edit',
        user_hr: 'HR003 - Rizky Abdullah',
        keterangan: 'Mengubah status absensi dari Tanpa Keterangan menjadi Hadir'
      },
      {
        id_log: 'LOG008',
        id_karyawan: 'K008',
        nama_karyawan: 'Hendra Wijaya',
        tanggal_waktu: '2024-03-10 15:45:10',
        jenis_aksi: 'Delete',
        user_hr: 'HR002 - Dewi Lestari',
        keterangan: 'Menghapus duplikat data absensi'
      },
    ];
    
    setLogs(contohLogs);
    setFilteredLogs(contohLogs);
    setIsLoading(false);
    
    // Set tanggal default untuk filter
    const today = new Date().toISOString().split('T')[0];
    setTanggalMulai(today);
    setTanggalSelesai(today);
    setBulan((new Date().getMonth() + 1).toString().padStart(2, '0'));
  }, []);
  
  // Fungsi untuk menerapkan filter
  const applyFilters = () => {
    let filtered = [...logs];
    
    // Filter berdasarkan search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(log => 
        log.id_karyawan.toLowerCase().includes(query) ||
        log.nama_karyawan.toLowerCase().includes(query) ||
        log.user_hr.toLowerCase().includes(query) ||
        log.keterangan?.toLowerCase().includes(query)
      );
    }
    
    // Filter berdasarkan jenis aksi
    if (filterAksi !== 'semua') {
      filtered = filtered.filter(log => log.jenis_aksi === filterAksi);
    }
    
    // Filter berdasarkan waktu
    if (filterTanggal === 'hari-ini') {
      const today = new Date().toISOString().split('T')[0];
      filtered = filtered.filter(log => log.tanggal_waktu.split(' ')[0] === today);
    } else if (filterTanggal === 'rentang' && tanggalMulai && tanggalSelesai) {
      filtered = filtered.filter(log => {
        const logDate = log.tanggal_waktu.split(' ')[0];
        return logDate >= tanggalMulai && logDate <= tanggalSelesai;
      });
    } else if (filterTanggal === 'bulan' && bulan && tahun) {
      const targetMonth = `${tahun}-${bulan.padStart(2, '0')}`;
      filtered = filtered.filter(log => log.tanggal_waktu.startsWith(targetMonth));
    }
    
    setFilteredLogs(filtered);
    setShowFilterDropdown(false);
  };
  
  // Reset filter
  const resetFilters = () => {
    setFilterTanggal('semua');
    setFilterAksi('semua');
    setSearchQuery('');
    setFilteredLogs(logs);
    setShowFilterDropdown(false);
  };
  
  // Format tanggal untuk tampilan
  const formatTanggal = (dateTime: string) => {
    const [date, time] = dateTime.split(' ');
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year} ${time}`;
  };
  
  // Badge warna berdasarkan jenis aksi
  const getAksiBadgeClass = (aksi: string) => {
    switch (aksi) {
      case 'Add': return 'bg-green-100 text-green-800 border border-green-200';
      case 'Edit': return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
      case 'Delete': return 'bg-red-100 text-red-800 border border-red-200';
      default: return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };
  
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  
  return (
    <div className="flex min-h-screen bg-[#f5f7fa] font-[Poppins,Segoe_UI,system-ui,sans-serif] transition-all duration-300">
      {/* === SIDEBAR === */}
      <div
        className={`fixed top-0 left-0 z-150 h-full w-[260px] bg-white shadow-md transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar />
      </div>

      {/* === MAIN CONTENT === */}
      <div
        className={`flex min-h-screen flex-1 flex-col transition-all duration-300 ${
          isSidebarOpen ? 'ml-[260px]' : 'ml-0'
        }`}
      >
        {/* === HEADER === */}
        <div
          className={`fixed top-0 right-0 z-200 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.05)] transition-all duration-300 ${
            isSidebarOpen ? 'left-[260px]' : 'left-0'
          }`}
        >
          <Header
            isSidebarOpen={isSidebarOpen}
            onToggleSidebar={toggleSidebar}
          />
        </div>

        {/* === ISI HALAMAN === */}
        <div className="px-8 pb-8 flex flex-1 flex-col gap-6 pt-24 transition-all duration-300">
          {/* Header Halaman */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Log Aktivitas Absensi</h1>
              <p className="text-gray-600">Riwayat seluruh aksi absensi yang dilakukan oleh HR</p>
            </div>
            
            <button className="flex items-center gap-2 px-4 py-2 bg-[#4789A8] text-white rounded-lg hover:bg-[#3a7895] transition-colors">
              <Download size={18} />
              <span>Export CSV</span>
            </button>
          </div>
          
          {/* Filter dan Pencarian */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex flex-col md:flex-row gap-4 items-end">
              {/* Search Bar */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Cari Log</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Cari berdasarkan ID, nama karyawan, atau user HR..."
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4789A8] focus:border-transparent outline-none"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              {/* Filter Dropdown Trigger */}
              <div className="relative">
                <button 
                  className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                >
                  <Filter size={18} />
                  <span>Filter</span>
                  <ChevronDown size={16} />
                </button>
                
                {/* Filter Dropdown Content */}
                {showFilterDropdown && (
                  <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg p-5 w-80 z-10">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium text-gray-800">Filter Data</h3>
                      <button 
                        className="text-sm text-[#4789A8] hover:underline"
                        onClick={resetFilters}
                      >
                        Reset
                      </button>
                    </div>
                    
                    {/* Filter Waktu */}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                        <Calendar size={14} />
                        Filter Waktu
                      </h4>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="semua-waktu"
                            name="filterWaktu"
                            checked={filterTanggal === 'semua'}
                            onChange={() => setFilterTanggal('semua')}
                            className="mr-2"
                          />
                          <label htmlFor="semua-waktu" className="text-sm">Semua Waktu</label>
                        </div>
                        
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="hari-ini"
                            name="filterWaktu"
                            checked={filterTanggal === 'hari-ini'}
                            onChange={() => setFilterTanggal('hari-ini')}
                            className="mr-2"
                          />
                          <label htmlFor="hari-ini" className="text-sm">Hari Ini</label>
                        </div>
                        
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="rentang"
                            name="filterWaktu"
                            checked={filterTanggal === 'rentang'}
                            onChange={() => setFilterTanggal('rentang')}
                            className="mr-2"
                          />
                          <label htmlFor="rentang" className="text-sm">Rentang Tanggal</label>
                        </div>
                        
                        {filterTanggal === 'rentang' && (
                          <div className="grid grid-cols-2 gap-2 ml-6">
                            <div>
                              <label className="text-xs text-gray-500">Dari</label>
                              <input
                                type="date"
                                className="w-full p-1.5 border border-gray-300 rounded text-sm"
                                value={tanggalMulai}
                                onChange={(e) => setTanggalMulai(e.target.value)}
                              />
                            </div>
                            <div>
                              <label className="text-xs text-gray-500">Sampai</label>
                              <input
                                type="date"
                                className="w-full p-1.5 border border-gray-300 rounded text-sm"
                                value={tanggalSelesai}
                                onChange={(e) => setTanggalSelesai(e.target.value)}
                              />
                            </div>
                          </div>
                        )}
                        
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="bulan"
                            name="filterWaktu"
                            checked={filterTanggal === 'bulan'}
                            onChange={() => setFilterTanggal('bulan')}
                            className="mr-2"
                          />
                          <label htmlFor="bulan" className="text-sm">Bulan/Tahun</label>
                        </div>
                        
                        {filterTanggal === 'bulan' && (
                          <div className="grid grid-cols-2 gap-2 ml-6">
                            <div>
                              <label className="text-xs text-gray-500">Bulan</label>
                              <select
                                className="w-full p-1.5 border border-gray-300 rounded text-sm"
                                value={bulan}
                                onChange={(e) => setBulan(e.target.value)}
                              >
                                <option value="01">Januari</option>
                                <option value="02">Februari</option>
                                <option value="03">Maret</option>
                                <option value="04">April</option>
                                <option value="05">Mei</option>
                                <option value="06">Juni</option>
                                <option value="07">Juli</option>
                                <option value="08">Agustus</option>
                                <option value="09">September</option>
                                <option value="10">Oktober</option>
                                <option value="11">November</option>
                                <option value="12">Desember</option>
                              </select>
                            </div>
                            <div>
                              <label className="text-xs text-gray-500">Tahun</label>
                              <input
                                type="number"
                                className="w-full p-1.5 border border-gray-300 rounded text-sm"
                                value={tahun}
                                onChange={(e) => setTahun(e.target.value)}
                                min="2020"
                                max="2030"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Filter Aksi */}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Jenis Aksi</h4>
                      <div className="flex flex-wrap gap-2">
                        {['semua', 'Add', 'Edit', 'Delete'].map((aksi) => (
                          <button
                            key={aksi}
                            className={`px-3 py-1.5 rounded-full text-sm ${filterAksi === aksi ? 'bg-[#4789A8] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                            onClick={() => setFilterAksi(aksi as any)}
                          >
                            {aksi === 'semua' ? 'Semua Aksi' : aksi}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <button
                      className="w-full py-2.5 bg-[#4789A8] text-white rounded-lg hover:bg-[#3a7895] transition-colors"
                      onClick={applyFilters}
                    >
                      Terapkan Filter
                    </button>
                  </div>
                )}
              </div>
              
              <button
                className="px-4 py-2.5 bg-[#4789A8] text-white rounded-lg hover:bg-[#3a7895] transition-colors"
                onClick={applyFilters}
              >
                Terapkan
              </button>
            </div>
            
            {/* Filter Aktif */}
            <div className="mt-4 flex flex-wrap gap-2">
              {filterTanggal !== 'semua' && (
                <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                  <Calendar size={12} />
                  {filterTanggal === 'hari-ini' && 'Hari Ini'}
                  {filterTanggal === 'rentang' && `Rentang: ${tanggalMulai} s/d ${tanggalSelesai}`}
                  {filterTanggal === 'bulan' && `Bulan: ${bulan}/${tahun}`}
                  <button onClick={() => setFilterTanggal('semua')} className="ml-1">×</button>
                </span>
              )}
              
              {filterAksi !== 'semua' && (
                <span className="inline-flex items-center gap-1 bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm">
                  <FileText size={12} />
                  Aksi: {filterAksi}
                  <button onClick={() => setFilterAksi('semua')} className="ml-1">×</button>
                </span>
              )}
              
              {searchQuery && (
                <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                  <Search size={12} />
                  Pencarian: "{searchQuery}"
                  <button onClick={() => setSearchQuery('')} className="ml-1">×</button>
                </span>
              )}
            </div>
          </div>
          
          {/* Statistik Ringkas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Log</p>
                  <p className="text-2xl font-bold text-gray-800">{filteredLogs.length}</p>
                </div>
                <div className="p-2 bg-blue-50 rounded-lg">
                  <FileText size={20} className="text-[#4789A8]" />
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Aksi Add</p>
                  <p className="text-2xl font-bold text-green-600">
                    {filteredLogs.filter(log => log.jenis_aksi === 'Add').length}
                  </p>
                </div>
                <div className="p-2 bg-green-50 rounded-lg">
                  <FileText size={20} className="text-green-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Aksi Edit</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {filteredLogs.filter(log => log.jenis_aksi === 'Edit').length}
                  </p>
                </div>
                <div className="p-2 bg-yellow-50 rounded-lg">
                  <FileText size={20} className="text-yellow-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Aksi Delete</p>
                  <p className="text-2xl font-bold text-red-600">
                    {filteredLogs.filter(log => log.jenis_aksi === 'Delete').length}
                  </p>
                </div>
                <div className="p-2 bg-red-50 rounded-lg">
                  <FileText size={20} className="text-red-600" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Tabel Log Absensi */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800">Daftar Log Absensi</h2>
            </div>
            
            {isLoading ? (
              <div className="p-8 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#4789A8]"></div>
                <p className="mt-2 text-gray-500">Memuat data log absensi...</p>
              </div>
            ) : filteredLogs.length === 0 ? (
              <div className="p-8 text-center">
                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <FileText size={24} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-700">Tidak ada data log</h3>
                <p className="text-gray-500 mt-1">Tidak ditemukan log absensi yang sesuai dengan filter yang diterapkan.</p>
                <button 
                  className="mt-4 px-4 py-2 text-[#4789A8] hover:bg-blue-50 rounded-lg transition-colors"
                  onClick={resetFilters}
                >
                  Reset filter
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">ID Log</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Karyawan</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Tanggal & Waktu</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Jenis Aksi</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">User HR</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Keterangan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredLogs.map((log) => (
                      <tr key={log.id_log} className="hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-4">
                          <div className="font-medium text-gray-800">{log.id_log}</div>
                          <div className="text-xs text-gray-500">ID: {log.id_karyawan}</div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-[#4789A8]/10 flex items-center justify-center">
                              <User size={14} className="text-[#4789A8]" />
                            </div>
                            <span className="font-medium">{log.nama_karyawan}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1 text-gray-700">
                            <Clock size={14} />
                            <span>{formatTanggal(log.tanggal_waktu)}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getAksiBadgeClass(log.jenis_aksi)}`}>
                            {log.jenis_aksi}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-gray-700">{log.user_hr}</div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-sm text-gray-600 max-w-xs">{log.keterangan}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            
            {/* Pagination */}
            {filteredLogs.length > 0 && (
              <div className="p-4 border-t border-gray-100 flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  Menampilkan <span className="font-medium">1-{filteredLogs.length}</span> dari <span className="font-medium">{filteredLogs.length}</span> log
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                    Sebelumnya
                  </button>
                  <button className="px-3 py-1.5 bg-[#4789A8] text-white rounded-lg text-sm hover:bg-[#3a7895]">
                    1
                  </button>
                  <button className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                    2
                  </button>
                  <button className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                    Selanjutnya
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}