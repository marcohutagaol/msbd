"use client"

interface Announcement {
  id: number
  title: string
  category: string
  time: string
  image?: string
  content?: string
  description?: string
}

interface AnnouncementDetailModalProps {
  announcement: Announcement | null
  onClose: () => void
  onDelete?: (id: number) => void // Tambahkan ini
}

export default function AnnouncementDetailModal({ 
  announcement, 
  onClose,
  onDelete 
}: AnnouncementDetailModalProps) {
  if (!announcement) return null

  const handleDelete = () => {
    if (!onDelete) return
    
    if (confirm('Apakah Anda yakin ingin menghapus pengumuman ini?')) {
      onDelete(announcement.id)
      onClose()
    }
  }

  return (
    <>
      <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-40" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={(e) => e.stopPropagation()}>
        <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-8">
            {/* Header with Close Button */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Detail Pengumuman</h2>
                <p className="text-gray-500 text-sm mt-1">Informasi lengkap pengumuman</p>
              </div>
              <button 
                onClick={onClose} 
                className="text-gray-400 hover:text-gray-600 text-2xl font-light"
              >
                ×
              </button>
            </div>

            {/* Image Placeholder */}
            <div className="bg-gray-100 rounded-lg p-12 mb-6 flex items-center justify-center min-h-64">
              {announcement.image ? (
                <img 
                  src={announcement.image} 
                  alt={announcement.title}
                  className="max-w-full max-h-64 object-contain"
                />
              ) : (
                <div className="text-center">
                  <div className="text-gray-400 mb-3">
                    <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-gray-500 font-medium">Tidak ada gambar</p>
                </div>
              )}
            </div>

            {/* Title and Category */}
            <div className="mb-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-900 flex-1">{announcement.title}</h2>
                <span className="bg-gray-200 text-gray-800 px-4 py-2 rounded-full text-sm font-medium ml-4 whitespace-nowrap">
                  {announcement.category}
                </span>
              </div>
              <div className="flex items-center text-gray-500 text-sm">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Dibuat pada: {announcement.time}</span>
              </div>
            </div>

            {/* Description */}
            {announcement.description && (
              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-gray-600 text-sm font-medium mb-2">Deskripsi Singkat</p>
                <p className="text-gray-700 leading-relaxed">{announcement.description}</p>
              </div>
            )}

            {/* Content */}
            {announcement.content && (
              <div className="mb-8">
                <p className="text-gray-600 text-sm font-medium mb-2">Isi Lengkap</p>
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {announcement.content}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-between items-center pt-6 border-t border-gray-200">
              {/* Delete Button (only if onDelete provided) */}
              {onDelete && (
                <button
                  onClick={handleDelete}
                  className="px-6 py-3 border border-red-600 text-red-600 rounded-full font-semibold hover:bg-red-50 transition flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Hapus
                </button>
              )}
              
              {/* Close Button */}
              <div className="flex gap-3 ml-auto">
                <button
                  onClick={onClose}
                  className="px-8 py-3 border border-gray-300 rounded-full font-semibold text-gray-700 hover:bg-gray-50 transition"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}