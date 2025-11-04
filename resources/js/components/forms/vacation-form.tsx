"use client"

import type React from "react"
import { useState } from "react"
import type { Permission } from "../permission-dashboard"

interface VacationFormProps {
  onClose: () => void
  onSubmit: (permission: Permission) => void
}

export default function VacationForm({ onClose, onSubmit }: VacationFormProps) {
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    vacationType: "Cuti Tahunan",
    reason: "",
    document: null as File | null,
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
    type: "vacation",
    status: "pending",
    createdBy: "Anda",
    createdDate: new Date().toISOString().split("T")[0],
    start_date: formData.startDate,          // ⬅️ SNAKE_CASE
    end_date: formData.endDate,              // ⬅️ SNAKE_CASE
    days,
    vacation_type: formData.vacationType,    // ⬅️ SNAKE_CASE
    vacation_reason: formData.reason,        // ⬅️ SNAKE_CASE
    location: "TBD",
    document: formData.document,
  }

  onSubmit(newPermission)
}

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 backdrop-blur-sm" onClick={onClose}></div>

      <div className="relative max-h-screen w-full max-w-md overflow-y-auto rounded-2xl border-2 border-blue-500 bg-white p-8 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Isi Formulir Cuti</h2>
          <button onClick={onClose} className="rounded-lg p-1 transition-colors hover:bg-gray-100">
            <svg className="h-6 w-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-800">
              Tanggal Mulai Cuti <span className="text-red-500">*</span>
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
              Tanggal Selesai Cuti <span className="text-red-500">*</span>
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
            <label className="block text-sm font-semibold text-gray-800">Jumlah Hari Cuti</label>
            <input
              type="text"
              disabled
              value={calculateDays() > 0 ? calculateDays() + " hari" : "0 hari"}
              className="mt-2 w-full rounded-lg border-2 border-blue-200 bg-white px-4 py-2.5 text-blue-600 font-semibold"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800">
              Jenis Cuti <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.vacationType}
              onChange={(e) => setFormData({ ...formData, vacationType: e.target.value })}
              className="mt-2 w-full rounded-lg border-2 border-blue-300 px-4 py-2.5 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            >
              <option value="Cuti Tahunan">Cuti Tahunan</option>
              <option value="Cuti Bersama">Cuti Bersama</option>
              <option value="Cuti Sakit">Cuti Sakit</option>
              <option value="Cuti Maternity">Cuti Maternity</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800">
              Alasan Cuti <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              rows={3}
              className="mt-2 w-full rounded-lg border-2 border-blue-300 px-4 py-2.5 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              placeholder="Jelaskan alasan cuti Anda..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800">Lampiran Pendukung (Jika ada)</label>
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
