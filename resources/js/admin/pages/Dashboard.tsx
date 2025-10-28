export default function Dashboard() {
  return (
    <div
      style={{
       fontFamily: "'Poppins', 'Segoe UI', system-ui, sans-serif",
        backgroundColor: "#f5f7fa",
        minHeight: "100vh",
        display: "flex",
      }}
    >
    
     <aside
  style={{
    width: "260px",
    backgroundColor: "#4789A8", 
    color: "white",
    display: "flex",
    flexDirection: "column",
    padding: "0",
    boxShadow: "2px 0 10px rgba(0,0,0,0.1)",
  }}
>
  <div
    style={{
      padding: "30px 20px",
      borderBottom: "1px solid rgba(255,255,255,0.15)",
    }}
  >
    <div
      style={{
        fontSize: "24px",
        fontWeight: "700",
        letterSpacing: "1px",
      }}
    >
    ADMIN PANEL
    </div>
    <div style={{ fontSize: "11px", opacity: 0.8, marginTop: "4px" }}>
      Management System
    </div>
  </div>

  <div style={{ padding: "20px 15px" }}>
    <div
      style={{
        fontSize: "11px",
        opacity: 0.7,
        marginBottom: "12px",
        paddingLeft: "10px",
        fontWeight: "600",
        letterSpacing: "1px",
      }}
    >
       {/* menu*/}
    </div>
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <div
        style={{
          padding: "12px 15px",
          backgroundColor: "rgba(255,255,255,0.15)", 
          borderRadius: "10px",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: "500",
          transition: "all 0.2s",
        }}
      >
        📊 Dashboard
      </div>
      <div
        style={{
          padding: "12px 15px",
          borderRadius: "10px",
          cursor: "pointer",
          backgroundColor: "#2f6d8a", 
          fontSize: "14px",
          fontWeight: "600",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        }}
      >
        ✓ Absensi
      </div>
    </div>
  </div>
</aside>


      {/* Konten Utama*/}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <header
          style={{
            backgroundColor: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 40px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
          }}
        >
          <input
            placeholder="Cari karyawan, departemen..."
            style={{
              width: "320px",
              padding: "10px 18px",
              borderRadius: "12px",
              border: "1px solid #e0e6ed",
              outline: "none",
              fontSize: "14px",
              backgroundColor: "#f8fafc",
            }}
          />
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                backgroundColor: "#f8fafc",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontSize: "18px",
              }}
            >
              🔔
            </div>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                backgroundColor: "#f8fafc",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontSize: "18px",
              }}
            >
              🌙
            </div>
            <div
  style={{
    display: "flex",
    alignItems: "center",
    gap: "10px",
    backgroundColor: "#4789A8", 
    color: "white",
    padding: "8px 16px",
    borderRadius: "12px",
    cursor: "pointer",
    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
    transition: "background-color 0.2s ease",
  }}
>
  <div
    style={{
      width: "32px",
      height: "32px",
      borderRadius: "50%",
      backgroundColor: "#2f6d8a", 
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "14px",
      fontWeight: "600",
    }}
  >
    RN
  </div>
  <span style={{ fontSize: "14px", fontWeight: "500" }}>Rio Naibaho</span>
  <span style={{ fontSize: "10px" }}>▼</span>
