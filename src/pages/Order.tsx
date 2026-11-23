import { useMemo, useState, type FormEvent } from 'react';
import { Icon } from '../components/Icons';
import { Btn, Crumbs, Reveal, SecHead, Section, Segmented } from '../components/ui';
import { DURATIONS, PLANS, TRIAL, planTotal } from '../data/plans';
import { SITE, faNum, toman, url } from '../data/site';
import { useToast } from '../lib/toast';

const toEn = (s: string): string =>
  s
    .replace(/[۰-۹]/g, (d) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)));

const USERNAME = /^[A-Za-z0-9_]{3,16}$/;
const PHONE = /^09\d{9}$/;

interface Errors {
  username?: string;
  phone?: string;
  giftTo?: string;
  terms?: string;
  discord?: string;
}

export const Order = () => {
  const [tier, setTier] = useState<'base' | 'plus'>('plus');
  const [days, setDays] = useState(30);
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [discord, setDiscord] = useState('');
  const [gift, setGift] = useState(false);
  const [giftTo, setGiftTo] = useState('');
  const [terms, setTerms] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [avatarOk, setAvatarOk] = useState(true);
  const toast = useToast();

  const plan = PLANS.find((p) => p.id === tier)!;
  const months = Math.round(days / 30);
  const total = planTotal(plan.monthly, months);

  const cleanUser = username.trim();
  const showSkin = USERNAME.test(cleanUser) && avatarOk;

  const summary = useMemo(
    () =>
      [
        'خلاصهٔ سفارش کلاچ پینگ',
        `سطح: ${plan.name} (${plan.en})`,
        `دوره: ${faNum(days)} روز`,
        `نام ماینکرفت: ${cleanUser || '—'}`,
        gift && giftTo ? `هدیه برای: ${giftTo.trim()}` : null,
        `موبایل: ${toEn(phone) || '—'}`,
        discord.trim() ? `دیسکورد: ${discord.trim()}` : null,
        `مبلغ پیش از تخفیف دوره: ${toman(total)}`,
        `تست رایگان: ${faNum(TRIAL.minutes)} دقیقه`,
      ]
        .filter(Boolean)
        .join('\n'),
    [plan.name, plan.en, days, cleanUser, gift, giftTo, phone, discord, total],
  );

  const validate = (): Errors => {
    const e: Errors = {};
    if (!USERNAME.test(cleanUser)) e.username = 'نام ماینکرفت باید ۳ تا ۱۶ کاراکتر و فقط شامل حروف انگلیسی، عدد و _ باشد.';
    if (!PHONE.test(toEn(phone).trim())) e.phone = 'شمارهٔ موبایل را به شکل ۰۹xxxxxxxxx وارد کن.';
    if (gift && !USERNAME.test(giftTo.trim())) e.giftTo = 'نام اکانت گیرندهٔ هدیه را درست وارد کن.';
    if (discord.trim() && discord.trim().length < 2) e.discord = 'آیدی دیسکورد خیلی کوتاه است.';
    if (!terms) e.terms = 'برای ادامه باید قوانین را بپذیری.';
    return e;
  };

  const onSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) {
      const first = document.querySelector<HTMLElement>('.field.has-error .input');
      first?.focus();
      return;
    }
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copySummary = () => {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(summary).then(
        () => toast('خلاصهٔ سفارش کپی شد'),
        () => toast('کپی نشد؛ دستی انتخاب کن'),
      );
    } else {
      toast('مرورگر از کپی پشتیبانی نمی‌کند');
    }
  };

  return (
    <>
      <div className="page-hero">
        <div className="wrap">
          <Crumbs items={[{ label: 'اشتراک‌ها', href: url('/store/') }, { label: 'ثبت سفارش' }]} />
          <Reveal>
            <span className="eyebrow">ثبت سفارش</span>
            <h1>سفارش را آماده کن</h1>
            <p className="lead">
              سطح و دوره را انتخاب کن، نام ماینکرفتت را بده و مشخصات را کامل کن. این صفحه سفارش را آماده و خلاصه‌اش را
              می‌سازد؛ پرداخت در درگاه رسمی زرین‌پال انجام می‌شود و همین‌جا به آن منتقل می‌شوی.
            </p>
          </Reveal>
        </div>
      </div>

      <Section className="tight">
        {submitted ? (
          <div className="order-grid">
            <Reveal className="success">
              <span className="badge badge-mint">
                <Icon name="check" size={12} /> آماده است
              </span>
              <h3>خلاصهٔ سفارش ساخته شد</h3>
              <p className="lead" style={{ fontSize: 'var(--fs-sm)' }}>
                این فرم چیزی را به سرور ارسال نمی‌کند و پرداختی انجام نمی‌دهد. برای تکمیل، خلاصه را کپی کن و در فروشگاه
                رسمی ادامه بده؛ مبلغ نهایی و تخفیف دوره همان‌جا محاسبه می‌شود.
              </p>
              <pre>{summary}</pre>
              <div className="cta-actions">
                <Btn variant="primary" icon="copy" onClick={copySummary}>
                  کپی خلاصه
                </Btn>
                <Btn
                  href={`${SITE.orderUrl}?tier=${tier}&plan=${days}`}
                  external
                  variant="ghost"
                  icon="external"
                >
                  ادامه در فروشگاه رسمی
                </Btn>
                <Btn variant="ghost" onClick={() => setSubmitted(false)}>
                  ویرایش سفارش
                </Btn>
              </div>
            </Reveal>

            <aside className="summary">
              <h3 style={{ fontSize: '1.05rem', marginBottom: '0.8rem' }}>یادآوری</h3>
              <ul className="plan-feats" style={{ marginTop: 0, paddingTop: 0, borderTop: 0 }}>
                {[
                  'اشتراک روی یک نام فعال می‌شود و بعد از پرداخت قابل انتقال نیست.',
                  'تمدید خودکار وجود ندارد.',
                  `${faNum(TRIAL.minutes)} دقیقه تست رایگان قبل از خرید توصیه می‌شود.`,
                  'رمز اکانت ماینکرفت هیچ‌وقت لازم نیست.',
                ].map((t) => (
                  <li key={t}>
                    <Icon name="info" size={14} /> {t}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        ) : (
          <form className="order-grid" onSubmit={onSubmit} noValidate>
            <div className="card card-pad" style={{ display: 'grid', gap: '1.3rem' }}>
              <div className="field">
                <span className="lbl">سطح اشتراک</span>
                <Segmented
                  legend="سطح اشتراک"
                  value={tier}
                  onChange={setTier}
                  options={[
                    { value: 'base', label: 'پایه' },
                    { value: 'plus', label: 'پلاس' },
                  ]}
                />
                <span className="hint">{plan.tagline}</span>
              </div>

              <div className="field">
                <span className="lbl">دورهٔ اشتراک</span>
                <Segmented
                  legend="دورهٔ اشتراک"
                  value={days}
                  onChange={setDays}
                  options={DURATIONS.map((d) => ({ value: d.days, label: d.label }))}
                />
                <span className="hint">
                  مبلغ نمایش‌داده‌شده پیش از تخفیف دوره است؛ تخفیف در درگاه اعمال می‌شود.
                </span>
              </div>

              <div className={`field${errors.username ? ' has-error' : ''}`}>
                <label htmlFor="username">نام ماینکرفت</label>
                <input
                  id="username"
                  className="input ltr"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setAvatarOk(true);
                  }}
                  placeholder="Notch"
                  autoComplete="off"
                  aria-describedby="username-hint"
                  aria-invalid={Boolean(errors.username)}
                  dir="ltr"
                />
                {errors.username ? (
                  <span className="err">
                    <Icon name="info" size={13} /> {errors.username}
                  </span>
                ) : (
                  <span className="hint" id="username-hint">
                    همان نامی که با آن وارد سرور می‌شوی. اشتراک روی همین نام فعال می‌شود.
                  </span>
                )}
              </div>

              {showSkin ? (
                <div className="skin-preview">
                  <img
                    src={`https://mc-heads.net/avatar/${encodeURIComponent(cleanUser)}/96`}
                    alt={`اسکین ${cleanUser}`}
                    width={48}
                    height={48}
                    onError={() => setAvatarOk(false)}
                  />
                  <div>
                    <b>{cleanUser}</b>
                    <span>اسکین از سرویس عمومی ماینکرفت خوانده می‌شود.</span>
                  </div>
                </div>
              ) : null}

              <div className={`field${errors.phone ? ' has-error' : ''}`}>
                <label htmlFor="phone">شمارهٔ موبایل</label>
                <input
                  id="phone"
                  className="input ltr"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="09120000000"
                  inputMode="tel"
                  autoComplete="tel"
                  aria-invalid={Boolean(errors.phone)}
                  dir="ltr"
                />
                {errors.phone ? (
                  <span className="err">
                    <Icon name="info" size={13} /> {errors.phone}
                  </span>
                ) : (
                  <span className="hint">فقط برای اطلاع‌رسانی وضعیت سفارش استفاده می‌شود.</span>
                )}
              </div>

              <div className={`field${errors.discord ? ' has-error' : ''}`}>
                <label htmlFor="discord">آیدی دیسکورد (اختیاری)</label>
                <input
                  id="discord"
                  className="input ltr"
                  value={discord}
                  onChange={(e) => setDiscord(e.target.value)}
                  placeholder="username"
                  autoComplete="off"
                  aria-invalid={Boolean(errors.discord)}
                  dir="ltr"
                />
                {errors.discord ? (
                  <span className="err">
                    <Icon name="info" size={13} /> {errors.discord}
                  </span>
                ) : (
                  <span className="hint">برای پیگیری سریع‌تر و اطلاع‌رسانی تغییرهای سرور.</span>
                )}
              </div>

              <div className="field">
                <label className="check">
                  <input type="checkbox" checked={gift} onChange={(e) => setGift(e.target.checked)} />
                  <span>این اشتراک برای رفیقم است</span>
                </label>

                {gift ? (
                  <div className={`field${errors.giftTo ? ' has-error' : ''}`} style={{ marginTop: '0.9rem' }}>
                    <label htmlFor="giftTo">نام ماینکرفت گیرنده</label>
                    <input
                      id="giftTo"
                      className="input ltr"
                      value={giftTo}
                      onChange={(e) => setGiftTo(e.target.value)}
                      placeholder="FriendName"
                      autoComplete="off"
                      aria-invalid={Boolean(errors.giftTo)}
                      dir="ltr"
                    />
                    {errors.giftTo ? (
                      <span className="err">
                        <Icon name="info" size={13} /> {errors.giftTo}
                      </span>
                    ) : null}
                  </div>
                ) : null}
              </div>

              <div className={`field${errors.terms ? ' has-error' : ''}`}>
                <label className="check">
                  <input type="checkbox" checked={terms} onChange={(e) => setTerms(e.target.checked)} />
                  <span>
                    <a href={url('/terms/')} style={{ color: 'var(--cyan)' }}>
                      قوانین و شرایط
                    </a>{' '}
                    را خوانده‌ام و می‌پذیرم؛ می‌دانم پرداخت بعد از خرید برگشت‌پذیر نیست.
                  </span>
                </label>
                {errors.terms ? (
                  <span className="err">
                    <Icon name="info" size={13} /> {errors.terms}
                  </span>
                ) : null}
              </div>
            </div>

            <aside className="summary">
              <h3 style={{ fontSize: '1.05rem' }}>خلاصهٔ سفارش</h3>
              <div style={{ marginTop: '0.8rem' }}>
                <div className="summary-row">
                  <span>سطح</span>
                  <b>{plan.name}</b>
                </div>
                <div className="summary-row">
                  <span>دوره</span>
                  <b>{faNum(days)} روز</b>
                </div>
                <div className="summary-row">
                  <span>نام ماینکرفت</span>
                  <b className="mono">{cleanUser || '—'}</b>
                </div>
                {gift ? (
                  <div className="summary-row">
                    <span>هدیه برای</span>
                    <b className="mono">{giftTo.trim() || '—'}</b>
                  </div>
                ) : null}
                <div className="summary-row">
                  <span>تست رایگان</span>
                  <b>{faNum(TRIAL.minutes)} دقیقه</b>
                </div>
              </div>

              <div className="summary-total">
                <span className="muted" style={{ fontSize: 'var(--fs-xs)' }}>
                  مبلغ پیش از تخفیف دوره
                </span>
                <b className="num">{toman(total)}</b>
              </div>

              <div style={{ display: 'grid', gap: '0.55rem', marginTop: '1rem' }}>
                <Btn type="submit" variant="primary" size="lg" icon="card">
                  ساخت خلاصهٔ سفارش
                </Btn>
                <Btn href={SITE.orderUrl} external variant="ghost" icon="external">
                  فروشگاه رسمی
                </Btn>
              </div>

              <p className="plan-note" style={{ marginTop: '0.8rem' }}>
                این فرم اطلاعات را جایی ارسال نمی‌کند؛ فقط خلاصهٔ سفارش را برایت می‌سازد.
              </p>
            </aside>
          </form>
        )}
      </Section>

      <Section>
        <SecHead eyebrow="قبل از پرداخت" title="سه چیزی که بهتر است بدانی" />
        <div className="steps">
          {[
            {
              icon: 'clock' as const,
              title: 'اول تست کن',
              body: `${faNum(TRIAL.minutes)} دقیقهٔ اول رایگان است. اگر روی اینترنت تو جواب نداد، خرید لازم نیست.`,
            },
            {
              icon: 'shield' as const,
              title: 'نام را چک کن',
              body: 'اشتراک روی همان نامی فعال می‌شود که وارد کردی؛ اصلاح و انتقال بعد از پرداخت ممکن نیست.',
            },
            {
              icon: 'card' as const,
              title: 'پرداخت امن',
              body: 'پرداخت ریالی از طریق زرین‌پال؛ نیازی به کارت ارزی یا حساب خارجی نیست.',
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
    </>
  );
};
