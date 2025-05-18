/**
 * Simple markdown parser for rendering basic markdown in help articles
 * This is a very basic implementation - for production, consider using a library like marked or remark
 */
export function parseMarkdown(markdown: string): string {
  if (!markdown) return '';
  
  // Process code blocks
  let html = markdown.replace(/```([^`]+)```/g, (_, code) => {
    return `<pre><code>${escapeHtml(code.trim())}</code></pre>`;
  });
  
  // Process inline code
  html = html.replace(/`([^`]+)`/g, (_, code) => {
    return `<code>${escapeHtml(code)}</code>`;
  });
  
  // Process headings
  html = html.replace(/^### (.*$)/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gm, '<h1>$1</h1>');
  
  // Process blockquotes
  html = html.replace(/^\> (.+$)/gm, '<blockquote>$1</blockquote>');
  
  // Process lists
  html = html.replace(/^\* (.+$)/gm, '<ul><li>$1</li></ul>');
  html = html.replace(/^\d+\. (.+$)/gm, '<ol><li>$1</li></ol>');
  
  // Process horizontal rule
  html = html.replace(/^---$/gm, '<hr>');
  
  // Process links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  
  // Process emphasis
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  
  // Process paragraphs
  html = html
    .split('\n\n')
    .map(paragraph => {
      // Skip if it's already a block element
      if (
        paragraph.startsWith('<h') ||
        paragraph.startsWith('<blockquote') ||
        paragraph.startsWith('<ul') ||
        paragraph.startsWith('<ol') ||
        paragraph.startsWith('<pre') ||
        paragraph.startsWith('<hr')
      ) {
        return paragraph;
      }
      
      // Otherwise, wrap in a paragraph tag
      return `<p>${paragraph}</p>`;
    })
    .join('\n');
  
  // Fix nested lists
  html = html.replace(/<\/ul>\n<ul>/g, '');
  html = html.replace(/<\/ol>\n<ol>/g, '');
  
  return html;
}

/**
 * Escape HTML special characters to prevent XSS
 */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
} 