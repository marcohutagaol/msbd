"use client"

import { useState } from "react"
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
  time: string
  image?: string
  content?: string
  description?: string
  date?: Date
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Announcement",
    href: "#",
  },
]

const mockAnnouncements: Announcement[] = [
  {
    id: 1,
    title: "Libur Tahun Baru Event Pantai 2025",
    category: "Vacation",
    time: "20:30",
    content:
      "Bergabunglah dengan kami untuk merayakan tahun baru di pantai yang indah. Acara ini akan dimeriahkan dengan berbagai aktivitas menarik dan hiburan live music.",
    description:
      "Event spesial tahun baru dengan tema pantai yang akan diselenggarakan pada tanggal 1 Januari 2025.",
    date: new Date(),
  },
  {
    id: 2,
    title: "Malam Tahun Baru Bersama Reza Arta",
    category: "Event",
    time: "Kemarin",
    content:
      "Rayakan malam tahun baru bersama artis ternama Reza Arta. Acara akan menampilkan pertunjukan live performance dan DJ profesional.",
    description: "Acara hiburan malam tahun baru dengan pertunjukan spesial dari Reza Arta.",
    date: new Date(Date.now() - 86400000),
  },
]

export default function Home() {
  const [isAddNewsOpen, setIsAddNewsOpen] = useState(false)
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null)
  const [announcements, setAnnouncements] = useState(mockAnnouncements)
  const [selectedFilter, setSelectedFilter] = useState("all")

  const handleAddNews = (newAnnouncement: Omit<Announcement, "id" | "date">) => {
    const announcement: Announcement = {
      ...newAnnouncement,
      id: Math.max(...announcements.map((a) => a.id), 0) + 1,
      date: new Date(),
    }
    setAnnouncements([announcement, ...announcements])
    setIsAddNewsOpen(false)
  }

  const getFilteredAnnouncements = () => {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

    if (selectedFilter === "all") return announcements

    if (selectedFilter === "week") {
      const weekAgo = new Date(today)
      weekAgo.setDate(weekAgo.getDate() - 7)
      return announcements.filter((a) => a.date && new Date(a.date) >= weekAgo)
    }

    if (selectedFilter === "month") {
      const monthAgo = new Date(today)
      monthAgo.setMonth(monthAgo.getMonth() - 1)
      return announcements.filter((a) => a.date && new Date(a.date) >= monthAgo)
    }

    if (selectedFilter === "6months") {
      const sixMonthsAgo = new Date(today)
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)
      return announcements.filter((a) => a.date && new Date(a.date) >= sixMonthsAgo)
    }

    if (selectedFilter === "year") {
      const yearAgo = new Date(today)
      yearAgo.setFullYear(yearAgo.getFullYear() - 1)
      return announcements.filter((a) => a.date && new Date(a.date) >= yearAgo)
    }

    return announcements
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white p-6 border-b border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900">Announcement</h1>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-6">
        {/* Filter Section */}
        <div className="mb-8 flex justify-end items-center gap-4">
          {selectedFilter !== "all" && (
            <span className="text-sm text-blue-600 font-medium bg-blue-50 px-3 py-1 rounded-lg">
              {selectedFilter === "week" && "This Week"}
              {selectedFilter === "month" && "This Month"}
              {selectedFilter === "6months" && "Last 6 Months"}
              {selectedFilter === "year" && "This Year"}
            </span>
          )}
          <DateFilterDropdown selectedFilter={selectedFilter} onFilterChange={setSelectedFilter} />
        </div>

        {/* Announcement List */}
        <AnnouncementList
          announcements={getFilteredAnnouncements()}
          onSelectAnnouncement={setSelectedAnnouncement}
        />
      </div>

      {/* Add News Button */}
      <div className="fixed bottom-8 right-8">
        <button
          onClick={() => setIsAddNewsOpen(true)}
          className="bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition shadow-lg"
        >
          Tambah Berita
        </button>
      </div>

      {/* Modals */}
      <AddNewsModal
        isOpen={isAddNewsOpen}
        onClose={() => setIsAddNewsOpen(false)}
        onSubmit={handleAddNews}
      />

      <AnnouncementDetailModal
        announcement={selectedAnnouncement}
        onClose={() => setSelectedAnnouncement(null)}
      />
    </div>
  )
}

/* ✅ INI BAGIAN SIDEBAR / LAYOUT DARI KODE PERTAMA */
Home.layout = (page: React.ReactNode) => (
  <AppLayout breadcrumbs={breadcrumbs}>{page}</AppLayout>
)
