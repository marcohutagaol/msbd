"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function AttendanceChart() {
  const data = [
    { label: "12", value: 12 },
    { label: "13", value: 13 },
    { label: "20", value: 20 },
    { label: "1", value: 1 },
    { label: "2", value: 2 },
  ]

  const statusData = [
    { label: "Izin", value: 12 },
    { label: "Sakit", value: 13 },
    { label: "Hadir", value: 20 },
    { label: "Tidak Hadir", value: 1 },
    { label: "Cuti", value: 2 },
  ]

  const maxValue = Math.max(...data.map((d) => d.value))

  return (
    <Card className="border-blue-100 shadow-md w-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-blue-900">Grafik Kehadiran</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex flex-row gap-3 sm:gap-6 w-full">

          {/* Grafik Bar */}
          <div className="flex-1 flex gap-2 sm:gap-4 items-end justify-center h-40 sm:h-48 p-2 sm:p-4 bg-gradient-to-br from-slate-50 to-blue-50 rounded-lg border border-blue-100">
            {data.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center gap-1 sm:gap-2 h-full">
                <div className="flex-1 flex items-end">
                  <div
                    className="w-6 sm:w-10 rounded-t-lg bg-gradient-to-t from-blue-600 to-blue-400 transition-all hover:shadow-lg relative group"
                    style={{
                      height: `${(item.value / maxValue) * 100}%`,
                      minHeight: "6px",
                    }}
                  >
                    <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-[10px] sm:text-xs px-1 py-0.5 rounded whitespace-nowrap">
                      {item.value}
                    </div>
                  </div>
                </div>
                <span className="text-[10px] sm:text-sm font-semibold text-slate-700">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          {/* Status Cards */}
          <div className="flex flex-col items-center justify-center gap-3 sm:gap-6">

            {/* Row 1 */}
            <div className="grid grid-cols-2 gap-3 sm:gap-5">
              {statusData.slice(0, 2).map((status, idx) => (
                <Card 
                  key={idx} 
                  className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow
                  w-14 h-14 sm:w-20 sm:h-20"
                >
                  <CardContent className="p-2 sm:p-3 text-center flex flex-col items-center justify-center h-full">
                    <p className="text-[10px] sm:text-xs text-slate-600 mb-1">{status.label}</p>
                    <p className="text-base sm:text-xl font-bold text-slate-800">{status.value}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-2 gap-3 sm:gap-5">
              {statusData.slice(2, 4).map((status, idx) => (
                <Card 
                  key={idx} 
                  className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow 
                    w-14 h-14 sm:w-20 sm:h-20"
                >
                  <CardContent className="p-2 sm:p-3 text-center flex flex-col items-center justify-center h-full">
                    <p className="text-[10px] sm:text-xs text-slate-600 mb-1">{status.label}</p>
                    <p className="text-base sm:text-xl font-bold text-slate-800">{status.value}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Row 3 */}
            <div className="flex justify-center">
              <Card 
                className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow 
                  w-14 h-14 sm:w-20 sm:h-20"
              >
                <CardContent className="p-2 sm:p-3 text-center flex flex-col items-center justify-center h-full">
                  <p className="text-[10px] sm:text-xs text-slate-600 mb-1">{statusData[4].label}</p>
                  <p className="text-base sm:text-xl font-bold text-slate-800">{statusData[4].value}</p>
                </CardContent>
              </Card>
            </div>

          </div>

        </div>
      </CardContent>
    </Card>
  )
}
