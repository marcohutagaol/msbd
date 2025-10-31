import { IoMdNotifications } from "react-icons/io";
import { FiMoon } from "react-icons/fi";
import { FiSearch } from "react-icons/fi";

export default function Header() {
  return (
  <header
  style={{
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 40px", // dikurangi dari 16px
    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
  }}
>

      {/* Search Input */}
     <div
      style={{
        display: "flex",
        alignItems: "center",
        width: "320px",
        backgroundColor: "#f8fafc",
        border: "1px solid #e0e6ed",
        borderRadius: "12px",
        padding: "0 12px",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <FiSearch style={{ fontSize: "16px", color: "#a0aec0", marginRight: "8px" }} />
      <input
        type="text"
        placeholder="Cari karyawan, departemen..."
        style={{
          flex: 1,
          padding: "10px 0",
          border: "none",
          outline: "none",
          fontSize: "14px",
          backgroundColor: "transparent",
        }}
      />
    </div>

      {/* Icons & Profile */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        {/* Notifications */}
        <div
          style={{
            position: "relative",
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
          <IoMdNotifications color="#333" size={20} />
          <div
            style={{
              position: "absolute",
              top: "-4px",
              right: "-4px",
              width: "16px",
              height: "16px",
              borderRadius: "50%",
              backgroundColor: "red",
              color: "white",
              fontSize: "10px",
              fontWeight: "700",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            3
          </div>
        </div>

        {/* Dark Mode */}
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
          <FiMoon color="#333" size={18} />
        </div>

        {/* User Profile */}
        <div
  style={{
    display: "flex",
    alignItems: "center",
    gap: "10px",
    height: "40px",
    backgroundColor: "#4789A8",
    color: "#ffffff",
    padding: "0 12px",
    borderRadius: "12px",
    cursor: "pointer",
    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
    fontFamily: "'Poppins', sans-serif",
    fontSize: "14px",
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
      fontWeight: "600",
      flexShrink: 0,
    }}
  >
    RN
  </div>
  <span style={{ fontWeight: "500", whiteSpace: "nowrap" }}>Rio Naibaho</span>
  <span style={{ fontSize: "10px" }}>▼</span>
</div>

      </div>
    </header>
  );
}
