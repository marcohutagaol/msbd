'use client';

import { useState, useEffect } from 'react';
import Header from '../../components/admin/dashboard/Header';
import Sidebar from '../../components/admin/dashboard/Sidebar';
import { 
  FaStethoscope, 
  FaUmbrellaBeach, 
  FaUserClock, 
  FaChevronUp, 
  FaChevronDown,
  FaCalendarAlt,
  FaUser,
  FaFileMedical,
  FaClipboardCheck,
  FaTimes,
  FaEye,
  FaFileDownload,
  FaChartLine,
  FaChartBar,
  FaChartPie,
  FaFilter,
  FaCalendar,
  FaChevronRight,
  FaBuilding,
  FaUsers,
  FaUserTie
} from 'react-icons/fa';
import { 
  MdSick, 
  MdBedtime, 
  MdEventAvailable,
  MdPendingActions,
  MdCheckCircle,
  MdCancel,
  MdExpandMore,
  MdDateRange,
  MdBusinessCenter
} from 'react-icons/md';

interface PermissionData {
  id: number;
  nama: string;
  departemen: string;
  jenis: 'Sakit' | 'Cuti' | 'Izin';
  status: 'Pending' | 'Disetujui' | 'Ditolak';
  tanggal: string;
  alasan: string;
  lampiran?: string;
  catatanHR?: string;
}

interface DashboardProps {
  hadir: number;
  sakit: number;
  izin: number;
  belum_absen: number;
  tanpa_keterangan: number;
}

