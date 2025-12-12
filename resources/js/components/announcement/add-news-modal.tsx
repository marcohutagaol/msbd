"use client"

import type React from "react"

import { useState } from "react"

interface AddNewsModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (announcement: {
    title: string
    category: string
    time: string
    content: string
  }) => void
}

export default function AddNewsModal({ isOpen, onClose, onSubmit }: AddNewsModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    category: "Event",
    content: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.title.trim()) {
      onSubmit({
        ...formData,
        time: new Date().toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      })
      setFormData({ title: "", category: "Event", content: "" })
    }
  }

  if (!isOpen) return null

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

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Image Upload */}
              <div className="bg-gray-100 rounded-lg p-12 text-center border-2 border-dashed border-gray-300 hover:border-blue-500 transition cursor-pointer">
                <p className="text-gray-600 font-medium">Upload Gambar berita</p>
              </div>

              {/* Title */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Title Here"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option>Event</option>
                  <option>Vacation</option>
                  <option>News</option>
                  <option>Announcement</option>
                </select>
              </div>

              {/* Content */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Content</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Write your announcement content here..."
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
