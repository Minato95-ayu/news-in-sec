import { create } from 'zustand';
import type { ContentOutput } from '@/schemas/content';
import type { Platform, Tone, Language } from '@/types/platform';

type GenerationPhase = 'idle' | 'validating' | 'generating-text' | 'generating-image' | 'saving' | 'completed' | 'error';

interface GenerationState {
  // Current generation
  phase: GenerationPhase;
  progress: number; // 0-100
  error: string | null;
  result: ContentOutput | null;
  imageURL: string | null;

  // Form defaults
  platform: Platform;
  tone: Tone;
  language: Language;

  // Actions
  setPhase: (phase: GenerationPhase) => void;
  setProgress: (progress: number) => void;
  setError: (error: string | null) => void;
  setResult: (result: ContentOutput | null) => void;
  setImageURL: (url: string | null) => void;
  setPlatform: (platform: Platform) => void;
  setTone: (tone: Tone) => void;
  setLanguage: (language: Language) => void;
  reset: () => void;
}

export const useGenerationStore = create<GenerationState>((set) => ({
  phase: 'idle',
  progress: 0,
  error: null,
  result: null,
  imageURL: null,
  platform: 'instagram',
  tone: 'professional',
  language: 'en',

  setPhase: (phase) => set({ phase }),
  setProgress: (progress) => set({ progress }),
  setError: (error) => set({ error }),
  setResult: (result) => set({ result }),
  setImageURL: (url) => set({ imageURL: url }),
  setPlatform: (platform) => set({ platform }),
  setTone: (tone) => set({ tone }),
  setLanguage: (language) => set({ language }),
  reset: () =>
    set({
      phase: 'idle',
      progress: 0,
      error: null,
      result: null,
      imageURL: null,
    }),
}));
