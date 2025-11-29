"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UserCircle } from "lucide-react"

export function PermissionCard() {
  return (
    <Card className="border-blue-100 shadow-md overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle className="text-blue-900">Perizinan</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-gradient-to-br from-blue-600 via-blue-600 to-blue-700 rounded-xl p-6 text-white space-y-4 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center border border-white/30">
              <UserCircle className="h-6 w-6 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-base">Stephen Albert</h4>
              <p className="text-xs opacity-90">Housekeeping Staff</p>
            </div>
          </div>
          <p className="text-sm opacity-95 leading-relaxed font-medium">
            Saya meminta izin untuk tidak masuk kerja hari Jumat besok karena ada keperluan keluarga yang mendesak.
          </p>
          <div className="pt-2">
            <Button size="sm" className="bg-white text-blue-600 hover:bg-blue-50 font-semibold shadow-md">
              View
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
