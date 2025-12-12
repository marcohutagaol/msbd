'use client';

import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import {
    FaRegCalendarAlt,
    FaUserCheck,
    FaUserClock,
    FaUserTimes,
} from 'react-icons/fa';
import { MdOutlinePendingActions, MdSick } from 'react-icons/md';

interface StatItem {
    label: string;
    value: number;
    color: string;
    icon: React.ReactNode;
    href?: string;
}

interface StatsTodayProps {
    hadir: number,
    sakit: number,
    izin: number,
    belum_absen: number,
    tanpa_keterangan: number
}

export default function StatsToday({ hadir, sakit, izin, belum_absen, tanpa_keterangan }: StatsTodayProps) {
    const stats: StatItem[] = [
        {
            label: 'Hadir',
            value: hadir,
            color: '#10b981',
            icon: <FaUserCheck className="text-emerald-500" />,
            href: '/admin/dashboard/detail/hadir',
        },
        {
            label: 'Izin',
            value: izin,
            color: '#3b82f6',
            icon: <FaUserClock className="text-blue-500" />,
            href: '/admin/dashboard/detail/izin',
        },
        {
            label: 'Sakit',
            value: sakit,
            color: '#f59e0b',
            icon: <MdSick className="text-amber-500" />,
            href: '/admin/dashboard/detail/sakit',
        },
        {
            label: 'Tanpa Keterangan',
            value: tanpa_keterangan,
            color: '#ef4444',
            icon: <FaUserTimes className="text-red-500" />,
            href: '/admin/dashboard/detail/tanpa-keterangan',
        },
    ];

    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const days = [
                'Minggu',
                'Senin',
                'Selasa',
                'Rabu',
                'Kamis',
                'Jumat',
                'Sabtu',
            ];
            const months = [
                'Januari',
                'Februari',
                'Maret',
                'April',
                'Mei',
                'Juni',
                'Juli',
                'Agustus',
                'September',
                'Oktober',
                'November',
                'Desember',
            ];
            const dayName = days[now.getDay()];
            const date = now.getDate();
            const monthName = months[now.getMonth()];
            const year = now.getFullYear();
            const timeString = now.toLocaleTimeString('id-ID', {
                hour: '2-digit',
                minute: '2-digit',
            });
            setCurrentTime(
                `${dayName}, ${date} ${monthName} ${year} | ${timeString}`,
            );
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    const total = stats.reduce((sum, item) => sum + item.value, 0);
    let start = 0;
    const segments: string[] = [];

    for (const item of stats) {
        const percent = (item.value / total) * 100;
        const end = start + percent * 3.6; // 100% = 360 derajat
        segments.push(`${item.color} ${start}deg ${end}deg`);
        start = end;
    }

    const gradient = `conic-gradient(${segments.join(', ')})`;

    return (
        <div className="rounded-xl md:rounded-2xl bg-white p-4 md:p-7 shadow-sm">
            {/* Header waktu */}
            <div className="mb-2 md:mb-3 flex items-center gap-2 text-xs md:text-sm text-slate-600">
                <FaRegCalendarAlt className="w-3 h-3 md:w-4 md:h-4" />
                <span className="truncate">{currentTime}</span>
            </div>

            {/* Judul */}
            <div className="mb-4 md:mb-6 flex items-center justify-between">
                <h3 className="text-base md:text-lg font-bold text-slate-900">
                    Statistik Kehadiran Hari Ini
                </h3>
            </div>

            <div className="flex flex-col lg:flex-row items-center gap-6 md:gap-10">
                {/* Donut Chart */}
                <div className="relative flex h-[150px] w-[150px] md:h-[200px] md:w-[200px] items-center justify-center">
                    <div
                        className="absolute inset-0 rounded-full shadow-inner"
                        style={{
                            background: gradient,
                        }}
                    ></div>
                    <div className="absolute flex h-[100px] w-[100px] md:h-[135px] md:w-[135px] flex-col items-center justify-center rounded-full bg-white shadow-md">
                        <div className="text-xl md:text-3xl font-bold text-slate-900">
                            {stats[0].value}
                        </div>
                        <div className="mt-1 md:mt-2px text-xs text-slate-500">
                            dari 100
                        </div>
                    </div>
                </div>

                {/* Grid data */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 w-full lg:w-auto flex-1 gap-3 md:gap-4">
                    {stats.map((item, i) => (
                        <Link
                            key={i}
                            href={item.href ?? '#'}
                            className="no-underline"
                        >
                            <div
                                className={`flex items-center gap-2 md:gap-3 rounded-lg md:rounded-xl border border-slate-200 bg-white px-3 md:px-5 py-3 md:py-[18px] shadow-sm transition-all duration-200 hover:border-slate-300 hover:shadow-md`}
                            >
                                <div className="flex h-7 w-7 md:h-9 md:w-9 items-center justify-center rounded-full border border-slate-100 bg-slate-50">
                                    {item.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="m-0 text-xs md:text-[13px] font-medium text-slate-500 truncate">
                                        {item.label}
                                    </p>
                                    <p
                                        className="m-0 mt-1 text-lg md:text-[22px] font-bold truncate"
                                        style={{ color: item.color }}
                                    >
                                        {item.value}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}