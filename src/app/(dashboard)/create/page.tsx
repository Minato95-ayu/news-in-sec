"use client"

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ContentInputSchema, type ContentInput } from "@/schemas/content"
import { generateContentAction } from "@/features/content-creation/actions/generate"
import { toast } from "sonner"
import { Loader2, Wand2, Copy, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

export default function CreatePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [copied, setCopied] = useState(false)

  const form = useForm<ContentInput>({
    resolver: zodResolver(ContentInputSchema),
    defaultValues: {
      topic: "",
      platform: "instagram",
      tone: "professional",
      language: "en",
      contentLength: "medium",
    },
  })

  async function onSubmit(values: ContentInput) {
    setIsLoading(true)
    setResult(null)
    
    try {
      const response = await generateContentAction(values)
      if (response.success && response.data) {
        setResult(response.data)
        toast.success("AI Content Generated Successfully! ✨")
      } else {
        toast.error(response.error || "Failed to generate content")
      }
    } catch (error: any) {
      toast.error(error.message || "An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = () => {
    if (!result) return
    const text = `🔥 ${result.headline}\n\n${result.hookLine}\n\n${result.script}\n\n👉 ${result.callToAction}\n\n${result.tags.map((t: string) => `#${t}`).join(' ')}`
    navigator.clipboard.writeText(text)
    setCopied(true)
    toast.success("Copied to clipboard!")
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="container mx-auto p-4 lg:p-8 max-w-7xl animate-fade-in-up">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Create New Content</h1>
        <p className="text-muted-foreground">
          Enter a topic and let our AI generate a viral script, SEO tags, and image prompts.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Input Form */}
        <div className="lg:col-span-5 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Content Settings</CardTitle>
              <CardDescription>Configure the AI to match your brand's voice.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="topic"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>What is the content about?</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="e.g. Explain how AI works in a few words" 
                            className="resize-none h-24"
                            disabled={isLoading}
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="platform"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Platform</FormLabel>
                          <Select disabled={isLoading} onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select platform" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="instagram">Instagram Reel</SelectItem>
                              <SelectItem value="linkedin">LinkedIn Post</SelectItem>
                              <SelectItem value="twitter">Twitter Thread</SelectItem>
                              <SelectItem value="youtube">YouTube Short</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="tone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tone</FormLabel>
                          <Select disabled={isLoading} onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select tone" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="professional">Professional</SelectItem>
                              <SelectItem value="casual">Casual & Friendly</SelectItem>
                              <SelectItem value="humorous">Humorous</SelectItem>
                              <SelectItem value="inspirational">Inspirational</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="language"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Language</FormLabel>
                          <Select disabled={isLoading} onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select language" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="en">English</SelectItem>
                              <SelectItem value="hi">Hindi</SelectItem>
                              <SelectItem value="hinglish">Hinglish</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="contentLength"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Content Length</FormLabel>
                          <Select disabled={isLoading} onValueChange={field.onChange} value={field.value || 'medium'}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select length" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="short">Short (Reels/Shorts)</SelectItem>
                              <SelectItem value="medium">Medium (LinkedIn)</SelectItem>
                              <SelectItem value="long">Long (Blog)</SelectItem>
                              <SelectItem value="very_long">Very Long (Investigation)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full" 
                    size="lg" 
                    disabled={isLoading}
                  >
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Wand2 className="h-4 w-4 mr-2" />}
                    {isLoading ? "Generating Content..." : "Generate Content"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-7">
          {isLoading && (
            <Card className="h-full min-h-[500px] flex flex-col items-center justify-center animate-pulse">
              <Loader2 className="w-8 h-8 text-muted-foreground animate-spin mb-4" />
              <h3 className="text-xl font-medium text-foreground mb-2">Generating Content...</h3>
              <p className="text-muted-foreground text-center max-w-sm">
                Analyzing your topic and crafting the perfect hook. Please wait.
              </p>
            </Card>
          )}

          {!isLoading && !result && (
            <Card className="h-full min-h-[500px] flex flex-col items-center justify-center border-dashed border-2 bg-transparent">
              <Wand2 className="w-12 h-12 text-muted-foreground/30 mb-4" />
              <h3 className="text-lg font-medium text-muted-foreground">No content yet</h3>
              <p className="text-sm text-muted-foreground/70 text-center max-w-sm mt-2">
                Fill out the form on the left and hit generate to see the AI magic happen here.
              </p>
            </Card>
          )}

          {!isLoading && result && (
            <Card className="overflow-hidden relative">
              <CardHeader className="flex flex-row items-start justify-between pb-4">
                <div>
                  <Badge variant="secondary" className="mb-2">{result.estimatedReadTime || "Quick Read"}</Badge>
                  <CardTitle className="text-2xl leading-tight">{result.headline}</CardTitle>
                </div>
                <Button variant="outline" size="icon" onClick={copyToClipboard} className="shrink-0">
                  {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {result.imageURL && (
                  <div className="w-full rounded-lg overflow-hidden border border-border/50">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={result.imageURL} alt="Generated visual" className="w-full h-auto object-cover max-h-[400px]" />
                  </div>
                )}

                <div className="p-4 rounded-md bg-secondary/30 border border-border/50 border-l-4 border-l-primary">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary mb-1 block">The Hook</span>
                  <p className="font-medium">{result.hookLine}</p>
                </div>
                
                <div className="whitespace-pre-wrap text-foreground/90 leading-relaxed font-serif text-lg">
                  {result.script}
                </div>
                
                <div className="p-4 rounded-md bg-secondary/30 border border-border/50 border-l-4 border-l-purple-500">
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-500 mb-1 block">Call to Action</span>
                  <p className="font-bold">{result.callToAction}</p>
                </div>
              </CardContent>
              <CardFooter className="flex flex-wrap gap-2 pt-2 border-t border-border/30">
                {result.tags?.map((tag: string, i: number) => (
                  <Badge key={i} variant="outline" className="bg-background/50">#{tag}</Badge>
                ))}
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
