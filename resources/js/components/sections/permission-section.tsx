"use client"

import type { Permission } from "../permission-dashboard"
import PermissionCardDetail from "../permission-card-detail"

interface PermissionSectionProps {
  permissions: Permission[]
}

export default function PermissionSection({ permissions }: PermissionSectionProps) {
  return (
    <div>
      <h2 className="mb-6 text-xl font-bold text-gray-900">Riwayat Izin</h2>
      {permissions.length === 0 ? (
        <div className="rounded-lg border-2 border-blue-200 bg-blue-50 p-8 text-center">
          <p className="text-gray-600">Belum ada permohonan izin</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {permissions.map((permission) => (
            <PermissionCardDetail key={permission.id} permission={permission} />
          ))}
        </div>
      )}
    </div>
  )
}
