"use client"

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { Settings, Globe, Link2, Plus, Zap, AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"

export default function AutoPilotPage() {
  const [isWPConnecting, setIsWPConnecting] = useState(false)
  const [isDomainAdding, setIsDomainAdding] = useState(false)

  const handleWordPressConnect = (e: React.FormEvent) => {
    e.preventDefault()
    setIsWPConnecting(true)
    // Mock connection
    setTimeout(() => {
      setIsWPConnecting(false)
      toast.success("Successfully connected to WordPress site! 🎉")
    }, 2000)
  }

  const handleDomainAdd = (e: React.FormEvent) => {
    e.preventDefault()
    setIsDomainAdding(true)
    // Mock adding domain
    setTimeout(() => {
      setIsDomainAdding(false)
      toast.success("Custom domain added successfully. Please update your CNAME records. 🌍")
    }, 2000)
  }

  return (
    <div className="container mx-auto p-4 lg:p-8 max-w-6xl animate-fade-in-up">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-2">
            <Zap className="text-yellow-500 h-8 w-8" />
            Auto-Pilot Setup
          </h1>
          <p className="text-muted-foreground">
            Connect your website. We'll generate and publish AI news automatically 24/7.
          </p>
        </div>
      </div>

      <Tabs defaultValue="wordpress" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
          <TabsTrigger value="wordpress" className="flex gap-2"><Globe className="h-4 w-4" /> WordPress</TabsTrigger>
          <TabsTrigger value="custom-domain" className="flex gap-2"><Link2 className="h-4 w-4" /> Custom Domain</TabsTrigger>
        </TabsList>

        {/* WORDPRESS TAB */}
        <TabsContent value="wordpress">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Connect WordPress Site</CardTitle>
                <CardDescription>Enter your WP credentials to allow auto-posting.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleWordPressConnect} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="wpUrl">Website URL</Label>
                    <Input id="wpUrl" placeholder="https://your-news-site.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="wpUser">Admin Username</Label>
                    <Input id="wpUser" placeholder="admin" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="wpPass">Application Password</Label>
                    <Input id="wpPass" type="password" placeholder="XXXX XXXX XXXX XXXX" required />
                    <p className="text-xs text-muted-foreground mt-1">
                      Generate this in your WP Admin &gt; Users &gt; Profile &gt; Application Passwords.
                    </p>
                  </div>
                  <Button type="submit" className="w-full" disabled={isWPConnecting}>
                    {isWPConnecting ? "Connecting..." : "Connect Site"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card className="border-dashed border-2 bg-transparent flex flex-col items-center justify-center p-6 text-center min-h-[300px]">
              <Settings className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="font-medium text-lg">No Active Campaigns</h3>
              <p className="text-muted-foreground text-sm mt-2 max-w-[250px]">
                Once you connect your WordPress site, you can create a campaign to start auto-blogging.
              </p>
            </Card>
          </div>
        </TabsContent>

        {/* CUSTOM DOMAIN TAB */}
        <TabsContent value="custom-domain">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Host on Custom Domain</CardTitle>
                <CardDescription>We host your news site for you. Just point your domain.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleDomainAdd} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="domain">Your Domain Name</Label>
                    <Input id="domain" placeholder="e.g. tech-news.com" required />
                  </div>
                  
                  <div className="rounded-md bg-yellow-500/10 p-4 border border-yellow-500/20 flex gap-3">
                    <AlertCircle className="h-5 w-5 text-yellow-500 shrink-0" />
                    <div className="text-sm text-yellow-500/90">
                      <p className="font-semibold mb-1">DNS Configuration Required</p>
                      <p>After adding, you will need to create a CNAME record pointing to <strong>cname.news-in-sec.com</strong> in your domain registrar (GoDaddy, Namecheap, etc).</p>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={isDomainAdding}>
                    {isDomainAdding ? "Registering Domain..." : "Add Domain"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card className="opacity-50 pointer-events-none">
              <CardHeader>
                <CardTitle>Global Site Settings</CardTitle>
                <CardDescription>Configure your hosted site's appearance.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Enable Dark Mode Default</Label>
                  <Switch disabled />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Show Author Names</Label>
                  <Switch checked disabled />
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-xs text-muted-foreground">Available after adding a domain.</p>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
