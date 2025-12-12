'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import {
    Bell,
    Calendar,
    ChevronRight,
    ClipboardList,
    Clock,
    Megaphone,
    User,
} from 'lucide-react';
import { useEffect, useState } from 'react';

const announcements = [
    {
        id: 1,
        title: 'Jadwal Libur Akhir Tahun 2024',
        description:
            'Informasi mengenai jadwal libur bersama akhir tahun dan cuti tahunan karyawan.',
        date: '10 Des 2024',
        category: 'Penting',
        categoryColor: 'destructive',
        gradient: 'from-rose-500 via-pink-500 to-purple-500',
        icon: Calendar,
    },
    {
        id: 2,
        title: 'Update Sistem Absensi Baru',
        description:
            'Fitur baru untuk clock in/out menggunakan face recognition telah tersedia.',
        date: '8 Des 2024',
        category: 'Update',
        categoryColor: 'default',
        gradient: 'from-blue-500 via-cyan-500 to-teal-500',
        icon: Bell,
    },
    {
        id: 3,
        title: 'Town Hall Meeting Desember',
        description:
            'Undangan untuk menghadiri town hall meeting bulanan bersama manajemen.',
        date: '5 Des 2024',
        category: 'Event',
        categoryColor: 'secondary',
        gradient: 'from-amber-500 via-orange-500 to-red-500',
        icon: Megaphone,
    },
];

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard() {
    const { props }: any = usePage();
    const user = props.user;

    const [currentTime, setCurrentTime] = useState('00:00:00');

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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-hidden rounded-xl bg-gray-50 p-4 sm:p-6">
                <main className="flex-1 overflow-auto">
                    <div className="mx-auto max-w-7xl space-y-8">
                        {/* Profile Card */}
                        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md transition-all hover:shadow-lg sm:p-8">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex items-center gap-4">
                                    <Avatar className="h-16 w-16 ring-4 ring-blue-100">
                                        <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" />
                                        <AvatarFallback>SA</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                                            {user.name}
                                        </h2>
                                        <p className="text-sm text-gray-600 sm:text-base">
                                            {user.departemen}
                                        </p>
                                        <div className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 px-3 py-1 shadow-sm">
                                            <svg
                                                className="h-3.5 w-3.5 text-white"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            <span className="text-xs font-semibold text-white">
                                                Kawaland
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-left sm:text-right">
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <svg
                                            className="h-4 w-4"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                            />
                                        </svg>
                                        <span className="font-medium">
                                            {new Date().toLocaleDateString(
                                                'id-ID',
                                                {
                                                    weekday: 'long',
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric',
                                                },
                                            )}
                                        </span>
                                    </div>
                                    <p className="text-lg font-semibold text-blue-600">
                                        {currentTime} WIB
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Attendance Section */}
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                            <div className="space-y-6 lg:col-span-2">
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    {/* Clock In Card */}
                                    <div className="group relative overflow-hidden rounded-2xl border-2 border-blue-500 bg-gradient-to-br from-blue-50 via-blue-100/50 to-white p-6 shadow-lg shadow-blue-500/20 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30">
                                        {/* Decorative Elements */}
                                        <div className="absolute -top-8 -right-8 h-24 w-24 rounded-full bg-blue-400/20 blur-2xl" />
                                        <div className="absolute -bottom-6 -left-6 h-20 w-20 rounded-full bg-blue-500/10 blur-xl" />

                                        {/* Icon & Label */}
                                        <div className="relative mb-3 flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-md">
                                                    <Clock className="h-5 w-5 text-white" />
                                                </div>
                                                <span className="text-sm font-bold tracking-wide text-blue-700 uppercase">
                                                    Clock In
                                                </span>
                                            </div>
                                            <div className="h-2 w-2 animate-pulse rounded-full bg-blue-500" />
                                        </div>

                                        {/* Time Display */}
                                        <div className="relative">
                                            <p className="mb-1 text-xs font-semibold tracking-wider text-slate-600 uppercase">
                                                Absen Masuk
                                            </p>
                                            <p className="font-mono text-4xl font-black tracking-tight text-blue-700 sm:text-5xl">
                                                {currentTime}
                                            </p>
                                            <p className="mt-1 text-xs font-medium text-blue-600">
                                                WIB
                                            </p>
                                        </div>
                                    </div>

                                    {/* Clock Out Card */}
                                    <div className="group relative overflow-hidden rounded-2xl border-2 border-rose-500 bg-gradient-to-br from-rose-50 via-rose-100/50 to-white p-6 shadow-lg shadow-rose-500/20 transition-all duration-300 hover:shadow-xl hover:shadow-rose-500/30">
                                        {/* Decorative Elements */}
                                        <div className="absolute -top-8 -right-8 h-24 w-24 rounded-full bg-rose-400/20 blur-2xl" />
                                        <div className="absolute -bottom-6 -left-6 h-20 w-20 rounded-full bg-rose-500/10 blur-xl" />

                                        {/* Icon & Label */}
                                        <div className="relative mb-3 flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 to-rose-600 shadow-md">
                                                    <Clock className="h-5 w-5 text-white" />
                                                </div>
                                                <span className="text-sm font-bold tracking-wide text-rose-700 uppercase">
                                                    Clock Out
                                                </span>
                                            </div>
                                            <div className="h-2 w-2 animate-pulse rounded-full bg-rose-500" />
                                        </div>

                                        {/* Time Display */}
                                        <div className="relative">
                                            <p className="mb-1 text-xs font-semibold tracking-wider text-slate-600 uppercase">
                                                Absen Keluar
                                            </p>
                                            <p className="font-mono text-4xl font-black tracking-tight text-rose-700 sm:text-5xl">
                                                {currentTime}
                                            </p>
                                            <p className="mt-1 text-xs font-medium text-rose-600">
                                                WIB
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* ACTION BUTTONS */}
                                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    {/* Clock In Button */}
                                    <button
                                        onClick={() =>
                                            router.visit(`/absensi/${user.id}`)
                                        }
                                        className="group relative overflow-hidden rounded-xl border-2 border-blue-500 bg-gradient-to-r from-blue-500 to-blue-600 p-5 shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-600/40 active:scale-95"
                                    >
                                        {/* Shine */}
                                        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                                        <div className="relative flex items-center justify-center gap-3">
                                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                                                <Clock
                                                    className="h-6 w-6 text-white"
                                                    strokeWidth={2.5}
                                                />
                                            </div>
                                            <div className="text-left">
                                                <p className="text-lg font-black tracking-wide text-white uppercase">
                                                    Clock In
                                                </p>
                                                <p className="text-xs font-medium text-blue-100">
                                                    Tap untuk absen masuk
                                                </p>
                                            </div>
                                        </div>
                                    </button>

                                    {/* Clock Out Button */}
                                    <button className="group relative overflow-hidden rounded-xl border-2 border-rose-500 bg-gradient-to-r from-rose-500 to-rose-600 p-5 shadow-lg shadow-rose-500/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-rose-600/40 active:scale-95">
                                        {/* Shine */}
                                        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                                        <div className="relative flex items-center justify-center gap-3">
                                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                                                <Clock
                                                    className="h-6 w-6 text-white"
                                                    strokeWidth={2.5}
                                                />
                                            </div>
                                            <div className="text-left">
                                                <p className="text-lg font-black tracking-wide text-white uppercase">
                                                    Clock Out
                                                </p>
                                                <p className="text-xs font-medium text-rose-100">
                                                    Tap untuk absen keluar
                                                </p>
                                            </div>
                                        </div>
                                    </button>
                                </div>
                            </div>

                            <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-white via-white to-blue-50/30 p-6 shadow-sm transition-all hover:shadow-lg sm:p-8">
                                {/* Background Decoration */}
                                <div className="absolute -top-8 -right-8 h-32 w-32 rounded-full bg-blue-200/20 blur-3xl" />
                                <div className="absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-green-200/20 blur-2xl" />

                                {/* Header */}
                                <div className="relative mb-6 flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-400 shadow-lg shadow-blue-300/25">
                                        <ClipboardList className="h-5 w-5 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900">
                                            Ringkasan Hari Ini
                                        </h3>
                                        <p className="text-xs text-gray-500">
                                            Update real-time
                                        </p>
                                    </div>
                                </div>

                                {/* Stats Grid */}
                                <div className="relative space-y-4">
                                    {/* Jam Kerja */}
                                    <div className="group rounded-xl bg-white/60 p-4 backdrop-blur-sm transition-all hover:bg-white/80 hover:shadow-sm">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100">
                                                    <Clock className="h-4 w-4 text-blue-600" />
                                                </div>
                                                <p className="text-sm font-medium text-gray-600">
                                                    Jam Kerja
                                                </p>
                                            </div>
                                            <p className="text-2xl font-bold text-gray-900">
                                                7h 58m
                                            </p>
                                        </div>

                                        <div className="mt-3">
                                            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                                                <div className="h-full w-[83%] rounded-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-500" />
                                            </div>
                                            <p className="mt-1 text-right text-xs text-gray-500">
                                                83% dari 8 jam
                                            </p>
                                        </div>
                                    </div>

                                    {/* Status & Kehadiran Row */}
                                    <div className="grid grid-cols-2 gap-3">
                                        {/* STATUS ABSEN */}
                                        <div
                                            className={`group rounded-xl p-4 transition-all 
        ${props.absen_status === "Masuk"
                                                    ? "bg-green-100/50 hover:bg-green-100"
                                                    : props.absen_status === "Pulang"
                                                        ? "bg-purple-100/50 hover:bg-purple-100"
                                                        : "bg-red-100/50 hover:bg-red-100"
                                                }
    `}
                                        >
                                            <div className="flex items-center gap-2">
                                                <div
                                                    className={`h-2.5 w-2.5 rounded-full animate-pulse 
                ${props.absen_status === "Masuk"
                                                            ? "bg-green-500 shadow-green-300/50"
                                                            : props.absen_status === "Pulang"
                                                                ? "bg-purple-500 shadow-purple-300/50"
                                                                : "bg-red-500 shadow-red-300/50"
                                                        }
            `}
                                                />
                                                <p className="text-xs font-medium text-gray-600">Status</p>
                                            </div>

                                            <p
                                                className={`mt-2 text-lg font-bold 
            ${props.absen_status === "Masuk"
                                                        ? "text-green-600"
                                                        : props.absen_status === "Pulang"
                                                            ? "text-purple-600"
                                                            : "text-red-600"
                                                    }
                                                `}
                                            >
                                                {props.absen_status}
                                            </p>
                                        </div>
                                        {/* Kehadiran */}
                                        <div className="group rounded-xl bg-blue-100/50 p-4 transition-all hover:bg-blue-100">
                                            <div className="flex items-center gap-2">
                                                <User className="h-3 w-3 text-blue-600" />
                                                <p className="text-xs font-medium text-gray-600">
                                                    Kehadiran
                                                </p>
                                            </div>
                                            <p className="mt-2 text-lg font-bold text-blue-600">
                                                100%
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Announcements - Improved Design */}
                        <div className="space-y-6">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-400 shadow-lg shadow-blue-300/30">
                                        <Megaphone className="h-5 w-5 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">
                                            Pengumuman
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            Informasi terbaru untuk Anda
                                        </p>
                                    </div>
                                </div>

                                <a
                                    href="#"
                                    className="group flex items-center gap-1 rounded-full bg-blue-300 px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-blue-600 hover:text-white"
                                >
                                    Lihat Semua
                                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                                </a>
                            </div>

                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {announcements.map((announcement, index) => {
                                    const IconComponent = announcement.icon;

                                    return (
                                        <div
                                            key={announcement.id}
                                            className="group cursor-pointer overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                                            style={{
                                                animationDelay: `${index * 100}ms`,
                                            }}
                                        >
                                            <div
                                                className={`relative h-32 bg-gradient-to-br ${announcement.gradient} p-4`}
                                            >
                                                <div className="absolute inset-0 overflow-hidden">
                                                    <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
                                                    <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
                                                    <div className="absolute top-8 right-8 h-2 w-2 rounded-full bg-white/40" />
                                                    <div className="absolute top-12 left-12 h-1.5 w-1.5 rounded-full bg-white/30" />
                                                    <div className="absolute right-12 bottom-6 h-3 w-3 rounded-full bg-white/20" />
                                                </div>

                                                <div className="absolute right-4 bottom-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                                                    <IconComponent className="h-6 w-6 text-white" />
                                                </div>

                                                <Badge
                                                    variant={
                                                        announcement.categoryColor as any
                                                    }
                                                    className="absolute top-4 left-4 border-0 bg-white/90 text-xs font-semibold text-gray-900 shadow-sm backdrop-blur-sm"
                                                >
                                                    {announcement.category}
                                                </Badge>
                                            </div>

                                            <div className="p-5">
                                                <h4 className="mb-2 line-clamp-2 text-base font-bold text-gray-900 transition-colors group-hover:text-blue-600">
                                                    {announcement.title}
                                                </h4>
                                                <p className="mb-4 line-clamp-2 text-sm text-gray-500">
                                                    {announcement.description}
                                                </p>

                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                                        <Calendar className="h-3.5 w-3.5" />
                                                        <span>
                                                            {announcement.date}
                                                        </span>
                                                    </div>

                                                    <div className="flex items-center gap-1 text-xs font-medium text-blue-600 opacity-0 transition-all duration-300 group-hover:opacity-100">
                                                        <span>
                                                            Baca selengkapnya
                                                        </span>
                                                        <ChevronRight className="h-3.5 w-3.5" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </AppLayout>
    );
}
