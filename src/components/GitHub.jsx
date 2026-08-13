import { useEffect, useState, useMemo } from 'react';

export default function GitHub() {
  const [ghStats, setGhStats] = useState({ contributions: 0, repos: 0 });
  const [contribDays, setContribDays] = useState([]);

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        const userRes = await fetch('https://api.github.com/users/lansmasigon');
        if (userRes.ok) {
          const user = await userRes.json();
          setGhStats(prev => ({ ...prev, repos: user.public_repos }));
        }
        
        const contribRes = await fetch('https://gh-calendar.rschristian.dev/user/lansmasigon');
        if (contribRes.ok) {
          const contribData = await contribRes.json();
          const flatDays = contribData.contributions.flat();
          setContribDays(flatDays);
          setGhStats(prev => ({ ...prev, contributions: contribData.total }));
        }
      } catch (err) {
        console.error('Failed to fetch github stats', err);
      }
    };
    fetchGitHubStats();
  }, []);

  const getShade = (intensity) => {
    switch (String(intensity)) {
      case '0': return 'var(--gh-level0)';
      case '1': return 'var(--gh-level1)';
      case '2': return 'var(--gh-level2)';
      case '3': return 'var(--gh-level3)';
      case '4': return 'var(--gh-level4)';
      default: return 'var(--gh-level0)';
    }
  };

  const monthLabels = useMemo(() => {
    if (contribDays.length === 0) return [];
    const labels = [];
    let currentMonth = -1;
    contribDays.forEach((day, index) => {
      // Days are populated column by column (top-to-bottom, left-to-right)
      if (index % 7 === 0) {
        const date = new Date(day.date);
        const month = date.getMonth();
        if (month !== currentMonth) {
          labels.push({
            month: date.toLocaleString('default', { month: 'short' }),
            colIndex: index / 7
          });
          currentMonth = month;
        }
      }
    });
    return labels;
  }, [contribDays]);

  return (
    <section id="github">
      <div className="eyebrow mono reveal">GitHub Activity</div>
      <h2 className="section-title reveal">@lansmasigon</h2>
      <div className="gh-stats reveal">
        <div className="gh-stat"><div className="num">{ghStats.contributions.toLocaleString()}</div><div className="lbl mono">contributions</div></div>
        <div className="gh-stat"><div className="num">{ghStats.repos}</div><div className="lbl mono">repositories</div></div>
      </div>
      
      <div className="contrib-wrap reveal" style={{ position: 'relative', width: '100%', overflowX: 'auto', paddingBottom: '10px' }}>
        <div style={{ minWidth: 'max-content' }}>
          <div style={{ display: 'flex', position: 'relative', height: '20px', marginBottom: '4px', fontSize: '0.8rem', color: 'var(--muted)', width: '100%' }}>
            {monthLabels.map((lbl, i) => (
              <span key={i} style={{ position: 'absolute', left: `${lbl.colIndex * 15}px` }}>{lbl.month}</span>
            ))}
          </div>
          <div className="contrib" id="contribGrid">
            {contribDays.length > 0 ? (
              contribDays.map((day, i) => (
                <span
                  key={i}
                  className="cell"
                  title={`${day.count} contributions on ${day.date}`}
                  style={{ background: getShade(day.intensity) }}
                ></span>
              ))
            ) : (
              Array.from({ length: 364 }).map((_, i) => (
                <span key={i} className="cell" style={{ background: 'var(--bg-alt)' }}></span>
              ))
            )}
          </div>
        </div>
      </div>
      <div className="contrib-legend mono reveal">
        Less
        <span className="cell" style={{ background: 'var(--gh-level0)' }}></span>
        <span className="cell" style={{ background: 'var(--gh-level1)' }}></span>
        <span className="cell" style={{ background: 'var(--gh-level2)' }}></span>
        <span className="cell" style={{ background: 'var(--gh-level3)' }}></span>
        <span className="cell" style={{ background: 'var(--gh-level4)' }}></span>
        More
      </div>
    </section>
  );
}