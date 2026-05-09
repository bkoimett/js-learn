const problems = [

// ══════════════════════════════════════════════════════════════
// CATEGORY 1 — JavaScript Fundamentals
// ══════════════════════════════════════════════════════════════
{
  id: 1, category: "JavaScript Fundamentals", order: 1,
  title: "Variable Scoping",
  difficulty: "easy",
  description: "Predict and fix the output.\n\nThe code below uses `var`, `let`, and `const` inside blocks. It has a scoping bug.\n\nFix it so the output is:\n```\n10\n20\nblock\n```",
  starterCode: `function scopeTest() {
  var x = 10;
  let y = 20;
  if (true) {
    var x = 99; // bug: this overwrites outer x
    let y = 'block';
    console.log(y);
  }
  console.log(x);
  console.log(y);
}
scopeTest();`,
  solution: `function scopeTest() {
  var x = 10;
  let y = 20;
  if (true) {
    let x = 99;
    let y = 'block';
    console.log(y);
  }
  console.log(x);
  console.log(y);
}
scopeTest();`,
  expectedOutput: "block\n10\n20",
  hints: ["var is function-scoped, let/const are block-scoped", "Replace var x inside the block with let x"],
  tags: ["scope", "var", "let", "const"]
},
{
  id: 2, category: "JavaScript Fundamentals", order: 2,
  title: "Closure Counter",
  difficulty: "medium",
  description: "Implement a `makeCounter()` factory function that returns an object with three methods: `increment()`, `decrement()`, and `value()`.\n\nEach `makeCounter()` call creates an independent counter starting at 0.\n\nExpected output:\n```\n1\n2\n1\n0\n```",
  starterCode: `function makeCounter() {
  // your code here
}

const a = makeCounter();
const b = makeCounter();
a.increment();
a.increment();
b.increment();
a.decrement();
console.log(a.value()); // 1
console.log(b.value()); // 1 -- wait, check expected output
`,
  solution: `function makeCounter() {
  let count = 0;
  return {
    increment() { count++; },
    decrement() { count--; },
    value() { return count; }
  };
}

const a = makeCounter();
const b = makeCounter();
a.increment();
a.increment();
b.increment();
a.decrement();
console.log(a.value());
console.log(b.value());
console.log(a.decrement() ?? a.value());
const c = makeCounter();
console.log(c.value());`,
  expectedOutput: "1\n1\n1\n0",
  hints: ["The inner count variable is captured by the returned object's methods", "Each makeCounter() call creates a new closure scope"],
  tags: ["closures", "factory-functions", "scope"]
},
{
  id: 3, category: "JavaScript Fundamentals", order: 3,
  title: "Prototype Chain",
  difficulty: "medium",
  description: "Create an `Animal` constructor with a `speak()` method on its prototype. Then create a `Dog` constructor that inherits from `Animal` and overrides `speak()`.\n\nExpected output:\n```\nAnimal sound\nWoof!\n```",
  starterCode: `function Animal(name) {
  this.name = name;
}
// add speak() to Animal.prototype

function Dog(name) {
  Animal.call(this, name);
}
// set up prototype chain
// override speak()

const a = new Animal('Generic');
const d = new Dog('Rex');
console.log(a.speak());
console.log(d.speak());`,
  solution: `function Animal(name) {
  this.name = name;
}
Animal.prototype.speak = function() { return 'Animal sound'; };

function Dog(name) {
  Animal.call(this, name);
}
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;
Dog.prototype.speak = function() { return 'Woof!'; };

const a = new Animal('Generic');
const d = new Dog('Rex');
console.log(a.speak());
console.log(d.speak());`,
  expectedOutput: "Animal sound\nWoof!",
  hints: ["Use Object.create(Animal.prototype) to set up inheritance", "Call Animal.call(this, name) in Dog to initialize inherited properties"],
  tags: ["prototypes", "inheritance", "OOP"]
},
{
  id: 4, category: "JavaScript Fundamentals", order: 4,
  title: "Array Destructuring & Spread",
  difficulty: "easy",
  description: "Use destructuring and spread to:\n1. Swap `a` and `b` without a temp variable\n2. Get the first element and rest of an array separately\n3. Merge two arrays\n\nExpected output:\n```\n2 1\n1 [2,3,4]\n[1,2,3,4,5,6]\n```",
  starterCode: `let a = 1, b = 2;
// 1. swap a and b using destructuring
console.log(a, b); // 2 1

const nums = [1, 2, 3, 4];
// 2. destructure first and rest
console.log(first, rest); // 1 [2,3,4]

const x = [1, 2, 3];
const y = [4, 5, 6];
// 3. merge using spread
console.log(merged); // [1,2,3,4,5,6]`,
  solution: `let a = 1, b = 2;
[a, b] = [b, a];
console.log(a, b);

const nums = [1, 2, 3, 4];
const [first, ...rest] = nums;
console.log(first, JSON.stringify(rest));

const x = [1, 2, 3];
const y = [4, 5, 6];
const merged = [...x, ...y];
console.log(JSON.stringify(merged));`,
  expectedOutput: "2 1\n1 [2,3,4]\n[1,2,3,4,5,6]",
  hints: ["[a, b] = [b, a] swaps without temp", "const [first, ...rest] = array"],
  tags: ["destructuring", "spread", "arrays", "ES6"]
},

// ══════════════════════════════════════════════════════════════
// CATEGORY 2 — Event-Driven Programming
// ══════════════════════════════════════════════════════════════
{
  id: 5, category: "Event-Driven Programming", order: 1,
  title: "EventEmitter from Scratch",
  difficulty: "medium",
  description: "Implement a minimal `EventEmitter` class with:\n- `on(event, listener)` — register a listener\n- `emit(event, ...args)` — call all listeners for the event\n- `off(event, listener)` — remove a specific listener\n\nExpected output:\n```\nhello Alice\nhello Bob\nonly once\nlistener removed\n```",
  starterCode: `class EventEmitter {
  // implement on, emit, off
}

const ee = new EventEmitter();
const greet = (name) => console.log('hello', name);
ee.on('greet', greet);
ee.emit('greet', 'Alice');
ee.emit('greet', 'Bob');
ee.on('once', () => console.log('only once'));
ee.emit('once');
ee.off('greet', greet);
ee.emit('greet', 'Carol'); // should not print
console.log('listener removed');`,
  solution: `class EventEmitter {
  constructor() { this._events = {}; }
  on(event, listener) {
    if (!this._events[event]) this._events[event] = [];
    this._events[event].push(listener);
  }
  emit(event, ...args) {
    (this._events[event] || []).forEach(l => l(...args));
  }
  off(event, listener) {
    this._events[event] = (this._events[event] || []).filter(l => l !== listener);
  }
}

const ee = new EventEmitter();
const greet = (name) => console.log('hello', name);
ee.on('greet', greet);
ee.emit('greet', 'Alice');
ee.emit('greet', 'Bob');
ee.on('once', () => console.log('only once'));
ee.emit('once');
ee.off('greet', greet);
ee.emit('greet', 'Carol');
console.log('listener removed');`,
  expectedOutput: "hello Alice\nhello Bob\nonly once\nlistener removed",
  hints: ["Store listeners in a Map or plain object keyed by event name", "off() should filter out the specific listener reference"],
  tags: ["events", "EventEmitter", "pub-sub", "OOP"]
},
{
  id: 6, category: "Event-Driven Programming", order: 2,
  title: "Promise Chain",
  difficulty: "medium",
  description: "Implement three async steps using Promises:\n1. `fetchUser(id)` — resolves with `{id, name: 'Alice'}`\n2. `fetchPosts(user)` — resolves with `['post1','post2']`\n3. `formatOutput(posts)` — resolves with `'Posts: post1, post2'`\n\nChain them and print the final string.\n\nExpected output:\n```\nPosts: post1, post2\n```",
  starterCode: `function fetchUser(id) {
  // return a Promise that resolves with {id, name: 'Alice'}
}

function fetchPosts(user) {
  // return a Promise that resolves with ['post1','post2']
}

function formatOutput(posts) {
  // return a Promise that resolves with 'Posts: post1, post2'
}

fetchUser(1)
  .then(fetchPosts)
  .then(formatOutput)
  .then(console.log);`,
  solution: `function fetchUser(id) {
  return Promise.resolve({ id, name: 'Alice' });
}
function fetchPosts(user) {
  return Promise.resolve(['post1', 'post2']);
}
function formatOutput(posts) {
  return Promise.resolve('Posts: ' + posts.join(', '));
}

fetchUser(1)
  .then(fetchPosts)
  .then(formatOutput)
  .then(console.log);`,
  expectedOutput: "Posts: post1, post2",
  hints: ["Promise.resolve(value) creates an immediately resolved promise", "Each .then() receives the resolved value of the previous promise"],
  tags: ["promises", "async", "chaining"]
},
{
  id: 7, category: "Event-Driven Programming", order: 3,
  title: "Async/Await Error Handling",
  difficulty: "medium",
  description: "Write an `async` function `loadData(id)` that:\n1. Awaits `fetchRecord(id)` (provided)\n2. If `id < 0`, `fetchRecord` rejects — catch it and print `'Error: invalid id'`\n3. Otherwise print `'Record: ' + data.name`\n\nExpected output:\n```\nRecord: Widget\nError: invalid id\n```",
  starterCode: `function fetchRecord(id) {
  if (id < 0) return Promise.reject(new Error('invalid id'));
  return Promise.resolve({ id, name: 'Widget' });
}

async function loadData(id) {
  // your code: try/catch, await fetchRecord
}

loadData(1);
loadData(-1);`,
  solution: `function fetchRecord(id) {
  if (id < 0) return Promise.reject(new Error('invalid id'));
  return Promise.resolve({ id, name: 'Widget' });
}

async function loadData(id) {
  try {
    const data = await fetchRecord(id);
    console.log('Record: ' + data.name);
  } catch (err) {
    console.log('Error: ' + err.message);
  }
}

loadData(1);
loadData(-1);`,
  expectedOutput: "Record: Widget\nError: invalid id",
  hints: ["Use try/catch inside async functions to handle rejected promises", "await unwraps the promise value or throws on rejection"],
  tags: ["async-await", "promises", "error-handling"]
},
{
  id: 8, category: "Event-Driven Programming", order: 4,
  title: "Debounce Implementation",
  difficulty: "hard",
  description: "Implement a `debounce(fn, delay)` function. The debounced function should only call `fn` after `delay` ms have passed since the last call.\n\nSimulate rapid calls and verify only the last fires.\n\nExpected output:\n```\nfired: 3\n```",
  starterCode: `function debounce(fn, delay) {
  // your implementation
}

let callCount = 0;
const debounced = debounce((n) => console.log('fired:', n), 50);

// Simulate rapid calls
debounced(1);
debounced(2);
debounced(3);
// Only the last call should fire after 50ms`,
  solution: `function debounce(fn, delay) {
  let timer = null;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

const debounced = debounce((n) => console.log('fired:', n), 50);
debounced(1);
debounced(2);
debounced(3);`,
  expectedOutput: "fired: 3",
  hints: ["Store a timer ID in the closure", "clearTimeout on each call, then setTimeout again"],
  tags: ["debounce", "closures", "timers", "event-driven"]
},

// ══════════════════════════════════════════════════════════════
// CATEGORY 3 — Web: HTML, CSS & the DOM
// ══════════════════════════════════════════════════════════════
{
  id: 9, category: "Web: HTML, CSS & DOM", order: 1,
  title: "DOM Manipulation",
  difficulty: "easy",
  description: "Using the DOM API, write JS that:\n1. Creates a `<ul>` with 3 `<li>` items: `'Apple'`, `'Banana'`, `'Cherry'`\n2. Adds class `'fruit'` to each `<li>`\n3. Returns the outer HTML of the `<ul>`\n\nExpected output:\n```\n<ul><li class=\"fruit\">Apple</li><li class=\"fruit\">Banana</li><li class=\"fruit\">Cherry</li></ul>\n```",
  starterCode: `// Node.js doesn't have a real DOM, so we use this minimal shim:
const { JSDOM } = require('jsdom');
const dom = new JSDOM('<!DOCTYPE html><body></body>');
const document = dom.window.document;

function buildList(items) {
  // create <ul>, add <li> for each item with class 'fruit'
  // return ul.outerHTML
}

console.log(buildList(['Apple', 'Banana', 'Cherry']));`,
  solution: `const { JSDOM } = require('jsdom');
const dom = new JSDOM('<!DOCTYPE html><body></body>');
const document = dom.window.document;

function buildList(items) {
  const ul = document.createElement('ul');
  items.forEach(text => {
    const li = document.createElement('li');
    li.className = 'fruit';
    li.textContent = text;
    ul.appendChild(li);
  });
  return ul.outerHTML;
}

console.log(buildList(['Apple', 'Banana', 'Cherry']));`,
  expectedOutput: `<ul><li class="fruit">Apple</li><li class="fruit">Banana</li><li class="fruit">Cherry</li></ul>`,
  hints: ["document.createElement('ul') creates a node", "el.appendChild(child) adds a child node"],
  tags: ["DOM", "createElement", "appendChild"]
},
{
  id: 10, category: "Web: HTML, CSS & DOM", order: 2,
  title: "Event Delegation",
  difficulty: "medium",
  description: "Explain and implement event delegation: instead of attaching a click listener to each `<li>`, attach one listener to the parent `<ul>` and use `event.target` to detect which item was clicked.\n\nSimulate clicks and print the clicked item's text.\n\nExpected output:\n```\nClicked: Apple\nClicked: Cherry\n```",
  starterCode: `const { JSDOM } = require('jsdom');
const { window } = new JSDOM('<!DOCTYPE html><ul id="list"><li>Apple</li><li>Banana</li><li>Cherry</li></ul>');
const document = window.document;

const ul = document.getElementById('list');

// Attach ONE listener to ul using event delegation
// Print 'Clicked: ' + item text when a li is clicked

// Simulate clicks:
ul.querySelectorAll('li')[0].click();
ul.querySelectorAll('li')[2].click();`,
  solution: `const { JSDOM } = require('jsdom');
const { window } = new JSDOM('<!DOCTYPE html><ul id="list"><li>Apple</li><li>Banana</li><li>Cherry</li></ul>');
const document = window.document;

const ul = document.getElementById('list');

ul.addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    console.log('Clicked: ' + e.target.textContent);
  }
});

ul.querySelectorAll('li')[0].click();
ul.querySelectorAll('li')[2].click();`,
  expectedOutput: "Clicked: Apple\nClicked: Cherry",
  hints: ["One listener on the parent handles all children", "e.target is the actual element that was clicked"],
  tags: ["event-delegation", "DOM", "events"]
},
{
  id: 11, category: "Web: HTML, CSS & DOM", order: 3,
  title: "CSS Specificity Calculator",
  difficulty: "medium",
  description: "Write a function `specificity(selector)` that calculates CSS specificity as `[a, b, c]` where:\n- `a` = number of ID selectors (`#id`)\n- `b` = number of class/attribute/pseudo-class selectors\n- `c` = number of element/pseudo-element selectors\n\nExpected output:\n```\n[1,0,0]\n[0,2,1]\n[1,1,2]\n```",
  starterCode: `function specificity(selector) {
  // parse selector and return [a, b, c]
}

console.log(JSON.stringify(specificity('#header')));          // [1,0,0]
console.log(JSON.stringify(specificity('.nav .item')));       // [0,2,0] -- wait, check
console.log(JSON.stringify(specificity('#main .btn:hover'))); // ?
console.log(JSON.stringify(specificity('div.card h2')));      // ?`,
  solution: `function specificity(selector) {
  const ids = (selector.match(/#[\\w-]+/g) || []).length;
  const classes = (selector.match(/\\.[\\w-]+|\\[[^\\]]+\\]|:[\\w-]+(?!:)/g) || []).length;
  const elements = (selector.match(/(?<![#.\\[\\]:*])[a-zA-Z][\\w-]*/g) || []).length;
  return [ids, classes, elements];
}

console.log(JSON.stringify(specificity('#header')));
console.log(JSON.stringify(specificity('.nav .item')));
console.log(JSON.stringify(specificity('#main .btn:hover')));
console.log(JSON.stringify(specificity('div.card h2')));`,
  expectedOutput: "[1,0,0]\n[0,2,0]\n[1,2,0]\n[0,1,2]",
  hints: ["Count # for IDs, . for classes, bare words for elements", "Use regex to count each type"],
  tags: ["CSS", "specificity", "regex", "web"]
},

// ══════════════════════════════════════════════════════════════
// CATEGORY 4 — Node.js & Backend JS
// ══════════════════════════════════════════════════════════════
{
  id: 12, category: "Node.js & Backend JS", order: 1,
  title: "Node.js Streams",
  difficulty: "hard",
  description: "Use Node.js `stream.Transform` to implement an uppercase transform stream that converts all text to uppercase.\n\nPipe a Readable string stream through it and collect the output.\n\nExpected output:\n```\nHELLO WORLD\n```",
  starterCode: `const { Transform, Readable } = require('stream');

class UpperCaseTransform extends Transform {
  // implement _transform(chunk, encoding, callback)
}

const source = Readable.from(['hello world']);
const upper = new UpperCaseTransform();

let result = '';
upper.on('data', chunk => result += chunk);
upper.on('end', () => console.log(result.trim()));
source.pipe(upper);`,
  solution: `const { Transform, Readable } = require('stream');

class UpperCaseTransform extends Transform {
  _transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase());
    callback();
  }
}

const source = Readable.from(['hello world']);
const upper = new UpperCaseTransform();

let result = '';
upper.on('data', chunk => result += chunk);
upper.on('end', () => console.log(result.trim()));
source.pipe(upper);`,
  expectedOutput: "HELLO WORLD",
  hints: ["Call this.push(transformedData) inside _transform", "Call callback() when done processing the chunk"],
  tags: ["streams", "Node.js", "Transform", "pipes"]
},
{
  id: 13, category: "Node.js & Backend JS", order: 2,
  title: "Express Middleware Chain",
  difficulty: "medium",
  description: "Implement three Express-style middleware functions and chain them manually (without Express):\n1. `logger` — logs `'LOG: GET /path'`\n2. `auth` — checks `req.headers.token === 'secret'`, calls `next()` or sets `res.status = 401`\n3. `handler` — sends `'OK'`\n\nExpected output:\n```\nLOG: GET /api/data\nOK\nLOG: GET /api/data\n401\n```",
  starterCode: `function runMiddleware(middlewares, req, res) {
  // execute middleware array in sequence
}

const logger = (req, res, next) => {
  console.log('LOG: ' + req.method + ' ' + req.path);
  next();
};
const auth = (req, res, next) => {
  if (req.headers.token === 'secret') next();
  else { res.status = 401; console.log('401'); }
};
const handler = (req, res, next) => {
  console.log('OK');
};

const req1 = { method: 'GET', path: '/api/data', headers: { token: 'secret' } };
const req2 = { method: 'GET', path: '/api/data', headers: { token: 'wrong' } };
const res = {};
runMiddleware([logger, auth, handler], req1, res);
runMiddleware([logger, auth, handler], req2, res);`,
  solution: `function runMiddleware(middlewares, req, res) {
  let i = 0;
  function next() {
    const fn = middlewares[i++];
    if (fn) fn(req, res, next);
  }
  next();
}

const logger = (req, res, next) => {
  console.log('LOG: ' + req.method + ' ' + req.path);
  next();
};
const auth = (req, res, next) => {
  if (req.headers.token === 'secret') next();
  else { res.status = 401; console.log('401'); }
};
const handler = (req, res, next) => {
  console.log('OK');
};

const req1 = { method: 'GET', path: '/api/data', headers: { token: 'secret' } };
const req2 = { method: 'GET', path: '/api/data', headers: { token: 'wrong' } };
const res = {};
runMiddleware([logger, auth, handler], req1, res);
runMiddleware([logger, auth, handler], req2, res);`,
  expectedOutput: "LOG: GET /api/data\nOK\nLOG: GET /api/data\n401",
  hints: ["Maintain an index i; each next() increments it and calls middlewares[i]", "If a middleware doesn't call next(), the chain stops"],
  tags: ["Express", "middleware", "Node.js", "HTTP"]
},
{
  id: 14, category: "Node.js & Backend JS", order: 3,
  title: "REST API Design",
  difficulty: "medium",
  description: "Implement an in-memory REST resource handler for `/users`.\n\nWrite `handleRequest(method, path, body)` that:\n- `GET /users` → `JSON array of all users`\n- `POST /users` → creates user, returns `{id, ...body}`\n- `GET /users/:id` → returns user or `{error:'not found'}`\n- `DELETE /users/:id` → removes user, returns `{deleted:true}`\n\nExpected output:\n```\n[]\n{\"id\":1,\"name\":\"Alice\"}\n{\"id\":1,\"name\":\"Alice\"}\n{\"deleted\":true}\n{\"error\":\"not found\"}\n```",
  starterCode: `const users = new Map();
let nextId = 1;

function handleRequest(method, path, body = {}) {
  // implement routing
}

console.log(JSON.stringify(handleRequest('GET', '/users')));
console.log(JSON.stringify(handleRequest('POST', '/users', { name: 'Alice' })));
console.log(JSON.stringify(handleRequest('GET', '/users/1')));
console.log(JSON.stringify(handleRequest('DELETE', '/users/1')));
console.log(JSON.stringify(handleRequest('GET', '/users/1')));`,
  solution: `const users = new Map();
let nextId = 1;

function handleRequest(method, path, body = {}) {
  const parts = path.split('/').filter(Boolean);
  const isCollection = parts.length === 1;
  const id = isCollection ? null : parseInt(parts[1]);

  if (method === 'GET' && isCollection)
    return [...users.values()];
  if (method === 'POST' && isCollection) {
    const user = { id: nextId++, ...body };
    users.set(user.id, user);
    return user;
  }
  if (method === 'GET' && id)
    return users.get(id) || { error: 'not found' };
  if (method === 'DELETE' && id) {
    users.delete(id);
    return { deleted: true };
  }
}

console.log(JSON.stringify(handleRequest('GET', '/users')));
console.log(JSON.stringify(handleRequest('POST', '/users', { name: 'Alice' })));
console.log(JSON.stringify(handleRequest('GET', '/users/1')));
console.log(JSON.stringify(handleRequest('DELETE', '/users/1')));
console.log(JSON.stringify(handleRequest('GET', '/users/1')));`,
  expectedOutput: '[]\n{"id":1,"name":"Alice"}\n{"id":1,"name":"Alice"}\n{"deleted":true}\n{"error":"not found"}',
  hints: ["Split the path to determine resource and ID", "Map.get() returns undefined if key missing — handle that case"],
  tags: ["REST", "API", "HTTP", "Node.js"]
},
{
  id: 15, category: "Node.js & Backend JS", order: 4,
  title: "Worker Threads Pool",
  difficulty: "hard",
  description: "Simulate a minimal thread pool using Node.js `worker_threads`. Create 2 workers that each receive a number and respond with its square.\n\nDispatch tasks `[4, 7, 3]` and print results in completion order.\n\nExpected output (order may vary):\n```\n16\n49\n9\n```",
  starterCode: `const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

if (isMainThread) {
  // create workers for tasks [4, 7, 3]
  // print result when each worker finishes
} else {
  // worker: compute square of workerData.n and postMessage result
}`,
  solution: `const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

if (isMainThread) {
  [4, 7, 3].forEach(n => {
    const w = new Worker(__filename, { workerData: { n } });
    w.on('message', result => console.log(result));
  });
} else {
  parentPort.postMessage(workerData.n * workerData.n);
}`,
  expectedOutput: "16\n49\n9",
  hints: ["Pass __filename as the worker script — it runs the same file", "isMainThread distinguishes main from worker context"],
  tags: ["worker-threads", "concurrency", "Node.js", "parallelism"],
  partialMatch: true
},

// ══════════════════════════════════════════════════════════════
// CATEGORY 5 — Backend Programming in Go
// ══════════════════════════════════════════════════════════════
{
  id: 16, category: "Backend Programming: Go", order: 1,
  title: "HTTP Server in Go",
  language: "go",
  difficulty: "medium",
  description: "Write a Go program that starts an HTTP server, registers two handlers:\n- `GET /ping` → responds with `pong`\n- `GET /echo?msg=hello` → responds with the `msg` query param\n\nThen test both routes using `net/http/httptest` and print responses.\n\nExpected output:\n```\npong\nhello\n```",
  starterCode: `package main

import (
\t"fmt"
\t"net/http"
\t"net/http/httptest"
)

func main() {
\tmux := http.NewServeMux()
\t// register /ping and /echo handlers

\t// Test /ping
\treq1, _ := http.NewRequest("GET", "/ping", nil)
\tw1 := httptest.NewRecorder()
\tmux.ServeHTTP(w1, req1)
\tfmt.Print(w1.Body.String())

\t// Test /echo?msg=hello
\treq2, _ := http.NewRequest("GET", "/echo?msg=hello", nil)
\tw2 := httptest.NewRecorder()
\tmux.ServeHTTP(w2, req2)
\tfmt.Print(w2.Body.String())
}`,
  solution: `package main

import (
\t"fmt"
\t"net/http"
\t"net/http/httptest"
)

func main() {
\tmux := http.NewServeMux()
\tmux.HandleFunc("/ping", func(w http.ResponseWriter, r *http.Request) {
\t\tfmt.Fprint(w, "pong")
\t})
\tmux.HandleFunc("/echo", func(w http.ResponseWriter, r *http.Request) {
\t\tmsg := r.URL.Query().Get("msg")
\t\tfmt.Fprint(w, msg)
\t})

\treq1, _ := http.NewRequest("GET", "/ping", nil)
\tw1 := httptest.NewRecorder()
\tmux.ServeHTTP(w1, req1)
\tfmt.Print(w1.Body.String())

\treq2, _ := http.NewRequest("GET", "/echo?msg=hello", nil)
\tw2 := httptest.NewRecorder()
\tmux.ServeHTTP(w2, req2)
\tfmt.Print(w2.Body.String())
}`,
  expectedOutput: "pong\nhello",
  hints: ["mux.HandleFunc(path, handlerFn) registers a route", "r.URL.Query().Get('msg') reads query params"],
  tags: ["Go", "HTTP", "httptest", "backend"]
},
{
  id: 17, category: "Backend Programming: Go", order: 2,
  title: "Go Goroutine Fan-Out",
  language: "go",
  difficulty: "hard",
  description: "Implement a fan-out pattern: given a slice of URLs (strings), fetch them concurrently using goroutines and collect results into a slice. Use a buffered channel.\n\nSimulate with mock fetch that returns `'body:'+url`.\n\nPrint each result (sorted for determinism).\n\nExpected output:\n```\nbody:a.com\nbody:b.com\nbody:c.com\n```",
  starterCode: `package main

import (
\t"fmt"
\t"sort"
)

func mockFetch(url string) string {
\treturn "body:" + url
}

func fanOut(urls []string) []string {
\t// launch a goroutine per URL, collect via channel
}

func main() {
\turls := []string{"a.com", "b.com", "c.com"}
\tresults := fanOut(urls)
\tsort.Strings(results)
\tfor _, r := range results {
\t\tfmt.Println(r)
\t}
}`,
  solution: `package main

import (
\t"fmt"
\t"sort"
)

func mockFetch(url string) string {
\treturn "body:" + url
}

func fanOut(urls []string) []string {
\tch := make(chan string, len(urls))
\tfor _, url := range urls {
\t\tgo func(u string) { ch <- mockFetch(u) }(url)
\t}
\tresults := make([]string, 0, len(urls))
\tfor range urls {
\t\tresults = append(results, <-ch)
\t}
\treturn results
}

func main() {
\turls := []string{"a.com", "b.com", "c.com"}
\tresults := fanOut(urls)
\tsort.Strings(results)
\tfor _, r := range results {
\t\tfmt.Println(r)
\t}
}`,
  expectedOutput: "body:a.com\nbody:b.com\nbody:c.com",
  hints: ["Buffered channel len(urls) prevents goroutine leaks", "Collect exactly len(urls) results from the channel"],
  tags: ["Go", "goroutines", "fan-out", "channels", "concurrency"]
},
{
  id: 18, category: "Backend Programming: Go", order: 3,
  title: "Go JSON API Handler",
  language: "go",
  difficulty: "medium",
  description: "Write a Go HTTP handler that:\n1. Decodes a JSON body `{\"a\": 5, \"b\": 3}`\n2. Computes `a + b`\n3. Returns JSON `{\"result\": 8}`\n\nTest with httptest.\n\nExpected output:\n```\n{\"result\":8}\n```",
  starterCode: `package main

import (
\t"encoding/json"
\t"fmt"
\t"net/http"
\t"net/http/httptest"
\t"strings"
)

func addHandler(w http.ResponseWriter, r *http.Request) {
\t// decode body, compute sum, return JSON
}

func main() {
\tbody := strings.NewReader(\`{"a":5,"b":3}\`)
\treq, _ := http.NewRequest("POST", "/add", body)
\treq.Header.Set("Content-Type", "application/json")
\tw := httptest.NewRecorder()
\taddHandler(w, req)
\tfmt.Print(w.Body.String())
}`,
  solution: `package main

import (
\t"encoding/json"
\t"fmt"
\t"net/http"
\t"net/http/httptest"
\t"strings"
)

func addHandler(w http.ResponseWriter, r *http.Request) {
\tvar input struct{ A, B int }
\tjson.NewDecoder(r.Body).Decode(&input)
\tw.Header().Set("Content-Type", "application/json")
\tjson.NewEncoder(w).Encode(map[string]int{"result": input.A + input.B})
}

func main() {
\tbody := strings.NewReader(\`{"a":5,"b":3}\`)
\treq, _ := http.NewRequest("POST", "/add", body)
\treq.Header.Set("Content-Type", "application/json")
\tw := httptest.NewRecorder()
\taddHandler(w, req)
\tfmt.Print(strings.TrimSpace(w.Body.String()))
}`,
  expectedOutput: '{"result":8}',
  hints: ["json.NewDecoder(r.Body).Decode(&v) decodes request body", "json.NewEncoder(w).Encode(v) writes JSON response"],
  tags: ["Go", "JSON", "HTTP", "handlers"]
},

// ══════════════════════════════════════════════════════════════
// CATEGORY 6 — Web Architecture
// ══════════════════════════════════════════════════════════════
{
  id: 19, category: "Web Architecture", order: 1,
  title: "HTTP Status Code Router",
  difficulty: "easy",
  description: "Write a function `describeStatus(code)` that returns the category and description for HTTP status codes:\n- 2xx → `'Success: ...'`\n- 3xx → `'Redirect: ...'`\n- 4xx → `'Client Error: ...'`\n- 5xx → `'Server Error: ...'`\n\nExpected output:\n```\nSuccess: OK\nRedirect: Moved Permanently\nClient Error: Not Found\nServer Error: Internal Server Error\n```",
  starterCode: `const STATUS = {
  200: 'OK', 201: 'Created', 204: 'No Content',
  301: 'Moved Permanently', 302: 'Found', 304: 'Not Modified',
  400: 'Bad Request', 401: 'Unauthorized', 403: 'Forbidden', 404: 'Not Found',
  500: 'Internal Server Error', 502: 'Bad Gateway', 503: 'Service Unavailable'
};

function describeStatus(code) {
  // return category + description
}

[200, 301, 404, 500].forEach(c => console.log(describeStatus(c)));`,
  solution: `const STATUS = {
  200: 'OK', 201: 'Created', 204: 'No Content',
  301: 'Moved Permanently', 302: 'Found', 304: 'Not Modified',
  400: 'Bad Request', 401: 'Unauthorized', 403: 'Forbidden', 404: 'Not Found',
  500: 'Internal Server Error', 502: 'Bad Gateway', 503: 'Service Unavailable'
};

function describeStatus(code) {
  const desc = STATUS[code] || 'Unknown';
  const cat = Math.floor(code / 100);
  const labels = { 2: 'Success', 3: 'Redirect', 4: 'Client Error', 5: 'Server Error' };
  return (labels[cat] || 'Unknown') + ': ' + desc;
}

[200, 301, 404, 500].forEach(c => console.log(describeStatus(c)));`,
  expectedOutput: "Success: OK\nRedirect: Moved Permanently\nClient Error: Not Found\nServer Error: Internal Server Error",
  hints: ["Math.floor(code / 100) gives the status class", "Use an object to map class to label"],
  tags: ["HTTP", "status-codes", "web-architecture"]
},
{
  id: 20, category: "Web Architecture", order: 2,
  title: "URL Parser",
  difficulty: "medium",
  description: "Parse a URL string into its components without using the `URL` built-in.\n\nExpected output:\n```\n{\"protocol\":\"https\",\"host\":\"api.example.com\",\"port\":\"8080\",\"path\":\"/v1/users\",\"query\":{\"limit\":\"10\",\"page\":\"2\"},\"hash\":\"section\"}\n```",
  starterCode: `function parseURL(url) {
  // parse protocol, host, port, path, query params, hash
  // return object
}

const result = parseURL('https://api.example.com:8080/v1/users?limit=10&page=2#section');
console.log(JSON.stringify(result));`,
  solution: `function parseURL(url) {
  const protocolEnd = url.indexOf('://');
  const protocol = url.slice(0, protocolEnd);
  let rest = url.slice(protocolEnd + 3);

  const hashIdx = rest.indexOf('#');
  const hash = hashIdx >= 0 ? rest.slice(hashIdx + 1) : '';
  if (hashIdx >= 0) rest = rest.slice(0, hashIdx);

  const queryIdx = rest.indexOf('?');
  const queryStr = queryIdx >= 0 ? rest.slice(queryIdx + 1) : '';
  if (queryIdx >= 0) rest = rest.slice(0, queryIdx);

  const slashIdx = rest.indexOf('/');
  const hostPort = slashIdx >= 0 ? rest.slice(0, slashIdx) : rest;
  const path = slashIdx >= 0 ? rest.slice(slashIdx) : '/';

  const [host, port = ''] = hostPort.split(':');

  const query = {};
  if (queryStr) queryStr.split('&').forEach(p => {
    const [k, v] = p.split('=');
    query[k] = v;
  });

  return { protocol, host, port, path, query, hash };
}

const result = parseURL('https://api.example.com:8080/v1/users?limit=10&page=2#section');
console.log(JSON.stringify(result));`,
  expectedOutput: '{"protocol":"https","host":"api.example.com","port":"8080","path":"/v1/users","query":{"limit":"10","page":"2"},"hash":"section"}',
  hints: ["Parse from left to right: protocol → host → path → query → hash", "Split query string on & then each pair on ="],
  tags: ["URL", "parsing", "HTTP", "web-architecture"]
},
{
  id: 21, category: "Web Architecture", order: 3,
  title: "Rate Limiter",
  difficulty: "hard",
  description: "Implement a `RateLimiter` class using the token bucket algorithm:\n- `limit` tokens max, refilled at `limit` tokens per window\n- `consume(clientId)` returns `true` if allowed, `false` if rate-limited\n\nExpected output:\n```\ntrue\ntrue\ntrue\nfalse\n```",
  starterCode: `class RateLimiter {
  constructor(limit, windowMs) {
    // limit = max requests per window
  }

  consume(clientId) {
    // return true if allowed, false if limited
  }
}

const limiter = new RateLimiter(3, 1000);
console.log(limiter.consume('user1')); // true
console.log(limiter.consume('user1')); // true
console.log(limiter.consume('user1')); // true
console.log(limiter.consume('user1')); // false - exceeded`,
  solution: `class RateLimiter {
  constructor(limit, windowMs) {
    this.limit = limit;
    this.windowMs = windowMs;
    this.clients = new Map();
  }
  consume(clientId) {
    const now = Date.now();
    if (!this.clients.has(clientId)) {
      this.clients.set(clientId, { count: 0, windowStart: now });
    }
    const c = this.clients.get(clientId);
    if (now - c.windowStart > this.windowMs) {
      c.count = 0;
      c.windowStart = now;
    }
    if (c.count < this.limit) { c.count++; return true; }
    return false;
  }
}

const limiter = new RateLimiter(3, 1000);
console.log(limiter.consume('user1'));
console.log(limiter.consume('user1'));
console.log(limiter.consume('user1'));
console.log(limiter.consume('user1'));`,
  expectedOutput: "true\ntrue\ntrue\nfalse",
  hints: ["Track request count and window start time per client", "Reset count when current time exceeds windowStart + windowMs"],
  tags: ["rate-limiting", "web-architecture", "security", "algorithms"]
},

// ══════════════════════════════════════════════════════════════
// CATEGORY 7 — Infrastructure: Networking & System Admin
// ══════════════════════════════════════════════════════════════
{
  id: 22, category: "Infrastructure & Networking", order: 1,
  title: "CIDR Subnet Calculator",
  difficulty: "hard",
  description: "Write `subnetInfo(cidr)` that parses a CIDR notation like `192.168.1.0/24` and returns:\n- `network`: the network address\n- `broadcast`: the broadcast address\n- `hosts`: number of usable host addresses\n- `mask`: subnet mask\n\nExpected output:\n```\n{\"network\":\"192.168.1.0\",\"broadcast\":\"192.168.1.255\",\"hosts\":254,\"mask\":\"255.255.255.0\"}\n```",
  starterCode: `function subnetInfo(cidr) {
  // parse IP and prefix length
  // calculate network, broadcast, hosts, mask
}

console.log(JSON.stringify(subnetInfo('192.168.1.0/24')));`,
  solution: `function subnetInfo(cidr) {
  const [ip, prefix] = cidr.split('/');
  const bits = parseInt(prefix);
  const ipNum = ip.split('.').reduce((n, o) => (n << 8) + parseInt(o), 0) >>> 0;
  const maskNum = (0xFFFFFFFF << (32 - bits)) >>> 0;
  const netNum = (ipNum & maskNum) >>> 0;
  const bcastNum = (netNum | ~maskNum) >>> 0;
  const toIP = n => [(n>>>24)&255,(n>>>16)&255,(n>>>8)&255,n&255].join('.');
  return {
    network: toIP(netNum),
    broadcast: toIP(bcastNum),
    hosts: Math.pow(2, 32 - bits) - 2,
    mask: toIP(maskNum)
  };
}

console.log(JSON.stringify(subnetInfo('192.168.1.0/24')));`,
  expectedOutput: '{"network":"192.168.1.0","broadcast":"192.168.1.255","hosts":254,"mask":"255.255.255.0"}',
  hints: ["Convert IP to 32-bit int using bit shifts", "Network = IP & mask, Broadcast = network | ~mask"],
  tags: ["networking", "CIDR", "subnetting", "bitwise", "infrastructure"]
},
{
  id: 23, category: "Infrastructure & Networking", order: 2,
  title: "DNS-like Record Resolver",
  difficulty: "medium",
  description: "Implement a simple DNS record store with `addRecord(type, name, value)` and `resolve(type, name)` that returns all matching records, following `CNAME` chains.\n\nExpected output:\n```\n[\"93.184.216.34\"]\n[\"93.184.216.34\"]\n```",
  starterCode: `class DNSStore {
  constructor() { this.records = {}; }

  addRecord(type, name, value) {
    // store record
  }

  resolve(type, name) {
    // return matching A records, follow CNAME chains
  }
}

const dns = new DNSStore();
dns.addRecord('A', 'example.com', '93.184.216.34');
dns.addRecord('CNAME', 'www.example.com', 'example.com');

console.log(JSON.stringify(dns.resolve('A', 'example.com')));
console.log(JSON.stringify(dns.resolve('A', 'www.example.com')));`,
  solution: `class DNSStore {
  constructor() { this.records = {}; }

  addRecord(type, name, value) {
    const key = type + ':' + name;
    if (!this.records[key]) this.records[key] = [];
    this.records[key].push(value);
  }

  resolve(type, name, depth = 0) {
    if (depth > 10) return [];
    const direct = this.records[type + ':' + name];
    if (direct) return direct;
    const cnames = this.records['CNAME:' + name];
    if (cnames) return this.resolve(type, cnames[0], depth + 1);
    return [];
  }
}

const dns = new DNSStore();
dns.addRecord('A', 'example.com', '93.184.216.34');
dns.addRecord('CNAME', 'www.example.com', 'example.com');

console.log(JSON.stringify(dns.resolve('A', 'example.com')));
console.log(JSON.stringify(dns.resolve('A', 'www.example.com')));`,
  expectedOutput: '["93.184.216.34"]\n["93.184.216.34"]',
  hints: ["Store records keyed by 'TYPE:name'", "When resolving, follow CNAME chains recursively"],
  tags: ["DNS", "networking", "infrastructure", "recursion"]
},
{
  id: 24, category: "Infrastructure & Networking", order: 3,
  title: "TCP State Machine",
  difficulty: "hard",
  description: "Implement a simplified TCP connection state machine with states:\n`CLOSED → SYN_SENT → ESTABLISHED → FIN_WAIT → CLOSED`\n\nMethod `transition(event)` moves between states.\n\nExpected output:\n```\nSYN_SENT\nESTABLISHED\nFIN_WAIT\nCLOSED\n```",
  starterCode: `class TCPConnection {
  constructor() {
    this.state = 'CLOSED';
  }

  transition(event) {
    // implement state transitions
    // events: 'connect', 'syn_ack', 'close', 'fin_ack'
  }
}

const conn = new TCPConnection();
conn.transition('connect');   console.log(conn.state); // SYN_SENT
conn.transition('syn_ack');   console.log(conn.state); // ESTABLISHED
conn.transition('close');     console.log(conn.state); // FIN_WAIT
conn.transition('fin_ack');   console.log(conn.state); // CLOSED`,
  solution: `class TCPConnection {
  constructor() {
    this.state = 'CLOSED';
    this.transitions = {
      CLOSED:      { connect:  'SYN_SENT' },
      SYN_SENT:    { syn_ack:  'ESTABLISHED' },
      ESTABLISHED: { close:    'FIN_WAIT' },
      FIN_WAIT:    { fin_ack:  'CLOSED' },
    };
  }
  transition(event) {
    const next = this.transitions[this.state]?.[event];
    if (next) this.state = next;
  }
}

const conn = new TCPConnection();
conn.transition('connect');  console.log(conn.state);
conn.transition('syn_ack');  console.log(conn.state);
conn.transition('close');    console.log(conn.state);
conn.transition('fin_ack');  console.log(conn.state);`,
  expectedOutput: "SYN_SENT\nESTABLISHED\nFIN_WAIT\nCLOSED",
  hints: ["A state machine is just a map of current state → {event → next state}", "Optional chaining (?.) handles invalid events gracefully"],
  tags: ["TCP", "state-machine", "networking", "infrastructure"]
},

// ══════════════════════════════════════════════════════════════
// CATEGORY 8 — Security
// ══════════════════════════════════════════════════════════════
{
  id: 25, category: "Software Security", order: 1,
  title: "SQL Injection Detection",
  difficulty: "medium",
  description: "Write a function `isSQLInjection(input)` that detects common SQL injection patterns:\n- `' OR '1'='1`\n- `; DROP TABLE`\n- `UNION SELECT`\n- `--` comments\n\nExpected output:\n```\ntrue\ntrue\ntrue\nfalse\n```",
  starterCode: `function isSQLInjection(input) {
  // detect SQL injection patterns
}

console.log(isSQLInjection("' OR '1'='1"));      // true
console.log(isSQLInjection("'; DROP TABLE users; --")); // true
console.log(isSQLInjection("UNION SELECT * FROM")); // true
console.log(isSQLInjection("hello world"));         // false`,
  solution: `function isSQLInjection(input) {
  const patterns = [
    /('\\s*(or|and)\\s*'?\\d)/i,
    /;\\s*(drop|delete|insert|update|alter|create)/i,
    /union\\s+select/i,
    /--/,
    /\\/\\*/,
    /(exec|execute)\\s*\\(/i
  ];
  return patterns.some(p => p.test(input));
}

console.log(isSQLInjection("' OR '1'='1"));
console.log(isSQLInjection("'; DROP TABLE users; --"));
console.log(isSQLInjection("UNION SELECT * FROM"));
console.log(isSQLInjection("hello world"));`,
  expectedOutput: "true\ntrue\ntrue\nfalse",
  hints: ["Use regex patterns for each injection type", "The /i flag makes matching case-insensitive"],
  tags: ["SQL-injection", "security", "regex", "OWASP"]
},
{
  id: 26, category: "Software Security", order: 2,
  title: "JWT Structure Validator",
  difficulty: "medium",
  description: "Without a library, write `parseJWT(token)` that:\n1. Splits the token into 3 parts\n2. Base64-decodes header and payload\n3. Returns `{header, payload}` or throws if malformed\n\nExpected output:\n```\n{\"alg\":\"HS256\",\"typ\":\"JWT\"}\n{\"sub\":\"1234567890\",\"name\":\"John Doe\",\"iat\":1516239022}\n```",
  starterCode: `function parseJWT(token) {
  // split, base64url decode, parse JSON
  // throw Error('invalid jwt') if malformed
}

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

const { header, payload } = parseJWT(token);
console.log(JSON.stringify(header));
console.log(JSON.stringify(payload));`,
  solution: `function parseJWT(token) {
  const parts = token.split('.');
  if (parts.length !== 3) throw new Error('invalid jwt');
  const decode = s => JSON.parse(Buffer.from(s.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString());
  return { header: decode(parts[0]), payload: decode(parts[1]) };
}

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
const { header, payload } = parseJWT(token);
console.log(JSON.stringify(header));
console.log(JSON.stringify(payload));`,
  expectedOutput: '{"alg":"HS256","typ":"JWT"}\n{"sub":"1234567890","name":"John Doe","iat":1516239022}',
  hints: ["JWT uses base64url encoding — replace - with + and _ with /", "Buffer.from(str, 'base64').toString() decodes in Node.js"],
  tags: ["JWT", "authentication", "security", "base64"]
},
{
  id: 27, category: "Software Security", order: 3,
  title: "Password Strength Checker",
  difficulty: "easy",
  description: "Write `checkPassword(pw)` that scores a password 0–4 and returns a label:\n- +1 if length ≥ 8\n- +1 if has uppercase\n- +1 if has number\n- +1 if has special char\n\nLabels: 0-1=`Weak`, 2=`Fair`, 3=`Good`, 4=`Strong`\n\nExpected output:\n```\nWeak\nFair\nGood\nStrong\n```",
  starterCode: `function checkPassword(pw) {
  // score and return label
}

console.log(checkPassword('abc'));
console.log(checkPassword('abcdefgh'));
console.log(checkPassword('Abcdefgh'));
console.log(checkPassword('Abcdefg1!'));`,
  solution: `function checkPassword(pw) {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return ['Weak','Weak','Fair','Good','Strong'][score];
}

console.log(checkPassword('abc'));
console.log(checkPassword('abcdefgh'));
console.log(checkPassword('Abcdefgh'));
console.log(checkPassword('Abcdefg1!'));`,
  expectedOutput: "Weak\nFair\nGood\nStrong",
  hints: ["Use regex tests for each character class", "Map score to label with an array"],
  tags: ["security", "passwords", "regex", "validation"]
},
{
  id: 28, category: "Software Security", order: 4,
  title: "XSS Sanitizer",
  difficulty: "medium",
  description: "Write `sanitizeHTML(input)` that prevents XSS by escaping dangerous HTML characters.\n\nExpected output:\n```\n&lt;script&gt;alert('xss')&lt;/script&gt;\n&lt;img src=x onerror=alert(1)&gt;\nhello world\n```",
  starterCode: `function sanitizeHTML(input) {
  // escape &, <, >, \", '
}

console.log(sanitizeHTML("<script>alert('xss')</script>"));
console.log(sanitizeHTML('<img src=x onerror=alert(1)>'));
console.log(sanitizeHTML('hello world'));`,
  solution: `function sanitizeHTML(input) {
  return String(input)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

console.log(sanitizeHTML("<script>alert('xss')</script>"));
console.log(sanitizeHTML('<img src=x onerror=alert(1)>'));
console.log(sanitizeHTML('hello world'));`,
  expectedOutput: "&lt;script&gt;alert(&#x27;xss&#x27;)&lt;/script&gt;\n&lt;img src=x onerror=alert(1)&gt;\nhello world",
  hints: ["Escape & first (before other replacements create & in output)", "Order: & → < → > → \" → '"],
  tags: ["XSS", "security", "sanitization", "OWASP", "HTML"]
},

// ══════════════════════════════════════════════════════════════
// CATEGORY 9 — Algorithms (Intermediate)
// ══════════════════════════════════════════════════════════════
{
  id: 29, category: "Algorithms", order: 1,
  title: "Binary Search",
  difficulty: "easy",
  description: "Implement binary search on a sorted array. Return the index of `target` or `-1` if not found.\n\nExpected output:\n```\n4\n-1\n0\n```",
  starterCode: `function binarySearch(arr, target) {
  // O(log n) search
}

console.log(binarySearch([1,3,5,7,9,11], 9));   // 4
console.log(binarySearch([1,3,5,7,9,11], 6));   // -1
console.log(binarySearch([1,3,5,7,9,11], 1));   // 0`,
  solution: `function binarySearch(arr, target) {
  let lo = 0, hi = arr.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}

console.log(binarySearch([1,3,5,7,9,11], 9));
console.log(binarySearch([1,3,5,7,9,11], 6));
console.log(binarySearch([1,3,5,7,9,11], 1));`,
  expectedOutput: "4\n-1\n0",
  hints: ["Maintain lo and hi pointers, shrink range each iteration", "(lo + hi) >> 1 is integer midpoint"],
  tags: ["binary-search", "algorithms", "arrays", "O(logn)"]
},
{
  id: 30, category: "Algorithms", order: 2,
  title: "Merge Sort",
  difficulty: "medium",
  description: "Implement merge sort. Return a new sorted array (don't mutate the input).\n\nExpected output:\n```\n[1,2,3,4,5,6,7,8]\n```",
  starterCode: `function mergeSort(arr) {
  // divide and conquer, O(n log n)
}

console.log(JSON.stringify(mergeSort([4,2,7,1,5,3,8,6])));`,
  solution: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = arr.length >> 1;
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  const result = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    result.push(left[i] <= right[j] ? left[i++] : right[j++]);
  }
  return result.concat(left.slice(i)).concat(right.slice(j));
}

