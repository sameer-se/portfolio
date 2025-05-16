"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useAnimation } from "./animation-provider"

export function PageTransition({ children }: { children: React.ReactNode }) {
  const { isLoaded } = useAnimation()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      {/* Initial page loader animation */}
      {!isLoaded && (
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.45, 0, 0.55, 1], delay: 0.5 }}
          className="fixed inset-0 z-50 bg-background flex items-center justify-center"
        >
          <motion.div
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <div className="flex items-center space-x-2">
              <div className="h-4 w-4 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
              <div className="h-4 w-4 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
              <div className="h-4 w-4 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Page content */}
      {children}
    </motion.div>
  )
}
