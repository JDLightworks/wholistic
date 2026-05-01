import { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Flower, Camera, ThumbsUp, Play, Star } from 'lucide-react';
import emailjs from '@emailjs/browser';

interface ToastState { msg: string; type: 'success' | 'error' }

const contactInfo = [
  { icon: <MapPin size={20} />, title: 'Our Locations', lines: [
    'Redemption City of God',
    'Kilometer 46, Lagos-Ibadan Expressway, Mowe, Ogun State, Nigeria',
    'Lagos: Victoria Island, Lagos, Nigeria',
    'Abuja: Maitama, Abuja, Nigeria'
  ] },
  { icon: <Phone size={20} />, title: 'Call Us', lines: ['08023621200', '08141665805', '08060207832', '07065839074', '07042493827'] },
  { icon: <Mail size={20} />, title: 'Email Us', lines: ['wholistic.outreach@yahoo.com'] },
  { icon: <Clock size={20} />, title: 'Office Hours', lines: ['Monday – Friday: 9am – 5pm', 'Saturday: 10am – 2pm (by appointment)'] },
];

const inquiryTypes = ['General Inquiry', 'Event Information', 'Partnership', 'Prayer Request', 'Volunteer', 'Media / Press', 'Donation Support'];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', type: inquiryTypes[0], subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    // Initialize EmailJS with your public key
    emailjs.init('nZqsT7vk7maKEgykE');
    
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (toast) { const t = setTimeout(() => setToast(null), 5000); return () => clearTimeout(t); }
  }, [toast]);

  const update = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setToast({ msg: 'Please fill in all required fields.', type: 'error' });
      return;
    }
    setLoading(true);
    
    try {
      // Send emails to both Gmail and Yahoo
      const emailData = {
        from_name: form.name,
        from_email: form.email,
        phone: form.phone,
        inquiry_type: form.type,
        subject: form.subject,
        message: form.message,
      };

      await Promise.all([
        emailjs.send('service_m1rluo6', 'template_7yq2656', emailData), // Gmail
        emailjs.send('service_m1rluo6', 'template_7yq2656', { ...emailData, to_email: 'wholistic.outreach@yahoo.com' }) // Yahoo (if your template supports it)
      ]);
      
      setLoading(false);
      setSent(true);
      setToast({ msg: 'Message sent! We\'ll be in touch soon. 💜', type: 'success' });
    } catch (error) {
      console.error('Email send failed:', error);
      setLoading(false);
      setToast({ msg: 'Failed to send message. Please try again.', type: 'error' });
    }
  };

  return (
    <main>
      {/* ── HERO ── */}
      <section className="page-hero" style={{ background: 'linear-gradient(135deg, var(--purple-900), var(--purple-600))' }} aria-labelledby="contact-heading">
        <div style={{ position: 'absolute', fontSize: '18rem', opacity: 0.05, top: '50%', left: '50%', transform: 'translate(-50%,-50%)', lineHeight: 1, color: 'var(--purple-400)' }} aria-hidden="true"><Flower size={220} /></div>
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <span className="hero-eyebrow"><Star size={16} style={{ display: 'inline' }} /> Reach Out <Star size={16} style={{ display: 'inline' }} /></span>
          <h1 id="contact-heading" style={{ marginTop: '0.5rem' }}>Contact Us</h1>
          <p>We'd love to hear from you. Send us a message and we'll respond within 24 hours.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            {/* ── Left: Info ── */}
            <div className="fade-up">
              <span className="section-label">Get In Touch</span>
              <h2 className="section-title" style={{ marginBottom: '0.5rem' }}>Redemption City of God</h2>
              <div className="divider" />
              <p style={{ color: 'var(--text-mid)', lineHeight: 1.8, marginBottom: '2.5rem', fontSize: '1rem' }}>
                Whether you have questions about our events, want to volunteer, request prayer, or explore partnership opportunities — we are here for you. Reach out through any of the channels below.
              </p>

              {contactInfo.map((c, i) => (
                <div key={i} className="contact-info-item">
                  <div className="contact-icon">{c.icon}</div>
                  <div>
                    <h3 style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-dark)', marginBottom: '0.35rem' }}>{c.title}</h3>
                    {c.lines.map((l, j) => (
                      <p key={j} style={{ fontSize: '0.875rem', color: 'var(--text-mid)', lineHeight: 1.6 }}>{l}</p>
                    ))}
                  </div>
                </div>
              ))}

              {/* Social */}
              <div style={{ marginTop: '2rem' }}>
                <p style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-dark)', marginBottom: '1rem' }}>Follow Our Ministry</p>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  {[
                    { label: 'Instagram', icon: '📸', href: '#' },
                    { label: 'Facebook', icon: '👍', href: '#' },
                    { label: 'YouTube', icon: '▶️', href: '#' },
                    { label: 'Twitter', icon: '𝕏', href: '#' },
                  ].map(s => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link"
                      style={{ background: 'var(--purple-100)', color: 'var(--purple-700)', width: 44, height: 44, fontSize: '1.1rem' }}
                      aria-label={s.label}
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Prayer note */}
              <div style={{
                marginTop: '2.5rem',
                background: 'var(--grad-soft)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.5rem',
                borderLeft: '4px solid var(--purple-400)'
              }}>
                <p style={{ fontFamily: 'var(--font-elegant)', fontStyle: 'italic', fontSize: '1.05rem', color: 'var(--purple-800)', lineHeight: 1.7 }}>
                  "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God."
                </p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-light)', marginTop: '0.5rem' }}>— Philippians 4:6</p>
              </div>
            </div>

            {/* ── Right: Form ── */}
            <div className="fade-up">
              {sent ? (
                <div style={{ background: 'white', borderRadius: 'var(--radius-xl)', padding: '4rem 2.5rem', boxShadow: 'var(--shadow-md)', textAlign: 'center' }}>
                  <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>💜</div>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: '0.75rem', color: 'var(--text-dark)' }}>Message Sent!</h2>
                  <p style={{ color: 'var(--text-mid)', lineHeight: 1.7, marginBottom: '2rem' }}>
                    Thank you, <strong>{form.name}</strong>! We've received your message and will respond to <strong>{form.email}</strong> within 24 hours.
                  </p>
                  <button onClick={() => { setSent(false); setForm({ name: '', email: '', phone: '', type: inquiryTypes[0], subject: '', message: '' }); }} className="btn btn-primary">
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  style={{ background: 'white', borderRadius: 'var(--radius-xl)', padding: '2.5rem', boxShadow: 'var(--shadow-md)' }}
                  aria-label="Contact form"
                  noValidate
                >
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', marginBottom: '2rem', color: 'var(--text-dark)' }}>Send a Message</h2>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label" htmlFor="contact-name">Full Name *</label>
                      <input id="contact-name" type="text" className="form-input" placeholder="Your full name" value={form.name} onChange={e => update('name', e.target.value)} required aria-required="true" />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="contact-email">Email Address *</label>
                      <input id="contact-email" type="email" className="form-input" placeholder="your@email.com" value={form.email} onChange={e => update('email', e.target.value)} required aria-required="true" />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label" htmlFor="contact-phone">Phone (optional)</label>
                      <input id="contact-phone" type="tel" className="form-input" placeholder="+234 800 000 0000" value={form.phone} onChange={e => update('phone', e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="contact-type">Inquiry Type</label>
                      <select id="contact-type" className="form-select" value={form.type} onChange={e => update('type', e.target.value)}>
                        {inquiryTypes.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="form-group" style={{ marginBottom: '1rem' }}>
                    <label className="form-label" htmlFor="contact-subject">Subject</label>
                    <input id="contact-subject" type="text" className="form-input" placeholder="What is this about?" value={form.subject} onChange={e => update('subject', e.target.value)} />
                  </div>

                  <div className="form-group" style={{ marginBottom: '2rem' }}>
                    <label className="form-label" htmlFor="contact-message">Message *</label>
                    <textarea
                      id="contact-message"
                      className="form-textarea"
                      placeholder="Share your thoughts, questions, or prayer requests…"
                      value={form.message}
                      onChange={e => update('message', e.target.value)}
                      required
                      aria-required="true"
                      style={{ minHeight: '160px' }}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary btn-lg" id="contact-submit-btn" style={{ width: '100%' }} disabled={loading}>
                    {loading ? '⏳ Sending…' : <><Send size={16} /> Send Message</>}
                  </button>

                  <p style={{ fontSize: '0.8rem', color: 'var(--text-light)', textAlign: 'center', marginTop: '1rem' }}>
                    We respect your privacy. Messages are confidential.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── MAP placeholder ── */}
      <section style={{ background: 'var(--purple-50)', padding: '3rem 0' }} aria-label="Location map">
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{
            background: 'linear-gradient(135deg, var(--purple-100), var(--rose-100))',
            borderRadius: 'var(--radius-xl)',
            padding: '4rem 2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
            border: '1px solid var(--purple-200)'
          }}>
            <div style={{ fontSize: '3rem' }}>🗺️</div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--purple-800)' }}>Find Us In Nigeria</h3>
            <p style={{ color: 'var(--text-mid)', maxWidth: '400px' }}>Lagos: Victoria Island · Abuja: Maitama District</p>
            <p style={{ color: 'var(--text-mid)', maxWidth: '400px' }}>Coordinates: 6.8256654, 3.4627868</p>
            <a
              href="https://www.google.com/maps?q=6.8256654,3.4627868"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm"
            >
              Open in Google Maps
            </a>
          </div>
        </div>
      </section>

      {toast && (
        <div className={`toast ${toast.type}`} role="alert" aria-live="polite">
          <span>{toast.type === 'success' ? '✅' : '❌'}</span>
          <span>{toast.msg}</span>
        </div>
      )}
    </main>
  );
}