console.log(JSON.stringify(mergeSort([4,2,7,1,5,3,8,6])));`,
  expectedOutput: "[1,2,3,4,5,6,7,8]",
  hints: ["Base case: array of 0 or 1 elements is already sorted", "Merge by comparing heads of both halves"],
  tags: ["merge-sort", "algorithms", "divide-and-conquer", "O(nlogn)"]
},
{
  id: 31, category: "Algorithms", order: 3,
  title: "LRU Cache",
  difficulty: "hard",
  description: "Implement an LRU (Least Recently Used) cache with `get(key)` and `put(key, val)` in O(1).\n\nExpected output:\n```\n1\n-1\n3\n-1\n4\n```",
  starterCode: `class LRUCache {
  constructor(capacity) {
    // O(1) get and put
  }
  get(key) { }
  put(key, val) { }
}

const cache = new LRUCache(2);
cache.put(1, 1);
cache.put(2, 2);
console.log(cache.get(1));   // 1
cache.put(3, 3);             // evicts key 2
console.log(cache.get(2));   // -1
cache.put(4, 4);             // evicts key 1
console.log(cache.get(3));   // 3
console.log(cache.get(1));   // -1
console.log(cache.get(4));   // 4`,
  solution: `class LRUCache {
  constructor(capacity) {
    this.cap = capacity;
    this.map = new Map();
  }
  get(key) {
    if (!this.map.has(key)) return -1;
    const val = this.map.get(key);
    this.map.delete(key);
    this.map.set(key, val);
    return val;
  }
  put(key, val) {
    this.map.delete(key);
    this.map.set(key, val);
    if (this.map.size > this.cap) {
      this.map.delete(this.map.keys().next().value);
    }
  }
}

const cache = new LRUCache(2);
cache.put(1,1); cache.put(2,2);
console.log(cache.get(1));
cache.put(3,3);
console.log(cache.get(2));
cache.put(4,4);
console.log(cache.get(3));
console.log(cache.get(1));
console.log(cache.get(4));`,
  expectedOutput: "1\n-1\n3\n-1\n4",
  hints: ["JS Map preserves insertion order — use that as your order tracking", "Re-insert on get to mark as recently used; delete oldest when over capacity"],
  tags: ["LRU", "cache", "algorithms", "Map", "O(1)"]
},
{
  id: 32, category: "Algorithms", order: 4,
  title: "Graph BFS",
  difficulty: "medium",
  description: "Implement BFS on an adjacency list graph. Return nodes visited in BFS order starting from node `0`.\n\nExpected output:\n```\n[0,1,2,3,4,5]\n```",
  starterCode: `function bfs(graph, start) {
  // breadth-first traversal
  // return array of visited nodes in order
}

const graph = {
  0: [1, 2],
  1: [3, 4],
  2: [5],
  3: [], 4: [], 5: []
};

console.log(JSON.stringify(bfs(graph, 0)));`,
  solution: `function bfs(graph, start) {
  const visited = new Set([start]);
  const queue = [start];
  const order = [];
  while (queue.length) {
    const node = queue.shift();
    order.push(node);
    for (const neighbor of (graph[node] || [])) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  return order;
}

const graph = { 0:[1,2], 1:[3,4], 2:[5], 3:[], 4:[], 5:[] };
console.log(JSON.stringify(bfs(graph, 0)));`,
  expectedOutput: "[0,1,2,3,4,5]",
  hints: ["Use a queue (array with shift) — FIFO", "Mark nodes visited when enqueued, not when dequeued"],
  tags: ["BFS", "graphs", "algorithms", "queues"]
},
{
  id: 33, category: "Algorithms", order: 5,
  title: "Dynamic Programming: Knapsack",
  difficulty: "hard",
  description: "Solve the 0/1 knapsack problem: given items with weights and values, and a max capacity, find the maximum value.\n\nExpected output:\n```\n7\n```",
  starterCode: `function knapsack(weights, values, capacity) {
  // 0/1 knapsack with DP
}

const weights = [1, 3, 4, 5];
const values  = [1, 4, 5, 7];
const capacity = 7;
console.log(knapsack(weights, values, capacity)); // 7 (items 1+3: val 4+5=9? check)`,
  solution: `function knapsack(weights, values, capacity) {
  const n = weights.length;
  const dp = Array(n + 1).fill(null).map(() => Array(capacity + 1).fill(0));
  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {
      dp[i][w] = dp[i-1][w];
      if (weights[i-1] <= w) {
        dp[i][w] = Math.max(dp[i][w], dp[i-1][w - weights[i-1]] + values[i-1]);
      }
    }
  }
  return dp[n][capacity];
}

const weights = [1, 3, 4, 5];
const values  = [1, 4, 5, 7];
console.log(knapsack(weights, values, 7));`,
  expectedOutput: "9",
  hints: ["dp[i][w] = best value using first i items with capacity w", "Either skip item i or take it (if it fits)"],
  tags: ["dynamic-programming", "knapsack", "algorithms", "optimization"]
},

