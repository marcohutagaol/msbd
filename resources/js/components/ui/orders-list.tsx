"use client"

import { useState, useEffect } from "react"
import { Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

interface OrderItem {
  id: number
  name: string
  subtitle: string
  quantity: number
  satuan: string
  catatan: string
  status?: "diterima" | "ditolak" | "ditunda"
  harga: number
  tipeHarga?: "Per Unit" | "Per Paket"
}

const ordersData: OrderItem[] = [
  {
    id: 1,
    name: "Wireless Earbuds Pro",
    subtitle: "(10)",
    quantity: 5,
    satuan: "Unit",
    harga : 2000,
    catatan: "Untuk divisi IT",
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    subtitle: "(10)",
    quantity: 4,
    satuan: "Pcs",
    harga : 2000,

    catatan: "Kebutuhan kantor pusat",
    status: "diterima",
  },
  {
    id: 3,
    name: "Portable Blender",
    subtitle: "",
    quantity: 1,
    satuan: "Unit",
    harga : 2000,
    catatan: "Demo produk",
    status: "ditolak",
  },
]

export function OrdersList({
  mode = "default",
  disabled = false,
}: {
  mode?: "default" | "monitoring" | "price"
  disabled?: boolean
}) {
  const [isMobile, setIsMobile] = useState(false)
  const [orders, setOrders] = useState<OrderItem[]>(() =>
    ordersData.map((order) => ({
      ...order,
      status: order.status ?? "ditunda",
      harga: order.harga ?? 0,
      tipeHarga: order.tipeHarga ?? "Per Unit",
    }))
  )

  // Modal states
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null)
  const [editValues, setEditValues] = useState({ quantity: 0, catatan: "" })

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768)
    checkScreen()
    window.addEventListener("resize", checkScreen)
    return () => window.removeEventListener("resize", checkScreen)
  }, [])

  const StatusBadge = ({ status }: { status: NonNullable<OrderItem["status"]> }) => {
    const base =
      "inline-flex justify-center items-center min-w-[90px] h-7 px-3 text-xs font-semibold rounded-full border uppercase tracking-wide"
    const color =
      status === "diterima"
        ? "bg-green-100 text-green-700 border-green-300"
        : status === "ditolak"
        ? "bg-red-100 text-red-700 border-red-300"
        : "bg-yellow-100 text-yellow-700 border-yellow-300"
    return <span className={`${base} ${color}`}>{status}</span>
  }

  const handleEditClick = (order: OrderItem) => {
    setSelectedOrder(order)
    setEditValues({ quantity: order.quantity, catatan: order.catatan })
    setIsEditOpen(true)
  }

  const handleDeleteClick = (order: OrderItem) => {
    setSelectedOrder(order)
    setIsDeleteOpen(true)
  }

  const handleEditSave = () => {
    if (!selectedOrder) return
    setOrders((prev) =>
      prev.map((o) =>
        o.id === selectedOrder.id
          ? { ...o, quantity: editValues.quantity, catatan: editValues.catatan }
          : o
      )
    )
    setIsEditOpen(false)
  }

  const handleDeleteConfirm = () => {
    if (!selectedOrder) return
    setOrders((prev) => prev.filter((o) => o.id !== selectedOrder.id))
    setIsDeleteOpen(false)
  }

  const ActionButtons = ({ order }: { order: OrderItem }) => (
    <div className="flex items-center justify-center gap-3 mt-5 sm:mt-0 pl-3">

      <Button
        variant="ghost"
        size="icon"
        className="text-blue-600 bg-blue-50 hover:bg-blue-100 hover:scale-110 transition-all duration-300"
        onClick={() => handleEditClick(order)}
        disabled={disabled}
      >
        <Pencil className="w-4 h-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="text-red-600 bg-red-50 hover:bg-red-100 hover:scale-110 transition-all duration-300"
        onClick={() => handleDeleteClick(order)}
        disabled={disabled}
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  )

  // 📱 MOBILE VIEW
  if (isMobile) {
    return (
      <div className="space-y-4 font-[Poppins]">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border border-blue-100 rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-base font-semibold text-slate-900">
                  {order.name}
                </h3>
                {order.subtitle && (
                  <p className="text-sm text-slate-500">{order.subtitle}</p>
                )}
              </div>
              {mode === "monitoring" && (
                <StatusBadge status={order.status ?? "ditunda"} />
              )}
            </div>

            <div className="mt-3 space-y-1 text-sm text-slate-700">
              <p>
                <span className="font-medium">Quantity:</span> {order.quantity}{" "}
                {order.satuan}
              </p>
              <p>
                <span className="font-medium">Catatan:</span> {order.catatan || "-"}
              </p>
            </div>

            {mode !== "price" && <ActionButtons order={order} />}
          </div>
        ))}
      </div>
    )
  }

  // 💻 DESKTOP TABLE VIEW
  return (
    <>
      <div className="font-[Poppins] overflow-x-auto rounded-lg border border-blue-100">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-blue-200 bg-blue-50/30">
              <th className="text-left py-4 px-4 text-sm font-semibold text-slate-700">
                Product Name
              </th>
              <th className="text-center py-4 px-4 text-sm font-semibold text-slate-700">
                Quantity
              </th>
              <th className="text-center py-4 px-4 text-sm font-semibold text-slate-700">
                Satuan
              </th>
              <th className="text-left py-4 px-4 text-sm font-semibold text-slate-700">
                Catatan
              </th>
               <th className="text-left py-4 px-4 text-sm font-semibold text-slate-700">
                Harga
              </th>
              <th className="text-center py-4 px-4 text-sm font-semibold text-slate-700">
                {mode === "monitoring" ? "Status" : "Aksi"}
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr
                key={order.id}
                className={`border-b border-blue-100 ${
                  index % 2 === 0 ? "bg-white" : "bg-slate-50"
                } hover:bg-blue-50 transition-colors`}
              >
                <td className="py-4 px-4">
                  <p className="font-medium text-slate-900">{order.name}</p>
                  {order.subtitle && (
                    <p className="text-sm text-slate-500">{order.subtitle}</p>
                  )}
                </td>
                <td className="py-4 px-4 text-center font-medium text-slate-900">
                  {order.quantity}
                </td>
                <td className="py-4 px-4 text-center text-slate-900">
                  {order.satuan}
                </td>
                <td className="py-4 px-4 text-slate-700">{order.catatan}</td>
                <td className="py-4 px-4 text-slate-700">{order.harga}</td>

                <td className="py-4 px-4 text-center">
                  {mode === "monitoring" ? (
                    <StatusBadge status={order.status ?? "ditunda"} />
                  ) : (
                    <ActionButtons order={order} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🟦 Popup Edit */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-md rounded-xl border border-blue-100 shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-slate-900">
              Edit Item
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-slate-600 mb-1">Quantity</label>
              <input
                type="number"
                value={editValues.quantity}
                onChange={(e) =>
                  setEditValues({ ...editValues, quantity: Number(e.target.value) })
                }
                className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-1">Catatan</label>
              <textarea
                value={editValues.catatan}
                onChange={(e) =>
                  setEditValues({ ...editValues, catatan: e.target.value })
                }
                rows={3}
                className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
          <DialogFooter className="flex justify-end gap-3 mt-4">
            <Button
              variant="outline"
              onClick={() => setIsEditOpen(false)}
              className="border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              Batal
            </Button>
            <Button
              onClick={handleEditSave}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              Simpan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 🟥 Popup Delete */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="max-w-sm rounded-xl border border-red-100 shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-red-700">
              Hapus Item
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm text-slate-600">
            Apakah Anda yakin ingin menghapus{" "}
            <span className="font-semibold text-slate-900">
              {selectedOrder?.name}
            </span>{" "}
            dari daftar?
          </p>
          <DialogFooter className="flex justify-end gap-3 mt-4">
            <Button
              variant="outline"
              onClick={() => setIsDeleteOpen(false)}
              className="border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              Batal
            </Button>
            <Button
              onClick={handleDeleteConfirm}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
