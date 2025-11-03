"use client"

import type { Permission } from "./permission-dashboard"
import { Heart, Clock, Calendar } from "lucide-react"

interface PermissionCardsProps {
  permissions: Permission[]
  onCardClick: (type: "sick" | "permission" | "vacation") => void
}

export default function PermissionCards({ permissions, onCardClick }: PermissionCardsProps) {
  const sickCount = permissions.filter((p) => p.type === "sick" && p.status === "pending").length
  const permissionCount = permissions.filter((p) => p.type === "permission" && p.status === "pending").length
  const vacationCount = permissions.filter((p) => p.type === "vacation" && p.status === "pending").length

  return (
    <div className="px-8 py-6">
      <h2 className="mb-6 text-lg font-semibold text-gray-900">Buat Perizinan Baru</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Sick Leave Card */}
        <button
          onClick={() => onCardClick("sick")}
          className="group relative overflow-hidden rounded-lg border-2 border-blue-300 bg-gradient-to-br from-white via-white to-red-50 p-6 transition-all hover:shadow-lg hover:border-blue-500"
        >
          {/* Background accent */}
          <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-red-100 opacity-40 group-hover:opacity-60 transition-opacity" />

          <div className="relative flex flex-col items-center justify-center gap-4 min-h-[140px]">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <Heart className="h-8 w-8 text-red-500" />
            </div>
            <div className="text-center">
              <p className="font-semibold text-gray-900">Sakit</p>
              <p className="text-sm text-gray-600">{sickCount} menunggu</p>
            </div>
          </div>
        </button>

        {/* Permission Card */}
        <button
          onClick={() => onCardClick("permission")}
          className="group relative overflow-hidden rounded-lg border-2 border-blue-300 bg-gradient-to-br from-white via-white to-green-50 p-6 transition-all hover:shadow-lg hover:border-blue-500"
        >
          {/* Background accent */}
          <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-green-100 opacity-40 group-hover:opacity-60 transition-opacity" />

          <div className="relative flex flex-col items-center justify-center gap-4 min-h-[140px]">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <Clock className="h-8 w-8 text-green-500" />
            </div>
            <div className="text-center">
              <p className="font-semibold text-gray-900">Izin</p>
              <p className="text-sm text-gray-600">{permissionCount} menunggu</p>
            </div>
          </div>
        </button>

        {/* Vacation Card */}
        <button
          onClick={() => onCardClick("vacation")}
          className="group relative overflow-hidden rounded-lg border-2 border-blue-300 bg-gradient-to-br from-white via-white to-blue-50 p-6 transition-all hover:shadow-lg hover:border-blue-500"
        >
          {/* Background accent */}
          <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-blue-100 opacity-40 group-hover:opacity-60 transition-opacity" />

          <div className="relative flex flex-col items-center justify-center gap-4 min-h-[140px]">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
              <Calendar className="h-8 w-8 text-blue-500" />
            </div>
            <div className="text-center">
              <p className="font-semibold text-gray-900">Cuti</p>
              <p className="text-sm text-gray-600">{vacationCount} menunggu</p>
            </div>
          </div>
        </button>
      </div>
    </div>
  )
}
