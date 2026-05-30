"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { TrendingUp, ShieldAlert, Ghost, Gamepad2, Heart, Smartphone, Briefcase, Zap, Loader2 } from "lucide-react"
import { getRealLiveNews } from "@/features/content-creation/actions/live-news"

const nicheStyles: Record<string, any> = {
  "Business": { icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  "Crime": { icon: ShieldAlert, color: "text-red-500", bg: "bg-red-500/10" },
  "Horror": { icon: Ghost, color: "text-purple-500", bg: "bg-purple-500/10" },
  "Gaming": { icon: Gamepad2, color: "text-blue-500", bg: "bg-blue-500/10" },
  "Relationships / Lifestyle": { icon: Heart, color: "text-pink-500", bg: "bg-pink-500/10" },
  "Social Media": { icon: Smartphone, color: "text-sky-500", bg: "bg-sky-500/10" },
  "Jobs / Career": { icon: Briefcase, color: "text-amber-500", bg: "bg-amber-500/10" }
};

const defaultStyle = { icon: Zap, color: "text-primary", bg: "bg-primary/10" };

export function LiveNicheExamples() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [liveNews, setLiveNews] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchNews() {
      const res = await getRealLiveNews();
      if (res.success && res.data) {
        setLiveNews(res.data);
      }
      setIsLoading(false);
    }
    fetchNews();
  }, [])

  useEffect(() => {
    if (liveNews.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % liveNews.length)
    }, 4000) // 4 seconds

    return () => clearInterval(interval)
  }, [liveNews.length])

  if (isLoading) {
    return (
      <div className="mt-32 w-full max-w-4xl mx-auto px-4 flex flex-col items-center justify-center min-h-[300px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground animate-pulse">Fetching Real Live News via Google Search...</p>
      </div>
    )
  }

  if (liveNews.length === 0) return null;

  const currentNiche = liveNews[currentIndex]
  const style = nicheStyles[currentNiche.name] || defaultStyle;
  const Icon = style.icon;

  return (
    <div className="mt-32 w-full max-w-4xl mx-auto px-4 flex flex-col items-center">
      <div className="inline-flex items-center rounded-full border bg-muted/50 px-3 py-1 text-sm font-medium text-muted-foreground mb-6">
        <Zap className="mr-2 h-4 w-4 text-yellow-500" />
        Live Real News Grounding
      </div>
      
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-12">
        Any Niche. Any Language. <br />
        <span className="text-muted-foreground">Generated Automatically.</span>
      </h2>

      <div className="relative w-full h-[450px] md:h-[280px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute w-full max-w-3xl bg-card border shadow-2xl rounded-2xl overflow-hidden flex flex-col md:flex-row"
          >
            {/* Image Section */}
            {currentNiche.imageUrl && (
              <div className="md:w-1/3 h-48 md:h-auto relative overflow-hidden">
                <img 
                  src={currentNiche.imageUrl} 
                  alt={currentNiche.imageSearchKeyword}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent md:hidden" />
              </div>
            )}

            {/* Content Section */}
            <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${style.bg} ${style.color} font-semibold text-sm`}>
                    <Icon className="h-4 w-4" />
                    {currentNiche.name.split('/')[0].trim()}
                  </div>
                  <span className="text-xs text-muted-foreground font-medium bg-secondary px-2 py-1 rounded-md">
                    {currentNiche.time}
                  </span>
                </div>
                
                <h3 className="text-xl md:text-2xl font-bold leading-snug line-clamp-3">
                  {currentNiche.headline}
                </h3>
              </div>
              
              <div className="flex items-center gap-4 mt-6">
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 4, ease: "linear" }}
                    className={`h-full ${style.color.replace('text-', 'bg-')}`}
                  />
                </div>
                <span className="text-xs font-mono text-muted-foreground whitespace-nowrap">
                  Fetching...
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
