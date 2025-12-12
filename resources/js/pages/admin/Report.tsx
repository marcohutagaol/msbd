'use client';

import { useState, useEffect } from 'react';
import { 
  FileText, 
  Download, 
  Eye, 
  Trash2, 
  X,
  Calendar,
  Building,
  ChevronLeft,
  ChevronRight,
  Search,
  Printer,
  Briefcase,
  Home,
  Coffee,
  Calculator,
  CalendarDays,
  ChevronDown,
  Clock,
  FileCheck,
  FileType,
  CalendarRange,
  ChevronRight as ChevronRightIcon,
  Filter,
  Menu
} from 'lucide-react';
import Header from '../../components/admin/dashboard/Header';
import Sidebar from '../../components/admin/dashboard/Sidebar';
import { router } from '@inertiajs/react';

type Report = {
  id: number;
  title: string;
  department: string;
  isi: string;
  link_gambar: string;
  created_by: string;
  report_date: string;
  created_at: string;
  updated_at: string;
};

type PaginationResponse<T> = {
  data: T[];
  current_page: number;
  last_page: number;
  prev_page_url: string | null;
  next_page_url: string | null;
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
};

export default function ReportsPage(
  { reports, totalReports, totalDepartments }
  : {
      reports: PaginationResponse<Report>;
      totalReports: number;
      totalDepartments: number;
    }
) {
  const data = reports.data;
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [showDepartmentDropdown, setShowDepartmentDropdown] = useState(false);
  const [showPeriodDropdown, setShowPeriodDropdown] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const departments = [
    { value: 'all', label: 'Semua Departemen', icon: <Building className="w-4 h-4 text-[#4789A8]" /> },
    { value: 'front-office', label: 'Front Office', icon: <Briefcase className="w-4 h-4 text-blue-600" /> },
    { value: 'housekeeping', label: 'Housekeeping', icon: <Home className="w-4 h-4 text-green-600" /> },
    { value: 'food-beverage', label: 'Food & Beverage', icon: <Coffee className="w-4 h-4 text-amber-600" /> },
    { value: 'accounting', label: 'Accounting & Administration', icon: <Calculator className="w-4 h-4 text-purple-600" /> },
  ];

  const periods = [
    { value: 'all', label: 'Semua Periode', icon: <Filter className="w-4 h-4 text-[#4789A8]" /> },
    { value: 'daily', label: 'Harian', icon: <Clock className="w-4 h-4 text-blue-500" /> },
    { value: 'weekly', label: 'Mingguan', icon: <Calendar className="w-4 h-4 text-green-500" /> },
    { value: 'monthly', label: 'Bulanan', icon: <CalendarDays className="w-4 h-4 text-amber-500" /> },
    { value: 'quarterly', label: 'Triwulan', icon: <FileType className="w-4 h-4 text-purple-500" /> },
  ];

  const getSelectedDepartment = () => {
    return departments.find(dept => dept.value === selectedDepartment) || departments[0];
  };

  const getSelectedPeriod = () => {
    return periods.find(period => period.value === selectedPeriod) || periods[0];
  };

  return (
    <div className="flex min-h-screen bg-[#f5f7fa] font-[Poppins,Segoe_UI,system-ui,sans-serif] transition-all duration-300">
      {/* === SIDEBAR === */}
      <div
        className={`hidden md:block fixed top-0 left-0 z-150 h-full w-[260px] bg-white shadow-md transition-transform duration-300 ${
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
          className={`fixed top-0 right-0 z-200 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.05)] transition-all duration-300 w-full ${
            isSidebarOpen ? 'md:left-[260px] md:w-[calc(100%-260px)]' : 'left-0'
          }`}
        >
          <Header
            isSidebarOpen={isSidebarOpen}
            onToggleSidebar={toggleSidebar}
          />
        </div>

        {/* === ISI HALAMAN REPORTS === */}
        <div className="px-4 sm:px-6 lg:px-8 pb-6 md:pb-8 flex flex-1 flex-col gap-4 md:gap-6 pt-20 md:pt-28 transition-all duration-300">
          {/* Header Halaman */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 md:p-3 bg-[#4789A8]/10 rounded-lg md:rounded-xl">
                <FileText className="w-5 h-5 md:w-6 md:h-6 text-[#4789A8]" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800">Laporan Departemen</h1>
                <p className="text-gray-600 mt-1 text-sm md:text-base">Lihat laporan PDF dari setiap departemen</p>
              </div>
            </div>
            
            {/* Tombol Upload Laporan dihapus */}
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3 md:gap-4">
            <div className="bg-white rounded-lg md:rounded-xl p-4 md:p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-gray-600">Total Laporan</p>
                  <p className="text-xl md:text-2xl font-bold text-gray-800 mt-1">{totalReports}</p>
                  <div className="flex items-center gap-1 mt-2 text-xs md:text-sm text-green-600">
                    <FileCheck className="w-3 h-3 md:w-4 md:h-4" />
                    <span>{totalReports} file aktif</span>
                  </div>
                </div>
                <div className="p-2 md:p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                  <FileText className="w-4 h-4 md:w-5 md:h-5 text-[#4789A8]" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg md:rounded-xl p-4 md:p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-gray-600">Total Departemen</p>
                  <p className="text-xl md:text-2xl font-bold text-gray-800 mt-1">4</p>
                  <div className="flex items-center gap-1 mt-2 text-xs md:text-sm text-blue-600">
                    <Building className="w-3 h-3 md:w-4 md:h-4" />
                    <span>4 departemen aktif</span>
                  </div>
                </div>
                <div className="p-2 md:p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                  <Building className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Filter dan Search Bar */}
          <div className="bg-white rounded-lg md:rounded-xl shadow-sm p-4 md:p-5 border border-gray-100">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="relative w-full lg:w-auto lg:flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={16} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Cari laporan berdasarkan departemen atau nama..."
                  className="w-full pl-10 pr-4 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4789A8]/30 focus:border-[#4789A8] outline-none transition-all text-gray-700 text-sm md:text-base"
                />
              </div>
              
              <div className="flex flex-col sm:flex-row items-center gap-2 md:gap-3 w-full lg:w-auto">
                {/* Tombol Filter Tanggal */}
                <div className="relative w-full sm:w-auto">
                  <button 
                    onClick={() => setShowDateFilter(!showDateFilter)}
                    className="flex items-center gap-2 border border-gray-300 hover:border-gray-400 hover:bg-gray-50 px-3 md:px-4 py-2.5 md:py-3 rounded-lg transition-all duration-200 group w-full sm:w-auto justify-center"
                  >
                    <CalendarDays size={16} className="text-gray-600 group-hover:text-[#4789A8]" />
                    <span className="text-gray-700 font-medium group-hover:text-[#4789A8] text-sm">Filter Tanggal</span>
                  </button>

                  {/* Dropdown Filter Tanggal */}
                  {showDateFilter && (
                    <>
                      <div 
                        className="fixed inset-0 z-40"
                        onClick={() => setShowDateFilter(false)}
                      ></div>
                      <div className="absolute right-0 top-full mt-2 w-full sm:w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-50 p-4 md:p-5">
                        <div className="flex items-center justify-between mb-3 md:mb-4">
                          <h3 className="font-semibold text-gray-800 flex items-center gap-2 text-sm md:text-base">
                            <CalendarRange className="w-4 h-4" />
                            Filter Berdasarkan Tanggal
                          </h3>
                          <button 
                            onClick={() => setShowDateFilter(false)}
                            className="p-1 hover:bg-gray-100 rounded-lg"
                          >
                            <X size={16} className="text-gray-500" />
                          </button>
                        </div>
                        
                        <div className="space-y-3 md:space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              Dari Tanggal
                            </label>
                            <div className="relative">
                              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                              <input
                                type="date"
                                className="w-full pl-10 pr-3 py-2 border md:py-2.5 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4789A8]/30 focus:border-[#4789A8] outline-none transition-all text-sm"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              Sampai Tanggal
                            </label>
                            <div className="relative">
                              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                              <input
                                type="date"
                                className="w-full pl-10 pr-3 py-2 md:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4789A8]/30 focus:border-[#4789A8] outline-none transition-all text-sm"
                              />
                            </div>
                          </div>
                          
                          <div className="flex flex-col sm:flex-row gap-2 md:gap-3 pt-2">
                            <button className="flex-1 px-3 md:px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-sm">
                              <X className="w-4 h-4" />
                              Reset
                            </button>
                            <button className="flex-1 px-3 md:px-4 py-2 bg-[#4789A8] hover:bg-[#3a7895] text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-sm">
                              <CalendarDays className="w-4 h-4" />
                              Terapkan Filter
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                
                {/* Custom Dropdown Departemen */}
                <div className="relative w-full sm:w-auto">
                  <button 
                    onClick={() => setShowDepartmentDropdown(!showDepartmentDropdown)}
                    className="flex items-center justify-between px-3 md:px-4 py-2.5 md:py-3 border border-gray-300 hover:border-gray-400 rounded-lg transition-all duration-200 w-full sm:w-64 bg-white text-sm"
                  >
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className="text-gray-600">
                        {getSelectedDepartment().icon}
                      </div>
                      <span className="text-gray-700 font-medium truncate hidden sm:inline">
                        {getSelectedDepartment().label}
                      </span>
                      <span className="text-gray-700 font-medium sm:hidden">
                        {getSelectedDepartment().value === 'all' ? 'Semua' : getSelectedDepartment().label.split(' ')[0]}
                      </span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${showDepartmentDropdown ? 'rotate-180' : ''}`} />
                  </button>

                  {showDepartmentDropdown && (
                    <>
                      <div 
                        className="fixed inset-0 z-40"
                        onClick={() => setShowDepartmentDropdown(false)}
                      ></div>
                      <div className="absolute top-full left-0 mt-1 w-full sm:w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                        {departments.map((dept) => (
                          <button
                            key={dept.value}
                            onClick={() => {
                              setSelectedDepartment(dept.value);
                              setShowDepartmentDropdown(false);
                            }}
                            className={`flex items-center justify-between w-full px-3 md:px-4 py-2 md:py-3 text-left hover:bg-gray-50 transition-colors text-sm ${
                              selectedDepartment === dept.value ? 'bg-blue-50' : ''
                            }`}
                          >
                            <div className="flex items-center gap-2 md:gap-3">
                              <div className={`${selectedDepartment === dept.value ? 'text-[#4789A8]' : 'text-gray-600'}`}>
                                {dept.icon}
                              </div>
                              <span className={`font-medium ${selectedDepartment === dept.value ? 'text-[#4789A8]' : 'text-gray-700'}`}>
                                {dept.label}
                              </span>
                            </div>
                            {selectedDepartment === dept.value && (
                              <ChevronRightIcon className="w-4 h-4 text-[#4789A8]" />
                            )}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Custom Dropdown Periode */}
                <div className="relative w-full sm:w-auto">
                  <button 
                    onClick={() => setShowPeriodDropdown(!showPeriodDropdown)}
                    className="flex items-center justify-between px-3 md:px-4 py-2.5 md:py-3 border border-gray-300 hover:border-gray-400 rounded-lg transition-all duration-200 w-full sm:w-56 bg-white text-sm"
                  >
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className="text-gray-600">
                        {getSelectedPeriod().icon}
                      </div>
                      <span className="text-gray-700 font-medium truncate hidden sm:inline">
                        {getSelectedPeriod().label}
                      </span>
                      <span className="text-gray-700 font-medium sm:hidden">
                        {getSelectedPeriod().value === 'all' ? 'Semua' : getSelectedPeriod().label}
                      </span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${showPeriodDropdown ? 'rotate-180' : ''}`} />
                  </button>

                  {showPeriodDropdown && (
                    <>
                      <div 
                        className="fixed inset-0 z-40"
                        onClick={() => setShowPeriodDropdown(false)}
                      ></div>
                      <div className="absolute top-full left-0 mt-1 w-full sm:w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                        {periods.map((period) => (
                          <button
                            key={period.value}
                            onClick={() => {
                              setSelectedPeriod(period.value);
                              setShowPeriodDropdown(false);
                            }}
                            className={`flex items-center justify-between w-full px-3 md:px-4 py-2 md:py-3 text-left hover:bg-gray-50 transition-colors text-sm ${
                              selectedPeriod === period.value ? 'bg-blue-50' : ''
                            }`}
                          >
                            <div className="flex items-center gap-2 md:gap-3">
                              <div className={`${selectedPeriod === period.value ? 'text-[#4789A8]' : 'text-gray-600'}`}>
                                {period.icon}
                              </div>
                              <span className={`font-medium ${selectedPeriod === period.value ? 'text-[#4789A8]' : 'text-gray-700'}`}>
                                {period.label}
                              </span>
                            </div>
                            {selectedPeriod === period.value && (
                              <ChevronRightIcon className="w-4 h-4 text-[#4789A8]" />
                            )}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Tabel Laporan - Desktop View */}
          <div className="hidden md:block bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50/80">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Nama Departemen</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Nama Laporan</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Tanggal Laporan</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Download PDF</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.map((item: Report) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition">
                      {/* Departemen */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gray-100 rounded-lg">
                            <Building className="w-4 h-4 text-gray-600" />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{item.department}</div>
                            <div className="text-xs text-gray-500 mt-1">{item.created_by}</div>
                          </div>
                        </div>
                      </td>

                      {/* Nama Laporan */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 bg-gray-100 rounded">
                            <FileText className="w-4 h-4 text-gray-500" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{item.title}</div>
                          </div>
                        </div>
                      </td>

                      {/* Tanggal Laporan */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-[#4789A8]" />
                          <span className="text-gray-700 font-medium">
                            {new Date(item.report_date).toLocaleDateString('id-ID')}
                          </span>
                        </div>
                      </td>

                      {/* Download */}
                      <td className="px-6 py-5">
                        <a 
                          href={item.link_gambar} 
                          className="flex items-center gap-2 text-[#4789A8] px-4 py-2 rounded-lg bg-[#4789A8]/10 hover:bg-[#4789A8]/20 transition-colors"
                        >
                          <Download className="w-4 h-4" />
                          Download
                        </a>
                      </td>

                      {/* Action */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setSelectedReport(item);
                              setIsPdfModalOpen(true);
                            }}
                            className="flex items-center gap-1.5 text-[#4789A8] hover:text-[#3a7895] hover:bg-gradient-to-r from-[#4789A8]/10 to-[#4789A8]/5 px-3.5 py-2 rounded-lg transition-all duration-200 border border-[#4789A8]/20"
                          >
                            <Eye className="w-4 h-4" />
                            <span className="font-medium">View</span>
                          </button>
                          
                          <button
                            onClick={() => {
                              setIsPdfModalOpen(false);
                              setSelectedReport(item);
                              setIsDeleteModalOpen(true);
                            }}
                            className="flex items-center gap-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 px-3.5 py-2 rounded-lg border border-red-200"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span className="font-medium">Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                {/* Info */}
                <div className="text-sm text-gray-600">
                  Halaman {reports.current_page} dari {reports.last_page}
                </div>

                {/* Navigasi */}
                <div className="flex items-center gap-1">
                  {/* Prev */}
                  <button
                    disabled={!reports.prev_page_url}
                    onClick={() => {
                      if (reports.prev_page_url) {
                        router.visit(reports.prev_page_url);
                      }
                    }}
                    className={`p-2 rounded-lg ${
                      reports.prev_page_url
                        ? "text-gray-700 hover:bg-gray-100"
                        : "text-gray-300 cursor-not-allowed"
                    }`}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  {/* Numbered buttons */}
                  {reports.links
                    .filter((l: any) => !isNaN(Number(l.label)))
                    .map((link: any, index: number) => (
                      <button
                        key={index}
                        onClick={() => router.visit(link.url)}
                        className={`w-9 h-9 flex items-center justify-center rounded-lg font-medium text-sm ${
                          link.active
                            ? "bg-[#4789A8] text-white shadow"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {link.label}
                      </button>
                    ))}

                  {/* Next */}
                  <button
                    disabled={!reports.next_page_url}
                    onClick={() => {
                      if (reports.next_page_url) {
                        router.visit(reports.next_page_url);
                      }
                    }}
                    className={`p-2 rounded-lg ${
                      reports.next_page_url
                        ? "text-gray-700 hover:bg-gray-100"
                        : "text-gray-300 cursor-not-allowed"
                    }`}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-3">
            {data.map((item: Report) => (
              <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <Building className="w-4 h-4 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm">{item.title}</h3>
                      <div className="text-xs text-gray-500 mt-1">{item.department}</div>
                      <div className="text-xs text-gray-400 mt-1">Dibuat oleh: {item.created_by}</div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                    {new Date(item.report_date).toLocaleDateString('id-ID')}
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <a 
                    href={item.link_gambar} 
                    className="flex items-center gap-1.5 text-[#4789A8] px-3 py-1.5 rounded-lg bg-[#4789A8]/10 hover:bg-[#4789A8]/20 transition-colors text-xs"
                  >
                    <Download className="w-3 h-3" />
                    Download
                  </a>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedReport(item);
                        setIsPdfModalOpen(true);
                      }}
                      className="flex items-center gap-1.5 text-[#4789A8] hover:text-[#3a7895] px-3 py-1.5 rounded-lg border border-[#4789A8]/20 text-xs"
                    >
                      <Eye className="w-3 h-3" />
                      View
                    </button>
                    
                    <button
                      onClick={() => {
                        setIsPdfModalOpen(false);
                        setSelectedReport(item);
                        setIsDeleteModalOpen(true);
                      }}
                      className="flex items-center gap-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-lg border border-red-200 text-xs"
                    >
                      <Trash2 className="w-3 h-3" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Mobile Pagination */}
          {data.length > 0 && (
            <div className="md:hidden bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex flex-col items-center gap-3">
                <div className="text-sm text-gray-600">
                  Halaman {reports.current_page} dari {reports.last_page}
                </div>
                <div className="flex items-center gap-1">
                  <button
                    disabled={!reports.prev_page_url}
                    onClick={() => {
                      if (reports.prev_page_url) {
                        router.visit(reports.prev_page_url);
                      }
                    }}
                    className={`p-2 rounded-lg ${
                      reports.prev_page_url
                        ? "text-gray-700 hover:bg-gray-100"
                        : "text-gray-300 cursor-not-allowed"
                    }`}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  
                  <div className="flex overflow-x-auto gap-1">
                    {reports.links
                      .filter((l: any) => !isNaN(Number(l.label)))
                      .slice(0, 3) // Tampilkan hanya 3 halaman di mobile
                      .map((link: any, index: number) => (
                        <button
                          key={index}
                          onClick={() => router.visit(link.url)}
                          className={`min-w-9 h-9 flex items-center justify-center rounded-lg font-medium text-sm px-3 ${
                            link.active
                              ? "bg-[#4789A8] text-white"
                              : "text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          {link.label}
                        </button>
                      ))}
                  </div>
                  
                  <button
                    disabled={!reports.next_page_url}
                    onClick={() => {
                      if (reports.next_page_url) {
                        router.visit(reports.next_page_url);
                      }
                    }}
                    className={`p-2 rounded-lg ${
                      reports.next_page_url
                        ? "text-gray-700 hover:bg-gray-100"
                        : "text-gray-300 cursor-not-allowed"
                    }`}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* === MODAL VIEW PDF === */}
      {isPdfModalOpen && selectedReport && (
        <div className="fixed inset-0 z-1000 flex items-center justify-center p-2 md:p-4">
          <div
            className="backdrop-blur-sm bg-black/60 absolute inset-0"
            onClick={() => {
              setSelectedReport(null);
              setIsPdfModalOpen(false);
            }}
          ></div>

          <div
            className="bg-white rounded-lg md:rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col relative z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* HEADER */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-4 md:px-8 py-4 md:py-6 flex items-center justify-between">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="p-1.5 md:p-2.5 bg-blue-100 rounded-lg">
                  <FileText className="w-4 h-4 md:w-6 md:h-6 text-[#4789A8]" />
                </div>
                <div className="max-w-[70%]">
                  <h2 className="text-lg md:text-2xl font-bold text-gray-900 truncate">Preview PDF</h2>
                  <p className="text-gray-600 text-xs md:text-sm truncate">
                    {selectedReport.department} • {selectedReport.title}
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedReport(null);
                  setIsPdfModalOpen(false);
                }}
                className="p-1 md:p-2 hover:bg-gray-100 rounded-lg md:rounded-xl"
              >
                <X className="w-4 h-4 md:w-6 md:h-6 text-gray-500" />
              </button>
            </div>

            {/* BODY PDF */}
            <div className="flex-1 p-2 md:p-8 bg-gray-50 overflow-auto">
              <iframe
                src={selectedReport.link_gambar}
                className="w-full h-[50vh] md:h-[70vh] rounded-lg md:rounded-xl border"
                title="PDF Preview"
              />
            </div>

            {/* FOOTER */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-4 md:px-8 py-4 md:py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs md:text-sm text-gray-600">
                Dibuat oleh {selectedReport.created_by}
              </div>

              <a
                href={selectedReport.link_gambar}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 md:px-6 py-2 md:py-3 bg-[#4789A8] text-white rounded-lg hover:bg-[#3a7895] transition text-sm md:text-base w-full sm:w-auto text-center"
              >
                Download PDF
              </a>
            </div>
          </div>
        </div>
      )}

      {/* === MODAL KONFIRMASI DELETE === */}
      {isDeleteModalOpen && selectedReport && (
        <div className="fixed inset-0 z-1000 flex items-center justify-center bg-black/50 p-4">
          <div
            className="bg-white rounded-lg md:rounded-xl p-4 md:p-6 w-full max-w-md shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-2">Hapus Laporan</h2>

            <p className="text-gray-700 text-sm md:text-base">
              Kamu yakin ingin menghapus laporan:
            </p>

            <p className="font-semibold text-gray-900 mt-2 text-sm md:text-base truncate">
              {selectedReport.title}
            </p>

            <div className="flex flex-col sm:flex-row justify-end gap-2 md:gap-3 mt-6">
              <button
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setSelectedReport(null);
                }}
                className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm md:text-base flex-1 sm:flex-none"
              >
                Batal
              </button>

              <button
                onClick={() => {
                  router.delete(`/admin/Report/${selectedReport.id}`, {
                    onSuccess: () => {
                      setIsDeleteModalOpen(false);
                      setSelectedReport(null);
                    }
                  });
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm md:text-base flex-1 sm:flex-none"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}