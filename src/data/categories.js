/**
 * Editorial sections. `slug` is the URL segment used by /section/:slug.
 */
export const categories = [
  {
    slug: 'world',
    name: 'World',
    description: 'Diplomacy, conflict and the forces reshaping international order.',
    intro:
      'Reporting from more than forty countries on the decisions that cross borders — treaties, trade, migration and the politics of cooperation.',
  },
  {
    slug: 'politics',
    name: 'Politics',
    description: 'Legislatures, elections and the machinery of government.',
    intro:
      'How power is won, used and held to account — from parliamentary committees to the campaign trail.',
  },
  {
    slug: 'business',
    name: 'Business',
    description: 'Markets, industry and the economy.',
    intro:
      'Companies, capital and the policies that shape them, explained for readers who have to live with the consequences.',
  },
  {
    slug: 'technology',
    name: 'Technology',
    description: 'Computing, platforms and the industries built on them.',
    intro:
      'The systems behind modern life — and the people, incentives and rules that govern them.',
  },
  {
    slug: 'science',
    name: 'Science',
    description: 'Research, discovery and the scientific method.',
    intro:
      'What researchers are finding, how they know it, and what remains uncertain.',
  },
  {
    slug: 'health',
    name: 'Health',
    description: 'Medicine, public health and care systems.',
    intro:
      'Evidence-led coverage of treatment, prevention and the systems that deliver care.',
  },
  {
    slug: 'environment',
    name: 'Environment',
    description: 'Climate, energy and the natural world.',
    intro:
      'The physical world and the policies that determine its future, reported with the data in view.',
  },
  {
    slug: 'culture',
    name: 'Culture',
    description: 'Art, books, film and ideas.',
    intro:
      'Criticism and reporting on the work that shapes how societies see themselves.',
  },
  {
    slug: 'entertainment',
    name: 'Entertainment',
    description: 'Screen, stage and music.',
    intro: 'The industries of attention — who makes culture, and on what terms.',
  },
  {
    slug: 'sports',
    name: 'Sports',
    description: 'Competition, athletes and the business of sport.',
    intro: 'Results and the reporting behind them, from grassroots to the elite level.',
  },
  {
    slug: 'opinion',
    name: 'Opinion',
    description: 'Argument and analysis from our columnists and contributors.',
    intro:
      'Clearly labelled argument. Opinion pieces are the views of their authors and are edited separately from our news reporting.',
  },
  {
    slug: 'investigations',
    name: 'Investigations',
    description: 'Long-form accountability journalism.',
    intro:
      'Months of reporting on documents, data and the people who know what happened.',
  },
];

export const getCategory = (slug) =>
  categories.find((category) => category.slug === slug) ?? null;

export const getCategoryName = (slug) => getCategory(slug)?.name ?? 'News';
