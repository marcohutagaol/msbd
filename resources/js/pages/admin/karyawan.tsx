'use client';

import { useState, useMemo } from 'react';
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

// Interface untuk data karyawan (sesuaikan jika ada field tambahan dari backend)
interface Karyawan {
  id: number;
  nama: string;
  department: string;        // nama_department
  kode_department: string;   // ← INI yang benar
  jabatan: string;
  status_aktif: 'AKTIF' | 'NONAKTIF';
  tanggalBergabung?: string;
  alamat?: string;
  tanggal_lahir?: string;
  tempat_lahir?: string;
  no_telepon?: string;
}

const Karyawan: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [karyawanEdit, setKaryawanEdit] = useState<Karyawan | null>(null);
  const [editId, setEditId] = useState<number | null>(null);

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

  // SEARCH & FILTER state
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState(''); // '' | 'AKTIF' | 'NONAKTIF'
  const [filterDept, setFilterDept] = useState(''); // department code or ''
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
const [deptDropdownOpen, setDeptDropdownOpen] = useState(false);



  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fungsi toggle sidebar
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Ambil data dari Inertia props
  const { karyawanData, totalKaryawan, totalKaryawanAktif, totalMantanKaryawan, departments } = usePage<{
  karyawanData: Karyawan[],
  departments: { kode_department: string, nama_department: string }[],
  totalKaryawan: number,
  totalKaryawanAktif: number,
  totalMantanKaryawan: number,
}>().props;


  // departments list (sama seperti sebelumnya)
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

  // ================================
  // FILTER & PAGINATION (FRONTEND)
  // ================================
  const filteredData = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();

    return karyawanData.filter((k) => {
      // search
      const matchesSearch =
        q === '' ||
        (k.nama && k.nama.toLowerCase().includes(q)) ||
        (k.department && k.department.toLowerCase().includes(q)) ||
        (k.jabatan && k.jabatan.toLowerCase().includes(q)) ||
        String(k.id).includes(q);

      // status filter
      const matchesStatus = filterStatus === '' || k.status_aktif === filterStatus;

      // department filter (we compare kode if available, else department string)
      const matchesDept =
  filterDept === '' ||
  k.kode_department === filterDept;


      return matchesSearch && matchesStatus && matchesDept;
    });
  }, [karyawanData, searchTerm, filterStatus, filterDept]);

  const totalItems = filteredData.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  // Reset page when filters/search change
  // (We update page in onChange handlers below; as extra safety:)
  // if currentPage becomes out of range, clamp it:
  if (currentPage > totalPages) {
    setCurrentPage(1);
  }

  // ================================
  // MODAL / FORM HANDLERS
  // ================================
  const openEditModal = (karyawan: Karyawan) => {
    setEditId(karyawan.id);
    setKaryawanEdit(karyawan);

    setFormData({
      nama: karyawan.nama || '',
      department: karyawan.department || '',
      jabatan: karyawan.jabatan || '',
      status_aktif: karyawan.status_aktif || 'AKTIF',
      alamat: karyawan.alamat ?? '',
      tanggal_lahir: karyawan.tanggal_lahir ?? '',
      tempat_lahir: karyawan.tempat_lahir ?? '',
      no_telepon: karyawan.no_telepon ?? '',
    });

    setShowEditModal(true);
    document.body.style.overflow = 'hidden';
  };

  const openAddModal = () => {
    setEditId(null);
    setKaryawanEdit(null);
    setFormData({
      nama: '',
      department: '',
      jabatan: '',
      status_aktif: 'AKTIF',
      alamat: '',
      tanggal_lahir: '',
      tempat_lahir: '',
      no_telepon: '',
    });
    setShowAddModal(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
  setShowAddModal(false);
  setShowEditModal(false);
  setEditId(null);

  setFormData({
    nama: "",
    department: "",
    jabatan: "",
    status_aktif: "AKTIF",
    alamat: "",
    tanggal_lahir: "",
    tempat_lahir: "",
    no_telepon: "",
  });
};


  const handleInputChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
) => {
  const { name, value } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: value
  }));
};


  // Submit handler (works for add & edit)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editId) {
      // Update existing karyawan (Laravel expects PUT; we send _method override)
      router.post(`/admin/karyawan/update/${editId}`, { ...formData, _method: 'PUT' }, {
        onSuccess: () => {
          closeModal();
        },
        onError: (errors: any) => {
          console.log("ERROR UPDATE:", errors);
          alert("Terjadi kesalahan saat update.");
        }
      });
    } else {
      // Create new karyawan
      router.post('/admin/karyawan/store', formData, {
        onSuccess: () => {
          closeModal();
          // reset handled by backend re-render; if not, you can clear form
          setFormData({
            nama: '',
            department: '',
            jabatan: '',
            status_aktif: 'AKTIF',
            alamat: '',
            tanggal_lahir: '',
            tempat_lahir: '',
            no_telepon: '',
          });
        },
        onError: (errors: any) => {
          console.log("ERROR CREATE:", errors);
          alert("Terjadi kesalahan saat menyimpan.");
        }
      });
    }
  };

  const handleEdit = (item: any) => {
  setEditId(item.id);

  setFormData({
    nama: item.nama || "",
    department: item.department || "",
    jabatan: item.jabatan || "",
    status_aktif: item.status_aktif || "AKTIF",
    alamat: item.alamat || "",
    tanggal_lahir: item.tanggal_lahir || "",
    tempat_lahir: item.tempat_lahir || "",
    no_telepon: item.no_telepon || "",
  });

  setShowEditModal(true);
};


  // Optional: delete handler (not requested, kept disabled for AKTIF)
  const handleDelete = (id: number) => {
  if (!confirm('Hapus karyawan ini?')) return;

  router.post(`/admin/karyawan/delete/${id}`, { _method: 'DELETE' }, {
    onSuccess: () => {
      // success
      alert('Berhasil dihapus');
    },
    onError: () => {
      alert('Gagal menghapus.');
    }
  });
};


  // ================================
  // RENDER
  // ================================
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
            {/* Total, Aktif, Mantan (sama seperti before) */}
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

            <div className="bg-white rounded-2xl p-5 md:p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium mb-1">Karyawan Aktif</p>
                  <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                    {totalKaryawanAktif}
                  </p>
                  <p className="text-xs md:text-sm text-green-600 font-medium flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 md:w-4 md:h-4" />
                    {Math.round((totalKaryawanAktif / Math.max(1, totalKaryawan)) * 100)}% active rate
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-green-50">
                  <UserCheck className="w-6 h-6 md:w-8 md:h-8 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 md:p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium mb-1">Mantan Karyawan</p>
                  <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                    {totalMantanKaryawan}
                  </p>
                  <p className="text-xs md:text-sm text-red-600 font-medium flex items-center gap-1">
                    <XCircle className="w-3 h-3 md:w-4 md:h-4" />
                    {Math.round((totalMantanKaryawan / Math.max(1, totalKaryawan)) * 100)}% turnover
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
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full pl-10 pr-4 py-2.5 md:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4789A8]/20 focus:border-[#4789A8] outline-none transition-all duration-300 bg-white text-sm md:text-base hover:border-gray-400"
                  />
                </div>

                {/* Status Filter */}
                <div className="relative">
  <button
    onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}
    className="w-full flex items-center justify-between pl-10 pr-4 py-3 border border-gray-300 rounded-xl"
  >
    <span>{filterStatus === '' ? 'Semua Status' : filterStatus}</span>
    <ChevronDown className="w-4 h-4 text-gray-400" />
  </button>

  {statusDropdownOpen && (
    <div className="absolute w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
      <button
        onClick={() => { setFilterStatus('AKTIF'); setCurrentPage(1); setStatusDropdownOpen(false); }}
        className="w-full px-4 py-3 hover:bg-gray-50"
      >
        AKTIF
      </button>
      <button
        onClick={() => { setFilterStatus('NONAKTIF'); setCurrentPage(1); setStatusDropdownOpen(false); }}
        className="w-full px-4 py-3 hover:bg-gray-50"
      >
        NONAKTIF
      </button>
      <button
        onClick={() => { setFilterStatus(''); setCurrentPage(1); setStatusDropdownOpen(false); }}
        className="w-full px-4 py-3 hover:bg-gray-50 border-t"
      >
        Semua Status
      </button>
    </div>
  )}
