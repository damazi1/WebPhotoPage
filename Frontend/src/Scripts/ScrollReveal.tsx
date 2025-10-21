/** Ujawnia elementy z klasą .scroll-reveal, gdy wchodzą w viewport */
import { useEffect} from 'react';

export function useScrollReveal(threshold: number = 0.8) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target); // tylko raz
          }
        });
      },
      { threshold }
    );

    const targets = document.querySelectorAll(".scroll-reveal");
    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [threshold]);
}

export default useScrollReveal;