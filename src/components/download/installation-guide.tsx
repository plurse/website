"use client"

import { useState } from "react"
import { motion, Variants, useInView } from "framer-motion"
import { useRef } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

// Define guide interface for TypeScript
interface Guide {
  os: string
  steps: string[]
}

// Guides data array
const guides: Guide[] = [
  {
    os: "Windows",
    steps: [
      "Download the `.exe` installer from the Platforms section.",
      "Double-click the file to launch the setup wizard.",
      "Follow the on-screen instructions to install.",
      "Launch Plurse from the Start Menu.",
    ],
  },
  {
    os: "Linux",
    steps: [
      "Download the `.AppImage` file from the Platforms section.",
      "Open a terminal and run: `chmod +x Plurse.AppImage`.",
      "Execute the app with: `./Plurse.AppImage`.",
      "Alternatively, install via your distro’s package manager.",
    ],
  },
  {
    os: "MacOS",
    steps: [
      "Download the `.dmg` file from the Platforms section.",
      "Open the file and drag Plurse to the Applications folder.",
      "Launch Plurse from the Applications folder or Spotlight.",
    ],
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

// Animation variants for accordion items
const accordionVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay: i * 0.1 },
  }),
  hover: {
    backgroundColor: "#F9FAFB",
    transition: { duration: 0.3 },
  },
}

// Animation variants for accordion content
const contentVariants: Variants = {
  closed: { opacity: 0, height: 0, transition: { duration: 0.3, ease: "easeOut" } },
  open: { opacity: 1, height: "auto", transition: { duration: 0.3, ease: "easeOut" } },
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

const InstallationGuide = () => {
  const [active, setActive] = useState<string | null>(null)
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

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
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
            Installation Guide
          </h2>
          <p
            className="mt-4 text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto"
            style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
          >
            Get started with Plurse in just a few simple steps.
          </p>
        </motion.div>

        {/* Accordion */}
        <div className="space-y-4">
          {guides.map((guide, index) => (
            <motion.div
              key={guide.os}
              custom={index}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={accordionVariants}
              whileHover="hover"
              className="border border-gray-200 rounded-2xl shadow-sm bg-white overflow-hidden"
            >
              <button
                onClick={() => setActive(active === guide.os ? null : guide.os)}
                className="w-full flex justify-between items-center px-6 py-4 text-left text-lg sm:text-xl font-semibold text-black hover:bg-gray-50 transition-all duration-300"
                style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif" }}
                aria-expanded={active === guide.os}
                aria-controls={`guide-${guide.os}`}
              >
                {guide.os}
                <span>
                  {active === guide.os ? (
                    <ChevronUp size={20} className="text-blue-500" aria-hidden="true" />
                  ) : (
                    <ChevronDown size={20} className="text-blue-500" aria-hidden="true" />
                  )}
                </span>
              </button>
              <motion.ul
                id={`guide-${guide.os}`}
                initial="closed"
                animate={active === guide.os ? "open" : "closed"}
                variants={contentVariants}
                className="px-6 pb-4 space-y-2 text-sm sm:text-base text-gray-600"
                style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
              >
                {guide.steps.map((step, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="mr-2 text-blue-500">•</span>
                    {step}
                  </li>
                ))}
              </motion.ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default InstallationGuide