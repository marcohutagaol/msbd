"use client";

import { IoMdNotifications } from "react-icons/io";
import { FiMoon } from "react-icons/fi";
import { HiMenuAlt2 } from "react-icons/hi"; // 🔹 Ikon toggle sidebar

interface HeaderProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export default function Header({ onToggleSidebar }: HeaderProps) {
  return (
    <header className="flex items-center justify-between bg-white px-10 py-4 shadow-sm font-[Poppins,sans-serif]">
      {/* === TOGGLE SIDEBAR BUTTON === */}
      <button
        onClick={onToggleSidebar}
        className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#f8fafc] hover:bg-[#e8eef5] transition-colors cursor-pointer"
      >
        <HiMenuAlt2 className="text-[22px] text-[#333]" />
      </button>

      {/* === ICONS & PROFILE === */}
      <div className="flex items-center gap-5">
        {/* === NOTIFICATION ICON === */}
        <div className="relative w-9 h-9 rounded-xl bg-[#f8fafc] flex items-center justify-center cursor-pointer">
          <IoMdNotifications className="text-[20px] text-[#333]" />
          <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center">
            3
          </div>
        </div>

        {/* === DARK MODE ICON === */}
        <div className="w-9 h-9 rounded-xl bg-[#f8fafc] flex items-center justify-center cursor-pointer">
          <FiMoon className="text-[18px] text-[#333]" />
        </div>

        {/* === USER PROFILE === */}
        <div className="flex items-center gap-2.5 h-10 bg-[#4789A8] text-white px-3 rounded-xl cursor-pointer shadow-[0_2px_6px_rgba(0,0,0,0.15)] text-[14px]">

          <div className="w-8 h-8 rounded-full bg-[#2f6d8a] flex items-center justify-center font-semibold shrink-0">

            RN
          </div>
          <span className="font-medium whitespace-nowrap">Rio Naibaho</span>
          <span className="text-[10px]">▼</span>
        </div>
      </div>
    </header>
  );

}

