import { useEffect, useState, useRef } from 'react';

function useSectionScroll(classNames: string[], navHeightVh = 5, cooldownMs = 1000) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isScrolling = useRef(false);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      // Jeśli cooldown aktywny — ignorujemy
      if (isScrolling.current) return;

      // Uruchamiamy cooldown
      isScrolling.current = true;
      setTimeout(() => {
        isScrolling.current = false;
      }, cooldownMs);

      // Określenie kierunku scrolla
      if (e.deltaY > 0 && currentIndex < classNames.length - 1) {
        setCurrentIndex((i) => i + 1);
      } else if (e.deltaY < 0 && currentIndex > 0) {
        setCurrentIndex((i) => i - 1);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [currentIndex, classNames.length, cooldownMs]);

  useEffect(() => {
    const navHeightPx = window.innerHeight * (navHeightVh / 100);
    const target = document.querySelector(`.${classNames[currentIndex]}`) as HTMLElement | null;

    if (target) {
      const sectionTop = target.offsetTop - navHeightPx;
      window.scrollTo({ top: sectionTop, behavior: 'smooth' });
    }
  }, [currentIndex, classNames, navHeightVh]);

  return currentIndex;
}

export default useSectionScroll;
