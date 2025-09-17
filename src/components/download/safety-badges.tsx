"use client"

import { motion, Variants, useInView } from "framer-motion"
import { JSX, useRef } from "react"
import { ShieldCheck, Lock, CheckCircle2 } from "lucide-react"

// Define badge interface for TypeScript
interface Badge {
  icon: JSX.Element
  text: string
}

// Badges data array
const badges: Badge[] = [
  {
    icon: <ShieldCheck className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />,
    text: "No ads or spyware",
  },
  {
    icon: <Lock className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />,
    text: "Secure & lightweight",
  },
  {
    icon: <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />,
    text: "Verified installation files",
  },
]

// Animation variants for heading
const headingVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

// Animation variants for badge cards
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay: i * 0.1 },
  }),
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

const SafetyBadges = () => {
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

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={headingVariants}
          className="text-center mb-12 sm:mb-16"
        >
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-black leading-tight tracking-tight"
            style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif" }}
          >
            Safe & Trusted
          </h2>
          <p
            className="mt-4 text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto"
            style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
          >
            Download Plurse with confidence, built for security and reliability.
          </p>
        </motion.div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {badges.map((badge, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={cardVariants}
              whileHover="hover"
              className="flex flex-col items-center p-6 sm:p-8 bg-white border border-gray-200 rounded-3xl shadow-sm transition-all duration-300 text-center"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                {badge.icon}
              </div>
              <p
                className="text-sm sm:text-base font-medium text-gray-700"
                style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
              >
                {badge.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SafetyBadges