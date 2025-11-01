import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { type BreadcrumbItem as BreadcrumbItemType } from '@/types';
import { Link } from '@inertiajs/react';
import { Bell, Search } from 'lucide-react';
import { Fragment } from 'react';

export function Breadcrumbs({
    breadcrumbs,
}: {
    breadcrumbs: BreadcrumbItemType[];
}) {
    return (
        <>
            {breadcrumbs.length > 0 && (
                <Breadcrumb>
                    <BreadcrumbList>
                        {breadcrumbs.map((item, index) => {
                            const isLast = index === breadcrumbs.length - 1;
                            return (
                                <Fragment key={index}>
                                    <BreadcrumbItem>
                                        {isLast ? (
                                            <BreadcrumbPage>
                                                {item.title}
                                            </BreadcrumbPage>
                                        ) : (
                                            <BreadcrumbLink asChild>
                                                <Link href={item.href}>
                                                    {item.title}
                                                </Link>
                                            </BreadcrumbLink>
                                        )}
                                    </BreadcrumbItem>
                                    {!isLast && <BreadcrumbSeparator />}
                                </Fragment>
                            );
                        })}
                    </BreadcrumbList>

                    {/* Kanan - Search & Notif mentok pojok kanan */}
                    <div className="fixed top-4 right-6 z-50 flex items-center gap-3">
                        {/* Search box */}
                        <div className="relative hidden sm:block">
                            <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Search..."
                                className="w-44 border-gray-300 pl-8 shadow-sm sm:w-56 md:w-64 dark:border-neutral-700"
                            />
                        </div>

                        {/* Notification */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="relative rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800"
                        >
                            <Bell className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                            <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500"></span>
                        </Button>
                    </div>
                </Breadcrumb>
            )}
        </>
    );
}
