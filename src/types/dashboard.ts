
import { LucideIcon } from 'lucide-react';

export interface AiInsight {
  id: number;
  title: string;
}

export interface DummyFleetResponse {
  keywords: string[];
  response: string;
  followUps: string[];
}

export interface ExampleQuestion {
  id: number;
  question: string;
  icon: LucideIcon;
  category: string;
}

export interface AiCapability {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface Message {
  id: number;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}
