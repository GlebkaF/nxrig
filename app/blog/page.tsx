import { blogPosts } from "../../data/blog-posts";
import Link from "next/link";
import { Metadata } from "next";
import Header from "../../components/Header";
import { formatBlogDate } from "../../lib/utils/formatDate";

export const metadata: Metadata = {
  title: "Guitar Blog - Tips, Tricks & Tutorials | NXRIG",
  description:
    "Learn electric guitar with our easy-to-follow guides, tutorials, and song recommendations. Perfect for beginners and intermediate players.",
  alternates: {
    canonical: "https://nxrig.com/blog",
  },
  openGraph: {
    title: "Guitar Blog - Tips, Tricks & Tutorials | NXRIG",
    description:
      "Learn electric guitar with our easy-to-follow guides, tutorials, and song recommendations. Perfect for beginners and intermediate players.",
    url: "https://nxrig.com/blog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Guitar Blog</h1>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">
            Guides, Tutorials & Tips
          </h2>
          <p className="text-gray-300 max-w-3xl">
            Learn electric guitar with our easy-to-follow guides, tutorials, and
            song recommendations. Perfect for beginners and intermediate
            players.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden transform transition-all duration-300 hover:scale-[1.02] border border-white/10 p-6"
            >
              <div className="flex items-start gap-3 mb-4">
                <span className="text-sm text-pink-400 font-medium bg-pink-500/10 px-3 py-1 rounded-full border border-pink-500/20">
                  {post.tags[0]}
                </span>
                <span className="text-sm text-gray-500">
                  {formatBlogDate(post.date)}
                </span>
              </div>
              <h2 className="text-2xl font-bold mb-3 hover:text-pink-400 transition-colors">
                {post.title}
              </h2>
              <p className="text-gray-300 line-clamp-3">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
