import { useState, useEffect } from 'react';
import { Calendar, Search, ArrowRight, Star } from 'lucide-react';
import { getBlogPosts } from '../cms';
import { BlogPost } from '../types';

const categories = ['All', 'Faith & Spirituality', 'Community', 'Wellness', 'Events', 'Testimonies'];

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<BlogPost | null>(null);

  useEffect(() => {
    setPosts(getBlogPosts().filter(p => p.published));
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const filtered = posts.filter(p => {
    const matchCat = filter === 'All' || p.category === filter;
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const [featured, ...rest] = filtered;

  const categoryEmojis: Record<string, string> = {
    'Faith & Spirituality': '✦',
    'Community': '🌍',
    'Wellness': '🌸',
    'Events': '📅',
    'Testimonies': '💜',
  };

  if (selected) {
    return (
      <main>
        <section className="page-hero" style={{ background: 'linear-gradient(135deg, var(--purple-950), var(--purple-700))', minHeight: '40vh' }} aria-labelledby="article-heading">
          <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '800px' }}>
            <span className="hero-eyebrow" style={{ marginBottom: '0.75rem' }}><Star size={16} style={{ display: 'inline' }} /> {selected.category} <Star size={16} style={{ display: 'inline' }} /></span>
            <h1 id="article-heading" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', marginTop: '0.5rem' }}>{selected.title}</h1>
            <p style={{ marginTop: '0.75rem', color: 'rgba(255,255,255,0.7)', display: 'flex', justifyContent: 'center', gap: '1rem', fontSize: '0.9rem' }}>
              <span>By {selected.author}</span>
              <span>•</span>
              <span>{new Date(selected.date).toLocaleDateString('en-NG', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </p>
          </div>
        </section>
        <section className="section">
          <div className="container" style={{ maxWidth: '760px' }}>
            <button onClick={() => setSelected(null)} className="btn btn-outline btn-sm" style={{ marginBottom: '2rem' }}>
              ← Back to Blog
            </button>
            <div
              style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem', color: 'var(--text-mid)', lineHeight: 1.9 }}
              dangerouslySetInnerHTML={{ __html: selected.content }}
            />
            <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--purple-100)' }}>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>
                Written by <strong style={{ color: 'var(--purple-700)' }}>{selected.author}</strong> · {selected.category}
              </p>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      {/* ── HERO ── */}
      <section className="page-hero" style={{ background: 'linear-gradient(135deg, var(--purple-900), var(--purple-600))' }} aria-labelledby="blog-page-heading">
        <div style={{ position: 'absolute', fontSize: '18rem', opacity: 0.05, top: '50%', left: '50%', transform: 'translate(-50%,-50%)', lineHeight: 1, color: 'var(--purple-400)' }} aria-hidden="true"><Star size={220} /></div>
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <span className="hero-eyebrow"><Star size={16} style={{ display: 'inline' }} /> Words of Life <Star size={16} style={{ display: 'inline' }} /></span>
          <h1 id="blog-page-heading" style={{ marginTop: '0.5rem' }}>Blog &amp; Articles</h1>
          <p>Inspiration, insights, and devotionals to nourish your soul</p>
        </div>
      </section>

      {/* ── FILTERS ── */}
      <section style={{ background: 'white', borderBottom: '1px solid var(--purple-100)', padding: '1.25rem 0', position: 'sticky', top: '70px', zIndex: 100 }}>
        <div className="container">
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
              <Search size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
              <input
                type="search"
                className="form-input"
                placeholder="Search articles…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ paddingLeft: '2.5rem' }}
                aria-label="Search blog articles"
                id="blog-search"
              />
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`amount-btn${filter === cat ? ' active' : ''}`}
                  aria-pressed={filter === cat}
                  id={`blog-filter-${cat.replace(/[^a-z0-9]/gi, '-').toLowerCase()}`}
                >
                  {cat !== 'All' ? `${categoryEmojis[cat] || ''} ` : ''}{cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {/* Featured post */}
          {featured && (
            <article
              className="fade-up"
              style={{
                background: 'white',
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-md)',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                marginBottom: '4rem',
                cursor: 'pointer',
                transition: 'all 0.4s ease',
              }}
              onClick={() => setSelected(featured)}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = 'var(--shadow-lg)')}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = 'var(--shadow-md)')}
              aria-label={`Read featured article: ${featured.title}`}
            >
              <div style={{ background: 'var(--grad-purple)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '8rem', minHeight: '300px' }} aria-hidden="true">🌸</div>
              <div style={{ padding: '3rem 2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1rem' }}>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <span className="badge" style={{ background: 'var(--purple-700)', color: 'white' }}>Featured</span>
                  <span className="badge">{featured.category}</span>
                </div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontWeight: 600, color: 'var(--text-dark)', lineHeight: 1.3 }}>{featured.title}</h2>
                <p style={{ color: 'var(--text-mid)', lineHeight: 1.7 }}>{featured.excerpt}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-light)' }}>
                  <Calendar size={13} />
                  {new Date(featured.date).toLocaleDateString('en-NG', { year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
                <span className="blog-read-more" style={{ marginTop: '0.5rem' }}>Read Full Article <ArrowRight size={14} /></span>
              </div>
            </article>
          )}

          {/* Rest of posts */}
          {rest.length > 0 && (
            <div className="grid-3">
              {rest.map((post, i) => (
                <article
                  key={post.id}
                  className="blog-card fade-up"
                  style={{ cursor: 'pointer', animationDelay: `${i * 0.1}s` }}
                  onClick={() => setSelected(post)}
                  aria-label={`Read article: ${post.title}`}
                >
                  <div className="blog-card-img">
                    <span aria-hidden="true">{categoryEmojis[post.category] || '🌸'}</span>
                  </div>
                  <div className="blog-card-body">
                    <div className="blog-card-meta">
                      <span className="badge">{post.category}</span>
                      <span>•</span>
                      <span><Calendar size={12} style={{ display: 'inline', verticalAlign: 'middle' }} /> {new Date(post.date).toLocaleDateString('en-NG', { month: 'short', day: 'numeric' })}</span>
                    </div>
                    <h3 className="blog-card-title">{post.title}</h3>
                    <p className="blog-card-excerpt">{post.excerpt}</p>
                    <span className="blog-read-more">Read Article <ArrowRight size={14} /></span>
                  </div>
                </article>
              ))}
            </div>
          )}

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '5rem', color: 'var(--text-light)' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🌸</div>
              <p>No articles found. Check back soon for new content!</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
