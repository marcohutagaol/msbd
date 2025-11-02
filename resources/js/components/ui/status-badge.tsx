"use client"

interface StatusBadgeProps {
  status: "completed" | "cancelled" | "published" | "pending"
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const statusConfig = {
    completed: {
      label: "Completed",
      className: "bg-teal-100 text-teal-700 border-2 border-teal-300",
    },
    cancelled: {
      label: "Cancelled",
      className: "bg-red-100 text-red-700 border-2 border-red-300",
    },
    published: {
      label: "Published",
      className: "bg-blue-100 text-blue-700 border-2 border-blue-300",
    },
    pending: {
      label: "Pending",
      className: "bg-amber-100 text-amber-700 border-2 border-amber-300",
    },
  }

  const config = statusConfig[status]

  return (
    <span
      className={`inline-flex items-center justify-center px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${config.className} w-[120px]`}
    >
      {config.label}
    </span>
  )
}
