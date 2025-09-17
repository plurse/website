"use client"

import { motion, Variants, useInView } from "framer-motion"
import { useRef } from "react"

// Define mission and vision interface for TypeScript
interface MissionVisionData {
  title: string
  description: string
}

// Mission and vision data array
const missionVision: MissionVisionData[] = [
  {
    title: "Mission",
    description:
      "Plurse transforms small business management by combining comprehensive tracking (purse), real-time monitoring (pulse), and intelligent growth strategies (plus) into one powerful, offline-capable platform.",
  },
  {
    title: "Vision",
    description:
      "A future where small businesses never lose money to theft, never miss growth opportunities, and always know their true business pulse.",
  },
]

// Animation variants for heading
const headingVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
}

// Animation variants for mission/vision cards
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay: i * 0.2 },
  }),
  hover: {
    scale: 1.03,
    backgroundColor: "#F9FAFB",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
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

const MissionVision = () => {
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
            Mission & Vision
          </h2>
          <p
            className="mt-4 text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto"
            style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
          >
            Empowering small businesses with enterprise-level intelligence.
          </p>
        </motion.div>

        {/* Mission and Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {missionVision.map((item, index) => (
            <motion.div
              key={item.title}
              custom={index}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={cardVariants}
              whileHover="hover"
              className="p-6 sm:p-8 bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col items-center text-center"
            >
              <h3
                className="text-lg sm:text-xl font-semibold text-black mb-4"
                style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif" }}
              >
                {item.title}
              </h3>
              <p
                className="text-sm sm:text-base text-gray-600 leading-relaxed"
                style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
              >
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default MissionVision
