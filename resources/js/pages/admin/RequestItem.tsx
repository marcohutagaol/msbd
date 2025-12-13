"use client";

import { useState } from "react";
import Sidebar from "../../components/admin/dashboard/Sidebar";
import Header from "../../components/admin/dashboard/Header";
import RequestStats from "../../components/admin/request/RequestStats";

import RequestChart from "../../components/admin/request/RequestChart";
import RequestHistory from "../../components/admin/request/RequestHistory";
import { Card } from "@/components/ui/card";

type DepartmentStat = {
  name: string;
  totalRequest: number;
};

export default function RequestItemPage({
  departments,
}: {
  departments: DepartmentStat[];
}) {

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <div className="flex min-h-screen font-[Poppins,Segoe_UI,system-ui,sans-serif] bg-[#f5f7fa] transition-all duration-300">
      {/* === SIDEBAR === */}
      <div
        className={`fixed top-0 left-0 h-full w-[260px] bg-white shadow-md z-150 transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar />
      </div>

      {/* === MAIN CONTENT === */}
      <div
        className={`flex flex-col flex-1 min-h-screen transition-all duration-300 ${
          isSidebarOpen ? "ml-[260px]" : "ml-0"
        }`}
      >
        {/* === HEADER === */}
        <div
          className={`fixed top-0 right-0 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.05)] z-200 transition-all duration-300 ${
            isSidebarOpen ? "left-[260px]" : "left-0"
          }`}
        >
          <Header
            isSidebarOpen={isSidebarOpen}
            onToggleSidebar={toggleSidebar}
          />
        </div>

        {/* === ISI HALAMAN === */}
        <div className="flex flex-col flex-1 gap-[30px] px-6 md:px-10 lg:px-12 pt-[100px] pb-10 transition-all duration-300">
          {/* Statistik per Departemen */}
          <RequestStats />

          {/* Grafik 7 Hari Terakhir */}
          
        </div>
      </div>
    </div>
  );

}

