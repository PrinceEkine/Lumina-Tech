import {useEffect} from 'react';

/**
 * Adds an IntersectionObserver that toggles the `.in` class on every
 * `.reveal` element as it scrolls into view. Runs once on mount.
 */
export function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      },
      {threshold: 0.15, rootMargin: '0px 0px -60px 0px'},
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}
