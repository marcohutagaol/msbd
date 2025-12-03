"use client"

import * as React from "react"

import { DayPicker } from "react-day-picker"
import { cn } from "@/lib/utils"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

export function Calendar({ className, ...props }: CalendarProps) {
  return (
    <DayPicker
      {...props}
      className={cn("p-3", className)}
      styles={{
        caption: { textAlign: "center", fontWeight: 500 },
        head_cell: { color: "#666", fontSize: "0.8rem" },
        day: { borderRadius: "6px", width: "36px", height: "36px" },
      }}
    />
  )
}

