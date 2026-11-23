import { useState, type FormEvent } from 'react';
import { Icon } from '../components/Icons';
import { Btn, Crumbs, Reveal, SecHead, Section } from '../components/ui';
import { BADGES, DONORS, DONATE_GOAL } from '../data/community';
import { SITE, faNum, toman, url } from '../data/site';
import { useToast } from '../lib/toast';

const PRESETS = [
  { value: 100_000, title: '۱۰۰ هزار', label: 'حامی' },
  { value: 1_000_000, title: '۱ میلیون', label: 'قهرمان' },
  { value: 5_000_000, title: '۵ میلیون', label: 'افسانه' },
];

const raised = DONORS.reduce((sum, d) => sum + d.amount, 0);
const percent = Math.min((raised / DONATE_GOAL) * 100, 100);

export const Donate = () => {
  const [amount, setAmount] = useState(100_000);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [anon, setAnon] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const toast = useToast();

  const onSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    if (!anon && name.trim().length < 3) {
      setError('نام ماینکرفت را وارد کن یا گزینهٔ ناشناس را بزن.');
      return;
    }
    setError(null);
    setReady(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copy = () => {
    const text = [
      'حمایت از کلاچ پینگ',
      `مبلغ: ${toman(amount)}`,
      `نام: ${anon ? 'ناشناس' : name.trim()}`,
      message.trim() ? `پیام: ${message.trim()}` : null,
    ]
      .filter(Boolean)
      .join('\n');
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(
        () => toast('خلاصهٔ حمایت کپی شد'),
        () => toast('کپی نشد'),
      );
    }
  };

  return (
    <>
      <div className="page-hero">
        <div className="wrap">
          <Crumbs items={[{ label: 'حمایت' }]} />
          <Reveal>
            <span className="eyebrow">قهرمانان ما</span>
            <h1>سرورهای بیشتر، با حمایت شما</h1>
            <p className="lead">
              کلاچ پینگ در مرحلهٔ بتاست. هر حمایت صرف راه‌اندازی مسیر و سرور تازه می‌شود و نام حامی روی تابلو می‌ماند.
              حمایت اشتراک نیست و دسترسی سرور نمی‌دهد.
            </p>
          </Reveal>

          <Reveal className="card card-pad" delay={1} style={{ marginTop: '1.6rem' }}>
            <div className="progress-wrap" style={{ marginTop: 0 }}>
              <div className="progress-top">
                <span className="eyebrow">هدف: سرورهای بیشتر</span>
                <span className="progress-amount">
                  <b className="num">{toman(raised)}</b>
                  <span className="num">هدف: {toman(DONATE_GOAL)}</span>
                </span>
              </div>
              <div className="progress">
                <i style={{ width: `${Math.max(percent, 0.6)}%` }} />
              </div>
              <p className="muted" style={{ fontSize: 'var(--fs-xs)', marginTop: '0.6rem' }}>
                مجموع حمایت‌های ثبت‌شده در تابلو: {faNum(DONORS.length)} حامی · {percent < 1 ? 'کمتر از ۱٪' : `${percent.toFixed(1)}٪`} هدف
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      <Section className="tight">
        <div className="order-grid">
          {ready ? (
            <Reveal className="success">
              <span className="badge badge-mint">
                <Icon name="check" size={12} /> آماده است
              </span>
              <h3>حمایت آمادهٔ ثبت شد</h3>
              <p className="lead" style={{ fontSize: 'var(--fs-sm)' }}>
                این صفحه پرداختی انجام نمی‌دهد و مبلغی جابه‌جا نمی‌شود. برای واریز، در صفحهٔ حمایت رسمی ادامه بده؛ پرداخت
                از طریق زرین‌پال انجام می‌شود.
              </p>
              <pre>
                {[
                  'حمایت از کلاچ پینگ',
                  `مبلغ: ${toman(amount)}`,
                  `نام: ${anon ? 'ناشناس' : name.trim()}`,
                  message.trim() ? `پیام: ${message.trim()}` : null,
                ]
                  .filter(Boolean)
                  .join('\n')}
              </pre>
              <div className="cta-actions">
                <Btn variant="primary" icon="copy" onClick={copy}>
                  کپی خلاصه
                </Btn>
                <Btn href={SITE.url + '/donate'} external variant="ghost" icon="external">
                  ادامه در صفحهٔ حمایت
                </Btn>
                <Btn variant="ghost" onClick={() => setReady(false)}>
                  ویرایش
                </Btn>
              </div>
            </Reveal>
          ) : (
            <form className="card card-pad" style={{ display: 'grid', gap: '1.2rem' }} onSubmit={onSubmit} noValidate>
              <div className="field">
                <span className="lbl">مبلغ حمایت</span>
                <div className="amounts">
                  {PRESETS.map((p) => (
                    <button
                      type="button"
                      key={p.value}
                      className="amount"
                      aria-pressed={amount === p.value}
                      onClick={() => setAmount(p.value)}
                    >
                      {p.title}
                      <small>{p.label}</small>
                    </button>
                  ))}
                </div>
                <div className="field" style={{ marginTop: '0.6rem' }}>
                  <label className="sr-only" htmlFor="amount">
                    مبلغ دلخواه به تومان
                  </label>
                  <input
                    id="amount"
                    className="input ltr"
                    inputMode="numeric"
                    value={amount}
                    onChange={(e) => {
                      const n = Number(e.target.value.replace(/[^\d]/g, ''));
                      setAmount(Number.isFinite(n) ? n : 0);
                    }}
                    dir="ltr"
                  />
                  <span className="hint">حداقل ۱۰٬۰۰۰ تومان؛ مبلغ دلخواه هم قابل ورود است.</span>
                </div>
              </div>

              <div className={`field${error ? ' has-error' : ''}`}>
                <label htmlFor="donor-name">نام ماینکرفت</label>
                <input
                  id="donor-name"
                  className="input ltr"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="YourName"
                  disabled={anon}
                  aria-invalid={Boolean(error)}
                  dir="ltr"
                />
                {error ? (
                  <span className="err">
                    <Icon name="info" size={13} /> {error}
                  </span>
                ) : null}
                <label className="check" style={{ marginTop: '0.4rem' }}>
                  <input type="checkbox" checked={anon} onChange={(e) => setAnon(e.target.checked)} />
                  <span>اسمم روی تابلو نمایش داده نشود (ناشناس)</span>
                </label>
              </div>

              <div className="field">
                <label htmlFor="donor-msg">پیام کوتاه (اختیاری)</label>
                <textarea
                  id="donor-msg"
                  className="textarea-field"
                  value={message}
                  maxLength={80}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="یک جمله برای تیم کلاچ پینگ"
                />
                <span className="hint">{faNum(message.length)} از ۸۰ کاراکتر</span>
              </div>

              <Btn type="submit" variant="primary" size="lg" icon="heart">
                حمایت می‌کنم
              </Btn>
              <p className="plan-note">
                پرداخت امن از طریق زرین‌پال. حمایت اشتراک نیست و دسترسی سرور نمی‌دهد.
              </p>
            </form>
          )}

          <aside className="summary">
            <h3 style={{ fontSize: '1.05rem' }}>نشان‌های حمایت</h3>
            <ul className="plan-feats" style={{ marginTop: '0.7rem', paddingTop: 0, borderTop: 0 }}>
              {BADGES.map((b) => (
                <li key={b.name}>
                  <Icon name="star" size={14} /> <b>{b.name}</b> — {toman(b.amount)}
                </li>
              ))}
            </ul>
            <p className="plan-note" style={{ textAlign: 'start', marginTop: '0.6rem' }}>
              نشان کنار نام روی همین تابلو و لیدربورد هفتگی نمایش داده می‌شود.
            </p>

            <hr className="hairline" style={{ margin: '1rem 0' }} />

            <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>آخرین حامیان</h3>
            <div>
              {DONORS.map((d) => (
                <div className="donor" key={d.name}>
                  <div style={{ minWidth: 0 }}>
                    <div className="donor-name">{d.name}</div>
                    {d.message ? <div className="donor-msg">«{d.message}»</div> : null}
                  </div>
                  <span className="donor-amt num">{faNum(d.amount)} ت</span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </Section>

      <Section>
        <SecHead
          eyebrow="حمایت چه می‌کند"
          title="هر مبلغ، یک قدم به سرور بعدی"
          lead="کلاچ پینگ از فروش اشتراک و حمایت مستقیم جلو می‌رود. حمایت، مسیر جدید و سرور تازه اضافه می‌کند."
        />
        <div className="steps">
          {[
            {
              icon: 'server' as const,
              title: 'سرور تازه',
              body: 'بخشی از حمایت‌ها صرف اضافه کردن سرور و باز نگه داشتن مسیرهای آن می‌شود.',
            },
            {
              icon: 'layers' as const,
              title: 'مسیر پایدارتر',
              body: 'سرور و مسیر جایگزین هزینهٔ نگهداری دارد؛ حمایت همان هزینه را پوشش می‌دهد.',
            },
            {
              icon: 'trophy' as const,
              title: 'تابلوی حامیان',
              body: 'نام حامی و نشانش روی تابلو و لیدربورد می‌ماند — نشانهٔ حمایت، نه اشتراک.',
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

        <Reveal style={{ marginTop: '1.4rem' }}>
          <Btn href={url('/leaderboard/')} variant="ghost" icon="trophy">
            دیدن لیدربورد هفتگی
          </Btn>
        </Reveal>
      </Section>
    </>
  );
};
