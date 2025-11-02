"use client";

import React, { useState } from "react";
import { OrderTimeline } from "@/components/ui/order-timeline";
import { OrdersList } from "@/components/ui/orders-list";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { Head } from "@inertiajs/react";
import AddOrderModal from "@/components/ui/add-order-modal";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Request Items",
    href: "#",
  },
];

function OrdersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddItems = (items: any[]) => {
    console.log("Items added:", items);
    setIsModalOpen(false);
  };

  return (
    <>
      <Head title="Orders" />
      <main className="min-h-screen bg-white p-6">
        <div className="mx-auto max-w-6xl">
          {/* <div className="mb-8">
            <OrderTimeline />
          </div> */}

          <div className="rounded-lg border-2 border-blue-400 p-6">
            <div className="mb-6 flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-blue-600"></div>
              <h2 className="text-lg font-semibold text-slate-900">
                Request Item
              </h2>
              <button
                onClick={() => setIsModalOpen(true)}
                className="ml-auto rounded-lg bg-blue-600 px-6 py-2 font-medium text-white transition-colors hover:bg-blue-700"
              >
                Add Order
              </button>
            </div>

            <OrdersList />
          </div>
        </div>
      </main>

      <AddOrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddItems}
      />
    </>
  );
}

OrdersPage.layout = (page: React.ReactNode) => (
  <AppLayout breadcrumbs={breadcrumbs}>{page}</AppLayout>
);

export default OrdersPage;
