"use client"

import { useState } from "react"
import { Clock } from "lucide-react"
import AttendanceCard from "@/components/manager_absensi/attendance-card"
import AttendanceTable from "@/components/manager_absensi/attendance-table"
import FilterBar from "@/components/manager_absensi/filter-bar"
import AttendanceRecordForm from "@/components/manager_absensi/attendance-record-form"

export default function AbsensiPage() {
  const [selectedDepartment, setSelectedDepartment] = useState("Housekeeping")
  const [selectedPeriod, setSelectedPeriod] = useState("Perminggu")

  const departments = [
    { id: 1, name: "Housekeeping" },
    { id: 2, name: "IT" },
    { id: 3, name: "F&B" },
    { id: 4, name: "Front Office" },
    { id: 5, name: "HR" },
  ]

  const periods = [
    { id: 1, name: "Perminggu" },
    { id: 2, name: "Perbulan" },
    { id: 3, name: "Pertahun" },
  ]

  const attendanceStats = [
    { id: 1, label: "Izin", count: 28, icon: "👤" },
    { id: 2, label: "Sakit", count: 28, icon: "👤" },
    { id: 3, label: "Tidak Hadir", count: 28, icon: "👤" },
    { id: 4, label: "Cuti", count: 28, icon: "👤" },
    { id: 5, label: "Hadir", count: 28, icon: "👤" },
    { id: 6, label: "Terlambat", count: 28, icon: "👤" },
  ]

  const attendanceData = [
    {
      id: 1,
      name: "Dian Utami Nur Indah",
      department: "Housekeeping",
      arrivalTime: "08:32",
      departureTime: "16:54",
      status: "Datang",
    },
    {
      id: 2,
      name: "Andi Budiman",
      department: "IT Support",
      arrivalTime: "08:43",
      departureTime: "13:24",
      status: "Hadir",
    },
  ]

  const shifts = [
    {
      date: "Sabtu, 12 December 2025",
      morning: "08:30 - 17:00",
      evening: "17:00 - 21:00",
    },
    {
      date: "Rabu, 13 December 2025",
      morning: "08:30 - 17:00",
      evening: "17:00 - 21:00",
    },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="px-4 md:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
        {/* FILTER BAR */}
        <FilterBar
          departments={departments}
          periods={periods}
          selectedDepartment={selectedDepartment}
          selectedPeriod={selectedPeriod}
          onDepartmentChange={setSelectedDepartment}
          onPeriodChange={setSelectedPeriod}
        />

        {/* STATISTICS */}
        <div className="mt-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {attendanceStats.map((stat) => (
              <AttendanceCard key={stat.id} label={stat.label} count={stat.count} icon={stat.icon} />
            ))}
          </div>
        </div>

        {/* HORIZONTAL LAYOUT - Form, Shift, List in one row */}
        <div className="mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Form - 3 columns */}
            <div className="lg:col-span-3">
              <AttendanceRecordForm />
            </div>

            {/* Shift - 3 columns */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm h-full flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-slate-900">Shift Pagi</h3>
                </div>

                <div className="bg-blue-50 rounded-lg border border-blue-200 p-6 text-center flex-1 flex items-center justify-center">
                  <div className="flex flex-col items-center justify-center gap-4">
                    <div>
                      <div className="text-4xl font-bold text-slate-900">08:00</div>
                      <p className="text-sm text-slate-600 mt-2">Clock in</p>
                    </div>
                    <div className="text-slate-400 text-2xl">−</div>
                    <div>
                      <div className="text-4xl font-bold text-slate-900">17:30</div>
                      <p className="text-sm text-slate-600 mt-2">Clock out</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-200">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Durasi:</span>
                    <span className="font-medium text-slate-900">9.5 jam</span>
                  </div>
                </div>
              </div>
            </div>

            {/* List - 6 columns */}
            <div className="lg:col-span-6">
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm h-full">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">List Absensi</h3>

                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                  {shifts.map((shift, index) => (
                    <div
                      key={index}
                      className="border-l-4 border-blue-500 pl-4 py-3 px-4 bg-slate-50 hover:bg-blue-50 rounded-r-lg transition-colors"
                    >
                      <p className="text-sm font-medium text-slate-900">{shift.date}</p>
                      <p className="text-xs text-slate-600 mt-2">Pagi: {shift.morning}</p>
                      <p className="text-xs text-slate-600">Malam: {shift.evening}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className="mt-8">
          <AttendanceTable data={attendanceData} />
        </div>
      </div>
    </div>
  )
}