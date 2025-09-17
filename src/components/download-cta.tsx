"use client"

import Link from "next/link"
import { Download, ArrowRight } from "lucide-react"
import { motion, Variants, useInView } from "framer-motion"
import { useRef } from "react"

// Animation variants for heading and subtext
const textVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

// Animation variants for buttons
const buttonVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut", delay: i * 0.2 },
  }),
  hover: {
    scale: 1.05,
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    transition: { duration: 0.3 },
  },
}

// Animation variants for background decorative elements
const decorVariants: Variants = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: {
    opacity: 0.2,
    scale: 1,
    transition: { duration: 1.2, ease: "easeOut" },
  },
}

const DownloadCTA = () => {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section
      ref={ref}
      className="relative bg-gradient-to-br from-gray-900 to-black py-24 sm:py-32 overflow-hidden"
    >
      {/* Decorative Background Elements */}
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={decorVariants}
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[600px] h-[600px] bg-blue-200 rounded-full blur-3xl opacity-20"
      />
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={decorVariants}
        className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-200 rounded-full blur-3xl opacity-20"
      />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center relative">
        {/* Section Heading */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={textVariants}
          className="space-y-6"
        >
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white leading-tight tracking-tight"
            style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif" }}
          >
            Start Your Plurse Journey Today
          </h2>
          <p
            className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto"
            style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
          >
            Available for Windows, macOS, and Linux. Transform your business with smarter inventory management.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="mt-12 flex flex-col sm:flex-row justify-center gap-4 sm:gap-6"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div custom={0} variants={buttonVariants} whileHover="hover">
            <Link
              href="/download#downloads"
              className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 bg-white text-black text-sm sm:text-base font-medium tracking-tight rounded-full hover:bg-gray-100 transition-all duration-300"
              style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
            >
              <Download size={20} className="mr-2" aria-hidden="true" />
              Download Now
            </Link>
          </motion.div>
          <motion.div custom={1} variants={buttonVariants} whileHover="hover">
            <Link
              href="/features"
              className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 bg-transparent border-2 border-white text-white text-sm sm:text-base font-medium tracking-tight rounded-full hover:bg-white hover:text-black transition-all duration-300"
              style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
            >
              Learn More
              <ArrowRight size={20} className="ml-2" aria-hidden="true" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default DownloadCTA