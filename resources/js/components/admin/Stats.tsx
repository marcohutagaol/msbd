import { FaRegCalendarAlt } from "react-icons/fa";

export default function StatsToday() {
  const stats = [
    { label: "Hadir", value: 65, color: "#10b981" },
    { label: "Izin", value: 15, color: "#3b82f6" },
    { label: "Sakit", value: 10, color: "#f59e0b" },
    { label: "Belum Absen", value: 7, color: "#8b5cf6" },
    { label: "Tanpa Keterangan", value: 3, color: "#ef4444" },
  ];

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
          marginBottom: "24px",
        }}
      >
        <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "700", color: "#1a202c" }}>
          Statistik Kehadiran Hari Ini
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

      <div style={{ display: "flex", gap: "40px", alignItems: "center" }}>
        {/* Donut Chart */}
        <div
          style={{
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background: `conic-gradient(#10b981 0deg 234deg, #3b82f6 234deg 288deg, #f59e0b 288deg 324deg, #8b5cf6 324deg 349deg, #ef4444 349deg 360deg)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: "130px",
              height: "130px",
              backgroundColor: "white",
              borderRadius: "50%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ fontSize: "32px", fontWeight: "700", color: "#1a202c" }}>65</div>
            <div style={{ fontSize: "12px", color: "#64748b", marginTop: "2px" }}>dari 100</div>
          </div>
        </div>

        {/* Stats Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "16px",
            flex: 1,
          }}
        >
          {stats.map((item, i) => (
            <div
              key={i}
              style={{
                backgroundColor: "white",
                borderRadius: "12px",
                padding: "18px 20px",
                display: "flex",
                alignItems: "center",
                gap: "14px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
                gridColumn: i === 4 ? "span 2" : "auto",
              }}
            >
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  backgroundColor: item.color,
                  flexShrink: 0,
                }}
              ></div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontSize: "13px", color: "#64748b", fontWeight: "500" }}>
                  {item.label}
                </p>
                <p style={{ margin: 0, fontWeight: "700", fontSize: "22px", color: item.color, marginTop: "4px" }}>
                  {item.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
