import { faDec, faNum } from '../data/site';
import { serverIcon } from '../data/servers';
import type { LeaderRow } from '../data/community';

export const LeaderTable = ({ rows, head = true }: { rows: LeaderRow[]; head?: boolean }) => {
  const max = Math.max(...rows.map((r) => r.hours), 1);

  return (
    <div className="lb-table" data-reveal>
      {head ? (
        <div className="lb-row head" aria-hidden="true">
          <span>#</span>
          <span>بازیکن</span>
          <span>ساعت بازی</span>
          <span>سشن</span>
        </div>
      ) : null}

      {rows.map((r) => (
        <div className="lb-row" key={`${r.rank}-${r.name}`}>
          <span className={`lb-rank${r.rank <= 3 ? ' top' : ''}`}>
            {r.rank <= 3 ? <span aria-hidden="true">◆</span> : null}
            {faNum(r.rank)}
          </span>

          <span className="lb-who">
            <img
              className="lb-avatar"
              src={`https://mc-heads.net/avatar/${encodeURIComponent(r.name)}/60`}
              alt=""
              width={30}
              height={30}
              loading="lazy"
              onError={(e) => {
                const img = e.currentTarget;
                img.style.visibility = 'hidden';
              }}
            />
            <span className="lb-name">{r.name}</span>
            <img className="lb-srv" src={serverIcon(r.serverId)} alt="" width={16} height={16} loading="lazy" />
            {r.rankTag ? <span className="badge badge-cyan">{r.rankTag}</span> : null}
            {r.plus ? (
              <span className="badge badge-violet" title="اشتراک پلاس">
                پلاس
              </span>
            ) : null}
            <span className="badge" style={{ marginInlineStart: 'auto' }}>
              سطح {faNum(r.level)}
            </span>
          </span>

          <span className="lb-bar">
            <span className="lb-bar-track">
              <span className="lb-bar-fill" style={{ width: `${Math.max((r.hours / max) * 100, 4)}%` }} />
            </span>
            <span className="lb-hours num">{faDec(r.hours)}</span>
          </span>

          <span className="lb-hours num">{r.longest}</span>
        </div>
      ))}
    </div>
  );
};
