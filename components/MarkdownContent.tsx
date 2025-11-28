import React from "react";
import Markdown from "markdown-to-jsx";
import MarkdownTagA from "./markdown-tag/MarkdownTagA";
import MarkdownTagUl from "./markdown-tag/MarkdownTagUl";
import Image from "next/image";

interface Props {
  content: string;
}

// Preprocessing raw markdown from backend
function fixMarkdown(markdown: string): string {
  // Replaces hyphen (en-dash) with em-dash
  markdown = markdown.replaceAll(" - ", " – ");

  /**
   * For markdown-to-jsx it is important that there is a line break before the code block, otherwise the code block will not be parsed
   */
  markdown = markdown.replaceAll("```", "\n```");

  /**
   * Replaces [1. with [1\. so that markdown-to-jsx does not consider numbers inside links as a list.
   */
  markdown = markdown.replace(/\[(\d+)\./g, "[$1\\.");

  return markdown;
}

const MarkdownContent: React.FC<Props> = ({ content }) => {
  return (
    <>
      <Markdown
        options={{
          overrides: {
            a: MarkdownTagA,
            ul: { component: MarkdownTagUl },
            h1: {
              props: {
                className: "text-4xl font-bold mb-8 mt-12 text-white",
                "data-test": "article-title",
              },
            },
            h2: {
              props: {
                className: "text-3xl font-bold mb-6 mt-12 text-white",
              },
            },
            h3: {
              props: {
                className: "text-2xl font-bold mb-4 mt-8 text-white",
              },
            },
            h4: {
              props: {
                className: "text-xl font-bold mb-3 mt-6 text-white",
              },
            },
            p: {
              props: {
                className: "text-lg leading-relaxed mb-6 text-gray-300",
              },
            },
            ol: {
              props: {
                className: "list-decimal pl-6 my-4 space-y-2 text-gray-300",
              },
            },
            strong: {
              props: {
                className: "font-semibold text-white",
              },
            },
            em: {
              props: {
                className: "italic text-gray-400",
              },
            },
            li: {
              props: {
                className: "relative",
              },
            },
            img: {
              component(props: React.ImgHTMLAttributes<HTMLImageElement>) {
                return (
                  <div className="my-8 rounded-xl overflow-hidden">
                    <Image
                      src={(props.src as string) || ""}
                      alt={props.alt || ""}
                      width={1200}
                      height={600}
                      className="w-full h-auto"
                    />
                  </div>
                );
              },
            },
          },
        }}
      >
        {fixMarkdown(content)}
      </Markdown>
    </>
  );
};

export default MarkdownContent;
