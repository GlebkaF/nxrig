import { blogPosts } from "../../data/blog-posts";
import Link from "next/link";
import { Metadata } from "next";
import Header from "../../components/Header";

export const metadata: Metadata = {
  title: "Guitar Blog - Tips, Tricks & Tutorials | NXRIG",
  description:
    "Learn electric guitar with our easy-to-follow guides, tutorials, and song recommendations. Perfect for beginners and intermediate players.",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">Guitar Blog</h1>
        <p className="text-xl text-gray-400 mb-12 max-w-2xl">
          Guides, tutorials, and tone tips for NUX Mighty Plug Pro & Mighty
          Space users.
        </p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block bg-gray-800/50 rounded-2xl overflow-hidden border border-white/5 hover:border-pink-500/30 transition-all hover:bg-gray-800"
            >
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-sm text-pink-400 font-medium">
                    {post.tags[0]}
                  </span>
                  <span className="text-gray-600">•</span>
                  <span className="text-sm text-gray-500">{post.date}</span>
                </div>
                <h2 className="text-2xl font-bold mb-3 group-hover:text-pink-400 transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-400 line-clamp-3 mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center text-sm text-pink-400 font-medium">
                  Read Article
                  <svg
                    className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
