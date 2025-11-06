import { useState, useEffect, RefObject } from 'react';

export const useScrollPosition = (
  threshold: number = 10,
  elementRef?: RefObject<HTMLElement | null> 
): boolean => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = elementRef?.current ? elementRef.current.scrollTop : window.scrollY;
      
      if (scrollTop > threshold) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    if (elementRef?.current) {
      // Nếu có elementRef, lắng nghe scroll của element đó
      const element = elementRef.current;
      element.addEventListener('scroll', handleScroll);
      return () => element.removeEventListener('scroll', handleScroll);
    } else {
      // Nếu không có elementRef, lắng nghe scroll của window
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [threshold, elementRef]);

  return isScrolled;
};