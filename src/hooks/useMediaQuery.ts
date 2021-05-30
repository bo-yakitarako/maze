import { useEffect, useRef, useState } from 'react';

const useMediaQuery = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const resizeTimer = useRef<number | null>(null);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleResize = () => {
    if (resizeTimer.current) {
      clearTimeout(resizeTimer.current);
    }
    resizeTimer.current = window.setTimeout(() => {
      setWindowWidth(window.innerWidth);
    }, 300);
  };

  const isSp = () => windowWidth < 778;
  const isPc = () => !isSp();
  const isSpSmall = () => windowWidth < 448;
  return { windowWidth, isSp, isPc, isSpSmall };
};

export { useMediaQuery };
