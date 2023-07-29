import { useEffect, useState } from 'react';

const MOBILE_WIDTH = 380;
const BIGMOBILE_WIDTH = 680;
const TABLET_WIDTH = 768;
const BIGTABLET_WIDTH = 1200;

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
  const isBigMobile = width > MOBILE_WIDTH && width <= BIGMOBILE_WIDTH;
  const isTablet = width > BIGMOBILE_WIDTH && width <= TABLET_WIDTH;
  const isBigTablet = width > TABLET_WIDTH && width <= BIGTABLET_WIDTH;
  const isDesktop = width > TABLET_WIDTH;

  return {
    isMobile,
	isBigMobile,
    isTablet,
	isBigTablet,
    isDesktop,
  }
}

export default useDevice;