'use client';

import { useEffect, useState } from 'react';
import { OrderTimeline } from '@/components/ui/order-timeline';
import OrdersTable from '@/components/ui/orders-table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import React from 'react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Orders Table',
    href: '#',
  },
];

function Page() {
  const page = usePage();
  
  const [status, setStatus] = useState("Checking");

  useEffect(() => {
    const path = page.url;

    if (path.includes("/purchasing-detail")) setStatus("Checking");
    else if (path.includes("/input-price")) setStatus("Purchasing");
    else if (path.includes("/pre-order")) setStatus("Waiting");
    else if (path.includes("/item-arrive")) setStatus("Arrive");
    else setStatus("Checking");
  }, [page.url]);

  const handleStatusUpdate = (newStatus: string) => {
    setStatus(newStatus);
  };

  return (
    <>
      <Head title="Purchasing Progress" />
      <main className="min-h-screen bg-white p-4 md:p-8 lg:p-12">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Purchasing Progress</h1>

          <OrderTimeline status={status} />

          <p className="mt-6 text-gray-700 text-lg">
            Current Status:{" "}
            <span className="font-semibold text-blue-600">{status}</span>
          </p>
        </div>

        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white via-blue-50 to-white"></div>

        <div className="mx-auto max-w-7xl">
          <OrdersTable onApproveStatusChange={() => handleStatusUpdate("Approve")} />
        </div>
      </main>
    </>
  );
}

Page.layout = (page: React.ReactNode) => (
  <AppLayout breadcrumbs={breadcrumbs}>{page}</AppLayout>
);

export default Page;
