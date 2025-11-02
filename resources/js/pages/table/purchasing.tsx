'use client';

import { OrderTimeline } from '@/components/ui/order-timeline';
import OrdersTable from '@/components/ui/orders-table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import React from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Orders Table',
        href: '#',
    },
];

function Page() {
    return (
        <>
            <Head title="Orders Table" />
            <main className="min-h-screen bg-white p-4 md:p-8 lg:p-12">
                <div className="mb-8">
                    <OrderTimeline />
                </div>
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white via-blue-50 to-white"></div>
                <div className="mx-auto max-w-7xl">
                    <OrdersTable />
                </div>
            </main>
        </>
    );
}

Page.layout = (page: React.ReactNode) => (
    <AppLayout breadcrumbs={breadcrumbs}>{page}</AppLayout>
);

export default Page;
