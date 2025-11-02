"use client"

import { MoreHorizontal } from "lucide-react"
import type { Order } from "./orders-table"
import StatusBadge from "./status-badge"

interface OrdersTableDesktopProps {
  orders: Order[]
}

export default function OrdersTableDesktop({ orders }: OrdersTableDesktopProps) {
  return (
    <div className="w-full overflow-x-auto font-[Poppins]">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-blue-200 bg-gradient-to-r from-blue-50/70 to-white">
            {["ID", "Nama Barang", "Departemen", "Jumlah", "Satuan", "Catatan", "Status", "Aksi"].map(
              (header) => (
                <th
                  key={header}
                  className="px-6 py-4 text-left font-semibold tracking-wide text-blue-700 uppercase text-xs"
                >
                  {header}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr
              key={order.id}
              className="border-b border-blue-100 hover:bg-blue-50 transition-colors duration-200 group text-gray-700"
            >
              <td className="px-6 py-3 font-mono text-sm text-gray-600">{order.id}</td>
              <td className="px-6 py-3 font-semibold text-gray-800 group-hover:text-blue-700">
                {order.namaBarang}
              </td>
              <td className="px-6 py-3">{order.departemen}</td>
              <td className="px-6 py-3">{order.jumlahBarang}</td>
              <td className="px-6 py-3">{order.satuan}</td>
              <td className="px-6 py-3 italic text-gray-500">{order.catatan}</td>
              <td className="px-6 py-3">
                <StatusBadge status={order.status} />
              </td>
              <td className="px-6 py-3">
                <button className="text-gray-500 hover:text-blue-600 hover:bg-blue-100/50 p-1.5 rounded-lg transition-all">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
