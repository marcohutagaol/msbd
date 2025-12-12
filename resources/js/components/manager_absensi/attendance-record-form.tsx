"use client"

import { useState } from "react"
import { Clock, Calendar, ChevronDown } from "lucide-react"
import { router } from "@inertiajs/react"

export default function AttendanceRecordForm() {
  const [jamMasuk, setJamMasuk] = useState("08:00")
  const [jamKeluar, setJamKeluar] = useState("17:00")
  const [tanggalMulai, setTanggalMulai] = useState("")
  const [tanggalSelesai, setTanggalSelesai] = useState("")
  const [showPeriodDropdown, setShowPeriodDropdown] = useState(false)
  const [selectedPeriod, setSelectedPeriod] = useState<number | null>(null)

  const periods = [
    { id: 1, label: "Seminggu", days: 7 },
    { id: 2, label: "Sebulan", days: 30 },
    { id: 3, label: "3 Bulan", days: 90 },
  ]

  const handleSubmit = () => {
    router.post("/manager-absensi", {
      tanggal_mulai: tanggalMulai,
      tanggal_selesai: tanggalSelesai,
      jam_masuk: jamMasuk,
      jam_keluar: jamKeluar,
      keterangan: "Absensi otomatis"
    })
  }

  const handlePeriodSelect = (days: number) => {
    const start = new Date()
    const end = new Date()
    end.setDate(start.getDate() + days)

    setTanggalMulai(start.toISOString().slice(0, 10))
    setTanggalSelesai(end.toISOString().slice(0, 10))
    setShowPeriodDropdown(false)
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm h-full flex flex-col">
      <h3 className="text-lg font-semibold text-slate-900 mb-1">Buat Absensi</h3>
      <p className="text-sm text-slate-500 mb-6">Absen berkaitan selama periode waktu</p>

      <div className="space-y-4 flex-1">

        {/* Jam Masuk */}
        <div>
          <label className="text-sm font-medium text-slate-700 block mb-2">Jam Masuk</label>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="time"
              value={jamMasuk}
              onChange={(e) => setJamMasuk(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-300 rounded-lg"
            />
          </div>
        </div>

        {/* Jam Keluar */}
        <div>
          <label className="text-sm font-medium text-slate-700 block mb-2">Jam Keluar</label>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="time"
              value={jamKeluar}
              onChange={(e) => setJamKeluar(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-300 rounded-lg"
            />
          </div>
        </div>

        {/* Tanggal */}
        <div>
          <label className="text-sm font-medium text-slate-700 block mb-2">Tanggal Mulai</label>
          <input
            type="date"
            value={tanggalMulai}
            onChange={(e) => setTanggalMulai(e.target.value)}
            className="w-full px-4 py-2.5 border rounded-lg"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700 block mb-2">Tanggal Selesai</label>
          <input
            type="date"
            value={tanggalSelesai}
            onChange={(e) => setTanggalSelesai(e.target.value)}
            className="w-full px-4 py-2.5 border rounded-lg"
          />
        </div>

        {/* Period Dropdown */}
        {showPeriodDropdown && (
          <div className="pt-4 border-t">
            {periods.map((p) => (
              <button
                key={p.id}
                onClick={() => handlePeriodSelect(p.days)}
                className="w-full mb-2 px-4 py-2 bg-slate-100 rounded-lg"
              >
                {p.label}
              </button>
            ))}
          </div>
        )}

        {/* Buttons */}
        <div className="mt-auto space-y-2">
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg"
          >
            Buat
          </button>

          <button
            onClick={() => setShowPeriodDropdown(!showPeriodDropdown)}
            className="w-full bg-slate-200 py-2.5 rounded-lg flex justify-center items-center gap-2"
          >
            Buat Default
            <ChevronDown />
          </button>
        </div>
      </div>
    </div>
  )
}
