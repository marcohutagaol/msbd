"use client"

import { useState } from "react"
import ReportList from "@/components/report/report-list"
import AppLayout from "@/layouts/app-layout"
import { type BreadcrumbItem } from "@/types"
import React from "react"

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Report",
    href: "#",
  },
];

interface ReportItem {
  id: string
  title: string
  name: string
  date: string
  category: string
}

const reports: ReportItem[] = [
  {
    id: "1",
    title: "Housekeeping",
    name: "Indah Pratiwi",
    date: "20:30",
    category: "Housekeeping",
  },
  {
    id: "2",
    title: "Purchaser",
    name: "Andi Hakim",
    date: "Kemarin",
    category: "Purchaser",
  },
  {
    id: "3",
    title: "Security",
    name: "Tukiman Hasari",
    date: "12 November",
    category: "Security",
  },
  {
    id: "4",
    title: "Housekeeping",
    name: "Siti Nurhaliza",
    date: "5 November",
    category: "Housekeeping",
  },
  {
    id: "5",
    title: "Purchaser",
    name: "Budi Santoso",
    date: "3 November",
    category: "Purchaser",
  },
  {
    id: "6",
    title: "IT",
    name: "Rahmat Suryanto",
    date: "1 November",
    category: "IT",
  },
  {
    id: "7",
    title: "FNB",
    name: "Dewi Lestari",
    date: "30 October",
    category: "FNB",
  },
]

export default function Home() {
  const [selectedReport, setSelectedReport] = useState<ReportItem | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>("Housekeeping")
  const [selectedPeriod, setSelectedPeriod] = useState<string>("Perminggu")

  const filteredReports = reports.filter((report) => report.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <ReportList
        reports={filteredReports}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedPeriod={selectedPeriod}
        onPeriodChange={setSelectedPeriod}
        selectedReport={selectedReport}
        onSelectReport={setSelectedReport}
        onCloseDetail={() => setSelectedReport(null)}
      />
    </div>
  )
}

Home.layout = (page: React.ReactNode) => (
  <AppLayout breadcrumbs={breadcrumbs}>
    {page}
  </AppLayout>
);