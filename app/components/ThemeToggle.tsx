// ThemeToggle.tsx
"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { SunIcon, MoonIcon } from "lucide-react"

// Agregamos la definición de props
interface ThemeToggleProps {
  className?: string
}

export default function ThemeToggle({ className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  const isDark = resolvedTheme === "dark"

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`
        relative rounded-full p-2 bg-primary/10 text-primary 
        hover:bg-primary/20 transition-colors focus:outline-none 
        focus:ring-2 focus:ring-primary focus:ring-offset-2 
        focus:ring-offset-background 
        ${className}  // <- Agregamos las clases recibidas
      `}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 0 : 180 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="relative w-5 h-5"
      >
        <motion.div
          initial={false}
          animate={{ opacity: isDark ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          className="absolute inset-0"
        >
          <SunIcon className="w-5 h-5" />
        </motion.div>
        <motion.div
          initial={false}
          animate={{ opacity: isDark ? 0 : 1 }}
          transition={{ duration: 0.25 }}
          className="absolute inset-0"
        >
          <MoonIcon className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </motion.button>
  )
}

