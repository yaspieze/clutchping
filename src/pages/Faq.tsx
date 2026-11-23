import { Accordion, Btn, Crumbs, Reveal, Section, scrollToId, useActiveSection } from '../components/ui';
import { Icon } from '../components/Icons';
import { FAQ_GROUPS } from '../data/faq';
import { SITE, url } from '../data/site';

const ids = FAQ_GROUPS.map((g) => g.id);

export const Faq = () => {
  const active = useActiveSection(ids);

  return (
    <>
      <div className="page-hero">
        <div className="wrap">
          <Crumbs items={[{ label: 'سؤالات پرتکرار' }]} />
          <Reveal>
            <span className="eyebrow">پرسش‌های پرتکرار</span>
            <h1>هر چیزی که قبل از خرید می‌پرسی</h1>
            <p className="lead">
              پاسخ‌ها بر اساس رفتار واقعی سرویس نوشته شده‌اند: تست رایگان، سطح‌ها، امنیت اکانت و کیفیت اتصال. اگر جواب
              سوالت اینجا نبود، در دیسکورد بپرس.
            </p>
          </Reveal>

          <Reveal className="toolbar" delay={1}>
            {FAQ_GROUPS.map((g) => (
              <button key={g.id} className="chip" type="button" aria-pressed={active === g.id} onClick={() => scrollToId(g.id)}>
                {g.title}
              </button>
            ))}
          </Reveal>
        </div>
      </div>

      <Section className="tight">
        {FAQ_GROUPS.map((g, gi) => (
          <section key={g.id} id={g.id} style={{ marginBottom: gi === FAQ_GROUPS.length - 1 ? 0 : '2.4rem' }}>
            <Reveal>
              <div className="sec-head" style={{ marginBottom: '0.9rem' }}>
                <div>
                  <span className="eyebrow">{`۰${gi + 1}`}</span>
                  <h2 style={{ fontSize: '1.35rem', marginTop: '0.4rem' }}>{g.title}</h2>
                </div>
              </div>
            </Reveal>
            <Accordion items={g.items} defaultOpen={gi === 0 ? 0 : null} />
          </section>
        ))}

        <Reveal className="cta-band" delay={1}>
          <div>
            <h2>جوابت اینجا نبود؟</h2>
            <p>
              سریع‌ترین راه، دیسکورد است. نام اکانت و اینکه روی کدام سرور و با چه اپراتوری وصل می‌شوی را بنویس تا دقیق
              بررسی شود.
            </p>
          </div>
          <div className="cta-actions">
            <Btn href={SITE.discord} external variant="primary" size="lg" icon="discord">
              پرسیدن در دیسکورد
            </Btn>
            <Btn href={url('/blog/')} variant="ghost" size="lg" icon="help">
              راهنمای اتصال
            </Btn>
          </div>
        </Reveal>

        <Reveal style={{ marginTop: '1.6rem' }}>
          <div className="foot-note" style={{ borderTop: 0 }}>
            <Icon name="info" size={14} />
            <p style={{ maxWidth: '80ch' }}>
              شرایط کامل خرید، بازگشت وجه و استفادهٔ درست در صفحهٔ{' '}
              <a href={url('/terms/')} style={{ color: 'var(--cyan)' }}>
                قوانین و شرایط
              </a>{' '}
              آمده است.
            </p>
          </div>
        </Reveal>
      </Section>
    </>
  );
};
