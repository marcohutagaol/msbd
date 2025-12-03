import TotalEmployeeChart from "@/components/manager_karyawan/employee_detail";
import AttendanceChart from "@/components/manager_karyawan/AttendanceChart";
import RankingCard from "@/components/manager_karyawan/RankingCard";
import EmployeeTable from "@/components/manager_karyawan/EmployeeTable";

const Index = () => {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
          Manajemen Karyawan
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TotalEmployeeChart />
          <AttendanceChart />
          <RankingCard />
        </div>

        <EmployeeTable />
      </div>
    </div>
  );
};

export default Index;
