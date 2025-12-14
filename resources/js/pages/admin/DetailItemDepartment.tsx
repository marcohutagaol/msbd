"use client";

import { useState, useEffect } from "react";
import Sidebar from "../../components/admin/dashboard/Sidebar";
import Header from "../../components/admin/dashboard/Header";
import { Card } from "@/components/ui/card";
import { Search, Package } from "lucide-react";

export default function BarangPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const items = [
    { name: "Key Tag", qty: 20, unit: "pcs" },
    { name: "Pen", qty: 100, unit: "pcs" },
    { name: "Notepad", qty: 25, unit: "pcs" },
    { name: "Key Card", qty: 15, unit: "pcs" },
    { name: "Brochure", qty: 50, unit: "pcs" },
    { name: "Map", qty: 30, unit: "pcs" },
    { name: "Envelope", qty: 200, unit: "pcs" },
  ];

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

  // Filter items berdasarkan search term
  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
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
          className={`fixed top-0 right-0 z-40 bg-white shadow-sm transition-all duration-300 w-full ${
            isSidebarOpen ? 'md:left-[260px] md:w-[calc(100%-260px)]' : 'left-0'
          }`}
        >
          <Header isSidebarOpen={isSidebarOpen} onToggleSidebar={toggleSidebar} />
        </div>

        {/* === ISI HALAMAN === */}
        <main className="px-4 sm:px-6 lg:px-8 pb-6 flex flex-col flex-1 gap-4 md:gap-6 pt-20 md:pt-28 transition-all duration-300">
          {/* === HEADER DENGAN ICON DAN JUDUL === */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 md:p-3 bg-[#4789A8]/10 rounded-lg">
                <Package className="w-5 h-5 md:w-6 md:h-6 text-[#4789A8]" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-800">Daftar Barang Front Office Departemen</h2>
                <p className="text-gray-600 text-sm md:text-base mt-1">Manajemen inventaris barang untuk front office</p>
              </div>
            </div>

            {/* === SEARCH BAR === */}
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Cari barang..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 md:py-3 text-sm md:text-base border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4789A8] focus:border-transparent"
              />
            </div>
          </div>

          {/* Info Statistik */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
            <div className="bg-white rounded-lg md:rounded-xl p-4 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-gray-600">Total Jenis Barang</p>
                  <p className="text-xl md:text-2xl font-bold text-gray-800 mt-1">{items.length}</p>
                </div>
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Package className="w-4 h-4 md:w-5 md:h-5 text-[#4789A8]" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg md:rounded-xl p-4 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-gray-600">Total Stok Barang</p>
                  <p className="text-xl md:text-2xl font-bold text-gray-800 mt-1">
                    {items.reduce((sum, item) => sum + item.qty, 0)}
                  </p>
                </div>
                <div className="p-2 bg-green-50 rounded-lg">
                  <span className="text-green-600 font-bold text-sm md:text-base">📦</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg md:rounded-xl p-4 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-gray-600">Barang Ditemukan</p>
                  <p className="text-xl md:text-2xl font-bold text-gray-800 mt-1">{filteredItems.length}</p>
                </div>
                <div className="p-2 bg-amber-50 rounded-lg">
                  <Search className="w-4 h-4 md:w-5 md:h-5 text-amber-600" />
                </div>
              </div>
            </div>
          </div>

          {/* === TABEL === */}
          <Card className="rounded-lg md:rounded-xl border border-slate-200 shadow-sm bg-white overflow-hidden">
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-700">
                    <th className="p-4 text-left text-sm font-semibold">No</th>
                    <th className="p-4 text-left text-sm font-semibold">Nama Barang</th>
                    <th className="p-4 text-center text-sm font-semibold">Jumlah</th>
                    <th className="p-4 text-center text-sm font-semibold">Satuan</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item, idx) => (
                    <tr key={idx} className="border-t border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="p-4 text-slate-600">{idx + 1}</td>
                      <td className="p-4 font-medium text-slate-800">{item.name}</td>
                      <td className="p-4 text-center">
                        <span className="inline-flex items-center justify-center w-8 h-8 md:w-10 md:h-10 bg-blue-50 text-blue-700 font-semibold rounded-lg">
                          {item.qty}
                        </span>
                      </td>
                      <td className="p-4 text-center text-slate-600">{item.unit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden divide-y divide-slate-100">
              {filteredItems.map((item, idx) => (
                <div key={idx} className="p-4 hover:bg-slate-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-50 text-blue-700 font-semibold rounded-lg flex items-center justify-center mt-1">
                        {idx + 1}
                      </div>
                      <div>
                        <h3 className="font-medium text-slate-800 text-sm">{item.name}</h3>
                        <div className="flex items-center gap-4 mt-2">
                          <div>
                            <div className="text-xs text-slate-500">Jumlah</div>
                            <div className="font-bold text-slate-800">{item.qty}</div>
                          </div>
                          <div>
                            <div className="text-xs text-slate-500">Satuan</div>
                            <div className="font-medium text-slate-700">{item.unit}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <Package className="w-4 h-4 text-[#4789A8]" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredItems.length === 0 && (
              <div className="text-center py-8 md:py-12">
                <Package className="w-10 h-10 md:w-12 md:h-12 text-gray-400 mx-auto mb-3 md:mb-4" />
                <p className="text-gray-500 text-sm md:text-base">Tidak ada barang ditemukan</p>
                <p className="text-gray-400 text-xs md:text-sm mt-1">Coba gunakan kata kunci pencarian lain</p>
              </div>
            )}
          </Card>

          {/* Informasi Tambahan */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg md:rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="mt-1 p-2 bg-white rounded-lg">
                <Package className="w-4 h-4 text-[#4789A8]" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-800 text-sm md:text-base">Informasi Inventaris</h3>
                <p className="text-blue-700 text-xs md:text-sm mt-1.5">
                  Pastikan stok barang selalu tercatat dengan akurat. Barang dengan jumlah kurang dari 10 pcs perlu segera dipesan ulang.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}