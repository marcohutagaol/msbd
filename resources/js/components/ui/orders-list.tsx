"use client"

interface OrderItem {
  id: number
  name: string
  subtitle: string
  quantity: number
  status: "Pending" | "Processing" | "Completed" | "Cancelled"
}

const orders: OrderItem[] = [
  {
    id: 1,
    name: "Wireless Earbuds Pro",
    subtitle: "(10)",
    quantity: 3,
    status: "Completed",
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    subtitle: "(10)",
    quantity: 4,
    status: "Processing",
  },
  {
    id: 3,
    name: "Portable Blender",
    subtitle: "",
    quantity: 1,
    status: "Pending",
  },
  {
    id: 4,
    name: "Gaming Mouse RGB",
    subtitle: "(10)",
    quantity: 2,
    status: "Completed",
  },
  {
    id: 5,
    name: "Stainless Steel Bottle",
    subtitle: "(10)",
    quantity: 1,
    status: "Cancelled",
  },
]

export function OrdersList() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700 border border-green-200"
      case "Processing":
        return "bg-yellow-100 text-yellow-700 border border-yellow-200"
      case "Pending":
        return "bg-blue-100 text-blue-700 border border-blue-200"
      case "Cancelled":
        return "bg-red-100 text-red-700 border border-red-200"
      default:
        return "bg-gray-100 text-gray-700 border border-gray-200"
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b-2 border-blue-200">
            <th className="text-left py-4 px-4 text-sm font-semibold text-slate-700">
              Product Name
            </th>
            <th className="text-left py-4 px-4 text-sm font-semibold text-slate-700">
              Quantity
            </th>
            <th className="text-center py-4 px-4 text-sm font-semibold text-slate-700">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr
              key={order.id}
              className={`border-b border-blue-100 ${
                index % 2 === 0 ? "bg-white" : "bg-slate-50"
              } hover:bg-blue-50 transition-colors`}
            >
              {/* Product Name */}
              <td className="py-4 px-4">
                <div>
                  <p className="font-medium text-slate-900">{order.name}</p>
                  {order.subtitle && (
                    <p className="text-sm text-slate-500">{order.subtitle}</p>
                  )}
                </div>
              </td>

              {/* Quantity */}
              <td className="py-4 px-4 text-slate-900 font-medium">
                {order.quantity}
              </td>

              {/* Status (centered) */}
              <td className="py-4 px-4 text-center">
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full inline-block min-w-[90px] text-center ${getStatusColor(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
