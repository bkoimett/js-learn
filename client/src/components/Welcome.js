import React from 'react';

export default function Welcome({ total, solved, categories, onStart }) {
  return (
    <div className="welcome" style={{ gridColumn: '1 / -1' }}>
      <div className="welcome-icon">⚡</div>
      <h1 className="welcome-title">
        Master <em>JavaScript</em><br />Full-Stack Development
      </h1>
      <p className="welcome-sub">
        A structured coding platform following the complete JS roadmap — from closures and
        event loops to Go backend services, TCP networking, security, and algorithms.
      </p>
      <div className="welcome-grid">
        <div className="wg-card">
          <span className="wg-n">{categories}</span>
          <span className="wg-label">Topics</span>
        </div>
        <div className="wg-card">
          <span className="wg-n">{total}</span>
          <span className="wg-label">Problems</span>
        </div>
        <div className="wg-card">
          <span className="wg-n" style={{ color: 'var(--green)' }}>{solved}</span>
          <span className="wg-label">Solved</span>
        </div>
        <div className="wg-card">
          <span className="wg-n" style={{ color: 'var(--cyan)' }}>2</span>
          <span className="wg-label">Languages</span>
        </div>
      </div>
      <button className="btn-start" onClick={onStart}>
        Start Learning →
      </button>
    </div>
  );
}
