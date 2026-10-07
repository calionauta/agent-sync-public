#!/usr/bin/env node
/**
 * demo-video driver: runs a JSON playbook (see ../references/playbook.md)
 * against a real browser over CDP and assembles WebM + MP4 + GIF with ffmpeg.
 *
 * Zero npm dependencies. Needs: node 22+ (native WebSocket), a Chromium
 * (auto-discovered from the Playwright browser cache on this machine),
 * ffmpeg (same cache, or PATH).
 *
 *   node record.mjs --playbook demo/flow.playbook.json --out ./demo-out/
 *   node record.mjs --playbook demo/flow.playbook.json --rehearse
 *   node record.mjs --dump https://example.com/page   # Discover phase helper
 */
import { spawn, execFile, spawnSync } from 'node:child_process';
import { promisify } from 'node:util';
import { mkdirSync, writeFileSync, existsSync, readdirSync, readFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname, resolve } from 'node:path';
import { homedir } from 'node:os';

const execFileAsync = promisify(execFile);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function arg(name, def = null) {
  const i = process.argv.indexOf(`--${name}`);
  if (i === -1) return def;
  const v = process.argv[i + 1];
  if (!v || v.startsWith('--')) return true;
  return v;
}
const has = (name) => process.argv.includes(`--${name}`);

/* ---------------- tool discovery ---------------- */

function firstExisting(paths) {
  for (const p of paths) if (p && existsSync(p)) return p;
  return null;
}
function findChrome() {
  if (process.env.CHROME_PATH && existsSync(process.env.CHROME_PATH)) return process.env.CHROME_PATH;
  const cache = join(homedir(), '.cache', 'ms-playwright');
  try {
    for (const d of readdirSync(cache)) {
      if (d.startsWith('chromium_headless_shell')) {
        const cands = [`${cache}/${d}/chrome-headless-shell-linux64/chrome-headless-shell`, `${cache}/${d}/chrome-headless-shell-linux-arm64/chrome-headless-shell`];
        const hit = firstExisting(cands);
        if (hit) return hit;
      }
    }
    for (const d of readdirSync(cache)) {
      if (/^chromium-/.test(d)) {
        const hit = firstExisting([`${cache}/${d}/chrome-linux/chrome`, `${cache}/${d}/chrome-linux-arm64/chrome`]);
        if (hit) return hit;
      }
    }
  } catch {}
  for (const bin of ['chromium', 'chromium-browser', 'google-chrome', 'chrome']) {
    const r = spawnSync('which', [bin]);
    if (r.status === 0 && r.stdout) return r.stdout.toString().trim();
  }
  return null;
}
function findFfmpeg() {
  if (process.env.FFMPEG_PATH && existsSync(process.env.FFMPEG_PATH)) return process.env.FFMPEG_PATH;
  // One-time full build (MP4+GIF): `mkdir -p ~/.cache/demo-video && cd $_ && npm i ffmpeg-static`.
  const shared = join(homedir(), '.cache', 'demo-video', 'node_modules', 'ffmpeg-static', 'ffmpeg');
  if (existsSync(shared)) return shared;
  const cache = join(homedir(), '.cache', 'ms-playwright');
  try {
    for (const d of readdirSync(cache)) {
      if (d.startsWith('ffmpeg-')) {
        const hit = firstExisting([`${cache}/${d}/ffmpeg-linux`, `${cache}/${d}/ffmpeg-linux-x64/ffmpeg`, `${cache}/${d}/ffmpeg-linux-arm64/ffmpeg`]);
        if (hit) return hit;
      }
    }
  } catch {}
  return 'ffmpeg'; // hope for PATH
}

/* ---------------- CDP plumbing ---------------- */

