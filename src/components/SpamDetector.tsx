import { useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, LockKeyhole, ShieldCheck, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { spamTrie, sampleSpamMessages, sampleNormalMessages } from '@/utils/trieStructure';
import { useSpamStatistics } from '@/hooks/use-spam-statistics';
import type { AnalysisResult } from '@/lib/analysis';
import ResultCard from './ResultCard';
const SpamDetector = () => {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const stats = useSpamStatistics();
  const updateText = (text: string) => {
    setInputText(text);
    setResult(null);
    setError('');
  };
  const analyze = () => {
    if (!inputText.trim()) return;
    try {
      setResult({ ...spamTrie.analyzeText(inputText), text: inputText, timestamp: new Date() });
      setError('');
    } catch {
      setError('This message could not be checked. Please try again.');
    }
  };
  const loadExample = (spam: boolean) => {
    const examples = spam ? sampleSpamMessages : sampleNormalMessages;
    updateText(examples[Math.floor(Math.random() * examples.length)]);
    textareaRef.current?.focus({ preventScroll: true });
  };
  return (
    <>
      <div className="detector-heading"><h2 id="detector-heading">Go ahead. Take a second look.</h2><span>No sign-up needed.</span></div>
      <div className="detector-workspace">
        <form className="message-composer" onSubmit={event => { event.preventDefault(); analyze(); }}>
          <div className="composer-label"><label htmlFor="message">Your message</label>{inputText && <button type="button" className="icon-button" aria-label="Clear message" onClick={() => { updateText(''); textareaRef.current?.focus(); }}><X size={17} /></button>}</div>
          <textarea id="message" name="message" ref={textareaRef} value={inputText} onChange={event => updateText(event.target.value)} placeholder="Paste an email, a text, or something that feels a little off…" aria-describedby="message-privacy" onKeyDown={event => {
            if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') { event.preventDefault(); analyze(); }
          }} />
          <div className="example-row"><span>Try an example</span><button type="button" onClick={() => loadExample(true)}>Suspicious <ArrowUpRight size={13} /></button><button type="button" onClick={() => loadExample(false)}>Everyday <ArrowUpRight size={13} /></button></div>
          <div className="composer-bottom"><span className="character-count">{inputText.length.toLocaleString()} characters <kbd>⌘ / Ctrl ↵</kbd></span><button className="button-primary" type="submit" disabled={!inputText.trim()}>Analyze message <ArrowRight size={16} /></button></div>
          {error && <p className="form-error" role="alert">{error}</p>}
          <p id="message-privacy" className="privacy-note"><LockKeyhole size={12} /> Processed on your device. Never uploaded.</p>
        </form>
        <aside className="result-panel" aria-label="Analysis result" aria-live="polite" aria-atomic="true">
          {result ? <ResultCard key={result.timestamp.getTime()} result={result} /> : <div className="result-empty">
            <div className="result-empty-icon"><ShieldCheck size={31} strokeWidth={1.3} /></div>
            <span className="result-label">A little clarity awaits.</span>
            <h3>Your result.<br />Without the guesswork.</h3>
            <p>Check a message to see its spam signals and matched words.</p>
          </div>}
        </aside>
      </div>
      <div className="detector-footnote"><span>{stats.totalMessages > 0 ? `${stats.totalMessages.toLocaleString()} ${stats.totalMessages === 1 ? 'message' : 'messages'} checked in this browser` : 'A fresh perspective on your next message.'}</span><Link className="text-link" to="/dashboard">View Dashboard <ArrowUpRight size={14} /></Link></div>
    </>
  );
};
export default SpamDetector;