</div>

          </div>
        </header>

        {/* Content */}
        <div style={{ padding: "30px 40px", flex: 1 }}>
          {/* Page Title */}
          <div style={{ marginBottom: "30px" }}>
            <h1
              style={{
                margin: 0,
                fontSize: "28px",
                fontWeight: "700",
                color: "#1a202c",
                marginBottom: "6px",
              }}
            >
              Absensi Karyawan
            </h1>
            <p
              style={{
                margin: 0,
                color: "#64748b",
                fontSize: "14px",
                fontWeight: "400",
              }}
            >
              📅 Senin, 20 Oktober 2025
            </p>
          </div>

          {/* Stats */}
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
              <h3
                style={{
                  margin: 0,
                  fontSize: "18px",
                  fontWeight: "700",
                  color: "#1a202c",
                }}
              >
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

            <div
              style={{
                display: "flex",
                gap: "40px",
                alignItems: "center",
              }}
            >
              {/* Donut Chart */}
              <div
                style={{
                  width: "200px",
                  height: "200px",
                  borderRadius: "50%",
                  background: `
                    conic-gradient(
                      #10b981 0deg 234deg,
                      #3b82f6 234deg 288deg,
                      #f59e0b 288deg 324deg,
                      #8b5cf6 324deg 349deg,
                      #ef4444 349deg 360deg
                    )
                  `,
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
                  <div
                    style={{
                      fontSize: "32px",
                      fontWeight: "700",
                      color: "#1a202c",
                    }}
                  >
                    65
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#64748b",
                      marginTop: "2px",
                    }}
                  >
                    dari 100
                  </div>
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
  {[
    { label: "Hadir", value: 65, color: "#10b981" },
    { label: "Izin", value: 15, color: "#3b82f6" },
    { label: "Sakit", value: 10, color: "#f59e0b" },
    { label: "Belum Absen", value: 7, color: "#8b5cf6" },
    { label: "Tanpa Keterangan", value: 3, color: "#ef4444" },
  ].map((item, i) => (
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
        <p
          style={{
            margin: 0,
            fontSize: "13px",
            color: "#64748b",
            fontWeight: "500",
          }}
        >
          {item.label}
        </p>
        <p
          style={{
            margin: 0,
            fontWeight: "700",
            fontSize: "22px",
            color: item.color,
            marginTop: "4px",
          }}
        >
          {item.value}
        </p>
      </div>
    </div>
  ))}
