import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, ChevronDown, Heart, Star, Flower, Globe } from 'lucide-react';

// Import hero images
import hero1 from '../../contents/1.jpg';
import hero2 from '../../contents/2.jpg';
import hero3 from '../../contents/3.jpg';
import hero4 from '../../contents/4.jpg';
import hero5 from '../../contents/5.jpg';
import hero6 from '../../contents/6.jpg';

const heroSlides = [
  { img: hero1, title: 'Walk in Your', em: 'Purpose', tagline: 'Transforming lives from the inside out' },
  { img: hero2, title: 'Love That', em: 'Heals', tagline: 'A community rooted in faith and compassion' },
  { img: hero3, title: 'Rise Into Your', em: 'Destiny', tagline: 'Wholistic renewal — body, soul & spirit' },
  { img: hero4, title: 'Together We', em: 'Flourish', tagline: 'Empowering women, families & communities' },
  { img: hero5, title: 'Faith That', em: 'Moves', tagline: 'From vision to reality, one life at a time' },
  { img: hero6, title: 'You Were Made To', em: 'Bloom', tagline: 'Discover the wholistic life you were created for' },
];

const FlowerBg = () => (
  <svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.06, pointerEvents: 'none' }} aria-hidden="true">
    {[...Array(12)].map((_, i) => {
      const x = (i % 4) * 200 + 100;
      const y = Math.floor(i / 4) * 200 + 80;
      return (
        <g key={i} transform={`translate(${x},${y}) scale(${0.4 + Math.random() * 0.3}) rotate(${i * 30})`}>
          <path d="M0,-40 C10,-40,20,-25,15,-15 C25,-22,38,-18,38,-5 C38,8,25,12,15,5 C22,18,18,32,5,35 C-5,38,-18,30,-15,18 C-22,28,-38,22,-38,8 C-38,-8,-25,-15,-15,-8 C-18,-22,-12,-40,0,-40Z" fill="#9b45b8"/>
          <circle cx="0" cy="0" r="10" fill="#d49ce6"/>
        </g>
      );
    })}
  </svg>
);

const stats = [
  { number: '5,000+', label: 'Lives Touched', icon: 'heart' },
  { number: '12+', label: 'Years of Ministry', icon: 'star' },
  { number: '200+', label: 'Events Hosted', icon: 'flower' },
  { number: '30+', label: 'Partner Nations', icon: 'globe' },
];

