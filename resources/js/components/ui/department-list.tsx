"use client"

import { router } from "@inertiajs/react"

type StatusType = "not-checked" | "complete" | "on-process" | "late"

interface Department {
  id: string
  name: string
  nama_department: string
  total_requests: number
  total_items: number // PASTIKAN INI ADA
  pending_count: number
  approved_count: number
  completed_count: number
}

interface DepartmentListProps {
  departments: Department[]
  onSelectDepartment: (departmentId: string) => void
}

export function DepartmentList({ departments, onSelectDepartment }: DepartmentListProps) {

  const getStatus = (dept: Department): StatusType => {
    // PERBAIKAN: Gunakan total_items untuk menentukan status completion
    if (dept.completed_count === dept.total_items && dept.total_items > 0) {
      return "complete"
    }
    if (dept.pending_count > 0 || dept.approved_count > 0) {
      return "on-process"
    }
    return "not-checked"
  }

  const getStatusBadge = (status: StatusType) => {
    const badgeStyles = {
      "not-checked": "bg-gray-200 text-gray-700",
      complete: "bg-green-200 text-green-700",
      "on-process": "bg-yellow-200 text-yellow-700",
      late: "bg-red-200 text-red-700",
    }

    const badgeLabels = {
      "not-checked": "Not Checked",
      complete: "Complete",
      "on-process": "On Process",
      late: "Late",
    }

    return (
      <span
        className={`inline-flex items-center justify-center w-28 px-3 py-1 rounded-full text-sm font-medium ${badgeStyles[status]}`}
      >
        {badgeLabels[status]}
      </span>
    )
  }

  const today = new Date()
  const formattedDate = today.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
  const formattedTime = today.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  })

  const displayDepartments = departments ?? []
  // Navigasi ke halaman purchasing dengan department ID
 const handleDepartmentClick = (dept: Department) => {
router.visit(`/purchasing/${dept.name}`)

}


  return (
    <div className="space-y-3">
      {displayDepartments.map((dept) => (
        <div
          key={dept.id}
          onClick={() => handleDepartmentClick(dept)}
          className="flex items-center justify-between p-4 bg-white border-2 border-blue-300 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors"
        >
          <div className="flex-1">
            <h3 className="font-semibold text-slate-900">
                {dept.nama_department}   {/* request_number */}
            </h3>

            <p className="text-sm text-slate-500">
           • {dept.total_items} items
            </p>

          </div>
          <div className="flex items-center gap-4">
            {getStatusBadge(getStatus(dept))}
            <div className="text-right text-sm">
              <p className="text-slate-600">{formattedDate}</p>
              <p className="text-slate-500">{formattedTime}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}