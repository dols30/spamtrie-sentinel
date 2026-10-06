import { AlertTriangle, ShieldCheck } from 'lucide-react';
import { categoryLabels, type AnalysisResult } from '@/lib/analysis';
import TrieVisualizer from './TrieVisualizer';
const ResultCard = ({ result }: { result: AnalysisResult }) => {
  const detectedWords = [...new Set(result.detectedWords)];
  const escaped = [...detectedWords].sort((a, b) => b.length - a.length).map(word => word.replace(/[.*+?^$}{()|[\]\\]/g, '\\$&'));
  const parts = escaped.length ? result.text.split(new RegExp('(\\b(?:' + escaped.join('|') + ')\\b)', 'gi')) : [result.text];
  const matches = new Set(detectedWords.map(word => word.toLowerCase()));
  return (
    <div className={'analysis-result ' + (result.isSpam ? 'is-spam' : 'is-clear')}>
      <div className="result-topline"><span className="result-label">Analysis complete</span>{result.isSpam ? <AlertTriangle size={21} strokeWidth={1.6} /> : <ShieldCheck size={21} strokeWidth={1.6} />}</div>
      <h3>{result.isSpam ? 'Worth a closer look.' : 'No spam detected.'}</h3>
      <p className="result-description">{result.isSpam ? (categoryLabels[result.primaryCategory] || 'Spam') + ' signals found in this message.' : 'No strong spam signals were found in this message.'}</p>
      <div className="signal-score"><strong>{result.confidence}<span>%</span></strong><span>Spam signal strength</span></div>
      <div className="matched-words"><h4>{detectedWords.length ? 'What raised the flag' : 'No suspicious matches'}</h4><div className="word-tags">{detectedWords.slice(0, 8).map(word => <span key={word}>{word}</span>)}{detectedWords.length > 8 && <span>+{detectedWords.length - 8} more</span>}</div></div>
      <details className="result-details"><summary>See the breakdown</summary><div className="result-detail-content">
        <p className="highlighted-message">{parts.map((part, index) => matches.has(part.toLowerCase()) ? <mark key={index}>{part}</mark> : part)}</p>
        {Object.entries(result.detectedCategories).filter(([, score]) => score > 0).map(([category, score]) => <div className="category-score" key={category}><span>{categoryLabels[category] || category}</span><strong>{score.toFixed(1)}</strong></div>)}
        {detectedWords.length > 0 && <TrieVisualizer highlightedWords={detectedWords} />}
      </div></details>
      <p className="result-caveat">Pattern-based guidance. Always check the sender.</p>
    </div>
  );
};
export default ResultCard;
