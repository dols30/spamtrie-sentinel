import { useState } from 'react';
import { Shield, Menu, X, ArrowUpRight } from 'lucide-react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'About', href: '/about' },
];
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <div className="header-inner page-width">
          <Link to="/" className="wordmark" aria-label="SpamTrie home" onClick={() => setMenuOpen(false)}>
            <Shield size={22} strokeWidth={1.7} /><span>SpamTrie</span>
          </Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            {navItems.map(item => <NavLink key={item.href} to={item.href} end>{item.label}</NavLink>)}
          </nav>
          <div className="header-actions">
            <Link className="nav-cta" to={location.pathname === '/' ? '/#detector' : '/'}>Check a message <ArrowUpRight size={14} /></Link>
            <ThemeToggle />
            <button className="icon-button menu-toggle" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="mobile-nav" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </div>
        {menuOpen && <nav id="mobile-nav" className="mobile-nav page-width" aria-label="Mobile navigation">
          {navItems.map(item => <NavLink key={item.href} to={item.href} end onClick={() => setMenuOpen(false)}>{item.label}</NavLink>)}
        </nav>}
      </header>
    </>
  );
};
export default Header;