let msgId = 0;
function connect(url) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(url);
    const pending = new Map();
    const handlers = new Set();
    // Attached immediately: responses must be drained from the first send
    // on, or every send hangs forever waiting for a reply nobody reads.
    ws.addEventListener('message', (ev) => {
      let m;
      try { m = JSON.parse(String(ev.data)); } catch { return; }
      if (m.id && pending.has(m.id)) {
        const { res, rej } = pending.get(m.id);
        pending.delete(m.id);
        if (m.error) rej(new Error(`${m.error.message} (${m.error.code})`));
        else res(m);
      } else if (m.method) {
        handlers.forEach((fn) => { try { fn(m); } catch {} });
      }
    });
    ws.addEventListener('open', () => {
      resolve({
        // Every send carries a timeout: a renderer-stalled request (e.g. a
        // screenshot mid-navigation) must reject instead of hanging its
        // caller forever — an orphaned pending entry is how takes died.
        send(method, params = {}, timeoutMs = 30000) {
          const id = ++msgId;
          return new Promise((res, rej) => {
            const timer = setTimeout(() => {
              if (pending.delete(id)) rej(new Error(`CDP timeout: ${method}`));
            }, timeoutMs);
            pending.set(id, {
              res: (m) => { clearTimeout(timer); res(m); },
              rej: (e) => { clearTimeout(timer); rej(e); },
            });
            try {
              ws.send(JSON.stringify({ id, method, params }));
            } catch (e) {
              pending.delete(id);
              clearTimeout(timer);
              rej(e);
            }
          });
        },
        onEvent(fn) { handlers.add(fn); },
        close() { ws.close(); },
      });
    });
    ws.addEventListener('error', reject);
  });
}

async function httpJson(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`CDP http ${r.status} for ${url}`);
  return r.json();
}

/* ---------------- page JS (injected) ---------------- */

const FIND_JS = `(() => {
  window.__demoEls = window.__demoEls || {};
  window.__demoSeq = window.__demoSeq || 0;
  const norm = (s) => (s || '').trim().toLowerCase();
  const visible = (el) => {
    const r = el.getBoundingClientRect();
    if (r.width < 2 || r.height < 2) return false;
    const st = getComputedStyle(el);
    return st.visibility !== 'hidden' && st.display !== 'none';
  };
  const nameOf = (el) => {
    let labelled = '';
    try {
      if (el.id) {
        const lab = document.querySelector('label[for="' + el.id + '"]');
        if (lab) labelled = lab.textContent + ' | ';
      }
    } catch {}
    return (labelled + [
      el.getAttribute('aria-label'),
      el.getAttribute('placeholder'),
      el.getAttribute('title'),
      el.getAttribute('name'),
      (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') ? el.value : el.textContent,
    ].filter(Boolean).join(' | ')).slice(0, 160);
  };
  const keep = (el) => {
    const id = 'd' + (++window.__demoSeq);
    window.__demoEls[id] = el;
    const r = el.getBoundingClientRect();
    return { ref: id, x: r.x, y: r.y, w: r.width, h: r.height, label: nameOf(el) };
  };
  const T = __TARGET__;
  let cands = [];
  if (T.selector) {
    cands = Array.from(document.querySelectorAll(T.selector)).filter(visible);
  } else if (T.role || T.name || T.label) {
    const want = norm(T.name || T.label || '');
    const pool = [];
    const push = (sel) => document.querySelectorAll(sel).forEach((el) => pool.push(el));
    if (!T.role || T.role === 'button') push('button, [role="button"], input[type="button"], input[type="submit"]');
    if (!T.role || T.role === 'link') push('a[href], [role="link"]');
    if (!T.role || T.role === 'tab') push('[role="tab"]');
    if (!T.role || T.role === 'textbox') push('input[type="text"], input:not([type]), input[type="search"], textarea, [contenteditable="true"]');
    if (!T.role || T.role === 'checkbox') push('input[type="checkbox"], [role="checkbox"]');
    if (!T.role || T.role === 'combobox' || T.role === 'listbox') push('select, [role="combobox"], [role="listbox"]');
    if (!T.role || T.role === 'heading') push('h1, h2, h3, [role="heading"]');
    cands = pool.filter(visible).filter((el) => !want || norm(nameOf(el)).includes(want));
  } else if (T.text) {
    const want = norm(T.text);
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT);
    const hits = [];
    while (walker.nextNode()) {
      const el = walker.currentNode;
      if (!/^(BUTTON|A|SPAN|DIV|P|H1|H2|H3|H4|LI|TD|LABEL)$/.test(el.tagName)) continue;
      if (el.children.length > 3) continue;
      if (visible(el) && norm(el.textContent).includes(want)) hits.push(el);
    }
    hits.sort((a, b) => a.textContent.length - b.textContent.length);
    cands = hits;
  }
  if (!cands.length) return [];
  // A control behind a modal backdrop still has a box: clicking it hits the
  // overlay, not the control. Report coverage per candidate so the driver
  // picks the first UNCOVERED one instead of a hidden earlier twin.
  return cands.slice(0, 5).map((el) => {
    const kept = keep(el);
    const cx = kept.x + kept.w / 2, cy = kept.y + kept.h / 2;
    let cover = '';
    try {
      const top = document.elementFromPoint(cx, cy);
      if (!(top && (top === el || el.contains(top)))) {
        cover = top
          ? (top.tagName.toLowerCase() + '.' + (top.className || '').toString().slice(0, 40))
          : 'nothing';
      }
    } catch { cover = 'unknown'; }
    kept.coveredBy = cover;
    return kept;
  });
})()`;

