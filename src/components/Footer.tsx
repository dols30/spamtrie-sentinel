import { Link } from 'react-router-dom';
const Footer = () => (
  <footer className="site-footer page-width">
    <p>SpamTrie Sentinel © {new Date().getFullYear()}</p>
    <div><span>Made for a second look.</span><Link to="/about">About SpamTrie</Link></div>
  </footer>
);
export default Footer;
