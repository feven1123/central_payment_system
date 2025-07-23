"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Globe, Edit, TrendingUp } from "lucide-react"

interface Website {
  id: string
  name: string
  services: string[]
  status: string
  domain?: string
  totalRevenue?: number
  monthlyTransactions?: number
}

interface WebsiteCardProps {
  website: Website
  onEdit?: (website: Website) => void
}

export default function WebsiteCard({ website, onEdit }: WebsiteCardProps) {
  const getStatusBadge = (status: string) => {
    const variants = {
      Active: "default",
      Inactive: "secondary",
      Pending: "outline",
    }
    return <Badge variant={variants[status as keyof typeof variants] || "outline"}>{status}</Badge>
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Globe className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-lg">{website.name}</CardTitle>
              {website.domain && <p className="text-sm text-gray-500">{website.domain}</p>}
            </div>
          </div>
          {getStatusBadge(website.status)}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Services */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Services</h4>
          <div className="flex flex-wrap gap-1">
            {website.services.map((service, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {service}
              </Badge>
            ))}
          </div>
        </div>

        {/* Stats */}
        {website.totalRevenue && website.monthlyTransactions && (
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div>
              <p className="text-xs text-gray-500">Revenue</p>
              <p className="text-sm font-semibold">{website.totalRevenue.toLocaleString()} ETB</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Transactions</p>
              <p className="text-sm font-semibold">{website.monthlyTransactions}</p>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex space-x-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1 bg-transparent" onClick={() => onEdit?.(website)}>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button size="sm" className="flex-1">
            <TrendingUp className="h-4 w-4 mr-2" />
            View
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
