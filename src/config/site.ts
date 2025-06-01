import type { NavItem } from '@/types';
import { Shield, Users, ScrollText, BookOpen, Home, Milestone, Wand2, UserCircle, PlusCircle, LogIn, LogOut, Settings } from 'lucide-react';

export type SiteConfig = {
  name: string;
  description: string;
  mainNav: NavItem[];
  mobileNavHeader: NavItem[];
  mobileNavFooter: NavItem[];
  adminNav?: NavItem[];
};

export const siteConfig: SiteConfig = {
  name: "Wanderer's Archive",
  description: "A mystical archive of characters from realms of fantasy, where tales of valor and whispers of legend are eternally preserved.",
  mainNav: [
    { title: "Home", href: "/", icon: Home },
    { title: "Eternal", href: "/characters/eternal", icon: Shield, description: "Legends whose tales are etched in eternity." },
    { title: "Forgotten", href: "/characters/forgotten", icon: Users, description: "Heroes whose stories faded into mist." },
    { title: "Rumors", href: "/characters/rumors", icon: ScrollText, description: "Whispers of characters yet to be proven." },
    { title: "About the Tavern", href: "/about", icon: Milestone, description: "Learn about this mystical archive." },
    { title: "Lore", href: "/lore", icon: BookOpen, description: "Delve into the world's history." },
  ],
  mobileNavHeader: [ // These are always available links for mobile nav
    { title: "Home", href: "/", icon: Home },
    { title: "Eternal", href: "/characters/eternal", icon: Shield },
    { title: "Forgotten", href: "/characters/forgotten", icon: Users },
    { title: "Rumors", href: "/characters/rumors", icon: ScrollText },
    { title: "About the Tavern", href: "/about", icon: Milestone },
    { title: "Lore", href: "/lore", icon: BookOpen },
  ],
  mobileNavFooter: [ // These are shown based on auth state in mobile nav
    { title: "Profile", href: "/profile", icon: UserCircle, authRequired: true },
    { title: "New Character", href: "/characters/new", icon: PlusCircle, authRequired: true },
    { title: "Admin Panel", href: "/admin/applications", icon: Settings, adminRequired: true },
    { title: "Login", href: "/auth/login", icon: LogIn, publicOnly: true },
    { title: "Register", href: "/auth/register", icon: Wand2, publicOnly: true },
    // Logout is handled by a button with an action
  ],
  adminNav: [
    { title: "Applications", href: "/admin/applications", icon: ScrollText },
    // Add more admin links here if needed
  ],
};
