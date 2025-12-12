"use client";

import React from "react";
import { OrdersList } from "@/components/ui/monitoring-items";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { Head } from "@inertiajs/react";

/* ✅ BREADCRUMBS BERSIH */
const breadcrumbs: BreadcrumbItem[] = [
  { title: "Monitoring Request", href: "/monitoring-request" },
  { title: "Monitoring Request Detail", href: "#" },
];

interface OrdersPageProps {
  orders: any[];
  requestNumber: string;
}

function OrdersPage({ orders, requestNumber }: OrdersPageProps) {
  return (
    <>
      <Head title="Monitoring Request Items" />

      <main className="min-h-screen bg-white p-6 font-[Poppins]">
        <div className="mx-auto max-w-6xl space-y-6">
          <div className="rounded-xl border-2 border-blue-400 p-6 shadow-sm bg-white">
            <div className="mb-5">
              <h2 className="text-xl font-bold text-slate-900">
                Monitoring Request Items
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                {requestNumber}
              </p>
            </div>

            {/* ✅ TABEL ITEM */}
            <OrdersList
              mode="monitoring"
              orders={orders}
            />
          </div>
        </div>
      </main>
    </>
  );
}

/* ✅ BREADCRUMBS HARUS MASUK KE AppLayout */
OrdersPage.layout = (page: React.ReactNode) => (
  <AppLayout breadcrumbs={breadcrumbs}>
    {page}
  </AppLayout>
);

export default OrdersPage;
