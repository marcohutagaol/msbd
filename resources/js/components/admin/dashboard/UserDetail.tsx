import { useState, useEffect } from "react";
import { usePage } from "@inertiajs/react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

// Type user sesuai Breeze
type User = {
  id: number;
  name: string;
  email: string;
  role?: string;
  company?: string;
  photo?: string | null;
};

export default function StatsToday() {
  const [currentTime, setCurrentTime] = useState("");

  // Ambil user login dari Laravel (Inertia)
  const { props } = usePage<{
  auth?: {
    user?: User;
  };
}>();

const user = props.auth?.user;


  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* Kartu Profil */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm ">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <Avatar className="w-16 h-16">
              <AvatarImage
                src={user?.photo ?? undefined}
              />
              <AvatarFallback>
                {user?.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {user?.name}
              </h2>
              <p className="text-gray-600">
                {user?.role ?? "Jabatan belum diatur"}
              </p>
              {/* <p className="text-sm text-gray-500 mt-2">
                {user.company ?? "Perusahaan belum diatur"}
              </p> */}
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
