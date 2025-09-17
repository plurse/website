"use client"

import { JSX, useEffect, useState, useRef } from "react"
import { motion, Variants, useInView } from "framer-motion"
import { FaWindows, FaApple, FaLinux } from "react-icons/fa"
import { Download } from "lucide-react"

// Define OS type and platform interface for TypeScript
type OS = "Windows" | "MacOS" | "Linux" | "Unknown"

interface Platform {
  name: OS
  icon: JSX.Element
  file: string
  size: string
  version: string
}

// Platform data array with direct Google Drive download links
const platforms: Platform[] = [
  {
    name: "Windows",
    icon: <FaWindows size={40} />,
    file: "https://www.dropbox.com/scl/fi/9cft0psazo5z9vkdqxiz5/inflow-experimental-1.0.0-setup.exe?rlkey=5td3l34bncnobsex4li91phai&st=6ygqu4rg&dl=1",
    size: "93.7 MB",
    version: "v1.0.0",
  },
  {
    name: "MacOS",
    icon: <FaApple size={40} />,
    file: "https://www.dropbox.com/scl/fi/kohbvdwao8atiprpdkmbh/Inflow-Experimental-1.0.0-mac.zip?rlkey=bhnvaaakg2uxtsfm4fhzvmidp&st=6cah5v3j&dl=1",
    size: "117 MB",
    version: "v1.0.0",
  },
  {
    name: "Linux",
    icon: <FaLinux size={40} />,
    file: "https://www.dropbox.com/scl/fi/yvfo1see033levbnnop7c/inflow-experimental-1.0.0.deb?rlkey=4p2n3qlac1k5hzzvqtzdaxwsp&st=xp604n01&dl=1",
    size: "84.3 MB",
    version: "v1.0.0",
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

// Animation variants for platform cards
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

const Platforms = () => {
  const [os, setOs] = useState<OS>("Unknown")
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase()

    if (userAgent.includes("win")) {
      setOs("Windows")
    } else if (userAgent.includes("mac")) {
      setOs("MacOS")
    } else if (userAgent.includes("linux")) {
      setOs("Linux")
    } else {
      setOs("Unknown")
    }
  }, [])

  // Reorder so detected OS is first
  const orderedPlatforms = [
    ...platforms.filter((p) => p.name === os),
    ...platforms.filter((p) => p.name !== os),
  ]

  return (
    <section
      ref={ref}
      id="downloads"
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
            Choose Your Platform
          </h2>
          <p
            className="mt-4 text-lg sm:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto"
            style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
          >
            Download Plurse for your device and start managing your business today.
          </p>
        </motion.div>

        {/* Platform Grid */}
        <div className="grid gap-6 sm:gap-8 md:grid-cols-3" id="platforms">
          {orderedPlatforms.map((platform, index) => {
            const isActive = platform.name === os

            return (
              <motion.div
                key={platform.name}
                custom={index}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"} // 👈 controlled by parent
                variants={cardVariants}
                whileHover="hover"
                className={`relative p-6 sm:p-8 bg-white rounded-3xl shadow-sm transition-all duration-300 flex flex-col items-center text-center ${
                  isActive ? "border-2 border-blue-500 scale-105" : "border border-gray-200"
                }`}
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                  {platform.icon}
                </div>
                <h3
                  className="text-lg sm:text-xl font-semibold text-black tracking-tight"
                  style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif" }}
                >
                  {platform.name}
                </h3>
                <p
                  className="mt-2 text-sm sm:text-base text-gray-600"
                  style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
                >
                  {platform.version} · {platform.size}
                </p>
                <a
                  href={platform.file}
                  download
                  className="mt-6 w-full inline-flex items-center justify-center px-4 py-3 bg-black text-white text-sm sm:text-base font-medium tracking-tight rounded-full hover:bg-gray-900 transition-all duration-300"
                  style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
                >
                  <Download size={20} className="mr-2" aria-hidden="true" />
                  Download
                </a>
                {isActive && (
                  <p
                    className="mt-3 text-xs sm:text-sm text-blue-500 font-semibold"
                    style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
                  >
                    Recommended for your device
                  </p>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Platforms
