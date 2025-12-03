import React, { useState } from 'react';
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

const DetailKaryawan = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* === SIDEBAR === */}
      <div
        className={`fixed top-0 left-0 z-50 h-full w-[260px] bg-white shadow-md transition-transform duration-300 ${
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
          className={`fixed top-0 right-0 z-40 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.05)] transition-all duration-300 ${
            isSidebarOpen ? 'left-[260px]' : 'left-0'
          }`}
        >
          <Header
            isSidebarOpen={isSidebarOpen}
            onToggleSidebar={toggleSidebar}
          />
        </div>

        {/* === CONTENT AREA === */}
        <div className="mt-16 p-8">
          {/* === HEADER NAVIGATION === */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
<a
  href="/admin/karyawan"
  className="p-1.5 md:p-2 text-gray-600 hover:text-[#4789A8] hover:bg-blue-50 rounded-lg transition-all duration-200 flex items-center gap-2"
>
  <FaArrowLeft className="w-3.5 h-3.5 md:w-4 md:h-4" />
  <span>Kembali</span>
</a>


              
              <div className="flex items-center space-x-6">
                <h1 className="text-2xl font-bold text-gray-800">Detail Karyawan</h1>
              
              </div>
            </div>
          </div>

          {/* === MAIN GRID CONTAINER === */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* === LEFT COLUMN - PROFILE & STATUS === */}
            <div className="lg:col-span-1 space-y-6">
              {/* === PROFILE CARD === */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-full">
                <div className="flex flex-col items-center text-center">
                  {/* Profile Image */}
                  <div className="relative mb-6">
                    <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-white shadow-lg">
                      <img 
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop" 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                      <div className="flex items-center bg-green-50 text-green-700 px-4 py-1.5 rounded-full border border-green-200 shadow-sm">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        <span className="font-medium text-sm">Aktif</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Name and ID */}
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Ahmad Budiman</h2>
                  <div className="inline-flex items-center bg-gray-50 px-4 py-2 rounded-lg mb-6">
                    <FaIdBadge className="text-gray-400 mr-2" />
                    <span className="text-gray-700 font-medium">NIK: NIK001234</span>
                  </div>
                  
                  {/* Info Items */}
                  <div className="w-full space-y-4 pt-6 border-t border-gray-100">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                        <FaBriefcase className="text-[#4789A8] text-lg" />
                      </div>
                      <div className="text-left flex-1">
                        <div className="font-medium text-gray-800">Supervisor Marketing</div>
                        <div className="text-sm text-gray-500">Jabatan</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                        <FaBuilding className="text-[#4789A8] text-lg" />
                      </div>
                      <div className="text-left flex-1">
                        <div className="font-medium text-gray-800">Marketing</div>
                        <div className="text-sm text-gray-500">Departemen</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                        <FaCalendarAlt className="text-[#4789A8] text-lg" />
                      </div>
                      <div className="text-left flex-1">
                        <div className="font-medium text-gray-800">10 Maret 2020</div>
                        <div className="text-sm text-gray-500">Tanggal Bergabung</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* === MIDDLE COLUMN - PERSONAL INFO === */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden h-full">
                <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-[#4789A8]/5 to-white">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-[#4789A8]/10 rounded-lg flex items-center justify-center mr-3">
                      <FaUser className="text-[#4789A8] text-lg" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">Informasi Pribadi</h3>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Column 1 */}
                    <div className="space-y-6">
                      <div className="bg-gray-50 rounded-lg p-4 min-h-[88px] flex flex-col justify-center border border-gray-100">
                        <div className="flex items-center mb-2">
                          <FaBirthdayCake className="text-gray-400 mr-3 w-4 h-4 flex-shrink-0" />
                          <span className="text-sm text-gray-500">Tempat, Tanggal Lahir</span>
                        </div>
                        <div className="font-medium pl-7 text-gray-800">Jakarta, 15 Mei 1990</div>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-4 min-h-[88px] flex flex-col justify-center border border-gray-100">
                        <div className="flex items-center mb-2">
                          <FaVenusMars className="text-gray-400 mr-3 w-4 h-4 flex-shrink-0" />
                          <span className="text-sm text-gray-500">Jenis Kelamin</span>
                        </div>
                        <div className="font-medium pl-7 text-gray-800">Laki-laki</div>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-4 min-h-[88px] flex flex-col justify-center border border-gray-100">
                        <div className="flex items-center mb-2">
                          <FaPray className="text-gray-400 mr-3 w-4 h-4 flex-shrink-0" />
                          <span className="text-sm text-gray-500">Agama</span>
                        </div>
                        <div className="font-medium pl-7 text-gray-800">Islam</div>
                      </div>
                    </div>
                    
                    {/* Column 2 */}
                    <div className="space-y-6">
                      <div className="bg-gray-50 rounded-lg p-4 min-h-[88px] flex flex-col justify-center border border-gray-100">
                        <div className="flex items-center mb-2">
                          <FaHeart className="text-gray-400 mr-3 w-4 h-4 flex-shrink-0" />
                          <span className="text-sm text-gray-500">Status Pernikahan</span>
                        </div>
                        <div className="font-medium pl-7 text-gray-800">Menikah</div>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-4 min-h-[88px] flex flex-col justify-center border border-gray-100">
                        <div className="flex items-center mb-2">
                          <FaPhone className="text-gray-400 mr-3 w-4 h-4 flex-shrink-0" />
                          <span className="text-sm text-gray-500">Telepon</span>
                        </div>
                        <div className="font-medium pl-7 text-gray-800">081234567890</div>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-4 min-h-[88px] flex flex-col justify-center border border-gray-100">
                        <div className="flex items-center mb-2">
                          <FaMapMarkerAlt className="text-gray-400 mr-3 w-4 h-4 flex-shrink-0" />
                          <span className="text-sm text-gray-500">Tempat Tinggal</span>
                        </div>
                        <div className="font-medium pl-7 text-gray-800">Jakarta</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Full width items */}
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 rounded-lg p-4 min-h-[88px] flex flex-col justify-center border border-gray-100">
                      <div className="flex items-center mb-2">
                        <FaHome className="text-gray-400 mr-3 w-4 h-4 flex-shrink-0" />
                        <span className="text-sm text-gray-500">Alamat</span>
                      </div>
                      <div className="font-medium pl-7 text-gray-800 text-sm">Jl. Merdeka No. 123, Jakarta Pusat</div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4 min-h-[88px] flex flex-col justify-center border border-gray-100">
                      <div className="flex items-center mb-2">
                        <FaEnvelope className="text-gray-400 mr-3 w-4 h-4 flex-shrink-0" />
                        <span className="text-sm text-gray-500">Email</span>
                      </div>
                      <div className="font-medium pl-7 text-gray-800 text-sm">ahmad.budiman@perusahaan.com</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* === BOTTOM ROW - 3 CARDS === */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            {/* === STATUS KARYAWAN === */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center mr-3">
                  <FaCheckCircle className="text-green-600 text-lg" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Status Karyawan</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 px-4 rounded-lg bg-gray-50">
                  <span className="text-gray-600">Status Keaktifan</span>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="font-medium text-green-600">Aktif</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between py-3 px-4 rounded-lg bg-gray-50">
                  <span className="text-gray-600">Status Kepegawaian</span>
                  <span className="font-medium text-blue-600">Tetap</span>
                </div>
                
                <div className="flex items-center justify-between py-3 px-4 rounded-lg bg-gray-50">
                  <span className="text-gray-600">Masa Kerja</span>
                  <span className="font-medium">4 Tahun 2 Bulan</span>
                </div>
              </div>
            </div>

            {/* === INFORMASI AKUN === */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-[#4789A8]/5 to-white">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-[#4789A8]/10 rounded-lg flex items-center justify-center mr-3">
                    <FaShieldAlt className="text-[#4789A8] text-lg" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">Informasi Akun</h3>
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="text-sm text-gray-500">Username</div>
                    <div className="font-medium bg-gray-50 px-4 py-3 rounded-lg border border-gray-100 min-h-[48px] flex items-center text-gray-800">ahmad.budiman</div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-sm text-gray-500">Email Akun</div>
                    <div className="font-medium bg-gray-50 px-4 py-3 rounded-lg border border-gray-100 min-h-[48px] flex items-center text-gray-800">ahmad.budiman@perusahaan.com</div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-sm text-gray-500">Role</div>
                    <div className="font-medium text-[#4789A8] bg-blue-50 px-4 py-3 rounded-lg border border-blue-100 min-h-[48px] flex items-center">Supervisor</div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-sm text-gray-500">Tanggal Bergabung</div>
                    <div className="font-medium bg-gray-50 px-4 py-3 rounded-lg border border-gray-100 min-h-[48px] flex items-center text-gray-800">10 Maret 2020</div>
                  </div>
                </div>
              </div>
            </div>

            {/* === INFORMASI PEKERJAAN === */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-[#4789A8]/5 to-white">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-[#4789A8]/10 rounded-lg flex items-center justify-center mr-3">
                    <FaBriefcase className="text-[#4789A8] text-lg" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">Informasi Pekerjaan</h3>
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="text-sm text-gray-500">Departemen</div>
                    <div className="font-medium bg-gray-50 px-4 py-3 rounded-lg border border-gray-100 min-h-[48px] flex items-center text-gray-800">Marketing</div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-sm text-gray-500">Jabatan</div>
                    <div className="font-medium bg-gray-50 px-4 py-3 rounded-lg border border-gray-100 min-h-[48px] flex items-center text-gray-800">Supervisor Marketing</div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-sm text-gray-500">Divisi</div>
                    <div className="font-medium bg-gray-50 px-4 py-3 rounded-lg border border-gray-100 min-h-[48px] flex items-center text-gray-800">Digital Marketing</div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-sm text-gray-500">Atasan Langsung</div>
                    <div className="font-medium bg-gray-50 px-4 py-3 rounded-lg border border-gray-100 min-h-[48px] flex items-center text-gray-800">Budi Santoso</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailKaryawan;