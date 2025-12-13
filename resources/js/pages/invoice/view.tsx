import React from "react";
import AppLayout from "@/layouts/app-layout";
import { Head } from "@inertiajs/react";
import { Receipt, FileText, Package } from "lucide-react";


interface PurchaseItem {
    id: number;
    nama_barang: string;
    jumlah: number;
    harga_item: number;
    total_harga: number;
}

interface InvoiceData {
    id: number;
    invoice_number: string;
    total_harga: number;
    purchases: PurchaseItem[];
}

interface InvoiceProps {
    invoice: InvoiceData;
}

const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
};



export default function InvoiceView({ invoice }: InvoiceProps) {
    return (
        <>
            <Head title="Invoice Detail" />

            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
                <div className="max-w-5xl mx-auto">
                    {/* Header Section */}
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-blue-600 rounded-lg">
                                <Receipt className="w-6 h-6 text-white" />
                            </div>
                            <h1 className="text-3xl font-bold text-gray-800">Invoice Detail</h1>
                        </div>
                        <p className="text-gray-600 ml-14">Detail lengkap invoice dan daftar pembelian</p>
                    </div>

                    {/* Invoice Info Card */}
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-6">
                        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
                            <div className="flex items-center gap-2 mb-2">
                                <FileText className="w-5 h-5 text-blue-100" />
                                <span className="text-blue-100 text-sm font-medium">Nomor Invoice</span>
                            </div>
                            <p className="text-3xl font-bold text-white tracking-wide">
                                {invoice.invoice_number}
                            </p>
                        </div>

                        <div className="p-6 bg-gradient-to-br from-gray-50 to-white">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Total Keseluruhan</p>
                                    <p className="text-4xl font-bold text-gray-900">
                                        {formatRupiah(invoice.total_harga)}

                                    </p>
                                </div>
                                <div className="text-right">
                                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full">
                                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                        <span className="text-sm font-semibold">Lunas</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Items Table Card */}
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-800 to-cyan-600 p-6">

                            <div className="flex items-center gap-2">
                                <Package className="w-5 h-5 text-slate-300" />
                                <h2 className="text-xl font-bold text-white">Daftar Item Pembelian</h2>
                            </div>
                            <p className="text-slate-300 text-sm mt-1">
                                {invoice.purchases.length} item dalam invoice ini
                            </p>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                                        <th className="text-left p-4 text-sm font-semibold text-gray-700 border-b-2 border-gray-200">
                                            Nama Item
                                        </th>
                                        <th className="text-center p-4 text-sm font-semibold text-gray-700 border-b-2 border-gray-200">
                                            Jumlah
                                        </th>
                                        <th className="text-right p-4 text-sm font-semibold text-gray-700 border-b-2 border-gray-200">
                                            Harga Satuan
                                        </th>
                                        <th className="text-right p-4 text-sm font-semibold text-gray-700 border-b-2 border-gray-200">
                                            Total Harga
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {invoice.purchases.map((item, index) => (
                                        <tr
                                            key={item.id}
                                            className="hover:bg-blue-50 transition-colors duration-150 border-b border-gray-100"
                                        >
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                                                        {index + 1}
                                                    </div>
                                                    <span className="font-medium text-gray-800">{item.nama_barang}</span>
                                                </div>
                                            </td>
                                            <td className="p-4 text-center">
                                                <span className="inline-flex items-center justify-center px-3 py-1 bg-slate-100 text-slate-700 rounded-full font-semibold text-sm">
                                                    {item.jumlah}
                                                </span>
                                            </td>
                                            <td className="p-4 text-right font-medium text-gray-700">
                                                {formatRupiah(item.harga_item)}

                                            </td>
                                            <td className="p-4 text-right">
                                                <span className="font-bold text-gray-900 text-lg">
                                                    {formatRupiah(item.harga_item * item.jumlah )}

                                                </span>
                                            </td>
                                    </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr className="bg-gradient-to-r from-slate-50 to-slate-100">
                                        <td colSpan={3} className="p-4 text-right font-bold text-gray-800 text-lg">
                                            Grand Total
                                        </td>
                                        <td className="p-4 text-right">
                                            <span className="font-bold text-blue-600 text-2xl">
                                                {formatRupiah(invoice.total_harga)}

                                            </span>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>

                    {/* Print Button */}
                    <div className="mt-6 flex justify-end">
                        <button
                            onClick={() => { window.location.href = `/invoice/${invoice.id}/download`; }}
                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
                        >
                            <FileText className="w-5 h-5" />
                            Cetak Invoice
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

// Apply AppLayout correctly
InvoiceView.layout = (page: React.ReactNode) => (
    <AppLayout breadcrumbs={[{ title: "Invoice", href: "#" }]}>
        {page}
    </AppLayout>
);