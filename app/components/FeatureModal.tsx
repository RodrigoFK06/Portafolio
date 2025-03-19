"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence, Variants } from "framer-motion"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface FeatureModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  description: string
  icon: string
  details: string
  className?: string
}

const modalVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    filter: 'blur(5px)',
    transition: { duration: 0.2 }
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 25,
      when: 'beforeChildren',
      staggerChildren: 0.1
    }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    filter: 'blur(5px)',
    transition: { duration: 0.2 }
  }
}

const contentVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
}

export default function FeatureModal({
  isOpen,
  onClose,
  title,
  description,
  icon,
  details,
  className
}: FeatureModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => setIsMounted(true), [])
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    
    if (isOpen) {
      document.body.style.overflow = "hidden"
      window.addEventListener('keydown', handleEsc)
      
      // Enfoque para accesibilidad
      setTimeout(() => {
        modalRef.current?.focus()
      }, 200)
    }
    
    return () => {
      document.body.style.overflow = "auto"
      window.removeEventListener('keydown', handleEsc)
    }
  }, [isOpen, onClose])

  // No renderizar durante SSR
  if (!isMounted) return null

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {/* Backdrop */}
          <motion.div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />
          
          {/* Modal Container */}
          <motion.div
            ref={modalRef}
            className={cn(
              "relative bg-background rounded-3xl shadow-2xl overflow-hidden",
              "w-[90%] max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl",
              "max-h-[85vh] flex flex-col", // Usamos flex para asegurar que el footer esté visible
              className
            )}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            tabIndex={-1}
            aria-describedby="modal-description"
          >
            {/* Header con micro-interacciones */}
            <motion.div 
              className="flex justify-between items-center p-6 border-b border-border"
              variants={contentVariants}
            >
              <motion.div 
                className="flex items-center gap-4"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <span className="text-5xl sm:text-6xl" aria-hidden="true">{icon}</span>
                <motion.h3 
                  id="modal-title"
                  className="text-2xl sm:text-3xl font-bold text-foreground"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  {title}
                </motion.h3>
              </motion.div>
              <motion.button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-secondary/30 focus:outline-none focus:ring-2 focus:ring-primary"
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 400 }}
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
              </motion.button>
            </motion.div>

            {/* Contenido con scrolling */}
            <motion.div 
              className="p-6 overflow-y-auto flex-grow"
              id="modal-description"
              variants={contentVariants}
              transition={{ delay: 0.4 }}
            >
              <motion.p 
                className="text-muted-foreground mb-6"
                variants={contentVariants}
              >
                {description}
              </motion.p>
              
              <motion.div 
                className="space-y-4"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { 
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.15,
                      delayChildren: 0.6
                    }
                  }
                }}
              >
                {details.split('\n\n').map((paragraph, i) => (
                  <motion.p 
                    key={i}
                    className="text-foreground leading-relaxed"
                    variants={contentVariants}
                    transition={{ 
                      type: 'spring',
                      stiffness: 200,
                      damping: 20
                    }}
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </motion.div>
            </motion.div>

            {/* Footer con efecto flotante - Ahora siempre visible */}
            <motion.div 
              className="p-6 border-t border-border bg-secondary/20 flex justify-center sm:justify-end"
              variants={contentVariants}
              transition={{ delay: 0.8 }}
            >
              <motion.button 
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 0 15px rgba(0,0,0,0.1)'
                }}
                whileTap={{ scale: 0.98 }}
              >
                Got it, thanks!
              </motion.button>
            </motion.div>

            {/* Efecto de profundidad */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/10 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              aria-hidden="true"
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}