"use client";

import { useState } from "react";
import Sidebar from "../../components/admin/dashboard/Sidebar";
import Header from "../../components/admin/dashboard/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";
import {
  CheckCircle,
  Clock,
  XCircle,
  ClipboardList,
  Wallet,
  ArrowLeft,
  ShoppingBag,
  Truck,
  Edit2,
} from "lucide-react";
import { Link } from "@inertiajs/react";

// Data contoh
const stats = { completed: 35, pending: 5, canceled: 2, totalCost: "Rp15.000.000" };

const chart = [
  { day: "Sen", date: "03 Nov", total: 20 },
  { day: "Sel", date: "04 Nov", total: 15 },
  { day: "Rab", date: "05 Nov", total: 30 },
  { day: "Kam", date: "06 Nov", total: 25 },
  { day: "Jum", date: "07 Nov", total: 40 },
  { day: "Sab", date: "08 Nov", total: 22 },
  { day: "Min", date: "09 Nov", total: 18 },
];

const requests = [
  { item: "Printer", date: "2025-11-01", time: "09:30", qty: 2, priority: "Urgent" },
  { item: "Router", date: "2025-11-02", time: "11:15", qty: 1, priority: "Normal" },
  { item: "Keyboard", date: "2025-11-03", time: "10:00", qty: 5, priority: "Low" },
];

const purchases = [
  { date: "2025-10-25", item: "Printer", cost: 2500000, status: "Completed" },
  { date: "2025-10-28", item: "Monitor", cost: 1800000, status: "Completed" },
  { date: "2025-10-30", item: "Router", cost: 1200000, status: "Pending" },
];

// Format Rupiah
const formatRupiah = (angka: number) => "Rp" + angka.toLocaleString("id-ID");

// Tooltip untuk BarChart
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const { day, date } = payload[0].payload;
    return (
      <div className="bg-white border border-slate-200 rounded-lg shadow-md px-3 py-2 text-sm">
        <p className="font-medium text-slate-700">{`${day}, ${date}`}</p>
        <p className="text-[#3b82a0] font-semibold">{payload[0].value} Request</p>
      </div>
    );
  }
  return null;
};

