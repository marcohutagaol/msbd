'use client';

interface AttendanceRecord {
    id: number;
    name: string;
    department: string;
    arrivalTime: string;
    departureTime: string;
    status: string;
}

interface AttendanceTableProps {
    data: AttendanceRecord[];
}

export default function AttendanceTable({ data }: AttendanceTableProps) {
    return (
        <div className="overflow-hidden rounded-lg border border-blue-100 bg-white shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-blue-100 bg-slate-50">
                            <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                                Nama
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                                Department
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                                Jam Datang
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                                Jam Pulang
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                                Status Kehadiran
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((record, index) => (
                            <tr
                                key={record.id}
                                className={`border-b border-blue-100 transition hover:bg-blue-50 ${
                                    index === data.length - 1
                                        ? 'border-b-0'
                                        : ''
                                }`}
                            >
                                <td className="px-6 py-4 text-sm text-slate-900">
                                    {record.name}
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-700">
                                    {record.department}
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-700">
                                    {record.arrivalTime}
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-700">
                                    {record.departureTime}
                                </td>

                                {/* STATUS BADGE FIXED WIDTH */}
                                <td className="px-6 py-4 text-sm">
                                    <span
                                        className={`inline-flex min-w-[90px] items-center justify-center rounded-full px-3 py-1 text-xs font-medium ${
                                            record.status === 'Datang'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-blue-100 text-blue-800'
                                        }`}
                                    >
                                        {record.status}
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
