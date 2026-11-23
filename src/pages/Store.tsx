import { useState } from 'react';
import { Icon } from '../components/Icons';
import { Btn, Crumbs, PlanCard, Reveal, SecHead, Section, Segmented } from '../components/ui';
import { DURATIONS, PLANS, TRIAL, planTotal } from '../data/plans';
import { SERVERS, serverIcon, tierLabel } from '../data/servers';
import { SITE, faNum, toman, url } from '../data/site';

const allServers = (ids: string[]) => SERVERS.filter((s) => ids.includes(s.id));

export const Store = () => {
  const [days, setDays] = useState(30);
  const months = Math.round(days / 30);

  return (
    <>
      <div className="page-hero">
        <div className="wrap">
          <Crumbs items={[{ label: 'اشتراک‌ها' }]} />
          <Reveal>
            <span className="eyebrow">اشتراک</span>
            <h1>پایه یا پلاس؛ انتخاب با تو</h1>
            <p className="lead">
              اشتراک روی یک نام ماینکرفت فعال می‌شود و خودکار تمدید نمی‌گردد. بعد از پرداخت، از همان ورود بعدی وصل
              می‌شوی. قبل از خرید، {faNum(TRIAL.minutes)} دقیقه تست رایگان داری.
            </p>
          </Reveal>

          <Reveal className="toolbar" delay={1}>
            <Segmented
              legend="طول دوره"
              value={days}
              onChange={setDays}
              options={DURATIONS.map((d) => ({ value: d.days, label: d.label }))}
            />
            <span className="muted" style={{ fontSize: 'var(--fs-xs)' }}>
              مبلغ دوره‌های بلندتر در فروشگاه رسمی تخفیف دوره‌ای می‌خورد؛ عددی که اینجا می‌بینی پیش از آن تخفیف است.
            </span>
          </Reveal>
        </div>
      </div>

      <Section className="tight" id="plans">
        <div className="plans">
          {PLANS.map((p) => (
            <PlanCard key={p.id} plan={p} months={months} />
          ))}
        </div>

        <Reveal className="card card-pad" delay={1}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'space-between' }}>
            <div style={{ maxWidth: '62ch' }}>
              <span className="eyebrow">دورهٔ انتخابی</span>
              <h3 style={{ marginTop: '0.5rem' }}>
                {faNum(days)} روز اشتراک — {months > 1 ? `${faNum(months)} ماه` : 'یک ماه'}
              </h3>
              <p className="lead" style={{ marginTop: '0.5rem', fontSize: 'var(--fs-sm)' }}>
                {months > 1
                  ? `مبلغ پیش از تخفیف دوره: پایه ${toman(planTotal(PLANS[0].monthly, months))} و پلاس ${toman(
                      planTotal(PLANS[1].monthly, months),
                    )}. تخفیف دوره در صفحهٔ پرداخت اعمال می‌شود.`
                  : 'برای دوره‌های ۹۰ روزه، ۱۸۰ روزه و یک‌ساله، فروشگاه تخفیف بیشتری روی هر ۳۰ روز اعمال می‌کند.'}
              </p>
            </div>
            <Btn href={url(`/order/?tier=plus&plan=${days}`)} variant="violet" size="lg" icon="card">
              ادامهٔ خرید
            </Btn>
          </div>
        </Reveal>
      </Section>

      <Section id="compare">
        <SecHead
          eyebrow="مقایسه"
          title="دقیقاً چه چیزی می‌گیری"
          lead="لیست سرورهای هر سطح همان است که در فهرست سرورها می‌بینی؛ پایه هفتگی می‌چرخد و پلاس ثابت است."
        />

        <div className="plan-feats" style={{ gap: '0.9rem' }}>
          {PLANS.map((p, i) => (
            <Reveal className="card card-pad" key={p.id} delay={i}>
              <div className="plan-top">
                <div>
                  <div className="plan-name" style={{ fontSize: '1.1rem' }}>
                    {p.name} — {faNum(p.includedIds.length)} سرور
                  </div>
                  <div className="plan-sub">{p.rotating ? 'شامل چرخش هفتگی' : 'همهٔ سرورها، ثابت'}</div>
                </div>
                <span className={`badge ${p.highlight ? 'badge-violet' : 'badge-cyan'}`}>{p.highlight ? 'پلاس' : 'پایه'}</span>
              </div>

              <div className="server-pills" style={{ marginTop: '1rem' }}>
                {allServers(p.includedIds).map((s) => (
                  <span className="server-pill" key={s.id}>
                    <img src={serverIcon(s.id)} alt="" width={14} height={14} loading="lazy" />
                    {s.name}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="card card-pad" delay={2}>
          <h3 style={{ marginBottom: '0.8rem' }}>چیزهایی که در هر دو سطح هست</h3>
          <ul className="plan-feats" style={{ borderTop: 0, paddingTop: 0 }}>
            {[
              'اتصال خودکار به بهترین مسیر و مسیر جایگزین ترکیه',
              'فعال‌سازی لحظه‌ای روی نام ماینکرفت، بدون رمز اکانت',
              'پرداخت ریالی از طریق درگاه زرین‌پال',
              'بدون تمدید خودکار و بدون صف انتظار',
              `${faNum(TRIAL.minutes)} دقیقه تست رایگان برای هر اکانت (سرورهای بدون اکانت: ${faNum(
                TRIAL.crackedMinutes,
              )} دقیقه در روز)`,
            ].map((f) => (
              <li key={f}>
                <Icon name="check" size={14} strokeWidth={2} /> {f}
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      <Section id="gift">
        <SecHead
          eyebrow="هدیه"
          title="برای رفیقت هم می‌توانی بخری"
          lead="موقع خرید گزینهٔ هدیه را انتخاب می‌کنی و نام اکانت او را می‌دهی. کارت هدیه هم موجود است: کد را به او می‌دهی و خودش فعالش می‌کند."
        />

        <div className="steps">
          {[
            {
              icon: 'gift' as const,
              title: 'کارت هدیه',
              body: 'روزهای پایه اضافه می‌کند و به‌خودی‌خود پلاس نمی‌دهد. روی اشتراک فعلی اضافه می‌شود، جایش را نمی‌گیرد.',
            },
            {
              icon: 'user' as const,
              title: 'خرید برای دیگری',
              body: 'نام اکانت او را وارد کن؛ اشتراک روی همان نام فعال می‌شود و از ورود بعدی‌اش کار می‌کند.',
            },
            {
              icon: 'shield' as const,
              title: 'یک هشدار ساده',
              body: 'نام را دقیق وارد کن. اشتراک روی همان نامی فعال می‌شود که نوشتی و انتقال یا اصلاح بعد از پرداخت ممکن نیست.',
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
        <SecHead eyebrow="مراحل خرید" title="از انتخاب تا اولین ورود" />
        <div className="steps">
          {[
            { t: 'سطح و دوره را انتخاب کن', b: 'پایه یا پلاس؛ ۳۰، ۹۰، ۱۸۰ روز یا یک سال.' },
            { t: 'نام ماینکرفت را بده', b: 'اسکین همان لحظه نمایش داده می‌شود تا مطمئن شوی درست است.' },
            { t: 'شمارهٔ موبایل', b: 'برای اطلاع‌رسانی وضعیت سفارش. آیدی دیسکورد اختیاری است.' },
            { t: 'پرداخت با زرین‌پال', b: 'پرداخت ریالی و آنلاین، بدون کارت ارزی.' },
            { t: 'فعال‌سازی فوری', b: 'از همان ورود بعدی وصل می‌شوی؛ لینک پروفایل هم می‌گیری.' },
          ].map((s, i) => (
            <Reveal className="step" key={s.t} delay={i % 3}>
              <span className="step-n">مرحله {faNum(i + 1)}</span>
              <h3 style={{ marginTop: '0.35rem' }}>{s.t}</h3>
              <p>{s.b}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="cta-band" delay={1}>
          <div>
            <h2>آماده‌ای؟ سفارش را این‌جا آماده کن</h2>
            <p>
              فرم سفارش، نام اکانت و دوره را می‌گیرد و خلاصهٔ سفارش را برایت می‌سازد. پرداخت در درگاه رسمی زرین‌پال انجام
              می‌شود.
            </p>
          </div>
          <div className="cta-actions">
            <Btn href={url('/order/')} variant="primary" size="lg" icon="card">
              رفتن به فرم سفارش
            </Btn>
            <Btn href={SITE.storeUrl} external variant="ghost" size="lg" icon="external">
              فروشگاه رسمی
            </Btn>
          </div>
        </Reveal>
      </Section>

      <Section>
        <SecHead eyebrow="سرورها" title="لیست کامل سطح‌ها" />
        <div className="srv-grid">
          {SERVERS.map((s) => (
            <Reveal className="card card-pad" key={s.id} delay={0}>
              <div className="srv-top">
                <img className="srv-ico" src={serverIcon(s.id)} alt="" width={42} height={42} loading="lazy" />
                <div>
                  <div className="srv-name">{s.name}</div>
                  <span className="srv-en">{s.en}</span>
                </div>
                <span
                  className={`badge ${
                    s.tier === 'plus' ? 'badge-violet' : s.tier === 'base' ? 'badge-cyan' : 'badge-mint'
                  }`}
                  style={{ marginInlineStart: 'auto' }}
                >
                  {tierLabel[s.tier]}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
};
