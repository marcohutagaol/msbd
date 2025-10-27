"use client"

import { useState, useEffect } from "react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  Home,
  BarChart2,
  CheckSquare,
  BookOpen,
  Settings,
  User,
  ClipboardList,
  Heart,
  FileText,
  Square,
  Clock,
  Gift,
  Car,
  Package,
  Zap,
} from "lucide-react"

export default function HomePage() {
  const [currentTime, setCurrentTime] = useState("07:58:55")
  const [activeTab, setActiveTab] = useState("beranda")
  const [sidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      const hours = String(now.getHours()).padStart(2, "0")
      const minutes = String(now.getMinutes()).padStart(2, "0")
      const seconds = String(now.getSeconds()).padStart(2, "0")
      setCurrentTime(`${hours}:${minutes}:${seconds}`)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Menu Grid Atas
  const menuItems = [
    { icon: <User className="w-6 h-6 text-orange-500" />, label: "Absensi" },
    { icon: <ClipboardList className="w-6 h-6 text-green-500" />, label: "Manajemen\nKehadiran" },
    { icon: <Heart className="w-6 h-6 text-pink-500" />, label: "Talent" },
    { icon: <FileText className="w-6 h-6 text-blue-500" />, label: "Report" },
    { icon: <Square className="w-6 h-6 text-orange-500" />, label: "Spaces" },
  ]

  // Menu Grid Bawah
  const menuItems2 = [
    { icon: <Clock className="w-6 h-6 text-green-500" />, label: "Lembur" },
    { icon: <Gift className="w-6 h-6 text-pink-500" />, label: "Reimburs" },
    { icon: <Car className="w-6 h-6 text-blue-500" />, label: "Fasilitas" },
    { icon: <Package className="w-6 h-6 text-orange-500" />, label: "Pinjaman" },
    { icon: <Zap className="w-6 h-6 text-green-500" />, label: "Kasbon" },
  ]

  // Sidebar Menu
  const sidebarItems = [
    { icon: <Home className="w-5 h-5" />, label: "Beranda", id: "beranda" },
    { icon: <BarChart2 className="w-5 h-5" />, label: "Aktivitas", id: "aktivitas" },
    { icon: <CheckSquare className="w-5 h-5" />, label: "Tugas", id: "tugas" },
    { icon: <BookOpen className="w-5 h-5" />, label: "Pelatihan", id: "pelatihan" },
    { icon: <Settings className="w-5 h-5" />, label: "Pengaturan", id: "pengaturan" },
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-white border-r border-gray-200 transition-all duration-300 flex flex-col`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-200 flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-md">
              CC
            </div>
            {sidebarOpen && (
              <div className="flex flex-col">
                <span className="font-bold text-gray-900 text-sm">Classik</span>
                <span className="text-xs text-gray-500 font-medium">Creactive</span>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === item.id
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {item.icon}
              {sidebarOpen && <span className="text-sm">{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-200">
          <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <Avatar className="w-10 h-10">
              <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" />
              <AvatarFallback>CL</AvatarFallback>
            </Avatar>
            {sidebarOpen && (
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900">Carlene Lim</p>
                <p className="text-xs text-gray-500">UI/UX Designer</p>
              </div>
            )}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg
                  className="w-6 h-6 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <div className="flex flex-col">
                <h1 className="text-sm font-semibold text-gray-500">
                  PT. Classik Creactive
                </h1>
                <p className="text-lg font-bold text-gray-900">Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <svg
                  className="w-6 h-6 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
                <svg
                  className="w-6 h-6 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Profile Card */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" />
                    <AvatarFallback>CL</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Stephen Albert</h2>
                    <p className="text-gray-600">Front End</p>
                    <p className="text-sm text-gray-500 mt-2">PT. Bergoyang</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Rabu, 27 Sep 2023</p>
                  <p className="text-sm text-gray-600">{currentTime} WIB</p>
                </div>
              </div>
            </div>

            {/* Attendance Section */}
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-2 space-y-6">
                {/* Clock In/Out */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm text-center">
                    <p className="text-gray-600 text-sm font-medium mb-3">Absen Masuk</p>
                    <p className="text-5xl font-bold text-gray-900 font-mono">{currentTime}</p>
                  </div>
                  <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm text-center">
                    <p className="text-gray-600 text-sm font-medium mb-3">Absen Keluar</p>
                    <p className="text-5xl font-bold text-gray-400 font-mono">--:--:--</p>
                  </div>
                </div>

                {/* Buttons */}
                <div className="grid grid-cols-2 gap-6">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-8 flex items-center justify-center gap-3 font-semibold text-lg transition-colors shadow-md hover:shadow-lg">
                    <span className="text-2xl">→</span>
                    <span>Clock In</span>
                  </button>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-8 flex items-center justify-center gap-3 font-semibold text-lg transition-colors shadow-md hover:shadow-lg">
                    <span className="text-2xl">←</span>
                    <span>Clock Out</span>
                  </button>
                </div>
              </div>

              {/* Stats */}
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4">Ringkasan Hari Ini</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Jam Kerja</p>
                    <p className="text-2xl font-bold text-gray-900">7h 58m</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Status</p>
                    <p className="text-lg font-semibold text-green-600">Masuk</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Kehadiran</p>
                    <p className="text-lg font-semibold text-blue-600">100%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Menu Grid */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Menu Utama</h3>

              {/* Grid 1 */}
              <div className="grid grid-cols-5 gap-4">
                {menuItems.map((item, index) => (
                  <button
                    key={index}
                    className="bg-white rounded-xl p-6 flex flex-col items-center gap-3 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all group"
                  >
                    <div className="group-hover:scale-110 transition-transform">{item.icon}</div>
                    <span className="text-sm font-medium text-gray-900 text-center leading-tight">
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>

              {/* Grid 2 */}
              <div className="grid grid-cols-5 gap-4">
                {menuItems2.map((item, index) => (
                  <button
                    key={index}
                    className="bg-white rounded-xl p-6 flex flex-col items-center gap-3 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all group"
                  >
                    <div className="group-hover:scale-110 transition-transform">{item.icon}</div>
                    <span className="text-sm font-medium text-gray-900 text-center leading-tight">
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Announcements */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Pengumuman</h3>
                <a
                  href="#"
                  className="text-sm text-pink-600 hover:text-pink-700 font-medium"
                >
                  Lihat Semua →
                </a>
              </div>

              <div className="grid grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
                  >
                    <div className="h-40 bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 relative overflow-hidden">
                      <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-2 left-4 w-8 h-8 bg-white rounded-full"></div>
                        <div className="absolute top-6 right-6 w-6 h-6 bg-white rounded-full"></div>
                        <div className="absolute bottom-4 left-1/3 w-10 h-10 bg-white rounded-full"></div>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-sm font-medium text-gray-900">Pengumuman Penting</p>
                      <p className="text-xs text-gray-500 mt-1">27 Sep 2023</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
