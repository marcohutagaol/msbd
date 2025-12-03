"use client"

import { Link, usePage } from "@inertiajs/react"
import { MdDashboard, MdLogout, MdSettings } from "react-icons/md"
import { FaUserCheck, FaUsers } from "react-icons/fa"
import { IoDocumentTextSharp } from "react-icons/io5"
import { FaLeaf } from "react-icons/fa6" // ikon sementara untuk logo

export default function Sidebar() {
  const { url } = usePage()

  const menuItems = [
    { icon: <MdDashboard size={18} />, label: "Dashboard", href: "/admin/dashboard" },
    { icon: <FaUserCheck size={18} />, label: "Absensi", href: "/admin/absensi" },
    { icon: <FaUsers size={18} />, label: "Inventory", href: "/admin/inventory" },

    { icon: <IoDocumentTextSharp size={18} />, label: "Request Item", href: "/admin/requests" },
    { icon: <MdSettings size={18} />, label: "Karyawan", href: "/admin/karyawan" },

  ]

  return (
    <aside className="w-[260px] h-screen fixed top-0 left-0 flex flex-col bg-[#4789A8] text-white shadow-lg font-poppins z-50">
      {/* Header */}
      <div className="px-5 py-7 border-b border-white/20 text-center">
        <div className="flex justify-center items-center gap-2 mb-2">
          <div className="bg-white/20 rounded-full p-2">
            <FaLeaf size={20} className="text-white" />
          </div>
          <span className="text-xl font-bold tracking-wide">KAWA LAND</span>
        </div>
        <div className="text-xs text-white/80 font-medium tracking-wider">
          ADMIN PANEL
        </div>
      </div>

      {/* Menu Section */}
      <div className="flex-1 px-5 py-6 overflow-y-auto">
        <p className="text-[11px] uppercase text-white/70 font-semibold tracking-wider mb-3 pl-2">
          Menu Utama
        </p>
        <nav className="flex flex-col gap-2">
          {menuItems.map((item, i) => {
            const isActive = url.startsWith(item.href)
            return (
              <Link
                key={i}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-white/20 text-white shadow-sm"
                    : "hover:bg-white/15 text-white/90"
                }`}
              >
                <span
                  className={`${
                    isActive ? "text-white" : "text-[#B0E0E6]"
                  } flex items-center justify-center`}
                >
                  {item.icon}
                </span>
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>



      {/* Logout Section */}
      <div className="px-5 py-5 border-t border-white/20">
        <button
          className="flex items-center gap-3 text-sm font-medium text-white/90 hover:text-white transition-all duration-200 w-full"
          onClick={() => console.log("Logout clicked")}
        >
          <MdLogout size={18} className="text-[#B0E0E6]" />
          Logout
        </button>
      </div>
    </aside>
  )

}

