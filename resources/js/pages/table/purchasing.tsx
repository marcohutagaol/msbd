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
    title: 'Pembelian',
    href: '/dashboard-purchasing',
  },
  {
    title: 'Detail Pembelian',
    href: '#',
  },
];

function Page() {
  const page = usePage();
  const { props } = page;
  const { requestNumber } = props as any;

  // 🔥 SOURCE OF TRUTH STATUS - persist dengan localStorage PER REQUEST
  const [status, setStatus] = useState<string>(() => {
    // Cek localStorage dengan key per-request
    if (typeof window !== 'undefined' && requestNumber) {
      const saved = localStorage.getItem(`timeline-status-${requestNumber}`);
      return saved || 'Checking';
    }
    return 'Checking';
  });

  // 🔥 Simpan ke localStorage setiap kali status berubah (per request)
  useEffect(() => {
    if (typeof window !== 'undefined' && requestNumber) {
      localStorage.setItem(`timeline-status-${requestNumber}`, status);
    }
  }, [status, requestNumber]);

  // 🔥 INI YANG KAMU TANYA
  const handleTimelineChange = (newStatus: string) => {
    setStatus(newStatus);

    // 🧠 nanti kalau mau kirim ke backend:
    // router.put(`/purchasing/${id}`, { status: newStatus })
  };

  return (
    <>
      <Head title="Purchasing Progress" />

      <main className="min-h-screen bg-white dark:bg-slate-900 p-4 md:p-8 lg:p-12">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold mb-4 dark:text-white">
            Progres Pembelian
          </h1>

          {/* 🔥 HUBUNGAN PARENT ↔ CHILD */}
          <OrderTimeline
            status={status}
            onChange={handleTimelineChange}
          />

          <p className="mt-6 text-gray-700 dark:text-gray-300 text-lg">
            Status saat ini:{' '}
            <span className="font-semibold text-blue-600">
              {status}
            </span>
          </p>
        </div>

        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white via-blue-50 to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-900" />

        <div className="mx-auto max-w-7xl">
          <OrdersTable onStatusChange={handleTimelineChange} requestNumber={requestNumber} />
        </div>
      </main>
    </>
  );
}

Page.layout = (page: React.ReactNode) => (
  <AppLayout breadcrumbs={breadcrumbs}>
    {page}
  </AppLayout>
);

export default Page;
