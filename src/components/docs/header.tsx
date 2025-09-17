"use client"

import { motion, Variants, useInView } from "framer-motion"
import { useRef } from "react"
import { Search } from "lucide-react"

// Animation variants for header elements
const textVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

const searchVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut", delay: 0.2 },
  },
  focus: {
    scale: 1.02,
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.3, ease: "easeOut" },
  },
}

const Header = () => {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <header
      ref={ref}
      className="bg-gradient-to-b from-white to-gray-50 py-12 border-b border-gray-100"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={textVariants}
          className="space-y-4 text-center"
        >
          <h1
            className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight tracking-tight"
            style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif" }}
          >
            Plurse Documentation
          </h1>
          <p
            className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto"
            style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
          >
            Step-by-step guides, installation instructions, feature tutorials, and FAQs for Plurse.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={searchVariants}
          className="mt-8 max-w-lg mx-auto"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search documentation..."
              className="w-full pl-12 pr-4 py-3 bg-white/80 backdrop-blur-md border border-gray-200 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900 text-gray-900 placeholder-gray-500 transition-all duration-300"
              style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
            />
          </div>
        </motion.div>
      </div>
    </header>
  )
}

export default Header