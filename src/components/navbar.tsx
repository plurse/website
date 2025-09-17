"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Menu, X, User, Mail, MessageSquare, Send, Check } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isFeedbackOpen, setIsFeedbackOpen] = useState(false)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [feedback, setFeedback] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null)

    const modalRef = useRef<HTMLDivElement>(null)
    const feedbackRef = useRef<HTMLTextAreaElement>(null)

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Features", href: "/features" },
        { name: "Download", href: "/download" },
        // { name: "Docs", href: "/docs" },
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
        { name: "Feedback", href: "#", isAction: true },
    ]

    const openFeedbackModal = () => setIsFeedbackOpen(true)
    const closeFeedbackModal = () => {
        setIsFeedbackOpen(false)
        // Reset form state after a delay to allow animations to complete
        setTimeout(() => {
            setUsername('')
            setEmail('')
            setFeedback('')
            setSubmitStatus(null)
        }, 300)
    }

    const handleFeedbackSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        
        try {
            // Replace with your actual Brevo API key
            const BREVO_API_KEY = process.env.NEXT_PUBLIC_BREVO_API_KEY
            const BREVO_LIST_ID = parseInt(process.env.NEXT_PUBLIC_BREVO_FEEDBACK_LIST_ID || '9')
            
            // Validate environment variables
            if (!BREVO_API_KEY) {
                throw new Error('Brevo configuration is missing')
            }
            
            // Create the request body for Brevo
            const requestBody: any = {
                updateEnabled: true,
                listIds: [BREVO_LIST_ID],
            }

            // Only add email if provided
            if (email) {
                requestBody.email = email
            }

            // Add attributes if any data is provided
            if (username || feedback) {
                requestBody.attributes = {}
                if (username) requestBody.attributes.USERNAME = username
                if (feedback) requestBody.attributes.FEEDBACK = feedback
            }

            // Create headers with proper typing
            const headers: HeadersInit = {
                'accept': 'application/json',
                'api-key': BREVO_API_KEY,
                'content-type': 'application/json',
            }
            
            const response = await fetch('https://api.brevo.com/v3/contacts', {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(requestBody),
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || 'Failed to submit feedback')
            }

            setSubmitStatus('success')
        } catch (error) {
            console.error('Error submitting feedback to Brevo:', error)
            setSubmitStatus('error')
        } finally {
            setIsSubmitting(false)
        }
    }

    // Close modal when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                closeFeedbackModal()
            }
        }
        
        if (isFeedbackOpen) {
            document.addEventListener('mousedown', handleClickOutside)
            // Focus on feedback field when modal opens
            if (feedbackRef.current) {
                setTimeout(() => feedbackRef.current?.focus(), 100)
            }
        }
        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isFeedbackOpen])

    // Animation variants for desktop links
    const linkVariants = {
        hover: { scale: 1.1, y: -2, transition: { duration: 0.2 } },
        tap: { scale: 0.95 }
    }

    // Animation variants for mobile menu
    const mobileMenuVariants = {
        closed: { opacity: 0, height: 0, transition: { duration: 0.3 } },
        open: { opacity: 1, height: "auto", transition: { duration: 0.3 } }
    }

    return (
        <>
            <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md z-40 border-b border-gray-100/50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    {/* Logo / Brand */}
                    <Link href="/" className="text-2xl font-semibold text-black tracking-tight">
                        Plurse
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-10">
                        {navLinks.map((link) => (
                            <motion.div key={link.name} variants={linkVariants} whileHover="hover" whileTap="tap">
                                {link.isAction ? (
                                    <button
                                        onClick={openFeedbackModal}
                                        className="text-gray-900 text-sm font-medium tracking-tight hover:text-black/70 transition-all duration-300 cursor-pointer"
                                        style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif" }}
                                    >
                                        {link.name}
                                    </button>
                                ) : (
                                    <Link
                                        href={link.href}
                                        className="text-gray-900 text-sm font-medium tracking-tight hover:text-black/70 transition-all duration-300"
                                        style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif" }}
                                    >
                                        {link.name}
                                    </Link>
                                )}
                            </motion.div>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden text-gray-900 hover:text-black/70 focus:outline-none transition-all duration-300"
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu Dropdown */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-100/50"
                            initial="closed"
                            animate="open"
                            exit="closed"
                            variants={mobileMenuVariants}
                        >
                            <div className="flex flex-col space-y-6 px-4 py-6">
                                {navLinks.map((link) => (
                                    <motion.div
                                        key={link.name}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3, delay: navLinks.indexOf(link) * 0.1 }}
                                    >
                                        {link.isAction ? (
                                            <button
                                                onClick={() => {
                                                    openFeedbackModal()
                                                    setIsMenuOpen(false)
                                                }}
                                                className="text-gray-900 text-lg font-medium tracking-tight hover:text-black/70 transition-all duration-300 text-left w-full"
                                                style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif" }}
                                            >
                                                {link.name}
                                            </button>
                                        ) : (
                                            <Link
                                                href={link.href}
                                                className="text-gray-900 text-lg font-medium tracking-tight hover:text-black/70 transition-all duration-300"
                                                style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif" }}
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                {link.name}
                                            </Link>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            {/* Feedback Modal */}
            <AnimatePresence>
                {isFeedbackOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    >
                        <motion.div
                            ref={modalRef}
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
                            style={{ 
                                fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif" 
                            }}
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b border-gray-100">
                                <h2 className="text-xl font-semibold text-gray-900">
                                    {submitStatus === 'success' ? 'Thank You!' : 'Share Your Feedback'}
                                </h2>
                                <button
                                    onClick={closeFeedbackModal}
                                    className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                                    aria-label="Close"
                                >
                                    <X size={20} className="text-gray-500" />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                {submitStatus === 'success' ? (
                                    <div className="text-center py-4">
                                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Check size={24} className="text-green-600" />
                                        </div>
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">Feedback Submitted!</h3>
                                        <p className="text-gray-600">
                                            Thank you for helping us improve Plurse.
                                        </p>
                                        <button
                                            onClick={closeFeedbackModal}
                                            className="mt-6 px-6 py-2 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
                                        >
                                            Continue Exploring
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <p className="text-gray-600 mb-6">
                                            We'd love to hear your thoughts, suggestions, or concerns about Plurse.
                                        </p>
                                        <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                                            <div className="relative">
                                                <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                                <input
                                                    type="text"
                                                    value={username}
                                                    onChange={(e) => setUsername(e.target.value)}
                                                    placeholder="Your name (optional)"
                                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                                    disabled={isSubmitting}
                                                />
                                            </div>
                                            
                                            <div className="relative">
                                                <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                                <input
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    required
                                                    placeholder="Your email"
                                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                                    disabled={isSubmitting}
                                                />
                                            </div>
                                            
                                            <div className="relative">
                                                <MessageSquare size={18} className="absolute left-3 top-3 text-gray-400" />
                                                <textarea
                                                    ref={feedbackRef}
                                                    value={feedback}
                                                    onChange={(e) => setFeedback(e.target.value)}
                                                    placeholder="Your feedback..."
                                                    rows={4}
                                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                                                    required
                                                    disabled={isSubmitting}
                                                />
                                            </div>
                                            
                                            {submitStatus === 'error' && (
                                                <p className="text-red-500 text-sm">Something went wrong. Please try again.</p>
                                            )}
                                            
                                            <button
                                                type="submit"
                                                disabled={isSubmitting || !feedback}
                                                className="w-full bg-black text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-gray-800 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                        Sending...
                                                    </>
                                                ) : (
                                                    <>
                                                        Send Feedback
                                                        <Send size={16} />
                                                    </>
                                                )}
                                            </button>
                                        </form>
                                        <p className="text-xs text-gray-500 mt-4 text-center">
                                            Your feedback helps us create a better product for everyone.
                                        </p>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default Navbar