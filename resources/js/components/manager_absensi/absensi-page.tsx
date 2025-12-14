"use client"

import { useState } from "react"
import { Clock } from "lucide-react"
import { usePage } from "@inertiajs/react"

import AttendanceCard from "@/components/manager_absensi/attendance-card"
import AttendanceTable from "@/components/manager_absensi/attendance-table"
import FilterBar from "@/components/manager_absensi/filter-bar"
import AttendanceRecordForm from "@/components/manager_absensi/attendance-record-form"

/* =========================
   TYPES
========================= */
interface AbsensiGenerate {
  id_generate: number
  tanggal_mulai: string
  tanggal_selesai: string
  jam_masuk_default: string
  jam_keluar_default: string
  keterangan: string | null
}

interface AttendanceStats {
  HADIR: number
  TERLAMBAT: number
  IZIN: number
  CUTI: number
  TIDAK_HADIR: number
}

interface AttendanceRecord {
  id: number
  name: string
  department: string
  arrivalTime: string
  departureTime: string
  status: string
}

export default function AbsensiPage() {
  const { absensi, stats, attendanceTable } = usePage<{
    absensi: AbsensiGenerate[]
    stats: AttendanceStats
    attendanceTable: AttendanceRecord[]
  }>().props

  const [selectedDepartment, setSelectedDepartment] = useState("ALL")
  const [selectedPeriod, setSelectedPeriod] = useState("Perminggu")

  const departments = [
    { id: 0, name: "ALL" },
    { id: 1, name: "ENG" },
    { id: 2, name: "FNB" },
    { id: 3, name: "FO" },
    { id: 4, name: "LS" },
  ]

  const periods = [
    { id: 1, name: "Perminggu" },
    { id: 2, name: "Perbulan" },
    { id: 3, name: "Pertahun" },
  ]

  const attendanceStats = [
    { id: 1, label: "Hadir", count: stats.HADIR, icon: "✅" },
    { id: 2, label: "Terlambat", count: stats.TERLAMBAT, icon: "⏰" },
    { id: 3, label: "Izin", count: stats.IZIN, icon: "📝" },
    { id: 4, label: "Cuti", count: stats.CUTI, icon: "🏖️" },
    { id: 5, label: "Tidak Hadir", count: stats.TIDAK_HADIR, icon: "❌" },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="px-6 py-8 max-w-7xl mx-auto">

        <FilterBar
          departments={departments}
          periods={periods}
          selectedDepartment={selectedDepartment}
          selectedPeriod={selectedPeriod}
          onDepartmentChange={setSelectedDepartment}
          onPeriodChange={setSelectedPeriod}
        />

        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {attendanceStats.map(stat => (
            <AttendanceCard
              key={stat.id}
              label={stat.label}
              count={stat.count}
              icon={stat.icon}
            />
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-3">
            <AttendanceRecordForm />
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl border p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold">Shift Default</h3>
              </div>
              <div className="bg-blue-50 rounded-lg p-6 text-center">
                <div className="text-4xl font-bold">08:00</div>
                <p className="text-sm text-slate-600">Clock in</p>
                <div className="my-2">−</div>
                <div className="text-4xl font-bold">17:00</div>
                <p className="text-sm text-slate-600">Clock out</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-white rounded-xl border p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">List Absensi</h3>

            {absensi.length === 0 && (
              <p className="text-sm text-slate-500 text-center">
                Belum ada data absensi
              </p>
            )}

            {absensi.map(item => (
              <div
                key={item.id_generate}
                className="border-l-4 border-blue-500 pl-4 py-3 mb-3 bg-slate-50 rounded-r-lg"
              >
                <p className="text-sm font-medium">
                  {item.tanggal_mulai} s/d {item.tanggal_selesai}
                </p>
                <p className="text-xs text-slate-600">
                  {item.jam_masuk_default} - {item.jam_keluar_default}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <AttendanceTable data={attendanceTable} />
        </div>
      </div>
    </div>
  )
}
