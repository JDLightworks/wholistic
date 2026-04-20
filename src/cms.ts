import { BlogPost, Event } from './types';

const BLOG_KEY = 'wholistic_blog_posts';
const EVENTS_KEY = 'wholistic_events';

// ─── Blog CMS ────────────────────────────────────────────────────────────────
export const getBlogPosts = (): BlogPost[] => {
  const data = localStorage.getItem(BLOG_KEY);
  if (data) return JSON.parse(data);
  const defaults: BlogPost[] = [
    {
      id: '1',
      title: 'Walking in Purpose: A Journey of Faith',
      excerpt: 'Discover how embracing your God-given purpose can transform every area of your life.',
      content: `<p>There is a unique purpose embedded in every soul. When we align our lives with this divine blueprint, everything shifts. Mountains move, doors open, and the ordinary becomes extraordinary.</p><p>The Wholistic Outreach exists to help women and families discover, walk in, and sustain that purpose through community, prayer, and practical support.</p><p>This year, we are seeing lives transformed in unprecedented ways — from career breakthroughs to restored families and renewed faith. You are invited to be part of this beautiful story.</p>`,
      author: 'Admin',
      date: '2026-04-10',
      category: 'Faith & Spirituality',
      published: true,
    },
    {
      id: '2',
      title: 'Community Impact: Stories That Inspire',
      excerpt: 'Real stories from women whose lives have been touched through our outreach programs.',
      content: `<p>Every outreach program carries with it the seeds of transformation. When we invest in communities, we are not just providing resources — we are restoring dignity, hope, and possibility.</p><p>This month, we spotlight three remarkable women from Lagos, Abuja, and Port Harcourt who have risen from difficult circumstances to become pillars in their communities.</p><p>Their stories remind us why the Wholistic Outreach mission is so vital: because every life wholistically transformed is a ripple that touches countless others.</p>`,
      author: 'Admin',
      date: '2026-04-05',
      category: 'Community',
      published: true,
    },
    {
      id: '3',
      title: 'Wellness & Wholeness: Body, Soul & Spirit',
      excerpt: 'How holistic wellness practices can strengthen your spiritual journey.',
      content: `<p>True wellness extends far beyond the physical. When we care for our bodies, nurture our souls, and feed our spirits, we operate at levels of excellence that change the world around us.</p><p>Our upcoming Wholeness Retreat will guide participants through evidence-based wellness practices rooted in spiritual principles — covering nutrition, mental health, prayer disciplines, and community accountability.</p>`,
      author: 'Admin',
      date: '2026-03-28',
      category: 'Wellness',
      published: true,
    },
  ];
  saveBlogPosts(defaults);
  return defaults;
};

export const saveBlogPosts = (posts: BlogPost[]) => {
  localStorage.setItem(BLOG_KEY, JSON.stringify(posts));
};

export const addBlogPost = (post: Omit<BlogPost, 'id'>): BlogPost => {
  const posts = getBlogPosts();
  const newPost = { ...post, id: Date.now().toString() };
  saveBlogPosts([newPost, ...posts]);
  return newPost;
};

export const updateBlogPost = (id: string, updates: Partial<BlogPost>): void => {
  const posts = getBlogPosts();
  const updated = posts.map(p => (p.id === id ? { ...p, ...updates } : p));
  saveBlogPosts(updated);
};

export const deleteBlogPost = (id: string): void => {
  const posts = getBlogPosts().filter(p => p.id !== id);
  saveBlogPosts(posts);
};

// ─── Events CMS ──────────────────────────────────────────────────────────────
export const getEvents = (): Event[] => {
  const data = localStorage.getItem(EVENTS_KEY);
  if (data) return JSON.parse(data);
  const defaults: Event[] = [
    {
      id: '1',
      title: 'Women of Purpose Conference 2026',
      description: 'A two-day transformational conference for women who want to live fully in their God-given purpose. Sessions include worship, workshops, mentorship panels, and networking.',
      date: '2026-05-14',
      time: '09:00 AM',
      location: 'Transcorp Hilton, Abuja, Nigeria',
      category: 'Conference',
      published: true,
    },
    {
      id: '2',
      title: 'Monthly Prayer & Praise Night',
      description: 'Join us for a powerful evening of intercession, worship, and testimonies. All are welcome.',
      date: '2026-04-25',
      time: '06:00 PM',
      location: 'Wholistic Centre, Lagos',
      category: 'Prayer',
      published: true,
    },
    {
      id: '3',
      title: 'Wholeness Retreat — Mind, Body & Spirit',
      description: 'A weekend retreat focused on holistic wellness. Activities include yoga, guided meditation, nutritional workshops, and spiritual counseling.',
      date: '2026-06-07',
      time: '08:00 AM',
      location: 'La Campagne Tropicana Resort, Lagos',
      category: 'Retreat',
      published: true,
    },
    {
      id: '4',
      title: 'Community Outreach & Food Drive',
      description: 'Help us feed 500 families in underserved communities. Volunteer opportunities available for all age groups.',
      date: '2026-05-01',
      time: '08:00 AM',
      location: 'Ajegunle, Lagos',
      category: 'Outreach',
      published: true,
    },
  ];
  saveEvents(defaults);
  return defaults;
};

export const saveEvents = (events: Event[]) => {
  localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
};

export const addEvent = (event: Omit<Event, 'id'>): Event => {
  const events = getEvents();
  const newEvent = { ...event, id: Date.now().toString() };
  saveEvents([newEvent, ...events]);
  return newEvent;
};

export const updateEvent = (id: string, updates: Partial<Event>): void => {
  const events = getEvents();
  const updated = events.map(e => (e.id === id ? { ...e, ...updates } : e));
  saveEvents(updated);
};

export const deleteEvent = (id: string): void => {
  const events = getEvents().filter(e => e.id !== id);
  saveEvents(events);
};