</div>


                {/* department Filter */}
                <div className="relative">
  <button
    onClick={() => setDeptDropdownOpen(!deptDropdownOpen)}
    className="w-full flex items-center justify-between pl-10 pr-4 py-3 border border-gray-300 rounded-xl"
  >
    <span>{filterDept === '' ? 'Semua Department' : filterDept}</span>
    <ChevronDown className="w-4 h-4 text-gray-400" />
  </button>

  {deptDropdownOpen && (
    <div className="absolute w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto">
      <button
        onClick={() => { setFilterDept(''); setDeptDropdownOpen(false); }}
        className="w-full px-4 py-3 hover:bg-blue-50 text-gray-700"
      >
        Semua Department
      </button>

      {departments.map((d) => (
        <button
          key={d.kode_department}
          onClick={() => { setFilterDept(d.kode_department); setDeptDropdownOpen(false); }}
          className="w-full px-4 py-3 hover:bg-blue-50 text-gray-700"
        >
          {d.nama_department}
        </button>
      ))}
    </div>
  )}
</div>


                {/* Action Buttons */}
                <div className="flex gap-2 md:gap-3">
                  <button
                    onClick={() => {
                      // reset filters
                      setSearchTerm('');
                      setFilterStatus('');
                      setFilterDept('');
                      setCurrentPage(1);
                    }}
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
                    <tr
  key={karyawan.id}
  className="transition-colors duration-200"
