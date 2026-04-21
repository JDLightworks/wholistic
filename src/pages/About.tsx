import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Users, Globe, Award, Flower, Star, TrendingUp, CheckCircle } from 'lucide-react';

import hero2 from '../../contents/2.jpg';
import hero3 from '../../contents/3.jpg';
import hero4 from '../../contents/4.jpg';
import hero5 from '../../contents/5.jpg';

const values = [
  { icon: 'heart', title: 'Faith-Centred', desc: 'Everything we do is rooted in the love of God and the power of faith to transform lives.' },
  { icon: 'flower', title: 'Wholistic Approach', desc: 'We address the whole person — spirit, soul, and body — for lasting transformation.' },
  { icon: 'globe', title: 'Community Impact', desc: 'We build strong, purposeful communities that extend from the local to the global.' },
  { icon: 'star', title: 'Excellence', desc: 'We are committed to doing all things with excellence, beauty, and intentionality.' },
];

const achievements = [
  { number: '140+', label: 'Daughters Graduated' },
  { number: '60+', label: 'Successfully Set Up' },
  { number: '55+', label: 'Brothels Visited' },
  { number: '10,000+', label: 'People Reached' },
  { number: '16+', label: 'Married Daughters' },
  { number: '3', label: 'Rehabilitation Homes' },
];

const keyObjectives = [
  'Share the love of Christ with young women in crisis situations.',
  'Provide help and support (housing and education) to victims of sex trafficking and vulnerable girls.',
  'Create awareness on ills of sexual misconduct among youths.',
  'Train social/church workers for outreach and support.',
  'Train and counsel young women to handle personal, social, and financial crises.',
  'Reduce anxiety and help develop self-esteem and self-reliance.',
];

const targetGroups = [
  'Neglected and stranded teenagers and youths',
  'Commercial Sex Workers',
  'Young women in need of Vocational Skills',
  'Orphans and Vulnerable Children (OVC)',
];

const approaches = [
  { title: 'Outreach & Evangelism', desc: 'Mobile care clinics, Christian film shows, one-on-one counselling, capacity building, income generating activities, and life skills.' },
  { title: 'Rehabilitation Programme', desc: 'Discipleship programs, academy education, shelter care, and transitional living support for young women in crisis.' },
  { title: 'Skill Acquisition', desc: 'World-class training in textile design, fashion, home care, hairdressing, photography, catering, computer, and more.' },
  { title: 'Prevention', desc: 'Capacity building, youth training programmes, sexual integrity education, and entrepreneurial training.' },
];

