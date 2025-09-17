"use client"

import { Clock, CheckCircle, PieChart, TrendingUp, Shield } from "lucide-react"
import { motion, Variants, useInView } from "framer-motion"
import { useRef } from "react"

// Define point interface for TypeScript
interface ValuePoint {
  title: string
  description: string[]
  icon: React.ComponentType<{ size?: number | string; className?: string }>
}

// Define points array with explicit types
const points: ValuePoint[] = [
  {
    title: "Save Time",
    description: [
      "Automate repetitive tasks like inventory calculations, sales tracking, and product management.",
      "Sync online and offline data seamlessly — no more manual updates or lost information.",
      "Detect potential losses or suspicious activity through real-time user activity monitoring."
    ],
    icon: Clock,
  },
  {
    title: "Focus on Growth",
    description: [
      "Gain actionable business insights to make smarter decisions.",
      "Compare performance with similar businesses in your category to uncover opportunities.",
      "Leverage data-driven insights for pricing, sales strategies, and inventory optimization."
    ],
    icon: TrendingUp,
  },
  {
    title: "Full Control",
    description: [
      "Set minimum sale prices while allowing flexible adjustments — every transaction is recorded accurately.",
      "Manage customer relationships with detailed profiles, contact info, and loyalty tracking.",
      "Maintain complete oversight of your stock, sales, and operations in one place."
    ],
    icon: Shield,
  },
]

const ValueProposition = () => {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  // Animation variants for heading
  const headingVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6, 
        ease: "easeOut" 
      } 
    },
  }

  // Animation variants for points
  const pointVariants: Variants = {
    hidden: { opacity: 0, x: 0 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
        delay: i * 0.2,
      },
    }),
    hover: {
      scale: 1.02,
      transition: { duration: 0.3 },
    },
  }

  const buttonVariants: Variants = {
    hover: { 
      scale: 1.05, 
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", 
      transition: { duration: 0.2 } 
    },
    tap: { scale: 0.95 }
  }

  // Animation variants for decorative elements
  const decorVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 0.2, 
      scale: 1, 
      transition: { 
        duration: 1, 
        ease: "easeOut" 
      } 
    },
  }

  return (
    <section
      ref={ref}
      className="relative bg-gradient-to-b from-white to-gray-50 py-20 sm:py-28 overflow-hidden"
    >
      {/* Decorative Background Element */}
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={decorVariants}
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[600px] h-[600px] bg-blue-200 rounded-full blur-3xl opacity-20"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        {/* Section Heading */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={headingVariants}
          className="text-center space-y-5"
        >
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-black leading-tight tracking-tight"
            style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif" }}
          >
            Why Small Businesses Choose Plurse
          </h2>
          <p
            className="text-lg sm:text-xl text-gray-600 leading-snug max-w-3xl mx-auto"
            style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
          >
            Plurse doesn't just track your sales — it helps you manage money, optimize operations, and grow smarter every day.
          </p>
        </motion.div>

        {/* Value Points Layout */}
        <div className="mt-14 space-y-10 sm:space-y-0 sm:grid sm:grid-cols-1 sm:gap-6 lg:grid-cols-3 lg:gap-8">
          {points.map((point, index) => (
            <motion.div
              key={point.title}
              custom={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? "visible" : "hidden"}
              whileHover="hover"
              variants={pointVariants}
              className="relative bg-white rounded-3xl shadow-lg p-6 sm:p-7 max-w-md mx-auto lg:max-w-none group"
            >
              {/* Subtle Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-100/50 to-transparent opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-300" />

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                  <point.icon size={26} className="text-blue-500" />
                </div>
                <div className="flex-1">
                  <h3
                    className="text-lg sm:text-xl font-semibold text-black tracking-tight"
                    style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif" }}
                  >
                    {point.title}
                  </h3>
                  <ul className="mt-2 space-y-1 text-base sm:text-[17px] text-gray-600 leading-snug" style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}>
                    {point.description.map((desc, index) => (
                      <li key={index} className="flex items-start">
                        <span className="flex-shrink-0 mt-1 w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call-to-Action Button */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={buttonVariants}
          className="mt-12 text-center"
        >
          <motion.a
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            href="/download"
            className="inline-block px-8 py-4 rounded-full bg-black text-white text-sm font-medium tracking-tight hover:bg-gray-900 transition-all duration-300"
            style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
          >
            Try Plurse Now
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default ValueProposition
