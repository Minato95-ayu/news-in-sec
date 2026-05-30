import Image from "next/image";
import { notFound } from "next/navigation";

// In a real app, this would fetch from Firebase/Firestore based on the domain name
async function getSiteData(domain: string) {
  // Mock data for the demonstration
  if (domain === "tech-news.com" || domain === "news.localhost:3001" || domain.includes("localhost")) {
    return {
      name: "Tech News Daily",
      description: "Your daily source for the latest in technology and AI.",
      articles: [
        {
          id: 1,
          title: "Gemini 2.5 Released: What You Need to Know",
          excerpt: "Google just launched the newest version of its Gemini AI model, promising lightning-fast processing and better logic.",
          image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
          date: "Just now"
        },
        {
          id: 2,
          title: "NVIDIA Flux Models Change Image Generation",
          excerpt: "The new open-weights model from Black Forest Labs, running on NVIDIA hardware, produces images in under a second.",
          image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
          date: "2 hours ago"
        }
      ]
    };
  }
  return null;
}

export default async function CustomDomainPage({
  params
}: {
  params: { domain: string }
}) {
  const decodedDomain = decodeURIComponent(params.domain);
  const siteData = await getSiteData(decodedDomain);

  if (!siteData) {
    // Return 404 if the domain isn't registered in our database
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* HEADER */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <h1 className="text-xl font-black tracking-tight">{siteData.name}</h1>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-500">
            <a href="#" className="text-gray-900">Latest News</a>
            <a href="#" className="hover:text-gray-900">Trending</a>
            <a href="#" className="hover:text-gray-900">About</a>
          </nav>
        </div>
      </header>

      {/* HERO / FEATURED ARTICLE */}
      <main className="max-w-5xl mx-auto px-6 py-10 space-y-12">
        <section className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 space-y-4">
            <span className="text-sky-600 font-bold text-sm tracking-wider uppercase">Breaking</span>
            <h2 className="text-4xl md:text-5xl font-black leading-tight">
              {siteData.articles[0].title}
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              {siteData.articles[0].excerpt}
            </p>
            <div className="text-sm text-gray-500 pt-4">
              Published {siteData.articles[0].date}
            </div>
          </div>
          <div className="flex-1 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={siteData.articles[0].image} 
              alt={siteData.articles[0].title}
              className="object-cover w-full h-full"
            />
          </div>
        </section>

        {/* LATEST POSTS */}
        <section className="pt-10 border-t border-gray-200">
          <h3 className="text-2xl font-bold mb-6">Latest Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {siteData.articles.map((article) => (
              <article key={article.id} className="group cursor-pointer space-y-3">
                <div className="relative aspect-video rounded-xl overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h4 className="text-lg font-bold group-hover:text-sky-600 transition-colors">
                  {article.title}
                </h4>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {article.excerpt}
                </p>
                <div className="text-xs text-gray-500">
                  {article.date}
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-200 py-8 mt-20">
        <div className="max-w-5xl mx-auto px-6 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} {siteData.name}. All rights reserved.</p>
          <p className="mt-2 text-xs">Powered by News In Sec Auto-Blogging Platform</p>
        </div>
      </footer>
    </div>
  );
}
