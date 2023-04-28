import { useState, useEffect } from "react";
import debounce from "lodash/debounce";

export const TABLET_SCREEN_WIDTH = 900;
export const MOBILE_SCREEN_WIDTH = 650;


export function useWindowDimension() {
  const [dimension, setDimension] = useState([
    0,
    0,
  ]);
  useEffect(() => {
    setDimension([window.innerWidth, window.innerHeight]);
    const debouncedResizeHandler = debounce(() => {
      setDimension([window.innerWidth, window.innerHeight]);
    }, 100); // 100ms
    window.addEventListener("resize", debouncedResizeHandler);

    return () => window.removeEventListener("resize", debouncedResizeHandler);
  }, []); // Note this empty array. this effect should run only on mount and unmount

  return {
    dimension,
    isMobile: dimension[0] < MOBILE_SCREEN_WIDTH,
    isTablet: dimension[0] < TABLET_SCREEN_WIDTH && dimension[0] > MOBILE_SCREEN_WIDTH
  };
}