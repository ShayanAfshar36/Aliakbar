import SmartImage from './SmartImage.jsx';

/** Renders the structured article body. Presentation only — no content here. */
export default function ArticleBody({ blocks }) {
  return (
    <div className="prose-editorial">
      {blocks.map((block, index) => {
        switch (block.type) {
          case 'heading':
            return (
              <h2 key={index} id={slugify(block.text)}>
                {block.text}
              </h2>
            );
          case 'subheading':
            return <h3 key={index}>{block.text}</h3>;
          case 'quote':
            return (
              <blockquote
                key={index}
                className="my-10 border-l-2 border-accent pl-6 font-display text-[1.3rem] font-600 italic leading-snug text-ink sm:text-[1.5rem]"
              >
                <p>{block.text}</p>
                {block.attribution && (
                  <footer className="mt-3 font-sans text-[12px] not-italic uppercase tracking-[0.1em] text-muted">
                    {block.attribution}
                  </footer>
                )}
              </blockquote>
            );
          case 'list':
            return (
              <ul key={index}>
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );
          case 'image':
            return (
              <figure key={index} className="my-10">
                <SmartImage
                  src={block.src}
                  srcSmall={block.srcSmall}
                  alt={block.alt}
                  ratio="16 / 9"
                  sizes="(max-width: 768px) 100vw, 720px"
                />
                {(block.caption || block.credit) && (
                  <figcaption className="mt-3 border-l-2 border-rule pl-3 font-sans text-[12px] leading-relaxed text-muted">
                    {block.caption}
                    {block.credit && <span className="mt-1 block italic">{block.credit}</span>}
                  </figcaption>
                )}
              </figure>
            );
          default:
            return <p key={index}>{block.text}</p>;
        }
      })}
    </div>
  );
}

export const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');

/** Extracts in-article headings for the sticky table of contents. */
export const tableOfContents = (blocks) =>
  blocks
    .filter((block) => block.type === 'heading')
    .map((block) => ({ id: slugify(block.text), label: block.text }));
