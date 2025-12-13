"use client";

import React, { useState } from "react";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { Head, router } from "@inertiajs/react";
import { CheckCircle2, AlertCircle } from "lucide-react";
import AddOrderModal from "@/components/ui/add-order-modal";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Permintaan Barang",
    href: "#",
  },
];

interface OrderItem {
  id: string;
  nama_barang: string;
  jumlah: number;
  satuan: string;
  kode_barang?: string;
  catatan?: string;
}

function OrdersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [orderedItems, setOrderedItems] = useState<OrderItem[]>([]);
  const [notes, setNotes] = useState("");
  const [processing, setProcessing] = useState(false);

  const handleAddItems = (items: OrderItem[]) => {
    setOrderedItems([...orderedItems, ...items]);
    setIsModalOpen(false);
  };

  const handleRemoveItem = (id: string) => {
    setOrderedItems(orderedItems.filter((item) => item.id !== id));
  };

  const handleSendRequest = () => {
    if (orderedItems.length === 0) {
      setError(true);
      setTimeout(() => setError(false), 3000);
      return;
    }

    // Format items sesuai dengan validasi backend
    const formattedItems = orderedItems.map((item) => ({
      kode_barang: item.kode_barang || null,
      nama_barang: item.nama_barang,
      jumlah: item.jumlah, // Tetap 'jumlah' sesuai validasi
      satuan: item.satuan,
      catatan: item.catatan || null,
    }));

    const requestData = {
      department: "Departemen", // TODO: Ambil dari user session/props
      notes: notes,
      items: formattedItems
    };

    console.log("Sending data:", requestData);

    setProcessing(true);

    // Kirim menggunakan router.post
    router.post("/requests", requestData, {
      onSuccess: (page) => {
        console.log("Request berhasil!", page);
        setSuccess(true);
        setProcessing(false);
        setTimeout(() => {
          setSuccess(false);
          setOrderedItems([]);
          setNotes("");
          // Hanya redirect jika benar-benar perlu
          if (page.props.success) {
            router.visit("/monitoring-item");
          }
        }, 2500);
      },
      onError: (errors) => {
        console.error("Error submitting request:", errors);
        setError(true);
        setProcessing(false);
        setTimeout(() => setError(false), 3000);
      },
      preserveState: true
    });
  };

  return (
    <>
      <Head title="Request Item" />
      <main className="min-h-screen bg-white p-6 font-[Poppins]">
        <div className="mx-auto max-w-6xl space-y-6">
          <div className="rounded-xl border-2 border-blue-400 p-6 shadow-sm bg-white transition-all duration-300 hover:shadow-lg hover:border-blue-500">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  {/* <div className="h-3 w-3 rounded-full bg-blue-600 shadow-md shadow-blue-400/50"></div> */}
                  <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                    Permintaan Barang
                  </h2>
                </div>
                <p className="text-sm text-slate-600 ml-5 mt-1">
                  Departemen
                </p>
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="mt-3 sm:mt-0 rounded-lg bg-blue-600 px-6 py-2.5 font-medium text-white transition-all duration-300 hover:bg-blue-700 hover:shadow-md hover:shadow-blue-400/30"
              >
                Add Order
              </button>
            </div>

            {/* Display ordered items */}
            <div className="space-y-3">
              {orderedItems.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <p>Belum ada item yang ditambahkan</p>
                  <p className="text-sm mt-2">Klik "Add Order" untuk menambahkan item</p>
                </div>
              ) : (
                orderedItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-lg border-2 border-blue-200 bg-blue-50 p-4 transition-all hover:border-blue-300"
                  >
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">{item.nama_barang}</h4>
                      <div className="flex gap-4 mt-1 text-sm text-gray-600">
                        <span>Jumlah: {item.jumlah} {item.satuan}</span>
                        {item.kode_barang && <span>Kode: {item.kode_barang}</span>}
                      </div>
                      {item.catatan && (
                        <p className="text-xs text-gray-500 mt-1">Catatan: {item.catatan}</p>
                      )}
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="ml-4 rounded-lg p-2 text-red-500 hover:bg-red-100 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Notes section */}
            {orderedItems.length > 0 && (
              <div className="mt-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Catatan Tambahan (Opsional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Tambahkan catatan untuk request ini..."
                  rows={3}
                  className="w-full rounded-lg border-2 border-blue-300 px-4 py-3 text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all resize-none"
                />
              </div>
            )}
          </div>

          {orderedItems.length > 0 && (
            <div className="flex justify-end">
              <button
                onClick={handleSendRequest}
                disabled={processing}
                className="rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white shadow-md shadow-blue-500/30 transition-all duration-300 hover:bg-blue-700 hover:shadow-blue-600/40 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {processing ? "Mengirim..." : "Sending Request"}
              </button>
            </div>
          )}
        </div>
      </main>

      <AddOrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddItems}
      />

      {/* Success notification */}
      {success && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 px-5 py-3 shadow-md shadow-green-100/60">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <p className="text-sm font-medium text-green-800">
              Request berhasil dikirim! Barang akan segera diproses.
            </p>
          </div>
        </div>
      )}

      {/* Error notification */}
      {error && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-5 py-3 shadow-md shadow-red-100/60">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <p className="text-sm font-medium text-red-800">
              {orderedItems.length === 0 
                ? "Silakan tambahkan item terlebih dahulu sebelum mengirim request."
                : "Gagal mengirim request. Silakan coba lagi."}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

OrdersPage.layout = (page: React.ReactNode) => (
  <AppLayout breadcrumbs={breadcrumbs}>{page}</AppLayout>
);

export default OrdersPage;