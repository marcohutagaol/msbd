"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function OrderTimeline({ status = "Pending" }: { status: string }) {
  const stages = ["Pending", "Checking", "Approve", "Purchasing", "Waiting", "Arrive"];

  // cari posisi stage aktif berdasarkan nama status
  const currentStage = stages.indexOf(status);
  const [animatedStage, setAnimatedStage] = useState(0);

  // animasikan perpindahan status
  useEffect(() => {
    if (currentStage >= 0) {
      const timer = setTimeout(() => setAnimatedStage(currentStage), 150);
      return () => clearTimeout(timer);
    }
  }, [currentStage]);

  const colors = [
    "bg-gray-400",
    "bg-yellow-400",
    "bg-blue-400",
    "bg-purple-500",
    "bg-orange-400",
    "bg-green-500",
  ];

  return (
    <div className="relative flex items-center justify-between px-4 py-10">
      {/* Garis dasar */}
      <div className="absolute top-1/2 left-0 w-full h-[4px] bg-gray-200 rounded-full -translate-y-1/2 z-0"></div>

      {/* Progress bar */}
      <motion.div
        className="absolute top-1/2 left-0 h-[4px] bg-gradient-to-r from-yellow-400 via-blue-400 to-green-500 rounded-full -translate-y-1/2 z-0"
        initial={{ width: "0%" }}
        animate={{
          width: `${(animatedStage / (stages.length - 1)) * 100}%`,
        }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
      ></motion.div>

      {/* Titik-titik stage */}
      {stages.map((stage, index) => {
        const isActive = index <= animatedStage;

        return (
          <div key={stage} className="flex flex-col items-center flex-1 relative">
            <motion.div
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                scale: isActive ? 1 : 0.9,
              }}
              transition={{ duration: 0.3 }}
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
        );
      })}
    </div>
  );
}
