"use client"

import { useState } from "react"
import { ChevronLeft, Plus, Minus, Save, X } from "lucide-react"

interface TransferItem {
  id: number
  nama_barang: string
  jumlah_awal: number
  satuan: string
  jumlah_transfer: number
}

interface Props {
  item: any
  onSave: (items: any[]) => void
  onBack: () => void
}

export default function TransferPage({ item, onSave, onBack }: Props) {
  const [transferItems, setTransferItems] = useState<TransferItem[]>([
    {
      id: item.id,
      nama_barang: item.nama_barang,
      jumlah_awal: item.jumlah,
      satuan: item.satuan,
      jumlah_transfer: 1,
    },
  ])

  const handleQuantityChange = (id: number, change: number) => {
    setTransferItems((items) =>
      items.map((i) => ({
        ...i,
        jumlah_transfer: Math.max(1, Math.min(i.jumlah_awal, i.jumlah_transfer + change)),
      })),
    )
  }

  const handleRemoveItem = (id: number) => {
    setTransferItems((items) => items.filter((i) => i.id !== id))
  }

  const handleSave = () => {
    const savedItems = transferItems.map((i) => ({
      id: i.id,
      nama_barang: i.nama_barang,
      jumlah: i.jumlah_transfer,
      satuan: i.satuan,
    }))
    onSave(savedItems)
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
        <h1 className="text-2xl font-bold">Transfer Barang</h1>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-lg border-2 border-blue-500 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Detail Transfer</h2>

          <div className="space-y-4">
            {transferItems.map((item) => (
              <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-gray-800">{item.nama_barang}</h3>
                    <p className="text-sm text-gray-600">
                      Stok Tersedia: {item.jumlah_awal} {item.satuan}
                    </p>
                  </div>
                  <button onClick={() => handleRemoveItem(item.id)} className="text-red-500 hover:text-red-700">
                    <X size={20} />
                  </button>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button onClick={() => handleQuantityChange(item.id, -1)} className="p-2 hover:bg-gray-100">
                      <Minus size={18} />
                    </button>
                    <input
                      type="number"
                      value={item.jumlah_transfer}
                      onChange={(e) => {
                        const val = Number.parseInt(e.target.value) || 0
                        if (val >= 1 && val <= item.jumlah_awal) {
                          setTransferItems((items) =>
                            items.map((i) => (i.id === item.id ? { ...i, jumlah_transfer: val } : i)),
                          )
                        }
                      }}
                      className="w-16 text-center py-2 border-x border-gray-300 focus:outline-none"
                    />
                    <button onClick={() => handleQuantityChange(item.id, 1)} className="p-2 hover:bg-gray-100">
                      <Plus size={18} />
                    </button>
                  </div>
                  <span className="text-gray-700">{item.satuan}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="mt-8 pt-6 border-t-2 border-blue-500">
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <p className="text-sm text-gray-600">Total Barang yang ditransfer:</p>
              <p className="text-2xl font-bold text-blue-600">{transferItems.length} item</p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleSave}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-bold transition-colors"
              >
                <Save size={20} />
                Simpan Transfer
              </button>
              <button
                onClick={onBack}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-3 rounded-lg font-bold transition-colors"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
