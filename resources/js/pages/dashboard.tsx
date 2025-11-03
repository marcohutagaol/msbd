"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import AppLayout from "@/layouts/app-layout"
import { dashboard } from "@/routes"
import { type BreadcrumbItem } from "@/types"
import { Head, router, usePage } from "@inertiajs/react"
import { useEffect, useState } from "react"
import {
  Car,
  ClipboardList,
  Clock,
  FileText,
  Gift,
  Heart,
  Package,
  Square,
  User,
  Zap,
} from "lucide-react"

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Dashboard",
    href: dashboard().url,
  },
]

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [currentTime, setCurrentTime] = useState("00:00:00")
  const { props }: any = usePage()
  const user = props.auth.user

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

  const menuItems = [
    { icon: <User className="h-6 w-6 text-orange-500" />, label: "Absensi" },
    {
      icon: <ClipboardList className="h-6 w-6 text-green-500" />,
      label: "Manajemen\nKehadiran",
    },
    { icon: <Heart className="h-6 w-6 text-pink-500" />, label: "Talent" },
    { icon: <FileText className="h-6 w-6 text-blue-500" />, label: "Report" },
    { icon: <Square className="h-6 w-6 text-orange-500" />, label: "Spaces" },
  ]

  const menuItems2 = [
    { icon: <Clock className="h-6 w-6 text-green-500" />, label: "Lembur" },
    { icon: <Gift className="h-6 w-6 text-pink-500" />, label: "Reimburs" },
    { icon: <Car className="h-6 w-6 text-blue-500" />, label: "Fasilitas" },
    { icon: <Package className="h-6 w-6 text-orange-500" />, label: "Pinjaman" },
    { icon: <Zap className="h-6 w-6 text-green-500" />, label: "Kasbon" },
  ]

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />
      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-hidden rounded-xl bg-gray-50 p-4 sm:p-6">
        <main className="flex-1 overflow-auto">
          <div className="mx-auto max-w-7xl space-y-8">
            {/* Profile Card */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-md hover:shadow-lg transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16 ring-4 ring-blue-100">
                    <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" />
                    <AvatarFallback>SA</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                      Nama Manusia
                    </h2>
                    <p className="text-gray-600 text-sm sm:text-base">
                      Front End Developer
                    </p>
                    <p className="mt-1 text-sm text-blue-600 font-medium">
                      PT. Kawa Indonesia
                    </p>
                  </div>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-sm text-gray-500">Rabu, 27 Sep 2023</p>
                  <p className="text-lg font-semibold text-blue-600">
                    {currentTime} WIB
                  </p>
                </div>
              </div>
            </div>

            {/* Attendance Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Clock In/Out */}
              <div className="lg:col-span-2 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-white border border-blue-100 p-8 text-center shadow-sm hover:shadow-md transition">
                    <p className="mb-3 text-sm font-medium text-gray-500">
                      Absen Masuk
                    </p>
                    <p className="font-mono text-4xl sm:text-5xl font-bold text-blue-700">
                      {currentTime}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-gradient-to-br from-pink-50 to-white border border-pink-100 p-8 text-center shadow-sm hover:shadow-md transition">
                    <p className="mb-3 text-sm font-medium text-gray-500">
                      Absen Keluar
                    </p>
                    <p className="font-mono text-4xl sm:text-5xl font-bold text-pink-500">
                      {currentTime}
                    </p>
                  </div>
                </div>

                {/* Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <button
                    onClick={() => router.visit(`/absensi/${user.id}`)}
                    className="relative flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 py-4 sm:py-5 text-base font-semibold text-white shadow-md transition-all hover:from-blue-700 hover:to-blue-600 hover:shadow-lg active:scale-95"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>Clock In</span>
                  </button>

                  <button className="relative flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 to-pink-400 py-4 sm:py-5 text-base font-semibold text-white shadow-md transition-all hover:from-pink-600 hover:to-pink-500 hover:shadow-lg active:scale-95">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 8h2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2h2m5-3l2 3h-4l2-3z"
                      />
                    </svg>
                    <span>Clock Out</span>
                  </button>
                </div>
              </div>

              {/* Stats */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm hover:shadow-md transition-all">
                <h3 className="mb-4 font-semibold text-gray-900 text-base sm:text-lg">
                  Ringkasan Hari Ini
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="mb-1 text-sm text-gray-500">Jam Kerja</p>
                    <p className="text-2xl font-bold text-gray-900">7h 58m</p>
                  </div>
                  <div>
                    <p className="mb-1 text-sm text-gray-500">Status</p>
                    <p className="text-lg font-semibold text-green-600">Masuk</p>
                  </div>
                  <div>
                    <p className="mb-1 text-sm text-gray-500">Kehadiran</p>
                    <p className="text-lg font-semibold text-blue-600">100%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Announcements */}
            <div className="space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  Pengumuman
                </h3>
                <a
                  href="#"
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Lihat Semua
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer"
                  >
                    <div className="h-36 sm:h-40 bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 relative">
                      <div className="absolute inset-0 opacity-30">
                        <div className="absolute top-2 left-4 w-8 h-8 bg-white rounded-full"></div>
                        <div className="absolute top-6 right-6 w-6 h-6 bg-white rounded-full"></div>
                        <div className="absolute bottom-4 left-1/3 w-10 h-10 bg-white rounded-full"></div>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition">
                        Pengumuman Penting
                      </p>
                      <p className="text-xs text-gray-500 mt-1">27 Sep 2023</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </AppLayout>
  )
}
