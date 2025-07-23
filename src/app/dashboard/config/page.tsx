"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Save, RefreshCw, CheckCircle, AlertCircle } from "lucide-react"
import websitesData from "@/data/website.json"

const defaultConfigs = {
  qetero: {
    apiKey: "qetero_live_key_123456789",
    webhookUrl: "https://qetero.com/webhook/centralpay",
    currency: "ETB",
    paymentMethods: ["telebirr", "cbe_birr", "bank_transfer"],
    fees: {
      percentage: 2.5,
      fixed: 5,
    },
    settings: {
      autoCapture: true,
      sendReceipts: true,
      allowRefunds: true,
    },
  },
  soreti: {
    apiKey: "soreti_live_key_987654321",
    webhookUrl: "https://soreti.com/webhook/centralpay",
    currency: "ETB",
    paymentMethods: ["telebirr", "cbe_birr"],
    fees: {
      percentage: 3.0,
      fixed: 10,
    },
    settings: {
      autoCapture: false,
      sendReceipts: true,
      allowRefunds: false,
    },
  },
  techstore: {
    apiKey: "techstore_live_key_456789123",
    webhookUrl: "https://techstore.com/webhook/centralpay",
    currency: "ETB",
    paymentMethods: ["telebirr", "cbe_birr", "bank_transfer", "card"],
    fees: {
      percentage: 2.0,
      fixed: 3,
    },
    settings: {
      autoCapture: true,
      sendReceipts: true,
      allowRefunds: true,
    },
  },
}

export default function ConfigPage() {
  const [selectedWebsite, setSelectedWebsite] = useState("")
  const [config, setConfig] = useState("")
  const [isValid, setIsValid] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle")

  const handleWebsiteChange = (websiteId: string) => {
    setSelectedWebsite(websiteId)
    const websiteConfig = defaultConfigs[websiteId as keyof typeof defaultConfigs]
    if (websiteConfig) {
      setConfig(JSON.stringify(websiteConfig, null, 2))
      setIsValid(true)
      setSaveStatus("idle")
    }
  }

  const handleConfigChange = (value: string) => {
    setConfig(value)
    setSaveStatus("idle")

    // Validate JSON
    try {
      JSON.parse(value)
      setIsValid(true)
    } catch (error) {
      setIsValid(false)
    }
  }

  const handleSave = async () => {
    if (!isValid || !selectedWebsite) return

    setIsSaving(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSaveStatus("success")

      // Reset success status after 3 seconds
      setTimeout(() => setSaveStatus("idle"), 3000)
    } catch (error) {
      setSaveStatus("error")
    } finally {
      setIsSaving(false)
    }
  }

  const formatConfig = () => {
    if (!config) return

    try {
      const parsed = JSON.parse(config)
      setConfig(JSON.stringify(parsed, null, 2))
      setIsValid(true)
    } catch (error) {
      // Config is already invalid, don't change it
    }
  }

  const selectedWebsiteData = websitesData.find((w) => w.id === selectedWebsite)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Configuration</h1>
        <p className="text-gray-600">Manage payment configurations for your connected websites</p>
      </div>

      {/* Website Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Website</CardTitle>
          <CardDescription>Choose a website to view and edit its payment configuration</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Select value={selectedWebsite} onValueChange={handleWebsiteChange}>
              <SelectTrigger className="w-full max-w-sm">
                <SelectValue placeholder="Choose a website..." />
              </SelectTrigger>
              <SelectContent>
                {websitesData.map((website) => (
                  <SelectItem key={website.id} value={website.id}>
                    <div className="flex items-center space-x-2">
                      <span>{website.name}</span>
                      <Badge variant={website.status === "Active" ? "default" : "secondary"}>{website.status}</Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {selectedWebsiteData && <div className="text-sm text-gray-600">Domain: {selectedWebsiteData.domain}</div>}
          </div>
        </CardContent>
      </Card>

      {/* Configuration Editor */}
      {selectedWebsite && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Configuration for {selectedWebsiteData?.name}</CardTitle>
                <CardDescription>Edit the JSON configuration for payment processing</CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={formatConfig} disabled={!config}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Format
                </Button>
                <Button onClick={handleSave} disabled={!isValid || !config || isSaving} className="min-w-[100px]">
                  {isSaving ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Config
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Status Alerts */}
            {!isValid && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>Invalid JSON format. Please check your configuration syntax.</AlertDescription>
              </Alert>
            )}

            {saveStatus === "success" && (
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>Configuration saved successfully!</AlertDescription>
              </Alert>
            )}

            {saveStatus === "error" && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>Failed to save configuration. Please try again.</AlertDescription>
              </Alert>
            )}

            {/* Configuration Textarea */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">JSON Configuration</label>
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <span>Status:</span>
                  {isValid ? (
                    <Badge variant="default" className="text-xs">
                      Valid
                    </Badge>
                  ) : (
                    <Badge variant="destructive" className="text-xs">
                      Invalid
                    </Badge>
                  )}
                </div>
              </div>
              <Textarea
                value={config}
                onChange={(e) => handleConfigChange(e.target.value)}
                placeholder="Enter JSON configuration..."
                className={`min-h-[400px] font-mono text-sm ${!isValid ? "border-red-300 focus:border-red-500" : ""}`}
              />
            </div>

            {/* Configuration Help */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-blue-900 mb-2">Configuration Guide</h4>
              <ul className="text-xs text-blue-800 space-y-1">
                <li>
                  • <strong>apiKey:</strong> Your website's API key for authentication
                </li>
                <li>
                  • <strong>webhookUrl:</strong> URL to receive payment notifications
                </li>
                <li>
                  • <strong>currency:</strong> Default currency (ETB for Ethiopian Birr)
                </li>
                <li>
                  • <strong>paymentMethods:</strong> Array of supported payment methods
                </li>
                <li>
                  • <strong>fees:</strong> Commission structure (percentage and fixed amounts)
                </li>
                <li>
                  • <strong>settings:</strong> Additional configuration options
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {!selectedWebsite && (
        <Card>
          <CardContent className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Website Selected</h3>
            <p className="text-gray-600">
              Please select a website from the dropdown above to view and edit its configuration.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
