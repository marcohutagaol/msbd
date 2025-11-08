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
import { Link } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Beranda',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Absensi',
        href: '/absensi/1',
        icon: LayoutGrid,
    },
    {
        title: 'Izin',
        href: '/permission',
        icon: LayoutGrid,
    },
    {
        title: 'Barang',
        href: '#',
        icon: LayoutGrid,
        items: [
            {
                title: 'Permintaan',
                href: '/request',
                icon: LayoutGrid,
            },
            {
                title: 'Pemantauan Item',
                href: '/monitoring-item',
                icon: LayoutGrid,
            },
        ],
    },
    {
        title: 'Pembelian',
        href: '#',
        icon: LayoutGrid,
        items: [
            {
                title: 'Pembelian',
                href: '/dashboard-purchasing',
                icon: LayoutGrid,
            },
       
            {
                title: 'Input Harga',
                href: '/input-price',
                icon: LayoutGrid,
            },
                {
                title: 'Toko ',
                href: '/toko',
                icon: LayoutGrid,
            },
        ],
    },

    {
        title: 'Inventory',
        href: '/inventory',
        icon: LayoutGrid,
    },
];

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

export function AppSidebar() {
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
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
