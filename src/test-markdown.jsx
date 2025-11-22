import { marked } from "marked";
import DOMPurify from "dompurify";

export default function TestMarkdown() {
  const md = "**Hello** from *Markdown!*";
  const html = DOMPurify.sanitize(marked.parse(md));

  return (
    <div className="screen">
      <div className="card" style={{ maxWidth: 600 }}>
        <h2 className="card__title">Markdown Test</h2>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  );
}
