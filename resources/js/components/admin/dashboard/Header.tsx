'use client';

import { FiMoon } from 'react-icons/fi';
import { HiMenuAlt2 } from 'react-icons/hi';
import { IoMdNotifications } from 'react-icons/io';

import { usePage } from '@inertiajs/react';

// Type user dari Laravel Breeze
type User = {
    id: number;
    name: string;
    email: string;
    role?: string;
    company?: string;
    photo?: string | null;
};

interface HeaderProps {
    isSidebarOpen: boolean;
    onToggleSidebar: () => void;
}

export default function Header({ onToggleSidebar }: HeaderProps) {
    const { props } = usePage<{
        auth?: {
            user?: User;
        };
    }>();

    const user = props.auth?.user;

    // Ambil inisial (misal Rio Naibaho -> RN)
    const initials = user?.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase();
console.log(user);

    return (
        <header className="flex items-center justify-between bg-white px-10 py-4 font-[Poppins,sans-serif] shadow-sm">
            {/* === TOGGLE SIDEBAR BUTTON === */}
            <button
                onClick={onToggleSidebar}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-[#f8fafc] transition-colors hover:bg-[#e8eef5]"
            >
                <HiMenuAlt2 className="text-[22px] text-[#333]" />
            </button>

            {/* === ICONS & PROFILE === */}
            <div className="flex items-center gap-5">
                {/* === NOTIFICATION ICON === */}
                <div className="relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl bg-[#f8fafc]">
                    <IoMdNotifications className="text-[20px] text-[#333]" />
                    <div className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
                        3
                    </div>
                </div>

                {/* === DARK MODE ICON === */}
                <div className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl bg-[#f8fafc]">
                    <FiMoon className="text-[18px] text-[#333]" />
                </div>

                {/* === USER PROFILE === */}
                <div className="flex h-10 cursor-pointer items-center gap-2.5 rounded-xl bg-[#4789A8] px-3 text-[14px] text-white shadow-[0_2px_6px_rgba(0,0,0,0.15)]">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#2f6d8a] font-semibold">
                        {initials}
                    </div>

                    <span className="font-medium whitespace-nowrap">
                        {user?.name}
                    </span>

                    <span className="text-[10px]">▼</span>
                </div>
            </div>
        </header>
    );
}
