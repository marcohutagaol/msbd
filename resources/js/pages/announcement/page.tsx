"use client"

import { useState, useEffect } from "react"
import React from "react"

import AppLayout from "@/layouts/app-layout"
import { type BreadcrumbItem } from "@/types"

import AnnouncementList from "@/components/announcement/announcement-list"
import AddNewsModal from "@/components/announcement/add-news-modal"
import AnnouncementDetailModal from "@/components/announcement/announcement-detail-modal"
import DateFilterDropdown from "@/components/announcement/date-filter-dropdown"

interface Announcement {
  id: number
  title: string
  category: string
  content: string
  time: string
  date: string | Date
  image?: string
  description?: string
}

// Interface untuk AnnouncementList (tanpa date)
interface AnnouncementForList {
  id: number
  title: string
  category: string
  time: string
  image?: string
  content?: string
  description?: string
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Announcement",
    href: "#",
  },
]

export default function AnnouncementPage() {
  const [isAddNewsOpen, setIsAddNewsOpen] = useState(false)
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null)
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fungsi untuk mengkonversi Announcement ke AnnouncementForList
  const convertToAnnouncementForList = (announcement: Announcement): AnnouncementForList => {
    return {
      id: announcement.id,
      title: announcement.title,
      category: announcement.category,
      time: announcement.time,
      image: announcement.image,
      content: announcement.content,
      description: announcement.description
    }
  }

  // Fetch announcements dari API
  const fetchAnnouncements = async (filter = "all") => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch(`/api/announcements?filter=${filter}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      })
      
      if (!response.ok) {
        throw new Error('Gagal mengambil data pengumuman')
      }
      
      const data = await response.json()
      
      // Convert date string to Date object if needed
      const formattedData = data.map((item: any) => ({
        ...item,
        date: new Date(item.date) || new Date()
      }))
      
      setAnnouncements(formattedData)
    } catch (err) {
      console.error('Error fetching announcements:', err)
      setError('Gagal memuat pengumuman. Silakan coba lagi.')
      setAnnouncements([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAnnouncements(selectedFilter)
  }, [selectedFilter])

  // Handle select announcement
  const handleSelectAnnouncement = (announcementForList: AnnouncementForList) => {
    // Cari announcement lengkap berdasarkan ID
    const fullAnnouncement = announcements.find(a => a.id === announcementForList.id)
    if (fullAnnouncement) {
      setSelectedAnnouncement(fullAnnouncement)
    }
  }

  // Handle tambah pengumuman
  const handleAddNews = async (newAnnouncement: {
    title: string
    category: string
    content: string
    time?: string
    image?: string
  }) => {
    try {
      const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
      
      const response = await fetch('/api/announcements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-CSRF-TOKEN': csrfToken,
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify({
          title: newAnnouncement.title,
          category: newAnnouncement.category,
          content: newAnnouncement.content,
          image: newAnnouncement.image || '',
        }),
      })

      const result = await response.json()
      
      if (result.success) {
        // Refresh daftar pengumuman
        await fetchAnnouncements(selectedFilter)
        setIsAddNewsOpen(false)
        
        // Tampilkan alert sukses
        alert('Pengumuman berhasil ditambahkan!')
      } else {
        throw new Error(result.message || 'Gagal menambahkan pengumuman')
      }
      
    } catch (err: any) {
      console.error('Error adding announcement:', err)
      alert(err.message || 'Terjadi kesalahan saat menambahkan pengumuman')
    }
  }

  // Handle hapus pengumuman
  const handleDeleteAnnouncement = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus pengumuman ini?')) {
      return
    }

    try {
      const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
      
      const response = await fetch(`/api/announcements/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'X-CSRF-TOKEN': csrfToken,
          'X-Requested-With': 'XMLHttpRequest',
        },
      })

      const result = await response.json()
      
      if (result.success) {
        // Refresh daftar pengumuman
        await fetchAnnouncements(selectedFilter)
        setSelectedAnnouncement(null)
        
        // Tampilkan alert sukses
        alert('Pengumuman berhasil dihapus!')
      } else {
        throw new Error(result.message || 'Gagal menghapus pengumuman')
      }
      
    } catch (err: any) {
      console.error('Error deleting announcement:', err)
      alert(err.message || 'Terjadi kesalahan saat menghapus pengumuman')
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Pengumuman</h1>
          <button
            onClick={() => setIsAddNewsOpen(true)}
            className="bg-black text-white px-6 py-2 rounded-full font-semibold hover:bg-gray-800 transition hidden md:inline-flex items-center gap-2"
          >
            <span className="text-xl">+</span>
            <span>Tambah Pengumuman</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-4 md:p-6">
        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-red-700">{error}</p>
            </div>
            <button 
              onClick={() => fetchAnnouncements(selectedFilter)}
              className="mt-2 text-sm text-red-600 hover:text-red-800 font-medium"
            >
              Coba Lagi
            </button>
          </div>
        )}

        {/* Filter Section */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Daftar Pengumuman</h2>
            <p className="text-sm text-gray-600 mt-1">
              Total: {announcements.length} pengumuman
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            {selectedFilter !== "all" && (
              <span className="text-sm text-blue-600 font-medium bg-blue-50 px-3 py-1.5 rounded-lg">
                {selectedFilter === "week" && "Minggu Ini"}
                {selectedFilter === "month" && "Bulan Ini"}
                {selectedFilter === "6months" && "6 Bulan Terakhir"}
                {selectedFilter === "year" && "Tahun Ini"}
              </span>
            )}
            <DateFilterDropdown 
              selectedFilter={selectedFilter} 
              onFilterChange={(filter) => {
                setSelectedFilter(filter)
                fetchAnnouncements(filter)
              }} 
            />
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-gray-300 border-t-black"></div>
            <p className="mt-3 text-gray-600">Memuat pengumuman...</p>
          </div>
        ) : (
          <>
            {/* Announcement List */}
            {announcements.length === 0 ? (
              <div className="text-center py-16 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300">
                <div className="max-w-md mx-auto">
                  <div className="text-gray-400 mb-4">
                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Belum ada pengumuman</h3>
                  <p className="text-gray-500 mb-6">Mulai dengan menambahkan pengumuman pertama Anda</p>
                  <button
                    onClick={() => setIsAddNewsOpen(true)}
                    className="bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition shadow-md"
                  >
                    + Tambah Pengumuman Pertama
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <AnnouncementList
                  announcements={announcements.map(convertToAnnouncementForList)}
                  onSelectAnnouncement={handleSelectAnnouncement}
                />
                
                {/* Info Jumlah */}
                <div className="text-center text-sm text-gray-500 pt-4 border-t">
                  Menampilkan {announcements.length} pengumuman
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Floating Add Button for Mobile */}
      {announcements.length > 0 && (
        <div className="fixed bottom-6 right-6 md:hidden">
          <button
            onClick={() => setIsAddNewsOpen(true)}
            className="bg-black text-white p-4 rounded-full font-semibold hover:bg-gray-800 transition shadow-lg"
            aria-label="Tambah Pengumuman"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      )}

      {/* Modals */}
      <AddNewsModal
        isOpen={isAddNewsOpen}
        onClose={() => setIsAddNewsOpen(false)}
        onSubmit={handleAddNews}
      />

      <AnnouncementDetailModal
        announcement={selectedAnnouncement}
        onClose={() => setSelectedAnnouncement(null)}
        onDelete={handleDeleteAnnouncement}
      />
    </div>
  )
}

/* ✅ Layout dengan AppLayout */
AnnouncementPage.layout = (page: React.ReactNode) => (
  <AppLayout breadcrumbs={breadcrumbs}>{page}</AppLayout>
)