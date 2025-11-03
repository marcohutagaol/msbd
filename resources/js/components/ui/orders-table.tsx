"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Pencil,
  CheckCircle,
  XCircle,
  Clock,
  ArrowRight,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AddOrderModal from "./add-order-modal";
import { useIsMobile } from "@/hooks/use-mobile";
import { router } from "@inertiajs/react";

export interface Order {
  id: string;
  namaBarang: string;
  departemen: string;
  jumlahBarang: number;
  satuan: string;
  catatan: string;
  status: "diterima" | "ditolak" | "ditunda";
}

// ✅ Data dummy awal
const sampleOrders: Order[] = [
  {
    id: "ORD-001",
    namaBarang: "Kertas A4",
    departemen: "Administrasi",
    jumlahBarang: 10,
    satuan: "Rim",
    catatan: "Untuk stok bulan ini",
    status: "ditunda",
  },
  {
    id: "ORD-002",
    namaBarang: "Pulpen Hitam",
    departemen: "Keuangan",
    jumlahBarang: 50,
    satuan: "Pcs",
    catatan: "Kebutuhan harian",
    status: "ditunda",
  },
  {
    id: "ORD-003",
    namaBarang: "Mouse Wireless",
    departemen: "IT",
    jumlahBarang: 5,
    satuan: "Unit",
    catatan: "Penggantian perangkat rusak",
    status: "ditunda",
  },
];

const ITEMS_PER_PAGE = 8;

