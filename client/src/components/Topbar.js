import React from 'react';

export default function Topbar({ solved, total }) {
  const pct = total ? Math.round((solved / total) * 100) : 0;
  return (
    <header className="topbar">
      <div className="topbar-logo">
        <div className="logo-mark">JS</div>
        <span className="logo-text">JS<span>Learn</span></span>
      </div>
      <span className="topbar-tagline">Full-Stack JavaScript Roadmap</span>
      <div className="topbar-right">
        <div className="progress-capsule">
          <div className="prog-track">
            <div className="prog-fill" style={{ width: `${pct}%` }} />
          </div>
          <span className="prog-label">{solved}/{total}</span>
          <span style={{ color: 'var(--muted)', fontSize: '0.68rem' }}>solved</span>
        </div>
      </div>
    </header>
  );
}
