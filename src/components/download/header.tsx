"use client"

import { motion, Variants, useInView } from "framer-motion"
import { useRef } from "react"
import { Download } from "lucide-react"

// Animation variants for heading and subtext
const textVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

// Animation variants for CTA button
const ctaVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut", delay: 0.4 },
  },
  hover: {
    scale: 1.05,
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    transition: { duration: 0.3 },
  },
}

// Animation variants for version info
const versionVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay: 0.6 },
  },
}

// Animation variants for background decorative elements
const decorVariants: Variants = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: {
    opacity: 0.15,
    scale: 1,
    transition: { duration: 1.2, ease: "easeOut" },
  },
}

const Header = () => {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section
      ref={ref}
      className="relative bg-gradient-to-b from-gray-900 to-black py-24 sm:py-32 overflow-hidden"
    >
      {/* Decorative Background Elements */}
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={decorVariants}
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[600px] h-[600px] bg-blue-200 rounded-full blur-3xl opacity-15"
      />
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={decorVariants}
        className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-200 rounded-full blur-3xl opacity-15"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        {/* Title */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={textVariants}
          className="space-y-6"
        >
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white leading-tight tracking-tight"
            style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif" }}
          >
            Download Plurse Today
          </h1>
          <p
            className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto"
            style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
          >
            Lightweight, fast, and secure inventory management for your business. No ads, no bloat—just powerful tools to keep you in control.
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={ctaVariants}
          className="mt-8 flex items-center justify-center"
        >
          <motion.a
            whileHover="hover"
            whileTap="tap"
            variants={ctaVariants}
            href="#downloads"
            className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 bg-white text-black text-sm sm:text-base font-medium tracking-tight rounded-full hover:bg-gray-100 transition-all duration-300"
            style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
          >
            <Download size={20} className="mr-2" aria-hidden="true" />
            Download Now
          </motion.a>
        </motion.div>

        {/* Version Info */}
        <motion.p
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={versionVariants}
          className="mt-6 text-sm text-gray-400"
          style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
        >
          Current Version: <span className="font-semibold">v1.0.0</span> · Last Updated: Sept 2025
        </motion.p>
      </div>
    </section>
  )
}

export default Header