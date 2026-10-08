import { useState } from 'react';

const FALLBACK =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 10"><rect width="16" height="10" fill="#EFEEEA"/><path d="M3 7.2 6 4l2.1 2.4L10.4 4l2.6 3.2z" fill="#CFCCC5"/><circle cx="11.4" cy="2.9" r="1.1" fill="#CFCCC5"/></svg>`
  );

/**
 * Editorial image with an intrinsic aspect box (prevents layout shift),
 * native lazy loading below the fold, and a graceful fallback.
 */
export default function SmartImage({
  src,
  srcSmall,
  alt,
  ratio = '16 / 9',
  className = '',
  imgClassName = '',
  priority = false,
  sizes = '100vw',
}) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={`relative overflow-hidden bg-surface ${className}`}
      style={{ aspectRatio: ratio }}
    >
      <img
        src={failed ? FALLBACK : src}
        srcSet={!failed && srcSmall ? `${srcSmall} 800w, ${src} 1600w` : undefined}
        sizes={sizes}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
        className={`h-full w-full object-cover transition-[opacity,transform] duration-700 ease-editorial ${
          loaded ? 'opacity-100' : 'opacity-0'
        } ${imgClassName}`}
      />
    </div>
  );
}
