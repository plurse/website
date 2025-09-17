"use client"

import { Mail, Phone, Globe, Slash } from "lucide-react"
import Link from "next/link"
import { motion, Variants, useInView } from "framer-motion"
import { useRef } from "react"

// Animation variants for heading
const headingVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
}

// Animation variants for contact cards
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay: i * 0.15 },
  }),
  hover: {
    scale: 1.02,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
    transition: { duration: 0.3, ease: "easeOut" },
  },
}

const contacts = [
  {
    method: "Email",
    info: "ramsesnjasap11@gmail.com",
    icon: <Mail className="w-6 h-6 text-gray-800" />,
    href: "mailto:ramsesnjasap11@gmail.com",
    target: false, // No new tab
  },
  {
    method: "Phone",
    info: "+237 671 705 816",
    icon: <Phone className="w-6 h-6 text-gray-800" />,
    href: "tel:+237671705816",
    target: false, // No new tab
  },
  {
    // method: "Community",
    method: "LinkedIn",
    // info: "Discord / Twitter / LinkedIn",
    info: "LinkedIn",
    icon: <Globe className="w-6 h-6 text-gray-800" />,
    socials: [
      // {
      //   name: "Discord",
      //   href: "https://discord.gg/example-server"
      // },
      // {
      //   name: "Twitter",
      //   href: "https://x.com/example-server"
      // },
      {
        name: "LinkedIn",
        href: "https://linkedin.com/in/example-server"
      },
    ],
    target: true, // Opens in new tab
  },
  // {
  //   method: "GitHub",
  //   info: "Desktop App Repository",
  //   icon: <Github className="w-6 h-6 text-gray-800" />,
  //   href: "https://github.com/example-repo",
  //   target: true, // Opens in new tab
  // },
]

const Methods = () => {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section
      ref={ref}
      className="py-24 sm:py-32 pt-0 bg-gradient-to-b from-gray-50 to-white"
      id="contact-options"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <motion.h2
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={headingVariants}
          className="text-4xl sm:text-5xl font-bold text-black text-center leading-tight tracking-tight mb-16"
          style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif" }}
        >
          Connect With Us
        </motion.h2>

        {/* Centralized Contact Cards Container */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl">
            {contacts.map((contact, idx) => (
              <motion.div
                key={idx}
                custom={idx}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={cardVariants}
                whileHover="hover"
                className="relative flex flex-col items-center p-6 bg-white/80 backdrop-blur-md border border-gray-100/50 rounded-3xl shadow-sm transition-all duration-300"
              >
                <div className="mb-4">{contact.icon}</div>
                <div className="text-center">
                  <p
                    className="text-lg font-semibold text-gray-900"
                    style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
                  >
                    {contact.method}
                  </p>
                  {contact.socials ? (
                    <div className="flex flex-row items-center space-x-2">
                      {contact.socials.map((social, socialIdx) => (
                        <div key={socialIdx} className="flex items-center">
                          <Link
                            href={social.href}
                            target={contact.target ? "_blank" : undefined}
                            rel={contact.target ? "noopener noreferrer" : undefined}
                            className="text-sm text-gray-600 hover:text-black font-medium transition-colors duration-200 pointer-events-auto"
                            style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
                          >
                            {social.name}
                          </Link>
                          {socialIdx < contact.socials.length - 1 && (
                            <Slash className="w-4 h-4 text-gray-400 mx-1" />
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <Link
                      href={contact.href}
                      target={contact.target ? "_blank" : undefined}
                      rel={contact.target ? "noopener noreferrer" : undefined}
                      className="text-sm text-gray-600 hover:text-black transition-colors duration-200 pointer-events-auto"
                      style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
                    >
                      {contact.info}
                    </Link>
                  )}
                </div>
                {/* Subtle hover overlay */}
                <div
                  className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent to-gray-50/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Methods