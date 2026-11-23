import { Icon } from '../components/Icons';
import { Topology } from '../components/Topology';
import { LeaderTable } from '../components/LeaderTable';
import {
  Accordion,
  AddrField,
  Btn,
  PlanCard,
  Reveal,
  SecHead,
  Section,
  ServerCard,
  ServerMarquee,
  Stats,
} from '../components/ui';
import { FAQ_FLAT } from '../data/faq';
import { PLANS } from '../data/plans';
import { LEADERBOARD, SNAPSHOT, DONORS, DONATE_GOAL } from '../data/community';
import { SERVERS } from '../data/servers';
import { SITE, faNum, toman, url } from '../data/site';

const featured = [
  'hypixel',
  'minemen',
  'cubecraft',
  'mccisland',
  'donutsmp',
  'wynncraft',
  'pika',
  'jartex',
  'mcpvp',
  'hive',
];

export const Home = () => (
  <>
    {/* ── هیرو ─────────────────────────────────────────────── */}
    <section className="hero">
      <div className="wrap">
        <div className="hero-in">
          <div>
            <span className="hero-eyebrow">
              <b>
                <Icon name="bolt" size={12} /> بدون نصب
              </b>
              مسیر کوتاه به سرورهای بزرگ ماینکرفت
            </span>

            <h1>
              هر هیت رو{' '}
              <span className="hl">
                کلاچ
                <svg viewBox="0 0 200 10" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M2 7C40 3 120 2 198 6" fill="none" stroke="#37e0f2" strokeWidth="2.4" strokeLinecap="round" />
                </svg>
              </span>{' '}
              کن
            </h1>

            <p className="hero-lead">
              از ایران راحت و بدون قطعی به سرورهای بزرگ ماینکرفت وصل شو؛ از <b>هایپیکسل</b> تا <b>کیوب‌کرفت</b>. هیچی
              نصب نمی‌کنی و هیچ تنظیمی را دست نمی‌زنی — فقط آدرس سرور را اضافه می‌کنی و می‌روی داخل بازی.
            </p>

            <AddrField value={SITE.autoAddress} hint="توی ماینکرفت: Multiplayer ← Add Server ← همین آدرس" />

            <div className="hero-cta">
              <Btn href={url('/store/')} variant="primary" size="lg" icon="bolt">
                خرید اشتراک
              </Btn>
              <Btn href={url('/faq/#start')} variant="ghost" size="lg" icon="clock">
                ۳۰ دقیقه تست رایگان
              </Btn>
            </div>

            <div className="hero-trust">
              <span>
                <Icon name="check" size={14} strokeWidth={2.4} /> بدون تمدید خودکار
              </span>
              <span>
                <Icon name="check" size={14} strokeWidth={2.4} /> رمز اکانت لازم نیست
              </span>
              <span>
                <Icon name="check" size={14} strokeWidth={2.4} /> فعال‌سازی لحظه‌ای
              </span>
            </div>
          </div>

          <div className="topo">
            <Topology />
          </div>
        </div>

        <Stats
          items={[
            { value: '۰٫۰۰۰', unit: '٪', label: 'پکت‌لاس اندازه‌گیری‌شده سمت بازیکن' },
            { value: faNum(SERVERS.length), label: 'سرور در فهرست فعلی' },
            { value: '۳۰', unit: 'دقیقه', label: 'تست رایگان، خودکار و بدون ثبت‌نام' },
            { value: '۰٫۳', unit: 'ms', label: 'افزایش تأخیر مسیر ما' },
          ]}
        />
      </div>
    </section>

    <ServerMarquee servers={SERVERS} />

    {/* ── دسترسی سریع ──────────────────────────────────────── */}
    <div className="wrap">
      <div className="cat-tiles">
        {[
          {
            href: '/servers/',
            icon: 'server' as const,
            title: 'فهرست سرورها',
            body: `${faNum(SERVERS.length)} سرور با آدرس اختصاصی و وضعیت باز بودن در هر سطح اشتراک.`,
          },
          {
            href: '/store/',
            icon: 'bolt' as const,
            title: 'اشتراک پایه و پلاس',
            body: 'دو سطح، چهار دورهٔ زمانی؛ قیمت روزانه و تخفیف دوره روی همان صفحه محاسبه می‌شود.',
          },
          {
            href: '/leaderboard/',
            icon: 'trophy' as const,
            title: 'لیدربورد هفتگی',
            body: 'زمان بازی بازیکن‌ها روی سرورها، با ریست هر هفته و نشان‌های داخل بازی.',
          },
          {
            href: '/blog/',
            icon: 'help' as const,
            title: 'راهنمای اتصال',
            body: 'تفاوت پینگ و پکت‌لاس، و راه‌اندازی هایپیکسل و بدراک قدم‌به‌قدم.',
          },
        ].map((c) => (
          <Reveal className="cat" key={c.href} as="a" href={url(c.href)}>
            <span className="cat-go">
              <Icon name="arrow" size={14} />
            </span>
            <span className="cat-ico">
              <Icon name={c.icon} size={20} />
            </span>
            <h3>{c.title}</h3>
            <p>{c.body}</p>
          </Reveal>
        ))}
      </div>
    </div>

    {/* ── چطور کار می‌کند ───────────────────────────────────── */}
    <Section>
      <SecHead
        eyebrow="مسیر اتصال"
        title="سه قدم، بدون تنظیم"
        lead="کلاچ پینگ سرور بازی نیست؛ مسیر رسیدن به همان سرور همیشگی است. بین تو و سرور مقصد می‌ایستد، بهترین مسیر را انتخاب می‌کند و بسته‌های بازی را از همان مسیر رد می‌کند."
      />

      <div className="steps">
        {[
          {
            icon: 'terminal' as const,
            title: 'آدرس را اضافه کن',
            body: 'در ماینکرفت به Multiplayer برو، Add Server بزن و آدرس اختصاصی همان سرور را بگذار. مثلاً هایپیکسل: ',
            code: 'mc.clutchping.com',
          },
          {
            icon: 'route' as const,
            title: 'وصل شو',
            body: 'اتصال خودکار وضعیت مسیرها را می‌بیند و بهترین را انتخاب می‌کند: مسیر مستقیم ایران، یا مسیر جایگزین ترکیه وقتی مسیر اصلی بسته است.',
          },
          {
            icon: 'signal' as const,
            title: 'بازی کن',
            body: 'همان سرور، همان اکانت، همان دنیا. تنها تفاوت این است که بسته‌های بازی مسیر کوتاه‌تر و پایدارتری را طی می‌کنند.',
          },
        ].map((s, i) => (
          <Reveal className="step" key={s.title} delay={i}>
            <div className="step-ico">
              <Icon name={s.icon} />
            </div>
            <span className="step-n">قدم {faNum(i + 1)}</span>
            <h3>{s.title}</h3>
            <p>
              {s.body}
              {s.code ? <code className="mono">{s.code}</code> : null}
            </p>
          </Reveal>
        ))}
      </div>
    </Section>

    {/* ── سرورها ───────────────────────────────────────────── */}
    <Section id="servers">
      <SecHead
        eyebrow="سرورها"
        title="هر جا بازی می‌کنی، مسیرش هست"
        lead="جاوا، سرورهای بدون اکانت و بدراک؛ همه در یک فهرست با آدرس اتصال و وضعیت باز بودن در هر سطح اشتراک."
        action={
          <Btn href={url('/servers/')} variant="ghost" size="sm" iconEnd="arrow">
            فهرست کامل
          </Btn>
        }
      />

      <div className="srv-grid">
        {SERVERS.filter((s) => featured.includes(s.id)).map((s) => (
          <ServerCard s={s} key={s.id} />
        ))}
      </div>
    </Section>

    {/* ── اشتراک‌ها ─────────────────────────────────────────── */}
    <Section id="plans">
      <SecHead
        eyebrow="اشتراک"
        title="یک بار می‌خری، خودکار تمدید نمی‌شود"
        lead="دو سطح دارد: پایه و پلاس. اسم ماینکرفت را می‌دهی، اشتراک روی همان اسم فعال می‌شود و از ورود بعدی وصل می‌شوی."
        action={
          <Btn href={url('/store/')} variant="ghost" size="sm" iconEnd="arrow">
            مقایسهٔ کامل
          </Btn>
        }
      />

      <div className="plans">
        {PLANS.map((p) => (
          <PlanCard plan={p} months={1} key={p.id} compact />
        ))}
      </div>
    </Section>

    {/* ── لیدربورد ─────────────────────────────────────────── */}
    <Section id="leaderboard">
      <SecHead
        eyebrow="لیدربورد هفتگی"
        title="این هفته، بچه‌ها چقدر بازی کردند"
        lead="هر هفته از صفر شروع می‌شود. عددها از بازی واقعی روی سرورهای کلاچ پینگ می‌آید و رنک و اسکین هر نفر مستقیم از هایپیکسل خوانده می‌شود."
        action={
          <Btn href={url('/leaderboard/')} variant="ghost" size="sm" iconEnd="arrow">
            جدول کامل
          </Btn>
        }
      />

      <LeaderTable rows={LEADERBOARD.slice(0, 6)} />

      <Reveal className="grid-notes" delay={1}>
        <p className="muted" style={{ marginTop: '0.9rem', fontSize: 'var(--fs-xs)' }}>
          اسنپ‌شات {SITE.updatedFa} · {faNum(SNAPSHOT.players)} بازیکن در جدول · طولانی‌ترین سشن بدون قطعی:{' '}
          <b>{SNAPSHOT.longestSession}</b>
        </p>
      </Reveal>
    </Section>

    {/* ── حمایت ────────────────────────────────────────────── */}
    <Section id="donate">
      <Reveal className="cta-band" as="section">
        <div>
          <span className="eyebrow">قهرمانان ما</span>
          <h2 style={{ marginTop: '0.6rem' }}>کلاچ پینگ در بتاست؛ سرورها با حمایت اضافه می‌شوند</h2>
          <p>
            هر حمایت صرف راه‌اندازی مسیر و سرور بیشتر می‌شود و اسم حامی روی تابلو می‌ماند. تا امروز{' '}
            <b>{faNum(DONORS.length)}</b> نفر در تابلو ثبت شده‌اند و هدف، رسیدن به {toman(DONATE_GOAL)} است.
          </p>
          <div className="progress-wrap" style={{ maxWidth: 460 }}>
            <div className="progress-top">
              <span>پیشرفت هدف</span>
              <b className="num">{toman(0)}</b>
            </div>
            <div className="progress">
              <i style={{ width: '0.6%' }} />
            </div>
          </div>
        </div>
        <div className="cta-actions">
          <Btn href={url('/donate/')} variant="primary" icon="heart">
            حمایت می‌کنم
          </Btn>
          <Btn href={url('/leaderboard/')} variant="ghost" icon="trophy">
            لیدربورد
          </Btn>
        </div>
      </Reveal>
    </Section>

    {/* ── سؤالات ───────────────────────────────────────────── */}
    <Section id="faq">
      <div style={{ display: 'grid', gap: '1.6rem', gridTemplateColumns: 'minmax(0,1fr)' }}>
        <SecHead
          eyebrow="سؤالات پرتکرار"
          title="قبل از خرید بدان"
          action={
            <Btn href={url('/faq/')} variant="ghost" size="sm" iconEnd="arrow">
              همهٔ سؤالات
            </Btn>
          }
        />
        <Accordion items={FAQ_FLAT.slice(0, 5)} />
      </div>
    </Section>

    {/* ── CTA پایانی ───────────────────────────────────────── */}
    <Section>
      <Reveal className="cta-band">
        <div>
          <h2>اول تست کن، بعد تصمیم بگیر</h2>
          <p>
            سی دقیقهٔ اول هر اتصال رایگان است؛ نه ثبت‌نام، نه کارت بانکی. سرور را اضافه کن و ببین روی اینترنت خودت چه
            حسی دارد.
          </p>
          <div style={{ marginTop: '1.1rem', maxWidth: 400 }}>
            <AddrField value={SITE.autoAddress} />
          </div>
        </div>
        <div className="cta-actions">
          <Btn href={url('/order/')} variant="primary" size="lg" icon="card">
            ثبت سفارش
          </Btn>
          <Btn href={SITE.discord} external variant="ghost" size="lg" icon="discord">
            دیسکورد
          </Btn>
        </div>
      </Reveal>
    </Section>
  </>
);
