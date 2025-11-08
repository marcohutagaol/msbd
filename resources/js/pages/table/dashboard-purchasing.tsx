"use client"

import AppLayout from "@/layouts/app-layout"
import { Head } from "@inertiajs/react"
import React from "react"
import { StatsCards } from "@/components/ui/stats-cards"
import { DepartmentList } from "@/components/ui/department-list"
import { type BreadcrumbItem } from "@/types"

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Purchasing",
    href: "#",
  },
]

interface Stats {
  total_requests: number
  pending_requests: number
  approved_requests: number
  completed_requests: number
  rejected_requests: number
  total_items: number
}

interface Department {
  id: string
  name: string
  total_requests: number
  total_items: number // TAMBAHKAN INI
  pending_count: number
  approved_count: number
  completed_count: number
}

interface DashboardProps {
  stats?: Stats
  departments?: Department[]
}

function Home({ stats, departments }: DashboardProps) {
  // Default stats jika tidak ada data
  const defaultStats: Stats = {
    total_requests: 0,
    pending_requests: 0,
    approved_requests: 0,
    completed_requests: 0,
    rejected_requests: 0,
    total_items: 0,
  }

  // Default departments jika tidak ada data
  const defaultDepartments: Department[] = [
    {
      id: "food-beverage",
      name: "Food and Beverage",
      total_requests: 15,
      total_items: 23,
      pending_count: 0,
      approved_count: 0,
      completed_count: 0,
    },
    {
      id: "housekeeping",
      name: "House keeping",
      total_requests: 8,
      total_items: 23,
      pending_count: 0,
      approved_count: 0,
      completed_count: 23,
    },
    {
      id: "security",
      name: "Security",
      total_requests: 12,
      total_items: 23,
      pending_count: 10,
      approved_count: 13,
      completed_count: 0,
    },
    {
      id: "finance",
      name: "Finance",
      total_requests: 7,
      total_items: 23,
      pending_count: 0,
      approved_count: 0,
      completed_count: 0,
    },
  ]

  return (
    <>
      <Head title="Dashboard" />
      <main className="min-h-screen bg-white p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-3 h-3 rounded-full bg-blue-600"></div>
            <h1 className="text-3xl font-bold text-slate-900">Dashboard Purchasing</h1>
          </div>

          <StatsCards stats={stats || defaultStats} />

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">
              Request Departemen
            </h2>
            <DepartmentList
              departments={departments || defaultDepartments}
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