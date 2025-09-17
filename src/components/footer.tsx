"use client"

import Link from "next/link"
import { motion, Variants, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Send, Linkedin } from "lucide-react"

// Define quick link interface for TypeScript
interface QuickLink {
  name: string
  href: string
}

// Quick links array
const quickLinks: QuickLink[] = [
  { name: "Home", href: "/" },
  { name: "Features", href: "/features" },
  { name: "Download", href: "/download" },
  // { name: "Docs", href: "/docs" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
]

// Social media links
const socialLinks = [
  // { name: "Twitter", href: "https://twitter.com/plurse", icon: Twitter },
  // { name: "GitHub", href: "https://github.com/plurse", icon: Github },
  // { name: "Instagram", href: "https://instagram.com/plurse", icon: Instagram },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/plurse", icon: Linkedin },
]

// Animation variants for sections
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

// Animation variants for links
const linkVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut", delay: i * 0.1 },
  }),
  hover: {
    color: "#007AFF",
    x: 5,
    transition: { duration: 0.3 },
  },
}

// Animation variants for newsletter input
const inputVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  hover: {
    scale: 1.02,
    transition: { duration: 0.3 },
  },
}

// Animation variants for background decorative elements
const decorVariants: Variants = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: {
    opacity: 0.1,
    scale: 1,
    transition: { duration: 1.2, ease: "easeOut" },
  },
}

const Footer = () => {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [email, setEmail] = useState("")

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement newsletter submission logic here
    console.log("Newsletter subscription:", email)
    setEmail("")
  }

  return (
    <footer
      ref={ref}
      className="relative bg-gradient-to-t from-gray-900 to-black py-16 sm:py-20 overflow-hidden"
    >
      {/* Decorative Background Element */}
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={decorVariants}
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[600px] h-[600px] bg-blue-200 rounded-full blur-3xl opacity-10"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 sm:gap-12">
          {/* Branding */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={sectionVariants}
            className="text-center md:text-left"
          >
            <h2
              className="text-2xl sm:text-3xl font-semibold text-white tracking-tight"
              style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif" }}
            >
              Plurse
            </h2>
            <p
              className="mt-2 text-sm sm:text-base text-gray-400 leading-relaxed"
              style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
            >
              Track Smart. Grow Faster.
            </p>
            <div className="mt-4 flex justify-center md:justify-start space-x-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  custom={index}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  whileHover="hover"
                  variants={linkVariants}
                  className="text-gray-400 hover:text-blue-500 transition"
                  aria-label={link.name}
                >
                  <link.icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={sectionVariants}
            className="text-center"
          >
            <h3
              className="text-lg sm:text-xl font-semibold text-white mb-4"
              style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif" }}
            >
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  custom={index}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  whileHover="hover"
                  variants={linkVariants}
                >
                  <Link
                    href={link.href}
                    className="text-sm sm:text-base text-gray-400 hover:text-blue-500 transition"
                    style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter Signup */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={sectionVariants}
            className="text-center md:col-span-2"
          >
            <h3
              className="text-lg sm:text-xl font-semibold text-white mb-4"
              style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif" }}
            >
              Stay Updated
            </h3>
            <p
              className="text-sm sm:text-base text-gray-400 mb-4"
              style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
            >
              Subscribe to our newsletter for the latest updates and tips.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex justify-center">
              <motion.div
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                whileHover="hover"
                variants={inputVariants}
                className="flex w-full max-w-md"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-l-full bg-gray-800 text-white text-sm sm:text-base placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
                  required
                />
                <button
                  type="submit"
                  className="px-4 sm:px-6 py-3 bg-blue-500 text-white rounded-r-full hover:bg-blue-600 transition-all duration-300"
                  aria-label="Subscribe to newsletter"
                >
                  <Send size={20} />
                </button>
              </motion.div>
            </form>
          </motion.div>

          {/* Version & Copyright */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={sectionVariants}
            className="text-center md:text-right md:col-span-4"
          >
            <p
              className="text-sm text-gray-400"
              style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
            >
              Version 1.0.0
            </p>
            <p
              className="text-sm text-gray-400 mt-2"
              style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
            >
              &copy; {new Date().getFullYear()} Plurse. All rights reserved.
            </p>
            <p
              className="text-sm text-gray-500 mt-2"
              style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
            >
              Designed & Built by{" "}
              <a href="https://www.linkedin.com/in/ramses-njasap/" target="_blank">Ramses Njasap</a>
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}

export default Footer