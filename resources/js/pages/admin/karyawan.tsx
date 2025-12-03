'use client';

import { useState } from 'react';
import React from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Users, 
  UserX, 
  Search,
  Filter,
  Building,
  Calendar,
  UserCheck,
  UserPlus,
  Download,
  FileText,
  MoreVertical,
  ChevronDown,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  XCircle,
  CheckCircle,
  RefreshCw,
  Home,      
  Coffee,      
  Calculator, 
  Heart,
  X,
  Save,
  User,
  Tag,
  Globe,
  Mail as MailIcon,
  Phone as PhoneIcon,
  MapPin as MapPinIcon,
  Building as BuildingIcon,
  Camera
} from 'lucide-react';
import Header from '../../components/admin/dashboard/Header';
import Sidebar from '../../components/admin/dashboard/Sidebar';

// Interface untuk data karyawan
interface Karyawan {
  id: number;
  nama: string;
  departemen: string;
  email: string;
  telepon: string;
  status: 'Active' | 'Deactive';
  tanggalBergabung: string;
  avatar: string;
}

const Karyawan: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [karyawanEdit, setKaryawanEdit] = useState<Karyawan | null>(null);
  const [formData, setFormData] = useState({
    nama: '',
    departemen: '',
    email: '',
    telepon: '',
    status: 'Active' as 'Active' | 'Deactive',
  });

  // Fungsi toggle sidebar
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Fungsi untuk membuka modal edit
  const openEditModal = (karyawan: Karyawan) => {
    setKaryawanEdit(karyawan);
    setFormData({
      nama: karyawan.nama,
      departemen: karyawan.departemen,
      email: karyawan.email,
      telepon: karyawan.telepon,
      status: karyawan.status,
    });
    setShowEditModal(true);
    document.body.style.overflow = 'hidden';
  };

  // Fungsi untuk membuka modal tambah
  const openAddModal = () => {
    // Reset form data untuk modal tambah
    setFormData({
      nama: '',
      departemen: '',
      email: '',
      telepon: '',
      status: 'Active',
    });
    setShowAddModal(true);
    document.body.style.overflow = 'hidden';
  };

  // Fungsi untuk menutup modal
  const closeModal = () => {
    setShowEditModal(false);
    setShowAddModal(false);
    setKaryawanEdit(null);
    document.body.style.overflow = 'auto';
  };

  // Fungsi untuk menangani perubahan form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Fungsi untuk menyimpan perubahan edit
  const handleSaveEdit = () => {
    console.log('Data yang disimpan:', formData);
    alert('Data karyawan berhasil diperbarui!');
    closeModal();
  };

  // Fungsi untuk menyimpan karyawan baru
  const handleSaveAdd = () => {
    // Validasi form
    if (!formData.nama || !formData.departemen || !formData.email || !formData.telepon) {
      alert('Harap lengkapi semua field yang wajib diisi!');
      return;
    }

    console.log('Karyawan baru yang ditambahkan:', formData);
    alert('Karyawan baru berhasil ditambahkan!');
    closeModal();
    
    // Reset form
    setFormData({
      nama: '',
      departemen: '',
      email: '',
      telepon: '',
      status: 'Active',
    });
  };

  // Fungsi untuk menangani submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (showEditModal) {
      handleSaveEdit();
    } else {
      handleSaveAdd();
    }
  };

  // Data dummy karyawan
  const karyawanData: Karyawan[] = [
    {
      id: 1,
      nama: 'Ahmad Santoso',
      departemen: 'Front Office',
      email: 'ahmad.s@kawaland.com',
      telepon: '+62 812-3456-7890',
      status: 'Active',
      tanggalBergabung: '15 Mar 2022',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmad'
    },
    {
      id: 2,
      nama: 'Siti Rahayu',
      departemen: 'Housekeeping',
      email: 'siti.r@kawaland.com',
      telepon: '+62 813-4567-8901',
      status: 'Active',
      tanggalBergabung: '10 Agu 2021',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Siti'
    },
    {
      id: 3,
      nama: 'Budi Pratama',
      departemen: 'Food & Beverage',
      email: 'budi.p@kawaland.com',
      telepon: '+62 814-5678-9012',
      status: 'Deactive',
      tanggalBergabung: '05 Nov 2020',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Budi'
    },
  ];

  // Data mantan karyawan
  const mantanKaryawanData = karyawanData.filter(k => k.status === 'Deactive');

  // List departemen untuk dropdown
  const departmentsList = [
    'Front Office',
    'Housekeeping', 
    'Food & Beverage',
    'Accounting & Administration',
   
  ];

  return (
    <div className="flex min-h-screen bg-[#f5f7fa] font-[Poppins,Segoe_UI,system-ui,sans-serif] transition-all duration-300">
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

        {/* === ISI HALAMAN === */}
        <div className="px-4 pb-8 flex flex-1 flex-col gap-6 pt-[120px] transition-all duration-300">
          {/* Page Header */}
          <div className="mb-4 md:mb-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Kelola Karyawan</h1>
                <p className="text-gray-600 text-sm md:text-base">Kelola data karyawan aktif dan mantan karyawan Kawaland</p>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={openAddModal}
                  className="flex items-center gap-2 px-4 md:px-5 py-2.5 md:py-3 bg-[#4789A8] text-white rounded-xl hover:bg-[#3a768f] transition-all duration-200 font-medium shadow-lg hover:shadow-xl flex-1 sm:flex-none justify-center"
                >
                  <UserPlus className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="hidden sm:inline">Tambah Karyawan</span>
                  <span className="sm:hidden">Tambah</span>
                </button>
              </div>
            </div>
          </div>

          {/* Stats Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-1">
            {/* Total Karyawan Card */}
            <div className="bg-white rounded-2xl p-5 md:p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium mb-1">Total Karyawan</p>
                  <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{karyawanData.length}</p>
                  <p className="text-xs md:text-sm text-gray-400">Semua karyawan terdaftar</p>
                </div>
                <div className="p-3 rounded-xl bg-blue-50">
                  <Users className="w-6 h-6 md:w-8 md:h-8 text-[#4789A8]" />
                </div>
              </div>
            </div>

            {/* Karyawan Aktif Card */}
            <div className="bg-white rounded-2xl p-5 md:p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium mb-1">Karyawan Aktif</p>
                  <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                    {karyawanData.filter(k => k.status === 'Active').length}
                  </p>
                  <p className="text-xs md:text-sm text-green-600 font-medium flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 md:w-4 md:h-4" />
                    {Math.round((karyawanData.filter(k => k.status === 'Active').length / karyawanData.length) * 100)}% active rate
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-green-50">
                  <UserCheck className="w-6 h-6 md:w-8 md:h-8 text-green-600" />
                </div>
              </div>
            </div>

            {/* Mantan Karyawan Card */}
            <div className="bg-white rounded-2xl p-5 md:p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium mb-1">Mantan Karyawan</p>
                  <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                    {karyawanData.filter(k => k.status === 'Deactive').length}
                  </p>
                  <p className="text-xs md:text-sm text-red-600 font-medium flex items-center gap-1">
                    <XCircle className="w-3 h-3 md:w-4 md:h-4" />
                    {Math.round((karyawanData.filter(k => k.status === 'Deactive').length / karyawanData.length) * 100)}% turnover
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-red-50">
                  <UserX className="w-6 h-6 md:w-8 md:h-8 text-red-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-6 md:mb-1">
            {/* Card Header */}
            <div className="p-4 md:p-6 border-b border-gray-100">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-4 md:mb-6">
                <div>
                  <h2 className="text-lg md:text-xl font-bold text-gray-900">Daftar Karyawan</h2>
                  <p className="text-gray-600 text-sm md:text-base">Kelola dan pantau data karyawan secara detail</p>
                </div>
              </div>

              <div className="space-y-3 md:space-y-0 md:grid md:grid-cols-1 lg:grid-cols-4 gap-3 md:gap-4">
                {/* Search Input */}
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <Search className="w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Cari karyawan..."
                    className="w-full pl-10 pr-4 py-2.5 md:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4789A8]/20 focus:border-[#4789A8] outline-none transition-all duration-300 bg-white text-sm md:text-base hover:border-gray-400"
                  />
                </div>

                {/* Status Filter */}
                <div className="relative group">
                  <button className="w-full flex items-center justify-between pl-10 pr-4 py-2.5 md:py-3 border border-gray-300 rounded-xl bg-white text-sm md:text-base text-gray-700 hover:border-gray-400 transition-all duration-300">
                    <div className="flex items-center gap-3">
                      <div className="absolute left-3">
                        <Filter className="w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                      </div>
                      <span>Semua Status</span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-400 transition-transform duration-200 group-hover:rotate-180" />
                  </button>
                  
                  <div className="absolute hidden group-hover:block w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
                    <div className="py-2">
                      <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-gray-700 transition-colors">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span>Active</span>
                      </button>
                      <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-gray-700 transition-colors">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        <span>Deactive</span>
                      </button>
                      <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-gray-700 transition-colors border-t border-gray-100">
                        <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                        <span>Semua Status</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Departemen Filter */}
                <div className="relative group">
                  <button className="w-full flex items-center justify-between pl-10 pr-4 py-2.5 md:py-3 border border-gray-300 rounded-xl bg-white text-sm md:text-base text-gray-700 hover:border-gray-400 transition-all duration-300">
                    <div className="flex items-center gap-3">
                      <div className="absolute left-3">
                        <Building className="w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                      </div>
                      <span>Semua Departemen</span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-400 transition-transform duration-200 group-hover:rotate-180" />
                  </button>
                  
                  <div className="absolute hidden group-hover:block w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
                    <div className="py-2 max-h-60 overflow-y-auto">
                      <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-blue-50 text-gray-700 transition-colors">
                        <Users className="w-4 h-4 text-blue-500" />
                        <span>Front Office</span>
                      </button>
                      <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-green-50 text-gray-700 transition-colors">
                        <Home className="w-4 h-4 text-green-500" />
                        <span>Housekeeping</span>
                      </button>
                      <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-orange-50 text-gray-700 transition-colors">
                        <Coffee className="w-4 h-4 text-orange-500" />
                        <span>F&B (Food & Beverage)</span>
                      </button>
                      <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-purple-50 text-gray-700 transition-colors whitespace-nowrap">
                        <Calculator className="w-4 h-4 text-purple-500 shrink-0" />
                        <span className="truncate">Accounting & Administration</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 md:gap-3">
                  <button
                    className="flex items-center gap-2 px-3 md:px-4 py-2.5 md:py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium flex-1 justify-center hover:border-gray-400"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span className="hidden md:inline">Reset</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] md:min-w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Karyawan
                    </th>
                    <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Departemen 
                    </th>
                    <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Kontak
                    </th>
                    <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {karyawanData.map((karyawan) => (
                    <tr key={karyawan.id} className="hover:bg-gray-50/80 transition-colors duration-200 group">
                      {/* Karyawan Info */}
                      <td className="px-4 md:px-6 py-4 md:py-5">
                        <div className="flex items-center gap-3 md:gap-4">
                          <div className="relative shrink-0">
                            <img
                              src={karyawan.avatar}
                              alt={karyawan.nama}
                              className="w-10 h-10 md:w-12 md:h-12 rounded-xl border-2 border-white shadow-sm"
                            />
                            <div className={`absolute -bottom-1 -right-1 w-3 h-3 md:w-4 md:h-4 rounded-full border-2 border-white ${
                              karyawan.status === 'Active' ? 'bg-green-500' : 'bg-red-500'
                            }`} />
                          </div>
                          <div className="min-w-0">
                            <div className="font-semibold text-gray-900 truncate text-sm md:text-base">{karyawan.nama}</div>
                            
                            <div className="text-gray-400 text-xs flex items-center gap-1 mt-0.5 md:mt-1">
                              <Calendar className="w-3 h-3" />
                              <span>Joined {karyawan.tanggalBergabung}</span>
                            </div>
                            <div className="text-xs text-[#4789A8] font-medium mt-1 md:mt-2">
                              ID: #{karyawan.id.toString().padStart(3, '0')}
                            </div>
                          </div>
                        </div>
                      </td>
                    
                      {/* Departemen */}
                      <td className="px-4 md:px-6 py-4 md:py-5">
                        <div className="flex items-center gap-2 md:gap-3">
                          <div className="p-2 rounded-lg shrink-0 bg-blue-50 text-blue-700">
                            <Building className="w-3 h-3 md:w-4 md:h-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="font-medium text-gray-900 text-sm md:text-base truncate">{karyawan.departemen}</div>
                          </div>
                        </div>
                      </td>
                      
                      {/* Kontak */}
                      <td className="px-4 md:px-6 py-4 md:py-5">
                        <div className="space-y-1.5 md:space-y-2">
                          <div className="flex items-center gap-2 text-xs md:text-sm group/email">
                            <Mail className="w-3 h-3 md:w-4 md:h-4 text-gray-400" />
                            <span className="text-gray-700 truncate">{karyawan.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs md:text-sm group/phone">
                            <Phone className="w-3 h-3 md:w-4 md:h-4 text-gray-400" />
                            <span className="text-gray-700">{karyawan.telepon}</span>
                          </div>
                        </div>
                      </td>
                      
                      {/* Status */}
                      <td className="px-4 md:px-6 py-4 md:py-5">
                        <div className="flex flex-col gap-1.5 md:gap-2">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 md:px-3 py-1 md:py-1.5 rounded-full text-xs font-medium border ${
                            karyawan.status === 'Active' 
                              ? 'bg-green-50 text-green-700 border-green-100' 
                              : 'bg-red-50 text-red-700 border-red-100'
                          }`}>
                            {karyawan.status === 'Active' ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                            {karyawan.status}
                          </span>
                          <span className="text-xs text-gray-500">
                            {karyawan.status === 'Active' ? 'Aktif bekerja' : 'Tidak aktif'}
                          </span>
                        </div>
                      </td>
                      
                      {/* Actions */}
                      <td className="px-4 md:px-6 py-4 md:py-5">
                        <div className="flex items-center gap-1 md:gap-2">
                          <a 
                            href="/admin/detailKaryawan"
                            className="p-1.5 md:p-2 text-gray-600 hover:text-[#4789A8] hover:bg-blue-50 rounded-lg transition-all duration-200 group relative"
                            title="View Details"
                          >
                            <Eye className="w-3.5 h-3.5 md:w-4 md:h-4" />
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                              View Details
                            </div>
                          </a>
                          
                          <button 
                            className="p-1.5 md:p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 group/edit relative"
                            title="Edit"
                            onClick={() => openEditModal(karyawan)}
                          >
                            <Edit className="w-3.5 h-3.5 md:w-4 md:h-4" />
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover/edit:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                              Edit
                            </div>
                          </button>
                          
                          <button 
                            className={`p-1.5 md:p-2 rounded-lg transition-all duration-200 group/delete relative ${
                              karyawan.status === 'Active' 
                                ? 'text-gray-400 cursor-not-allowed' 
                                : 'text-red-600 hover:text-red-700 hover:bg-red-50'
                            }`}
                            title={karyawan.status === 'Active' ? 'Hanya untuk Deactive' : 'Delete'}
                            disabled={karyawan.status === 'Active'}
                          >
                            <Trash2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover/delete:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                              {karyawan.status === 'Active' ? 'Hanya untuk Deactive' : 'Delete'}
                            </div>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Table Footer - Pagination */}
            <div className="px-4 md:px-6 py-4 border-t border-gray-100 bg-gray-50/50">
              <div className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
                <div className="text-sm text-gray-600 order-2 md:order-1">
                  Menampilkan <span className="font-semibold">1-{karyawanData.length}</span> dari <span className="font-semibold">{karyawanData.length}</span> karyawan
                </div>
                
                {/* Pagination */}
                <div className="flex items-center gap-1 order-1 md:order-2 mb-2 md:mb-0">
                  <button className="w-8 h-8 md:w-10 md:h-10 rounded-lg font-medium bg-[#4789A8] text-white">1</button>
                </div>
              </div>
            </div>
          </div>

          {/* Mantan Karyawan Section */}
          <div className="bg-white rounded-2xl p-4 md:p-6 border border-gray-200 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 md:gap-4 mb-4 md:mb-6">
              <div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1">Mantan Karyawan</h3>
                <p className="text-gray-600 text-sm md:text-base">Karyawan dengan status Deactive</p>
              </div>
              <a
                href="/admin/mantanKaryawan"
                className="p-1.5 md:p-2 text-gray-600 hover:text-[#4789A8] hover:bg-blue-50 rounded-lg transition-all duration-200 flex items-center gap-2"
              >
                <Eye className="w-3.5 h-3.5 md:w-4 md:h-4" />
                <span>View Detail</span>
              </a>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {mantanKaryawanData.length > 0 ? (
                mantanKaryawanData.map((karyawan) => (
                  <div key={karyawan.id} className="border border-gray-200 rounded-xl p-3 md:p-4 hover:border-gray-300 hover:shadow-sm transition-all duration-200 group">
                    <div className="flex items-center gap-3 mb-3 md:mb-4">
                      <img
                        src={karyawan.avatar}
                        alt={karyawan.nama}
                        className="w-12 h-12 md:w-14 md:h-14 rounded-xl border-2 border-white shadow-sm group-hover:scale-105 transition-transform duration-200"
                      />
                      <div className="min-w-0">
                        <h4 className="font-semibold text-gray-900 text-sm md:text-base truncate">{karyawan.nama}</h4>
                        <p className="text-gray-600 text-xs md:text-sm truncate">{karyawan.departemen}</p>
                      </div>
                    </div>
                    <div className="space-y-1.5 md:space-y-2">
                      <div className="flex items-center justify-between text-xs md:text-sm">
                        <span className="text-gray-500">Bergabung:</span>
                        <span className="font-medium">{karyawan.tanggalBergabung}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs md:text-sm">
                        <span className="text-gray-500">Kontak:</span>
                        <span className="font-medium truncate">{karyawan.email}</span>
                      </div>
                    </div>
                    <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-gray-100">
                      <button 
                        className="w-full py-2 text-xs md:text-sm text-[#4789A8] hover:bg-blue-50 rounded-lg transition-colors font-medium"
                      >
                        View Full History
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="border border-gray-200 rounded-xl p-3 md:p-4 hover:border-gray-300 hover:shadow-sm transition-all duration-200 flex items-center justify-center min-h-[180px] col-span-3">
                  <div className="text-center">
                    <UserX className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-2 text-gray-300" />
                    <p className="text-gray-400 text-sm">Tidak ada mantan karyawan</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal Tambah Karyawan */}
      {(showEditModal || showAddModal) && (
        <>
          {/* Backdrop dengan blur */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[999] transition-opacity duration-300"
            onClick={closeModal}
            style={{
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)'
            }}
          />
          
          {/* Modal Content */}
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 overflow-y-auto">
            <div 
              className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all duration-300 scale-100"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between rounded-t-2xl z-10">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {showEditModal ? 'Edit Data Karyawan' : 'Tambah Karyawan Baru'}
                  </h2>
                  <p className="text-gray-600 text-sm mt-1">
                    {showEditModal ? 'Perbarui informasi karyawan' : 'Tambahkan karyawan baru ke sistem'}
                  </p>
                </div>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Modal Body dengan Form */}
              <form onSubmit={handleSubmit} className="p-6">
                <div className="flex flex-col md:flex-row gap-6 mb-8">
                  {/* Avatar Section */}
                  <div className="flex flex-col items-center">
                    <div className="relative mb-4">
                      <div className="w-24 h-24 rounded-2xl border-4 border-white shadow-lg bg-gray-100 flex items-center justify-center overflow-hidden">
                        <User className="w-12 h-12 text-gray-400" />
                      </div>
                      <button 
                        type="button"
                        className="absolute -bottom-2 -right-2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors"
                        onClick={() => {
                          // Fungsi untuk upload/ganti foto
                          alert('Fitur upload foto akan segera tersedia!');
                        }}
                      >
                        <Camera className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="text-center">
                      <p className="font-medium text-gray-900">
                        {showEditModal ? karyawanEdit?.nama : 'Foto Profil'}
                      </p>
                      <p className="text-sm text-gray-500">
                        {showEditModal ? `ID: #${karyawanEdit?.id.toString().padStart(3, '0')}` : 'Klik kamera untuk upload'}
                      </p>
                    </div>
                  </div>

                  {/* Form Section */}
                  <div className="flex-1 space-y-6">
                    {/* Nama */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <User className="w-4 h-4" />
                        Nama Lengkap
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="nama"
                        value={formData.nama}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4789A8]/20 focus:border-[#4789A8] outline-none transition-all duration-300"
                        placeholder="Masukkan nama lengkap"
                        required
                      />
                    </div>

                    {/* Departemen */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <BuildingIcon className="w-4 h-4" />
                        Departemen
                        <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="departemen"
                        value={formData.departemen}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4789A8]/20 focus:border-[#4789A8] outline-none transition-all duration-300 bg-white"
                        required
                      >
                        <option value="">Pilih Departemen</option>
                        {departmentsList.map((dept) => (
                          <option key={dept} value={dept}>{dept}</option>
                        ))}
                      </select>
                    </div>

                    {/* Kontak */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                          <MailIcon className="w-4 h-4" />
                          Email
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4789A8]/20 focus:border-[#4789A8] outline-none transition-all duration-300"
                          placeholder="email@domain.com"
                          required
                        />
                      </div>
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                          <PhoneIcon className="w-4 h-4" />
                          Telepon
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          name="telepon"
                          value={formData.telepon}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4789A8]/20 focus:border-[#4789A8] outline-none transition-all duration-300"
                          placeholder="+62 812-3456-7890"
                          required
                        />
                      </div>
                    </div>

                    {/* Status */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <Globe className="w-4 h-4" />
                        Status Karyawan
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="status"
                            value="Active"
                            checked={formData.status === 'Active'}
                            onChange={handleInputChange}
                            className="w-4 h-4 text-[#4789A8] cursor-pointer"
                            required
                          />
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            <span className="text-gray-700">Active</span>
                          </div>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="status"
                            value="Deactive"
                            checked={formData.status === 'Deactive'}
                            onChange={handleInputChange}
                            className="w-4 h-4 text-[#4789A8] cursor-pointer"
                          />
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-red-500"></div>
                            <span className="text-gray-700">Deactive</span>
                          </div>
                        </label>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Pilih "Active" untuk karyawan aktif, "Deactive" untuk mantan karyawan
                      </p>
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="flex gap-3 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-[#4789A8] text-white rounded-xl hover:bg-[#3a768f] transition-all duration-200 font-medium flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    {showEditModal ? 'Simpan Perubahan' : 'Tambah Karyawan'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}

      {/* Global Styles untuk font Poppins */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        
        body {
          font-family: 'Poppins', sans-serif;
        }
        
        /* Animasi untuk modal */
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideIn {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        .modal-backdrop {
          animation: fadeIn 0.3s ease-out;
        }
        
        .modal-content {
          animation: slideIn 0.3s ease-out;
        }
        
        @media (max-width: 768px) {
          .overflow-x-auto {
            -webkit-overflow-scrolling: touch;
          }
          
          .modal-content {
            margin: 1rem;
            max-height: calc(100vh - 2rem);
          }
        }
        
        /* Custom scrollbar untuk modal */
        .overflow-y-auto {
          scrollbar-width: thin;
          scrollbar-color: #c1c1c1 transparent;
        }
        
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-track {
          background: transparent;
          border-radius: 10px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 10px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #a1a1a1;
        }
      `}</style>
    </div>
  );
};

export default Karyawan;