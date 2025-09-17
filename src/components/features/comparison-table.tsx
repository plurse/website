"use client"

import { motion, Variants, useInView } from "framer-motion"
import { useRef } from "react"
import { Check, X, ArrowRight } from "lucide-react"
import { useWaitlistModal } from "../waitlist-modal"

// Define comparison data interface for TypeScript
interface ComparisonFeature {
  feature: string
  experimental: boolean
  basic: boolean
}

// Comparison data array
const comparisonData: ComparisonFeature[] = [
  {
    feature: "Free",
    experimental: true,
    basic: true,
  },
  {
    feature: "Multi-user Authentication",
    experimental: true,
    basic: true,
  },
  {
    feature: "Product & Inventory Management",
    experimental: true,
    basic: true,
  },
  {
    feature: "Customer Tracking",
    experimental: true,
    basic: true,
  },
  {
    feature: "Sales & Analytics",
    experimental: true,
    basic: true,
  },
  {
    feature: "Activity & Audit Logs",
    experimental: true,
    basic: true,
  },
  {
    feature: "Market Analysis",
    experimental: false,
    basic: true,
  },
  {
    feature: "Track Money Flow",
    experimental: false,
    basic: true,
  },
  {
    feature: "Seamless Online Payments",
    experimental: false,
    basic: true,
  },
  {
    feature: "POS Printer Compatibility",
    experimental: false,
    basic: true,
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

// Animation variants for table rows
const rowVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut", delay: i * 0.05 },
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
    opacity: 0.15,
    scale: 1,
    transition: { duration: 1.2, ease: "easeOut" },
  },
}

const ComparisonTable = () => {
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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
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
            Experimental vs Basic Comparison
          </h2>
          <p
            className="mt-4 text-lg sm:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto"
            style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
          >
            Discover what’s included in the experimental version and unlock advanced features with Basic.
          </p>
        </motion.div>

        {/* Table */}
        <div className="overflow-x-auto rounded-2xl shadow-sm">
          <table className="w-full border-collapse bg-white rounded-2xl">
            <thead>
              <tr className="bg-gray-50 text-left text-gray-800">
                <th
                  className="px-6 py-4 text-lg sm:text-xl font-semibold"
                  style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif" }}
                >
                  Feature
                </th>
                <th
                  className="px-6 py-4 text-lg sm:text-xl font-semibold text-center"
                  style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif" }}
                >
                  Experimental
                </th>
                <th
                  className="px-6 py-4 text-lg sm:text-xl font-semibold text-center"
                  style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif" }}
                >
                  Basic
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, idx) => (
                <motion.tr
                  key={idx}
                  custom={idx}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={rowVariants}
                  whileHover="hover"
                  className="border-t border-gray-200"
                >
                  <td
                    className="px-6 py-4 text-gray-700 text-sm sm:text-base font-medium"
                    style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
                  >
                    {row.feature}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {row.experimental ? (
                      <Check className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500 mx-auto" aria-hidden="true" />
                    ) : (
                      <X className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400 mx-auto" aria-hidden="true" />
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {row.basic ? (
                      <Check className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500 mx-auto" aria-hidden="true" />
                    ) : (
                      <X className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400 mx-auto" aria-hidden="true" />
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Call to Action */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={buttonVariants}
          className="mt-16 flex justify-center"
        >
          <motion.a
            variants={buttonVariants}
            whileHover="hover"
            onClick={openModal}
            className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 rounded-full hover:cursor-pointer bg-black text-white text-sm sm:text-base font-medium tracking-tight hover:bg-gray-900 transition-all duration-300"
            style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
          >
            Join Basic Version Waitlist
            <ArrowRight size={20} className="ml-2" aria-hidden="true" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default ComparisonTable