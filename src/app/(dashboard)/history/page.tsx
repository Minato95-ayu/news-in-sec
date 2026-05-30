"use client"

import React from "react"
import { History, Search, FileText } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function HistoryPage() {
  return (
    <div className="container mx-auto p-4 lg:p-8 max-w-7xl animate-fade-in-up">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-2">
            <History className="h-8 w-8 text-primary" />
            Content History
          </h1>
          <p className="text-muted-foreground">
            View, search, and manage all your previously generated news content.
          </p>
        </div>
        <div className="flex items-center gap-2 max-w-sm w-full">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search history..."
              className="pl-8 bg-background"
            />
          </div>
          <Button variant="outline">Filter</Button>
        </div>
      </div>

      <Card className="min-h-[400px] flex flex-col items-center justify-center border-dashed text-center">
        <div className="bg-muted p-4 rounded-full mb-4">
          <FileText className="h-8 w-8 text-muted-foreground" />
        </div>
        <CardTitle className="text-xl mb-2">No Content Found</CardTitle>
        <CardDescription className="max-w-sm mb-6">
          You haven't generated any content yet or your history was cleared. Start creating to see your logs here.
        </CardDescription>
        <Button onClick={() => window.location.href = '/create'}>
          Create New Content
        </Button>
      </Card>
    </div>
  )
}
