import { Link } from 'react-router-dom';
import { Star, Instagram, Facebook, Play, Mail, MapPin, Phone, Heart } from 'lucide-react';

const FlowerSVG = () => (
  <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className="svg-flower" style={{ opacity: 0.07 }} aria-hidden="true">
    <path d="M60 10 C70 10, 80 25, 75 35 C85 28, 100 32, 100 45 C100 58, 85 62, 75 55 C80 68, 70 80, 60 80 C50 80, 40 68, 45 55 C35 62, 20 58, 20 45 C20 32, 35 28, 45 35 C40 25, 50 10, 60 10Z" fill="#9b45b8"/>
    <circle cx="60" cy="45" r="10" fill="#d49ce6"/>
  </svg>
);

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      {/* Decorative flowers */}
      <div style={{ position: 'absolute', top: '2rem', right: '5%' }}>
        <FlowerSVG />
      </div>
      <div style={{ position: 'absolute', bottom: '3rem', left: '3%', transform: 'scale(0.7) rotate(30deg)' }}>
        <FlowerSVG />
      </div>

      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div>
            <div className="footer-brand-name"><Star size={20} style={{ display: 'inline', marginRight: '0.5rem' }} />Wholistic Outreach RCCG</div>
            <p className="footer-desc">
              Empowering lives through love, faith, and community rooted in Matthew 25:34-40. We believe in the wholistic transformation of every person — body, soul, and spirit.
            </p>
            <div className="social-links" role="list" aria-label="Social media links">
              {[
                { label: 'Instagram', icon: <Instagram size={18} />, href: '#' },
                { label: 'Facebook', icon: <Facebook size={18} />, href: '#' },
                { label: 'YouTube', icon: <Play size={18} />, href: '#' },
                { label: 'Twitter/X', icon: <Mail size={18} />, href: '#' },
              ].map(s => (
                <a key={s.label} href={s.href} className="social-link" aria-label={s.label} role="listitem" target="_blank" rel="noopener noreferrer">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="footer-heading">Explore</h3>
            <ul className="footer-links" role="list">
              {[
                { to: '/about', label: 'About Us' },
                { to: '/gallery', label: 'Gallery' },
                { to: '/donate', label: 'Donate' },
              ].map(l => (
                <li key={l.to}><Link to={l.to}>{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h3 className="footer-heading">Get Involved</h3>
            <ul className="footer-links" role="list">
              {[
                { to: '/donate', label: 'Give / Donate' },
                { to: '/contact', label: 'Volunteer' },
                { to: '/contact', label: 'Partner With Us' },
                { to: '/contact', label: 'Prayer Requests' },
              ].map((l, i) => (
                <li key={i}><Link to={l.to}>{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="footer-heading">Contact</h3>
            <ul className="footer-links" style={{ gap: '0.6rem' }}>
              <li style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.875rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <MapPin size={16} />
                <div>
                  <div>Redemption City of God</div>
                  <div>Kilometer 46, Lagos-Ibadan Expressway, Mowe, Ogun State, Nigeria</div>
                </div>
              </li>
              <li style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail size={16} /> wholistic.outreach@yahoo.com
              </li>
              <li style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail size={16} /> hello@wholisticoutreach.org
              </li>
              <li style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Phone size={16} /> 08023621200
              </li>
              <li style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Phone size={16} /> 08141665805
              </li>
              <li style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Phone size={16} /> 08060207832
              </li>
              <li style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Phone size={16} /> 07065839074
              </li>
              <li style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Phone size={16} /> 07042493827
              </li>
              <li style={{ marginTop: '0.5rem' }}>
                <Link to="/contact" className="btn btn-outline btn-sm" style={{ color: 'rgba(255,255,255,0.7)', borderColor: 'rgba(255,255,255,0.3)', fontWeight: 500 }}>
                  Get In Touch
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Wholistic Outreach RCCG. All rights reserved.</p>
          <p>Made with <Heart size={14} style={{ display: 'inline', color: '#f43f5e' }} /> for purpose-driven lives</p>
        </div>
      </div>
    </footer>
  );
}
