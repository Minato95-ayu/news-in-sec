'use server';

import { cookies } from 'next/headers';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { FieldValue, Timestamp } from 'firebase-admin/firestore';
import { generateContentWithAI } from '@/lib/ai/gemini';
import { generateImage } from '@/lib/ai/image-gen';
import { ContentInput } from '@/schemas/content';
import { ContentHistoryDocument, UserDocument } from '@/types/database';

export async function generateContentAction(data: ContentInput) {
  try {
    // 1. Zero-Trust Security: Verify session cookie
    // const cookieStore = await cookies();
    // const sessionCookie = cookieStore.get('session')?.value;

    // if (!sessionCookie) {
    //   throw new Error('Unauthorized: No session cookie found');
    // }

    // let decodedClaims;
    // try {
    //   decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);
    // } catch {
    //   throw new Error('Unauthorized: Invalid session');
    // }

    // const uid = decodedClaims.uid;

    // 2. Retrieve user and check usage limits
    // const userRef = adminDb.collection('users').doc(uid);
    // const userSnap = await userRef.get();

    // if (!userSnap.exists) {
    //   throw new Error('User not found');
    // }

    // const userData = userSnap.data() as UserDocument;
    
    // if (userData.usageLimits.scriptsUsed >= userData.usageLimits.scriptsPerMonth) {
    //   throw new Error('Quota exceeded for scripts');
    // }

    // 3. Run the AI Pipeline
    let aiResult;
    try {
      aiResult = await generateContentWithAI(data.topic, data.platform, data.tone, data.language, data.contentLength);
    } catch (error) {
      console.error('Text generation failed:', error);
      throw new Error('Failed to generate text content');
    }

    let imageResult = null;
    let imageError = false;
    let finalImageUrl = '';
    try {
      // Import the scraper dynamically or at the top
      const { searchRealImage } = await import('@/lib/search/image-search');
      
      // Step 2: Fetch Real Image from Internet using the broad entity keyword
      finalImageUrl = await searchRealImage(aiResult.imageSearchKeyword) || '';
      
      if (!finalImageUrl) {
        console.log("Real image not found. Falling back to AI Image Generator...");
        imageResult = await generateImage(aiResult.imagePrompt, data.platform);
        finalImageUrl = imageResult.url;
      }
    } catch (error) {
      console.error('Image search/generation failed:', error);
      imageError = true;
    }

    // 4. Save to Firestore
    // Temporarily bypass Firestore Admin writes for UI testing
    // const historyRef = adminDb.collection('content_history').doc();
    
    const contentHistory: any = {
      ...aiResult,
      contentId: "mock-id", // historyRef.id,
      creatorId: "mock-uid", // uid,
      creatorName: "Test User", // userData.displayName || 'Unknown',
      inputTopic: data.topic,
      platform: data.platform,
      imageURL: finalImageUrl,
      imageDimensions: {
        width: imageResult?.width || 0,
        height: imageResult?.height || 0,
        aspectRatio: imageResult ? `${imageResult.width}:${imageResult.height}` : '1:1',
      },
      status: imageError ? 'partial' : 'completed',
      aiModel: 'gemini-2.5-flash',
      imageModel: 'flux-schnell',
      tokenUsage: {
        promptTokens: 0,
        completionTokens: 0,
        estimatedCost: 0,
      },
      templateId: data.templateId || null,
      createdAt: Timestamp.now().toMillis(),
      updatedAt: Timestamp.now().toMillis(),
    };

    // await historyRef.set(contentHistory);

    // 5. Increment usage limits
    // const updateData: Record<string, FieldValue> = {
    //   'usageLimits.scriptsUsed': FieldValue.increment(1),
    // };
    
    // if (imageResult) {
    //   updateData['usageLimits.imagesUsed'] = FieldValue.increment(1);
    // }

    // await userRef.update(updateData);

    return { success: true, id: "mock-id", data: contentHistory };
  } catch (error: unknown) {
    console.error('Generate content action error:', error);
    const message = error instanceof Error ? error.message : 'An error occurred';
    return { success: false, error: message };
  }
}
