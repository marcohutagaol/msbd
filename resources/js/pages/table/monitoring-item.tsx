"use client";

import React from "react";
import Monitoring from "@/components/ui/monitoring-request";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { Head } from "@inertiajs/react";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Pemantauan Barang",
    href: "#"
  },
];

interface OrdersPageProps {
  requests: any[];
  departmentName?: string;
}

function OrdersPage({ requests, departmentName }: OrdersPageProps) {
  return (
    <>
      <Head title="Monitoring Request" />
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-6 font-[Poppins]">
        <div className="mx-auto max-w-6xl space-y-6">
          {/* Main Card with Enhanced Design */}
          <div className="rounded-2xl border border-blue-200/50 dark:border-gray-700 bg-white/80 dark:bg-slate-800/90 backdrop-blur-sm p-8 shadow-xl shadow-blue-100/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-200/40">
            {/* Header Section */}
            <div className="mb-6 pb-6 border-b-2 border-gradient-to-r from-blue-200 via-blue-100 to-transparent">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg shadow-blue-500/30">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                  Pemantauan Barang
                </h2>
              </div>
              <p className="text-sm text-slate-600 dark:text-gray-400 ml-14 flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                {departmentName}
              </p>
            </div>

            {/* Monitoring Component */}
            <Monitoring requests={requests} />
          </div>
        </div>
      </main>
    </>
  );
}

OrdersPage.layout = (page: React.ReactNode) => (
  <AppLayout breadcrumbs={breadcrumbs}>{page}</AppLayout>
);

export default OrdersPage;
