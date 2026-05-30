import { GoogleGenAI } from '@google/genai';
import { ContentOutputSchema, type ContentOutput } from '@/schemas/content';

let aiInstance: GoogleGenAI | null = null;

function getAI(): GoogleGenAI {
  if (!aiInstance) {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not set');
    }
    aiInstance = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return aiInstance;
}


export async function generateContentWithAI(
  topic: string,
  platform: string,
  tone: string,
  language: string,
  contentLength: 'short' | 'medium' | 'long' | 'very_long' = 'medium'
): Promise<ContentOutput> {
  const ai = getAI();

  // STEP 1: Research and Draft using Google Search
  const researchPrompt = `You are an elite News & Content Strategist.
Your goal is to research and write a highly engaging, factual, and suspenseful article based on REAL, current events.
USE GOOGLE SEARCH to fetch the latest context!

Topic: ${topic}
Platform: ${platform}
Tone: ${tone}
Language: ${language === 'hinglish' ? 'Hinglish (mix of Hindi and English)' : language === 'hi' ? 'Hindi' : 'English'}
Content Length: ${contentLength.toUpperCase().replace('_', ' ')}

Write a full, engaging article. Make sure to include a mind-blowing hook, suspenseful body, factual bullet points, and a polarizing call-to-action. Also suggest an image search keyword (1-2 word broad Wikipedia entity like "Apple" or "Elon Musk") and an ultra-realistic image prompt.`;

  const researchResponse = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: researchPrompt,
    config: {
      tools: [{ googleSearch: {} }],
      temperature: 0.7,
    },
  });

  const draftedText = researchResponse.text;
  if (!draftedText) throw new Error('Failed to draft content');

  // STEP 2: Format the draft into strict JSON
  const formatPrompt = `You are a strict data formatter. Convert the following news draft into the exact JSON schema requested.
DO NOT add any information that is not in the draft.

DRAFT:
${draftedText}`;

  const formatResponse = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: formatPrompt,
    config: {
      temperature: 0.1,
      responseMimeType: 'application/json',
      responseSchema: {
        type: 'OBJECT',
        properties: {
          headline: { type: 'STRING' },
          hookLine: { type: 'STRING' },
          script: { type: 'STRING' },
          callToAction: { type: 'STRING' },
          tags: { type: 'ARRAY', items: { type: 'STRING' } },
          seoTitle: { type: 'STRING' },
          seoDescription: { type: 'STRING' },
          imageSearchKeyword: { type: 'STRING' },
          imagePrompt: { type: 'STRING' },
          estimatedReadTime: { type: 'STRING' }
        },
        required: ["headline", "hookLine", "script", "callToAction", "tags", "seoTitle", "seoDescription", "imageSearchKeyword", "imagePrompt", "estimatedReadTime"]
      }
    },
  });

  const text = formatResponse.text;
  if (!text) throw new Error('Empty formatting response from Gemini API');

  const parsed = ContentOutputSchema.safeParse(JSON.parse(text));
  if (!parsed.success) {
    console.error('Gemini output validation failed:', parsed.error.flatten());
    throw new Error('Invalid AI response structure');
  }

  return parsed.data;
}
