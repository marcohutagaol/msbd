"use client"

import { useState } from "react"
import { ChevronLeft, Edit2, Save, X } from "lucide-react"

interface SubDetailItem {
  id: number
  nama_barang: string
  status: "In stock" | "Habis" | "Expired" | "Digunakan"
}

interface Props {
  item: any
  onBack: () => void
}

const STATUS_OPTIONS = ["In stock", "Habis", "Expired", "Digunakan"] as const

const getStatusColor = (status: string) => {
  switch (status) {
    case "In stock":
      return "bg-green-100 text-green-700 border border-green-300"
    case "Habis":
      return "bg-red-100 text-red-700 border border-red-300"
    case "Expired":
      return "bg-gray-100 text-gray-700 border border-gray-300"
    case "Digunakan":
      return "bg-yellow-100 text-yellow-700 border border-yellow-300"
    default:
      return "bg-gray-100 text-gray-700"
  }
}

export default function SubDetailPage({ item, onBack }: Props) {
  // Generate dummy sub-items
  const [subItems, setSubItems] = useState<SubDetailItem[]>([
    { id: 1, nama_barang: `${item.nama_barang}`, status: "In stock" },
    { id: 2, nama_barang: `${item.nama_barang}`, status: "Habis" },
    { id: 3, nama_barang: `${item.nama_barang}`, status: "Expired" },
    { id: 4, nama_barang: `${item.nama_barang}`, status: "Digunakan" },
  ])

  const [editingId, setEditingId] = useState<number | null>(null)
  const [editingStatus, setEditingStatus] = useState<string>("")

  const handleEditStatus = (id: number, currentStatus: string) => {
    setEditingId(id)
    setEditingStatus(currentStatus)
  }

  const handleSaveStatus = (id: number) => {
    setSubItems((items) => items.map((item) => (item.id === id ? { ...item, status: editingStatus as any } : item)))
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
        <h1 className="text-2xl font-bold">Detail Barang</h1>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-white rounded-lg border-2 border-blue-500 p-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800">{item.nama_barang}</h2>
            <p className="text-sm text-gray-600">
              Jumlah: {item.jumlah} {item.satuan}
            </p>
          </div>

          {/* Sub Detail Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-blue-500">
                  <th className="text-left py-3 px-4 font-bold text-gray-700">Nama Barang</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-700">Status</th>
                  <th className="text-center py-3 px-4 font-bold text-gray-700">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {subItems.map((subItem) => (
                  <tr key={subItem.id} className="border-b border-gray-200 hover:bg-blue-50">
                    <td className="py-4 px-4 text-gray-700">{subItem.nama_barang}</td>
                    <td className="py-4 px-4">
                      {editingId === subItem.id ? (
                        <select
                          value={editingStatus}
                          onChange={(e) => setEditingStatus(e.target.value)}
                          className="px-3 py-2 border border-blue-500 rounded-lg focus:outline-none"
                        >
                          {STATUS_OPTIONS.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <span
                          className={`px-4 py-2 rounded-full text-sm font-semibold inline-block ${getStatusColor(subItem.status)}`}
                        >
                          {subItem.status}
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {editingId === subItem.id ? (
                        <div className="flex gap-2 justify-center">
                          <button
                            onClick={() => handleSaveStatus(subItem.id)}
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
                          onClick={() => handleEditStatus(subItem.id, subItem.status)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <Edit2 size={18} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

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
