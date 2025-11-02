"use client"

import { useState } from "react"
import { X, Search, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface OrderItem {
  id: string
  name: string
  quantity: number
  unit: string
}

interface AddOrderModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (items: OrderItem[]) => void
}

const sampleProducts = [
  "Sabun Hotel Produk GIV Warna Ungu",
  "Handuk putih merek louisie vuttion",
  "Minyak goreng bimoli 500ml",
  "Teh celup premium kotak",
  "Kopi bubuk arabika 250gr",
  "Gula pasir 5kg",
  "Tepung terigu 1kg",
]

export default function AddOrderModal({ isOpen, onClose, onAdd }: AddOrderModalProps) {
  const [itemCount, setItemCount] = useState(1)
  const [formData, setFormData] = useState({
    productName: "",
    department: "",
    date: "",
    quantity: "",
    unit: "",
    notes: "",
  })
  const [orderedItems, setOrderedItems] = useState<OrderItem[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  const filteredProducts = sampleProducts.filter((product) => product.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleAddItem = () => {
    if (formData.productName && formData.quantity && formData.unit) {
      const newItem: OrderItem = {
        id: Math.random().toString(),
        name: formData.productName,
        quantity: Number.parseInt(formData.quantity),
        unit: formData.unit,
      }
      setOrderedItems([...orderedItems, newItem])
      setItemCount(itemCount + 1)
      setFormData({
        productName: "",
        department: "",
        date: "",
        quantity: "",
        unit: "",
        notes: "",
      })
    }
  }

  const handleRemoveItem = (id: string) => {
    setOrderedItems(orderedItems.filter((item) => item.id !== id))
  }

  const handleSubmit = () => {
    if (orderedItems.length > 0) {
      onAdd(orderedItems)
      setOrderedItems([])
      setItemCount(1)
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border-2 border-blue-400 bg-white shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between border-b-2 border-blue-200 bg-gradient-to-r from-blue-50 to-white p-6">
          <h2 className="text-2xl font-bold text-gray-800">Barang - {itemCount}</h2>
          <button onClick={onClose} className="rounded-lg p-2 hover:bg-blue-100 transition-colors">
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Left Column - Form */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-800">List Barang</h3>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nama barang</label>
                <input
                  type="text"
                  value={formData.productName}
                  onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                  placeholder="Enter product name"
                  className="w-full rounded-lg border-2 border-blue-300 px-4 py-3 font-poppins text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Department</label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    placeholder="Department"
                    className="w-full rounded-lg border-2 border-blue-300 px-4 py-3 font-poppins text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full rounded-lg border-2 border-blue-300 px-4 py-3 font-poppins text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Jumlah</label>
                  <input
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    placeholder="0"
                    className="w-full rounded-lg border-2 border-blue-300 px-4 py-3 font-poppins text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Satuan</label>
                  <input
                    type="text"
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    placeholder="e.g. pcs, box"
                    className="w-full rounded-lg border-2 border-blue-300 px-4 py-3 font-poppins text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Catatan</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Add notes here..."
                  rows={4}
                  className="w-full rounded-lg border-2 border-blue-300 px-4 py-3 font-poppins text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all resize-none"
                />
              </div>
            </div>

            {/* Right Column - Product List */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-800">Barang terdaftar</h3>

              <div className="relative">
                <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full rounded-lg border-2 border-blue-300 pl-10 pr-4 py-3 font-poppins text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                />
              </div>

              <div className="space-y-2 max-h-64 overflow-y-auto border-2 border-blue-300 rounded-lg p-4 bg-blue-50">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product, idx) => (
                    <button
                      key={idx}
                      onClick={() => setFormData({ ...formData, productName: product })}
                      className="block w-full rounded-lg border border-blue-200 bg-white p-3 text-left text-sm text-gray-700 hover:bg-blue-100 hover:border-blue-400 transition-all font-poppins"
                    >
                      {product}
                    </button>
                  ))
                ) : (
                  <p className="text-center text-gray-500 py-4">No products found</p>
                )}
              </div>

              {orderedItems.length > 0 && (
                <div className="space-y-2 mt-4">
                  <h4 className="text-sm font-semibold text-gray-700">Items Added:</h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {orderedItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between rounded-lg border-2 border-blue-300 bg-blue-50 p-3"
                      >
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-700">{item.name}</p>
                          <p className="text-xs text-gray-500">
                            {item.quantity} {item.unit}
                          </p>
                        </div>
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="rounded-lg p-2 hover:bg-red-100 transition-colors"
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t-2 border-blue-200 bg-gradient-to-r from-blue-50 to-white p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Button
              onClick={handleAddItem}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold border-2 border-blue-600 rounded-lg py-3 transition-all duration-300"
            >
              Add Items
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={orderedItems.length === 0}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold border-2 border-blue-600 rounded-lg py-3 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add Items and Insert new
            </Button>
            <Button
              onClick={onClose}
              className="w-full sm:w-auto bg-white hover:bg-blue-50 text-blue-600 font-semibold border-2 border-blue-300 rounded-lg py-3 transition-all duration-300"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
