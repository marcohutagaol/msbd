"use client"

import type React from "react"
import { useState } from "react"
import type { Permission } from "../permission-dashboard"

interface SickLeaveFormProps {
  onClose: () => void
  onSubmit: (permission: Permission) => void
}

export default function SickLeaveForm({ onClose, onSubmit }: SickLeaveFormProps) {
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    sickType: "ringan",
    notes: "",
  })

  const calculateDays = () => {
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate)
      const end = new Date(formData.endDate)
      return Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1
    }
    return 0
  }

 const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault()
  const days = calculateDays()

  if (!formData.startDate || !formData.endDate || days <= 0) {
    alert("Silakan isi tanggal mulai dan selesai dengan benar")
    return
  }

  const newPermission: Permission = {
    id: Date.now().toString(),
    type: "sick",
    status: "pending",
    createdBy: "Anda",
    createdDate: new Date().toISOString().split("T")[0],
    start_date: formData.startDate,    // ⬅️ SNAKE_CASE
    end_date: formData.endDate,        // ⬅️ SNAKE_CASE
    days,
    sick_type: formData.sickType,      // ⬅️ SNAKE_CASE
    notes: formData.notes,
    location: "Online",
  }

  onSubmit(newPermission)
}
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 backdrop-blur-sm" onClick={onClose}></div>

      <div className="relative max-h-screen w-full max-w-md overflow-y-auto rounded-2xl border-2 border-blue-500 bg-white p-8 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Isi Formulir Sakit</h2>
          <button onClick={onClose} className="rounded-lg p-1 transition-colors hover:bg-gray-100">
            <svg className="h-6 w-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-800">Tanggal Pengajuan (Hari Ini)</label>
            <input
              type="date"
              disabled
              value={new Date().toISOString().split("T")[0]}
              className="mt-2 w-full rounded-lg border-2 border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-600 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800">
              Tanggal Mulai Sakit <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              required
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              className="mt-2 w-full rounded-lg border-2 border-blue-300 px-4 py-2.5 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800">
              Tanggal Selesai Sakit <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              required
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              className="mt-2 w-full rounded-lg border-2 border-blue-300 px-4 py-2.5 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="rounded-lg bg-blue-50 p-4">
            <label className="block text-sm font-semibold text-gray-800">Jumlah Hari Sakit</label>
            <input
              type="text"
              disabled
              value={calculateDays() > 0 ? calculateDays() + " hari" : "0 hari"}
              className="mt-2 w-full rounded-lg border-2 border-blue-200 bg-white px-4 py-2.5 text-blue-600 font-semibold"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800">
              Jenis Sakit <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.sickType}
              onChange={(e) => setFormData({ ...formData, sickType: e.target.value })}
              className="mt-2 w-full rounded-lg border-2 border-blue-300 px-4 py-2.5 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            >
              <option value="ringan">Ringan</option>
              <option value="sedang">Sedang</option>
              <option value="berat">Berat</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800">Keterangan</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
              className="mt-2 w-full rounded-lg border-2 border-blue-300 px-4 py-2.5 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              placeholder="Jelaskan kondisi kesehatan Anda..."
            />
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
