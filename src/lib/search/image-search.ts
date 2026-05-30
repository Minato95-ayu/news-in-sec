export async function searchRealImage(query: string): Promise<string | null> {
  try {
    // Step 1: Search Wikipedia for the best matching article
    const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&utf8=&format=json&origin=*`;
    const searchRes = await fetch(searchUrl);
    const searchData = await searchRes.json();

    if (!searchData.query?.search?.length) {
      return null; // No article found
    }

    const title = searchData.query.search[0].title;

    // Step 2: Fetch the main image of that article
    const imageUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&format=json&pithumbsize=1000&origin=*`;
    const imageRes = await fetch(imageUrl);
    const imageData = await imageRes.json();

    const pages = imageData.query?.pages;
    if (!pages) return null;

    // Extract the first page's thumbnail
    const pageId = Object.keys(pages)[0];
    const image = pages[pageId]?.thumbnail?.source;

    if (image) {
      const absoluteUrl = image.startsWith('//') ? `https:${image}` : image;
      
      try {
        const imgRes = await fetch(absoluteUrl);
        if (imgRes.ok) {
          const arrayBuffer = await imgRes.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);
          const base64 = buffer.toString('base64');
          return `data:image/jpeg;base64,${base64}`;
        }
      } catch (e) {
        console.error("Failed to fetch Wikipedia image as base64", e);
      }
      return absoluteUrl;
    }
    return null;
  } catch (error) {
    console.error("Error searching for real image:", error);
    return null;
  }
}
