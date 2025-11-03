"use client"

import { router } from "@inertiajs/react"

type StatusType = "not-checked" | "complete" | "on-process" | "late"

interface Department {
  id: string
  name: string
  items: number
  status: StatusType
  date: string
  time: string
}

interface DepartmentListProps {
  onSelectDepartment: (departmentId: string) => void
}

export function DepartmentList({ onSelectDepartment }: DepartmentListProps) {
  const departments: Department[] = [
    {
      id: "food-beverage",
      name: "Food and Beverage",
      items: 23,
      status: "not-checked",
      date: "20 Desember 2023",
      time: "08:23",
    },
    {
      id: "housekeeping",
      name: "House keeping",
      items: 23,
      status: "complete",
      date: "20 Desember 2023",
      time: "08:23",
    },
    {
      id: "security",
      name: "Security",
      items: 23,
      status: "on-process",
      date: "20 Desember 2023",
      time: "08:23",
    },
    {
      id: "finance",
      name: "Finance",
      items: 23,
      status: "late",
      date: "20 Desember 2023",
      time: "08:23",
    },
  ]

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

  return (
    <div className="space-y-3">
      {departments.map((dept) => (
        <div
          key={dept.id}
          onClick={() => router.visit('/purchasing')}
          className="flex items-center justify-between p-4 bg-white border-2 border-blue-300 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors"
        >
          <div className="flex-1">
            <h3 className="font-semibold text-slate-900">{dept.name}</h3>
            <p className="text-sm text-slate-500">{dept.items} items</p>
          </div>
          <div className="flex items-center gap-4">
            {getStatusBadge(dept.status)}
            <div className="text-right text-sm">
              <p className="text-slate-600">{dept.date}</p>
              <p className="text-slate-500">{dept.time}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
