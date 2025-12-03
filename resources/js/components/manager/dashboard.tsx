'use client';

import { AgendaSection } from '@/components/manager/agenda-section';
import { AnnouncementCard } from '@/components/manager/announcement-card';
import { AttendanceChart } from '@/components/manager/attendance-chart';
import { Calendar } from '@/components/manager/calendar';
import { ClockWidget } from '@/components/manager/clock-widget';
import { EmployeeTable } from '@/components/manager/employee-table';
import { InventoryChart } from '@/components/manager/inventory-chart';
import { PermissionCard } from '@/components/manager/permission-card';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { UserCircle } from 'lucide-react';
import { useState } from 'react';

export function ManagerDashboard() {
    const [activeTab, setActiveTab] = useState('housekeeping');

    // Dropdown Housekeeping → Department lain
    const [selectedDepartment, setSelectedDepartment] =
        useState('Housekeeping');
    const [isDepartmentOpen, setIsDepartmentOpen] = useState(false);
    const departments = [
        'Housekeeping',
        'Food & Beverage',
        'Front Office',
        'IT',
        'Security',
        'HRD',
    ];

    // Dropdown Weekly → Harian/Bulanan/Tahunan
    const [selectedPeriod, setSelectedPeriod] = useState('Mingguan');
    const [isPeriodOpen, setIsPeriodOpen] = useState(false);
    const periods = ['Mingguan', 'Bulanan', 'Tahunan'];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
            {/* Header */}
            <div className="sticky top-0 z-50 border-b border-blue-100 bg-white shadow-sm">
                <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
                    <div className="flex gap-4">
                        {/* DROPDOWN DEPARTMENT */}
                        <div className="relative">
                            <button
                                onClick={() => {
                                    setActiveTab('housekeeping');
                                    setIsDepartmentOpen(!isDepartmentOpen);
                                    setIsPeriodOpen(false);
                                }}
                                className={`flex items-center gap-2 rounded-lg px-6 py-2 font-semibold transition-all ${activeTab === 'housekeeping' ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-100 text-slate-700'} `}
                            >
                                {selectedDepartment}
                                <span className="text-sm">▼</span>
                            </button>

                            {/* Dropdown options */}
                            {isDepartmentOpen && (
                                <div className="absolute left-0 z-30 mt-2 w-48 rounded-lg border bg-white shadow-lg">
                                    {departments.map((dep) => (
                                        <button
                                            key={dep}
                                            className={`w-full px-4 py-2 text-left hover:bg-blue-100 ${
                                                selectedDepartment === dep
                                                    ? 'bg-blue-50 font-semibold'
                                                    : ''
                                            }`}
                                            onClick={() => {
                                                setSelectedDepartment(dep);
                                                setIsDepartmentOpen(false);
                                            }}
                                        >
                                            {dep}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* DROPDOWN PERIOD (Weekly) */}
                        <div className="relative">
                            <button
                                onClick={() => {
                                    setActiveTab('weekly');
                                    setIsPeriodOpen(!isPeriodOpen);
                                    setIsDepartmentOpen(false);
                                }}
                                className={`flex items-center gap-2 rounded-lg px-6 py-2 font-semibold transition-all ${activeTab === 'weekly' ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-100 text-slate-700'} `}
                            >
                                {selectedPeriod}
                                <span className="text-sm">▼</span>
                            </button>

                            {/* Dropdown period options */}
                            {isPeriodOpen && (
                                <div className="absolute left-0 z-30 mt-2 w-48 rounded-lg border bg-white shadow-lg">
                                    {periods.map((p) => (
                                        <button
                                            key={p}
                                            className={`w-full px-4 py-2 text-left hover:bg-blue-100 ${
                                                selectedPeriod === p
                                                    ? 'bg-blue-50 font-semibold'
                                                    : ''
                                            }`}
                                            onClick={() => {
                                                setSelectedPeriod(p);
                                                setIsPeriodOpen(false);
                                            }}
                                        >
                                            {p}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* TAB CONTENT */}
                    <div className="mt-10">
                        {/* ------------------ HOUSEKEEPING TAB ------------------ */}
                        {activeTab === 'housekeeping' && (
                            <>
                                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                                    <div className="lg:col-span-2">
                                        <Calendar />
                                    </div>
                                    <div className="space-y-6">
                                        <AgendaSection />
                                        <ClockWidget />
                                    </div>
                                </div>

                                <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <PermissionCard />
                                    <AttendanceChart />
                                </div>

                                <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <AnnouncementCard />
                                    <InventoryChart />
                                </div>

                                <Card className="mt-6 border-blue-100 shadow-md transition-shadow hover:shadow-lg">
                                    <CardContent className="pt-6">
                                        <div className="flex items-center justify-between">
                                            {/* LEFT SIDE */}
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-blue-200 shadow-sm">
                                                    <UserCircle className="h-6 w-6 text-blue-600" />
                                                </div>

                                                {/* TEXT SECTION */}
                                                <div className="flex flex-col leading-tight">
                                                    <span className="font-semibold text-slate-900">
                                                        {selectedDepartment}
                                                    </span>

                                                    {/* NAMA DI BAWAH DEPARTEMEN */}
                                                    <span className="text-xs text-slate-500">
                                                        Nama
                                                    </span>
                                                </div>
                                            </div>

                                            {/* RIGHT SIDE – REPORT + CURRENT TIME */}
                                            <div className="flex flex-col items-end leading-tight">
                                                <span className="text-sm font-medium text-slate-500">
                                                    Departement Report
                                                </span>

                                                {/* JAM SAAT INI */}
                                                <span className="text-xs text-slate-400">
                                                    {new Date().toLocaleTimeString(
                                                        'id-ID',
                                                        {
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                            hour12: false,
                                                        },
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <div className="mt-6">
                                    <EmployeeTable />
                                </div>
                            </>
                        )}

                        {/* ------------------ WEEKLY TAB ------------------ */}
                        {activeTab === 'weekly' && (
                            <Card className="border-blue-100">
                                <CardHeader>
                                    <CardTitle className="text-blue-900">
                                        Laporan {selectedPeriod}
                                    </CardTitle>
                                    <CardDescription>
                                        Visualisasi data berdasarkan periode:{' '}
                                        {selectedPeriod}
                                    </CardDescription>
                                </CardHeader>

                                <CardContent className="flex h-64 items-center justify-center text-slate-400">
                                    Data {selectedPeriod} akan muncul di sini
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
