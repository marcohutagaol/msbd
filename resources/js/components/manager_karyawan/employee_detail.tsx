import { Link } from "@inertiajs/react"
import { ChevronLeft } from "lucide-react"
import { Card } from "@/components/ui/card"

interface EmployeeData {
  id: string
  name: string
  department: string
  status: "Active" | "Inactive"
  initials: string
  employeeId: string
  email: string
  phone: string
  joinDate: string
  stats: {
    hadir: number
    tepatWaktu: number
    telat: number
    izin: number
    sakit: number
    cuti: number
  }
  badges: Array<{
    id: string
    name: string
    type: "award" | "warning" | "punishment"
  }>
}

const EMPLOYEE_DATA: EmployeeData = {
  id: "1",
  name: "Dian Utami Nur Indah",
  department: "Housekeeping",
  status: "Active",
  initials: "DU",
  employeeId: "EMP001",
  email: "dian.utami@company.com",
  phone: "+62 812-3456-7890",
  joinDate: "1 Januari 2020",
  stats: {
    hadir: 12,
    tepatWaktu: 12,
    telat: 12,
    izin: 12,
    sakit: 12,
    cuti: 12,
  },
  badges: [
    { id: "1", name: "Employee of The Month", type: "award" },
    { id: "2", name: "Warn", type: "warning" },
    { id: "3", name: "Pecat", type: "punishment" },
  ],
}

export default function EmployeeDetail({ id }: { id: string | number }) {
  const employee = EMPLOYEE_DATA

  const getBadgeStyle = (type: string) => {
    switch (type) {
      case "award":
        return "bg-muted text-foreground border border-border"
      case "warning":
        return "bg-orange-100 text-orange-600 border border-orange-200"
      case "punishment":
        return "bg-red-100 text-red-600 border border-red-200"
      default:
        return "bg-muted text-foreground"
    }
  }

  return (
    <div className="min-h-screen bg-background">

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          {/* Profile Section */}
          <Card className="bg-white border border-border shadow-sm p-6 flex flex-col items-center justify-start h-fit">
            <div
              className="w-32 h-32 rounded-full bg-blue-600 flex items-center justify-center mb-4"
              aria-label={`Profile picture of ${employee.name}`}
            >
              <span className="text-4xl font-bold text-white">{employee.initials}</span>
            </div>
            <h2 className="text-center text-xl font-bold text-foreground">{employee.name}</h2>
            <p className="text-center text-sm text-muted-foreground mb-4">{employee.department}</p>
            <div className="flex items-center gap-2 px-3 py-1 bg-green-100 rounded-full">
              <span className="w-2 h-2 bg-green-600 rounded-full"></span>
              <span className="text-xs font-medium text-green-600">{employee.status}</span>
            </div>
          </Card>

          {/* Employee Identity Section */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white border border-border shadow-sm p-6">
                <h3 className="font-bold text-foreground text-lg mb-6">Identitas Karyawan</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">ID Karyawan:</p>
                    <p className="font-semibold text-foreground">{employee.employeeId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Nama Lengkap:</p>
                    <p className="font-semibold text-foreground">{employee.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Departemen:</p>
                    <p className="font-semibold text-foreground">{employee.department}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Email:</p>
                    <p className="font-semibold text-foreground">{employee.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Telepon:</p>
                    <p className="font-semibold text-foreground">{employee.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Tanggal Bergabung:</p>
                    <p className="font-semibold text-foreground">{employee.joinDate}</p>
                  </div>
                </div>
              </Card>

              {/* Statistics Section */}
              <Card className="bg-white border border-border shadow-sm p-6">
                <h3 className="font-bold text-foreground text-lg mb-6">Statistik Kehadiran</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Hadir", value: employee.stats.hadir },
                    { label: "Tepat waktu", value: employee.stats.tepatWaktu },
                    { label: "Telat", value: employee.stats.telat },
                    { label: "Izin", value: employee.stats.izin },
                    { label: "Sakit", value: employee.stats.sakit },
                    { label: "Cuti", value: employee.stats.cuti },
                  ].map((stat, idx) => (
                    <div key={idx} className="bg-muted rounded-lg p-4 text-center">
                      <p className="text-2xl font-bold text-blue-600 mb-2">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Badges Section */}
        <Card className="bg-white border border-border shadow-sm p-6">
          <h3 className="font-bold text-foreground text-lg mb-6">Status</h3>
          <div className="flex flex-wrap gap-3">
            {employee.badges.map((badge) => (
              <div
                key={badge.id}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${getBadgeStyle(badge.type)}`}
              >
                {badge.name}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
