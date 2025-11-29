"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"

export function ClockWidget() {
  const [time, setTime] = useState<string>("12:24")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const hours = String(now.getHours()).padStart(2, "0")
      const minutes = String(now.getMinutes()).padStart(2, "0")
      setTime(`${hours}:${minutes}`)
    }

    updateTime()
    const interval = setInterval(updateTime, 60000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="border-blue-100 shadow-md bg-gradient-to-br from-white to-blue-50">
      <CardHeader className="pb-3">
        <CardTitle className="text-blue-900">Clock</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center py-8">
        <div className="text-6xl font-bold text-blue-600 font-mono tracking-tight drop-shadow-sm">{time}</div>
      </CardContent>
    </Card>
  )
}
