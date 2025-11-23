"use client"

import { useState, useEffect } from "react"
import { Search, ChevronRight, Loader } from "lucide-react"

interface BarangDepartmentItem {
  id: number
  nama_barang: string
  stok: number
  satuan: string
  departemen: string
}

interface Props {
  departemen?: string
  onViewDetail: (item: BarangDepartmentItem) => void
  onViewStock: () => void
}

export default function BarangDepartment({ departemen, onViewDetail, onViewStock }: Props) {
  const [searchTerm, setSearchTerm] = useState("")
  const [items, setItems] = useState<BarangDepartmentItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Fetch data dari API
        const response = await fetch('/api/departemen-items' + (departemen ? `?departemen=${departemen}` : ''))
        
        if (!response.ok) {
          throw new Error('Gagal mengambil data')
        }
        
        const data = await response.json()
        setItems(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Terjadi kesalahan')
        setItems([])
      } finally {
        setLoading(false)
      }
    }

    fetchItems()
  }, [departemen])

  const filteredItems = items.filter((item) =>
    item.nama_barang.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="bg-white rounded-lg border-2 border-blue-500 p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Barang Department</h2>
          {departemen && <p className="text-sm text-gray-500 mt-1">Departemen: {departemen}</p>}
        </div>
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

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-8">
          <Loader className="animate-spin text-blue-500" size={24} />
          <span className="ml-2 text-gray-600">Memuat data...</span>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          {error}
        </div>
      )}

      {/* Table */}
      {!loading && !error && (
        <div className="space-y-3">
          {filteredItems.length > 0 ? (
            <>
              <div className="grid grid-cols-3 gap-4 mb-4 pb-3 border-b border-gray-300">
                <div className="font-bold text-gray-700">Nama Barang</div>
                <div className="font-bold text-gray-700">Stock</div>
                <div className="font-bold text-gray-700">Satuan</div>
              </div>
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onViewDetail(item)}
                  className="grid grid-cols-3 gap-4 p-3 border border-gray-200 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors"
                >
                  <div className="text-gray-700">{item.nama_barang}</div>
                  <div className="text-gray-700">{item.stok}</div>
                  <div className="flex items-center justify-between text-gray-700">
                    <span>{item.satuan}</span>
                    <ChevronRight size={18} className="text-blue-500" />
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="text-center py-8 text-gray-500">
              {items.length === 0 ? "Belum ada barang dari departemen ini" : "Tidak ada barang yang ditemukan"}
            </div>
          )}
        </div>
      )}
    </div>
  )
}