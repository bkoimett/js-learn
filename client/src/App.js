import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import ProblemPanel from './components/ProblemPanel';
import EditorPanel from './components/EditorPanel';
import Welcome from './components/Welcome';
import Toast from './components/Toast';

const STORAGE_SOLVED = 'jslearn-solved';
const STORAGE_CODE   = id => `jslearn-code-${id}`;

export default function App() {
  const [problems, setProblems]         = useState([]);
  const [current, setCurrent]           = useState(null);
  const [solved, setSolved]             = useState(() =>
    new Set(JSON.parse(localStorage.getItem(STORAGE_SOLVED) || '[]'))
  );
  const [running, setRunning]           = useState(false);
  const [result, setResult]             = useState(null);
  const [activeTab, setActiveTab]       = useState('output');
  const [search, setSearch]             = useState('');
  const [toasts, setToasts]             = useState([]);
  const [showHints, setShowHints]       = useState(false);
  const editorRef                       = useRef(null);

  // ── Load problems ──────────────────────────────────────────
  useEffect(() => {
    axios.get('/api/problems')
      .then(r => setProblems(r.data))
      .catch(() => toast('⚠ Could not connect to server', 'error'));
  }, []);

  // ── Persist solved set ─────────────────────────────────────
  useEffect(() => {
    localStorage.setItem(STORAGE_SOLVED, JSON.stringify([...solved]));
  }, [solved]);

  // ── Toast helper ───────────────────────────────────────────
  const toast = useCallback((msg, type = 'info') => {
    const id = Date.now();
    setToasts(t => [...t, { id, msg, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3200);
  }, []);

  // ── Load a problem ─────────────────────────────────────────
  const loadProblem = useCallback((prob) => {
    setCurrent(prob);
    setResult(null);
    setActiveTab('output');
    setShowHints(false);
  }, []);

  // ── Run code ───────────────────────────────────────────────
  const runCode = useCallback(async () => {
    if (running || !current) return;
    const code = editorRef.current?.getValue?.() ?? '';
    localStorage.setItem(STORAGE_CODE(current.id), code);
    setRunning(true);
    setResult(null);

    try {
      const { data } = await axios.post('/api/run', {
        code,
        problemId: current.id,
        language: current.language || 'javascript'
      });
      setResult(data);
      setActiveTab(data.stderr ? 'stderr' : 'output');

      if (data.passed) {
        setSolved(s => new Set([...s, current.id]));
        toast('✓ Correct!  Problem solved', 'success');
      }
    } catch {
      toast('Network error — is the server running?', 'error');
    } finally {
      setRunning(false);
    }
  }, [running, current, toast]);

  // ── Reset editor ───────────────────────────────────────────
  const resetCode = () => {
    if (!current) return;
    if (!window.confirm('Reset to starter code?')) return;
    localStorage.removeItem(STORAGE_CODE(current.id));
    editorRef.current?.setValue?.(current.starterCode || '');
    setResult(null);
  };

  // ── Filtered sidebar list ──────────────────────────────────
  const filtered = search
    ? problems.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase()) ||
        (p.tags || []).some(t => t.toLowerCase().includes(search.toLowerCase()))
      )
    : problems;

  const getSavedCode = (prob) =>
    localStorage.getItem(STORAGE_CODE(prob?.id)) || prob?.starterCode || '';

  return (
    <div className="app">
      <Topbar solved={solved.size} total={problems.length} />

      <Sidebar
        problems={filtered}
        current={current}
        solved={solved}
        search={search}
        onSearch={setSearch}
        onSelect={loadProblem}
      />

      <main className="main">
        {!current ? (
          <Welcome
            total={problems.length}
            solved={solved.size}
            categories={[...new Set(problems.map(p => p.category))].length}
            onStart={() => problems.length && loadProblem(problems[0])}
          />
        ) : (
          <>
            <ProblemPanel
              problem={current}
              showHints={showHints}
              onToggleHints={() => setShowHints(h => !h)}
            />
            <EditorPanel
              problem={current}
              editorRef={editorRef}
              initialCode={getSavedCode(current)}
              running={running}
              result={result}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              onRun={runCode}
              onReset={resetCode}
            />
          </>
        )}
      </main>

      <Toast toasts={toasts} />
    </div>
  );
}
