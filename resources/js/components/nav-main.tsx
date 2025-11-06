"use client";

import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { resolveUrl } from "@/lib/utils";
import { type NavItem } from "@/types";
import { Link, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage();
    const current = page.url;
    const [openMenus, setOpenMenus] = useState<string[]>([]);

    // Otomatis buka parent jika anak aktif
    useEffect(() => {
        items.forEach((item) => {
            if (item.items) {
                const childActive =
                    item.items.some((child) =>
                        current.startsWith(resolveUrl(child.href))
                    ) ||
                    current.startsWith(resolveUrl(item.href));

                if (childActive && !openMenus.includes(item.title)) {
                    setOpenMenus((prev) => [...prev, item.title]);
                }
            }
        });
    }, [current]);

    const handleParentClick = (item: NavItem, e: React.MouseEvent<Element>) => {
    const hasChildren = item.items && item.items.length > 0
    if (hasChildren) {
        e.preventDefault()
        setOpenMenus((prev) =>
            prev.includes(item.title)
                ? prev.filter((title) => title !== item.title)
                : [...prev, item.title]
        )
    }
}

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => {
                    const target = resolveUrl(item.href);
                    const isActive =
                        current === target ||
                        (current.startsWith(target + "/") && target !== "/");

                    const hasChildren = item.items && item.items.length > 0;
                    const isOpen = openMenus.includes(item.title);

                    return (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                asChild
                                isActive={isActive}
                                tooltip={{ children: item.title }}
                            >
                                <Link
                                    href={item.href}
                                    prefetch
                                    onClick={(e) => handleParentClick(item, e)}
                                    className="flex items-center gap-2"
                                >
                                    {item.icon && <item.icon size={18} />}
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>

                            {/* Anak menu tampil jika parent terbuka */}
                            {hasChildren && isOpen && (
                                <div className="ml-4 mt-1 space-y-1 border-l border-border pl-3">
                                    {item.items?.map((child) => {
                                        const childTarget = resolveUrl(child.href);
                                        const childActive =
                                            current === childTarget ||
                                            (current.startsWith(childTarget + "/") &&
                                                childTarget !== "/");
                                        return (
                                            <SidebarMenuButton
                                                key={child.title}
                                                asChild
                                                isActive={childActive}
                                                tooltip={{ children: child.title }}
                                            >
                                                <Link
                                                    href={child.href}
                                                    prefetch
                                                    className="flex items-center gap-2 text-sm"
                                                >
                                                    {child.icon && <child.icon size={16} />}
                                                    <span>{child.title}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        );
                                    })}
                                </div>
                            )}
                        </SidebarMenuItem>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}
