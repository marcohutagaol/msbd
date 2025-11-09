"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from '@inertiajs/react';
import Sidebar from "../../components/admin/dashboard/Sidebar";
import Header from "../../components/admin/dashboard/Header";
import {
  Edit2,
  Calendar,
  Boxes,
  Coffee,
  KeySquare,
  Bath,
  Users,
  ChevronDown,
} from "lucide-react";

export default function WarehouseTable() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const items = [
    {
      name: "Handuk Hotel",
      dept: "HK",
      stokAwal: 100,
      stokMasuk: 50,
      stokKeluar: 30,
      stokAkhir: 120,
      lokasi: "Gudang HK",
      status: "Tersedia",
      tanggal: "2025-11-07",
    },
    {
      name: "Sabun Cair",
      dept: "HK",
      stokAwal: 200,
      stokMasuk: 100,
      stokKeluar: 250,
      stokAkhir: 50,
      lokasi: "Gudang Utama",
      status: "Habis",
      tanggal: "2025-11-05",
    },
    {
      name: "Air Mineral 600ml",
      dept: "FNB",
      stokAwal: 500,
      stokMasuk: 200,
      stokKeluar: 300,
      stokAkhir: 400,
      lokasi: "Gudang FNB",
      status: "Tersedia",
      tanggal: "2025-11-04",
    },
    {
      name: "Kartu Kunci",
      dept: "FO",
      stokAwal: 50,
      stokMasuk: 0,
      stokKeluar: 10,
      stokAkhir: 40,
      lokasi: "Gudang FO",
      status: "Sedang Digunakan",
      tanggal: "2025-11-06",
    },
    {
      name: "Air Freshener",
      dept: "AA",
      stokAwal: 100,
      stokMasuk: 0,
      stokKeluar: 20,
      stokAkhir: 80,
      lokasi: "Gudang AA",
      status: "Expired",
      tanggal: "2025-10-30",
    },
  ];

  // Hitung total item per departemen
  const countByDept = (dept: string) =>
    items.filter((item) => item.dept === dept).length;

  // Fungsi untuk toggle dropdown
  const toggleDropdown = (index: number) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
  };

  // Fungsi untuk handle pilihan dropdown
  const handleDropdownAction = (action: string, itemIndex: number) => {
    console.log(`Action: ${action} untuk item: ${items[itemIndex].name}`);
    // Tambahkan logika sesuai kebutuhan di sini
    setOpenDropdownIndex(null); // Tutup dropdown setelah memilih
  };

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

      {/* === MAIN CONTENT === */}
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
          <Header
            isSidebarOpen={isSidebarOpen}
            onToggleSidebar={toggleSidebar}
          />
        </div>

        {/* === PAGE CONTENT === */}
        <main className="flex-1 p-6 pt-[120px]">
          <Card className="p-4 shadow-md border border-slate-200 rounded-2xl flex flex-col h-[500px] bg-white mt-4">
            {/* Header tabel */}
            <div className="flex justify-between items-center mb-4">
              <h1 className="font-bold text-slate-800 flex items-center gap-2">
                <Boxes className="w-5 h-5 text-[#4789A8]" />
                Barang Gudang Hotel
              </h1>

              <div className="flex items-center gap-2">
                {/* Filter Departemen */}
                <select className="border border-gray-300 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#4789A8]">
                  <option value="">Semua Dept</option>
                  <option value="FO">FO</option>
                  <option value="HK">HK</option>
                  <option value="FNB">FNB</option>
                  <option value="AA">AA</option>
                </select>

                {/* Filter Status */}
                <select className="border border-gray-300 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#4789A8]">
                  <option value="">Semua Status</option>
                  <option value="In Stock">In Stock</option>
                  <option value="Habis">Habis</option>
                  <option value="Expired">Expired</option>
                  <option value="Sedang Digunakan">Sedang Digunakan</option>
                </select>

                {/* Filter Tanggal */}
                <div className="flex items-center gap-1 border border-gray-300 rounded-lg px-2 py-1 text-sm focus-within:ring-1 focus-within:ring-[#4789A8]">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <input type="date" className="focus:outline-none" />
                </div>

                {/* Search */}
                <input
                  type="text"
                  placeholder="Cari barang..."
                  className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#4789A8]"
                />
              </div>
            </div>

            {/* === Tabel === */}
            <div className="overflow-y-auto flex-1 rounded-xl max-h-[360px]">
              <table className="w-full text-sm text-center border-collapse">
                <thead className="bg-slate-100 text-slate-700 font-semibold sticky top-0 z-10">
                  <tr>
                    <th className="py-3 px-4 text-left">Nama Item</th>
                    <th className="py-3 px-4 text-left">Dept</th>
                    <th className="py-3 px-4 text-left">Stok Awal</th>
                    <th className="py-3 px-4 text-left">Masuk</th>
                    <th className="py-3 px-4 text-left">Keluar</th>
                    <th className="py-3 px-4 text-left">Stok Akhir</th>
                    <th className="py-3 px-4 text-left">Lokasi</th>
                    <th className="py-3 px-4 text-left">Status</th>
                    <th className="py-3 px-4 text-left">Tanggal</th>
                    <th className="py-3 px-4">Aksi</th>
                  </tr>
                </thead>

                <tbody>
                  {items.map((item, i) => (
                    <tr
                      key={i}
                      className={`${
                        i % 2 === 0 ? "bg-white" : "bg-slate-50"
                      } hover:bg-slate-100 transition-colors`}
                    >
                      <td className="py-3 px-4 text-left font-medium text-slate-700">
                        {item.name}
                      </td>
                      <td className="py-3 px-4 text-left text-slate-700">{item.dept}</td>
                      <td className="py-3 px-4 text-left text-slate-700">{item.stokAwal}</td>
                      <td className="py-3 px-4 text-left text-slate-700">{item.stokMasuk}</td>
                      <td className="py-3 px-4 text-left text-slate-700">{item.stokKeluar}</td>
                      <td className="py-3 px-4 text-left font-semibold text-slate-700">
                        {item.stokAkhir}
                      </td>
                      <td className="py-3 px-4 text-left text-slate-700">{item.lokasi}</td>
                      <td
                        className={`py-3 px-4 text-left font-semibold ${
                          item.status === "Tersedia"
                            ? "text-green-600"
                            : item.status === "Habis"
                            ? "text-red-600"
                            : item.status === "Expired"
                            ? "text-orange-500"
                            : "text-blue-600"
                        }`}
                      >
                        {item.status}
                      </td>
                      <td className="py-3 px-4 text-left text-slate-700">{item.tanggal}</td>
                      <td className="py-3 px-4 relative">
                        {/* Tombol Edit dengan Dropdown */}
                        <div className="flex justify-center">
                          <Button
                            size="sm"
                            className="flex items-center gap-1 bg-[#4789A8] text-white hover:bg-[#356b87]"
                            onClick={() => toggleDropdown(i)}
                          >
                            <Edit2 className="w-4 h-4" /> 
                            Edit
                            <ChevronDown className="w-3 h-3" />
                          </Button>
                        </div>

                        {/* Dropdown Menu */}
                        {openDropdownIndex === i && (
                          <div className="absolute top-full mt-1 right-0 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
                            {[
                              "Tersedia",
                              "Habis", 
                              "Expired",
                              "Sedang Digunakan"
                            ].map((option) => (
                              <div
                                key={option}
                                className="px-4 py-2 cursor-pointer hover:bg-[#4789A8] hover:text-white transition-colors first:rounded-t-lg last:rounded-b-lg"
                                onClick={() => handleDropdownAction(option, i)}
                              >
                                {option}
                              </div>
                            ))}
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-xs text-slate-500 mt-2 italic text-left">
              Daftar seluruh barang di gudang hotel beserta status stok terkini.
            </p>
          </Card>

          {/* === CARD RINGKASAN DEPARTEMEN === */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {/* Front Office */}
            <Card className="flex flex-col justify-between p-4 shadow-md rounded-2xl border border-slate-200 hover:shadow-lg transition-all bg-[#e3edf3]">
              <div className="flex items-center gap-3">
                <KeySquare className="w-6 h-6 text-[#4789A8]" />
                <h4 className="font-semibold text-slate-800">Front Office</h4>
              </div>
              <p className="text-2xl font-bold mt-2 text-[#4789A8]">
                {countByDept("FO")} Item
              </p>
              <Link href="/admin/detailitemdepartment">
                <Button className="mt-3 bg-[#7ba8be] hover:bg-[#5c8ca5] text-white w-full">
                  Detail
                </Button>
              </Link>
            </Card>

            {/* Housekeeping */}
            <Card className="flex flex-col justify-between p-4 shadow-md rounded-2xl border border-slate-200 hover:shadow-lg transition-all bg-[#e6f3e8]">
              <div className="flex items-center gap-3">
                <Bath className="w-6 h-6 text-[#16a34a]" />
                <h4 className="font-semibold text-slate-800">Housekeeping</h4>
              </div>
              <p className="text-2xl font-bold mt-2 text-[#16a34a]">
                {countByDept("HK")} Item
              </p>
              <Link href="/admin/detailitemdepartment">
                <Button className="mt-3 bg-[#6ecf83] hover:bg-[#52b868] text-white w-full">
                  Detail
                </Button>
              </Link>
            </Card>

            {/* Food & Beverage */}
            <Card className="flex flex-col justify-between p-4 shadow-md rounded-2xl border border-slate-200 hover:shadow-lg transition-all bg-[#fff9e6]">
              <div className="flex items-center gap-3">
                <Coffee className="w-6 h-6 text-[#eab308]" />
                <h4 className="font-semibold text-slate-800">Food & Beverage</h4>
              </div>
              <p className="text-2xl font-bold mt-2 text-[#eab308]">
                {countByDept("FNB")} Item
              </p>
              <Link href="/admin/detailitemdepartment">
                <Button className="mt-3 bg-[#f5cf60] hover:bg-[#e6b93f] text-white w-full">
                  Detail
                </Button>
              </Link>
            </Card>

            {/* Admin & Accounting */}
            <Card className="flex flex-col justify-between p-4 shadow-md rounded-2xl border border-slate-200 hover:shadow-lg transition-all bg-[#fdecec]">
              <div className="flex items-center gap-3">
                <Users className="w-6 h-6 text-[#ef4444]" />
                <h4 className="font-semibold text-slate-800">Accounting & Administration</h4>
              </div>
              <p className="text-2xl font-bold mt-2 text-[#ef4444]">
                {countByDept("AA")} Item
              </p>
              <Link href="/admin/detailitemdepartment">
                <Button className="mt-3 bg-[#f58a8a] hover:bg-[#e46464] text-white w-full">
                  Detail
                </Button>
              </Link>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}