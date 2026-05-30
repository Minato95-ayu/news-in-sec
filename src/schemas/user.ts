import { z } from 'zod';

export const UserPreferencesSchema = z.object({
  defaultPlatform: z.enum(['instagram', 'linkedin', 'youtube', 'twitter']).default('instagram'),
  defaultTone: z.enum(['professional', 'casual', 'humorous', 'inspirational']).default('professional'),
  defaultLanguage: z.enum(['en', 'hi', 'hinglish']).default('en'),
});

export type UserPreferences = z.infer<typeof UserPreferencesSchema>;

export const UsageLimitsSchema = z.object({
  scriptsPerMonth: z.number().int().nonnegative(),
  imagesPerMonth: z.number().int().nonnegative(),
  scriptsUsed: z.number().int().nonnegative(),
  imagesUsed: z.number().int().nonnegative(),
  resetDate: z.any(), // Firestore Timestamp
});

export type UsageLimits = z.infer<typeof UsageLimitsSchema>;

export const SubscriptionTierSchema = z.enum(['free', 'pro', 'enterprise']);
export type SubscriptionTier = z.infer<typeof SubscriptionTierSchema>;
