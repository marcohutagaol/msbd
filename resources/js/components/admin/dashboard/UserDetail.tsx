
import { useState, useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";


export default function StatsToday() {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { label: "Hadir", value: 65, color: "#10b981" },
    { label: "Izin", value: 15, color: "#3b82f6" },
    { label: "Sakit", value: 10, color: "#f59e0b" },
    { label: "Belum Absen", value: 7, color: "#8b5cf6" },
    { label: "Tanpa Keterangan", value: 3, color: "#ef4444" },
  ];

  return (
    <div>
      {/* Kartu Profil */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm ">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" />
              <AvatarFallback>CL</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Rio Nibaho</h2>
              <p className="text-gray-600">Super Visior</p>
              <p className="text-sm text-gray-500 mt-2">PT. Bergoyang</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Rabu, 27 Sep 2023</p>
            <p className="text-sm text-gray-600">{currentTime} WIB</p>
          </div>
        </div>
      </div>

     
     
      
    </div>
  );
}
