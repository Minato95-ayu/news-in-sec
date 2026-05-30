"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Globe, BookOpen, Settings, Play, Zap } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/shared/theme-toggle"
import { Logo } from "@/components/shared/logo"
import { LiveNicheExamples } from "@/components/shared/live-niche-examples"

export default function Home() {
  return (
    <div className="relative min-h-screen w-full bg-background text-foreground overflow-hidden font-sans">
      {/* 3D BACKGROUND VIDEO */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover opacity-30 mix-blend-screen"
        >
          {/* Abstract 3D video */}
          <source src="https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-background/80 backdrop-blur-[2px]"></div>
      </div>
      
      {/* HEADER */}
      <header className="relative z-10 flex h-20 items-center justify-between px-6 lg:px-12 border-b border-border/50 bg-background/50 backdrop-blur-md">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Logo />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-4"
        >
          <div className="hidden md:flex border rounded p-1">
            <ThemeToggle />
          </div>
          <Link href="/create">
            <Button variant="outline" className="rounded-md transition-all duration-300">
              Sign In
            </Button>
          </Link>
          <Link href="/create">
            <Button className="rounded-md transition-all duration-300">
              Get Started
            </Button>
          </Link>
        </motion.div>
      </header>

      {/* HERO SECTION */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] px-4 text-center">
        
        {/* Animated Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 inline-flex items-center rounded-md border bg-muted px-4 py-1.5 text-sm font-medium text-muted-foreground"
        >
          Professional Auto-Blogging System
        </motion.div>

        {/* Typography Heading */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-5xl text-5xl font-black tracking-tight sm:text-6xl md:text-7xl lg:text-8xl text-foreground"
        >
          Viral News. <br />
          <span className="text-primary">
            Zero Effort.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl leading-relaxed"
        >
          Enter your niche. Connect your domain. Our system automatically discovers, writes, generates images, and publishes breaking news to your site 24/7.
        </motion.p>

        {/* Call to Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6, type: "spring" }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
        >
          <Link href="/auto-pilot">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button size="lg" className="rounded-md h-14 px-8 text-lg font-semibold">
                Start Auto-Pilot <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </Link>
          
          <Link href="/create">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button variant="outline" size="lg" className="rounded-md h-14 px-8 text-lg font-medium">
                <Play className="mr-2 h-5 w-5" /> Watch Demo
              </Button>
            </motion.div>
          </Link>
        </motion.div>

        {/* Features Cards */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full px-4">
          {[
            { icon: Globe, title: "Custom Domains", desc: "Host your own viral news site directly on our ultra-fast Edge network." },
            { icon: Zap, title: "WordPress API", desc: "Automatically sync and publish SEO-optimized articles to your existing WP blog." },
            { icon: Settings, title: "Set & Forget", desc: "Set your niche and frequency. System runs 24/7 generating news, images & hooks." },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 + (i * 0.2) }}
              className="bg-card border p-8 rounded-lg text-left"
            >
              <feature.icon className="h-10 w-10 text-primary mb-6" />
              <h3 className="text-xl font-bold mb-3 text-card-foreground">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* LIVE NICHE EXAMPLES SECTION */}
        <LiveNicheExamples />
      </main>

      {/* FOOTER */}
      <footer className="relative z-10 mt-32 border-t bg-muted/20 py-8 text-center text-muted-foreground text-sm">
        <p>© 2026 News In Sec. Professional Edition.</p>
      </footer>
    </div>
  )
}
