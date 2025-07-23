"use client"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { LogOut, Menu, X } from "lucide-react"
import { logout } from "@/lib/auth"

interface NavbarProps {
  onMenuToggle?: () => void
  isMobileMenuOpen?: boolean
}

export default function Navbar({ onMenuToggle, isMobileMenuOpen }: NavbarProps) {
  const handleLogout = () => {
    logout()
    window.location.href = "/login"
  }

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo and mobile menu button */}
          <div className="flex items-center">
            <button
              onClick={onMenuToggle}
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <div className="flex items-center ml-2 md:ml-0">
              <div className="w-8 h-8 bg-pink-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">Che</span>
              </div>
              <h1 className="ml-3 text-xl font-bold text-gray-900">Chechepaymentsystem</h1>
            </div>
          </div>

          {/* Right side - User info and logout */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-blue-100 text-blue-600">AD</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium text-gray-700">Admin</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="flex items-center space-x-2 bg-transparent"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
