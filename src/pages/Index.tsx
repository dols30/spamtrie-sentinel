import { ArrowUpRight, ChevronRight, Fingerprint, ScanText } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SpamDetector from '@/components/SpamDetector';
import Reveal from '@/components/Reveal';
const Index = () => (
  <div className="site-shell">
    <Header />
    <main id="main">
      <section className="hero page-width">
        <div className="hero-copy">
          <p className="hero-eyebrow">SpamTrie Sentinel</p>
          <h1>Think before<br /><span>you click.</span></h1>
          <p className="hero-description">A second look at suspicious messages.<br className="desktop-break" /> A little more peace of mind.</p>
          <div className="hero-actions">
            <a className="button-primary" href="#detector">Check a message <ArrowUpRight size={17} /></a>
            <Link className="text-link" to="/about">How it works <ChevronRight size={16} /></Link>
          </div>
        </div>
        <div className="hero-art">
          <img src="/images/sentinel-shield.webp" alt="A sculpted silver and glass shield with an embossed checkmark" width="1000" height="1000" loading="eager" />
        </div>
      </section>
      <section id="detector" className="detector-section page-width" aria-labelledby="detector-heading">
        <Reveal><SpamDetector /></Reveal>
      </section>
      <section className="principles-section page-width" aria-labelledby="principles-heading">
        <Reveal>
          <h2 id="principles-heading">Less doubt.<br /><span>More understanding.</span></h2>
          <div className="principles-grid">
            <article className="principle privacy-principle">
              <Fingerprint size={36} strokeWidth={1.3} />
              <div><h3>Your message stays yours.</h3><p>Checks run on your device. Your analysis history is saved only in this browser.</p><Link className="text-link" to="/about#privacy">About your privacy <ChevronRight size={15} /></Link></div>
            </article>
            <article className="principle matching-principle">
              <ScanText size={36} strokeWidth={1.3} />
              <div><h3>See what raised the flag.</h3><p>Matched words and suspicious patterns make every result easier to understand.</p><Link className="text-link" to="/about#how-it-works">Explore the detector <ChevronRight size={15} /></Link></div>
            </article>
          </div>
        </Reveal>
      </section>
    </main>
    <Footer />
  </div>
);
export default Index;
