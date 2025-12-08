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
}

export default function AnnouncementDetailModal({ announcement, onClose }: AnnouncementDetailModalProps) {
  if (!announcement) return null

  return (
    <>
      <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-40" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={(e) => e.stopPropagation()}>
        <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-8">
            {/* Close Button */}
            <div className="flex justify-end mb-6">
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl font-light">
                ×
              </button>
            </div>

            {/* Image Placeholder */}
            <div className="bg-gray-100 rounded-lg p-12 mb-6 flex items-center justify-center min-h-64">
              <p className="text-gray-500 font-medium">{announcement.image || "Gambar berita"}</p>
            </div>

            {/* Title and Category */}
            <div className="mb-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-900 flex-1">{announcement.title}</h2>
                <span className="bg-gray-200 text-gray-800 px-4 py-2 rounded-full text-sm font-medium ml-4">
                  {announcement.category}
                </span>
              </div>
              <p className="text-gray-500 text-sm">{announcement.time}</p>
            </div>

            {/* Description */}
            {announcement.description && (
              <div className="mb-6">
                <p className="text-gray-600 text-sm font-medium mb-2">Description</p>
                <p className="text-gray-700 leading-relaxed">{announcement.description}</p>
              </div>
            )}

            {/* Content */}
            {announcement.content && (
              <div className="mb-8">
                <p className="text-gray-600 text-sm font-medium mb-2">Content</p>
                <p className="text-gray-700 leading-relaxed">{announcement.content}</p>
              </div>
            )}

            {/* Close Button */}
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
