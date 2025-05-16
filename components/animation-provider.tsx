"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"

type AnimationContextType = {
  isLoaded: boolean
  setIsLoaded: (loaded: boolean) => void
}

const AnimationContext = createContext<AnimationContextType>({
  isLoaded: false,
  setIsLoaded: () => {},
})

export const useAnimation = () => useContext(AnimationContext)

export function AnimationProvider({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    // Set loaded to true after initial page load
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimationContext.Provider value={{ isLoaded, setIsLoaded }}>
      <AnimatePresence mode="wait">{children}</AnimatePresence>
    </AnimationContext.Provider>
  )
}
