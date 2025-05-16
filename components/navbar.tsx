"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./mode-toggle";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();

  // Handle hydration mismatch by waiting for client-side mount
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Determine active section based on scroll position
      const sections = navLinks.map((link) => link.href.substring(1));

      // Find the section that is currently in view
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const rect = section.getBoundingClientRect();
          // Consider a section in view if its top is within the top 30% of the viewport
          if (rect.top <= window.innerHeight * 0.3) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }

      // If we're at the top of the page, set home as active
      if (window.scrollY < 100) {
        setActiveSection("home");
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking a link
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Determine if we're in light or dark mode
  const isLightMode = resolvedTheme === "light";

  // Don't render theme-specific content until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent py-4">
        <div className="container flex items-center justify-between">
          <div className="text-xl font-bold tracking-tighter">
            <span className="text-primary">sa</span>meer
          </div>
          <div className="flex items-center gap-8">
            <div className="h-10 w-10"></div>
          </div>
        </div>
      </nav>
    );
  }

  // Check if we're at the top and in light mode for special styling
  const isTopLightMode = !scrolled && isLightMode;

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-background/90 backdrop-blur-md py-2 shadow-sm"
            : isLightMode
            ? "bg-white/90 backdrop-blur-md py-4"
            : "bg-transparent py-4"
        )}
      >
        <div className="container flex items-center justify-between">
          <motion.a
            href="#home"
            className={cn(
              "text-xl font-bold tracking-tighter hover:text-primary transition-colors",
              isTopLightMode ? "text-black" : ""
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-primary">sa</span>meer-se
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex gap-6">
              {navLinks.map((link) => (
                <motion.li
                  key={link.name}
                  className="relative"
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  <a
                    href={link.href}
                    className={cn(
                      "text-sm font-medium transition-colors",
                      activeSection === link.href.substring(1)
                        ? "text-primary"
                        : isTopLightMode
                        ? "text-black hover:text-primary"
                        : "hover:text-primary"
                    )}
                  >
                    {link.name}
                    {activeSection === link.href.substring(1) && (
                      <motion.span
                        layoutId="activeIndicator"
                        className="absolute -bottom-2 left-0 w-full h-0.5 bg-primary rounded-full"
                      />
                    )}
                  </a>
                </motion.li>
              ))}
            </ul>
            <ModeToggle />
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="flex items-center md:hidden">
            <ModeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                "ml-2 z-[60]",
                isTopLightMode ? "text-black hover:bg-black/10" : ""
              )}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X
                      size={20}
                      className={isTopLightMode ? "text-black" : ""}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu
                      size={20}
                      className={isTopLightMode ? "text-black" : ""}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu - Animated overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[54] md:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={cn(
                "fixed inset-0 z-[55] flex flex-col justify-center items-center md:hidden",
                isLightMode ? "bg-white" : "bg-gray-950"
              )}
            >
              {/* Explicit close button at the top right */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "absolute top-6 right-6 p-2 rounded-full",
                  isLightMode
                    ? "bg-gray-100 text-gray-900"
                    : "bg-gray-800 text-white"
                )}
                aria-label="Close menu"
              >
                <X size={24} />
              </motion.button>

              <ul className="flex flex-col gap-8 text-center">
                {navLinks.map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <a
                      href={link.href}
                      className={cn(
                        "text-2xl font-medium transition-colors block py-2",
                        activeSection === link.href.substring(1)
                          ? "text-primary"
                          : isLightMode
                          ? "text-gray-900 hover:text-primary"
                          : "text-white hover:text-primary"
                      )}
                      onClick={handleLinkClick}
                    >
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