export default function OrdersTable({
  onApproveStatusChange,
}: {
  onApproveStatusChange?: () => void; // ✅ panggil dari parent untuk ubah timeline
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orders, setOrders] = useState<Order[]>(sampleOrders);
  const isMobile = useIsMobile();

  const totalPages = Math.ceil(orders.length / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedOrders = orders.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  const handleStatusChange = (id: string, newStatus: Order["status"]) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  const handleApproveAll = () => {
    setOrders((prev) =>
      prev.map((order) => ({ ...order, status: "diterima" }))
    );
    alert("✅ Semua pesanan di halaman ini telah disetujui.");
    onApproveStatusChange?.(); // ✅ update timeline ke “Approve”
  };

  const handleGoToPricePage = () => {
    router.visit("/input-price"); // ✅ timeline otomatis akan ganti ke “Purchasing”
  };

  return (
    <main className="min-h-screen bg-white p-6 font-[Poppins] text-gray-800">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="h-3 w-3 rounded-full bg-blue-600 shadow-lg shadow-blue-600/40" />
            <h1 className="text-3xl font-bold tracking-tight text-gray-800">
              Purchasing
            </h1>
          </div>

          <Button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-md shadow-blue-600/30 transition-all duration-300"
          >
            <Plus className="h-4 w-4" />
            Add Order
          </Button>
        </div>

        {/* Table / Card Section */}
        <div className="rounded-lg border-2 border-blue-400 bg-white p-4 shadow-sm">
          {!isMobile ? (
            // 🖥 DESKTOP TABLE
            <div className="overflow-x-auto rounded-xl">
              <table className="w-full">
                <thead className="bg-blue-50 border-b border-blue-200">
                  <tr>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-slate-700">
                      ID
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-slate-700">
                      Nama Barang
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-slate-700">
                      Departemen
                    </th>
                    <th className="py-3 px-4 text-center text-sm font-semibold text-slate-700">
                      Jumlah
                    </th>
                    <th className="py-3 px-4 text-center text-sm font-semibold text-slate-700">
                      Satuan
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-slate-700">
                      Catatan
                    </th>
                    <th className="py-3 px-4 text-center text-sm font-semibold text-slate-700">
                      Status
                    </th>
                    <th className="py-3 px-4 text-center text-sm font-semibold text-slate-700">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedOrders.map((order, index) => (
                    <tr
                      key={order.id}
                      className={`border-b border-blue-100 ${
                        index % 2 === 0 ? "bg-white" : "bg-slate-50"
                      } hover:bg-blue-50 transition-colors`}
                    >
                      <td className="py-3 px-4 text-gray-600 font-medium">
                        {order.id}
                      </td>
                      <td className="py-3 px-4 font-semibold text-gray-800">
                        {order.namaBarang}
                      </td>
                      <td className="py-3 px-4 text-gray-700">
                        {order.departemen}
                      </td>
                      <td className="py-3 px-4 text-center font-semibold text-gray-800">
                        {order.jumlahBarang}
                      </td>
                      <td className="py-3 px-4 text-center text-gray-800">
                        {order.satuan}
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {order.catatan}
                      </td>

                      <td className="py-3 px-4 text-center">
                        <span
                          className={`px-3 py-1 text-xs font-semibold rounded-full border shadow-sm ${
                            order.status === "diterima"
                              ? "bg-green-100 text-green-700 border-green-300"
                              : order.status === "ditolak"
                              ? "bg-red-100 text-red-700 border-red-300"
                              : "bg-yellow-100 text-yellow-700 border-yellow-300"
                          }`}
                        >
                          {order.status.charAt(0).toUpperCase() +
                            order.status.slice(1)}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-blue-600 hover:bg-blue-100 hover:scale-110 shadow-sm hover:shadow-blue-200 transition-all duration-300"
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="min-w-[140px] rounded-lg shadow-lg border border-blue-100 bg-white">
                            <DropdownMenuItem
                              onClick={() =>
                                handleStatusChange(order.id, "diterima")
                              }
                              className="flex items-center gap-2 text-green-700 hover:bg-green-50 hover:text-green-800 font-medium"
                            >
                              <CheckCircle className="h-4 w-4" />
                              Diterima
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleStatusChange(order.id, "ditolak")
                              }
                              className="flex items-center gap-2 text-red-700 hover:bg-red-50 hover:text-red-800 font-medium"
                            >
                              <XCircle className="h-4 w-4" />
                              Ditolak
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleStatusChange(order.id, "ditunda")
                              }
                              className="flex items-center gap-2 text-yellow-700 hover:bg-yellow-50 hover:text-yellow-800 font-medium"
                            >
                              <Clock className="h-4 w-4" />
                              Ditunda
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            // 📱 MOBILE VIEW
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="rounded-xl border border-blue-200 bg-white p-5 space-y-3 hover:shadow-md hover:border-blue-400 transition-all duration-300"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-gray-800 text-base">
                        {order.namaBarang}
                      </p>
                      <p className="text-xs text-gray-500">
                        {order.departemen}
                      </p>
                    </div>
                    <button className="p-2 text-gray-500 hover:text-blue-600 transition">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 text-sm gap-y-2">
                    <p className="text-gray-500 text-[11px] font-medium uppercase">
                      Jumlah
                    </p>
                    <p className="text-gray-700 font-semibold">
                      {order.jumlahBarang} {order.satuan}
                    </p>
                    <p className="text-gray-500 text-[11px] font-medium uppercase">
                      Catatan
                    </p>
                    <p className="text-gray-700 italic">{order.catatan}</p>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-blue-100">
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full border ${
                        order.status === "diterima"
                          ? "bg-green-100 text-green-700 border-green-300"
                          : order.status === "ditolak"
                          ? "bg-red-100 text-red-700 border-red-300"
                          : "bg-yellow-100 text-yellow-700 border-yellow-300"
                      }`}
                    >
                      {order.status}
                    </span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-blue-600 hover:bg-blue-100 transition"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="min-w-[120px] rounded-lg border border-blue-100 shadow-md bg-white">
                        <DropdownMenuItem
                          onClick={() =>
                            handleStatusChange(order.id, "diterima")
                          }
                          className="text-green-700 hover:bg-green-50"
                        >
                          Diterima
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            handleStatusChange(order.id, "ditolak")
                          }
                          className="text-red-700 hover:bg-red-50"
                        >
                          Ditolak
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            handleStatusChange(order.id, "ditunda")
                          }
                          className="text-yellow-700 hover:bg-yellow-50"
                        >
                          Ditunda
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Buttons */}
        <div className="flex justify-end gap-3 flex-wrap">
          <Button
            onClick={handleApproveAll}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-7 py-2 rounded-lg shadow-md shadow-green-600/30 transition-all duration-300"
          >
            <CheckCircle className="h-4 w-4" />
            APPROVE
          </Button>
          <Button
            onClick={handleGoToPricePage}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-7 py-2 rounded-lg shadow-md shadow-blue-600/30 transition-all duration-300"
          >
            INPUT PRICE
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`h-10 w-10 rounded-lg font-medium border transition-all duration-300 ${
                  currentPage === i + 1
                    ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/40 scale-105"
                    : "border-blue-200 bg-white text-gray-600 hover:border-blue-400 hover:bg-blue-50"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="gap-2 bg-white hover:bg-blue-50 border border-blue-300 text-gray-600 hover:text-blue-600 transition-all duration-300 disabled:opacity-50"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Previous</span>
            </Button>
            <Button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="gap-2 bg-white hover:bg-blue-50 border border-blue-300 text-gray-600 hover:text-blue-600 transition-all duration-300 disabled:opacity-50"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <AddOrderModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAdd={() => setIsModalOpen(false)}
        />
      </div>
    </main>
  );
}
