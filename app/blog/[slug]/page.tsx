import { blogPosts } from "../../../data/blog-posts";
import { notFound } from "next/navigation";
import MarkdownContent from "../../../components/MarkdownContent";
import Link from "next/link";
import { Metadata } from "next";
import Header from "../../../components/Header";
import { formatBlogDate } from "../../../lib/utils/formatDate";
import Script from "next/script";

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

  const imageUrl = post.coverImage ?? "/images/og-image.svg";
  const imageUrlWithProtocol = imageUrl.startsWith("http")
    ? imageUrl
    : `https://nxrig.com${imageUrl}`;

  return {
    title: `${post.title} - NXRIG Blog`,
    description: post.excerpt,
    alternates: {
      canonical: `https://nxrig.com/blog/${post.slug}`,
    },
    openGraph: {
      type: "article",
      title: `${post.title} - NXRIG Blog`,
      description: post.excerpt,
      url: `https://nxrig.com/blog/${post.slug}`,
      images: [imageUrlWithProtocol],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} - NXRIG Blog`,
      description: post.excerpt,
      images: [imageUrlWithProtocol],
    },
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

  const imageUrl = post.coverImage ?? "/images/og-image.svg";
  const imageUrlWithProtocol = imageUrl.startsWith("http")
    ? imageUrl
    : `https://nxrig.com${imageUrl}`;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: imageUrlWithProtocol,
    author: {
      "@type": "Organization",
      name: "NXRig",
    },
    datePublished: post.date,
    mainEntityOfPage: `https://nxrig.com/blog/${post.slug}`,
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Script
        id="ld-article"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Header />
      <main className="container mx-auto px-4 py-8">
        <article className="max-w-4xl mx-auto">
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
              <span className="text-sm text-gray-500">
                {formatBlogDate(post.date)}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              {post.title}
            </h1>
            <p className="text-xl text-gray-300">{post.excerpt}</p>
          </div>

          <div className="prose prose-invert max-w-none">
            <MarkdownContent content={post.content} />
          </div>
        </article>
      </main>
    </div>
  );
}
