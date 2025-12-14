"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface OrderTimelineProps {
  status: string;
  onChange?: (status: string) => void;
}

export function OrderTimeline({ status, onChange }: OrderTimelineProps) {
  const stages = ["Checking", "Response", "Input Price", "Pembayaran", "Done"];

  const currentStage = stages.indexOf(status);
  const [animatedStage, setAnimatedStage] = useState(
    currentStage >= 0 ? currentStage : 0
  );

  useEffect(() => {
    if (currentStage >= 0) {
      setAnimatedStage(currentStage);
    }
  }, [currentStage]);

  const colors = [
    "bg-gray-400",
    "bg-yellow-400",
    "bg-blue-400",
    "bg-purple-500",
    "bg-green-500",
  ];

  return (
    <div className="relative flex items-center justify-between px-4 py-10">
      {/* garis */}
      <div className="absolute top-1/2 left-0 w-full h-[4px] bg-gray-200 rounded-full -translate-y-1/2 z-0" />

      {/* progress */}
      <motion.div
        className="absolute top-1/2 left-0 h-[4px] bg-gradient-to-r from-yellow-400 via-blue-400 to-green-500 rounded-full -translate-y-1/2 z-0"
        animate={{
          width: `${(animatedStage / (stages.length - 1)) * 100}%`,
        }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />

      {stages.map((stage, index) => {
        const isActive = index <= animatedStage;

        return (
          <div key={stage} className="flex flex-col items-center flex-1 relative">
            <motion.button
              type="button"
              onClick={() => {
                setAnimatedStage(index);
                onChange?.(stage); // 🔥 kirim ke parent
              }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-white z-10 shadow-md transition-all ${
                isActive ? colors[index] : "bg-gray-300"
              }`}
            >
              {index + 1}
            </motion.button>

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
