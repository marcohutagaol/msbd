"use client";

import React from "react";
import InventoryLayout from "@/components/inventory/inventory-layout";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { Head } from "@inertiajs/react";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Inventory",
    href: "#",
  },
];

function InventoryPage() {
  return (
    <>
      <Head title="Inventory Management" />

      <main className="min-h-screen bg-white p-6 md:p-8 lg:p-12">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-2xl font-bold mb-6">Inventory Management</h1>
          <InventoryLayout />
        </div>
      </main>
    </>
  );
}

InventoryPage.layout = (page: React.ReactNode) => (
  <AppLayout breadcrumbs={breadcrumbs}>{page}</AppLayout>
);

export default InventoryPage;
