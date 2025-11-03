"use client"

import { useState } from "react"
import PermissionCards from "./permission-cards"
import SickLeaveSection from "./sections/sick-leave-section"
import PermissionSection from "./sections/permission-section"
import VacationSection from "./sections/vacation-section"
import GeneralSection from "./sections/general-section"
import SickLeaveForm from "./forms/sick-leave-form"
import PermissionForm from "./forms/permission-form"
import VacationForm from "./forms/vacation-form"

export interface Permission {
  id: string
  type: "sick" | "permission" | "vacation"
  status: "pending" | "approved" | "rejected"
  createdBy: string
  createdDate: string
  [key: string]: any
}

export default function PermissionDashboard() {
  const [permissions, setPermissions] = useState<Permission[]>([
    {
      id: "1",
      type: "sick",
      status: "approved",
      createdBy: "Raihan Fikri",
      createdDate: "2024-11-01",
      startDate: "2024-11-01",
      endDate: "2024-11-03",
      days: 3,
      sickType: "sedang",
      notes: "Demam dan batuk",
      location: "Online",
    },
    {
      id: "2",
      type: "permission",
      status: "approved",
      createdBy: "Raihan Fikri",
      createdDate: "2024-10-01",
      date: "2024-10-01",
      reason: "Aptitude test",
      permissionType: "Tidak hadir",
      notes: "with Bogus Fikri",
      time: "11:00AM - 12:00AM",
      location: "Online",
    },
    {
      id: "3",
      type: "vacation",
      status: "approved",
      createdBy: "Raihan Fikri",
      createdDate: "2024-09-15",
      startDate: "2024-11-15",
      endDate: "2024-11-22",
      vacationType: "Cuti Tahunan",
      reason: "Liburan keluarga",
      days: 8,
      location: "Bali",
    },
  ])

  const [activeForm, setActiveForm] = useState<"sick" | "permission" | "vacation" | null>(null)
  const [activeTab, setActiveTab] = useState<"sick" | "permission" | "vacation" | "general">("general")

  const handleAddPermission = (newPermission: Permission) => {
    setPermissions([...permissions, newPermission])
    setActiveForm(null)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      {/* <div className="border-b-2 border-blue-500 p-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Perizinan</h1>
        <p className="mt-2 text-gray-600">Kelola permohonan cuti, sakit, dan izin Anda</p>
      </div> */}

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
