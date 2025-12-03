import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

export default function EmployeeListChart() {
  const data = [
    { name: "Aktif", value: 75 },
    { name: "Tidak Aktif", value: 15 },
    { name: "Tidak Hadir", value: 10 },
  ]

  const COLORS = ["#06b6d4", "#22d3ee", "#cffafe"]

  return (
    <div className="flex flex-col items-center justify-center">
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={2} dataKey="value">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-4 text-center">
        <p className="text-2xl font-bold text-foreground">100/10</p>
        <p className="text-xs text-muted-foreground mt-1">Total Karyawan</p>
      </div>
    </div>
  )
}
