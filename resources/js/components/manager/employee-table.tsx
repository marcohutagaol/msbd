"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function EmployeeTable() {
  const employees = [
    { id: 1, name: "Dian Utami, Nur Indah", department: "Housekeeping", status: "Hadir" },
    { id: 2, name: "Udin Syamsudin", department: "IT", status: "Pulang" },
    { id: 3, name: "Alexandria Inoya", department: "Food and Beverage", status: "Tidak Hadir" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Hadir":
        return "bg-emerald-100 text-emerald-800 font-semibold"
      case "Pulang":
        return "bg-amber-100 text-amber-800 font-semibold"
      case "Tidak Hadir":
        return "bg-rose-100 text-rose-800 font-semibold"
      default:
        return "bg-slate-100 text-slate-800"
    }
  }

  return (
    <Card className="border-blue-100 shadow-md">
      <CardHeader className="pb-3">
        <CardTitle className="text-blue-900">Karyawan</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-blue-200 bg-gradient-to-r from-blue-50 to-slate-50">
                <th className="text-left py-4 px-4 font-bold text-slate-900 text-sm">Nama</th>
                <th className="text-left py-4 px-4 font-bold text-slate-900 text-sm">Department</th>
                <th className="text-left py-4 px-4 font-bold text-slate-900 text-sm">Status Kehadiran</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp, index) => (
                <tr
                  key={emp.id}
                  className={`border-b border-blue-100 transition-colors ${
                    index % 2 === 0 ? "bg-white" : "bg-blue-50/30"
                  } hover:bg-blue-100/40`}
                >
                  <td className="py-4 px-4 text-slate-900 font-medium">{emp.name}</td>
                  <td className="py-4 px-4 text-slate-700">{emp.department}</td>
                  <td className="py-4 px-4">
                    <Badge
                      className={`${getStatusColor(emp.status)} min-w-[110px] justify-center py-1`}
                    >
                      {emp.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
