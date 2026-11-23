import { serverIcon } from '../data/servers';

const dest = [
  { id: 'hypixel', label: 'هایپیکسل', y: 74 },
  { id: 'minemen', label: 'ماین‌من', y: 160 },
  { id: 'cubecraft', label: 'کیوب‌کرفت', y: 246 },
] as const;

/**
 * نمودار مسیر: شما → کلاچ پینگ → سرور مقصد
 * همه‌چیز SVG است تا در هر اندازه‌ای شارپ بماند و متن فارسی درست بچرخد.
 */
export const Topology = () => (
  <>
    <div className="topo-head">
      <span>نقشهٔ مسیر</span>
      <span className="live">
        <i className="dot-live" /> زنده
      </span>
    </div>

    <svg viewBox="0 0 520 360" role="img" aria-label="نمودار مسیر اتصال: دستگاه شما به کلاچ پینگ و از آن به سرور مقصد">
      <defs>
        <linearGradient id="ln" x1="1" y1="0" x2="0" y2="0">
          <stop offset="0" stopColor="#37e0f2" stopOpacity="0.6" />
          <stop offset="1" stopColor="#8b7bff" stopOpacity="0.35" />
        </linearGradient>
        <radialGradient id="hubGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#37e0f2" stopOpacity="0.26" />
          <stop offset="1" stopColor="#37e0f2" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="282" cy="190" r="120" fill="url(#hubGlow)" />

      {/* مسیرها */}
      <path d="M356 190H212" stroke="url(#ln)" strokeWidth="1.6" fill="none" strokeDasharray="5 9" />
      <path
        d="M356 190C318 190 318 104 212 104"
        stroke="url(#ln)"
        strokeWidth="1.6"
        fill="none"
        strokeDasharray="5 9"
      />
      <path
        d="M356 190C318 190 318 276 212 276"
        stroke="url(#ln)"
        strokeWidth="1.6"
        fill="none"
        strokeDasharray="5 9"
      />

      {/* بسته‌ها */}
      <circle r="3" fill="#8ff1fb">
        <animateMotion dur="3.4s" repeatCount="indefinite" path="M356 190H212" />
      </circle>
      <circle r="3" fill="#8ff1fb" opacity="0.85">
        <animateMotion dur="4.2s" begin="0.5s" repeatCount="indefinite" path="M356 190C318 190 318 104 212 104" />
      </circle>
      <circle r="3" fill="#c3baff" opacity="0.9">
        <animateMotion dur="4.9s" begin="1.2s" repeatCount="indefinite" path="M356 190C318 190 318 276 212 276" />
      </circle>

      {/* دستگاه شما */}
      <g>
        <rect x="356" y="156" width="140" height="68" rx="16" fill="#0d1824" stroke="rgba(55,224,242,.32)" />
        <circle cx="376" cy="190" r="11" fill="rgba(55,224,242,.14)" stroke="rgba(55,224,242,.4)" />
        <circle cx="376" cy="187" r="3.2" fill="none" stroke="#7ff0fc" strokeWidth="1.3" />
        <path d="M370.6 196a6.6 6.6 0 0 1 10.8 0" fill="none" stroke="#7ff0fc" strokeWidth="1.3" strokeLinecap="round" />
        <text className="t-label" x="438" y="185" textAnchor="middle" fill="#e8eff6" fontSize="13" fontFamily="YekanBakh, sans-serif">
          شما
        </text>
        <text className="t-sub" x="438" y="202" textAnchor="middle" fill="#5c7085" fontSize="9" fontFamily="ui-monospace, monospace">
          MINECRAFT
        </text>
      </g>

      {/* مرکز: کلاچ پینگ */}
      <g>
        <circle cx="282" cy="190" r="54" fill="rgba(55,224,242,.05)" stroke="rgba(55,224,242,.16)" />
        <circle cx="282" cy="190" r="39" fill="#0b1622" stroke="rgba(55,224,242,.45)" />
        <circle cx="282" cy="190" r="39" fill="none" stroke="#37e0f2" strokeWidth="1" opacity="0.45">
          <animate attributeName="r" values="39;54;39" dur="3.8s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.4;0;0.4" dur="3.8s" repeatCount="indefinite" />
        </circle>
        <path
          d="M287 169.6 269 192.4h8.8l-1.3 13.2 13.2-22.4h-8.6l1.1-13.2Z"
          fill="#7ff0fc"
          stroke="rgba(4,20,26,.5)"
          strokeWidth="0.9"
        />
        <text className="t-hub" x="282" y="258" textAnchor="middle" fill="#a5b6c6" fontSize="11.5" fontFamily="YekanBakh, sans-serif">
          کلاچ پینگ
        </text>
      </g>

      {/* مقصدها */}
      {dest.map((d) => (
        <g key={d.id}>
          <rect x="52" y={d.y} width="160" height="60" rx="14" fill="#0c1520" stroke="rgba(148,190,220,.16)" />
          <rect
            x="64"
            y={d.y + 16}
            width="28"
            height="28"
            rx="7"
            fill="#0a121b"
            stroke="rgba(148,190,220,.14)"
          />
          <image href={serverIcon(d.id)} x="64" y={d.y + 16} width="28" height="28" preserveAspectRatio="xMidYMid slice" />
          <text
            className="t-label"
            x="160"
            y={d.y + 31}
            textAnchor="middle"
            fill="#e8eff6"
            fontSize="12.5"
            fontFamily="YekanBakh, sans-serif"
          >
            {d.label}
          </text>
          <text className="t-sub" x="160" y={d.y + 45} textAnchor="middle" fill="#4f6072" fontSize="8.5" fontFamily="ui-monospace, monospace">
            {d.id}.clutchping.com
          </text>
        </g>
      ))}
    </svg>

    <div className="topo-legend">
      <span>
        <i /> مسیر خودکار
      </span>
      <span>
        <i className="dim" /> مسیر جایگزین
      </span>
      <span>افزایش تأخیر: حدود ۰٫۳ میلی‌ثانیه</span>
    </div>
  </>
);