const CURSOR_JS = `(() => {
  if (document.getElementById('demo-cursor')) return 'ok';
  const c = document.createElement('div');
  c.id = 'demo-cursor';
  c.innerHTML = '<svg width="26" height="26" viewBox="0 0 24 24"><path d="M5 3L19 12L12 13L9 20L5 3Z" fill="white" stroke="black" stroke-width="1.6" stroke-linejoin="round"/></svg>';
  c.style.cssText = 'position:fixed;left:0;top:0;z-index:2147483647;pointer-events:none;filter:drop-shadow(1px 1px 2px rgba(0,0,0,.35))';
  document.body.appendChild(c);
  document.addEventListener('mousemove', (e) => {
    c.style.left = e.clientX + 'px'; c.style.top = e.clientY + 'px';
  }, { passive: true });
  const bar = document.createElement('div');
  bar.id = 'demo-subtitle';
  bar.style.cssText = 'position:fixed;left:0;right:0;bottom:0;z-index:2147483646;text-align:center;padding:12px 24px;background:rgba(0,0,0,.78);color:#fff;font:500 17px/1.4 system-ui,sans-serif;letter-spacing:.3px;opacity:0;transition:opacity .3s;pointer-events:none';
  document.body.appendChild(bar);
  return 'ok';
})()`;

const DUMP_JS = `(() => {
  const out = [];
  const norm = (s) => (s || '').trim().replace(/\\s+/g, ' ').slice(0, 60);
  document.querySelectorAll('button, a[href], input, select, textarea, [role="tab"], [role="button"], [contenteditable="true"]').forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.width < 2 || r.height < 2) return;
    out.push(el.tagName.toLowerCase() + (el.type ? '[' + el.type + ']' : '') +
      ' role=' + (el.getAttribute('role') || '-') +
      ' name="' + norm(el.getAttribute('aria-label') || el.getAttribute('placeholder') || el.textContent || el.value) + '"');
  });
  return out.slice(0, 120).join('\\n');
})()`;

/* ---------------- driver ---------------- */

