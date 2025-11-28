import React from "react";

const MarkdownTagUl = ({
  children,
  ...props
}: React.HTMLAttributes<HTMLUListElement>) => {
  return (
    <ul {...props} className="list-disc pl-6 my-4 space-y-2 text-gray-300">
      {children}
    </ul>
  );
};

export default MarkdownTagUl;
