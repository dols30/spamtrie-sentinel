import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
const NotFound = () => (
  <div className="site-shell"><Header /><main id="main" className="not-found page-width"><h1>Page not found.</h1><p>This link doesn't lead to a page on SpamTrie.</p><Link className="button-primary" to="/">Return to Home</Link></main><Footer /></div>
);
export default NotFound;
