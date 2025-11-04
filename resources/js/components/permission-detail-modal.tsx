"use client"

import type { Permission } from "./permission-dashboard"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2, XCircle, Clock, Plane } from "lucide-react"

interface PermissionDetailModalProps {
  permission: Permission
  isOpen: boolean
  onClose: () => void
}

export default function PermissionDetailModal({
  permission,
  isOpen,
  onClose,
}: PermissionDetailModalProps) {
  if (!isOpen) return null

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle2 className="text-green-600" size={22} />
      case "pending":
        return <Clock className="text-yellow-600" size={22} />
      case "rejected":
        return <XCircle className="text-red-600" size={22} />
      default:
        return <Plane className="text-gray-600" size={22} />
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

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl mx-4 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-blue-50 p-6 border-b border-blue-200">
              <div className="flex items-center gap-3">
                {getStatusIcon(permission.status)}
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {getTypeLabel(permission.type)}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {new Date(permission.createdDate).toLocaleDateString("id-ID", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold transition"
              >
                ×
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-6">
              {/* Status & Creator */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-semibold text-gray-500 mb-2">STATUS</p>
                  <span
                    className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(
                      permission.status
                    )}`}
                  >
                    {getStatusText(permission.status)}
                  </span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 mb-2">DIBUAT OLEH</p>
                  <p className="text-sm font-medium text-gray-900">
                    {permission.createdBy}
                  </p>
                </div>
              </div>

              {/* Detail Section */}
              <div className="border-t border-gray-200 pt-4 space-y-4">
                {permission.type === "sick" && (
                  <>
                    <DetailRow
                      label="Tanggal Mulai"
                      value={new Date(permission.startDate).toLocaleDateString("id-ID")}
                    />
                    <DetailRow
                      label="Tanggal Selesai"
                      value={new Date(permission.endDate).toLocaleDateString("id-ID")}
                    />
                    <DetailRow label="Jumlah Hari" value={`${permission.days} hari`} />
                    <DetailRow label="Jenis Sakit" value={permission.sickType} />
                    {permission.notes && (
                      <DetailRow label="Keterangan" value={permission.notes} />
                    )}
                  </>
                )}

                {permission.type === "permission" && (
                  <>
                    <DetailRow
                      label="Tanggal Izin"
                      value={new Date(permission.createdDate).toLocaleDateString("id-ID")}
                    />
                    <DetailRow label="Jenis Izin" value={permission.permissionType} />
                    {permission.time && (
                      <DetailRow label="Waktu" value={permission.time} />
                    )}
                    {permission.notes && (
                      <DetailRow label="Alasan" value={permission.notes} />
                    )}
                  </>
                )}

                {permission.type === "vacation" && (
                  <>
                    <DetailRow
                      label="Tanggal Mulai"
                      value={new Date(permission.startDate).toLocaleDateString("id-ID")}
                    />
                    <DetailRow
                      label="Tanggal Selesai"
                      value={new Date(permission.endDate).toLocaleDateString("id-ID")}
                    />
                    <DetailRow label="Jumlah Hari" value={`${permission.days} hari`} />
                    <DetailRow label="Jenis Cuti" value={permission.vacationType} />
                    {permission.notes && (
                      <DetailRow label="Alasan" value={permission.notes} />
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4">
              <button
                onClick={onClose}
                className="rounded-lg border border-gray-300 px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
              >
                Tutup
              </button>
              <button className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700 transition">
                Edit
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

/* Subcomponent for detail rows */
function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-gray-100 pb-2">
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="text-sm font-semibold text-gray-900">{value}</p>
    </div>
  )
}
