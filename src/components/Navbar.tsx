import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Menu, Star, Heart } from 'lucide-react';

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/donate', label: 'Donate' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const navClass = `navbar${scrolled ? ' scrolled' : ''}${!isHome ? ' solid' : ''}`;

  return (
    <>
      <nav className={navClass} role="navigation" aria-label="Main navigation">
        <div className="container">
          <div className="nav-inner">
            <Link to="/" className="nav-logo" aria-label="The Wholistic Outreach Home">
              <span className="nav-logo-text"><Star size={20} style={{ display: 'inline', marginRight: '0.3rem' }} />The Wholistic</span>
              <span className="nav-logo-sub">Outreach Ministry</span>
            </Link>

            <ul className="nav-links" role="list">
              {links.map(l => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className={location.pathname === l.to ? 'active' : ''}
                    aria-current={location.pathname === l.to ? 'page' : undefined}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="nav-cta">
              <Link to="/donate" className="btn btn-primary btn-sm">
                <Heart size={16} style={{ display: 'inline', marginRight: '0.4rem' }} /> Give Now
              </Link>
            </div>

            <button
              className="hamburger"
              onClick={() => setMobileOpen(true)}
              aria-label="Open mobile menu"
              aria-expanded={mobileOpen}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <div className="mobile-menu" role="dialog" aria-modal="true" aria-label="Mobile navigation">
          <button
            className="mobile-close"
            onClick={() => setMobileOpen(false)}
            aria-label="Close mobile menu"
          >
            <X size={28} />
          </button>
          {links.map(l => (
            <Link key={l.to} to={l.to}>{l.label}</Link>
          ))}
          <Link to="/donate" className="btn btn-primary" style={{ marginTop: '1rem' }}>
            💜 Give Now
          </Link>
        </div>
      )}
    </>
  );
}
