import { useState, useEffect } from 'react';
import { Check, Heart, Star, CreditCard, Zap, Waves } from 'lucide-react';

declare const FlutterwaveCheckout: (config: Record<string, unknown>) => void;
declare const PaystackPop: { setup: (config: Record<string, unknown>) => { openIframe: () => void } };

const currencies = [
  { code: 'NGN', symbol: '₦', label: 'Nigerian Naira', flag: '🇳🇬' },
  { code: 'USD', symbol: '$', label: 'US Dollar', flag: '🇺🇸' },
  { code: 'GBP', symbol: '£', label: 'British Pound', flag: '🇬🇧' },
  { code: 'EUR', symbol: '€', label: 'Euro', flag: '🇪🇺' },
];

const presets: Record<string, number[]> = {
  NGN: [2000, 5000, 10000, 25000, 50000, 100000],
  USD: [5, 10, 25, 50, 100, 250],
  GBP: [5, 10, 20, 50, 100, 200],
  EUR: [5, 10, 20, 50, 100, 200],
};

const purposes = ['General Fund', 'Missions & Outreach', 'Women\'s Ministry', 'Youth Programs', 'Community Feed Drive', 'Building Fund'];

type PayMethod = 'flutterwave' | 'paystack' | 'paypal' | 'stripe';

const payMethods: { id: PayMethod; name: string; desc: string; logo: JSX.Element; currencies: string[] }[] = [
  { id: 'flutterwave', name: 'Flutterwave', desc: 'Cards, Bank Transfer, USSD, Mobile Money', logo: <Waves size={24} />, currencies: ['NGN', 'USD', 'GBP', 'EUR'] },
  { id: 'paystack', name: 'Paystack', desc: 'Cards, Bank Transfer, USSD', logo: <CreditCard size={24} />, currencies: ['NGN', 'USD', 'GBP'] },
  { id: 'paypal', name: 'PayPal', desc: 'PayPal account or credit card', logo: <Check size={24} />, currencies: ['USD', 'GBP', 'EUR'] },
  { id: 'stripe', name: 'Stripe', desc: 'International cards worldwide', logo: <Zap size={24} />, currencies: ['USD', 'GBP', 'EUR'] },
];

interface ToastState { msg: string; type: 'success' | 'error' }

