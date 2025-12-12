"use client";

import { router } from "@inertiajs/react";

type RequestStatus = "Pending" | "Approved" | "Completed" | "Arrived" | "Canceled" | "Rejected";

interface RequestData {
  id: number;
  request_number: string;
  department: string;
  request_date: string;   // tanggal request (YYYY-MM-DD)
  created_at: string;    // JAM ambil dari sini
  status: RequestStatus;
  notes?: string | null;
  total_items: number;
}


interface MonitoringListProps {
  requests: RequestData[];
}

export default function Monitoring({ requests }: MonitoringListProps) {
  const getStatusType = (status: RequestStatus | string) => {
    if (status === "Completed" || status === "Arrived") return "complete";
    if (status === "Pending" || status === "Approved" || status === "On Process") return "on-process";
    if (status === "Rejected" || status === "Canceled" || status === "Late") return "late";
    return "not-checked";
  };



  const getStatusBadge = (status: RequestStatus) => {
    const statusType = getStatusType(status);

    const badgeStyles: Record<string, string> = {
      "not-checked": "bg-gray-200 text-gray-700",
      complete: "bg-green-200 text-green-700",
      "on-process": "bg-yellow-200 text-yellow-700",
      late: "bg-red-200 text-red-700",
    };

    const badgeLabels: Record<string, string> = {
      "not-checked": "Not Checked",
      complete: "Completed",
      "on-process": "On Process",
      late: "Late",
    };



    return (
      <span
        className={`inline-flex items-center justify-center w-28 px-3 py-1 rounded-full text-sm font-medium ${badgeStyles[statusType]}`}
      >
        {badgeLabels[statusType]}
      </span>
    );
  };

  const handleClick = (req: any) => {
    router.visit(`/monitoring-item/${req.request_number}`);
  };
  return (
    <div className="space-y-3">
      {requests.length === 0 && (
        <p className="text-center text-gray-500">Belum ada request.</p>
      )}

      {requests.map((req) => (
        <div
          key={req.id}
          onClick={() => handleClick(req)}
          className="flex items-center justify-between p-4 bg-white border-2 border-blue-300 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors"
        >
          {/* KIRI */}
          <div className="flex-1">
            <h3 className="font-semibold text-slate-900">
              {req.request_number}
            </h3>

            <p className="text-sm text-slate-500">
              • {req.total_items} items
            </p>
          </div>

          {/* KANAN */}
          <div className="flex items-center gap-4">
            {getStatusBadge(req.status)}

            <div className="text-right text-sm">
              <p className="text-slate-600">
                {new Date(req.request_date).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>

              <p className="text-slate-500">
                {new Date(req.created_at).toLocaleTimeString("id-ID", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
