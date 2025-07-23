"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CreditCard } from "lucide-react"
import { login } from "@/lib/auth"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const result = login(email, password)
      if (result) {
        // Store auth token
        localStorage.setItem("auth-token", result.token)
        router.push("/dashboard/websites")
      } else {
        setError("Invalid email or password")
      }
    } catch (err) {
      setError("An error occurred during login")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-[#ec008c] rounded-xl flex items-center justify-center">
              <CreditCard className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="mt-6 text-2xl font-bold text-gray-900 text-center">CentralPay Admin</h2>
        
        </div>

        {/* Login Form */}
        <Card className="pt-0">
          <div className="h-3 rounded-t-md bg-[#ec008c] w-full"></div>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Enter your credentials to access the dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@centralpay.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full"
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full bg-[#ec008c] text-white text-base font-semibold rounded-lg py-3 mt-4 hover:bg-pink-700 flex items-center justify-center gap-2"
                disabled={isLoading}
              >
                Sign in
                <span className="ml-2">&rarr;</span>
              </Button>

            </form>

            {/* Demo credentials */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800 font-medium mb-2">Demo Credentials:</p>
              <p className="text-xs text-blue-700">Email: admin@centralpay.com</p>
              <p className="text-xs text-blue-700">Password: admin123</p>
            </div>

        
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
