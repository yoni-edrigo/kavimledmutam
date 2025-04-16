import { useSpring, animated } from 'react-spring';
import { useInView } from 'react-intersection-observer';
import React, { ReactNode } from 'react';

interface ScaledOnScrollProps {
  children: ReactNode;
  scaleValue?: number; // Optional scale value (default is 1)
}

export const ScaledOnScroll: React.FC<ScaledOnScrollProps> = ({
  children,
  scaleValue = 1,
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  const springProps = useSpring({
    scale: inView ? 1 : scaleValue,
    config: { duration: 500 },
    delay: inView ? 100 : 0,
  });

  return (
    <animated.div
      ref={ref}
      style={{ transform: springProps.scale.interpolate((s) => `scale(${s})`) }}
    >
      {children}
    </animated.div>
  );
};
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
    opacity: inView ? 1 : 0.3,
    transform: inView ? 'translate3d(0, 0, 0)' : 'translate3d(0, 30%, 0)', // Fade in from bottom
    config: { duration: 600 },
    delay: inView ? index * 40 : 0, // Stagger the delay based on the index
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
            ? '-60%'
            : fromDirection === 'right'
            ? '60%'
            : '0'
        }, 0, 0)`,
    config: {
      duration: 1500,
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
