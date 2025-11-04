"use client"

import { useState } from "react"
import { Search, ChevronRight } from "lucide-react"

interface BarangDepartmentItem {
  id: number
  nama_barang: string
  jumlah: number
  satuan: string
}

interface Props {
  items: BarangDepartmentItem[]
  onViewDetail: (item: BarangDepartmentItem) => void
  onViewStock: () => void
}

export default function BarangDepartment({ items, onViewDetail, onViewStock }: Props) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredItems = items.filter((item) => item.nama_barang.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="bg-white rounded-lg border-2 border-blue-500 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Barang Department</h2>
        <button onClick={onViewStock} className="text-blue-500 hover:text-blue-700 text-sm font-semibold">
          Lihat Stock →
        </button>
      </div>

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

      {/* Table */}
      <div className="space-y-3">
        {filteredItems.length > 0 ? (
          <>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="font-bold text-gray-700">Nama Barang</div>
              <div className="font-bold text-gray-700">Quantity</div>
            </div>
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => onViewDetail(item)}
                className="grid grid-cols-2 gap-4 p-3 border border-gray-200 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors"
              >
                <div className="text-gray-700">{item.nama_barang}</div>
                <div className="flex items-center justify-between text-gray-700">
                  <span>
                    {item.jumlah} {item.satuan}
                  </span>
                  <ChevronRight size={18} className="text-blue-500" />
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="text-center py-8 text-gray-500">
            {items.length === 0 ? "Belum ada barang dari gudang" : "Tidak ada barang yang ditemukan"}
          </div>
        )}
      </div>
    </div>
  )
}
