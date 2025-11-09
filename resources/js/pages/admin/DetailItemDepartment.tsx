"use client";

import { useState } from "react";
import Sidebar from "../../components/admin/dashboard/Sidebar";
import Header from "../../components/admin/dashboard/Header";
import { Card } from "@/components/ui/card";
import { Search, Package } from "lucide-react";

export default function BarangPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
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

  // Filter items berdasarkan search term
  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen font-[Poppins,Segoe_UI,system-ui,sans-serif] bg-[#f5f7fa] transition-all duration-300">
      {/* === SIDEBAR === */}
      <div
        className={`fixed top-0 left-0 h-full w-[260px] bg-white shadow-md z-[150] transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar />
      </div>

      {/* === KONTEN HALAMAN === */}
      <div
        className={`flex flex-col flex-1 min-h-screen transition-all duration-300 ${
          isSidebarOpen ? "ml-[260px]" : "ml-0"
        }`}
      >
        {/* === HEADER === */}
        <div
          className={`fixed top-0 right-0 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.05)] z-[200] transition-all duration-300 ${
            isSidebarOpen ? "left-[260px]" : "left-0"
          }`}
        >
          <Header isSidebarOpen={isSidebarOpen} onToggleSidebar={toggleSidebar} />
        </div>

        {/* === ISI HALAMAN === */}
        <main className="flex flex-col flex-1 gap-6 px-6 pb-6 pt-[100px] transition-all duration-300">
          {/* === HEADER DENGAN ICON DAN JUDUL === */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Package className="w-6 h-6 text-[#4789A8]" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Daftar Barang Front Office Departemen</h2>
            </div>

            {/* === SEARCH BAR === */}
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Cari barang..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* === TABEL === */}
          <Card className="p-4 rounded-2xl border border-slate-200 shadow-md bg-white">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700">
                  <th className="p-3 text-left">Nama Barang</th>
                  <th className="p-3 text-center">Jumlah</th>
                  <th className="p-3 text-center">Satuan</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item, idx) => (
                  <tr key={idx} className="border-t hover:bg-slate-50">
                    <td className="p-3">{item.name}</td>
                    <td className="p-3 text-center">{item.qty}</td>
                    <td className="p-3 text-center">{item.unit}</td>
                  </tr>
                ))}
                {filteredItems.length === 0 && (
                  <tr>
                    <td colSpan={3} className="p-3 text-center text-slate-500">
                      Tidak ada barang ditemukan
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </Card>
        </main>
      </div>
    </div>
  );
}