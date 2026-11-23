import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { Icon, type IconName } from './Icons';
import { useCopy } from '../lib/hooks';
import { faNum, toman, url } from '../data/site';
import { serverIcon, tierLabel, type ServerEntry } from '../data/servers';
import { planTotal, type Plan } from '../data/plans';

/* ── ریویل ─────────────────────────────────────────────────────── */
export const Reveal = ({
  children,
  delay = 0,
  className,
  style,
  as: Tag = 'div',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  as?: 'div' | 'li' | 'article' | 'section' | 'header';
}) => (
  <Tag className={className} data-reveal style={{ ['--i' as string]: delay, ...style }}>
    {children}
  </Tag>
);

/* ── بخش و تیتر ────────────────────────────────────────────────── */
export const Section = ({
  children,
  className = '',
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) => (
  <section className={`section ${className}`} id={id}>
    <div className="wrap">{children}</div>
  </section>
);

export const SecHead = ({
  eyebrow,
  title,
  lead,
  action,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: string;
  action?: ReactNode;
}) => (
  <Reveal className="sec-head">
    <div>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {lead ? <p className="lead">{lead}</p> : null}
    </div>
    {action}
  </Reveal>
);

/* ── دکمه ──────────────────────────────────────────────────────── */
type BtnProps = {
  children: ReactNode;
  href?: string;
  variant?: 'primary' | 'ghost' | 'violet';
  size?: 'sm' | 'md' | 'lg';
  icon?: IconName;
  iconEnd?: IconName;
  external?: boolean;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: () => void;
  ariaLabel?: string;
};

export const Btn = ({
  children,
  href,
  variant = 'ghost',
  size = 'md',
  icon,
  iconEnd,
  external,
  className = '',
  type = 'button',
  disabled,
  onClick,
  ariaLabel,
}: BtnProps) => {
  const cls = `btn btn-${variant}${size !== 'md' ? ` btn-${size}` : ''} ${className}`.trim();
  const inner = (
    <>
      {icon ? <Icon name={icon} /> : null}
      <span>{children}</span>
      {iconEnd ? <Icon name={iconEnd} /> : null}
    </>
  );

  if (href) {
    const externalProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
    return (
      <a className={cls} href={href} aria-label={ariaLabel} {...externalProps}>
        {inner}
      </a>
    );
  }

  return (
    <button className={cls} type={type} onClick={onClick} disabled={disabled} aria-label={ariaLabel}>
      {inner}
    </button>
  );
};

/* ── دکمهٔ کپی ─────────────────────────────────────────────────── */
export const CopyButton = ({
  value,
  label = 'کپی',
  className = '',
  compact = false,
}: {
  value: string;
  label?: string;
  className?: string;
  compact?: boolean;
}) => {
  const [copied, copy] = useCopy();
  const done = copied === value;

  if (compact) {
    return (
      <button
        type="button"
        className={`btn-icon ${className}`.trim()}
        onClick={() => copy(value)}
        aria-label={done ? 'کپی شد' : `${label} آدرس`}
        title={done ? 'کپی شد' : label}
      >
        <Icon name={done ? 'check' : 'copy'} size={14} />
      </button>
    );
  }

  return (
    <button type="button" className={`copy ${className}`.trim()} onClick={() => copy(value)}>
      <Icon name={done ? 'check' : 'copy'} />
      <span>{done ? 'کپی شد' : label}</span>
    </button>
  );
};

/* ── فیلد آدرس ─────────────────────────────────────────────────── */
export const AddrField = ({ value, hint }: { value: string; hint?: string }) => {
  const id = useId();
  return (
    <div className="addr-box">
      <label className="lbl" htmlFor={id}>
        <Icon name="terminal" size={14} /> آدرس اتصال خودکار
      </label>
      <div className="addr-field">
        <code id={id}>{value}</code>
        <CopyButton value={value} label="کپی آدرس" />
      </div>
      {hint ? <span className="muted" style={{ fontSize: 'var(--fs-2xs)' }}>{hint}</span> : null}
    </div>
  );
};

/* ── آکاردئون ──────────────────────────────────────────────────── */
export const Accordion = ({
  items,
  defaultOpen = 0,
}: {
  items: { q: string; a: string }[];
  defaultOpen?: number | null;
}) => {
  const [open, setOpen] = useState<number | null>(defaultOpen);

  return (
    <div className="acc">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div className={`acc-item${isOpen ? ' is-open' : ''}`} key={it.q}>
            <h3 style={{ margin: 0 }}>
              <button
                type="button"
                className="acc-q"
                aria-expanded={isOpen}
                aria-controls={`acc-p-${i}`}
                id={`acc-q-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span>{it.q}</span>
                <span className="acc-sign" aria-hidden="true" />
              </button>
            </h3>
            <div
              className="acc-a"
              id={`acc-p-${i}`}
              role="region"
              aria-labelledby={`acc-q-${i}`}
            >
              <div>
                <p>{it.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

/* ── سگمنت انتخاب ──────────────────────────────────────────────── */
export function Segmented<T extends string | number>({
  options,
  value,
  onChange,
  legend,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  legend: string;
}) {
  return (
    <div className="seg" role="group" aria-label={legend}>
      {options.map((o) => (
        <button
          key={String(o.value)}
          type="button"
          aria-pressed={o.value === value}
          onClick={() => onChange(o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

/* ── کارت پلن ──────────────────────────────────────────────────── */
export const PlanCard = ({
  plan,
  months,
  compact = false,
}: {
  plan: Plan;
  months: number;
  compact?: boolean;
}) => {
  const total = planTotal(plan.monthly, months);
  const ids = plan.includedIds;

  return (
    <article className={`plan${plan.highlight ? ' plan-plus' : ''}`} data-reveal>
      <div className="plan-top">
        <div>
          <div className="plan-name">{plan.name}</div>
          <div className="plan-sub">{plan.tagline}</div>
        </div>
        {plan.highlight ? (
          <span className="badge badge-violet">
            <Icon name="star" /> پیشنهاد ما
          </span>
        ) : (
          <span className="badge">شروع اقتصادی</span>
        )}
      </div>

      <div className="plan-price">
        <b className="num">{faNum(plan.monthly)}</b>
        <span>تومان / هر ۳۰ روز</span>
      </div>
      <div className="plan-daily num">روزی حدود {faNum(plan.daily)} تومان</div>

      <ul className="plan-feats">
        {plan.features.map((f) => (
          <li key={f}>
            <Icon name="check" size={14} strokeWidth={2} /> {f}
          </li>
        ))}
      </ul>

      {!compact ? (
        <div className="server-pills">
          {ids.slice(0, 6).map((id) => (
            <span className="server-pill" key={id}>
              <img src={serverIcon(id)} alt="" width={14} height={14} loading="lazy" />
              {id}
            </span>
          ))}
          {ids.length > 6 ? (
            <span className="server-pill">+{faNum(ids.length - 6)} سرور</span>
          ) : null}
        </div>
      ) : null}

      <div className="plan-foot">
        {months > 1 ? (
          <div className="plan-note num">
            مبلغ {months} ماه پیش از تخفیف دوره: <b>{toman(total)}</b>
          </div>
        ) : null}
        <Btn href={url(`/order/?tier=${plan.id}&plan=${months * 30}`)} variant={plan.highlight ? 'violet' : 'primary'} size="lg" icon="bolt">
          انتخاب {plan.name}
        </Btn>
        <a className="link-arrow" href={url('/store/')} style={{ justifyContent: 'center' }}>
          جزئیات اشتراک <Icon name="arrow" size={14} />
        </a>
      </div>
    </article>
  );
};

/* ── کارت سرور ─────────────────────────────────────────────────── */
export const ServerCard = ({ s }: { s: ServerEntry }) => {
  const target = s.port ? `${s.address ?? '94.101.178.106'}:${s.port}` : (s.address ?? '');

  return (
    <article className="srv" data-reveal>
      <div className="srv-top">
        <img className="srv-ico" src={serverIcon(s.id)} alt={`لوگوی ${s.name}`} width={42} height={42} loading="lazy" />
        <div style={{ minWidth: 0 }}>
          <div className="srv-name">{s.name}</div>
          <span className="srv-en">{s.en}</span>
        </div>
        <div className="srv-badges">
          <span className={`badge ${s.tier === 'plus' ? 'badge-violet' : s.tier === 'base' ? 'badge-cyan' : 'badge-mint'}`}>
            {tierLabel[s.tier]}
          </span>
        </div>
      </div>

      <div className="srv-addr">
        <code>{target}</code>
        <CopyButton value={target} compact />
      </div>

      {s.note ? <p className="srv-note">{s.note}</p> : null}
      {s.port ? (
        <p className="srv-note">
          بدراک · آی‌پی <span className="mono">94.101.178.106</span> و پورت{' '}
          <span className="mono">{s.port}</span>
        </p>
      ) : null}
    </article>
  );
};

/* ── نوار لوگوی سرورها ─────────────────────────────────────────── */
export const ServerMarquee = ({ servers }: { servers: ServerEntry[] }) => (
  <div className="marquee" aria-hidden="true">
    <div className="marquee-track">
      {[...servers, ...servers].map((s, i) => (
        <span className="marquee-item" key={`${s.id}-${i}`}>
          <img src={serverIcon(s.id)} alt="" width={26} height={26} loading="lazy" />
          {s.name}
        </span>
      ))}
    </div>
  </div>
);

/* ── آمار ──────────────────────────────────────────────────────── */
export const Stats = ({ items }: { items: { value: string; unit?: string; label: string }[] }) => (
  <div className="stats" data-reveal>
    {items.map((it) => (
      <div className="stat" key={it.label}>
        <b className="num">
          {it.value}
          {it.unit ? <small>{it.unit}</small> : null}
        </b>
        <span>{it.label}</span>
      </div>
    ))}
  </div>
);

/* ── آکاردئون با کنترل از بیرون (برای صفحهٔ سؤالات) ─────────────── */
export function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState(ids[0] ?? '');

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: 0 },
    );

    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [ids]);

  return active;
}

/* ── مسیر (breadcrumb) ─────────────────────────────────────────── */
export const Crumbs = ({ items }: { items: { label: string; href?: string }[] }) => (
  <nav className="crumbs" aria-label="مسیر صفحه">
    <a href={url('/')}>خانه</a>
    {items.map((it) => (
      <span key={it.label} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
        <Icon name="chevron" size={12} className="crumb-sep" />
        {it.href ? <a href={it.href}>{it.label}</a> : <span aria-current="page">{it.label}</span>}
      </span>
    ))}
  </nav>
);

/* ── شمارندهٔ ساده (بدون انیمیشن سنگین) ────────────────────────── */
export const InlineStat = ({ icon, children }: { icon: IconName; children: ReactNode }) => (
  <span>
    <Icon name={icon} size={14} /> {children}
  </span>
);

/** اسکرول به یک بخش با احتساب هدر چسبان */
export const scrollToId = (id: string): void => {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 88;
  window.scrollTo({ top, behavior: 'smooth' });
};

/** ref ساده برای پرهیز از بازسازی‌های بی‌مورد */
export const useOnce = (fn: () => void): void => {
  const ran = useRef(false);
  useEffect(() => {
    if (ran.current) return;
    ran.current = true;
    fn();
  }, [fn]);
};
