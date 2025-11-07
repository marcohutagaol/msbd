"use client";

import { useState } from "react";
import Sidebar from "../../components/admin/dashboard/Sidebar";
import Header from "../../components/admin/dashboard/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Edit3,
  Building2,
  PackageSearch,
  Filter,
} from "lucide-react";

interface InventoryItem {
  id: number;
  namaBarang: string;
  kategori: string;
  department: string;
  divisi: string;
  stokAkhir: number;
  minimalStok: number;
  statusDetail: string; // digunakan, expired, habis
}

export default function InventoryPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const [filterDept, setFilterDept] = useState("semua");
  const [filterDivisi, setFilterDivisi] = useState("semua");
  const [filterStok, setFilterStok] = useState("semua");
  const [search, setSearch] = useState("");

  const departmentOptions: Record<string, string[]> = {
    "IT Department": ["Support", "Network", "Developer"],
    "Administrasi Department": ["HR", "Finance"],
    "Food & Beverage Department": ["Kitchen", "Service"],
  };

  const items: InventoryItem[] = [
    {
      id: 1,
      namaBarang: "Laptop Asus Pro",
      kategori: "Elektronik",
      department: "IT Department",
      divisi: "Developer",
      stokAkhir: 12,
      minimalStok: 5,
      statusDetail: "Digunakan",
    },
    {
      id: 2,
      namaBarang: "Mouse Logitech",
      kategori: "Elektronik",
      department: "IT Department",
      divisi: "Support",
      stokAkhir: 4,
      minimalStok: 10,
      statusDetail: "Habis",
    },
    {
      id: 3,
      namaBarang: "Kertas A4",
      kategori: "ATK",
      department: "Administrasi Department",
      divisi: "Finance",
      stokAkhir: 25,
      minimalStok: 10,
      statusDetail: "Digunakan",
    },
    {
      id: 4,
      namaBarang: "Tinta Printer Canon",
      kategori: "ATK",
      department: "Administrasi Department",
      divisi: "HR",
      stokAkhir: 3,
      minimalStok: 5,
      statusDetail: "Expired",
    },
  ];

  // --- Filter logic
  const filteredItems = items.filter((item) => {
    const matchesSearch = item.namaBarang
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesDept = filterDept === "semua" || item.department === filterDept;
    const matchesDiv = filterDivisi === "semua" || item.divisi === filterDivisi;
    const needsRestock = item.stokAkhir <= item.minimalStok;
    const matchesStok =
      filterStok === "semua" ||
      (filterStok === "aman" && !needsRestock) ||
      (filterStok === "restock" && needsRestock);
    return matchesSearch && matchesDept && matchesDiv && matchesStok;
  });

  const totalBarang = items.length;
  const stokAman = items.filter((i) => i.stokAkhir > i.minimalStok).length;
  const butuhRestok = items.filter((i) => i.stokAkhir <= i.minimalStok).length;

  const divisiList =
    filterDept !== "semua"
      ? departmentOptions[filterDept] || []
      : Object.values(departmentOptions).flat();

  // --- Helper warna status stok
  const getStatusBadge = (item: InventoryItem) => {
    const needsRestock = item.stokAkhir <= item.minimalStok;
    const status = needsRestock ? "Butuh Restok" : "Stok Aman";

    const bg =
      status === "Stok Aman"
        ? "rgba(22, 163, 74, 0.12)"
        : "rgba(239, 68, 68, 0.12)";
    const border = status === "Stok Aman" ? "#86efac" : "#fca5a5";
    const color = status === "Stok Aman" ? "#16a34a" : "#dc2626";

    return (
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          minWidth: "120px",
          height: "30px",
          borderRadius: "20px",
          fontSize: "13px",
          fontWeight: 600,
          color,
          backgroundColor: bg,
          border: `1px solid ${border}`,
        }}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="flex min-h-screen bg-[#f5f7fa] font-[Poppins,Segoe_UI,system-ui,sans-serif]">
      {/* === SIDEBAR === */}
      <div
        className={`fixed top-0 left-0 h-full w-[260px] bg-white shadow-md z-[150] transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar />
      </div>

      {/* === MAIN === */}
      <div
        className={`flex flex-col flex-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-[260px]" : "ml-0"
        }`}
      >
        {/* === HEADER === */}
        <div
          className={`fixed top-0 right-0 bg-white shadow-sm z-[200] transition-all duration-300 ${
            isSidebarOpen ? "left-[260px]" : "left-0"
          }`}
        >
          <Header
            isSidebarOpen={isSidebarOpen}
            onToggleSidebar={toggleSidebar}
          />
        </div>

        {/* === CONTENT === */}
        <div className="flex flex-col flex-1 gap-6 px-5 sm:px-10 pt-[110px] pb-[40px]">
          <h1 className="text-2xl font-semibold text-slate-800">
            Inventaris Barang
          </h1>

          {/* === STATISTIK === */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <Card className="p-5 bg-white shadow-sm border border-slate-200 rounded-2xl">
              <p className="text-slate-500 text-sm">Total Barang</p>
              <p className="text-2xl font-bold text-slate-700">{totalBarang}</p>
            </Card>
            <Card className="p-5 bg-white shadow-sm border border-slate-200 rounded-2xl">
              <p className="text-slate-500 text-sm">Stok Aman</p>
              <p className="text-2xl font-bold text-green-600">{stokAman}</p>
            </Card>
            <Card className="p-5 bg-white shadow-sm border border-slate-200 rounded-2xl">
              <p className="text-slate-500 text-sm">Butuh Restok</p>
              <p className="text-2xl font-bold text-red-600">{butuhRestok}</p>
            </Card>
          </div>

          {/* === FILTER === */}
          <Card className="p-5 bg-white shadow-sm border border-slate-200 rounded-2xl">
            <div className="flex flex-wrap gap-3 justify-between items-center">
              <div className="flex flex-wrap gap-3 items-center">
                {/* Department */}
                <Select value={filterDept} onValueChange={setFilterDept}>
                  <SelectTrigger className="w-[200px] h-9 text-sm bg-slate-50 border-slate-300">
                    <Building2 className="w-4 h-4 mr-2 text-slate-500" />
                    <SelectValue placeholder="Pilih Departemen" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="semua">Semua Departemen</SelectItem>
                    {Object.keys(departmentOptions).map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Divisi */}
                <Select
                  value={filterDivisi}
                  onValueChange={setFilterDivisi}
                  disabled={divisiList.length === 0}
                >
                  <SelectTrigger className="w-[180px] h-9 text-sm bg-slate-50 border-slate-300 disabled:opacity-60">
                    <PackageSearch className="w-4 h-4 mr-2 text-slate-500" />
                    <SelectValue placeholder="Pilih Divisi" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="semua">Semua Divisi</SelectItem>
                    {divisiList.map((div) => (
                      <SelectItem key={div} value={div}>
                        {div}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Stok filter */}
                <Select value={filterStok} onValueChange={setFilterStok}>
                  <SelectTrigger className="w-[160px] h-9 text-sm bg-slate-50 border-slate-300">
                    <Filter className="w-4 h-4 mr-2 text-slate-500" />
                    <SelectValue placeholder="Status Stok" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="semua">Semua</SelectItem>
                    <SelectItem value="aman">Aman</SelectItem>
                    <SelectItem value="restock">Butuh Restok</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Search */}
              <div className="flex items-center border border-slate-300 rounded-md px-3 py-1.5 bg-white w-full sm:w-[280px]">
                <Search size={18} className="text-slate-400 mr-2" />
                <input
                  type="text"
                  placeholder="Cari barang..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full outline-none text-sm bg-transparent"
                />
              </div>
            </div>
          </Card>

          {/* === TABEL === */}
          <Card className="p-5 bg-white shadow-sm border border-slate-200 rounded-2xl">
            <div className="overflow-x-auto">
              <table className="w-full border border-slate-200 rounded-xl overflow-hidden text-center">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    {[
                      "No",
                      "Nama Barang",
                      "Kategori",
                      "Departemen",
                      "Divisi",
                      "Stok Akhir",
                      "Status",
                      "Detail Status",
                    ].map((head, i) => (
                      <th
                        key={i}
                        className="py-3 px-4 text-[13px] font-semibold uppercase tracking-wide border-b border-slate-200"
                      >
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item, index) => (
                    <tr
                      key={item.id}
                      className="border-b border-slate-200 hover:bg-slate-50 transition"
                    >
                      <td className="py-3 px-4 text-[14px] text-slate-700 font-medium">
                        {index + 1}
                      </td>
                      <td className="py-3 px-4 text-[14px] text-slate-700">
                        {item.namaBarang}
                      </td>
                      <td className="py-3 px-4 text-[14px]">{item.kategori}</td>
                      <td className="py-3 px-4 text-[14px]">
                        {item.department}
                      </td>
                      <td className="py-3 px-4 text-[14px]">{item.divisi}</td>
                      <td className="py-3 px-4 text-[14px] font-semibold">
                        {item.stokAkhir}
                      </td>
                      <td className="py-3 px-4">{getStatusBadge(item)}</td>
                      <td className="py-3 px-4">
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-sky-600 hover:bg-sky-50"
                        >
                          <Edit3 size={16} className="mr-1" />
                          {item.statusDetail}
                        </Button>
                      </td>
                    </tr>
                  ))}

                  {filteredItems.length === 0 && (
                    <tr>
                      <td
                        colSpan={8}
                        className="py-6 text-center text-slate-500 text-sm"
                      >
                        Tidak ada data barang yang sesuai filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
