
'use client';

import { useState } from 'react';
import EmployeeStatus from '../../components/admin/dashboard/AttendanceTable';
import Header from '../../components/admin/dashboard/Header';
import Sidebar from '../../components/admin/dashboard/Sidebar';
import StatsToday from '../../components/admin/dashboard/Stats';
import UserDetail from '../../components/admin/dashboard/UserDetail';

interface DashboardProps {
    hadir: number;
    sakit: number;
    izin: number;
    belum_absen: number;
    tanpa_keterangan: number;
}

export default function Dashboard({
    hadir,
    sakit,
    izin,
    belum_absen,
    tanpa_keterangan,
}: DashboardProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

    return (
        <div className="flex min-h-screen bg-[#f5f7fa] font-[Poppins,Segoe_UI,system-ui,sans-serif] transition-all duration-300">
            {/* === SIDEBAR === */}
            <div
                className={`fixed top-0 left-0 z-150 h-full w-[260px] bg-white shadow-md transition-transform duration-300 ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <Sidebar />
            </div>

            {/* === MAIN CONTENT === */}
            <div
                className={`flex min-h-screen flex-1 flex-col transition-all duration-300 ${
                    isSidebarOpen ? 'ml-[260px]' : 'ml-0'
                }`}
            >
                {/* === HEADER === */}
                <div
                    className={`fixed top-0 right-0 z-200 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.05)] transition-all duration-300 ${
                        isSidebarOpen ? 'left-[260px]' : 'left-0'
                    }`}
                >
                    <Header
                        isSidebarOpen={isSidebarOpen}
                        onToggleSidebar={toggleSidebar}
                    />
                </div>

                {/* === ISI HALAMAN === */}
                <div className="px-40px pb-40px flex flex-1 flex-col gap-[30px] pt-[120px] transition-all duration-300">
                    <UserDetail />
                    <StatsToday
                        hadir={hadir}
                        sakit={sakit}
                        izin={izin}
                        belum_absen={belum_absen}
                        tanpa_keterangan={tanpa_keterangan}
                    />
                    <EmployeeStatus />
                </div>
            </div>
        </div>
    );

}
