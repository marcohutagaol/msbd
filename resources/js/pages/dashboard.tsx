import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

import {
    Car,
    ClipboardList,
    Clock,
    FileText,
    Gift,
    Heart,
    Package,
    Square,
    User,
    Zap,
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [currentTime, setCurrentTime] = useState('00:00:00');
    const { props }: any = usePage();
    const user = props.auth.user; // user yang login

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            setCurrentTime(`${hours}:${minutes}:${seconds}`);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Menu Grid Atas
    const menuItems = [
        {
            icon: <User className="h-6 w-6 text-orange-500" />,
            label: 'Absensi',
        },
        {
            icon: <ClipboardList className="h-6 w-6 text-green-500" />,
            label: 'Manajemen\nKehadiran',
        },
        { icon: <Heart className="h-6 w-6 text-pink-500" />, label: 'Talent' },
        {
            icon: <FileText className="h-6 w-6 text-blue-500" />,
            label: 'Report',
        },
        {
            icon: <Square className="h-6 w-6 text-orange-500" />,
            label: 'Spaces',
        },
    ];

    // Menu Grid Bawah
    const menuItems2 = [
        { icon: <Clock className="h-6 w-6 text-green-500" />, label: 'Lembur' },
        { icon: <Gift className="h-6 w-6 text-pink-500" />, label: 'Reimburs' },
        { icon: <Car className="h-6 w-6 text-blue-500" />, label: 'Fasilitas' },
        {
            icon: <Package className="h-6 w-6 text-orange-500" />,
            label: 'Pinjaman',
        },
        { icon: <Zap className="h-6 w-6 text-green-500" />, label: 'Kasbon' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex flex-1 flex-col">
                    {/* Header */}
                    {/* <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
                        <div className="px-8 py-4 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setSidebarOpen(!sidebarOpen)}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <svg
                                        className="w-6 h-6 text-gray-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                </button>
                                <div className="flex flex-col">
                                    <h1 className="text-sm font-semibold text-gray-500">
                                        PT. Classik Creactive
                                    </h1>
                                    <p className="text-lg font-bold text-gray-900">Dashboard</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                    <svg
                                        className="w-6 h-6 text-gray-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                </button>
                                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
                                    <svg
                                        className="w-6 h-6 text-gray-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                        />
                                    </svg>
                                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                                </button>
                            </div>
                        </div>
                    </header> */}

                    {/* Main Content Area */}
                    <main className="flex-1 overflow-auto p-8">
                        <div className="mx-auto max-w-7xl space-y-8">
                            {/* Profile Card */}

                            {/* Announcements */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        Pengumuman
                                    </h3>
                                    <a
                                        href="#"
                                        className="text-sm font-medium text-pink-600 hover:text-pink-700"
                                    >
                                        Lihat Semua
                                    </a>
                                </div>

                                <div className="grid grid-cols-3 gap-6">
                                    {[1, 2, 3].map((i) => (
                                        <div
                                            key={i}
                                            className="cursor-pointer overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-lg"
                                        >
                                            <div className="relative h-40 overflow-hidden bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200">
                                                <div className="absolute inset-0 opacity-20">
                                                    <div className="absolute top-2 left-4 h-8 w-8 rounded-full bg-white"></div>
                                                    <div className="absolute top-6 right-6 h-6 w-6 rounded-full bg-white"></div>
                                                    <div className="absolute bottom-4 left-1/3 h-10 w-10 rounded-full bg-white"></div>
                                                </div>
                                            </div>
                                            <div className="p-4">
                                                <p className="text-sm font-medium text-gray-900">
                                                    Pengumuman Penting
                                                </p>
                                                <p className="mt-1 text-xs text-gray-500">
                                                    27 Sep 2023
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-start gap-4">
                                        <Avatar className="h-16 w-16">
                                            <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" />
                                            <AvatarFallback>SA</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h2 className="text-2xl font-bold text-gray-900">
                                                Nama Manusia
                                            </h2>
                                            <p className="text-gray-600">
                                                Front End
                                            </p>
                                            <p className="mt-2 text-sm text-gray-500">
                                                PT. Kawa
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-gray-600">
                                            Rabu, 27 Sep 2023
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            {currentTime} WIB
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Attendance Section */}
                            <div className="grid grid-cols-3 gap-6">
                                <div className="col-span-2 space-y-6">
                                    {/* Clock In/Out */}
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
                                            <p className="mb-3 text-sm font-medium text-gray-600">
                                                Absen Masuk
                                            </p>
                                            <p className="font-mono text-5xl font-bold text-gray-900">
                                                {currentTime}
                                            </p>
                                        </div>
                                        <div className="rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
                                            <p className="mb-3 text-sm font-medium text-gray-600">
                                                Absen Keluar
                                            </p>
                                            <p className="font-mono text-5xl font-bold text-pink-400">
                                                {currentTime}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Buttons */}
                                    <div className="grid grid-cols-2 gap-6">
                                        <button
                                            onClick={() =>
                                                router.visit(
                                                    `/absensi/${user.id}`,
                                                )
                                            }
                                            className="group relative flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 py-5 text-base font-semibold text-white shadow-md transition-all duration-300 hover:from-blue-700 hover:to-blue-600 hover:shadow-lg active:scale-95"
                                        >
                                            <div className="absolute inset-0 rounded-lg bg-white/10 opacity-0 transition-opacity group-hover:opacity-100" />
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 text-white"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>
                                            <span>Clock In</span>
                                        </button>

                                        <button className="group relative flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 py-5 text-base font-semibold text-white shadow-md transition-all duration-300 hover:from-blue-700 hover:to-blue-600 hover:shadow-lg active:scale-95">
                                            <div className="absolute inset-0 rounded-lg bg-white/10 opacity-0 transition-opacity group-hover:opacity-100" />
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 text-white"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M17 8h2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2h2m5-3l2 3h-4l2-3z"
                                                />
                                            </svg>
                                            <span>Clock Out</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Stats */}
                                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                    <h3 className="mb-4 font-semibold text-gray-900">
                                        Ringkasan Hari Ini
                                    </h3>
                                    <div className="space-y-4">
                                        <div>
                                            <p className="mb-1 text-sm text-gray-600">
                                                Jam Kerja
                                            </p>
                                            <p className="text-2xl font-bold text-gray-900">
                                                7h 58m
                                            </p>
                                        </div>
                                        <div>
                                            <p className="mb-1 text-sm text-gray-600">
                                                Status
                                            </p>
                                            <p className="text-lg font-semibold text-green-600">
                                                Masuk
                                            </p>
                                        </div>
                                        <div>
                                            <p className="mb-1 text-sm text-gray-600">
                                                Kehadiran
                                            </p>
                                            <p className="text-lg font-semibold text-blue-600">
                                                100%
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Menu Grid */}
                            {/*<div className="space-y-6">
                                <h3 className="text-lg font-semibold text-gray-900">Menu Utama</h3>

                                <div className="grid grid-cols-5 gap-4">
                                    {menuItems.map((item, index) => (
                                        <button
                                            key={index}
                                            className="bg-white rounded-xl p-6 flex flex-col items-center gap-3 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all group"
                                        >
                                            <div className="group-hover:scale-110 transition-transform">{item.icon}</div>
                                            <span className="text-sm font-medium text-gray-900 text-center leading-tight whitespace-pre-line">
                                                {item.label}
                                            </span>
                                        </button>
                                    ))}
                                </div>

                                <div className="grid grid-cols-5 gap-4">
                                    {menuItems2.map((item, index) => (
                                        <button
                                            key={index}
                                            className="bg-white rounded-xl p-6 flex flex-col items-center gap-3 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all group"
                                        >
                                            <div className="group-hover:scale-110 transition-transform">{item.icon}</div>
                                            <span className="text-sm font-medium text-gray-900 text-center leading-tight whitespace-pre-line">
                                                {item.label}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div> */}

                            {/* Announcements */}
                            {/* <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-semibold text-gray-900">Pengumuman</h3>
                                    <a
                                        href="#"
                                        className="text-sm text-pink-600 hover:text-pink-700 font-medium"
                                    >
                                        Lihat Semua
                                    </a>
                                </div>

                                <div className="grid grid-cols-3 gap-6">
                                    {[1, 2, 3].map((i) => (
                                        <div
                                            key={i}
                                            className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
                                        >
                                            <div className="h-40 bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 relative overflow-hidden">
                                                <div className="absolute inset-0 opacity-20">
                                                    <div className="absolute top-2 left-4 w-8 h-8 bg-white rounded-full"></div>
                                                    <div className="absolute top-6 right-6 w-6 h-6 bg-white rounded-full"></div>
                                                    <div className="absolute bottom-4 left-1/3 w-10 h-10 bg-white rounded-full"></div>
                                                </div>
                                            </div>
                                            <div className="p-4">
                                                <p className="text-sm font-medium text-gray-900">Pengumuman Penting</p>
                                                <p className="text-xs text-gray-500 mt-1">27 Sep 2023</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div> */}
                        </div>
                    </main>
                </div>
            </div>
        </AppLayout>
    );
}
