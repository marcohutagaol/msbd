"use client"

import { useState } from "react"
import type { Permission } from "./permission-dashboard"
import PermissionDetailModal from "./permission-detail-modal"

interface PermissionCardDetailProps {
  permission: Permission
}

export default function PermissionCardDetail({ permission }: PermissionCardDetailProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "approved":
        return "Disetujui"
      case "pending":
        return "Menunggu"
      case "rejected":
        return "Ditolak"
      case "completed":
        return "Selesai"
      default:
        return status
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "sick":
        return "Sakit"
      case "permission":
        return "Izin"
      case "vacation":
        return "Cuti"
      default:
        return type
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <>
      <div className="rounded-lg border-2 border-blue-300 bg-white p-6 transition-all hover:shadow-md h-full flex flex-col">
        <div className="mb-6 flex items-start justify-between">
          <div className="flex gap-4 flex-1">
            {/* Date */}
            <div className="flex flex-col items-center justify-start w-16">
              <p className="text-2xl font-bold text-gray-800">
                {new Date(permission.createdDate).getDate().toString().padStart(2, "0")}
              </p>
              <p className="text-xs font-medium text-gray-500">
                {new Date(permission.createdDate)
                  .toLocaleDateString("id-ID", { month: "short" })
                  .toUpperCase()}
              </p>
            </div>

            {/* Info */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">
                {getTypeLabel(permission.type)}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {permission.type === "sick"
                  ? `${permission.days} hari - ${permission.sickType}`
                  : permission.type === "permission"
                    ? `${permission.time} - ${permission.notes || "Izin"}`
                    : `${permission.days} hari - ${permission.vacationType}`}
              </p>
              <p className="text-xs text-gray-500 mt-1">with {permission.createdBy}</p>
            </div>
          </div>

          {/* Menu button */}
          <button className="text-gray-400 hover:text-gray-600 flex-shrink-0">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
          </button>
        </div>

        {/* Details */}
        <div className="grid grid-cols-3 gap-6 mb-6 pb-6 border-b border-gray-200">
          <div>
            <p className="text-xs font-medium text-gray-500 mb-1">LOKASI</p>
            <p className="text-sm font-medium text-gray-900">{permission.location || "Online"}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 mb-1">STATUS</p>
            <span
              className={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${getStatusColor(
                permission.status
              )}`}
            >
              {getStatusText(permission.status)}
            </span>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 mb-1">DIBUAT OLEH</p>
            <p className="text-sm font-medium text-gray-900">{permission.createdBy}</p>
          </div>
        </div>

        {/* Action */}
        <div className="flex justify-end mt-auto">
          <button
            onClick={() => setIsModalOpen(true)}
            className="rounded-full border-2 border-blue-500 px-6 py-2 font-semibold text-blue-600 text-sm transition-colors hover:bg-blue-50"
          >
            View Details
          </button>
        </div>
      </div>

      <PermissionDetailModal
        permission={permission}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}
