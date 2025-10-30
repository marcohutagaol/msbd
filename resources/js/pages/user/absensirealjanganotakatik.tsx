import React, { useState, useEffect } from "react";
import { MapPin, Clock, Calendar, RefreshCw } from "lucide-react";

export default function CatatKehadiran() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('id-ID', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit',
      hour12: false 
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('id-ID', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-8 bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="w-full max-w-2xl mx-auto">
            {/* Header Card */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-t-3xl p-8 text-white shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold">Catat Kehadiran</h1>
                <div className="flex items-center gap-2 bg-opacity-20 rounded-full px-4 py-2">
                  <Calendar className="w-5 h-5" />
                  <span className="text-sm font-medium">{formatDate(currentTime)}</span>
                </div>
              </div>
              
              <div className="bg-opacity-10 backdrop-blur-sm rounded-2xl p-4 border border-white border-opacity-20">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5" />
                  <p className="text-sm font-medium opacity-90">Waktu Sekarang</p>
                </div>
                <p className="text-5xl font-bold tracking-wider">{formatTime(currentTime)}</p>
              </div>
            </div>

            {/* Main Content Card */}
            <div className="bg-white rounded-b-3xl shadow-xl p-8">
              <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                {/* Profile Section */}
                <div className="flex flex-col items-center">
                  <div className="relative mb-4">
                    <img
                      src="https://via.placeholder.com/200"
                      alt="Foto Profil"
                      className="w-40 h-40 rounded-2xl object-cover shadow-lg ring-4 ring-blue-100"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-white"></div>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-1">
                    Carlene L. Haris
                  </h2>
                  <p className="text-gray-500 font-medium mb-4">ID: 12306005</p>
                </div>

                {/* Details Section */}
                <div className="flex-1 w-full">
                  {/* Check-in Time */}
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-6 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-blue-600 font-semibold text-sm uppercase tracking-wide">
                        Jam Masuk
                      </p>
                      <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        AKTIF
                      </div>
                    </div>
                    <p className="text-5xl font-bold text-white-600 mb-1">07:58:55</p>
                    <p className="text-gray-600 text-sm">Status: Tepat Waktu</p>
                  </div>

                  {/* Location Section */}
                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="bg-blue-500 p-2 rounded-lg">
                        <MapPin className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800 mb-1">Lokasi Saat Ini</p>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          CoHive Menara Tekno, Jl. H. Fachrudin No.19, RT.1/RW.7, Kebon Sirih,
                          Tanah Abang, Central Jakarta
                        </p>
                      </div>
                    </div>
                    
                    <button className="w-full flex items-center justify-center gap-2 bg-white hover:bg-blue-50 text-blue-600 font-medium py-3 px-4 rounded-xl border-2 border-blue-200 transition-all duration-200 hover:border-blue-300">
                      <RefreshCw className="w-4 h-4" />
                      Perbaharui Lokasi
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <button className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
                  Konfirmasi Kehadiran
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}