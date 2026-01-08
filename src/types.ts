// Fix: Import React to resolve namespace error
import React from 'react';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  details: string[];
  icon: React.ReactNode;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
}