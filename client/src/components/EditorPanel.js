import React, { useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';

const THEME_DEF = {
  base: 'vs-dark',
  inherit: true,
  rules: [
    { token: 'comment',  foreground: '4a5878', fontStyle: 'italic' },
    { token: 'keyword',  foreground: 'f5a623' },
    { token: 'string',   foreground: '1de090' },
    { token: 'number',   foreground: 'fbbf24' },
    { token: 'type',     foreground: 'a78bfa' },
    { token: 'function', foreground: '4d9eff' },
    { token: 'variable', foreground: 'c8d4e8' },
  ],
  colors: {
    'editor.background':              '#0a0b0d',
    'editor.foreground':              '#c8d4e8',
    'editorLineNumber.foreground':    '#2a3347',
    'editorLineNumber.activeForeground': '#4a5878',
    'editor.selectionBackground':     '#1f2d45',
    'editorCursor.foreground':        '#f5a623',
    'editor.lineHighlightBackground': '#111318',
    'editorIndentGuide.background':   '#1f2533',
  }
};

export default function EditorPanel({
  problem, editorRef, initialCode,
  running, result, activeTab, onTabChange,
  onRun, onReset
}) {
  const monacoRef = useRef(null);
  const lang = problem.language || 'javascript';
  const filename = lang === 'go' ? 'main.go' : 'solution.js';

  function handleEditorMount(editor, monaco) {
    editorRef.current = editor;
    monacoRef.current = monaco;

    if (!monaco.__jslearnTheme) {
      monaco.editor.defineTheme('jslearn', THEME_DEF);
      monaco.__jslearnTheme = true;
    }
    monaco.editor.setTheme('jslearn');

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, onRun);
  }

  // Update code when problem changes
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.setValue(initialCode);
      editorRef.current.setPosition({ lineNumber: 1, column: 1 });
      editorRef.current.revealLine(1);
    }
  }, [problem.id]);

  const hasVerdict = result !== null;
  const hasSterr   = result?.stderr;

  return (
    <div className="editor-panel">
      {/* Toolbar */}
      <div className="editor-bar">
        <div className="editor-file">
          <div className={`file-dot ${lang}`} />
          {filename}
        </div>
        <span className="kbd-hint">Ctrl+Enter</span>
        <button className="btn btn-ghost" onClick={onReset} style={{ marginLeft: 4 }}>
          ↺ Reset
        </button>
        <button
          className="btn btn-run"
          onClick={onRun}
          disabled={running}
        >
          {running ? <><span className="spinner" /> Running…</> : '▶ Run'}
        </button>
      </div>

      {/* Monaco */}
      <div className="editor-wrap">
        <Editor
          height="100%"
          language={lang}
          theme="jslearn"
          defaultValue={initialCode}
          onMount={handleEditorMount}
          options={{
            fontSize: 13.5,
            fontFamily: "'JetBrains Mono', monospace",
            fontLigatures: true,
            lineHeight: 22,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: lang === 'go' ? 4 : 2,
            insertSpaces: lang !== 'go',
            renderLineHighlight: 'line',
            padding: { top: 12, bottom: 12 },
            smoothScrolling: true,
            cursorBlinking: 'phase',
            bracketPairColorization: { enabled: true },
          }}
        />
      </div>

      {/* Output */}
      <div className="output-panel">
        <div className="output-tabs">
          <div className={`out-tab ${activeTab === 'output' ? 'active' : ''}`} onClick={() => onTabChange('output')}>Output</div>
          <div className={`out-tab ${activeTab === 'expected' ? 'active' : ''}`} onClick={() => onTabChange('expected')}>Expected</div>
          {hasSterr && <div className={`out-tab ${activeTab === 'stderr' ? 'active' : ''}`} onClick={() => onTabChange('stderr')} style={{ color: 'var(--red)' }}>Errors</div>}
        </div>

        <div className="output-body">
          {activeTab === 'output' && <OutputTab result={result} running={running} />}
          {activeTab === 'expected' && <ExpectedTab result={result} problem={problem} />}
          {activeTab === 'stderr' && result?.stderr && (
            <div className="out-stderr">{result.stderr}</div>
          )}
        </div>
      </div>
    </div>
  );
}

function OutputTab({ result, running }) {
  if (running) return <div className="out-idle">⏳ Executing…</div>;
  if (!result)  return <div className="out-idle">Press ▶ Run or Ctrl+Enter to execute</div>;

  const { stdout, stderr, exitCode, passed, executionTime } = result;

  const verdictClass = passed ? 'pass' : (exitCode !== 0 ? 'error' : 'fail');
  const verdictText  = passed ? '✓  All tests passed' : (exitCode !== 0 ? '✕  Runtime error' : '✕  Wrong answer');
  const time = executionTime ? ` · ${executionTime}ms` : '';

  return (
    <>
      <div className={`verdict ${verdictClass}`}>{verdictText}{time}</div>
      {stdout && <div className="out-stdout">{stdout}</div>}
      {!passed && !stdout && !stderr && <div className="out-idle">(no output)</div>}
    </>
  );
}

function ExpectedTab({ result, problem }) {
  const expected = problem?.expectedOutput;
  if (!expected) return <div className="out-idle">No expected output defined for this problem.</div>;

  return (
    <div className="diff-section">
      <div className="diff-label">Expected</div>
      <div className="diff-block expected">{expected}</div>
      {result && (
        <>
          <div className="diff-label" style={{ marginTop: 6 }}>Your output</div>
          <div className={`diff-block ${result.passed ? 'expected' : 'actual'}`}>
            {result.actual || '(empty)'}
          </div>
        </>
      )}
    </div>
  );
}
