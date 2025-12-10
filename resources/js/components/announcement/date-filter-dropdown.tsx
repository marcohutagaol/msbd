"use client"

interface DateFilterDropdownProps {
  selectedFilter: string
  onFilterChange: (filter: string) => void
}

export default function DateFilterDropdown({ selectedFilter, onFilterChange }: DateFilterDropdownProps) {
  const filterOptions = [
    { value: "all", label: "All Time" },
    { value: "week", label: "This Week" },
    { value: "month", label: "This Month" },
    { value: "6months", label: "Last 6 Months" },
    { value: "year", label: "This Year" },
  ]

  const currentLabel = filterOptions.find((opt) => opt.value === selectedFilter)?.label || "Filter by Date"

  return (
    <div className="relative inline-block">
      <select
        value={selectedFilter}
        onChange={(e) => onFilterChange(e.target.value)}
        className="px-4 py-2 text-gray-700 font-medium border border-gray-300 rounded-lg bg-white hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition appearance-none cursor-pointer pr-8"
      >
        {filterOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {/* Custom dropdown arrow */}
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  )
}
