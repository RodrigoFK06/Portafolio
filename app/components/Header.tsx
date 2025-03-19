"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import ThemeToggle from "./ThemeToggle"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => setMounted(true), [])
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: "https://www.flowersandsaints.com.au", label: "Work" },
    { href: "https://www.flowersandsaints.com.au", label: "About" },
    { href: "https://www.flowersandsaints.com.au", label: "Contact" }
  ]

  return (
    <motion.header
      className={`sticky top-0 z-50 backdrop-blur-lg transition-all duration-300 ${
        isScrolled ? 'bg-background/90 shadow-lg' : 'bg-background/80'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
    >
      <nav className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo con animación */}
          <motion.div
            className="flex lg:flex-1"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Link href="/" className="flex items-center gap-2 -m-1.5 p-1.5">
              <motion.img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/creative-SW6QDQbcVuwPgb6a2CYtYmRbsJa4k1.png"
                alt="Logo"
                className="h-8 w-auto dark:invert"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              />
              <motion.span
                className="sr-only sm:not-sr-only text-xl font-semibold text-foreground"
                initial={{ x: -20 }}
                animate={{ x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                Flowers & Saints
              </motion.span>
            </Link>
          </motion.div>

          {/* Menú desktop */}
          <motion.div
            className="hidden lg:flex lg:gap-x-12 lg:items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ staggerChildren: 0.2, delayChildren: 0.7 }}
          >
            {navLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold leading-6 text-foreground relative group"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                {link.label}
                <motion.span
                  className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-pink-500 to-purple-500 scale-x-0 group-hover:scale-x-100"
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </motion.div>

          {/* Botón móvil */}
          <div className="lg:hidden">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="relative w-10 h-10 flex items-center justify-center text-foreground"
              initial={{ rotate: 0 }}
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <motion.span
                className="absolute w-6 h-[2px] bg-foreground rounded-full"
                variants={{
                  open: { rotate: 45, y: 4 },
                  closed: { rotate: 0, y: 0 }
                }}
                animate={isOpen ? 'open' : 'closed'}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="absolute w-6 h-[2px] bg-foreground rounded-full"
                variants={{
                  open: { opacity: 0 },
                  closed: { opacity: 1 }
                }}
                animate={isOpen ? 'open' : 'closed'}
              />
              <motion.span
                className="absolute w-6 h-[2px] bg-foreground rounded-full"
                variants={{
                  open: { rotate: -45, y: -4 },
                  closed: { rotate: 0, y: 0 }
                }}
                animate={isOpen ? 'open' : 'closed'}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </div>

          {/* Menú móvil */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                className="fixed inset-0 bg-background/95 backdrop-blur-lg z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="flex h-full flex-col items-center justify-center space-y-8"
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -50, opacity: 0 }}
                  transition={{ staggerChildren: 0.1 }}
                >
                  {navLinks.map((link, index) => (
                    <motion.a
                      key={index}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-2xl font-semibold text-foreground"
                      onClick={() => setIsOpen(false)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                    >
                      {link.label}
                    </motion.a>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Theme Toggle */}
          <motion.div
            className="hidden lg:flex lg:flex-1 lg:justify-end"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            {mounted && (
              <ThemeToggle 
                className="text-foreground hover:text-primary transition-colors"
              />
            )}
          </motion.div>
        </div>
      </nav>
    </motion.header>
  )
}