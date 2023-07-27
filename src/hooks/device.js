import { useEffect, useState } from 'react';

const MOBILE_WIDTH = 380;
const TABLET_WIDTH = 768;

const useDevice = () => {
  const [width, setWidth] = useState(window.innerWidth);

  function handleWindowSizeChange() {
      setWidth(window.innerWidth);
  }

  useEffect(() => {
      window.addEventListener('resize', handleWindowSizeChange);
      return () => {
          window.removeEventListener('resize', handleWindowSizeChange);
      }
  }, []);

  const isMobile = width <= MOBILE_WIDTH;
  const isTablet = width > MOBILE_WIDTH && width <= TABLET_WIDTH;
  const isDesktop = width > TABLET_WIDTH;

  return {
    isMobile,
    isTablet,
    isDesktop,
  }
}

export default useDevice;