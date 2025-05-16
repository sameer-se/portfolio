"use client"

import type React from "react"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
  distance?: number
  once?: boolean
  direction?: "up" | "down" | "left" | "right"
}

export function AnimatedSection({
  children,
  className = "",
  delay = 0,
  distance = 50,
  once = true,
  direction = "up",
}: AnimatedSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: "-100px" })

  const directionMap = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
  }

  const initial = { opacity: 0, ...directionMap[direction] }

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : initial}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: [0.21, 0.45, 0.46, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
