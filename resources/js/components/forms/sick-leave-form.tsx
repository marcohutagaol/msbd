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

  const [isSubmitting, setIsSubmitting] = useState(false)

  const calculateDays = () => {
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate)
      const end = new Date(formData.endDate)
      return Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1
    }
    return 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const days = calculateDays()

    if (!formData.startDate || !formData.endDate || days <= 0) {
      alert("Silakan isi tanggal mulai dan selesai dengan benar")
      setIsSubmitting(false)
      return
    }

    const newPermission: Permission = {
      id: Date.now().toString(),
      type: "sick",
      status: "pending",
      createdBy: "Anda",
      createdDate: new Date().toISOString().split("T")[0],
      start_date: formData.startDate,
      end_date: formData.endDate,
      days,
      sick_type: formData.sickType,
      notes: formData.notes,
      location: "Online",
    }

    try {
      await onSubmit(newPermission)
      onClose()
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-blue-500/10 to-blue-900/20 backdrop-blur-md" 
        onClick={onClose}
      ></div>

      <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white shadow-2xl">
        {/* Header with Gradient */}
        <div className="bg-gradient-to-r from-red-500 via-red-400 to-red-500 p-8 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-1">Formulir Sakit</h2>
                <p className="text-red-100 text-sm">Lengkapi data cuti sakit Anda</p>
              </div>
            </div>
            <button 
              onClick={onClose} 
              className="rounded-xl p-2 bg-white/10 backdrop-blur-sm transition-all hover:bg-white/20 hover:rotate-90 duration-300"
              disabled={isSubmitting}
            >
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-8 space-y-6">
          {/* Tanggal Pengajuan */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-bold text-gray-800 mb-2">
              <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Tanggal Pengajuan
            </label>
            <div className="relative">
              <input
                type="date"
                disabled
                value={new Date().toISOString().split("T")[0]}
                className="w-full rounded-xl border-2 border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-3.5 text-gray-500 font-semibold cursor-not-allowed"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">
                Hari Ini
              </div>
            </div>
          </div>

          {/* Tanggal Mulai */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-bold text-gray-800 mb-2">
              <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Tanggal Mulai Sakit
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="date"
              required
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              className="w-full rounded-xl border-2 border-blue-200 bg-blue-50/30 px-4 py-3.5 text-gray-800 font-medium transition-all focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:bg-white"
              disabled={isSubmitting}
            />
          </div>

          {/* Tanggal Selesai */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-bold text-gray-800 mb-2">
              <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Tanggal Selesai Sakit
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="date"
              required
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              className="w-full rounded-xl border-2 border-blue-200 bg-blue-50/30 px-4 py-3.5 text-gray-800 font-medium transition-all focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:bg-white"
              disabled={isSubmitting}
            />
          </div>

          {/* Jumlah Hari - Featured Card */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 p-6 shadow-xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
            <div className="relative">
              <label className="flex items-center text-sm font-bold text-white/90 mb-3">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Jumlah Hari Sakit
              </label>
              <div className="flex items-center gap-4">
                <div className="flex-1 rounded-xl bg-white/20 backdrop-blur-sm border-2 border-white/30 px-4 py-4">
                  <div className="text-4xl font-bold text-white">
                    {calculateDays() > 0 ? calculateDays() : "0"}
                  </div>
                </div>
                <div className="text-2xl font-bold text-white">
                  Hari
                </div>
              </div>
            </div>
          </div>

          {/* Jenis Sakit */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-bold text-gray-800 mb-2">
              <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Jenis Sakit
              <span className="text-red-500 ml-1">*</span>
            </label>
            <select
              value={formData.sickType}
              onChange={(e) => setFormData({ ...formData, sickType: e.target.value })}
              className="w-full rounded-xl border-2 border-blue-200 bg-blue-50/30 px-4 py-3.5 text-gray-800 font-medium transition-all focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:bg-white cursor-pointer"
              disabled={isSubmitting}
            >
              <option value="ringan">🟢 Ringan - Tidak memerlukan perawatan khusus</option>
              <option value="sedang">🟡 Sedang - Memerlukan istirahat dan obat</option>
              <option value="berat">🔴 Berat - Memerlukan perawatan intensif</option>
            </select>
          </div>

          {/* Keterangan */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-bold text-gray-800 mb-2">
              <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
              Keterangan Kondisi Kesehatan
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={4}
              className="w-full rounded-xl border-2 border-blue-200 bg-blue-50/30 px-4 py-3.5 text-gray-800 font-medium transition-all focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:bg-white placeholder:text-gray-400 resize-none"
              placeholder="Jelaskan kondisi kesehatan Anda, gejala yang dialami, dan hal lain yang perlu diketahui..."
              disabled={isSubmitting}
            />
          </div>

          {/* Info Box */}
          <div className="rounded-xl bg-blue-50 border-2 border-blue-200 p-4">
            <div className="flex gap-3">
              <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="text-sm font-semibold text-blue-900 mb-1">Informasi Penting</p>
                <p className="text-xs text-blue-700">Pastikan untuk melampirkan surat keterangan dokter jika sakit lebih dari 2 hari. Pengajuan akan diproses dalam 1x24 jam.</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border-2 border-gray-300 bg-white px-6 py-4 font-bold text-gray-700 transition-all hover:bg-gray-50 hover:border-gray-400 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              Batal
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 rounded-xl border-2 border-red-500 bg-gradient-to-r from-red-500 to-red-400 px-6 py-4 font-bold text-white transition-all hover:from-red-600 hover:to-red-500 hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="h-5 w-5 animate-spin rounded-full border-3 border-white border-t-transparent"></div>
                  <span className="ml-3">Mengirim...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Kirim Pengajuan
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}