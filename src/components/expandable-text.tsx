import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from 'primereact/button';

interface ReadMoreProps {
  text: string;
}

export const ReadMore: React.FC<ReadMoreProps> = ({ text }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [needsButton, setNeedsButton] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      const element = contentRef.current;
      // Check if content height exceeds container height (15em = ~240px)
      setNeedsButton(element.scrollHeight > 240);
    }
  }, [text]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="relative lg:max-w-30rem">
      <AnimatePresence initial={false}>
        <motion.div
          className="text-justify overflow-hidden"
          initial={false}
          animate={{
            height: isExpanded ? 'auto' : '15em',
          }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
          <div
            ref={contentRef}
            className={`${!isExpanded && needsButton ? 'overflow-hidden' : ''}`}
          >
            {text}
          </div>
        </motion.div>
      </AnimatePresence>

      {needsButton && (
        <Button
          label={isExpanded ? 'הסתר' : 'קרא עוד'}
          icon={`pi pi-chevron-${isExpanded ? 'up' : 'down'} mx-2`}
          iconPos="right"
          text
          onClick={toggleExpand}
          size="small"
          className="px-0 text-base"
        />
      )}
    </div>
  );
};
