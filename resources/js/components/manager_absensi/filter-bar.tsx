"use client"

import { ChevronDown } from "lucide-react"

interface FilterBarProps {
  departments: Array<{ id: number; name: string }>
  periods: Array<{ id: number; name: string }>
  selectedDepartment: string
  selectedPeriod: string
  onDepartmentChange: (value: string) => void
  onPeriodChange: (value: string) => void
}

export default function FilterBar({
  departments,
  periods,
  selectedDepartment,
  selectedPeriod,
  onDepartmentChange,
  onPeriodChange,
}: FilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 bg-slate-50 p-4 rounded-lg border border-blue-100">
      {/* Department Dropdown */}
      <div className="flex-1">
        <div className="relative">
          <select
            value={selectedDepartment}
            onChange={(e) => onDepartmentChange(e.target.value)}
            className="w-full px-4 py-2 bg-white border border-blue-200 rounded-lg text-slate-900 font-medium appearance-none cursor-pointer hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          >
            {departments.map((dept) => (
              <option key={dept.id} value={dept.name}>
                {dept.name}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 pointer-events-none w-5 h-5" />
        </div>
      </div>

      {/* Period Dropdown */}
      <div className="flex-1">
        <div className="relative">
          <select
            value={selectedPeriod}
            onChange={(e) => onPeriodChange(e.target.value)}
            className="w-full px-4 py-2 bg-white border border-blue-200 rounded-lg text-slate-900 font-medium appearance-none cursor-pointer hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          >
            {periods.map((period) => (
              <option key={period.id} value={period.name}>
                {period.name}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 pointer-events-none w-5 h-5" />
        </div>
      </div>
    </div>
  )
}