async function evaluate(sess, js) {
  const r = await sess.send('Runtime.evaluate', { expression: js, returnByValue: true });
  return r.result?.result?.value ?? null;
}
async function el(sess, target) {
  const list = await evaluate(sess, FIND_JS.replace('__TARGET__', JSON.stringify(target)));
  if (!list || !list.length) return null;
  // Best match first: exact accessible name, then whole-word, then substring;
  // shortest label breaks ties ("+ Nova Sessão" beats a sentence containing
  // the same words). Coverage decides last: a covered twin is never picked
  // while an uncovered candidate exists.
  const want = ((target.name || target.label || target.text || '') + '').trim().toLowerCase();
  const scored = list.map((c, i) => {
    const label = (c.label + '').trim().toLowerCase();
    const score = !want ? 2 : label === want ? 0
      : new RegExp(`\\b${want.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`).test(label) ? 1 : 2;
    return { c, i, score };
  }).sort((a, b) => (a.score - b.score) || (a.c.label.length - b.c.label.length) || (a.i - b.i));
  const open = scored.map((s) => s.c).find((c) => !c.coveredBy) ?? null;
  if (open) {
    const skipped = list.filter((c) => c.coveredBy).length;
    if (skipped > 0) open.skippedCovered = skipped;
  }
  if (!open) {
    return { coveredNote: list[0].coveredBy, label: list[0].label, allCovered: true };
  }
  return open;
}
async function glide(sess, x, y) {
  await sess.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x, y });
}
async function fail(sess, out, msg, step) {
  console.error(`\nFAIL at step ${JSON.stringify(step)}: ${msg}`);
  try {
    const inv = await evaluate(sess, DUMP_JS);
    console.error('Visible interactive elements:\n' + inv);
  } catch {}
  try {
    const shot = await sess.send('Page.captureScreenshot', { format: 'png' });
    writeFileSync(join(out, 'failure.png'), Buffer.from(shot.result.data, 'base64'));
    console.error('Failure screenshot: failure.png');
  } catch {}
  throw new Error(msg);
}

