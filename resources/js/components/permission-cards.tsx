"use client"

import { Heart, Clock, Calendar } from "lucide-react"

interface Permission {
  id: string
  type: string
  status: string
}

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
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Buat Perizinan Baru</h2>
        <p className="text-gray-600 dark:text-gray-400">Pilih jenis perizinan yang ingin Anda ajukan</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Sick Leave Card - Red Theme */}
        <button
          onClick={() => onCardClick("sick")}
          className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-500 to-red-600 p-[2px] transition-all hover:scale-105 hover:shadow-2xl hover:shadow-red-200"
        >
          <div className="relative h-full rounded-2xl bg-white dark:bg-slate-800 p-6 transition-all group-hover:bg-gradient-to-br group-hover:from-red-50 group-hover:to-white dark:group-hover:from-red-900/20 dark:group-hover:to-slate-800">
            {/* Decorative circles */}
            <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-gradient-to-br from-red-400/20 to-red-500/20 blur-2xl" />
            <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-gradient-to-br from-red-400/10 to-red-500/10 blur-xl" />

            <div className="relative flex flex-col gap-6 min-h-[180px]">
              {/* Icon section */}
              <div className="flex items-start justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-red-600 shadow-lg shadow-red-200 transition-transform group-hover:scale-110">
                  <Heart className="h-7 w-7 text-white" fill="white" />
                </div>
                {sickCount > 0 && (
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-red-100 border-2 border-red-500">
                    <span className="text-xs font-bold text-red-700">{sickCount}</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex flex-col gap-2 text-left">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Sakit</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Ajukan izin sakit dengan surat keterangan dokter
                </p>
              </div>

              {/* Footer status */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <span className="text-xs text-gray-500 font-medium">Status</span>
                <div className="flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-xs font-semibold text-red-600">{sickCount} menunggu</span>
                </div>
              </div>
            </div>
          </div>
        </button>

        {/* Permission Card - Blue Theme */}
        <button
          onClick={() => onCardClick("permission")}
          className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 p-[2px] transition-all hover:scale-105 hover:shadow-2xl hover:shadow-blue-200"
        >
          <div className="relative h-full rounded-2xl bg-white dark:bg-slate-800 p-6 transition-all group-hover:bg-gradient-to-br group-hover:from-blue-50 group-hover:to-white dark:group-hover:from-blue-900/20 dark:group-hover:to-slate-800">
            {/* Decorative circles */}
            <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-gradient-to-br from-blue-400/20 to-blue-500/20 blur-2xl" />
            <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-gradient-to-br from-blue-400/10 to-blue-500/10 blur-xl" />

            <div className="relative flex flex-col gap-6 min-h-[180px]">
              {/* Icon section */}
              <div className="flex items-start justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-200 transition-transform group-hover:scale-110">
                  <Clock className="h-7 w-7 text-white" />
                </div>
                {permissionCount > 0 && (
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 border-2 border-blue-500">
                    <span className="text-xs font-bold text-blue-700">{permissionCount}</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex flex-col gap-2 text-left">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Izin</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Ajukan izin untuk keperluan pribadi atau keluarga
                </p>
              </div>

              {/* Footer status */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <span className="text-xs text-gray-500 font-medium">Status</span>
                <div className="flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                  <span className="text-xs font-semibold text-blue-600">{permissionCount} menunggu</span>
                </div>
              </div>
            </div>
          </div>
        </button>

        {/* Vacation Card - Green Theme */}
        <button
          onClick={() => onCardClick("vacation")}
          className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-500 to-green-600 p-[2px] transition-all hover:scale-105 hover:shadow-2xl hover:shadow-green-200"
        >
          <div className="relative h-full rounded-2xl bg-white dark:bg-slate-800 p-6 transition-all group-hover:bg-gradient-to-br group-hover:from-green-50 group-hover:to-white dark:group-hover:from-green-900/20 dark:group-hover:to-slate-800">
            {/* Decorative circles */}
            <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-gradient-to-br from-green-400/20 to-green-500/20 blur-2xl" />
            <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-gradient-to-br from-green-400/10 to-green-500/10 blur-xl" />

            <div className="relative flex flex-col gap-6 min-h-[180px]">
              {/* Icon section */}
              <div className="flex items-start justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-green-600 shadow-lg shadow-green-200 transition-transform group-hover:scale-110">
                  <Calendar className="h-7 w-7 text-white" />
                </div>
                {vacationCount > 0 && (
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-100 border-2 border-green-500">
                    <span className="text-xs font-bold text-green-700">{vacationCount}</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex flex-col gap-2 text-left">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Cuti</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Ajukan cuti tahunan atau cuti bersama
                </p>
              </div>

              {/* Footer status */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <span className="text-xs text-gray-500 font-medium">Status</span>
                <div className="flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs font-semibold text-green-600">{vacationCount} menunggu</span>
                </div>
              </div>
            </div>
          </div>
        </button>
      </div>
    </div>
  )
}