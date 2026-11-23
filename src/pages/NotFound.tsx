import { Btn, Reveal } from '../components/ui';
import { Icon } from '../components/Icons';
import { SITE, url } from '../data/site';

export const NotFound = () => (
  <div className="wrap">
    <div className="err-page">
      <span className="err-code">404</span>
      <Reveal>
        <h1 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)' }}>این مسیر به جایی وصل نیست</h1>
        <p className="lead" style={{ maxWidth: '46ch', margin: '0.7rem auto 0' }}>
          آدرسی که باز کردی وجود ندارد یا جابه‌جا شده. از این‌ها می‌توانی ادامه بدهی.
        </p>
      </Reveal>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', justifyContent: 'center', marginTop: '1.2rem' }}>
        <Btn href={url('/')} variant="primary" icon="bolt">
          صفحهٔ اصلی
        </Btn>
        <Btn href={url('/servers/')} variant="ghost" icon="server">
          سرورها
        </Btn>
        <Btn href={SITE.discord} external variant="ghost" icon="discord">
          دیسکورد
        </Btn>
      </div>
      <p className="muted" style={{ fontSize: 'var(--fs-xs)', marginTop: '1.4rem' }}>
        <Icon name="info" size={13} /> آدرس اتصال خودکار سرورها تغییری نکرده است: <span className="mono">{SITE.autoAddress}</span>
      </p>
    </div>
  </div>
);
