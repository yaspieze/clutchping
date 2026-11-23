import { useCallback, useEffect, useState } from 'react';
import { BrandMark, Icon } from './Icons';
import { Btn, CopyButton } from './ui';
import { useDismiss, useScrolled } from '../lib/hooks';
import { NAV, SITE, url } from '../data/site';
import { EDITIONS, SERVERS, serverIcon } from '../data/servers';

interface Props {
  active: string;
}

export const Header = ({ active }: Props) => {
  const scrolled = useScrolled();
  const [mega, setMega] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const closeDrawer = useCallback(() => setDrawer(false), []);
  useDismiss(drawer, closeDrawer);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMega(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const megaServers = (edition: string) =>
    SERVERS.filter((s) => s.edition === edition).slice(0, 3);

  return (
    <>
      <div className="strip">
        <div className="wrap strip-in">
          <span className="strip-state">
            <i className="dot-live" /> سرویس فعال · سه سطح مسیر
          </span>
          <div className="strip-links">
            <a href={url('/faq/#start')}>
              <Icon name="clock" size={13} /> ۳۰ دقیقه تست رایگان
            </a>
            <span className="strip-sep" />
            <a href={SITE.discord} target="_blank" rel="noopener noreferrer">
              <Icon name="discord" size={13} /> دیسکورد پشتیبانی
            </a>
          </div>
        </div>
      </div>

      <header className={`head${scrolled ? ' is-stuck' : ''}`}>
        <div className="wrap head-in">
          <a className="brand" href={url('/')} aria-label={`${SITE.name} — خانه`}>
            <BrandMark className="brand-mark" />
            <span className="brand-txt">
              <b>{SITE.name}</b>
              <i>ClutchPing</i>
            </span>
          </a>

          <nav className="nav" aria-label="ناوبری اصلی">
            {NAV.map((item) =>
              item.key === 'servers' ? (
                <div
                  className={`nav-item${mega ? ' is-open' : ''}`}
                  key={item.key}
                  onMouseEnter={() => setMega(true)}
                  onMouseLeave={() => setMega(false)}
                >
                  <a
                    className="nav-link"
                    href={url(item.href)}
                    aria-expanded={mega}
                    aria-haspopup="true"
                    aria-current={active === item.key ? 'page' : undefined}
                    onFocus={() => setMega(true)}
                  >
                    {item.label}
                    <Icon name="chevron" className="nav-caret" />
                  </a>

                  <div className="mega" role="group" aria-label="سرورها بر اساس نسخه">
                    {EDITIONS.map((ed) => (
                      <div className="mega-col" key={ed.id}>
                        <h4>{ed.name}</h4>
                        <ul>
                          {megaServers(ed.id).map((s) => (
                            <li key={s.id}>
                              <a href={url('/servers/#srv-' + s.id)} onClick={() => setMega(false)}>
                                <img src={serverIcon(s.id)} alt="" width={20} height={20} loading="lazy" />
                                {s.name}
                              </a>
                            </li>
                          ))}
                          <li>
                            <a href={url('/servers/')} onClick={() => setMega(false)}>
                              <Icon name="arrow" size={14} /> همهٔ {ed.name}
                            </a>
                          </li>
                        </ul>
                      </div>
                    ))}
                    <div className="mega-aside">
                      <div>
                        <span className="badge badge-cyan">{SERVERS.length} سرور</span>
                        <p style={{ marginTop: '0.6rem' }}>
                          آدرس اتصال خودکار برای همه یکی است: <span className="mono">{SITE.autoAddress}</span>. اگر مسیر
                          مستقیم روی اپراتور تو باز نشد، مسیر جایگزین ترکیه را امتحان کن.
                        </p>
                      </div>
                      <Btn href={url('/servers/')} variant="ghost" size="sm" iconEnd="arrow">
                        فهرست کامل
                      </Btn>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="nav-item" key={item.key}>
                  <a
                    className="nav-link"
                    href={url(item.href)}
                    aria-current={active === item.key ? 'page' : undefined}
                  >
                    {item.label}
                  </a>
                </div>
              ),
            )}
          </nav>

          <div className="head-actions">
            <span className="head-addr">
              {SITE.autoAddress}
              <CopyButton value={SITE.autoAddress} compact />
            </span>
            <Btn href={url('/store/')} variant="primary" icon="bolt" className="head-cta">
              <span className="head-cta-text">خرید اشتراک</span>
            </Btn>
            <button
              className="burger"
              type="button"
              aria-label="منو"
              aria-expanded={drawer}
              onClick={() => setDrawer(true)}
            >
              <Icon name="menu" size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* منوی موبایل */}
      <div className={`drawer${drawer ? ' is-open' : ''}`} role="dialog" aria-modal="true" aria-label="منوی موبایل" hidden={!drawer}>
        <div className="drawer-top">
          <a className="brand" href={url('/')} aria-label={SITE.name}>
            <BrandMark className="brand-mark" />
            <span className="brand-txt">
              <b>{SITE.name}</b>
              <i>ClutchPing</i>
            </span>
          </a>
          <button className="burger" type="button" aria-label="بستن منو" onClick={closeDrawer}>
            <Icon name="close" size={20} />
          </button>
        </div>

        <div className="drawer-body">
          <nav aria-label="ناوبری موبایل">
            <ul>
              {NAV.map((item) => (
                <li key={item.key}>
                  <a href={url(item.href)} aria-current={active === item.key ? 'page' : undefined}>
                    {item.label}
                    <Icon name="arrow" size={16} />
                  </a>
                </li>
              ))}
              <li>
                <a href={url('/terms/')}>
                  قوانین و شرایط
                  <Icon name="arrow" size={16} />
                </a>
              </li>
            </ul>
          </nav>

          <div className="drawer-sub">
            <h4>سرورهای پرطرفدار</h4>
            <ul>
              {SERVERS.slice(0, 8).map((s) => (
                <li key={s.id}>
                  <a href={url('/servers/#' + s.id)}>
                    <img src={serverIcon(s.id)} alt="" width={16} height={16} loading="lazy" />
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="drawer-foot">
          <Btn href={url('/store/')} variant="primary" size="lg" icon="bolt">
            خرید اشتراک
          </Btn>
          <Btn href={SITE.discord} external variant="ghost" icon="discord">
            دیسکورد پشتیبانی
          </Btn>
        </div>
      </div>
    </>
  );
};
