"use client"

export function StatsCards() {
  const stats = [
    {
      label: "Total Cost",
      value: "$215k",
      change: "+5%",
      period: "New 365 Days",
      color: "text-blue-600",
    },
    {
      label: "Total Order",
      value: "240",
      change: "+8%",
      period: "Order 365 Days",
      color: "text-slate-600",
    },
    {
      label: "Completed",
      value: "198",
      change: "+5%",
      period: "Comp. Order 365 Days",
      color: "text-green-600",
    },
    {
      label: "Canceled",
      value: "12",
      change: "+8%",
      period: "Canc.Order 365 Days",
      color: "text-red-600",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, idx) => (
        <div key={idx} className="bg-white border-2 border-blue-300 rounded-lg p-6">
          <p className="text-slate-500 text-sm mb-2">{stat.label}</p>
          <p className="text-2xl font-bold text-slate-900 mb-3">{stat.value}</p>
          <p className={`text-sm font-medium ${stat.color}`}>
            {stat.change} {stat.period}
          </p>
        </div>
      ))}
    </div>
  )
}
