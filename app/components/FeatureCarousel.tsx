"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useAnimation, useMotionValue, AnimatePresence } from "framer-motion"
import FeatureModal from "./FeatureModal"

// Datos de ejemplo (características) con más detalle
const features = [
  {
    title: "Minimal Design",
    description: "Clean aesthetics that put your content in the spotlight.",
    icon: "✨",
    details:
      "Our minimal design philosophy is centered around the principle that less is more. We strip away unnecessary elements to create clean, focused interfaces that highlight what truly matters.\n\nBy embracing white space, thoughtful typography, and purposeful imagery, we create designs that are not only visually appealing but also highly functional and user-friendly.\n\nThis approach ensures your content takes center stage, allowing your message to resonate with your audience without distraction.",
  },
  {
    title: "Responsive",
    description: "Flawless experiences across all devices and screen sizes.",
    icon: "📱",
    details:
      "In today's multi-device world, responsive design isn't just a feature—it's essential. Our responsive approach ensures your digital presence adapts seamlessly to any screen size or device.\n\nWe build with a mobile-first mindset, then progressively enhance the experience for larger screens. This ensures optimal performance and usability regardless of how users access your content.\n\nFrom smartphones and tablets to desktops and beyond, your audience will enjoy a consistent, intuitive experience that maintains your brand's integrity across all touchpoints.",
  },
  {
    title: "Fast Performance",
    description: "Lightning-quick load times for smooth user interactions.",
    icon: "⚡",
    details:
      "Speed is a critical factor in user experience and search engine rankings. Our performance-optimized designs load quickly and respond instantly to user interactions.\n\nWe achieve this through efficient code, optimized assets, and strategic implementation of modern web technologies. We regularly test and refine our work to ensure it meets the highest performance standards.\n\nThe result is a snappy, responsive experience that keeps users engaged and reduces bounce rates, ultimately driving better conversion and retention metrics for your business.",
  },
  {
    title: "Accessibility",
    description: "Inclusive design practices for all users.",
    icon: "🌈",
    details:
      "We believe the web should be accessible to everyone. Our designs adhere to WCAG guidelines and best practices to ensure users with disabilities can navigate and interact with your content effectively.\n\nFrom proper color contrast and keyboard navigation to screen reader compatibility and semantic HTML, we build with accessibility in mind from the ground up.\n\nThis inclusive approach not only broadens your audience but also demonstrates your commitment to serving all users equally.",
  },
  {
    title: "SEO Optimized",
    description: "Built to help your site rank higher in search results.",
    icon: "🔍",
    details:
      "Visibility in search engines is crucial for digital success. Our SEO-optimized approach ensures your content is structured and delivered in ways that search engines can easily understand and index.\n\nWe implement proper semantic markup, optimized metadata, and performance enhancements that contribute to better search rankings. We also ensure your site's technical foundation supports your broader SEO strategy.\n\nThis attention to SEO fundamentals helps drive organic traffic to your site, reducing your reliance on paid acquisition channels.",
  },
]

export default function FeatureCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)
  const [selectedFeature, setSelectedFeature] = useState<number | null>(null)
  const x = useMotionValue(0)
  const controls = useAnimation()

  // Recalcular el ancho cuando cambia el tamaño de la ventana
  useEffect(() => {
    const handleResize = () => {
      if (carouselRef.current) {
        const containerWidth = carouselRef.current.offsetWidth
        const itemWidth = (carouselRef.current.querySelector('.carousel-item') as HTMLElement)?.offsetWidth || 300
        const totalItems = features.length
        const visibleItems = Math.floor(containerWidth / itemWidth)
        const newWidth = Math.max(0, (itemWidth * totalItems) - containerWidth + 16)
        setWidth(newWidth)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [features])

  const handleDragEnd = () => {
    const currentX = x.get()

    if (currentX > 0) {
      controls.start({ x: 0, transition: { type: 'spring', stiffness: 300 } })
    } else if (Math.abs(currentX) > width && width > 0) {
      controls.start({ x: -width, transition: { type: 'spring', stiffness: 300 } })
    }
  }

  return (
    <section className="py-20 bg-[#040714] relative overflow-hidden">
      {/* Decoración de fondo */}
      <div className="absolute inset-0 bg-gradient-radial from-blue-900/10 to-transparent opacity-20"></div>
      <div className="absolute inset-0 bg-grid-white/5 bg-grid"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.h2 
          className="text-3xl sm:text-4xl font-bold text-center mb-16 text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Why Choose Us
        </motion.h2>

        {/* Contenedor principal con fondo opaco */}
        <div className="relative bg-[#040714] rounded-3xl overflow-hidden shadow-2xl border border-gray-800/30">
          {/* Overlays de degradado mejorados */}
          <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-[#040714] to-transparent pointer-events-none z-20"></div>
          <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-[#040714] to-transparent pointer-events-none z-20"></div>

          <motion.div 
            ref={carouselRef}
            className="overflow-hidden cursor-grab py-8 px-4"
            whileTap={{ cursor: "grabbing" }}
          >
            <motion.div
              drag="x"
              dragConstraints={{ right: 0, left: -width }}
              style={{ x }}
              animate={controls}
              onDragEnd={handleDragEnd}
              className="flex gap-6"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="carousel-item min-w-[280px] sm:min-w-[320px] h-auto bg-[#0a1322] rounded-2xl border border-gray-800 shadow-lg overflow-hidden"
                  whileHover={{ 
                    scale: 1.03,
                    boxShadow: "0 0 25px rgba(59, 130, 246, 0.2)" 
                  }}
                  transition={{ 
                    type: 'spring', 
                    stiffness: 300, 
                    damping: 20 
                  }}
                >
                  <motion.div
                    className="p-6 sm:p-8 h-[380px] flex flex-col"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      type: 'spring',
                      stiffness: 100,
                      damping: 20,
                      delay: index * 0.1
                    }}
                  >
                    <div className="text-5xl mb-6">{feature.icon}</div>
                    <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-white">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300 flex-1">
                      {feature.description}
                    </p>
                    <motion.button
                      onClick={() => setSelectedFeature(index)}
                      className="mt-6 self-start px-5 py-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium hover:from-blue-600 hover:to-blue-700 transition-all shadow-md"
                      whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)" }}
                      whileTap={{ scale: 0.97 }}
                    >
                      Learn More →
                    </motion.button>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Modal mejorado con animaciones */}
      <AnimatePresence>
        {selectedFeature !== null && (
          <motion.div
            key="feature-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <FeatureModal
              isOpen={true}
              onClose={() => setSelectedFeature(null)}
              title={features[selectedFeature].title}
              description={features[selectedFeature].description}
              icon={features[selectedFeature].icon}
              details={features[selectedFeature].details}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}