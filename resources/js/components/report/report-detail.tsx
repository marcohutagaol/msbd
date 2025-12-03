"use client"

import { Download } from "lucide-react"

interface ReportItem {
  id: string
  title: string
  name: string
  date: string
  category: string
}

interface ReportDetailProps {
  report: ReportItem
}

export default function ReportDetail({ report }: ReportDetailProps) {
  const handleDownloadPDF = () => {
    alert(`Downloading PDF for ${report.title}`)
  }

  const fullDate = new Date().toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="p-6">
      <div className="space-y-4">
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Kategori</p>
          <h3 className="text-xl font-bold text-gray-900 mt-1">{report.title}</h3>
        </div>

        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">PIC</p>
          <p className="text-sm text-gray-700 mt-1">{report.name}</p>
        </div>

        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Tanggal</p>
          <p className="text-sm text-gray-700 mt-1">{fullDate}</p>
        </div>

        {/* PDF Preview Area */}
        <div className="mt-6 bg-gray-100 rounded-lg p-4 min-h-32 flex items-center justify-center border-2 border-dashed border-gray-300">
          <div className="text-center">
            <p className="text-sm text-gray-500 font-medium">Preview PDF</p>
            <p className="text-xs text-gray-400 mt-1">Dokumen akan tampil di sini</p>
          </div>
        </div>

        {/* Download Button */}
        <button
          onClick={handleDownloadPDF}
          className="w-full mt-6 bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-md hover:shadow-lg text-sm"
        >
          <Download className="w-4 h-4" />
          Download PDF
        </button>
      </div>
    </div>
  )
}
