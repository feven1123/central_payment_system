"use client"

import { useState } from "react"
import { redirect } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  CreditCard,
  Globe,
  Settings,
  TrendingUp,
  DollarSign,
  Activity,
  Plus,
  Eye,
  Link,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react"

// Mock data
const websites = [
  {
    id: 1,
    name: "TechStore Pro",
    domain: "techstore.com",
    status: "active",
    totalRevenue: 45230,
    monthlyTransactions: 1250,
    services: [
      { id: 1, name: "Premium Subscription", price: 29.99, type: "recurring" },
      { id: 2, name: "One-time Purchase", price: 99.99, type: "one-time" },
      { id: 3, name: "Digital Downloads", price: 19.99, type: "digital" },
    ],
  },
  {
    id: 2,
    name: "Fashion Hub",
    domain: "fashionhub.com",
    status: "active",
    totalRevenue: 78450,
    monthlyTransactions: 2100,
    services: [
      { id: 4, name: "Clothing Items", price: 49.99, type: "physical" },
      { id: 5, name: "Style Consultation", price: 150.0, type: "service" },
      { id: 6, name: "VIP Membership", price: 199.99, type: "recurring" },
    ],
  },
  {
    id: 3,
    name: "Learning Platform",
    domain: "learnfast.com",
    status: "pending",
    totalRevenue: 23100,
    monthlyTransactions: 450,
    services: [
      { id: 7, name: "Course Access", price: 79.99, type: "digital" },
      { id: 8, name: "1-on-1 Tutoring", price: 50.0, type: "service" },
      { id: 9, name: "Certification Program", price: 299.99, type: "one-time" },
    ],
  },
]

const transactions = [
  {
    id: "TXN001",
    website: "TechStore Pro",
    service: "Premium Subscription",
    amount: 29.99,
    status: "completed",
    date: "2024-01-15",
    customer: "john@example.com",
  },
  {
    id: "TXN002",
    website: "Fashion Hub",
    service: "Clothing Items",
    amount: 149.97,
    status: "completed",
    date: "2024-01-15",
    customer: "sarah@example.com",
  },
  {
    id: "TXN003",
    website: "Learning Platform",
    service: "Course Access",
    amount: 79.99,
    status: "pending",
    date: "2024-01-14",
    customer: "mike@example.com",
  },
  {
    id: "TXN004",
    website: "TechStore Pro",
    service: "Digital Downloads",
    amount: 19.99,
    status: "failed",
    date: "2024-01-14",
    customer: "anna@example.com",
  },
  {
    id: "TXN005",
    website: "Fashion Hub",
    service: "VIP Membership",
    amount: 199.99,
    status: "completed",
    date: "2024-01-13",
    customer: "david@example.com",
  },
]

export default function HomePage() {
  redirect("/login")
}

function CentralPaymentSystem() {
  const [selectedWebsite, setSelectedWebsite] = useState(null)
  const [activeTab, setActiveTab] = useState("websites")

  const getStatusBadge = (status) => {
    const variants = {
      active: "default",
      pending: "secondary",
      inactive: "destructive",
    }
    return <Badge variant={variants[status]}>{status}</Badge>
  }

  const getTransactionStatusBadge = (status) => {
    const config = {
      completed: { variant: "default", icon: CheckCircle, color: "text-green-600" },
      pending: { variant: "secondary", icon: Clock, color: "text-yellow-600" },
      failed: { variant: "destructive", icon: XCircle, color: "text-red-600" },
    }
    const { variant, icon: Icon, color } = config[status]
    return (
      <Badge variant={variant} className="flex items-center gap-1">
        <Icon className={`h-3 w-3 ${color}`} />
        {status}
      </Badge>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <CreditCard className="h-8 w-8 text-blue-600" />
              <h1 className="ml-3 text-2xl font-bold text-gray-900">PayCentral</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Website
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Websites</CardTitle>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{websites.length}</div>
              <p className="text-xs text-muted-foreground">+2 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${websites.reduce((sum, site) => sum + site.totalRevenue, 0).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Transactions</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {websites.reduce((sum, site) => sum + site.monthlyTransactions, 0).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">+8% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Integrations</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{websites.filter((site) => site.status === "active").length}</div>
              <p className="text-xs text-muted-foreground">All systems operational</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="websites">Websites</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Websites Tab */}
          <TabsContent value="websites" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Website List */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Connected Websites</CardTitle>
                    <CardDescription>Manage payment integrations for your connected websites</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {websites.map((website) => (
                        <div
                          key={website.id}
                          className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                          onClick={() => setSelectedWebsite(website)}
                        >
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                              <Globe className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <h3 className="font-medium">{website.name}</h3>
                              <p className="text-sm text-gray-500">{website.domain}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="text-right">
                              <p className="font-medium">${website.totalRevenue.toLocaleString()}</p>
                              <p className="text-sm text-gray-500">{website.monthlyTransactions} transactions</p>
                            </div>
                            {getStatusBadge(website.status)}
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Website Details */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>{selectedWebsite ? selectedWebsite.name : "Select a Website"}</CardTitle>
                    <CardDescription>
                      {selectedWebsite ? "Services and payment integration" : "Click on a website to view details"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {selectedWebsite ? (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Status</span>
                          {getStatusBadge(selectedWebsite.status)}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Domain</span>
                          <span className="text-sm">{selectedWebsite.domain}</span>
                        </div>

                        <div className="pt-4">
                          <h4 className="font-medium mb-3">Available Services</h4>
                          <div className="space-y-2">
                            {selectedWebsite.services.map((service) => (
                              <div
                                key={service.id}
                                className="flex items-center justify-between p-2 bg-gray-50 rounded"
                              >
                                <div>
                                  <p className="text-sm font-medium">{service.name}</p>
                                  <p className="text-xs text-gray-500">{service.type}</p>
                                </div>
                                <span className="text-sm font-medium">${service.price}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="pt-4 space-y-2">
                          <Button className="w-full">
                            <Link className="h-4 w-4 mr-2" />
                            Connect Payment Gateway
                          </Button>
                          <Button variant="outline" className="w-full bg-transparent">
                            <Settings className="h-4 w-4 mr-2" />
                            Configure Settings
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Globe className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">
                          Select a website to view its services and payment integration options.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Transactions Tab */}
          <TabsContent value="transactions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Records</CardTitle>
                <CardDescription>View and manage all transactions across your connected websites</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-6">
                  <Input placeholder="Search transactions..." className="max-w-sm" />
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by website" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Websites</SelectItem>
                      {websites.map((website) => (
                        <SelectItem key={website.id} value={website.name}>
                          {website.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Transaction ID</TableHead>
                      <TableHead>Website</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell className="font-medium">{transaction.id}</TableCell>
                        <TableCell>{transaction.website}</TableCell>
                        <TableCell>{transaction.service}</TableCell>
                        <TableCell>{transaction.customer}</TableCell>
                        <TableCell>${transaction.amount}</TableCell>
                        <TableCell>{getTransactionStatusBadge(transaction.status)}</TableCell>
                        <TableCell>{transaction.date}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue by Website</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {websites.map((website) => (
                      <div key={website.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          <span className="text-sm font-medium">{website.name}</span>
                        </div>
                        <span className="text-sm font-medium">${website.totalRevenue.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Transaction Volume</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {websites.map((website) => (
                      <div key={website.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-sm font-medium">{website.name}</span>
                        </div>
                        <span className="text-sm font-medium">{website.monthlyTransactions}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
