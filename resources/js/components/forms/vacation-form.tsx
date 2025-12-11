"use client"

import type React from "react"
import { useState } from "react"

interface Permission {
  id: string
  type: string
  status: string
  createdBy: string
  createdDate: string
  start_date: string
  end_date: string
  days: number
  vacation_type: string
  vacation_reason: string
  location: string
  document: File | null
}

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

  const [fileError, setFileError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const calculateDays = () => {
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate)
      const end = new Date(formData.endDate)
      return Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1
    }
    return 0
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFileError("")

    if (file) {
      // Validasi ukuran file (maksimal 2MB sesuai backend)
      if (file.size > 2 * 1024 * 1024) {
        setFileError("Ukuran file terlalu besar. Maksimal 2MB")
        setFormData({ ...formData, document: null })
        return
      }

      // Validasi tipe file
      const allowedTypes = ['.pdf', '.jpg', '.jpeg', '.png']
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase()
      
      if (!allowedTypes.includes(fileExtension)) {
        setFileError("Tipe file tidak didukung. Gunakan: PDF, JPG, JPEG, PNG")
        setFormData({ ...formData, document: null })
        return
      }
    }

    setFormData({ ...formData, document: file })
  }

  const handleRemoveFile = () => {
    setFormData({ ...formData, document: null })
    setFileError("")
    // Reset input file
    const fileInput = document.getElementById('vacation-file-upload') as HTMLInputElement
    if (fileInput) {
      fileInput.value = ''
    }
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
      type: "vacation",
      status: "pending",
      createdBy: "Anda",
      createdDate: new Date().toISOString().split("T")[0],
      start_date: formData.startDate,
      end_date: formData.endDate,
      days,
      vacation_type: formData.vacationType,
      vacation_reason: formData.reason,
      location: "TBD",
      document: formData.document,
    }

    try {
      await onSubmit(newPermission)
      onClose() // Tutup form setelah berhasil submit
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-green-500/10 to-green-900/20 backdrop-blur-md" 
        onClick={onClose}
      ></div>

      <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white shadow-2xl">
        {/* Header with Gradient */}
        <div className="bg-gradient-to-r from-green-500 via-green-400 to-green-500 p-8 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-1">Formulir Cuti</h2>
                <p className="text-green-100 text-sm">Lengkapi data pengajuan cuti Anda</p>
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
          {/* Tanggal Mulai */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-bold text-gray-800 mb-2">
              <svg className="w-4 h-4 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Tanggal Mulai Cuti
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="date"
              required
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              className="w-full rounded-xl border-2 border-green-200 bg-green-50/30 px-4 py-3.5 text-gray-800 font-medium transition-all focus:border-green-500 focus:outline-none focus:ring-4 focus:ring-green-100 focus:bg-white"
              disabled={isSubmitting}
            />
          </div>

          {/* Tanggal Selesai */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-bold text-gray-800 mb-2">
              <svg className="w-4 h-4 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Tanggal Selesai Cuti
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="date"
              required
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              className="w-full rounded-xl border-2 border-green-200 bg-green-50/30 px-4 py-3.5 text-gray-800 font-medium transition-all focus:border-green-500 focus:outline-none focus:ring-4 focus:ring-green-100 focus:bg-white"
              disabled={isSubmitting}
            />
          </div>

          {/* Jumlah Hari - Featured Card */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-500 to-green-600 p-6 shadow-xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
            <div className="relative">
              <label className="flex items-center text-sm font-bold text-white/90 mb-3">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Jumlah Hari Cuti
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

          {/* Jenis Cuti */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-bold text-gray-800 mb-2">
              <svg className="w-4 h-4 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Jenis Cuti
              <span className="text-red-500 ml-1">*</span>
            </label>
            <select
              value={formData.vacationType}
              onChange={(e) => setFormData({ ...formData, vacationType: e.target.value })}
              className="w-full rounded-xl border-2 border-green-200 bg-green-50/30 px-4 py-3.5 text-gray-800 font-medium transition-all focus:border-green-500 focus:outline-none focus:ring-4 focus:ring-green-100 focus:bg-white cursor-pointer"
              disabled={isSubmitting}
            >
              <option value="Cuti Tahunan">Cuti Tahunan</option>
              <option value="Cuti Bersama">Cuti Bersama</option>
              <option value="Cuti Sakit">Cuti Sakit</option>
              <option value="Cuti Maternity">Cuti Maternity</option>
              <option value="Lainnya">Lainnya..</option>
            </select>
          </div>

          {/* Alasan Cuti */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-bold text-gray-800 mb-2">
              <svg className="w-4 h-4 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Alasan Cuti
              <span className="text-red-500 ml-1">*</span>
            </label>
            <textarea
              required
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              rows={4}
              className="w-full rounded-xl border-2 border-green-200 bg-green-50/30 px-4 py-3.5 text-gray-800 font-medium transition-all focus:border-green-500 focus:outline-none focus:ring-4 focus:ring-green-100 focus:bg-white placeholder:text-gray-400 resize-none"
              placeholder="Jelaskan alasan cuti Anda..."
              disabled={isSubmitting}
            />
          </div>

          {/* Bagian Upload File */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-bold text-gray-800 mb-2">
              <svg className="w-4 h-4 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
              Bukti Pendukung (Opsional)
            </label>
            
            {!formData.document ? (
              <div className="mt-2">
                <label 
                  htmlFor="vacation-file-upload" 
                  className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-green-300 px-6 py-10 transition-all hover:border-green-400 hover:bg-green-50/50 cursor-pointer"
                >
                  <div className="text-center">
                    <div className="mx-auto h-12 w-12 rounded-full bg-green-100 flex items-center justify-center hover:bg-green-200 transition-colors">
                      <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <div className="mt-4 flex flex-col items-center">
                      <span className="font-semibold text-green-600">
                        Klik untuk unggah file
                      </span>
                      <p className="mt-2 text-xs text-gray-500">
                        Format: PDF, JPG, JPEG, PNG
                      </p>
                      <p className="text-xs text-gray-400">
                        Maksimal ukuran 2MB
                      </p>
                    </div>
                  </div>
                </label>
                <input
                  id="vacation-file-upload"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                  disabled={isSubmitting}
                />
              </div>
            ) : (
              <div className="mt-2 rounded-xl border-2 border-green-400 bg-gradient-to-br from-green-50 to-emerald-50 px-5 py-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="rounded-full bg-green-500 p-2">
                      <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{formData.document.name}</p>
                      <p className="text-sm text-gray-500">
                        {(formData.document.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="rounded-full p-2 text-red-500 transition-all hover:bg-red-100 hover:rotate-90 duration-300"
                    disabled={isSubmitting}
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {fileError && (
              <div className="mt-3 flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {fileError}
              </div>
            )}
          </div>

          {/* Info Box */}
          <div className="rounded-xl bg-green-50 border-2 border-green-200 p-4">
            <div className="flex gap-3">
              <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="text-sm font-semibold text-green-900 mb-1">Informasi Penting</p>
                <p className="text-xs text-green-700">Pastikan tanggal cuti yang diajukan sesuai dengan ketersediaan. Pengajuan akan diproses dalam 1x24 jam.</p>
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
              className="flex-1 rounded-xl border-2 border-green-500 bg-gradient-to-r from-green-500 to-green-400 px-6 py-4 font-bold text-white transition-all hover:from-green-600 hover:to-green-500 hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
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