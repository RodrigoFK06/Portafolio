"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export default function Hero() {
  const textRef = useRef(null)
  const isInView = useInView(textRef, { once: true, margin: "0px" }) // Cambiado a 0px

  return (
    <div className="relative isolate overflow-hidden bg-background">
      {/* Fondo con degradado */}
      <div className="absolute inset-0 -z-10 bg-blue dark:from-pink-900 dark:to-purple-900" />

      <div className="mx-auto max-w-7xl px-6 py-12 sm:py-16 md:py-20 lg:flex lg:items-center lg:gap-x-10 lg:px-8">
        {/* Contenido del texto */}
        <div ref={textRef} className="mx-auto max-w-2xl text-center lg:mx-0 lg:max-w-lg lg:text-left">
          <motion.h1
            className="text-balance mt-6 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { 
              opacity: 1, 
              y: 0,
              transition: { 
                type: 'spring',
                stiffness: 80,
                damping: 20,
                delay: 0.2
              }
            } : {}}
          >
            <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent dark:from-pink-300 dark:to-purple-300">
              Flowers & Saints
            </span>
          </motion.h1>
          
          <motion.p
            className="mt-4 text-base sm:text-lg leading-7 sm:leading-8 text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { 
              opacity: 1, 
              y: 0,
              transition: { 
                type: 'spring',
                stiffness: 60,
                damping: 15,
                delay: 0.4
              }
            } : {}}
          >
            Where minimal design meets floral artistry. We craft elegant experiences that inspire and elevate your space.
          </motion.p>

          {/* Botones responsivos */}
          <motion.div
            className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start"
            initial={{ opacity: 0 }}
            animate={isInView ? { 
              opacity: 1,
              transition: { 
                duration: 0.6,
                delay: 0.6
              }
            } : {}}
          >
            {/* Botón principal */}
            <motion.a
              href="https://www.flowersandsaints.com.au"
              target="_blank"
              rel="noopener noreferrer"
              className="relative overflow-hidden rounded-xl px-5 py-3 sm:px-6 sm:py-3.5 text-sm sm:text-base font-semibold shadow-lg bg-gradient-to-r from-pink-500 to-purple-500 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <motion.span
                className="absolute inset-0 bg-white/10"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ 
                  repeat: Infinity,
                  repeatType: 'reverse',
                  duration: 1.5,
                  ease: 'linear'
                }}
              />
              <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                Explore Our Work
              </span>
            </motion.a>

            {/* Botón secundario */}
            <motion.a
              href="https://www.flowersandsaints.com.au"
              target="_blank"
              rel="noopener noreferrer"
              className="relative text-sm font-medium leading-6 text-foreground transition-all group"
              whileHover={{ x: 8 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <motion.span
                className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-pink-500 to-purple-500"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ 
                  type: 'spring',
                  stiffness: 150,
                  damping: 10,
                  delay: 0.1
                }}
              />
              <span className="relative z-10 transition-colors duration-300 group-hover:text-purple-600">
                Learn more <span aria-hidden="true">→</span>
              </span>
            </motion.a>
          </motion.div>
        </div>

        {/* Imagen responsiva */}
        <motion.div
          className="mx-auto mt-8 sm:mt-12 lg:mt-0 lg:ml-10 lg:flex-1"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { 
            opacity: 1, 
            scale: 1,
            transition: { 
              type: 'spring',
              stiffness: 80,
              damping: 20,
              delay: 0.8
            }
          } : {}}
          whileHover={{
            scale: 1.02,
            rotate: 2,
            transition: { duration: 0.3 }
          }}
        >
          <motion.img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/creative-SW6QDQbcVuwPgb6a2CYtYmRbsJa4k1.png"
            alt="Floral design concept"
            width={1200}
            height={800}
            className="w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px] rounded-2xl shadow-xl ring-1 ring-gray-900/10"
            style={{ 
              transformOrigin: 'center center',
              willChange: 'transform'
            }}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            whileInView={{
              scale: [1, 1.02, 1],
              rotate: [0, -1, 0],
              transition: {
                duration: 3,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut'
              }
            }}
          />
        </motion.div>
      </div>
    </div>
  )
}
