import { useState, useEffect } from 'react';
import { X, Play, Star, Camera, Flower } from 'lucide-react';

// All gallery images (JPG files that are NOT 1-6.jpg)
const galleryImages = [
  { src: new URL('../../contents/0984619d-55a3-45b1-98e5-1780c22ddc7d.JPG', import.meta.url).href, type: 'image' },
  { src: new URL('../../contents/28fb0847-3cdf-434c-8e4b-22bd5d4d56d0.JPG', import.meta.url).href, type: 'image' },
  { src: new URL('../../contents/2e3b04d8-a98a-432c-a4ad-79efd72b8938.JPG', import.meta.url).href, type: 'image' },
  { src: new URL('../../contents/36e9474e-4eae-48d5-bf64-0804deefac16.JPG', import.meta.url).href, type: 'image' },
  { src: new URL('../../contents/3a4aa9da-3a74-4593-b566-d493499106cc.JPG', import.meta.url).href, type: 'image' },
  { src: new URL('../../contents/3f329ade-008d-4e30-83f3-2bae25ed150b.JPG', import.meta.url).href, type: 'image' },
  { src: new URL('../../contents/4274b56e-8621-4fe5-9b1f-6a548dacef73.JPG', import.meta.url).href, type: 'image' },
  { src: new URL('../../contents/4bdefb8e-1233-4ea0-a67a-269521162982.JPG', import.meta.url).href, type: 'image' },
  { src: new URL('../../contents/532be7fa-7400-4090-bd78-a3f03c44d239.JPG', import.meta.url).href, type: 'image' },
  { src: new URL('../../contents/5a4ef087-7ef6-48e2-980d-d3d56436a704.JPG', import.meta.url).href, type: 'image' },
  { src: new URL('../../contents/5bf14a74-185b-47d1-957e-d7f9c153d9a7.JPG', import.meta.url).href, type: 'image' },
  { src: new URL('../../contents/5efdd5e3-46c6-436f-a129-ee9d7d776ccd.JPG', import.meta.url).href, type: 'image' },
  { src: new URL('../../contents/a3b27348-0526-4031-b050-1c89cb7512b5.JPG', import.meta.url).href, type: 'image' },
  { src: new URL('../../contents/a71c95a4-909c-4772-82a5-cf5acb62bf29.JPG', import.meta.url).href, type: 'image' },
  { src: new URL('../../contents/abc7f6a6-61ba-4c4a-a198-174b50f721fc.JPG', import.meta.url).href, type: 'image' },
  { src: new URL('../../contents/ade7519c-176a-49af-948f-bc98dd2e9f11.JPG', import.meta.url).href, type: 'image' },
  { src: new URL('../../contents/b51296e5-9945-4206-a0df-b778549e119b.JPG', import.meta.url).href, type: 'image' },
  { src: new URL('../../contents/c5ee2d01-afdd-45d9-89ff-1bf650529f97.JPG', import.meta.url).href, type: 'image' },
  { src: new URL('../../contents/d2518fda-3c6c-45cc-96a7-dc1ef6903235.JPG', import.meta.url).href, type: 'image' },
  { src: new URL('../../contents/eb382384-5f8a-4237-a86b-8f42b57050ea.JPG', import.meta.url).href, type: 'image' },
];

const galleryVideos = [
  { src: new URL('../../contents/1cc8c766-1592-48e0-882f-4e555079d3d3.MP4', import.meta.url).href, type: 'video' },
  { src: new URL('../../contents/37894b3b-64b4-4da6-aac4-dfa1921b0f15.MP4', import.meta.url).href, type: 'video' },
  { src: new URL('../../contents/567974fa-9083-49cd-b794-9830533a2dd8.MP4', import.meta.url).href, type: 'video' },
  { src: new URL('../../contents/58fd4fc8-8519-419f-a474-196947e6e652.MP4', import.meta.url).href, type: 'video' },
  { src: new URL('../../contents/8371f09a-ef49-408a-bd64-0dd9406de265.MP4', import.meta.url).href, type: 'video' },
  { src: new URL('../../contents/c0873402-8f3a-49fd-9c1f-3c0295e474c1.MP4', import.meta.url).href, type: 'video' },
  { src: new URL('../../contents/e1174c76-0bce-4b70-aa21-70a52f957970.MP4', import.meta.url).href, type: 'video' },
  { src: new URL('../../contents/fa45531a-3645-4669-a31a-cf0081a970f0.MP4', import.meta.url).href, type: 'video' },
];

