import { ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

type PortalProps = {
  children: ReactNode;
};

function Portal(props: PortalProps) {
  const ref = useRef<Element | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector<HTMLElement>('.portal-root');
    setMounted(true);
  }, []);
  return mounted && ref.current
    ? createPortal(
        <div className="absolute right-96 top-[22rem] hidden md:block">
          {props.children}
        </div>,
        ref.current
      )
    : null;
}
export default Portal;
/* fixed left-0 top-0 z-50 block h-full w-full overflow-auto */
