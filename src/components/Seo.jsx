import { useEffect } from 'react';
import { getAuthor } from '../data/authors.js';
import { getCategory } from '../data/categories.js';

const SITE_NAME = 'THE DAILY EDITION';

const setMeta = (attr, key, content) => {
  if (!content) return;
  let tag = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
};

const setLink = (rel, href) => {
  if (!href) return;
  let tag = document.head.querySelector(`link[rel="${rel}"]`);
  if (!tag) {
    tag = document.createElement('link');
    tag.setAttribute('rel', rel);
    document.head.appendChild(tag);
  }
  tag.setAttribute('href', href);
};

const clearJsonLd = () => {
  document.head.querySelectorAll('script[data-seo="jsonld"]').forEach((node) => node.remove());
};

/**
 * Document head for a route: title, description, canonical, Open Graph,
 * Twitter card and — for articles — NewsArticle structured data that
 * mirrors exactly what the page displays.
 */
export default function Seo({ title, description, article, image, type = 'website', noIndex = false }) {
  useEffect(() => {
    const fullTitle = title ? `${title} — ${SITE_NAME}` : `${SITE_NAME} — Independent journalism, worldwide`;
    document.title = fullTitle;
    const url = window.location.origin + window.location.pathname;

    setMeta('name', 'description', description);
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:site_name', SITE_NAME);
    setMeta('property', 'og:url', url);
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'robots', noIndex ? 'noindex, follow' : 'index, follow');

    if (image) {
      setMeta('property', 'og:image', image);
      setMeta('name', 'twitter:image', image);
    }

    setLink('canonical', url);

    clearJsonLd();
    if (article) {
      const author = getAuthor(article.authorId);
      const category = getCategory(article.category);
      const data = {
        '@context': 'https://schema.org',
        '@type': 'NewsArticle',
        headline: article.headline,
        description: article.standfirst,
        datePublished: article.publishedAt,
        ...(article.updatedAt ? { dateModified: article.updatedAt } : {}),
        articleSection: category?.name,
        keywords: article.tags.join(', '),
        image: [article.image.src],
        ...(author
          ? { author: { '@type': 'Person', name: author.name, jobTitle: author.role } }
          : {}),
        publisher: { '@type': 'Organization', name: SITE_NAME },
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      };
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.dataset.seo = 'jsonld';
      script.textContent = JSON.stringify(data);
      document.head.appendChild(script);
    }

    return () => {
      if (article) clearJsonLd();
    };
  }, [title, description, article, image, type, noIndex]);

  return null;
}
