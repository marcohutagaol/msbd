"use client";

import React, { useState, useEffect } from "react";
import { Users, Search, Filter, Clock, User, Building, Camera, Calendar } from "lucide-react";
import Sidebar from "../../components/admin/dashboard/Sidebar";
import Header from "../../components/admin/dashboard/Header";

export default function EmployeeDetailStatus() {
  const [searchTerm, setSearchTerm] = useState("");
  const [deptFilter, setDeptFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const employees = [
    { 
      id: 1, 
      name: "Andi Pratama", 
      dept: "Finance", 
      jamMasuk: "08:05", 
      jamPulang: "17:00",
      status: "Sudah Pulang", 
      fotoMasuk: "/api/placeholder/80/80",
      fotoPulang: "/api/placeholder/80/80"
    },
    { 
      id: 2, 
      name: "Budi Santoso", 
      dept: "IT Support", 
      jamMasuk: "08:20", 
      jamPulang: "17:15",
      status: "Terlambat", 
      fotoMasuk: "/api/placeholder/80/80",
      fotoPulang: "/api/placeholder/80/80"
    },
    { 
      id: 3, 
      name: "Citra Lestari", 
      dept: "HRD", 
      jamMasuk: "07:58", 
      jamPulang: "-",
      status: "Masih Bekerja", 
      fotoMasuk: "/api/placeholder/80/80",
      fotoPulang: "/api/placeholder/80/80"
    },
    { 
      id: 4, 
      name: "Dewi Anggraini", 
      dept: "Marketing", 
      jamMasuk: "-", 
      jamPulang: "-",
      status: "Tidak Hadir", 
      fotoMasuk: "/api/placeholder/80/80",
      fotoPulang: "/api/placeholder/80/80"
    },
    { 
      id: 5, 
      name: "Eko Wijaya", 
      dept: "Finance", 
      jamMasuk: "08:00", 
      jamPulang: "16:45",
      status: "Sudah Pulang", 
      fotoMasuk: "/api/placeholder/80/80",
      fotoPulang: "/api/placeholder/80/80"
    },
    { 
      id: 6, 
      name: "Fitri Handayani", 
      dept: "Marketing", 
      jamMasuk: "07:55", 
      jamPulang: "-",
      status: "Masih Bekerja", 
      fotoMasuk: "/api/placeholder/80/80",
      fotoPulang: "/api/placeholder/80/80"
    },
  ];

  // Deteksi ukuran layar untuk responsif
  useEffect(() => {
    const checkIfMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      // Pada mobile, sidebar default tertutup
      if (mobile && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
      // Pada desktop, sidebar default terbuka
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Masih Bekerja":
        return "bg-green-100 border-green-200 text-green-700";
      case "Terlambat":
        return "bg-yellow-100 border-yellow-200 text-yellow-700";
      case "Tidak Hadir":
        return "bg-red-100 border-red-200 text-red-700";
      case "Sudah Pulang":
        return "bg-blue-100 border-blue-200 text-blue-700";
      default:
        return "bg-gray-100 border-gray-200 text-gray-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Masih Bekerja":
        return "🟢";
      case "Terlambat":
        return "🟡";
      case "Tidak Hadir":
        return "🔴";
      case "Sudah Pulang":
        return "🔵";
      default:
        return "⚪";
    }
  };

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.dept.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = deptFilter === "" || employee.dept === deptFilter;
    const matchesStatus = statusFilter === "" || employee.status === statusFilter;
    
    return matchesSearch && matchesDept && matchesStatus;
  });

  const departments = [...new Set(employees.map(emp => emp.dept))];
  const statuses = [...new Set(employees.map(emp => emp.status))];

  // Statistik
  const totalHadir = employees.filter(emp => emp.status === "Masih Bekerja" || emp.status === "Sudah Pulang").length;
  const totalTerlambat = employees.filter(emp => emp.status === "Terlambat").length;
  const totalTidakHadir = employees.filter(emp => emp.status === "Tidak Hadir").length;
  const totalKaryawan = employees.length;

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

        {/* === ISI HALAMAN DETAIL KARYAWAN === */}
        <div className="px-4 sm:px-6 lg:px-8 pb-6 flex flex-1 flex-col gap-4 md:gap-6 pt-20 md:pt-28 transition-all duration-300">
          {/* Page Header */}
          <div className="bg-white rounded-lg md:rounded-xl p-4 md:p-6 shadow-sm border border-slate-200">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 md:p-3 bg-[#4789A8]/10 rounded-lg">
                  <Users className="w-5 h-5 md:w-6 md:h-6 text-[#4789A8]" />
                </div>
                <div>
                  <h1 className="text-xl md:text-2xl font-bold text-gray-900">Detail Karyawan Hari Ini</h1>
                  <p className="text-gray-600 mt-1 text-sm md:text-base">Monitoring kehadiran dan aktivitas karyawan hari ini</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>{new Date().toLocaleDateString('id-ID', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
            </div>
          </div>

          {/* Statistik Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            <div className="bg-white rounded-lg md:rounded-xl p-4 md:p-6 shadow-sm border border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs md:text-sm text-gray-600 font-medium">Total Hadir</div>
                  <div className="text-xl md:text-2xl font-bold text-gray-900 mt-1">{totalHadir}</div>
                  <div className="text-xs text-gray-500 mt-1">Karyawan</div>
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 md:w-6 md:h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg md:rounded-xl p-4 md:p-6 shadow-sm border border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs md:text-sm text-gray-600 font-medium">Terlambat</div>
                  <div className="text-xl md:text-2xl font-bold text-gray-900 mt-1">{totalTerlambat}</div>
                  <div className="text-xs text-gray-500 mt-1">Karyawan</div>
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Clock className="w-4 h-4 md:w-6 md:h-6 text-yellow-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg md:rounded-xl p-4 md:p-6 shadow-sm border border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs md:text-sm text-gray-600 font-medium">Tidak Hadir</div>
                  <div className="text-xl md:text-2xl font-bold text-gray-900 mt-1">{totalTidakHadir}</div>
                  <div className="text-xs text-gray-500 mt-1">Karyawan</div>
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 md:w-6 md:h-6 text-red-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg md:rounded-xl p-4 md:p-6 shadow-sm border border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs md:text-sm text-gray-600 font-medium">Total Karyawan</div>
                  <div className="text-xl md:text-2xl font-bold text-gray-900 mt-1">{totalKaryawan}</div>
                  <div className="text-xs text-gray-500 mt-1">Orang</div>
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 bg-[#4789A8]/10 rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4 md:w-6 md:h-6 text-[#4789A8]" />
                </div>
              </div>
            </div>
          </div>

          {/* Filter Section */}
          <div className="bg-white rounded-lg md:rounded-xl p-4 md:p-6 shadow-sm border border-slate-200">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 md:w-5 md:h-5 text-[#4789A8]" />
                <span className="font-medium text-gray-700 text-sm md:text-base">Filter Data:</span>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                {/* Search Bar */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Cari nama atau departemen..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 md:py-2.5 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4789A8] focus:border-transparent"
                  />
                </div>

                {/* Department Filter */}
                <select
                  value={deptFilter}
                  onChange={(e) => setDeptFilter(e.target.value)}
                  className="px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4789A8] focus:border-transparent"
                >
                  <option value="">Semua Departemen</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>

                {/* Status Filter */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4789A8] focus:border-transparent"
                >
                  <option value="">Semua Status</option>
                  {statuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Tabel */}
          <div className="bg-white rounded-lg md:rounded-xl shadow-sm overflow-hidden border border-slate-200">
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full min-w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-[#4789A8]" />
                        <span>Nama Karyawan</span>
                      </div>
                    </th>
                    <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <Building className="w-4 h-4 text-[#4789A8]" />
                        <span>Departemen</span>
                      </div>
                    </th>
                    <th className="px-4 md:px-6 py-3 md:py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center gap-2 justify-center">
                        <Clock className="w-4 h-4 text-[#4789A8]" />
                        <span>Jam Masuk</span>
                      </div>
                    </th>
                    <th className="px-4 md:px-6 py-3 md:py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center gap-2 justify-center">
                        <Clock className="w-4 h-4 text-[#4789A8]" />
                        <span>Jam Pulang</span>
                      </div>
                    </th>
                    <th className="px-4 md:px-6 py-3 md:py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <span>Status</span>
                    </th>
                    <th className="px-4 md:px-6 py-3 md:py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center gap-2 justify-center">
                        <Camera className="w-4 h-4 text-[#4789A8]" />
                        <span>Bukti Absen</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredEmployees.map((employee) => (
                    <tr key={employee.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 bg-[#4789A8]/10 rounded-full flex items-center justify-center">
                            <span className="text-[#4789A8] font-semibold text-xs md:text-sm">
                              {employee.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div className="ml-3 md:ml-4">
                            <div className="text-sm md:text-base font-medium text-gray-900">{employee.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                        <div className="text-sm md:text-base text-gray-900">{employee.dept}</div>
                      </td>
                      <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap text-center">
                        <div className="text-sm md:text-base font-medium text-gray-900">{employee.jamMasuk}</div>
                      </td>
                      <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap text-center">
                        <div className="text-sm md:text-base font-medium text-gray-900">{employee.jamPulang}</div>
                      </td>
                      <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap text-center">
                        <span className={`inline-flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(employee.status)}`}>
                          {getStatusIcon(employee.status)} <span>{employee.status}</span>
                        </span>
                      </td>
                      <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap text-center">
                        <div className="flex justify-center gap-2">
                          {employee.fotoMasuk && employee.jamMasuk !== "-" && (
                            <button className="flex flex-col items-center gap-1 text-xs text-[#4789A8] hover:text-[#356b87] transition-colors">
                              <div className="w-8 h-8 md:w-12 md:h-12 bg-slate-100 rounded border border-slate-200 flex items-center justify-center">
                                <Camera className="w-3 h-3 md:w-4 md:h-4" />
                              </div>
                              <span>Masuk</span>
                            </button>
                          )}
                          {employee.fotoPulang && employee.jamPulang !== "-" && (
                            <button className="flex flex-col items-center gap-1 text-xs text-[#4789A8] hover:text-[#356b87] transition-colors">
                              <div className="w-8 h-8 md:w-12 md:h-12 bg-slate-100 rounded border border-slate-200 flex items-center justify-center">
                                <Camera className="w-3 h-3 md:w-4 md:h-4" />
                              </div>
                              <span>Pulang</span>
                            </button>
                          )}
                          {employee.jamMasuk === "-" && employee.jamPulang === "-" && (
                            <span className="text-xs text-gray-500">Tidak ada bukti</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden divide-y divide-gray-200">
              {filteredEmployees.map((employee) => (
                <div key={employee.id} className="p-4 hover:bg-slate-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-10 h-10 bg-[#4789A8]/10 rounded-full flex items-center justify-center mt-1">
                        <span className="text-[#4789A8] font-semibold text-sm">
                          {employee.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 text-sm">{employee.name}</h3>
                        <div className="text-xs text-gray-600 mt-1">{employee.dept}</div>
                        
                        <div className="flex items-center gap-3 mt-3">
                          <div>
                            <div className="text-xs text-gray-500">Jam Masuk</div>
                            <div className="font-medium text-sm">{employee.jamMasuk}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">Jam Pulang</div>
                            <div className="font-medium text-sm">{employee.jamPulang}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(employee.status)}`}>
                        {getStatusIcon(employee.status)} {employee.status === "Masih Bekerja" ? "Bekerja" : 
                         employee.status === "Sudah Pulang" ? "Pulang" : 
                         employee.status === "Terlambat" ? "Terlambat" : 
                         "Tidak Hadir"}
                      </span>
                    </div>
                  </div>

                  {/* Bukti Absen Mobile */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-gray-700">Bukti Absen:</span>
                      <div className="flex gap-2">
                        {employee.fotoMasuk && employee.jamMasuk !== "-" && (
                          <button className="flex flex-col items-center gap-1 text-xs text-[#4789A8]">
                            <div className="w-8 h-8 bg-slate-100 rounded border border-slate-200 flex items-center justify-center">
                              <Camera className="w-3 h-3" />
                            </div>
                            <span>Masuk</span>
                          </button>
                        )}
                        {employee.fotoPulang && employee.jamPulang !== "-" && (
                          <button className="flex flex-col items-center gap-1 text-xs text-[#4789A8]">
                            <div className="w-8 h-8 bg-slate-100 rounded border border-slate-200 flex items-center justify-center">
                              <Camera className="w-3 h-3" />
                            </div>
                            <span>Pulang</span>
                          </button>
                        )}
                        {employee.jamMasuk === "-" && employee.jamPulang === "-" && (
                          <span className="text-xs text-gray-500 self-center">Tidak ada bukti</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredEmployees.length === 0 && (
              <div className="text-center py-8 md:py-12">
                <User className="w-10 h-10 md:w-12 md:h-12 text-gray-400 mx-auto mb-3 md:mb-4" />
                <p className="text-gray-500 text-sm md:text-lg">Tidak ada data yang ditemukan</p>
                <p className="text-gray-400 text-xs md:text-sm mt-1">Coba ubah filter pencarian Anda</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}