import { useCallback, useEffect, useRef, useState } from 'react';

/** نمایش تدریجی بخش‌ها هنگام ورود به دید (شامل عناصری که بعداً ساخته می‌شوند) */
export function useReveal(): void {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );

    const observe = (root: ParentNode) => {
      root.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-in)').forEach((n) => io.observe(n));
    };

    observe(document);

    // عناصری که بعد از mount ساخته می‌شوند (مثل پنل موفقیت فرم)
    const mo = new MutationObserver((records) => {
      for (const r of records) {
        r.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            if (node.matches('[data-reveal]:not(.is-in)')) io.observe(node);
            observe(node);
          }
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
}

/** سایه و پس‌زمینهٔ هدر بعد از اسکرول */
export function useScrolled(offset = 8): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > offset);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [offset]);

  return scrolled;
}

/** کپی در کلیپ‌بورد با بازخورد کوتاه */
export function useCopy(timeout = 1800): [string | null, (text: string, id?: string) => void] {
  const [copied, setCopied] = useState<string | null>(null);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = useCallback(
    (text: string, id?: string) => {
      const done = () => {
        setCopied(id ?? text);
        window.clearTimeout(timer.current);
        timer.current = window.setTimeout(() => setCopied(null), timeout);
      };

      if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(text).then(done).catch(done);
      } else {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        try {
          document.execCommand('copy');
        } catch {
          /* بی‌صدا رد می‌شویم */
        }
        document.body.removeChild(ta);
        done();
      }
    },
    [timeout],
  );

  return [copied, copy];
}

/** بستن پنل با کلید Escape و قفل اسکرول */
export function useDismiss(open: boolean, close: () => void): void {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close]);
}
