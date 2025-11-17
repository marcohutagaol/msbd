'use client';

import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

import Header from '../../components/admin/dashboard/Header';
import Sidebar from '../../components/admin/dashboard/Sidebar';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

import { ArrowLeft, ClipboardList, ShoppingBag, Truck } from 'lucide-react';

// Tooltip Chart
const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        const { day, date } = payload[0].payload;
        return (
            <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-md">
                <p className="font-medium text-slate-700">{`${day}, ${date}`}</p>
                <p className="font-semibold text-[#3b82a0]">
                    {payload[0].value} Request
                </p>
            </div>
        );
    }
    return null;
};

export default function RequestDetailPage() {
    // Ambil data dari Laravel
    const { stats, chart, requests, history, deptName } = usePage()
        .props as any;

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

    return (
        <div className="flex min-h-screen bg-[#f5f7fa] font-sans">
            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-full w-[260px] bg-white shadow-md transition-transform duration-300 ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <Sidebar />
            </div>

            {/* Main content */}
            <div
                className={`flex flex-1 flex-col transition-all duration-300 ${
                    isSidebarOpen ? 'ml-[260px]' : 'ml-0'
                }`}
            >
                {/* Header */}
                <div
                    className={`fixed top-0 right-0 z-200 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.05)] transition-all duration-300 ${
                        isSidebarOpen ? 'left-[260px]' : 'left-0'
                    }`}
                >
                    <Header
                        isSidebarOpen={isSidebarOpen}
                        onToggleSidebar={toggleSidebar}
                    />
                </div>

                {/* Page content */}
                <div className="flex flex-col gap-8 px-10 py-24 transition-all duration-300">
                    {/* Page Header */}
                    <div className="sticky top-0 z-40 w-full rounded-xl border-b border-slate-200 bg-white shadow-sm">
                        <div className="mx-auto flex max-w-7xl items-center justify-between px-10 py-5">
                            <div className="flex items-center gap-3">
                                <div className="rounded-xl bg-[#4789A8]/10 p-3">
                                    <ClipboardList className="h-6 w-6 text-[#4789A8]" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-800">
                                        {deptName}
                                    </h1>
                                    <p className="text-sm text-gray-500">
                                        Detail aktivitas permintaan barang
                                    </p>
                                </div>
                            </div>

                            <Link href="/admin/requests">
                                <Button
                                    variant="outline"
                                    className="flex items-center gap-2 border border-[#4789A8] text-[#4789A8] transition-all hover:bg-[#4789A8] hover:text-white"
                                >
                                    <ArrowLeft className="h-4 w-4" />
                                    Kembali
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Stats + Chart */}
                    <div className="flex flex-col gap-6">
                        {/* Stats */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            <Card className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                                <p className="text-sm text-gray-500">
                                    Total Cost
                                </p>
                                <p className="mt-1 text-2xl font-bold text-gray-900">
                                    Rp{stats.totalCost.toLocaleString('id-ID')}
                                </p>
                            </Card>

                            <Card className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                                <p className="text-sm text-gray-500">
                                    Total Order
                                </p>
                                <p className="mt-1 text-2xl font-bold text-gray-900">
                                    {stats.totalOrder}
                                </p>
                            </Card>

                            <Card className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                                <p className="text-sm text-gray-500">
                                    Completed
                                </p>
                                <p className="mt-1 text-2xl font-bold text-gray-900">
                                    {stats.completed}
                                </p>
                            </Card>

                            <Card className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                                <p className="text-sm text-gray-500">
                                    Canceled
                                </p>
                                <p className="mt-1 text-2xl font-bold text-gray-900">
                                    {stats.canceled}
                                </p>
                            </Card>
                        </div>

                        {/* Chart */}
                        {/* <Card className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                            <h3 className="mb-4 flex items-center gap-2 font-bold text-slate-800">
                                Aktivitas Permintaan Mingguan
                            </h3>
                            <ResponsiveContainer width="100%" height={320}>
                                <BarChart
                                    data={chart}
                                    margin={{
                                        top: 20,
                                        right: 20,
                                        left: 20,
                                        bottom: 20,
                                    }}
                                    barCategoryGap="25%"
                                >
                                    <defs>
                                        <linearGradient
                                            id="barDefault"
                                            x1="0"
                                            y1="0"
                                            x2="0"
                                            y2="1"
                                        >
                                            <stop
                                                offset="0%"
                                                stopColor="#7fb9cc"
                                            />
                                            <stop
                                                offset="100%"
                                                stopColor="#d3ebf2"
                                            />
                                        </linearGradient>
                                    </defs>

                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        stroke="#e5e7eb"
                                    />

                                    <XAxis
                                        dataKey="day"
                                        tick={{ fill: '#4b5563', fontSize: 12 }}
                                        axisLine={false}
                                        tickLine={false}
                                        interval={0}
                                    />

                                    <YAxis
                                        tick={{ fill: '#4b5563', fontSize: 12 }}
                                        axisLine={false}
                                        tickLine={false}
                                    />

                                    <Tooltip content={<CustomTooltip />} />

                                    <Bar
                                        dataKey="total"
                                        radius={[12, 12, 0, 0]}
                                        barSize={45}
                                    >
                                        {chart.map((_: any, i: any) => (
                                            <Cell
                                                key={i}
                                                fill="url(#barDefault)"
                                            />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </Card> */}
                    </div>

                    {/* Request Table */}
                    <Card className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-md">
                        <h3 className="mb-4 flex items-center gap-2 font-bold text-slate-800">
                            <ShoppingBag className="h-5 w-5 text-[#4789A8]" />
                            Daftar Request Item
                        </h3>

                        <div className="max-h-[280px] overflow-y-auto rounded-xl">
                            <table className="w-full border-collapse text-center text-sm">
                                <thead className="sticky top-0 bg-slate-100 font-semibold text-slate-700">
                                    <tr>
                                        <th className="px-4 py-3">No</th>
                                        <th className="px-4 py-3 text-left">
                                            Item
                                        </th>
                                        <th className="px-4 py-3">Tanggal</th>
                                        <th className="px-4 py-3">Jumlah</th>
                                        <th className="px-4 py-3">Harga</th>
                                        <th className="px-4 py-3">Total</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {requests.map((r: any, i: number) => (
                                        <tr
                                            key={i}
                                            className={`${i % 2 === 0 ? 'bg-white' : 'bg-slate-50'} hover:bg-slate-100`}
                                        >
                                            <td className="px-4 py-3">
                                                {i + 1}
                                            </td>
                                            <td className="px-4 py-3 text-left font-semibold">
                                                {r.item_name}
                                            </td>
                                            <td className="px-4 py-3">
                                                {r.created_at}
                                            </td>
                                            <td className="px-4 py-3">
                                                {r.qty}
                                            </td>
                                            <td className="px-4 py-3">
                                                Rp
                                                {r.price.toLocaleString(
                                                    'id-ID',
                                                )}
                                            </td>
                                            <td className="px-4 py-3 font-bold">
                                                Rp
                                                {(
                                                    r.qty * r.price
                                                ).toLocaleString('id-ID')}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <p className="mt-2 text-xs text-slate-500 italic">
                            Daftar request item terbaru.
                        </p>
                    </Card>

                    {/* Riwayat Barang Masuk */}
                    <Card className="mt-4 flex h-[400px] flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-md">
                        <div className="mb-3 flex items-center justify-between">
                            <h3 className="flex items-center gap-2 font-bold text-slate-800">
                                <Truck className="h-5 w-5 text-[#4789A8]" />
                                Riwayat Barang Masuk
                            </h3>
                        </div>

                        <div className="max-h-[280px] flex-1 overflow-y-auto rounded-xl">
                            <table className="w-full border-collapse text-center text-sm">
                                <thead className="sticky top-0 bg-slate-100 font-semibold text-slate-700">
                                    <tr>
                                        <th className="px-4 py-3">No</th>
                                        <th className="px-4 py-3 text-left">
                                            Item
                                        </th>
                                        <th className="px-4 py-3">Tanggal</th>
                                        <th className="px-4 py-3">Jumlah</th>
                                        <th className="px-4 py-3">Harga</th>
                                        <th className="px-4 py-3">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {history.map((h: any, i: number) => (
                                        <tr
                                            key={i}
                                            className={`${i % 2 === 0 ? 'bg-white' : 'bg-slate-50'} hover:bg-slate-100`}
                                        >
                                            <td className="px-4 py-3">
                                                {i + 1}
                                            </td>
                                            <td className="px-4 py-3 text-left font-semibold">
                                                {h.item_name}
                                            </td>
                                            <td className="px-4 py-3">
                                                {h.created_at}
                                            </td>
                                            <td className="px-4 py-3">
                                                {h.qty}
                                            </td>
                                            <td className="px-4 py-3">
                                                Rp
                                                {h.price.toLocaleString(
                                                    'id-ID',
                                                )}
                                            </td>
                                            <td className="px-4 py-3 font-bold">
                                                Rp
                                                {(
                                                    h.qty * h.price
                                                ).toLocaleString('id-ID')}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <p className="mt-2 text-left text-xs text-slate-500 italic">
                            Daftar riwayat barang yang baru masuk ke gudang.
                        </p>
                    </Card>
                </div>
            </div>
        </div>
    );
}
