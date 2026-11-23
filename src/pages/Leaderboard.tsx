import { Icon } from '../components/Icons';
import { LeaderTable } from '../components/LeaderTable';
import { Btn, Crumbs, Reveal, SecHead, Section } from '../components/ui';
import { LEADERBOARD, SNAPSHOT } from '../data/community';
import { SITE, faNum, url } from '../data/site';

export const Leaderboard = () => (
  <>
    <div className="page-hero">
      <div className="wrap">
        <Crumbs items={[{ label: 'لیدربورد' }]} />
        <Reveal>
          <span className="eyebrow">لیدربورد هفتگی</span>
          <h1>هر هفته از صفر</h1>
          <p className="lead">
            همهٔ کسانی که این هفته با کلاچ پینگ بازی کرده‌اند، بر اساس ساعت بازی. رنک و اسکین هر نفر مستقیم از سرور مقصد
            خوانده می‌شود و جدول هر هفته ریست می‌شود.
          </p>
        </Reveal>

        <div className="lb-stats">
          <Reveal className="card card-pad" delay={0}>
            <span className="eyebrow">طولانی‌ترین سشن</span>
            <div className="plan-price" style={{ marginTop: '0.6rem' }}>
              <b className="num">{SNAPSHOT.longestSession}</b>
              <span>بدون قطعی</span>
            </div>
            <p className="muted" style={{ fontSize: 'var(--fs-xs)', marginTop: '0.5rem' }}>
              بیشترین زمان بازی پیوسته در این هفته.
            </p>
          </Reveal>
          <Reveal className="card card-pad" delay={1}>
            <span className="eyebrow">بازیکنان جدول</span>
            <div className="plan-price" style={{ marginTop: '0.6rem' }}>
              <b className="num">{faNum(SNAPSHOT.players)}</b>
              <span>نفر</span>
            </div>
            <p className="muted" style={{ fontSize: 'var(--fs-xs)', marginTop: '0.5rem' }}>
              مجموع ساعت ثبت‌شده در همین اسنپ‌شات: {SNAPSHOT.totalHours.toFixed(1)} ساعت.
            </p>
          </Reveal>
          <Reveal className="card card-pad" delay={2}>
            <span className="eyebrow">پرطرفدارترین سرور</span>
            <div className="plan-price" style={{ marginTop: '0.6rem' }}>
              <b style={{ fontSize: '1.5rem' }}>{SNAPSHOT.topServer}</b>
            </div>
            <p className="muted" style={{ fontSize: 'var(--fs-xs)', marginTop: '0.5rem' }}>
              بیشترین ساعت بازی این هفته روی این سرور ثبت شده است.
            </p>
          </Reveal>
        </div>
      </div>
    </div>

    <Section className="tight">
      <LeaderTable rows={LEADERBOARD} />

      <Reveal style={{ marginTop: '1.4rem' }}>
        <p className="muted" style={{ fontSize: 'var(--fs-xs)', lineHeight: 2 }}>
          اسنپ‌شات {SITE.updatedFa}. عددهای زنده در{' '}
          <a href={SITE.url + '/leaderboard'} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--cyan)' }}>
            لیدربورد رسمی
          </a>{' '}
          به‌روزرسانی می‌شوند. ساعت بازی از اتصال‌های واقعی روی سرورهای کلاچ پینگ محاسبه می‌شود؛ چت و محتوای بازی خوانده
          نمی‌شود. نشان پلاس کنار نام یعنی آن بازیکن اشتراک پلاس دارد و رنک داخل کروشه، رنک خودش در سرور مقصد است.
        </p>
      </Reveal>
    </Section>

    <Section>
      <SecHead
        eyebrow="چطور بالا بیایم"
        title="سه چیز، بدون ترفند"
        lead="جدول فقط ساعت بازی واقعی را می‌شمارد؛ نه تعداد ورود، نه خرید. این‌ها کمک می‌کند بیشتر و پایدارتر بازی کنی."
      />
      <div className="steps">
        {[
          {
            icon: 'route' as const,
            title: 'مسیر درست را انتخاب کن',
            body: 'اگر مسیر مستقیم روی اپراتورت ناپایدار بود، مسیر جایگزین ترکیه را امتحان کن؛ سشن قطع‌نشده بیشتر طول می‌کشد.',
          },
          {
            icon: 'signal' as const,
            title: 'پکت‌لاس را جدی بگیر',
            body: 'پکت‌لاس بیشتر از پینگ تجربه را خراب می‌کند. در ساعات شلوغ، سرور نزدیک‌تر یا مسیر جایگزین را امتحان کن.',
          },
          {
            icon: 'clock' as const,
            title: 'سشن طولانی‌تر',
            body: 'رتبه بر اساس مجموع ساعت است، ولی ستون سشن، طولانی‌ترین بازی بدون قطعی را نشان می‌دهد.',
          },
        ].map((s, i) => (
          <Reveal className="step" key={s.title} delay={i}>
            <div className="step-ico">
              <Icon name={s.icon} />
            </div>
            <h3>{s.title}</h3>
            <p>{s.body}</p>
          </Reveal>
        ))}
      </div>

      <Reveal className="cta-band" delay={1}>
        <div>
          <h2>هفتهٔ بعد نوبت توست</h2>
          <p>اشتراک بگیر، وارد شو و بازی کن؛ ساعت‌ها خودکار ثبت می‌شود.</p>
        </div>
        <div className="cta-actions">
          <Btn href={url('/store/')} variant="primary" size="lg" icon="bolt">
            خرید اشتراک
          </Btn>
          <Btn href={url('/servers/')} variant="ghost" size="lg" icon="server">
            آدرس سرورها
          </Btn>
        </div>
      </Reveal>
    </Section>
  </>
);
