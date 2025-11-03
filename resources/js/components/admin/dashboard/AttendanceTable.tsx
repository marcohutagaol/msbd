export default function EmployeeStatus() {
  const employees = [
    { no: 1, name: "Andi Pratama", dept: "Finance", time: "08:05", status: "Masih Bekerja", color: "#16a34a" },
    { no: 2, name: "Budi Santoso", dept: "IT Support", time: "08:20", status: "Terlambat", color: "#eab308" },
    { no: 3, name: "Citra Lestari", dept: "HRD", time: "07:58", status: "Masih Bekerja", color: "#16a34a" },
    { no: 4, name: "Dewi Anggraini", dept: "Marketing", time: "-", status: "Tidak Hadir", color: "#ef4444" },
  ];

  const getBackgroundColor = (status: string) => {
    switch (status) {
      case "Masih Bekerja":
        return "rgba(22, 163, 74, 0.12)";
      case "Terlambat":
        return "rgba(234, 179, 8, 0.12)";
      case "Tidak Hadir":
        return "rgba(239, 68, 68, 0.12)";
      default:
        return "rgba(148, 163, 184, 0.1)";
    }
  };

  const getBorderColor = (status: string) => {
    switch (status) {
      case "Masih Bekerja":
        return "#86efac";
      case "Terlambat":
        return "#fde047";
      case "Tidak Hadir":
        return "#fca5a5";
      default:
        return "#cbd5e1";
    }
  };

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
      {/* Header tabel */}
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

      {/* Tabel */}
      <div
        style={{
          border: "1px solid #e2e8f0",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "center",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f8fafc" }}>
              {["No", "Nama Karyawan", "Departemen", "Jam Masuk", "Status"].map((header, i) => (
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
              <tr key={emp.no} style={{ borderTop: "1px solid #e2e8f0" }}>
                <td style={{ padding: "14px 20px", fontSize: "14px", color: "#334155" }}>{emp.no}</td>
                <td style={{ padding: "14px 20px", fontSize: "14px", color: "#334155" }}>{emp.name}</td>
                <td style={{ padding: "14px 20px", fontSize: "14px", color: "#334155" }}>{emp.dept}</td>
                <td style={{ padding: "14px 20px", fontSize: "14px", color: "#334155" }}>{emp.time}</td>

                {/* Badge status */}
                <td style={{ padding: "14px 20px" }}>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      minWidth: "130px",
                      height: "32px",
                      borderRadius: "20px",
                      fontSize: "13px",
                      fontWeight: "600",
                      color: emp.color,
                      backgroundColor: getBackgroundColor(emp.status),
                      border: `1px solid ${getBorderColor(emp.status)}`,
                    }}
                  >
                    {emp.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
