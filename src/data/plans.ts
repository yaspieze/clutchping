/**
 * اشتراک‌ها و دوره‌ها.
 * قیمت‌ها همان قیمت‌های رسمی فروشگاه کلاچ پینگ برای دورهٔ ۳۰ روزه است.
 * برای دوره‌های بلندتر، فروشگاه تخفیف دوره‌ای اعمال می‌کند؛
 * به همین دلیل مبلغ دوره‌های بلند در این سایت «پیش از تخفیف دوره» نمایش داده می‌شود.
 */

export interface Duration {
  days: number;
  label: string;
  months: number;
}

export const DURATIONS: Duration[] = [
  { days: 30, label: '۳۰ روز', months: 1 },
  { days: 90, label: '۹۰ روز', months: 3 },
  { days: 180, label: '۱۸۰ روز', months: 6 },
  { days: 365, label: '۱ ساله', months: 12 },
];

export interface Plan {
  id: 'base' | 'plus';
  name: string;
  en: string;
  monthly: number;
  daily: number;
  tagline: string;
  summary: string;
  highlight?: boolean;
  rotating?: boolean;
  features: string[];
  includedIds: string[];
  extraCount?: number;
}

export const PLANS: Plan[] = [
  {
    id: 'base',
    name: 'پایه',
    en: 'Base',
    monthly: 249_000,
    daily: 8_300,
    tagline: 'هایپیکسل همیشه، به‌همراه چهار سرور چرخشی',
    summary:
      'برای کسی که بیشتر وقتش را روی هایپیکسل می‌گذراند. هایپیکسل همیشه باز است و چهار سرور دیگر هر جمعه ظهر عوض می‌شوند.',
    rotating: true,
    features: [
      'هایپیکسل همیشه باز',
      'چهار سرور چرخشی که هر جمعه ظهر عوض می‌شوند',
      'نسخهٔ جاوا و سرورهای بدون اکانت',
      'اتصال خودکار و مسیر جایگزین',
      'فعال‌سازی لحظه‌ای بعد از پرداخت',
      'بدون تمدید خودکار',
    ],
    includedIds: ['hypixel', 'mccisland', 'cubecraft', 'mineberry', 'minepeak'],
  },
  {
    id: 'plus',
    name: 'پلاس',
    en: 'Plus',
    monthly: 399_000,
    daily: 13_300,
    tagline: 'همهٔ سرورها، بدون چرخش هفتگی',
    summary:
      'همان پایه، به‌همراه همهٔ سرورهای ثابت: ماین‌من، دونات اس‌ام‌پی، هاپلایت، وینکرفت و سرورهای بدون اکانت و بدراک.',
    highlight: true,
    features: [
      'همهٔ امکانات پایه',
      'همهٔ سرورهای ثابت، بدون چرخش هفتگی',
      'ماین‌من، دونات اس‌ام‌پی، هاپلایت و وینکرفت',
      'پیکا، جارتکس، گمستر و بقیهٔ سرورهای بدون اکانت',
      'پنج سرور بدراک روی همان آی‌پی',
      'مسیر مستقیم ایران + مسیر جایگزین ترکیه',
    ],
    includedIds: [
      'minemen',
      'donutsmp',
      'hoplite',
      'wynncraft',
      'mcpvp',
      'mcpvpclub',
      'bridger',
      'bedwars',
      'catpvp',
      'pvphq',
      'mineplex',
      'axora',
      'pika',
      'jartex',
      'gamster',
      'extreme',
      'agera',
      'hylex',
      'cubecraft-be',
      'hive',
      'galaxite',
      'nethergames',
      'lifeboat',
    ],
  },
];

/** مبلغ پیش از تخفیف دوره: قیمت ۳۰ روزه × تعداد ماه */
export const planTotal = (monthly: number, months: number): number => monthly * months;

export const TRIAL = {
  minutes: 30,
  crackedMinutes: 5,
  note: 'تست رایگان یک‌بار برای هر اکانت ماینکرفت و خودکار فعال می‌شود.',
} as const;
