import { useState } from "react"
import { Link } from "@inertiajs/react"
import { ChevronLeft, Search, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import EmployeeListChart from "./employee-list-chart"

interface Employee {
  id: string
  name: string
  department: string
  status: "Hadir" | "Sakit" | "Izin" | "Cuti"
  initials: string
}

const EMPLOYEES: Employee[] = [
  {
    id: "1",
    name: "Dian Utami Nur Indah",
    department: "Housekeeping",
    status: "Hadir",
    initials: "DU",
  },
  {
    id: "2",
    name: "Andri Budiman",
    department: "IT Support",
    status: "Sakit",
    initials: "AB",
  },
  {
    id: "3",
    name: "Siti Nurhaliza",
    department: "HR",
    status: "Hadir",
    initials: "SN",
  },
  {
    id: "4",
    name: "Roni Setiawan",
    department: "Marketing",
    status: "Izin",
    initials: "RS",
  },
  {
    id: "5",
    name: "Budi Santoso",
    department: "FNB",
    status: "Hadir",
    initials: "BS",
  },
]

const DEPARTMENTS = ["Housekeeping", "IT Support", "HR", "Marketing", "FNB"]

const RANK_DATA = [
  { rank: "1#", name: "Kirana Cinta Uliii", badge: "⭐" },
  { rank: "2#", name: "Kirana Cinta Uliii", badge: "⭐" },
  { rank: "3#", name: "Kirana Cinta Uliii", badge: "⭐" },
]

const ATTENDANCE_DATA = [
  { name: "Aktif", value: 75 },
  { name: "Tidak Aktif", value: 15 },
  { name: "Tidak Hadir", value: 10 },
]

export default function EmployeeList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("Housekeeping")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const filteredEmployees = EMPLOYEES.filter(
    (emp) => emp.name.toLowerCase().includes(searchQuery.toLowerCase()) && emp.department === departmentFilter,
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Hadir":
        return "bg-green-100 text-green-600"
      case "Sakit":
        return "bg-red-100 text-red-600"
      case "Izin":
        return "bg-orange-100 text-orange-600"
      case "Cuti":
        return "bg-blue-100 text-blue-600"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Employees */}
          <Card className="bg-white border border-border shadow-sm p-6 sm:p-8">
            <EmployeeListChart />
          </Card>

          {/* Grafik Status */}
          <Card className="bg-white border border-border shadow-sm p-6">
            <h3 className="font-semibold text-foreground mb-6 text-sm uppercase tracking-wide">Grafik Kehadiran</h3>
            <div className="flex items-center gap-6">
              {/* Statistics - Displayed first on the left */}
              <div className="flex flex-col gap-4 min-w-max">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Aktif</p>
                  <p className="text-2xl font-bold text-green-600">12</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Tidak aktif</p>
                  <p className="text-2xl font-bold text-gray-600">0</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Tidak Hadir</p>
                  <p className="text-2xl font-bold text-red-600">1</p>
                </div>
              </div>

              {/* Chart - Flex grow to fill remaining space */}
              <div className="flex-1">
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={ATTENDANCE_DATA} margin={{ top: 20, right: 10, left: 0, bottom: 40 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                    <XAxis
                      dataKey="name"
                      tick={{ fill: "#6b7280", fontSize: 12 }}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#ffffff",
                        border: "1px solid #e5e7eb",
                        borderRadius: "0.5rem",
                      }}
                    />
                    <Bar dataKey="value" fill="#2563eb" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Card>

          {/* Rank */}
          <Card className="bg-white border border-border shadow-sm p-6">
            <h3 className="font-semibold text-foreground mb-6 text-sm uppercase tracking-wide">Rank</h3>
            <div className="space-y-3">
              {RANK_DATA.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-xs font-bold text-blue-600 flex-shrink-0">{item.rank}</span>
                    <span className="text-sm text-foreground truncate">{item.name}</span>
                  </div>
                  <span className="flex-shrink-0">{item.badge}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Department Filter and Search */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              {departmentFilter}
              <ChevronDown className="w-4 h-4" />
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-40 bg-white border border-border rounded-md shadow-lg z-10">
                {DEPARTMENTS.map((dept) => (
                  <button
                    key={dept}
                    onClick={() => {
                      setDepartmentFilter(dept)
                      setIsDropdownOpen(false)
                    }}
                    className={`w-full text-left px-4 py-3 text-sm hover:bg-blue-50 transition-colors ${
                      departmentFilter === dept ? "bg-blue-100 text-blue-600 font-medium" : "text-foreground"
                    }`}
                  >
                    {dept}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="relative flex-1 sm:flex-none w-full sm:w-64">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Cari karyawan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-md bg-muted focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            />
          </div>
        </div>

        {/* Employee Table - Responsive */}
        <Card className="bg-white border border-border shadow-sm overflow-hidden">
          {/* Desktop View */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left px-6 py-4 font-semibold text-sm text-foreground">Nama</th>
                  <th className="text-left px-6 py-4 font-semibold text-sm text-foreground">Departemen</th>
                  <th className="text-left px-6 py-4 font-semibold text-sm text-foreground">Status Kerja</th>
                  <th className="text-left px-6 py-4 font-semibold text-sm text-foreground">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((employee) => (
                  <tr key={employee.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 text-sm text-foreground">{employee.name}</td>
                    <td className="px-6 py-4 text-sm text-foreground">{employee.department}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center justify-center w-24 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(employee.status,)}`}>
                      {employee.status}
                      </span>

                    </td>
                    <td className="px-6 py-4">
                      <Link href={`/manager-karyawan/${employee.id}`}>
                        <Button size="sm" className="bg-foreground text-white hover:bg-foreground/90">
                          View Detail
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile View - Responsive Card Layout */}
          <div className="sm:hidden">
            <div className="divide-y divide-border">
              {filteredEmployees.map((employee) => (
                <div key={employee.id} className="p-4 space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Nama</p>
                    <p className="font-semibold text-sm text-foreground">{employee.name}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Departemen</p>
                      <p className="text-sm text-foreground">{employee.department}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Status Kerja</p>
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          employee.status,
                        )}`}
                      >
                        {employee.status}
                      </span>
                    </div>
                  </div>
                  <Link href={`/employee/${employee.id}`} className="block">
                    <Button size="sm" className="w-full bg-blue-600 text-white hover:bg-blue-700">
                      View Detail
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
