"use client"

import { motion, Variants, useInView } from "framer-motion"
import { useRef } from "react"
import { ArrowRight } from "lucide-react"
import { useWaitlistModal } from "../waitlist-modal"
import Link from "next/link"

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
    opacity: 0.15,
    scale: 1,
    transition: { duration: 1.2, ease: "easeOut" },
  },
}

const BasicWaitlist = () => {
  const { openModal } = useWaitlistModal()
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
        {/* Heading and Subtext */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={textVariants}
          className="mb-8 sm:mb-12"
        >
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-black leading-tight tracking-tight"
            style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif" }}
          >
            Unlock More with the Basic Version
          </h2>
          <p
            className="mt-4 text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto"
            style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
          >
            Online syncing, multi-device access, market analysis, and AI-powered marketing — coming soon!
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={buttonVariants}
          whileHover="hover"
        >
          <motion.button
            variants={buttonVariants}
            onClick={openModal}
            className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 bg-blue-600 text-white text-sm sm:text-base font-medium tracking-tight rounded-full hover:bg-purple-700 transition-all duration-300 hover:cursor-pointer"
            style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
          >
            Join Basic Version Waitlist
            <ArrowRight size={20} className="ml-2" aria-hidden="true" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default BasicWaitlist
