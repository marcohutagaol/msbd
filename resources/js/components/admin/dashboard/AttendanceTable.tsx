import { usePage } from '@inertiajs/react';

interface Employee {
  id: string;
  name: string;
  department: string;
  time: string;
  status: string;
}

interface PageProps {
  employees: Employee[];

}

export default function EmployeeStatus() {
  const { employees} = usePage().props as unknown as PageProps;
  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "16px",
        padding: "30px",
        marginBottom: "24px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "700", color: "#1a202c" }}>
          Status Karyawan Hari Ini
        </h3>
        <a
          href="#"
          style={{
            fontSize: "13px",
            color: "#2d5f7e",
            textDecoration: "none",
            fontWeight: "600",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          Lihat Detail →
        </a>
      </div>

      <div
        style={{
          border: "1px solid #e2e8f0",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f8fafc", textAlign: "left" }}>
              {["ID", "Nama Karyawan", "Departemen", "Jam Masuk", "Status"].map((header, i) => (
                <th
                  key={i}
                  style={{
                    padding: "16px 20px",
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "#475569",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id} style={{ borderTop: "1px solid #e2e8f0" }}>
                <td style={{ padding: "14px 20px", fontSize: "14px", color: "#334155" }}>{emp.id}</td>
                <td style={{ padding: "14px 20px", fontSize: "14px", color: "#334155" }}>{emp.name}</td>
                <td style={{ padding: "14px 20px", fontSize: "14px", color: "#334155" }}>{emp.department}</td>
                <td style={{ padding: "14px 20px", fontSize: "14px", color: "#334155" }}>{emp.time}</td>
                <td style={{ padding: "14px 20px", fontSize: "14px", color: "#334155", fontWeight: "600" }}>
                  {emp.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}