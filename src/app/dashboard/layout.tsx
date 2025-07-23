"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"
import { isAuthenticated } from "@/lib/auth"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login")
    } else {
      setIsLoading(false)
    }
  }, [router])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar onMenuToggle={toggleMobileMenu} isMobileMenuOpen={isMobileMenuOpen} />

      <div className="flex">
        {/* Sidebar */}
        <Sidebar isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />

        {/* Main Content */}
        <main className="flex-1 md:ml-64">
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  )
}
