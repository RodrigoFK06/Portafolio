"use client"

import { motion, useAnimation, useInView } from "framer-motion"
import { useEffect, useRef } from "react"

export default function WearYourStory() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "0px" })
  const controls = useAnimation()

  useEffect(() => {
    if (inView) controls.start('visible')
  }, [inView, controls])

  return (
    <section className="relative bg-background py-12 sm:py-16 md:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          ref={ref}
          className="text-center"
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                type: 'spring',
                stiffness: 80,
                damping: 25,
                delayChildren: 0.3,
                staggerChildren: 0.2
              }
            }
          }}
          initial="hidden"
          animate={controls}
        >
          {/* Título corregido */}
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500 mb-6"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, delay: 0.2 }
              }
            }}
          >
            <span className="block sm:inline-block">Wear</span>
            <span className="block sm:inline-block ml-2 sm:ml-3">Your Story</span>
          </motion.h2>

          {/* Texto con mejor tipografía */}
          <motion.p 
            className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed sm:leading-snug"
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, delay: 0.5 }
              }
            }}
          >
            Every piece from Flowers & Saints is a canvas for your unique narrative. Our designs blend minimal aesthetics with nature's beauty, allowing you to express your individuality.
          </motion.p>

          {/* Botón optimizado */}
          <motion.div 
            className="mt-8 sm:mt-10"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, delay: 0.7 }
              }
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <a
              href="https://www.flowersandsaints.com.au"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center px-6 sm:px-8 py-4 sm:py-5 text-base sm:text-lg font-medium rounded-full bg-gradient-to-r from-pink-500 to-purple-500 shadow-lg hover:shadow-xl transition-all duration-300"
              style={{ cursor: 'pointer' }}
            >
              <span className="relative z-10 text-white">
                Explore Collection
              </span>
              <svg
                className="w-5 h-5 ml-3 sm:w-6 sm:h-6 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M14 5l7 7m0 0l-7 7m7-7H3" 
                />
              </svg>
              <motion.span
                className="absolute inset-0 bg-white/20 rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6 }}
              />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

