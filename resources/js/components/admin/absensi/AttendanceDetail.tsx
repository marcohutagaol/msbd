"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  UserCheck,
  UserX,
  Clock4,
  AlertCircle,
  ClipboardList,
  Clock,
  CalendarDays,
} from "lucide-react";

export default function AttendanceDetail() {
  const allData = [
    { no: 1, name: "Andi Pratama", jamKerja: "08.00 - 12.00", absenMasuk: "08.05", absenKeluar: "12.03", status: "Hadir" },
    { no: 2, name: "Budi Santoso", jamKerja: "08.00 - 12.00", absenMasuk: "-", absenKeluar: "-", status: "Izin" },
    { no: 3, name: "Citra Lestari", jamKerja: "08.00 - 12.00", absenMasuk: "08.10", absenKeluar: "12.02", status: "Hadir" },
    { no: 4, name: "Dewi Ayu", jamKerja: "08.00 - 12.00", absenMasuk: "-", absenKeluar: "-", status: "Sakit" },
    { no: 5, name: "Eka Nugraha", jamKerja: "08.00 - 12.00", absenMasuk: "-", absenKeluar: "-", status: "Tanpa Keterangan" },
    { no: 6, name: "Fajar Prasetyo", jamKerja: "08.00 - 12.00", absenMasuk: "08.00", absenKeluar: "12.01", status: "Hadir" },
    { no: 7, name: "Gina Marlina", jamKerja: "08.00 - 12.00", absenMasuk: "-", absenKeluar: "-", status: "Izin" },
    { no: 8, name: "Hendra Wijaya", jamKerja: "08.00 - 12.00", absenMasuk: "08.12", absenKeluar: "12.05", status: "Hadir" },
  ];

  const badgeBase =
    "flex items-center justify-center gap-1 text-xs font-medium px-3 py-1.5 rounded-full border min-w-[110px] min-h-[32px]";

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Hadir":
        return (
          <Badge className={`${badgeBase} bg-green-100 text-green-700 border-green-200`}>
            <UserCheck size={13} /> Hadir
          </Badge>
        );
      case "Izin":
        return (
          <Badge className={`${badgeBase} bg-yellow-100 text-yellow-700 border-yellow-200`}>
            <Clock4 size={13} /> Izin
          </Badge>
        );
      case "Sakit":
        return (
          <Badge className={`${badgeBase} bg-blue-100 text-blue-700 border-blue-200`}>
            <AlertCircle size={13} /> Sakit
          </Badge>
        );
      case "Tanpa Keterangan":
        return (
          <Badge className={`${badgeBase} bg-red-100 text-red-700 border-red-200`}>
            <UserX size={13} /> Tanpa Ket.
          </Badge>
        );
      default:
        return (
          <Badge className={`${badgeBase} bg-slate-100 text-slate-700 border-slate-200`}>
            <AlertCircle size={13} /> Belum Absen
          </Badge>
        );
    }
  };

  const rekap = {
    hadir: allData.filter((d) => d.status === "Hadir").length,
    izin: allData.filter((d) => d.status === "Izin").length,
    sakit: allData.filter((d) => d.status === "Sakit").length,
    tanpaKet: allData.filter((d) => d.status === "Tanpa Keterangan").length,
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      {/* KIRI: Tabel Detail Absensi */}
      <Card className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col h-[450px]">
        <div className="flex items-center gap-2 mb-4">
          <ClipboardList className="text-slate-700" size={20} />
          <h2 className="text-slate-800 text-lg font-bold">Absensi Hari Ini</h2>
        </div>

        <div className="overflow-y-auto rounded-xl flex-1 max-h-[270px]">
          <table className="w-full text-sm text-center border-collapse">
            <thead className="bg-slate-100 text-slate-700 font-semibold sticky top-0 z-10">
              <tr>
                <th className="py-3 px-4 w-[50px]">No</th>
                <th className="py-3 px-4">Nama</th>
                <th className="py-3 px-4">
                  <div className="flex items-center justify-center gap-1">
                    <Clock size={14} /> Jam Kerja
                  </div>
                </th>
                <th className="py-3 px-4">
                  <div className="flex items-center justify-center gap-1">
                    <CalendarDays size={14} />Absen Masuk
                  </div>
                </th>
                <th className="py-3 px-4">
                  <div className="flex items-center justify-center gap-1">
                    <CalendarDays size={14} />Absen Keluar
                  </div>
                </th>
                <th className="py-3 px-4">Keterangan</th>
              </tr>
            </thead>
            <tbody>
              {allData.map((item, index) => (
                <tr
                  key={item.no}
                  className={`${index % 2 === 0 ? "bg-white" : "bg-slate-50"} hover:bg-slate-100 transition-colors`}
                >
                  <td className="py-3 px-4 font-medium">{item.no}</td>
                  <td className="py-3 px-4 font-semibold text-slate-700">{item.name}</td>
                  <td className="py-3 px-4 text-slate-700">{item.jamKerja}</td>
                  <td className="py-3 px-4 text-slate-700">{item.absenMasuk}</td>
                  <td className="py-3 px-4 text-slate-700">{item.absenKeluar}</td>
                  <td className="py-3 px-4 flex items-center justify-center">{getStatusBadge(item.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-xs text-slate-500 mt-3 italic text-left">
          Detail absensi karyawan hari ini.
        </p>
      </Card>

      {/* KANAN: Rekapitulasi Absensi */}
      <Card className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col justify-center items-center h-[450px]">
        

        <div className="grid grid-cols-2 gap-4 w-full">
          <div className="flex flex-col items-center bg-green-50 border border-green-100 rounded-xl p-4">
            <UserCheck className="text-green-600 mb-1" size={22} />
            <span className="font-bold text-lg text-green-700">{rekap.hadir}</span>
            <span className="text-xs text-slate-600">Hadir</span>
          </div>

          <div className="flex flex-col items-center bg-yellow-50 border border-yellow-100 rounded-xl p-4">
            <Clock4 className="text-yellow-600 mb-1" size={22} />
            <span className="font-bold text-lg text-yellow-700">{rekap.izin}</span>
            <span className="text-xs text-slate-600">Izin</span>
          </div>

          <div className="flex flex-col items-center bg-blue-50 border border-blue-100 rounded-xl p-4">
            <AlertCircle className="text-blue-600 mb-1" size={22} />
            <span className="font-bold text-lg text-blue-700">{rekap.sakit}</span>
            <span className="text-xs text-slate-600">Sakit</span>
          </div>

          <div className="flex flex-col items-center bg-red-50 border border-red-100 rounded-xl p-4">
            <UserX className="text-red-600 mb-1" size={22} />
            <span className="font-bold text-lg text-red-700">{rekap.tanpaKet}</span>
            <span className="text-xs text-slate-600 text-center">Tanpa Keterangan</span>
          </div>
        </div>

        <p className="text-xs text-slate-500 mt-5 italic text-center">
        Jumlah karyawan berdasarkan status absensi hari ini.
        </p>
      </Card>
    </div>  
  );
}