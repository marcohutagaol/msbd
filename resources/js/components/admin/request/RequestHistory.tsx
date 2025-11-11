"use client";

import { Card } from "@/components/ui/card";

const histories = [
  { id: 1, item: "Printer", dept: "IT", date: "2025-11-02", status: "Barang diterima" },
  { id: 2, item: "Kertas A4", dept: "HRD", date: "2025-11-03", status: "Pembelian selesai" },
  { id: 3, item: "Laptop", dept: "Finance", date: "2025-11-04", status: "Diterima gudang" },
];

export default function RequestHistory() {
  return (
    <Card className="rounded-2xl border border-slate-200 shadow-sm bg-white p-6 px-7">
      <h2 className="text-lg font-semibold mb-4 text-slate-800">
        Riwayat Pembelian Barang
      </h2>
      <table className="w-full border border-slate-200 rounded-lg overflow-hidden text-center text-[13px]">
        <thead className="bg-slate-100 text-slate-700">
          <tr>
            <th className="p-2.5 font-medium">No</th>
            <th className="p-2.5 font-medium">Nama Barang</th>
            <th className="p-2.5 font-medium">Departemen</th>
            <th className="p-2.5 font-medium">Tanggal</th>
            <th className="p-2.5 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {histories.map((h, index) => (
            <tr
              key={h.id}
              className={`${
                index % 2 === 0 ? "bg-white" : "bg-slate-50"
              } border-b border-slate-200 transition-colors hover:bg-slate-100`}
            >
              <td className="p-2">{index + 1}</td>
              <td className="p-2 text-slate-700">{h.item}</td>
              <td className="p-2 text-slate-600">{h.dept}</td>
              <td className="p-2 text-slate-500">{h.date}</td>
              <td className="p-2 text-green-600 font-medium">{h.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}