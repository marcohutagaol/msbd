"use client"

import type React from "react"
import { useState } from "react"

interface Permission {
  id: string
  type: string
  status: string
  createdBy: string
  createdDate: string
  permission_date?: string
  reason?: string
  permission_type?: string
  notes?: string
  time?: string
  location: string
  document?: File | null
}

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

  const [fileError, setFileError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFileError("")

    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setFileError("Ukuran file terlalu besar. Maksimal 2MB")
        setFormData({ ...formData, document: null })
        return
      }

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
    const fileInput = document.getElementById('file-upload') as HTMLInputElement
    if (fileInput) {
      fileInput.value = ''
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    if (!formData.date || !formData.reason) {
      alert("Silakan isi tanggal dan alasan izin")
      setIsSubmitting(false)
      return
    }

    const selectedDate = new Date(formData.date)
    const today = new Date()
    if (formData.permissionType === "datang terlambat" && selectedDate.toDateString() === today.toDateString()) {
      alert("Izin datang terlambat tidak dapat dibuat pada hari yang sama")
      setIsSubmitting(false)
      return
    }

    const newPermission: Permission = {
      id: Date.now().toString(),
      type: "permission",
      status: "pending",
      createdBy: "Anda",
      createdDate: new Date().toISOString().split("T")[0],
      permission_date: formData.date,
      reason: formData.reason,
      permission_type: formData.permissionType,
      notes: formData.notes,
      time: `${new Date().getHours().toString().padStart(2, "0")}:00 - ${(new Date().getHours() + 1).toString().padStart(2, "0")}:00`,
      location: "Online",
      document: formData.document,
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
        <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 p-8 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-1">Formulir Izin</h2>
                <p className="text-blue-100 text-sm">Lengkapi informasi di bawah ini</p>
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
          {/* Tanggal Izin */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-bold text-gray-800 mb-2">
              <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Tanggal Izin
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="date"
              required
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full rounded-xl border-2 border-blue-200 bg-blue-50/30 px-4 py-3.5 text-gray-800 font-medium transition-all focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:bg-white"
              disabled={isSubmitting}
            />
          </div>

          {/* Alasan Izin */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-bold text-gray-800 mb-2">
              <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Alasan Izin
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              className="w-full rounded-xl border-2 border-blue-200 bg-blue-50/30 px-4 py-3.5 text-gray-800 font-medium transition-all focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:bg-white placeholder:text-gray-400"
              placeholder="Contoh: Aptitude test, Keperluan keluarga"
              disabled={isSubmitting}
            />
          </div>

          {/* Jenis Izin */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-bold text-gray-800 mb-2">
              <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Jenis Izin
              <span className="text-red-500 ml-1">*</span>
            </label>
            <select
              value={formData.permissionType}
              onChange={(e) => setFormData({ ...formData, permissionType: e.target.value })}
              className="w-full rounded-xl border-2 border-blue-200 bg-blue-50/30 px-4 py-3.5 text-gray-800 font-medium transition-all focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:bg-white cursor-pointer"
              disabled={isSubmitting}
            >
              <option value="Tidak hadir">🚫 Tidak hadir</option>
              <option value="datang terlambat">⏰ Datang terlambat</option>
              <option value="WFH">🏠 WFH (Work From Home)</option>
            </select>
          </div>

          {/* Keterangan Tambahan */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-bold text-gray-800 mb-2">
              <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
              Keterangan Tambahan
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
              className="w-full rounded-xl border-2 border-blue-200 bg-blue-50/30 px-4 py-3.5 text-gray-800 font-medium transition-all focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:bg-white placeholder:text-gray-400 resize-none"
              placeholder="Tambahkan keterangan detail jika diperlukan..."
              disabled={isSubmitting}
            />
          </div>

          {/* Upload File */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-bold text-gray-800 mb-2">
              <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
              Bukti Pendukung
              <span className="text-gray-500 text-xs ml-2 font-normal">(Opsional)</span>
            </label>
            
            {!formData.document ? (
              <div className="mt-2">
                <label 
                  htmlFor="file-upload" 
                  className="group flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-blue-300 bg-gradient-to-br from-blue-50 to-white px-6 py-10 transition-all hover:border-blue-500 hover:from-blue-100 hover:to-blue-50 cursor-pointer"
                >
                  <div className="text-center">
                    <div className="mx-auto h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 p-3 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <svg className="h-full w-full text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <div className="mt-4 flex flex-col items-center">
                      <span className="text-lg font-bold text-blue-600 group-hover:text-blue-700">
                        Klik untuk unggah file
                      </span>
                      <p className="mt-2 text-sm text-gray-500">
                        atau seret file ke area ini
                      </p>
                      <div className="mt-3 inline-flex items-center gap-2 rounded-lg bg-blue-100 px-3 py-1.5">
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-xs font-semibold text-blue-700">
                          PDF, JPG, JPEG, PNG • Max 2MB
                        </span>
                      </div>
                    </div>
                  </div>
                </label>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                  disabled={isSubmitting}
                />
              </div>
            ) : (
              <div className="mt-2 rounded-2xl border-2 border-blue-300 bg-gradient-to-br from-blue-50 to-white p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 p-3 shadow-md">
                      <svg className="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">{formData.document.name}</p>
                      <p className="text-sm text-blue-600 font-semibold mt-0.5">
                        {(formData.document.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="rounded-xl bg-red-100 p-2.5 text-red-600 transition-all hover:bg-red-200 hover:scale-110"
                    disabled={isSubmitting}
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {fileError && (
              <div className="mt-3 flex items-start gap-2 rounded-xl bg-red-50 border-2 border-red-200 p-3">
                <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm font-semibold text-red-700">{fileError}</p>
              </div>
            )}
          </div>

          {/* Info Box */}
          <div className="rounded-xl bg-blue-50 border-2 border-blue-200 p-4">
            <div className="flex gap-3">
              <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="text-sm font-semibold text-blue-900 mb-1">Informasi Penting</p>
                <p className="text-xs text-blue-700">Izin datang terlambat tidak dapat dibuat pada hari yang sama. Pengajuan akan diproses dalam 1x24 jam.</p>
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
              className="flex-1 rounded-xl border-2 border-blue-600 bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-4 font-bold text-white transition-all hover:from-blue-700 hover:to-blue-600 hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Kirim Permohonan
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}