"use client"

import { useState } from "react"
import { Search, Send } from "lucide-react"

interface BarangGudangItem {
  id: number
  nama_barang: string
  jumlah: number
  satuan: string
}

const DUMMY_DATA: BarangGudangItem[] = [
  { id: 1, nama_barang: "Minyak Bimoli 4L", jumlah: 12, satuan: "botol" },
  { id: 2, nama_barang: "Bumbu Knor Kudu Ayam 300gram", jumlah: 23, satuan: "pcs" },
  { id: 3, nama_barang: "Aqua Segar 2L", jumlah: 3, satuan: "Liter" },
  { id: 4, nama_barang: "Kerang Maran", jumlah: 4, satuan: "kg" },
]

interface Props {
  onTransfer: (item: BarangGudangItem) => void
}

export default function BarangGudang({ onTransfer }: Props) {
  const [searchTerm, setSearchTerm] = useState("")
  const [items] = useState(DUMMY_DATA)

  const filteredItems = items.filter((item) => item.nama_barang.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="bg-white rounded-lg border-2 border-blue-500 p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Barang Gudang</h2>

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
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-blue-500">
              <th className="text-left py-3 px-4 font-bold text-gray-700">Nama Barang</th>
              <th className="text-left py-3 px-4 font-bold text-gray-700">Quantity</th>
              <th className="text-center py-3 px-4 font-bold text-gray-700">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item) => (
              <tr key={item.id} className="border-b border-gray-200 hover:bg-blue-50">
                <td className="py-3 px-4 text-gray-700">{item.nama_barang}</td>
                <td className="py-3 px-4 text-gray-700">
                  {item.jumlah} {item.satuan}
                </td>
                <td className="py-3 px-4 text-center">
                  <button
                    onClick={() => onTransfer(item)}
                    className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <Send size={16} />
                    Transfer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-8 text-gray-500">Tidak ada barang yang ditemukan</div>
      )}
    </div>
  )
}
