import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Eye, EyeOff, Save, Calendar, MapPin, Clock, LogOut, Lock, FileText } from 'lucide-react';
import {
  getBlogPosts, addBlogPost, updateBlogPost, deleteBlogPost,
  getEvents, addEvent, updateEvent, deleteEvent,
} from '../cms';
import { BlogPost, Event } from '../types';

// Simple password gate
const ADMIN_PASSWORD = 'wholistic2026';

type CMSTab = 'blog' | 'events';
interface ToastState { msg: string; type: 'success' | 'error' }

// ── Blog Form ──────────────────────────────────────────────────────────────
const emptyPost = (): Omit<BlogPost, 'id'> => ({
  title: '', excerpt: '', content: '', author: 'Admin',
  date: new Date().toISOString().slice(0, 10),
  category: 'Faith & Spirituality', published: true,
});

// ── Event Form ─────────────────────────────────────────────────────────────
const emptyEvent = (): Omit<Event, 'id'> => ({
  title: '', description: '', date: new Date().toISOString().slice(0, 10),
  time: '10:00 AM', location: '', category: 'Conference', published: true,
});

const blogCategories = ['Faith & Spirituality', 'Community', 'Wellness', 'Events', 'Testimonies'];
const eventCategories = ['Conference', 'Prayer', 'Retreat', 'Outreach', 'Workshop'];

