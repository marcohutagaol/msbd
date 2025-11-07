import React from "react";

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
        return "bg-[rgba(22,163,74,0.12)] border-[#86efac] text-[#16a34a]";
      case "Terlambat":
        return "bg-[rgba(234,179,8,0.12)] border-[#fde047] text-[#eab308]";
      case "Tidak Hadir":
        return "bg-[rgba(239,68,68,0.12)] border-[#fca5a5] text-[#ef4444]";
      default:
        return "bg-[rgba(148,163,184,0.1)] border-[#cbd5e1] text-slate-500";
    }
  };

  return (
    <div className="bg-white rounded-2xl p-[30px] mb-6 shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <h3 className="m-0 text-[18px] font-bold text-[#1a202c]">Status Karyawan Hari Ini</h3>
        <a
          href="#"
          className="text-[13px] font-semibold text-[#2d5f7e] flex items-center gap-[6px] hover:underline"
        >
          Lihat Detail →
        </a>
      </div>

      {/* Tabel */}
      <div className="border border-slate-200 rounded-xl overflow-hidden">
        <table className="w-full border-collapse text-center">
          <thead>
            <tr className="bg-[#f8fafc]">
              {["No", "Nama Karyawan", "Departemen", "Jam Masuk", "Status"].map((header, i) => (
                <th
                  key={i}
                  className="px-5 py-4 text-[13px] font-semibold text-slate-600 uppercase tracking-[0.5px]"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.no} className="border-t border-slate-200">
                <td className="px-5 py-[14px] text-[14px] text-slate-700">{emp.no}</td>
                <td className="px-5 py-[14px] text-[14px] text-slate-700">{emp.name}</td>
                <td className="px-5 py-[14px] text-[14px] text-slate-700">{emp.dept}</td>
                <td className="px-5 py-[14px] text-[14px] text-slate-700">{emp.time}</td>
                <td className="px-5 py-[14px]">
                  <span
                    className={`inline-flex items-center justify-center min-w-[130px] h-8 rounded-full text-[13px] font-semibold border ${getBackgroundColor(
                      emp.status
                    )}`}
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
