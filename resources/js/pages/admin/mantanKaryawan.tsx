'use client';

import { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';

import { FaFilter, FaUserSlash, FaUserCircle, FaBuilding, FaIdCard, FaSearch, FaTimes, FaCalendarAlt, FaCaretDown, FaArrowLeft } from 'react-icons/fa';
import Header from '../../components/admin/dashboard/Header';
import Sidebar from '../../components/admin/dashboard/Sidebar';

// Daftar departemen unik untuk filter
const departments = ["Semua Departemen", "IT", "HR", "Marketing", "Finance", "Operations"];

interface Employee {
  id: string;
  nama: string;
  departemen: string;
  // tambah properti lain kalau ada
}

export default function FormerEmployees() {
  const { mantanKaryawan } = usePage<{ mantanKaryawan: Employee[] }>().props;
  const [employees] = useState<Employee[]>(mantanKaryawan);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("Semua Departemen");
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Deteksi ukuran layar
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

  const filteredEmployees = employees.filter(emp => {
    const matchesDepartment =
      selectedDepartment === "Semua Departemen" ||
      emp.departemen === selectedDepartment;

    const matchesSearch =
      emp.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.departemen.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesDepartment && matchesSearch;
  });

  // Reset filter
  const resetFilters = () => {
    setSelectedDepartment("Semua Departemen");
    setSearchTerm("");
  };

  return (
    <div className="flex min-h-screen bg-[#f5f7fa] font-[Poppins,Segoe_UI,system-ui,sans-serif] transition-all duration-300">
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
          
          {/* Back Button */}
          <a
            href="/admin/karyawan"
            className="p-2 text-gray-600 hover:text-[#4789A8] hover:bg-blue-50 rounded-lg transition-all duration-200 flex items-center gap-2 w-fit text-sm md:text-base"
          >
            <FaArrowLeft className="w-4 h-4" />
            <span>Kembali</span>
          </a>

          {/* Page Header */}
          <div className="bg-white rounded-lg md:rounded-xl shadow-sm p-4 md:p-6 border border-gray-100">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br from-[#4789A8] to-[#5ca3c7] flex items-center justify-center flex-shrink-0">
                  <FaUserSlash className="text-white text-lg md:text-xl" />
                </div>
                <div>
                  <h1 className="text-xl md:text-2xl font-bold text-gray-800">Mantan Karyawan</h1>
                  <p className="text-gray-600 text-sm md:text-base mt-1">Daftar lengkap karyawan yang telah berhenti bekerja di perusahaan</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-sm md:text-base">
                <span className="text-gray-500">Total:</span>
                <span className="px-3 py-1 bg-[#4789A8]/10 text-[#4789A8] font-medium rounded-full">
                  {employees.length} Karyawan
                </span>
              </div>
            </div>
          </div>

          {/* Filter Section */}
          <div className="bg-white rounded-lg md:rounded-xl shadow-sm p-4 md:p-6 border border-gray-100">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 md:mb-6">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <FaFilter className="text-[#4789A8]" /> 
                Filter Data
              </h2>
              
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                {/* Search Bar */}
                <div className="relative w-full sm:w-auto sm:min-w-[250px]">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaSearch className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Cari nama, ID, atau departemen..."
                    className="w-full pl-10 pr-4 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4789A8] focus:border-transparent text-sm md:text-base"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                {/* Reset Filter Button */}
                <button 
                  onClick={resetFilters}
                  className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition flex items-center gap-2 justify-center text-sm md:text-base"
                >
                  <FaTimes /> Reset
                </button>
              </div>
            </div>
            
            {/* Department Filter Dropdown */}
            <div className="relative">
              <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                <FaBuilding className="text-[#4789A8]" /> Filter Berdasarkan Departemen
              </h3>
              
              <div className="relative w-full md:w-64">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full px-4 py-2.5 md:py-3 border border-gray-300 rounded-lg bg-white text-gray-700 flex justify-between items-center hover:border-[#4789A8] transition text-sm md:text-base"
                >
                  <span className="flex items-center gap-2">
                    <FaBuilding className="text-[#4789A8]" />
                    {selectedDepartment}
                  </span>
                  <FaCaretDown className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={() => setIsDropdownOpen(false)}
                    />
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                      {departments.map(dept => (
                        <button
                          key={dept}
                          onClick={() => {
                            setSelectedDepartment(dept);
                            setIsDropdownOpen(false);
                          }}
                          className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition flex items-center gap-2 ${
                            selectedDepartment === dept 
                              ? 'bg-[#4789A8]/10 text-[#4789A8] font-medium' 
                              : 'text-gray-700'
                          } ${dept === departments[0] ? 'rounded-t-lg' : ''} ${
                            dept === departments[departments.length - 1] ? 'rounded-b-lg' : ''
                          } text-sm md:text-base`}
                        >
                          <FaBuilding className={selectedDepartment === dept ? 'text-[#4789A8]' : 'text-gray-400'} />
                          {dept}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
              
              {/* Active Filter Indicator */}
              {selectedDepartment !== "Semua Departemen" && (
                <div className="mt-4 flex items-center gap-3">
                  <span className="text-sm text-gray-600">Filter aktif:</span>
                  <div className="px-3 py-1.5 bg-[#4789A8]/10 text-[#4789A8] rounded-full flex items-center gap-2 text-sm">
                    <FaBuilding size={12} />
                    <span className="font-medium">{selectedDepartment}</span>
                    <button 
                      onClick={() => setSelectedDepartment("Semua Departemen")}
                      className="ml-1 text-[#4789A8] hover:text-[#3a7795]"
                    >
                      <FaTimes size={12} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Results Info */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 md:gap-4">
            <div className="text-gray-700 text-sm md:text-base">
              Menampilkan <span className="font-semibold">{filteredEmployees.length}</span> dari <span className="font-semibold">{employees.length}</span> mantan karyawan
            </div>
            
            {filteredEmployees.length > 0 && (
              <div className="flex items-center gap-3 text-xs md:text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-gray-600">Status Deactive</span>
                </div>
                <div className="w-px h-4 bg-gray-300"></div>
                <div className="text-gray-500">
                  Terakhir diperbarui: Hari ini
                </div>
              </div>
            )}
          </div>

          {/* Employee Cards */}
          {filteredEmployees.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filteredEmployees.map(employee => (
                <div key={employee.id} className="bg-white rounded-lg md:rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300 group">
                  {/* Header Card */}
                  <div className="p-4 md:p-5 border-b border-gray-100">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-[#4789A8]/10 flex items-center justify-center flex-shrink-0">
                          <FaIdCard className="text-[#4789A8] text-sm md:text-base" />
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">ID Karyawan</div>
                          <div className="text-base md:text-lg font-bold text-gray-800">{employee.id}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 px-2 py-1 md:px-3 md:py-1.5 bg-red-50 text-red-600 rounded-full text-xs md:text-sm font-medium">
                        <FaUserSlash size={10} className="md:size-12" />
                        <span>Deactive</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Employee Info */}
                  <div className="p-4 md:p-5">
                    {/* Profile Photo & Name */}
                    <div className="flex flex-col items-center mb-4 md:mb-5">
                      <h3 className="text-base md:text-lg font-bold text-center text-gray-800 mb-2">{employee.nama}</h3>
                    </div>
                    
                    {/* Details */}
                    <div className="space-y-3 md:space-y-4">
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-[#4789A8]/10 flex items-center justify-center flex-shrink-0">
                          <FaBuilding className="text-[#4789A8] text-sm md:text-base" />
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">Departemen</div>
                          <div className="font-semibold text-gray-800 text-sm md:text-base">{employee.departemen}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0">
                          <FaUserSlash className="text-red-600 text-sm md:text-base" />
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">Status Karyawan</div>
                          <div className="font-semibold text-red-600 flex items-center gap-2 text-sm md:text-base">
                            Deactive
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-[#4789A8]/10 flex items-center justify-center flex-shrink-0">
                          <FaCalendarAlt className="text-[#4789A8] text-sm md:text-base" />
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">Tanggal Keluar</div>
                          {/* <div className="font-semibold text-gray-800 text-sm md:text-base">{employee.tanggalKeluar}</div> */}
                          <div className="font-semibold text-gray-800 text-sm md:text-base">-</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="bg-white rounded-lg md:rounded-xl shadow-sm p-6 md:p-8 lg:p-12 text-center border border-gray-200">
              <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 md:mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                <FaUserSlash className="text-gray-400 text-2xl md:text-3xl" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-700 mb-2">Tidak ada data ditemukan</h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto text-sm md:text-base">
                {searchTerm 
                  ? `Tidak ditemukan mantan karyawan dengan kata kunci "${searchTerm}"`
                  : `Tidak ada mantan karyawan di departemen ${selectedDepartment}`
                }
              </p>
              <button 
                onClick={resetFilters}
                className="px-5 py-2.5 md:px-6 md:py-3 bg-[#4789A8] text-white rounded-lg hover:bg-[#3a7795] transition font-medium text-sm md:text-base"
              >
                Reset Filter
              </button>
            </div>
          )}

          {/* Footer Note */}
          {filteredEmployees.length > 0 && (
            <div className="mt-4 md:mt-6 p-3 md:p-4 bg-blue-50 border border-blue-100 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                  <FaUserSlash className="text-blue-600 text-xs" />
                </div>
                <div>
                  <p className="text-xs md:text-sm text-blue-800">
                    <span className="font-medium">Catatan:</span> Data mantan karyawan disimpan untuk keperluan arsip dan referensi historis. Informasi pribadi dilindungi sesuai dengan kebijakan privasi perusahaan.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}