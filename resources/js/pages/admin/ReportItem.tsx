'use client';

import { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import Header from '../../components/admin/dashboard/Header';
import Sidebar from '../../components/admin/dashboard/Sidebar';
import { 
  BarChart3, 
  TrendingUp, 
  Package, 
  Building, 
  Calendar,
  Download,
  Filter,
  MoreVertical,
  ChevronDown,
  ShoppingCart,
  ArrowUpRight,
  ArrowDownRight,
  Search,
  ChevronLeft,
  ChevronRight,
  Menu
} from 'lucide-react';

// Komponen grafik menggunakan recharts
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface OrderReportProps {
  startDate?: string;
  endDate?: string;
}

export default function OrderReport() {
  const { monthly, popularItems, departments, stats, startDate, endDate, lastUpdate } = usePage().props as unknown as {
    monthly: any[];
    popularItems: any[];
    departments: any[];
    stats: any;
    startDate: string;
    endDate: string;
    lastUpdate: string | null;
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [timeRange, setTimeRange] = useState('monthly');
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  // Deteksi ukuran layar untuk responsif
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

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    // Simulasi loading data
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const formatMonthYear = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("id-ID", { month: "long", year: "numeric" });
  };

  const formatFullDateTime = (dateStr: string | null) => {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }) + ", " + 
    date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    }) + " WIB";
  };

  const sampleOrderData = monthly;
  const popularItemsData = popularItems;
  const departmentData = departments;

  const handleExport = () => {
    alert('Export laporan dalam proses...');
  };

  const handleFilter = () => {
    alert('Filter opsi akan ditampilkan...');
  };

  // Filter popular items berdasarkan search
  const filteredPopularItems = popularItemsData.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination untuk popular items
  const totalPages = Math.ceil(filteredPopularItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = filteredPopularItems.slice(startIndex, startIndex + itemsPerPage);

  const StatCard = ({ title, value, icon: Icon, change, color }: any) => (
    <div className="bg-white rounded-lg md:rounded-xl shadow-sm p-4 md:p-6 border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs md:text-sm text-gray-500 mb-1">{title}</p>
          <p className="text-xl md:text-2xl font-bold text-gray-800">{value}</p>
          {change && (
            <div className="flex items-center mt-2">
              {change > 0 ? (
                <ArrowUpRight className="w-3 h-3 md:w-4 md:h-4 text-green-500 mr-1" />
              ) : (
                <ArrowDownRight className="w-3 h-3 md:w-4 md:h-4 text-red-500 mr-1" />
              )}
              <span className={`text-xs md:text-sm ${change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {change > 0 ? '+' : ''}{change}% dari bulan lalu
              </span>
            </div>
          )}
        </div>
        <div className={`p-2 md:p-3 rounded-lg`} style={{ backgroundColor: `${color}15` }}>
          <Icon className="w-4 h-4 md:w-6 md:h-6" style={{ color: color }} />
        </div>
      </div>
    </div>
  );

  const MonthlyChart = () => (
    <div className="bg-white rounded-lg md:rounded-xl shadow-sm p-4 md:p-6 border border-gray-100">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 md:mb-6 gap-3">
        <div>
          <h3 className="text-base md:text-lg font-semibold text-gray-800">Rekap Bulanan</h3>
          <p className="text-xs md:text-sm text-gray-500">Total permintaan barang per bulan</p>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setTimeRange('monthly')}
            className={`px-3 py-1 rounded-lg text-xs md:text-sm font-medium ${timeRange === 'monthly' ? 'bg-[#4789A8] text-white' : 'bg-gray-100 text-gray-600'}`}
          >
            Bulanan
          </button>
          <button 
            onClick={() => setTimeRange('quarterly')}
            className={`px-3 py-1 rounded-lg text-xs md:text-sm font-medium ${timeRange === 'quarterly' ? 'bg-[#4789A8] text-white' : 'bg-gray-100 text-gray-600'}`}
          >
            Triwulan
          </button>
        </div>
      </div>
      <div className="h-64 md:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={sampleOrderData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="month" 
              stroke="#6b7280"
              tick={{ fontSize: isMobile ? 10 : 12 }}
            />
            <YAxis 
              stroke="#6b7280"
              tick={{ fontSize: isMobile ? 10 : 12 }}
            />
            <Tooltip 
              contentStyle={{ 
                borderRadius: '8px', 
                border: '1px solid #e5e7eb',
                backgroundColor: 'white',
                fontSize: isMobile ? '12px' : '14px'
              }}
              formatter={(value, name) => {
                if (name === 'totalOrders') return [`${value} Pesanan`, 'Total Pesanan'];
                if (name === 'totalItems') return [`${value} Unit`, 'Total Barang'];
                return [value, name];
              }}
            />
            <Legend 
              wrapperStyle={{ fontSize: isMobile ? '12px' : '14px' }}
            />
            <Bar 
              dataKey="totalOrders" 
              name="Total Pesanan" 
              fill="#4789A8" 
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="totalItems" 
              name="Total Barang" 
              fill="#5CA1C0" 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const PopularItemsTable = () => (
    <div className="bg-white rounded-lg md:rounded-xl shadow-sm p-4 md:p-6 border border-gray-100">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 md:mb-6 gap-3">
        <div>
          <h3 className="text-base md:text-lg font-semibold text-gray-800">Barang Paling Sering Dipesan</h3>
          <p className="text-xs md:text-sm text-gray-500">Daftar barang dengan permintaan tertinggi</p>
        </div>
        <div className="flex items-center space-x-2 md:space-x-3">
          <div className="relative flex-1 md:flex-none">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 md:w-4 md:h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Cari barang..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 md:pl-10 pr-3 md:pr-4 py-2 border border-gray-300 rounded-lg text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-[#4789A8] focus:border-transparent"
            />
          </div>
          <button className="text-[#4789A8] hover:text-[#3a7490]">
            <MoreVertical className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>
      </div>
      
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-xs md:text-sm font-medium text-gray-600">No</th>
              <th className="text-left py-3 px-4 text-xs md:text-sm font-medium text-gray-600">Nama Barang</th>
              <th className="text-left py-3 px-4 text-xs md:text-sm font-medium text-gray-600">Kategori</th>
              <th className="text-left py-3 px-4 text-xs md:text-sm font-medium text-gray-600">Total Pesanan</th>
              <th className="text-left py-3 px-4 text-xs md:text-sm font-medium text-gray-600">Rata-rata/Bulan</th>
              <th className="text-left py-3 px-4 text-xs md:text-sm font-medium text-gray-600">Pesanan Terakhir</th>
            </tr>
          </thead>
          <tbody>
            {paginatedItems.map((item, index) => (
              <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 text-xs md:text-sm text-gray-700">{startIndex + index + 1}</td>
                <td className="py-3 px-4">
                  <div className="font-medium text-gray-800 text-sm md:text-base">{item.name}</div>
                </td>
                <td className="py-3 px-4">
                  <span className="inline-block px-2 md:px-3 py-1 text-xs bg-blue-50 text-blue-700 rounded-full">
                    {item.category}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center">
                    <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden mr-3">
                      <div 
                        className="h-full bg-[#4789A8]"
                        style={{ width: `${(item.totalOrders / 85) * 100}%` }}
                      ></div>
                    </div>
                    <span className="font-medium text-gray-800 text-sm md:text-base">{item.totalOrders}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-xs md:text-sm text-gray-700">{item.avgMonthly}</td>
                <td className="py-3 px-4 text-xs md:text-sm text-gray-700">{item.lastOrder}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-3">
        {paginatedItems.map((item, index) => (
          <div key={item.id} className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50">
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="font-medium text-gray-800 text-sm">{item.name}</div>
                <span className="inline-block px-2 py-0.5 text-xs bg-blue-50 text-blue-700 rounded-full mt-1">
                  {item.category}
                </span>
              </div>
              <div className="text-xs text-gray-600">#{startIndex + index + 1}</div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-2">
              <div>
                <div className="text-gray-400">Total Pesanan</div>
                <div className="font-medium text-gray-800">{item.totalOrders}</div>
              </div>
              <div>
                <div className="text-gray-400">Rata-rata/Bulan</div>
                <div className="font-medium text-gray-800">{item.avgMonthly}</div>
              </div>
              <div className="col-span-2">
                <div className="text-gray-400">Pesanan Terakhir</div>
                <div className="font-medium text-gray-800">{item.lastOrder}</div>
              </div>
            </div>
            
            <div className="pt-2 border-t border-gray-100">
              <div className="flex items-center">
                <div className="text-xs text-gray-500 mr-2">Progress:</div>
                <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#4789A8]"
                    style={{ width: `${(item.totalOrders / 85) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 md:mt-6 pt-4 md:pt-6 border-t border-gray-200 gap-3">
        <div className="text-xs md:text-sm text-gray-500">
          Menampilkan {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredPopularItems.length)} dari {filteredPopularItems.length} barang
        </div>
        <div className="flex items-center space-x-1 md:space-x-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-1.5 md:p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            <ChevronLeft className="w-3 h-3 md:w-4 md:h-4" />
          </button>
          
          {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
            let pageNum;
            if (totalPages <= 3) {
              pageNum = i + 1;
            } else if (currentPage <= 2) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 1) {
              pageNum = totalPages - 2 + i;
            } else {
              pageNum = currentPage - 1 + i;
            }
            
            return (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`w-8 h-8 md:w-10 md:h-10 rounded-lg text-xs md:text-sm font-medium ${
                  currentPage === pageNum
                    ? 'bg-[#4789A8] text-white'
                    : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {pageNum}
              </button>
            );
          })}
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-1.5 md:p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  const DepartmentTable = () => (
    <div className="bg-white rounded-lg md:rounded-xl shadow-sm p-4 md:p-6 border border-gray-100">
      <div className="flex justify-between items-center mb-4 md:mb-6">
        <div>
          <h3 className="text-base md:text-lg font-semibold text-gray-800">Departemen dengan Permintaan Terbanyak</h3>
          <p className="text-xs md:text-sm text-gray-500">Statistik permintaan per departemen</p>
        </div>
        <button className="text-[#4789A8] hover:text-[#3a7490]">
          <MoreVertical className="w-4 h-4 md:w-5 md:h-5" />
        </button>
      </div>
      
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Departemen</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Manager</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Total Pesanan</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Dalam Proses</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Selesai</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Progres</th>
            </tr>
          </thead>
          <tbody>
            {departmentData.map((dept) => {
              const completionRate = (dept.completed / dept.totalOrders) * 100;
              
              return (
                <tr key={dept.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div 
                        className="w-2 h-2 md:w-3 md:h-3 rounded-full mr-2 md:mr-3"
                        style={{ backgroundColor: dept.color }}
                      ></div>
                      <div>
                        <div className="font-medium text-gray-800">{dept.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700">{dept.manager}</td>
                  <td className="py-3 px-4">
                    <div className="font-medium text-gray-800">{dept.totalOrders}</div>
                    <div className="text-xs text-gray-500">pesanan</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center px-2 md:px-3 py-0.5 md:py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      {dept.pending} pending
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center px-2 md:px-3 py-0.5 md:py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {dept.completed} selesai
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div className="w-16 md:w-24 h-1.5 md:h-2 bg-gray-200 rounded-full overflow-hidden mr-2 md:mr-3">
                        <div 
                          className="h-full"
                          style={{ 
                            width: `${completionRate}%`,
                            backgroundColor: dept.color
                          }}
                        ></div>
                      </div>
                      <span className="text-xs md:text-sm font-medium text-gray-700">{completionRate.toFixed(0)}%</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-3">
        {departmentData.map((dept) => {
          const completionRate = (dept.completed / dept.totalOrders) * 100;
          
          return (
            <div key={dept.id} className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center">
                  <div 
                    className="w-2 h-2 rounded-full mr-2"
                    style={{ backgroundColor: dept.color }}
                  ></div>
                  <div>
                    <div className="font-medium text-gray-800 text-sm">{dept.name}</div>
                    <div className="text-xs text-gray-500">Manager: {dept.manager}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-gray-800">{dept.totalOrders}</div>
                  <div className="text-xs text-gray-500">pesanan</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    {dept.pending} pending
                  </span>
                </div>
                <div>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {dept.completed} selesai
                  </span>
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Progress</span>
                  <span className="font-medium">{completionRate.toFixed(0)}%</span>
                </div>
                <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full"
                    style={{ 
                      width: `${completionRate}%`,
                      backgroundColor: dept.color
                    }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-gray-200">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
          {departmentData.map((dept) => (
            <div key={dept.id} className="text-center">
              <div className="text-lg md:text-2xl font-bold text-gray-800">{dept.totalOrders}</div>
              <div className="text-xs md:text-sm text-gray-500 truncate">{dept.name}</div>
              <div className="text-xs text-gray-400 mt-1">
                {((dept.totalOrders / stats.totalOrders) * 100).toFixed(1)}% dari total
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

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
          className={`fixed top-0 right-0 z-40 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.05)] transition-all duration-300 w-full ${
            isSidebarOpen ? 'md:left-[260px] md:w-[calc(100%-260px)]' : 'left-0'
          }`}
        >
          <Header
            isSidebarOpen={isSidebarOpen}
            onToggleSidebar={toggleSidebar}
          />
        </div>

        {/* === ISI HALAMAN === */}
        <div className="px-4 sm:px-6 lg:px-8 pb-6 md:pb-8 flex flex-1 flex-col gap-4 md:gap-6 pt-20 md:pt-24 transition-all duration-300">
          {/* Header Laporan */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 md:gap-0">
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-800">Laporan Pemesanan Barang</h1>
              <p className="text-gray-500 text-sm md:text-base">Analisis dan statistik permintaan barang per periode</p>
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 md:space-x-3">
              <button
                onClick={handleFilter}
                className="flex items-center justify-center px-3 md:px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm"
              >
                <Filter className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                Filter
                <ChevronDown className="w-3 h-3 md:w-4 md:h-4 ml-1 md:ml-2" />
              </button>
              <button
                onClick={handleExport}
                className="flex items-center justify-center px-3 md:px-4 py-2 bg-[#4789A8] text-white rounded-lg hover:bg-[#3a7490] text-sm"
              >
                <Download className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                Export Laporan
              </button>
            </div>
          </div>

          {/* Periode Laporan */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white p-3 md:p-4 rounded-lg md:rounded-xl shadow-sm border border-gray-100 gap-3">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 md:w-5 md:h-5 text-[#4789A8] mr-2 md:mr-3" />
              <div>
                <p className="text-xs md:text-sm text-gray-500">Periode Laporan</p>
                <p className="font-medium text-gray-800 text-sm md:text-base">
                  {formatMonthYear(startDate)} - {formatMonthYear(endDate)}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs md:text-sm text-gray-500">Update terakhir</p>
              <p className="font-medium text-gray-800 text-xs md:text-sm">
                {formatFullDateTime(lastUpdate)}
              </p>
            </div>
          </div>

          {/* Statistik Utama */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            <StatCard
              title="Total Permintaan Barang"
              value={`${stats.totalOrders} Pesanan`}
              icon={ShoppingCart}
              change={stats.orderIncrease}
              color="#4789A8"
            />
            <StatCard
              title="Total Barang Dipesan"
              value={stats.totalItems.toLocaleString()}
              icon={Package}
              change={8.7}
              color="#5CA1C0"
            />
            <StatCard
              title="Departemen Terbanyak"
              value={stats.topDepartment}
              icon={Building}
              color="#70B9D8"
            />
            <StatCard
              title="Barang Terpopuler"
              value={stats.mostOrderedItem}
              icon={BarChart3}
              color="#84D1F0"
            />
          </div>

          {/* Rekap Bulanan dengan Grafik */}
          <MonthlyChart />

          {/* Barang Paling Sering Dipesan (Tabel) */}
          <PopularItemsTable />

          {/* Departemen dengan Permintaan Terbanyak (Tabel) */}
          <DepartmentTable />
        </div>
      </div>
    </div>
  );
}