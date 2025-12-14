'use client';

import { Card } from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { usePage } from '@inertiajs/react';
import { Building2, Filter, PackageSearch, Search, AlertTriangle, CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import Header from '../../components/admin/dashboard/Header';
import Sidebar from '../../components/admin/dashboard/Sidebar';

interface Inventory {
    id: number;
    nama_barang: string;
    department: string;
    stok: number;
}

export default function InventoryPage() {
    const { props } = usePage();
    const inventories = props.inventories as Inventory[];

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
    const [filterDept, setFilterDept] = useState('semua');
    const [filterStok, setFilterStok] = useState('semua');
    const [search, setSearch] = useState('');

    // Deteksi ukuran layar untuk responsif
    useEffect(() => {
        const checkIfMobile = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            
            // Pada mobile, sidebar default tertutup
            if (mobile && isSidebarOpen) {
                setIsSidebarOpen(false);
            }
            // Pada desktop, sidebar default terbuka
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

    // === OPTIONS UNTUK DROPDOWN ===
    const deptList = [
        { kode: "FNB", nama: "Food & Beverage" },
        { kode: "FO", nama: "Front Office" },
        { kode: "HK", nama: "Housekeeping" },
        { kode: "LS", nama: "Landscape" },
        { kode: "ENG", nama: "Engineering & Maintenance" },
        { kode: "SEC", nama: "Security" },
        { kode: "ACC", nama: "Accounting & Administration" },
        { kode: "MKT", nama: "Marketing" },
    ];

    // === FILTER DATA ===
    const filteredItems = inventories.filter((item) => {
        const matchesSearch = item.nama_barang
            .toLowerCase()
            .includes(search.toLowerCase());
        const matchesDept =
            filterDept === 'semua' || item.department === filterDept;
        const needsRestock = item.stok <= 5;
        const matchesStok =
            filterStok === 'semua' ||
            (filterStok === 'aman' && !needsRestock) ||
            (filterStok === 'restock' && needsRestock);
        return matchesSearch && matchesDept && matchesStok;
    });

    // === STATISTIK ===
    const totalBarang = inventories.length;
    const butuhRestok = inventories.filter((i) => i.stok <= 5).length;
    const stokAman = totalBarang - butuhRestok;

    // === STATUS BADGE ===
    const getStatusBadge = (stok: number, isMobile = false) => {
        const needsRestock = stok <= 5;
        const status = needsRestock ? 'Butuh Restok' : 'Stok Aman';
        const bg = needsRestock ? 'rgba(239, 68, 68, 0.12)' : 'rgba(22, 163, 74, 0.12)';
        const border = needsRestock ? '#fca5a5' : '#86efac';
        const color = needsRestock ? '#dc2626' : '#16a34a';
        
        return (
            <div className={`flex items-center gap-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full font-medium ${
                    needsRestock ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'
                }`}>
                    {needsRestock ? (
                        <AlertTriangle className="w-3 h-3 mr-1" />
                    ) : (
                        <CheckCircle className="w-3 h-3 mr-1" />
                    )}
                    {status}
                </span>
            </div>
        );
    };

    return (
        <div className="flex min-h-screen bg-[#f5f7fa] font-[Poppins,Segoe_UI,system-ui,sans-serif]">
            {/* === SIDEBAR === */}
            <div
                className={`hidden md:block fixed top-0 left-0 z-50 h-full w-[260px] bg-white shadow-md transition-transform duration-300 ${
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

            {/* === MAIN === */}
            <div
                className={`flex flex-1 flex-col transition-all duration-300 w-full ${
                    isSidebarOpen ? 'md:ml-[260px]' : 'ml-0'
                }`}
            >
                {/* === HEADER === */}
                <div
                    className={`fixed top-0 right-0 z-40 bg-white shadow-sm transition-all duration-300 w-full ${
                        isSidebarOpen ? 'md:left-[260px] md:w-[calc(100%-260px)]' : 'left-0'
                    }`}
                >
                    <Header
                        isSidebarOpen={isSidebarOpen}
                        onToggleSidebar={toggleSidebar}
                    />
                </div>

                {/* === CONTENT === */}
                <div className="px-4 sm:px-6 lg:px-8 pb-6 flex flex-col flex-1 gap-4 md:gap-6 pt-20 md:pt-28 transition-all duration-300">
                    {/* Header dengan icon */}
                    <div className="flex items-center gap-3">
                        <div className="p-2 md:p-3 bg-[#4789A8]/10 rounded-lg">
                            <PackageSearch className="w-5 h-5 md:w-6 md:h-6 text-[#4789A8]" />
                        </div>
                        <div>
                            <h1 className="text-xl md:text-2xl font-semibold text-slate-800">
                                Inventaris Barang
                            </h1>
                            <p className="text-gray-600 text-sm md:text-base mt-1">
                                Manajemen stok barang seluruh departemen
                            </p>
                        </div>
                    </div>

                    {/* === STATISTIK === */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-5">
                        <Card className="rounded-lg md:rounded-xl border border-slate-200 bg-white p-4 md:p-5 shadow-sm">
                            <p className="text-xs md:text-sm text-slate-500">Total Barang</p>
                            <p className="text-xl md:text-2xl font-bold text-slate-700 mt-1">
                                {totalBarang}
                            </p>
                            <div className="flex items-center gap-1 mt-2 text-xs md:text-sm text-slate-500">
                                <PackageSearch className="w-3 h-3 md:w-4 md:h-4" />
                                <span>jenis barang</span>
                            </div>
                        </Card>
                        <Card className="rounded-lg md:rounded-xl border border-slate-200 bg-white p-4 md:p-5 shadow-sm">
                            <p className="text-xs md:text-sm text-slate-500">Stok Aman</p>
                            <p className="text-xl md:text-2xl font-bold text-green-600 mt-1">
                                {stokAman}
                            </p>
                            <div className="flex items-center gap-1 mt-2 text-xs md:text-sm text-green-600">
                                <CheckCircle className="w-3 h-3 md:w-4 md:h-4" />
                                <span>stok mencukupi</span>
                            </div>
                        </Card>
                        <Card className="rounded-lg md:rounded-xl border border-slate-200 bg-white p-4 md:p-5 shadow-sm">
                            <p className="text-xs md:text-sm text-slate-500">Butuh Restok</p>
                            <p className="text-xl md:text-2xl font-bold text-red-600 mt-1">
                                {butuhRestok}
                            </p>
                            <div className="flex items-center gap-1 mt-2 text-xs md:text-sm text-red-600">
                                <AlertTriangle className="w-3 h-3 md:w-4 md:h-4" />
                                <span>stok ≤ 5 pcs</span>
                            </div>
                        </Card>
                    </div>

                    {/* === FILTER === */}
                    <Card className="p-4 md:p-5 bg-white shadow-sm border border-slate-200 rounded-lg md:rounded-xl">
                        <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
                            <div className="flex items-center gap-2">
                                <Filter className="w-4 h-4 md:w-5 md:h-5 text-[#4789A8]" />
                                <span className="font-medium text-gray-700 text-sm md:text-base">Filter Data:</span>
                            </div>
                            
                            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                                {/* Department Filter */}
                                <Select value={filterDept} onValueChange={setFilterDept}>
                                    <SelectTrigger className="w-full sm:w-[200px] h-10 text-sm bg-slate-50 border-slate-300">
                                        <Building2 className="w-4 h-4 mr-2 text-slate-500" />
                                        <SelectValue placeholder="Semua Departemen" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="semua">Semua Departemen</SelectItem>
                                        {deptList.map((dept) => (
                                            <SelectItem key={dept.kode} value={dept.nama}>
                                                {dept.nama}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                {/* Stok filter */}
                                <Select value={filterStok} onValueChange={setFilterStok}>
                                    <SelectTrigger className="w-full sm:w-[160px] h-10 text-sm bg-slate-50 border-slate-300">
                                        <Filter className="w-4 h-4 mr-2 text-slate-500" />
                                        <SelectValue placeholder="Status Stok" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="semua">Semua</SelectItem>
                                        <SelectItem value="aman">Aman</SelectItem>
                                        <SelectItem value="restock">Butuh Restok</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Search */}
                            <div className="relative w-full lg:w-[280px]">
                                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Cari barang..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 md:py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4789A8] focus:border-transparent text-sm md:text-base bg-white"
                                />
                            </div>
                        </div>
                        
                        {/* Tampilkan filter aktif */}
                        {(filterDept !== 'semua' || filterStok !== 'semua' || search) && (
                            <div className="mt-4 flex flex-wrap gap-2">
                                {filterDept !== 'semua' && (
                                    <div className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-xs px-3 py-1.5 rounded-lg">
                                        <Building2 className="w-3 h-3" />
                                        {deptList.find(d => d.nama === filterDept)?.nama || filterDept}
                                    </div>
                                )}
                                {filterStok !== 'semua' && (
                                    <div className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 text-xs px-3 py-1.5 rounded-lg">
                                        <Filter className="w-3 h-3" />
                                        {filterStok === 'aman' ? 'Stok Aman' : 'Butuh Restok'}
                                    </div>
                                )}
                                {search && (
                                    <div className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-xs px-3 py-1.5 rounded-lg">
                                        <Search className="w-3 h-3" />
                                        "{search}"
                                    </div>
                                )}
                            </div>
                        )}
                    </Card>

                    {/* === TABEL === */}
                    <Card className="rounded-lg md:rounded-xl border border-slate-200 bg-white p-4 md:p-5 shadow-sm">
                        {/* Desktop Table */}
                        <div className="hidden md:block overflow-x-auto">
                            <table className="w-full overflow-hidden rounded-lg border border-slate-200 text-center">
                                <thead className="bg-slate-50 text-slate-600">
                                    <tr>
                                        {['No', 'Nama Barang', 'Departemen', 'Stok', 'Status'].map((head, i) => (
                                            <th
                                                key={i}
                                                className="border-b border-slate-200 px-4 py-3 text-xs md:text-sm font-semibold tracking-wide uppercase"
                                            >
                                                {head}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredItems.map((item, index) => (
                                        <tr
                                            key={item.id}
                                            className="border-b border-slate-200 transition hover:bg-slate-50"
                                        >
                                            <td className="px-4 py-3 text-sm font-medium text-slate-700">
                                                {index + 1}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-slate-700">
                                                {item.nama_barang}
                                            </td>
                                            <td className="px-4 py-3 text-sm">
                                                {item.department}
                                            </td>
                                            <td className="px-4 py-3 text-sm font-semibold">
                                                {item.stok}
                                            </td>
                                            <td className="px-4 py-3">
                                                {getStatusBadge(item.stok)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile Card View */}
                        <div className="md:hidden space-y-3">
                            {filteredItems.map((item, index) => (
                                <div key={item.id} className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <div className="text-xs text-slate-500 mb-1">No. {index + 1}</div>
                                            <h3 className="font-medium text-slate-800 text-sm">{item.nama_barang}</h3>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-xs text-slate-500">Stok</div>
                                            <div className={`text-lg font-bold ${
                                                item.stok <= 5 ? 'text-red-600' : 'text-green-600'
                                            }`}>
                                                {item.stok}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                                        <div className="flex items-center gap-2">
                                            <Building2 className="w-3 h-3 text-slate-500" />
                                            <span className="text-xs text-slate-600">{item.department}</span>
                                        </div>
                                        <div>
                                            {getStatusBadge(item.stok, true)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {filteredItems.length === 0 && (
                            <div className="text-center py-8 md:py-12">
                                <PackageSearch className="w-10 h-10 md:w-12 md:h-12 text-gray-400 mx-auto mb-3 md:mb-4" />
                                <p className="text-gray-500 text-sm md:text-base">Tidak ada data barang yang sesuai filter</p>
                                <p className="text-gray-400 text-xs md:text-sm mt-1">
                                    Coba ubah filter atau kata kunci pencarian
                                </p>
                            </div>
                        )}
                    </Card>

                    {/* Informasi Tambahan */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg md:rounded-xl p-4">
                        <div className="flex items-start gap-3">
                            <div className="mt-1 p-2 bg-white rounded-lg">
                                <AlertTriangle className="w-4 h-4 text-[#4789A8]" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-blue-800 text-sm md:text-base">Informasi Stok Barang</h3>
                                <p className="text-blue-700 text-xs md:text-sm mt-1.5">
                                    Barang dengan stok ≤ 5 pcs ditandai sebagai "Butuh Restok". 
                                    Pastikan untuk melakukan pemesanan ulang agar stok tetap tersedia.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}