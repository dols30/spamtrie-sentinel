import { ArrowUpRight, Fingerprint, ScanText } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TrieVisualizer from '@/components/TrieVisualizer';
import Reveal from '@/components/Reveal';
const About = () => (
  <div className="site-shell">
    <Header />
    <main id="main" className="page-main page-width">
      <div className="page-heading about-intro">
        <h1>A second look.<br /><span>Built on understanding.</span></h1>
        <p>SpamTrie checks messages for known spam words and suspicious patterns, then shows you what it found.</p>
        <Link className="button-primary" to="/#detector">Check a message <ArrowUpRight size={16} /></Link>
      </div>
      <div className="about-body">
        <Reveal><section id="how-it-works" className="about-feature">
          <div><ScanText size={31} strokeWidth={1.3} /><h2>Small patterns.<br />Useful signals.</h2></div>
          <div><p>A trie is a tree of characters. Words with the same prefix share a path, so the detector can look up known spam words one character at a time.</p><p>SpamTrie combines those matches with signals such as suspicious links, money amounts, and common phishing phrases. The result includes matched words and category scores.</p><div className="about-trie"><TrieVisualizer highlightedWords={['free', 'prize', 'verify']} /></div></div>
        </section></Reveal>
        <Reveal><section id="privacy" className="about-feature">
          <div><Fingerprint size={31} strokeWidth={1.3} /><h2>On your device.<br />In your control.</h2></div>
          <div><p>Message analysis runs entirely in your browser. Messages are not uploaded to a server for checking.</p><p>This browser stores your statistics and a preview of your latest 100 checks. You can export or clear that history from the dashboard.</p><Link className="text-link" to="/dashboard">View Dashboard <ArrowUpRight size={14} /></Link></div>
        </section></Reveal>
        <Reveal><section className="about-limits"><h2>A useful check. A human decision.</h2><p>SpamTrie uses a fixed set of English keywords and patterns. Its signal score is a heuristic, not a measured probability or a guarantee. Legitimate messages can be flagged, and unfamiliar scams can be missed. Check the sender and destination before opening links or sharing information.</p></section></Reveal>
      </div>
    </main>
    <Footer />
  </div>
);
export default About;
