'use client';

import { useState, useEffect } from 'react';
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
  PackageX,
  ClipboardCheck,
  Calculator,
  Hotel,
  UtensilsCrossed,
  Calculator as CalcIcon,
  UserCog,
  Bell,
  FileSignature,
  ShieldCheck
} from 'lucide-react';

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
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterDate, setFilterDate] = useState<string>('');
  const [filterStartDate, setFilterStartDate] = useState<string>('');
  const [filterEndDate, setFilterEndDate] = useState<string>('');
  const [filterType, setFilterType] = useState<'single' | 'range'>('single');
  const [filterDepartemen, setFilterDepartemen] = useState<string>('Semua Departemen');
  const [filterStatus, setFilterStatus] = useState<string>('Semua Status');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortConfig, setSortConfig] = useState<{key: string; direction: 'asc' | 'desc'} | null>(null);
  
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  // Generate sample data with all departments
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
        };
        
        const satuanOptions = ['Dus', 'Pack', 'Liter', 'Kg', 'Buah', 'Rim'];
        
        items.push({
          id: j,
          namaBarang: itemNames[dept as keyof typeof itemNames][Math.floor(Math.random() * itemNames[dept as keyof typeof itemNames].length)],
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

  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    setInvoices(generateInvoices());
  }, []);

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

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
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

  // Filter invoices based on all filters
  const filteredInvoices = invoices.filter(invoice => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (!invoice.id.toLowerCase().includes(query) && 
          !invoice.namaPemohon.toLowerCase().includes(query) &&
          !invoice.departemen.toLowerCase().includes(query)) {
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
      const startDate = new Date(filterStartDate);
      const endDate = new Date(filterEndDate);
      if (invoiceDate < startDate || invoiceDate > endDate) {
        return false;
      }
    }

    return true;
  });

  // Reset all filters
  const handleResetFilters = () => {
    setFilterDate('');
    setFilterStartDate('');
    setFilterEndDate('');
    setFilterDepartemen('Semua Departemen');
    setFilterStatus('Semua Status');
    setSearchQuery('');
    setSortConfig(null);
  };

  return (
    <div className="flex min-h-screen bg-[#f5f7fa] font-[Poppins,Segoe_UI,system-ui,sans-serif] transition-all duration-300">
      {/* === SIDEBAR === */}
      <div
        className={`fixed top-0 left-0 z-50 h-full w-[260px] transition-transform duration-300 ${
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
          className={`fixed top-0 right-0 z-40 bg-white shadow-sm transition-all duration-300 ${
            isSidebarOpen ? 'left-[260px]' : 'left-0'
          }`}
        >
          <Header
            isSidebarOpen={isSidebarOpen}
            onToggleSidebar={toggleSidebar}
          />
        </div>

        {/* === ISI HALAMAN === */}
        <div className="px-8 pb-8 flex flex-1 flex-col gap-6 pt-24 transition-all duration-300">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <Receipt className="w-7 h-7 text-[#4789A8]" />
                Invoice Management
              </h1>
              <p className="text-gray-600 mt-1">Kelola dan pantau seluruh invoice pemesanan barang</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-[#4789A8] text-white rounded-lg hover:bg-[#3a7691] transition-colors flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export Excel
              </button>
              <button className="px-4 py-2 border border-[#4789A8] text-[#4789A8] rounded-lg hover:bg-[#4789A8]/5 transition-colors flex items-center gap-2">
                <Printer className="w-4 h-4" />
                Print Report
              </button>
            </div>
          </div>

          {/* Stats Cards with Department Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Invoice</p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">{filteredInvoices.length}</p>
                  <p className="text-xs text-gray-500 mt-1">Dari {invoices.length} total</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <Receipt className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Nilai</p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">
                    {formatCurrency(filteredInvoices.reduce((sum, inv) => sum + inv.totalPesanan, 0))}
                  </p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Selesai</p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">
                    {filteredInvoices.filter(inv => inv.status === 'Selesai').length}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {filteredInvoices.length > 0 
                      ? `${Math.round((filteredInvoices.filter(inv => inv.status === 'Selesai').length / filteredInvoices.length) * 100)}%` 
                      : '0%'}
                  </p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Departemen</p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">
                    {new Set(filteredInvoices.map(inv => inv.departemen)).size}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Aktif</p>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg">
                  <Building2 className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Filter Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-[#4789A8]" />
                <h2 className="text-lg font-semibold text-gray-800">Filter & Pencarian</h2>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={handleResetFilters}
                  className="px-3 py-1.5 text-gray-600 hover:text-gray-800 flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Reset Filter
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              {/* Department Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  Departemen
                </label>
                <div className="relative">
                  <select
                    value={filterDepartemen}
                    onChange={(e) => setFilterDepartemen(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4789A8] focus:border-transparent appearance-none bg-white"
                  >
                    {DEPARTEMEN_OPTIONS.map((dept) => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <ClipboardCheck className="w-4 h-4" />
                  Status
                </label>
                <div className="relative">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4789A8] focus:border-transparent appearance-none bg-white"
                  >
                    {STATUS_OPTIONS.map((status) => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Search */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Search className="w-4 h-4" />
                  Cari Invoice
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari ID Invoice, nama pemohon, atau departemen..."
                    className="w-full px-4 py-2.5 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4789A8] focus:border-transparent"
                  />
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Date Filter Section */}
            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="w-5 h-5 text-[#4789A8]" />
                <h3 className="text-sm font-semibold text-gray-700">Filter Tanggal</h3>
              </div>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setFilterType('single')}
                    className={`px-3 py-1.5 rounded-lg flex items-center gap-2 ${filterType === 'single' ? 'bg-[#4789A8] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    <Calendar className="w-4 h-4" />
                    Tanggal Tertentu
                  </button>
                  <button 
                    onClick={() => setFilterType('range')}
                    className={`px-3 py-1.5 rounded-lg flex items-center gap-2 ${filterType === 'range' ? 'bg-[#4789A8] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    <CalendarRange className="w-4 h-4" />
                    Rentang Tanggal
                  </button>
                </div>
                
                <div className="flex-1">
                  {filterType === 'single' ? (
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <input
                          type="date"
                          value={filterDate}
                          onChange={(e) => setFilterDate(e.target.value)}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4789A8] focus:border-transparent"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                          <CalendarRange className="w-4 h-4" />
                          Dari Tanggal
                        </label>
                        <input
                          type="date"
                          value={filterStartDate}
                          onChange={(e) => setFilterStartDate(e.target.value)}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4789A8] focus:border-transparent"
                        />
                      </div>
                      <div className="flex items-center justify-center">
                        <ArrowRight className="w-5 h-5 text-gray-400 mt-6" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                          <CalendarRange className="w-4 h-4" />
                          Sampai Tanggal
                        </label>
                        <input
                          type="date"
                          value={filterEndDate}
                          onChange={(e) => setFilterEndDate(e.target.value)}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4789A8] focus:border-transparent"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Invoice Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <FileSpreadsheet className="w-5 h-5 text-[#4789A8]" />
                  Daftar Invoice
                </h3>
                <div className="px-2 py-1 bg-gray-100 rounded text-sm text-gray-600">
                  {filteredInvoices.length} invoice ditemukan
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <BarChart3 className="w-4 h-4" />
                <span>Filter: {filterDepartemen} • {filterStatus}</span>
              </div>
            </div>
            
            <div className="overflow-x-auto">
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
                          <ArrowUpDown className="w-3 h-3" />
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
                          <ArrowUpDown className="w-3 h-3" />
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
                          <ArrowUpDown className="w-3 h-3" />
                        )}
                      </div>
                    </th>
                    <th 
                      className="px6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('namaPemohon')}
                    >
                      <div className="flex items-center gap-1">
                        <UserCircle className="w-4 h-4" />
                        Pemohon
                        {sortConfig?.key === 'namaPemohon' && (
                          <ArrowUpDown className="w-3 h-3" />
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
                          <ArrowUpDown className="w-3 h-3" />
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
                            className="px-4 py-2 bg-[#4789A8]/10 text-[#4789A8] hover:bg-[#4789A8]/20 rounded-lg transition-colors flex items-center gap-2"
                          >
                            <Eye className="w-4 h-4" />
                            Detail Invoice
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="px-6 py-8 text-center">
                        <div className="flex flex-col items-center justify-center text-gray-500">
                          <FileSignature className="w-12 h-12 mb-3 opacity-50" />
                          <p className="text-lg font-medium">Tidak ada invoice ditemukan</p>
                          <p className="text-sm mt-1">Coba ubah filter atau pencarian Anda</p>
                          <button
                            onClick={handleResetFilters}
                            className="mt-4 px-4 py-2 text-[#4789A8] hover:text-[#3a7691] transition-colors flex items-center gap-2"
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
          </div>
        </div>
      </div>

      {/* Modal Detail Invoice */}
      {isModalOpen && selectedInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center z-10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#4789A8]/10 rounded-lg">
                  <FileBarChart className="w-6 h-6 text-[#4789A8]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Detail Invoice: {selectedInvoice.id}</h3>
                  <p className="text-sm text-gray-600 flex items-center gap-2">
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
            <div className="p-6">
              {/* Invoice Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded">
                      <Building2 className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-blue-700 font-medium">Departemen</p>
                      <p className="text-lg font-semibold text-gray-900">{selectedInvoice.departemen}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded">
                      <UserCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-green-700 font-medium">Pemohon</p>
                      <p className="text-lg font-semibold text-gray-900">{selectedInvoice.namaPemohon}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded">
                      <Calendar className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-purple-700 font-medium">Tanggal Request</p>
                      <p className="text-lg font-semibold text-gray-900">{formatDate(selectedInvoice.tanggalRequest)}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Items Table */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Package className="w-5 h-5 text-[#4789A8]" />
                    Detail Barang
                  </h4>
                  <div className={`px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-2 ${getStatusColor(selectedInvoice.status)}`}>
                    {getStatusIcon(selectedInvoice.status)}
                    Status: {selectedInvoice.status}
                  </div>
                </div>
                
                <div className="overflow-x-auto border border-gray-200 rounded-lg">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                          <div className="flex items-center gap-2">
                            <PackageCheck className="w-4 h-4" />
                            Nama Barang
                          </div>
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4" />
                            Harga Satuan
                          </div>
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                          <div className="flex items-center gap-2">
                            <Calculator className="w-4 h-4" />
                            Jumlah
                          </div>
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                          Satuan
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                          <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4" />
                            Subtotal
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedInvoice.items.map((item) => (
                        <tr key={item.id} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className="p-1.5 bg-blue-50 rounded">
                                <Package className="w-3 h-3 text-blue-600" />
                              </div>
                              <span className="text-gray-800">{item.namaBarang}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-gray-700">{formatCurrency(item.harga)}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <span className="text-gray-800 font-medium">{item.jumlah}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-gray-700">{item.satuan}</td>
                          <td className="px-4 py-3 font-semibold text-gray-900">
                            {formatCurrency(item.subtotal)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Total Summary */}
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#4789A8] rounded-lg">
                      <DollarSign className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Harga Keseluruhan</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {formatCurrency(selectedInvoice.totalPesanan)}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button className="px-4 py-2 bg-[#4789A8] text-white rounded-lg hover:bg-[#3a7691] transition-colors flex items-center gap-2">
                      <Printer className="w-4 h-4" />
                      Print Invoice
                    </button>
                    <button className="px-4 py-2 border border-[#4789A8] text-[#4789A8] rounded-lg hover:bg-[#4789A8]/5 transition-colors flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      Download PDF
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}