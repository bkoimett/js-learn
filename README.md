# JSLearn — Full-Stack JavaScript Roadmap Platform

A MERN-stack coding practice platform covering the complete JavaScript learning roadmap.

## Topics Covered

| # | Category | Problems |
|---|----------|----------|
| 1 | JavaScript Fundamentals | Scope, Closures, Prototypes, Destructuring |
| 2 | Event-Driven Programming | EventEmitter, Promises, Async/Await, Debounce |
| 3 | Web: HTML, CSS & DOM | DOM Manipulation, Event Delegation, CSS Specificity |
| 4 | Node.js & Backend JS | Streams, Middleware, REST API, Worker Threads |
| 5 | Backend Programming: Go | HTTP Server, Goroutine Fan-Out, JSON API |
| 6 | Web Architecture | HTTP Status Codes, URL Parser, Rate Limiter |
| 7 | Infrastructure & Networking | CIDR Subnets, DNS Resolver, TCP State Machine |
| 8 | Software Security | SQL Injection, JWT, Password Strength, XSS, HMAC, Caesar Cipher |
| 9 | Algorithms | Binary Search, Merge Sort, LRU Cache, BFS, Knapsack |

---

## Quick Start

### Prerequisites
- **Node.js** 18+
- **Go** 1.21+ (for Go problems — optional but recommended)

### 1. Install dependencies

```bash
# Install server deps
cd server && npm install && cd ..

# Install client deps
cd client && npm install && cd ..
```

### 2. Start the backend server

```bash
cd server
npm start
# → API running at http://localhost:3001
```

### 3. Start the React frontend (separate terminal)

```bash
cd client
npm start
# → React dev server at http://localhost:3000
# (proxies API calls to :3001 automatically)
```

Open **http://localhost:3000** in your browser.

---

## Production Build

Build the React app and serve everything from the Express server:

```bash
cd client && npm run build
cd ../server && npm start
# → Open http://localhost:3001
```

---

## Project Structure

```
jslearn/
├── server/
│   ├── index.js        # Express API + code execution sandbox
│   ├── problems.js     # All 35 problems with solutions + metadata
│   └── package.json
├── client/
│   ├── src/
│   │   ├── App.js               # Root component, state management
│   │   ├── index.css            # Global styles (Chakra Petch + JetBrains Mono)
│   │   ├── components/
│   │   │   ├── Topbar.js        # Header with progress bar
│   │   │   ├── Sidebar.js       # Problem list, grouped by category
│   │   │   ├── ProblemPanel.js  # Problem description + hints
│   │   │   ├── EditorPanel.js   # Monaco editor + output tabs
│   │   │   ├── Welcome.js       # Landing screen
│   │   │   └── Toast.js         # Notification toasts
│   ├── public/index.html
│   └── package.json
└── package.json
```

---

## Deploy to Render (Free)

1. Push the whole `jslearn/` folder to GitHub
2. **New Web Service** on [render.com](https://render.com):
   - Root Directory: `server`
   - Build Command: `npm install`
   - Start Command: `node index.js`
3. Before deploying, build the client locally:
   ```bash
   cd client && npm run build
   ```
   Commit the `client/build/` folder to git, then deploy.

The Express server serves `../client/build` as static files, so one service handles everything.
