import { useEffect, useState } from 'react';

// ----------------------------------------------------------------------

export function useOffSetTop(top: any) {
  const [offsetTop, setOffSetTop] = useState(false);
  const isTop = top || 100;

  useEffect(() => {
    window.onscroll = () => {
      if (window.pageYOffset > isTop) {
        setOffSetTop(true);
      } else {
        setOffSetTop(false);
      }
    };
    return () => {
      window.onscroll = null;
    };
  }, [isTop]);

  return offsetTop;
}

// Usage
// const offset = useOffSetTop(100);
