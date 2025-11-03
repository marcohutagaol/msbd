"use client";

import { Card } from "@/components/ui/card";

export default function WeeklyAttendance() {
  const data = [
    { day: "Sen", date: "14 Okt", hadir: 30, izin: 2, sakit: 1, tanpa: 0 },
    { day: "Sel", date: "15 Okt", hadir: 28, izin: 3, sakit: 2, tanpa: 1 },
    { day: "Rab", date: "16 Okt", hadir: 32, izin: 1, sakit: 0, tanpa: 0 },
    { day: "Kam", date: "17 Okt", hadir: 27, izin: 4, sakit: 1, tanpa: 1 },
    { day: "Jum", date: "18 Okt", hadir: 29, izin: 2, sakit: 2, tanpa: 0 },
    { day: "Sab", date: "19 Okt", hadir: 31, izin: 1, sakit: 0, tanpa: 1 },
    { day: "Min", date: "20 Okt", hadir: 25, izin: 2, sakit: 3, tanpa: 2 },
  ];

  return (
    <div className="grid grid-cols-2 gap-5">
      {/* === KIRI: BAR CHART === */}
      <Card className="rounded-2xl border border-slate-200 shadow-sm bg-white p-6 px-7 flex justify-center items-center">
        <div className="flex justify-between items-end h-[300px] w-full">
          {data.map((bar, i) => {
            const value = (bar.hadir / 35) * 100;
            const isWednesday = bar.day === "Rab";
            return (
              <div
                key={i}
                className="flex flex-col items-center justify-end w-[50px]"
              >
                <div
                  className={`relative w-full rounded-[10px] ${
                    isWednesday
                      ? "bg-gradient-to-b from-[#4aa3c0] to-[#3b82a0] shadow-[0_0_12px_rgba(58,139,164,0.4)]"
                      : "bg-gradient-to-b from-[#b8e0ed] to-[#84c3d7] shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
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
              <th className="p-2.5">Hadir</th>
              <th className="p-2.5">Izin</th>
              <th className="p-2.5">Sakit</th>
              <th className="p-2.5">Tanpa Ket.</th>
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
