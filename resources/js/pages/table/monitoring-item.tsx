"use client";

import React from "react";
import { OrdersList } from "@/components/ui/orders-list";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { Head } from "@inertiajs/react";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Request Items",
    href: "/request",
  },
  {
    title: "Monitoring Items",
    href: "#",
  },
];

interface OrdersPageProps {
  requestItems: any[];
}

function OrdersPage({ requestItems }: OrdersPageProps) {
  console.log('Data dari backend:', requestItems); // Untuk debugging

  return (
    <>
      <Head title="Monitoring Item" />
      <main className="min-h-screen bg-white p-6 font-[Poppins]">
        <div className="mx-auto max-w-6xl space-y-6">
          <div className="rounded-xl border-2 border-blue-400 p-6 shadow-sm bg-white transition-all duration-300 hover:shadow-lg hover:border-blue-500">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-blue-600 shadow-md shadow-blue-400/50"></div>
                  <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                    Monitoring Item
                  </h2>
                </div>
                <p className="text-sm text-slate-600 ml-5 mt-1">Departemen</p>
              </div>
            </div>

            {/* Pass data requestItems dari database ke OrdersList */}
            <OrdersList 
              mode="monitoring" 
              orders={requestItems} 
            />
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