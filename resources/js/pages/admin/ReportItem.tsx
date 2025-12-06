'use client';

import { useState } from 'react';
import Header from '../../components/admin/dashboard/Header';
import Sidebar from '../../components/admin/dashboard/Sidebar';

export default function ReportItems() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

    return (
        <div className="flex min-h-screen bg-[#f5f7fa] font-[Poppins,Segoe_UI,system-ui,sans-serif] transition-all duration-300">
            {/* === SIDEBAR === */}
            <div
                className={`fixed top-0 left-0 z-150 h-full w-[260px] bg-white shadow-md transition-transform duration-300 ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <Sidebar />
            </div>

            {/* === MAIN CONTENT === */}
            <div
                className={`flex min-h-screen flex-1 flex-col transition-all duration-300 ${
                    isSidebarOpen ? 'ml-[260px]' : 'ml-0'
                }`}
            >
                {/* === HEADER === */}
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

                {/* === ISI HALAMAN REPORTS ITEMS === */}
                <div className="px-10 pb-10 flex flex-1 flex-col gap-8 pt-32 transition-all duration-300">
                    {/* Header Section */}
                    <div className="flex flex-col gap-6">
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-800">Laporan Pemesanan Barang</h1>
                            <p className="text-gray-600 mt-2">
                                Menampilkan laporan pemesanan barang per periode dengan analisis dan statistik lengkap
                            </p>
                        </div>

                        {/* Filter Period */}
                        <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-white p-6 shadow-sm">
                            <div className="flex items-center gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Periode Laporan</label>
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="date"
                                            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:border-[#4789A8] focus:outline-none focus:ring-2 focus:ring-[#4789A8]/20"
                                        />
                                        <span className="text-gray-500">sampai</span>
                                        <input
                                            type="date"
                                            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:border-[#4789A8] focus:outline-none focus:ring-2 focus:ring-[#4789A8]/20"
                                        />
                                    </div>
                                </div>
                                <button className="self-end rounded-lg bg-[#4789A8] px-6 py-2 text-sm font-medium text-white hover:bg-[#3a7691]">
                                    Generate Report
                                </button>
                            </div>
                            <div className="flex items-center gap-3">
                                <button className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm hover:bg-gray-50">
                                    <svg className="h-4 w-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    Export PDF
                                </button>
                                <button className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm hover:bg-gray-50">
                                    <svg className="h-4 w-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    Export Excel
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Summary Stats */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {/* Total Permintaan Barang */}
                        <div className="rounded-xl bg-white p-6 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">Total Permintaan</p>
                                    <p className="text-2xl font-bold text-gray-800 mt-2">1,248</p>
                                    <p className="text-xs text-gray-500 mt-1">Permintaan barang</p>
                                </div>
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#4789A8]/10">
                                    <svg className="h-6 w-6 text-[#4789A8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                </div>
                            </div>
                            <div className="mt-4 flex items-center text-xs">
                                <span className="text-green-500 font-medium">↑ 15%</span>
                                <span className="text-gray-500 ml-2">dari bulan sebelumnya</span>
                            </div>
                        </div>

                        {/* Barang Diproses */}
                        <div className="rounded-xl bg-white p-6 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">Barang Diproses</p>
                                    <p className="text-2xl font-bold text-gray-800 mt-2">845</p>
                                    <p className="text-xs text-gray-500 mt-1">Dalam proses</p>
                                </div>
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-100">
                                    <svg className="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                </div>
                            </div>
                            <div className="mt-4 flex items-center text-xs">
                                <span className="text-blue-500 font-medium">68%</span>
                                <span className="text-gray-500 ml-2">dari total permintaan</span>
                            </div>
                        </div>

                        {/* Barang Selesai */}
                        <div className="rounded-xl bg-white p-6 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">Barang Selesai</p>
                                    <p className="text-2xl font-bold text-gray-800 mt-2">378</p>
                                    <p className="text-xs text-gray-500 mt-1">Telah diterima</p>
                                </div>
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                                    <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="mt-4 flex items-center text-xs">
                                <span className="text-green-500 font-medium">↑ 8%</span>
                                <span className="text-gray-500 ml-2">peningkatan efisiensi</span>
                            </div>
                        </div>

                        {/* Rata-rata Waktu */}
                        <div className="rounded-xl bg-white p-6 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">Rata-rata Waktu</p>
                                    <p className="text-2xl font-bold text-gray-800 mt-2">3.2</p>
                                    <p className="text-xs text-gray-500 mt-1">Hari proses</p>
                                </div>
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                                    <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="mt-4 flex items-center text-xs">
                                <span className="text-red-500 font-medium">↓ 0.5 hari</span>
                                <span className="text-gray-500 ml-2">lebih cepat</span>
                            </div>
                        </div>
                    </div>

                    {/* Charts and Analysis Section */}
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {/* Grafik Bulanan */}
                        <div className="rounded-xl bg-white p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800">Grafik Permintaan Bulanan</h3>
                                    <p className="text-sm text-gray-600">Trend permintaan barang per bulan</p>
                                </div>
                                <select className="rounded-lg border border-gray-300 bg-white px-3 py-1 text-sm">
                                    <option>Tahun 2024</option>
                                    <option>Tahun 2023</option>
                                    <option>Tahun 2022</option>
                                </select>
                            </div>
                            {/* Placeholder Chart */}
                            <div className="h-64 w-full flex items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-gray-50">
                                <div className="text-center">
                                    <svg className="h-12 w-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                    <p className="text-gray-500">Grafik akan ditampilkan di sini</p>
                                </div>
                            </div>
                            <div className="mt-6 grid grid-cols-3 gap-4">
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-[#4789A8]">248</p>
                                    <p className="text-xs text-gray-600">Januari</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-[#4789A8]">312</p>
                                    <p className="text-xs text-gray-600">Februari</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-[#4789A8]">289</p>
                                    <p className="text-xs text-gray-600">Maret</p>
                                </div>
                            </div>
                        </div>

                        {/* Barang Paling Sering Dipesan */}
                        <div className="rounded-xl bg-white p-6 shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-800 mb-6">Barang Paling Sering Dipesan</h3>
                            <div className="space-y-4">
                                {[
                                    { name: 'Kertas A4', count: 156, percentage: 85 },
                                    { name: 'Tinta Printer', count: 128, percentage: 70 },
                                    { name: 'Bolt Note', count: 98, percentage: 53 },
                                    { name: 'Pulpen Standard', count: 76, percentage: 41 },
                                    { name: 'Stapler & Isi', count: 54, percentage: 29 }
                                ].map((item, index) => (
                                    <div key={index} className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-sm font-medium text-gray-800">
                                                {index + 1}
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-sm font-medium text-gray-800">{item.name}</p>
                                                <p className="text-xs text-gray-500">{item.count} permintaan</p>
                                            </div>
                                        </div>
                                        <div className="w-32">
                                            <div className="h-2 w-full rounded-full bg-gray-200">
                                                <div 
                                                    className="h-2 rounded-full bg-[#4789A8]" 
                                                    style={{ width: `${item.percentage}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Departemen dan Detail */}
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {/* Departemen dengan Permintaan Terbanyak */}
                        <div className="rounded-xl bg-white p-6 shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-800 mb-6">Departemen dengan Permintaan Terbanyak</h3>
                            <div className="space-y-6">
                                {[
                                    { dept: 'IT Department', requests: 342, budget: 'Rp 245.8jt', color: 'bg-blue-100 text-blue-800' },
                                    { dept: 'HR Department', requests: 289, budget: 'Rp 189.3jt', color: 'bg-purple-100 text-purple-800' },
                                    { dept: 'Finance Department', requests: 267, budget: 'Rp 156.7jt', color: 'bg-green-100 text-green-800' },
                                    { dept: 'Marketing Department', requests: 198, budget: 'Rp 134.2jt', color: 'bg-yellow-100 text-yellow-800' },
                                    { dept: 'Operations Department', requests: 152, budget: 'Rp 98.5jt', color: 'bg-red-100 text-red-800' }
                                ].map((dept, index) => (
                                    <div key={index} className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${dept.color}`}>
                                                {dept.dept.charAt(0)}
                                            </div>
                                            <div className="ml-4">
                                                <p className="font-medium text-gray-800">{dept.dept}</p>
                                                <p className="text-xs text-gray-500">{dept.requests} permintaan</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-medium text-gray-800">{dept.budget}</p>
                                            <p className="text-xs text-gray-500">Total anggaran</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Rekap Status Permintaan */}
                        <div className="rounded-xl bg-white p-6 shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-800 mb-6">Rekap Status Permintaan</h3>
                            <div className="space-y-6">
                                {[
                                    { status: 'Pending Approval', count: 156, color: 'bg-yellow-500' },
                                    { status: 'Approved', count: 289, color: 'bg-green-500' },
                                    { status: 'In Process', count: 345, color: 'bg-blue-500' },
                                    { status: 'Delivered', count: 378, color: 'bg-[#4789A8]' },
                                    { status: 'Rejected', count: 23, color: 'bg-red-500' }
                                ].map((item, index) => (
                                    <div key={index}>
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-sm font-medium text-gray-700">{item.status}</span>
                                            <span className="text-sm font-medium text-gray-800">{item.count}</span>
                                        </div>
                                        <div className="h-2 w-full rounded-full bg-gray-200">
                                            <div 
                                                className={`h-2 rounded-full ${item.color}`}
                                                style={{ width: `${(item.count / 1191) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-8 grid grid-cols-2 gap-4 border-t pt-6">
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-gray-800">94%</p>
                                    <p className="text-sm text-gray-600">Rate Penyelesaian</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-gray-800">4.7/5</p>
                                    <p className="text-sm text-gray-600">Kepuasan Pengguna</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Requests Table */}
                    <div className="rounded-xl bg-white shadow-sm">
                        <div className="border-b border-gray-200 px-6 py-4">
                            <h3 className="text-lg font-semibold text-gray-800">Permintaan Terbaru</h3>
                            <p className="text-sm text-gray-600">10 permintaan barang terakhir</p>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-200 bg-gray-50">
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">ID Request</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Tanggal</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Departemen</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Barang</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Jumlah</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {[
                                        { id: 'REQ-02456', date: '12 Mar 2024', dept: 'IT Dept', item: 'Laptop Dell XPS 13', qty: 2, status: 'Approved' },
                                        { id: 'REQ-02455', date: '11 Mar 2024', dept: 'HR Dept', item: 'Kertas A4', qty: '50 rim', status: 'Delivered' },
                                        { id: 'REQ-02454', date: '10 Mar 2024', dept: 'Finance', item: 'Printer Epson', qty: 1, status: 'In Process' },
                                        { id: 'REQ-02453', date: '09 Mar 2024', dept: 'Marketing', item: 'Whiteboard', qty: 3, status: 'Pending' },
                                        { id: 'REQ-02452', date: '08 Mar 2024', dept: 'Operations', item: 'AC Portable', qty: 2, status: 'Approved' }
                                    ].map((req, index) => (
                                        <tr key={index} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                <span className="font-medium text-gray-800">{req.id}</span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-600">{req.date}</td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-800">
                                                    {req.dept}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 font-medium text-gray-800">{req.item}</td>
                                            <td className="px-6 py-4 text-gray-600">{req.qty}</td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                                                    req.status === 'Approved' ? 'bg-green-100 text-green-800' :
                                                    req.status === 'Delivered' ? 'bg-[#4789A8] text-white' :
                                                    req.status === 'In Process' ? 'bg-blue-100 text-blue-800' :
                                                    'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                    {req.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}