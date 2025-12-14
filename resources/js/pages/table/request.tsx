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
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-6 font-[Poppins]">
        <div className="mx-auto max-w-6xl space-y-6">
          {/* Main Card with Enhanced Design */}
          <div className="rounded-2xl border border-blue-200/50 dark:border-gray-700 bg-white/80 dark:bg-slate-800/90 backdrop-blur-sm p-8 shadow-xl shadow-blue-100/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-200/40">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 pb-6 border-b-2 border-gradient-to-r from-blue-200 via-blue-100 to-transparent">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg shadow-blue-500/30">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                    Permintaan Barang
                  </h2>
                </div>
                <p className="text-sm text-slate-600 dark:text-gray-400 ml-14 flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                  Departemen
                </p>
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="mt-4 sm:mt-0 group relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 font-semibold text-white transition-all duration-300 hover:from-blue-700 hover:to-blue-800 hover:shadow-lg hover:shadow-blue-500/50 hover:scale-105 active:scale-95"
              >
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <div className="relative flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span>Add Order</span>
                </div>
              </button>
            </div>

            {/* Items Display Section */}
            <div className="space-y-4">
              {orderedItems.length === 0 ? (
                <div className="text-center py-16 px-4">
                  <div className="inline-flex p-4 bg-blue-50 rounded-full mb-4">
                    <svg className="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                  </div>
                  <p className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">Belum ada item yang ditambahkan</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">Klik tombol "Add Order" untuk menambahkan item permintaan</p>
                </div>
              ) : (
                orderedItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="group relative flex items-center justify-between rounded-xl border-2 border-blue-100 dark:border-gray-700 bg-gradient-to-br from-blue-50/50 to-white dark:from-slate-700 dark:to-slate-800 p-5 transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-lg hover:shadow-blue-100/50 hover:-translate-y-0.5"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {/* Item Number Badge */}
                    <div className="absolute -left-3 -top-3 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-sm font-bold text-white shadow-lg shadow-blue-500/40">
                      {index + 1}
                    </div>

                    <div className="flex-1 pl-4">
                      <h4 className="font-bold text-gray-900 dark:text-white text-lg">{item.nama_barang}</h4>
                      <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                        <span className="inline-flex items-center gap-1.5 bg-blue-100 px-3 py-1 rounded-full">
                          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                          </svg>
                          <span className="font-semibold text-blue-700">{item.jumlah} {item.satuan}</span>
                        </span>
                        {item.kode_barang && (
                          <span className="inline-flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-full">
                            <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                            </svg>
                            <span className="font-medium text-slate-700">{item.kode_barang}</span>
                          </span>
                        )}
                      </div>
                      {item.catatan && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 italic bg-gray-50 dark:bg-slate-700 px-3 py-1.5 rounded-lg inline-block">
                          💬 {item.catatan}
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="ml-4 rounded-xl p-2.5 text-red-500 hover:bg-red-100 hover:text-red-700 transition-all duration-200 hover:scale-110 active:scale-95"
                      title="Hapus item"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Notes Section */}
            {orderedItems.length > 0 && (
              <div className="mt-8 p-6 bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-900 rounded-xl border-2 border-slate-200 dark:border-gray-700">
                <label className="block text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Catatan Tambahan (Opsional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Tambahkan catatan untuk request ini..."
                  rows={3}
                  className="w-full rounded-xl border-2 border-slate-300 dark:border-gray-600 dark:bg-slate-700 dark:text-gray-200 px-4 py-3 text-gray-700 placeholder-gray-400 dark:placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all resize-none"
                />
              </div>
            )}
          </div>

          {/* Send Button */}
          {orderedItems.length > 0 && (
            <div className="flex justify-end">
              <button
                onClick={handleSendRequest}
                disabled={processing}
                className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-10 py-4 font-bold text-white shadow-xl shadow-blue-500/40 transition-all duration-300 hover:from-blue-700 hover:to-blue-800 hover:shadow-2xl hover:shadow-blue-600/50 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 active:scale-95"
              >
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <div className="relative flex items-center gap-3">
                  {processing ? (
                    <>
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Mengirim...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      <span>Sending Request</span>
                    </>
                  )}
                </div>
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