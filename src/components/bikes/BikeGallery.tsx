import { useCallback, useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react'

interface BikeGalleryProps {
  images: string[]
  name: string
}

export default function BikeGallery({ images, name }: BikeGalleryProps) {
  const [active, setActive] = useState(0)
  const [lightbox, setLightbox] = useState(false)

  const go = useCallback(
    (dir: number) => {
      setActive((current) => (current + dir + images.length) % images.length)
    },
    [images.length],
  )

  useEffect(() => {
    if (!lightbox) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLightbox(false)
      if (event.key === 'ArrowRight') go(1)
      if (event.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [lightbox, go])

  return (
    <div>
      <div className="group relative overflow-hidden rounded-2xl border border-line bg-soft">
        <img
          src={images[active]}
          alt={`${name} — view ${active + 1}`}
          className="aspect-[4/3] w-full object-cover sm:aspect-[16/11]"
        />
        <button
          type="button"
          onClick={() => setLightbox(true)}
          aria-label="Open fullscreen gallery"
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-ink backdrop-blur transition-colors hover:bg-white"
        >
          <Expand size={17} />
        </button>
        {images.length > 1 ? (
          <div className="absolute inset-x-4 bottom-4 flex justify-between opacity-0 transition-opacity duration-300 group-hover:opacity-100 focus-within:opacity-100">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous image"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-ink backdrop-blur transition-colors hover:bg-white"
            >
              <ChevronLeft size={19} />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next image"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-ink backdrop-blur transition-colors hover:bg-white"
            >
              <ChevronRight size={19} />
            </button>
          </div>
        ) : null}
      </div>

      {images.length > 1 ? (
        <div className="mt-3 grid grid-cols-4 gap-3">
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Show image ${index + 1}`}
              aria-current={index === active}
              className={`overflow-hidden rounded-xl border-2 transition-all ${
                index === active ? 'border-brand' : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <img
                src={image}
                alt=""
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
            </button>
          ))}
        </div>
      ) : null}

      {lightbox ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${name} gallery`}
          className="fixed inset-0 z-[70] flex flex-col bg-ink/95 p-4 backdrop-blur-sm sm:p-8"
        >
          <div className="flex items-center justify-between text-white">
            <span className="text-sm font-semibold">
              {name} · {active + 1} / {images.length}
            </span>
            <button
              type="button"
              onClick={() => setLightbox(false)}
              aria-label="Close gallery"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
            >
              <X size={20} />
            </button>
          </div>
          <div className="relative flex flex-1 items-center justify-center py-4">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous image"
              className="absolute left-0 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <ChevronLeft size={22} />
            </button>
            <img
              src={images[active]}
              alt={`${name} — view ${active + 1}`}
              className="max-h-full max-w-full rounded-xl object-contain"
            />
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next image"
              className="absolute right-0 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
