# 📰 NewsInSec - Viral Auto-Blogging System

![NewsInSec Banner](https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&q=80)

**NewsInSec** is a next-generation AI-powered auto-blogging system that discovers breaking news, generates highly engaging content, sources real-world images, and publishes them seamlessly. Designed for modern content creators, marketers, and developers looking to automate viral content creation at scale.

**Created by Ayush Kausik** 🚀

---

## 🌟 Features

- **🧠 Advanced AI Generation**: Powered by the latest Google Gemini 2.5 Flash models to write human-like, suspenseful, and highly engaging news articles.
- **🌍 Real-Time Google Search Grounding**: Uses live web search to ensure all generated content is 100% factual and up-to-date with current events.
- **🖼️ Automated Image Sourcing**: Intelligently identifies the core entity of a news story and fetches high-quality real images from Wikipedia/Wikimedia automatically.
- **⚡ Next.js 15 & React 19**: Built on the bleeding edge of web technologies for lightning-fast performance and SEO optimization.
- **💅 Beautiful UI/UX**: Crafted with Tailwind CSS, Framer Motion, and shadcn/ui for a premium, dark-mode first aesthetic featuring 3D elements and smooth animations.
- **🌐 Niche Flexibility**: Generates content for ANY niche (Business, Crime, Gaming, etc.) in ANY language, including localized tones like "Hinglish".

## 🚀 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **AI Engine**: [Google Gen AI SDK](https://github.com/google/genai-js) (Gemini 2.5 Flash)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🛠️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Minato95-ayu/news-in-sec.git
   cd news-in-sec
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Variables:**
   Create a `.env.local` file in the root of your project and add your Gemini API Key:
   ```env
   GEMINI_API_KEY=your_google_gemini_api_key_here
   ```
   *(Note: Get your API key from Google AI Studio. The system uses the official `@google/genai` SDK with Google Search Grounding).*

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 💡 How It Works (The 2-Step AI Architecture)

To ensure the highest quality output and strict JSON formatting, NewsInSec uses a robust two-step AI pipeline:
1. **Research & Draft (Search Grounded):** The AI uses Google Search to find the latest facts about a requested topic and drafts a compelling, suspenseful article.
2. **Strict Formatting:** The drafted article is passed back through the AI with a strict `application/json` mime-type schema to reliably output SEO tags, hooks, and image search keywords without formatting errors.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Minato95-ayu/news-in-sec/issues).

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---
*Built with ❤️ by Ayush Kausik*
