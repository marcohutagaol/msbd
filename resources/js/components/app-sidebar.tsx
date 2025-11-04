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
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Absensi',
        href: '/absensi/1',
        icon: LayoutGrid,
    },
        {
        title: 'Permission',
        href: '/permission',
        icon: LayoutGrid,
    },
    {
        title: 'Request Item',
        href: '/request',
        icon: LayoutGrid,
        items: [
            {
                title: 'Monitoring Item',
                href: '/monitoring-item',
                icon: LayoutGrid,
            },
        ],
    },
    {
        title: 'Dashboard Purchasing',
        href: '/dashboard-purchasing',
        icon: LayoutGrid,
        items: [
            {
                title: 'Purchasing Detail',
                href: '/purchasing',
                icon: LayoutGrid,
            },
            {
                title: 'Input Price',
                href: '/input-price',
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
