"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Download } from "lucide-react"
import PaymentTable from "@/components/PaymentTable"
import paymentsData from "@/data/payment.json"

export default function PaymentsPage() {
  const [payments] = useState(paymentsData)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [websiteFilter, setWebsiteFilter] = useState("all")

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.website.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (payment.customer && payment.customer.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesStatus = statusFilter === "all" || payment.status === statusFilter
    const matchesWebsite = websiteFilter === "all" || payment.website === websiteFilter

    return matchesSearch && matchesStatus && matchesWebsite
  })

  const handleViewDetails = (payment: any) => {
    console.log("View payment details:", payment)
    // Implement view details functionality
  }

  const uniqueWebsites = [...new Set(payments.map((p) => p.website))]

  // Calculate stats
  const totalAmount = payments.reduce((sum, payment) => {
    const amount = Number.parseFloat(payment.amount.replace(/[^\d.]/g, ""))
    return sum + amount
  }, 0)

  const successfulPayments = payments.filter((p) => p.status === "Success").length
  const pendingPayments = payments.filter((p) => p.status === "Pending").length
  const failedPayments = payments.filter((p) => p.status === "Failed").length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payment Records</h1>
          <p className="text-gray-600">View and manage all transactions across your connected websites</p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAmount.toLocaleString()} ETB</div>
            <p className="text-xs text-green-600">+8% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Successful</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{successfulPayments}</div>
            <p className="text-xs text-gray-600">
              {((successfulPayments / payments.length) * 100).toFixed(1)}% success rate
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{pendingPayments}</div>
            <p className="text-xs text-gray-600">Awaiting processing</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Failed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{failedPayments}</div>
            <p className="text-xs text-gray-600">Requires attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>Filter and search through all payment transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search transactions, websites, or customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Success">Success</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Failed">Failed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={websiteFilter} onValueChange={setWebsiteFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by website" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Websites</SelectItem>
                {uniqueWebsites.map((website) => (
                  <SelectItem key={website} value={website}>
                    {website}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Payment Table */}
          <PaymentTable payments={filteredPayments} onViewDetails={handleViewDetails} />

          {/* Pagination placeholder */}
          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-gray-600">
              Showing {filteredPayments.length} of {payments.length} transactions
            </p>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" disabled>
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
