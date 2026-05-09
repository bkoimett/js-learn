import React from 'react';

const CAT_ORDER = [
  "JavaScript Fundamentals",
  "Event-Driven Programming",
  "Web: HTML, CSS & DOM",
  "Node.js & Backend JS",
  "Backend Programming: Go",
  "Web Architecture",
  "Infrastructure & Networking",
  "Software Security",
  "Algorithms",
];

export default function Sidebar({ problems, current, solved, search, onSearch, onSelect }) {
  // Group by category
  const grouped = {};
  CAT_ORDER.forEach(cat => { grouped[cat] = []; });
  problems.forEach(p => {
    if (!grouped[p.category]) grouped[p.category] = [];
    grouped[p.category].push(p);
  });

  return (
    <aside className="sidebar">
      <div className="sidebar-search">
        <span className="search-icon">⌕</span>
        <input
          type="text"
          placeholder="Search problems..."
          value={search}
          onChange={e => onSearch(e.target.value)}
        />
      </div>
      <div className="sidebar-scroll">
        {Object.entries(grouped).map(([cat, probs]) => {
          if (!probs.length) return null;
          const solvedCount = probs.filter(p => solved.has(p.id)).length;
          return (
            <div key={cat}>
              <div className="cat-header">
                <span className="cat-header-name" data-cat={cat}>
                  <span className="cat-dot" data-cat={cat} />
                  {cat}
                </span>
                <span className="cat-badge">{solvedCount}/{probs.length}</span>
              </div>
              {probs.map(p => (
                <div
                  key={p.id}
                  className={`prob-item ${current?.id === p.id ? 'active' : ''} ${solved.has(p.id) ? 'solved' : ''}`}
                  onClick={() => onSelect(p)}
                >
                  <div className="prob-check">{solved.has(p.id) ? '✓' : ''}</div>
                  <span className="prob-name">{p.title}</span>
                  <span className={`diff-dot ${p.difficulty}`} title={p.difficulty} />
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
