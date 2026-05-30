import { Timestamp } from 'firebase/firestore';
import type { ContentOutput, ContentStatus } from '@/schemas/content';
import type { UserPreferences, UsageLimits, SubscriptionTier } from '@/schemas/user';

export interface UserDocument {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  subscriptionTier: SubscriptionTier;
  subscriptionStatus: 'active' | 'canceled' | 'past_due';
  subscriptionStartDate: Timestamp;
  subscriptionEndDate: Timestamp;
  usageLimits: UsageLimits;
  preferences: UserPreferences;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface ContentHistoryDocument extends ContentOutput {
  contentId: string;
  creatorId: string;
  creatorName: string;
  inputTopic: string;
  platform: 'instagram' | 'linkedin' | 'youtube' | 'twitter';
  imageURL: string;
  imageDimensions: {
    width: number;
    height: number;
    aspectRatio: string;
  };
  status: ContentStatus;
  aiModel: string;
  imageModel: string;
  tokenUsage: {
    promptTokens: number;
    completionTokens: number;
    estimatedCost: number;
  };
  templateId: string | null;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface TemplateDocument {
  templateId: string;
  title: string;
  description: string;
  category: 'business_reel' | 'linkedin_post' | 'product_launch' | 'thought_leadership' | 'news_update';
  platform: 'instagram' | 'linkedin' | 'youtube' | 'twitter';
  systemPrompt: string;
  userPromptTemplate: string;
  variables: string[];
  imageStyleGuide: string;
  thumbnailURL: string;
  exampleOutput: string;
  isPublic: boolean;
  createdBy: string;
  usageCount: number;
  tags: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface PublisherDocument {
  publisherId: string;
  userId: string;
  type: 'wordpress' | 'custom_domain';
  wpUrl?: string;
  wpUsername?: string;
  wpAppPassword?: string; // Stored securely
  customDomain?: string;
  isVerified: boolean;
  status: 'active' | 'error' | 'paused';
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface AutoPilotCampaignDocument {
  campaignId: string;
  userId: string;
  publisherId: string;
  niche: string;
  language: string;
  tone: string;
  frequencyMinutes: number;
  isActive: boolean;
  lastRunAt: Timestamp | null;
  nextRunAt: Timestamp | null;
  totalGenerated: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
