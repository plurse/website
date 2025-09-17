"use client"

import { motion, Variants, useInView } from "framer-motion"
import { useRef } from "react"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

// Animation variants for heading and subtext
const textVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
}

// Animation variants for CTA button
const ctaVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut", delay: 0.5 },
  },
  hover: {
    scale: 1.05,
    boxShadow: "0 6px 16px rgba(0, 0, 0, 0.15)",
    transition: { duration: 0.3 },
  },
}

// Animation variants for feature highlights
const highlightVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay: 0.7 + i * 0.1 },
  }),
  hover: {
    backgroundColor: "#F9FAFB",
    transition: { duration: 0.3 },
  },
}

// Animation variants for background decorative elements
const decorVariants: Variants = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: {
    opacity: 0.2,
    scale: 1,
    transition: { duration: 1.5, ease: "easeOut" },
  },
}

const highlights = [
  "Complete money flow visibility (Purse)",
  "Real-time business health monitoring (Pulse)",
  // "AI-powered growth recommendations (Plus)"
  "Business growth recommendations (Plus)"
]

const Header = () => {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section
      ref={ref}
      className="relative bg-gradient-to-b from-white to-gray-100 py-24 sm:py-32 overflow-hidden"
    >
      {/* Decorative Background Elements */}
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={decorVariants}
        className="absolute top-0 left-1/3 transform -translate-x-1/2 w-[500px] h-[500px] bg-blue-200 rounded-full blur-3xl opacity-20"
      />
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={decorVariants}
        className="absolute bottom-0 right-1/4 transform translate-x-1/2 w-[400px] h-[400px] bg-blue-200 rounded-full blur-3xl opacity-20"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Heading and Subtext */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={textVariants}
          className="space-y-6"
        >
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-black leading-tight tracking-tight"
            style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif" }}
          >
            About Plurse
          </h1>
          <p
            className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto"
            style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
          >
            <span className="text-blue-600 font-semibold">Your business purse, supercharged.</span> Plurse tracks every penny in and{" "}
            out, every item bought and sold, every customer interaction.{" "}
            Our intelligent systems watches your business pulse 24/7, detecting opportunities,{" "}
            preventing losses, and turning your inventory data into profit insights.{" "}
            Offline or online, solo or team - your business intelligence travels{" "}
            with you.
          </p>
        </motion.div>

        {/* Feature Highlights */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-3xl mx-auto">
          {highlights.map((highlight, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={highlightVariants}
              whileHover="hover"
              className="p-4 sm:p-6 bg-white border border-gray-200 rounded-2xl shadow-sm text-center"
            >
              <p
                className="text-sm sm:text-base font-medium text-gray-700"
                style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
              >
                {highlight}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={ctaVariants}
          whileHover="hover"
          className="mt-10 w-fit rounded-full mx-auto"
        >
          <Link
            href="/features"
            className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 bg-black text-white text-sm sm:text-base font-medium tracking-tight rounded-full hover:bg-black transition-all duration-300"
            style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
          >
            Discover Features
            <ArrowRight size={20} className="ml-2" aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default Header