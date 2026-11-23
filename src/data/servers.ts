/**
 * سرورهای کلاچ پینگ.
 * منبع: صفحهٔ «سرورها» و «فروشگاه» سایت رسمی (clutchping.com).
 * tier = always  → همیشه باز (هایپیکسل، در هر دو سطح)
 * tier = base    → در سطح پایه، این هفته باز است و هر جمعه ظهر می‌چرخد
 * tier = plus    → فقط در سطح پلاس و همیشه
 */

export type Edition = 'java' | 'cracked' | 'bedrock';
export type Tier = 'always' | 'base' | 'plus';

export interface ServerEntry {
  id: string;
  name: string;
  en: string;
  edition: Edition;
  tier: Tier;
  /** آدرس اتصال جاوا/کرک */
  address?: string;
  /** بدراک: آی‌پی و پورت */
  port?: number;
  note?: string;
}

export const SERVERS: ServerEntry[] = [
  {
    id: 'hypixel',
    name: 'هایپیکسل',
    en: 'Hypixel',
    edition: 'java',
    tier: 'always',
    address: 'mc.clutchping.com',
    note: 'آدرس اتصال خودکار؛ در هر دو سطح اشتراک باز است.',
  },
  {
    id: 'mccisland',
    name: 'ام‌سی‌سی آیلند',
    en: 'MCC Island',
    edition: 'java',
    tier: 'base',
    address: 'mcc.clutchping.com',
    note: 'این هفته در سطح پایه باز است.',
  },
  {
    id: 'cubecraft',
    name: 'کیوب‌کرفت',
    en: 'CubeCraft',
    edition: 'java',
    tier: 'base',
    address: 'cc.clutchping.com',
    note: 'این هفته در سطح پایه باز است.',
  },
  {
    id: 'mineberry',
    name: 'ماین‌بری',
    en: 'MineBerry',
    edition: 'cracked',
    tier: 'base',
    address: 'mb.clutchping.com',
    note: 'بدون اکانت پرمیوم؛ بعد از ورود با /register ثبت‌نام کن.',
  },
  {
    id: 'minepeak',
    name: 'ماین‌پیک',
    en: 'MinePeak',
    edition: 'cracked',
    tier: 'base',
    address: 'mp.clutchping.com',
    note: 'بدون اکانت پرمیوم؛ بعد از ورود با /register ثبت‌نام کن.',
  },
  {
    id: 'minemen',
    name: 'ماین‌من',
    en: 'MineMen Club',
    edition: 'java',
    tier: 'plus',
    address: 'mm.clutchping.com',
    note: 'مسیر مستقیم ایران و مسیر جایگزین ترکیه.',
  },
  {
    id: 'donutsmp',
    name: 'دونات اس‌ام‌پی',
    en: 'DonutSMP',
    edition: 'java',
    tier: 'plus',
    address: 'ds.clutchping.com',
    note: 'فرانکفورت؛ مسیر جایگزین از ترکیه.',
  },
  {
    id: 'hoplite',
    name: 'هاپلایت',
    en: 'Hoplite',
    edition: 'java',
    tier: 'plus',
    address: 'hp.clutchping.com',
    note: 'اتصال خودکار بهترین مسیر را انتخاب می‌کند.',
  },
  {
    id: 'wynncraft',
    name: 'وینکرفت',
    en: 'Wynncraft',
    edition: 'java',
    tier: 'plus',
    address: 'wc.clutchping.com',
    note: 'سرور نقش‌آفرینی؛ اتصال خودکار.',
  },
  {
    id: 'mcpvp',
    name: 'ام‌سی‌پی‌وی‌پی',
    en: 'MCPvP',
    edition: 'java',
    tier: 'plus',
    address: 'mcpvp.clutchping.com',
  },
  {
    id: 'mcpvpclub',
    name: 'ام‌سی‌پی‌وی‌پی کلاب',
    en: 'MCPvP Club',
    edition: 'java',
    tier: 'plus',
    address: 'mcpvpclub.clutchping.com',
  },
  {
    id: 'bridger',
    name: 'بریجرلند',
    en: 'Bridger Land',
    edition: 'java',
    tier: 'plus',
    address: 'bridger.clutchping.com',
  },
  {
    id: 'bedwars',
    name: 'بدوارز پرکتیس',
    en: 'Bedwars Practice',
    edition: 'java',
    tier: 'plus',
    address: 'bedwars.clutchping.com',
  },
  {
    id: 'catpvp',
    name: 'کت پی‌وی‌پی',
    en: 'CatPvP',
    edition: 'java',
    tier: 'plus',
    address: 'catpvp.clutchping.com',
  },
  {
    id: 'pvphq',
    name: 'پی‌وی‌پی اچ‌کیو',
    en: 'PvP HQ',
    edition: 'java',
    tier: 'plus',
    address: 'pvphq.clutchping.com',
  },
  {
    id: 'mineplex',
    name: 'ماینپلکس',
    en: 'Mineplex',
    edition: 'java',
    tier: 'plus',
    address: 'mineplex.clutchping.com',
  },
  {
    id: 'axora',
    name: 'آکسورا',
    en: 'Axora',
    edition: 'java',
    tier: 'plus',
    address: 'axora.clutchping.com',
  },
  {
    id: 'pika',
    name: 'پیکا',
    en: 'PikaNetwork',
    edition: 'cracked',
    tier: 'plus',
    address: 'pika.clutchping.com',
    note: 'بدون اکانت پرمیوم؛ بعد از ورود با /register ثبت‌نام کن.',
  },
  {
    id: 'jartex',
    name: 'جارتکس',
    en: 'JartexNetwork',
    edition: 'cracked',
    tier: 'plus',
    address: 'jartex.clutchping.com',
    note: 'بدون اکانت پرمیوم؛ بعد از ورود با /register ثبت‌نام کن.',
  },
  {
    id: 'gamster',
    name: 'گمستر',
    en: 'Gamster',
    edition: 'cracked',
    tier: 'plus',
    address: 'gamster.clutchping.com',
    note: 'بدون اکانت پرمیوم؛ بعد از ورود با /register ثبت‌نام کن.',
  },
  {
    id: 'extreme',
    name: 'اکستریم‌کرفت',
    en: 'ExtremeCraft',
    edition: 'cracked',
    tier: 'plus',
    address: 'extreme.clutchping.com',
    note: 'بدون اکانت پرمیوم؛ بعد از ورود با /register ثبت‌نام کن.',
  },
  {
    id: 'agera',
    name: 'آگراپی‌وی‌پی',
    en: 'AgeraPvP',
    edition: 'cracked',
    tier: 'plus',
    address: 'agera.clutchping.com',
    note: 'بدون اکانت پرمیوم؛ بعد از ورود با /register ثبت‌نام کن.',
  },
  {
    id: 'hylex',
    name: 'هایلکس',
    en: 'Hylex',
    edition: 'cracked',
    tier: 'plus',
    address: 'hylex.clutchping.com',
    note: 'بدون اکانت پرمیوم؛ بعد از ورود با /register ثبت‌نام کن.',
  },
  {
    id: 'cubecraft-be',
    name: 'کیوب‌کرفت بدراک',
    en: 'CubeCraft Bedrock',
    edition: 'bedrock',
    tier: 'plus',
    port: 19132,
    note: 'موبایل، کنسول و ویندوز؛ آی‌پی بالا با همین پورت.',
  },
  { id: 'hive', name: 'هایو بدراک', en: 'The Hive', edition: 'bedrock', tier: 'plus', port: 19133 },
  { id: 'galaxite', name: 'گلکسایت بدراک', en: 'Galaxite', edition: 'bedrock', tier: 'plus', port: 19134 },
  {
    id: 'nethergames',
    name: 'نیدرگیمز بدراک',
    en: 'NetherGames',
    edition: 'bedrock',
    tier: 'plus',
    port: 19135,
  },
  {
    id: 'lifeboat',
    name: 'لایف‌بوت بدراک',
    en: 'Lifeboat',
    edition: 'bedrock',
    tier: 'plus',
    port: 19136,
  },
];

export const EDITIONS: { id: Edition; name: string; sub: string; icon: string }[] = [
  { id: 'java', name: 'جاوا', sub: 'اکانت رسمی', icon: 'edition-java' },
  { id: 'cracked', name: 'بدون اکانت', sub: 'کرک', icon: 'edition-cracked' },
  { id: 'bedrock', name: 'بدراک', sub: 'موبایل، کنسول، ویندوز', icon: 'edition-bedrock' },
];

import { asset } from './site';

export const serverIcon = (id: string): string => asset(`assets/servers/${id}.webp`);

export const editionLabel: Record<Edition, string> = {
  java: 'جاوا',
  cracked: 'بدون اکانت',
  bedrock: 'بدراک',
};

export const tierLabel: Record<Tier, string> = {
  always: 'همیشه باز',
  base: 'این هفته · پایه',
  plus: 'پلاس',
};
