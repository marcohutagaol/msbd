"use client"

import { useState, useEffect } from "react"
import PermissionCards from "./permission-cards"
import SickLeaveSection from "./sections/sick-leave-section"
import PermissionSection from "./sections/permission-section"
import VacationSection from "./sections/vacation-section"
import GeneralSection from "./sections/general-section"
import SickLeaveForm from "./forms/sick-leave-form"
import PermissionForm from "./forms/permission-form"
import VacationForm from "./forms/vacation-form"
import axios from "axios"

export interface Permission {
  id: string
  type: "sick" | "permission" | "vacation"
  status: "pending" | "approved" | "rejected"
  createdBy: string
  createdDate: string
  document_path?: string
  document_url?: string
  [key: string]: any
}

export default function PermissionDashboard() {
  const [permissions, setPermissions] = useState<Permission[]>([])
  const [loading, setLoading] = useState(true)
  const [activeForm, setActiveForm] = useState<"sick" | "permission" | "vacation" | null>(null)
  const [activeTab, setActiveTab] = useState<"sick" | "permission" | "vacation" | "general">("general")

  // Fetch permissions from API
  useEffect(() => {
    fetchPermissions()
  }, [])

  // Prevent scroll and body shift when modal opens
  useEffect(() => {
    if (activeForm) {
      // Save current scroll position
      const scrollY = window.scrollY

      // Prevent body scroll and maintain position
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'

      return () => {
        // Restore body scroll and position
        document.body.style.position = ''
        document.body.style.top = ''
        document.body.style.width = ''
        window.scrollTo(0, scrollY)
      }
    }
  }, [activeForm])

  const fetchPermissions = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/permissions')
      setPermissions(response.data)
    } catch (error) {
      console.error('Error fetching permissions:', error)
      alert('Gagal memuat data izin')
    } finally {
      setLoading(false)
    }
  }

  const handleAddPermission = async (newPermission: Permission) => {
    try {
      const formData = new FormData()

      console.log('New Permission Data:', newPermission);

      // Add all fields to FormData
      Object.keys(newPermission).forEach(key => {
        if (newPermission[key] !== null && newPermission[key] !== undefined) {
          if (key === 'document' && newPermission[key] instanceof File) {
            // Kirim file dengan field name 'document'
            console.log('Adding file to FormData:', newPermission[key].name);
            formData.append('document', newPermission[key]);
          } else if (key !== 'id' && key !== 'status' && key !== 'createdBy' && key !== 'createdDate') {
            // Kirim field lainnya sesuai dengan nama di database
            console.log(`Adding field ${key}:`, newPermission[key]);
            formData.append(key, newPermission[key].toString());
          }
        }
      })

      // Tambahkan type permission
      formData.append('type', newPermission.type);

      // Debug FormData contents
      console.log('FormData entries:');
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      const response = await axios.post('/api/permissions', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      console.log('Response from server:', response.data);

      // Add new permission to state dengan data dari response
      setPermissions([response.data.permission, ...permissions])
      setActiveForm(null)
      alert('Izin berhasil diajukan!')
    } catch (error: any) {
      console.error('Error submitting permission:', error)
      const errorMessage = error.response?.data?.message || 'Gagal mengajukan izin'
      alert(errorMessage)
      throw error
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="relative inline-block">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
            <div className="absolute inset-0 h-16 w-16 animate-ping rounded-full border-4 border-blue-300 opacity-20"></div>
          </div>
          <p className="mt-6 text-lg font-semibold text-gray-700 dark:text-gray-300">Memuat data perizinan...</p>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Mohon tunggu sebentar</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Permission Cards */}
      <div className="relative">
        {/* Decorative background elements - hidden on mobile for performance */}
        <div className="hidden md:block absolute top-0 left-0 w-96 h-96 bg-blue-100 dark:bg-blue-900/10 rounded-full filter blur-3xl opacity-20 -z-10"></div>
        <div className="hidden md:block absolute top-20 right-0 w-80 h-80 bg-purple-100 dark:bg-purple-900/10 rounded-full filter blur-3xl opacity-20 -z-10"></div>

        <PermissionCards permissions={permissions} onCardClick={setActiveForm} />
      </div>

      {/* Modern Tabs Navigation */}
      <div className="relative px-4 md:px-8 pt-8 md:pt-12 pb-2">
        {/* Gradient line at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

        {/* Desktop Tabs */}
        <div className="hidden md:flex relative gap-1 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-2 shadow-sm border border-gray-100 dark:border-gray-700 max-w-fit">
          {/* General Tab */}
          <button
            onClick={() => setActiveTab("general")}
            className={`group relative px-8 py-3 font-bold rounded-xl transition-all duration-300 ${activeTab === "general"
              ? "text-white shadow-lg shadow-blue-500/30"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-slate-700"
              }`}
          >
            {activeTab === "general" && (
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 rounded-xl"></div>
            )}
            <span className="relative z-10 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              General
            </span>
          </button>

          {/* Sakit Tab */}
          <button
            onClick={() => setActiveTab("sick")}
            className={`group relative px-8 py-3 font-bold rounded-xl transition-all duration-300 ${activeTab === "sick"
              ? "text-white shadow-lg shadow-red-500/30"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-slate-700"
              }`}
          >
            {activeTab === "sick" && (
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-red-600 to-rose-600 rounded-xl"></div>
            )}
            <span className="relative z-10 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Sakit
            </span>
          </button>

          {/* Izin Tab */}
          <button
            onClick={() => setActiveTab("permission")}
            className={`group relative px-8 py-3 font-bold rounded-xl transition-all duration-300 ${activeTab === "permission"
              ? "text-white shadow-lg shadow-blue-500/30"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-slate-700"
              }`}
          >
            {activeTab === "permission" && (
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-blue-600 to-cyan-600 rounded-xl"></div>
            )}
            <span className="relative z-10 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Izin
            </span>
          </button>

          {/* Cuti Tab */}
          <button
            onClick={() => setActiveTab("vacation")}
            className={`group relative px-8 py-3 font-bold rounded-xl transition-all duration-300 ${activeTab === "vacation"
              ? "text-white shadow-lg shadow-green-500/30"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-slate-700"
              }`}
          >
            {activeTab === "vacation" && (
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-green-600 to-emerald-600 rounded-xl"></div>
            )}
            <span className="relative z-10 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Cuti
            </span>
          </button>
        </div>

        {/* Mobile Tabs - Grid Layout */}
        <div className="md:hidden grid grid-cols-2 gap-2 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-2 shadow-sm border border-gray-100 dark:border-gray-700">
          {/* General Tab Mobile */}
          <button
            onClick={() => setActiveTab("general")}
            className={`group relative px-4 py-3 font-bold rounded-xl transition-all duration-300 ${activeTab === "general"
              ? "text-white shadow-lg shadow-blue-500/30"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-slate-700"
              }`}
          >
            {activeTab === "general" && (
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 rounded-xl"></div>
            )}
            <span className="relative z-10 flex items-center justify-center gap-2 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              General
            </span>
          </button>

          {/* Sakit Tab Mobile */}
          <button
            onClick={() => setActiveTab("sick")}
            className={`group relative px-4 py-3 font-bold rounded-xl transition-all duration-300 ${activeTab === "sick"
              ? "text-white shadow-lg shadow-red-500/30"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-slate-700"
              }`}
          >
            {activeTab === "sick" && (
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-red-600 to-rose-600 rounded-xl"></div>
            )}
            <span className="relative z-10 flex items-center justify-center gap-2 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Sakit
            </span>
          </button>

          {/* Izin Tab Mobile */}
          <button
            onClick={() => setActiveTab("permission")}
            className={`group relative px-4 py-3 font-bold rounded-xl transition-all duration-300 ${activeTab === "permission"
              ? "text-white shadow-lg shadow-blue-500/30"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-slate-700"
              }`}
          >
            {activeTab === "permission" && (
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-blue-600 to-cyan-600 rounded-xl"></div>
            )}
            <span className="relative z-10 flex items-center justify-center gap-2 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Izin
            </span>
          </button>

          {/* Cuti Tab Mobile */}
          <button
            onClick={() => setActiveTab("vacation")}
            className={`group relative px-4 py-3 font-bold rounded-xl transition-all duration-300 ${activeTab === "vacation"
              ? "text-white shadow-lg shadow-green-500/30"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-slate-700"
              }`}
          >
            {activeTab === "vacation" && (
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-green-600 to-emerald-600 rounded-xl"></div>
            )}
            <span className="relative z-10 flex items-center justify-center gap-2 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Cuti
            </span>
          </button>
        </div>
      </div>

      {/* Tab Content with Enhanced Container */}
      <div className="p-4 md:p-8 pt-4 md:pt-6">
        <div className="relative">
          {/* Content card wrapper */}
          <div className="bg-white dark:bg-slate-800 rounded-xl md:rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="animate-fadeIn">
              {activeTab === "general" && (
                <div className="p-4 md:p-6">
                  <GeneralSection permissions={permissions} />
                </div>
              )}
              {activeTab === "sick" && (
                <div className="p-4 md:p-6">
                  <SickLeaveSection permissions={permissions.filter((p) => p.type === "sick")} />
                </div>
              )}
              {activeTab === "permission" && (
                <div className="p-4 md:p-6">
                  <PermissionSection permissions={permissions.filter((p) => p.type === "permission")} />
                </div>
              )}
              {activeTab === "vacation" && (
                <div className="p-4 md:p-6">
                  <VacationSection permissions={permissions.filter((p) => p.type === "vacation")} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Forms with backdrop animation */}
      {activeForm === "sick" && (
        <div className="animate-fadeIn">
          <SickLeaveForm onClose={() => setActiveForm(null)} onSubmit={handleAddPermission} />
        </div>
      )}
      {activeForm === "permission" && (
        <div className="animate-fadeIn">
          <PermissionForm onClose={() => setActiveForm(null)} onSubmit={handleAddPermission} />
        </div>
      )}
      {activeForm === "vacation" && (
        <div className="animate-fadeIn">
          <VacationForm onClose={() => setActiveForm(null)} onSubmit={handleAddPermission} />
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.25s ease-out;
        }
      `}</style>
    </div>
  )
}