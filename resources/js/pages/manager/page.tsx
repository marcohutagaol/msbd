import { ManagerDashboard } from "@/components/manager/dashboard"
import AppLayout from "@/layouts/app-layout"
import { type BreadcrumbItem } from "@/types"
import React from "react"

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Manager",
    href: "#",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <ManagerDashboard />
    </main>
  )
}



Home.layout = (page: React.ReactNode) => (
  <AppLayout breadcrumbs={breadcrumbs}>
    {page}
  </AppLayout>
);