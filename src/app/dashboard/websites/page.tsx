"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Search } from "lucide-react"
import WebsiteCard from "@/components/WebsiteCard"
import websitesData from "@/data/website.json"

export default function WebsitesPage() {
  const [websites] = useState(websitesData)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredWebsites = websites.filter(
    (website) =>
      website.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      website.services.some((service) => service.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const handleEditWebsite = (website: any) => {
    console.log("Edit website:", website)
    // Implement edit functionality
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Websites</h1>
          <p className="text-gray-600">Manage payment integrations for your connected websites</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Website
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Websites</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{websites.length}</div>
            <p className="text-xs text-green-600">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active Integrations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{websites.filter((w) => w.status === "Active").length}</div>
            <p className="text-xs text-green-600">All systems operational</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {websites.reduce((sum, w) => sum + (w.totalRevenue || 0), 0).toLocaleString()} ETB
            </div>
            <p className="text-xs text-green-600">+12% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle>Connected Websites</CardTitle>
          <CardDescription>View and manage all websites integrated with your payment system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search websites or services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Website Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWebsites.map((website) => (
              <WebsiteCard key={website.id} website={website} onEdit={handleEditWebsite} />
            ))}
          </div>

          {filteredWebsites.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No websites found matching your search.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
