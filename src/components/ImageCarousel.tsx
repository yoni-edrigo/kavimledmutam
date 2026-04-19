import { useRef, useState, useCallback } from 'react';
import { wixImageUrl } from '../utils';

interface Slide {
  src: string;
  painter?: string;
}

interface ImageCarouselProps {
  slides: Slide[];
  altPrefix: string;
}

export function ImageCarousel({ slides, altPrefix }: ImageCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  const goTo = useCallback(
    (index: number) => {
      const track = trackRef.current;
      if (!track) return;
      const clamped = Math.max(0, Math.min(index, slides.length - 1));
      track.scrollTo({ left: track.offsetWidth * clamped, behavior: 'smooth' });
      setCurrent(clamped);
    },
    [slides.length]
  );

  if (!slides.length) return null;

  return (
    <div className="img-carousel">
      <div className="img-carousel__track" ref={trackRef}>
        {slides.map((slide, i) => (
          <figure key={i} className="img-carousel__slide">
            <img
              src={wixImageUrl(slide.src)}
              alt={`${altPrefix} ${i + 1}`}
              loading={i === 0 ? 'eager' : 'lazy'}
            />
            {slide.painter && (
              <figcaption className="text-sm text-center font-semibold mt-2">
                {`מאיירת: ${slide.painter}`}
              </figcaption>
            )}
          </figure>
        ))}
      </div>

      {slides.length > 1 && (
        <div className="img-carousel__controls">
          <button
            className="img-carousel__btn"
            onClick={() => goTo(current - 1)}
            disabled={current === 0}
            aria-label="תמונה קודמת"
          >
            ›
          </button>
          <span className="img-carousel__counter" dir="ltr">
            {current + 1} / {slides.length}
          </span>
          <button
            className="img-carousel__btn"
            onClick={() => goTo(current + 1)}
            disabled={current === slides.length - 1}
            aria-label="תמונה הבאה"
          >
            ‹
          </button>
        </div>
      )}
    </div>
  );
}
