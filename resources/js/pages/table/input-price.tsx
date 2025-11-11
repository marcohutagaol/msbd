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
import { CheckCircle2, ShoppingCart, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Input Price",
    href: "#",
  },
];

interface OrderItem {
  id: number;
  kode_barang?: string;
  nama_barang: string;
  jumlah_diajukan: number;
  jumlah_disetujui?: number;
  satuan: string;
  catatan?: string;
  status: "Pending" | "Approved" | "Rejected" | "Completed" | "Arrived";
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
      harga: tempPrices[order.id] || order.harga || 0
    }));
  }, [initialOrders, tempPrices]);

  // Hitung summary
  const summary = useMemo(() => {
    let totalHarga = 0;
    const itemsWithPrice: OrderItem[] = [];
    const itemsWithoutPrice: OrderItem[] = [];

    enhancedOrders.forEach(order => {
      const harga = tempPrices[order.id] || order.harga || 0;
      const jumlah = order.jumlah_disetujui || order.jumlah_diajukan;
      
      if (harga && harga > 0) {
        totalHarga += harga * jumlah;
        itemsWithPrice.push(order);
      } else {
        itemsWithoutPrice.push(order);
      }
    });

    return {
      totalBarang: enhancedOrders.length,
      totalHarga,
      itemsWithPrice,
      itemsWithoutPrice,
      departemen: enhancedOrders[0]?.request?.department || "N/A",
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

  // Mark item as arrived
  const handleMarkArrived = (itemId: number) => {
    router.post('/input-price/mark-arrived', {
      item_ids: [itemId]
    }, {
      onSuccess: () => {
        setArrived(true);
        setTimeout(() => {
          setArrived(false);
          router.reload();
        }, 1500);
      },
      onError: (errors) => {
        console.error("Error marking item as arrived:", errors);
        alert("Gagal menandai barang sudah sampai.");
      }
    });
  };

  const handleConfirm = () => {
    // Validasi: minimal ada satu item dengan harga
    const itemsWithValidPrice = Object.entries(tempPrices)
      .filter(([_, harga]) => harga > 0)
      .map(([itemId, harga]) => ({
        item_id: parseInt(itemId),
        harga: harga
      }));

    if (itemsWithValidPrice.length === 0) {
      alert("Minimal satu item harus memiliki harga sebelum konfirmasi preorder!");
      return;
    }

    router.post('/input-price/confirm-preorder', {
      price_data: itemsWithValidPrice
    }, {
      onSuccess: () => {
        setOpen(false);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          router.reload();
        }, 1500);
      },
      onError: (errors) => {
        console.error("Error confirming preorder:", errors);
        alert("Gagal membuat preorder. Silakan coba lagi.");
      }
    });
  };

  const resetAllPrices = () => {
    setTempPrices({});
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
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">
                        Input Harga Preorder
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg border border-blue-200 bg-blue-50">
                    <p className="text-sm font-medium text-slate-700">Total Item</p>
                    <p className="text-lg font-bold text-blue-700">{summary.totalBarang}</p>
                  </div>
                  
                  <div className="p-4 rounded-lg border border-green-200 bg-green-50">
                    <p className="text-sm font-medium text-slate-700">Item dengan Harga</p>
                    <p className="text-lg font-bold text-green-700">{summary.itemsWithPrice.length}</p>
                  </div>

                  <div className="p-4 rounded-lg border border-purple-200 bg-purple-50">
                    <p className="text-sm font-medium text-slate-700">Siap Dikonfirmasi</p>
                    <p className="text-lg font-bold text-purple-700">
                      {summary.itemsWithPrice.length > 0 ? 'Ya' : 'Tidak'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Orders List */}
              <div className="rounded-xl border-2 border-blue-400 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-900">
                    Daftar Item Request
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    Klik pensil untuk input harga, klik kotak untuk tandai sampai
                  </div>
                </div>
                
                <OrdersList 
                  mode="price" 
                  orders={enhancedOrders}
                  onPriceUpdate={updateTempPrice}
                  onMarkArrived={handleMarkArrived}
                />
              </div>

              {/* Action Buttons */}
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
                        summary.itemsWithPrice.length > 0
                          ? "bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/30"
                          : "bg-gray-400 cursor-not-allowed"
                      } text-white transition-all duration-300`}
                      disabled={summary.itemsWithPrice.length === 0}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Konfirmasi Preorder ({summary.itemsWithPrice.length} item)
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="max-w-md rounded-2xl border border-blue-100 shadow-xl">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="flex items-center gap-2 text-lg text-slate-900">
                        <CheckCircle2 className="w-5 h-5 text-blue-600" />
                        Konfirmasi Preorder
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-slate-600 text-sm leading-relaxed">
                        Konfirmasi preorder untuk {summary.itemsWithPrice.length} item dengan total harga:
                        <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200 text-center">
                          <p className="text-xl font-bold text-blue-700">
                            {formatRupiah(summary.totalHarga)}
                          </p>
                        </div>
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
                        Konfirmasi
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </>
          )}
        </div>
      </main>

      {/* Success Notification */}
      {success && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 px-5 py-3 shadow-lg shadow-green-100/60">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <p className="text-sm font-medium text-green-800">
              Preorder berhasil dikonfirmasi!
            </p>
          </div>
        </div>
      )}

      {arrived && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center gap-3 rounded-xl border border-blue-200 bg-blue-50 px-5 py-3 shadow-lg shadow-blue-100/60">
            <CheckCircle2 className="w-5 h-5 text-blue-600" />
            <p className="text-sm font-medium text-blue-800">
              Barang berhasil ditandai sudah sampai!
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