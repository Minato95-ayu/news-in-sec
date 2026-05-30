import type { Platform } from '@/types/platform';
import { PLATFORM_CONFIGS } from '@/types/platform';

interface ImageResult {
  url: string;
  width: number;
  height: number;
}

export async function generateImage(
  prompt: string,
  platform: Platform
): Promise<ImageResult> {
  const { width, height } = PLATFORM_CONFIGS[platform].imageDimensions;

  // Use Pollinations AI (Free, no API key required) for reliable image generation fallback
  const cleanPrompt = `Professional high quality realistic news photo: ${prompt}. Style: modern, clean, vibrant colors. No text overlay, no watermarks.`;
  const seed = Math.floor(Math.random() * 1000000);
  
  // Construct the URL
  const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(cleanPrompt)}?width=${width}&height=${height}&nologo=true&seed=${seed}`;

  try {
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Pollinations API returned ${response.status}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = buffer.toString('base64');
    const dataUri = `data:image/jpeg;base64,${base64}`;

    return {
      url: dataUri,
      width,
      height,
    };
  } catch (error) {
    console.error("Failed to fetch from Pollinations:", error);
    // Return the URL as fallback if server-side fetch fails
    return {
      url: imageUrl,
      width,
      height,
    };
  }
}
