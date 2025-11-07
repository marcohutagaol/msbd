"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "@inertiajs/react";
import {
  TrendingUp,
  TrendingDown,
  CheckCircle,
  Clock,
  XCircle,
  Building2,
  Wallet,
  Plus,
  Bell,
} from "lucide-react";

interface Department {
  name: string;
  totalRequest: number;
  completed: number;
  pending: number;
  canceled: number;
  growth: number;
  isPositive: boolean;
  totalCost: number;
}

const departments: Department[] = [
  {
    name: "Front Office",
    totalRequest: 40,
    completed: 32,
    pending: 6,
    canceled: 2,
    growth: 8,
    isPositive: true,
    totalCost: 12000000,
  },
  {
    name: "House Keeping",
    totalRequest: 35,
    completed: 28,
    pending: 5,
    canceled: 2,
    growth: 5,
    isPositive: true,
    totalCost: 9500000,
  },
  {
    name: "F&B",
    totalRequest: 38,
    completed: 30,
    pending: 6,
    canceled: 2,
    growth: -2,
    isPositive: false,
    totalCost: 11000000,
  },
  {
    name: "Accounting & Administration",
    totalRequest: 42,
    completed: 36,
    pending: 4,
    canceled: 2,
    growth: 10,
    isPositive: true,
    totalCost: 13500000,
  },
];

const formatShortRupiah = (angka: number) => {
  return "Rp" + (angka / 1000).toFixed(1) + "K";
};

export default function RequestStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {departments.map((dept, idx) => {
        const newRequest =
          dept.totalRequest - (dept.completed + dept.pending + dept.canceled);

        const getNotificationStyle = () => {
          if (newRequest <= 0) return "";
          if (newRequest <= 5)
            return "bg-[#E6F4F1] text-[#356b87] border-[#B0E0E6]";
          if (newRequest <= 10)
            return "bg-orange-100 text-orange-800 border-orange-200";
          return "bg-red-100 text-red-800 border-red-200";
        };

        const notificationStyle = getNotificationStyle();

        return (
          <Card
            key={idx}
            className="p-6 bg-white shadow-md rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300 flex flex-col justify-between relative"
          >
            {/* Notifikasi di pojok kanan atas */}
            {newRequest > 0 && (
              <div
                className={`absolute -top-2 -right-2 px-3 py-1.5 rounded-full text-xs font-semibold border shadow-sm flex items-center gap-1.5 animate-pulse ${notificationStyle}`}
              >
                <Bell className="w-3 h-3" />
                <span>+{newRequest} new request</span>
              </div>
            )}

            {/* Header Kartu */}
            <div>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-slate-700 text-sm font-medium flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-[#4789A8]" />
                    {dept.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-3xl font-bold text-slate-900">
                      {dept.totalRequest}
                    </p>
                    {newRequest > 0 && (
                      <span className="text-xs bg-[#E6F4F1] text-[#356b87] px-2 py-1 rounded-full font-medium flex items-center gap-1">
                        <Plus className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center gap-2 bg-[#E6F0F3] text-[#356b87] px-3 py-1.5 rounded-lg shadow-sm border border-[#B0D3E0]">
                    <Wallet className="w-4 h-4 text-[#4789A8]" />
                    <p className="text-sm font-semibold">
                      {formatShortRupiah(dept.totalCost)}
                    </p>
                  </div>

                  <div
                    className={`p-1.5 rounded-md ${
                      dept.isPositive ? "bg-green-50" : "bg-red-50"
                    }`}
                  >
                    {dept.isPositive ? (
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500" />
                    )}
                  </div>
                </div>
              </div>

              <p
                className={`text-sm font-medium ${
                  dept.isPositive ? "text-green-600" : "text-red-600"
                }`}
              >
                {dept.isPositive ? "+" : ""}
                {dept.growth}%{" "}
                <span className="text-slate-500 font-normal">
                  dari minggu lalu
                </span>
              </p>

              {/* Statistik */}
              <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                <div className="flex flex-col items-center bg-[#F3FAFC] rounded-lg p-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mb-1" />
                  <p className="text-sm font-semibold text-slate-700">
                    {dept.completed}
                  </p>
                  <span className="text-xs text-slate-500">Completed</span>
                </div>
                <div className="flex flex-col items-center bg-[#F3FAFC] rounded-lg p-2">
                  <Clock className="w-4 h-4 text-yellow-500 mb-1" />
                  <p className="text-sm font-semibold text-slate-700">
                    {dept.pending}
                  </p>
                  <span className="text-xs text-slate-500">Pending</span>
                </div>
                <div className="flex flex-col items-center bg-[#F3FAFC] rounded-lg p-2">
                  <XCircle className="w-4 h-4 text-red-500 mb-1" />
                  <p className="text-sm font-semibold text-slate-700">
                    {dept.canceled}
                  </p>
                  <span className="text-xs text-slate-500">Canceled</span>
                </div>
              </div>
            </div>

            {/* Tombol Detail */}
            <div className="mt-5 flex justify-between items-center">
              <div className="flex items-center gap-2 mt-2">
                <span className="flex items-center gap-1 bg-[#E6F4F1] text-[#356b87] text-xs font-semibold px-2 py-1 rounded-full">
                  <Plus className="w-3 h-3" /> +12 new request
                </span>
              </div>
              <Link href={`/admin/requestdetail`}>
                <Button className="bg-[#4789A8] hover:bg-[#356b87] text-white px-4 py-1.5 rounded-lg shadow-sm transition-all">
                  Detail
                </Button>
              </Link>
            </div>
          </Card>
        );
      })}
    </div>
  );
}