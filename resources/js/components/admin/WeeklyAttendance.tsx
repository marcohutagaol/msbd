export default function WeeklyAttendance() {
  const data = [
    { day: "Sen", value: 68, date: "14 Okt" },
    { day: "Sel", value: 90, date: "15 Okt" },
    { day: "Rab", value: 60, date: "16 Okt" },
    { day: "Kam", value: 75, date: "17 Okt" },
    { day: "Jum", value: 89, date: "18 Okt" },
    { day: "Sab", value: 70, date: "19 Okt" },
    { day: "Min", value: 90, date: "20 Okt" },
  ];

  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "16px",
        padding: "30px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "700", color: "#1a202c" }}>
          Kehadiran 7 Hari Terakhir
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
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          height: "280px",
          backgroundColor: "#f8fafc",
          borderRadius: "12px",
          padding: "30px 24px 20px",
          gap: "16px",
        }}
      >
        {data.map((bar, i) => {
          const isToday = i === data.length - 1;
          return (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", flex: 1 }}>
              <div style={{ fontSize: "13px", fontWeight: "600", color: isToday ? "#2d5f7e" : "#475569", marginBottom: "8px" }}>
                {bar.value}%
              </div>
              <div
                style={{
                  width: "100%",
                  maxWidth: "45px",
                  height: `${bar.value * 2}px`,
                  background: isToday
                    ? "linear-gradient(180deg, #2d5f7e 0%, #1e3a52 100%)"
                    : "linear-gradient(180deg, rgba(45,95,126,0.75) 0%, rgba(45,95,126,0.45) 100%)",
                  borderRadius: "10px",
                  boxShadow: isToday ? "0 4px 12px rgba(45,95,126,0.3)" : "0 3px 6px rgba(45,95,126,0.15)",
                }}
              ></div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "10px", gap: "2px" }}>
                <span style={{ fontSize: "13px", fontWeight: isToday ? "700" : "600", color: isToday ? "#1e3a52" : "#334155" }}>
                  {bar.day}
                </span>
                <span style={{ fontSize: "11px", color: "#94a3b8" }}>{bar.date}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
