"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, ChevronRight } from "lucide-react"
import { motion, Variants } from "framer-motion"

type DocSection = {
  title: string
  slug: string
  comingSoon?: boolean
  children?: DocSection[]
}

const docsSections: DocSection[] = [
  {
    title: "Getting Started",
    slug: "getting-started",
    children: [
      { title: "Windows", slug: "getting-started-windows" },
      { title: "MacOS", slug: "getting-started-macos" },
      { title: "Linux", slug: "getting-started-linux" },
    ],
  },
  {
    title: "Free Version Features",
    slug: "free-features",
    children: [
      { title: "User Management", slug: "user-management" },
      { title: "Product & Inventory", slug: "product-inventory" },
      { title: "Customer Tracking", slug: "customer-tracking" },
      { title: "Sales & Analytics", slug: "sales-analytics" },
      { title: "Activity & Logs", slug: "activity-logs" },
    ],
  },
  {
    title: "Pro Version Features",
    slug: "pro-features",
    comingSoon: true,
    children: [
      { title: "Online Syncing", slug: "online-syncing" },
      { title: "Multi-device", slug: "multi-device" },
      { title: "Market Analysis", slug: "market-analysis" },
      { title: "AI Marketer", slug: "ai-marketer" },
    ],
  },
  {
    title: "FAQs / Troubleshooting",
    slug: "faqs",
    comingSoon: true,
  },
  {
    title: "Advanced / Backup & Export",
    slug: "advanced",
    comingSoon: true,
  },
]

// Animation variants for sidebar items
const itemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut", delay: i * 0.1 },
  }),
}

const Sidebar = () => {
  const [active, setActive] = useState<string>("getting-started-windows")
  const [openSections, setOpenSections] = useState<string[]>(["getting-started"])

  const toggleSection = (slug: string) => {
    setOpenSections((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    )
  }

  return (
    <aside className="w-72 hidden md:block bg-white/80 backdrop-blur-md border-r border-gray-100 h-screen sticky top-0 overflow-y-auto">
      <nav className="p-6 space-y-4">
        {docsSections.map((section, idx) => (
          <motion.div
            key={section.slug}
            custom={idx}
            initial="hidden"
            animate="visible"
            variants={itemVariants}
          >
            {/* Section Header */}
            <button
              onClick={() => toggleSection(section.slug)}
              className="flex items-center justify-between w-full text-left text-lg font-semibold text-gray-900 hover:text-gray-700 transition-colors duration-200"
              style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
            >
              <div className="flex items-center gap-2">
                <span>{section.title}</span>
                {section.comingSoon && (
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                    Coming Soon
                  </span>
                )}
              </div>
              {section.children && (
                openSections.includes(section.slug) ? (
                  <ChevronDown className="h-4 w-4 text-gray-600" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-gray-600" />
                )
              )}
            </button>

            {/* Sub-items if expanded */}
            {section.children && openSections.includes(section.slug) && (
              <ul className="mt-2 space-y-1 ml-4 border-l border-gray-200 pl-3">
                {section.children.map((sub) => (
                  <li key={sub.slug}>
                    <Link
                      href={`#${sub.slug}`}
                      onClick={() => setActive(sub.slug)}
                      className={`block px-2 py-1 rounded-lg text-sm transition-colors duration-200 ${
                        active === sub.slug
                          ? "bg-gray-100 font-semibold text-gray-900"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                      style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
                    >
                      {sub.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar