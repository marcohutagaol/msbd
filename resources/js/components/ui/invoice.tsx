import { FileText, Download, Calendar, Package, Building2, Hash, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";

interface InvoiceSummaryProps {
  show: boolean;
  invoiceNumber: string;
  requestNumber?: string;
  summary: any;
  formatDate: (date: string) => string;
  formatRupiah: (value: number) => string;

}

export default function InvoiceSummary({
  show,
  invoiceNumber,
  requestNumber,
  summary,
  formatDate,
  formatRupiah,

}: InvoiceSummaryProps) {
  if (!show) return null;

  return (
    <div className="rounded-3xl border border-blue-200 bg-white shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-700">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]"></div>
        <div className="relative z-10 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20">
              <FileText className="w-9 h-9" />
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Invoice Summary</h2>
              <p className="text-blue-100 text-sm mt-1 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                Invoice berhasil dibuat!
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8 bg-gradient-to-br from-slate-50 to-blue-50/30">
        {/* Detail Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="space-y-4">
            <Info 
              icon={<Hash className="w-5 h-5 text-blue-600" />} 
              label="Invoice Number" 
              value={invoiceNumber}
              highlight
            />
            <Info 
              icon={<Hash className="w-5 h-5 text-slate-600" />} 
              label="Request Number" 
              value={requestNumber || 'N/A'} 
            />
            <Info 
              icon={<Building2 className="w-5 h-5 text-slate-600" />} 
              label="Department" 
              value={summary.departemen} 
            />
          </div>

          <div className="space-y-4">
            <Info 
              icon={<Calendar className="w-5 h-5 text-slate-600" />} 
              label="Invoice Date" 
              value={formatDate(summary.requestDate)} 
            />
            <Info 
              icon={<Package className="w-5 h-5 text-slate-600" />} 
              label="Total Items" 
              value={`${summary.itemsWithPrice.length} Item${summary.itemsWithPrice.length > 1 ? 's' : ''}`} 
            />

            <div className="flex items-start gap-4 p-6 bg-gradient-to-br from-emerald-500 via-green-600 to-teal-600 rounded-2xl text-white shadow-xl relative overflow-hidden group hover:shadow-2xl transition-shadow duration-300">
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300"></div>
              <div className="p-3 bg-white/20 rounded-xl relative z-10">
                <DollarSign className="w-6 h-6" />
              </div>
              <div className="relative z-10">
                <p className="text-xs opacity-90 font-semibold tracking-wider mb-2">GRAND TOTAL</p>
                <p className="text-3xl font-bold tracking-tight">{formatRupiah(summary.totalHarga)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <tr>
                  <th className="p-4 text-left text-sm font-semibold">No</th>
                  <th className="p-4 text-left text-sm font-semibold">Nama Barang</th>
                  <th className="p-4 text-left text-sm font-semibold">Kode</th>
                  <th className="p-4 text-left text-sm font-semibold">Jumlah</th>
                  <th className="p-4 text-right text-sm font-semibold">Harga Satuan</th>
                  <th className="p-4 text-right text-sm font-semibold">Total Harga</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {summary.itemsWithPrice.map((order: any, i: number) => (
                  <tr 
                    key={order.id} 
                    className="hover:bg-blue-50/50 transition-colors duration-200"
                  >
                    <td className="p-4 text-slate-600 font-medium">{i + 1}</td>
                    <td className="p-4 text-slate-900 font-medium">{order.nama_barang}</td>
                    <td className="p-4 text-slate-600">
                      <span className="px-3 py-1 bg-slate-100 rounded-lg text-sm font-mono">
                        {order.kode_barang || "-"}
                      </span>
                    </td>
                    <td className="p-4 text-slate-600">
                      <span className="font-semibold text-slate-900">
                        {order.jumlah_disetujui || order.jumlah_diajukan}
                      </span>
                      {' '}
                      <span className="text-sm text-slate-500">{order.satuan}</span>
                    </td>
                    <td className="p-4 text-right text-slate-700 font-medium">
                      {formatRupiah(order.harga)}
                    </td>
                    <td className="p-4 text-right font-bold text-blue-700 text-lg">
                      {formatRupiah(order.harga * (order.jumlah_disetujui || order.jumlah_diajukan))}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-slate-50 border-t-2 border-slate-200">
                <tr>
                  <td colSpan={5} className="p-4 text-right font-bold text-slate-700 text-lg">
                    Total Keseluruhan:
                  </td>
                  <td className="p-4 text-right font-bold text-blue-700 text-2xl">
                    {formatRupiah(summary.totalHarga)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function Info({ icon, label, value, highlight }: any) {
  return (
    <div className={`flex items-start gap-4 p-5 rounded-2xl border transition-all duration-300 hover:shadow-md ${
      highlight 
        ? 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200' 
        : 'bg-white border-slate-200'
    }`}>
      <div className={`p-2.5 rounded-xl ${highlight ? 'bg-blue-100' : 'bg-slate-100'}`}>
        {icon}
      </div>
      <div>
        <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1.5">
          {label}
        </p>
        <p className={`text-lg font-bold ${highlight ? 'text-blue-700' : 'text-slate-900'}`}>
          {value}
        </p>
      </div>
    </div>
  );
}