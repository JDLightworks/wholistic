import { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, ArrowRight, Search, Flower, Star } from 'lucide-react';
import { getEvents } from '../cms';
import { Event } from '../types';
import { Link } from 'react-router-dom';

const categories = ['All', 'Conference', 'Prayer', 'Retreat', 'Outreach', 'Workshop'];

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    setEvents(getEvents().filter(e => e.published));
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const filtered = events.filter(e => {
    const matchCat = filter === 'All' || e.category === filter;
    const matchSearch = e.title.toLowerCase().includes(search.toLowerCase()) || e.location.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const formatDateParts = (d: string) => {
    const dt = new Date(d);
    return {
      day: dt.getDate(),
      month: dt.toLocaleString('default', { month: 'short' }),
      year: dt.getFullYear(),
      full: dt.toLocaleDateString('en-NG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
    };
  };

  const upcoming = filtered.filter(e => new Date(e.date) >= new Date());
  const past = filtered.filter(e => new Date(e.date) < new Date());

  return (
    <main>
      {/* ── HERO ── */}
      <section className="page-hero" style={{ background: 'linear-gradient(135deg, var(--purple-950), var(--purple-700))' }} aria-labelledby="events-page-heading">
        <div style={{ position: 'absolute', fontSize: '18rem', opacity: 0.05, top: '50%', left: '50%', transform: 'translate(-50%,-50%)', lineHeight: 1, userSelect: 'none', color: 'var(--purple-400)' }} aria-hidden="true"><Flower size={220} /></div>
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <span className="hero-eyebrow"><Star size={16} style={{ display: 'inline' }} /> Gather With Us <Star size={16} style={{ display: 'inline' }} /></span>
          <h1 id="events-page-heading" style={{ marginTop: '0.5rem' }}>Events &amp; Gatherings</h1>
          <p>Conferences, prayer nights, retreats, outreach — every event is a divine encounter.</p>
        </div>
      </section>

      {/* ── FILTERS ── */}
      <section style={{ background: 'white', borderBottom: '1px solid var(--purple-100)', padding: '1.5rem 0', position: 'sticky', top: '70px', zIndex: 100 }}>
        <div className="container">
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
              <Search size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
              <input
                type="search"
                className="form-input"
                placeholder="Search events…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ paddingLeft: '2.5rem' }}
                aria-label="Search events"
                id="events-search"
              />
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`amount-btn${filter === cat ? ' active' : ''}`}
                  aria-pressed={filter === cat}
                  id={`filter-${cat.toLowerCase()}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── UPCOMING EVENTS ── */}
      <section className="section" aria-labelledby="upcoming-heading">
        <div className="container">
          <div className="fade-up" style={{ marginBottom: '2rem' }}>
            <span className="section-label">Don't Miss Out</span>
            <h2 className="section-title" id="upcoming-heading">Upcoming Events</h2>
          </div>

          {upcoming.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-light)' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📅</div>
              <p>No upcoming events found. Check back soon!</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {upcoming.map((ev, i) => {
                const d = formatDateParts(ev.date);
                return (
                  <article key={ev.id} className="fade-up" style={{
                    background: 'white',
                    borderRadius: 'var(--radius-xl)',
                    boxShadow: 'var(--shadow-sm)',
                    overflow: 'hidden',
                    display: 'grid',
                    gridTemplateColumns: 'auto 1fr',
                    transition: 'all 0.4s ease',
                    animationDelay: `${i * 0.1}s`,
                    border: '1px solid var(--purple-100)',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.boxShadow = 'var(--shadow-lg)')}
                  onMouseLeave={e => (e.currentTarget.style.boxShadow = 'var(--shadow-sm)')}
                  >
                    {/* Date sidebar */}
                    <div style={{
                      width: '120px',
                      background: 'var(--grad-purple)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '2rem 1rem',
                      textAlign: 'center',
                      flexShrink: 0,
                    }}>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', fontWeight: 700, color: 'white', lineHeight: 1 }}>{d.day}</div>
                      <div style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--purple-200)', fontWeight: 600 }}>{d.month}</div>
                      <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', marginTop: '0.25rem' }}>{d.year}</div>
                    </div>
                    {/* Content */}
                    <div style={{ padding: '2rem' }}>
                      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                        <span className="badge">{ev.category}</span>
                      </div>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--text-dark)' }}>{ev.title}</h3>
                      <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.875rem', color: 'var(--text-light)' }}>
                          <Clock size={14} /> {ev.time}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.875rem', color: 'var(--text-light)' }}>
                          <MapPin size={14} /> {ev.location}
                        </span>
                      </div>
                      <p style={{ color: 'var(--text-mid)', lineHeight: 1.7, marginBottom: '1.25rem', fontSize: '0.95rem' }}>{ev.description}</p>
                      <button className="btn btn-primary btn-sm">Register Now <ArrowRight size={14} /></button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── PAST EVENTS ── */}
      {past.length > 0 && (
        <section className="section" style={{ background: 'var(--purple-50)' }} aria-labelledby="past-heading">
          <div className="container">
            <div className="fade-up" style={{ marginBottom: '2rem' }}>
              <span className="section-label">The Journey So Far</span>
              <h2 className="section-title" id="past-heading">Past Events</h2>
            </div>
            <div className="grid-3">
              {past.map((ev, i) => {
                const d = formatDateParts(ev.date);
                return (
                  <article key={ev.id} className="card fade-up" style={{ opacity: 0.85, animationDelay: `${i * 0.1}s` }}>
                    <div style={{ background: 'var(--purple-100)', padding: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                      <div className="event-date-box" style={{ background: 'white' }}>
                        <div className="event-day" style={{ color: 'var(--purple-500)' }}>{d.day}</div>
                        <div className="event-month">{d.month}</div>
                      </div>
                      <div>
                        <span className="badge">{ev.category}</span>
                        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', marginTop: '0.5rem', color: 'var(--text-dark)' }}>{ev.title}</h3>
                      </div>
                    </div>
                    <div style={{ padding: '1.25rem' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', color: 'var(--text-light)', marginBottom: '0.75rem' }}>
                        <MapPin size={13} /> {ev.location}
                      </span>
                      <p style={{ fontSize: '0.875rem', color: 'var(--text-mid)', lineHeight: 1.6 }}>{ev.description.slice(0, 100)}…</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="section" style={{ background: 'var(--purple-950)', textAlign: 'center' }} aria-labelledby="events-cta">
        <div className="container">
          <span className="section-label" style={{ color: 'var(--purple-300)' }}>Stay In The Loop</span>
          <h2 id="events-cta" className="section-title light" style={{ marginBottom: '1rem' }}>Never Miss an Event</h2>
          <p className="section-subtitle light" style={{ margin: '0 auto 2rem' }}>Subscribe to receive early notifications for all upcoming events and gatherings.</p>
          <Link to="/contact" className="btn btn-gold btn-lg">Get Event Alerts</Link>
        </div>
      </section>
    </main>
  );
}
