import Link from "next/link";
import React from "react";

const MarkdownTagA = ({
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const href = props.href || "";
  const isInternal = href.startsWith("/") || href.startsWith("#");

  if (isInternal) {
    return (
      <Link
        href={href}
        className="text-pink-400 hover:text-pink-300 transition-colors"
      >
        {children}
      </Link>
    );
  }

  return (
    <a
      {...props}
      target="_blank"
      rel="noopener noreferrer"
      className="text-pink-400 hover:text-pink-300 transition-colors"
    >
      {children}
    </a>
  );
};

export default MarkdownTagA;
