import { useMemo } from 'react';
import { Btn, Crumbs, Reveal, Section, useActiveSection } from '../components/ui';
import { Icon } from '../components/Icons';
import { TERMS } from '../data/terms';
import { SITE, url } from '../data/site';

export const Terms = () => {
  const ids = useMemo(() => TERMS.map((t) => t.id), []);
  const active = useActiveSection(ids);

  return (
    <>
      <div className="page-hero">
        <div className="wrap">
          <Crumbs items={[{ label: 'قوانین و شرایط' }]} />
          <Reveal>
            <span className="eyebrow">قوانین</span>
            <h1>قوانین و شرایط</h1>
            <p className="lead">
              این صفحه خلاصهٔ فارسی قوانین کلاچ پینگ است. نسخهٔ معتبر همیشه نسخهٔ صفحهٔ رسمی است؛ اگر جایی ابهام داشتی، در
              دیسکورد بپرس.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1rem' }}>
              <span className="badge badge-cyan">
                <Icon name="shield" size={12} /> فیلترشکن نیست
              </span>
              <span className="badge">پرداخت ریالی با زرین‌پال</span>
              <span className="badge">بدون تمدید خودکار</span>
            </div>
          </Reveal>
        </div>
      </div>

      <Section className="tight">
        <div className="legal">
          <nav className="toc" aria-label="فهرست قوانین">
            <h4>فهرست</h4>
            {TERMS.map((t) => (
              <a key={t.id} href={`#${t.id}`} className={active === t.id ? 'is-active' : ''}>
                {t.title}
              </a>
            ))}
          </nav>

          <div>
            {TERMS.map((t, i) => (
              <section key={t.id} id={t.id}>
                <h2>
                  <span>{`۰${i + 1}`}</span>
                  {t.title}
                </h2>
                {t.intro ? <p style={{ marginTop: '0.7rem' }}>{t.intro}</p> : null}
                <ul>
                  {t.items.map((item) => (
                    <li key={item} dangerouslySetInnerHTML={{ __html: bolden(item) }} />
                  ))}
                </ul>
              </section>
            ))}

            <div className="card card-pad" style={{ marginTop: '2.4rem' }}>
              <h3 style={{ fontSize: '1.05rem' }}>خلاصهٔ سه‌خطی</h3>
              <ul className="plan-feats" style={{ borderTop: 0, paddingTop: '0.6rem', marginTop: 0 }}>
                <li>
                  <Icon name="check" size={14} /> اشتراک روی یک نام فعال می‌شود، خودکار تمدید نمی‌شود و بعد از خرید قابل
                  انتقال نیست.
                </li>
                <li>
                  <Icon name="check" size={14} /> قبل از خرید تست رایگان بگیر؛ بعد از خرید وجه برنمی‌گردد.
                </li>
                <li>
                  <Icon name="check" size={14} /> سرویس فقط برای بازی است؛ چت و محتوای بازی خوانده نمی‌شود.
                </li>
              </ul>
              <div className="cta-actions" style={{ marginTop: '1rem' }}>
                <Btn href={url('/faq/')} variant="ghost" icon="help">
                  سؤالات پرتکرار
                </Btn>
                <Btn href={SITE.discord} external variant="primary" icon="discord">
                  پرسیدن در دیسکورد
                </Btn>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
};

/** عبارت‌های داخل **...** را پررنگ می‌کند (بدون HTML دلخواه) */
function bolden(text: string): string {
  const safe = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
  return safe.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
}
