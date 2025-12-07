'use client';

import { useState } from 'react';
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
  Filter
} from 'lucide-react';
import Header from '../../components/admin/dashboard/Header';
import Sidebar from '../../components/admin/dashboard/Sidebar';

export default function ReportsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [showDepartmentDropdown, setShowDepartmentDropdown] = useState(false);
  const [showPeriodDropdown, setShowPeriodDropdown] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('all');

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

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

        {/* === ISI HALAMAN REPORTS === */}
        <div className="px-6 lg:px-8 pb-8 flex flex-1 flex-col gap-6 pt-28 transition-all duration-300">
          {/* Header Halaman */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#4789A8]/10 rounded-xl">
                <FileText className="w-6 h-6 text-[#4789A8]" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Laporan Departemen</h1>
                <p className="text-gray-600 mt-1 text-sm lg:text-base">Lihat laporan PDF dari setiap departemen</p>
              </div>
            </div>
            
            {/* Tombol Upload Laporan dihapus */}
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Laporan</p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">10</p>
                  <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
                    <FileCheck className="w-4 h-4" />
                    <span>10 file aktif</span>
                  </div>
                </div>
                <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                  <FileText className="w-5 h-5 text-[#4789A8]" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Departemen</p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">4</p>
                  <div className="flex items-center gap-1 mt-2 text-sm text-blue-600">
                    <Building className="w-4 h-4" />
                    <span>4 departemen aktif</span>
                  </div>
                </div>
                <div className="p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                  <Building className="w-5 h-5 text-green-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Filter dan Search Bar */}
          <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="relative w-full lg:w-auto lg:flex-1">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Cari laporan berdasarkan departemen atau nama..."
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4789A8]/30 focus:border-[#4789A8] outline-none transition-all text-gray-700"
                />
              </div>
              
              <div className="flex items-center gap-3 w-full lg:w-auto">
                {/* Tombol Filter Tanggal */}
                <div className="relative">
                  <button 
                    onClick={() => setShowDateFilter(!showDateFilter)}
                    className="flex items-center gap-2.5 border border-gray-300 hover:border-gray-400 hover:bg-gray-50 px-4 py-3 rounded-lg transition-all duration-200 group"
                  >
                    <CalendarDays size={18} className="text-gray-600 group-hover:text-[#4789A8]" />
                    <span className="text-gray-700 font-medium group-hover:text-[#4789A8]">Filter Tanggal</span>
                  </button>

                  {/* Dropdown Filter Tanggal */}
                  {showDateFilter && (
                    <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-50 p-5">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-gray-800 flex items-center gap-2">
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
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            Dari Tanggal
                          </label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              type="date"
                              className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4789A8]/30 focus:border-[#4789A8] outline-none transition-all"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            Sampai Tanggal
                          </label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              type="date"
                              className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4789A8]/30 focus:border-[#4789A8] outline-none transition-all"
                            />
                          </div>
                        </div>
                        
                        <div className="flex gap-3 pt-2">
                          <button className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                            <X className="w-4 h-4" />
                            Reset
                          </button>
                          <button className="flex-1 px-4 py-2.5 bg-[#4789A8] hover:bg-[#3a7895] text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                            <CalendarDays className="w-4 h-4" />
                            Terapkan Filter
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Custom Dropdown Departemen */}
                <div className="relative">
                  <button 
                    onClick={() => setShowDepartmentDropdown(!showDepartmentDropdown)}
                    className="flex items-center justify-between px-4 py-3 border border-gray-300 hover:border-gray-400 rounded-lg transition-all duration-200 w-64 bg-white"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-gray-600">
                        {getSelectedDepartment().icon}
                      </div>
                      <span className="text-gray-700 font-medium">{getSelectedDepartment().label}</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${showDepartmentDropdown ? 'rotate-180' : ''}`} />
                  </button>

                  {showDepartmentDropdown && (
                    <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                      {departments.map((dept) => (
                        <button
                          key={dept.value}
                          onClick={() => {
                            setSelectedDepartment(dept.value);
                            setShowDepartmentDropdown(false);
                          }}
                          className={`flex items-center justify-between w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                            selectedDepartment === dept.value ? 'bg-blue-50' : ''
                          }`}
                        >
                          <div className="flex items-center gap-3">
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
                  )}
                </div>

                {/* Custom Dropdown Periode */}
                <div className="relative">
                  <button 
                    onClick={() => setShowPeriodDropdown(!showPeriodDropdown)}
                    className="flex items-center justify-between px-4 py-3 border border-gray-300 hover:border-gray-400 rounded-lg transition-all duration-200 w-56 bg-white"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-gray-600">
                        {getSelectedPeriod().icon}
                      </div>
                      <span className="text-gray-700 font-medium">{getSelectedPeriod().label}</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${showPeriodDropdown ? 'rotate-180' : ''}`} />
                  </button>

                  {showPeriodDropdown && (
                    <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                      {periods.map((period) => (
                        <button
                          key={period.value}
                          onClick={() => {
                            setSelectedPeriod(period.value);
                            setShowPeriodDropdown(false);
                          }}
                          className={`flex items-center justify-between w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                            selectedPeriod === period.value ? 'bg-blue-50' : ''
                          }`}
                        >
                          <div className="flex items-center gap-3">
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
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Tabel Laporan */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
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
                  {/* Baris 1 - Front Office */}
                  <tr className="hover:bg-gray-50/50 transition-colors duration-150">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                          <Briefcase className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">Front Office</div>
                          <div className="text-xs text-gray-500 mt-1">FO Manager</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-gray-100 rounded">
                          <FileText className="w-4 h-4 text-gray-500" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">Laporan Check-in Harian Maret 2024</div>
                          <div className="text-xs text-gray-500 mt-0.5 flex items-center gap-2">
                            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">1.8 MB</span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" /> Harian
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#4789A8]" />
                        <span className="text-gray-700 font-medium">1 Apr 2024</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <button className="flex items-center gap-2 text-[#4789A8] hover:text-[#3a7895] font-medium px-4 py-2 rounded-lg bg-gradient-to-r from-[#4789A8]/10 to-[#4789A8]/5 hover:from-[#4789A8]/20 hover:to-[#4789A8]/10 transition-all duration-200 border border-[#4789A8]/20">
                        <Download className="w-4 h-4" />
                        <span>Download</span>
                      </button>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setIsPdfModalOpen(true)}
                          className="flex items-center gap-1.5 text-[#4789A8] hover:text-[#3a7895] hover:bg-gradient-to-r from-[#4789A8]/10 to-[#4789A8]/5 px-3.5 py-2 rounded-lg transition-all duration-200 border border-[#4789A8]/20"
                        >
                          <Eye className="w-4 h-4" />
                          <span className="font-medium">View</span>
                        </button>
                        
                        {/* Tombol Edit dihapus */}
                        
                        <button
                          onClick={() => setIsDeleteModalOpen(true)}
                          className="flex items-center gap-1.5 text-red-600 hover:text-red-700 hover:bg-gradient-to-r from-red-50 to-red-100 px-3.5 py-2 rounded-lg transition-all duration-200 border border-red-200"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span className="font-medium">Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                  
                  {/* Baris 2 - Housekeeping */}
                  <tr className="hover:bg-gray-50/50 transition-colors duration-150">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                          <Home className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">Housekeeping</div>
                          <div className="text-xs text-gray-500 mt-1">HK Supervisor</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-gray-100 rounded">
                          <FileText className="w-4 h-4 text-gray-500" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">Laporan Kebersihan & Maintenance</div>
                          <div className="text-xs text-gray-500 mt-0.5 flex items-center gap-2">
                            <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full">2.3 MB</span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" /> Mingguan
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#4789A8]" />
                        <span className="text-gray-700 font-medium">2 Apr 2024</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <button className="flex items-center gap-2 text-[#4789A8] hover:text-[#3a7895] font-medium px-4 py-2 rounded-lg bg-gradient-to-r from-[#4789A8]/10 to-[#4789A8]/5 hover:from-[#4789A8]/20 hover:to-[#4789A8]/10 transition-all duration-200 border border-[#4789A8]/20">
                        <Download className="w-4 h-4" />
                        <span>Download</span>
                      </button>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setIsPdfModalOpen(true)}
                          className="flex items-center gap-1.5 text-[#4789A8] hover:text-[#3a7895] hover:bg-gradient-to-r from-[#4789A8]/10 to-[#4789A8]/5 px-3.5 py-2 rounded-lg transition-all duration-200 border border-[#4789A8]/30"
                        >
                          <Eye className="w-4 h-4" />
                          <span className="font-medium">View</span>
                        </button>
                        
                        {/* Tombol Edit dihapus */}
                        
                        <button
                          onClick={() => setIsDeleteModalOpen(true)}
                          className="flex items-center gap-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 px-3.5 py-2 rounded-lg transition-all duration-200 border border-red-200"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span className="font-medium">Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50/50">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm text-gray-600">
                  Menampilkan <span className="font-semibold text-gray-800">1-2</span> dari <span className="font-semibold text-gray-800">10</span> laporan
                </div>
                
                <div className="flex items-center gap-1">
                  <button className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  
                  <button className="w-9 h-9 flex items-center justify-center rounded-lg bg-gradient-to-br from-[#4789A8] to-[#5ba3c7] text-white font-medium shadow-sm">
                    1
                  </button>
                  
                  <button className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-700 hover:bg-gray-100 font-medium">
                    2
                  </button>
                  
                  <button className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-700 hover:bg-gray-100 font-medium">
                    3
                  </button>
                  
                  <button className="p-2 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          
        </div>
      </div>

      {/* === MODAL VIEW PDF === */}
      {isPdfModalOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          <div 
            className="backdrop-blur-sm bg-black/60 absolute inset-0"
            onClick={() => setIsPdfModalOpen(false)}
          ></div>
          
          <div 
            className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col relative z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                  <FileText className="w-6 h-6 text-[#4789A8]" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Preview Laporan PDF</h2>
                  <p className="text-gray-600 text-sm">Front Office - Laporan Check-in Harian Maret 2024</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-colors">
                  <Printer className="w-4 h-4" />
                  Print
                </button>
                <button
                  onClick={() => setIsPdfModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>
            </div>
            
            {/* PDF Preview Container */}
            <div className="flex-1 p-8 bg-gray-50 overflow-auto">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Laporan Check-in Harian - Maret 2024</h3>
                    <p className="text-sm text-gray-600">Front Office Department • Terakhir diupdate: 1 April 2024</p>
                  </div>
                  <div className="text-sm text-gray-500">Halaman 1 dari 8</div>
                </div>
                
                {/* Simulasi PDF Preview */}
                <div className="bg-gray-100 rounded-lg p-8 min-h-[500px] border border-gray-300">
                  <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-8">
                      <h1 className="text-3xl font-bold text-gray-800 mb-2">LAPORAN CHECK-IN HARIAN</h1>
                      <h2 className="text-xl text-gray-600">Front Office Department</h2>
                      <p className="text-gray-500 mt-4">Periode: 1 - 31 Maret 2024</p>
                    </div>
                    
                    <div className="mt-8 space-y-6">
                      <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h3 className="font-semibold text-gray-800 mb-4">Statistik Check-in</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                            <p className="text-sm text-gray-600">Total Tamu</p>
                            <p className="text-2xl font-bold text-gray-800">1,245</p>
                          </div>
                          <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                            <p className="text-sm text-gray-600">Occupancy Rate</p>
                            <p className="text-2xl font-bold text-gray-800">85%</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h3 className="font-semibold text-gray-800 mb-4">Distribusi Tamu</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Domestik</span>
                            <span className="font-semibold text-gray-800">78%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Internasional</span>
                            <span className="font-semibold text-gray-800">22%</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-center text-gray-500 text-sm mt-12">
                        <p>Ini adalah preview dokumen PDF. Dokumen asli terdiri dari 8 halaman lengkap dengan grafik dan tabel detail.</p>
                        <p className="mt-2">Gunakan tombol Download untuk mendapatkan file PDF lengkap.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-8 py-6">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  Ukuran file: 1.8 MB • Format: PDF
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setIsPdfModalOpen(false)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl font-medium transition-all duration-200"
                  >
                    Tutup Preview
                  </button>
                  <button className="px-6 py-3 bg-gradient-to-r from-[#4789A8] to-[#5ba3c7] hover:from-[#3a7895] hover:to-[#4789A8] text-white rounded-xl font-medium transition-all duration-200 shadow-sm hover:shadow">
                    <Download className="w-4 h-4 inline-block mr-2" />
                    Download PDF Lengkap
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* === MODAL UPLOAD LAPORAN DIHAPUS === */}

      {/* === MODAL KONFIRMASI DELETE === */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 p-4">
          <div 
            className="backdrop-blur-sm bg-black/60 absolute inset-0"
            onClick={() => setIsDeleteModalOpen(false)}
          ></div>
          
          <div 
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-red-50 to-red-100 rounded-full flex items-center justify-center">
                <Trash2 className="w-8 h-8 text-red-600" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Hapus Laporan</h3>
              
              <p className="text-gray-600 mb-2">
                Anda akan menghapus laporan:
              </p>
              <p className="text-lg font-semibold text-gray-800 mb-4">
                "Laporan Check-in Harian Maret 2024"
              </p>
              <p className="text-sm text-gray-500 mb-2 flex items-center justify-center gap-2">
                <Briefcase className="w-4 h-4 text-blue-600" />
                Front Office • 1.8 MB
              </p>
              
              <p className="text-sm text-gray-500 mb-8 bg-gray-50 p-4 rounded-lg">
                Tindakan ini akan menghapus laporan secara permanen dari sistem. File PDF tidak dapat dipulihkan setelah dihapus.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="px-6 py-3.5 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl font-medium transition-all duration-200 flex-1"
                >
                  Batalkan
                </button>
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="px-6 py-3.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl font-medium transition-all duration-200 shadow-sm hover:shadow flex-1"
                >
                  Ya, Hapus Laporan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}