export type Platform = 'instagram' | 'linkedin' | 'youtube' | 'twitter';
export type Tone = 'professional' | 'casual' | 'humorous' | 'inspirational';
export type Language = 'en' | 'hi' | 'hinglish';

export interface PlatformConfig {
  name: string;
  icon: string;
  maxCaptionLength: number;
  imageDimensions: {
    width: number;
    height: number;
    aspectRatio: string;
  };
  description: string;
}

export const PLATFORM_CONFIGS: Record<Platform, PlatformConfig> = {
  instagram: {
    name: 'Instagram',
    icon: '📸',
    maxCaptionLength: 2200,
    imageDimensions: { width: 1080, height: 1350, aspectRatio: '4:5' },
    description: 'Reels & Feed Posts',
  },
  linkedin: {
    name: 'LinkedIn',
    icon: '💼',
    maxCaptionLength: 3000,
    imageDimensions: { width: 1200, height: 628, aspectRatio: '1.91:1' },
    description: 'Professional Posts',
  },
  youtube: {
    name: 'YouTube',
    icon: '🎬',
    maxCaptionLength: 5000,
    imageDimensions: { width: 1920, height: 1080, aspectRatio: '16:9' },
    description: 'Shorts & Videos',
  },
  twitter: {
    name: 'Twitter / X',
    icon: '𝕏',
    maxCaptionLength: 280,
    imageDimensions: { width: 1200, height: 675, aspectRatio: '16:9' },
    description: 'Tweets & Threads',
  },
};

export const TONE_LABELS: Record<Tone, string> = {
  professional: '💼 Professional',
  casual: '😎 Casual',
  humorous: '😄 Humorous',
  inspirational: '✨ Inspirational',
};

export const LANGUAGE_LABELS: Record<Language, string> = {
  en: '🇺🇸 English',
  hi: '🇮🇳 Hindi',
  hinglish: '🇮🇳 Hinglish',
};
