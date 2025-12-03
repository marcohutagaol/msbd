"use client"

import { useState } from "react"
import { Clock, Calendar, ChevronDown } from "lucide-react"

export default function AttendanceRecordForm() {
  const [selectedTime, setSelectedTime] = useState("Pagi")
  const [selectedDate, setSelectedDate] = useState("14 December 2025")
  const [showPeriodDropdown, setShowPeriodDropdown] = useState(false)
  const [selectedPeriod, setSelectedPeriod] = useState<number | null>(null)

  const periods = [
    { id: 1, label: "Seminggu" },
    { id: 2, label: "Sebulan" },
    { id: 3, label: "3 Bulan" },
  ]

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm h-full flex flex-col">
      <h3 className="text-lg font-semibold text-slate-900 mb-1">Buat Absensi</h3>
      <p className="text-sm text-slate-500 mb-6">Absen berkaitan selama periode waktu</p>

      <div className="space-y-4 flex-1">
        {/* Jam Section */}
        <div>
          <label className="text-sm font-medium text-slate-700 block mb-2">Jam</label>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white text-slate-900 transition"
              placeholder="Pilih jam"
            />
          </div>
        </div>

        {/* Tanggal Section */}
        <div>
          <label className="text-sm font-medium text-slate-700 block mb-2">Tanggal</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white text-slate-900 transition"
              placeholder="Pilih tanggal"
            />
          </div>
        </div>

        {/* Period Dropdown Section */}
        {showPeriodDropdown && (
          <div className="pt-4 border-t border-slate-200">
            <label className="text-sm font-medium text-slate-700 block mb-3">Pilih Periode</label>
            <div className="space-y-2">
              {periods.map((period) => (
                <button
                  key={period.id}
                  onClick={() => setSelectedPeriod(period.id)}
                  className={`w-full px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 text-left ${
                    selectedPeriod === period.id
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  {period.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 pt-2 mt-auto">
          <button className="w-full px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 active:bg-blue-800 transition-colors duration-200 shadow-sm">
            Buat
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => setShowPeriodDropdown(!showPeriodDropdown)}
              className="flex-1 px-4 py-2.5 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors duration-200 flex items-center justify-center gap-2 border border-slate-300"
            >
              <span>Buat Default</span>
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${showPeriodDropdown ? "rotate-180" : ""}`}
              />
            </button>
            <button className="flex-1 px-4 py-2.5 bg-white text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors duration-200 border border-red-200">
              Hapus
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}