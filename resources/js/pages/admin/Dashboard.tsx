'use client';

import { useState, useEffect } from 'react';
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
    const [isMobile, setIsMobile] = useState(false);
    
    const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

    // Deteksi ukuran layar - SAMA seperti di AnnouncementPage
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
    }, []);

    return (
        <div className="flex min-h-screen bg-[#f5f7fa] font-[Poppins,Segoe_UI,system-ui,sans-serif] transition-all duration-300">
            {/* === SIDEBAR DESKTOP === */}
            <div
                className={`hidden md:block fixed top-0 left-0 z-50 h-full w-[260px] bg-white shadow-md transition-transform duration-300 ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <Sidebar />
            </div>

            {/* === SIDEBAR MOBILE OVERLAY === */}
            {/* SAMA PERSIS seperti di AnnouncementPage */}
            {isMobile && isSidebarOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-black/50 z-40"
                        onClick={toggleSidebar}
                    ></div>
                    <div className="fixed top-0 left-0 z-50 h-full w-[260px] bg-white shadow-lg transition-transform duration-300 translate-x-0">
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

                {/* === ISI HALAMAN === */}
                {/* Padding dan spacing SAMA seperti di AnnouncementPage */}
                <div className="px-4 sm:px-6 lg:px-8 pb-6 flex flex-1 flex-col gap-4 md:gap-6 pt-20 md:pt-28 transition-all duration-300">
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