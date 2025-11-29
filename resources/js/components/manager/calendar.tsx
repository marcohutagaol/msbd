"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { useState } from "react"

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 10, 29)) // November 29, 2025

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
  const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()

  const days = Array.from({ length: 42 }, (_, i) => {
    const day = i - firstDay + 1
    if (day <= 0 || day > daysInMonth) return null
    return day
  })

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  return (
    <Card className="border-blue-100 shadow-md">
      <CardHeader className="pb-4">
        <CardTitle className="text-blue-900">Calendar</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-lg">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h3>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={handlePrevMonth} className="text-blue-600 hover:bg-blue-50">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleNextMonth} className="text-blue-600 hover:bg-blue-50">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-lg p-4 border border-blue-100">
            {/* Day Headers */}
            <div className="grid grid-cols-7 gap-2 mb-3">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="text-center text-xs font-bold text-blue-600 py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-2">
              {days.map((day, index) => (
                <div
                  key={index}
                  className={`
                    aspect-square flex items-center justify-center rounded text-sm font-medium
                    transition-all duration-200
                    ${
                      day
                        ? `bg-white border border-blue-100 text-slate-900 hover:bg-blue-50 hover:border-blue-300 cursor-pointer shadow-sm`
                        : ""
                    }
                    ${day === 29 ? "bg-gradient-to-br from-blue-600 to-blue-700 text-white font-bold shadow-md" : ""}
                  `}
                >
                  {day}
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 border-blue-200 text-blue-600 hover:bg-blue-50 bg-transparent"
            >
              <Plus className="h-4 w-4" />
              Add Agenda
            </Button>
            <Button className="ml-auto bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-md">
              List Agenda
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
