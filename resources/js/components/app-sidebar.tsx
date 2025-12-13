import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';

import { 
    BookOpen, 
    Folder, 
    LayoutGrid, 
    Calendar,
    FileCheck,
    Package,
    ShoppingCart,
    Store,
    Warehouse,
    Megaphone,
    BarChart3,
    Users,
    ClipboardList,
    FileText
} from 'lucide-react';

import AppLogo from './app-logo';

/* -------------------------------------------------------
   NAV UNTUK USER
------------------------------------------------------- */
const userNavItems: NavItem[] = [
    {
        title: 'Beranda',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Absensi',
        href: '/absensi/1',
        icon: Calendar,
    },
    {
        title: 'Izin',
        href: '/permission',
        icon: FileCheck,
    },
    {
        title: 'Barang',
        href: '#',
        icon: Package,
        items: [
            {
                title: 'Permintaan',
                href: '/request',
                icon: ClipboardList,
            },
            {
                title: 'Pemantauan Barang',
                href: '/monitoring-request',
                icon: Package,
            },
        ],
    },
    {
        title: 'Pembelian',
        href: '#',
        icon: ShoppingCart,
        items: [
            {
                title: 'Pembelian',
                href: '/dashboard-purchasing',
                icon: ShoppingCart,
            },
            {
                title: 'Toko',
                href: '/toko',
                icon: Store,
            },
        ],
    },
    {
        title: 'Inventory',
        href: '/inventory',
        icon: Warehouse,
    },
    {
        title: 'Laporan',
        href: '/laporan',
        icon: FileText,
    },
];

/* -------------------------------------------------------
   NAV UNTUK MANAGER
------------------------------------------------------- */
const managerNavItems: NavItem[] = [
    {
        title: 'Manager Dashboard',
        href: '/manager',
        icon: BarChart3,
    },
    {
        title: 'Manager Karyawan',
        href: '/manager-karyawan',
        icon: Users,
    },
    {
        title: 'Manager Absensi',
        href: '/manager-absensi',
        icon: Calendar,
    },
    {
        title: 'Announcement',
        href: '/announcement',
        icon: Megaphone,
    },
    {
        title: 'Report',
        href: '/report',
        icon: BarChart3,
    },
];

/* -------------------------------------------------------
   FOOTER NAV
------------------------------------------------------- */
const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

/* -------------------------------------------------------
   SIDEBAR UTAMA
------------------------------------------------------- */
export function AppSidebar() {
    const { auth } = usePage().props;

    const role = auth?.user?.role;

    const navItems =
        role === 'manager'
            ? managerNavItems
            : userNavItems;

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={navItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
