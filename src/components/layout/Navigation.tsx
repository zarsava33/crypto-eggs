import React from 'react';
import { Home, ShoppingBag, Box, Users, User } from 'lucide-react';
import type { Section } from '../../types';

interface NavigationProps {
  activeSection: Section;
  setActiveSection: (section: Section) => void;
}

const navigationItems = [
  { id: 'farm', icon: Home, label: 'Farm' },
  { id: 'shop', icon: ShoppingBag, label: 'Shop' },
  { id: 'inventory', icon: Box, label: 'Inventory' },
  { id: 'friends', icon: Users, label: 'Friends' },
  { id: 'profile', icon: User, label: 'Profile' }
] as const;

export function Navigation({ activeSection, setActiveSection }: NavigationProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black/50 backdrop-blur-lg border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between py-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id as Section)}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                  activeSection === item.id
                    ? 'text-purple-400'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                <Icon size={24} />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}