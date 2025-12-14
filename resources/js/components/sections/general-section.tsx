"use client"

import type { Permission } from "../permission-dashboard"
import PermissionCardDetail from "../permission-card-detail"

interface GeneralSectionProps {
  permissions: Permission[]
}

export default function GeneralSection({ permissions }: GeneralSectionProps) {
  return (
    <div>
      <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">Semua Perizinan</h2>
      {permissions.length === 0 ? (
        <div className="rounded-lg border-2 border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20 p-8 text-center">
          <p className="text-gray-600 dark:text-gray-400">Belum ada perizinan</p>
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