type GalleryTab = 'all' | 'photos' | 'videos';

export default function Gallery() {
  const [tab, setTab] = useState<GalleryTab>('all');
  const [lightbox, setLightbox] = useState<{ src: string; type: string } | null>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [tab]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightbox(null); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  const allItems = tab === 'photos' ? galleryImages : tab === 'videos' ? galleryVideos : [...galleryImages, ...galleryVideos];

  return (
    <main>
      {/* ── HERO ── */}
      <section className="page-hero" style={{ background: 'linear-gradient(135deg, var(--purple-900), var(--purple-600))' }} aria-labelledby="gallery-heading">
        <div style={{ position: 'absolute', fontSize: '16rem', opacity: 0.05, top: '50%', left: '50%', transform: 'translate(-50%,-50%)', lineHeight: 1, color: 'var(--purple-400)' }} aria-hidden="true"><Flower size={200} /></div>
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <span className="hero-eyebrow"><Star size={16} style={{ display: 'inline' }} /> Moments in Ministry <Star size={16} style={{ display: 'inline' }} /></span>
          <h1 id="gallery-heading" style={{ marginTop: '0.5rem' }}>Gallery</h1>
          <p>A visual journey through our events, outreach, and community moments</p>
        </div>
      </section>

      {/* ── TABS ── */}
      <section style={{ background: 'white', borderBottom: '1px solid var(--purple-100)', padding: '1.25rem 0', position: 'sticky', top: '70px', zIndex: 100 }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem' }}>
          {(['all', 'photos', 'videos'] as GalleryTab[]).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`amount-btn${tab === t ? ' active' : ''}`}
              style={{ textTransform: 'capitalize', minWidth: '100px' }}
              aria-pressed={tab === t}
              id={`gallery-tab-${t}`}
            >
              {t === 'all' ? <><Star size={14} style={{ display: 'inline', marginRight: '0.4rem' }} />All</> : t === 'photos' ? <><Camera size={14} style={{ display: 'inline', marginRight: '0.4rem' }} />Photos</> : <><Play size={14} style={{ display: 'inline', marginRight: '0.4rem' }} />Videos</>}
            </button>
          ))}
        </div>
      </section>

      {/* ── GRID ── */}
      <section className="section" aria-labelledby="gallery-grid-heading">
        <div className="container">
          <h2 className="sr-only" id="gallery-grid-heading">Gallery grid</h2>
          <div className="gallery-grid" role="list">
            {allItems.map((item, i) => (
              <div
                key={i}
                className="gallery-item fade-up"
                role="listitem"
                onClick={() => setLightbox(item)}
                style={{ cursor: 'pointer', animationDelay: `${(i % 6) * 0.07}s` }}
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && setLightbox(item)}
                aria-label={`Open ${item.type} ${i + 1} in fullscreen`}
              >
                {item.type === 'image' ? (
                  <img
                    src={item.src}
                    alt={`Gallery image ${i + 1}`}
                    loading="lazy"
                    style={{ width: '100%', display: 'block' }}
                  />
                ) : (
                  <div style={{ position: 'relative', background: '#1a0a2e', aspectRatio: '16/9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <video
                      src={item.src}
                      muted
                      playsInline
                      style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }}
                      onMouseEnter={e => (e.currentTarget as HTMLVideoElement).play()}
                      onMouseLeave={e => { const v = e.currentTarget as HTMLVideoElement; v.pause(); v.currentTime = 0; }}
                    />
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
                      <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Play size={22} style={{ color: 'var(--purple-700)', marginLeft: 2 }} />
                      </div>
                    </div>
                  </div>
                )}
                <div className="gallery-overlay">
                  {item.type === 'video' ? <Play size={36} /> : '🔍'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIGHTBOX ── */}
      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)} role="dialog" aria-modal="true" aria-label="Media lightbox">
          <button className="lightbox-close" onClick={() => setLightbox(null)} aria-label="Close lightbox">
            <X size={22} />
          </button>
          <div onClick={e => e.stopPropagation()}>
            {lightbox.type === 'image' ? (
              <img src={lightbox.src} alt="Full size gallery image" />
            ) : (
              <video src={lightbox.src} controls autoPlay style={{ maxWidth: '90vw', maxHeight: '88vh', borderRadius: 'var(--radius-md)' }}>
                Your browser does not support video playback.
              </video>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
