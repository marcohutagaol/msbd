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
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 backdrop-blur-sm" onClick={onClose}></div>

      <div className="relative max-h-screen w-full max-w-md overflow-y-auto rounded-2xl border-2 border-blue-500 bg-white p-8 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Isi Formulir Cuti</h2>
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
              Tanggal Mulai Cuti <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              required
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              className="mt-2 w-full rounded-lg border-2 border-blue-300 px-4 py-2.5 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              disabled={isSubmitting}
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
              disabled={isSubmitting}
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
              disabled={isSubmitting}
            >
              <option value="Cuti Tahunan">Cuti Tahunan</option>
              <option value="Cuti Bersama">Cuti Bersama</option>
              <option value="Cuti Sakit">Cuti Sakit</option>
              <option value="Cuti Maternity">Cuti Maternity</option>
               <option value="Lainnya">Lainnya..</option>
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
              disabled={isSubmitting}
            />
          </div>

          {/* Bagian Upload File yang Diperbarui */}
          <div>
            <label className="block text-sm font-semibold text-gray-800">Bukti Pendukung (Opsional)</label>
            
            {!formData.document ? (
              <div className="mt-2">
                <label 
                  htmlFor="vacation-file-upload" 
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
                  id="vacation-file-upload"
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