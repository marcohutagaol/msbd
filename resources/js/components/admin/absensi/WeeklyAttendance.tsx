"use client";

import { Card } from "@/components/ui/card";
import { usePage } from "@inertiajs/react";

interface WeeklyItem {
  day: string;
  date: string;
  hadir: number;
  izin: number;
  sakit: number;
  tanpa: number;
}

interface PageProps {
  weeklyData: WeeklyItem[];
}

export default function WeeklyAttendance() {
  const { weeklyData } = usePage().props as unknown as PageProps;
  const data = weeklyData || [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5">
      {/* === KIRI: BAR CHART === */}
      <Card className="rounded-xl md:rounded-2xl border border-slate-200 shadow-sm bg-white p-4 md:p-6 px-5 md:px-7 flex justify-center items-center">
        <div className="flex justify-between items-end w-full h-[200px] sm:h-[250px] md:h-[300px]">
          {data.map((bar, i) => {
            const total = bar.hadir + bar.izin + bar.sakit + bar.tanpa;
            const value = total > 0 ? (bar.hadir / total) * 100 : 0;
            const isWednesday = bar.day === "Rab";

            return (
              <div
                key={i}
                className="flex flex-col items-center justify-end w-[30px] sm:w-[40px] md:w-[50px]"
              >
                <div
                  className={`relative w-full rounded-lg md:rounded-[10px] ${
                    isWednesday
                      ? "bg-gradient-to-b from-[#4aa3c0] to-[#3b82a0] shadow-[0_0_8px_rgba(58,139,164,0.4)] sm:shadow-[0_0_12px_rgba(58,139,164,0.4)]"
                      : "bg-gradient-to-b from-[#b8e0ed] to-[#84c3d7] shadow-[0_1px_2px_rgba(0,0,0,0.08)] sm:shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
                  }`}
                  style={{
                    height: `${value * 1.8}px`,
                    maxHeight: "160px",
                  }}
                >
                  <span
                    className={`absolute -top-[18px] sm:-top-[22px] left-1/2 -translate-x-1/2 text-xs sm:text-[13px] font-semibold ${
                      isWednesday ? "text-[#1e3a52]" : "text-slate-600"
                    }`}
                  >
                    {Math.round(value)}%
                  </span>
                </div>

                <div className="mt-2 sm:mt-3 text-center leading-[1.2]">
                  <span
                    className={`block text-xs sm:text-sm ${
                      isWednesday
                        ? "font-bold text-[#1e3a52]"
                        : "font-semibold text-slate-700"
                    }`}
                  >
                    {bar.day}
                  </span>
                  <span className="block text-[10px] sm:text-[11px] text-slate-400">
                    {bar.date}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* === KANAN: TABEL === */}
      <Card className="rounded-xl md:rounded-2xl border border-slate-200 shadow-sm bg-white p-4 md:p-6 px-5 md:px-7">
        {/* Desktop Table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full border border-slate-200 rounded-lg overflow-hidden text-center text-xs sm:text-[13px]">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-2 sm:p-2.5">No</th>
                <th className="p-2 sm:p-2.5">Hari / Tanggal</th>
                <th className="p-2 sm:p-2.5 text-green-600">Hadir</th>
                <th className="p-2 sm:p-2.5 text-yellow-500">Izin</th>
                <th className="p-2 sm:p-2.5 text-blue-500">Sakit</th>
                <th className="p-2 sm:p-2.5 text-red-600">Tanpa Ket.</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-slate-50"
                  } border-b border-slate-200`}
                >
                  <td className="p-2 sm:p-2">{index + 1}</td>
                  <td className="p-2 sm:p-2">
                    {row.day}, {row.date}
                  </td>
                  <td className="p-2 sm:p-2 text-green-600">{row.hadir}</td>
                  <td className="p-2 sm:p-2 text-yellow-500">{row.izin}</td>
                  <td className="p-2 sm:p-2 text-blue-500">{row.sakit}</td>
                  <td className="p-2 sm:p-2 text-red-600">{row.tanpa}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="sm:hidden space-y-3">
          {data.map((row, index) => (
            <div
              key={index}
              className="border border-slate-200 rounded-lg p-3 hover:bg-slate-50"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-slate-500">#{index + 1}</span>
                  <span className="font-semibold text-slate-700 text-sm">
                    {row.day}
                  </span>
                </div>
                <span className="text-xs text-slate-500">{row.date}</span>
              </div>
              
              <div className="grid grid-cols-4 gap-2 text-xs">
                <div className="text-center">
                  <div className="text-green-600 font-bold">{row.hadir}</div>
                  <div className="text-slate-400">Hadir</div>
                </div>
                <div className="text-center">
                  <div className="text-yellow-500 font-bold">{row.izin}</div>
                  <div className="text-slate-400">Izin</div>
                </div>
                <div className="text-center">
                  <div className="text-blue-500 font-bold">{row.sakit}</div>
                  <div className="text-slate-400">Sakit</div>
                </div>
                <div className="text-center">
                  <div className="text-red-600 font-bold">{row.tanpa}</div>
                  <div className="text-slate-400">TK</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}