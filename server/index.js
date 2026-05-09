require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');
const problems = require('./problems');

const app = express();
app.use(cors());
app.use(express.json({ limit: '512kb' }));

// ── Serve React build in production ──────────────────────────────────────────
const CLIENT_BUILD = path.join(__dirname, '..', 'client', 'build');
if (fs.existsSync(CLIENT_BUILD)) {
  app.use(express.static(CLIENT_BUILD));
}

// ── API ───────────────────────────────────────────────────────────────────────

app.get('/api/problems', (req, res) => {
  const safe = problems.map(({ solution, ...p }) => p);
  res.json(safe);
});

app.get('/api/problems/:id', (req, res) => {
  const p = problems.find(p => p.id === parseInt(req.params.id));
  if (!p) return res.status(404).json({ error: 'Not found' });
  const { solution, ...safe } = p;
  res.json(safe);
});

app.post('/api/run', async (req, res) => {
  const { code, problemId, language = 'javascript' } = req.body;
  if (!code?.trim()) return res.status(400).json({ error: 'No code provided' });

  const problem = problems.find(p => p.id === problemId);
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'jslearn-'));

  try {
    const result = language === 'go'
      ? await runGo(code, tmpDir)
      : await runJS(code, tmpDir, problem);

    const expected = problem?.expectedOutput?.trim() || null;
    const actual = result.stdout.trim();

    let passed = false;
    if (expected !== null) {
      passed = problem?.partialMatch
        ? actual.includes(expected)
        : actual === expected;
    }

    res.json({ ...result, passed, expected, actual });
  } catch (err) {
    res.json({ stdout: '', stderr: err.message, exitCode: 1, passed: false });
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});

// ── Code Runners ──────────────────────────────────────────────────────────────

function runJS(code, tmpDir, problem) {
  return new Promise(resolve => {
    // Inject jsdom if problem uses it
    const needsJsdom = code.includes('require(\'jsdom\')') || code.includes('require("jsdom")');
    let finalCode = code;

    if (needsJsdom) {
      // try to use system jsdom or skip gracefully
      finalCode = `try { ${code} } catch(e) { console.error('jsdom not available: ' + e.message); }`;
    }

    const file = path.join(tmpDir, 'main.js');
    fs.writeFileSync(file, finalCode);
    const start = Date.now();
    exec(`node "${file}"`, {
      timeout: 6000,
      maxBuffer: 1024 * 256,
      env: { ...process.env, NODE_PATH: path.join(__dirname, 'node_modules') }
    }, (err, stdout, stderr) => {
      resolve({
        stdout: stdout || '',
        stderr: err?.killed ? 'Timed out (6s limit)' : (stderr || ''),
        exitCode: err ? (err.code || 1) : 0,
        executionTime: Date.now() - start
      });
    });
  });
}

function runGo(code, tmpDir) {
  return new Promise(resolve => {
    const file = path.join(tmpDir, 'main.go');
    fs.writeFileSync(file, code);
    const start = Date.now();
    exec(`cd "${tmpDir}" && go run main.go`, {
      timeout: 8000,
      maxBuffer: 1024 * 256,
      env: { ...process.env, GOPROXY: 'off', HOME: os.homedir() }
    }, (err, stdout, stderr) => {
      resolve({
        stdout: stdout || '',
        stderr: err?.killed ? 'Timed out (8s)' : (stderr || ''),
        exitCode: err ? (err.code || 1) : 0,
        executionTime: Date.now() - start
      });
    });
  });
}

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', problems: problems.length, time: new Date().toISOString() });
});

// ── SPA fallback ──────────────────────────────────────────────────────────────
if (fs.existsSync(CLIENT_BUILD)) {
  app.get('*', (req, res) => res.sendFile(path.join(CLIENT_BUILD, 'index.html')));
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`\n⚡ JSLearn API → http://localhost:${PORT}/api/problems`);
  console.log(`   Frontend → http://localhost:${PORT}\n`);
});
