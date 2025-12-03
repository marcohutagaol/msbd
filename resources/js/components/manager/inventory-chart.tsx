"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function InventoryChart() {
  return (
    <Card className="border-blue-100 shadow-md">
      <CardHeader className="pb-3">
        <CardTitle className="text-blue-900">Grafik Manajemen Barang</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-lg p-4 border border-blue-100">
              <p className="text-xs font-bold text-slate-600 uppercase tracking-wide">Total Penggunaan</p>
              <p className="text-2xl font-bold text-blue-600 mt-2">Rp 20.000</p>
              <p className="text-xs text-red-500 font-semibold mt-1">↓ 24% vs Last Week</p>
              <div className="h-32 bg-slate-200/50 rounded-lg mt-3 flex items-end justify-center gap-3 p-3">
                <div className="w-10 h-24 bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-lg shadow-sm hover:shadow-md transition-shadow"></div>
                <div className="w-10 h-16 bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-lg shadow-sm hover:shadow-md transition-shadow"></div>
                <div className="w-10 h-12 bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-lg shadow-sm hover:shadow-md transition-shadow"></div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-lg p-4 border border-blue-100">
              <p className="text-xs font-bold text-slate-600 uppercase tracking-wide">Jumlah Request</p>
              <p className="text-2xl font-bold text-blue-600 mt-2">23</p>
              <p className="text-xs text-emerald-500 font-semibold mt-1">↑ 14% vs Last Week</p>
              <div className="h-32 bg-slate-200/50 rounded-lg mt-3 flex items-end justify-center gap-3 p-3">
                <div className="w-10 h-20 bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-lg shadow-sm hover:shadow-md transition-shadow"></div>
                <div className="w-10 h-20 bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-lg shadow-sm hover:shadow-md transition-shadow"></div>
                <div className="w-10 h-8 bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-lg shadow-sm hover:shadow-md transition-shadow"></div>
              </div>
            </div>
          </div>

          {/* Donut Chart */}
          <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-lg p-4 border border-blue-100">
            <p className="text-xs font-bold text-slate-600 uppercase tracking-wide mb-4">Total Barang</p>
            <div className="flex items-center gap-8">
              <div className="relative h-32 w-32">
                <svg className="transform -rotate-90 h-32 w-32" viewBox="0 0 100 100">
                  {/* Background circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="12"
                  />
                  {/* Available - Blue */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="12"
                    strokeDasharray="150 251"
                    strokeDashoffset="0"
                    className="transition-all duration-500"
                  />
                  {/* In Use - Green */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="12"
                    strokeDasharray="63 251"
                    strokeDashoffset="-150"
                    className="transition-all duration-500"
                  />
                  {/* Low Stock - Orange */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="12"
                    strokeDasharray="38 251"
                    strokeDashoffset="-213"
                    className="transition-all duration-500"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-blue-600">1234</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-blue-500 shadow-sm"></div>
                  <span className="text-sm font-medium text-slate-700">Available</span>
                  <span className="text-sm font-bold text-slate-900 ml-auto">740</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-emerald-500 shadow-sm"></div>
                  <span className="text-sm font-medium text-slate-700">In Use</span>
                  <span className="text-sm font-bold text-slate-900 ml-auto">310</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-amber-500 shadow-sm"></div>
                  <span className="text-sm font-medium text-slate-700">Low Stock</span>
                  <span className="text-sm font-bold text-slate-900 ml-auto">184</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}