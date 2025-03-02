import { ReactNode } from 'react';
import { Navigation } from './Navigation';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900/20 to-gray-900">
      <Navigation />
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
}
 