
import type { LucideIcon } from 'lucide-react';

export type UserRole = 'player' | 'dm' | 'admin';

export interface User {
  id: string;
  email: string;
  name?: string;
  role: UserRole;
  avatarUrl?: string; 
}

export interface CharacterApplication {
  id: string;
  userId: string;
  userName?: string; // Name of the user who submitted
  characterName: string;
  title?: string;
  story: string;
  race: string;
  characterClass: string;
  description: string;
  category: Character['category']; // Added category
  status: 'pending' | 'accepted' | 'rejected';
  rejectionReason?: string;
  submissionDate: string; // ISO date string
  reviewedBy?: string; // Admin user ID
  reviewDate?: string; // ISO date string
}

export interface Character {
  id:string;
  name: string;
  title?: string;
  story: string;
  race: string;
  characterClass: string;
  description: string;
  imageUrl?: string;
  category: 'eternal' | 'forgotten' | 'rumor';
  submittedBy?: string; // User name or ID
}

// Navigation item type used in site.ts
export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
  external?: boolean;
  authRequired?: boolean; // Needs login
  adminRequired?: boolean; // Needs admin role
  publicOnly?: boolean; // Only show if not logged in
  icon?: LucideIcon;
  label?: string;
  description?: string;
};
