import { usePage } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { ArrowLeft, Phone, Mail, MapPin, Calendar, Briefcase, Building, User, Clock, Award, Home, Cake } from 'lucide-react';

const ManagerDetailKaryawan = () => {
  const { karyawan } = usePage<{
    karyawan: {
      id_karyawan: string;
      nama: string;
      department: string;
      jabatan: string;
      status_aktif: string;
      tanggalBergabung: string;
      masaKerja: string;
      tempat_lahir: string;
      tanggal_lahir: string;
      no_telepon: string;
      alamat: string;
      email: string;
      foto: string;
      stats: {
        hadir: number;
        tepatWaktu: number;
        telat: number;
        izin: number;
        sakit: number;
        cuti: number;
      };
      badges: Array<{
        id: string;
        name: string;
        type: string;
      }>;
    };
  }>().props;

  const getBadgeStyle = (type: string) => {
    switch (type) {
      case "award":
        return "bg-yellow-100 text-yellow-800 border border-yellow-200";
      default:
        return "bg-blue-100 text-blue-800 border border-blue-200";
    }
  };

  const statsData = [
    { label: "Hadir", value: karyawan.stats.hadir, icon: "✅", color: "text-green-600", bg: "bg-green-50" },
    { label: "Tepat Waktu", value: karyawan.stats.tepatWaktu, icon: "⏰", color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Telat", value: karyawan.stats.telat, icon: "⚠️", color: "text-orange-600", bg: "bg-orange-50" },
    { label: "Izin", value: karyawan.stats.izin, icon: "📝", color: "text-yellow-600", bg: "bg-yellow-50" },
    { label: "Sakit", value: karyawan.stats.sakit, icon: "🤒", color: "text-red-600", bg: "bg-red-50" },
    { label: "Cuti", value: karyawan.stats.cuti, icon: "🏖️", color: "text-purple-600", bg: "bg-purple-50" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex items-center gap-4 mb-6">
            <Link 
              href="/manager-karyawan"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Detail Karyawan</h1>
              <p className="text-gray-600 text-sm md:text-base">Informasi lengkap karyawan {karyawan.nama}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 sticky top-6">
              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                  <img
                    src={karyawan.foto}
                    alt={karyawan.nama}
                    className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
                  />
                  <div className={`absolute bottom-3 right-3 w-4 h-4 rounded-full border-2 border-white ${
                    karyawan.status_aktif === 'AKTIF' ? 'bg-green-500' : 'bg-red-500'
                  }`} />
                </div>
                <h2 className="text-xl font-bold text-gray-900 text-center mb-2">{karyawan.nama}</h2>
                <p className="text-gray-600 text-center mb-4">{karyawan.jabatan}</p>
                <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-6 ${
                  karyawan.status_aktif === 'AKTIF' 
                    ? 'bg-green-100 text-green-800 border border-green-200' 
                    : 'bg-red-100 text-red-800 border border-red-200'
                }`}>
                  {karyawan.status_aktif}
                </div>

                {/* Contact Info */}
                <div className="w-full space-y-4">
                  <div className="flex items-center gap-3 text-gray-700">
                    <Building className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-xs text-gray-500">Department</p>
                      <p className="text-sm font-medium">{karyawan.department}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 text-gray-700">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="text-sm font-medium truncate">{karyawan.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 text-gray-700">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-xs text-gray-500">Telepon</p>
                      <p className="text-sm font-medium">{karyawan.no_telepon}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 text-gray-700">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-xs text-gray-500">Bergabung</p>
                      <p className="text-sm font-medium">{karyawan.tanggalBergabung}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 text-gray-700">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-xs text-gray-500">Masa Kerja</p>
                      <p className="text-sm font-medium">{karyawan.masaKerja}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Employee Identity */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <User className="w-5 h-5" />
                Identitas Karyawan
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">ID Karyawan</p>
                    <p className="font-medium text-gray-900 text-lg">{karyawan.id_karyawan}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Nama Lengkap</p>
                    <p className="font-medium text-gray-900">{karyawan.nama}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Jabatan</p>
                    <p className="font-medium text-gray-900">{karyawan.jabatan}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Department</p>
                    <p className="font-medium text-gray-900">{karyawan.department}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1 flex items-center gap-2">
                      <Cake className="w-4 h-4" />
                      Tempat & Tanggal Lahir
                    </p>
                    <p className="font-medium text-gray-900">
                      {karyawan.tempat_lahir}, {karyawan.tanggal_lahir}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1 flex items-center gap-2">
                      <Home className="w-4 h-4" />
                      Alamat
                    </p>
                    <p className="font-medium text-gray-900">{karyawan.alamat}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Statistics Section */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Statistik Kehadiran (30 Hari Terakhir)
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {statsData.map((stat, idx) => (
                  <div 
                    key={idx} 
                    className={`${stat.bg} rounded-lg p-4 text-center hover:shadow-md transition-all duration-200`}
                  >
                    <div className="text-2xl mb-2">{stat.icon}</div>
                    <p className={`text-2xl font-bold ${stat.color} mb-2`}>{stat.value}</p>
                    <p className="text-sm text-gray-700">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Badges/Awards Section */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <Award className="w-5 h-5" />
                Penghargaan & Pencapaian
              </h3>
              {karyawan.badges.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                  {karyawan.badges.map((badge) => (
                    <div 
                      key={badge.id} 
                      className={`px-4 py-2 rounded-full text-sm font-medium ${getBadgeStyle(badge.type)}`}
                    >
                      {badge.name}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Award className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">Belum ada penghargaan</p>
                  <p className="text-sm text-gray-400 mt-1">Penghargaan akan ditampilkan di sini</p>
                </div>
              )}
            </div>

            {/* Additional Information */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Informasi Tambahan</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Status Karyawan</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status Aktif:</span>
                      <span className={`font-medium ${karyawan.status_aktif === 'AKTIF' ? 'text-green-600' : 'text-red-600'}`}>
                        {karyawan.status_aktif}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bergabung Sejak:</span>
                      <span className="font-medium">{karyawan.tanggalBergabung}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Masa Kerja:</span>
                      <span className="font-medium">{karyawan.masaKerja}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Kontak Darurat</h4>
                  <p className="text-gray-600 text-sm mb-2">(Informasi kontak darurat dapat ditambahkan di sini)</p>
                  <div className="text-gray-500 text-sm">
                    <p>Hubungi: {karyawan.no_telepon}</p>
                    <p>Email: {karyawan.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerDetailKaryawan;