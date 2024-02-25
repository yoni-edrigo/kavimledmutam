import { useSpring, animated } from 'react-spring';
import { useInView } from 'react-intersection-observer';
import React, { ReactNode } from 'react';

interface AnimatedGridOnScrollProps {
  children: ReactNode;
  index: number;
}

export const AnimatedGridOnScroll: React.FC<AnimatedGridOnScrollProps> = ({
  children,
  index,
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  const springProps = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translate3d(0, 0, 0)' : 'translate3d(0, 100%, 0)', // Fade in from bottom
    config: { duration: 500 },
    delay: inView ? index * 50 : 0, // Stagger the delay based on the index
  });

  return (
    <animated.div ref={ref} style={springProps}>
      {children}
    </animated.div>
  );
};

interface AnimatedOnScrollProps {
  fromDirection?: 'left' | 'right' | 'top' | 'bottom';
  delay?: number;
  children: React.ReactNode;
}

const AnimatedOnScroll: React.FC<AnimatedOnScrollProps> = ({
  fromDirection = 'right',
  delay = 0,
  children,
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  const springProps = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView
      ? 'translate3d(0, 0, 0)'
      : `translate3d(${
          fromDirection === 'left'
            ? '-100%'
            : fromDirection === 'right'
            ? '100%'
            : '0'
        }, 0, 0)`,
    config: {
      duration: 1000,
      delay: inView ? delay : 0,
    },
  });

  return (
    <animated.div ref={ref} style={springProps}>
      {children}
    </animated.div>
  );
};

export default AnimatedOnScroll;
