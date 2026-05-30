import { NextResponse } from "next/server";
import { generateContentWithAI } from "@/lib/ai/gemini";
import { generateImage } from "@/lib/ai/image-gen";
import { searchRealImage } from "@/lib/search/image-search";
import { publishToWordPress } from "@/lib/publishers/wordpress";
// import { db } from "@/lib/firebase/admin"; // Would use Firebase Admin in production

export async function GET(request: Request) {
  // Security check: ensure this is called by Vercel Cron
  const authHeader = request.headers.get('authorization');
  if (process.env.NODE_ENV === 'production' && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Phase 2 MVP: Here we would fetch all active campaigns from Firestore
    // For now, we simulate a campaign execution
    console.log("Cron started: Fetching active auto-pilot campaigns...");

    /*
    const campaignsSnapshot = await db.collection("autopilot_campaigns")
      .where("isActive", "==", true)
      .where("nextRunAt", "<=", new Date())
      .get();
    
    if (campaignsSnapshot.empty) {
      return NextResponse.json({ message: "No active campaigns to process right now." });
    }
    */

    // Simulated Campaign Data (MOCK)
    const mockCampaign = {
      campaignId: "mock-123",
      niche: "Artificial Intelligence News",
      language: "en",
      tone: "suspenseful",
      contentLength: "long", // 'short' | 'medium' | 'long' | 'very_long'
      platform: "linkedin", // 'instagram' | 'linkedin' | 'youtube' | 'twitter'
      publisher: {
        type: "wordpress",
        wpUrl: process.env.MOCK_WP_URL || "https://example.com",
        wpUsername: process.env.MOCK_WP_USER || "admin",
        wpAppPassword: process.env.MOCK_WP_PASS || "mock_pass",
      }
    };

    console.log(`Processing campaign for niche: ${mockCampaign.niche}`);

    // Step 1: Generate AI Content (Gemini)
    const content = await generateContentWithAI(
      mockCampaign.niche,
      mockCampaign.platform,
      mockCampaign.tone,
      mockCampaign.language,
      mockCampaign.contentLength as any
    );

    // Step 2: Fetch Real Image from Internet OR Generate AI Image as fallback
    let finalImageUrl = await searchRealImage(content.headline);
    if (!finalImageUrl) {
      console.log("Real image not found. Falling back to AI Image Generator...");
      const imageResult = await generateImage(
        content.imagePrompt,
        mockCampaign.platform as any
      );
      finalImageUrl = imageResult.url;
    }

    // Step 3: Publish to WordPress
    // Note: We skip actual publishing in the mock unless credentials are real
    let publishResult = { postUrl: "mock-url" };
    if (process.env.MOCK_WP_URL) {
      publishResult = await publishToWordPress(
        mockCampaign.publisher as any,
        content.headline,
        `<p>${content.hookLine}</p><p>${content.script}</p><p><strong>${content.callToAction}</strong></p><p>Tags: ${content.tags.join(', ')}</p>`,
        finalImageUrl
      );
    }

    // Step 4: Update 'nextRunAt' in DB
    // await db.collection("autopilot_campaigns").doc(mockCampaign.campaignId).update({ lastRunAt: new Date(), nextRunAt: calculateNextRun(campaign.frequency) });

    return NextResponse.json({
      success: true,
      message: "Campaign executed successfully",
      data: {
        headline: content.headline,
        imageUrl: finalImageUrl,
        publishedUrl: publishResult.postUrl
      }
    });

  } catch (error: any) {
    console.error("Cron Execution Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
