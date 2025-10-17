import { useEffect } from 'react';

function useFastScroll(factor = 3) {
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      window.scrollBy({
        top: e.deltaY * factor,
        left: 0,
        behavior: 'auto' 
      });
      e.preventDefault(); 
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => window.removeEventListener('wheel', handleWheel);
  }, [factor]);
}

export default useFastScroll;