async function runStep(sess, ctx, step) {
  const t0 = Date.now();
  const log = (ok, note = '') => {
    ctx.log.push({ step, ok, ms: Date.now() - t0, note });
    console.log(`${ok ? 'ok  ' : 'FAIL'} [${ctx.log.length}] ${step.do}${note ? ' — ' + note : ''}`);
  };
  switch (step.do) {
    case 'goto': {
      const url = step.url.startsWith('http') ? step.url : (ctx.base || '') + step.url;
      await sess.send('Page.navigate', { url });
      await sleep(step.settle ?? 2500);
      await evaluate(sess, CURSOR_JS);
      log(true, url);
      return;
    }
    case 'subtitle': {
      await evaluate(sess, CURSOR_JS);
      await evaluate(sess, `(() => { const b = document.getElementById('demo-subtitle'); if (b) { b.textContent = ${JSON.stringify(step.text || '')}; b.style.opacity = ${step.text ? "'1'" : "'0'"}; } return !!b; })()`);
      if (step.text) await sleep(800);
      log(true, (step.text || '(clear)').slice(0, 50));
      return;
    }
    case 'evaluate': {
      const v = await evaluate(sess, step.js);
      log(true, String(v ?? '').slice(0, 80));
      return;
    }
    case 'click':
    case 'type':
    case 'waitFor': {
      const found = await el(sess, step);
      if (!found) return fail(sess, ctx.out, 'target not found', step);
      if (found.allCovered) {
        return fail(sess, ctx.out, `target covered by ${found.coveredNote}`, step);
      }
      if (step.do === 'waitFor') { log(true, found.label); return; }
      await sess.send('Runtime.evaluate', { expression: `(() => { const el = window.__demoEls[${JSON.stringify(found.ref)}]; el && el.scrollIntoView({ behavior: 'smooth', block: 'center' }); return !!el; })()` });
      await sleep(600);
      // Re-measure AFTER the scroll settles: smooth scrolling moves the
      // target, and clicking pre-scroll coordinates lands on whatever slid
      // underneath. This exact miss shipped a "button does nothing" take.
      const fresh = await el(sess, step);
      if (!fresh) return fail(sess, ctx.out, 'target moved away during scroll', step);
      const at = `@${Math.round(fresh.x)},${Math.round(fresh.y)} ${Math.round(fresh.w)}x${Math.round(fresh.h)}`;
      // The glide is deliberately slow (~600ms): at capture rates the whole
      // point is that frames land mid-glide, so the viewer sees the cursor
      // WALK. A 150ms glide fits between two frames and reads as a teleport.
      const cx = fresh.x + fresh.w / 2, cy = fresh.y + fresh.h / 2;
      for (let i = 1; i <= 12; i++) {
        await glide(sess, cx * (i / 12) + 4 * (1 - i / 12), cy * (i / 12));
        await sleep(50);
      }
      await sess.send('Input.dispatchMouseEvent', { type: 'mousePressed', x: cx, y: cy, button: 'left', clickCount: 1 });
      await sess.send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: cx, y: cy, button: 'left', clickCount: 1 });
      if (step.do === 'click') {
        await sleep(step.settle ?? 800);
        if (step.expectPopup) await ctx.followPopup();
        log(true, found.label + ' ' + at + (found.skippedCovered ? ` (${found.skippedCovered} covered twin${found.skippedCovered > 1 ? 's' : ''} skipped)` : ''));
        return;
      }
      // type
      await sess.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'a', code: 'KeyA', modifiers: 2 });
      await sess.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'a', code: 'KeyA' });
      const cps = step.cps ?? 12;
      for (const ch of step.text) {
        await sess.send('Input.insertText', { text: ch });
        await sleep(1000 / cps);
      }
      await sleep(500);
      log(true, `${found.label} ${at} ← ${(step.text || '').slice(0, 40)}`);
      return;
    }
    case 'press': {
      await sess.send('Input.dispatchKeyEvent', { type: 'keyDown', key: step.key, code: step.key });
      await sess.send('Input.dispatchKeyEvent', { type: 'keyUp', key: step.key, code: step.key });
      await sleep(step.settle ?? 500);
      log(true, step.key);
      return;
    }
    case 'sleep': await sleep(step.ms); log(true, `${step.ms}ms`); return;
    case 'scroll': {
      if (step.selector) {
        const found = await el(sess, { selector: step.selector });
        if (!found) return fail(sess, ctx.out, 'scroll target not found', step);
        await evaluate(sess, `window.__demoEls[${JSON.stringify(found.ref)}].scrollIntoView({ behavior: 'smooth', block: 'center' })`);
      } else {
        await evaluate(sess, `window.scrollTo({ top: ${step.y ?? 400}, behavior: 'smooth' })`);
      }
      await sleep(1200);
      log(true);
      return;
    }
    case 'followPopup': await ctx.followPopup(); log(true, 'popup'); return;
    case 'main': await ctx.backToMain(); log(true, 'main'); return;
    case 'closePopups': {
      const n = await ctx.closePopups();
      log(true, `${n} closed`);
      return;
    }
    case 'close': {
      // Closing the page destroys its own execution context, so the response
      // to the close call never comes back. Fire and forget by design — ever
      // awaiting it is a guaranteed hang, which the send timeout would only
      // turn into a 30s stall.
      sess.send('Runtime.evaluate', { expression: 'window.close()', returnByValue: true }).then(() => {}, () => {});
      await sleep(800);
      log(true, 'closed');
      return;
    }
    case 'download': await ctx.armDownload(); log(true, 'armed'); return;
    default: return fail(sess, ctx.out, `unknown verb "${step.do}"`, step);
  }
}

