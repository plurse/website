"use client"

import Link from "next/link"
import { motion, Variants } from "framer-motion"
import Image from "next/image"

const Header = () => {
  // Define animation variants with explicit TypeScript types
  const textVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6, 
        ease: "easeOut" // Valid Easing value
      } 
    }
  }

  const buttonVariants: Variants = {
    hover: { 
      scale: 1.05, 
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", 
      transition: { duration: 0.2 } 
    },
    tap: { scale: 0.95 }
  }

  const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { 
        duration: 0.8, 
        ease: "easeOut" // Valid Easing value
      } 
    }
  }

  return (
    <header className="bg-gradient-to-b from-white to-gray-50 pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Side: Text */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={textVariants}
          className="space-y-6"
        >
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-black leading-tight tracking-tight"
            style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif" }}
          >
            <span className="text-blue-500">
              Plurse:{" "}
            </span>
            From Every Transaction to a Bigger Vision
          </h1>

          <p
            className="text-lg text-gray-600 leading-relaxed max-w-lg"
            style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
          >
            Track inventory, monitor cashflow, and uncover growth strategies — all in one simple tool.
          </p>

          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap" className="rounded-full" style={{ display: 'inline-block' }}>
              <Link
                href="/download#downloads"
                className="inline-block px-6 py-3 rounded-full bg-black text-white text-sm font-medium tracking-tight hover:bg-gray-900 transition-all duration-300"
                style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
              >
                Download Now
              </Link>
            </motion.div>
            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap" className="rounded-full" style={{ display: 'inline-block' }}>
              <Link
                href="/features"
                className="inline-block px-6 py-3 rounded-full border border-gray-200 text-black text-sm font-medium tracking-tight hover:bg-gray-100 transition-all duration-300"
                style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
              >
                Learn More
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Side: Image / Screenshot Placeholder */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={imageVariants}
          className="flex justify-center"
        >
          <div className="w-full max-w-md h-72 sm:h-80 bg-gray-100 rounded-2xl shadow-xl overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 opacity-50" />
            <span
              className="absolute inset-0 flex items-center justify-center text-gray-500 text-lg font-medium"
              style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
            >
              <Image
                src="/screenshots/home/screenshot1.png"
                alt="Screenshot 1"
                fill
                style={{ objectFit: 'cover' }} // or 'contain'
              />
            </span>
          </div>
        </motion.div>
      </div>
    </header>
  )
}

export default Header