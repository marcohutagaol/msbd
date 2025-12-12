'use client';

import { usePage } from '@inertiajs/react';
import { useMemo, useState, useEffect } from 'react';
import Sidebar from '../../components/admin/dashboard/Sidebar';

type LogRequestItem = {
    log_id: string;
    tanggal: string;
    jam: string;
    user: string;
    email: string;
    type: string;
    request_id: string;
    detail: string;
    status: string;
    role?: string;
};

export default function LogRequest() {
    const [search, setSearch] = useState('');
    const [type, setType] = useState('');
    const [user, setUser] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    const { logs, stats } = usePage().props as any;

    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 10;

    // Deteksi ukuran layar
    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkIfMobile();
        window.addEventListener("resize", checkIfMobile);
        return () => window.removeEventListener("resize", checkIfMobile);
    }, []);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const mapStatusToType = (status: string) => {
        if (status === 'Pending') return 'add';
        if (status === 'Approved' || status === 'Completed') return 'edit';
        if (status === 'Rejected') return 'delete';
        return '';
    };

    // FRONTEND FILTER
    const filteredLogs = useMemo(() => {
        return logs.data.filter((log: any) => {
            const matchesSearch =
                search === '' ||
                log.log_id.toLowerCase().includes(search.toLowerCase()) ||
                log.user?.toLowerCase().includes(search.toLowerCase()) ||
                log.detail?.toLowerCase().includes(search.toLowerCase());

            const matchesType =
                type === '' ||
                mapStatusToType(log.status).toLowerCase() === type.toLowerCase();

            const matchesUser =
                user === '' || (log.role?.toLowerCase() === user.toLowerCase());

            return matchesSearch && matchesType && matchesUser;
        });
    }, [logs.data, search, type, user]);

    // PAGINATION FRONTEND
    const totalPages = Math.ceil(filteredLogs.length / ITEMS_PER_PAGE);
    const paginatedLogs = filteredLogs.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE,
    );

    const exportLogsCSV = () => {
        if (!logs.data || logs.data.length === 0) return;

        const headers = [
            'ID Log',
            'Tanggal',
            'Jam',
            'User',
            'Email',
            'Type',
            'Request ID',
            'Detail',
            'Status',
        ];

        const rows = logs.data.map((log: LogRequestItem) => [
            log.log_id,
            log.tanggal,
            log.jam,
            log.user,
            log.email,
            log.type,
            log.request_id,
            log.detail,
            log.status,
        ]);

        const csv = [headers, ...rows]
            .map((row) =>
                row.map((cell: string | number) => `"${String(cell).replace(/"/g, '""')}"`).join(','),
            )
            .join('\n');

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.setAttribute(
            'download',
            `log_request_${new Date().toISOString().split('T')[0]}.csv`,
        );
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(url);
    };

    return (
        <div className="flex min-h-screen bg-gray-50 font-[Poppins,Segoe_UI,system-ui,sans-serif] transition-all duration-300">

            {/* SIDEBAR */}
            <div
                className={`fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-lg transition-all duration-300 ease-in-out ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } ${isMobile ? 'md:block' : ''}`}
            >
                <Sidebar />
            </div>

            {/* OVERLAY UNTUK MOBILE */}
            {isMobile && isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={toggleSidebar}
                />
            )}

            {/* MAIN CONTENT */}
            <div
                className={`flex min-h-screen flex-1 flex-col transition-all duration-300 ease-in-out w-full ${
                    isSidebarOpen ? 'md:ml-64' : 'ml-0'
                }`}
            >

                {/* HEADER */}
                <div
                    className={`fixed top-0 z-40 flex h-16 w-full items-center bg-white shadow-md transition-all duration-300 ease-in-out ${
                        isSidebarOpen ? 'md:left-64 md:w-[calc(100%-256px)]' : 'left-0'
                    }`}
                >
                    <div className="flex w-full items-center justify-between px-4 md:px-6">
                        <button
                            onClick={toggleSidebar}
                            className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-gray-100"
                        >
                            <svg
                                className="h-5 w-5 text-gray-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h7"
                                />
                            </svg>
                        </button>

                       
                    </div>
                </div>

                {/* CONTENT */}
                <div className={`mt-16 flex-1 p-4 md:p-6 lg:p-8 transition-all duration-300`}>
                    
                    {/* HEADER & FILTER SECTION */}
                    <div className="mb-6 md:mb-8">
                        <div className="flex flex-col gap-4 md:gap-0 md:flex-row md:items-center md:justify-between">
                            <div className="mb-4 md:mb-0">
                                <h1 className="text-xl md:text-2xl font-bold text-gray-800">
                                    Log Request Barang
                                </h1>
                                <p className="mt-1 text-sm text-gray-600">
                                    Riwayat perubahan request barang (Add/Edit/Delete)
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                                {/* SEARCH */}
                                <div className="relative flex-1 sm:min-w-[200px]">
                                    <input
                                        type="text"
                                        placeholder="Cari log..."
                                        value={search}
                                        onChange={(e) => {
                                            setCurrentPage(1);
                                            setSearch(e.target.value);
                                        }}
                                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 pl-10 text-sm focus:border-[#4789A8] focus:ring-2 focus:ring-[#4789A8]/20 focus:outline-none"
                                    />
                                    <svg
                                        className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                </div>

                                {/* TYPE FILTER - Desktop */}
                                <select
                                    value={type}
                                    onChange={(e) => {
                                        setCurrentPage(1);
                                        setType(e.target.value);
                                    }}
                                    className="hidden sm:block rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:border-[#4789A8] focus:ring-2 focus:ring-[#4789A8]/20 focus:outline-none"
                                >
                                    <option value="">Semua Tipe</option>
                                    <option value="add">Add</option>
                                    <option value="edit">Edit</option>
                                    <option value="delete">Delete</option>
                                </select>

                                {/* USER FILTER - Desktop */}
                                <select
                                    value={user}
                                    onChange={(e) => {
                                        setCurrentPage(1);
                                        setUser(e.target.value);
                                    }}
                                    className="hidden sm:block rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:border-[#4789A8] focus:ring-2 focus:ring-[#4789A8]/20 focus:outline-none"
                                >
                                    <option value="">Semua User</option>
                                    <option value="admin">Admin</option>
                                    <option value="manager">Manager</option>
                                    <option value="purchaser">Purchaser</option>
                                    <option value="karyawan">Karyawan</option>
                                </select>

                                {/* FILTER BUTTONS FOR MOBILE */}
                                <div className="flex gap-2 sm:hidden">
                                    <select
                                        value={type}
                                        onChange={(e) => {
                                            setCurrentPage(1);
                                            setType(e.target.value);
                                        }}
                                        className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-[#4789A8] focus:ring-2 focus:ring-[#4789A8]/20 focus:outline-none"
                                    >
                                        <option value="">Semua Tipe</option>
                                        <option value="add">Add</option>
                                        <option value="edit">Edit</option>
                                        <option value="delete">Delete</option>
                                    </select>

                                    <select
                                        value={user}
                                        onChange={(e) => {
                                            setCurrentPage(1);
                                            setUser(e.target.value);
                                        }}
                                        className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-[#4789A8] focus:ring-2 focus:ring-[#4789A8]/20 focus:outline-none"
                                    >
                                        <option value="">Semua User</option>
                                        <option value="admin">Admin</option>
                                        <option value="manager">Manager</option>
                                        <option value="purchaser">Purchaser</option>
                                        <option value="karyawan">Karyawan</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* STATS CARDS - RESPONSIVE */}
                    <div className="mb-6 md:mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        {/* Total Log Card */}
                        <div className="rounded-xl bg-white p-4 md:p-6 shadow-sm transition-all duration-300 hover:shadow-md">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs md:text-sm font-medium text-gray-500">
                                        Total Log
                                    </p>
                                    <p className="mt-1 md:mt-2 text-xl md:text-2xl font-bold text-gray-800">
                                        {stats.total}
                                    </p>
                                </div>
                                <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-lg bg-[#4789A8]/10">
                                    <svg
                                        className="h-5 w-5 md:h-6 md:w-6 text-[#4789A8]"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <div className="mt-3 text-xs text-gray-500">
                                <span className="font-medium text-green-500">↑ 12%</span> dari bulan lalu
                            </div>
                        </div>

                        {/* Add Request Card */}
                        <div className="rounded-xl bg-white p-4 md:p-6 shadow-sm transition-all duration-300 hover:shadow-md">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs md:text-sm font-medium text-gray-500">
                                        Add Request
                                    </p>
                                    <p className="mt-1 md:mt-2 text-xl md:text-2xl font-bold text-gray-800">
                                        {stats.add}
                                    </p>
                                </div>
                                <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-lg bg-green-50">
                                    <svg
                                        className="h-5 w-5 md:h-6 md:w-6 text-green-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 4v16m8-8H4"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <div className="mt-3 text-xs text-gray-500">
                                <span className="font-medium">68%</span> dari total log
                            </div>
                        </div>

                        {/* Edit Request Card */}
                        <div className="rounded-xl bg-white p-4 md:p-6 shadow-sm transition-all duration-300 hover:shadow-md">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs md:text-sm font-medium text-gray-500">
                                        Edit Request
                                    </p>
                                    <p className="mt-1 md:mt-2 text-xl md:text-2xl font-bold text-gray-800">
                                        {stats.edit}
                                    </p>
                                </div>
                                <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-lg bg-blue-50">
                                    <svg
                                        className="h-5 w-5 md:h-6 md:w-6 text-blue-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <div className="mt-3 text-xs text-gray-500">
                                <span className="font-medium">25%</span> dari total log
                            </div>
                        </div>

                        {/* Delete Request Card */}
                        <div className="rounded-xl bg-white p-4 md:p-6 shadow-sm transition-all duration-300 hover:shadow-md">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs md:text-sm font-medium text-gray-500">
                                        Delete Request
                                    </p>
                                    <p className="mt-1 md:mt-2 text-xl md:text-2xl font-bold text-gray-800">
                                        {stats.delete}
                                    </p>
                                </div>
                                <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-lg bg-red-50">
                                    <svg
                                        className="h-5 w-5 md:h-6 md:w-6 text-red-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <div className="mt-3 text-xs text-gray-500">
                                <span className="font-medium">7%</span> dari total log
                            </div>
                        </div>
                    </div>

                    {/* TABLE SECTION */}
                    <div className="mb-6 md:mb-8 overflow-hidden rounded-xl bg-white shadow-sm">
                        <div className="border-b border-gray-100 px-4 md:px-6 py-4">
                            <h2 className="text-lg font-semibold text-gray-800">
                                Riwayat Perubahan
                            </h2>
                            <p className="text-sm text-gray-600">
                                Log aktivitas request barang terbaru
                            </p>
                        </div>

                        {/* DESKTOP TABLE */}
                        <div className="hidden md:block overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-100 bg-gray-50/50">
                                        <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                            ID Log
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                            Waktu
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                            User
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                            Tipe
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                            Request ID
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                            Detail Perubahan
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {paginatedLogs.map((log: any, i: number) => (
                                        <tr key={i} className="transition-colors duration-200 hover:bg-gray-50/50">
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <span className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800">
                                                    {log.log_id}
                                                </span>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <div className="font-medium text-gray-900">{log.tanggal}</div>
                                                <div className="text-xs text-gray-500">{log.jam}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#4789A8] text-sm font-medium text-white">
                                                        {log.user.substring(0, 2).toUpperCase()}
                                                    </div>
                                                    <div className="ml-3">
                                                        <div className="font-medium text-gray-900">{log.user}</div>
                                                        <div className="text-xs text-gray-500">{log.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                                                    log.type === 'Add' ? 'bg-green-100 text-green-800' :
                                                    log.type === 'Edit' ? 'bg-blue-100 text-blue-800' :
                                                    'bg-red-100 text-red-800'
                                                }`}>
                                                    {log.type}
                                                </span>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                                                {log.request_id}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-gray-900">{log.detail}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                                                    log.status === 'Success' || log.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                                    'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                    {log.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* MOBILE CARD VIEW */}
                        <div className="md:hidden divide-y divide-gray-100">
                            {paginatedLogs.map((log: any, i: number) => (
                                <div key={i} className="p-4 hover:bg-gray-50/50 transition-colors duration-200">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-start space-x-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#4789A8] text-sm font-medium text-white flex-shrink-0">
                                                {log.user.substring(0, 2).toUpperCase()}
                                            </div>
                                            <div>
                                                <div className="font-medium text-gray-900 text-sm">{log.user}</div>
                                                <div className="text-xs text-gray-500 mt-1">{log.email}</div>
                                            </div>
                                        </div>
                                        <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                                            log.type === 'Add' ? 'bg-green-100 text-green-800' :
                                            log.type === 'Edit' ? 'bg-blue-100 text-blue-800' :
                                            'bg-red-100 text-red-800'
                                        }`}>
                                            {log.type}
                                        </span>
                                    </div>
                                    
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">ID Log:</span>
                                            <span className="font-medium text-gray-900">{log.log_id}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Waktu:</span>
                                            <span className="font-medium text-gray-900">{log.tanggal} {log.jam}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Request ID:</span>
                                            <span className="font-medium text-gray-900">{log.request_id}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-500 block mb-1">Detail:</span>
                                            <p className="text-gray-900">{log.detail}</p>
                                        </div>
                                        <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                                            <span className="text-gray-500">Status:</span>
                                            <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                                                log.status === 'Success' || log.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                                'bg-yellow-100 text-yellow-800'
                                            }`}>
                                                {log.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* PAGINATION */}
                        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-gray-100 px-4 md:px-6 py-4 gap-4">
                            <div className="text-sm text-gray-700">
                                Menampilkan{' '}
                                <span className="font-medium">
                                    {(currentPage - 1) * ITEMS_PER_PAGE + 1}
                                </span>{' '}
                                -
                                <span className="font-medium">
                                    {Math.min(currentPage * ITEMS_PER_PAGE, filteredLogs.length)}
                                </span>{' '}
                                dari{' '}
                                <span className="font-medium">{filteredLogs.length}</span> log
                            </div>

                            <div className="flex items-center space-x-2 overflow-x-auto pb-2 sm:pb-0">
                                <button
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage(currentPage - 1)}
                                    className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 disabled:opacity-40 min-w-[80px]"
                                >
                                    Previous
                                </button>

                                {[...Array(totalPages)].map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentPage(i + 1)}
                                        className={`rounded-lg px-3 py-1.5 text-sm font-medium min-w-[40px] ${
                                            currentPage === i + 1
                                                ? 'bg-[#4789A8] text-white'
                                                : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                                        }`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}

                                <button
                                    disabled={currentPage === totalPages}
                                    onClick={() => setCurrentPage(currentPage + 1)}
                                    className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 disabled:opacity-40 min-w-[80px]"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* EXPORT SECTION */}
                    <div className="rounded-xl bg-white p-4 md:p-6 shadow-sm">
                        <div className="flex flex-col sm:flex-row justify-between gap-4">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">
                                    Export Log Data
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Download riwayat log dalam berbagai format
                                </p>
                            </div>
                            <button
                                onClick={exportLogsCSV}
                                className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 sm:w-auto w-full"
                            >
                                <svg
                                    className="h-4 w-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                </svg>
                                Export CSV
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}