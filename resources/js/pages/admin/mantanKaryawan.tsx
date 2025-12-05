
'use client';

import { useState } from 'react';
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
  const [selectedDepartment, setSelectedDepartment] = useState("Semua Departemen");
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

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
        <div className="px-6 pb-8 flex flex-1 flex-col gap-6 pt-24 transition-all duration-300">
            <a
              href="/admin/karyawan"
              className="p-1.5 md:p-2 text-gray-600 hover:text-[#4789A8] hover:bg-blue-50 rounded-lg transition-all duration-200 flex items-center gap-2"
            >
              <FaArrowLeft className="w-3.5 h-3.5 md:w-4 md:h-4" />
              <span>Kembali</span>
            </a>
          {/* Page Header */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-linear-to-br from-[#4789A8] to-[#5ca3c7] flex items-center justify-center">
                    <FaUserSlash className="text-white text-xl" />
                  </div>
                  Mantan Karyawan
                </h1>
                <p className="text-gray-600 mt-2">Daftar lengkap karyawan yang telah berhenti bekerja di perusahaan</p>
              </div>
              
              <div className="flex items-center gap-3 text-sm">
                <span className="text-gray-500">Total:</span>
                <span className="px-3 py-1 bg-[#4789A8]/10 text-[#4789A8] font-medium rounded-full">
                  {employees.length} Karyawan
                </span>
              </div>
            </div>
          </div>

          {/* Filter Section */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <FaFilter className="text-[#4789A8]" /> 
                Filter Data
              </h2>
              
              <div className="flex flex-wrap gap-3">
                {/* Search Bar */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaSearch className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Cari nama, ID, atau departemen..."
                    className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4789A8] focus:border-transparent w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                {/* Reset Filter Button */}
                <button 
                  onClick={resetFilters}
                  className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition flex items-center gap-2"
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
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-700 flex justify-between items-center hover:border-[#4789A8] transition"
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
                          }`}
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
                  <div className="px-3 py-1.5 bg-[#4789A8]/10 text-[#4789A8] rounded-full flex items-center gap-2">
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
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="text-gray-700">
              Menampilkan <span className="font-semibold">{filteredEmployees.length}</span> dari <span className="font-semibold">{employees.length}</span> mantan karyawan
            </div>
            
            {filteredEmployees.length > 0 && (
              <div className="flex items-center gap-3 text-sm">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEmployees.map(employee => (
                <div key={employee.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300 group">
                  {/* Header Card */}
                  <div className="p-5 border-b border-gray-100">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#4789A8]/10 flex items-center justify-center">
                          <FaIdCard className="text-[#4789A8]" />
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">ID Karyawan</div>
                          <div className="text-lg font-bold text-gray-800">{employee.id}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-red-50 text-red-600 rounded-full text-sm font-medium">
                        <FaUserSlash size={12} />
                        <span>Deactive</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Employee Info */}
                  <div className="p-5">
                    {/* Profile Photo & Name */}
                    <div className="flex flex-col items-center mb-5">
                      
                      <h3 className="text-lg font-bold text-center text-gray-800">{employee.nama}</h3>
                    </div>
                    
                    {/* Details */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-10 h-10 rounded-lg bg-[#4789A8]/10 flex items-center justify-center">
                          <FaBuilding className="text-[#4789A8]" />
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">Departemen</div>
                          <div className="font-semibold text-gray-800">{employee.departemen}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                          <FaUserSlash className="text-red-600" />
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">Status Karyawan</div>
                          <div className="font-semibold text-red-600 flex items-center gap-2">
                            Deactive
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-10 h-10 rounded-lg bg-[#4789A8]/10 flex items-center justify-center">
                          <FaCalendarAlt className="text-[#4789A8]" />
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">Tanggal Keluar</div>
                          {/* <div className="font-semibold text-gray-800">{employee.tanggalKeluar}</div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-gray-200">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                <FaUserSlash className="text-gray-400 text-3xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Tidak ada data ditemukan</h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                {searchTerm 
                  ? `Tidak ditemukan mantan karyawan dengan kata kunci "${searchTerm}"`
                  : `Tidak ada mantan karyawan di departemen ${selectedDepartment}`
                }
              </p>
              <button 
                onClick={resetFilters}
                className="px-6 py-3 bg-[#4789A8] text-white rounded-lg hover:bg-[#3a7795] transition font-medium"
              >
                Reset Filter
              </button>
            </div>
          )}

          {/* Footer Note */}
          {filteredEmployees.length > 0 && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                  <FaUserSlash className="text-blue-600 text-xs" />
                </div>
                <div>
                  <p className="text-sm text-blue-800">
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
