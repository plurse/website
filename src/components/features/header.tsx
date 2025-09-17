"use client"

import Link from "next/link"
import { motion, Variants, useInView } from "framer-motion"
import { useRef } from "react"
import { Download, ArrowRight } from "lucide-react"
import Image from "next/image"
import { useWaitlistModal } from "../waitlist-modal"

// Animation variants for heading and subtext
const textVariants: Variants = {
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

// Animation variants for hero image
const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut", delay: 0.4 },
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

const Header = () => {
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
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={decorVariants}
        className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-200 rounded-full blur-3xl opacity-15"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative">
        {/* Section Heading */}
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
            Discover Plurse' Powerful Features
          </h1>
          <p
            className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto"
            style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
          >
            All essential tools are included in the{" "}
            <span className="font-semibold text-blue-500">Experimental version</span>.
            <br className="hidden md:block" />
            Join the{" "}
            <span className="font-semibold text-blue-500">Basic version waitlist</span> for advanced features, coming soon.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="mt-12 flex flex-col sm:flex-row justify-center gap-4 sm:gap-6"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div custom={0} variants={buttonVariants} whileHover="hover" className="rounded-full">
            <Link
              href="/download#downloads"
              className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 bg-black text-white text-sm sm:text-base font-medium tracking-tight rounded-full hover:bg-gray-900 transition-all duration-300"
              style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
            >
              <Download size={20} className="mr-2" aria-hidden="true" />
              Download Free
            </Link>
          </motion.div>
          <motion.div custom={1} variants={buttonVariants} whileHover="hover" className="rounded-full">
            <button
              onClick={openModal}
              className="inline-flex items-center justify-center  cursor-pointer px-6 py-3 sm:px-8 sm:py-4 bg-transparent border-2 border-blue-500 text-blue-500 text-sm sm:text-base font-medium tracking-tight rounded-full hover:bg-blue-500 hover:text-white transition-all duration-300"
              style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
            >
              Join Basic Version Waitlist
              <ArrowRight size={20} className="ml-2" aria-hidden="true" />
            </button>
          </motion.div>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={imageVariants}
          className="mt-16 relative w-full max-w-4xl mx-auto h-64 sm:h-80 md:h-96 rounded-2xl shadow-sm overflow-hidden"
        >
          <Image
            src="/screenshots/home/screenshot1.png"
            alt="Plurse app dashboard"
            fill
            className="object-cover rounded-2xl"
            priority
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4 text-white">
            <p
              className="text-sm sm:text-base font-medium"
              style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
            >
              Streamlined inventory management with Plurse
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Header