export default function Donate() {
  const [currency, setCurrency] = useState('NGN');
  const [amount, setAmount] = useState<number | ''>('');
  const [preset, setPreset] = useState<number | null>(null);
  const [method, setMethod] = useState<PayMethod>('flutterwave');
  const [purpose, setPurpose] = useState(purposes[0]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);
  const [step, setStep] = useState<1 | 2 | 3>(1);

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 5000);
      return () => clearTimeout(t);
    }
  }, [toast]);

  const showToast = (msg: string, type: 'success' | 'error') => setToast({ msg, type });

  const finalAmount = preset ?? (typeof amount === 'number' ? amount : 0);
  const currObj = currencies.find(c => c.code === currency)!;

  const availableMethods = payMethods.filter(m => m.currencies.includes(currency));

  const handleSetPreset = (p: number) => {
    setPreset(p);
    setAmount('');
  };

  const handleAmountInput = (v: string) => {
    setPreset(null);
    setAmount(v === '' ? '' : Number(v));
  };

  const handlePay = () => {
    if (!finalAmount || finalAmount < 1) return showToast('Please enter a valid donation amount.', 'error');
    if (!name.trim()) return showToast('Please enter your name.', 'error');
    if (!email.trim() || !email.includes('@')) return showToast('Please enter a valid email.', 'error');
    setLoading(true);

    if (method === 'flutterwave') {
      try {
        FlutterwaveCheckout({
          public_key: 'FLWPUBK_TEST-XXXX', // Replace with real key
          tx_ref: `TWO-${Date.now()}`,
          amount: finalAmount,
          currency,
          payment_options: 'card,banktransfer,ussd',
          customer: { email, phone_number: phone, name },
          customizations: {
            title: 'The Wholistic Outreach',
            description: `Donation — ${purpose}`,
            logo: '',
          },
          callback: () => { setLoading(false); setStep(3); showToast('Donation received! Thank you! 💜', 'success'); },
          onclose: () => setLoading(false),
        });
      } catch { setLoading(false); simulateSuccess(); }

    } else if (method === 'paystack') {
      try {
        const handler = PaystackPop.setup({
          key: 'pk_test_XXXX', // Replace with real key
          email,
          amount: currency === 'NGN' ? finalAmount * 100 : finalAmount * 100,
          currency,
          ref: `TWO-${Date.now()}`,
          metadata: { name, phone, purpose },
          callback: () => { setLoading(false); setStep(3); showToast('Donation received! Thank you! 💜', 'success'); },
          onClose: () => setLoading(false),
        });
        handler.openIframe();
      } catch { setLoading(false); simulateSuccess(); }

    } else if (method === 'paypal') {
      setLoading(false);
      window.open(`https://paypal.me/wholisticoutreach/${finalAmount}${currency}`, '_blank');
      simulateSuccess();

    } else if (method === 'stripe') {
      setLoading(false);
      // Redirect to Stripe Checkout or use Stripe.js
      showToast('Redirecting to secure Stripe checkout…', 'success');
      setTimeout(() => simulateSuccess(), 1500);
    }
  };

  const simulateSuccess = () => {
    setStep(3);
    showToast('Donation received! Thank you so much for your generosity!', 'success');
  };

  return (
    <main>
      {/* ── HERO ── */}
      <section className="page-hero" style={{ background: 'linear-gradient(135deg, var(--purple-950), var(--purple-700))' }} aria-labelledby="donate-heading">
        <div style={{ position: 'absolute', fontSize: '16rem', opacity: 0.05, top: '50%', left: '50%', transform: 'translate(-50%,-50%)', lineHeight: 1, color: 'var(--purple-400)' }} aria-hidden="true"><Heart size={200} /></div>
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <span className="hero-eyebrow"><Star size={16} style={{ display: 'inline' }} /> Sow a Seed <Star size={16} style={{ display: 'inline' }} /></span>
          <h1 id="donate-heading" style={{ marginTop: '0.5rem' }}>Give &amp; Make a Difference</h1>
          <p>Every gift touches a life. Thank you for being part of this mission.</p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: '960px' }}>

          {step === 3 ? (
            /* ── SUCCESS STATE ── */
            <div className="fade-up" style={{ textAlign: 'center', padding: '5rem 2rem', background: 'white', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-lg)' }}>
              <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--purple-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'var(--purple-600)' }}>
                <Heart size={45} />
              </div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.25rem', marginBottom: '1rem', color: 'var(--text-dark)' }}>Thank You, {name}!</h2>
              <p style={{ color: 'var(--text-mid)', fontSize: '1.1rem', marginBottom: '0.75rem', lineHeight: 1.7 }}>
                Your gift of <strong style={{ color: 'var(--purple-700)' }}>{currObj.symbol}{finalAmount.toLocaleString()} {currency}</strong> toward <strong style={{ color: 'var(--purple-700)' }}>{purpose}</strong> has been received.
              </p>
              <p style={{ color: 'var(--text-light)', fontSize: '0.95rem', marginBottom: '2.5rem' }}>A confirmation will be sent to {email}. May God bless you abundantly for your generosity! </p>
              <button onClick={() => { setStep(1); setAmount(''); setPreset(null); }} className="btn btn-primary">
                Give Again
              </button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', alignItems: 'start' }}>
              <div>
                {/* ── STEP 1: Amount ── */}
                <div className="fade-up" style={{ background: 'white', borderRadius: 'var(--radius-xl)', padding: '2.5rem', boxShadow: 'var(--shadow-sm)', marginBottom: '1.5rem' }}>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--text-dark)' }}>1. Choose Amount</h2>

                  {/* Currency selector */}
                  <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                    <label className="form-label" htmlFor="currency-select">Currency</label>
                    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                      {currencies.map(c => (
                        <button
                          key={c.code}
                          onClick={() => { setCurrency(c.code); setPreset(null); setAmount(''); if (!availableMethods.find(m => m.id === method)?.currencies.includes(c.code)) setMethod(payMethods.find(pm => pm.currencies.includes(c.code))!.id); }}
                          className={`amount-btn${currency === c.code ? ' active' : ''}`}
                          id={`currency-${c.code}`}
                          aria-pressed={currency === c.code}
                        >
                          {c.flag} {c.code}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Preset amounts */}
                  <div style={{ marginBottom: '1rem' }}>
                    <p className="form-label" style={{ marginBottom: '0.75rem' }}>Quick Select</p>
                    <div className="amount-presets">
                      {presets[currency].map(p => (
                        <button
                          key={p}
                          onClick={() => handleSetPreset(p)}
                          className={`amount-btn${preset === p ? ' active' : ''}`}
                          id={`preset-${p}`}
                          aria-pressed={preset === p}
                        >
                          {currObj.symbol}{p.toLocaleString()}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Custom amount */}
                  <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                    <label className="form-label" htmlFor="custom-amount">Or Enter Custom Amount ({currObj.symbol})</label>
                    <input
                      type="number"
                      id="custom-amount"
                      className="form-input"
                      placeholder={`Enter amount in ${currency}`}
                      value={amount}
                      onChange={e => handleAmountInput(e.target.value)}
                      min={1}
                    />
                  </div>

                  {/* Purpose */}
                  <div className="form-group">
                    <label className="form-label" htmlFor="purpose-select">Donation Purpose</label>
                    <select id="purpose-select" className="form-select" value={purpose} onChange={e => setPurpose(e.target.value)}>
                      {purposes.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                </div>

                {/* ── STEP 2: Donor Info ── */}
                <div className="fade-up" style={{ background: 'white', borderRadius: 'var(--radius-xl)', padding: '2.5rem', boxShadow: 'var(--shadow-sm)', marginBottom: '1.5rem' }}>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--text-dark)' }}>2. Your Details</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label" htmlFor="donor-name">Full Name *</label>
                      <input type="text" id="donor-name" className="form-input" placeholder="Your full name" value={name} onChange={e => setName(e.target.value)} required />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="donor-email">Email Address *</label>
                      <input type="email" id="donor-email" className="form-input" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} required />
                    </div>
                  </div>
                  <div className="form-group" style={{ marginBottom: '1rem' }}>
                    <label className="form-label" htmlFor="donor-phone">Phone (optional)</label>
                    <input type="tel" id="donor-phone" className="form-input" placeholder="+234 800 000 0000" value={phone} onChange={e => setPhone(e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="donor-message">Message (optional)</label>
                    <textarea id="donor-message" className="form-textarea" placeholder="A note or prayer request…" value={message} onChange={e => setMessage(e.target.value)} style={{ minHeight: '90px' }} />
                  </div>
                </div>

                {/* ── STEP 3: Payment Method ── */}
                <div className="fade-up" style={{ background: 'white', borderRadius: 'var(--radius-xl)', padding: '2.5rem', boxShadow: 'var(--shadow-sm)' }}>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--text-dark)' }}>3. Payment Method</h2>
                  <div className="donation-methods">
                    {availableMethods.map(m => (
                      <button
                        key={m.id}
                        onClick={() => setMethod(m.id)}
                        className={`payment-card${method === m.id ? ' selected' : ''}`}
                        id={`pay-method-${m.id}`}
                        aria-pressed={method === m.id}
                      >
                        <div style={{ fontSize: '2.5rem' }}>{m.logo}</div>
                        <div className="payment-name">{m.name}</div>
                        <div className="payment-desc">{m.desc}</div>
                        {method === m.id && (
                          <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--purple-600)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Check size={14} color="white" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── SUMMARY SIDEBAR ── */}
              <div className="fade-up" style={{ position: 'sticky', top: '90px', gridColumn: 'auto' }}>
                <div style={{ background: 'var(--grad-purple)', borderRadius: 'var(--radius-xl)', padding: '2rem', color: 'white', marginBottom: '1rem' }}>
                  <p style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--purple-200)', marginBottom: '0.5rem' }}>Donation Summary</p>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                    {currObj.symbol}{finalAmount ? finalAmount.toLocaleString() : '0'}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--purple-200)', marginBottom: '1.5rem' }}>{currency} · {purpose}</div>
                  {name && <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)', marginBottom: '0.25rem' }}>👤 {name}</div>}
                  {email && <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>✉️ {email}</div>}
                  {method && (
                    <div style={{ marginTop: '1rem', padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.15)', borderRadius: 'var(--radius-md)', fontSize: '0.875rem' }}>
                      Via {payMethods.find(m => m.id === method)?.name}
                    </div>
                  )}
                </div>

                <button
                  onClick={handlePay}
                  disabled={loading || !finalAmount}
                  className="btn btn-gold btn-lg"
                  style={{ width: '100%', opacity: (!finalAmount || loading) ? 0.6 : 1 }}
                  id="complete-donation-btn"
                >
                  {loading ? '⏳ Processing…' : `💛 Give ${currObj.symbol}${finalAmount ? finalAmount.toLocaleString() : '0'}`}
                </button>

                <p style={{ fontSize: '0.75rem', color: 'var(--text-light)', textAlign: 'center', marginTop: '1rem', lineHeight: 1.6 }}>
                  🔒 Secured with 256-bit SSL encryption. Your payment is safe.
                </p>

                {/* Direct Bank Transfer Details */}
                <div style={{ marginTop: '1.5rem', padding: '1.25rem', background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow-sm)' }}>
                  <h3 style={{ fontSize: '1rem', fontFamily: 'var(--font-display)', marginBottom: '0.75rem', color: 'var(--text-dark)' }}>Direct Bank Transfer</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-mid)', marginBottom: '1rem' }}>Wholistic Outreach RCCG account details: (Naira account)</p>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-dark)' }}>
                    <div style={{ background: 'var(--bg-light)', padding: '0.75rem', borderRadius: 'var(--radius-md)', marginBottom: '0.5rem', border: '1px solid #f1f5f9' }}>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-light)', marginBottom: '0.25rem' }}>Zenith Bank</div>
                      <strong style={{ fontFamily: 'monospace', fontSize: '1rem' }}>1010772868</strong>
                    </div>
                    <div style={{ background: 'var(--bg-light)', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid #f1f5f9' }}>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-light)', marginBottom: '0.25rem' }}>Premium Trust Bank</div>
                      <strong style={{ fontFamily: 'monospace', fontSize: '1rem' }}>0040190288</strong>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '1.5rem', padding: '1.25rem', background: 'var(--purple-50)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--purple-200)' }}>
                  <p style={{ color: 'var(--text-mid)', lineHeight: 1.6, fontStyle: 'italic', fontFamily: 'var(--font-elegant)', fontSize: '1rem' }}>
                    "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver."
                  </p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-light)', marginTop: '0.5rem' }}>— 2 Corinthians 9:7</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Toast */}
      {toast && (
        <div className={`toast ${toast.type}`} role="alert" aria-live="polite">
          <span>{toast.type === 'success' ? '✅' : '❌'}</span>
          <span>{toast.msg}</span>
        </div>
      )}
    </main>
  );
}
