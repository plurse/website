"use client"

import { motion, Variants, useInView } from "framer-motion"
import { useRef } from "react"
import { Cloud, Smartphone, LineChart, Brain, Lock, ArrowRight, CreditCard, Printer } from "lucide-react"
import Link from "next/link"
import { useWaitlistModal } from "../waitlist-modal"


// Define feature interface for TypeScript
interface Feature {
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
}

// Pro features array
// const proFeatures: Feature[] = [
//   {
//     title: "Online Syncing",
//     description: "Effortlessly back up and sync your data across all devices in real-time.",
//     icon: Cloud,
//   },
//   {
//     title: "Multi-Device Access",
//     description: "Seamlessly work from your desktop, laptop, or mobile without interruption.",
//     icon: Smartphone,
//   },
//   {
//     title: "Market Analysis",
//     description: "Unlock insights into market trends to drive smarter business decisions.",
//     icon: LineChart,
//   },
//   {
//     title: "AI Marketer",
//     description: "Leverage AI-driven suggestions for promotions, campaigns, and strategies.",
//     icon: Brain,
//   },
// ]

const basicFeatures: Feature[] = [
  {
    title: "Everything in Experimental Version",
    description: "All the features from the experimental version bundled into a stable release for everyday use.",
    icon: Cloud,
  },
  {
    title: "Built for Small Business Solutions",
    description: "Designed to simplify stock control, sales tracking, and team collaboration for growing businesses.",
    icon: Smartphone,
  },
  {
    title: "Market Analysis",
    description: "Analyze trends, track customer demand, and gain insights to make smarter inventory and sales decisions.",
    icon: LineChart,
  },
  {
    title: "Track Money Flow",
    description: "Monitor revenue, expenses, and profits in real-time to keep your business financially healthy.",
    icon: Brain,
  },
  {
    title: "Seamless Online Payments",
    description: "Accept payments easily through multiple gateways and integrate with your sales process.",
    icon: CreditCard,
  },
  {
    title: "POS Printer Compatibility",
    description: "Print receipts and invoices instantly with support for common POS printers.",
    icon: Printer,
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

// Animation variants for CTA button
const ctaVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut", delay: 0.6 },
  },
  hover: {
    scale: 1.05,
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    transition: { duration: 0.3 },
  },
}

const BasicFeatures = () => {
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
            Basic Version: Coming Soon
          </h2>
          <p
            className="mt-4 text-lg sm:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto"
            style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
          >
            Unlock advanced features designed to scale your growing business.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          {basicFeatures.map((feature, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              whileHover="hover"
              className="relative p-6 sm:p-8 bg-white rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className="absolute top-4 right-4">
                <Lock className="h-5 w-5 text-blue-500 opacity-70" aria-hidden="true" />
              </div>
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
              <span
                className="mt-4 inline-block text-sm font-medium text-blue-500"
                style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
              >
                Coming Soon
              </span>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={buttonVariants}
          className="mt-16 flex justify-center"
        >
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            onClick={openModal}
            className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 hover:cursor-pointer rounded-full bg-black text-white text-sm sm:text-base font-medium tracking-tight hover:bg-gray-900 transition-all duration-300"
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

export default BasicFeatures
