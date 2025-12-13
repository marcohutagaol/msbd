"use client"

import type React from "react"
import { useState } from "react"

interface AddNewsModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (announcement: {
    title: string
    category: string
    content: string
    time?: string
    image?: string
  }) => void
}

export default function AddNewsModal({ isOpen, onClose, onSubmit }: AddNewsModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    category: "Event",
    content: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title.trim()) {
      alert('Judul tidak boleh kosong')
      return
    }
    
    if (!formData.content.trim()) {
      alert('Isi pengumuman tidak boleh kosong')
      return
    }

    setIsSubmitting(true)
    
    try {
      onSubmit({
        ...formData,
        time: new Date().toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        image: "",
      })
      
      // Reset form
      setFormData({ title: "", category: "Event", content: "" })
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Terjadi kesalahan saat menyimpan')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div 
        className="fixed inset-0 flex items-center justify-center z-50 p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Tambah Pengumuman Baru</h2>
              <button 
                onClick={onClose} 
                className="text-gray-400 hover:text-gray-600 text-2xl font-light transition-colors"
                disabled={isSubmitting}
              >
                ×
              </button>
            </div>
            <p className="text-gray-600 mt-1">Isi form di bawah untuk menambahkan pengumuman baru</p>
          </div>

          {/* Form Content */}
          <div className="flex-1 overflow-y-auto">
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Image Upload (Optional) */}
              <div>
                <label className="block text-gray-700 font-semibold mb-3">
                  Gambar Pengumuman <span className="text-gray-500 text-sm font-normal">(Opsional)</span>
                </label>
                <div 
                  className="bg-gray-50 rounded-xl p-8 text-center border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors cursor-pointer"
                  onClick={() => alert('Fitur upload gambar akan segera tersedia')}
                >
                  <div className="text-gray-400 mb-3">
                    <svg className="w-14 h-14 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-gray-700 font-medium">Upload Gambar</p>
                  <p className="text-sm text-gray-500 mt-1">Klik untuk memilih file (Fitur dalam pengembangan)</p>
                  <p className="text-xs text-gray-400 mt-2">Format: JPG, PNG. Maks: 2MB</p>
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Judul Pengumuman <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Contoh: Libur Tahun Baru 2025"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Kategori <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-all"
                  required
                  disabled={isSubmitting}
                >
                  <option value="Vacation">Liburan</option>
                  <option value="News">Berita</option>
                  <option value="Announcement">Kebijakan</option>
                  <option value="Meeting">Meeting / Rapat</option>
                  <option value="Training">Pelatihan</option>
                </select>
              </div>

              {/* Content */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Isi Pengumuman <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Tulis isi lengkap pengumuman di sini..."
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
                  required
                  disabled={isSubmitting}
                />
                <p className="text-sm text-gray-500 mt-2">
                  {formData.content.length}/5000 karakter
                </p>
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-200 bg-gray-50">
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 border border-gray-300 rounded-full font-semibold text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                Batal
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
                className="bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Menyimpan...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Simpan Pengumuman</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}