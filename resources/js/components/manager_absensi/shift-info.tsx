"use client"

import { Clock } from "lucide-react"

export default function ShiftInfo() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-slate-900">Shift Pagi</h3>
      </div>

      <div className="bg-blue-50 rounded-lg border border-blue-200 p-6 text-center flex-1 flex items-center justify-center">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
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
  )
}