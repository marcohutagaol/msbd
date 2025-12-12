'use client';

import { useState, useEffect, useMemo } from 'react';
import Header from '../../components/admin/dashboard/Header';
import Sidebar from '../../components/admin/dashboard/Sidebar';
import {
  Search,
  Filter,
  Download,
  Printer,
  X,
  Calendar,
  DollarSign,
  Package,
  Receipt,
  FileText,
  User,
  CheckCircle,
  Clock,
  Ban,
  ChevronDown,
  CalendarRange,
  Building,
  Users,
  Eye,
  FileSpreadsheet,
  BarChart3,
  ArrowUpDown,
  Building2,
  UserCircle,
  FileCheck,
  TrendingUp,
  CheckSquare,
  AlertCircle,
  ArrowRight,
  FileBarChart,
  PackageCheck,
  Calculator,
  Hotel,
  UtensilsCrossed,
  Calculator as CalcIcon,
  UserCog,
  Bell,
  FileSignature,
  ShieldCheck,
  ArrowUp,
  ArrowDown,
  Menu
} from 'lucide-react';
import { usePage } from '@inertiajs/react';

// Type definitions
interface InvoiceItem {
  id: number;
  namaBarang: string;
  harga: number;
  jumlah: number;
  satuan: string;
  subtotal: number;
}

interface Invoice {
  id: string;
  departemen: string;
  tanggalRequest: string;
  namaPemohon: string;
  status: 'Pending' | 'Disetujui' | 'Ditolak' | 'Selesai';
  totalPesanan: number;
  items: InvoiceItem[];
}

// Department options
const DEPARTEMEN_OPTIONS = [
  'Semua Departemen',
  'Front Office',
  'Housekeeping',
  'Food & Beverage',
  'Accounting & Administration'
];

// Status options
const STATUS_OPTIONS = [
  'Semua Status',
  'Pending',
  'Disetujui',
  'Ditolak',
  'Selesai'
];