export default function About() {
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.15 });
    document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <main>
      {/* ── PAGE HERO ── */}
      <section className="page-hero" aria-labelledby="about-page-heading">
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
          <img src={hero3} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3 }} />
          <div className="hero-overlay" />
        </div>
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <p className="hero-eyebrow" style={{ marginBottom: '1rem' }}><Star size={16} style={{ display: 'inline' }} /> Our Story <Star size={16} style={{ display: 'inline' }} /></p>
          <h1 id="about-page-heading">About The Wholistic Outreach</h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.15rem', marginTop: '0.75rem', fontFamily: 'var(--font-elegant)', fontStyle: 'italic' }}>
            Breaking cycles, restoring dignity, renewing hope
          </p>
        </div>
      </section>

      {/* ── GENERAL OVERVIEW ── */}
      <section className="section" aria-labelledby="overview-heading">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', alignItems: 'center' }}>
            <div className="fade-up">
              <img src={hero2} alt="Ministry work" style={{ width: '100%', height: '450px', objectFit: 'cover', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-lg)' }} />
            </div>
            <div className="fade-up">
              <span className="section-label">Who We Are</span>
              <h2 className="section-title" id="overview-heading">General Overview</h2>
              <div className="divider" />
              <div style={{ fontSize: '1rem', color: 'var(--text-mid)', lineHeight: 1.85, marginBottom: '1.5rem' }}>
                <p style={{ marginBottom: '1rem' }}>
                  <strong>The Wholistic Outreach</strong> is one of the ministries under the office of the Wife of the General Overseer of the Redeemed Christian Church of God, Pastor (Mrs.) Folu Adeboye. The ministry is currently active and effective in the work of social reformation and community development.
                </p>
                <p style={{ marginBottom: '1rem' }}>
                  The Wholistic Outreach is a faith-based non-profit organization dedicated to <strong>mending broken lives, restoring families, and renewing hope</strong>. We believe this is the heart of God: breaking the cycle of abuse and abandonment for female sex workers, trafficked girls, abandoned girls, and teens in a Christ-centered home and learning environment.
                </p>
                <p style={{ marginBottom: '1rem' }}>
                  We provide a safe home and a loving family atmosphere for unwed mothers and children at risk. Because we are God-based, we offer true and lasting hope in otherwise hopeless situations. Our organization models God's love and purity to a generation of youths, bringing hope, love, and succor to stranded young girls and ladies who have been abused, forsaken, and made vulnerable through sexual exploitation.
                </p>
                <p>
                  Using capacity building, income generating activities, rehabilitation, and Bible-based teachings as means to behavioral change, we transform lives and restore dignity to those society has forgotten.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VISION & MISSION ── */}
      <section className="section" style={{ background: 'var(--purple-50)' }} aria-labelledby="mission-heading">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            <div className="fade-up">
              <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '2.5rem', boxShadow: 'var(--shadow-sm)', height: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <Star size={32} style={{ color: 'var(--purple-600)' }} />
                  <h3 className="section-title" style={{ margin: 0, fontSize: '1.5rem' }}>Vision</h3>
                </div>
                <div className="divider" style={{ marginBottom: '1.5rem' }} />
                <p style={{ color: 'var(--text-mid)', fontSize: '1.05rem', lineHeight: 1.8 }}>
                  To see young people upholding the values of <strong>abstinence, purity and chastity before marriage</strong> as well as upholding <strong>sexual fidelity in marriage</strong> as a way of life.
                </p>
              </div>
            </div>
            <div className="fade-up">
              <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '2.5rem', boxShadow: 'var(--shadow-sm)', height: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <Heart size={32} style={{ color: 'var(--purple-600)' }} />
                  <h3 className="section-title" style={{ margin: 0, fontSize: '1.5rem' }}>Mission</h3>
                </div>
                <div className="divider" style={{ marginBottom: '1.5rem' }} />
                <p style={{ color: 'var(--text-mid)', fontSize: '1.05rem', lineHeight: 1.8 }}>
                  Promote youth and women development through life skills and spiritual discipleship. Provide saved commercial sex workers, stranded teenage girls, and single mothers with capacity building and educational opportunities for character development and rehabilitation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HISTORY & FOUNDING ── */}
      <section className="section" aria-labelledby="history-heading">
        <div className="container">
          <div className="text-center fade-up" style={{ marginBottom: '3rem' }}>
            <span className="section-label">Our Foundation</span>
            <h2 className="section-title" id="history-heading">History & Founding</h2>
          </div>
          <div style={{ maxWidth: '820px', margin: '0 auto' }}>
            <div style={{ background: 'var(--purple-50)', borderRadius: 'var(--radius-lg)', padding: '2.5rem', marginBottom: '2rem' }} className="fade-up">
              <p style={{ color: 'var(--text-dark)', fontSize: '1.1rem', lineHeight: 1.85, marginBottom: '1.25rem', fontStyle: 'italic' }}>
                Earlier in 2000, Pastor (Mrs.) Folu Adeboye noticed the high level of teenage girls' early pregnancy, unprepared motherhood, girl child prostitution, and abuse around her environment in Ebute-Metta, Lagos. This concern led her to intercessory prayers and counseling sessions with young girls.
              </p>
              <p style={{ color: 'var(--text-mid)', fontSize: '1rem', lineHeight: 1.85 }}>
                This move gave birth to the Ministry called <strong>God's Offspring Home</strong>, now known as <strong>Wholistic Outreach RCCG</strong>, aimed at reforming victims of sexual abuse, trafficking, and vulnerable young girls.
              </p>
            </div>

            <div style={{ display: 'grid', gap: '1.5rem' }} className="fade-up">
              <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '1.75rem', boxShadow: 'var(--shadow-sm)', borderLeft: '4px solid var(--purple-500)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
                  <TrendingUp size={24} style={{ color: 'var(--purple-600)' }} />
                  <h4 style={{ margin: 0, fontWeight: 600, color: 'var(--text-dark)' }}>2003: Official Rehabilitation Beginning</h4>
                </div>
                <p style={{ color: 'var(--text-mid)', margin: 0, fontSize: '0.95rem', lineHeight: 1.7 }}>
                  The rehabilitation program started officially in a rented three-bedroom flat in Ikorodu, Lagos with eight young beneficiaries aged 18-28 years old.
                </p>
              </div>

              <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '1.75rem', boxShadow: 'var(--shadow-sm)', borderLeft: '4px solid var(--purple-500)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
                  <TrendingUp size={24} style={{ color: 'var(--purple-600)' }} />
                  <h4 style={{ margin: 0, fontWeight: 600, color: 'var(--text-dark)' }}>2006: Permanent Home Established</h4>
                </div>
                <p style={{ color: 'var(--text-mid)', margin: 0, fontSize: '0.95rem', lineHeight: 1.7 }}>
                  The ministry relocated to a permanent site in Loburo, Mowe, Ogun State with capacity for 40-50 girls, equipped with dormitories and facilities for formal and informal education.
                </p>
              </div>

              <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '1.75rem', boxShadow: 'var(--shadow-sm)', borderLeft: '4px solid var(--purple-500)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
                  <TrendingUp size={24} style={{ color: 'var(--purple-600)' }} />
                  <h4 style={{ margin: 0, fontWeight: 600, color: 'var(--text-dark)' }}>2002 - Present: 20+ Years of Service</h4>
                </div>
                <p style={{ color: 'var(--text-mid)', margin: 0, fontSize: '0.95rem', lineHeight: 1.7 }}>
                  The program has been operational with continuous impact. Quarterly outreach programs reach thousands annually. All graduates from the Skills Acquisition Centre are equipped to earn a living independently, and daughters are reconciled with their families.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── KEY OBJECTIVES ── */}
      <section className="section" style={{ background: 'var(--purple-50)' }} aria-labelledby="objectives-heading">
        <div className="container">
          <div className="text-center fade-up" style={{ marginBottom: '3rem' }}>
            <span className="section-label">Our Direction</span>
            <h2 className="section-title" id="objectives-heading">Key Objectives & Goals</h2>
          </div>
          <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            {keyObjectives.map((obj, i) => (
              <div key={i} className="fade-up" style={{ animationDelay: `${i * 0.08}s` }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', background: 'white', padding: '1.5rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
                  <CheckCircle size={24} style={{ color: 'var(--purple-600)', flexShrink: 0, marginTop: '0.25rem' }} />
                  <p style={{ color: 'var(--text-mid)', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>{obj}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TARGET GROUPS ── */}
      <section className="section" aria-labelledby="target-heading">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', alignItems: 'center' }}>
            <div className="fade-up">
              <span className="section-label">Our Focus</span>
              <h2 className="section-title" id="target-heading">Target Groups</h2>
              <div className="divider" />
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', listStyle: 'none', padding: 0, margin: 0 }}>
                {targetGroups.map((group, i) => (
                  <li key={i} className="fade-up" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', animationDelay: `${i * 0.1}s` }}>
                    <Users size={20} style={{ color: 'var(--purple-600)', flexShrink: 0, marginTop: '0.25rem' }} />
                    <span style={{ color: 'var(--text-mid)', fontSize: '1rem', lineHeight: 1.6 }}>{group}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="fade-up">
              <img src={hero5} alt="Our target groups" style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-lg)' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── OUR APPROACH ── */}
      <section className="section" style={{ background: 'var(--purple-50)' }} aria-labelledby="approach-heading">
        <div className="container">
          <div className="text-center fade-up" style={{ marginBottom: '3rem' }}>
            <span className="section-label">How We Work</span>
            <h2 className="section-title" id="approach-heading">Our Comprehensive Approach</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
            {approaches.map((app, i) => (
              <div key={i} className="fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '2rem', boxShadow: 'var(--shadow-sm)', height: '100%' }}>
                  <Flower size={32} style={{ color: 'var(--purple-600)', marginBottom: '1rem' }} />
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--text-dark)' }}>{app.title}</h4>
                  <p style={{ color: 'var(--text-mid)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>{app.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ACHIEVEMENTS ── */}
      <section className="section" aria-labelledby="achievements-heading">
        <div className="container">
          <div className="text-center fade-up" style={{ marginBottom: '3rem' }}>
            <span className="section-label">Our Impact</span>
            <h2 className="section-title" id="achievements-heading">Key Achievements</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1.5rem' }}>
            {achievements.map((a, i) => (
              <div key={i} className="fade-up" style={{
                textAlign: 'center',
                padding: '2rem 1.5rem',
                background: 'white',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-sm)',
                animationDelay: `${i * 0.08}s`
              }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.25rem', fontWeight: 700, color: 'var(--purple-600)', marginBottom: '0.75rem' }}>{a.number}</div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-mid)', lineHeight: 1.5 }}>{a.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CORE VALUES ── */}
      <section className="section" style={{ background: 'var(--purple-50)' }} aria-labelledby="values-heading">
        <div className="container">
          <div className="text-center fade-up" style={{ marginBottom: '3rem' }}>
            <span className="section-label">What Guides Us</span>
            <h2 className="section-title" id="values-heading">Our Core Values</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
            {values.map((v, i) => {
              const iconMap: Record<string, JSX.Element> = {
                'heart': <Heart size={40} />,
                'flower': <Flower size={40} />,
                'globe': <Globe size={40} />,
                'star': <Star size={40} />,
              };
              return (
              <div key={i} className="fade-up" style={{
                background: 'white',
                borderRadius: 'var(--radius-lg)',
                padding: '2rem 1.5rem',
                textAlign: 'center',
                boxShadow: 'var(--shadow-sm)',
                transition: 'all 0.4s ease',
                animationDelay: `${i * 0.1}s`,
                borderTop: '4px solid var(--purple-400)'
              }}>
                <div style={{ marginBottom: '1rem', color: 'var(--purple-600)' }} aria-hidden="true">{iconMap[v.icon]}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--text-dark)' }}>{v.title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-mid)', lineHeight: 1.6 }}>{v.desc}</p>
              </div>
            ); })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section" aria-labelledby="about-cta">
        <div className="container">
          <div className="volunteer-cta fade-up">
            <div style={{ position: 'absolute', inset: 0 }}>
              <img src={hero4} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.2 }} />
            </div>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <span className="section-label" style={{ color: 'var(--purple-200)' }}>Join Us</span>
              <h2 id="about-cta" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: 'white', marginBottom: '1rem' }}>Be Part of the Movement</h2>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.05rem', marginBottom: '2rem', maxWidth: '520px', margin: '0 auto 2rem' }}>
                Whether you volunteer, partner, give, or pray — every act of love advances the mission. Come, let's change the world together.
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link to="/contact" className="btn btn-white btn-lg">Volunteer With Us</Link>
                <Link to="/donate" className="btn btn-gold btn-lg"><Heart size={18} style={{ display: 'inline', marginRight: '0.5rem' }} /> Give Today</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
