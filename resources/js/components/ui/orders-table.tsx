"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Pencil,
  CheckCircle,
  XCircle,
  Clock,
  ArrowRight,
  MoreHorizontal,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { router, usePage } from "@inertiajs/react";

export interface Order {
  id: string;
  request_id: string;
  request_number: string;
  namaBarang: string;
  departemen: string;
  jumlahBarang: number;
  satuan: string;
  catatan: string;
  status: "diterima" | "ditolak" | "ditunda";
}

const ITEMS_PER_PAGE = 8;

export default function OrdersTable({
  onApproveStatusChange,
}: {
  onApproveStatusChange?: () => void;
}) {
  const { props } = usePage();
  const { orders, department, request_number, stats } = props as any;

  
  const [currentPage, setCurrentPage] = useState(1);
  const [orderList, setOrderList] = useState<Order[]>(orders || []);
  const [isApproving, setIsApproving] = useState(false);
  const isMobile = useIsMobile();

  const totalPages = Math.ceil(orderList.length / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedOrders = orderList.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  // Map status dari bahasa Indonesia ke English untuk API
  const mapStatusToEnglish = (status: string) => {
    const statusMap: Record<string, string> = {
      'diterima': 'Approved',
      'ditolak': 'Rejected',
      'ditunda': 'Pending'
    };
    return statusMap[status] || 'Pending';
  };

  // Update status individual item
  const handleStatusChange = async (id: string, newStatus: Order["status"]) => {
    // Update UI optimistically
    setOrderList((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );

    // Send to backend
    try {
      await router.post(`/purchasing-detail/item/${id}/update-status`, {
        status: mapStatusToEnglish(newStatus)
      }, {
        preserveScroll: true,
        onError: (errors) => {
          console.error('Error updating status:', errors);
          // Revert on error
          setOrderList(orders);
        }
      });
    } catch (error) {
      console.error('Failed to update status:', error);
      // Revert on error
      setOrderList(orders);
    }
  };

  // Approve all items
  const handleApproveAll = async () => {
    if (isApproving) return;
    
    setIsApproving(true);
    
    try {
    await router.post(`/purchasing-detail/${request_number}/approve-all`, {}, {

        preserveScroll: true,
        onSuccess: () => {
          // Update local state
          setOrderList((prev) =>
            prev.map((order) => ({ ...order, status: "diterima" }))
          );
          onApproveStatusChange?.();
          
          // Show success message
          alert("✅ Semua pesanan pending telah disetujui!");
        },
        onError: (errors) => {
          console.error('Error approving all:', errors);
          alert("❌ Gagal menyetujui pesanan. Silakan coba lagi.");
        },
        onFinish: () => {
          setIsApproving(false);
        }
      });
    } catch (error) {
      console.error('Failed to approve all:', error);
      alert("❌ Terjadi kesalahan. Silakan coba lagi.");
      setIsApproving(false);
    }
  };

  const handleGoToPricePage = () => {
  if (!orderList.length) return;

  const requestNumber = orderList[0].request_number;
  router.visit(`/input-price/${requestNumber}`);
};


  const handleBack = () => {
    router.visit("/dashboard-purchasing");
  };

  return (
    <main className="min-h-screen bg-white p-6 font-[Poppins] text-gray-800">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Button
              onClick={handleBack}
              variant="ghost"
              className="p-2 hover:bg-blue-50"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-blue-600 shadow-lg shadow-blue-600/40" />
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-gray-800">
                  {department || 'Purchasing'}
                </h1>
                {stats && (
                  <p className="text-sm text-gray-600 mt-1">
                    Total: {stats.total_items} items • 
                    Pending: {stats.pending_count} • 
                    Approved: {stats.approved_count} • 
                    Rejected: {stats.rejected_count}
                  </p>
                )}
              </div>
            </div>
          </div>
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
                      Request Number
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-slate-700">
                      Nama Barang
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
                        {order.request_number}
                      </td>
                      <td className="py-3 px-4 font-semibold text-gray-800">
                        {order.namaBarang}
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
              {paginatedOrders.map((order) => (
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
                        {order.request_number}
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
            disabled={isApproving}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-7 py-2 rounded-lg shadow-md shadow-green-600/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <CheckCircle className="h-4 w-4" />
            {isApproving ? 'APPROVING...' : 'APPROVE ALL'}
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
        {orderList.length > 0 && (
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
        )}

        {orderList.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Tidak ada data untuk departemen ini.
          </div>
        )}
      </div>
    </main>
  );
}