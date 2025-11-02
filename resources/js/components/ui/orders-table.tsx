"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import OrdersTableDesktop from "./orders-table-desktop"
import OrdersTableMobile from "./orders-table-mobile"
import AddOrderModal from "./add-order-modal"
import { useIsMobile } from "@/hooks/use-mobile"

export interface Order {
  id: string
  namaBarang: string
  departemen: string
  jumlahBarang: number
  satuan: string
  catatan: string
  status: "completed" | "pending" | "cancelled" | "published"
}

const sampleOrders: Order[] = [
  {
    id: "ORD-001",
    namaBarang: "Kertas A4",
    departemen: "Administrasi",
    jumlahBarang: 10,
    satuan: "Rim",
    catatan: "Untuk stok bulan ini",
    status: "completed",
  },
  {
    id: "ORD-002",
    namaBarang: "Pulpen Hitam",
    departemen: "Keuangan",
    jumlahBarang: 50,
    satuan: "Pcs",
    catatan: "Kebutuhan harian",
    status: "pending",
  },
  {
    id: "ORD-003",
    namaBarang: "Mouse Wireless",
    departemen: "IT",
    jumlahBarang: 5,
    satuan: "Unit",
    catatan: "Penggantian perangkat rusak",
    status: "published",
  },
  {
    id: "ORD-004",
    namaBarang: "Toner Printer",
    departemen: "HRD",
    jumlahBarang: 2,
    satuan: "Botol",
    catatan: "Untuk printer lantai 2",
    status: "cancelled",
  },
  {
    id: "ORD-005",
    namaBarang: "Amplop Coklat",
    departemen: "Administrasi",
    jumlahBarang: 100,
    satuan: "Pcs",
    catatan: "Surat keluar",
    status: "completed",
  },
]

const ITEMS_PER_PAGE = 8

export default function OrdersTable() {
  const [currentPage, setCurrentPage] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const isMobile = useIsMobile()

  const totalPages = Math.ceil(sampleOrders.length / ITEMS_PER_PAGE)
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedOrders = sampleOrders.slice(startIdx, startIdx + ITEMS_PER_PAGE)

  return (
    <div className="space-y-8 font-[Poppins] text-gray-800">
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

      {/* Table Section */}
      <div className="relative overflow-hidden rounded-2xl border border-blue-200 bg-white shadow-md">
        {isMobile ? (
          <OrdersTableMobile orders={paginatedOrders} />
        ) : (
          <OrdersTableDesktop orders={paginatedOrders} />
        )}
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
  )
}
