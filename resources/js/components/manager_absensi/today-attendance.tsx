export default function TodayAttendance() {
  const today = new Date()
  const formattedDate = today.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="bg-white rounded-lg border border-blue-100 p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Absensi Hari Ini</h3>

      <div className="mb-4">
        <p className="text-sm text-slate-600 capitalize">{formattedDate}</p>
      </div>

      <div className="space-y-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <p className="text-xs text-slate-600 mb-2">Pagi</p>
          <p className="text-lg font-semibold text-slate-900">08:30 - 17:00</p>
        </div>

        <div className="bg-blue-50 rounded-lg p-4">
          <p className="text-xs text-slate-600 mb-2">Malam</p>
          <p className="text-lg font-semibold text-slate-900">17:00 - 21:00</p>
        </div>
      </div>
    </div>
  )
}
