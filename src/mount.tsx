import { StrictMode, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';

/** نقطهٔ اتصال مشترک همهٔ صفحه‌ها */
export const mount = (node: ReactNode): void => {
  const el = document.getElementById('root');
  if (!el) return;
  createRoot(el).render(<StrictMode>{node}</StrictMode>);
};
