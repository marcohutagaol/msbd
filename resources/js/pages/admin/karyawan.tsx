


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

import { router, usePage } from '@inertiajs/react';


// Interface untuk data karyawan
interface Karyawan {
  id: number;
  nama: string;

  department: string;
  jabatan: string;
  status_aktif: 'AKTIF' | 'NONAKTIF';
  tanggalBergabung: string;

}

const Karyawan: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [karyawanEdit, setKaryawanEdit] = useState<Karyawan | null>(null);
  const [formData, setFormData] = useState({

  nama: '',
  department: '',
  jabatan: '',
  status_aktif: 'AKTIF' as 'AKTIF' | 'NONAKTIF',
  alamat: '',
  tanggal_lahir: '',
  tempat_lahir: '',
  no_telepon: '',
});



  // Fungsi toggle sidebar
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Fungsi untuk membuka modal edit

  const openEditModal = (karyawan: any) => {
  setEditId(karyawan.id_karyawan);

  setFormData({
    nama: karyawan.nama,
    department: karyawan.department,
    jabatan: karyawan.jabatan,
    status_aktif: karyawan.status_aktif,

    alamat: karyawan.alamat ?? "",
    tanggal_lahir: karyawan.tanggal_lahir ?? "",
    tempat_lahir: karyawan.tempat_lahir ?? "",
    no_telepon: karyawan.no_telepon ?? ""
  });

  setShowEditModal(true);
};




  // Fungsi untuk membuka modal tambah
  const openAddModal = () => {
    // Reset form data untuk modal tambah
    setFormData({

    nama: '',
    department: '',
    jabatan: '',
    status_aktif: 'AKTIF',
    alamat:'',
    tanggal_lahir: '',
    tempat_lahir: '',
    no_telepon: '',
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

  if (!karyawanEdit) return;

  router.put(`/admin/karyawan/update/${karyawanEdit.id}`, formData, {
    onSuccess: () => {
      closeModal();
    },
    onError: (errors) => {
  console.log("ERROR DARI SERVER:", errors);
  alert("Terjadi kesalahan saat update.");
}

  });
};



  // Fungsi untuk menyimpan karyawan baru
  const handleSaveAdd = () => {
  router.post('/admin/karyawan/store', formData, {
    onSuccess: () => {
      closeModal();
      setFormData({
    nama: '',
    department: '',
    jabatan: '',
    status_aktif: 'AKTIF',
    alamat:'',
    tanggal_lahir: '',
    tempat_lahir: '',
    no_telepon: '',
  });
    },
    onError: (errors) => {
      console.log(errors);
      alert("Terjadi kesalahan.");
    }
  });
};

const [editId, setEditId] = useState<string | null>(null);


  // Fungsi untuk menangani submit form
  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const url = editId
    ? `/karyawan/update/${editId}`
    : `/karyawan/store`;

  const method = editId ? 'POST' : 'POST'; 
  // PUT tidak bisa dipakai langsung tanpa _method
  // Jadi kita override manual

  const form = new FormData();
  Object.entries(formData).forEach(([key, value]) => {
    form.append(key, value as string);
  });

  if (editId) {
    form.append("_method", "PUT"); // Laravel style
  }

  await fetch(url, {
    method: "POST",
    headers: {
      "X-CSRF-TOKEN": (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement).content
    },
    body: form
  });

  setShowEditModal(false);
  window.location.reload();
};




  // Data dummy karyawan
  const { karyawanData, totalKaryawan, totalKaryawanAktif, totalMantanKaryawan } = usePage<{
    karyawanData: Karyawan[];
    totalKaryawan: number;
    totalKaryawanAktif: number;
    totalMantanKaryawan: number;
}>().props;

  // Data mantan karyawan
  const mantanKaryawanData = karyawanData.filter(k => k.status_aktif === 'NONAKTIF');

  // List department untuk dropdown
  const departmentsList = [
    { kode: "FNB", nama: "Food & Beverage Department" },
    { kode: "FO", nama: "Front Office Department" },
    { kode: "HK", nama: "Housekeeping Department" },
    { kode: "LS", nama: "Landscape Department" },
    { kode: "ENG", nama: "Engineering & Maintenance Department" },
    { kode: "SEC", nama: "Security Department" },
    { kode: "ACC", nama: "Accounting & Administration" },
    { kode: "MKT", nama: "Marketing Department" },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // jumlah karyawan per halaman

  const totalItems = karyawanData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedData = karyawanData.slice(startIndex, endIndex);
  


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

                  <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{totalKaryawan}</p>

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

                    {totalKaryawanAktif}
                  </p>
                  <p className="text-xs md:text-sm text-green-600 font-medium flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 md:w-4 md:h-4" />
                    {Math.round((totalKaryawanAktif / totalKaryawan) * 100)}% active rate

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

                    {totalMantanKaryawan}
                  </p>
                  <p className="text-xs md:text-sm text-red-600 font-medium flex items-center gap-1">
                    <XCircle className="w-3 h-3 md:w-4 md:h-4" />
                    {Math.round((totalMantanKaryawan / totalKaryawan) * 100)}% turnover

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

                        <span>NONAKTIF</span>
                      </button>
                      <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-gray-700 transition-colors border-t border-gray-100">
                        <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                        <span>Semua Status</span>
                      </button>
                    </div>
                  </div>
                </div>


                {/* department Filter */}

                <div className="relative group">
                  <button className="w-full flex items-center justify-between pl-10 pr-4 py-2.5 md:py-3 border border-gray-300 rounded-xl bg-white text-sm md:text-base text-gray-700 hover:border-gray-400 transition-all duration-300">
                    <div className="flex items-center gap-3">
                      <div className="absolute left-3">
                        <Building className="w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                      </div>

                      <span>Semua department</span>

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

                      department 
                    </th>
                    <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Jabatan

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

                  {paginatedData.map((karyawan, index) => (
                    <tr key={karyawan.id} className="hover:bg-gray-50/80 transition-colors duration-200 group">
                      <td className="px-4 md:px-6 py-4 md:py-5">
                        <div className="flex items-center gap-3 md:gap-4">
                          <div className="relative shrink-0">
                            {/* <img
                              src={karyawan.avatar}
                              alt={karyawan.nama}
                              className="w-10 h-10 md:w-12 md:h-12 rounded-xl border-2 border-white shadow-sm"
                            /> */}
                            <div className={`absolute -bottom-1 -right-1 w-3 h-3 md:w-4 md:h-4 rounded-full border-2 border-white ${
                              karyawan.status_aktif === 'AKTIF' ? 'bg-green-500' : 'bg-red-500'

                            }`} />
                          </div>
                          <div className="min-w-0">
                            <div className="font-semibold text-gray-900 truncate text-sm md:text-base">{karyawan.nama}</div>
                            

                            {/* <div className="text-gray-400 text-xs flex items-center gap-1 mt-0.5 md:mt-1">
                              <Calendar className="w-3 h-3" />
                              <span>Joined {karyawan.tanggalBergabung}</span>
                            </div> */}
                            <div className="text-xs text-[#4789A8] font-medium mt-1 md:mt-2">
                              ID: {karyawan.id}

                            </div>
                          </div>
                        </div>
                      </td>
                    
                      <td className="px-4 md:px-6 py-4 md:py-5">
                        <div className="flex items-center gap-2 md:gap-3">
                          <div className="p-2 rounded-lg shrink-0 bg-blue-50 text-blue-700">
                            <Building className="w-3 h-3 md:w-4 md:h-4" />
                          </div>
                          <div className="min-w-0">

                            <div className="font-medium text-gray-900 text-sm md:text-base truncate">{karyawan.department}</div>

                          </div>
                        </div>
                      </td>
                      

                      <td className="px-4 md:px-6 py-4 md:py-5">
                        <div className="space-y-1.5 md:space-y-2">
                          <div className="flex items-center gap-2 text-xs md:text-sm group/email">
                            <span className="text-gray-700 truncate">{karyawan.jabatan}</span>

                          </div>
                        </div>
                      </td>
                      

                      <td className="px-4 md:px-6 py-4 md:py-5">
                        <div className="flex flex-col gap-1.5 md:gap-2">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 md:px-3 py-1 md:py-1.5 rounded-full text-xs font-medium border ${
                            karyawan.status_aktif === 'AKTIF' 
                              ? 'bg-green-50 text-green-700 border-green-100' 
                              : 'bg-red-50 text-red-700 border-red-100'
                          }`}>
                            {karyawan.status_aktif === 'AKTIF' ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                            {karyawan.status_aktif}
                          </span>
                          <span className="text-xs text-gray-500">
                            {karyawan.status_aktif === 'AKTIF' ? 'Aktif bekerja' : 'Tidak aktif'}

                          </span>
                        </div>
                      </td>
                      

                      <td className="px-4 md:px-6 py-4 md:py-5">
                        <div className="flex items-center gap-1 md:gap-2">
                          <a 
                            href={`/admin/detailKaryawan/${karyawan.id}`}

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

                              karyawan.status_aktif === 'AKTIF' 
                                ? 'text-gray-400 cursor-not-allowed' 
                                : 'text-red-600 hover:text-red-700 hover:bg-red-50'
                            }`}
                            title={karyawan.status_aktif === 'AKTIF' ? 'Hanya untuk NONAKTIF' : 'Delete'}
                            disabled={karyawan.status_aktif === 'AKTIF'}
                          >
                            <Trash2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover/delete:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                              {karyawan.status_aktif === 'AKTIF' ? 'Hanya untuk NONAKTIF' : 'Delete'}

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


                {/* Info */}
                <div className="text-sm text-gray-600 order-2 md:order-1">
                  Menampilkan <span className="font-semibold">{startIndex + 1}-{Math.min(endIndex, totalItems)}</span>
                  {" "} dari {" "}
                  <span className="font-semibold">{totalItems}</span> karyawan
                </div>

                {/* Pagination */}
                <div className="flex items-center gap-1 order-1 md:order-2 mb-2 md:mb-0">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-8 h-8 md:w-10 md:h-10 rounded-lg font-medium 
                        ${currentPage === i + 1 
                          ? "bg-[#4789A8] text-white" 
                          : "bg-white text-gray-600 border border-gray-300"
                        }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                

              </div>
            </div>
          </div>

          {/* Mantan Karyawan Section */}
          <div className="bg-white rounded-2xl p-4 md:p-6 border border-gray-200 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 md:gap-4 mb-4 md:mb-6">
              <div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1">Mantan Karyawan</h3>

                <p className="text-gray-600 text-sm md:text-base">Karyawan dengan status NONAKTIF</p>

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

                      {/* <img
                        src={karyawan.avatar}
                        alt={karyawan.nama}
                        className="w-12 h-12 md:w-14 md:h-14 rounded-xl border-2 border-white shadow-sm group-hover:scale-105 transition-transform duration-200"
                      /> */}
                      <div className="min-w-0">
                        <h4 className="font-semibold text-gray-900 text-sm md:text-base truncate">{karyawan.nama}</h4>
                        <p className="text-gray-600 text-xs md:text-sm truncate">{karyawan.department}</p>
                      </div>
                    </div>
                    {/* <div className="space-y-1.5 md:space-y-2">

                      <div className="flex items-center justify-between text-xs md:text-sm">
                        <span className="text-gray-500">Bergabung:</span>
                        <span className="font-medium">{karyawan.tanggalBergabung}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs md:text-sm">
                        <span className="text-gray-500">Kontak:</span>
                        <span className="font-medium truncate">{karyawan.email}</span>
                      </div>

                    </div> */}

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

            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-999 transition-opacity duration-300"

            onClick={closeModal}
            style={{
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)'
            }}
          />
          
          {/* Modal Content */}

          <div className="fixed inset-0 z-1000 flex items-center justify-center p-4 overflow-y-auto">

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


                    {/* department */}
                    <div>
  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
    <BuildingIcon className="w-4 h-4" />
    Department
    <span className="text-red-500">*</span>
  </label>

  <select
    name="department"
    value={formData.department}
    onChange={handleInputChange}
    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4789A8]/20 focus:border-[#4789A8] outline-none transition-all duration-300 bg-white"
    required
  >
    <option value="">Pilih department</option>

    {departmentsList.map((dept) => (
      <option key={dept.kode} value={dept.kode}>
        {dept.nama}
      </option>
    ))}
  </select>
</div>


                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <User className="w-4 h-4" />
                        Jabatan
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="jabatan"
                        value={formData.jabatan}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4789A8]/20 focus:border-[#4789A8] outline-none transition-all duration-300"
                        placeholder="Masukkan jabatan"
                        required
                      />
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

                            name="status_aktif"
                            value="AKTIF"
                            checked={formData.status_aktif === 'AKTIF'}

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

                            name="status_aktif"
                            value="NONAKTIF"
                            checked={formData.status_aktif === 'NONAKTIF'}

                            onChange={handleInputChange}
                            className="w-4 h-4 text-[#4789A8] cursor-pointer"
                          />
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-red-500"></div>

                            <span className="text-gray-700">NONAKTIF</span>

                          </div>
                        </label>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">

                        Pilih "Active" untuk karyawan aktif, "NONAKTIF" untuk mantan karyawan

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
>>>>>>> d9280bafcd04a8bf05b301b11fd12992dddabef1
          font-family: 'Poppins', 'Segoe UI', system-ui, sans-serif;
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

