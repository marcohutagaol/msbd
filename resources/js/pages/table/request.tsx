"use client";

import React, { useState } from "react";
import { OrdersList } from "@/components/ui/orders-list";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { Head, router } from "@inertiajs/react";
import { CheckCircle2 } from "lucide-react";
import AddOrderModal from "@/components/ui/add-order-modal";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Request Items",
    href: "#",
  },
];

function OrdersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleAddItems = (items: any[]) => {
    console.log("Items added:", items);
    setIsModalOpen(false);
  };

  const handleSendRequest = () => {
    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
      router.visit("/monitoring-item");
    }, 2500);
  };

  return (
    <>
      <Head title="Request Item" />
      <main className="min-h-screen bg-white p-6 font-[Poppins]">
        <div className="mx-auto max-w-6xl space-y-6">
          <div className="rounded-xl border-2 border-blue-400 p-6 shadow-sm bg-white transition-all duration-300 hover:shadow-lg hover:border-blue-500">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-blue-600 shadow-md shadow-blue-400/50"></div>
                  <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                    Request Item
                  </h2>
                </div>
                <p className="text-sm text-slate-600 ml-5 mt-1">
                  Departemen
                </p>
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="mt-3 sm:mt-0 rounded-lg bg-blue-600 px-6 py-2.5 font-medium text-white transition-all duration-300 hover:bg-blue-700 hover:shadow-md hover:shadow-blue-400/30"
              >
                Add Order
              </button>
            </div>

            <OrdersList />
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleSendRequest}
              className="rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white shadow-md shadow-blue-500/30 transition-all duration-300 hover:bg-blue-700 hover:shadow-blue-600/40"
            >
              Sending Request
            </button>
          </div>
        </div>
      </main>

      <AddOrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddItems}
      />

      {success && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 px-5 py-3 shadow-md shadow-green-100/60">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <p className="text-sm font-medium text-green-800">
              Barang berhasil dikirim ke Purchase!
            </p>
          </div>
        </div>
      )}
    </>
  );
}

OrdersPage.layout = (page: React.ReactNode) => (
  <AppLayout breadcrumbs={breadcrumbs}>{page}</AppLayout>
);

export default OrdersPage;