</div>

            </div>
          </div>

          {/* Status */}
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
    <h3
      style={{
        margin: 0,
        fontSize: "18px",
        fontWeight: "700",
        color: "#1a202c",
      }}
    >
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
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
      }}
    >
      <thead>
        <tr
          style={{
            backgroundColor: "#f8fafc",
            textAlign: "left",
          }}
        >
          <th
            style={{
              padding: "16px 20px",
              fontSize: "13px",
              fontWeight: "600",
              color: "#475569",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            No
          </th>
          <th
            style={{
              padding: "16px 20px",
              fontSize: "13px",
              fontWeight: "600",
              color: "#475569",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            Nama Karyawan
          </th>
          <th
            style={{
              padding: "16px 20px",
              fontSize: "13px",
              fontWeight: "600",
              color: "#475569",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            Departemen
          </th>
          <th
            style={{
              padding: "16px 20px",
              fontSize: "13px",
              fontWeight: "600",
              color: "#475569",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            Jam Masuk
          </th>
          <th
            style={{
              padding: "16px 20px",
              fontSize: "13px",
              fontWeight: "600",
              color: "#475569",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            Status
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          style={{
            borderTop: "1px solid #e2e8f0",
          }}
        >
          <td style={{ padding: "14px 20px", fontSize: "14px", color: "#334155" }}>1</td>
          <td style={{ padding: "14px 20px", fontSize: "14px", color: "#334155" }}>Andi Pratama</td>
          <td style={{ padding: "14px 20px", fontSize: "14px", color: "#334155" }}>Finance</td>
          <td style={{ padding: "14px 20px", fontSize: "14px", color: "#334155" }}>08:05</td>
          <td style={{ padding: "14px 20px", fontSize: "14px", color: "#16a34a", fontWeight: "600" }}>Masih Bekerja</td>
        </tr>
        <tr
          style={{
            borderTop: "1px solid #e2e8f0",
          }}
        >
          <td style={{ padding: "14px 20px", fontSize: "14px", color: "#334155" }}>2</td>
          <td style={{ padding: "14px 20px", fontSize: "14px", color: "#334155" }}>Budi Santoso</td>
          <td style={{ padding: "14px 20px", fontSize: "14px", color: "#334155" }}>IT Support</td>
          <td style={{ padding: "14px 20px", fontSize: "14px", color: "#334155" }}>08:20</td>
          <td style={{ padding: "14px 20px", fontSize: "14px", color: "#facc15", fontWeight: "600" }}>Terlambat</td>
        </tr>
        <tr
          style={{
            borderTop: "1px solid #e2e8f0",
          }}
        >
          <td style={{ padding: "14px 20px", fontSize: "14px", color: "#334155" }}>3</td>
          <td style={{ padding: "14px 20px", fontSize: "14px", color: "#334155" }}>Citra Lestari</td>
          <td style={{ padding: "14px 20px", fontSize: "14px", color: "#334155" }}>HRD</td>
          <td style={{ padding: "14px 20px", fontSize: "14px", color: "#334155" }}>07:58</td>
          <td style={{ padding: "14px 20px", fontSize: "14px", color: "#16a34a", fontWeight: "600" }}>Masih Bekerja</td>
        </tr>
        <tr
          style={{
            borderTop: "1px solid #e2e8f0",
          }}
        >
          <td style={{ padding: "14px 20px", fontSize: "14px", color: "#334155" }}>4</td>
          <td style={{ padding: "14px 20px", fontSize: "14px", color: "#334155" }}>Dewi Anggraini</td>
          <td style={{ padding: "14px 20px", fontSize: "14px", color: "#334155" }}>Marketing</td>
          <td style={{ padding: "14px 20px", fontSize: "14px", color: "#334155" }}>-</td>
          <td style={{ padding: "14px 20px", fontSize: "14px", color: "#ef4444", fontWeight: "600" }}>Tidak Hadir</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>



         <div
  style={{
    backgroundColor: "white",
    borderRadius: "16px",
    padding: "30px",
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
    <h3
      style={{
        margin: 0,
        fontSize: "18px",
        fontWeight: "700",
        color: "#1a202c",
      }}
    >
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
    {[
      { day: "Sen", value: 68, date: "14 Okt" },
      { day: "Sel", value: 90, date: "15 Okt" },
      { day: "Rab", value: 60, date: "16 Okt" },
      { day: "Kam", value: 75, date: "17 Okt" },
      { day: "Jum", value: 89, date: "18 Okt" },
      { day: "Sab", value: 70, date: "19 Okt" },
      { day: "Min", value: 90, date: "20 Okt" },
    ].map((bar, i) => {
      const isToday = i === 6;
      return (
        <div
          key={i}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-end",
            flex: 1,
          }}
        >
          {/* Nilai */}
          <div
            style={{
              fontSize: "13px",
              fontWeight: "600",
              color: isToday ? "#2d5f7e" : "#475569",
              marginBottom: "8px",
            }}
          >
            {bar.value}%
          </div>

          {/* Bar */}
          <div
            style={{
              width: "100%",
              maxWidth: "45px",
              height: `${bar.value * 2}px`,
              background: isToday
                ? "linear-gradient(180deg, #2d5f7e 0%, #1e3a52 100%)"
                : "linear-gradient(180deg, rgba(45,95,126,0.75) 0%, rgba(45,95,126,0.45) 100%)",
              borderRadius: "10px",
              boxShadow: isToday
                ? "0 4px 12px rgba(45,95,126,0.3)"
                : "0 3px 6px rgba(45,95,126,0.15)",
            }}
          ></div>

          {/* Label Hari & Tanggal */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "10px",
              gap: "2px",
            }}
          >
            <span
              style={{
                fontSize: "13px",
                fontWeight: isToday ? "700" : "600",
                color: isToday ? "#1e3a52" : "#334155",
              }}
            >
              {bar.day}
            </span>
            <span
              style={{
                fontSize: "11px",
                color: "#94a3b8",
              }}
            >
              {bar.date}
            </span>
          </div>
        </div>
      );
    })}
  </div>
</div>

        </div>
      </div>
    </div>
  );
}