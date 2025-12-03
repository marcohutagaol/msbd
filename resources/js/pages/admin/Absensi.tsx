"use client";

import { useState } from "react";
import Sidebar from "../../components/admin/dashboard/Sidebar";
import Header from "../../components/admin/dashboard/Header";
import AttendanceHeader from "@/components/admin/absensi/AttendanceHeader";
import WeeklyAttendance from "@/components/admin/absensi/WeeklyAttendance";
import AttendanceDetail from "@/components/admin/absensi/AttendanceDetail";

export default function Absensi() {

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <div className="flex min-h-screen font-[Poppins,Segoe_UI,system-ui,sans-serif] bg-[#f5f7fa] transition-all duration-300">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-[260px] bg-white shadow-md z-40 transition-transform duration-300 ${

          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar />
      </div>


      {/* Main Content */}

      <div
        className={`flex flex-col flex-1 min-h-screen transition-all duration-300 ${
          isSidebarOpen ? "ml-[260px]" : "ml-0"
        }`}
      >

        {/* Header */}
        <div
          className={`fixed top-0 right-0 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.05)] z-50 transition-all duration-300 ${

            isSidebarOpen ? "left-[260px]" : "left-0"
          }`}
        >
          <Header
            isSidebarOpen={isSidebarOpen}
            onToggleSidebar={toggleSidebar}
          />
        </div>


        {/* Main Section */}
        <div className="flex flex-col flex-1 gap-[30px] px-40px pb-40px pt-[120px] transition-all duration-300">

          <AttendanceHeader />
          <AttendanceDetail />
          <WeeklyAttendance />
        </div>
      </div>
    </div>
  );
}

