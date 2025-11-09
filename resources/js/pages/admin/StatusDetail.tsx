"use client";

import { useState } from "react";
import Sidebar from "../../components/admin/dashboard/Sidebar";
import Header from "../../components/admin/dashboard/Header";
import { usePage } from "@inertiajs/react";
import type { PageProps as InertiaPageProps } from "@inertiajs/core";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarDays, Filter, Building2, Users, Clock3 } from "lucide-react";
import { FaUserCheck, FaUserClock, FaUserTimes } from "react-icons/fa";
import { MdSick, MdOutlinePendingActions } from "react-icons/md";

interface PageProps extends InertiaPageProps {
  status: string;
}

type DepartmentKey =
  | "Front Office Department"
  | "Housekeeping Department"
  | "Food & Beverage Department"
  | "Accounting & Administration Department";

interface Employee {
  id: number;
  nama: string;
  keterangan: string;
  departemen: DepartmentKey;
  divisi: string;
}

interface DayData {
  date: string;
  day: string;
  data: Employee[];
}

export default function StatusDetail() {
  const { status } = usePage<PageProps>().props;

  const [filterWaktu, setFilterWaktu] = useState<"minggu" | "bulan" | "6bulan" | "tahun">("minggu");
  const [filterDepartemen, setFilterDepartemen] = useState<DepartmentKey | "semua">("semua");
  const [filterDivisi, setFilterDivisi] = useState<string>("semua");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const departemenOptions: Record<DepartmentKey, string[]> = {
    "Front Office Department": ["Receptionist", "Reservation Staff"],
    "Housekeeping Department": ["Room Attendant", "Laundry Staff"],
    "Food & Beverage Department": ["Waiter/Waitress", "Kitchen Staff"],
    "Accounting & Administration Department": ["Finance Staff", "HR Staff"],
  };

  const weeklyData: DayData[] = [
    {
      date: "2025-10-14",
      day: "Senin",
      data: [
        { id: 1, nama: "Andi Pratama", keterangan: "Demam", departemen: "Front Office Department", divisi: "Receptionist" },
        { id: 2, nama: "Siti Rahma", keterangan: "Sakit kepala", departemen: "Housekeeping Department", divisi: "Room Attendant" },
      ],
    },
    {
      date: "2025-10-17",
      day: "Kamis",
      data: [
        { id: 5, nama: "Dewi Lestari", keterangan: "Sakit gigi", departemen: "Accounting & Administration Department", divisi: "Finance Staff" },
      ],
    },
  ];

  const statusInfo = {
    hadir: { label: "Hadir", color: "#10b981", bg: "bg-emerald-50", icon: <FaUserCheck size={30} color="#10b981" /> },
    izin: { label: "Izin", color: "#3b82f6", bg: "bg-blue-50", icon: <FaUserClock size={30} color="#3b82f6" /> },
    sakit: { label: "Sakit", color: "#f59e0b", bg: "bg-amber-50", icon: <MdSick size={30} color="#f59e0b" /> },
    "belum-absen": { label: "Belum Absen", color: "#8b5cf6", bg: "bg-violet-50", icon: <MdOutlinePendingActions size={30} color="#8b5cf6" /> },
    "tanpa-keterangan": { label: "Tanpa Keterangan", color: "#ef4444", bg: "bg-rose-50", icon: <FaUserTimes size={30} color="#ef4444" /> },
  }[status] || { label: "Status", color: "#64748b", bg: "bg-slate-50", icon: <FaUserCheck size={30} color="#64748b" /> };

  // Filter data berdasarkan departemen dan divisi
  const filteredData = weeklyData
    .map((day) => ({
      ...day,
      data: day.data.filter((d) => {
        const matchDept = filterDepartemen === "semua" || d.departemen === filterDepartemen;
        const matchDivisi = filterDivisi === "semua" || d.divisi === filterDivisi;
        return matchDept && matchDivisi;
      }),
    }))
    .filter((day) => day.data.length > 0);

  // List divisi untuk dropdown
  const divisiList: string[] =
    filterDepartemen !== "semua" ? departemenOptions[filterDepartemen as DepartmentKey] || [] : Object.values(departemenOptions).flat();

  return (
    <div className="flex min-h-screen font-[Poppins,Segoe_UI,system-ui,sans-serif] bg-[#f5f7fa]">
      {/* SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-full w-[260px] bg-white shadow-md z-[150] transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar />
      </div>

      {/* MAIN */}
      <div className={`flex flex-col flex-1 min-h-screen transition-all duration-300 ${isSidebarOpen ? "ml-[260px]" : "ml-0"}`}>
        {/* HEADER */}
        <div
          className={`fixed top-0 right-0 bg-white shadow-sm z-[200] transition-all duration-300 ${
            isSidebarOpen ? "left-[260px]" : "left-0"
          }`}
        >
          <Header isSidebarOpen={isSidebarOpen} onToggleSidebar={toggleSidebar} />
        </div>

        {/* CONTENT */}
        <div className="flex flex-col flex-1 gap-8 px-5 sm:px-10 pt-[110px] pb-[40px]">
          {/* FILTER CARD */}
          <Card className="rounded-2xl border border-slate-200 shadow-sm bg-white p-6 px-7 flex flex-col gap-5">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${statusInfo.bg}`}>{statusInfo.icon}</div>
                <div>
                  <h1 className="text-xl font-semibold capitalize" style={{ color: statusInfo.color }}>
                    Detail {statusInfo.label}
                  </h1>
                  <p className="text-sm text-slate-500">Menampilkan data kehadiran berdasarkan status karyawan</p>
                </div>
              </div>

              {/* FILTERS */}
              <div className="flex flex-wrap items-center justify-end gap-3 sm:gap-4">
                {/* Filter Waktu */}
                <Select
  value={filterWaktu}
  onValueChange={(val: string) => setFilterWaktu(val as "minggu" | "bulan" | "6bulan" | "tahun")}
>

                  <SelectTrigger className="w-[140px] h-9 text-sm border-slate-300 bg-slate-50 text-slate-700 hover:bg-slate-100 focus:ring-1 focus:ring-slate-300 flex items-center gap-2 justify-start rounded-md transition-all">
                    <Clock3 className="w-4 h-4 text-slate-500" />
                    <SelectValue placeholder="Filter waktu" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-slate-200 shadow-md rounded-xl">
                    {["minggu", "bulan", "6bulan", "tahun"].map((val) => (
                      <SelectItem key={val} value={val} className="text-slate-600 hover:bg-slate-100 focus:bg-slate-100">
                        {val === "minggu"
                          ? "1 Minggu"
                          : val === "bulan"
                          ? "1 Bulan"
                          : val === "6bulan"
                          ? "6 Bulan"
                          : "1 Tahun"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Filter Departemen */}
                <Select
                  value={filterDepartemen}
                  onValueChange={(val) => {
                    setFilterDepartemen(val as DepartmentKey | "semua");
                    setFilterDivisi("semua");
                  }}
                >
                  <SelectTrigger className="w-[220px] h-9 text-sm border-slate-300 bg-slate-50 text-slate-700 hover:bg-slate-100 flex items-center gap-2 justify-start rounded-md transition-all">
                    <Building2 className="w-4 h-4 text-slate-500 shrink-0" />
                    <div className="truncate flex-1 text-left">
                      <SelectValue placeholder="Departemen" />
                    </div>
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-slate-200 shadow-md rounded-xl">
                    <SelectItem value="semua">Semua Departemen</SelectItem>
                    {Object.keys(departemenOptions).map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Filter Divisi */}
                <Select value={filterDivisi} onValueChange={setFilterDivisi} disabled={divisiList.length === 0}>
                  <SelectTrigger className="w-[180px] h-9 text-sm border-slate-300 bg-slate-50 text-slate-700 hover:bg-slate-100 flex items-center gap-2 justify-start rounded-md transition-all disabled:opacity-60">
                    <Users className="w-4 h-4 text-slate-500" />
                    <SelectValue placeholder="Divisi" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-slate-200 shadow-md rounded-xl">
                    <SelectItem value="semua">Semua Divisi</SelectItem>
                    {divisiList.map((div: string) => (
                      <SelectItem key={div} value={div}>
                        {div}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Filter Tanggal */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-[180px] h-9 text-sm border-slate-300 bg-slate-50 text-slate-700 hover:bg-slate-100 flex items-center gap-2 justify-start rounded-md transition-all"
                    >
                      <CalendarDays className="w-4 h-4 text-slate-500" />
                      {date
                        ? date.toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" })
                        : "Pilih Tanggal"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="start" className="w-auto p-0 bg-white border border-slate-200 shadow-md rounded-xl">
                    <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                  </PopoverContent>
                </Popover>

                <Button variant="default" className="h-9 px-3 bg-sky-600 hover:bg-sky-700 text-white flex items-center gap-2 shadow-sm rounded-lg transition-all">
                  <Filter className="w-4 h-4" /> Filter
                </Button>
              </div>
            </div>
          </Card>

          {/* DATA TABLE */}
          {filterWaktu === "minggu" && (
            <div className={`grid gap-6 transition-all duration-300 ${isSidebarOpen ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 md:grid-cols-3"}`}>
              {filteredData.map((day) => (
                <Card key={day.date} className="p-5 border border-slate-200 shadow-sm rounded-2xl bg-white hover:shadow-lg transition-all duration-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="w-4 h-4 text-slate-500" />
                      <p className="text-sm font-medium text-slate-700">
                        {day.day}, {day.date}
                      </p>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">{day.data.length} orang</span>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-white shadow-sm w-full">
                    <table className="w-full table-auto text-sm">
                      <thead className="bg-slate-50 text-slate-500 text-left">
                        <tr>
                          <th className="p-2 w-[50px]">No</th>
                          <th className="p-2 w-[25%]">Nama</th>
                          <th className="p-2 w-[20%]">Departemen</th>
                          <th className="p-2 w-[20%]">Divisi</th>
                          <th className="p-2 w-[35%]">Keterangan</th>
                        </tr>
                      </thead>
                      <tbody>
                        {day.data.map((d, i) => (
                          <tr key={d.id} className="border-t border-slate-100 hover:bg-slate-50 transition">
                            <td className="p-2 text-slate-700">{i + 1}</td>
                            <td className="p-2 text-slate-700 [break-words]">{d.nama}</td>
                            <td className="p-2 text-slate-600 [break-words]">{d.departemen}</td>
                            <td className="p-2 text-slate-600 [break-words]">{d.divisi}</td>
                            <td className="p-2 text-slate-500 italic [break-words]">{d.keterangan}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
