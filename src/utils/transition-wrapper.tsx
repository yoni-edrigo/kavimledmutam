import { CSSProperties, ReactNode, useRef } from 'react';
import { Transition } from 'react-transition-group';

const duration = 200;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
};

const transitionStyles: Record<string, { opacity: number }> = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};
export function TransitionWrapper(props: {
  inProp: boolean;
  divClassName?: string;
  children: ReactNode;
  style: CSSProperties | undefined;
}) {
  const { inProp, divClassName, children, style } = props;
  const nodeRef = useRef(null);
  return (
    <Transition nodeRef={nodeRef} in={inProp} timeout={duration} unmountOnExit>
      {(state) => (
        <div
          ref={nodeRef}
          style={{
            ...defaultStyle,
            ...transitionStyles[state],
            ...style,
          }}
          className={divClassName}
        >
          {children}
        </div>
      )}
    </Transition>
  );
}
