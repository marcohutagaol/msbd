"use client"

import { Users } from "lucide-react"

interface AttendanceCardProps {
  label: string
  count: number
  icon: string
}

export default function AttendanceCard({ label, count, icon }: AttendanceCardProps) {
  return (
    <div className="bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-300 rounded-xl p-5 md:p-6 text-white shadow-md hover:shadow-lg h-full">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-6 md:mb-8">
            <div className="bg-blue-500 rounded-lg p-2">
              <Users className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <h3 className="text-base md:text-lg font-semibold">{label}</h3>
          </div>
          <p className="text-3xl md:text-4xl font-bold">{count}</p>
        </div>
      </div>
    </div>
  )
}
