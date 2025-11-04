"use client"

import type React from "react"
import { useState } from "react"
import type { Permission } from "../permission-dashboard"

interface PermissionFormProps {
  onClose: () => void
  onSubmit: (permission: Permission) => void
}

export default function PermissionForm({ onClose, onSubmit }: PermissionFormProps) {
  const [formData, setFormData] = useState({
    date: "",
    reason: "",
    permissionType: "Tidak hadir",
    notes: "",
    document: null as File | null,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.date || !formData.reason) {
      alert("Silakan isi tanggal dan alasan izin")
      return
    }

    // Check if same day late arrival (datang terlambat tidak boleh di hari yang sama)
    const selectedDate = new Date(formData.date)
    const today = new Date()
    if (formData.permissionType === "datang terlambat" && selectedDate.toDateString() === today.toDateString()) {
      alert("Izin datang terlambat tidak dapat dibuat pada hari yang sama")
      return
    }

    const newPermission: Permission = {
      id: Date.now().toString(),
      type: "permission",
      status: "pending",
      createdBy: "Anda",
      createdDate: new Date().toISOString().split("T")[0],
      date: formData.date,
      reason: formData.reason,
      permissionType: formData.permissionType,
      notes: formData.notes,
      time: `${new Date().getHours().toString().padStart(2, "0")}:00 - ${(new Date().getHours() + 1).toString().padStart(2, "0")}:00`,
      location: "Online",
    }

    onSubmit(newPermission)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 backdrop-blur-sm" onClick={onClose}></div>

      <div className="relative max-h-screen w-full max-w-md overflow-y-auto rounded-2xl border-2 border-blue-500 bg-white p-8 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Isi Formulir Izin</h2>
          <button onClick={onClose} className="rounded-lg p-1 transition-colors hover:bg-gray-100">
            <svg className="h-6 w-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-800">
              Tanggal Izin <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              required
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="mt-2 w-full rounded-lg border-2 border-blue-300 px-4 py-2.5 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800">
              Alasan Izin <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              className="mt-2 w-full rounded-lg border-2 border-blue-300 px-4 py-2.5 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              placeholder="Contoh: Aptitude test"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800">
              Jenis Izin <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.permissionType}
              onChange={(e) => setFormData({ ...formData, permissionType: e.target.value })}
              className="mt-2 w-full rounded-lg border-2 border-blue-300 px-4 py-2.5 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            >
              <option value="Tidak hadir">Tidak hadir</option>
              <option value="datang terlambat">Datang terlambat</option>
              <option value="WFH">WFH (Work From Home)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800">Keterangan Tambahan</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
              className="mt-2 w-full rounded-lg border-2 border-blue-300 px-4 py-2.5 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              placeholder="Keterangan tambahan..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800">Bukti Pendukung (Opsional)</label>
            <div className="mt-2 flex items-center justify-center rounded-lg border-2 border-dashed border-blue-300 px-6 py-5 transition-colors hover:border-blue-400 hover:bg-blue-50">
              <div className="text-center">
                <svg className="mx-auto h-8 w-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                </svg>
                <label className="mt-3 cursor-pointer text-sm font-medium text-blue-600 hover:text-blue-700">
                  {formData.document ? formData.document.name : "Klik untuk unggah file"}
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => setFormData({ ...formData, document: e.target.files?.[0] || null })}
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border-2 border-gray-300 px-4 py-2.5 font-semibold text-gray-700 transition-all hover:bg-gray-50 hover:border-gray-400"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 rounded-lg border-2 border-blue-500 bg-blue-500 px-4 py-2.5 font-semibold text-white transition-all hover:bg-blue-600 hover:shadow-lg"
            >
              Kirim
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
