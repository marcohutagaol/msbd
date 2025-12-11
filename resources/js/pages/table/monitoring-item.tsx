    "use client";

    import React from "react";
    import Monitoring from "@/components/ui/monitoring-request";
    import AppLayout from "@/layouts/app-layout";
    import { type BreadcrumbItem } from "@/types";
    import { Head } from "@inertiajs/react";

    const breadcrumbs: BreadcrumbItem[] = [
      { title: "Monitoring Request", href: "#" },
    ];

    interface OrdersPageProps {
      requests: any[];
      departmentName?: string;
    }

    function OrdersPage({ requests, departmentName }: OrdersPageProps) {
      return (
        <>
          <Head title="Monitoring Request" />
          <main className="min-h-screen bg-white p-6 font-[Poppins]">
            <div className="mx-auto max-w-6xl space-y-6">
              <div className="rounded-xl border-2 border-blue-400 p-6 shadow-sm bg-white">
                <div className="mb-5">
                  <h2 className="text-xl font-bold text-slate-900">
                    Monitoring Request
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">
                    {departmentName}
                  </p>
                </div>

                {/* ✅ KIRIM DATA REQUEST ASLI */}
                <Monitoring departments={requests} />
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
