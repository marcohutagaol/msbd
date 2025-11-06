"use client"

import type { Order } from "./orders-table"
import StatusBadge from "./status-badge"
import { MoreHorizontal } from "lucide-react"

interface OrdersTableMobileProps {
  orders: Order[]
}

export default function OrdersTableMobile({ orders }: OrdersTableMobileProps) {
  return (
    <div className="space-y-4 p-4 md:p-6 font-[Poppins]">
      {orders.map((order) => (
        <div
          key={order.id}
          className="group rounded-xl border border-blue-200 bg-white p-5 space-y-4 transition-all duration-300 hover:border-blue-400 hover:bg-blue-50 hover:shadow-md"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="font-semibold text-gray-800 text-base group-hover:text-blue-700">
                {order.namaBarang}
              </p>
              <p className="text-xs text-gray-500">{order.departemen}</p>
            </div>
            <button className="text-gray-500 hover:text-blue-600 hover:bg-blue-100/50 p-2 rounded-lg transition-all duration-300 flex-shrink-0">
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-gray-500 text-[11px] uppercase font-medium tracking-wide">Jumlah</p>
              <p className="font-semibold text-gray-700">{order.jumlahBarang}</p>
            </div>
            <div>
              <p className="text-gray-500 text-[11px] uppercase font-medium tracking-wide">Satuan</p>
              <p className="font-semibold text-gray-700">{order.satuan}</p>
            </div>
            <div>
              <p className="text-gray-500 text-[11px] uppercase font-medium tracking-wide">Status</p>
              <StatusBadge status={order.status} />
            </div>
          </div>

          <div className="pt-3 border-t border-blue-100">
            <p className="text-sm text-gray-600 italic">{order.catatan}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
