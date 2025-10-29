import { MdDashboard } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

export default function Sidebar() {
  return (
    <aside
      style={{
        width: "260px",
        backgroundColor: "#4789A8",
        color: "white",
        display: "flex",
        flexDirection: "column",
        padding: "0",
        boxShadow: "2px 0 10px rgba(0,0,0,0.1)",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* Header */}
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

      {/* Menu */}
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
          Menu
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          {/* Dashboard */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 15px",
              backgroundColor: "rgba(255,255,255,0.15)",
              borderRadius: "10px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500",
              transition: "all 0.2s",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <MdDashboard color="#B0E0E6" size={18} />
              Dashboard
            </div>
            {/* Logo/Arrow untuk menunjukkan turunan */}
            <IoIosArrowDown color="#B0E0E6" size={16} />
          </div>

          {/* Absensi sebagai turunan */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 15px",
              marginLeft: "20px", // indentasi menunjukkan turunan
              borderRadius: "8px",
              cursor: "pointer",
              backgroundColor: "#2f6d8a",
              fontSize: "13px",
              fontWeight: "500",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              transition: "all 0.2s",
            }}
          >
            <FaCheck color="#B0E0E6" size={14} />
            Absensi
          </div>
        </div>
      </div>
    </aside>
  );
}
