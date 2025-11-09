"use client";

import { useState } from "react";
import Sidebar from "../../components/admin/dashboard/Sidebar";
import Header from "../../components/admin/dashboard/Header";
import StatsToday from "../../components/admin/dashboard/Stats";
import EmployeeStatus from "../../components/admin/dashboard/AttendanceTable";
import UserDetail from "../../components/admin/dashboard/UserDetail";

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <div className="flex min-h-screen font-[Poppins,Segoe_UI,system-ui,sans-serif] bg-[#f5f7fa] transition-all duration-300">
      {/* === SIDEBAR === */}
      <div
        className={`fixed top-0 left-0 h-full w-[260px] bg-white shadow-md z-[150] transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar />
      </div>

      
      <div
        className={`flex flex-col flex-1 min-h-screen transition-all duration-300 ${
          isSidebarOpen ? "ml-[260px]" : "ml-0"
        }`}
      >
        {/* === HEADER === */}
        <div
          className={`fixed top-0 right-0 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.05)] z-[200] transition-all duration-300 ${
            isSidebarOpen ? "left-[260px]" : "left-0"
          }`}
        >
          <Header
            isSidebarOpen={isSidebarOpen}
            onToggleSidebar={toggleSidebar}
          />
        </div>

        {/* === ISI HALAMAN === */}
         <div className="flex flex-col flex-1 gap-[30px] px-[40px] pb-[40px] pt-[120px] transition-all duration-300">
          <UserDetail />
          <StatsToday />
          <EmployeeStatus />
        </div>
      </div>
    </div>
  );
}
