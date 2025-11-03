"use client";

import React, { useState } from "react";
import { OrdersList } from "@/components/ui/orders-list";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { Head } from "@inertiajs/react";
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
import { CheckCircle2, ShoppingCart, FileText, PackageCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Input Price",
    href: "#",
  },
];

function OrdersPage() {
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [finalized, setFinalized] = useState(false);
  const [arrived, setArrived] = useState(false); // ✅ untuk tombol "Item Has Arrived"

  const handleConfirm = () => {
    setOpen(false);
    setSuccess(true);
    setFinalized(true);
    setTimeout(() => setSuccess(false), 2500);
  };

  const handleItemArrived = () => {
    setArrived(true);
    setTimeout(() => setArrived(false), 2500);
  };

  // Dummy ringkasan
  const summary = {
    totalBarang: 10,
    totalHarga: 12300000,
    departemen: "Procurement Department",
  };

  return (
    <>
      <Head title="Input Price" />
      <main className="min-h-screen bg-white p-6 font-[Poppins]">
        <div className="mx-auto max-w-6xl space-y-6">
          {/* 🧩 Container utama */}
          <div
            className={`rounded-xl border-2 ${
              finalized ? "border-green-400" : "border-blue-400"
            } p-6 shadow-sm bg-white transition-all duration-300 hover:shadow-lg ${
              finalized ? "hover:border-green-500" : "hover:border-blue-500"
            }`}
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <div
                    className={`h-3 w-3 rounded-full ${
                      finalized ? "bg-green-600" : "bg-blue-600"
                    } shadow-md shadow-blue-400/50`}
                  ></div>
                  <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                    Input Price
                  </h2>
                </div>
              </div>
              {finalized && (
                <span className="mt-3 sm:mt-0 inline-flex items-center gap-2 text-sm font-medium text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  Preorder dikonfirmasi
                </span>
              )}
            </div>

            {/* List Orders */}
            <OrdersList mode="price" disabled={finalized} />
          </div>

          {/* 🟢 Tombol Make Preorder */}
          {!finalized && (
            <div className="flex justify-end">
              <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogTrigger asChild>
                  <button className="rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white shadow-md shadow-blue-500/30 transition-all duration-300 hover:bg-blue-700 hover:shadow-blue-600/40">
                    Make Preorder
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent className="max-w-md rounded-2xl border border-blue-100 shadow-lg shadow-blue-100/50">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-2 text-lg text-slate-900">
                      <ShoppingCart className="w-5 h-5 text-blue-600" />
                      Konfirmasi Preorder
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-slate-600 text-sm leading-relaxed">
                      Apakah Anda yakin ingin membuat preorder? <br />
                      Setelah dikonfirmasi, data akan dikunci dan tidak bisa
                      diubah.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="pt-4">
                    <AlertDialogCancel className="rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all">
                      Batal
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleConfirm}
                      className="rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow-sm shadow-blue-500/30 transition-all"
                    >
                      Ya, Buat Preorder
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}

          {/* 📊 Ringkasan setelah preorder */}
          {finalized && (
            <div className="mt-6 rounded-xl border border-green-200 bg-green-50/60 p-6 shadow-sm animate-in fade-in duration-500">
              <h3 className="text-lg font-semibold text-green-800 mb-3">
                Ringkasan Preorder
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-lg bg-white border border-green-100 p-4 shadow-sm">
                  <p className="text-sm text-slate-600">Total Barang</p>
                  <p className="text-xl font-bold text-slate-900">
                    {summary.totalBarang}
                  </p>
                </div>
                <div className="rounded-lg bg-white border border-green-100 p-4 shadow-sm">
                  <p className="text-sm text-slate-600">Total Harga</p>
                  <p className="text-xl font-bold text-slate-900">
                    Rp {summary.totalHarga.toLocaleString("id-ID")}
                  </p>
                </div>
                <div className="rounded-lg bg-white border border-green-100 p-4 shadow-sm">
                  <p className="text-sm text-slate-600">Departemen</p>
                  <p className="text-lg font-semibold text-slate-900">
                    {summary.departemen}
                  </p>
                </div>
              </div>

              {/* Tombol aksi */}
              <div className="flex flex-col sm:flex-row sm:justify-end gap-3 mt-6">
                <Button
                  variant="outline"
                  className="flex items-center gap-2 border-blue-300 text-blue-700 hover:bg-blue-50"
                  onClick={() => console.log("Cetak PDF")}
                >
                  <FileText className="w-4 h-4" />
                  Cetak PDF
                </Button>

                <Button
                  className="flex items-center gap-2 bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm shadow-emerald-400/40 transition-all duration-300"
                  onClick={handleItemArrived}
                >
                  <PackageCheck className="w-4 h-4" />
                  Item Has Arrived
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ✅ Notifikasi preorder sukses */}
      {success && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 px-5 py-3 shadow-md shadow-green-100/60">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <p className="text-sm font-medium text-green-800">
              Preorder berhasil dibuat!
            </p>
          </div>
        </div>
      )}

      {/* ✅ Notifikasi item tiba */}
      {arrived && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-3 shadow-md shadow-emerald-100/60">
            <PackageCheck className="w-5 h-5 text-emerald-600" />
            <p className="text-sm font-medium text-emerald-800">
              Barang telah diterima!
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
