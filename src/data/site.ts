/** اطلاعات پایهٔ برند و ناوبری — همهٔ آدرس‌ها و لینک‌ها از منابع رسمی کلاچ پینگ است. */

export const SITE = {
  name: 'کلاچ پینگ',
  nameEn: 'ClutchPing',
  domain: 'clutchping.com',
  url: 'https://clutchping.com',
  tagline: 'هر هیت رو کلاچ کن',
  autoAddress: 'mc.clutchping.com',
  bedrockHost: '94.101.178.106',
  discord: 'https://discord.gg/92XZEhU44F',
  storeUrl: 'https://clutchping.com/store',
  orderUrl: 'https://clutchping.com/store/order',
  listUrl: 'https://clutchping.com/list',
  updatedFa: '۲۷ آبان ۱۴۰۵',
  metaDescription:
    'کلاچ پینگ مسیر اتصال شما به سرورهای بزرگ ماینکرفت را کوتاه می‌کند: هایپیکسل، ماین‌من، دونات اس‌ام‌پی، کیوب‌کرفت و ۲۳ سرور دیگر. بدون نصب و تنظیم، با ۳۰ دقیقه تست رایگان.',
} as const;

export interface NavChild {
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
  key: string;
  children?: NavChild[];
}

export const NAV: NavItem[] = [
  { label: 'خانه', href: '/', key: 'home' },
  { label: 'سرورها', href: '/servers/', key: 'servers', children: [] },
  { label: 'اشتراک‌ها', href: '/store/', key: 'store' },
  { label: 'لیدربورد', href: '/leaderboard/', key: 'leaderboard' },
  { label: 'حمایت', href: '/donate/', key: 'donate' },
  { label: 'سؤالات', href: '/faq/', key: 'faq' },
  { label: 'راهنما', href: '/blog/', key: 'blog' },
];

/** مسیر پایهٔ انتشار (در GitHub Pages زیرپوشه است) */
const BASE = import.meta.env.BASE_URL || '/';

/** لینک داخلی با احتساب مسیر پایه */
export const url = (path: string): string => `${BASE.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;

/** مسیر فایل‌های public */
export const asset = (path: string): string => `${BASE}${path.replace(/^\//, '')}`;

/** اعداد فارسی با جداکنندهٔ هزارگان ٬ */
export const faNum = (n: number): string => n.toLocaleString('fa-IR');

export const toman = (n: number): string => `${faNum(n)} تومان`;
