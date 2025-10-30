import Sidebar from "../../components/admin/Sidebar";
import Header from "../../components/admin/Header";
import StatsToday from "../../components/admin/Stats";
import EmployeeStatus from "../../components/admin/AttendanceTable";
import WeeklyAttendance from "../../components/admin/WeeklyAttendance";
import UserDetail from "../../components/admin/UserDetail";


export default function Dashboard() {
  return (
    <div style={{ fontFamily: "'Poppins', 'Segoe UI', system-ui, sans-serif", backgroundColor: "#f5f7fa", minHeight: "100vh", display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Header />
        <div style={{ padding: "30px 40px", flex: 1 }}>
          <UserDetail />
          <StatsToday />
          <EmployeeStatus />
          <WeeklyAttendance />
        </div>
      </div>
    </div>
  );
}
