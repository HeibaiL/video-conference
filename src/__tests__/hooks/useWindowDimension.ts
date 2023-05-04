import { renderHook } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { MOBILE_SCREEN_WIDTH, TABLET_SCREEN_WIDTH, useWindowDimension } from "@/hooks/useWindowDimension";


describe("useWindowDimension", () => {
  
  it("returns proper window width", async () => {
    const randomWidth = Math.random() * 1000;
    window.innerWidth = randomWidth;

    
    const { result } = renderHook(() => useWindowDimension());
    const { dimension: [width] } = result.current;


    expect(width).toEqual(randomWidth);
  });

  it("isMobile and isTablet show true if sreen width is in range", async () => {
    {
      const mobileWidth = MOBILE_SCREEN_WIDTH - 1;
      window.innerWidth = mobileWidth;
    
        
      const { result } = renderHook(() => useWindowDimension());
      const { isMobile } = result.current;
    
    
      expect(isMobile).toEqual(true);
    }
    {
      const tabletWidth = TABLET_SCREEN_WIDTH - 1;
      window.innerWidth = tabletWidth;
      
          
      const { result } = renderHook(() => useWindowDimension());
      const { isTablet } = result.current;
      
      
      expect(isTablet).toEqual(true);
    }

    
  });

  it("isMobile and isTablet show false if sreen width is not in range", async () => {
    {
      const mobileWidth = MOBILE_SCREEN_WIDTH + 1;
      window.innerWidth = mobileWidth;
    
        
      const { result } = renderHook(() => useWindowDimension());
      const { isMobile } = result.current;
    
    
      expect(isMobile).toEqual(false);
    }
    {
      const tabletWidth = TABLET_SCREEN_WIDTH + 1;
      window.innerWidth = tabletWidth;
      
          
      const { result } = renderHook(() => useWindowDimension());
      const { isTablet } = result.current;
      
      
      expect(isTablet).toEqual(false);
    }
  });
});
  