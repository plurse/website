"use client"

import { motion, Variants, useInView } from "framer-motion"
import { useRef } from "react"
import { Users, Package, UserCheck, BarChart3, ClipboardList } from "lucide-react"

// Define feature interface for TypeScript
interface Feature {
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
}

// Experimental features array
const experimentalFeatures: Feature[] = [
  {
    title: "User Management",
    description: "Manage multiple user accounts with secure authentication and role-based access control.",
    icon: Users,
  },
  {
    title: "Product & Inventory",
    description: "Create, update, and organize products and categories with real-time stock tracking.",
    icon: Package,
  },
  {
    title: "Customer Management",
    description: "Track customer details and purchase history to build stronger client relationships.",
    icon: UserCheck,
  },
  {
    title: "Sales & Analytics",
    description: "Gain deep business insights with charts, revenue tracking, and performance reports.",
    icon: BarChart3,
  },
  {
    title: "Activity & Audit Logs",
    description: "Monitor user activities for complete transparency and accountability.",
    icon: ClipboardList,
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

// Animation variants for feature cards
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

const ExperimentalFeatures = () => {
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            Experimental Version Features
          </h2>
          <p
            className="mt-4 text-lg sm:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto"
            style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
          >
            Everything you need to manage your business effectively — included in the experimental version.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {experimentalFeatures.map((feature, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              whileHover="hover"
              className="p-6 sm:p-8 bg-white rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                <feature.icon className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500" />
              </div>
              <h3
                className="text-lg sm:text-xl font-semibold text-black tracking-tight"
                style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif" }}
              >
                {feature.title}
              </h3>
              <p
                className="mt-2 text-sm sm:text-base text-gray-600 leading-relaxed flex-1"
                style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
              >
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ExperimentalFeatures