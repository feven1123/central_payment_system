"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Globe, CreditCard, Settings, X } from "lucide-react"

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

const navigation = [
  {
    name: "Websites",
    href: "/dashboard/websites",
    icon: Globe,
  },
  {
    name: "Payments",
    href: "/dashboard/payments",
    icon: CreditCard,
  },
  {
    name: "Config",
    href: "/dashboard/config",
    icon: Settings,
  },
]

export default function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && <div className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 md:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:inset-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Mobile close button */}
          <div className="flex items-center justify-between p-4 md:hidden">
            <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
            <button onClick={onClose} className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive
                      ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
                  )}
                  onClick={onClose}
                >
                  <item.icon className={cn("mr-3 h-5 w-5", isActive ? "text-blue-700" : "text-gray-400")} />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <p className="text-xs text-gray-500">CentralPay Dashboard v1.0</p>
          </div>
        </div>
      </div>
    </>
  )
}
