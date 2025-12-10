"use client"

import { useState, useEffect } from "react"
import { Pencil, Trash2, Package, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { router } from "@inertiajs/react"

interface OrderItem {
  id: number
  kode_barang?: string
  nama_barang: string
  jumlah_diajukan: number
  jumlah_disetujui?: number
  satuan: string
  catatan?: string
  status: "Pending" | "Approved" | "Rejected" | "Completed" | "Arrived"
  harga?: number
  request?: {
    id: number
    department: string
    request_date: string
    notes?: string
  }
}

interface OrdersListProps {
  mode?: "default" | "monitoring" | "price"
  disabled?: boolean
  orders?: OrderItem[]
  onMarkArrived?: (itemId: number) => void
  onPriceUpdate?: (itemId: number, harga: number) => void // ✅ TAMBAHKAN INI
  showArrivedButton?: boolean
}


export function OrdersList({
  mode = "default",
  disabled = false,
  orders = [],
  onMarkArrived,
  onPriceUpdate,   
  showArrivedButton = false
}: OrdersListProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [localOrders, setLocalOrders] = useState<OrderItem[]>(orders)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isPriceOpen, setIsPriceOpen] = useState(false)
  const [isArrivedOpen, setIsArrivedOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null)
  const [editValues, setEditValues] = useState({
    jumlah_diajukan: 0,
    catatan: "",
  })
  const [priceValue, setPriceValue] = useState("")
  const [displayPrice, setDisplayPrice] = useState("")

  // Update localOrders ketika props orders berubah
  useEffect(() => {
    setLocalOrders(orders)
  }, [orders])

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768)
    checkScreen()
    window.addEventListener("resize", checkScreen)
    return () => window.removeEventListener("resize", checkScreen)
  }, [])

  const StatusBadge = ({ status }: { status: OrderItem["status"] }) => {
    const base = "inline-flex justify-center items-center min-w-[90px] h-7 px-3 text-xs font-semibold rounded-full border uppercase tracking-wide"

    const statusConfig = {
      "Pending": { color: "bg-yellow-100 text-yellow-700 border-yellow-300", label: "Menunggu" },
      "Approved": { color: "bg-green-100 text-green-700 border-green-300", label: "Disetujui" },
      "Rejected": { color: "bg-red-100 text-red-700 border-red-300", label: "Ditolak" },
      "Completed": { color: "bg-blue-100 text-blue-700 border-blue-300", label: "Selesai" },
      "Arrived": { color: "bg-purple-100 text-purple-700 border-purple-300", label: "Tiba" }
    }

    const config = statusConfig[status] || statusConfig.Pending

    return <span className={`${base} ${config.color}`}>{config.label}</span>
  }

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  // Cek apakah status sudah final (Completed atau Arrived)
  const isFinalStatus = (status: OrderItem["status"]) => {
    return status === "Completed" || status === "Arrived"
  }

  const handleEditClick = (order: OrderItem) => {
    setSelectedOrder(order)
    setEditValues({
      jumlah_diajukan: order.jumlah_diajukan,
      catatan: order.catatan || "",
    })
    setIsEditOpen(true)
  }

  const handleDeleteClick = (order: OrderItem) => {
    setSelectedOrder(order)
    setIsDeleteOpen(true)
  }

  const handlePriceClick = (order: OrderItem) => {
    setSelectedOrder(order)
    const price = order.harga || 0
    setPriceValue(price.toString())
    setDisplayPrice(formatRupiah(price))
    setIsPriceOpen(true)
  }

  const handleArrivedClick = (order: OrderItem) => {
    setSelectedOrder(order)
    setIsArrivedOpen(true)
  }

  const handleMarkArrivedConfirm = () => {
    if (!selectedOrder) return

    if (onMarkArrived) {
      onMarkArrived(selectedOrder.id)
    }

    // Update local state
    setLocalOrders((prev) =>
      prev.map((o) =>
        o.id === selectedOrder.id
          ? {
            ...o,
            status: "Arrived",
          }
          : o
      )
    )

    setIsArrivedOpen(false)
  }

  const handleEditSave = () => {
    if (!selectedOrder) return

    router.patch(`/request-items/${selectedOrder.id}`, {
      jumlah_diajukan: editValues.jumlah_diajukan,
      catatan: editValues.catatan,
    }, {
      onSuccess: () => {
        setLocalOrders((prev) =>
          prev.map((o) =>
            o.id === selectedOrder.id
              ? {
                ...o,
                jumlah_diajukan: editValues.jumlah_diajukan,
                catatan: editValues.catatan,
              }
              : o
          )
        )
        setIsEditOpen(false)
      },
      onError: (errors) => {
        console.error("Error updating order:", errors)
        alert("Gagal mengupdate item. Silakan coba lagi.")
      }
    })
  }

  const handleDeleteConfirm = () => {
    if (!selectedOrder) return

    router.delete(`/request-items/${selectedOrder.id}`, {
      onSuccess: () => {
        setLocalOrders((prev) => prev.filter((o) => o.id !== selectedOrder.id))
        setIsDeleteOpen(false)
      },
      onError: (errors) => {
        console.error("Error deleting order:", errors)
        alert("Gagal menghapus item. Silakan coba lagi.")
      }
    })
  }

  const handlePriceSave = () => {
    if (!selectedOrder) return;

    const numericPrice = parseInt(priceValue) || 0;

    if (numericPrice <= 0) {
      alert("Harga harus lebih besar dari 0");
      return;
    }

    router.post(
      "/input-price/save-invoice",
      {
        item_id: selectedOrder.id,
        harga: numericPrice,
      },
      {
        onSuccess: () => {
          setIsPriceOpen(false);

          // ✅ AMBIL ULANG DATA DARI DATABASE
          router.reload({ only: ["orders"] });
        },
      }
    );
  };


  const handlePriceChange = (value: string) => {
    const numericValue = value.replace(/\D/g, '')
    setPriceValue(numericValue)

    if (numericValue) {
      setDisplayPrice(formatRupiah(parseInt(numericValue)))
    } else {
      setDisplayPrice("Rp 0")
    }
  }

  const ActionButtons = ({ order }: { order: OrderItem }) => (
    <div className="flex items-center justify-center gap-3 mt-5 sm:mt-0 pl-3">
      {/* Tombol Package untuk Completed items */}
      {mode === "price" && order.status === "Completed" && (
        <Button
          variant="ghost"
          size="icon"
          className="text-purple-600 hover:scale-110 transition-all duration-300 bg-purple-50 hover:bg-purple-100 border border-purple-200"
          onClick={() => handleArrivedClick(order)}
          disabled={disabled}
          title="Tandai Barang Sampai"
        >
          <Package className="w-4 h-4" />
        </Button>
      )}

      {/* Tombol Pencil untuk input harga (hanya untuk status Approved) */}
      {mode === "price" && order.status === "Approved" && (
        <Button
          variant="ghost"
          size="icon"
          className={`text-green-600 hover:scale-110 transition-all duration-300 ${order.harga && order.harga > 0
            ? "bg-green-50 hover:bg-green-100 border border-green-200"
            : "bg-yellow-50 hover:bg-yellow-100 border border-yellow-200"
            }`}
          onClick={() => handlePriceClick(order)}
          disabled={disabled}
          title={order.harga && order.harga > 0 ? "Edit Harga" : "Input Harga"}
        >
          <Pencil className="w-4 h-4" />
        </Button>
      )}

      {/* Tombol untuk mode selain price dan monitoring */}
      {mode !== "price" && mode !== "monitoring" && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="text-blue-600 bg-blue-50 hover:bg-blue-100 hover:scale-110 transition-all duration-300"
            onClick={() => handleEditClick(order)}
            disabled={disabled}
            title="Edit Item"
          >
            <Pencil className="w-4 h-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="text-red-600 bg-red-50 hover:bg-red-100 hover:scale-110 transition-all duration-300"
            onClick={() => handleDeleteClick(order)}
            disabled={disabled}
            title="Hapus Item"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </>
      )}
    </div>
  )

  // MOBILE VIEW
  if (isMobile) {
    return (
      <div className="space-y-4 font-[Poppins]">
        {localOrders.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>Belum ada data request items</p>
          </div>
        ) : (
          localOrders.map((order) => (
            <div
              key={order.id}
              className="border border-blue-100 rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-slate-900 mb-1">
                    {order.nama_barang}
                  </h3>
                  {order.kode_barang && (
                    <p className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded inline-block">
                      Kode: {order.kode_barang}
                    </p>
                  )}
                </div>
                <StatusBadge status={order.status} />
              </div>

              <div className="space-y-2 text-sm text-slate-700">
                <div className="flex justify-between">
                  <span className="font-medium">Jumlah Diajukan:</span>
                  <span>{order.jumlah_diajukan} {order.satuan}</span>
                </div>
                {order.jumlah_disetujui && (
                  <div className="flex justify-between">
                    <span className="font-medium">Jumlah Disetujui:</span>
                    <span>{order.jumlah_disetujui} {order.satuan}</span>
                  </div>
                )}
                {(mode === "monitoring" || mode === "price") && (
                  <div className="flex justify-between">
                    <span className="font-medium">Harga Satuan:</span>
                    {order.harga && order.harga > 0 ? (
                      <span className="text-green-700 font-semibold">
                        {formatRupiah(order.harga)}
                      </span>
                    ) : (
                      <span className="text-red-500 text-xs bg-red-50 px-2 py-1 rounded">
                        Belum diisi
                      </span>
                    )}

                  </div>
                )}
                {(mode === "monitoring" || mode === "price") && (
                  <div className="flex justify-between">
                    <span className="font-medium">Total:</span>
                    {order.harga && order.harga > 0 ? (
                      <span className="text-blue-700 font-bold">
                        {formatRupiah(
                          order.harga *
                          (order.jumlah_disetujui || order.jumlah_diajukan)
                        )}
                      </span>
                    ) : (
                      <span className="text-gray-400 text-xs">-</span>
                    )}

                  </div>
                )}
                <div>
                  <span className="font-medium">Catatan:</span>
                  <p className="text-slate-600 mt-1">{order.catatan || "-"}</p>
                </div>
                {order.request?.department && (
                  <div className="flex justify-between">
                    <span className="font-medium">Departemen:</span>
                    <span>{order.request.department}</span>
                  </div>
                )}
                {order.request?.request_date && (
                  <div className="flex justify-between">
                    <span className="font-medium">Tanggal Request:</span>
                    <span>{new Date(order.request.request_date).toLocaleDateString('id-ID')}</span>
                  </div>
                )}
              </div>

              {mode !== "monitoring" && <ActionButtons order={order} />}
            </div>
          ))
        )}
      </div>
    )
  }

  // DESKTOP TABLE VIEW
  return (
    <>
      <div className="font-[Poppins] overflow-x-auto rounded-lg border border-blue-100">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-blue-200 bg-blue-50/30">
              <th className="text-left py-4 px-4 text-sm font-semibold text-slate-700">
                Nama Barang
              </th>
              {mode === "monitoring" && (
                <th className="text-left py-4 px-4 text-sm font-semibold text-slate-700">
                  Kode Barang
                </th>
              )}
              <th className="text-center py-4 px-4 text-sm font-semibold text-slate-700">
                Jumlah Diajukan
              </th>
              {mode === "monitoring" && (
                <th className="text-center py-4 px-4 text-sm font-semibold text-slate-700">
                  Jumlah Disetujui
                </th>
              )}
              <th className="text-center py-4 px-4 text-sm font-semibold text-slate-700">
                Satuan
              </th>
              {(mode === "monitoring" || mode === "price") && (
                <th className="text-center py-4 px-4 text-sm font-semibold text-slate-700">
                  Harga Satuan
                </th>
              )}
              {(mode === "monitoring" || mode === "price") && (
                <th className="text-center py-4 px-4 text-sm font-semibold text-slate-700">
                  Total
                </th>
              )}
              <th className="text-left py-4 px-4 text-sm font-semibold text-slate-700">
                Catatan
              </th>
              {mode === "monitoring" && (
                <>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-slate-700">
                    Departemen
                  </th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-slate-700">
                    Tanggal Request
                  </th>
                </>
              )}
              <th className="text-center py-4 px-4 text-sm font-semibold text-slate-700">
                Status
              </th>
              <th className="text-center py-4 px-4 text-sm font-semibold text-slate-700">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {localOrders.length === 0 ? (
              <tr>
                <td
                  colSpan={
                    mode === "monitoring" ? 11 :
                      mode === "price" ? 9 : 6
                  }
                  className="py-8 text-center text-gray-500"
                >
                  Belum ada data request items
                </td>
              </tr>
            ) : (
              localOrders.map((order, index) => (
                <tr
                  key={order.id}
                  className={`border-b border-blue-100 ${index % 2 === 0 ? "bg-white" : "bg-slate-50"
                    } hover:bg-blue-50 transition-colors`}
                >
                  <td className="py-4 px-4">
                    <p className="font-medium text-slate-900">{order.nama_barang}</p>
                    {order.kode_barang && (
                      <p className="text-xs text-slate-500 mt-1">Kode: {order.kode_barang}</p>
                    )}
                  </td>
                  {mode === "monitoring" && (
                    <td className="py-4 px-4 text-slate-700">
                      {order.kode_barang || "-"}
                    </td>
                  )}
                  <td className="py-4 px-4 text-center font-medium text-slate-900">
                    {order.jumlah_diajukan}
                  </td>
                  {mode === "monitoring" && (
                    <td className="py-4 px-4 text-center font-medium text-slate-900">
                      {order.jumlah_disetujui || "-"}
                    </td>
                  )}
                  <td className="py-4 px-4 text-center text-slate-900">
                    {order.satuan}
                  </td>
                  {(mode === "monitoring" || mode === "price") && (
                    <td className="py-4 px-4 text-center font-medium">
                      {order.harga && order.harga > 0 ? (
                        <span className="text-green-700 font-semibold">
                          {formatRupiah(order.harga)}
                        </span>
                      ) : (
                        <span className="text-red-500 text-xs bg-red-50 px-2 py-1 rounded">
                          Belum diisi
                        </span>
                      )}

                    </td>
                  )}
                  {(mode === "monitoring" || mode === "price") && (
                    <td className="py-4 px-4 text-center font-bold">
                      {order.harga && order.harga > 0 ? (
                        <span className="text-blue-700 font-bold">
                          {formatRupiah(
                            order.harga *
                            (order.jumlah_disetujui || order.jumlah_diajukan)
                          )}
                        </span>
                      ) : (
                        <span className="text-gray-400 text-xs">-</span>
                      )}

                    </td>
                  )}
                  <td className="py-4 px-4 text-slate-700 max-w-xs">
                    <p className="truncate" title={order.catatan || ""}>
                      {order.catatan || "-"}
                    </p>
                  </td>
                  {mode === "monitoring" && (
                    <>
                      <td className="py-4 px-4 text-slate-700">
                        {order.request?.department || "-"}
                      </td>
                      <td className="py-4 px-4 text-slate-700">
                        {order.request?.request_date ? new Date(order.request.request_date).toLocaleDateString('id-ID') : "-"}
                      </td>
                    </>
                  )}
                  <td className="py-4 px-4 text-center">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="py-4 px-4 text-center">
                    <ActionButtons order={order} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-md rounded-xl border border-blue-100 shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-slate-900">
              Edit Item
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-slate-600 mb-1">Jumlah Diajukan</label>
              <input
                type="number"
                value={editValues.jumlah_diajukan}
                onChange={(e) =>
                  setEditValues({ ...editValues, jumlah_diajukan: Number(e.target.value) })
                }
                className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400"
                min="1"
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
                placeholder="Tambahkan catatan..."
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
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Harga Dialog */}
      <Dialog open={isPriceOpen} onOpenChange={setIsPriceOpen}>
        <DialogContent className="max-w-md rounded-xl border border-green-100 shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-slate-900">
              {selectedOrder?.harga && selectedOrder.harga > 0 ? "Edit Harga Satuan" : "Input Harga Satuan"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="bg-slate-50 p-3 rounded-lg">
              <p className="text-sm text-slate-600">Informasi Item:</p>
              <p className="font-medium text-slate-900">
                {selectedOrder?.nama_barang}
              </p>
              <p className="text-sm text-slate-600">
                Jumlah: {selectedOrder?.jumlah_disetujui || selectedOrder?.jumlah_diajukan} {selectedOrder?.satuan}
              </p>
            </div>

            <div>
              <label className="block text-sm text-slate-600 mb-1">Harga Satuan (Rp)</label>
              <div className="space-y-2">
                <input
                  type="text"
                  value={priceValue}
                  onChange={(e) => handlePriceChange(e.target.value)}
                  className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-green-400"
                  placeholder="Masukkan harga satuan"
                />
                <div className="bg-green-50 p-2 rounded border border-green-200">
                  <p className="text-xs text-slate-600">Preview Harga:</p>
                  <p className="font-medium text-green-700 text-sm">
                    {displayPrice}
                  </p>
                </div>
              </div>
            </div>

            {priceValue && parseInt(priceValue) > 0 && (
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                <p className="text-sm text-slate-600">Total Estimasi:</p>
                <p className="font-medium text-blue-700">
                  {formatRupiah(parseInt(priceValue) * (selectedOrder?.jumlah_disetujui || selectedOrder?.jumlah_diajukan || 0))}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  ({selectedOrder?.jumlah_disetujui || selectedOrder?.jumlah_diajukan} {selectedOrder?.satuan} × {displayPrice})
                </p>
              </div>
            )}

            <div className="bg-green-50 border border-green-200 p-3 rounded-lg">
              <p className="text-xs text-green-800">
                ✅ Harga akan langsung disimpan ke database dan invoice otomatis dibuat.
              </p>
            </div>

          </div>

          <DialogFooter className="flex justify-end gap-3 mt-4">
            <Button
              variant="outline"
              onClick={() => setIsPriceOpen(false)}
              className="border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              Batal
            </Button>
            <Button
              onClick={handlePriceSave}
              className="bg-green-600 text-white hover:bg-green-700"
              disabled={!priceValue || parseInt(priceValue) <= 0}
            >
              Simpan Harga
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Mark as Arrived Dialog */}
      <Dialog open={isArrivedOpen} onOpenChange={setIsArrivedOpen}>
        <DialogContent className="max-w-md rounded-xl border border-purple-100 shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              <Package className="w-5 h-5 text-purple-600" />
              Tandai Barang Sampai
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
              <p className="text-sm text-slate-600">Informasi Item:</p>
              <p className="font-medium text-slate-900">
                {selectedOrder?.nama_barang}
              </p>
              <p className="text-sm text-slate-600">
                Jumlah: {selectedOrder?.jumlah_disetujui || selectedOrder?.jumlah_diajukan} {selectedOrder?.satuan}
              </p>
              {selectedOrder?.harga && selectedOrder.harga > 0 && (
                <p className="text-sm text-slate-600">
                  Harga: {formatRupiah(selectedOrder.harga)}
                </p>
              )}
            </div>

            <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
              <p className="text-xs text-yellow-800">
                ⚠️ Tindakan ini akan mengubah status barang dari <strong>Completed</strong> menjadi <strong>Arrived</strong>.
                Pastikan barang sudah benar-benar sampai sebelum melanjutkan.
              </p>
            </div>
          </div>

          <DialogFooter className="flex justify-end gap-3 mt-4">
            <Button
              variant="outline"
              onClick={() => setIsArrivedOpen(false)}
              className="border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              Batal
            </Button>
            <Button
              onClick={handleMarkArrivedConfirm}
              className="bg-purple-600 text-white hover:bg-purple-700"
            >
              Ya, Barang Sudah Sampai
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
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
              {selectedOrder?.nama_barang}
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