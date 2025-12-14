"use client";

import { Card } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { useState } from "react";

const requests = [
  { id: 1, item: "Printer", dept: "IT", qty: 2, status: "Pending" },
  { id: 2, item: "Kertas A4", dept: "HRD", qty: 10, status: "Approved" },
  { id: 3, item: "Laptop", dept: "Finance", qty: 1, status: "In Process" },
];

export default function RequestTable() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filteredData = requests.filter((r) => {
    const matchDept = filter === "All" || r.dept === filter;
    const matchSearch = r.item.toLowerCase().includes(search.toLowerCase());
    return matchDept && matchSearch;
  });

  return (
    <Card className="rounded-2xl border border-slate-200 shadow-sm bg-white p-6 px-7">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-slate-800">
          Daftar Request Item
        </h2>

        <div className="flex items-center gap-3">
          {/* Filter Departemen */}
          <Select onValueChange={setFilter}>
            <SelectTrigger className="w-[150px] h-9 border-slate-300 focus:ring-2 focus:ring-sky-300">
              <SelectValue placeholder="Filter Departemen" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">Semua</SelectItem>
              <SelectItem value="IT">IT</SelectItem>
              <SelectItem value="HRD">HRD</SelectItem>
              <SelectItem value="Finance">Finance</SelectItem>
            </SelectContent>
          </Select>

          {/* Pencarian */}
          <div className="relative">
            <Search className="absolute left-2 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Cari item..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 pr-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
            />
          </div>
        </div>
      </div>

      {/* Tabel */}
      <table className="w-full border border-slate-200 rounded-lg overflow-hidden text-center text-[13px]">
        <thead className="bg-slate-100 text-slate-700">
          <tr>
            <th className="p-2.5 font-medium">No</th>
            <th className="p-2.5 font-medium">Item</th>
            <th className="p-2.5 font-medium">Departemen</th>
            <th className="p-2.5 font-medium">Jumlah</th>
            <th className="p-2.5 font-medium">Status</th>
          </tr>
        </thead>

        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((r, index) => (
              <tr
                key={r.id}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-slate-50"
                } border-b border-slate-200 transition-colors hover:bg-slate-100`}
              >
                <td className="p-2">{index + 1}</td>
                <td className="p-2 text-slate-700">{r.item}</td>
                <td className="p-2 text-slate-600">{r.dept}</td>
                <td className="p-2 text-slate-600">{r.qty}</td>
                <td className="p-2">
                  <span
                    className={`px-2 py-1 text-xs rounded-full font-medium ${
                      r.status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : r.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {r.status}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={5}
                className="p-4 text-slate-500 text-sm text-center bg-slate-50"
              >
                Tidak ada data ditemukan.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </Card>
  );
}
