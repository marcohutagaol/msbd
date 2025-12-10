
'use client';

import { useState } from 'react';
import Header from '../../components/admin/dashboard/Header';
import Sidebar from '../../components/admin/dashboard/Sidebar';

export default function LogRequest() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

    return (
        <div className="flex min-h-screen bg-gray-50 font-[Poppins,Segoe_UI,system-ui,sans-serif] transition-all duration-300">
            {/* === SIDEBAR === */}
            <div
                className={`fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-lg transition-all duration-300 ease-in-out ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <Sidebar />
            </div>

            {/* === MAIN CONTENT === */}
            <div
                className={`flex min-h-screen flex-1 flex-col transition-all duration-300 ease-in-out ${
                    isSidebarOpen ? 'ml-64' : 'ml-0'
                }`}
            >
                {/* === HEADER === */}
                <div
                    className={`fixed top-0 z-40 flex h-16 w-full items-center bg-white shadow-md transition-all duration-300 ease-in-out ${
                        isSidebarOpen ? 'left-64' : 'left-0'
                    }`}
                >
                    <div className="flex w-full items-center justify-between px-6">
                        <button
                            onClick={toggleSidebar}
                            className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-gray-100"
                        >
                            {isSidebarOpen ? (
                                  <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                                </svg>
                            ) : (
                                <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                                </svg>
                            )}
                        </button>
                        <div className="flex items-center space-x-4">
                            <div className="text-right">
                                <p className="text-sm font-medium text-gray-800">Admin Dashboard</p>
                                <p className="text-xs text-gray-500">Log Request Barang</p>
                            </div>
                            <div className="h-8 w-8 rounded-full bg-[#4789A8]"></div>
                        </div>
                    </div>
                </div>

                {/* === ISI HALAMAN LOG REQUEST === */}
                <div className={`mt-16 flex-1 p-6 transition-all duration-300 ${isSidebarOpen ? 'px-8' : 'px-6'}`}>
                    {/* Header Section */}
                    <div className="mb-8">
                        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-800">Log Request Barang</h1>
                                <p className="mt-1 text-gray-600">
                                    Riwayat perubahan request barang (Add/Edit/Delete) yang dilakukan oleh admin atau HR
                                </p>
                            </div>
                            <div className="flex flex-wrap items-center gap-3">
                                <div className="relative flex-1 min-w-[200px]">
                                    <input
                                        type="text"
                                        placeholder="Cari log..."
                                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 pl-10 text-sm focus:border-[#4789A8] focus:outline-none focus:ring-2 focus:ring-[#4789A8]/20"
                                    />
                                    <svg
                                        className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <select className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:border-[#4789A8] focus:outline-none focus:ring-2 focus:ring-[#4789A8]/20">
                                    <option value="">Semua Tipe</option>
                                    <option value="add">Add</option>
                                    <option value="edit">Edit</option>
                                    <option value="delete">Delete</option>
                                </select>
                                <select className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:border-[#4789A8] focus:outline-none focus:ring-2 focus:ring-[#4789A8]/20">
                                    <option value="">Semua User</option>
                                    <option value="admin">Admin</option>
                                    <option value="hr">HR</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="rounded-xl bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Total Log</p>
                                    <p className="mt-2 text-2xl font-bold text-gray-800">1,248</p>
                                </div>
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#4789A8]/10">
                                    <svg className="h-6 w-6 text-[#4789A8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="mt-4 text-xs text-gray-500">
                                <span className="font-medium text-green-500">↑ 12%</span> dari bulan lalu
                            </div>
                        </div>

                        <div className="rounded-xl bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Add Request</p>
                                    <p className="mt-2 text-2xl font-bold text-gray-800">843</p>
                                </div>
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-50">
                                    <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                </div>
                            </div>
                            <div className="mt-4 text-xs text-gray-500">
                                <span className="font-medium">68%</span> dari total log
                            </div>
                        </div>

                        <div className="rounded-xl bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Edit Request</p>
                                    <p className="mt-2 text-2xl font-bold text-gray-800">312</p>
                                </div>
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50">
                                    <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="mt-4 text-xs text-gray-500">
                                <span className="font-medium">25%</span> dari total log
                            </div>
                        </div>

                        <div className="rounded-xl bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Delete Request</p>
                                    <p className="mt-2 text-2xl font-bold text-gray-800">93</p>
                                </div>
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-50">
                                    <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </div>
                            </div>
                            <div className="mt-4 text-xs text-gray-500">
                                <span className="font-medium">7%</span> dari total log
                            </div>
                        </div>
                    </div>

                    {/* Log Table */}
                    <div className="mb-8 overflow-hidden rounded-xl bg-white shadow-sm">
                        <div className="border-b border-gray-100 px-6 py-4">
                            <h2 className="text-lg font-semibold text-gray-800">Riwayat Perubahan</h2>
                            <p className="text-sm text-gray-600">Log aktivitas request barang terbaru</p>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[1000px]">
                                <thead>
                                    <tr className="border-b border-gray-100 bg-gray-50/50">
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                            ID Log
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                            Waktu
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                            User
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                            Tipe
                                        </th>
                                        <th className="px 6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                            Request ID
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                            Detail Perubahan
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {/* Row 1 */}
                                    <tr className="transition-colors duration-200 hover:bg-gray-50/50">
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <span className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800">
                                                LOG-001248
                                            </span>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <div className="font-medium text-gray-900">12 Mar 2024</div>
                                            <div className="text-xs text-gray-500">14:30:22</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#4789A8] text-sm font-medium text-white">
                                                    AD
                                                </div>
                                                <div className="ml-3">
                                                    <div className="font-medium text-gray-900">Admin User</div>
                                                    <div className="text-xs text-gray-500">admin@example.com</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
                                                Add
                                            </span>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">REQ-00567</td>
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-gray-900">Menambahkan request barang baru</div>
                                            <div className="mt-1 text-xs text-gray-500">Printer Epson L3210 - 2 unit</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
                                                Success
                                            </span>
                                        </td>
                                    </tr>

                                    {/* Row 2 */}
                                    <tr className="transition-colors duration-200 hover:bg-gray-50/50">
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <span className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800">
                                                LOG-001247
                                            </span>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <div className="font-medium text-gray-900">12 Mar 2024</div>
                                            <div className="text-xs text-gray-500">11:15:10</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-500 text-sm font-medium text-white">
                                                    HR
                                                </div>
                                                <div className="ml-3">
                                                    <div className="font-medium text-gray-900">HR Manager</div>
                                                    <div className="text-xs text-gray-500">hr@example.com</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
                                                Edit
                                            </span>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">REQ-00342</td>
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-gray-900">Mengubah jumlah dan status request</div>
                                            <div className="mt-1 text-xs text-gray-500">Kertas A4 dari 10 → 15 rim, status: pending → approved</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
                                                Success
                                            </span>
                                        </td>
                                    </tr>

                                    {/* Row 3 */}
                                    <tr className="transition-colors duration-200 hover:bg-gray-50/50">
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <span className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800">
                                                LOG-001246
                                            </span>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <div className="font-medium text-gray-900">11 Mar 2024</div>
                                            <div className="text-xs text-gray-500">16:45:33</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#4789A8] text-sm font-medium text-white">
                                                    AD
                                                </div>
                                                <div className="ml-3">
                                                    <div className="font-medium text-gray-900">Admin System</div>
                                                    <div className="text-xs text-gray-500">system@example.com</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-800">
                                                Delete
                                            </span>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">REQ-00289</td>
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-gray-900">Menghapus request barang yang sudah expired</div>
                                            <div className="mt-1 text-xs text-gray-500">Mouse wireless Logitech - 5 unit</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
                                                Success
                                            </span>
                                        </td>
                                    </tr>

                                    {/* Row 4 */}
                                    <tr className="transition-colors duration-200 hover:bg-gray-50/50">
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <span className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800">
                                                LOG-001245
                                            </span>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <div className="font-medium text-gray-900">11 Mar 2024</div>
                                            <div className="text-xs text-gray-500">09:20:15</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#4789A8] text-sm font-medium text-white">
                                                    AD
                                                </div>
                                                <div className="ml-3">
                                                    <div className="font-medium text-gray-900">Admin User</div>
                                                    <div className="text-xs text-gray-500">admin@example.com</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
                                                Add
                                            </span>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">REQ-00566</td>
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-gray-900">Menambahkan request ATK untuk divisi IT</div>
                                            <div className="mt-1 text-xs text-gray-500">Flashdisk 32GB - 10 unit, Cable HDMI - 5 unit</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800">
                                                Pending
                                            </span>
                                        </td>
                                    </tr>

                                    {/* Row 5 */}
                                    <tr className="transition-colors duration-200 hover:bg-gray-50/50">
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <span className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800">
                                                LOG-001244
                                            </span>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <div className="font-medium text-gray-900">10 Mar 2024</div>
                                            <div className="text-xs text-gray-500">13:55:42</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-500 text-sm font-medium text-white">
                                                    HR
                                                </div>
                                                <div className="ml-3">
                                                    <div className="font-medium text-gray-900">HR Staff</div>
                                                    <div className="text-xs text-gray-500">hrstaff@example.com</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
                                                Edit
                                            </span>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">REQ-00123</td>
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-gray-900">Memperbarui tanggal pengiriman</div>
                                            <div className="mt-1 text-xs text-gray-500">Dari 15 Mar → 18 Mar 2024</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
                                                Success
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="flex flex-col items-center justify-between border-t border-gray-100 px-6 py-4 sm:flex-row">
                            <div className="mb-4 text-sm text-gray-700 sm:mb-0">
                                Menampilkan <span className="font-medium">1-5</span> dari{' '}
                                <span className="font-medium">1,248</span> log
                            </div>
                            <div className="flex items-center space-x-2">
                                <button className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
                                    Previous
                                </button>
                                <button className="rounded-lg bg-[#4789A8] px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-[#3a7691]">
                                    1
                                </button>
                                <button className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
                                    2
                                </button>
                                <button className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
                                    3
                                </button>
                                <span className="px-2 text-gray-500">...</span>
                                <button className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
                                    25
                                </button>
                                <button className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Export Section */}
                    <div className="rounded-xl bg-white p-6 shadow-sm">
                        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">Export Log Data</h3>
                                <p className="text-sm text-gray-600">Download riwayat log dalam berbagai format</p>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                <button className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    Export PDF
                                </button>
                                <button className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    Export CSV
                                </button>
                                <button className="flex items-center gap-2 rounded-lg bg-[#4789A8] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#3a7691]">
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                    Download All Logs
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
