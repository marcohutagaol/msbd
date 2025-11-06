"use client"

import { useState } from "react"
import { ChevronLeft, Edit2, Save, X } from "lucide-react"
import { Search } from "lucide-react"

interface StockItem {
  id: number
  nama_barang: string
  jumlah: number
  satuan: string
}

interface Props {
  items: StockItem[]
  onBack: () => void
}

export default function StockDepartmentPage({ items, onBack }: Props) {
  const [searchTerm, setSearchTerm] = useState("")
  const [stockItems, setStockItems] = useState(items)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editingQuantity, setEditingQuantity] = useState(0)

  const filteredItems = stockItems.filter((item) => item.nama_barang.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleEditQuantity = (id: number, currentQuantity: number) => {
    setEditingId(id)
    setEditingQuantity(currentQuantity)
  }

  const handleSaveQuantity = (id: number) => {
    setStockItems((items) => items.map((item) => (item.id === id ? { ...item, jumlah: editingQuantity } : item)))
    setEditingId(null)
  }

  const handleCancelEdit = () => {
    setEditingId(null)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-blue-500 text-white p-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 hover:bg-blue-600 px-4 py-2 rounded-lg transition-colors mb-4"
        >
          <ChevronLeft size={20} />
          Kembali
        </button>
        <h1 className="text-2xl font-bold">Stock Department</h1>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg border-2 border-blue-500 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Manajemen Stock Department</h2>

          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Cari barang..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Stock Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-blue-500">
                  <th className="text-left py-3 px-4 font-bold text-gray-700">Nama Barang</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-700">Jumlah</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-700">Satuan</th>
                  <th className="text-center py-3 px-4 font-bold text-gray-700">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.length > 0 ? (
                  filteredItems.map((item) => (
                    <tr key={item.id} className="border-b border-gray-200 hover:bg-blue-50">
                      <td className="py-4 px-4 text-gray-700">{item.nama_barang}</td>
                      <td className="py-4 px-4">
                        {editingId === item.id ? (
                          <input
                            type="number"
                            value={editingQuantity}
                            onChange={(e) => setEditingQuantity(Number.parseInt(e.target.value) || 0)}
                            className="w-20 px-2 py-1 border border-blue-500 rounded-lg focus:outline-none"
                            min="0"
                          />
                        ) : (
                          <span className="text-gray-700">{item.jumlah}</span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-gray-700">{item.satuan}</td>
                      <td className="py-4 px-4 text-center">
                        {editingId === item.id ? (
                          <div className="flex gap-2 justify-center">
                            <button
                              onClick={() => handleSaveQuantity(item.id)}
                              className="text-green-500 hover:text-green-700"
                            >
                              <Save size={18} />
                            </button>
                            <button onClick={handleCancelEdit} className="text-red-500 hover:text-red-700">
                              <X size={18} />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleEditQuantity(item.id, item.jumlah)}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            <Edit2 size={18} />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-gray-500">
                      {stockItems.length === 0 ? "Belum ada stock" : "Tidak ada barang yang ditemukan"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Summary */}
          {filteredItems.length > 0 && (
            <div className="mt-8 pt-6 border-t-2 border-blue-500">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Total Jenis Barang:</p>
                <p className="text-2xl font-bold text-blue-600">{filteredItems.length} item</p>
              </div>
            </div>
          )}

          {/* Back Button */}
          <div className="mt-8">
            <button
              onClick={onBack}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-bold transition-colors"
            >
              Kembali ke Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