export default function InvoicePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterDate, setFilterDate] = useState<string>('');
  const [filterStartDate, setFilterStartDate] = useState<string>('');
  const [filterEndDate, setFilterEndDate] = useState<string>('');
  const [filterType, setFilterType] = useState<'single' | 'range'>('single');
  const [filterDepartemen, setFilterDepartemen] = useState<string>('Semua Departemen');
  const [filterStatus, setFilterStatus] = useState<string>('Semua Status');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortConfig, setSortConfig] = useState<{ key: keyof Invoice; direction: 'asc' | 'desc' } | null>(null);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

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

  // Generate sample data dengan semua departemen (fallback)
  const generateInvoices = (): Invoice[] => {
    const invoices: Invoice[] = [];
    const departments = ['Front Office', 'Housekeeping', 'Food & Beverage', 'Accounting & Administration'];
    const statuses: Array<'Pending' | 'Disetujui' | 'Ditolak' | 'Selesai'> = ['Pending', 'Disetujui', 'Ditolak', 'Selesai'];
    const names = ['Budi Santoso', 'Sari Dewi', 'Ahmad Rizki', 'Dewi Lestari', 'Rudi Hartono', 'Lisa Wijaya', 'Hendra Pratama', 'Maya Sari'];

    for (let i = 1; i <= 20; i++) {
      const dept = departments[Math.floor(Math.random() * departments.length)];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const nama = names[Math.floor(Math.random() * names.length)];
      const date = new Date(2024, 0, Math.floor(Math.random() * 30) + 1);

      const items: InvoiceItem[] = [];
      const itemCount = Math.floor(Math.random() * 3) + 2;
      let totalPesanan = 0;

      for (let j = 1; j <= itemCount; j++) {
        const harga = Math.floor(Math.random() * 500000) + 50000;
        const jumlah = Math.floor(Math.random() * 50) + 5;
        const subtotal = harga * jumlah;
        totalPesanan += subtotal;

        const itemNames = {
          'Front Office': ['Kertas Letterhead', 'Stempel Hotel', 'Map Plastik', 'Pulpen Premium', 'Buku Tamu'],
          'Housekeeping': ['Sabun Mandi', 'Shampoo', 'Handuk', 'Sprei', 'Pembersih Lantai'],
          'Food & Beverage': ['Gula Pasir', 'Kopi Arabica', 'Teh Celup', 'Susu UHT', 'Garam'],
          'Accounting & Administration': ['Kertas HVS A4', 'Amplop Coklat', 'Buku Kas', 'Kalkulator', 'Stapler']
        } as Record<string, string[]>;

        const satuanOptions = ['Dus', 'Pack', 'Liter', 'Kg', 'Buah', 'Rim'];

        items.push({
          id: j,
          namaBarang: itemNames[dept][Math.floor(Math.random() * itemNames[dept].length)],
          harga,
          jumlah,
          satuan: satuanOptions[Math.floor(Math.random() * satuanOptions.length)],
          subtotal
        });
      }

      invoices.push({
        id: `INV-2024-${i.toString().padStart(3, '0')}`,
        departemen: dept,
        tanggalRequest: date.toISOString().split('T')[0],
        namaPemohon: nama,
        status,
        totalPesanan,
        items
      });
    }

    return invoices.sort((a, b) => new Date(b.tanggalRequest).getTime() - new Date(a.tanggalRequest).getTime());
  };

  const pageProps = usePage().props as unknown as { invoices?: Invoice[] };
  const invoicesSource = pageProps.invoices && pageProps.invoices.length ? pageProps.invoices : generateInvoices();

  const getDepartmentIcon = (department: string) => {
    switch (department) {
      case 'Front Office':
        return <Hotel className="w-4 h-4" />;
      case 'Housekeeping':
        return <UserCog className="w-4 h-4" />;
      case 'Food & Beverage':
        return <UtensilsCrossed className="w-4 h-4" />;
      case 'Accounting & Administration':
        return <CalcIcon className="w-4 h-4" />;
      default:
        return <Building2 className="w-4 h-4" />;
    }
  };

  const handleViewDetail = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedInvoice(null);
  };

  // Sorting behavior requested: A = single sort with 3rd click reset
  const handleSort = (key: keyof Invoice) => {
    if (!sortConfig || sortConfig.key !== key) {
      setSortConfig({ key, direction: 'asc' });
      return;
    }

    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      setSortConfig({ key, direction: 'desc' });
      return;
    }

    setSortConfig(null);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).format(date);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Selesai':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'Disetujui':
        return <ShieldCheck className="w-4 h-4 text-blue-600" />;
      case 'Pending':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'Ditolak':
        return <Ban className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Selesai':
        return 'bg-green-100 text-green-800 border border-green-200';
      case 'Disetujui':
        return 'bg-blue-100 text-blue-800 border border-blue-200';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
      case 'Ditolak':
        return 'bg-red-100 text-red-800 border border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  // Apply filters + search + sorting menggunakan useMemo untuk performa
  const filteredInvoices = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    let result = invoicesSource.filter((invoice) => {
      // Search filter (sederhana seperti yang diminta)
      if (q) {
        if (
          !invoice.id.toLowerCase().includes(q) &&
          !invoice.namaPemohon.toLowerCase().includes(q) &&
          !invoice.departemen.toLowerCase().includes(q)
        ) {
          return false;
        }
      }

      // Department filter
      if (filterDepartemen !== 'Semua Departemen' && invoice.departemen !== filterDepartemen) {
        return false;
      }

      // Status filter
      if (filterStatus !== 'Semua Status' && invoice.status !== filterStatus) {
        return false;
      }

      // Date filter
      const invoiceDate = new Date(invoice.tanggalRequest);

      if (filterType === 'single' && filterDate) {
        const filterDateObj = new Date(filterDate);
        if (invoiceDate.toDateString() !== filterDateObj.toDateString()) {
          return false;
        }
      } else if (filterType === 'range' && filterStartDate && filterEndDate) {
        let startDate = new Date(filterStartDate);
        let endDate = new Date(filterEndDate);
        // allow swap jika pengguna memilih terbalik
        if (endDate < startDate) {
          const tmp = startDate; startDate = endDate; endDate = tmp;
        }
        if (invoiceDate < startDate || invoiceDate > endDate) {
          return false;
        }
      }

      return true;
    });

    // Apply sorting jika ada
    if (sortConfig) {
      const { key, direction } = sortConfig;
      result = [...result].sort((a, b) => {
        let valA: any = a[key];
        let valB: any = b[key];

        // Normalize untuk tanggal
        if (key === 'tanggalRequest') {
          valA = new Date(valA).getTime();
          valB = new Date(valB).getTime();
        }

        // Strings -> lowercase
        if (typeof valA === 'string') valA = valA.toLowerCase();
        if (typeof valB === 'string') valB = valB.toLowerCase();

        if (valA < valB) return direction === 'asc' ? -1 : 1;
        if (valA > valB) return direction === 'asc' ? 1 : -1;
        return 0;
      });
    } else {
      // Default sort by tanggalRequest desc
      result = [...result].sort((a, b) => new Date(b.tanggalRequest).getTime() - new Date(a.tanggalRequest).getTime());
    }

    return result;
  }, [invoicesSource, searchQuery, filterDepartemen, filterStatus, filterType, filterDate, filterStartDate, filterEndDate, sortConfig]);

  // Reset semua filter
  const handleResetFilters = () => {
    setFilterDate('');
    setFilterStartDate('');
    setFilterEndDate('');
    setFilterDepartemen('Semua Departemen');
    setFilterStatus('Semua Status');
    setSearchQuery('');
    setSortConfig(null);
    setFilterType('single');
  };

  // Quick select: Today and This Week
  const quickSelectToday = () => {
    const today = new Date();
    const iso = today.toISOString().split('T')[0];
    setFilterType('single');
    setFilterDate(iso);
  };

  const quickSelectThisWeek = () => {
    const today = new Date();
    const day = today.getDay(); // 0 (Sun) - 6 (Sat)
    const diffToMonday = (day + 6) % 7; // monday sebagai start
    const monday = new Date(today);
    monday.setDate(today.getDate() - diffToMonday);
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);

    setFilterType('range');
    setFilterStartDate(monday.toISOString().split('T')[0]);
    setFilterEndDate(sunday.toISOString().split('T')[0]);
  };

  // Export sebagai CSV
  const exportToCSV = () => {
    if (!filteredInvoices || filteredInvoices.length === 0) return;

    const headers = ['ID Invoice', 'Departemen', 'Tanggal Request', 'Pemohon', 'Status', 'Total Pesanan'];
    const rows = filteredInvoices.map(inv => [
      inv.id,
      inv.departemen,
      inv.tanggalRequest,
      inv.namaPemohon,
      inv.status,
      inv.totalPesanan.toString()
    ]);

    const csvContent = [headers, ...rows].map(e => e.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `invoices_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex min-h-screen bg-[#f5f7fa] font-[Poppins,Segoe_UI,system-ui,sans-serif]">
      {/* === SIDEBAR === */}
      <div
        className={`hidden md:block fixed top-0 left-0 z-50 h-full w-[260px] transition-transform duration-300 ${
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
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 md:p-3 bg-[#4789A8]/10 rounded-lg">
                <Receipt className="w-5 h-5 md:w-7 md:h-7 text-[#4789A8]" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-gray-800">Invoice Management</h1>
                <p className="text-gray-600 text-sm md:text-base mt-1">Kelola dan pantau seluruh invoice pemesanan barang</p>
              </div>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <button onClick={exportToCSV} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-[#4789A8] text-white rounded-lg hover:bg-[#3a7691] transition-colors text-sm md:text-base">
                <Download className="w-4 h-4" />
                <span className="md:hidden">Export</span>
                <span className="hidden md:inline">Export Excel</span>
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            <div className="bg-white p-4 md:p-5 rounded-lg md:rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-gray-600">Total Invoice</p>
                  <p className="text-xl md:text-2xl font-bold text-gray-800 mt-1">{filteredInvoices.length}</p>
                  <p className="text-xs text-gray-500 mt-1 hidden md:block">Dari {invoicesSource.length} total</p>
                </div>
                <div className="p-2 md:p-3 bg-blue-50 rounded-lg">
                  <Receipt className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                </div>
              </div>
            </div>
            <div className="bg-white p-4 md:p-5 rounded-lg md:rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-gray-600">Total Nilai</p>
                  <p className="text-xl md:text-2xl font-bold text-gray-800 mt-1">
                    {formatCurrency(filteredInvoices.reduce((sum, inv) => sum + inv.totalPesanan, 0))}
                  </p>
                </div>
                <div className="p-2 md:p-3 bg-green-50 rounded-lg">
                  <DollarSign className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
                </div>
              </div>
            </div>
            <div className="bg-white p-4 md:p-5 rounded-lg md:rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-gray-600">Selesai</p>
                  <p className="text-xl md:text-2xl font-bold text-gray-800 mt-1">
                    {filteredInvoices.filter(inv => inv.status === 'Selesai').length}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 hidden md:block">
                    {filteredInvoices.length > 0
                      ? `${Math.round((filteredInvoices.filter(inv => inv.status === 'Selesai').length / filteredInvoices.length) * 100)}%`
                      : '0%'}
                  </p>
                </div>
                <div className="p-2 md:p-3 bg-purple-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-purple-600" />
                </div>
              </div>
            </div>
            <div className="bg-white p-4 md:p-5 rounded-lg md:rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-gray-600">Departemen</p>
                  <p className="text-xl md:text-2xl font-bold text-gray-800 mt-1">
                    {new Set(filteredInvoices.map(inv => inv.departemen)).size}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 hidden md:block">Aktif</p>
                </div>
                <div className="p-2 md:p-3 bg-orange-50 rounded-lg">
                  <Building2 className="w-5 h-5 md:w-6 md:h-6 text-orange-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Filter Section */}
          <div className="bg-white rounded-lg md:rounded-xl shadow-sm border border-gray-100 p-4 md:p-5">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 md:mb-6">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 md:w-5 md:h-5 text-[#4789A8]" />
                <h2 className="text-base md:text-lg font-semibold text-gray-800">Filter & Pencarian</h2>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleResetFilters}
                  className="px-3 py-1.5 text-gray-600 hover:text-gray-800 flex items-center gap-2 text-sm"
                >
                  <X className="w-4 h-4" />
                  <span>Reset Filter</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              {/* Department Filter */}
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                  <span className="flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    Departemen
                  </span>
                </label>
                <div className="relative">
                  <select
                    value={filterDepartemen}
                    onChange={(e) => setFilterDepartemen(e.target.value)}
                    className="w-full px-3 md:px-4 py-2.5 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4789A8] focus:border-transparent appearance-none bg-white"
                  >
                    {DEPARTEMEN_OPTIONS.map((dept) => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Status Filter */}
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                  <span className="flex items-center gap-2">
                    <CheckSquare className="w-4 h-4" />
                    Status
                  </span>
                </label>
                <div className="relative">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full px-3 md:px-4 py-2.5 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4789A8] focus:border-transparent appearance-none bg-white"
                  >
                    {STATUS_OPTIONS.map((status) => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Search */}
              <div className="md:col-span-2">
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                  <span className="flex items-center gap-2">
                    <Search className="w-4 h-4" />
                    Cari Invoice
                  </span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari ID Invoice, nama pemohon, atau departemen..."
                    className="w-full px-3 md:px-4 py-2.5 pl-10 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4789A8] focus:border-transparent"
                  />
                 
                </div>
              </div>
            </div>

            {/* Date Filter Section */}
            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="w-4 h-4 md:w-5 md:h-5 text-[#4789A8]" />
                <h3 className="text-sm font-semibold text-gray-700">Filter Tanggal</h3>
              </div>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="flex items-center gap-2 w-full md:w-auto">
                  <button
                    onClick={() => setFilterType('single')}
                    className={`flex-1 md:flex-none px-3 py-1.5 rounded-lg flex items-center justify-center gap-2 text-sm ${filterType === 'single' ? 'bg-[#4789A8] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Tanggal Tertentu</span>
                  </button>
                  <button
                    onClick={() => setFilterType('range')}
                    className={`flex-1 md:flex-none px-3 py-1.5 rounded-lg flex items-center justify-center gap-2 text-sm ${filterType === 'range' ? 'bg-[#4789A8] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    <CalendarRange className="w-4 h-4" />
                    <span>Rentang</span>
                  </button>
                </div>

                <div className="flex-1 w-full">
                  {filterType === 'single' ? (
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                      <div className="flex-1 w-full">
                        <input
                          type="date"
                          value={filterDate}
                          onChange={(e) => setFilterDate(e.target.value)}
                          className="w-full px-3 md:px-4 py-2.5 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4789A8] focus:border-transparent"
                        />
                      </div>
                      <div className="flex gap-2 w-full md:w-auto">
                        <button onClick={quickSelectToday} className="flex-1 md:flex-none px-3 py-2 bg-gray-100 rounded hover:bg-gray-200 text-sm">Today</button>
                        <button onClick={quickSelectThisWeek} className="flex-1 md:flex-none px-3 py-2 bg-gray-100 rounded hover:bg-gray-200 text-sm">This Week</button>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                          <span className="flex items-center gap-2">
                            <CalendarRange className="w-4 h-4" />
                            Dari Tanggal
                          </span>
                        </label>
                        <input
                          type="date"
                          value={filterStartDate}
                          onChange={(e) => setFilterStartDate(e.target.value)}
                          className="w-full px-3 md:px-4 py-2.5 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4789A8] focus:border-transparent"
                        />
                      </div>
                      <div className="flex items-center justify-center">
                        <ArrowRight className="w-5 h-5 text-gray-400 mt-6" />
                      </div>
                      <div>
                        <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                          <span className="flex items-center gap-2">
                            <CalendarRange className="w-4 h-4" />
                            Sampai Tanggal
                          </span>
                        </label>
                        <input
                          type="date"
                          value={filterEndDate}
                          onChange={(e) => setFilterEndDate(e.target.value)}
                          className="w-full px-3 md:px-4 py-2.5 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4789A8] focus:border-transparent"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Invoice Table */}
          <div className="bg-white rounded-lg md:rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-4 md:px-6 py-4 border-b border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
              <div className="flex items-center gap-3">
                <h3 className="text-base md:text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <FileSpreadsheet className="w-4 h-4 md:w-5 md:h-5 text-[#4789A8]" />
                  <span>Daftar Invoice</span>
                </h3>
                <div className="px-2 py-1 bg-gray-100 rounded text-xs md:text-sm text-gray-600">
                  {filteredInvoices.length} invoice
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
                <BarChart3 className="w-4 h-4" />
                <span className="hidden md:inline">Filter: {filterDepartemen} • {filterStatus}</span>
                <span className="md:hidden">{filterDepartemen}</span>
              </div>
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th
                      className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('id')}
                    >
                      <div className="flex items-center gap-1">
                        <FileText className="w-4 h-4" />
                        ID Invoice
                        {sortConfig?.key === 'id' && (
                          sortConfig.direction === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />
                        )}
                      </div>
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('departemen')}
                    >
                      <div className="flex items-center gap-1">
                        <Building className="w-4 h-4" />
                        Departemen
                        {sortConfig?.key === 'departemen' && (
                          sortConfig.direction === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />
                        )}
                      </div>
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('tanggalRequest')}
                    >
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Tanggal Request
                        {sortConfig?.key === 'tanggalRequest' && (
                          sortConfig.direction === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />
                        )}
                      </div>
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('namaPemohon')}
                    >
                      <div className="flex items-center gap-1">
                        <UserCircle className="w-4 h-4" />
                        Pemohon
                        {sortConfig?.key === 'namaPemohon' && (
                          sortConfig.direction === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />
                        )}
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      <div className="flex items-center gap-1">
                        <Package className="w-4 h-4" />
                        Status
                      </div>
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('totalPesanan')}
                    >
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        Total Pesanan
                        {sortConfig?.key === 'totalPesanan' && (
                          sortConfig.direction === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />
                        )}
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredInvoices.length > 0 ? (
                    filteredInvoices.map((invoice) => (
                      <tr key={invoice.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <FileCheck className="w-4 h-4 text-blue-600" />
                            <span className="font-medium text-gray-900">{invoice.id}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            {getDepartmentIcon(invoice.departemen)}
                            <span className="text-gray-700">{invoice.departemen}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-700">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            {formatDate(invoice.tanggalRequest)}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-700">{invoice.namaPemohon}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className={`px-3 py-1.5 rounded-full text-xs font-medium inline-flex items-center gap-1 ${getStatusColor(invoice.status)}`}>
                            {getStatusIcon(invoice.status)}
                            {invoice.status}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 font-semibold text-gray-900">
                            <DollarSign className="w-4 h-4 text-green-600" />
                            {formatCurrency(invoice.totalPesanan)}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleViewDetail(invoice)}
                            className="px-4 py-2 bg-[#4789A8]/10 text-[#4789A8] hover:bg-[#4789A8]/20 rounded-lg transition-colors flex items-center gap-2 text-sm"
                          >
                            <Eye className="w-4 h-4" />
                            <span>Detail</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="px-6 py-8 text-center">
                        <div className="flex flex-col items-center justify-center text-gray-500">
                          <FileSignature className="w-10 h-10 md:w-12 md:h-12 mb-3 opacity-50" />
                          <p className="text-base md:text-lg font-medium">Tidak ada invoice ditemukan</p>
                          <p className="text-xs md:text-sm mt-1">Coba ubah filter atau pencarian Anda</p>
                          <button
                            onClick={handleResetFilters}
                            className="mt-4 px-4 py-2 text-[#4789A8] hover:text-[#3a7691] transition-colors flex items-center gap-2 text-sm"
                          >
                            <X className="w-4 h-4" />
                            Reset Filter
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden divide-y divide-gray-200">
              {filteredInvoices.map((invoice) => (
                <div key={invoice.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <FileCheck className="w-4 h-4 text-blue-600" />
                        <span className="font-medium text-gray-900 text-sm">{invoice.id}</span>
                      </div>
                      <div className="flex items-center gap-2 mb-1">
                        {getDepartmentIcon(invoice.departemen)}
                        <span className="text-gray-700 text-sm">{invoice.departemen}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-500 text-xs">
                        <Calendar className="w-3 h-3" />
                        {formatDate(invoice.tanggalRequest)}
                      </div>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1 ${getStatusColor(invoice.status)}`}>
                      {getStatusIcon(invoice.status)}
                      <span className="hidden sm:inline">{invoice.status}</span>
                      <span className="sm:hidden">{invoice.status.charAt(0)}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                    <div>
                      <div className="text-xs text-gray-500">Pemohon</div>
                      <div className="font-medium text-gray-800 text-sm">{invoice.namaPemohon}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-500">Total</div>
                      <div className="font-bold text-gray-900 text-sm">{formatCurrency(invoice.totalPesanan)}</div>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <button
                      onClick={() => handleViewDetail(invoice)}
                      className="w-full px-4 py-2 bg-[#4789A8]/10 text-[#4789A8] hover:bg-[#4789A8]/20 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
                    >
                      <Eye className="w-4 h-4" />
                      Lihat Detail Invoice
                    </button>
                  </div>
                </div>
              ))}

              {filteredInvoices.length === 0 && (
                <div className="p-8 text-center">
                  <div className="flex flex-col items-center justify-center text-gray-500">
                    <FileSignature className="w-10 h-10 mb-3 opacity-50" />
                    <p className="text-base font-medium">Tidak ada invoice ditemukan</p>
                    <p className="text-xs mt-1">Coba ubah filter atau pencarian Anda</p>
                    <button
                      onClick={handleResetFilters}
                      className="mt-4 px-4 py-2 text-[#4789A8] hover:text-[#3a7691] transition-colors flex items-center gap-2 text-sm"
                    >
                      <X className="w-4 h-4" />
                      Reset Filter
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal Detail Invoice */}
    {isModalOpen && selectedInvoice && (
  <>
    {/* Overlay Blur */}
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
      onClick={handleCloseModal}
    />
    
    {/* Modal Container */}
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-lg md:rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()} // Mencegah close saat klik di dalam modal
      >
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-4 md:px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#4789A8]/10 rounded-lg">
              <FileBarChart className="w-5 h-5 md:w-6 md:h-6 text-[#4789A8]" />
            </div>
            <div>
              <h3 className="text-base md:text-lg font-bold text-gray-900">Detail Invoice: {selectedInvoice.id}</h3>
              <p className="text-xs md:text-sm text-gray-600 flex items-center gap-2">
                {getDepartmentIcon(selectedInvoice.departemen)}
                {selectedInvoice.departemen} • {formatDate(selectedInvoice.tanggalRequest)}
              </p>
            </div>
          </div>
          <button
            onClick={handleCloseModal}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 md:p-6">
          {/* Invoice Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-3 md:p-4 rounded-lg border border-blue-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded">
                  <Building2 className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs md:text-sm text-blue-700 font-medium">Departemen</p>
                  <p className="text-base md:text-lg font-semibold text-gray-900">{selectedInvoice.departemen}</p>
                </div>
              </div>
            </div>
            <div className="bg-green-50 p-3 md:p-4 rounded-lg border border-green-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded">
                  <UserCircle className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs md:text-sm text-green-700 font-medium">Pemohon</p>
                  <p className="text-base md:text-lg font-semibold text-gray-900">{selectedInvoice.namaPemohon}</p>
                </div>
              </div>
            </div>
            <div className="bg-purple-50 p-3 md:p-4 rounded-lg border border-purple-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded">
                  <Calendar className="w-4 h-4 md:w-5 md:h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-xs md:text-sm text-purple-700 font-medium">Tanggal Request</p>
                  <p className="text-base md:text-lg font-semibold text-gray-900">{formatDate(selectedInvoice.tanggalRequest)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
              <h4 className="text-base md:text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Package className="w-4 h-4 md:w-5 md:h-5 text-[#4789A8]" />
                Detail Barang
              </h4>
              <div className={`px-3 py-1.5 rounded-full text-xs md:text-sm font-medium flex items-center gap-2 ${getStatusColor(selectedInvoice.status)}`}>
                {getStatusIcon(selectedInvoice.status)}
                Status: {selectedInvoice.status}
              </div>
            </div>

            <div className="overflow-x-auto border border-gray-200 rounded-lg">
              <table className="w-full min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 md:px-4 py-2 md:py-3 text-left text-xs font-semibold text-gray-700 border-b">
                      <div className="flex items-center gap-2">
                        <PackageCheck className="w-3 h-3 md:w-4 md:h-4" />
                        <span className="hidden sm:inline">Nama Barang</span>
                        <span className="sm:hidden">Barang</span>
                      </div>
                    </th>
                    <th className="px-3 md:px-4 py-2 md:py-3 text-left text-xs font-semibold text-gray-700 border-b">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-3 h-3 md:w-4 md:h-4" />
                        <span className="hidden md:inline">Harga</span>
                      </div>
                    </th>
                    <th className="px-3 md:px-4 py-2 md:py-3 text-left text-xs font-semibold text-gray-700 border-b">
                      <div className="flex items-center gap-2">
                        <Calculator className="w-3 h-3 md:w-4 md:h-4" />
                        <span>Jumlah</span>
                      </div>
                    </th>
                    <th className="px-3 md:px-4 py-2 md:py-3 text-left text-xs font-semibold text-gray-700 border-b">
                      <span className="hidden sm:inline">Satuan</span>
                      <span className="sm:hidden">Sat.</span>
                    </th>
                    <th className="px-3 md:px-4 py-2 md:py-3 text-left text-xs font-semibold text-gray-700 border-b">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-3 h-3 md:w-4 md:h-4" />
                        <span className="hidden sm:inline">Subtotal</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {selectedInvoice.items.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-50">
                      <td className="px-3 md:px-4 py-2 md:py-3">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 bg-blue-50 rounded">
                            <Package className="w-3 h-3 text-blue-600" />
                          </div>
                          <span className="text-gray-800 text-sm">{item.namaBarang}</span>
                        </div>
                      </td>
                      <td className="px-3 md:px-4 py-2 md:py-3 text-gray-700 text-sm">{formatCurrency(item.harga)}</td>
                      <td className="px-3 md:px-4 py-2 md:py-3">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-800 font-medium text-sm">{item.jumlah}</span>
                        </div>
                      </td>
                      <td className="px-3 md:px-4 py-2 md:py-3 text-gray-700 text-sm">{item.satuan}</td>
                      <td className="px-3 md:px-4 py-2 md:py-3 font-semibold text-gray-900 text-sm">
                        {formatCurrency(item.subtotal)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Total Summary */}
          <div className="bg-gray-50 p-4 md:p-6 rounded-lg border border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#4789A8] rounded-lg">
                  <DollarSign className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <div>
                  <p className="text-xs md:text-sm text-gray-600">Total Harga Keseluruhan</p>
                  <p className="text-xl md:text-2xl font-bold text-gray-900">
                    {formatCurrency(selectedInvoice.totalPesanan)}
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <button className="flex-1 sm:flex-none px-4 py-2 bg-[#4789A8] text-white rounded-lg hover:bg-[#3a7691] transition-colors flex items-center justify-center gap-2">
                  <Printer className="w-4 h-4" />
                  <span>Print Invoice</span>
                </button>
                <button className="flex-1 sm:flex-none px-4 py-2 border border-[#4789A8] text-[#4789A8] rounded-lg hover:bg-[#4789A8]/5 transition-colors flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
)}
    </div>
  );
}