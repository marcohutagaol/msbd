"use client";

import React, { useState, useEffect } from 'react';
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaBuilding, 
  FaCalendarAlt,
  FaIdCard,
  FaBriefcase,
  FaCheckCircle,
  FaEdit,
  FaArrowLeft,
  FaShieldAlt,
  FaFileContract,
  FaCreditCard,
  FaVenusMars,
  FaHeart,
  FaBirthdayCake,
  FaHome,
  FaPray,
  FaIdBadge
} from 'react-icons/fa';
import Header from '../../components/admin/dashboard/Header';
import Sidebar from '../../components/admin/dashboard/Sidebar';
import { usePage } from '@inertiajs/react';

const DetailKaryawan = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  interface Karyawan {
    id_karyawan: number;
    nama: string;
    department: string;
    jabatan: string;
    status_aktif: 'AKTIF' | 'NONAKTIF';
    tanggalBergabung: string;
    tempat_lahir: string;
    tanggal_lahir: string;
    no_telepon: string;
    alamat: string;
    masaKerja: string;
    username: string;
    email: string;
    role: string;
    tanggalAkun: string;
  }

  interface PageProps {
    karyawan: Karyawan;
  }

  const { karyawan } = usePage().props as unknown as PageProps;

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

  return (
    <div className="flex min-h-screen bg-gray-50">
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

        {/* === CONTENT AREA === */}
        <div className="px-4 sm:px-6 lg:px-8 pb-6 flex flex-col flex-1 gap-4 md:gap-6 pt-20 md:pt-24 transition-all duration-300">
          {/* === HEADER NAVIGATION === */}
          <div className="mb-4 md:mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <a
                href="/admin/karyawan"
                className="inline-flex items-center gap-2 p-2 md:p-2.5 text-gray-600 hover:text-[#4789A8] hover:bg-blue-50 rounded-lg transition-all duration-200 w-fit"
              >
                <FaArrowLeft className="w-3.5 h-3.5 md:w-4 md:h-4" />
                <span className="text-sm md:text-base">Kembali ke Daftar Karyawan</span>
              </a>
              
              <div className="flex items-center">
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800">Detail Karyawan</h1>
              </div>
            </div>
          </div>

          {/* === MAIN GRID CONTAINER === */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            {/* === LEFT COLUMN - PROFILE & STATUS === */}
            <div className="lg:col-span-1 space-y-4 md:space-y-6">
              {/* === PROFILE CARD === */}
              <div className="bg-white rounded-lg md:rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
                <div className="flex flex-col items-center text-center">
                  {/* Profile Icon */}
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-[#4789A8]/10 rounded-full flex items-center justify-center mb-3 md:mb-4">
                    <FaUser className="text-[#4789A8] text-2xl md:text-3xl" />
                  </div>
                  
                  {/* Name and ID */}
                  <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800 mb-2">{karyawan.nama}</h2>
                  <div className="inline-flex items-center bg-gray-50 px-3 md:px-4 py-1.5 md:py-2 rounded-lg mb-4 md:mb-6">
                    <FaIdBadge className="text-gray-400 mr-2 w-3 h-3 md:w-4 md:h-4" />
                    <span className="text-gray-700 font-medium text-sm md:text-base">ID: {karyawan.id_karyawan}</span>
                  </div>
                  
                  {/* Info Items */}
                  <div className="w-full space-y-3 md:space-y-4 pt-4 md:pt-6 border-t border-gray-100">
                    <div className="flex items-center">
                      <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-50 rounded-lg flex items-center justify-center mr-3 md:mr-4 shrink-0">
                        <FaBriefcase className="text-[#4789A8] text-base md:text-lg" />
                      </div>
                      <div className="text-left flex-1">
                        <div className="font-medium text-gray-800 text-sm md:text-base">{karyawan.jabatan}</div>
                        <div className="text-xs md:text-sm text-gray-500">Jabatan</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-50 rounded-lg flex items-center justify-center mr-3 md:mr-4 shrink-0">
                        <FaBuilding className="text-[#4789A8] text-base md:text-lg" />
                      </div>
                      <div className="text-left flex-1">
                        <div className="font-medium text-gray-800 text-sm md:text-base">{karyawan.department}</div>
                        <div className="text-xs md:text-sm text-gray-500">Departemen</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-50 rounded-lg flex items-center justify-center mr-3 md:mr-4 shrink-0">
                        <FaCalendarAlt className="text-[#4789A8] text-base md:text-lg" />
                      </div>
                      <div className="text-left flex-1">
                        <div className="font-medium text-gray-800 text-sm md:text-base">{karyawan.tanggalBergabung}</div>
                        <div className="text-xs md:text-sm text-gray-500">Tanggal Bergabung</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* === MIDDLE COLUMN - PERSONAL INFO === */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg md:rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-4 md:px-6 py-4 md:py-5 border-b border-gray-200 bg-[#4789A8]/5">
                  <div className="flex items-center">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-[#4789A8]/10 rounded-lg flex items-center justify-center mr-3">
                      <FaUser className="text-[#4789A8] text-base md:text-lg" />
                    </div>
                    <h3 className="text-base md:text-lg font-semibold text-gray-800">Informasi Pribadi</h3>
                  </div>
                </div>
                
                <div className="p-4 md:p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {/* Column 1 */}
                    <div className="space-y-4 md:space-y-6">
                      <div className="bg-gray-50 rounded-lg p-3 md:p-4 min-h-[76px] md:min-h-[88px] flex flex-col justify-center border border-gray-100">
                        <div className="flex items-center mb-2">
                          <FaBirthdayCake className="text-gray-400 mr-3 w-4 h-4 shrink-0" />
                          <span className="text-xs md:text-sm text-gray-500">Tempat, Tanggal Lahir</span>
                        </div>
                        <div className="font-medium pl-7 text-gray-800 text-sm md:text-base">{karyawan.tempat_lahir}, {karyawan.tanggal_lahir}</div>
                      </div>
                    </div>
                    
                    {/* Column 2 */}
                    <div className="space-y-4 md:space-y-6">
                      <div className="bg-gray-50 rounded-lg p-3 md:p-4 min-h-[76px] md:min-h-[88px] flex flex-col justify-center border border-gray-100">
                        <div className="flex items-center mb-2">
                          <FaPhone className="text-gray-400 mr-3 w-4 h-4 shrink-0" />
                          <span className="text-xs md:text-sm text-gray-500">Telepon</span>
                        </div>
                        <div className="font-medium pl-7 text-gray-800 text-sm md:text-base">{karyawan.no_telepon}</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Full width items */}
                  <div className="mt-4 md:mt-6">
                    <div className="bg-gray-50 rounded-lg p-3 md:p-4 min-h-[76px] md:min-h-[88px] flex flex-col justify-center border border-gray-100">
                      <div className="flex items-center mb-2">
                        <FaHome className="text-gray-400 mr-3 w-4 h-4 shrink-0" />
                        <span className="text-xs md:text-sm text-gray-500">Alamat</span>
                      </div>
                      <div className="font-medium pl-7 text-gray-800 text-xs md:text-sm">{karyawan.alamat}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* === BOTTOM ROW - 3 CARDS === */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            {/* === STATUS KARYAWAN === */}
            <div className="bg-white rounded-lg md:rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
              <div className="flex items-center mb-4 md:mb-6">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-green-50 rounded-lg flex items-center justify-center mr-3">
                  <FaCheckCircle className="text-green-600 text-base md:text-lg" />
                </div>
                <h3 className="text-base md:text-lg font-semibold text-gray-800">Status Karyawan</h3>
              </div>
              
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-center justify-between py-2.5 md:py-3 px-3 md:px-4 rounded-lg bg-gray-50">
                  <span className="text-xs md:text-sm text-gray-600">Status Keaktifan</span>
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full mr-2 ${karyawan.status_aktif === 'AKTIF' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span className={`font-medium text-xs md:text-sm ${karyawan.status_aktif === 'AKTIF' ? 'text-green-600' : 'text-red-600'}`}>
                      {karyawan.status_aktif}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between py-2.5 md:py-3 px-3 md:px-4 rounded-lg bg-gray-50">
                  <span className="text-xs md:text-sm text-gray-600">Status Kepegawaian</span>
                  <span className="font-medium text-blue-600 text-xs md:text-sm">Tetap</span>
                </div>
                
                <div className="flex items-center justify-between py-2.5 md:py-3 px-3 md:px-4 rounded-lg bg-gray-50">
                  <span className="text-xs md:text-sm text-gray-600">Masa Kerja</span>
                  <span className="font-medium text-xs md:text-sm">{karyawan.masaKerja}</span>
                </div>
              </div>
            </div>

            {/* === INFORMASI AKUN === */}
            <div className="bg-white rounded-lg md:rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-4 md:px-6 py-4 md:py-5 border-b border-gray-200 bg-[#4789A8]/5">
                <div className="flex items-center">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-[#4789A8]/10 rounded-lg flex items-center justify-center mr-3">
                    <FaShieldAlt className="text-[#4789A8] text-base md:text-lg" />
                  </div>
                  <h3 className="text-base md:text-lg font-semibold text-gray-800">Informasi Akun</h3>
                </div>
              </div>
              
              <div className="p-4 md:p-6">
                <div className="space-y-4 md:space-y-6">
                  <div className="space-y-1.5 md:space-y-2">
                    <div className="text-xs md:text-sm text-gray-500">Username</div>
                    <div className="font-medium bg-gray-50 px-3 md:px-4 py-2.5 md:py-3 rounded-lg border border-gray-100 min-h-[48px] md:min-h-[56px] flex items-center text-gray-800 text-sm md:text-base">
                      {karyawan.username}
                    </div>
                  </div>
                  
                  <div className="space-y-1.5 md:space-y-2">
                    <div className="text-xs md:text-sm text-gray-500">Email Akun</div>
                    <div className="font-medium bg-gray-50 px-3 md:px-4 py-2.5 md:py-3 rounded-lg border border-gray-100 min-h-[48px] md:min-h-[56px] flex items-center text-gray-800 text-sm md:text-base">
                      {karyawan.email}
                    </div>
                  </div>
                  
                  <div className="space-y-1.5 md:space-y-2">
                    <div className="text-xs md:text-sm text-gray-500">Role</div>
                    <div className="font-medium text-[#4789A8] bg-blue-50 px-3 md:px-4 py-2.5 md:py-3 rounded-lg border border-blue-100 min-h-[48px] md:min-h-[56px] flex items-center text-sm md:text-base">
                      {karyawan.role}
                    </div>
                  </div>
                  
                  <div className="space-y-1.5 md:space-y-2">
                    <div className="text-xs md:text-sm text-gray-500">Tanggal Bergabung</div>
                    <div className="font-medium bg-gray-50 px-3 md:px-4 py-2.5 md:py-3 rounded-lg border border-gray-100 min-h-[48px] md:min-h-[56px] flex items-center text-gray-800 text-sm md:text-base">
                      {karyawan.tanggalAkun}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* === INFORMASI PEKERJAAN === */}
            <div className="bg-white rounded-lg md:rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-4 md:px-6 py-4 md:py-5 border-b border-gray-200 bg-[#4789A8]/5">
                <div className="flex items-center">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-[#4789A8]/10 rounded-lg flex items-center justify-center mr-3">
                    <FaBriefcase className="text-[#4789A8] text-base md:text-lg" />
                  </div>
                  <h3 className="text-base md:text-lg font-semibold text-gray-800">Informasi Pekerjaan</h3>
                </div>
              </div>
              
              <div className="p-4 md:p-6">
                <div className="space-y-4 md:space-y-6">
                  <div className="space-y-1.5 md:space-y-2">
                    <div className="text-xs md:text-sm text-gray-500">Departemen</div>
                    <div className="font-medium bg-gray-50 px-3 md:px-4 py-2.5 md:py-3 rounded-lg border border-gray-100 min-h-[48px] md:min-h-[56px] flex items-center text-gray-800 text-sm md:text-base">
                      {karyawan.department}
                    </div>
                  </div>
                  
                  <div className="space-y-1.5 md:space-y-2">
                    <div className="text-xs md:text-sm text-gray-500">Jabatan</div>
                    <div className="font-medium bg-gray-50 px-3 md:px-4 py-2.5 md:py-3 rounded-lg border border-gray-100 min-h-[48px] md:min-h-[56px] flex items-center text-gray-800 text-sm md:text-base">
                      {karyawan.jabatan}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Info Tambahan */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg md:rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="mt-1 p-2 bg-white rounded-lg">
                <FaUser className="w-4 h-4 text-[#4789A8]" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-800 text-sm md:text-base">Detail Informasi Karyawan</h3>
                <p className="text-blue-700 text-xs md:text-sm mt-1.5">
                  Semua informasi karyawan yang tercantum di atas adalah data resmi yang terdaftar dalam sistem perusahaan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailKaryawan;