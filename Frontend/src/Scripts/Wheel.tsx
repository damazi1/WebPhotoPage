import { useEffect, useState, useRef, useMemo } from 'react';

type SectionConfig = string | { className: string; offset?: number };

type NormalizedSection = {
  className: string;
  offset?: number;
};

function normalizeSections(sections: SectionConfig[]): NormalizedSection[] {
  return sections.map((section) =>
    typeof section === 'string'
      ? { className: section }
      : { className: section.className, offset: section.offset }
  );
}

function useSectionScroll(
  sectionConfigs: SectionConfig[],
  navSelector = '.navbar-app',
  cooldownMs = 1000
) {
  const sections = useMemo(() => normalizeSections(sectionConfigs), [sectionConfigs]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isScrolling = useRef(false);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      if (isScrolling.current) return;

      isScrolling.current = true;
      setTimeout(() => {
        isScrolling.current = false;
      }, cooldownMs);

      if (e.deltaY > 0 && currentIndex < sections.length - 1) {
        setCurrentIndex((i) => i + 1);
      } else if (e.deltaY < 0 && currentIndex > 0) {
        setCurrentIndex((i) => i - 1);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [cooldownMs, currentIndex, sections.length]);

  useEffect(() => {
    const navHeightPx = (() => {
      if (!navSelector) return 0;
      const navElement = document.querySelector(navSelector) as HTMLElement | null;
      return navElement?.getBoundingClientRect().height ?? 0;
    })();

    const targetClass = sections[currentIndex]?.className;
    if (!targetClass) return;

    const target = document.querySelector(`.${targetClass}`) as HTMLElement | null;

    if (target) {
      const computedStyles = window.getComputedStyle(target);
      const marginTop = parseFloat(computedStyles.marginTop) || 0;

      let scrollTarget = target.getBoundingClientRect().top + window.scrollY - navHeightPx;

      const offset = sections[currentIndex]?.offset ?? -marginTop;
      scrollTarget += offset;

      if (currentIndex === 0) {
        scrollTarget = Math.min(scrollTarget, 0);
      }

      window.scrollTo({ top: Math.max(0, scrollTarget), behavior: 'smooth' });
    }
  }, [currentIndex, navSelector, sections]);

  return currentIndex;
}

export default useSectionScroll;
