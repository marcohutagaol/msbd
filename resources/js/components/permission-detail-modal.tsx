"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2, XCircle, Clock, Plane, Edit2, Save, X } from "lucide-react"

interface Permission {
  id: string
  type: "sick" | "permission" | "vacation"
  status: "approved" | "pending" | "rejected" | "completed"
  createdBy: string
  createdDate: string
  startDate?: string
  endDate?: string
  days?: number
  sickType?: string
  notes?: string
  permissionType?: string
  time?: string
  vacationType?: string
}

interface PermissionDetailModalProps {
  permission: Permission
  isOpen: boolean
  onClose: () => void
  onUpdate?: (id: string, data: Partial<Permission>) => void
}

export default function PermissionDetailModal({
  permission,
  isOpen,
  onClose,
  onUpdate,
}: PermissionDetailModalProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<Partial<Permission>>(permission)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSave = async () => {
    setLoading(true)
    setError("")
    try {
      // Validasi data
      if (formData.type === "sick") {
        if (!formData.startDate || !formData.endDate) {
          throw new Error("Tanggal mulai dan selesai harus diisi")
        }
        if (!formData.sickType) {
          throw new Error("Jenis sakit harus diisi")
        }
      } else if (formData.type === "permission") {
        if (!formData.permissionType) {
          throw new Error("Jenis izin harus diisi")
        }
      } else if (formData.type === "vacation") {
        if (!formData.startDate || !formData.endDate) {
          throw new Error("Tanggal mulai dan selesai harus diisi")
        }
        if (!formData.vacationType) {
          throw new Error("Jenis cuti harus diisi")
        }
      }

      // Konversi field names ke snake_case untuk backend Laravel
      const payload = {
        type: formData.type,
        start_date: formData.startDate || null,
        end_date: formData.endDate || null,
        sick_type: formData.sickType || null,
        notes: formData.notes || null,
        permission_type: formData.permissionType || null,
        time: formData.time || null,
        vacation_type: formData.vacationType || null,
      }

      // Call API update
      const response = await fetch(`/api/permissions/${permission.id}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json",
          "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ""
        },
        body: JSON.stringify(payload)
      })

      let data
      try {
        data = await response.json()
      } catch (jsonError) {
        console.error("JSON Parse Error:", response.statusText)
        throw new Error(`Server error: ${response.status} ${response.statusText}`)
      }

      if (!response.ok) {
        throw new Error(data.message || data.error || "Gagal mengupdate permission")
      }

      if (onUpdate) {
        onUpdate(permission.id, formData)
      }

      setIsEditing(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan")
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setFormData(permission)
    setIsEditing(false)
    setError("")
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
            className="w-full max-w-2xl mx-4 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-blue-50 p-6 border-b border-blue-200 sticky top-0">
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
              {/* Success Message */}
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm flex items-center gap-2"
                >
                  <CheckCircle2 size={18} />
                  Permission berhasil diperbarui!
                </motion.div>
              )}

              {/* Error Message */}
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
                  {error}
                </div>
              )}

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

              {/* Detail/Edit Section */}
              <div className="border-t border-gray-200 pt-4 space-y-4">
                {permission.type === "sick" && (
                  <>
                    <DetailRow
                      label="Tanggal Mulai"
                      value={formData.startDate}
                      isEditing={isEditing}
                      type="date"
                      name="startDate"
                      onChange={handleInputChange}
                    />
                    <DetailRow
                      label="Tanggal Selesai"
                      value={formData.endDate}
                      isEditing={isEditing}
                      type="date"
                      name="endDate"
                      onChange={handleInputChange}
                    />
                    <DetailRow
                      label="Jumlah Hari"
                      value={`${formData.days} hari`}
                      isEditing={false}
                    />
                    <DetailRow
                      label="Jenis Sakit"
                      value={formData.sickType}
                      isEditing={isEditing}
                      type="select"
                      name="sickType"
                      options={["ringan", "sedang", "berat"]}
                      onChange={handleInputChange}
                    />
                    {formData.notes && (
                      <DetailRow
                        label="Keterangan"
                        value={formData.notes}
                        isEditing={isEditing}
                        type="textarea"
                        name="notes"
                        onChange={handleInputChange}
                      />
                    )}
                  </>
                )}

                {permission.type === "permission" && (
                  <>
                    <DetailRow
                      label="Tanggal Izin"
                      value={new Date(permission.createdDate).toLocaleDateString("id-ID")}
                      isEditing={false}
                    />
                    <DetailRow
                      label="Jenis Izin"
                      value={formData.permissionType}
                      isEditing={isEditing}
                      type="select"
                      name="permissionType"
                      options={["Tidak hadir", "datang terlambat", "WFH"]}
                      onChange={handleInputChange}
                    />
                    {formData.time && (
                      <DetailRow
                        label="Waktu"
                        value={formData.time}
                        isEditing={isEditing}
                        type="text"
                        name="time"
                        onChange={handleInputChange}
                      />
                    )}
                    {formData.notes && (
                      <DetailRow
                        label="Alasan"
                        value={formData.notes}
                        isEditing={isEditing}
                        type="textarea"
                        name="notes"
                        onChange={handleInputChange}
                      />
                    )}
                  </>
                )}

                {permission.type === "vacation" && (
                  <>
                    <DetailRow
                      label="Tanggal Mulai"
                      value={formData.startDate}
                      isEditing={isEditing}
                      type="date"
                      name="startDate"
                      onChange={handleInputChange}
                    />
                    <DetailRow
                      label="Tanggal Selesai"
                      value={formData.endDate}
                      isEditing={isEditing}
                      type="date"
                      name="endDate"
                      onChange={handleInputChange}
                    />
                    <DetailRow
                      label="Jumlah Hari"
                      value={`${formData.days} hari`}
                      isEditing={false}
                    />
                    <DetailRow
                      label="Jenis Cuti"
                      value={formData.vacationType}
                      isEditing={isEditing}
                      type="select"
                      name="vacationType"
                      options={["Cuti Tahunan", "Cuti Bersama", "Cuti Sakit", "Cuti Maternity"]}
                      onChange={handleInputChange}
                    />
                    {formData.notes && (
                      <DetailRow
                        label="Alasan"
                        value={formData.notes}
                        isEditing={isEditing}
                        type="textarea"
                        name="notes"
                        onChange={handleInputChange}
                      />
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4 sticky bottom-0">
              {!isEditing ? (
                <>
                  <button
                    onClick={onClose}
                    className="rounded-lg border border-gray-300 px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
                  >
                    Tutup
                  </button>
                  {permission.status === "pending" && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700 transition flex items-center gap-2"
                    >
                      <Edit2 size={16} />
                      Edit
                    </button>
                  )}
                </>
              ) : (
                <>
                  <button
                    onClick={handleCancel}
                    disabled={loading}
                    className="rounded-lg border border-gray-300 px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition disabled:opacity-50"
                  >
                    <X size={16} className="inline mr-2" />
                    Batal
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={loading || success}
                    className="rounded-lg bg-green-600 px-6 py-2 text-sm font-medium text-white hover:bg-green-700 transition disabled:opacity-50 flex items-center gap-2"
                  >
                    {success ? (
                      <>
                        <CheckCircle2 size={16} />
                        Tersimpan!
                      </>
                    ) : (
                      <>
                        <Save size={16} />
                        {loading ? "Menyimpan..." : "Simpan"}
                      </>
                    )}
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

/* Subcomponent for detail rows */
interface DetailRowProps {
  label: string
  value?: string
  isEditing: boolean
  type?: "text" | "date" | "select" | "textarea"
  name?: string
  options?: string[]
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void
}

function DetailRow({ label, value, isEditing, type = "text", name, options, onChange }: DetailRowProps) {
  if (isEditing && name && type === "select" && options) {
    return (
      <div className="border-b border-gray-100 pb-2">
        <label className="text-sm font-medium text-gray-500 block mb-2">{label}</label>
        <select
          name={name}
          value={value || ""}
          onChange={onChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">-- Pilih {label.toLowerCase()} --</option>
          {options.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>
    )
  }

  if (isEditing && name && type === "textarea") {
    return (
      <div className="border-b border-gray-100 pb-2">
        <label className="text-sm font-medium text-gray-500 block mb-2">{label}</label>
        <textarea
          name={name}
          value={value || ""}
          onChange={onChange}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>
    )
  }

  if (isEditing && name && type === "date") {
    return (
      <div className="border-b border-gray-100 pb-2">
        <label className="text-sm font-medium text-gray-500 block mb-2">{label}</label>
        <input
          type="date"
          name={name}
          value={value || ""}
          onChange={onChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    )
  }

  return (
    <div className="flex justify-between border-b border-gray-100 pb-2">
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="text-sm font-semibold text-gray-900">{value}</p>
    </div>
  )
}