export default function RequestDetailPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [requestSearch, setRequestSearch] = useState("");
  const [purchaseSearch, setPurchaseSearch] = useState("");
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const deptName = "Front Office Department";

  const filteredRequests = requests.filter(
    (r) =>
      r.item.toLowerCase().includes(requestSearch.toLowerCase()) ||
      r.priority.toLowerCase().includes(requestSearch.toLowerCase())
  );

  const filteredPurchases = purchases.filter(
    (p) =>
      p.item.toLowerCase().includes(purchaseSearch.toLowerCase()) ||
      p.status.toLowerCase().includes(purchaseSearch.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-[#f5f7fa] font-sans">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-[260px] bg-white shadow-md transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar />
      </div>

      {/* Main content */}
      <div
        className={`flex flex-col flex-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-[260px]" : "ml-0"
        }`}
      >
        {/* Header */}
        <div
          className={`fixed top-0 right-0 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.05)] z-200 transition-all duration-300 ${
            isSidebarOpen ? "left-[260px]" : "left-0"
          }`}
        >
          <Header isSidebarOpen={isSidebarOpen} onToggleSidebar={toggleSidebar} />
        </div>

        {/* Page content */}
        <div className="flex flex-col gap-8 px-10 py-24 transition-all duration-300">
          {/* Page Header */}
          <div className="w-full rounded-xl bg-white border-b border-slate-200 shadow-sm sticky top-0 z-40">
  <div className="max-w-7xl mx-auto flex justify-between items-center px-10 py-5">
    <div className="flex items-center gap-3">
      <div className="bg-[#4789A8]/10 p-3 rounded-xl">
        <ClipboardList className="w-6 h-6 text-[#4789A8]" />
      </div>
      <div>
        <h1 className="text-2xl font-bold text-gray-800">{deptName}</h1>
        <p className="text-gray-500 text-sm">Detail aktivitas permintaan barang</p>
      </div>
    </div>

    <Link href="/admin/requestitem">
      <Button
        variant="outline"
        className="flex items-center gap-2 border border-[#4789A8] text-[#4789A8] hover:bg-[#4789A8] hover:text-white transition-all"
      >
        <ArrowLeft className="w-4 h-4" />
        Kembali
      </Button>
    </Link>
  </div>
</div>



          {/* Stats + Chart */}
<div className="flex flex-col gap-6">
  {/* Stats bar di atas */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    {/* Total Cost */}
    <Card className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">Total Cost</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">$215k</p>
        </div>
        <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12l5 5L20 7" />
        </svg>
      </div>
      <p className="text-xs text-blue-500 mt-2">5% increase vs 365 Days</p>
    </Card>

    {/* Total Order */}
    <Card className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">Total Order</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">240</p>
        </div>
        <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12l5 5L20 7" />
        </svg>
      </div>
      <p className="text-xs text-green-500 mt-2">8% increase vs 365 Days</p>
    </Card>

    {/* Completed */}
    <Card className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">Completed</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">198</p>
        </div>
        <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12l5 5L20 7" />
        </svg>
      </div>
      <p className="text-xs text-green-500 mt-2">5% increase vs 365 Days</p>
    </Card>

    {/* Canceled */}
    <Card className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">Canceled</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">12</p>
        </div>
        <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 13l-6 6-6-6M19 6l-6 6-6-6" />
        </svg>
      </div>
      <p className="text-xs text-red-500 mt-2">8% decrease vs 365 Days</p>
    </Card>
  </div>

  {/* Chart di bawah */}
  <Card className="p-6 [bg-gradient-to-br] from-white to-[#f0f8fa] rounded-2xl shadow-sm border border-slate-200">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg font-semibold text-slate-800">
        Aktivitas Permintaan Mingguan
      </h2>
      <p className="text-sm text-slate-500">3 - 9 November</p>
    </div>

    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={chart}
        margin={{ top: 20, right: 20, left: 0, bottom: 30 }}
      >
        <defs>
          <linearGradient id="barDefault" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#b8e0ed" stopOpacity={0.95} />
            <stop offset="100%" stopColor="#84c3d7" stopOpacity={0.95} />
          </linearGradient>
        </defs>

        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis
          dataKey="day"
          axisLine={false}
          tickLine={false}
          tick={({ x, y, payload }) => {
            const dayData = chart.find((d) => d.day === payload.value);
            return (
              <g transform={`translate(${x},${y + 10})`}>
                <text
                  x={0}
                  y={0}
                  dy={10}
                  textAnchor="middle"
                  className="fill-slate-700 text-[12px] font-medium"
                >
                  {dayData?.day}
                </text>
                <text
                  x={0}
                  y={0}
                  dy={22}
                  textAnchor="middle"
                  className="fill-slate-400 text-[11px]"
                >
                  {dayData?.date}
                </text>
              </g>
            );
          }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#94a3b8", fontSize: 12 }}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f1f5f9" }} />

        <Bar dataKey="total" radius={[12, 12, 0, 0]} barSize={50}>
          {chart.map((_, index) => (
            <Cell key={`cell-${index}`} fill="url(#barDefault)" />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </Card>
</div>



          {/* Request Table */}
<Card className="p-4 shadow-md border border-slate-200 rounded-2xl flex flex-col h-[400px] bg-white mt-4">
  {/* Header */}
  <div className="flex justify-between items-center mb-3">
    <h3 className="font-bold text-slate-800 flex items-center gap-2">
      <ShoppingBag className="w-5 h-5 text-[#4789A8]" />
      Daftar Request Item
    </h3>
    <input
      type="text"
      placeholder="Cari item..."
      className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#4789A8]"
    />
  </div>

  {/* Table */}
  <div className="overflow-y-auto flex-1 rounded-xl ">
    <table className="w-full text-sm text-center border-collapse">
      <thead className="bg-slate-100 text-slate-700 font-semibold sticky top-0 z-10">
        <tr>
          <th className="py-3 px-4">No</th>
          <th className="py-3 px-4 text-left">Item</th>
          <th className="py-3 px-4">Tanggal</th>
          <th className="py-3 px-4">Jam</th>
          <th className="py-3 px-4">Jumlah</th>
          <th className="py-3 px-4">Satuan</th>
          <th className="py-3 px-4 text-left">Catatan</th>
          <th className="py-3 px-4">Status</th>
          <th className="py-3 px-4">Aksi</th>
        </tr>
      </thead>
<tbody>
  {[
    ["1", "Laptop", "07-11-2025", "09:00", "5", "Unit", "Butuh segera", "Menunggu"],
    ["2", "Pulpen", "07-11-2025", "10:00", "100", "Pcs", "Untuk kantor", "Diterima"],
    ["3", "Kertas A4", "07-11-2025", "11:00", "50", "Rim", "Cadangan", "Ditolak"],
  ].map(([no, item, tgl, jam, jml, sat, catatan, status], i) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [currentStatus, setCurrentStatus] = useState(status);

    return (
      <tr
        key={i}
        className={`${i % 2 === 0 ? "bg-white" : "bg-slate-50"} hover:bg-slate-100 transition-colors`}
      >
        <td className="py-3 px-4 font-medium">{no}</td>
        <td className="py-3 px-4 text-left font-semibold text-slate-700">{item}</td>
        <td className="py-3 px-4 text-slate-700">{tgl}</td>
        <td className="py-3 px-4 text-slate-700">{jam}</td>
        <td className="py-3 px-4 text-slate-700">{jml}</td>
        <td className="py-3 px-4 text-slate-700">{sat}</td>
        <td className="py-3 px-4 text-left text-slate-700">{catatan}</td>
        <td className="py-3 px-4">
          <span
            className={`px-2 py-1 rounded-lg text-sm font-semibold ${
              currentStatus === "Menunggu"
                ? "bg-yellow-100 text-yellow-800"
                : currentStatus === "Ditolak"
                ? "bg-red-100 text-red-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            {currentStatus}
          </span>
        </td>
        <td className="py-3 px-4 flex justify-center relative">
          {/* Tombol Edit */}
          <Button
            size="sm"
            className="flex items-center gap-1 bg-[#4789A8] text-white hover:bg-[#356b87]"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
          >
            <Edit2 className="w-4 h-4" /> Edit
          </Button>

          {/* Dropdown Interaktif */}
          {isDropdownOpen && (
            <div className="absolute top-full mt-2 left-0 w-36 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
              {["Diterima", "Ditolak", "Menunggu"].map((option) => (
                <div
                  key={option}
                  className={`px-4 py-2 cursor-pointer hover:bg-[#4789A8] hover:text-white rounded-md ${
                    currentStatus === option ? "font-semibold" : ""
                  }`}
                  onClick={() => {
                    setCurrentStatus(option);
                    setIsDropdownOpen(false);
                  }}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </td>
      </tr>
    );
  })}
</tbody>



    </table>
  </div>

  <p className="text-xs text-slate-500 mt-2 italic text-left">
    Daftar request item terbaru.
  </p>
</Card>




  {/* Riwayat Barang Masuk */}
  <Card className="p-4 shadow-md border border-slate-200 rounded-2xl flex flex-col h-[400px] bg-white mt-4">
    <div className="flex justify-between items-center mb-3">
      <h3 className="font-bold text-slate-800 flex items-center gap-2">
        <Truck className="w-5 h-5 text-[#4789A8]" />
        Riwayat Barang Masuk
      </h3>

      <input
        type="text"
        placeholder="Cari barang..."
        className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#4789A8]"
      />
    </div>

    <div className="overflow-y-auto flex-1 rounded-xl max-h-[280px]">
      <table className="w-full text-sm text-center border-collapse">
        <thead className="bg-slate-100 text-slate-700 font-semibold sticky top-0 z-10">
          <tr>
            <th className="py-3 px-4 text-left">Nama Item</th>
            <th className="py-3 px-4 text-left">Tanggal Masuk</th>
            <th className="py-3 px-4 text-left">Jumlah</th>
            <th className="py-3 px-4 text-left">Satuan</th>
            <th className="py-3 px-4 text-left">Harga Satuan</th>
            <th className="py-3 px-4 text-left">Total Harga</th>
            
          </tr>
        </thead>
        <tbody>
          {[
            ["Cat Tembok Dulux", "05 Nov 2025", "20", "Kaleng", "Rp250.000", "Rp5.000.000"],
            ["Paku Baja 5cm", "03 Nov 2025", "500", "Pcs", "Rp200", "Rp100.000"],
            ["Semen Tiga Roda", "02 Nov 2025", "100", "Sak", "Rp75.000", "Rp7.500.000"],
            ["Kayu Meranti", "01 Nov 2025", "30", "Batang", "Rp150.000", "Rp4.500.000"],
            ["Kabel Listrik 10m", "30 Okt 2025", "50", "Roll", "Rp50.000", "Rp2.500.000"],
            ["Pipa PVC 2 Inch", "29 Okt 2025", "80", "Batang", "Rp35.000", "Rp2.800.000"],
          ].map(([item, tgl, jml, sat, harga, total], i) => (
            <tr
              key={i}
              className={`${
                i % 2 === 0 ? "bg-white" : "bg-slate-50"
              } hover:bg-slate-100 transition-colors`}
            >
              <td className="py-3 px-4 text-left font-medium text-slate-700">{item}</td>
              <td className="py-3 px-4 text-left text-slate-700">{tgl}</td>
              <td className="py-3 px-4 text-left text-slate-700">{jml}</td>
              <td className="py-3 px-4 text-left text-slate-700">{sat}</td>
              <td className="py-3 px-4 text-left text-slate-700">{harga}</td>
              <td className="py-3 px-4 text-left font-semibold text-slate-700">{total}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <p className="text-xs text-slate-500 mt-2 italic text-left">
      Daftar riwayat barang yang baru masuk ke gudang.
    </p>
  </Card>




        </div>
      </div>
    </div>
  );
}
