"use client"

import Link from "next/link"
import { motion, Variants, useInView } from "framer-motion"
import { useRef } from "react"
import { Mail, ArrowRight } from "lucide-react"
import { useWaitlistModal } from "../waitlist-modal"

// Animation variants for heading and subtext
const textVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
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
    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.3, ease: "easeOut" },
  },
}

// Animation variants for background decorative elements
const decorVariants: Variants = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: {
    opacity: 0.1,
    scale: 1,
    transition: { duration: 1.3, ease: "easeOut" },
  },
}

const Header = () => {
  const { openModal } = useWaitlistModal()
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section
      ref={ref}
      className="relative bg-gradient-to-b from-white to-gray-50 py-24 pb:0 sm:py-32 sm:pb-0 overflow-hidden"
    >
      {/* Decorative Background Elements */}
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={decorVariants}
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[700px] h-[700px] bg-gray-200 rounded-full blur-3xl opacity-10"
      />
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={decorVariants}
        className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gray-200 rounded-full blur-3xl opacity-10"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative">
        {/* Section Heading */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={textVariants}
          className="space-y-8"
        >
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black leading-tight tracking-tight"
            style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif" }}
          >
            Connect with Plurse
          </h1>
          <p
            className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto"
            style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
          >
            Reach out to our{" "}
            <span className="font-semibold text-gray-900">support team</span>.
            <br className="hidden md:block" />
            Subscribe to our{" "}
            <span className="font-semibold text-gray-900">newsletter</span> for the latest updates.
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
              href="mailto:support@inventorysys.com"
              className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 bg-black text-white text-sm sm:text-base font-medium tracking-tight rounded-full hover:bg-gray-900 transition-all duration-300"
              style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
            >
              <Mail size={20} className="mr-2" aria-hidden="true" />
              Contact Support
            </Link>
          </motion.div>
          <motion.div custom={1} variants={buttonVariants} whileHover="hover" className="rounded-full">
            <motion.button
              onClick={openModal}
              className="inline-flex items-center hover:cursor-pointer justify-center px-6 py-3 sm:px-8 sm:py-4 bg-transparent border-2 border-gray-900 text-gray-900 text-sm sm:text-base font-medium tracking-tight rounded-full hover:bg-gray-900 hover:text-white transition-all duration-300"
              style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
            >
              Join Newsletter
              <ArrowRight size={20} className="ml-2" aria-hidden="true" />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Header
