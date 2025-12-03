"use client"

import { useState, useEffect } from "react"
import { X, Search, Trash2, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface OrderItem {
  id: string
  nama_barang: string
  jumlah: number
  satuan: string
  kode_barang?: string
  catatan?: string
}

interface AddOrderModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (items: OrderItem[]) => void
}

const sampleProducts = [
  "Sabun Hotel Produk GIV Warna Ungu",
  "Handuk putih merek louisie vuttion",
  "Minyak goreng bimoli 500ml",
  "Teh celup premium kotak",
  "Kopi bubuk arabika 250gr",
  "Gula pasir 5kg",
  "Tepung terigu 1kg",
]

export default function AddOrderModal({ isOpen, onClose, onAdd }: AddOrderModalProps) {
  const [itemCount, setItemCount] = useState(1)
  const [formData, setFormData] = useState({
    nama_barang: "",
    kode_barang: "",
    jumlah: "",
    satuan: "",
    catatan: "",
  })
  const [orderedItems, setOrderedItems] = useState<OrderItem[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  const filteredProducts = sampleProducts.filter((product) => 
    product.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Fungsi generate kode otomatis
  const generateKodeBarang = () => {
    if (!formData.nama_barang) return ""
    
    const words = formData.nama_barang.split(' ')
    let kode = ''
    
    if (words.length === 1) {
      // Jika hanya satu kata, ambil 3-4 karakter pertama
      kode = words[0].substring(0, 4).toUpperCase()
    } else {
      // Jika multiple words, ambil inisial dari 2-3 kata pertama
      kode = words.slice(0, 3).map(word => word.charAt(0)).join('').toUpperCase()
    }
    
    // Tambahkan timestamp untuk membuat unik
    const timestamp = Date.now().toString().slice(-4)
    return `${kode}${timestamp}`
  }

  // Auto-generate kode ketika nama barang berubah
  useEffect(() => {
    if (formData.nama_barang && !formData.kode_barang) {
      const generatedKode = generateKodeBarang()
      setFormData(prev => ({ ...prev, kode_barang: generatedKode }))
    }
  }, [formData.nama_barang])

  const handleGenerateKode = () => {
    const generatedKode = generateKodeBarang()
    setFormData(prev => ({ ...prev, kode_barang: generatedKode }))
  }

  const handleAddItem = () => {
    if (formData.nama_barang && formData.jumlah && formData.satuan) {
      const newItem: OrderItem = {
        id: Math.random().toString(),
        nama_barang: formData.nama_barang,
        jumlah: Number.parseInt(formData.jumlah),
        satuan: formData.satuan,
        kode_barang: formData.kode_barang || undefined,
        catatan: formData.catatan || undefined,
      }
      setOrderedItems([...orderedItems, newItem])
      setItemCount(itemCount + 1)
      setFormData({
        nama_barang: "",
        kode_barang: "",
        jumlah: "",
        satuan: "",
        catatan: "",
      })
    }
  }

  const handleRemoveItem = (id: string) => {
    setOrderedItems(orderedItems.filter((item) => item.id !== id))
  }

  const handleSubmit = () => {
    if (orderedItems.length > 0) {
      onAdd(orderedItems)
      setOrderedItems([])
      setItemCount(1)
      onClose()
    }
  }

  const handleClose = () => {
    setOrderedItems([])
    setItemCount(1)
    setFormData({
      nama_barang: "",
      kode_barang: "",
      jumlah: "",
      satuan: "",
      catatan: "",
    })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border-2 border-blue-400 bg-white shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between border-b-2 border-blue-200 bg-gradient-to-r from-blue-50 to-white p-6">
          <h2 className="text-2xl font-bold text-gray-800">Barang - {itemCount}</h2>
          <button onClick={handleClose} className="rounded-lg p-2 hover:bg-blue-100 transition-colors">
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Left Column - Form */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-800">List Barang</h3>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nama barang *
                </label>
                <input
                  type="text"
                  value={formData.nama_barang}
                  onChange={(e) => setFormData({ ...formData, nama_barang: e.target.value })}
                  placeholder="Enter product name"
                  className="w-full rounded-lg border-2 border-blue-300 px-4 py-3 font-poppins text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Kode Barang
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.kode_barang}
                    onChange={(e) => setFormData({ ...formData, kode_barang: e.target.value })}
                    placeholder="Kode akan digenerate otomatis"
                    className="flex-1 rounded-lg border-2 border-blue-300 px-4 py-3 font-poppins text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                  />
                  <Button
                    type="button"
                    onClick={handleGenerateKode}
                    disabled={!formData.nama_barang}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold border-2 border-blue-600 rounded-lg px-4 py-3 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                    title="Generate Kode Barang"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Generate
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Kode akan digenerate otomatis dari nama barang
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Jumlah *
                  </label>
                  <input
                    type="number"
                    value={formData.jumlah}
                    onChange={(e) => setFormData({ ...formData, jumlah: e.target.value })}
                    placeholder="0"
                    className="w-full rounded-lg border-2 border-blue-300 px-4 py-3 font-poppins text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Satuan *
                  </label>
                  <input
                    type="text"
                    value={formData.satuan}
                    onChange={(e) => setFormData({ ...formData, satuan: e.target.value })}
                    placeholder="e.g. pcs, box"
                    className="w-full rounded-lg border-2 border-blue-300 px-4 py-3 font-poppins text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Catatan</label>
                <textarea
                  value={formData.catatan}
                  onChange={(e) => setFormData({ ...formData, catatan: e.target.value })}
                  placeholder="Add notes here..."
                  rows={4}
                  className="w-full rounded-lg border-2 border-blue-300 px-4 py-3 font-poppins text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all resize-none"
                />
              </div>
            </div>

            {/* Right Column - Product List */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-800">Barang terdaftar</h3>

              <div className="relative">
                <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full rounded-lg border-2 border-blue-300 pl-10 pr-4 py-3 font-poppins text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                />
              </div>

              <div className="space-y-2 max-h-64 overflow-y-auto border-2 border-blue-300 rounded-lg p-4 bg-blue-50">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product, idx) => (
                    <button
                      key={idx}
                      onClick={() => setFormData({ ...formData, nama_barang: product })}
                      className="block w-full rounded-lg border border-blue-200 bg-white p-3 text-left text-sm text-gray-700 hover:bg-blue-100 hover:border-blue-400 transition-all font-poppins"
                    >
                      {product}
                    </button>
                  ))
                ) : (
                  <p className="text-center text-gray-500 py-4">No products found</p>
                )}
              </div>

              {orderedItems.length > 0 && (
                <div className="space-y-2 mt-4">
                  <h4 className="text-sm font-semibold text-gray-700">Items Added:</h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {orderedItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between rounded-lg border-2 border-blue-300 bg-blue-50 p-3"
                      >
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-700">{item.nama_barang}</p>
                          <p className="text-xs text-gray-500">
                            {item.jumlah} {item.satuan}
                            {item.kode_barang && ` • Kode: ${item.kode_barang}`}
                          </p>
                        </div>
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="rounded-lg p-2 hover:bg-red-100 transition-colors"
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t-2 border-blue-200 bg-gradient-to-r from-blue-50 to-white p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Button
              onClick={handleAddItem}
              disabled={!formData.nama_barang || !formData.jumlah || !formData.satuan}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold border-2 border-blue-600 rounded-lg py-3 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add Items
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={orderedItems.length === 0}
              className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-semibold border-2 border-green-600 rounded-lg py-3 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Confirm & Close
            </Button>
            <Button
              onClick={handleClose}
              className="w-full sm:w-auto bg-white hover:bg-blue-50 text-blue-600 font-semibold border-2 border-blue-300 rounded-lg py-3 transition-all duration-300"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}