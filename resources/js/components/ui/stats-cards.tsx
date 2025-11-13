import React from "react"

interface StatsCardsProps {
  stats: {
    total_requests: number
    pending_requests: number
    approved_requests: number
    completed_requests: number
    rejected_requests: number
    total_items: number
  }
}

export function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      label: "Total Request",
      value: stats.total_requests.toString(),
      change: "+5%",
      period: "New 365 Days",
      color: "text-blue-600",
    },
    {
      label: "Total Items",
      value: stats.total_items.toString(),
      change: "+8%",
      period: "Items 365 Days",
      color: "text-slate-600",
    },
    {
      label: "Completed",
      value: stats.completed_requests.toString(),
      change: "+5%",
      period: "Comp. Order 365 Days",
      color: "text-green-600",
    },
    {
      label: "Rejected",
      value: stats.rejected_requests.toString(),
      change: "+2%",
      period: "Reject Order 365 Days",
      color: "text-red-600",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {cards.map((stat, idx) => (
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