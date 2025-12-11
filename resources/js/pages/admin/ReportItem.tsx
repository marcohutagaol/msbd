
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
  ChevronRight
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
  ResponsiveContainer,
  Cell
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


// Data contoh untuk laporan
const sampleOrderData = monthly;


// Data barang paling sering dipesan
const popularItemsData = popularItems;


// Data departemen dengan nama baru
const departmentData = departments;


  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [timeRange, setTimeRange] = useState('monthly');
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  


  useEffect(() => {
    // Simulasi loading data
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

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
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
          {change && (
            <div className="flex items-center mt-2">
              {change > 0 ? (
                <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
              ) : (
                <ArrowDownRight className="w-4 h-4 text-red-500 mr-1" />
              )}
              <span className={`text-sm ${change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {change > 0 ? '+' : ''}{change}% dari bulan lalu
              </span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg`} style={{ backgroundColor: `${color}15` }}>
          <Icon className="w-6 h-6" style={{ color: color }} />
        </div>
      </div>
    </div>
  );

  const MonthlyChart = () => (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Rekap Bulanan</h3>
          <p className="text-sm text-gray-500">Total permintaan barang per bulan</p>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setTimeRange('monthly')}
            className={`px-3 py-1 rounded-lg text-sm font-medium ${timeRange === 'monthly' ? 'bg-[#4789A8] text-white' : 'bg-gray-100 text-gray-600'}`}
          >
            Bulanan
          </button>
          <button 
            onClick={() => setTimeRange('quarterly')}
            className={`px-3 py-1 rounded-lg text-sm font-medium ${timeRange === 'quarterly' ? 'bg-[#4789A8] text-white' : 'bg-gray-100 text-gray-600'}`}
          >
            Triwulan
          </button>
        </div>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={sampleOrderData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip 
              contentStyle={{ 
                borderRadius: '8px', 
                border: '1px solid #e5e7eb',
                backgroundColor: 'white'
              }}
              formatter={(value, name) => {
                if (name === 'totalOrders') return [`${value} Pesanan`, 'Total Pesanan'];
                if (name === 'totalItems') return [`${value} Unit`, 'Total Barang'];
                return [value, name];
              }}
            />
            <Legend />
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
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Barang Paling Sering Dipesan</h3>
          <p className="text-sm text-gray-500">Daftar barang dengan permintaan tertinggi</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Cari barang..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4789A8] focus:border-transparent"
            />
          </div>
          <button className="text-[#4789A8] hover:text-[#3a7490]">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">No</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Nama Barang</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Kategori</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Total Pesanan</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Rata-rata/Bulan</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Pesanan Terakhir</th>
            </tr>
          </thead>
          <tbody>
            {paginatedItems.map((item, index) => (
              <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 text-sm text-gray-700">{startIndex + index + 1}</td>
                <td className="py-3 px-4">
                  <div className="font-medium text-gray-800">{item.name}</div>
                </td>
                <td className="py-3 px-4">
                  <span className="inline-block px-3 py-1 text-xs bg-blue-50 text-blue-700 rounded-full">
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
                    <span className="font-medium text-gray-800">{item.totalOrders}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-sm text-gray-700">{item.avgMonthly}</td>
                <td className="py-3 px-4 text-sm text-gray-700">{item.lastOrder}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-200">
        <div className="text-sm text-gray-500">
          Menampilkan {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredPopularItems.length)} dari {filteredPopularItems.length} barang
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }
            
            return (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`w-10 h-10 rounded-lg text-sm font-medium ${
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
            className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  const DepartmentTable = () => (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Departemen dengan Permintaan Terbanyak</h3>
          <p className="text-sm text-gray-500">Statistik permintaan per departemen</p>
        </div>
        <button className="text-[#4789A8] hover:text-[#3a7490]">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>
      
      <div className="overflow-x-auto">
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
                        className="w-3 h-3 rounded-full mr-3"
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
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      {dept.pending} pending
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {dept.completed} selesai
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden mr-3">
                        <div 
                          className="h-full"
                          style={{ 
                            width: `${completionRate}%`,
                            backgroundColor: dept.color
                          }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-700">{completionRate.toFixed(0)}%</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {departmentData.map((dept) => (
            <div key={dept.id} className="text-center">
              <div className="text-2xl font-bold text-gray-800">{dept.totalOrders}</div>
              <div className="text-sm text-gray-500">{dept.name}</div>
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
        <div className="px-8 pb-8 flex flex-1 flex-col gap-6 pt-24 transition-all duration-300">
          {/* Header Laporan */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Laporan Pemesanan Barang</h1>
              <p className="text-gray-500">Analisis dan statistik permintaan barang per periode</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handleFilter}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filter
                <ChevronDown className="w-4 h-4 ml-2" />
              </button>
              <button
                onClick={handleExport}
                className="flex items-center px-4 py-2 bg-[#4789A8] text-white rounded-lg hover:bg-[#3a7490]"
              >
                <Download className="w-4 h-4 mr-2" />
                Export Laporan
              </button>
            </div>
          </div>

          {/* Periode Laporan */}
          <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 text-[#4789A8] mr-3" />
              <div>
                <p className="text-sm text-gray-500">Periode Laporan</p>
                <p className="font-medium text-gray-800">{formatMonthYear(startDate)} - {formatMonthYear(endDate)}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Update terakhir</p>
              <p className="font-medium text-gray-800">{formatFullDateTime(lastUpdate)}</p>
            </div>
          </div>

          {/* Statistik Utama */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