async function main() {
  if (has('help') || has('h')) {
    console.log(`usage:
  node record.mjs --playbook flow.playbook.json --out ./demo-out/ [--base URL]
  node record.mjs --playbook flow.playbook.json --rehearse
  node record.mjs --dump <url>          # element inventory for Discover
flags: --chrome PATH --ffmpeg PATH --profile DIR --base URL --headed`);
    process.exit(0);
  }
  if (arg('dump')) {
    const chrome = findChrome();
    if (!chrome) throw new Error('no Chromium found (set CHROME_PATH)');
    const prof = mkdtempSync(join(tmpdir(), 'demo-prof-'));
    const port = 9400 + Math.floor(Math.random() * 500);
    const child = spawn(chrome, [`--remote-debugging-port=${port}`, `--user-data-dir=${prof}`, '--no-sandbox', ...((/headless_shell/.test(chrome) || has('headed')) ? [] : ['--headless=new']), '--disable-gpu', 'about:blank'], { stdio: 'ignore' });
    await sleep(1500);
    const targets = await httpJson(`http://127.0.0.1:${port}/json/list`);
    const page = targets.find((t) => t.type === 'page');
    const sess = await connect(page.webSocketDebuggerUrl);
    await sess.send('Page.enable');
    await sess.send('Page.navigate', { url: arg('dump') });
    await sleep(3000);
    console.log(await evaluate(sess, DUMP_JS));
    sess.close(); child.kill();
    process.exit(0);
  }

  const playbookPath = arg('playbook');
  if (!playbookPath) throw new Error('missing --playbook (see --help)');
  const pb = JSON.parse(readFileSync(playbookPath, 'utf8'));
  const out = resolve(arg('out', './demo-out/'));
  const rehearse = has('rehearse');
  mkdirSync(out, { recursive: true });
  mkdirSync(join(out, 'frames'), { recursive: true });
  mkdirSync(join(out, 'downloads'), { recursive: true });

  const chrome = arg('chrome', findChrome());
  if (!chrome) throw new Error('no Chromium found (set CHROME_PATH)');
  const headed = has('headed');
  const isShell = /headless_shell/.test(chrome);
  if (headed && isShell) {
    throw new Error('--headed needs a full Chromium, not the headless shell (set CHROME_PATH)');
  }
  const headlessFlag = (!isShell && !headed) ? ['--headless=new'] : [];
  const prof = arg('profile', mkdtempSync(join(tmpdir(), 'demo-prof-')));
  const port = 9400 + Math.floor(Math.random() * 500);
  // Tracked outside try boundaries so failures still kill the browser —
  // orphaned headless instances used to pile up after every failed take.
  const child = spawn(chrome, [
    `--remote-debugging-port=${port}`, `--user-data-dir=${prof}`, '--no-sandbox',
    ...headlessFlag,
    // Popups must open deterministically: headless Chrome blocks window.open
    // without transient activation, and synthetic clicks don't reliably
    // provide it. Demos click real buttons; the blocker only adds flakiness.
    '--disable-popup-blocking',
    '--disable-gpu', `--window-size=${pb.viewport?.width ?? 1280},${pb.viewport?.height ?? 720}`, 'about:blank',
  ], { stdio: 'ignore' });
  globalThis.__demoChild = child;
  await sleep(1800);

  const ctx = {
    out, base: arg('base', ''), log: [],
    armDownload: null, followPopup: null,
  };
  let sess;
  let frames = [];
  let capturing = false;
  let captureStart = 0;
  let mainTargetId = null;
  // Screenshots ride their own connection per target: the journey session
  // switches targets (popup/main) and must never be closed or shared with
  // the capture loop mid-flight. One cached shot-connection per target.
  const shotConns = new Map();
  let capTargetId = null;
  async function shotConn(id) {
    if (!shotConns.has(id)) {
      const ts = await httpJson(`http://127.0.0.1:${port}/json/list`);
      const t = ts.find((x) => x.id === id);
      if (!t) return null;
      const c = await connect(t.webSocketDebuggerUrl);
      await c.send('Page.enable');
      shotConns.set(id, c);
    }
    return shotConns.get(id);
  }
  const seenTargets = new Set();

  async function attachTo(target) {
    if (sess) sess.close();
    seenTargets.add(target.id);
    sess = await connect(target.webSocketDebuggerUrl);
    await sess.send('Page.enable');
    await sess.send('Runtime.enable');
    return sess;
  }

  const targets = await httpJson(`http://127.0.0.1:${port}/json/list`);
  const firstPage = targets.find((t) => t.type === 'page');
  if (!firstPage) throw new Error('no page target');
  mainTargetId = firstPage.id;
  await attachTo(firstPage);

  // Browser-level session for downloads and target management.
  let browserSess = null;
  try {
    const ver = await httpJson(`http://127.0.0.1:${port}/json/version`);
    browserSess = await connect(ver.webSocketDebuggerUrl);
    ctx.armDownload = async () => {
      await browserSess.send('Browser.setDownloadBehavior', { behavior: 'allow', downloadPath: join(out, 'downloads') });
    };
  } catch { ctx.armDownload = async () => {}; }

  ctx.followPopup = async () => {
    for (let i = 0; i < 40; i++) {
      const ts = await httpJson(`http://127.0.0.1:${port}/json/list`);
      const popup = ts.filter((t) => t.type === 'page' && !seenTargets.has(t.id)).pop();
      if (popup) {
        await attachTo(popup);
        // Footage follows the popup; the journey session moved with it.
        capTargetId = popup.id;
        return;
      }
      await sleep(250);
    }
    throw new Error('followPopup: no popup target appeared');
  };

  ctx.backToMain = async () => {
    const ts = await httpJson(`http://127.0.0.1:${port}/json/list`);
    const main = ts.find((t) => t.id === mainTargetId) ?? ts.find((t) => t.type === 'page');
    if (!main) throw new Error('backToMain: main target gone');
    await attachTo(main);
    capTargetId = main.id;
  };

  ctx.closePopups = async () => {
    const ts = await httpJson(`http://127.0.0.1:${port}/json/list`);
    let n = 0;
    for (const t of ts) {
      if (t.type === 'page' && t.id !== mainTargetId && browserSess) {
        try { await browserSess.send('Target.closeTarget', { targetId: t.id }); n++; } catch {}
      }
    }
    await sleep(500);
    return n;
  };

  async function startCapture() {
    // Back-to-back captures, no fixed interval: under load each shot costs
    // more, and an interval just skips ticks (timelapse). The loop records
    // per-frame timestamps and assembly uses the MEASURED rate, so the video
    // stays real-time however fast the machine is.
    capturing = true;
    captureStart = Date.now();
    (async () => {
      while (capturing) {
        try {
          // Short fuse: a stall (first frame mid-navigation, a replaced
          // session) skips one frame instead of killing the loop.
          const c = capTargetId ? await shotConn(capTargetId) : null;
          const s = c ?? sess;
          if (!s) { await sleep(50); continue; }
          const shot = await s.send('Page.captureScreenshot', { format: 'jpeg', quality: 65 }, 5000);
          frames.push({ t: Date.now(), buf: Buffer.from(shot.result.data, 'base64') });
        } catch { await sleep(100); }
      }
    })();
  }
  async function stopCapture() {
    capturing = false;
    await sleep(150);
    try {
      const c = capTargetId ? await shotConn(capTargetId) : null;
      const shot = await (c ?? sess).send('Page.captureScreenshot', { format: 'jpeg', quality: 65 });
      frames.push({ t: Date.now(), buf: Buffer.from(shot.result.data, 'base64') });
    } catch {}
  }
  function measuredFps() {
    if (frames.length < 2) return 8;
    const secs = (frames[frames.length - 1].t - frames[0].t) / 1000;
    if (secs <= 0) return 8;
    return Math.min(24, Math.max(2, frames.length / secs));
  }
  if (!rehearse) await startCapture();

  for (const step of pb.steps) await runStep(sess, ctx, step);
  // Hold the final frame so the ending breathes.
  await sleep(2500);
  if (!rehearse) {
    await stopCapture();
    await sleep(300);
  }
  writeFileSync(join(out, 'steps.ndjson'), ctx.log.map((l) => JSON.stringify(l)).join('\n') + '\n');

  if (!rehearse) {
    const fdir = join(out, 'frames');
    frames.forEach((f, i) => writeFileSync(join(fdir, `f${String(i).padStart(4, '0')}.jpg`), f.buf));
    const eff = measuredFps();
    console.log(`captured ${frames.length} frames (~${eff.toFixed(1)}fps average)`);
    await assemble(out, fdir, frames);
  }
  try { sess.close(); } catch {}
  child.kill();
  console.log(rehearse ? 'REHEARSAL PASSED' : 'done: ' + out);
}

