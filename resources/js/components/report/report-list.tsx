"use client"

import { ChevronRight } from "lucide-react"
import ReportDetail from "./report-detail"

interface ReportItem {
  id: string
  title: string
  name: string
  date: string
  category: string
}

interface ReportListProps {
  reports: ReportItem[]
  selectedCategory: string
  onCategoryChange: (category: string) => void
  selectedPeriod: string
  onPeriodChange: (period: string) => void
  selectedReport: ReportItem | null
  onSelectReport: (report: ReportItem) => void
  onCloseDetail: () => void
}

const CATEGORIES = ["Housekeeping", "Purchaser", "Security", "IT", "FNB"]
const PERIODS = ["Perminggu", "Perbulan", "Pertahun"]

export default function ReportList({
  reports,
  selectedCategory,
  onCategoryChange,
  selectedPeriod,
  onPeriodChange,
  selectedReport,
  onSelectReport,
  onCloseDetail,
}: ReportListProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        {/* <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Report</h1> */}

        {/* Dropdown Filters */}
        <div className="bg-white rounded-lg shadow-sm mb-8 p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Category Dropdown */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Kategori</label>
              <select
                value={selectedCategory}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white text-gray-900 font-medium"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Period Dropdown */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Periode</label>
              <select
                value={selectedPeriod}
                onChange={(e) => onPeriodChange(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white text-gray-900 font-medium"
              >
                {PERIODS.map((period) => (
                  <option key={period} value={period}>
                    {period}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Report Cards */}
        <div className="space-y-3">
          {reports.length > 0 ? (
            reports.map((report) => (
              <div
                key={report.id}
                onClick={() => onSelectReport(report)}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer p-6 hover:bg-blue-50 border border-gray-100 hover:border-blue-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900">{report.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{report.name}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-gray-700">{report.date}</span>
                    <ChevronRight className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <p className="text-gray-500">Tidak ada data report untuk kategori ini</p>
            </div>
          )}
        </div>
      </div>

      {selectedReport && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Detail Report</h2>
              <button
                onClick={onCloseDetail}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close modal"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <ReportDetail report={selectedReport} />
          </div>
        </div>
      )}
    </div>
  )
}
