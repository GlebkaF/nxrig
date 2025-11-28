import { blogPosts } from "../../../data/blog-posts";
import { notFound } from "next/navigation";
import MarkdownContent from "../../../components/MarkdownContent";
import Link from "next/link";
import { Metadata } from "next";
import Header from "../../../components/Header";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} - NXRIG Blog`,
    description: post.excerpt,
  };
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: Props) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white pb-20">
      <Header />
      <article className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center text-gray-400 hover:text-pink-400 transition-colors mb-6"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Blog
          </Link>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm text-pink-400 font-medium bg-pink-500/10 px-3 py-1 rounded-full border border-pink-500/20">
              {post.tags[0]}
            </span>
            <span className="text-sm text-gray-500">{post.date}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            {post.title}
          </h1>
        </div>

        <MarkdownContent content={post.content} />
      </article>
    </div>
  );
}
