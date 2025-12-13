"use client";

import { useState, useEffect } from "react";
import Sidebar from "../../components/admin/dashboard/Sidebar";
import Header from "../../components/admin/dashboard/Header";
import AttendanceHeader from "@/components/admin/absensi/AttendanceHeader";
import WeeklyAttendance from "@/components/admin/absensi/WeeklyAttendance";
import AttendanceDetail from "@/components/admin/absensi/AttendanceDetail";

export default function Absensi() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // Deteksi ukuran layar untuk responsif
  useEffect(() => {
    const checkIfMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      // Pada mobile, sidebar default tertutup
      if (mobile && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
      // Pada desktop, sidebar default terbuka
      if (!mobile && !isSidebarOpen) {
        setIsSidebarOpen(true);
      }
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []); // Hapus dependency isSidebarOpen untuk menghindari loop

  // Close sidebar on mobile when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.querySelector('.mobile-sidebar');
      const toggleButton = document.querySelector('.sidebar-toggle-button');
      
      if (isMobile && isSidebarOpen && 
          sidebar && 
          !sidebar.contains(event.target as Node) &&
          toggleButton &&
          !toggleButton.contains(event.target as Node)) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile, isSidebarOpen]);

  return (
    <div className="flex min-h-screen bg-[#f5f7fa] font-[Poppins,Segoe_UI,system-ui,sans-serif] transition-all duration-300">
      {/* === SIDEBAR === */}
      <div
        className={`hidden md:block fixed top-0 left-0 z-50 h-full w-[260px] bg-white shadow-md transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar />
      </div>

      {/* Sidebar Mobile Overlay */}
      {isMobile && isSidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={toggleSidebar}
          ></div>
          <div className="mobile-sidebar fixed top-0 left-0 z-50 h-full w-[260px] bg-white shadow-lg transition-transform duration-300 translate-x-0">
            <Sidebar />
          </div>
        </>
      )}

      {/* === MAIN CONTENT === */}
      <div
        className={`flex min-h-screen flex-1 flex-col transition-all duration-300 w-full ${
          isSidebarOpen ? 'md:ml-[260px]' : 'ml-0'
        }`}
      >
        {/* === HEADER === */}
        <div
          className={`fixed top-0 right-0 z-40 bg-white shadow-sm transition-all duration-300 w-full ${
            isSidebarOpen ? 'md:left-[260px] md:w-[calc(100%-260px)]' : 'left-0'
          }`}
        >
          <Header
            isSidebarOpen={isSidebarOpen}
            onToggleSidebar={toggleSidebar}
          />
        </div>

        {/* === ISI HALAMAN ABSENSI === */}
        <div className="px-4 sm:px-6 lg:px-8 pb-6 flex flex-1 flex-col gap-4 md:gap-6 pt-20 md:pt-24 lg:pt-28 transition-all duration-300">
          {/* Responsive container untuk konten */}
          <div className="w-full max-w-full overflow-x-hidden">
            <div className="w-full mb-4 md:mb-6">
              <AttendanceHeader />
            </div>
            
            <div className="w-full mb-4 md:mb-6">
              <AttendanceDetail />
            </div>
            
            <div className="w-full">
              <WeeklyAttendance />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}