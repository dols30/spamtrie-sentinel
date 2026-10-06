import { useEffect, useState } from 'react';
import { spamTrie } from '@/utils/trieStructure';
export const useSpamStatistics = () => {
  const [stats, setStats] = useState(() => ({ ...spamTrie.getStatistics() }));
  useEffect(() => {
    const refresh = () => setStats({ ...spamTrie.getStatistics() });
    window.addEventListener('spamtrie:statistics', refresh);
    return () => window.removeEventListener('spamtrie:statistics', refresh);
  }, []);
  return stats;
};
