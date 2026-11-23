/** مجموعهٔ آیکن خطی یکدست (stroke 1.6) — بدون وابستگی به کتابخانهٔ بیرونی. */

export type IconName =
  | 'bolt'
  | 'copy'
  | 'check'
  | 'arrow'
  | 'chevron'
  | 'discord'
  | 'search'
  | 'close'
  | 'menu'
  | 'shield'
  | 'card'
  | 'clock'
  | 'server'
  | 'route'
  | 'spark'
  | 'gift'
  | 'star'
  | 'external'
  | 'info'
  | 'signal'
  | 'globe'
  | 'layers'
  | 'help'
  | 'user'
  | 'trophy'
  | 'heart'
  | 'terminal';

const P: Record<IconName, React.ReactNode> = {
  bolt: <path d="M13.5 2 4.8 13.2h5.6L9.9 22l9-11.6h-5.7L13.5 2Z" />,
  copy: (
    <>
      <rect x="9" y="9" width="11" height="11" rx="2.4" />
      <path d="M15 5.6A2.6 2.6 0 0 0 12.4 3H6.6A2.6 2.6 0 0 0 4 5.6v5.8A2.6 2.6 0 0 0 6.6 14" />
    </>
  ),
  check: <path d="m4.5 12.5 5 5 10-11" />,
  arrow: (
    <>
      <path d="M4 12h15" />
      <path d="m13 6 6 6-6 6" />
    </>
  ),
  chevron: <path d="m6 9 6 6 6-6" />,
  discord: (
    <>
      <path d="M8.6 6.4A12 12 0 0 0 5.4 8c-1.6 3-2.1 6.2-1.9 9a13 13 0 0 0 4 2l.9-1.6" />
      <path d="M15.4 6.4A12 12 0 0 1 18.6 8c1.6 3 2.1 6.2 1.9 9a13 13 0 0 1-4 2l-.9-1.6" />
      <path d="M8.6 6.4A14 14 0 0 1 12 6a14 14 0 0 1 3.4.4" />
      <path d="M9.6 14.2a1.6 1.7 0 1 0 0-.1M14.4 14.2a1.6 1.7 0 1 0 0-.1" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6.4" />
      <path d="m16 16 4 4" />
    </>
  ),
  close: <path d="M6 6l12 12M18 6 6 18" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  shield: (
    <>
      <path d="M12 3l7 3v6c0 4.2-2.9 7.5-7 9-4.1-1.5-7-4.8-7-9V6l7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  card: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
      <path d="M3 10h18" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.4" />
      <path d="M12 7.6V12l3 2" />
    </>
  ),
  server: (
    <>
      <rect x="3.5" y="4" width="17" height="6.4" rx="2" />
      <rect x="3.5" y="13.6" width="17" height="6.4" rx="2" />
      <path d="M7 7.2h.01M7 16.8h.01" />
    </>
  ),
  route: (
    <>
      <circle cx="6" cy="18" r="2.4" />
      <circle cx="18" cy="6" r="2.4" />
      <path d="M8.4 18h5.2a4 4 0 0 0 0-8H9.6a3.4 3.4 0 0 1 0-4h6" />
    </>
  ),
  spark: <path d="M12 3.2 13.9 9l5.8 1.9-5.8 1.9L12 18.6 10.1 12.8 4.3 10.9 10.1 9 12 3.2Z" />,
  gift: (
    <>
      <path d="M4 10.5h16v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 19.5v-9Z" />
      <path d="M3 7h18v3.5H3zM12 7v14" />
      <path d="M12 7S10.5 3 8.4 3a2.2 2.2 0 0 0 0 4H12Zm0 0s1.5-4 3.6-4a2.2 2.2 0 0 1 0 4H12Z" />
    </>
  ),
  star: <path d="m12 3.6 2.6 5.6 6.1.8-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6L3.3 10l6.1-.8L12 3.6Z" />,
  external: (
    <>
      <path d="M14 4h6v6" />
      <path d="M20 4l-8.5 8.5" />
      <path d="M18 14.5V18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.5" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="8.4" />
      <path d="M12 11v5.5M12 8.2h.01" />
    </>
  ),
  signal: (
    <>
      <path d="M4.5 17.5a10.6 10.6 0 0 1 15 0" />
      <path d="M7.8 14.2a6 6 0 0 1 8.4 0" />
      <path d="M11 11a1.4 1.4 0 1 0 2 0" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8.4" />
      <path d="M3.6 12h16.8" />
      <path d="M12 3.6c2.2 2.4 3.4 5.3 3.4 8.4s-1.2 6-3.4 8.4c-2.2-2.4-3.4-5.3-3.4-8.4s1.2-6 3.4-8.4Z" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3.6 8 4.2-8 4.2-8-4.2 8-4.2Z" />
      <path d="m4 12.4 8 4.2 8-4.2" />
      <path d="m4 16.8 8 4.2 8-4.2" />
    </>
  ),
  help: (
    <>
      <circle cx="12" cy="12" r="8.4" />
      <path d="M9.6 9.4a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 .9-1 1.6v.4" />
      <path d="M12 16.6h.01" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8.6" r="3.8" />
      <path d="M4.6 20.4a7.6 7.6 0 0 1 14.8 0" />
    </>
  ),
  trophy: (
    <>
      <path d="M8 4h8v5a4 4 0 0 1-8 0V4Z" />
      <path d="M8 5.5H5.4V7A3.4 3.4 0 0 0 8.8 10.4M16 5.5h2.6V7a3.4 3.4 0 0 1-3.4 3.4" />
      <path d="M12 13v3.4M8.6 20h6.8l-.8-3.6H9.4L8.6 20Z" />
    </>
  ),
  heart: <path d="M12 20s-7.4-4.6-7.4-9.4A4.2 4.2 0 0 1 12 7.6a4.2 4.2 0 0 1 7.4 3C19.4 15.4 12 20 12 20Z" />,
  terminal: (
    <>
      <rect x="3" y="4.4" width="18" height="15.2" rx="2.6" />
      <path d="m7.6 10 2.6 2.4-2.6 2.4M12.6 15h3.8" />
    </>
  ),
};

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
  strokeWidth?: number;
  fill?: boolean;
}

export const Icon = ({ name, size = 18, className, strokeWidth = 1.6, fill = false }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    className={className}
    fill={fill ? 'currentColor' : 'none'}
    stroke={fill ? 'none' : 'currentColor'}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    {P[name]}
  </svg>
);

/** نشان برند: رعد کلاچ پینگ */
export const BrandMark = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 32 32" className={className} role="img" aria-label="کلاچ پینگ">
    <defs>
      <linearGradient id="bm-g" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#7bf3ff" />
        <stop offset="1" stopColor="#17a9c0" />
      </linearGradient>
    </defs>
    <path
      d="M18.4 2.4 7.6 17.2h6.7l-1.2 12.4L23.9 14h-7.1l1.6-11.6Z"
      fill="url(#bm-g)"
      stroke="rgba(4,20,26,.55)"
      strokeWidth="1.1"
      strokeLinejoin="round"
    />
  </svg>
);
