"use client";

import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import PermissionDashboard from "@/components/permission-dashboard";
import { Head } from "@inertiajs/react";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Permission",
    href: "#",
  },
];

function Home() {
  return (
    <>
      <Head title="Permission Dashboard" />
      <main className="min-h-screen bg-white p-6 font-[Poppins]">
        <div className="mx-auto max-w-6xl">
          {/* Komponen utama */}
          <PermissionDashboard />
        </div>
      </main>
    </>
  );
}

// ✅ Bungkus pakai AppLayout biar sidebar muncul
Home.layout = (page: React.ReactNode) => (
  <AppLayout breadcrumbs={breadcrumbs}>{page}</AppLayout>
);

export default Home;
