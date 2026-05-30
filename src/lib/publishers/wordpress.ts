import { PublisherDocument } from "@/types/database";

export async function publishToWordPress(
  publisher: PublisherDocument,
  title: string,
  contentHtml: string,
  imageUrl: string
) {
  if (!publisher.wpUrl || !publisher.wpUsername || !publisher.wpAppPassword) {
    throw new Error("Missing WordPress credentials");
  }

  const baseUrl = publisher.wpUrl.replace(/\/$/, "");
  
  // Basic Auth Header
  const credentials = btoa(`${publisher.wpUsername}:${publisher.wpAppPassword}`);
  const headers = {
    "Authorization": `Basic ${credentials}`,
    "Content-Type": "application/json",
    "Accept": "application/json"
  };

  // Step 1: Upload Image to Media Library (if we want to set it as featured)
  // For simplicity right now, we can just embed the image in the content
  // But a better way is to upload it. To keep it simple, we will embed the image URL directly in HTML
  
  const finalHtml = `
    <figure class="wp-block-image size-large">
      <img src="${imageUrl}" alt="${title}" />
    </figure>
    ${contentHtml}
  `;

  // Step 2: Create the Post
  const response = await fetch(`${baseUrl}/wp-json/wp/v2/posts`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      title: title,
      content: finalHtml,
      status: "publish", // Automatically publish
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("WP Publish Error:", errorText);
    throw new Error(`Failed to publish to WordPress: ${response.statusText}`);
  }

  const data = await response.json();
  return {
    postUrl: data.link,
    postId: data.id,
  };
}
