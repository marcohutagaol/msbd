
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
import { Building2, Filter, PackageSearch, Search } from 'lucide-react';
import { useState } from 'react';
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
    const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
    const [filterDept, setFilterDept] = useState('semua');
    const [filterDivisi, setFilterDivisi] = useState('semua');
    const [filterStok, setFilterStok] = useState('semua');
    const [search, setSearch] = useState('');

    // === OPTIONS UNTUK DROPDOWN ===
    const departmentOptions: Record<string, string[]> = {
        'Food And Beverage': ['Support', 'Network', 'Developer'],
        'Front Office': ['HR', 'Finance'],
        'Housekeeping': ['Kitchen', 'Service'],
        'Landscape': ['Cleaning', 'Maintenance'],
        'Engineering & Maintenance': ['Cleaning', 'Maintenance'],
        'Security': ['Patrol', 'Monitoring'],
    };
 
    const divisiList =
        filterDept !== 'semua'
            ? departmentOptions[filterDept] || []
            : Object.values(departmentOptions).flat();

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
    const getStatusBadge = (stok: number) => {
        const needsRestock = stok <= 5;
        const status = needsRestock ? 'Butuh Restok' : 'Stok Aman';
        const bg =
            status === 'Stok Aman'
                ? 'rgba(22, 163, 74, 0.12)'
                : 'rgba(239, 68, 68, 0.12)';
        const border = status === 'Stok Aman' ? '#86efac' : '#fca5a5';
        const color = status === 'Stok Aman' ? '#16a34a' : '#dc2626';

        return (
            <span
                style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: '120px',
                    height: '30px',
                    borderRadius: '20px',
                    fontSize: '13px',
                    fontWeight: 600,
                    color,
                    backgroundColor: bg,
                    border: `1px solid ${border}`,
                }}
            >
                {status}
            </span>
        );
    };

    return (
        <div className="flex min-h-screen bg-[#f5f7fa] font-[Poppins,Segoe_UI,system-ui,sans-serif]">
            {/* === SIDEBAR === */}
            <div
                className={`fixed top-0 left-0 z-[150] h-full w-[260px] bg-white shadow-md transition-transform duration-300 ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <Sidebar />
            </div>

            {/* === MAIN === */}
            <div
                className={`flex flex-1 flex-col transition-all duration-300 ${
                    isSidebarOpen ? 'ml-[260px]' : 'ml-0'
                }`}
            >
                {/* === HEADER === */}
                <div
                    className={`fixed top-0 right-0 z-[200] bg-white shadow-sm transition-all duration-300 ${
                        isSidebarOpen ? 'left-[260px]' : 'left-0'
                    }`}
                >
                    <Header
                        isSidebarOpen={isSidebarOpen}
                        onToggleSidebar={toggleSidebar}
                    />
                </div>

                {/* === CONTENT === */}
                <div className="flex flex-1 flex-col gap-6 px-5 pt-[110px] pb-[40px] sm:px-10">
                    <h1 className="text-2xl font-semibold text-slate-800">
                        Inventaris Barang
                    </h1>

                    {/* === STATISTIK === */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                        <Card className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                            <p className="text-sm text-slate-500">
                                Total Barang
                            </p>
                            <p className="text-2xl font-bold text-slate-700">
                                {totalBarang}
                            </p>
                        </Card>
                        <Card className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                            <p className="text-sm text-slate-500">Stok Aman</p>
                            <p className="text-2xl font-bold text-green-600">
                                {stokAman}
                            </p>
                        </Card>
                        <Card className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                            <p className="text-sm text-slate-500">
                                Butuh Restok
                            </p>
                            <p className="text-2xl font-bold text-red-600">
                                {butuhRestok}
                            </p>
                        </Card>
                    </div>

                    {/* === FILTER === */}
                    <Card className="p-5 bg-white shadow-sm border border-slate-200 rounded-2xl">
                        <div className="flex flex-wrap gap-3 justify-between items-center">
                            <div className="flex flex-wrap gap-3 items-center">
                                {/* Department */}
                                <Select value={filterDept} onValueChange={setFilterDept}>
                                    <SelectTrigger className="w-[200px] h-9 text-sm bg-slate-50 border-slate-300">
                                        <Building2 className="w-4 h-4 mr-2 text-slate-500" />
                                        <SelectValue placeholder="Pilih Departemen" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="semua">Semua Departemen</SelectItem>
                                        {Object.keys(departmentOptions).map((dept) => (
                                            <SelectItem key={dept} value={dept}>
                                                {dept}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                {/* Divisi */}
                                <Select
                                    value={filterDivisi}
                                    onValueChange={setFilterDivisi}
                                    disabled={divisiList.length === 0}
                                >
                                    <SelectTrigger className="w-[180px] h-9 text-sm bg-slate-50 border-slate-300 disabled:opacity-60">
                                        <PackageSearch className="w-4 h-4 mr-2 text-slate-500" />
                                        <SelectValue placeholder="Pilih Divisi" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="semua">Semua Divisi</SelectItem>
                                        {divisiList.map((div) => (
                                            <SelectItem key={div} value={div}>
                                                {div}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                {/* Stok filter */}
                                <Select value={filterStok} onValueChange={setFilterStok}>
                                    <SelectTrigger className="w-[160px] h-9 text-sm bg-slate-50 border-slate-300">
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
                            <div className="flex items-center border border-slate-300 rounded-md px-3 py-1.5 bg-white w-full sm:w-[280px]">
                                <Search size={18} className="text-slate-400 mr-2" />
                                <input
                                    type="text"
                                    placeholder="Cari barang..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full outline-none text-sm bg-transparent"
                                />
                            </div>
                        </div>
                    </Card>

                    {/* === TABEL === */}
                    <Card className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full overflow-hidden rounded-xl border border-slate-200 text-center">
                                <thead className="bg-slate-50 text-slate-600">
                                    <tr>
                                        {['No', 'Nama Barang', 'Departemen', 'Stok', 'Status'].map((head, i) => (
                                            <th
                                                key={i}
                                                className="border-b border-slate-200 px-4 py-3 text-[13px] font-semibold tracking-wide uppercase"
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
                                            <td className="px-4 py-3 text-[14px] font-medium text-slate-700">
                                                {index + 1}
                                            </td>
                                            <td className="px-4 py-3 text-[14px] text-slate-700">
                                                {item.nama_barang}
                                            </td>
                                            <td className="px-4 py-3 text-[14px]">
                                                {item.department}
                                            </td>
                                            <td className="px-4 py-3 text-[14px] font-semibold">
                                                {item.stok}
                                            </td>
                                            <td className="px-4 py-3">
                                                {getStatusBadge(item.stok)}
                                            </td>
                                        </tr>
                                    ))}

                                    {filteredItems.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan={5}
                                                className="py-6 text-center text-sm text-slate-500"
                                            >
                                                Tidak ada data barang yang sesuai filter.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}

