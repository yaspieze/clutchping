import { Icon } from '../components/Icons';
import { Btn, Crumbs, Reveal, Section } from '../components/ui';
import { POSTS, type Post as PostType } from '../data/posts';
import { SITE, url } from '../data/site';

const Body = ({ post }: { post: PostType }) => (
  <div className="prose">
    {post.blocks.map((b, i) => {
      if (b.type === 'h2') return <h2 key={i}>{b.text}</h2>;
      if (b.type === 'note')
        return (
          <blockquote key={i}>
            <Icon name="info" size={14} /> {b.text}
          </blockquote>
        );
      if (b.type === 'ul')
        return (
          <ul key={i}>
            {b.items.map((it) => (
              <li key={it}>{it}</li>
            ))}
          </ul>
        );
      return <p key={i}>{b.text}</p>;
    })}
  </div>
);

export const Post = ({ post }: { post: PostType }) => {
  const others = POSTS.filter((p) => p.slug !== post.slug);

  return (
    <>
      <div className="page-hero">
        <div className="wrap wrap-narrow">
          <Crumbs items={[{ label: 'راهنما', href: url('/blog/') }, { label: post.title }]} />
          <Reveal>
            <div className="post-meta" style={{ marginBottom: '0.9rem' }}>
              <span className="badge badge-cyan">{post.category}</span>
              <span>{post.dateFa}</span>
              <span>·</span>
              <span>{post.readingTime}</span>
            </div>
            <h1 style={{ fontSize: 'clamp(1.7rem, 3.4vw, 2.5rem)' }}>{post.title}</h1>
            <p className="lead" style={{ marginTop: '0.9rem' }}>
              {post.excerpt}
            </p>
          </Reveal>
        </div>
      </div>

      <Section className="tight">
        <div className="wrap wrap-narrow">
          <Body post={post} />

          <hr className="hairline" style={{ margin: '2.4rem 0 1.6rem' }} />

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
            <Btn href={url('/store/')} variant="primary" icon="bolt">
              خرید اشتراک
            </Btn>
            <Btn href={url('/servers/')} variant="ghost" icon="server">
              فهرست سرورها
            </Btn>
            <Btn href={SITE.discord} external variant="ghost" icon="discord">
              پرسش در دیسکورد
            </Btn>
          </div>
        </div>
      </Section>

      {others.length ? (
        <Section>
          <div className="wrap wrap-narrow">
            <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>مطلب بعدی</h2>
            <div className="post-grid">
              {others.map((p) => (
                <article className="post-card" key={p.slug}>
                  <div className="post-meta">
                    <span className="badge badge-cyan">{p.category}</span>
                    <span>{p.readingTime}</span>
                  </div>
                  <h3>
                    <a href={url(`/blog/${p.slug}/`)}>{p.title}</a>
                  </h3>
                  <p>{p.excerpt}</p>
                </article>
              ))}
            </div>
          </div>
        </Section>
      ) : null}
    </>
  );
};
