'use client';

import { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Search, ChevronDown, Users, UserCheck, UserX, Building } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Karyawan {
  id: string;
  nama: string;
  department: string;
  jabatan: string;
  status_aktif: 'AKTIF' | 'NONAKTIF';
  status_kerja: string;
  foto: string;
}

interface Department {
  kode: string;
  nama: string;
}

interface AttendanceData {
  name: string;
  value: number;
}

interface RankData {
  rank: string;
  name: string;
  badge: string;
}

const ManagerKaryawan = () => {
  const { karyawanData, totalKaryawan, totalAktif, totalNONAKTIF, attendanceData, rankData, departments } = usePage<{
    karyawanData: Karyawan[];
    totalKaryawan: number;
    totalAktif: number;
    totalNONAKTIF: number;
    attendanceData: AttendanceData[];
    rankData: RankData[];
    departments: Department[];
  }>().props;

  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("Semua Department");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filteredKaryawan, setFilteredKaryawan] = useState<Karyawan[]>(karyawanData);

  useEffect(() => {
    let filtered = karyawanData;
    
    if (searchQuery) {
      filtered = filtered.filter(k => 
        k.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
        k.jabatan.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (departmentFilter !== "Semua Department") {
      filtered = filtered.filter(k => k.department === departmentFilter);
    }
    
    setFilteredKaryawan(filtered);
  }, [searchQuery, departmentFilter, karyawanData]);

  const getStatusKerjaColor = (status: string) => {
    switch (status) {
      case 'Hadir':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Sakit':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Izin':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Cuti':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusAktifColor = (status: string) => {
    return status === 'AKTIF' 
      ? 'bg-green-100 text-green-800 border-green-200' 
      : 'bg-red-100 text-red-800 border-red-200';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Manajemen Karyawan</h1>
              <p className="text-gray-600 text-sm md:text-base">Kelola dan pantau data karyawan departemen Anda</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Total Karyawan</p>
                  <p className="text-3xl font-bold text-gray-900 mb-1">{totalKaryawan}</p>
                  <p className="text-xs text-gray-400">Semua karyawan</p>
                </div>
                <div className="p-3 rounded-xl bg-blue-50">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Karyawan Aktif</p>
                  <p className="text-3xl font-bold text-gray-900 mb-1">{totalAktif}</p>
                  <p className="text-xs text-green-600 font-medium">
                    {Math.round((totalAktif / totalKaryawan) * 100)}% aktif
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-green-50">
                  <UserCheck className="w-8 h-8 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Karyawan NONAKTIF</p>
                  <p className="text-3xl font-bold text-gray-900 mb-1">{totalNONAKTIF}</p>
                  <p className="text-xs text-red-600 font-medium">
                    {Math.round((totalNONAKTIF / totalKaryawan) * 100)}% turnover
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-red-50">
                  <UserX className="w-8 h-8 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chart and Ranking Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Attendance Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Statistik Kehadiran Hari Ini</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {attendanceData.map((item, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-blue-600 mb-2">{item.value}</p>
                    <p className="text-sm text-gray-600">{item.name}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Ranking Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Top Performers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {rankData.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-blue-600">{item.rank}</span>
                      <span className="text-sm text-gray-700 truncate">{item.name}</span>
                    </div>
                    <span className="text-yellow-500">{item.badge}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filter and Search */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="relative">
            <Button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Building className="w-4 h-4" />
              {departmentFilter}
              <ChevronDown className="w-4 h-4" />
            </Button>
            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-10">
                <button
                  onClick={() => {
                    setDepartmentFilter("Semua Department");
                    setIsDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50 transition-colors"
                >
                  Semua Department
                </button>
                {departments.map((dept) => (
                  <button
                    key={dept.kode}
                    onClick={() => {
                      setDepartmentFilter(dept.nama);
                      setIsDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50 transition-colors"
                  >
                    {dept.nama}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Cari karyawan berdasarkan nama atau jabatan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Karyawan Table */}
        <Card>
          <CardHeader>
            <CardTitle>Daftar Karyawan</CardTitle>
            <CardDescription>
              {filteredKaryawan.length} karyawan ditemukan
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Desktop View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">Karyawan</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">Department</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">Jabatan</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">Status Aktif</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">Status Hari Ini</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredKaryawan.map((karyawan) => (
                    <tr key={karyawan.id} className="border-b hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={karyawan.foto}
                            alt={karyawan.nama}
                            className="w-10 h-10 rounded-full border"
                          />
                          <div>
                            <p className="font-medium text-gray-900">{karyawan.nama}</p>
                            <p className="text-xs text-gray-500">ID: {karyawan.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-700">{karyawan.department}</td>
                      <td className="py-4 px-4 text-gray-700">{karyawan.jabatan}</td>
                      <td className="py-4 px-4">
                        <Badge className={getStatusAktifColor(karyawan.status_aktif)}>
                          {karyawan.status_aktif}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={getStatusKerjaColor(karyawan.status_kerja)}>
                          {karyawan.status_kerja}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <Link href={`/manager-karyawan/${karyawan.id}`}>
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            Lihat Detail
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile View */}
            <div className="md:hidden space-y-4">
              {filteredKaryawan.map((karyawan) => (
                <Card key={karyawan.id} className="p-4">
                  <div className="flex items-start gap-4">
                    <img
                      src={karyawan.foto}
                      alt={karyawan.nama}
                      className="w-12 h-12 rounded-full border"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gray-900">{karyawan.nama}</h3>
                          <p className="text-sm text-gray-500">{karyawan.jabatan}</p>
                        </div>
                        <Badge className={getStatusAktifColor(karyawan.status_aktif)}>
                          {karyawan.status_aktif}
                        </Badge>
                      </div>
                      <div className="mt-3 grid grid-cols-2 gap-2">
                        <div>
                          <p className="text-xs text-gray-500">Department</p>
                          <p className="text-sm font-medium">{karyawan.department}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Status Hari Ini</p>
                          <Badge className={getStatusKerjaColor(karyawan.status_kerja)}>
                            {karyawan.status_kerja}
                          </Badge>
                        </div>
                      </div>
                      <div className="mt-4">
                        <Link href={`/manager-karyawan/${karyawan.id}`} className="block">
                          <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
                            Lihat Detail Karyawan
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {filteredKaryawan.length === 0 && (
              <div className="text-center py-8">
                <Users className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                <p className="text-gray-500">Tidak ada karyawan yang ditemukan</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ManagerKaryawan;