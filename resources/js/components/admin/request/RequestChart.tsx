"use client";

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
import { Card } from "@/components/ui/card";

// Data dengan hari dan tanggal (simulasi minggu ini)
const data = [
  { day: "Sen", date: "03 Nov", total: 20 },
  { day: "Sel", date: "04 Nov", total: 15 },
  { day: "Rab", date: "05 Nov", total: 30 },
  { day: "Kam", date: "06 Nov", total: 25 },
  { day: "Jum", date: "07 Nov", total: 40 },
  { day: "Sab", date: "08 Nov", total: 22 },
  { day: "Min", date: "09 Nov", total: 18 },
];

// Custom tooltip
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const { day, date } = payload[0].payload;
    return (
      <div className="bg-white border border-slate-200 rounded-lg shadow-md px-3 py-2 text-sm">
        <p className="font-medium text-slate-700">{`${day}, ${date}`}</p>
        <p className="text-[#3b82a0] font-semibold">
          {payload[0].value} Request
        </p>
      </div>
    );
  }
  return null;
};

export default function RequestChart() {
  return (
    <Card className="p-6  from-white to-[#f0f8fa] rounded-2xl shadow-sm border border-slate-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-slate-800">
          Aktivitas Permintaan Mingguan
        </h2>
        <p className="text-sm text-slate-500">3 - 9 November</p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 20, left: 0, bottom: 30 }}
        >
          <defs>
            {/* Warna gradasi biru lembut untuk semua batang */}
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
              const dayData = data.find((d) => d.day === payload.value);
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

          {/* Semua batang sama warnanya */}
          <Bar dataKey="total" radius={[12, 12, 0, 0]} barSize={50}>
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill="url(#barDefault)" />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}