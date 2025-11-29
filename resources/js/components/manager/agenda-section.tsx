"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function AgendaSection() {
  return (
    <Card className="border-blue-100 shadow-md">
      <CardHeader className="pb-3">
        <CardTitle className="text-blue-900">Agenda</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-4 text-white shadow-md hover:shadow-lg transition-shadow">
            <p className="text-sm font-semibold leading-tight">Meeting dengan Boss</p>
            <p className="text-xs mt-2 opacity-90">Conference Room A</p>
            <p className="text-xs opacity-75 mt-1">24 November 2025</p>
            <div className="mt-3 flex justify-between items-center pt-2 border-t border-white/20">
              <span className="text-xs font-bold bg-white/20 px-2 py-1 rounded">12:24</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
