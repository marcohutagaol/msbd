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
import { CheckCircle2, ShoppingCart, RotateCcw, FileText, Download, Calendar, Package, Building2, Hash, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import InvoiceSummary from "@/components/ui/invoice";



interface OrderItem {
  id: number;
  kode_barang?: string;
  nama_barang: string;
  jumlah_diajukan: number;
  jumlah_disetujui?: number;
  request_item_id?: number; // tambahkan ini
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
  invoice_count: number;
  invoice_number: string | null;
  request_id: number;

}

function InputPricePage({
  orders: initialOrders = [],
  invoice_count,
  invoice_number,
  request_id
}: InputPricePageProps) {


  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [arrived, setArrived] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);

  const requestNumber = initialOrders[0]?.request?.request_number;

  const breadcrumbs: BreadcrumbItem[] = [
    { title: "Purchasing", href: "/dashboard-purchasing" },
    {
      title: "Detail Request",
      href: requestNumber ? `/purchasing/${requestNumber}` : "#"
    },
    { title: "Input Price", href: "#" },
  ];

  const [tempPrices, setTempPrices] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    const initialTempPrices: { [key: number]: number } = {};
    initialOrders.forEach(order => {
      if (order.harga) {
        initialTempPrices[order.id] = order.harga;

      }
    });

    setTempPrices(initialTempPrices);
  }, [initialOrders]);

  // 🔥 Auto-check if all items arrived whenever orders change
  useEffect(() => {
    const allArrived = initialOrders.every(order => order.status === "Arrived");

    if (allArrived && initialOrders.length > 0 && requestNumber) {
      if (typeof window !== 'undefined') {
        const currentStatus = localStorage.getItem(`timeline-status-${requestNumber}`);
        // Only update if not already Done to avoid repeated actions
        if (currentStatus !== 'Done') {
          localStorage.setItem(`timeline-status-${requestNumber}`, 'Done');
        }
      }
    }
  }, [initialOrders, requestNumber]);

  const enhancedOrders = useMemo(() => {
    return initialOrders.map(order => ({
      ...order,
      harga: tempPrices[order.id] || order.harga || 0
    }));
  }, [initialOrders, tempPrices]);

  console.log("ENHANCED ORDER:", enhancedOrders[0]);

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
      requestDate: enhancedOrders[0]?.request?.request_date || new Date().toISOString(), // ✅ TAMBAHAN
      allItemsHavePrice: itemsWithoutPrice.length === 0 && enhancedOrders.length > 0,
      progress: enhancedOrders.length > 0 ? (itemsWithPrice.length / enhancedOrders.length) * 100 : 0
    };
  }, [enhancedOrders, tempPrices]);

  // Update harga temporary
  const updateTempPrice = (requestItemId: number, harga: number) => {
    setTempPrices(prev => ({
      ...prev,
      [requestItemId]: harga
    }));
  };



  const handleMarkArrived = (itemId: number) => {
    router.post('/input-price/mark-arrived', {
      item_ids: [itemId]
    }, {
      onSuccess: () => {
        setArrived(true);
        setTimeout(() => {
          setArrived(false);
          router.reload();

          // 🔥 Check if all items are now "Arrived" after reload
          setTimeout(() => {
            checkAndUpdateTimelineToDone();
          }, 500);
        }, 1500);
      },
      onError: (errors) => {
        console.error("Error marking item as arrived:", errors);
        alert("Gagal menandai barang sudah sampai.");
      }
    });
  };

  // 🔥 Helper function to check if all items arrived and update timeline to Done
  const checkAndUpdateTimelineToDone = () => {
    const allArrived = enhancedOrders.every(order => order.status === "Arrived");

    if (allArrived && enhancedOrders.length > 0 && requestNumber) {
      // Update timeline to Done
      if (typeof window !== 'undefined') {
        const currentStatus = localStorage.getItem(`timeline-status-${requestNumber}`);
        if (currentStatus !== 'Done') {
          localStorage.setItem(`timeline-status-${requestNumber}`, 'Done');

          // Show celebration notification
          const notification = document.createElement('div');
          notification.className = 'fixed top-4 right-4 z-50 bg-white border-2 border-green-500 rounded-lg shadow-2xl p-4 flex items-center gap-3 animate-slide-in-right';
          notification.innerHTML = `
            <div class="flex items-center justify-center w-10 h-10 bg-green-100 rounded-full">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <div>
              <p class="font-semibold text-gray-800">🎉 Pembelian Selesai!</p>
              <p class="text-sm text-gray-600">Semua barang sudah sampai</p>
            </div>
          `;
          document.body.appendChild(notification);
          setTimeout(() => {
            notification.style.animation = 'slide-out-right 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
          }, 3000);
        }
      }
    }
  };

  const handleConfirm = () => {
    const itemsWithValidPrice = Object.entries(tempPrices)
      .filter(([_, harga]) => harga > 0)
      .map(([requestItemId, harga]) => ({
        request_item_id: parseInt(requestItemId),
        harga: harga
      }));




    const requestId = initialOrders[0]?.request?.id;

    if (!requestId) {
      alert("Request ID tidak ditemukan!");
      return;
    }


    router.post(
      "/input-price/confirm-preorder",
      {
        request_id: requestId,
        price_data: itemsWithValidPrice
      },
      {
        onSuccess: () => {
          // ✅ INI KUNCI UTAMANYA
          setOpen(false);
          setSuccess(true);
          setShowInvoice(true);   // ⬅️ INVOICE MUNCUL DI HALAMAN INI

          // 🔥 UPDATE TIMELINE KE "Pembayaran" ketika invoice dibuat (per request)
          if (typeof window !== 'undefined' && requestNumber) {
            localStorage.setItem(`timeline-status-${requestNumber}`, 'Pembayaran');
          }

          setTimeout(() => {
            setSuccess(false);
          }, 2000);
        },
        onError: (err) => {
          console.error("Gagal:", err);
          alert("Gagal membuat invoice!");
        }
      }
    );
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

  // ✅ TAMBAHAN: Format tanggal
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  // ✅ TAMBAHAN: Generate invoice number
  const generateInvoiceNumber = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const random = Math.floor(Math.random() * 9999).toString().padStart(4, '0');
    return `INV/${year}/${month}/${random}`;
  };

  const invoiceNumber = useMemo(() => generateInvoiceNumber(), [showInvoice]);

  // ✅ TAMBAHAN: Download PDF function

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
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
                  invoiceMade={invoice_count > 0}
                />

              </div>

              {/* Action Buttons */}
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

                {invoice_count > 0 ? (
                  // ==========================
                  //  JIKA SUDAH ADA INVOICE
                  // ==========================
                  <Button
                    onClick={() => {
                      // 🔥 Update timeline ke Pembayaran sebelum navigate (per request)
                      if (typeof window !== 'undefined' && requestNumber) {
                        localStorage.setItem(`timeline-status-${requestNumber}`, 'Pembayaran');
                      }
                      router.visit(`/invoice/${invoice_number}`);
                    }}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-500/30"
                  >
                    <FileText className="w-4 h-4" />
                    Lihat Invoice
                  </Button>

                ) : (
                  <AlertDialog open={open} onOpenChange={setOpen}>
                    <AlertDialogTrigger asChild>
                      <Button
                        className={`flex items-center gap-2 ${summary.itemsWithPrice.length > 0
                          ? "bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/30"
                          : "bg-gray-400 cursor-not-allowed"
                          } text-white transition-all duration-300`}
                        disabled={summary.itemsWithPrice.length === 0}
                      >
                        <FileText className="w-4 h-4" />
                        Buat Invoice ({summary.itemsWithPrice.length} item)
                      </Button>
                    </AlertDialogTrigger>

                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Konfirmasi Invoice</AlertDialogTitle>
                        <AlertDialogDescription>
                          Total: <b>{formatRupiah(summary.totalHarga)}</b>
                        </AlertDialogDescription>
                      </AlertDialogHeader>

                      <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>

                        <Button
                          type="button"
                          onClick={handleConfirm}
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          Konfirmasi
                        </Button>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </div>
              <InvoiceSummary
                show={showInvoice}
                invoiceNumber={invoiceNumber}
                requestNumber={requestNumber}
                summary={summary}
                formatDate={formatDate}
                formatRupiah={formatRupiah}

              />

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
              Invoice berhasil dibuat!
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
    </AppLayout>
  );
}




export default InputPricePage;