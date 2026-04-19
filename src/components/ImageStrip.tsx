import { useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';
import { wixImageUrl } from '../utils';

interface ImageStripProps {
  srcs: string[];
}

export function ImageStrip({ srcs }: ImageStripProps) {
  const [lightbox, setLightbox] = useState<string | null>(null);

  if (!srcs.length) return null;

  return (
    <>
      <div className="img-strip">
        {srcs.map((src, i) => {
          const url = wixImageUrl(src);
          return (
            <button
              key={i}
              className="img-strip__item"
              onClick={() => setLightbox(url)}
              aria-label={`הגדל תמונה ${i + 1}`}
            >
              <img
                src={url}
                alt={`תמונה ${i + 1}`}
                loading="lazy"
              />
            </button>
          );
        })}
      </div>

      {lightbox &&
        createPortal(
          <AnimatePresence>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed top-0 left-0 w-full h-full flex align-items-center justify-content-center z-5"
              style={{ backgroundColor: 'rgba(0,0,0,0.85)' }}
              onClick={() => setLightbox(null)}
            >
              <motion.div
                initial={{ scale: 0.6 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.6 }}
                className="relative"
                onClick={(e) => e.stopPropagation()}
                style={{ maxWidth: '90vw', maxHeight: '90vh' }}
              >
                <button
                  onClick={() => setLightbox(null)}
                  className="absolute top-0 right-0 m-2 p-2 cursor-pointer"
                  type="button"
                  aria-label="סגור"
                  style={{ border: 'none', background: 'transparent' }}
                >
                  <i className="pi pi-times text-2xl text-white" />
                </button>
                <img
                  src={lightbox}
                  alt="תמונה מוגדלת"
                  style={{
                    maxWidth: '90vw',
                    maxHeight: '90vh',
                    objectFit: 'contain',
                  }}
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
