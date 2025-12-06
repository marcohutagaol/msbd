"use client"

import { Link, usePage } from "@inertiajs/react"
import { useState, useEffect } from "react"
import {
  LayoutDashboard,
  LogOut,
  Users,
  Package,
  CalendarCheck,
  FileText,
  History,
  ChevronDown,
  ChevronRight,
  Leaf,
  ShieldCheck,
  Receipt,
  FileBarChart,
  Clock,
  FileClock
} from "lucide-react"

export default function Sidebar() {
  const { url } = usePage()
  const [isRequestOpen, setIsRequestOpen] = useState(false)
  const [isAbsensiOpen, setIsAbsensiOpen] = useState(false)

  useEffect(() => {
    // Check if request menu should be open
    const isRequestActive = url.startsWith("/admin/RequestItem") || 
                           url.startsWith("/admin/invoice") || 
                           url.startsWith("/admin/LogRequest") || 
                           url.startsWith("/admin/ReportItem")
    
    setIsRequestOpen(isRequestActive)
  }, [url])

  const toggleRequestDropdown = () => {
    setIsRequestOpen(!isRequestOpen)
  }

  const toggleAbsensiDropdown = () => {
    setIsAbsensiOpen(!isAbsensiOpen)
  }

  const menuItems = [
    { 
      icon: <LayoutDashboard size={18} />, 
      label: "Dashboard", 
      href: "/admin/dashboard" 
    },
    { 
      icon: <CalendarCheck size={18} />, 
      label: "Absensi", 
      href: "/admin/absensi", 
      hasDropdown: true,
      isOpen: isAbsensiOpen,
      onClick: toggleAbsensiDropdown,
      dropdownItems: [
        { 
          icon: <FileClock size={16} />, 
          label: "Log Absensi", 
          href: "/admin/LogAbsensi" 
        }
      ]
    },
    { 
      icon: <Package size={18} />, 
      label: "Inventory", 
      href: "/admin/inventory" 
    },
    { 
      icon: <FileText size={18} />, 
      label: "Request Item", 
      href: "/admin/RequestItem", 
      hasDropdown: true,
      isOpen: isRequestOpen,
      onClick: toggleRequestDropdown,
      dropdownItems: [
        { 
          icon: <Receipt size={16} />, 
          label: "Invoice", 
          href: "/admin/invoice" 
        },
        { 
          icon: <History size={16} />, 
          label: "Log Request", 
          href: "/admin/LogRequest" 
        },
        { 
          icon: <FileBarChart size={16} />, 
          label: "Report Item", 
          href: "/admin/ReportItem" 
        }
      ]
    },
    { 
      icon: <Users size={18} />, 
      label: "Karyawan", 
      href: "/admin/karyawan" 
    },
    { 
      icon: <ShieldCheck size={18} />, 
      label: "Permission", 
      href: "/admin/permission" 
    },
  ]

  return (
    <aside className="w-[260px] h-screen fixed top-0 left-0 flex flex-col bg-[#4789A8] text-white shadow-lg font-poppins z-50">
      <div className="px-5 py-7 border-b border-white/20 text-center">
        <div className="flex justify-center items-center gap-2 mb-2">
          <div className="bg-white/20 rounded-full p-2">
            <Leaf size={20} className="text-white" />
          </div>
          <span className="text-xl font-bold tracking-wide">KAWA LAND</span>
        </div>
        <div className="text-xs text-white/80 font-medium tracking-wider">
          ADMIN PANEL
        </div>
      </div>

      <div className="flex-1 px-5 py-6 overflow-y-auto">
        <p className="text-[11px] uppercase text-white/70 font-semibold tracking-wider mb-3 pl-2">
          Menu Utama
        </p>
        <nav className="flex flex-col gap-2">
          {menuItems.map((item, i) => {
            // Check if current URL matches this menu item
            const isActive = item.href ? (
              item.hasDropdown 
                ? url === item.href || url.startsWith(item.href + "/") || 
                  (item.dropdownItems && item.dropdownItems.some(sub => 
                    url === sub.href || url.startsWith(sub.href + "/")
                  ))
                : url === item.href || url.startsWith(item.href + "/")
            ) : false
            
            // Auto-open dropdown if any submenu item is active
            useEffect(() => {
              if (item.hasDropdown && item.dropdownItems) {
                const isAnySubActive = item.dropdownItems.some(sub => 
                  url === sub.href || url.startsWith(sub.href + "/")
                )
                if (isAnySubActive && !item.isOpen) {
                  // Set state based on item label
                  if (item.label === "Absensi") {
                    setIsAbsensiOpen(true)
                  } else if (item.label === "Request Item") {
                    setIsRequestOpen(true)
                  }
                }
              }
            }, [url, item])
            
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
            
            return (
              <div key={i} className="flex flex-col">
                <div className="relative">
                  <Link
                    href={item.href}
                    className={`flex items-center justify-between gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 w-full ${
                      isActive || item.isOpen
                        ? "bg-white/20 text-white shadow-sm"
                        : "hover:bg-white/15 text-white/90"
                    }`}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <span
                        className={`${
                          isActive || item.isOpen ? "text-white" : "text-[#B0E0E6]"
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
                      {item.isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                    </button>
                  </Link>
                </div>
                
                {item.isOpen && (
                  <div className="ml-8 mt-1 space-y-1 border-l border-white/20 pl-4 py-2">
                    {item.dropdownItems.map((subItem, subIndex) => {
                      const isSubActive = url === subItem.href || url.startsWith(subItem.href + "/")
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
                          <span className="mr-3">
                            {subItem.icon}
                          </span>
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

      <div className="px-5 py-5 border-t border-white/20">
        <button
          className="flex items-center gap-3 text-sm font-medium text-white/90 hover:text-white transition-all duration-200 w-full"
          onClick={() => console.log("Logout clicked")}
        >
          <LogOut size={18} className="text-[#B0E0E6]" />
          Logout
        </button>
      </div>
    </aside>
  )
}