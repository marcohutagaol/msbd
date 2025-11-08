import React, { useState, useMemo, useEffect } from "react";
import { OrdersList } from "@/components/ui/orders-list";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { Head, router } from "@inertiajs/react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { CheckCircle2, ShoppingCart, FileText, PackageCheck, Calculator, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Input Price",
    href: "#",
  },
];

interface PurchaseData {
  id?: number;
  request_id: number;
  request_number: string;
  total_harga: number;
  status: string;
  tanggal_beli?: string;
}

interface OrderItem {
  id: number;
  kode_barang?: string;
  nama_barang: string;
  jumlah_diajukan: number;
  jumlah_disetujui?: number;
  satuan: string;
  catatan?: string;
  status: "Pending" | "Approved" | "Rejected" | "Completed";
  harga?: number;
  request?: {
    id: number;
    request_number: string;
    department: string;
    request_date: string;
    notes?: string;
  };
}

interface InputPricePageProps {
  orders: OrderItem[];
}

function InputPricePage({ orders: initialOrders = [] }: InputPricePageProps) {
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [finalized, setFinalized] = useState(false);
  const [arrived, setArrived] = useState(false);
  
  // State untuk menyimpan harga temporary
  const [tempPrices, setTempPrices] = useState<{ [key: number]: number }>({});

  // Initialize tempPrices dari initial orders
  useEffect(() => {
    const initialTempPrices: { [key: number]: number } = {};
    initialOrders.forEach(order => {
      if (order.harga) {
        initialTempPrices[order.id] = order.harga;
      }
    });
    setTempPrices(initialTempPrices);
  }, [initialOrders]);

  // Enhance orders dengan harga temporary
  const enhancedOrders = useMemo(() => {
    return initialOrders.map(order => ({
      ...order,
      harga: tempPrices[order.id] || 0
    }));
  }, [initialOrders, tempPrices]);

  // Hitung summary dari harga temporary
  const summary = useMemo(() => {
    let totalHarga = 0;
    const itemsWithPrice: OrderItem[] = [];
    const itemsWithoutPrice: OrderItem[] = [];

    enhancedOrders.forEach(order => {
      const harga = tempPrices[order.id];
      const jumlah = order.jumlah_disetujui || order.jumlah_diajukan;
      
      if (harga && harga > 0) {
        totalHarga += harga * jumlah;
        itemsWithPrice.push(order);
      } else {
        itemsWithoutPrice.push(order);
      }
    });

    const requestIds = [...new Set(enhancedOrders
      .map(item => item.request?.id)
      .filter((requestId): requestId is number => !!requestId)
    )];

    return {
      totalBarang: enhancedOrders.length,
      totalHarga,
      itemsWithPrice,
      itemsWithoutPrice,
      departemen: enhancedOrders[0]?.request?.department || "N/A",
      requestIds: requestIds,
      allItemsHavePrice: itemsWithoutPrice.length === 0 && enhancedOrders.length > 0,
      progress: enhancedOrders.length > 0 ? (itemsWithPrice.length / enhancedOrders.length) * 100 : 0
    };
  }, [enhancedOrders, tempPrices]);

  // Update harga temporary
  const updateTempPrice = (itemId: number, harga: number) => {
    setTempPrices(prev => ({
      ...prev,
      [itemId]: harga
    }));
  };

  // Reset semua harga
  const resetAllPrices = () => {
    setTempPrices({});
  };

  const handleConfirm = () => {
    if (!summary.allItemsHavePrice) {
      alert("Semua item harus memiliki harga sebelum membuat preorder!");
      return;
    }

    // Siapkan data untuk dikirim ke backend
    const priceData = Object.entries(tempPrices)
      .filter(([_, harga]) => harga > 0)
      .map(([itemId, harga]) => ({
        item_id: parseInt(itemId),
        harga: harga
      }));

    if (priceData.length === 0) {
      alert("Tidak ada harga yang valid untuk dikonfirmasi!");
      return;
    }

    router.post('/input-price/confirm-preorder', {
      price_data: priceData
    }, {
      onSuccess: () => {
        setOpen(false);
        setSuccess(true);
        setFinalized(true);
        setTimeout(() => setSuccess(false), 3000);
      },
      onError: (errors) => {
        console.error("Error confirming preorder:", errors);
        alert("Gagal membuat preorder. Silakan coba lagi.");
      }
    });
  };

  const handleItemArrived = () => {
    const itemIds = enhancedOrders.map(item => item.id);
    
    router.post('/input-price/mark-arrived', {
      item_ids: itemIds
    }, {
      onSuccess: () => {
        setArrived(true);
        setTimeout(() => {
          setArrived(false);
          router.visit('/monitoring-item');
        }, 3000);
      },
      onError: (errors) => {
        console.error("Error marking items as arrived:", errors);
        alert("Gagal menandai barang sudah diterima. Silakan coba lagi.");
      }
    });
  };

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <>
      <Head title="Input Price" />
      <main className="min-h-screen bg-white p-6 font-[Poppins]">
        <div className="mx-auto max-w-7xl space-y-6">
          {initialOrders.length === 0 ? (
            <div className="rounded-xl border-2 border-gray-200 p-12 text-center bg-gray-50">
              <ShoppingCart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Tidak Ada Item yang Perlu Input Harga
              </h3>
              <p className="text-gray-500">
                Semua item sudah memiliki harga atau belum ada item yang disetujui.
              </p>
            </div>
          ) : (
            <>
              {/* Summary Card */}
              <div className="rounded-xl border-2 border-blue-400 bg-white p-6 shadow-sm">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4 gap-4">
                  <div className="flex items-center gap-3">
                    <Calculator className="w-6 h-6 text-blue-600" />
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">
                        Ringkasan Input Harga
                      </h2>
                      <p className="text-sm text-slate-600">
                        Departemen: {summary.departemen}
                      </p>
                    </div>
                  </div>
                  <div className="text-center lg:text-right">
                    <p className="text-2xl font-bold text-blue-700">
                      {formatRupiah(summary.totalHarga)}
                    </p>
                    <p className="text-sm text-slate-600">
                      {summary.itemsWithPrice.length} dari {summary.totalBarang} item
                    </p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-slate-600 mb-2">
                    <span>Progress Input Harga</span>
                    <span>{Math.round(summary.progress)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${summary.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className={`p-4 rounded-lg border ${
                    summary.allItemsHavePrice 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-yellow-50 border-yellow-200'
                  }`}>
                    <p className="text-sm font-medium text-slate-700">Status</p>
                    <p className={`text-lg font-bold ${
                      summary.allItemsHavePrice ? 'text-green-700' : 'text-yellow-700'
                    }`}>
                      {summary.allItemsHavePrice ? 'Siap Konfirmasi' : 'Periksa Harga'}
                    </p>
                  </div>
                  
                  <div className="p-4 rounded-lg border border-blue-200 bg-blue-50">
                    <p className="text-sm font-medium text-slate-700">Total Item</p>
                    <p className="text-lg font-bold text-blue-700">{summary.totalBarang}</p>
                  </div>
                  
                  <div className="p-4 rounded-lg border border-purple-200 bg-purple-50">
                    <p className="text-sm font-medium text-slate-700">Request</p>
                    <p className="text-lg font-bold text-purple-700">{summary.requestIds.length}</p>
                  </div>

                  <div className="p-4 rounded-lg border border-emerald-200 bg-emerald-50">
                    <p className="text-sm font-medium text-slate-700">Item Terisi</p>
                    <p className="text-lg font-bold text-emerald-700">
                      {summary.itemsWithPrice.length}/{summary.totalBarang}
                    </p>
                  </div>
                </div>

                {summary.itemsWithoutPrice.length > 0 && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm font-medium text-red-700 mb-2">
                      📋 Item yang belum diisi harga ({summary.itemsWithoutPrice.length} item):
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {summary.itemsWithoutPrice.map(item => (
                        <span key={item.id} className="text-xs bg-red-100 text-red-800 px-3 py-1 rounded-full border border-red-200">
                          {item.nama_barang}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Orders List */}
              <div className={`rounded-xl border-2 ${
                finalized ? "border-green-400 bg-green-50/30" : "border-blue-400 bg-white"
              } p-6 shadow-sm transition-all duration-300`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-900">
                    Daftar Item Request
                  </h3>
                  {!finalized && (
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      Klik ikon pensil untuk input harga
                    </div>
                  )}
                </div>
                
                <OrdersList 
                  mode="price" 
                  disabled={finalized} 
                  orders={enhancedOrders}
                  onPriceUpdate={updateTempPrice}
                />
              </div>

              {/* Action Buttons */}
              {!finalized && (
                <div className="flex flex-col sm:flex-row justify-end gap-4">
                  <Button
                    variant="outline"
                    onClick={resetAllPrices}
                    className="flex items-center gap-2 border-red-300 text-red-700 hover:bg-red-50 hover:border-red-400 transition-all"
                    disabled={Object.keys(tempPrices).length === 0}
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset Semua Harga
                  </Button>
                  
                  <AlertDialog open={open} onOpenChange={setOpen}>
                    <AlertDialogTrigger asChild>
                      <Button
                        className={`flex items-center gap-2 ${
                          summary.allItemsHavePrice
                            ? "bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/30"
                            : "bg-gray-400 cursor-not-allowed"
                        } text-white transition-all duration-300`}
                        disabled={!summary.allItemsHavePrice}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        Konfirmasi Preorder
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="max-w-md rounded-2xl border border-blue-100 shadow-xl">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center gap-2 text-lg text-slate-900">
                          <CheckCircle2 className="w-5 h-5 text-blue-600" />
                          Konfirmasi Preorder
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-slate-600 text-sm leading-relaxed">
                          Apakah Anda yakin ingin membuat preorder dengan data berikut?
                          <div className="mt-4 space-y-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <div className="flex justify-between">
                              <span className="font-medium">Total Harga:</span>
                              <span className="font-bold text-blue-700">{formatRupiah(summary.totalHarga)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="font-medium">Total Item:</span>
                              <span className="font-semibold">{summary.totalBarang}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="font-medium">Departemen:</span>
                              <span className="font-semibold">{summary.departemen}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="font-medium">Jumlah Request:</span>
                              <span className="font-semibold">{summary.requestIds.length}</span>
                            </div>
                          </div>
                          <p className="mt-3 text-xs text-orange-600">
                            Setelah dikonfirmasi, data akan dikunci dan tidak bisa diubah.
                          </p>
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter className="pt-4">
                        <AlertDialogCancel className="rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-300 transition-all">
                          Batal
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleConfirm}
                          className="rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow-sm shadow-blue-500/30 transition-all"
                        >
                          Ya, Konfirmasi Preorder
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              )}

              {/* Finalized Summary */}
              {finalized && (
                <div className="mt-6 rounded-xl border border-green-200 bg-green-50/60 p-6 shadow-sm animate-in fade-in duration-500">
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                    <h3 className="text-lg font-semibold text-green-800">
                      Preorder Berhasil Dikonfirmasi
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-lg border border-green-100 shadow-sm">
                      <p className="text-sm text-slate-600">Total Barang</p>
                      <p className="text-xl font-bold text-slate-900">{summary.totalBarang}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-green-100 shadow-sm">
                      <p className="text-sm text-slate-600">Total Harga</p>
                      <p className="text-xl font-bold text-green-700">{formatRupiah(summary.totalHarga)}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-green-100 shadow-sm">
                      <p className="text-sm text-slate-600">Departemen</p>
                      <p className="text-lg font-semibold text-slate-900">{summary.departemen}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-green-100 shadow-sm">
                      <p className="text-sm text-slate-600">Status</p>
                      <p className="text-lg font-semibold text-green-600">Approved</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg border border-green-100 p-4 mb-6">
                    <p className="text-sm font-medium text-slate-700 mb-3">Detail per Request:</p>
                    <div className="space-y-2">
                      {summary.requestIds.map(requestId => {
                        const requestItems = enhancedOrders.filter(item => item.request?.id === requestId);
                        const requestTotal = requestItems.reduce((total, item) => {
                          const harga = tempPrices[item.id] || 0;
                          const jumlah = item.jumlah_disetujui || item.jumlah_diajukan;
                          return total + (harga * jumlah);
                        }, 0);
                        
                        return (
                          <div key={requestId} className="flex justify-between items-center py-2 px-3 bg-green-50 rounded border border-green-200">
                            <span className="text-sm text-slate-700">
                              Request: {requestItems[0]?.request?.request_number || `#${requestId}`}
                            </span>
                            <div className="text-right">
                              <span className="text-sm font-medium text-green-700 block">
                                {formatRupiah(requestTotal)}
                              </span>
                              <span className="text-xs text-slate-500">
                                {requestItems.length} item
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row justify-end gap-3">
                    <Button
                      variant="outline"
                      className="flex items-center gap-2 border-blue-300 text-blue-700 hover:bg-blue-50"
                      onClick={() => window.print()}
                    >
                      <FileText className="w-4 h-4" />
                      Cetak PDF
                    </Button>

                    <Button
                      className="flex items-center gap-2 bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm shadow-emerald-400/40 transition-all duration-300"
                      onClick={handleItemArrived}
                    >
                      <PackageCheck className="w-4 h-4" />
                      Barang Sudah Sampai
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* Success Notification */}
      {success && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 px-5 py-3 shadow-lg shadow-green-100/60">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <div>
              <p className="text-sm font-medium text-green-800">
                Preorder berhasil dikonfirmasi!
              </p>
              <p className="text-xs text-green-600">
                Total: {formatRupiah(summary.totalHarga)}
              </p>
            </div>
          </div>
        </div>
      )}

      {arrived && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-3 shadow-lg shadow-emerald-100/60">
            <PackageCheck className="w-5 h-5 text-emerald-600" />
            <p className="text-sm font-medium text-emerald-800">
              Barang telah diterima! Mengarahkan ke monitoring...
            </p>
          </div>
        </div>
      )}
    </>
  );
}

InputPricePage.layout = (page: React.ReactNode) => (
  <AppLayout breadcrumbs={breadcrumbs}>{page}</AppLayout>
);

export default InputPricePage;