"use client"

import { router } from "@inertiajs/react"

type StatusType = "not-checked" | "complete" | "on-process" | "late"

interface Department {
  id: string
  name: string
  nama_department: string
  total_requests: number
  total_items: number
  pending_count: number
  approved_count: number
  completed_count: number
}

interface DepartmentListProps {
  departments: Department[]
  onSelectDepartment: (departmentId: string) => void
}

export function DepartmentList({ departments, onSelectDepartment }: DepartmentListProps) {

  const getDepartmentIcon = (deptName: string) => {
    const name = deptName.toLowerCase()
    
    // Food & Beverage
    if (name.includes('food') || name.includes('beverage') || name.includes('f&b')) {
      return (
        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    }
    
    // Front Office
    if (name.includes('front') || name.includes('office') || name.includes('reception')) {
      return (
        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    }
    
    // Housekeeping
    if (name.includes('housekeeping') || name.includes('cleaning')) {
      return (
        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    }
    
    // Landscape / Gardening
    if (name.includes('landscape') || name.includes('garden')) {
      return (
        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      )
    }
    
    // Engineering & Maintenance
    if (name.includes('engineering') || name.includes('maintenance') || name.includes('technical')) {
      return (
        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    }
    
    // Security
    if (name.includes('security') || name.includes('safety')) {
      return (
        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    }
    
    // Accounting & Administration
    if (name.includes('accounting') || name.includes('finance') || name.includes('administration')) {
      return (
        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    }
    
    // Marketing
    if (name.includes('marketing') || name.includes('sales')) {
      return (
        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
        </svg>
      )
    }
    
    // Default icon untuk department lainnya
    return (
      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    )
  }

  const getStatus = (dept: Department): StatusType => { 
    if (dept.completed_count === dept.total_items && dept.total_items > 0) {
      return "complete"
    }
    if (dept.pending_count > 0 || dept.approved_count > 0) {
      return "on-process"
    }
    return "not-checked"
  }

  const getStatusBadge = (status: StatusType) => {
    const styles = {
      "not-checked": "bg-slate-500",
      complete: "bg-emerald-500",
      "on-process": "bg-amber-500",
      late: "bg-rose-500",
    }

    const labels = {
      "not-checked": "Not Checked",
      complete: "Complete",
      "on-process": "On Process",
      late: "Late",
    }

    return (
      <span className={`inline-block min-w-[90px] text-center px-2 py-1 rounded-md text-white text-xs font-semibold ${styles[status]}`}>
        {labels[status]}
      </span>
    )
  }

  const today = new Date()
  const formattedDate = today.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
  const formattedTime = today.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  })

  const displayDepartments = departments ?? []

  const handleDepartmentClick = (dept: Department) => {
    router.visit(`/purchasing/${dept.name}`)
  }

  return (
    <div className="space-y-2">
      {displayDepartments.map((dept) => (
        <div
          key={dept.id}
          onClick={() => handleDepartmentClick(dept)}
          className="group bg-white rounded-lg border-2 border-blue-500 shadow-md hover:shadow-lg hover:border-blue-600 transition-all duration-200 cursor-pointer"
        >
          <div className="p-3 md:p-4">
            {/* Mobile Layout */}
            <div className="md:hidden space-y-2">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <div className="flex items-center justify-center w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex-shrink-0">
                    {getDepartmentIcon(dept.nama_department)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-slate-900 truncate">{dept.nama_department}</h3>
                    <p className="text-xs text-slate-600">
                      <span className="font-semibold text-blue-600">{dept.total_items}</span> items
                    </p>
                  </div>
                </div>
                {getStatusBadge(getStatus(dept))}
              </div>
              
              <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100">
                <span>{formattedDate}</span>
                <span>{formattedTime}</span>
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex-shrink-0">
                  {getDepartmentIcon(dept.nama_department)}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-bold text-slate-900 truncate">{dept.nama_department}</h3>
                  <p className="text-sm text-slate-600">
                    <span className="font-semibold text-blue-600">{dept.total_items}</span> items
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {getStatusBadge(getStatus(dept))}

                <div className="flex flex-col items-end text-xs text-slate-600">
                  <p className="font-medium">{formattedDate}</p>
                  <p className="text-slate-500">{formattedTime}</p>
                </div>

                <svg className="w-5 h-5 text-blue-500 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}