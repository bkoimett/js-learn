import React from 'react';

function renderDesc(text) {
  // Split on triple-backtick code blocks
  const parts = text.split(/(```[\s\S]*?```)/g);
  return parts.map((part, i) => {
    if (part.startsWith('```')) {
      const code = part.replace(/^```\w*\n?/, '').replace(/```$/, '');
      return <pre key={i}><code>{code.trim()}</code></pre>;
    }
    // Inline code
    const inlined = part.split(/(`[^`]+`)/g).map((s, j) => {
      if (s.startsWith('`') && s.endsWith('`')) {
        return <code key={j}>{s.slice(1, -1)}</code>;
      }
      return s;
    });
    return <span key={i}>{inlined}</span>;
  });
}

export default function ProblemPanel({ problem, showHints, onToggleHints }) {
  const lang = problem.language || 'javascript';
  return (
    <div className="prob-panel">
      <div className="prob-panel-top">
        <div className="prob-cat-label" data-cat={problem.category}>
          {problem.category}
        </div>
        <div className="prob-title">{problem.title}</div>
        <div className="prob-meta">
          <span className={`badge ${problem.difficulty}`}>{problem.difficulty}</span>
          <span className={`badge ${lang}`}>{lang.toUpperCase()}</span>
          {(problem.tags || []).slice(0, 3).map(t => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>
      </div>

      <div className="prob-body">
        <div className="prob-desc">{renderDesc(problem.description)}</div>

        {problem.hints?.length > 0 && (
          <div className="hints-section">
            <button className="hints-toggle" onClick={onToggleHints}>
              {showHints ? '▾' : '▸'} Hints ({problem.hints.length})
            </button>
            {showHints && (
              <div className="hint-list">
                {problem.hints.map((h, i) => (
                  <div key={i} className="hint-item">→ {h}</div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
