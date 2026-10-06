import type { spamTrie } from '@/utils/trieStructure';
export type AnalysisResult = ReturnType<typeof spamTrie.analyzeText> & {
  text: string;
  timestamp: Date;
};
export const categoryLabels: Record<string, string> = {
  phishing: 'Phishing',
  financial: 'Financial scam',
  promotional: 'Promotional spam',
  malware: 'Malware',
};
