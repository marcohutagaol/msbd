"use client"

import { motion } from "framer-motion"

export function OrderTimeline() {
  const stages = ["Pending", "Checking", "Approve", "Purchasing", "Waiting", "Arrive"]
  const currentStage = 2

  const colors = [
    "bg-gray-400",
    "bg-yellow-400",
    "bg-blue-400",
    "bg-purple-500",
    "bg-orange-400",
    "bg-green-500",
  ]

  return (
    <div className="relative flex items-center justify-between px-4 py-10">
      <div className="absolute top-1/2 left-0 w-full h-[4px] bg-gray-200 rounded-full -translate-y-1/2 z-0"></div>

      <div
        className="absolute top-1/2 left-0 h-[4px] bg-gradient-to-r from-yellow-400 via-blue-400 to-green-500 rounded-full -translate-y-1/2 z-0 transition-all duration-500"
        style={{
          width: `${(currentStage / (stages.length - 1)) * 100}%`,
        }}
      ></div>
      
      {stages.map((stage, index) => {
        const isActive = index <= currentStage
        return (
          <div key={stage} className="flex flex-col items-center flex-1 relative">
            <motion.div
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-white z-10 shadow-md transition-all duration-500 ${
                isActive ? colors[index] : "bg-gray-300"
              }`}
            >
              {index + 1}
            </motion.div>

            <p
              className={`text-sm mt-3 text-center font-medium ${
                isActive ? "text-gray-900" : "text-gray-400"
              }`}
            >
              {stage}
            </p>
          </div>
        )
      })}
    </div>
  )
}
