"use client"

import AppLayout from "@/layouts/app-layout"
import { Head } from "@inertiajs/react"
import React from "react"
import { StatsCards } from "@/components/ui/stats-cards"
import { DepartmentList } from "@/components/ui/department-list"
import { type BreadcrumbItem } from "@/types"

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Dashboard",
    href: "#",
  },
]

function Home() {
  return (
    <>
      <Head title="Dashboard" />
      <main className="min-h-screen bg-white p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-3 h-3 rounded-full bg-blue-600"></div>
            <h1 className="text-3xl font-bold text-slate-900">Dashboard Purchasing</h1>
          </div>

          <StatsCards />

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">
              Request Departemen
            </h2>
            <DepartmentList
              onSelectDepartment={(id) =>
                console.log("Selected department:", id)
              }
            />
          </div>
        </div>
      </main>
    </>
  )
}

Home.layout = (page: React.ReactNode) => (
  <AppLayout breadcrumbs={breadcrumbs}>{page}</AppLayout>
)

export default Home
