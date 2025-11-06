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
      
      // Add all fields to FormData
      Object.keys(newPermission).forEach(key => {
        if (newPermission[key] !== null && newPermission[key] !== undefined) {
          if (key === 'document' && newPermission[key] instanceof File) {
            formData.append('document', newPermission[key])
          } else if (key !== 'id' && key !== 'status' && key !== 'createdBy' && key !== 'createdDate') {
            formData.append(key, newPermission[key])
          }
        }
      })

      const response = await axios.post('/api/permissions', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      // Add new permission to state
      setPermissions([response.data.permission, ...permissions])
      setActiveForm(null)
      alert('Izin berhasil diajukan!')
    } catch (error: any) {
      console.error('Error submitting permission:', error)
      const errorMessage = error.response?.data?.message || 'Gagal mengajukan izin'
      alert(errorMessage)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Memuat data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Permission Cards */}
      <PermissionCards permissions={permissions} onCardClick={setActiveForm} />

      {/* Tabs */}
      <div className="border-b border-blue-200 px-8 pt-8">
        <div className="flex gap-8">
          <button
            onClick={() => setActiveTab("general")}
            className={`pb-4 font-semibold transition-colors ${
              activeTab === "general" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            General
          </button>
          <button
            onClick={() => setActiveTab("sick")}
            className={`pb-4 font-semibold transition-colors ${
              activeTab === "sick" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Sakit
          </button>
          <button
            onClick={() => setActiveTab("permission")}
            className={`pb-4 font-semibold transition-colors ${
              activeTab === "permission"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Izin
          </button>
          <button
            onClick={() => setActiveTab("vacation")}
            className={`pb-4 font-semibold transition-colors ${
              activeTab === "vacation"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Cuti
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-8">
        {activeTab === "general" && <GeneralSection permissions={permissions} />}
        {activeTab === "sick" && <SickLeaveSection permissions={permissions.filter((p) => p.type === "sick")} />}
        {activeTab === "permission" && (
          <PermissionSection permissions={permissions.filter((p) => p.type === "permission")} />
        )}
        {activeTab === "vacation" && <VacationSection permissions={permissions.filter((p) => p.type === "vacation")} />}
      </div>

      {/* Forms */}
      {activeForm === "sick" && <SickLeaveForm onClose={() => setActiveForm(null)} onSubmit={handleAddPermission} />}
      {activeForm === "permission" && (
        <PermissionForm onClose={() => setActiveForm(null)} onSubmit={handleAddPermission} />
      )}
      {activeForm === "vacation" && <VacationForm onClose={() => setActiveForm(null)} onSubmit={handleAddPermission} />}
    </div>
  )
}