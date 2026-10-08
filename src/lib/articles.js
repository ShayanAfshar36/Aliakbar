import { articles as source } from '../data/articles.js';
import { getCategory } from '../data/categories.js';
import { getAuthor } from '../data/authors.js';

/**
 * The single read surface for editorial content.
 *
 * Every UI component goes through these helpers, so swapping the local
 * dataset for a CMS or news API means rewriting this module only.
 */

const byDateDesc = (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt);

export const allArticles = () => [...source].sort(byDateDesc);

export const getArticle = (slug) => source.find((article) => article.slug === slug) ?? null;

export const getById = (id) => source.find((article) => article.id === id) ?? null;

export const featuredArticles = () => allArticles().filter((article) => article.featured);

export const breakingArticles = () =>
  allArticles().filter((article) => article.breaking || article.type === 'live');

/** The front-page lead: the most significant breaking featured story, else the newest featured. */
export const leadArticle = () => {
  const featured = featuredArticles();
  return (
    featured.find((article) => article.breaking) ??
    featured[0] ??
    allArticles()[0]
  );
};

export const latestArticles = (limit) => allArticles().slice(0, limit);

export const byCategory = (slug, { exclude = [], limit } = {}) => {
  const list = allArticles().filter(
    (article) => article.category === slug && !exclude.includes(article.id)
  );
  return typeof limit === 'number' ? list.slice(0, limit) : list;
};

export const byAuthor = (authorId, { exclude = [] } = {}) =>
  allArticles().filter((article) => article.authorId === authorId && !exclude.includes(article.id));

export const mostRead = (limit = 5) =>
  [...source]
    .filter((article) => typeof article.mostReadRank === 'number')
    .sort((a, b) => a.mostReadRank - b.mostReadRank)
    .slice(0, limit);

export const editorPicks = (limit = 3) =>
  allArticles()
    .filter((article) => article.type === 'analysis' || article.type === 'investigation')
    .slice(0, limit);

export const opinionPieces = (limit) =>
  byCategory('opinion', typeof limit === 'number' ? { limit } : {});

export const trendingTopics = () => {
  const counts = new Map();
  source.forEach((article) =>
    article.tags.forEach((tag) => counts.set(tag, (counts.get(tag) ?? 0) + 1))
  );
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 8)
    .map(([tag]) => tag);
};

export const relatedArticles = (article, limit = 3) => {
  if (!article) return [];
  const scored = source
    .filter((candidate) => candidate.id !== article.id)
    .map((candidate) => {
      const sharedTags = candidate.tags.filter((tag) => article.tags.includes(tag)).length;
      const sameCategory = candidate.category === article.category ? 1 : 0;
      return { candidate, score: sharedTags * 2 + sameCategory };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || new Date(b.candidate.publishedAt) - new Date(a.candidate.publishedAt));

  const picked = scored.map((entry) => entry.candidate);
  const fallback = allArticles().filter(
    (candidate) => candidate.id !== article.id && !picked.includes(candidate)
  );
  return [...picked, ...fallback].slice(0, limit);
};

/** Fields a query is matched against, with a weight per field. */
const SEARCH_FIELDS = [
  { get: (article) => article.headline, weight: 6 },
  { get: (article) => article.standfirst, weight: 3 },
  { get: (article) => article.tags.join(' '), weight: 3 },
  { get: (article) => getCategory(article.category)?.name ?? '', weight: 2 },
  { get: (article) => getAuthor(article.authorId)?.name ?? '', weight: 2 },
  {
    get: (article) =>
      article.body
        .map((block) => [block.text, block.attribution, (block.items ?? []).join(' ')].filter(Boolean).join(' '))
        .join(' '),
    weight: 1,
  },
];

export const searchArticles = (query, { category = null, limit } = {}) => {
  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  let results = allArticles();

  if (category) results = results.filter((article) => article.category === category);

  if (terms.length) {
    results = results
      .map((article) => {
        const haystacks = SEARCH_FIELDS.map((field) => ({
          weight: field.weight,
          value: field.get(article).toLowerCase(),
        }));
        const score = terms.reduce((total, term) => {
          const best = haystacks.reduce(
            (max, field) => (field.value.includes(term) ? Math.max(max, field.weight) : max),
            0
          );
          return total + best;
        }, 0);
        return { article, score };
      })
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score || new Date(b.article.publishedAt) - new Date(a.article.publishedAt))
      .map((entry) => entry.article);
  }

  return typeof limit === 'number' ? results.slice(0, limit) : results;
};

export const paginate = (items, page, perPage) => {
  const totalPages = Math.max(1, Math.ceil(items.length / perPage));
  const current = Math.min(Math.max(1, page), totalPages);
  return {
    items: items.slice((current - 1) * perPage, current * perPage),
    page: current,
    totalPages,
    total: items.length,
  };
};

export const sectionSummary = (slug) => {
  const items = byCategory(slug);
  return { count: items.length, lead: items[0] ?? null, rest: items.slice(1, 4) };
};
