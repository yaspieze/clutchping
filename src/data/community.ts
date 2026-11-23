/**
 * دادهٔ جامعه: لیدربورد هفتگی و حامیان.
 * این‌ها اسنپ‌شات صفحه‌های رسمی «لیدربورد» و «حمایت» هستند (۲۷ آبان ۱۴۰۵)
 * و عددهای زنده در سایت اصلی به‌روزرسانی می‌شوند.
 */

export interface LeaderRow {
  rank: number;
  name: string;
  hours: number;
  longest: string;
  level: number;
  serverId: string;
  plus: boolean;
  rankTag?: string;
}

export const LEADERBOARD: LeaderRow[] = [
  { rank: 1, name: 'ItzXenonn', hours: 3.6, longest: '۱:۱۵', level: 2, serverId: 'minemen', plus: true },
  { rank: 2, name: 'Lag_Lord_789', hours: 1.1, longest: '۱:۰۳', level: 19, serverId: 'hypixel', plus: false, rankTag: 'VIP' },
  { rank: 3, name: 'NOTHiraeth_', hours: 1.1, longest: '۰:۱۲', level: 13, serverId: 'minemen', plus: true, rankTag: 'VIP' },
  { rank: 4, name: 'imHeroMan', hours: 1.0, longest: '۰:۳۸', level: 17, serverId: 'minemen', plus: true },
  { rank: 5, name: 'S1UOMAENUOUOG', hours: 0.9, longest: '۰:۱۷', level: 7, serverId: 'minemen', plus: true },
  { rank: 6, name: 'EternalDarkness2', hours: 0.7, longest: '۰:۱۵', level: 6, serverId: 'minemen', plus: true },
  { rank: 7, name: 'Newip', hours: 0.6, longest: '۰:۰۸', level: 20, serverId: 'minemen', plus: true, rankTag: 'VIP' },
  { rank: 8, name: 'ItzShadowBlade', hours: 0.6, longest: '۰:۲۷', level: 14, serverId: 'hypixel', plus: false },
  { rank: 9, name: 'ShayanJZ', hours: 0.5, longest: '۰:۱۲', level: 2, serverId: 'minemen', plus: true },
  { rank: 10, name: 'amir_FK', hours: 0.5, longest: '۰:۱۹', level: 30, serverId: 'minemen', plus: true, rankTag: 'VIP' },
  { rank: 11, name: 'its_matin_gtxm', hours: 0.4, longest: '۰:۱۴', level: 4, serverId: 'minemen', plus: true },
  { rank: 12, name: 'apex_AI', hours: 0.4, longest: '۰:۱۴', level: 9, serverId: 'minemen', plus: true },
  { rank: 13, name: 'ervinmoghaddam', hours: 0.4, longest: '۰:۱۳', level: 4, serverId: 'minemen', plus: true },
  { rank: 14, name: 'not_deweir', hours: 0.3, longest: '۰:۰۷', level: 15, serverId: 'minemen', plus: true, rankTag: 'VIP' },
  { rank: 15, name: 'BloodFireMaster', hours: 0.3, longest: '۰:۰۴', level: 77, serverId: 'hypixel', plus: false, rankTag: 'VIP' },
  { rank: 16, name: 'Mr_ilivili', hours: 0.3, longest: '۰:۱۸', level: 23, serverId: 'minemen', plus: false, rankTag: 'VIP' },
  { rank: 17, name: 'Amirsamking123', hours: 0.2, longest: '۰:۱۲', level: 5, serverId: 'minemen', plus: false },
  { rank: 18, name: 'Ijustdont', hours: 0.2, longest: '۰:۱۲', level: 50, serverId: 'minemen', plus: true, rankTag: 'VIP+' },
  { rank: 19, name: 'Its_RealMahan', hours: 0.2, longest: '۰:۱۱', level: 3, serverId: 'minemen', plus: false },
  { rank: 20, name: 'Qua4e0', hours: 0.2, longest: '۰:۰۰', level: 39, serverId: 'hypixel', plus: false, rankTag: 'VIP+' },
];

export interface Donor {
  name: string;
  amount: number;
  message?: string;
  badge: 'حامی' | 'قهرمان' | 'افسانه';
}

export const DONORS: Donor[] = [
  { name: 'InotSharpness', amount: 300_000, message: 'موفق باشید 3>', badge: 'حامی' },
  { name: 'ItsRealHadi', amount: 130_000, message: 'موفق باشید، به امید اشتراک‌های ارزان‌تر', badge: 'حامی' },
  { name: 'fsaen', amount: 130_000, message: 'meow <3', badge: 'حامی' },
  { name: 'MAMAD_MPISST', amount: 100_000, message: 'اشتراک ۹۰ روزه گرفتم ولی تأثیرش کم بود', badge: 'حامی' },
  { name: 'hgase', amount: 100_000, message: 'لگ‌بک را درست کنین، ممنون', badge: 'حامی' },
  { name: 'decisiv3', amount: 100_000, message: 'میو', badge: 'حامی' },
];

export const DONATE_GOAL = 50_000_000;

export const BADGES = [
  { name: 'حامی', amount: 100_000, note: 'نشان کنار نام روی تابلو و لیدربورد' },
  { name: 'قهرمان', amount: 1_000_000, note: 'نشان قهرمان + نمایش در تابلو' },
  { name: 'افسانه', amount: 5_000_000, note: 'بالاترین نشان حمایت' },
] as const;

/** آمارهایی که مستقیماً از همین اسنپ‌شات درمی‌آید */
export const SNAPSHOT = {
  longestSession: '۱:۱۵',
  topServer: 'ماین‌من',
  players: LEADERBOARD.length,
  totalHours: LEADERBOARD.reduce((sum, r) => sum + r.hours, 0),
} as const;
