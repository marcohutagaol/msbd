"use client"

import { useState, useEffect } from "react"
import { FaRegCalendarAlt, FaUserCheck, FaUserClock, FaUserTimes } from "react-icons/fa"
import { MdSick, MdOutlinePendingActions } from "react-icons/md"
import { Link } from "@inertiajs/react"

interface StatItem {
  label: string
  value: number
  color: string
  icon: React.ReactNode
  href?: string
}

export default function StatsToday() {
  const stats: StatItem[] = [
    {
      label: "Hadir",
      value: 65,
      color: "#10b981",
      icon: <FaUserCheck size={22} className="text-emerald-500" />,
      href: "/admin/dashboard/detail/hadir",
    },
    {
      label: "Izin",
      value: 15,
      color: "#3b82f6",
      icon: <FaUserClock size={22} className="text-blue-500" />,
      href: "/admin/dashboard/detail/izin",
    },
    {
      label: "Sakit",
      value: 10,
      color: "#f59e0b",
      icon: <MdSick size={22} className="text-amber-500" />,
      href: "/admin/dashboard/detail/sakit",
    },
    {
      label: "Belum Absen",
      value: 7,
      color: "#8b5cf6",
      icon: <MdOutlinePendingActions size={22} className="text-violet-500" />,
      href: "/admin/dashboard/detail/belum-absen",
    },
    {
      label: "Tanpa Keterangan",
      value: 3,
      color: "#ef4444",
      icon: <FaUserTimes size={22} className="text-red-500" />,
      href: "/admin/dashboard/detail/tanpa-keterangan",
    },
  ]

  const [currentTime, setCurrentTime] = useState("")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"]
      const months = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
      ]
      const dayName = days[now.getDay()]
      const date = now.getDate()
      const monthName = months[now.getMonth()]
      const year = now.getFullYear()
      const timeString = now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
      setCurrentTime(`${dayName}, ${date} ${monthName} ${year} | ${timeString}`)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-white rounded-2xl p-7 shadow-sm">
      {/* Header waktu */}
      <div className="flex items-center mb-3 gap-2 text-slate-600 text-sm">
        <FaRegCalendarAlt />
        <span>{currentTime}</span>
      </div>

      {/* Judul */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-slate-900">
          Statistik Kehadiran Hari Ini
        </h3>
      </div>

      <div className="flex items-center gap-10">
        {/* Donut Chart */}
        <div className="relative w-[200px] h-[200px] flex items-center justify-center">
          <div
            className="absolute inset-0 rounded-full shadow-inner"
            style={{
              background:
                "conic-gradient(#10b981 0deg 234deg, #3b82f6 234deg 288deg, #f59e0b 288deg 324deg, #8b5cf6 324deg 349deg, #ef4444 349deg 360deg)",
            }}
          ></div>
          <div className="absolute w-[135px] h-[135px] bg-white rounded-full shadow-md flex flex-col items-center justify-center">
            <div className="text-3xl font-bold text-slate-900">65</div>
            <div className="text-xs text-slate-500 mt[2px]">dari 100</div>
          </div>
        </div>

        {/* Grid data */}
        <div className="grid grid-cols-2 gap-4 flex-1">
          {stats.map((item, i) => (
            <Link key={i} href={item.href ?? "#"} className="no-underline">
              <div
                className={`bg-white border border-slate-200 rounded-xl px-5 py-[18px] flex items-center gap-3 shadow-sm transition-all duration-200 hover:shadow-md hover:border-slate-300 ${
                  i === 4 ? "col-span-2" : ""
                }`}
              >
                <div className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-50 border border-slate-100">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <p className="m-0 text-[13px] text-slate-500 font-medium">
                    {item.label}
                  </p>
                  <p className="m-0 font-bold text-[22px] mt-1" style={{ color: item.color }}>
                    {item.value}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
