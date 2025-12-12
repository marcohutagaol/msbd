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

import { usePage } from "@inertiajs/react";

interface AbsensiItem {
  id: number;
  name: string;
  department: string;
  jam_kerja: string;
  absen_masuk: string;
  absen_keluar: string;
  status: string;
}

interface PageProps {
  absensiData: AbsensiItem[];
}

export default function AttendanceDetail() {
  const { absensiData } = usePage().props as unknown as PageProps;
  const allData = absensiData || [];

  const badgeBase =
    "flex items-center justify-center gap-1 text-xs font-medium px-2 md:px-3 py-1 md:py-1.5 rounded-full border min-w-[90px] md:min-w-[110px] min-h-[28px] md:min-h-[32px]";

  const getStatusBadge = (status: string) => {
    const normalizedStatus = status.toUpperCase();
    
    switch (normalizedStatus) {
      case "HADIR":
        return (
          <Badge className={`${badgeBase} bg-green-100 text-green-700 border-green-200`}>
            <UserCheck size={12} /> Hadir
          </Badge>
        );
      case "IZIN":
        return (
          <Badge className={`${badgeBase} bg-yellow-100 text-yellow-700 border-yellow-200`}>
            <Clock4 size={12} /> Izin
          </Badge>
        );
      case "SAKIT":
        return (
          <Badge className={`${badgeBase} bg-blue-100 text-blue-700 border-blue-200`}>
            <AlertCircle size={12} /> Sakit
          </Badge>
        );
      case "TERLAMBAT":
        return (
          <Badge className={`${badgeBase} bg-orange-100 text-orange-700 border-orange-200`}>
            <Clock size={12} /> Terlambat
          </Badge>
        );
      case "TANPA KETERANGAN":
      case "TIDAK_HADIR":
        return (
          <Badge className={`${badgeBase} bg-red-100 text-red-700 border-red-200`}>
            <UserX size={12} /> Tanpa Ket.
          </Badge>
        );
      default:
        return (
          <Badge className={`${badgeBase} bg-slate-100 text-slate-700 border-slate-200`}>
            <AlertCircle size={12} /> {status}
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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-5">
      {/* KIRI: Tabel Detail Absensi */}
      <Card className="lg:col-span-2 bg-white rounded-xl md:rounded-2xl shadow-sm border border-slate-200 p-4 md:p-6 flex flex-col h-auto md:h-[450px]">
        <div className="flex items-center gap-2 mb-3 md:mb-4">
          <ClipboardList className="text-slate-700 w-4 h-4 md:w-5 md:h-5" />
          <h2 className="text-slate-800 text-base md:text-lg font-bold">Absensi Hari Ini</h2>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-y-auto rounded-xl flex-1 max-h-[270px]">
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
                  key={item.id}
                  className={`${index % 2 === 0 ? "bg-white" : "bg-slate-50"} hover:bg-slate-100 transition-colors`}
                >
                  <td className="py-3 px-4 font-medium">{index + 1}</td>
                  <td className="py-3 px-4 font-semibold text-slate-700">{item.name}</td>
                  <td className="py-3 px-4 text-slate-700">{item.jam_kerja}</td>
                  <td className="py-3 px-4 text-slate-700">{item.absen_masuk}</td>
                  <td className="py-3 px-4 text-slate-700">{item.absen_keluar}</td>
                  <td className="py-3 px-4 flex items-center justify-center">{getStatusBadge(item.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-3 overflow-y-auto max-h-[300px]">
          {allData.map((item, index) => (
            <div key={item.id} className="border border-slate-200 rounded-lg p-3 hover:bg-slate-50">
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <div className="font-semibold text-slate-700 text-sm">{item.name}</div>
                  <div className="text-xs text-slate-500 mt-1">No: {index + 1}</div>
                </div>
                <div className="ml-2">
                  {getStatusBadge(item.status)}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                <div>
                  <div className="text-slate-400">Jam Kerja</div>
                  <div className="font-medium text-slate-700">{item.jam_kerja}</div>
                </div>
                <div>
                  <div className="text-slate-400">Masuk</div>
                  <div className="font-medium text-slate-700">{item.absen_masuk}</div>
                </div>
                <div className="col-span-2">
                  <div className="text-slate-400">Keluar</div>
                  <div className="font-medium text-slate-700">{item.absen_keluar}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-slate-500 mt-3 italic text-left">
          Detail absensi karyawan hari ini.
        </p>
      </Card>

      {/* KANAN: Rekapitulasi Absensi */}
      <Card className="bg-white rounded-xl md:rounded-2xl shadow-sm border border-slate-200 p-4 md:p-6 flex flex-col justify-center items-center h-auto md:h-[450px]">
        <div className="grid grid-cols-2 gap-3 md:gap-4 w-full">
          <div className="flex flex-col items-center bg-green-50 border border-green-100 rounded-lg md:rounded-xl p-3 md:p-4">
            <UserCheck className="text-green-600 mb-1 w-5 h-5 md:w-6 md:h-6" />
            <span className="font-bold text-base md:text-lg text-green-700">{rekap.hadir}</span>
            <span className="text-xs text-slate-600">Hadir</span>
          </div>

          <div className="flex flex-col items-center bg-yellow-50 border border-yellow-100 rounded-lg md:rounded-xl p-3 md:p-4">
            <Clock4 className="text-yellow-600 mb-1 w-5 h-5 md:w-6 md:h-6" />
            <span className="font-bold text-base md:text-lg text-yellow-700">{rekap.izin}</span>
            <span className="text-xs text-slate-600">Izin</span>
          </div>

          <div className="flex flex-col items-center bg-blue-50 border border-blue-100 rounded-lg md:rounded-xl p-3 md:p-4">
            <AlertCircle className="text-blue-600 mb-1 w-5 h-5 md:w-6 md:h-6" />
            <span className="font-bold text-base md:text-lg text-blue-700">{rekap.sakit}</span>
            <span className="text-xs text-slate-600">Sakit</span>
          </div>

          <div className="flex flex-col items-center bg-red-50 border border-red-100 rounded-lg md:rounded-xl p-3 md:p-4">
            <UserX className="text-red-600 mb-1 w-5 h-5 md:w-6 md:h-6" />
            <span className="font-bold text-base md:text-lg text-red-700">{rekap.tanpaKet}</span>
            <span className="text-xs text-slate-600 text-center">Tanpa Ket.</span>
          </div>
        </div>

        <p className="text-xs text-slate-500 mt-4 md:mt-5 italic text-center">
          Jumlah karyawan berdasarkan status absensi hari ini.
        </p>
      </Card>
    </div>
  );
}