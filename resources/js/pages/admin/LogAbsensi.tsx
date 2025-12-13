'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, Calendar, User, Clock, FileText, Download, ChevronDown, ChevronUp, X } from 'lucide-react';
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
  const [isMobile, setIsMobile] = useState(false);
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
  
  // Deteksi ukuran layar untuk responsif
  useEffect(() => {
    const checkIfMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      if (mobile && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
      if (!mobile && !isSidebarOpen) {
        setIsSidebarOpen(true);
      }
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Close sidebar on mobile when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.querySelector('.mobile-sidebar');
      const toggleButton = document.querySelector('.sidebar-toggle-button');
      
      if (isMobile && isSidebarOpen && 
          sidebar && 
          !sidebar.contains(event.target as Node) &&
          toggleButton &&
          !toggleButton.contains(event.target as Node)) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile, isSidebarOpen]);
  
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
    <div className="flex min-h-screen bg-[#f5f7fa] font-[Poppins,Segoe_UI,system-ui,sans-serif]">
      {/* === SIDEBAR === */}
      <div
        className={`hidden md:block fixed top-0 left-0 z-50 h-full w-[260px] bg-white shadow-md transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar />
      </div>

      {/* Sidebar Mobile Overlay */}
      {isMobile && isSidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={toggleSidebar}
          ></div>
          <div className="mobile-sidebar fixed top-0 left-0 z-50 h-full w-[260px] bg-white shadow-lg transition-transform duration-300 translate-x-0">
            <Sidebar />
          </div>
        </>
      )}

      {/* === MAIN CONTENT === */}
      <div
        className={`flex min-h-screen flex-1 flex-col transition-all duration-300 w-full ${
          isSidebarOpen ? 'md:ml-[260px]' : 'ml-0'
        }`}
      >
        {/* === HEADER === */}
        <div
          className={`fixed top-0 right-0 z-40 bg-white shadow-sm transition-all duration-300 w-full ${
            isSidebarOpen ? 'md:left-[260px] md:w-[calc(100%-260px)]' : 'left-0'
          }`}
        >
          <Header
            isSidebarOpen={isSidebarOpen}
            onToggleSidebar={toggleSidebar}
          />
        </div>

        {/* === ISI HALAMAN === */}
        <div className="px-4 sm:px-6 lg:px-8 pb-6 flex flex-col flex-1 gap-4 md:gap-6 pt-20 md:pt-28 transition-all duration-300">
          {/* Header Halaman */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 md:p-3 bg-[#4789A8]/10 rounded-lg">
                <FileText className="w-5 h-5 md:w-6 md:h-6 text-[#4789A8]" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-gray-800">Log Aktivitas Absensi</h1>
                <p className="text-gray-600 text-sm md:text-base">Riwayat seluruh aksi absensi yang dilakukan oleh HR</p>
              </div>
            </div>
            
            <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#4789A8] text-white rounded-lg hover:bg-[#3a7895] transition-colors w-full md:w-auto">
              <Download size={18} />
              <span className="text-sm md:text-base">Export CSV</span>
            </button>
          </div>
          
          {/* Statistik Ringkas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            <div className="bg-white p-4 rounded-lg md:rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-gray-500">Total Log</p>
                  <p className="text-xl md:text-2xl font-bold text-gray-800">{filteredLogs.length}</p>
                </div>
                <div className="p-2 bg-blue-50 rounded-lg">
                  <FileText size={18} className="text-[#4789A8]" />
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg md:rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-gray-500">Aksi Add</p>
                  <p className="text-xl md:text-2xl font-bold text-green-600">
                    {filteredLogs.filter(log => log.jenis_aksi === 'Add').length}
                  </p>
                </div>
                <div className="p-2 bg-green-50 rounded-lg">
                  <FileText size={18} className="text-green-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg md:rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-gray-500">Aksi Edit</p>
                  <p className="text-xl md:text-2xl font-bold text-yellow-600">
                    {filteredLogs.filter(log => log.jenis_aksi === 'Edit').length}
                  </p>
                </div>
                <div className="p-2 bg-yellow-50 rounded-lg">
                  <FileText size={18} className="text-yellow-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg md:rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-gray-500">Aksi Delete</p>
                  <p className="text-xl md:text-2xl font-bold text-red-600">
                    {filteredLogs.filter(log => log.jenis_aksi === 'Delete').length}
                  </p>
                </div>
                <div className="p-2 bg-red-50 rounded-lg">
                  <FileText size={18} className="text-red-600" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Filter dan Pencarian */}
          <div className="bg-white rounded-lg md:rounded-xl shadow-sm border border-gray-100 p-4 md:p-5">
            {/* Search Bar */}
            <div className="mb-4">
              <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">Cari Log</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Cari berdasarkan ID, nama karyawan, atau user HR..."
                  className="w-full pl-10 pr-4 py-2.5 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4789A8] focus:border-transparent outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            {/* Filter Actions */}
            <div className="flex flex-col md:flex-row gap-3">
              {/* Filter Button */}
              <div className="relative flex-1">
                <button 
                  className="flex items-center justify-between gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors w-full text-sm md:text-base"
                  onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                >
                  <div className="flex items-center gap-2">
                    <Filter size={18} />
                    <span>Filter Data</span>
                  </div>
                  {showFilterDropdown ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                
                {/* Filter Dropdown Content - Mobile Full Screen / Desktop Dropdown */}
                {showFilterDropdown && (
                  <div className={`fixed md:absolute inset-0 md:inset-auto md:top-full md:right-0 md:mt-2 w-full md:w-80 bg-white border border-gray-200 rounded-lg md:rounded-xl shadow-lg z-50 md:z-10 overflow-y-auto max-h-screen md:max-h-[80vh]`}>
                    <div className="p-4 md:p-5">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-medium text-gray-800 text-base md:text-lg">Filter Data</h3>
                        <div className="flex items-center gap-2">
                          <button 
                            className="text-sm text-[#4789A8] hover:underline hidden md:block"
                            onClick={resetFilters}
                          >
                            Reset
                          </button>
                          <button 
                            className="md:hidden p-1"
                            onClick={() => setShowFilterDropdown(false)}
                          >
                            <X size={20} className="text-gray-500" />
                          </button>
                        </div>
                      </div>
                      
                      {/* Filter Waktu */}
                      <div className="mb-6">
                        <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                          <Calendar size={16} />
                          Filter Waktu
                        </h4>
                        <div className="space-y-3">
                          <div className="flex items-center">
                            <input
                              type="radio"
                              id="semua-waktu"
                              name="filterWaktu"
                              checked={filterTanggal === 'semua'}
                              onChange={() => setFilterTanggal('semua')}
                              className="mr-3"
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
                              className="mr-3"
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
                              className="mr-3"
                            />
                            <label htmlFor="rentang" className="text-sm">Rentang Tanggal</label>
                          </div>
                          
                          {filterTanggal === 'rentang' && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 ml-6">
                              <div>
                                <label className="text-xs text-gray-500">Dari</label>
                                <input
                                  type="date"
                                  className="w-full p-2 border border-gray-300 rounded text-sm"
                                  value={tanggalMulai}
                                  onChange={(e) => setTanggalMulai(e.target.value)}
                                />
                              </div>
                              <div>
                                <label className="text-xs text-gray-500">Sampai</label>
                                <input
                                  type="date"
                                  className="w-full p-2 border border-gray-300 rounded text-sm"
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
                              className="mr-3"
                            />
                            <label htmlFor="bulan" className="text-sm">Bulan/Tahun</label>
                          </div>
                          
                          {filterTanggal === 'bulan' && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 ml-6">
                              <div>
                                <label className="text-xs text-gray-500">Bulan</label>
                                <select
                                  className="w-full p-2 border border-gray-300 rounded text-sm"
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
                                  className="w-full p-2 border border-gray-300 rounded text-sm"
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
                      <div className="mb-6">
                        <h4 className="text-sm font-medium text-gray-700 mb-3">Jenis Aksi</h4>
                        <div className="flex flex-wrap gap-2">
                          {['semua', 'Add', 'Edit', 'Delete'].map((aksi) => (
                            <button
                              key={aksi}
                              className={`px-3 py-2 rounded-lg text-sm ${filterAksi === aksi ? 'bg-[#4789A8] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                              onClick={() => setFilterAksi(aksi as any)}
                            >
                              {aksi === 'semua' ? 'Semua' : aksi}
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-3">
                        <button
                          className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex-1 text-sm md:text-base"
                          onClick={resetFilters}
                        >
                          Reset
                        </button>
                        <button
                          className="px-4 py-2.5 bg-[#4789A8] text-white rounded-lg hover:bg-[#3a7895] transition-colors flex-1 text-sm md:text-base"
                          onClick={applyFilters}
                        >
                          Terapkan Filter
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <button
                className="px-4 py-2.5 bg-[#4789A8] text-white rounded-lg hover:bg-[#3a7895] transition-colors text-sm md:text-base"
                onClick={applyFilters}
              >
                Terapkan
              </button>
            </div>
            
            {/* Filter Aktif */}
            {(filterTanggal !== 'semua' || filterAksi !== 'semua' || searchQuery) && (
              <div className="mt-4 flex flex-wrap gap-2">
                {filterTanggal !== 'semua' && (
                  <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-xs">
                    <Calendar size={12} />
                    {filterTanggal === 'hari-ini' && 'Hari Ini'}
                    {filterTanggal === 'rentang' && `${tanggalMulai} s/d ${tanggalSelesai}`}
                    {filterTanggal === 'bulan' && `${bulan}/${tahun}`}
                    <button onClick={() => setFilterTanggal('semua')} className="ml-1 hover:text-blue-900">×</button>
                  </span>
                )}
                
                {filterAksi !== 'semua' && (
                  <span className="inline-flex items-center gap-1 bg-purple-50 text-purple-700 px-3 py-1.5 rounded-full text-xs">
                    <FileText size={12} />
                    {filterAksi}
                    <button onClick={() => setFilterAksi('semua')} className="ml-1 hover:text-purple-900">×</button>
                  </span>
                )}
                
                {searchQuery && (
                  <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-xs">
                    <Search size={12} />
                    "{searchQuery}"
                    <button onClick={() => setSearchQuery('')} className="ml-1 hover:text-gray-900">×</button>
                  </span>
                )}
              </div>
            )}
          </div>
          
          {/* Tabel Log Absensi */}
          <div className="bg-white rounded-lg md:rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 md:p-5 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800">Daftar Log Absensi</h2>
            </div>
            
            {isLoading ? (
              <div className="p-8 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#4789A8]"></div>
                <p className="mt-2 text-gray-500 text-sm md:text-base">Memuat data log absensi...</p>
              </div>
            ) : filteredLogs.length === 0 ? (
              <div className="p-8 text-center">
                <div className="mx-auto w-12 h-12 md:w-16 md:h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <FileText size={20} className="text-gray-400" />
                </div>
                <h3 className="text-base md:text-lg font-medium text-gray-700">Tidak ada data log</h3>
                <p className="text-gray-500 text-xs md:text-sm mt-1">Tidak ditemukan log absensi yang sesuai dengan filter yang diterapkan.</p>
                <button 
                  className="mt-4 px-4 py-2 text-[#4789A8] hover:bg-blue-50 rounded-lg transition-colors text-sm md:text-base"
                  onClick={resetFilters}
                >
                  Reset filter
                </button>
              </div>
            ) : (
              <>
                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full min-w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">ID Log</th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Karyawan</th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Tanggal & Waktu</th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Jenis Aksi</th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">User HR</th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Keterangan</th>
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
                            <div className="flex items-center gap-1 text-gray-700 text-sm">
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
                            <div className="text-gray-700 text-sm">{log.user_hr}</div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="text-sm text-gray-600 max-w-xs">{log.keterangan}</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {/* Mobile Card View */}
                <div className="md:hidden divide-y divide-gray-200">
                  {filteredLogs.map((log) => (
                    <div key={log.id_log} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 rounded-full bg-[#4789A8]/10 flex items-center justify-center">
                              <User size={14} className="text-[#4789A8]" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-800 text-sm">{log.nama_karyawan}</div>
                              <div className="text-xs text-gray-500">ID: {log.id_karyawan}</div>
                            </div>
                          </div>
                          <div className="text-xs text-gray-500 mb-1">Log ID: {log.id_log}</div>
                          <div className="flex items-center gap-1 text-gray-700 text-xs">
                            <Clock size={12} />
                            <span>{formatTanggal(log.tanggal_waktu)}</span>
                          </div>
                        </div>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getAksiBadgeClass(log.jenis_aksi)}`}>
                          {log.jenis_aksi}
                        </span>
                      </div>
                      
                      <div className="pt-3 border-t border-gray-100">
                        <div className="mb-2">
                          <div className="text-xs text-gray-500">User HR</div>
                          <div className="text-sm text-gray-700">{log.user_hr}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">Keterangan</div>
                          <div className="text-sm text-gray-600">{log.keterangan}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
            
            {/* Pagination */}
            {filteredLogs.length > 0 && (
              <div className="p-4 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-3">
                <div className="text-xs md:text-sm text-gray-500">
                  Menampilkan <span className="font-medium">1-{filteredLogs.length}</span> dari <span className="font-medium">{filteredLogs.length}</span> log
                </div>
                <div className="flex gap-1 md:gap-2 overflow-x-auto pb-1">
                  <button className="px-2 md:px-3 py-1.5 border border-gray-300 rounded-lg text-xs md:text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed min-w-[80px]">
                    Sebelumnya
                  </button>
                  <button className="px-3 py-1.5 bg-[#4789A8] text-white rounded-lg text-xs md:text-sm hover:bg-[#3a7895] min-w-[32px]">
                    1
                  </button>
                  <button className="px-3 py-1.5 border border-gray-300 rounded-lg text-xs md:text-sm hover:bg-gray-50 min-w-[32px]">
                    2
                  </button>
                  <button className="px-2 md:px-3 py-1.5 border border-gray-300 rounded-lg text-xs md:text-sm hover:bg-gray-50 min-w-[80px]">
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