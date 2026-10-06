import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
const RouteScroll = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) { window.scrollTo({ top: 0, behavior: 'instant' }); return; }
    let cancelled = false;
    let attempts = 0;
    let frame = 0;
    const findAnchor = () => {
      if (cancelled) return;
      const element = document.getElementById(hash.slice(1));
      if (element) element.scrollIntoView({ behavior: 'instant' });
      else if (attempts++ < 30) frame = requestAnimationFrame(findAnchor);
    };
    frame = requestAnimationFrame(findAnchor);
    return () => { cancelled = true; cancelAnimationFrame(frame); };
  }, [pathname, hash]);
  return null;
};
export default RouteScroll;
