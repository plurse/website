"use client"

import { motion, Variants, useInView } from "framer-motion"
import { useRef, useState } from "react"

const DemoSection = () => {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  // Animation variants for heading
  const headingVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  // Animation variants for video
  const videoVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
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

  return (
    <section
      ref={ref}
      className="relative bg-gradient-to-b from-white to-gray-50 py-24 sm:py-32 overflow-hidden"
    >
      {/* Decorative Background Element */}
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={decorVariants}
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[600px] h-[600px] bg-blue-200 rounded-full blur-3xl opacity-15"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        {/* Section Heading */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={headingVariants}
          className="text-center space-y-6"
        >
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-black leading-tight tracking-tight"
            style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif" }}
          >
            Experience Plurse in Motion
          </h2>
          <p
            className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto"
            style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
          >
            Watch our demo to see the intuitive interface and powerful features that simplify your business management.
          </p>
        </motion.div>

        {/* Video Player */}
        <motion.div
          variants={videoVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-16 w-full max-w-4xl mx-auto h-64 sm:h-80 md:h-96 rounded-2xl shadow-sm overflow-hidden relative"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover rounded-2xl"
            poster="/videos/home/video1.webm"
          >
            <source src="/videos/home/video1.webm" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4 text-white">
            <p
              className="text-sm sm:text-base font-medium"
              style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
            >
              Plurse: Streamlined Inventory Management
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default DemoSection