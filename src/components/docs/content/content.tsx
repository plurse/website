"use client"

import { motion, Variants, useInView } from "framer-motion"
import { useRef } from "react"

// Animation variants for content sections
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

const Content = () => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <div ref={ref} className="flex-1 p-8 sm:p-12 lg:p-16 bg-white">
      {/* Getting Started */}
      <motion.section
        id="getting-started-windows"
        className="mb-12"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={sectionVariants}
      >
        <h2
          className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4"
          style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif" }}
        >
          Windows Installation
        </h2>
        <p
          className="text-gray-600 leading-relaxed"
          style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
        >
          Download the <code className="bg-gray-100 px-1 rounded text-gray-800">.exe</code>{" "}
          installer, double-click it, and follow the setup wizard. After installation, open InventorySys from the Start Menu.
        </p>
      </motion.section>

      <motion.section
        id="getting-started-macos"
        className="mb-12"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={sectionVariants}
      >
        <h2
          className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4"
          style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif" }}
        >
          MacOS Installation
        </h2>
        <p
          className="text-gray-600 leading-relaxed"
          style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
        >
          Download the <code className="bg-gray-100 px-1 rounded text-gray-800">.dmg</code>{" "}
          file, open it, then drag and drop InventorySys into your Applications folder.
        </p>
      </motion.section>

      <motion.section
        id="getting-started-linux"
        className="mb-12"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={sectionVariants}
      >
        <h2
          className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4"
          style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif" }}
        >
          Linux Installation
        </h2>
        <p
          className="text-gray-600 leading-relaxed"
          style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
        >
          Download the <code className="bg-gray-100 px-1 rounded text-gray-800">.AppImage</code>{" "}
          or <code className="bg-gray-100 px-1 rounded text-gray-800">.deb</code> package. For{" "}
          <code className="bg-gray-100 px-1 rounded text-gray-800">.AppImage</code>, make it executable via{" "}
          <code className="bg-gray-100 px-1 rounded text-gray-800">chmod +x filename</code> and run it. For{" "}
          <code className="bg-gray-100 px-1 rounded text-gray-800">.deb</code>, use{" "}
          <code className="bg-gray-100 px-1 rounded text-gray-800">sudo dpkg -i filename</code>.
        </p>
      </motion.section>

      {/* Free Features */}
      <motion.section
        id="user-management"
        className="mb-12"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={sectionVariants}
      >
        <h2
          className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4"
          style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif" }}
        >
          User Management
        </h2>
        <p
          className="text-gray-600 leading-relaxed"
          style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
        >
          Manage multiple user accounts with authentication and roles.
        </p>
      </motion.section>

      <motion.section
        id="product-inventory"
        className="mb-12"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={sectionVariants}
      >
        <h2
          className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4"
          style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif" }}
        >
          Product & Inventory
        </h2>
        <p
          className="text-gray-600 leading-relaxed"
          style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
        >
          Add, edit, delete products and categories. Track stock in real-time.
        </p>
      </motion.section>

      <motion.section
        id="customer-tracking"
        className="mb-12"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={sectionVariants}
      >
        <h2
          className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4"
          style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif" }}
        >
          Customer Tracking
        </h2>
        <p
          className="text-gray-600 leading-relaxed"
          style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
        >
          Maintain customer profiles and view their purchase history.
        </p>
      </motion.section>

      <motion.section
        id="sales-analytics"
        className="mb-12"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={sectionVariants}
      >
        <h2
          className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4"
          style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif" }}
        >
          Sales & Analytics
        </h2>
        <p
          className="text-gray-600 leading-relaxed"
          style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
        >
          Generate reports, view charts, and track business performance.
        </p>
      </motion.section>

      <motion.section
        id="activity-logs"
        className="mb-12"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={sectionVariants}
      >
        <h2
          className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4"
          style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif" }}
        >
          Activity & Audit Logs
        </h2>
        <p
          className="text-gray-600 leading-relaxed"
          style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
        >
          All user actions are logged to maintain accountability.
        </p>
      </motion.section>

      {/* Coming Soon */}
      <motion.section
        id="pro-features"
        className="mb-12"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={sectionVariants}
      >
        <h2
          className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4"
          style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif" }}
        >
          Pro Features <span className="text-sm text-gray-600">(Coming Soon)</span>
        </h2>
        <ul
          className="list-disc ml-6 text-gray-600 leading-relaxed"
          style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
        >
          <li>Online Syncing</li>
          <li>Multi-device Support</li>
          <li>Market Analysis</li>
          <li>AI Marketer</li>
        </ul>
      </motion.section>

      <motion.section
        id="faqs"
        className="mb-12"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={sectionVariants}
      >
        <h2
          className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4"
          style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif" }}
        >
          FAQs / Troubleshooting <span className="text-sm text-gray-600">(Coming Soon)</span>
        </h2>
        <p
          className="text-gray-600 leading-relaxed"
          style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
        >
          Common questions and fixes will appear here.
        </p>
      </motion.section>

      <motion.section
        id="advanced"
        className="mb-12"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={sectionVariants}
      >
        <h2
          className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4"
          style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif" }}
        >
          Advanced / Backup & Export <span className="text-sm text-gray-600">(Coming Soon)</span>
        </h2>
        <p
          className="text-gray-600 leading-relaxed"
          style={{ fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif" }}
        >
          Advanced settings and backup/export guides will be added here.
        </p>
      </motion.section>
    </div>
  )
}

export default Content