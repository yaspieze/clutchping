import { BrandMark, Icon } from './Icons';
import { Btn, CopyButton } from './ui';
import { SITE, url } from '../data/site';

const productLinks = [
  { label: 'اشتراک پایه', href: '/store/' },
  { label: 'اشتراک پلاس', href: '/store/#plans' },
  { label: 'فهرست سرورها', href: '/servers/' },
  { label: 'ثبت سفارش', href: '/order/' },
  { label: 'کارت هدیه', href: '/store/#gift' },
];

const helpLinks = [
  { label: 'پرسش‌های پرتکرار', href: '/faq/' },
  { label: 'راهنمای اتصال', href: '/blog/' },
  { label: 'لیدربورد هفتگی', href: '/leaderboard/' },
  { label: 'حمایت از کلاچ پینگ', href: '/donate/' },
  { label: 'قوانین و شرایط', href: '/terms/' },
];

const addresses = [
  { label: 'هایپیکسل', value: 'mc.clutchping.com' },
  { label: 'ماین‌من', value: 'mm.clutchping.com' },
  { label: 'دونات', value: 'ds.clutchping.com' },
  { label: 'بدراک', value: '94.101.178.106:19132' },
];

export const Footer = () => (
  <footer className="foot">
    <div className="wrap">
      <div className="foot-grid">
        <div className="foot-brand">
          <a className="brand" href={url('/')} aria-label={SITE.name}>
            <BrandMark className="brand-mark" />
            <span className="brand-txt">
              <b>{SITE.name}</b>
              <i>ClutchPing</i>
            </span>
          </a>
          <p>
            مسیر اتصال کوتاه و پایدار برای بازی ماینکرفت. بدون نصب، بدون تنظیم؛ فقط آدرس را اضافه می‌کنی و وارد می‌شوی.
          </p>
          <div style={{ marginTop: '1rem' }}>
            <Btn href={SITE.discord} external variant="ghost" size="sm" icon="discord">
              دیسکورد کلاچ پینگ
            </Btn>
          </div>
        </div>

        <div>
          <h5>اشتراک</h5>
          <ul>
            {productLinks.map((l) => (
              <li key={l.href}>
                <a href={url(l.href)}>{l.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h5>پشتیبانی</h5>
          <ul>
            {helpLinks.map((l) => (
              <li key={l.href}>
                <a href={url(l.href)}>{l.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h5>آدرس‌ها</h5>
          <div className="foot-addr">
            {addresses.map((a) => (
              <div key={a.value}>
                <span>{a.label}</span>
                <code>{a.value}</code>
                <CopyButton value={a.value} compact />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="foot-note">
        <Icon name="info" size={14} />
        <p style={{ maxWidth: '78ch' }}>
          کلاچ پینگ فیلترشکن یا VPN نیست و فقط برای بازی ماینکرفت کار می‌کند. رمز اکانتت را هیچ‌وقت از تو نمی‌خواهیم؛ فقط
          نام ماینکرفت برای بررسی اشتراک خوانده می‌شود. <a href={url('/terms/')}>قوانین کامل</a>
        </p>
      </div>

      <div className="foot-bottom">
        <span>© ۱۴۰۵ کلاچ پینگ — همهٔ حقوق محفوظ است.</span>
        <span style={{ display: 'inline-flex', gap: '1rem', alignItems: 'center' }}>
          <a href={url('/terms/')}>قوانین</a>
          <a href={SITE.storeUrl} target="_blank" rel="noopener noreferrer">
            سایت رسمی
          </a>
          <a href={SITE.discord} target="_blank" rel="noopener noreferrer">
            دیسکورد
          </a>
        </span>
      </div>
    </div>
  </footer>
);
