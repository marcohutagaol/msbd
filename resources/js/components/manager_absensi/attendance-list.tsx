"use client"

export default function AttendanceList() {
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
    <div className="bg-white rounded-xl border border-slate-200 p-5 md:p-6 shadow-sm h-full">
      <h3 className="text-base md:text-lg font-semibold text-slate-900 mb-4">List Absensi</h3>

      <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
        {shifts.map((shift, index) => (
          <div
            key={index}
            className="border-l-4 border-blue-500 pl-3 md:pl-4 py-3 px-3 md:px-4 bg-slate-50 hover:bg-blue-50 rounded-r-lg transition-colors"
          >
            <p className="text-sm font-medium text-slate-900">{shift.date}</p>
            <p className="text-xs text-slate-600 mt-2">Pagi: {shift.morning}</p>
            <p className="text-xs text-slate-600">Malam: {shift.evening}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
