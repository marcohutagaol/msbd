"use client"

import { useState, useEffect } from "react"
import { ChevronRight, Loader } from "lucide-react"

interface BarangItem {
  id: number
  nama_barang: string
  stok: number
  satuan: string
}

interface Props {
  onTransfer: (item: BarangItem) => void
}

export default function BarangGudang({ onTransfer }: Props) {
  const [items, setItems] = useState<BarangItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchBarangGudang()
  }, [])

  const fetchBarangGudang = async () => {
    try {
      setLoading(true)
      setError(null)

      // Langsung ke URL yang paling simpel
      const response = await fetch("http://localhost:8000/api/inventory/gudang", {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      })

      console.log('Response status:', response.status)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log('Data received:', data)
      setItems(data)
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Terjadi kesalahan"
      console.error("Error fetching barang gudang:", errorMsg)
      setError(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg border-2 border-blue-500 dark:border-blue-600 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Barang Gudang</h2>
        <button
          onClick={fetchBarangGudang}
          disabled={loading}
          className="text-blue-500 hover:text-blue-700 text-sm disabled:opacity-50 cursor-pointer"
        >
          {loading ? <Loader className="animate-spin inline" size={18} /> : "🔄 Refresh"}
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
          <strong>Error:</strong> {error}
          <p className="text-xs mt-2">Cek console browser (F12) untuk detail lebih</p>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center py-8">
          <Loader className="animate-spin text-blue-500" size={24} />
        </div>
      ) : (
        <div className="space-y-3">
          {items.length > 0 ? (
            items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center p-3 bg-gray-50 dark:bg-slate-700 rounded-lg hover:bg-blue-50 dark:hover:bg-slate-600 transition-colors border border-gray-200 dark:border-gray-600"
              >
                <div className="flex-1">
                  <p className="font-semibold text-gray-800 dark:text-gray-200">{item.nama_barang}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Stok: {item.stok} {item.satuan}
                  </p>
                </div>
                <button
                  onClick={() => onTransfer(item)}
                  className="flex items-center gap-2 ml-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Transfer
                  <ChevronRight size={18} />
                </button>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              Belum ada data barang di gudang
            </div>
          )}
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <p className="text-sm text-gray-600 dark:text-gray-400">Total Barang: <span className="font-bold text-blue-600">{items.length}</span></p>
      </div>
    </div>
  )
}