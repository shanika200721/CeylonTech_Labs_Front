// src/components/MarkdownView.jsx
import { useMemo } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";

export default function MarkdownView({ content }) {
  const html = useMemo(() => {
    if (!content) return "";
    const raw = marked.parse(content);
    return DOMPurify.sanitize(raw);
  }, [content]);

  return (
    <div
      className="markdown-body"
      style={{ lineHeight: 1.7, fontSize: 15 }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