async function assemble(out, fdir, frames) {
  const ffmpeg = arg('ffmpeg', findFfmpeg());
  try { await execFileAsync(ffmpeg, ['-hide_banner', '-version']); }
  catch { console.error('ffmpeg not found, frames kept in frames/'); return; }
  // Capability matrix, not assumptions: the Playwright-bundled build only
  // does VP8-in-WebM, a full build does everything. Missing pieces print a
  // one-line fix instead of failing the take.
  const enc = await execFileAsync(ffmpeg, ['-hide_banner', '-encoders']).then((r) => r.stdout).catch(() => '');
  const mux = await execFileAsync(ffmpeg, ['-hide_banner', '-muxers']).then((r) => r.stdout).catch(() => '');
  const fil = await execFileAsync(ffmpeg, ['-hide_banner', '-filters']).then((r) => r.stdout).catch(() => '');
  const hasEnc = (re) => re.test(enc);
  const hasMux = (re) => re.test(mux);
  // Exact pacing via the concat demuxer: every frame carries its own
  // measured duration, so slow stretches play slow and fast ones fast —
  // unlike a fixed -framerate, which turns rate variance into timelapse in
  // one half and slow motion in the other.
  const durs = frames.map((f, i) => {
    const next = frames[Math.min(i + 1, frames.length - 1)].t;
    return Math.min(2.0, Math.max(0.05, (next - f.t) / 1000 || 0.2));
  });
  const wall = durs.reduce((a, b) => a + b, 0);
  console.log(`assembling ~${Math.round(wall)}s of wall time from ${frames.length} frames`);
  const list = frames.map((_, i) =>
    `file 'f${String(i).padStart(4, '0')}.jpg'\nduration ${durs[i].toFixed(3)}`).join('\n') + '\n';
  writeFileSync(join(fdir, 'list.txt'), list);
  const input = ['-f', 'concat', '-safe', '0', '-i', join(fdir, 'list.txt')];
  const run = (args) => execFileAsync(ffmpeg, ['-y', ...args], { cwd: fdir }).catch((e) => {
    console.error('ffmpeg failed:', String(e.message || e).slice(0, 200));
  });
  const fullHint = 'for MP4+GIF: mkdir -p ~/.cache/demo-video && cd $_ && npm i ffmpeg-static';
  if (hasMux(/ mp4 /)) {
    const v = hasEnc(/libx264/) ? ['-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '21', '-preset', 'veryfast']
      : hasEnc(/ mpeg4 /) ? ['-c:v', 'mpeg4', '-q:v', '4'] : null;
    if (v) await run([...input, ...v, '-movflags', '+faststart', '-fps_mode', 'passthrough', join(out, 'take.mp4')]);
    else console.error('no mp4-capable encoder; ' + fullHint);
  } else console.error('no mp4 muxer; ' + fullHint);
  if (hasMux(/ webm /)) {
    const v = hasEnc(/libvpx-vp9/) ? ['-c:v', 'libvpx-vp9', '-b:v', '1M']
      : hasEnc(/libvpx-vp8/) ? ['-c:v', 'libvpx-vp8', '-b:v', '1M']
      : hasEnc(/libaom-av1/) ? ['-c:v', 'libaom-av1', '-b:v', '1M'] : null;
    if (v) await run([...input, ...v, '-fps_mode', 'passthrough', join(out, 'take.webm')]);
    else console.error('no webm-capable encoder; ' + fullHint);
  }
  if (hasMux(/ gif /) && hasEnc(/ gif /)) {
    const pal = / palettegen /.test(fil) && / paletteuse /.test(fil);
    const vf = pal
      ? 'fps=10,scale=800:-1:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=128[p];[s1][p]paletteuse'
      : 'fps=10,scale=800:-1:flags=lanczos';
    await run([...input, '-vf', vf, '-fps_mode', 'passthrough', join(out, 'take.gif')]);
  } else console.error('no gif support; ' + fullHint);
  for (const f of ['take.mp4', 'take.webm', 'take.gif']) {
    try {
      const { stdout: ls } = await execFileAsync('ls', ['-lh', join(out, f)]);
      console.log(' ', ls.trim());
    } catch {}
  }
}

main().catch((e) => {
  console.error('ERROR: ' + e.message);
  // `child` is scoped inside main; failures must still kill the browser.
  try { globalThis.__demoChild?.kill(); } catch {}
  process.exit(1);
});
