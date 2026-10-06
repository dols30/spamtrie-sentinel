import { useState } from 'react';
import { Download, History, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StatisticsPanel from '@/components/StatisticsPanel';
import { useSpamStatistics } from '@/hooks/use-spam-statistics';
import { spamTrie } from '@/utils/trieStructure';
import { categoryLabels } from '@/lib/analysis';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

const Dashboard = () => {
  const stats = useSpamStatistics();
  const [filter, setFilter] = useState('all');
  const history = stats.history.filter(item => filter === 'all' || (filter === 'spam' ? item.isSpam : !item.isSpam));

  const exportHistory = () => {
    const blob = new Blob([JSON.stringify(stats, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `spamtrie-history-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <div className="site-shell">
      <Header />
      <main id="main" className="page-main page-width">
        <div className="page-heading dashboard-heading">
          <div><h1>Your second looks.</h1><p>A clear view of the messages you've checked.</p></div>
          <button className="button-secondary" disabled={!stats.totalMessages} onClick={exportHistory}><Download size={14} />Export history</button>
        </div>
        <StatisticsPanel />
        <section className="history-section" aria-labelledby="history-heading">
          <div className="history-header"><h2 id="history-heading">Recent checks</h2><select className="history-filter" aria-label="Filter message history" value={filter} onChange={event => setFilter(event.target.value)}><option value="all">All messages</option><option value="spam">Spam detected</option><option value="clear">No spam detected</option></select></div>
          {history.length > 0 ? <div className="history-list">{history.map((item, index) => <details className="history-item" key={`${item.timestamp}-${index}`}>
            <summary><span className="history-preview">{item.text}</span><span className="history-metadata"><span className={`status-tag ${item.isSpam ? 'spam' : ''}`}>{item.isSpam ? categoryLabels[item.category] || 'Spam' : 'No spam'}</span><time dateTime={new Date(item.timestamp).toISOString()}>{new Date(item.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</time><ChevronDown size={13} /></span></summary>
            <div className="history-detail"><p>{item.text}</p><div className="word-tags">{[...new Set(item.detectedWords)].map(word => <span key={word}>{word}</span>)}</div><small>{item.confidence}% spam signal strength. {new Date(item.timestamp).toLocaleString()}</small></div>
          </details>)}</div> : <div className="analytics-panel dashboard-empty"><History size={30} strokeWidth={1.3} /><h3>{stats.totalMessages ? 'No matching messages.' : 'Your history starts here.'}</h3><p>{stats.totalMessages ? 'Choose another filter to see your checks.' : 'Check a message and come back for the full picture.'}</p>{!stats.totalMessages && <Link className="text-link" to="/#detector">Check a message</Link>}</div>}
        </section>
        <div className="dashboard-note"><span>History is stored in this browser. The latest 100 checks are kept.</span>
          <AlertDialog><AlertDialogTrigger asChild><button className="reset-button" disabled={!stats.totalMessages}>Clear history</button></AlertDialogTrigger><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Clear your analysis history?</AlertDialogTitle><AlertDialogDescription>This removes all saved checks and statistics from this browser.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Keep history</AlertDialogCancel><AlertDialogAction onClick={() => spamTrie.clearStatistics()}>Clear history</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog>
        </div>
      </main>
      <Footer />
    </div>
  );
};
export default Dashboard;
