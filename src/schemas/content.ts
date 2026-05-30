import { z } from 'zod';

// Schema for Gemini API structured output
export const ContentOutputSchema = z.object({
  headline: z.string().max(200).describe('Viral headline, 60-80 chars'),
  hookLine: z.string().max(300).describe('Opening hook for first 3 seconds'),
  script: z.string().describe('Full script or post body'),
  callToAction: z.string().max(250).describe('Clear call-to-action text'),
  tags: z.array(z.string()).min(1).max(15).describe('Relevant hashtags without # symbol'),
  seoTitle: z.string().max(150).describe('SEO-optimized title tag'),
  seoDescription: z.string().max(160).describe('Meta description for SEO'),
  imageSearchKeyword: z.string().describe('1-2 word broad Wikipedia entity name related to the news'),
  imagePrompt: z.string().max(500).describe(
    'Detailed prompt for image generation: style, composition, colors, mood'
  ),
  estimatedReadTime: z.string().describe('e.g., 45 seconds or 2 min read'),
});

export type ContentOutput = z.infer<typeof ContentOutputSchema>;

// Schema for user input
export const ContentInputSchema = z.object({
  topic: z.string().min(3, 'Topic must be at least 3 characters').max(500, 'Topic too long'),
  platform: z.enum(['instagram', 'linkedin', 'youtube', 'twitter']),
  tone: z.enum(['professional', 'casual', 'humorous', 'inspirational', 'suspenseful']),
  language: z.enum(['en', 'hi', 'hinglish']),
  contentLength: z.enum(['short', 'medium', 'long', 'very_long']),
  templateId: z.string().optional(),
});

export type ContentInput = z.infer<typeof ContentInputSchema>;

// Schema for content generation status
export const ContentStatusSchema = z.enum([
  'generating',
  'completed',
  'failed',
  'partial',
  'archived',
]);

export type ContentStatus = z.infer<typeof ContentStatusSchema>;
