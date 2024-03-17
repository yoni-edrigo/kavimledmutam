import { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { useWindowSize } from 'usehooks-ts';

export function TraceableLine({ pathString }: { pathString: string }) {
  const [pathLength, setPathLength] = useState(0);
  const { width = 0, height = 0 } = useWindowSize();
  useEffect(() => {
    const path = document.getElementById('path') as SVGPathElement | null;
    if (path) {
      const length = path.getTotalLength();
      setPathLength(length);
    }
  }, []);

  const [{ scroll }, set] = useSpring(() => ({ scroll: 0 }));

  const handleScroll = () => {
    set({ scroll: window.scrollY });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  const pathProps = useSpring({
    strokeDashoffset: scroll.to((s) => pathLength - s / 0.4),
  });

  return (
    <div style={{ height: 300, zIndex: -1 }}>
      <svg
        width={width}
        height={height}
        // style={{ position: 'absolute', top: '0', left: '0%' }}
        preserveAspectRatio="xMaxYMin slice"
      >
        <animated.path
          id="path"
          d={pathString}
          stroke="#c5dfff"
          //   opacity={0.4}
          strokeWidth="1"
          fill="none"
          strokeDasharray={pathLength}
          strokeDashoffset={pathProps.strokeDashoffset}
          style={{ scale: width / 600 }}
        />
      </svg>
    </div>
  );
}
