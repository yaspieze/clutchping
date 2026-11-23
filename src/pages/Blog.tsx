import { Icon } from '../components/Icons';
import { Btn, Crumbs, Reveal, SecHead, Section } from '../components/ui';
import { POSTS } from '../data/posts';
import { SITE, url } from '../data/site';

export const Blog = () => (
  <>
    <div className="page-hero">
      <div className="wrap">
        <Crumbs items={[{ label: 'راهنما' }]} />
        <Reveal>
          <span className="eyebrow">راهنما</span>
          <h1>راهنمای اتصال و پینگ</h1>
          <p className="lead">
            نوشته‌های کوتاه و کاربردی دربارهٔ چیزی که واقعاً تجربهٔ بازی را تعیین می‌کند: تأخیر، پکت‌لاس و مسیر. بدون
            اصطلاح‌بازی و بدون وعدهٔ اضافه.
          </p>
        </Reveal>
      </div>
    </div>

    <Section className="tight">
      <div className="post-grid">
        {POSTS.map((p, i) => (
          <Reveal as="article" className="post-card" key={p.slug} delay={i}>
            <div className="post-meta">
              <span className="badge badge-cyan">{p.category}</span>
              <span>{p.dateFa}</span>
              <span>·</span>
              <span>{p.readingTime}</span>
            </div>
            <h3>
              <a href={url(`/blog/${p.slug}/`)}>{p.title}</a>
            </h3>
            <p>{p.excerpt}</p>
            <a className="link-arrow" href={url(`/blog/${p.slug}/`)}>
              ادامهٔ مطلب <Icon name="arrow" size={14} />
            </a>
          </Reveal>
        ))}
      </div>
    </Section>

    <Section>
      <SecHead
        eyebrow="شروع سریع"
        title="اگر فقط می‌خواهی وصل شوی"
        lead="آدرس سرور را بردار، در ماینکرفت اضافه کن و وارد شو. سی دقیقهٔ اول رایگان است."
      />
      <Reveal className="cta-band">
        <div>
          <h2>آدرس اتصال خودکار</h2>
          <p className="mono" style={{ fontSize: '1.1rem', color: 'var(--cyan)', direction: 'ltr', textAlign: 'start' }}>
            {SITE.autoAddress}
          </p>
          <p>برای سرورهای دیگر، آدرس اختصاصی همان سرور در فهرست سرورها آمده است.</p>
        </div>
        <div className="cta-actions">
          <Btn href={url('/servers/')} variant="primary" size="lg" icon="server">
            فهرست سرورها
          </Btn>
          <Btn href={url('/faq/')} variant="ghost" size="lg" icon="help">
            سؤالات پرتکرار
          </Btn>
        </div>
      </Reveal>
    </Section>
  </>
);
