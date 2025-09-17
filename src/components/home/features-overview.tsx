"use client"

import { Users, Package, BarChart3, ClipboardList, Lock } from "lucide-react"
import { motion, Variants, useInView } from "framer-motion"
import { useRef } from "react"

// Define feature interface for TypeScript
interface Feature {
  name: string
  description: string
  icon: React.ComponentType<{ size?: number | string; className?: string }>
}

// Define features array with explicit types
const features: Feature[] = [
  {
    name: "Multi-user Authentication",
    description:
      "Securely manage multiple accounts with a robust login system, ensuring controlled access to your inventory.",
    icon: Lock,
  },
  {
    name: "Product & Category Management",
    description:
      "Effortlessly organize products and categories with intuitive CRUD operations for seamless inventory control.",
    icon: Package,
  },
  {
    name: "Customer Tracking",
    description:
      "Monitor customer activity and build stronger relationships with detailed, easy-to-access records.",
    icon: Users,
  },
  {
    name: "Business Analysis & Sales Tracking",
    description:
      "Gain clear insights with powerful analytics to track sales and drive smarter business decisions.",
    icon: BarChart3,
  },
  {
    name: "Activity Logging",
    description:
      "Maintain accountability with comprehensive logs of user and system activities, always at your fingertips.",
    icon: ClipboardList,
  },
]

const FeatureOverview = () => {
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

  const buttonVariants: Variants = {
    hover: { 
      scale: 1.05, 
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", 
      transition: { duration: 0.2 } 
    },
    tap: { scale: 0.95 }
  }

  // Animation variants for feature cards
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50, rotate: -2 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
        delay: i * 0.15,
      },
    }),
    hover: {
      scale: 1.03,
      rotate: 0.5,
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)", // Reduced shadow intensity
      transition: { duration: 0.3 },
    },
  }

  // Animation variants for branch paths
  const pathVariants: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => ({
      pathLength: 1,
      opacity: 0.5,
      transition: {
        duration: 1,
        ease: "easeOut",
        delay: i * 0.3 + 0.5, // Delayed to sync with card animations
      },
    }),
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
      {/* Decorative Background Elements */}
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={decorVariants}
        className="absolute top-10 left-0 w-[400px] h-[400px] bg-blue-200 rounded-full blur-3xl opacity-15"
      />
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={decorVariants}
        className="absolute bottom-10 right-0 w-[400px] h-[400px] bg-blue-200 rounded-full blur-3xl opacity-15"
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
            More Than Just Management
          </h2>
          <p
            className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto"
            style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
          >
            Turn every transaction into insight, every insight into action, and every action into growth. Streamline inventory, sales, and customer relationships with tools designed to give your business a real heartbeat — and extra value at every step.
          </p>
        </motion.div>

        {/* Feature Cards with Branch Connections */}
        <div className="mt-20 relative space-y-12 sm:space-y-0">
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 0 }}
          >
            {features.slice(0, -1).map((_, index) => (
              <motion.path
                key={`path-${index}`}
                d={`M${index % 2 === 0 ? 200 : 400},${120 + index * 200} C${
                  index % 2 === 0 ? 300 : 500
                },${140 + index * 200} ${index % 2 === 0 ? 200 : 400},${
                  160 + index * 200
                } ${index % 2 === 0 ? 400 : 200},${180 + index * 200}`}
                stroke="#007AFF"
                strokeWidth="2"
                fill="none"
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={pathVariants}
                custom={index}
              />
            ))}
          </svg>

          {features.map((feature, index) => (
            <motion.div
              key={feature.name}
              custom={index}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              whileHover="hover"
              variants={cardVariants}
              className={`relative bg-white rounded-3xl shadow-sm p-8 sm:p-10 max-w-lg mx-auto lg:max-w-md group ${
                index % 2 === 0 ? "lg:ml-0 lg:mr-auto" : "lg:mr-0 lg:ml-auto"
              }`}
              style={{
                transform: `translateY(${index * 20}px)`,
                zIndex: features.length - index,
              }}
            >
              {/* Hover Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-100/50 to-transparent opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-300" />

              <div className = "flex items-start space-x-5">
                <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center">
                  <feature.icon size={32} className="text-blue-500" aria-label={`${feature.name} icon`} />
                </div>
                <div className="flex-1">
                  <h3
                    className="text-xl sm:text-2xl font-semibold text-black tracking-tight"
                    style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif" }}
                  >
                    {feature.name}
                  </h3>
                  <p
                    className="mt-3 text-base sm:text-lg text-gray-600 leading-relaxed"
                    style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
                  >
                    {feature.description}
                  </p>
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
          className="mt-16 flex justify-center"
        >
          <motion.a
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            href="/features"
            className="px-8 py-4 rounded-full bg-black text-white text-sm font-medium tracking-tight hover:bg-gray-900 transition-all duration-300"
            style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
          >
            Explore All Features
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default FeatureOverview