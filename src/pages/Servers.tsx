import { useMemo, useState } from 'react';
import { Icon } from '../components/Icons';
import { Btn, Crumbs, Reveal, SecHead, Section, ServerCard } from '../components/ui';
import { EDITIONS, SERVERS, type Edition, type Tier } from '../data/servers';
import { SITE, faNum, url } from '../data/site';

type EditionFilter = 'all' | Edition;
type TierFilter = 'all' | Tier;

export const Servers = () => {
  const [edition, setEdition] = useState<EditionFilter>('all');
  const [tier, setTier] = useState<TierFilter>('all');
  const [q, setQ] = useState('');

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return SERVERS.filter((s) => {
      if (edition !== 'all' && s.edition !== edition) return false;
      if (tier !== 'all' && s.tier !== tier) return false;
      if (!needle) return true;
      return (
        s.name.includes(needle) ||
        s.en.toLowerCase().includes(needle) ||
        (s.address ?? '').toLowerCase().includes(needle)
      );
    });
  }, [edition, tier, q]);

  const countOf = (id: Edition) => SERVERS.filter((s) => s.edition === id).length;

  return (
    <>
      <div className="page-hero">
        <div className="wrap">
          <Crumbs items={[{ label: 'سرورها' }]} />

          <Reveal>
            <span className="eyebrow">فهرست سرورها</span>
            <h1>هر سرور، آدرس خودش</h1>
            <p className="lead">
              آدرس اتصال خودکار برای کل شبکه یکی است ({SITE.autoAddress})، ولی اگر خواستی مستقیم به یک سرور وصل شوی،
              آدرس اختصاصی‌اش را از همین فهرست بردار. لیست سرورهای پایه هر جمعه ظهر می‌چرخد؛ سرورهای پلاس ثابت‌اند.
            </p>
          </Reveal>

          <Reveal className="toolbar" delay={1}>
            <button
              className="chip"
              type="button"
              aria-pressed={edition === 'all'}
              onClick={() => setEdition('all')}
            >
              همه
              <span className="chip-count">{faNum(SERVERS.length)}</span>
            </button>
            {EDITIONS.map((ed) => (
              <button
                key={ed.id}
                className="chip"
                type="button"
                aria-pressed={edition === ed.id}
                onClick={() => setEdition(ed.id)}
              >
                <img src={`${import.meta.env.BASE_URL}assets/servers/${ed.icon}.webp`} alt="" width={16} height={16} loading="lazy" />
                {ed.name}
                <span className="chip-count">{faNum(countOf(ed.id))}</span>
              </button>
            ))}

            <span style={{ width: 1, height: 22, background: 'var(--line)', marginInline: 6 }} />

            <button className="chip" type="button" aria-pressed={tier === 'all'} onClick={() => setTier('all')}>
              هر دو سطح
            </button>
            <button className="chip" type="button" aria-pressed={tier === 'base'} onClick={() => setTier('base')}>
              پایه
            </button>
            <button className="chip" type="button" aria-pressed={tier === 'plus'} onClick={() => setTier('plus')}>
              پلاس
            </button>

            <div className="search">
              <Icon name="search" size={16} />
              <label className="sr-only" htmlFor="srv-search">
                جستجوی سرور
              </label>
              <input
                id="srv-search"
                type="search"
                placeholder="جستجو میان سرورها…"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </div>
          </Reveal>
        </div>
      </div>

      <Section className="tight">
        <p className="muted" style={{ fontSize: 'var(--fs-xs)', marginBottom: '1rem' }} role="status">
          {faNum(list.length)} سرور در این نمایش
        </p>

        {list.length ? (
          <div className="srv-grid">
            {list.map((s) => (
              <div key={s.id} id={`srv-${s.id}`} style={{ display: 'contents' }}>
                <ServerCard s={s} />
              </div>
            ))}
          </div>
        ) : (
          <div className="empty">
            <Icon name="search" size={30} />
            <b>برای این فیلتر سروری پیدا نشد</b>
            <p style={{ fontSize: 'var(--fs-sm)' }}>فیلترها را پاک کن یا نام دیگری جستجو کن.</p>
            <Btn
              variant="ghost"
              size="sm"
              onClick={() => {
                setEdition('all');
                setTier('all');
                setQ('');
              }}
            >
              پاک کردن فیلترها
            </Btn>
          </div>
        )}
      </Section>

      <Section>
        <SecHead
          eyebrow="مسیرها"
          title="اتصال خودکار، یا مسیر دستی"
          lead="هر سرور چند مسیر دارد: مسیر مستقیم از ایران و مسیر جایگزین که از ترکیه عبور می‌کند. اتصال خودکار بین این‌ها انتخاب می‌کند؛ مسیرهای دستی با اشتراک باز می‌شوند."
        />
        <div className="steps">
          {[
            {
              icon: 'route' as const,
              title: 'مسیر مستقیم (IR)',
              body: 'سریع‌ترین حالت برای بیشتر اپراتورها. بسته‌های بازی از نزدیک‌ترین نقطه وارد شبکه می‌شوند و به مقصد می‌رسند.',
            },
            {
              icon: 'globe' as const,
              title: 'مسیر جایگزین (TR)',
              body: 'وقتی مسیر مستقیم روی اپراتور تو بسته یا ناپایدار است، این مسیر از ترکیه عبور می‌کند و مقصد را باز نگه می‌دارد.',
            },
            {
              icon: 'shield' as const,
              title: 'پایداری، نه عدد قشنگ',
              body: 'معیار ما نبود قطعی است. پکت‌لاس سمت بازیکن اندازه‌گیری می‌شود، چون همان چیزی است که هیت را خراب می‌کند.',
            },
          ].map((s, i) => (
            <Reveal className="step" key={s.title} delay={i}>
              <div className="step-ico">
                <Icon name={s.icon} />
              </div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <Reveal className="cta-band">
          <div>
            <h2>آدرست را برداشتی؛ نوبت اشتراک است</h2>
            <p>
              با پایه فقط هایپیکسل همیشه باز است و چهار سرور هر جمعه عوض می‌شوند. اگر می‌خواهی همهٔ سرورها همیشه باشند،
              پلاس را ببین.
            </p>
          </div>
          <div className="cta-actions">
            <Btn href={url('/store/')} variant="primary" size="lg" icon="bolt">
              دیدن اشتراک‌ها
            </Btn>
            <Btn href={SITE.discord} external variant="ghost" size="lg" icon="discord">
              راهنمایی در دیسکورد
            </Btn>
          </div>
        </Reveal>
      </Section>
    </>
  );
};
