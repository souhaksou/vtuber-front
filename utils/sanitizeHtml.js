import DOMPurify from 'isomorphic-dompurify';

const ALLOWED_TAGS = [
  'p', 'br', 'hr',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'blockquote',
  'ul', 'ol', 'li',
  'strong', 'b', 'em', 'i', 'u', 's',
  'a',
  'img', 'figure', 'figcaption',
  'code', 'pre',
  'table', 'thead', 'tbody', 'tr', 'th', 'td'
];

const ALLOWED_ATTR = [
  'href', 'target', 'rel', 'title',
  'src', 'alt', 'width', 'height',
  'colspan', 'rowspan', 'scope'
];

export const sanitizeHtml = (raw = '') => {
  const clean = DOMPurify.sanitize(raw, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    FORBID_TAGS: [
      'script', 'style', 'iframe', 'frame', 'object', 'embed',
      'form', 'input', 'button', 'textarea', 'select',
      'svg', 'math', 'link', 'meta', 'base'
    ],
    FORBID_ATTR: ['style', 'srcdoc'],
    ALLOW_UNKNOWN_PROTOCOLS: false,
  });

  return clean.replace(/<a\b([^>]*?)target="_blank"([^>]*?)>/gi, (match, p1, p2) => {
    const tag = `<a ${p1}target="_blank"${p2}>`;
    if (/rel=/i.test(tag)) {
      return tag.replace(/rel="[^"]*"/i, 'rel="noopener noreferrer"');
    }
    return tag.replace('>', ' rel="noopener noreferrer">');
  });
};
