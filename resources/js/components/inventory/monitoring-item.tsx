"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

type StatusType = "DITUNDA" | "DITERIMA" | "DITOLAK"

interface MonitoringItem {
  id: number
  namaBarang: string
  itemCount: number
  jumlahBarang: number
  satuanBarang: string
  status: StatusType
}

const mockData: MonitoringItem[] = [
  {
    id: 1,
    namaBarang: "Wireless Earbuds Pro",
    itemCount: 10,
    jumlahBarang: 5,
    satuanBarang: "Unit",
    status: "DITUNDA",
  },
  {
    id: 2,
    namaBarang: "Smart Fitness Watch",
    itemCount: 10,
    jumlahBarang: 4,
    satuanBarang: "Pcs",
    status: "DITERIMA",
  },
  {
    id: 3,
    namaBarang: "Portable Blender",
    itemCount: 8,
    jumlahBarang: 1,
    satuanBarang: "Unit",
    status: "DITOLAK",
  },
]

const getStatusColor = (status: StatusType) => {
  switch (status) {
    case "DITUNDA":
      return "bg-yellow-100 text-yellow-700"
    case "DITERIMA":
      return "bg-green-100 text-green-700"
    case "DITOLAK":
      return "bg-red-100 text-red-700"
    default:
      return "bg-gray-100 text-gray-700"
  }
}

export default function MonitoringItem() {
  const [items] = useState<MonitoringItem[]>(mockData)
  const router = useRouter()

  return (
    <div className="w-full min-h-screen bg-gray-50 dark:bg-slate-900 p-8">
      <div className="w-full max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-3 h-3 rounded-full bg-blue-600"></div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Monitoring Item</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 ml-6">Departemen</p>
        </div>

        <div className="bg-white dark:bg-slate-800 border-4 border-blue-500 dark:border-blue-600 rounded-xl p-6 mb-8">
          <div className="w-full overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-blue-300">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Nama Barang</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Jumlah Barang</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Satuan Barang</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Status</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-slate-700">
                    <td className="py-3 px-4 text-gray-800 dark:text-gray-200">
                      <div className="font-medium">{item.namaBarang}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">({item.itemCount})</div>
                    </td>
                    <td className="py-3 px-4 text-center text-gray-800 dark:text-gray-200">{item.jumlahBarang}</td>
                    <td className="py-3 px-4 text-center text-gray-800 dark:text-gray-200">{item.satuanBarang}</td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-block px-4 py-1 rounded-full text-xs font-semibold ${getStatusColor(item.status)}`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => router.push("/inventory")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
          >
            Storing Store
          </button>
        </div>
      </div>
    </div>
  )
}