export default function Home() {
  const [slideIdx, setSlideIdx] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const sectionRefs = useRef<HTMLElement[]>([]);

  // Auto-advance slider
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setSlideIdx(p => (p + 1) % heroSlides.length);
    }, 5000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const goTo = (i: number) => {
    setSlideIdx(i);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setSlideIdx(p => (p + 1) % heroSlides.length);
    }, 5000);
  };

  // Intersection observer for fade-up
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.15 });
    document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <main>
      {/* ── HERO SLIDER ── */}
      <section className="hero-slider" aria-label="Hero image slideshow">
        {heroSlides.map((slide, i) => (
          <div key={i} className={`hero-slide${i === slideIdx ? ' active' : ''}`} aria-hidden={i !== slideIdx}>
            <img src={slide.img} alt={`${slide.title} ${slide.em}`} className="hero-img" />
          </div>
        ))}
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="hero-eyebrow"><Star size={16} style={{ display: 'inline' }} /> The Wholistic Outreach Ministry <Star size={16} style={{ display: 'inline' }} /></p>
          <h1 className="hero-title" key={slideIdx}>
            {heroSlides[slideIdx].title} <em>{heroSlides[slideIdx].em}</em>
          </h1>
          <p className="hero-tagline">{heroSlides[slideIdx].tagline}</p>
          <div className="hero-actions">
            <Link to="/about" className="btn btn-white btn-lg">Discover Our Story</Link>
            <Link to="/donate" className="btn btn-primary btn-lg"><Heart size={18} style={{ display: 'inline', marginRight: '0.5rem' }} /> Give Today</Link>
          </div>
        </div>
        <div className="hero-indicators" role="tablist" aria-label="Slide navigation">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              className={`hero-dot${i === slideIdx ? ' active' : ''}`}
              onClick={() => goTo(i)}
              role="tab"
              aria-selected={i === slideIdx}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
        {/* Scroll indicator */}
        <a href="#stats" style={{ position: 'absolute', bottom: '4.5rem', left: '50%', transform: 'translateX(-50%)', color: 'rgba(255,255,255,0.6)', animation: 'floatFlower 2s ease-in-out infinite', zIndex: 3 }} aria-label="Scroll down">
          <ChevronDown size={28} />
        </a>
      </section>

      <section className="stats-bar" id="stats" aria-label="Ministry statistics">
        <div className="container">
          <div className="stats-grid">
            {stats.map((s, i) => {
              const iconMap: Record<string, JSX.Element> = {
                'heart': <Heart size={28} />,
                'star': <Star size={28} />,
                'flower': <Flower size={28} />,
                'globe': <Globe size={28} />,
              };
              return (
              <div key={i} className="stat-item fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <span className="stat-icon" aria-hidden="true" style={{ color: 'var(--purple-600)' }}>{iconMap[s.icon]}</span>
                <span className="stat-number">{s.number}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ); })}
          </div>
        </div>
      </section>

      {/* ── ABOUT SNIPPET ── */}
      <section className="section" aria-labelledby="about-heading" style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-60px', right: '-80px', fontSize: '20rem', opacity: 0.03, transform: 'rotate(20deg)', lineHeight: 1, userSelect: 'none' }} aria-hidden="true">🌸</div>
        <div style={{ position: 'absolute', bottom: '-40px', left: '-60px', fontSize: '15rem', opacity: 0.04, transform: 'rotate(-15deg)', lineHeight: 1, userSelect: 'none' }} aria-hidden="true">🌺</div>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }} className="about-section-grid">
            <div className="fade-up">
              <span className="section-label">Who We Are</span>
              <h2 className="section-title" id="about-heading">A Ministry of<br /><em style={{ fontStyle: 'italic', color: 'var(--purple-600)' }}>Love & Wholeness</em></h2>
              <div className="divider" />
              <p style={{ fontSize: '1.05rem', color: 'var(--text-mid)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                The Wholistic Outreach is a Spirit-led ministry dedicated to transforming lives through the power of God's love. We serve women, families, and communities across Nigeria and beyond — bringing healing, empowerment, and divine purpose to every heart we touch.
              </p>
              <p style={{ fontSize: '1rem', color: 'var(--text-mid)', lineHeight: 1.8, marginBottom: '2rem' }}>
                From powerful conferences and prayer nights to community outreach and counseling, every programme is designed to address the whole person — spirit, soul, and body.
              </p>
              <Link to="/about" className="btn btn-primary">Discover Our Story <ArrowRight size={16} /></Link>
            </div>
            <div className="fade-up" style={{ position: 'relative' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {[hero2, hero3, hero4, hero5].map((img, i) => (
                  <div key={i} style={{
                    borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden',
                    height: i === 0 ? '280px' : i === 1 ? '200px' : i === 2 ? '200px' : '280px',
                    transform: `translateY(${i % 2 === 0 ? '0' : '20px'})`,
                    boxShadow: 'var(--shadow-md)'
                  }}>
                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
              {/* Decorative petal */}
              <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '100px', height: '100px', background: 'var(--purple-100)', borderRadius: '50%', zIndex: -1 }} aria-hidden="true" />
              <div style={{ position: 'absolute', bottom: '-20px', left: '-20px', width: '70px', height: '70px', background: 'var(--rose-100)', borderRadius: '50%', zIndex: -1 }} aria-hidden="true" />
            </div>
          </div>
        </div>
      </section>



      {/* ── DONATE CTA ── */}
      <section className="section" style={{ background: 'var(--purple-950)', position: 'relative', overflow: 'hidden' }} aria-labelledby="donate-cta">
        <FlowerBg />
        <div className="container text-center" style={{ position: 'relative', zIndex: 2 }}>
          <span className="section-label" style={{ color: 'var(--purple-300)' }}>Make a Difference</span>
          <h2 className="section-title light" id="donate-cta" style={{ marginBottom: '1.25rem' }}>
            Your Giving Changes <em style={{ fontStyle: 'italic', color: 'var(--purple-300)' }}>Everything</em>
          </h2>
          <p className="section-subtitle light" style={{ margin: '0 auto 2.5rem', maxWidth: 560 }}>
            Every gift — however small — enables us to reach more lives, host more events, and build stronger communities. Give today and be part of the transformation.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/donate" className="btn btn-gold btn-lg"><Heart size={18} style={{ display: 'inline', marginRight: '0.5rem' }} /> Give Now</Link>
            <Link to="/contact" className="btn btn-white btn-lg">Become a Partner</Link>
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="newsletter-section" aria-labelledby="newsletter-heading">
        <div className="container text-center">
          <span className="section-label">Stay Connected</span>
          <h2 className="section-title" id="newsletter-heading" style={{ marginBottom: '0.75rem' }}>
            Join Our Community
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto 2rem' }}>
            Subscribe to receive updates on events, devotionals, and ministry news.
          </p>
          <form
            className="newsletter-form"
            onSubmit={e => { e.preventDefault(); alert('Thank you for subscribing! 💜'); }}
            aria-label="Newsletter subscription form"
          >
            <input
              type="email"
              className="form-input"
              placeholder="Your email address"
              required
              aria-label="Email address for newsletter"
              id="newsletter-email"
              name="email"
            />
            <button type="submit" className="btn btn-primary">Subscribe</button>
          </form>
        </div>
      </section>
    </main>
  );
}