>
  {/* NAMA + STATUS BULLET */}
  <td className="px-4 md:px-6 py-4 md:py-5">
    <div className="flex items-center gap-3 md:gap-4">
      <div className="relative shrink-0">
        <div
          className={`absolute -bottom-1 -right-1 w-3 h-3 md:w-4 md:h-4 rounded-full border-2 border-white ${
            karyawan.status_aktif === "AKTIF"
              ? "bg-green-500"
              : "bg-red-500"
          }`}
        />
      </div>

      <div className="min-w-0">
        <div className="font-semibold text-gray-900 truncate text-sm md:text-base">
          {karyawan.nama}
        </div>
        <div className="text-xs text-[#4789A8] font-medium mt-1 md:mt-2">
          ID: {karyawan.id}
        </div>
      </div>
    </div>
  </td>

  {/* DEPARTMENT */}
  <td className="px-4 md:px-6 py-4 md:py-5">
    <div className="flex items-center gap-2 md:gap-3">
      <div className="p-2 rounded-lg shrink-0 bg-blue-50 text-blue-700">
        <Building className="w-3 h-3 md:w-4 md:h-4" />
      </div>
      <div className="min-w-0">
        <div className="font-medium text-gray-900 text-sm md:text-base truncate">
          {karyawan.department}
        </div>
      </div>
    </div>
  </td>

  {/* JABATAN */}
  <td className="px-4 md:px-6 py-4 md:py-5">
    <div className="space-y-1.5 md:space-y-2">
      <div className="flex items-center gap-2 text-xs md:text-sm">
        <span className="text-gray-700 truncate">{karyawan.jabatan}</span>
      </div>
    </div>
  </td>

  {/* STATUS */}
  <td className="px-4 md:px-6 py-4 md:py-5">
    <div className="flex flex-col gap-1.5 md:gap-2">
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 md:px-3 py-1 md:py-1.5 rounded-full text-xs font-medium border ${
          karyawan.status_aktif === "AKTIF"
            ? "bg-green-50 text-green-700 border-green-100"
            : "bg-red-50 text-red-700 border-red-100"
        }`}
      >
        {karyawan.status_aktif === "AKTIF" ? (
          <CheckCircle className="w-3 h-3" />
        ) : (
          <XCircle className="w-3 h-3" />
        )}
        {karyawan.status_aktif}
      </span>

      <span className="text-xs text-gray-500">
        {karyawan.status_aktif === "AKTIF"
          ? "Aktif bekerja"
          : "Tidak aktif"}
      </span>
    </div>
  </td>

  {/* ACTIONS */}
  <td className="px-4 md:px-6 py-4 md:py-5">
    <div className="flex items-center gap-2">
      
      {/* VIEW */}
      <div className="relative flex items-center justify-center">
      <a
        href={`/admin/detailKaryawan/${karyawan.id}`}
        className="peer flex items-center justify-center w-9 h-9
                   rounded-lg text-gray-600 
                   hover:text-blue-600 hover:bg-blue-50
                   transition-all duration-200"
      >
        <Eye className="w-4 h-4" />
      </a>

      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 
                      px-2 py-1 bg-gray-900 text-white text-xs rounded 
                      opacity-0 peer-hover:opacity-100 transition-opacity
                      pointer-events-none whitespace-nowrap">
        View Details
      </div>
    </div>

      {/* EDIT */}
      <div className="relative">
        <button
          className="peer p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
          onClick={() => handleEdit(karyawan)}
        >
          <Edit className="w-4 h-4" />
        </button>

        <div
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2
                     px-2 py-1 bg-gray-900 text-white text-xs rounded
                     opacity-0 peer-hover:opacity-100 transition
                     pointer-events-none whitespace-nowrap"
        >
          Edit
        </div>
      </div>

      {/* DELETE */}
      {/* <div className="relative">
        <button
          className={`peer p-2 rounded-lg transition ${
            karyawan.status_aktif === "AKTIF"
              ? "text-gray-400 cursor-not-allowed"
              : "text-red-600 hover:text-red-700 hover:bg-red-50"
          }`}
          disabled={karyawan.status_aktif === "AKTIF"}
          onClick={() => handleDelete(karyawan.id)}
        >
          <Trash2 className="w-4 h-4" />
        </button>

        <div
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2
                     px-2 py-1 bg-gray-900 text-white text-xs rounded
                     opacity-0 peer-hover:opacity-100 transition
                     pointer-events-none whitespace-nowrap"
        >
          {karyawan.status_aktif === "AKTIF"
            ? "Hanya untuk NONAKTIF"
            : "Delete"}
        </div>
      </div> */}
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
                  Menampilkan <span className="font-semibold">{Math.min(startIndex + 1, totalItems)}-{Math.min(endIndex, totalItems)}</span>
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
              {karyawanData.filter(k => k.status_aktif === 'NONAKTIF').length > 0 ? (
                karyawanData.filter(k => k.status_aktif === 'NONAKTIF').map((karyawan) => (
                  <div key={karyawan.id} className="border border-gray-200 rounded-xl p-3 md:p-4 hover:border-gray-300 hover:shadow-sm transition-all duration-200 group">
                    <div className="flex items-center gap-3 mb-3 md:mb-4">
                      <div className="min-w-0">
                        <h4 className="font-semibold text-gray-900 text-sm md:text-base truncate">{karyawan.nama}</h4>
                        <p className="text-gray-600 text-xs md:text-sm truncate">{karyawan.department}</p>
                      </div>
                    </div>
                    <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-gray-100">
<button
  onClick={() => handleDelete(karyawan.id)}
  className="w-full py-2 text-xs md:text-sm rounded-lg font-medium
             text-red-600 hover:text-red-700 hover:bg-red-50
             transition-all flex items-center justify-center gap-2"
>
  <Trash2 className="w-4 h-4" />
  Delete
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

      {/* Modal Tambah / Edit Karyawan */}
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
  className="w-full px-4 py-3 border border-gray-300 rounded-xl"
  required
>
  <option value="">Pilih Department</option>

  {departments.map((dept) => (
    <option key={dept.kode_department} value={dept.kode_department}>
      {dept.nama_department}
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

<div>
  <label className="block text-sm font-medium text-gray-700 mb-1">Tempat Lahir</label>
  <input
    type="text"
    name="tempat_lahir"
    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#4789A8] focus:outline-none"
    value={formData.tempat_lahir || ""}
    onChange={handleInputChange}
    required
  />
</div>

<div>
  <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Lahir</label>
  <input
    type="date"
    name="tanggal_lahir"
    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#4789A8] focus:outline-none"
    value={formData.tanggal_lahir || ""}
    onChange={handleInputChange}
    required
  />
</div>


<div>
  <label className="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
  <textarea
    name="alamat"
    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#4789A8] focus:outline-none"
    rows={3}
    value={formData.alamat || ""}
    onChange={handleInputChange}
  ></textarea>
</div>


<div>
  <label className="block text-sm font-medium text-gray-700 mb-1">No Telepon</label>
  <input
    type="text"
    name="no_telepon"
    maxLength={15}
    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#4789A8] focus:outline-none"
    value={formData.no_telepon || ""}
    onChange={handleInputChange}
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
                            <span className="text-gray-700">AKTIF</span>
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
                        Pilih "AKTIF" untuk karyawan aktif, "NONAKTIF" untuk mantan karyawan
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
        body { font-family: 'Poppins', 'Segoe UI', system-ui, sans-serif; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideIn { from { transform: translateY(-20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      `}</style>
    </div>
  );
};

export default Karyawan;
