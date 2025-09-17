"use client"

import React, { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail, ArrowRight, Check } from 'lucide-react'

// Define types for the context
interface WaitlistModalContextType {
  openModal: () => void
  closeModal: () => void
}

// Create a context for the waitlist modal
const WaitlistModalContext = createContext<WaitlistModalContextType | undefined>(undefined)

// Props for WaitlistModalProvider
interface WaitlistModalProviderProps {
  children: ReactNode
}

export function WaitlistModalProvider({ children }: WaitlistModalProviderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null)

  const openModal = () => setIsOpen(true)
  const closeModal = () => {
    setIsOpen(false)
    // Reset form state after a delay to allow animations to complete
    setTimeout(() => {
      setEmail('')
      setSubmitStatus(null)
    }, 300)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Replace with your actual Brevo API key and list ID
      const BREVO_API_KEY = process.env.NEXT_PUBLIC_BREVO_API_KEY
      const BREVO_LIST_ID = parseInt(process.env.NEXT_PUBLIC_BREVO_LIST_ID || '8')
      
      // Validate environment variables
      if (!BREVO_API_KEY || !BREVO_LIST_ID) {
        throw new Error('Brevo configuration is missing')
      }
      
      const response = await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'api-key': BREVO_API_KEY,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          listIds: [BREVO_LIST_ID],
          updateEnabled: true,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to submit email')
      }

      setSubmitStatus('success')
    } catch (error) {
      console.error('Error submitting to Brevo:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <WaitlistModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <WaitlistModal 
        isOpen={isOpen} 
        onClose={closeModal}
        email={email}
        setEmail={setEmail}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        submitStatus={submitStatus}
      />
    </WaitlistModalContext.Provider>
  )
}

// Props for WaitlistModal component
interface WaitlistModalProps {
  isOpen: boolean
  onClose: () => void
  email: string
  setEmail: (email: string) => void
  onSubmit: (e: React.FormEvent) => void
  isSubmitting: boolean
  submitStatus: 'success' | 'error' | null
}

function WaitlistModal({ isOpen, onClose, email, setEmail, onSubmit, isSubmitting, submitStatus }: WaitlistModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Close modal when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      // Focus on input when modal opens
      if (inputRef.current) {
        setTimeout(() => inputRef.current?.focus(), 100)
      }
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
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
                {submitStatus === 'success' ? 'You\'re on the list!' : 'Join the Waitlist'}
              </h2>
              <button
                onClick={onClose}
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
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Thank you for joining!</h3>
                  <p className="text-gray-600">
                    We'll notify you when the Basic version is available.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-6 px-6 py-2 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
                  >
                    Continue Exploring
                  </button>
                </div>
              ) : (
                <>
                  <p className="text-gray-600 mb-6">
                    Be the first to know when our Basic version launches with advanced features.
                  </p>
                  <form onSubmit={onSubmit} className="space-y-4">
                    <div className="relative">
                      <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        ref={inputRef}
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    {submitStatus === 'error' && (
                      <p className="text-red-500 text-sm">Something went wrong. Please try again.</p>
                    )}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-black text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-gray-800 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Submitting...
                        </>
                      ) : (
                        <>
                          Join Waitlist
                          <ArrowRight size={16} />
                        </>
                      )}
                    </button>
                  </form>
                  <p className="text-xs text-gray-500 mt-4 text-center">
                    We respect your privacy. Unsubscribe at any time.
                  </p>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Custom hook to use the waitlist modal context
export function useWaitlistModal() {
  const context = useContext(WaitlistModalContext)
  if (!context) {
    throw new Error('useWaitlistModal must be used within a WaitlistModalProvider')
  }
  return context
}
