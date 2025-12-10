'use client';

import { router } from '@inertiajs/react';

import { useState } from 'react';
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
  AlertCircle
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
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showModalCategoryDropdown, setShowModalCategoryDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [modalSelectedCategory, setModalSelectedCategory] = useState('');
  const [selectedAnnouncement, setSelectedAnnouncement] =
  useState<Announcement | null>(null);


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




const submitCreate = () => {
  router.post("/admin/Announcement", formCreate, {
    onSuccess: () => setIsEditModalOpen(false),
  });
};

const submitEdit = () => {
  if (!selectedAnnouncement) return;  // <-- cegah error

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


  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

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

        {/* === ISI HALAMAN ANNOUNCEMENT === */}
        <div className="px-6 lg:px-8 pb-8 flex flex-1 flex-col gap-6 pt-28 transition-all duration-300">
          {/* Header Halaman */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#4789A8]/10 rounded-xl">
                <Megaphone className="w-6 h-6 text-[#4789A8]" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Pengumuman</h1>
                <p className="text-gray-600 mt-1 text-sm lg:text-base">Kelola dan buat pengumuman untuk seluruh karyawan</p>
              </div>
            </div>
            
            <button
  onClick={() => {
    setFormCreate({ title: "", tanggal: "", waktu: "", kategori: "", isi: "" }); 
    setSelectedAnnouncement(null);
    setIsEditModalOpen(true);
  }}
  className="flex items-center gap-2 bg-linear-to-r from-[#4789A8] to-[#5ba3c7] hover:from-[#3a7895] hover:to-[#4789A8] text-white font-medium py-3 px-5 rounded-lg transition-all duration-200 shadow-sm hover:shadow"
>
  <Plus size={20} />
  <span className="font-semibold">Buat Pengumuman</span>
</button>

          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Pengumuman</p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">{announcements.data.length}</p>
                  <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
                    <Megaphone className="w-4 h-4" />
                    <span>Aktif bulan ini</span>
                  </div>
                </div>
                <div className="p-3 bg-linear-to-r from-blue-50 to-blue-100 rounded-lg">
                  <FileText className="w-5 h-5 text-[#4789A8]" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Kategori Aktif</p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">6</p>
                  <div className="flex items-center gap-1 mt-2 text-sm text-amber-600">
                    <Filter className="w-4 h-4" />
                    <span>6 kategori tersedia</span>
                  </div>
                </div>
                <div className="p-3 bg-linear-to-r from-amber-50 to-amber-100 rounded-lg">
                  <Hash className="w-5 h-5 text-amber-600" />
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
                  placeholder="Cari pengumuman berdasarkan judul atau isi..."
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4789A8]/30 focus:border-[#4789A8] outline-none transition-all text-gray-700"
                />
              </div>
              
              <div className="flex items-center gap-3 w-full lg:w-auto">
                {/* Tombol Filter Tanggal */}
                <div className="relative">
                  <button 
                    onClick={handleDateFilterToggle}
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
                          <CalendarDays className="w-4 h-4" />
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
                          <label className="block text-sm font-medium text-gray-700 mb-2 items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            Dari Tanggal
                          </label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              type="date"
                              name="startDate"
                              value={dateRange.startDate}
                              onChange={handleDateChange}
                              className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4789A8]/30 focus:border-[#4789A8] outline-none transition-all"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2 items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            Sampai Tanggal
                          </label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              type="date"
                              name="endDate"
                              value={dateRange.endDate}
                              onChange={handleDateChange}
                              className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4789A8]/30 focus:border-[#4789A8] outline-none transition-all"
                            />
                          </div>
                        </div>
                        
                        {/* Status Filter */}
                        {(dateRange.startDate || dateRange.endDate) && (
                          <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                            <p className="text-sm text-blue-700 font-medium flex items-center gap-2">
                              <Filter className="w-3 h-3" />
                              Filter aktif: 
                              {dateRange.startDate && ` Dari ${dateRange.startDate}`}
                              {dateRange.startDate && dateRange.endDate && ' - '}
                              {dateRange.endDate && ` Sampai ${dateRange.endDate}`}
                            </p>
                          </div>
                        )}
                        
                        <div className="flex gap-3 pt-2">
                          <button
                            onClick={resetDateFilter}
                            className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                          >
                            <X className="w-4 h-4" />
                            Reset
                          </button>
                          <button
                            onClick={applyDateFilter}
                            className="flex-1 px-4 py-2.5 bg-[#4789A8] hover:bg-[#3a7895] text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                          >
                            <CalendarDays className="w-4 h-4" />
                            Terapkan Filter
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Custom Dropdown Kategori */}
                <div className="relative">
                  <button 
                    onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                    className="flex items-center justify-between px-4 py-3 border border-gray-300 hover:border-gray-400 rounded-lg transition-all duration-200 w-56 bg-white"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-gray-600">
                        {getSelectedCategory().icon}
                      </div>
                      <span className="text-gray-700 font-medium">{getSelectedCategory().label}</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${showCategoryDropdown ? 'rotate-180' : ''}`} />
                  </button>

                  {showCategoryDropdown && (
                    <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
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
                            <span className={`font-medium ${selectedCategory === category.value ? 'text-[#4789A8]' : 'text-gray-700'}`}>
                              {category.label}
                            </span>
                          </div>
                          {selectedCategory === category.value && (
                            <ChevronRightIcon className="w-4 h-4 text-[#4789A8]" />
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Tampilkan Filter Aktif */}
            {(dateRange.startDate || dateRange.endDate) && (
              <div className="mt-4 flex items-center gap-2">
                <div className="inline-flex items-center gap-2 bg-linear-to-r from-blue-50 to-blue-100 text-blue-700 text-sm px-3 py-1.5 rounded-lg border border-blue-200">
                  <CalendarDays size={14} />
                  <span className="font-medium">
                    {dateRange.startDate && `Dari: ${dateRange.startDate}`}
                    {dateRange.startDate && dateRange.endDate && ' - '}
                    {dateRange.endDate && `Sampai: ${dateRange.endDate}`}
                  </span>
                  <button 
                    onClick={resetDateFilter}
                    className="ml-2 text-blue-500 hover:text-blue-700 p-0.5 hover:bg-blue-100 rounded"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Tabel Pengumuman */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50/80">
                  <tr>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Judul Pengumuman
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Tanggal Pengumuman
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Waktu Pengumuman
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
            <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
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
            {new Date(item.created_at).toLocaleTimeString('id-ID')}
          </span>
        </div>
      </td>

      <td className="px-6 py-5">
        <div className="flex items-center gap-2">
          <button onClick={() => {
    setSelectedAnnouncement(item);
    setIsDetailModalOpen(true);
}}
 className="text-[#4789A8] border px-3.5 py-2 rounded-lg">
            <Eye className="w-4 h-4" /> Detail
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
}}
className="text-amber-600 border px-3.5 py-2 rounded-lg">
            <Edit2 className="w-4 h-4" /> Edit
          </button>
          <button onClick={() => {
    setDeleteTarget(item);
    setIsDeleteModalOpen(true);
  }} className="text-red-600 border px-3.5 py-2 rounded-lg">
            <Trash2 className="w-4 h-4" /> Hapus
          </button>
        </div>
      </td>
    </tr>
  ))}
</tbody>

              </table>
            </div>
            
            {/* Pagination */}
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50/50">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm text-gray-600">
                  Menampilkan <span className="font-semibold text-gray-800">1-3</span> dari <span className="font-semibold text-gray-800">12</span> pengumuman
                </div>
                
                <div className="flex items-center gap-1">
  {announcements.links.map((link, index) => (
    <button
      key={index}
      disabled={!link.url}
      onClick={() => link.url && router.visit(link.url)}
      className={`
        px-4 py-2 rounded-lg border 
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
          <div className="bg-linear-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-5">
            <div className="flex items-start gap-3">
              <div className="mt-1 p-2 bg-white rounded-lg">
                <Megaphone className="w-5 h-5 text-[#4789A8]" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-800">Tips Pengumuman Efektif</h3>
                <p className="text-blue-700 text-sm mt-1.5">
                  Buat pengumuman yang jelas dan mudah dipahami. Gunakan kategori yang tepat agar karyawan dapat menemukan informasi dengan mudah. 
                  Pastikan pengumuman penting selalu ditampilkan di halaman depan aplikasi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* === MODAL DETAIL PENGUMUMAN === */}
      {isDetailModalOpen && selectedAnnouncement && (
    <div className="fixed inset-0 z-1000 flex items-center justify-center p-4">
      <div 
        className="backdrop-blur-sm bg-black/60 absolute inset-0"
        onClick={() => setIsDetailModalOpen(false)}
      ></div>

      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col relative z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-linear-to-r from-blue-50 to-blue-100 rounded-lg">
              <Megaphone className="w-6 h-6 text-[#4789A8]" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Detail Pengumuman</h2>
          </div>
          <button
            onClick={() => setIsDetailModalOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-xl"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto">

          {/* Kategori badge */}
          <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 text-sm font-semibold px-4 py-2 rounded-full mb-4">
            {selectedAnnouncement.kategori}
          </div>

          {/* Title */}
          <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-5">
            {selectedAnnouncement.title}
          </h3>

          {/* Info grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border">
              <CalendarDays className="w-5 h-5 text-[#4789A8]" />
              <div>
                <div className="text-xs text-gray-500">Tanggal</div>
                <div className="font-semibold text-gray-800">
                    {new Date(selectedAnnouncement.created_at).toLocaleDateString('id-ID')}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border">
              <Clock4 className="w-5 h-5 text-[#4789A8]" />
              <div>
                <div className="text-xs text-gray-500">Waktu</div>
                <div className="font-semibold text-gray-800">
                    {new Date(selectedAnnouncement.created_at).toLocaleTimeString('id-ID')}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border">
              <User className="w-5 h-5 text-[#4789A8]" />
              <div>
                <div className="text-xs text-gray-500">Dibuat Oleh</div>
                <div className="font-semibold text-gray-800">
                    {selectedAnnouncement.created_by}
                </div>
              </div>
            </div>

          </div>

          {/* Isi / Konten */}
          <div className="bg-gray-50 rounded-xl p-6 border">
            <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5" /> Isi / Konten Pengumuman
            </h4>

            <div className="text-gray-700 leading-relaxed whitespace-pre-line">
              {selectedAnnouncement.isi}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t px-8 py-6">
          <div className="flex justify-end">
            <button
              onClick={() => setIsDetailModalOpen(false)}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl"
            >
              Tutup Detail
            </button>
          </div>
        </div>

      </div>
    </div>
)}


      {/* === MODAL CREATE PENGUMUMAN === */}
{/* === MODAL CREATE / EDIT === */}
{isEditModalOpen && (
  <div className="fixed inset-0 z-1000 flex items-center justify-center p-4">
    <div
      className="backdrop-blur-sm bg-black/60 absolute inset-0"
      onClick={() => {
        setIsEditModalOpen(false);
        setIsEditMode(false);
      }}
    ></div>

    <div
      className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col relative z-10"
      onClick={(e) => e.stopPropagation()}
    >

      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-linear-to-br from-[#4789A8]/10 to-[#5ba3c7]/10 rounded-lg">
            <Plus className="w-6 h-6 text-[#4789A8]" />
          </div>

          <h2 className="text-2xl font-bold text-gray-900">
            {isEditMode ? "Edit Pengumuman" : "Buat Pengumuman Baru"}
          </h2>
        </div>

        <button
          onClick={() => {
            setIsEditModalOpen(false);
            setIsEditMode(false);
          }}
          className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
        >
          <X className="w-6 h-6 text-gray-500" />
        </button>
      </div>

      {/* Body */}
      <div className="p-8 overflow-y-auto">
        <form className="space-y-6">

          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2.5">
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
              className="w-full px-4 py-3.5 border border-gray-300 rounded-xl"
            />
          </div>

          {/* Kategori */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2.5">
              Kategori
            </label>
            <select
              value={isEditMode ? formEdit.kategori : formCreate.kategori}
              onChange={(e) =>
                isEditMode
                  ? setFormEdit({ ...formEdit, kategori: e.target.value })
                  : setFormCreate({ ...formCreate, kategori: e.target.value })
              }
              className="w-full px-4 py-3.5 border rounded-xl"
            >
              <option value="">Pilih Kategori</option>
              <option value="liburan">Liburan</option>
              <option value="pelatihan">Pelatihan</option>
              <option value="policy">Kebijakan</option>
            </select>
          </div>

          {/* Isi */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2.5">
              Isi Pengumuman
            </label>
            <textarea
              rows={8}
              value={isEditMode ? formEdit.isi : formCreate.isi}
              onChange={(e) =>
                isEditMode
                  ? setFormEdit({ ...formEdit, isi: e.target.value })
                  : setFormCreate({ ...formCreate, isi: e.target.value })
              }
              className="w-full px-4 py-4 border rounded-xl bg-gray-50"
            />
          </div>

        </form>
      </div>

      {/* Footer */}
      <div className="sticky bottom-0 bg-white border-t px-8 py-6 flex justify-end gap-3">

        <button
          className="px-6 py-3 border border-gray-300 rounded-xl"
          onClick={() => {
            setIsEditModalOpen(false);
            setIsEditMode(false);
          }}
        >
          Batalkan
        </button>

        <button
          className="px-6 py-3 bg-linear-to-r from-[#4789A8] to-[#5ba3c7] text-white rounded-xl"
          onClick={() => {
            isEditMode ? submitEdit() : submitCreate();
          }}
        >
          {isEditMode ? "Simpan Perubahan" : "Publikasikan"}
        </button>

      </div>

    </div>
  </div>
)}



      {/* === MODAL DELETE === */}
{isDeleteModalOpen && (
  <div className="fixed inset-0 z-1000 flex items-center justify-center p-4">
    <div
      className="absolute inset-0 bg-black/50"
      onClick={() => setIsDeleteModalOpen(false)}
    ></div>

    <div
      className="bg-white rounded-xl shadow-xl p-8 relative z-10 w-full max-w-md"
      onClick={(e) => e.stopPropagation()}
    >
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        Hapus Pengumuman?
      </h2>

      <p className="text-gray-600 mb-6 leading-relaxed">
        Apakah kamu yakin ingin menghapus pengumuman  
        <span className="font-semibold">
          “{deleteTarget?.title}”
        </span>?  
        Tindakan ini tidak dapat dibatalkan.
      </p>

      <div className="flex justify-end gap-3">
        <button
          onClick={() => setIsDeleteModalOpen(false)}
          className="px-5 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-100 text-gray-700"
        >
          Batal
        </button>

        <button
          onClick={submitDelete}
          className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow"
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