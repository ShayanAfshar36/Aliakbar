const DATE = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

const DATE_SHORT = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
});

const TIME = new Intl.DateTimeFormat('en-GB', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
  timeZone: 'UTC',
});

const WEEKDAY = new Intl.DateTimeFormat('en-GB', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

export const formatDate = (value) => (value ? DATE.format(new Date(value)) : '');

export const formatDateShort = (value) => (value ? DATE_SHORT.format(new Date(value)) : '');

export const formatTime = (value) => (value ? `${TIME.format(new Date(value))} GMT` : '');

export const formatDateTime = (value) => (value ? `${formatDate(value)} · ${formatTime(value)}` : '');

export const today = (value = new Date()) => WEEKDAY.format(value);

/** Compact relative label used by the breaking-news strip and live lists. */
export const timeAgo = (value, now = new Date()) => {
  const diff = Math.max(0, now - new Date(value));
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr${hours === 1 ? '' : 's'} ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} day${days === 1 ? '' : 's'} ago`;
  return formatDateShort(value);
};

export const readingTimeLabel = (minutes) => `${minutes} min read`;

export const updatedLabel = (article) =>
  article.updatedAt && new Date(article.updatedAt) > new Date(article.publishedAt)
    ? `Updated ${formatDateTime(article.updatedAt)}`
    : null;
