'use client';

import { router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  Eye, 
  Edit2, 
  Trash2, 
  Plus, 
  X,
  User,
  ChevronLeft,
  ChevronRight,
  Search,
  CalendarDays,
  Megaphone,
  FileText,
  Clock4,
  Filter,
  ChevronDown,
  PartyPopper,
  Settings,
  Wrench,
  Users,
  Star,
  ChevronRight as ChevronRightIcon,
  Hash,
  AlertCircle,
  Menu,
  Check,
  MoreVertical
} from 'lucide-react';
import Header from '../../components/admin/dashboard/Header';
import Sidebar from '../../components/admin/dashboard/Sidebar';

type Announcement = {
  id: number;
  link_gambar: string | null;
  title: string;
  kategori: string;
  isi: string;
  created_by: string;
  created_at: string;
};

type Pagination<T> = {
  data: T[];
  current_page: number;
  last_page: number;
  total: number;
  from: number;
  to: number;
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
};

export default function AnnouncementPage({
  announcements,
}: {
  announcements: Pagination<Announcement>;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showModalCategoryDropdown, setShowModalCategoryDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [modalSelectedCategory, setModalSelectedCategory] = useState('');
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  const [showMobileActions, setShowMobileActions] = useState<number | null>(null);
  
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });

  const [formCreate, setFormCreate] = useState({
    title: "",
    tanggal: "",
    waktu: "",
    kategori: "",
    isi: "",
  });

  const [isEditMode, setIsEditMode] = useState(false);

  const [formEdit, setFormEdit] = useState({
    title: "",
    kategori: "",
    isi: "",
    tanggal: "",
    waktu: "",
  });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Announcement | null>(null);

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

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const submitCreate = () => {
    router.post("/admin/Announcement", formCreate, {
      onSuccess: () => setIsEditModalOpen(false),
    });
  };

  const submitEdit = () => {
    if (!selectedAnnouncement) return;
    router.put(`/admin/Announcement/${selectedAnnouncement.id}`, formEdit, {
      onSuccess: () => {
        setIsEditModalOpen(false);
        setIsEditMode(false);
        setSelectedAnnouncement(null);
      },
    });
  };

  const submitDelete = () => {
    if (!deleteTarget) return;
    router.delete(`/admin/Announcement/${deleteTarget.id}`, {
      onSuccess: () => {
        setIsDeleteModalOpen(false);
        setDeleteTarget(null);
      }
    });
  };

  const categories = [
    { value: 'all', label: 'Semua Kategori', icon: <Filter className="w-4 h-4 text-[#4789A8]" /> },
    { value: 'holiday', label: 'Liburan', icon: <PartyPopper className="w-4 h-4 text-blue-500" /> },
    { value: 'policy', label: 'Kebijakan', icon: <Settings className="w-4 h-4 text-green-500" /> },
    { value: 'training', label: 'Pelatihan', icon: <Users className="w-4 h-4 text-amber-500" /> },
    { value: 'maintenance', label: 'Maintenance', icon: <Wrench className="w-4 h-4 text-purple-500" /> },
    { value: 'event', label: 'Acara', icon: <Star className="w-4 h-4 text-pink-500" /> },
    { value: 'general', label: 'Umum', icon: <Megaphone className="w-4 h-4 text-gray-500" /> },
  ];

  const getSelectedCategory = () => {
    return categories.find(cat => cat.value === selectedCategory) || categories[0];
  };

  const getModalSelectedCategory = () => {
    return categories.find(cat => cat.value === modalSelectedCategory) || 
           { value: '', label: 'Pilih Kategori', icon: <AlertCircle className="w-4 h-4 text-gray-400" /> };
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDateRange(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateFilterToggle = () => {
    setShowDateFilter(!showDateFilter);
  };

  const applyDateFilter = () => {
    console.log('Filter tanggal diterapkan:', dateRange);
    setShowDateFilter(false);
  };

  const resetDateFilter = () => {
    setDateRange({ startDate: '', endDate: '' });
    setShowDateFilter(false);
  };

  const toggleMobileActions = (id: number) => {
    setShowMobileActions(showMobileActions === id ? null : id);
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
          <div className="fixed top-0 left-0 z-50 h-full w-[260px] bg-white shadow-lg transition-transform duration-300 translate-x-0">
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

        {/* === ISI HALAMAN ANNOUNCEMENT === */}
        <div className="px-4 sm:px-6 lg:px-8 pb-6 flex flex-1 flex-col gap-4 md:gap-6 pt-20 md:pt-28 transition-all duration-300">
          {/* Header Halaman */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 md:p-3 bg-[#4789A8]/10 rounded-lg md:rounded-xl">
                <Megaphone className="w-5 h-5 md:w-6 md:h-6 text-[#4789A8]" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800">Pengumuman</h1>
                <p className="text-gray-600 mt-1 text-xs md:text-sm lg:text-base">
                  Kelola dan buat pengumuman untuk seluruh karyawan
                </p>
              </div>
            </div>
            
            <button
              onClick={() => {
                setFormCreate({ title: "", tanggal: "", waktu: "", kategori: "", isi: "" }); 
                setSelectedAnnouncement(null);
                setIsEditModalOpen(true);
              }}
              className="flex items-center justify-center gap-2 bg-linear-to-r from-[#4789A8] to-[#5ba3c7] hover:from-[#3a7895] hover:to-[#4789A8] text-white font-medium py-2.5 md:py-3 px-4 md:px-5 rounded-lg transition-all duration-200 shadow-sm hover:shadow w-full md:w-auto"
            >
              <Plus size={18} className="md:w-5 md:h-5" />
              <span className="font-semibold text-sm md:text-base">Buat Pengumuman</span>
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            <div className="bg-white rounded-lg md:rounded-xl p-4 md:p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-gray-600">Total Pengumuman</p>
                  <p className="text-xl md:text-2xl font-bold text-gray-800 mt-1">{announcements.data.length}</p>
                  <div className="flex items-center gap-1 mt-1 md:mt-2 text-xs md:text-sm text-green-600">
                    <Megaphone className="w-3 h-3 md:w-4 md:h-4" />
                    <span>Aktif bulan ini</span>
                  </div>
                </div>
                <div className="p-2 md:p-3 bg-linear-to-r from-blue-50 to-blue-100 rounded-lg">
                  <FileText className="w-4 h-4 md:w-5 md:h-5 text-[#4789A8]" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg md:rounded-xl p-4 md:p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-gray-600">Kategori Aktif</p>
                  <p className="text-xl md:text-2xl font-bold text-gray-800 mt-1">6</p>
                  <div className="flex items-center gap-1 mt-1 md:mt-2 text-xs md:text-sm text-amber-600">
                    <Filter className="w-3 h-3 md:w-4 md:h-4" />
                    <span>6 kategori tersedia</span>
                  </div>
                </div>
                <div className="p-2 md:p-3 bg-linear-to-r from-amber-50 to-amber-100 rounded-lg">
                  <Hash className="w-4 h-4 md:w-5 md:h-5 text-amber-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Filter dan Search Bar */}
          <div className="bg-white rounded-lg md:rounded-xl shadow-sm p-4 md:p-5 border border-gray-100">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search Bar */}
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={16} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Cari pengumuman..."
                  className="w-full pl-10 pr-4 py-2.5 md:py-3 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4789A8]/30 focus:border-[#4789A8] outline-none transition-all text-gray-700"
                />
              </div>
              
              {/* Filter Buttons */}
              <div className="flex items-center gap-2 w-full lg:w-auto">
                {/* Filter Tanggal Mobile */}
                <div className="relative flex-1 lg:flex-none">
                  <button 
                    onClick={handleDateFilterToggle}
                    className="flex items-center justify-center gap-2 border border-gray-300 hover:border-gray-400 hover:bg-gray-50 px-3 md:px-4 py-2.5 md:py-3 rounded-lg transition-all duration-200 w-full"
                  >
                    <CalendarDays size={16} className="text-gray-600" />
                    <span className="text-sm md:text-base text-gray-700 font-medium">Tanggal</span>
                  </button>

                  {/* Dropdown Filter Tanggal */}
                  {showDateFilter && (
                    <div className="fixed md:absolute inset-0 md:inset-auto md:right-0 md:top-full md:mt-2 w-full md:w-80 bg-white md:rounded-xl shadow-lg border border-gray-200 z-50 p-4 md:p-5">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                          <CalendarDays className="w-4 h-4" />
                          Filter Tanggal
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
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Dari Tanggal
                          </label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              type="date"
                              name="startDate"
                              value={dateRange.startDate}
                              onChange={handleDateChange}
                              className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4789A8]/30 focus:border-[#4789A8] outline-none transition-all text-sm"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Sampai Tanggal
                          </label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              type="date"
                              name="endDate"
                              value={dateRange.endDate}
                              onChange={handleDateChange}
                              className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4789A8]/30 focus:border-[#4789A8] outline-none transition-all text-sm"
                            />
                          </div>
                        </div>
                        
                        <div className="flex gap-3 pt-2">
                          <button
                            onClick={resetDateFilter}
                            className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-sm"
                          >
                            <X className="w-4 h-4" />
                            Reset
                          </button>
                          <button
                            onClick={applyDateFilter}
                            className="flex-1 px-4 py-2.5 bg-[#4789A8] hover:bg-[#3a7895] text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-sm"
                          >
                            <CalendarDays className="w-4 h-4" />
                            Terapkan
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Filter Kategori */}
                <div className="relative flex-1 lg:flex-none">
                  <button 
                    onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                    className="flex items-center justify-between px-3 md:px-4 py-2.5 md:py-3 border border-gray-300 hover:border-gray-400 rounded-lg transition-all duration-200 w-full bg-white"
                  >
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className="text-gray-600">
                        {getSelectedCategory().icon}
                      </div>
                      <span className="text-sm md:text-base text-gray-700 font-medium truncate">
                        {getSelectedCategory().label}
                      </span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${showCategoryDropdown ? 'rotate-180' : ''}`} />
                  </button>

                  {showCategoryDropdown && (
                    <div className="fixed md:absolute inset-0 md:inset-auto md:top-full md:left-0 md:mt-1 w-full md:w-56 bg-white md:rounded-lg shadow-lg border border-gray-200 z-50">
                      <div className="p-4 md:p-0">
                        <div className="flex items-center justify-between mb-3 md:hidden">
                          <h3 className="font-semibold text-gray-800">Pilih Kategori</h3>
                          <button onClick={() => setShowCategoryDropdown(false)}>
                            <X className="w-5 h-5 text-gray-500" />
                          </button>
                        </div>
                        {categories.map((category) => (
                          <button
                            key={category.value}
                            onClick={() => {
                              setSelectedCategory(category.value);
                              setShowCategoryDropdown(false);
                            }}
                            className={`flex items-center justify-between w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                              selectedCategory === category.value ? 'bg-blue-50' : ''
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`${selectedCategory === category.value ? 'text-[#4789A8]' : 'text-gray-600'}`}>
                                {category.icon}
                              </div>
                              <span className={`font-medium text-sm md:text-base ${selectedCategory === category.value ? 'text-[#4789A8]' : 'text-gray-700'}`}>
                                {category.label}
                              </span>
                            </div>
                            {selectedCategory === category.value && (
                              <Check className="w-4 h-4 text-[#4789A8]" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Tampilkan Filter Aktif */}
            {(dateRange.startDate || dateRange.endDate) && (
              <div className="mt-3 md:mt-4 flex items-center gap-2">
                <div className="inline-flex items-center gap-2 bg-linear-to-r from-blue-50 to-blue-100 text-blue-700 text-xs md:text-sm px-3 py-1.5 rounded-lg border border-blue-200">
                  <CalendarDays size={12} className="md:w-3 md:h-3" />
                  <span className="font-medium">
                    {dateRange.startDate && `${dateRange.startDate}`}
                    {dateRange.startDate && dateRange.endDate && ' - '}
                    {dateRange.endDate && `${dateRange.endDate}`}
                  </span>
                  <button 
                    onClick={resetDateFilter}
                    className="ml-2 text-blue-500 hover:text-blue-700 p-0.5 hover:bg-blue-100 rounded"
                  >
                    <X size={12} className="md:w-3 md:h-3" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Tabel Pengumuman */}
          <div className="bg-white rounded-lg md:rounded-xl shadow-sm overflow-hidden border border-gray-100">
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50/80">
                  <tr>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Judul Pengumuman
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Tanggal
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Waktu
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {announcements.data.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-50 rounded-lg">
                            <Megaphone className="w-4 h-4 text-blue-600" />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{item.title}</div>
                            <div className="text-xs text-gray-500 mt-1 flex flex-wrap items-center gap-2">
                              <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">
                                {item.kategori}
                              </span>
                              <span className="flex items-center gap-1">
                                <User className="w-3 h-3" /> {item.created_by}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-[#4789A8]" />
                          <span className="text-gray-700 font-medium">
                            {new Date(item.created_at).toLocaleDateString('id-ID', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-[#4789A8]" />
                          <span className="text-gray-700 font-medium">
                            {new Date(item.created_at).toLocaleTimeString('id-ID', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          <button onClick={() => {
                            setSelectedAnnouncement(item);
                            setIsDetailModalOpen(true);
                          }} className="text-[#4789A8] border px-3.5 py-2 rounded-lg text-sm">
                            <Eye className="w-4 h-4 inline mr-1" /> Detail
                          </button>
                          <button onClick={() => {
                            setIsEditMode(true);
                            setSelectedAnnouncement(item);
                            setFormEdit({
                              title: item.title,
                              kategori: item.kategori,
                              isi: item.isi,
                              tanggal: item.created_at?.split(" ")[0] ?? "",
                              waktu: item.created_at?.split(" ")[1]?.slice(0, 5) ?? "",
                            });
                            setIsEditModalOpen(true);
                          }} className="text-amber-600 border px-3.5 py-2 rounded-lg text-sm">
                            <Edit2 className="w-4 h-4 inline mr-1" /> Edit
                          </button>
                          <button onClick={() => {
                            setDeleteTarget(item);
                            setIsDeleteModalOpen(true);
                          }} className="text-red-600 border px-3.5 py-2 rounded-lg text-sm">
                            <Trash2 className="w-4 h-4 inline mr-1" /> Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden divide-y divide-gray-200">
              {announcements.data.map((item) => (
                <div key={item.id} className="p-4 hover:bg-gray-50/50 transition-colors">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="p-2 bg-blue-50 rounded-lg mt-1">
                        <Megaphone className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-sm">{item.title}</h3>
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
                            {item.kategori}
                          </span>
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <User className="w-3 h-3" /> {item.created_by}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 mt-3 text-xs text-gray-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(item.created_at).toLocaleDateString('id-ID', {
                              day: 'numeric',
                              month: 'short'
                            })}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(item.created_at).toLocaleTimeString('id-ID', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Mobile Actions Button */}
                    <button
                      onClick={() => toggleMobileActions(item.id)}
                      className="p-2 text-gray-500 hover:text-gray-700"
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Mobile Actions Dropdown */}
                  {showMobileActions === item.id && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <div className="flex gap-2">
                        <button onClick={() => {
                          setSelectedAnnouncement(item);
                          setIsDetailModalOpen(true);
                          setShowMobileActions(null);
                        }} className="flex-1 flex items-center justify-center gap-2 text-[#4789A8] border border-[#4789A8] px-3 py-2 rounded-lg text-sm">
                          <Eye className="w-4 h-4" />
                          Detail
                        </button>
                        <button onClick={() => {
                          setIsEditMode(true);
                          setSelectedAnnouncement(item);
                          setFormEdit({
                            title: item.title,
                            kategori: item.kategori,
                            isi: item.isi,
                            tanggal: item.created_at?.split(" ")[0] ?? "",
                            waktu: item.created_at?.split(" ")[1]?.slice(0, 5) ?? "",
                          });
                          setIsEditModalOpen(true);
                          setShowMobileActions(null);
                        }} className="flex-1 flex items-center justify-center gap-2 text-amber-600 border border-amber-600 px-3 py-2 rounded-lg text-sm">
                          <Edit2 className="w-4 h-4" />
                          Edit
                        </button>
                        <button onClick={() => {
                          setDeleteTarget(item);
                          setIsDeleteModalOpen(true);
                          setShowMobileActions(null);
                        }} className="flex-1 flex items-center justify-center gap-2 text-red-600 border border-red-600 px-3 py-2 rounded-lg text-sm">
                          <Trash2 className="w-4 h-4" />
                          Hapus
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Pagination */}
            <div className="px-4 md:px-6 py-4 border-t border-gray-200 bg-gray-50/50">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs md:text-sm text-gray-600">
                  Menampilkan <span className="font-semibold text-gray-800">{announcements.from || 1}-{announcements.to || announcements.data.length}</span> dari <span className="font-semibold text-gray-800">{announcements.total}</span> pengumuman
                </div>
                
                <div className="flex items-center gap-1 overflow-x-auto">
                  {announcements.links.map((link, index) => (
                    <button
                      key={index}
                      disabled={!link.url}
                      onClick={() => link.url && router.visit(link.url)}
                      className={`
                        px-3 md:px-4 py-1.5 md:py-2 rounded-lg border text-sm min-w-[40px]
                        ${link.active ? 'bg-[#4789A8] text-white' : 'bg-white text-gray-700'}
                        ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}
                      `}
                      dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Info */}
          <div className="bg-linear-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg md:rounded-xl p-4 md:p-5">
            <div className="flex items-start gap-3">
              <div className="mt-1 p-2 bg-white rounded-lg">
                <Megaphone className="w-4 h-4 md:w-5 md:h-5 text-[#4789A8]" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-800 text-sm md:text-base">Tips Pengumuman Efektif</h3>
                <p className="text-blue-700 text-xs md:text-sm mt-1.5">
                  Buat pengumuman yang jelas dan mudah dipahami. Gunakan kategori yang tepat agar karyawan dapat menemukan informasi dengan mudah. 
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* === MODAL DETAIL PENGUMUMAN === */}
      {isDetailModalOpen && selectedAnnouncement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="backdrop-blur-sm bg-black/60 absolute inset-0"
            onClick={() => setIsDetailModalOpen(false)}
          ></div>

          <div 
            className="bg-white rounded-xl md:rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col relative z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-4 md:px-8 py-4 md:py-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 md:p-2.5 bg-linear-to-r from-blue-50 to-blue-100 rounded-lg">
                  <Megaphone className="w-5 h-5 md:w-6 md:h-6 text-[#4789A8]" />
                </div>
                <h2 className="text-lg md:text-2xl font-bold text-gray-900">Detail Pengumuman</h2>
              </div>
              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg md:rounded-xl"
              >
                <X className="w-5 h-5 md:w-6 md:h-6 text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 md:p-8 overflow-y-auto">
              {/* Kategori badge */}
              <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 text-xs md:text-sm font-semibold px-3 md:px-4 py-1.5 md:py-2 rounded-full mb-4">
                {selectedAnnouncement.kategori}
              </div>

              {/* Title */}
              <h3 className="text-lg md:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 md:mb-5">
                {selectedAnnouncement.title}
              </h3>

              {/* Info grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-4 md:mb-6">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border">
                  <CalendarDays className="w-4 h-4 md:w-5 md:h-5 text-[#4789A8]" />
                  <div>
                    <div className="text-xs text-gray-500">Tanggal</div>
                    <div className="font-semibold text-gray-800 text-sm md:text-base">
                      {new Date(selectedAnnouncement.created_at).toLocaleDateString('id-ID')}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border">
                  <Clock4 className="w-4 h-4 md:w-5 md:h-5 text-[#4789A8]" />
                  <div>
                    <div className="text-xs text-gray-500">Waktu</div>
                    <div className="font-semibold text-gray-800 text-sm md:text-base">
                      {new Date(selectedAnnouncement.created_at).toLocaleTimeString('id-ID')}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border">
                  <User className="w-4 h-4 md:w-5 md:h-5 text-[#4789A8]" />
                  <div>
                    <div className="text-xs text-gray-500">Dibuat Oleh</div>
                    <div className="font-semibold text-gray-800 text-sm md:text-base">
                      {selectedAnnouncement.created_by}
                    </div>
                  </div>
                </div>
              </div>

              {/* Isi / Konten */}
              <div className="bg-gray-50 rounded-lg md:rounded-xl p-4 md:p-6 border">
                <h4 className="text-base md:text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4 md:w-5 md:h-5" /> Isi Pengumuman
                </h4>
                <div className="text-gray-700 leading-relaxed whitespace-pre-line text-sm md:text-base">
                  {selectedAnnouncement.isi}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-white border-t px-4 md:px-8 py-4 md:py-6">
              <div className="flex justify-end">
                <button
                  onClick={() => setIsDetailModalOpen(false)}
                  className="px-4 md:px-6 py-2 md:py-3 border border-gray-300 text-gray-700 rounded-lg md:rounded-xl text-sm md:text-base w-full md:w-auto"
                >
                  Tutup Detail
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* === MODAL CREATE / EDIT === */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="backdrop-blur-sm bg-black/60 absolute inset-0"
            onClick={() => {
              setIsEditModalOpen(false);
              setIsEditMode(false);
            }}
          ></div>

          <div
            className="bg-white rounded-xl md:rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col relative z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-4 md:px-8 py-4 md:py-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 md:p-2.5 bg-linear-to-br from-[#4789A8]/10 to-[#5ba3c7]/10 rounded-lg">
                  <Plus className="w-5 h-5 md:w-6 md:h-6 text-[#4789A8]" />
                </div>
                <h2 className="text-lg md:text-2xl font-bold text-gray-900">
                  {isEditMode ? "Edit Pengumuman" : "Buat Pengumuman"}
                </h2>
              </div>
              <button
                onClick={() => {
                  setIsEditModalOpen(false);
                  setIsEditMode(false);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg md:rounded-xl"
              >
                <X className="w-5 h-5 md:w-6 md:h-6 text-gray-500" />
              </button>
            </div>

            {/* Body */}
            <div className="p-4 md:p-8 overflow-y-auto">
              <form className="space-y-4 md:space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-sm md:text-base font-semibold text-gray-800 mb-2">
                    Judul Pengumuman
                  </label>
                  <input
                    type="text"
                    value={isEditMode ? formEdit.title : formCreate.title}
                    onChange={(e) =>
                      isEditMode
                        ? setFormEdit({ ...formEdit, title: e.target.value })
                        : setFormCreate({ ...formCreate, title: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg md:rounded-xl text-sm md:text-base"
                    placeholder="Masukkan judul pengumuman"
                  />
                </div>

                {/* Kategori */}
                <div>
                  <label className="block text-sm md:text-base font-semibold text-gray-800 mb-2">
                    Kategori
                  </label>
                  <select
                    value={isEditMode ? formEdit.kategori : formCreate.kategori}
                    onChange={(e) =>
                      isEditMode
                        ? setFormEdit({ ...formEdit, kategori: e.target.value })
                        : setFormCreate({ ...formCreate, kategori: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg md:rounded-xl text-sm md:text-base"
                  >
                    <option value="">Pilih Kategori</option>
                    <option value="liburan">Liburan</option>
                    <option value="pelatihan">Pelatihan</option>
                    <option value="policy">Kebijakan</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="event">Acara</option>
                    <option value="general">Umum</option>
                  </select>
                </div>

                {/* Isi */}
                <div>
                  <label className="block text-sm md:text-base font-semibold text-gray-800 mb-2">
                    Isi Pengumuman
                  </label>
                  <textarea
                    rows={6}
                    value={isEditMode ? formEdit.isi : formCreate.isi}
                    onChange={(e) =>
                      isEditMode
                        ? setFormEdit({ ...formEdit, isi: e.target.value })
                        : setFormCreate({ ...formCreate, isi: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg md:rounded-xl bg-gray-50 text-sm md:text-base"
                    placeholder="Tulis isi pengumuman di sini..."
                  />
                </div>
              </form>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-white border-t px-4 md:px-8 py-4 md:py-6 flex flex-col sm:flex-row justify-end gap-3">
              <button
                className="px-4 md:px-6 py-2.5 md:py-3 border border-gray-300 text-gray-700 rounded-lg md:rounded-xl text-sm md:text-base w-full sm:w-auto"
                onClick={() => {
                  setIsEditModalOpen(false);
                  setIsEditMode(false);
                }}
              >
                Batalkan
              </button>
              <button
                className="px-4 md:px-6 py-2.5 md:py-3 bg-linear-to-r from-[#4789A8] to-[#5ba3c7] text-white rounded-lg md:rounded-xl text-sm md:text-base w-full sm:w-auto"
                onClick={() => {
                  isEditMode ? submitEdit() : submitCreate();
                }}
              >
                {isEditMode ? "Simpan" : "Publikasikan"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* === MODAL DELETE === */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsDeleteModalOpen(false)}
          ></div>

          <div
            className="bg-white rounded-xl shadow-xl p-6 md:p-8 relative z-10 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">
              Hapus Pengumuman?
            </h2>

            <p className="text-gray-600 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
              Apakah kamu yakin ingin menghapus pengumuman  
              <span className="font-semibold">
                "{deleteTarget?.title}"
              </span>?  
              Tindakan ini tidak dapat dibatalkan.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 md:px-5 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-100 text-gray-700 text-sm md:text-base w-full"
              >
                Batal
              </button>
              <button
                onClick={submitDelete}
                className="px-4 md:px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow text-sm md:text-base w-full"
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