export default function PermissionPage({
  hadir,
  sakit,
  izin,
  belum_absen,
  tanpa_keterangan,
}: DashboardProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedPermission, setSelectedPermission] = useState<PermissionData | null>(null);
  const [chartType, setChartType] = useState<'line' | 'bar' | 'pie'>('bar');
  const [filterJenis, setFilterJenis] = useState<string>('semua');
  const [filterStatus, setFilterStatus] = useState<string>('semua');
  const [filterDepartemen, setFilterDepartemen] = useState<string>('semua');
  const [filterTanggal, setFilterTanggal] = useState<string>('semua');
  const [showFilterJenis, setShowFilterJenis] = useState(false);
  const [showFilterStatus, setShowFilterStatus] = useState(false);
  const [showFilterDepartemen, setShowFilterDepartemen] = useState(false);
  const [showFilterTanggal, setShowFilterTanggal] = useState(false);
  const [filteredData, setFilteredData] = useState<PermissionData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  // Data dummy untuk card ringkasan
  const summaryData = [
    { 
      jenis: 'Sakit', 
      total: 24, 
      trend: 'naik', 
      persentase: 12, 
      icon: <MdSick size={28} />,
      color: 'from-red-400 to-red-600'
    },
    { 
      jenis: 'Cuti', 
      total: 18, 
      trend: 'turun', 
      persentase: 8, 
      icon: <FaUmbrellaBeach size={28} />,
      color: 'from-amber-400 to-amber-600'
    },
    { 
      jenis: 'Izin', 
      total: 42, 
      trend: 'naik', 
      persentase: 15, 
      icon: <FaUserClock size={28} />,
      color: 'from-blue-400 to-blue-600'
    },
  ];

  // Data dummy untuk tabel dengan departemen
  const permissionData: PermissionData[] = [
    { id: 1, nama: 'Ahmad Santoso', departemen: 'Front Office', jenis: 'Sakit', status: 'Pending', tanggal: '2024-03-15', alasan: 'Demam tinggi dan batuk', lampiran: 'surat_sakit_ahmad.jpg', catatanHR: 'Menunggu konfirmasi dari supervisor' },
    { id: 2, nama: 'Budi Prasetyo', departemen: 'Food & Beverage', jenis: 'Cuti', status: 'Disetujui', tanggal: '2024-03-14', alasan: 'Cuti tahunan', catatanHR: 'Cuti disetujui sesuai hak karyawan' },
    { id: 3, nama: 'Citra Dewi', departemen: 'Housekeeping', jenis: 'Izin', status: 'Ditolak', tanggal: '2024-03-13', alasan: 'Keperluan keluarga mendadak', catatanHR: 'Tidak disetujui karena deadline proyek' },
    { id: 4, nama: 'Dedi Setiawan', departemen: 'Front Office', jenis: 'Sakit', status: 'Disetujui', tanggal: '2024-03-12', alasan: 'Operasi kecil', lampiran: 'surat_dokter_dedi.pdf' },
    { id: 5, nama: 'Eka Putri', departemen: 'Accounting & Administration', jenis: 'Cuti', status: 'Pending', tanggal: '2024-03-11', alasan: 'Menikah', catatanHR: 'Menunggu pengajuan dokumen' },
    { id: 6, nama: 'Fajar Ramadhan', departemen: 'Food & Beverage', jenis: 'Izin', status: 'Disetujui', tanggal: '2024-03-10', alasan: 'Menghadiri seminar', lampiran: 'undangan_seminar.jpg' },
    { id: 7, nama: 'Gita Maharani', departemen: 'Housekeeping', jenis: 'Sakit', status: 'Disetujui', tanggal: '2024-03-09', alasan: 'Pusing migrain', catatanHR: 'Disetujui dengan catatan' },
    { id: 8, nama: 'Hendra Wijaya', departemen: 'Accounting & Administration', jenis: 'Izin', status: 'Pending', tanggal: '2024-03-08', alasan: 'Keperluan administrasi' },
    { id: 9, nama: 'Indra Kurniawan', departemen: 'Front Office', jenis: 'Cuti', status: 'Disetujui', tanggal: '2024-03-07', alasan: 'Liburan keluarga', catatanHR: 'Cuti disetujui' },
    { id: 10, nama: 'Joko Susilo', departemen: 'Food & Beverage', jenis: 'Sakit', status: 'Pending', tanggal: '2024-03-06', alasan: 'Sakit perut', lampiran: 'surat_dokter_joko.jpg' },
  ];

  // Data untuk filter
  const jenisOptions = [
    { value: 'semua', label: 'Semua Jenis', icon: <FaFilter className="text-[#4789A8]" /> },
    { value: 'Sakit', label: 'Sakit', icon: <MdSick className="text-red-500" /> },
    { value: 'Cuti', label: 'Cuti', icon: <FaUmbrellaBeach className="text-amber-500" /> },
    { value: 'Izin', label: 'Izin', icon: <FaUserClock className="text-blue-500" /> },
  ];

  const statusOptions = [
    { value: 'semua', label: 'Semua Status', icon: <FaFilter className="text-[#4789A8]" /> },
    { value: 'Pending', label: 'Pending', icon: <MdPendingActions className="text-yellow-500" /> },
    { value: 'Disetujui', label: 'Disetujui', icon: <MdCheckCircle className="text-green-500" /> },
    { value: 'Ditolak', label: 'Ditolak', icon: <MdCancel className="text-red-500" /> },
  ];

  const departemenOptions = [
    { value: 'semua', label: 'Semua Departemen', icon: <FaBuilding className="text-[#4789A8]" /> },
    { value: 'Front Office', label: 'Front Office', icon: <MdBusinessCenter className="text-purple-500" /> },
    { value: 'Food & Beverage', label: 'Food & Beverage', icon: <FaUsers className="text-amber-600" /> },
    { value: 'Housekeeping', label: 'Housekeeping', icon: <FaUserTie className="text-blue-500" /> },
    { value: 'Accounting & Administration', label: 'Accounting & Administration', icon: <FaClipboardCheck className="text-green-600" /> },
  ];

  const tanggalOptions = [
    { value: 'semua', label: 'Semua Tanggal', icon: <FaCalendar className="text-[#4789A8]" /> },
    { value: 'hari-ini', label: 'Hari Ini', icon: <MdDateRange className="text-green-500" /> },
    { value: '7-hari', label: '7 Hari Terakhir', icon: <FaCalendarAlt className="text-blue-500" /> },
    { value: 'bulan-ini', label: 'Bulan Ini', icon: <FaCalendar className="text-purple-500" /> },
    { value: 'bulan-lalu', label: 'Bulan Lalu', icon: <FaCalendarAlt className="text-amber-500" /> },
  ];

  // Data untuk grafik
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'],
    sakit: [18, 22, 24, 20, 19, 21],
    cuti: [12, 15, 18, 14, 16, 17],
    izin: [25, 30, 42, 35, 38, 40],
  };

  // Fungsi untuk membuka popup detail
  const openDetailPopup = (permission: PermissionData) => {
    setSelectedPermission(permission);
    setIsModalOpen(true);
  };

  // Fungsi untuk menutup popup detail
  const closeDetailPopup = () => {
    setSelectedPermission(null);
    setIsModalOpen(false);
  };

  // Fungsi untuk mendapatkan warna berdasarkan status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Disetujui': return 'bg-green-100 text-green-800';
      case 'Ditolak': return 'bg-red-100 text-red-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Fungsi untuk mendapatkan icon berdasarkan status
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Disetujui': return <MdCheckCircle className="text-green-500" />;
      case 'Ditolak': return <MdCancel className="text-red-500" />;
      case 'Pending': return <MdPendingActions className="text-yellow-500" />;
      default: return null;
    }
  };

  // Fungsi untuk mendapatkan icon departemen
  const getDepartemenIcon = (departemen: string) => {
    switch (departemen) {
      case 'Front Office': return <MdBusinessCenter className="text-purple-500" />;
      case 'Food & Beverage': return <FaUsers className="text-amber-600" />;
      case 'Housekeeping': return <FaUserTie className="text-blue-500" />;
      case 'Accounting & Administration': return <FaClipboardCheck className="text-green-600" />;
      default: return <FaBuilding className="text-gray-500" />;
    }
  };

  // Filter data berdasarkan pilihan
  useEffect(() => {
    let filtered = [...permissionData];

    if (filterJenis !== 'semua') {
      filtered = filtered.filter(item => item.jenis === filterJenis);
    }

    if (filterStatus !== 'semua') {
      filtered = filtered.filter(item => item.status === filterStatus);
    }

    if (filterDepartemen !== 'semua') {
      filtered = filtered.filter(item => item.departemen === filterDepartemen);
    }

    if (filterTanggal !== 'semua') {
      const today = new Date().toISOString().split('T')[0];
      switch (filterTanggal) {
        case 'hari-ini':
          filtered = filtered.filter(item => item.tanggal === today);
          break;
        case '7-hari':
          const sevenDaysAgo = new Date();
          sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
          filtered = filtered.filter(item => new Date(item.tanggal) >= sevenDaysAgo);
          break;
        case 'bulan-ini':
          const currentMonth = new Date().getMonth();
          filtered = filtered.filter(item => new Date(item.tanggal).getMonth() === currentMonth);
          break;
        case 'bulan-lalu':
          const lastMonth = new Date().getMonth() - 1;
          filtered = filtered.filter(item => new Date(item.tanggal).getMonth() === lastMonth);
          break;
      }
    }

    setFilteredData(filtered);
  }, [filterJenis, filterStatus, filterDepartemen, filterTanggal]);

  // Inisialisasi filtered data
  useEffect(() => {
    setFilteredData(permissionData);
  }, []);

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
        <div className="px-6 pb-6 flex flex-1 flex-col gap-6 pt-24 transition-all duration-300">
          {/* Judul Halaman */}
          <div className="mb-2">
            <h1 className="text-2xl font-bold text-gray-800">Permission (Izin)</h1>
            <p className="text-gray-600">Kelola dan pantau seluruh permohonan izin karyawan</p>
          </div>

          {/* Card Ringkasan */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {summaryData.map((item, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-all duration-300 hover:shadow-md"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">

                    <div className={`p-3 rounded-lg bg-linear-to-r ${item.color} text-white mr-4`}>

                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-700">{item.jenis}</h3>
                      <p className="text-sm text-gray-500">Total Pengajuan</p>
                    </div>
                  </div>
                  <div className={`flex items-center ${item.trend === 'naik' ? 'text-green-500' : 'text-red-500'}`}>
                    {item.trend === 'naik' ? <FaChevronUp /> : <FaChevronDown />}
                    <span className="ml-1 font-medium">{item.persentase}%</span>
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <p className="text-3xl font-bold text-gray-800">{item.total}</p>
                  <div className="h-10 w-24 flex items-end">
                    <div className="flex items-end h-full w-full">
                      {[3, 6, 4, 8, 5, 7, 4].map((height, i) => (
                        <div 
                          key={i} 

                          className={`flex-1 mx-0.5 rounded-t ${item.trend === 'naik' ? 'bg-linear-to-t from-green-400 to-green-300' : 'bg-linear-to-t from-red-400 to-red-300'}`}

                          style={{ height: `${height * 10}%` }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Grafik Utama */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-800">Rekap Perizinan</h2>
                <p className="text-gray-600">Tren dan distribusi permohonan izin</p>
              </div>
              <div className="flex space-x-2 mt-3 md:mt-0">
                <button
                  onClick={() => setChartType('line')}
                  className={`px-4 py-2 rounded-lg flex items-center ${chartType === 'line' ? 'bg-[#4789A8] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                  <FaChartLine className="mr-2" /> Line
                </button>
                <button
                  onClick={() => setChartType('bar')}
                  className={`px-4 py-2 rounded-lg flex items-center ${chartType === 'bar' ? 'bg-[#4789A8] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                  <FaChartBar className="mr-2" /> Bar
                </button>
                <button
                  onClick={() => setChartType('pie')}
                  className={`px-4 py-2 rounded-lg flex items-center ${chartType === 'pie' ? 'bg-[#4789A8] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                  <FaChartPie className="mr-2" /> Pie
                </button>
              </div>
            </div>

            <div className="h-64 flex items-center justify-center">
              <div className="w-full h-full relative">
                {chartType === 'bar' && (
                  <div className="h-full flex items-end justify-between pt-8 pb-4">
                    {chartData.labels.map((month, i) => (
                      <div key={month} className="flex flex-col items-center h-full w-16">
                        <div className="text-xs text-gray-500 mb-2">{month}</div>
                        <div className="flex items-end h-5/6 w-full space-x-1">
                          <div 
                            className="w-1/3 bg-red-400 rounded-t" 
                            style={{ height: `${chartData.sakit[i] * 1.5}%` }}
                            title={`Sakit: ${chartData.sakit[i]}`}
                          ></div>
                          <div 
                            className="w-1/3 bg-amber-400 rounded-t" 
                            style={{ height: `${chartData.cuti[i] * 1.5}%` }}
                            title={`Cuti: ${chartData.cuti[i]}`}
                          ></div>
                          <div 
                            className="w-1/3 bg-blue-400 rounded-t" 
                            style={{ height: `${chartData.izin[i] * 1.5}%` }}
                            title={`Izin: ${chartData.izin[i]}`}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {chartType === 'line' && (
                  <div className="h-full flex items-center justify-center">
                    <div className="relative w-full h-5/6">
                      <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-300"></div>
                      <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-300"></div>
                      
                      <svg className="absolute inset-0 w-full h-full">
                        <polyline
                          fill="none"
                          stroke="#f87171"
                          strokeWidth="3"
                          points={chartData.labels.map((_, i) => 
                            `${(i / (chartData.labels.length - 1)) * 100},${100 - chartData.sakit[i] * 1.5}`
                          ).join(' ')}
                        />
                      </svg>
                      
                      <svg className="absolute inset-0 w-full h-full">
                        <polyline
                          fill="none"
                          stroke="#fbbf24"
                          strokeWidth="3"
                          points={chartData.labels.map((_, i) => 
                            `${(i / (chartData.labels.length - 1)) * 100},${100 - chartData.cuti[i] * 1.5}`
                          ).join(' ')}
                        />
                      </svg>
                      
                      <svg className="absolute inset-0 w-full h-full">
                        <polyline
                          fill="none"
                          stroke="#60a5fa"
                          strokeWidth="3"
                          points={chartData.labels.map((_, i) => 
                            `${(i / (chartData.labels.length - 1)) * 100},${100 - chartData.izin[i] * 1.5}`
                          ).join(' ')}
                        />
                      </svg>
                    </div>
                  </div>
                )}

                {chartType === 'pie' && (
                  <div className="flex items-center justify-center h-full">
                    <div className="relative w-48 h-48">
                      <div className="absolute inset-0 rounded-full border-8 border-red-400" 
                           style={{ clipPath: 'inset(0 0 0 50%)' }}></div>
                      <div className="absolute inset-0 rounded-full border-8 border-amber-400" 
                           style={{ clipPath: 'inset(0 50% 0 0)' }}></div>
                      <div className="absolute inset-0 rounded-full border-8 border-blue-400" 
                           style={{ clipPath: 'polygon(50% 0%, 50% 50%, 100% 50%, 100% 0%)' }}></div>
                      
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white w-24 h-24 rounded-full flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-gray-800">84</div>
                            <div className="text-sm text-gray-500">Total</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="ml-8 space-y-3">
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-red-400 rounded mr-2"></div>
                        <span className="text-gray-700">Sakit (24)</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-amber-400 rounded mr-2"></div>
                        <span className="text-gray-700">Cuti (18)</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-blue-400 rounded mr-2"></div>
                        <span className="text-gray-700">Izin (42)</span>
                      </div>
                    </div>
                  </div>
                )}

                {(chartType === 'bar' || chartType === 'line') && (
                  <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-6">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-red-400 rounded mr-2"></div>
                      <span className="text-sm text-gray-700">Sakit</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-amber-400 rounded mr-2"></div>
                      <span className="text-sm text-gray-700">Cuti</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-blue-400 rounded mr-2"></div>
                      <span className="text-sm text-gray-700">Izin</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Tabel Data Perizinan dengan Filter */}
         <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
  <div className="px-6 py-4 border-b border-gray-200">
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h2 className="text-xl font-bold text-gray-800">Data Perizinan Karyawan</h2>
        <p className="text-gray-600">Seluruh permohonan izin yang tercatat dalam sistem</p>
      </div>
      
      {/* Search Bar */}
      <div className="relative w-full md:w-auto">
        <div className="relative">
          <input
            type="text"
            placeholder="Cari nama karyawan..."
            className="w-full md:w-64 px-4 py-2 pl-10 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4789A8] focus:border-transparent"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <svg 
              className="w-4 h-4 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>

    {/* Filter Bar */}
    <div className="mt-4 flex flex-wrap gap-2">
      {/* Filter Jenis */}
      <div className="relative">
        <button
          onClick={() => setShowFilterJenis(!showFilterJenis)}
          className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
        >
          {jenisOptions.find(opt => opt.value === filterJenis)?.icon}
          <span className="ml-2">
            {jenisOptions.find(opt => opt.value === filterJenis)?.label}
          </span>
          <MdExpandMore className="ml-2" />
        </button>
        {showFilterJenis && (
          <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
            {jenisOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  setFilterJenis(option.value);
                  setShowFilterJenis(false);
                }}
                className={`flex items-center w-full px-4 py-3 text-left hover:bg-gray-50 ${
                  filterJenis === option.value ? 'bg-blue-50' : ''
                }`}
              >
                {option.icon}
                <span className="ml-3">{option.label}</span>
                {filterJenis === option.value && (
                  <FaChevronRight className="ml-auto text-[#4789A8]" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Filter Status */}
      <div className="relative">
        <button
          onClick={() => setShowFilterStatus(!showFilterStatus)}
          className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
        >
          {statusOptions.find(opt => opt.value === filterStatus)?.icon}
          <span className="ml-2">
            {statusOptions.find(opt => opt.value === filterStatus)?.label}
          </span>
          <MdExpandMore className="ml-2" />
        </button>
        {showFilterStatus && (
          <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
            {statusOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  setFilterStatus(option.value);
                  setShowFilterStatus(false);
                }}
                className={`flex items-center w-full px-4 py-3 text-left hover:bg-gray-50 ${
                  filterStatus === option.value ? 'bg-blue-50' : ''
                }`}
              >
                {option.icon}
                <span className="ml-3">{option.label}</span>
                {filterStatus === option.value && (
                  <FaChevronRight className="ml-auto text-[#4789A8]" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Filter Departemen */}
      <div className="relative">
        <button
          onClick={() => setShowFilterDepartemen(!showFilterDepartemen)}
          className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
        >
          {departemenOptions.find(opt => opt.value === filterDepartemen)?.icon}
          <span className="ml-2">
            {departemenOptions.find(opt => opt.value === filterDepartemen)?.label}
          </span>
          <MdExpandMore className="ml-2" />
        </button>
        {showFilterDepartemen && (
          <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
            {departemenOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  setFilterDepartemen(option.value);
                  setShowFilterDepartemen(false);
                }}
                className={`flex items-center w-full px-4 py-3 text-left hover:bg-gray-50 ${
                  filterDepartemen === option.value ? 'bg-blue-50' : ''
                }`}
              >
                {option.icon}
                <span className="ml-3">{option.label}</span>
                {filterDepartemen === option.value && (
                  <FaChevronRight className="ml-auto text-[#4789A8]" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Filter Tanggal */}
      <div className="relative">
        <button
          onClick={() => setShowFilterTanggal(!showFilterTanggal)}
          className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
        >
          {tanggalOptions.find(opt => opt.value === filterTanggal)?.icon}
          <span className="ml-2">
            {tanggalOptions.find(opt => opt.value === filterTanggal)?.label}
          </span>
          <MdExpandMore className="ml-2" />
        </button>
        {showFilterTanggal && (
          <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
            {tanggalOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  setFilterTanggal(option.value);
                  setShowFilterTanggal(false);
                }}
                className={`flex items-center w-full px-4 py-3 text-left hover:bg-gray-50 ${
                  filterTanggal === option.value ? 'bg-blue-50' : ''
                }`}
              >
                {option.icon}
                <span className="ml-3">{option.label}</span>
                {filterTanggal === option.value && (
                  <FaChevronRight className="ml-auto text-[#4789A8]" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Reset Filter */}
      {(filterJenis !== 'semua' || filterStatus !== 'semua' || filterDepartemen !== 'semua' || filterTanggal !== 'semua') && (
        <button
          onClick={() => {
            setFilterJenis('semua');
            setFilterStatus('semua');
            setFilterDepartemen('semua');
            setFilterTanggal('semua');
          }}
          className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg flex items-center transition-colors"
        >
          <FaTimes className="mr-2" /> Reset Filter
        </button>
      )}
    </div>
  </div>
  
  {/* Tabel */}
  <div className="overflow-x-auto">
    <table className="w-full min-w-max">
      <thead className="bg-gray-50">
        <tr>
          <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Nama Karyawan
          </th>
          <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Departemen
          </th>
          <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Jenis Perizinan
          </th>
          <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Tanggal
          </th>
          <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Status
          </th>
          <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Aksi
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {filteredData.map((permission) => (
          <tr key={permission.id} className="hover:bg-gray-50 transition-colors">
            <td className="py-4 px-6">
              <div className="flex items-center">

                <div className="h-10 w-10 shrink-0 rounded-full bg-linear-to-r from-[#4789A8] to-[#5ba3c7] flex items-center justify-center text-white font-semibold">

                  {permission.nama.charAt(0)}
                </div>
                <div className="ml-4">
                  <div className="font-medium text-gray-900">{permission.nama}</div>
                  <div className="text-sm text-gray-500">ID: KRY-{permission.id.toString().padStart(4, '0')}</div>
                </div>
              </div>
            </td>
            <td className="py-4 px-6">
              <div className="flex items-center">
                {getDepartemenIcon(permission.departemen)}
                <span className="ml-2 font-medium text-gray-700">{permission.departemen}</span>
              </div>
            </td>
            <td className="py-4 px-6">
              <div className="flex items-center">
                {permission.jenis === 'Sakit' && <MdSick className="mr-2 text-red-500" />}
                {permission.jenis === 'Cuti' && <FaUmbrellaBeach className="mr-2 text-amber-500" />}
                {permission.jenis === 'Izin' && <FaUserClock className="mr-2 text-blue-500" />}
                <span className="font-medium">{permission.jenis}</span>
              </div>
            </td>
            <td className="py-4 px-6 text-gray-700">
              <div className="flex items-center">
                <FaCalendarAlt className="mr-2 text-gray-400" />
                {permission.tanggal}
              </div>
            </td>
            <td className="py-4 px-6">
              <div className="flex items-center">
                {getStatusIcon(permission.status)}
                <span className={`ml-2 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(permission.status)}`}>
                  {permission.status}
                </span>
              </div>
            </td>
            <td className="py-4 px-6">
              <button
                onClick={() => openDetailPopup(permission)}
                className="px-4 py-2 bg-[#4789A8] hover:bg-[#3a7796] text-white rounded-lg flex items-center transition-colors"
              >
                <FaEye className="mr-2" /> Detail
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    
    {filteredData.length === 0 && (
      <div className="text-center py-8 text-gray-500">
        Tidak ada data yang ditemukan untuk filter yang dipilih.
      </div>
    )}
  </div>
</div>
        </div>
      </div>

      {/* Overlay Blur dengan efek backdrop-filter saat Popup Detail terbuka */}
      {isModalOpen && selectedPermission && (
        <>
          <div 

            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-999 transition-opacity duration-300"

            onClick={closeDetailPopup}
            style={{
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)'
            }}
          />
          
          {/* Pop-Up Detail Perizinan */}

          <div className="fixed inset-0 z-1000 flex items-center justify-center p-4">

            <div 
              className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()} // Mencegah penutupan saat klik di dalam popup
            >
              {/* Header Pop-up */}
              <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Detail Perizinan</h3>
                  <p className="text-gray-600">Informasi lengkap permohonan izin</p>
                </div>
                <button
                  onClick={closeDetailPopup}
                  className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <FaTimes size={20} />
                </button>
              </div>

              {/* Body Pop-up */}
              <div className="p-6">
                {/* Info Karyawan */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                    <FaUser className="mr-2 text-[#4789A8]" /> Informasi Karyawan
                  </h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center">

                      <div className="h-14 w-14 shrink-0 rounded-full bg-linear-to-r from-[#4789A8] to-[#5ba3c7] flex items-center justify-center text-white font-bold text-xl">

                        {selectedPermission.nama.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="font-bold text-gray-900 text-lg">{selectedPermission.nama}</div>
                        <div className="text-gray-600">ID: KRY-{selectedPermission.id.toString().padStart(4, '0')}</div>
                        <div className="flex items-center mt-1">
                          {getDepartemenIcon(selectedPermission.departemen)}
                          <span className="ml-2 text-gray-700">{selectedPermission.departemen}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Detail Perizinan */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                      <FaCalendarAlt className="mr-2 text-[#4789A8]" /> Detail Perizinan
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">Jenis Izin</span>
                        <div className="flex items-center">
                          {selectedPermission.jenis === 'Sakit' && <MdSick className="mr-2 text-red-500" />}
                          {selectedPermission.jenis === 'Cuti' && <FaUmbrellaBeach className="mr-2 text-amber-500" />}
                          {selectedPermission.jenis === 'Izin' && <FaUserClock className="mr-2 text-blue-500" />}
                          <span className="font-medium">{selectedPermission.jenis}</span>
                        </div>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">Tanggal Izin</span>
                        <span className="font-medium">{selectedPermission.tanggal}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">Status</span>
                        <div className="flex items-center">
                          {getStatusIcon(selectedPermission.status)}
                          <span className={`ml-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedPermission.status)}`}>
                            {selectedPermission.status}
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">Departemen</span>
                        <div className="flex items-center">
                          {getDepartemenIcon(selectedPermission.departemen)}
                          <span className="ml-2 font-medium">{selectedPermission.departemen}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Alasan dan Lampiran */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                      <FaFileMedical className="mr-2 text-[#4789A8]" /> Alasan & Lampiran
                    </h4>
                    <div className="bg-gray-50 rounded-lg p-4 h-full">
                      <div className="mb-4">
                        <h5 className="font-medium text-gray-700 mb-1">Alasan / Keterangan:</h5>
                        <p className="text-gray-800">{selectedPermission.alasan}</p>
                      </div>
                      
                      {selectedPermission.lampiran && (
                        <div>
                          <h5 className="font-medium text-gray-700 mb-1">Lampiran:</h5>
                          <div className="flex items-center p-3 bg-white rounded-lg border border-gray-200">
                            <div className="h-10 w-10 rounded bg-blue-100 flex items-center justify-center mr-3">
                              <FaFileDownload className="text-blue-500" />
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-gray-800">{selectedPermission.lampiran}</div>
                              <div className="text-sm text-gray-500">Klik untuk melihat atau mengunduh</div>
                            </div>
                            <button className="px-4 py-2 bg-[#4789A8] hover:bg-[#3a7796] text-white rounded-lg text-sm transition-colors">
                              Lihat
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Catatan HR */}
                {selectedPermission.catatanHR && (
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                      <FaClipboardCheck className="mr-2 text-[#4789A8]" /> Catatan HR / Manager
                    </h4>
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <p className="text-gray-800">{selectedPermission.catatanHR}</p>
                      <div className="mt-2 text-sm text-gray-500">Ditambahkan oleh HR pada {selectedPermission.tanggal}</div>
                    </div>
                  </div>
                )}

                {/* Tombol Aksi */}
                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={closeDetailPopup}
                    className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Tutup
                  </button>
                  {selectedPermission.status === 'Pending' && (
                    <>
                      <button className="px-5 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors">
                        Setujui
                      </button>
                      <button className="px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors">
                        Tolak
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}