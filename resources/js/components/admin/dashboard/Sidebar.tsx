"use client"

import { Link, usePage } from "@inertiajs/react"
import { 
  MdDashboard, 
  MdLogout, 
  MdSettings,
  MdPeople,
  MdAssignment,
  MdExpandMore,
  MdExpandLess,
  MdChevronRight
} from "react-icons/md"
import { FaUserCheck, FaUsers, FaFileSignature } from "react-icons/fa"
import { IoDocumentTextSharp } from "react-icons/io5"
import { FaLeaf } from "react-icons/fa6" 
import { useState } from "react"


export default function Sidebar() {
  const { url } = usePage()
  const [isRequestOpen, setIsRequestOpen] = useState(false)

  const toggleRequestDropdown = () => {
    setIsRequestOpen(!isRequestOpen)
  }

  const menuItems = [
    { icon: <MdDashboard size={18} />, label: "Dashboard", href: "/admin/dashboard" },
    { icon: <FaUserCheck size={18} />, label: "Absensi", href: "/admin/absensi" },
    { icon: <FaUsers size={18} />, label: "Inventory", href: "/admin/inventory" },
    { 
      icon: <IoDocumentTextSharp size={18} />, 
      label: "Request Item", 
      href: "/admin/RequestItem", 
      hasDropdown: true,
      isOpen: isRequestOpen,
      onClick: toggleRequestDropdown,
      dropdownItems: [
        { label: "Invoice", href: "/admin/invoice" },
        { label: "Log Request", href: "/admin/LogRequest" },
        { label: "Report Item", href: "/admin/ReportItem" }
      ]
    },
    { icon: <MdPeople size={18} />, label: "Karyawan", href: "/admin/karyawan" },
    { icon: <MdAssignment size={18} />, label: "Permission", href: "/admin/permission" },
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
            const isActive = item.href ? url.startsWith(item.href) : false
            
            // Menu item biasa (tanpa dropdown)
            if (!item.hasDropdown) {
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
            }
            
            // Menu item dengan dropdown (Request Item)
            return (
              <div key={i} className="flex flex-col">
                <div className="relative">
                  <Link
                    href={item.href}
                    className={`flex items-center justify-between gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 w-full ${
                      isActive
                        ? "bg-white/20 text-white shadow-sm"
                        : "hover:bg-white/15 text-white/90"
                    }`}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <span
                        className={`${
                          isActive ? "text-white" : "text-[#B0E0E6]"
                        } flex items-center justify-center`}
                      >
                        {item.icon}
                      </span>
                      {item.label}
                    </div>
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        item.onClick()
                      }}
                      className="text-white/70 hover:text-white transition-colors p-1"
                    >
                      {item.isOpen ? <MdExpandLess size={18} /> : <MdExpandMore size={18} />}
                    </button>
                  </Link>
                </div>
                
                {/* Dropdown items */}
                {item.isOpen && (
                  <div className="ml-8 mt-1 space-y-1 border-l border-white/20 pl-4 py-2">
                    {item.dropdownItems.map((subItem, subIndex) => {
                      const isSubActive = url === subItem.href
                      return (
                        <Link
                          key={subIndex}
                          href={subItem.href}
                          className={`flex items-center px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                            isSubActive
                              ? "bg-white/15 text-white"
                              : "text-white/80 hover:text-white hover:bg-white/10"
                          }`}
                        >
                          <span className={`w-2 h-2 rounded-full mr-3 ${
                            isSubActive ? "bg-white" : "bg-white/60"
                          }`}></span>
                          {subItem.label}
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
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