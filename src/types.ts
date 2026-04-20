export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  image?: string;
  published: boolean;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  image?: string;
  registrationLink?: string;
  published: boolean;
}

export interface DonationConfig {
  amount: number;
  currency: string;
  method: 'flutterwave' | 'paystack' | 'paypal' | 'stripe';
  name: string;
  email: string;
  phone?: string;
  message?: string;
}
