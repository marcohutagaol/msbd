"use client"
import AbsensiPage from "@/components/manager_absensi/absensi-page"
import AppLayout from "@/layouts/app-layout"
import { type BreadcrumbItem } from "@/types"
import React from "react"

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Absensi",
    href: "#",
  },
];

export default function Home() {
  return <AbsensiPage />
}

Home.layout = (page: React.ReactNode) => (
  <AppLayout breadcrumbs={breadcrumbs}>
    {page}
  </AppLayout>
);