export default function CMS() {
  const [authed, setAuthed] = useState(false);
  const [pwd, setPwd] = useState('');
  const [pwdError, setPwdError] = useState('');

  const [tab, setTab] = useState<CMSTab>('blog');

  // Blog state
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [postModal, setPostModal] = useState(false);
  const [editPost, setEditPost] = useState<BlogPost | null>(null);
  const [postForm, setPostForm] = useState(emptyPost());

  // Event state
  const [events, setEvents] = useState<Event[]>([]);
  const [eventModal, setEventModal] = useState(false);
  const [editEvent, setEditEvent] = useState<Event | null>(null);
  const [eventForm, setEventForm] = useState(emptyEvent());

  const [toast, setToast] = useState<ToastState | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    if (authed) { setPosts(getBlogPosts()); setEvents(getEvents()); }
  }, [authed]);

  useEffect(() => {
    if (toast) { const t = setTimeout(() => setToast(null), 4000); return () => clearTimeout(t); }
  }, [toast]);

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => setToast({ msg, type });

  // ── AUTH ──
  const handleLogin = () => {
    if (pwd === ADMIN_PASSWORD) { setAuthed(true); setPwdError(''); }
    else setPwdError('Incorrect password. Please try again.');
  };

  if (!authed) {
    return (
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--grad-purple)' }}>
        <div style={{ background: 'white', borderRadius: 'var(--radius-xl)', padding: '3rem', width: '100%', maxWidth: '420px', boxShadow: 'var(--shadow-lg)', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--purple-600)' }}><Lock size={50} /></div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', marginBottom: '0.5rem', color: 'var(--text-dark)' }}>Admin Access</h1>
          <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '2rem' }}>Enter your admin password to manage content.</p>
          <div className="form-group" style={{ marginBottom: '1rem', textAlign: 'left' }}>
            <label className="form-label" htmlFor="admin-password">Password</label>
            <input
              id="admin-password"
              type="password"
              className="form-input"
              placeholder="Enter admin password"
              value={pwd}
              onChange={e => setPwd(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              autoFocus
            />
            {pwdError && <p style={{ color: '#ef4444', fontSize: '0.82rem', marginTop: '0.4rem' }}>{pwdError}</p>}
          </div>
          <button onClick={handleLogin} className="btn btn-primary" style={{ width: '100%' }} id="admin-login-btn">
            Login to Admin
          </button>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-light)', marginTop: '1.5rem' }}>
            Default password: <code style={{ background: 'var(--purple-100)', padding: '0.1rem 0.4rem', borderRadius: 4, color: 'var(--purple-700)', fontFamily: 'monospace' }}>wholistic2026</code>
          </p>
        </div>
      </main>
    );
  }

  // ── BLOG HANDLERS ──
  const openNewPost = () => { setPostForm(emptyPost()); setEditPost(null); setPostModal(true); };
  const openEditPost = (p: BlogPost) => { setEditPost(p); setPostForm({ title: p.title, excerpt: p.excerpt, content: p.content, author: p.author, date: p.date, category: p.category, published: p.published }); setPostModal(true); };
  const savePost = () => {
    if (!postForm.title || !postForm.content) return showToast('Title and content are required.', 'error');
    if (editPost) { updateBlogPost(editPost.id, postForm); showToast('Post updated!'); }
    else { addBlogPost(postForm); showToast('Post published!'); }
    setPosts(getBlogPosts()); setPostModal(false);
  };
  const removePost = (id: string) => { deleteBlogPost(id); setPosts(getBlogPosts()); setDeleteConfirm(null); showToast('Post deleted.'); };
  const togglePostPublish = (p: BlogPost) => { updateBlogPost(p.id, { published: !p.published }); setPosts(getBlogPosts()); showToast(p.published ? 'Post unpublished.' : 'Post published!'); };

  // ── EVENT HANDLERS ──
  const openNewEvent = () => { setEventForm(emptyEvent()); setEditEvent(null); setEventModal(true); };
  const openEditEvent = (ev: Event) => { setEditEvent(ev); setEventForm({ title: ev.title, description: ev.description, date: ev.date, time: ev.time, location: ev.location, category: ev.category, published: ev.published }); setEventModal(true); };
  const saveEvent = () => {
    if (!eventForm.title || !eventForm.location) return showToast('Title and location are required.', 'error');
    if (editEvent) { updateEvent(editEvent.id, eventForm); showToast('Event updated!'); }
    else { addEvent(eventForm); showToast('Event created!'); }
    setEvents(getEvents()); setEventModal(false);
  };
  const removeEvent = (id: string) => { deleteEvent(id); setEvents(getEvents()); setDeleteConfirm(null); showToast('Event deleted.'); };
  const toggleEventPublish = (ev: Event) => { updateEvent(ev.id, { published: !ev.published }); setEvents(getEvents()); showToast(ev.published ? 'Event hidden.' : 'Event published!'); };

  return (
    <main className="cms-panel" style={{ paddingTop: '5rem' }}>
      {/* Header */}
      <div className="cms-header" style={{ maxWidth: '1200px', margin: '0 auto 2rem' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', margin: 0 }}>Content Manager</h1>
          <p style={{ opacity: 0.75, fontSize: '0.875rem', margin: '0.25rem 0 0' }}>The Wholistic Outreach — Admin</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span style={{ fontSize: '0.85rem', opacity: 0.75 }}>
            {posts.length} posts · {events.length} events
          </span>
          <button onClick={() => setAuthed(false)} className="btn btn-white btn-sm">
            <LogOut size={14} /> Logout
          </button>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Tabs */}
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem' }}>
          <button
            onClick={() => setTab('blog')}
            className={`btn ${tab === 'blog' ? 'btn-primary' : 'btn-outline'}`}
            id="cms-tab-blog"
            aria-pressed={tab === 'blog'}
          >
            <FileText size={14} style={{ display: 'inline', marginRight: '0.4rem' }} />Blog Posts ({posts.length})
          </button>
          <button
            onClick={() => setTab('events')}
            className={`btn ${tab === 'events' ? 'btn-primary' : 'btn-outline'}`}
            id="cms-tab-events"
            aria-pressed={tab === 'events'}
          >
            <Calendar size={14} style={{ display: 'inline', marginRight: '0.4rem' }} />Events ({events.length})
          </button>
        </div>

        {/* ── BLOG TAB ── */}
        {tab === 'blog' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--text-dark)' }}>Blog Posts</h2>
              <button onClick={openNewPost} className="btn btn-primary" id="new-post-btn">
                <Plus size={16} /> New Post
              </button>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table className="cms-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map(p => (
                    <tr key={p.id}>
                      <td>
                        <div style={{ fontWeight: 600, color: 'var(--text-dark)', maxWidth: '280px' }}>{p.title}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-light)', marginTop: '0.2rem' }}>{p.excerpt.slice(0, 60)}…</div>
                      </td>
                      <td><span className="badge">{p.category}</span></td>
                      <td style={{ whiteSpace: 'nowrap' }}>{new Date(p.date).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                      <td>
                        <button onClick={() => togglePostPublish(p)} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', fontWeight: 600, color: p.published ? '#22c55e' : 'var(--text-light)', background: p.published ? '#f0fdf4' : 'var(--purple-50)', padding: '0.3rem 0.75rem', borderRadius: 'var(--radius-full)', cursor: 'pointer', border: 'none', transition: 'all 0.2s' }} id={`toggle-post-${p.id}`} aria-label={`${p.published ? 'Unpublish' : 'Publish'} post`}>
                          {p.published ? <Eye size={13} /> : <EyeOff size={13} />}
                          {p.published ? 'Published' : 'Draft'}
                        </button>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button onClick={() => openEditPost(p)} className="btn btn-outline btn-sm" id={`edit-post-${p.id}`} aria-label="Edit post"><Edit2 size={14} /></button>
                          <button onClick={() => setDeleteConfirm(`post-${p.id}`)} className="btn btn-sm" style={{ background: '#fef2f2', color: '#ef4444', border: '1.5px solid #fecaca', borderRadius: 'var(--radius-full)', padding: '0.625rem 1rem' }} id={`delete-post-${p.id}`} aria-label="Delete post"><Trash2 size={14} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── EVENTS TAB ── */}
        {tab === 'events' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--text-dark)' }}>Events</h2>
              <button onClick={openNewEvent} className="btn btn-primary" id="new-event-btn">
                <Plus size={16} /> New Event
              </button>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table className="cms-table">
                <thead>
                  <tr>
                    <th>Event</th>
                    <th>Category</th>
                    <th>Date & Time</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map(ev => (
                    <tr key={ev.id}>
                      <td>
                        <div style={{ fontWeight: 600, color: 'var(--text-dark)', maxWidth: '220px' }}>{ev.title}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-light)', marginTop: '0.2rem' }}>{ev.description.slice(0, 55)}…</div>
                      </td>
                      <td><span className="badge">{ev.category}</span></td>
                      <td style={{ whiteSpace: 'nowrap' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.82rem' }}><Calendar size={12} /> {new Date(ev.date).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.82rem', color: 'var(--text-light)' }}><Clock size={12} /> {ev.time}</span>
                        </div>
                      </td>
                      <td style={{ maxWidth: '160px', fontSize: '0.85rem' }}>
                        <span style={{ display: 'flex', alignItems: 'flex-start', gap: '0.3rem' }}><MapPin size={13} style={{ marginTop: 2, flexShrink: 0 }} />{ev.location}</span>
                      </td>
                      <td>
                        <button onClick={() => toggleEventPublish(ev)} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', fontWeight: 600, color: ev.published ? '#22c55e' : 'var(--text-light)', background: ev.published ? '#f0fdf4' : 'var(--purple-50)', padding: '0.3rem 0.75rem', borderRadius: 'var(--radius-full)', cursor: 'pointer', border: 'none', transition: 'all 0.2s' }} id={`toggle-event-${ev.id}`} aria-label={`${ev.published ? 'Hide' : 'Publish'} event`}>
                          {ev.published ? <Eye size={13} /> : <EyeOff size={13} />}
                          {ev.published ? 'Published' : 'Hidden'}
                        </button>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button onClick={() => openEditEvent(ev)} className="btn btn-outline btn-sm" id={`edit-event-${ev.id}`} aria-label="Edit event"><Edit2 size={14} /></button>
                          <button onClick={() => setDeleteConfirm(`event-${ev.id}`)} className="btn btn-sm" style={{ background: '#fef2f2', color: '#ef4444', border: '1.5px solid #fecaca', borderRadius: 'var(--radius-full)', padding: '0.625rem 1rem' }} id={`delete-event-${ev.id}`} aria-label="Delete event"><Trash2 size={14} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* ── BLOG MODAL ── */}
      {postModal && (
        <div className="modal-overlay" onClick={() => setPostModal(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="post-modal-title">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h2 id="post-modal-title" style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--text-dark)' }}>
                {editPost ? <><Edit2 size={18} style={{ display: 'inline', marginRight: '0.5rem' }} />Edit Post</> : <><FileText size={18} style={{ display: 'inline', marginRight: '0.5rem' }} />New Blog Post</>}
              </h2>
              <button onClick={() => setPostModal(false)} aria-label="Close modal" style={{ color: 'var(--text-light)', cursor: 'pointer', background: 'none', border: 'none', padding: '0.25rem' }}>
                <X size={22} />
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="post-title">Title *</label>
                <input id="post-title" className="form-input" value={postForm.title} onChange={e => setPostForm(f => ({ ...f, title: e.target.value }))} placeholder="Post title" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="post-author">Author</label>
                  <input id="post-author" className="form-input" value={postForm.author} onChange={e => setPostForm(f => ({ ...f, author: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="post-date">Date</label>
                  <input id="post-date" type="date" className="form-input" value={postForm.date} onChange={e => setPostForm(f => ({ ...f, date: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="post-category">Category</label>
                  <select id="post-category" className="form-select" value={postForm.category} onChange={e => setPostForm(f => ({ ...f, category: e.target.value }))}>
                    {blogCategories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="post-excerpt">Excerpt (short summary)</label>
                <input id="post-excerpt" className="form-input" value={postForm.excerpt} onChange={e => setPostForm(f => ({ ...f, excerpt: e.target.value }))} placeholder="Brief summary shown on blog cards" />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="post-content">Content (HTML supported) *</label>
                <textarea id="post-content" className="form-textarea" value={postForm.content} onChange={e => setPostForm(f => ({ ...f, content: e.target.value }))} placeholder="Full article content. Wrap paragraphs in <p> tags." style={{ minHeight: '200px', fontFamily: 'monospace', fontSize: '0.85rem' }} />
              </div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', fontSize: '0.9rem', color: 'var(--text-mid)' }}>
                <input type="checkbox" checked={postForm.published} onChange={e => setPostForm(f => ({ ...f, published: e.target.checked }))} id="post-published" />
                Publish immediately
              </label>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', paddingTop: '0.5rem' }}>
                <button onClick={() => setPostModal(false)} className="btn btn-outline">Cancel</button>
                <button onClick={savePost} className="btn btn-primary" id="save-post-btn"><Save size={15} /> {editPost ? 'Update Post' : 'Publish Post'}</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── EVENT MODAL ── */}
      {eventModal && (
        <div className="modal-overlay" onClick={() => setEventModal(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="event-modal-title">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h2 id="event-modal-title" style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--text-dark)' }}>
                {editEvent ? '✏️ Edit Event' : '📅 New Event'}
              </h2>
              <button onClick={() => setEventModal(false)} aria-label="Close modal" style={{ color: 'var(--text-light)', cursor: 'pointer', background: 'none', border: 'none' }}>
                <X size={22} />
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="event-title">Event Title *</label>
                <input id="event-title" className="form-input" value={eventForm.title} onChange={e => setEventForm(f => ({ ...f, title: e.target.value }))} placeholder="Event name" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="event-date">Date</label>
                  <input id="event-date" type="date" className="form-input" value={eventForm.date} onChange={e => setEventForm(f => ({ ...f, date: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="event-time">Time</label>
                  <input id="event-time" className="form-input" value={eventForm.time} onChange={e => setEventForm(f => ({ ...f, time: e.target.value }))} placeholder="e.g. 10:00 AM" />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="event-category">Category</label>
                  <select id="event-category" className="form-select" value={eventForm.category} onChange={e => setEventForm(f => ({ ...f, category: e.target.value }))}>
                    {eventCategories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="event-location">Location *</label>
                <input id="event-location" className="form-input" value={eventForm.location} onChange={e => setEventForm(f => ({ ...f, location: e.target.value }))} placeholder="Venue & city" />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="event-description">Description</label>
                <textarea id="event-description" className="form-textarea" value={eventForm.description} onChange={e => setEventForm(f => ({ ...f, description: e.target.value }))} placeholder="Event details, what to expect, dress code, etc." style={{ minHeight: '140px' }} />
              </div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', fontSize: '0.9rem', color: 'var(--text-mid)' }}>
                <input type="checkbox" checked={eventForm.published} onChange={e => setEventForm(f => ({ ...f, published: e.target.checked }))} id="event-published" />
                Publish immediately
              </label>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button onClick={() => setEventModal(false)} className="btn btn-outline">Cancel</button>
                <button onClick={saveEvent} className="btn btn-primary" id="save-event-btn"><Save size={15} /> {editEvent ? 'Update Event' : 'Create Event'}</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── DELETE CONFIRM ── */}
      {deleteConfirm && (
        <div className="modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="modal-box" style={{ maxWidth: '420px' }} onClick={e => e.stopPropagation()} role="alertdialog" aria-modal="true" aria-labelledby="delete-title">
            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🗑️</div>
              <h2 id="delete-title" style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '0.75rem' }}>Are you sure?</h2>
              <p style={{ color: 'var(--text-mid)', marginBottom: '2rem' }}>This action cannot be undone. The item will be permanently deleted.</p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <button onClick={() => setDeleteConfirm(null)} className="btn btn-outline">Cancel</button>
                <button
                  onClick={() => {
                    const [type, id] = deleteConfirm.split('-').reduce((acc, part, i, arr) => i === 0 ? [part, ''] : [acc[0], acc[1] + (i > 1 ? '-' : '') + part], ['', '']);
                    if (type === 'post') removePost(id);
                    else removeEvent(id);
                  }}
                  className="btn btn-sm"
                  style={{ background: '#ef4444', color: 'white', borderRadius: 'var(--radius-full)', padding: '0.875rem 2rem', fontWeight: 600 }}
                  id="confirm-delete-btn"
                >
                  Delete Permanently
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className={`toast ${toast.type}`} role="alert" aria-live="polite">
          <span>{toast.type === 'success' ? '✅' : '❌'}</span>
          <span>{toast.msg}</span>
        </div>
      )}
    </main>
  );
}
