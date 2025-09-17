"use client"

import { motion, Variants, useInView } from "framer-motion"
import { useRef } from "react"

// Define version info interface for TypeScript
interface VersionInfoData {
  version: string
  updates: string[]
}

// Version info data
const versionInfo: VersionInfoData = {
  version: "v1.0.0",
  updates: [
    "Added customer tracking features for enhanced client management.",
    "Improved sales analytics dashboard with richer insights.",
    "Minor bug fixes and performance optimizations.",
  ],
}

// Animation variants for heading
const headingVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

// Animation variants for version card
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay: 0.2 },
  },
  hover: {
    scale: 1.03,
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.3 },
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

const VersionInfo = () => {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section
      ref={ref}
      className="relative bg-gradient-to-b from-white to-gray-50 py-24 sm:py-32 overflow-hidden"
    >
      {/* Decorative Background Elements */}
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={decorVariants}
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[600px] h-[600px] bg-blue-200 rounded-full blur-3xl opacity-15"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Heading */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={headingVariants}
          className="mb-12 sm:mb-16"
        >
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-black leading-tight tracking-tight"
            style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif" }}
          >
            Current Version: {versionInfo.version}
          </h2>
          <p
            className="mt-4 text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto"
            style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
          >
            Stay up-to-date with the latest features and improvements.
          </p>
        </motion.div>

        {/* Version Card */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={cardVariants}
          whileHover="hover"
          className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 text-left shadow-sm"
        >
          <h3
            className="text-lg sm:text-xl font-semibold text-black mb-4"
            style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif" }}
          >
            What’s New
          </h3>
          <ul className="space-y-3 text-sm sm:text-base text-gray-600">
            {versionInfo.updates.map((update, idx) => (
              <li key={idx} className="flex items-start">
                <span className="mr-2 text-blue-500">•</span>
                <span
                  style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
                >
                  {update}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}

export default VersionInfo