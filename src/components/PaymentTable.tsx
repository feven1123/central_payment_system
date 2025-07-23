"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, CheckCircle, Clock, XCircle } from "lucide-react"

interface Payment {
  id: string
  website: string
  service: string
  amount: string
  status: string
  timestamp: string
  customer?: string
}

interface PaymentTableProps {
  payments: Payment[]
  onViewDetails?: (payment: Payment) => void
}

export default function PaymentTable({ payments, onViewDetails }: PaymentTableProps) {
  const getStatusBadge = (status: string) => {
    const config = {
      Success: { variant: "default" as const, icon: CheckCircle, color: "text-green-600" },
      Pending: { variant: "secondary" as const, icon: Clock, color: "text-yellow-600" },
      Failed: { variant: "destructive" as const, icon: XCircle, color: "text-red-600" },
    }

    const { variant, icon: Icon, color } = config[status as keyof typeof config] || config.Pending

    return (
      <Badge variant={variant} className="flex items-center gap-1 w-fit">
        <Icon className={`h-3 w-3 ${color}`} />
        {status}
      </Badge>
    )
  }

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Transaction ID</TableHead>
            <TableHead>Website</TableHead>
            <TableHead>Service</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Timestamp</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                No payments found
              </TableCell>
            </TableRow>
          ) : (
            payments.map((payment) => (
              <TableRow key={payment.id} className="hover:bg-gray-50">
                <TableCell className="font-medium">{payment.id}</TableCell>
                <TableCell>{payment.website}</TableCell>
                <TableCell>{payment.service}</TableCell>
                <TableCell className="font-medium">{payment.amount}</TableCell>
                <TableCell>{getStatusBadge(payment.status)}</TableCell>
                <TableCell className="text-sm text-gray-600">{formatDate(payment.timestamp)}</TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm" onClick={() => onViewDetails?.(payment)}>
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
