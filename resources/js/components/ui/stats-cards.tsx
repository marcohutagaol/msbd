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
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-50 to-blue-100/50",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      label: "Total Items",
      value: stats.total_items.toString(),
      change: "+8%",
      period: "Items 365 Days",
      color: "from-purple-500 to-purple-600",
      bgColor: "from-purple-50 to-purple-100/50",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
    },
    {
      label: "Completed",
      value: stats.completed_requests.toString(),
      change: "+5%",
      period: "Comp. Order 365 Days",
      color: "from-emerald-500 to-emerald-600",
      bgColor: "from-emerald-50 to-emerald-100/50",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      label: "Rejected",
      value: stats.rejected_requests.toString(),
      change: "+2%",
      period: "Reject Order 365 Days",
      color: "from-rose-500 to-rose-600",
      bgColor: "from-rose-50 to-rose-100/50",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((stat, idx) => (
        <div 
          key={idx} 
          className="group relative overflow-hidden bg-white rounded-2xl border-2 border-blue-500 shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-[1.02] transition-all duration-300"
        >
          {/* Background gradient overlay */}
          <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgColor} opacity-50`} />
          
          {/* Glow effect */}
          <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity`} />
          
          <div className="relative p-5">
            {/* Icon and Label */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <p className="text-slate-600 text-sm font-semibold mb-1 uppercase tracking-wide">
                  {stat.label}
                </p>
              </div>
              
              {/* Icon Container */}
              <div className="relative">
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-xl blur opacity-40`} />
                <div className={`relative flex items-center justify-center w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl shadow-md text-white group-hover:scale-110 transition-transform`}>
                  {stat.icon}
                </div>
              </div>
            </div>
            
            {/* Value */}
            <div className="mb-3">
              <p className="text-4xl font-black text-slate-900">
                {stat.value}
              </p>
            </div>
            
            {/* Change indicator */}
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold bg-gradient-to-r ${stat.color} text-white shadow-sm`}>
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                {stat.change}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {stat.period}
              </span>
            </div>
          </div>
          
          {/* Bottom accent line */}
          <div className={`h-1 bg-gradient-to-r ${stat.color}`} />
        </div>
      ))}
    </div>
  )
}