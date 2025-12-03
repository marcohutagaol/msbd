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

  const [fileError, setFileError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

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

    // Check if same day late arrival
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
      onClose() // Tutup form setelah berhasil submit
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 backdrop-blur-sm" onClick={onClose}></div>

      <div className="relative max-h-screen w-full max-w-md overflow-y-auto rounded-2xl border-2 border-blue-500 bg-white p-8 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Isi Formulir Izin</h2>
          <button 
            onClick={onClose} 
            className="rounded-lg p-1 transition-colors hover:bg-gray-100"
            disabled={isSubmitting}
          >
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
              disabled={isSubmitting}
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
              disabled={isSubmitting}
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
              disabled={isSubmitting}
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
              disabled={isSubmitting}
            />
          </div>

          {/* Bagian Upload File */}
          <div>
            <label className="block text-sm font-semibold text-gray-800">Bukti Pendukung (Opsional)</label>
            
            {!formData.document ? (
              <div className="mt-2">
                <label 
                  htmlFor="file-upload" 
                  className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-blue-300 px-6 py-8 transition-colors hover:border-blue-400 hover:bg-blue-50 cursor-pointer"
                >
                  <div className="text-center">
                    <svg className="mx-auto h-10 w-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <div className="mt-3 flex flex-col items-center">
                      <span className="font-medium text-blue-600 hover:text-blue-700">
                        Klik untuk unggah file
                      </span>
                      <p className="mt-1 text-xs text-gray-500">
                        Format: PDF, JPG, JPEG, PNG (Maks: 2MB)
                      </p>
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
              <div className="mt-2 rounded-lg border-2 border-green-300 bg-green-50 px-4 py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <svg className="h-6 w-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="font-medium text-gray-700">{formData.document.name}</p>
                      <p className="text-sm text-gray-500">
                        {(formData.document.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="rounded-full p-1 text-red-500 transition-colors hover:bg-red-100"
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
              <p className="mt-2 text-sm text-red-600">{fileError}</p>
            )}
          </div>

          <div className="flex gap-3 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border-2 border-gray-300 px-4 py-2.5 font-semibold text-gray-700 transition-all hover:bg-gray-50 hover:border-gray-400 disabled:opacity-50"
              disabled={isSubmitting}
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 rounded-lg border-2 border-blue-500 bg-blue-500 px-4 py-2.5 font-semibold text-white transition-all hover:bg-blue-600 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  <span className="ml-2">Mengirim...</span>
                </div>
              ) : (
                "Kirim"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}