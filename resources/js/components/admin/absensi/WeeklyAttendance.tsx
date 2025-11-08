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
    <div className="grid grid-cols-2 gap-5">
      {/* === KIRI: BAR CHART === */}
      <Card className="rounded-2xl border border-slate-200 shadow-sm bg-white p-6 px-7 flex justify-center items-center">
        <div className="flex justify-between items-end h-[300px] w-full">
          {data.map((bar, i) => {
            const total = bar.hadir + bar.izin + bar.sakit + bar.tanpa;
            const value = total > 0 ? (bar.hadir / total) * 100 : 0;
            const isWednesday = bar.day === "Rab";

            return (
              <div
                key={i}
                className="flex flex-col items-center justify-end w-[50px]"
              >
                <div
                  className={`relative w-full rounded-[10px] ${
                    isWednesday
                      ? "bg-linear-to-b from-[#4aa3c0] to-[#3b82a0] shadow-[0_0_12px_rgba(58,139,164,0.4)]"
                      : "bg-linear-to-b from-[#b8e0ed] to-[#84c3d7] shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
                  }`}
                  style={{
                    height: `${value * 2.5}px`,
                    maxHeight: "240px",
                  }}
                >
                  <span
                    className={`absolute -top-[22px] left-1/2 -translate-x-1/2 text-[13px] font-semibold ${
                      isWednesday ? "text-[#1e3a52]" : "text-slate-600"
                    }`}
                  >
                    {Math.round(value)}%
                  </span>
                </div>

                <div className="mt-3 text-center leading-[1.2]">
                  <span
                    className={`block text-[14px] ${
                      isWednesday
                        ? "font-bold text-[#1e3a52]"
                        : "font-semibold text-slate-700"
                    }`}
                  >
                    {bar.day}
                  </span>
                  <span className="block text-[11px] text-slate-400">
                    {bar.date}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* === KANAN: TABEL === */}
      <Card className="rounded-2xl border border-slate-200 shadow-sm bg-white p-6 px-7">
        <table className="w-full border border-slate-200 rounded-lg overflow-hidden text-center text-[13px]">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-2.5">No</th>
              <th className="p-2.5">Hari / Tanggal</th>
              <th className="p-2.5 text-green-600">Hadir</th>
              <th className="p-2.5 text-yellow-500">Izin</th>
              <th className="p-2.5 text-blue-500">Sakit</th>
              <th className="p-2.5 text-red-600">Tanpa Ket.</th>
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
                <td className="p-2">{index + 1}</td>
                <td className="p-2">
                  {row.day}, {row.date}
                </td>
                <td className="p-2 text-green-600">{row.hadir}</td>
                <td className="p-2 text-yellow-500">{row.izin}</td>
                <td className="p-2 text-blue-500">{row.sakit}</td>
                <td className="p-2 text-red-600">{row.tanpa}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
