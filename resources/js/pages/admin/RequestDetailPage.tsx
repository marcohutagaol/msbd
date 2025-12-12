'use client';

import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import Header from '../../components/admin/dashboard/Header';
import Sidebar from '../../components/admin/dashboard/Sidebar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, ClipboardList, ShoppingBag, Truck, Menu } from 'lucide-react';

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

interface RequestItem {
    id: number;
    request_id: number;
    nama_barang: string;
    jumlah_diajukan: number;
    jumlah_disetujui: number;
    status: string;
    satuan: string;
    departemen: string;
    catatan: string;
    created_at: string;
}

interface DepartmentData {
    request_number: string;
    status: string;
    request_date: string;
    totalItems: number;
    totalCost: number;
    completed: number;
    pending: number;
    items: RequestItem[];
    chartData: Array<{
        day: string;
        date: string;
        total: number;
    }>;
}

// Fix: Tambahkan index signature untuk PageProps
interface PageProps {
    kode_department: string;
    [key: string]: any; // Index signature
}

export default function RequestDetailPage() {
    // Ambil data dari Laravel
    const { stats, chart, requests, history, deptName } = usePage()
        .props as any;

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    
    // Deteksi ukuran layar untuk responsif
    useEffect(() => {
        const checkIfMobile = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            
            if (mobile && isSidebarOpen) {
                setIsSidebarOpen(false);
            }
            if (!mobile && !isSidebarOpen) {
                setIsSidebarOpen(true);
            }
        };

        checkIfMobile();
        window.addEventListener("resize", checkIfMobile);
        return () => window.removeEventListener("resize", checkIfMobile);
    }, []);

    // Close sidebar on mobile when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const sidebar = document.querySelector('.mobile-sidebar');
            const toggleButton = document.querySelector('.sidebar-toggle-button');
            
            if (isMobile && isSidebarOpen && 
                sidebar && 
                !sidebar.contains(event.target as Node) &&
                toggleButton &&
                !toggleButton.contains(event.target as Node)) {
                setIsSidebarOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isMobile, isSidebarOpen]);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="flex min-h-screen bg-[#f5f7fa] font-sans">
            {/* Sidebar */}
            <div
                className={`hidden md:block fixed top-0 left-0 h-full w-[260px] bg-white shadow-md transition-transform duration-300 ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <Sidebar />
            </div>

            {/* Sidebar Mobile Overlay */}
            {isMobile && isSidebarOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-black/50 z-40"
                        onClick={toggleSidebar}
                    ></div>
                    <div className="mobile-sidebar fixed top-0 left-0 z-50 h-full w-[260px] bg-white shadow-lg transition-transform duration-300 translate-x-0">
                        <Sidebar />
                    </div>
                </>
            )}

            {/* Main content */}
            <div
                className={`flex flex-1 flex-col transition-all duration-300 w-full ${
                    isSidebarOpen ? 'md:ml-[260px]' : 'ml-0'
                }`}
            >
                {/* Header */}
                <div
                    className={`fixed top-0 right-0 z-200 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.05)] transition-all duration-300 w-full ${
                        isSidebarOpen ? 'md:left-[260px] md:w-[calc(100%-260px)]' : 'left-0'
                    }`}
                >
                    <Header
                        isSidebarOpen={isSidebarOpen}
                        onToggleSidebar={toggleSidebar}
                    />
                </div>

                {/* Page content */}
                <div className="flex flex-col gap-4 md:gap-8 px-4 sm:px-6 lg:px-10 py-20 md:py-24 transition-all duration-300">
                    {/* Page Header */}
                    <div className="sticky top-0 z-40 w-full rounded-lg md:rounded-xl border-b border-slate-200 bg-white shadow-sm">
                        <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-center justify-between px-4 md:px-10 py-4 md:py-5 gap-3">
                            <div className="flex items-center gap-3 w-full sm:w-auto">
                                <div className="rounded-lg md:rounded-xl bg-[#4789A8]/10 p-2 md:p-3">
                                    <ClipboardList className="h-5 w-5 md:h-6 md:w-6 text-[#4789A8]" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h1 className="text-lg md:text-2xl font-bold text-gray-800 truncate">
                                        {deptName}
                                    </h1>
                                    <p className="text-xs md:text-sm text-gray-500">
                                        Detail aktivitas
                                    </p>
                                </div>
                            </div>

                            <Link href="/admin/requests" className="w-full sm:w-auto">
                                <Button
                                    variant="outline"
                                    className="flex items-center justify-center gap-2 border border-[#4789A8] text-[#4789A8] transition-all hover:bg-[#4789A8] hover:text-white w-full sm:w-auto text-sm md:text-base"
                                >
                                    <ArrowLeft className="h-3 w-3 md:h-4 md:w-4" />
                                    Kembali
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Stats + Chart */}
                    <div className="flex flex-col gap-4 md:gap-6">
                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            <Card className="rounded-lg md:rounded-xl border border-gray-100 bg-white p-3 md:p-4 shadow-sm">
                                <p className="text-xs md:text-sm text-gray-500">
                                    Total Cost
                                </p>
                                <p className="mt-1 text-lg md:text-2xl font-bold text-gray-900">
                                    Rp{stats.totalCost.toLocaleString('id-ID')}
                                </p>
                            </Card>

                            <Card className="rounded-lg md:rounded-xl border border-gray-100 bg-white p-3 md:p-4 shadow-sm">
                                <p className="text-xs md:text-sm text-gray-500">
                                    Total Order
                                </p>
                                <p className="mt-1 text-lg md:text-2xl font-bold text-gray-900">
                                    {stats.totalOrder}
                                </p>
                            </Card>

                            <Card className="rounded-lg md:rounded-xl border border-gray-100 bg-white p-3 md:p-4 shadow-sm">
                                <p className="text-xs md:text-sm text-gray-500">
                                    Completed
                                </p>
                                <p className="mt-1 text-lg md:text-2xl font-bold text-gray-900">
                                    {stats.completed}
                                </p>
                            </Card>

                            <Card className="rounded-lg md:rounded-xl border border-gray-100 bg-white p-3 md:p-4 shadow-sm">
                                <p className="text-xs md:text-sm text-gray-500">
                                    Canceled
                                </p>
                                <p className="mt-1 text-lg md:text-2xl font-bold text-gray-900">
                                    {stats.canceled}
                                </p>
                            </Card>
                        </div>

                        {/* Chart Section (Commented out but kept responsive) */}
                        {/* <Card className="rounded-lg md:rounded-2xl border border-slate-200 bg-white p-4 md:p-6 shadow-sm">
                            <h3 className="mb-3 md:mb-4 flex items-center gap-2 font-bold text-slate-800 text-base md:text-lg">
                                Aktivitas Permintaan Mingguan
                            </h3>
                            <div className="h-64 md:h-80">
                                Chart content here
                            </div>
                        </Card> */}
                    </div>

                    {/* Request Table */}
                    <Card className="rounded-lg md:rounded-2xl border border-slate-200 bg-white p-3 md:p-4 shadow-md">
                        <h3 className="mb-3 md:mb-4 flex items-center gap-2 font-bold text-slate-800 text-base md:text-lg">
                            <ShoppingBag className="h-4 w-4 md:h-5 md:w-5 text-[#4789A8]" />
                            Daftar Request Item
                        </h3>

                        {/* Desktop Table */}
                        <div className="hidden md:block max-h-[280px] overflow-y-auto rounded-xl">
                            <table className="w-full border-collapse text-center text-sm">
                                <thead className="sticky top-0 bg-slate-100 font-semibold text-slate-700">
                                    <tr>
                                        <th className="px-4 py-3">No</th>
                                        <th className="px-4 py-3 text-left">Item</th>
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

                        {/* Mobile Card View */}
                        <div className="md:hidden space-y-3">
                            {requests.map((r: any, i: number) => (
                                <div key={i} className="border border-gray-200 rounded-lg p-3 hover:bg-slate-50">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <div className="font-semibold text-gray-800 text-sm">{r.item_name}</div>
                                            <div className="text-xs text-gray-500 mt-1">No: {i + 1}</div>
                                        </div>
                                        <div className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                                            {r.created_at}
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                                        <div>
                                            <div className="text-gray-400">Jumlah</div>
                                            <div className="font-medium text-gray-800">{r.qty}</div>
                                        </div>
                                        <div>
                                            <div className="text-gray-400">Harga</div>
                                            <div className="font-medium text-gray-800">
                                                Rp{r.price.toLocaleString('id-ID')}
                                            </div>
                                        </div>
                                        <div className="col-span-2">
                                            <div className="text-gray-400">Total</div>
                                            <div className="font-bold text-gray-800">
                                                Rp{(r.qty * r.price).toLocaleString('id-ID')}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <p className="mt-2 text-xs text-slate-500 italic">
                            Daftar request item terbaru.
                        </p>
                    </Card>

                    {/* Riwayat Barang Masuk */}
                    <Card className="flex h-auto md:h-[400px] flex-col rounded-lg md:rounded-2xl border border-slate-200 bg-white p-3 md:p-4 shadow-md">
                        <div className="mb-3 flex items-center justify-between">
                            <h3 className="flex items-center gap-2 font-bold text-slate-800 text-base md:text-lg">
                                <Truck className="h-4 w-4 md:h-5 md:w-5 text-[#4789A8]" />
                                Riwayat Barang Masuk
                            </h3>
                        </div>

                        {/* Desktop Table */}
                        <div className="hidden md:block max-h-[280px] flex-1 overflow-y-auto rounded-xl">
                            <table className="w-full border-collapse text-center text-sm">
                                <thead className="sticky top-0 bg-slate-100 font-semibold text-slate-700">
                                    <tr>
                                        <th className="px-4 py-3">No</th>
                                        <th className="px-4 py-3 text-left">Item</th>
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

                        {/* Mobile Card View */}
                        <div className="md:hidden space-y-3">
                            {history.map((h: any, i: number) => (
                                <div key={i} className="border border-gray-200 rounded-lg p-3 hover:bg-slate-50">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <div className="font-semibold text-gray-800 text-sm">{h.item_name}</div>
                                            <div className="text-xs text-gray-500 mt-1">No: {i + 1}</div>
                                        </div>
                                        <div className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                                            {h.created_at}
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                                        <div>
                                            <div className="text-gray-400">Jumlah</div>
                                            <div className="font-medium text-gray-800">{h.qty}</div>
                                        </div>
                                        <div>
                                            <div className="text-gray-400">Harga</div>
                                            <div className="font-medium text-gray-800">
                                                Rp{h.price.toLocaleString('id-ID')}
                                            </div>
                                        </div>
                                        <div className="col-span-2">
                                            <div className="text-gray-400">Total</div>
                                            <div className="font-bold text-gray-800">
                                                Rp{(h.qty * h.price).toLocaleString('id-ID')}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
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