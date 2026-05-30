"use client"

import React from "react"
import { motion } from "framer-motion"
import { LayoutTemplate, Sparkles, Video, Briefcase, MessageCircle, FileText } from "lucide-react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const templates = [
  {
    title: "Viral Tech Reel",
    description: "Perfect for Instagram or YouTube Shorts. Fast-paced script with a strong hook and visual cues for 60-second vertical videos.",
    icon: Video,
    category: "Video",
    color: "text-rose-500",
    bg: "bg-rose-500/10",
    platform: "Instagram/YouTube"
  },
  {
    title: "Thought Leadership",
    description: "A professional, story-driven post for LinkedIn that establishes authority. Includes an engaging opening and a strong call-to-action.",
    icon: Briefcase,
    category: "Professional",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    platform: "LinkedIn"
  },
  {
    title: "Breaking News Thread",
    description: "A punchy, multi-part thread optimized for X (Twitter). Delivers facts quickly and keeps readers hooked till the end.",
    icon: MessageCircle,
    category: "Micro-Blogging",
    color: "text-sky-400",
    bg: "bg-sky-400/10",
    platform: "Twitter/X"
  },
  {
    title: "Deep-Dive Article",
    description: "A comprehensive news summary with bullet points, pros/cons, and SEO tags. Best for blogging platforms and newsletters.",
    icon: FileText,
    category: "Long-form",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    platform: "Blog/Medium"
  }
]

export default function TemplatesPage() {
  return (
    <div className="container mx-auto p-4 lg:p-8 max-w-7xl animate-fade-in-up">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-2">
            <LayoutTemplate className="text-pink-600 h-8 w-8" />
            Prompt Templates
          </h1>
          <p className="text-muted-foreground">
            Choose a pre-optimized AI template to generate content that fits your exact platform and style.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {templates.map((template, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -5, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Card className="h-full flex flex-col relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <template.icon className="w-32 h-32" />
              </div>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-3 rounded-xl ${template.bg}`}>
                    <template.icon className={`w-6 h-6 ${template.color}`} />
                  </div>
                  <span className="text-sm font-medium px-2 py-1 bg-muted rounded-full">
                    {template.platform}
                  </span>
                </div>
                <CardTitle className="text-xl">{template.title}</CardTitle>
                <CardDescription className="text-sm">
                  {template.category}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-muted-foreground leading-relaxed">
                  {template.description}
                </p>
              </CardContent>
              <CardFooter className="pt-4 border-t border-border/10">
                <Button className="w-full gap-2 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                  <Sparkles className="w-4 h-4" /> Use Template
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
