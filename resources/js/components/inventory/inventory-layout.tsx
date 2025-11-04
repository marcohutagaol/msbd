"use client"

import { useState } from "react"
import BarangGudang from "./barang-gudang"
import BarangDepartment from "./barang-department"
import TransferPage from "./transfer-page"
import SubDetailPage from "./sub-detail-page"
import StockDepartmentPage from "./stock-department-page"

type PageType = "dashboard" | "transfer" | "subDetail" | "stockDepartment"

export default function InventoryLayout() {
  const [currentPage, setCurrentPage] = useState<PageType>("dashboard")
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [transferredItems, setTransferredItems] = useState<any[]>([])

  const handleTransfer = (item: any) => {
    setSelectedItem(item)
    setCurrentPage("transfer")
  }

  const handleSaveTransfer = (items: any[]) => {
    setTransferredItems([...transferredItems, ...items])
    setCurrentPage("dashboard")
  }

  const handleViewDetail = (item: any) => {
    setSelectedItem(item)
    setCurrentPage("subDetail")
  }

  const handleBackToDashboard = () => {
    setCurrentPage("dashboard")
  }

  const handleViewStockDepartment = () => {
    setCurrentPage("stockDepartment")
  }

  return (
    <div>
      {currentPage === "dashboard" && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <BarangDepartment
              items={transferredItems}
              onViewDetail={handleViewDetail}
              onViewStock={handleViewStockDepartment}
            />
            <BarangGudang onTransfer={handleTransfer} />
          </div>
        </div>
      )}

      {currentPage === "transfer" && (
        <TransferPage item={selectedItem} onSave={handleSaveTransfer} onBack={handleBackToDashboard} />
      )}

      {currentPage === "subDetail" && <SubDetailPage item={selectedItem} onBack={handleBackToDashboard} />}

      {currentPage === "stockDepartment" && (
        <StockDepartmentPage items={transferredItems} onBack={handleBackToDashboard} />
      )}
    </div>
  )
}
