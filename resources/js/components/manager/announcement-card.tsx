"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function AnnouncementCard() {
  return (
    <Card className="border-blue-100 shadow-md overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle className="text-blue-900">Announcement</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <img
            src="/office-announcement.jpg"
            alt="Announcement"
            className="w-full h-40 object-cover rounded-lg shadow-md border-2 border-blue-100 hover:shadow-lg transition-shadow"
          />
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">Pengumuman Penting</h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              Kami dengan senang hati mengumumkan bahwa kantor kami akan melakukan renovasi lengkap selama bulan depan.
              Prosedur operasional akan tetap berjalan normal.
            </p>
            <p className="text-xs text-slate-500 pt-2 font-medium">24 November 2025</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
