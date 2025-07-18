import { ReactNode } from 'react';
import { Navbar } from '../components/Navbar';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto max-w-7xl px-4 py-6">
        {children}
      </main>
    </div>
  );
} 