"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

export function ModeToggle() {
  const { setTheme, theme, resolvedTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Handle scroll position to match navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    // Initial check
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Handle hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="relative overflow-hidden transition-all duration-300 rounded-full opacity-0"
      >
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  const isLightMode = resolvedTheme === "light"
  const isTopLightMode = !scrolled && isLightMode

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className={cn(
          "relative overflow-hidden transition-all duration-300 rounded-full",
          isTopLightMode ? "text-black hover:bg-black/10 hover:text-black" : "",
        )}
      >
        <Sun
          className={cn(
            "h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0",
            isTopLightMode ? "text-black" : "",
          )}
          aria-hidden="true"
        />
        <Moon
          className={cn(
            "absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100",
            isTopLightMode ? "text-black" : "",
          )}
          aria-hidden="true"
        />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  )
}