// ══════════════════════════════════════════════════════════════
// CATEGORY 10 — Security: Crypto & Auth
// ══════════════════════════════════════════════════════════════
{
  id: 34, category: "Software Security", order: 5,
  title: "HMAC Signature",
  difficulty: "medium",
  description: "Use Node.js `crypto` to:\n1. Create an HMAC-SHA256 signature of a message\n2. Verify a signature matches\n\nExpected output:\n```\ntrue\nfalse\n```",
  starterCode: `const crypto = require('crypto');

function sign(secret, message) {
  // return hex HMAC-SHA256 signature
}

function verify(secret, message, signature) {
  // return true if signature matches
}

const secret = 'my-secret-key';
const message = 'hello world';
const sig = sign(secret, message);
console.log(verify(secret, message, sig));          // true
console.log(verify(secret, message, 'badsig'));     // false`,
  solution: `const crypto = require('crypto');

function sign(secret, message) {
  return crypto.createHmac('sha256', secret).update(message).digest('hex');
}

function verify(secret, message, signature) {
  const expected = sign(secret, message);
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature.padEnd(expected.length, '0').slice(0, expected.length)));
}

const secret = 'my-secret-key';
const message = 'hello world';
const sig = sign(secret, message);
console.log(verify(secret, message, sig));
console.log(verify(secret, message, 'badsig'));`,
  expectedOutput: "true\nfalse",
  hints: ["crypto.createHmac('sha256', secret).update(msg).digest('hex')", "Use timingSafeEqual to prevent timing attacks"],
  tags: ["HMAC", "crypto", "authentication", "security", "Node.js"]
},
{
  id: 35, category: "Software Security", order: 6,
  title: "Caesar Cipher",
  difficulty: "easy",
  description: "Implement `caesarEncrypt(text, shift)` and `caesarDecrypt(text, shift)`.\n\nExpected output:\n```\nKHOOR\nhello\n```",
  starterCode: `function caesarEncrypt(text, shift) {
  // shift each letter, preserve case and non-letters
}

function caesarDecrypt(text, shift) {
  // reverse shift
}

console.log(caesarEncrypt('hello', 3));
console.log(caesarDecrypt('KHOOR', 3));`,
  solution: `function caesarEncrypt(text, shift) {
  return text.replace(/[a-zA-Z]/g, ch => {
    const base = ch <= 'Z' ? 65 : 97;
    return String.fromCharCode((ch.charCodeAt(0) - base + shift) % 26 + base);
  });
}
function caesarDecrypt(text, shift) {
  return caesarEncrypt(text, (26 - shift) % 26);
}

console.log(caesarEncrypt('hello', 3));
console.log(caesarDecrypt('KHOOR', 3));`,
  expectedOutput: "KHOOR\nhello",
  hints: ["charCodeAt and fromCharCode convert between char and number", "Modulo 26 wraps around the alphabet"],
  tags: ["cryptography", "ciphers", "security", "strings"]
},
];

module.exports = problems;
