import type { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { useReveal } from '../lib/hooks';
import { ToastProvider } from '../lib/toast';

export const Layout = ({ active, children }: { active: string; children: ReactNode }) => {
  useReveal();

  return (
    <ToastProvider>
      <a className="skip-link" href="#main">
        رفتن به محتوای اصلی
      </a>
      <Header active={active} />
      <main id="main">{children}</main>
      <Footer />
    </ToastProvider>
  );
};
