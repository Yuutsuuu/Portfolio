/* =========================================================
   Marcus Wong · Kali-style white hat portfolio
   One virtual filesystem powers both the file explorer
   and the bash terminal. Edit PROJECTS / SKILLS below.
   ========================================================= */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const sleep = ms => new Promise(r => setTimeout(r, ms));
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const store = {
  get(k) { try { return sessionStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { sessionStorage.setItem(k, v); } catch {} }
};
const HOME = '/home/marcus';

/* ---------- team modes (white hat / red team / green hat) ---------- */
const TEAMS = {
  white: { label: 'white hat', note: 'authorised testing only', giant: 'WHITE HAT', user: 'marcus', host: 'kali', sig: '$',
    lede: 'ethical hacking', os: 'white hat edition', net: ['54,123,240', '79,195,247', '138,180,255'] },
  red: { label: 'red team', note: 'authorised engagement · in scope only', giant: 'RED TEAM', user: 'root', host: 'kali', sig: '#',
    lede: 'authorised offensive security', os: 'red team edition', net: ['255,51,85', '255,138,92', '255,160,173'] },
  green: { label: 'green hat', note: 'learning mode · levelling up', giant: 'GREEN HAT', user: 'marcus', host: 'lab', sig: '$',
    lede: 'learning ethical hacking', os: 'green hat edition', net: ['34,211,107', '180,255,92', '143,240,176'] }
};
let team = 'white';
try { const t = localStorage.getItem('team'); if (TEAMS[t]) team = t; } catch {}
document.documentElement.dataset.team = team;
const T = () => TEAMS[team];
const SIG = () => `<span class="sig">${T().sig}</span>`;

/* =========================================================
   CONTENT
   ========================================================= */
const nums = (prefix, n, ext = 'png') => Array.from({ length: n }, (_, i) => `${prefix}${i + 1}.${ext}`);

const PROJECTS = [
  {
    slug: 'anti-theft-system', title: 'Anti-Theft Deterrence System', cat: 'iot',
    when: 'Major Project · Temasek Polytechnic · 2025-10 to 2026-02 · team of 3',
    tags: ['IoT', 'AI/ML', 'PDPA', 'MQTT', 'Linux'],
    desc: 'Detects checkout anomalies (barcode obstruction, item-count mismatch) to trigger multi-modal alerts, including touchscreen visuals, audio warnings and a 12V blinker, while keeping incident logs privacy-compliant through ROI blackout.',
    points: [
      'Real-time detection with YOLOv12n on a Hailo-8 accelerator',
      'Trained on 7 new barcode-blocking scenarios',
      'Raspberry Pi 5 wired to MQTT alerts and 12V hardware triggers',
      'Sensitive customer areas blacked out (ROI masking) before incidents are logged'
    ],
    extra: {
      'privacy.md': `# Privacy by design (PDPA)

> The security angle of this project: what gets stored, and who it can identify.

## What the pipeline does
- Sensitive customer areas are blacked out with **ROI masking** before an incident is logged
- Incident logs stay compliant with Singapore's PDPA
- Alerts travel between devices over \`MQTT\`

## Why it matters
- A theft log should prove the incident, not expose the shopper
- Privacy controls live in the pipeline itself, not bolted on afterwards`
    },
    imgs: ['MP on site.jpeg', 'MP_Objectives.png', 'MP_barcodeScenarios.png', 'MP_SystemArchitecture.png', 'MP_GUI.png', 'MP_AI.png', 'MP_OCR.png', 'MP_hardware.png', 'MP_box.jpg']
  },
  {
    slug: 'smart-robot-compost', title: 'Smart Robot Compost', cat: 'iot',
    when: 'Overseas internship · Fukuoka Institute of Technology, Japan · 2025',
    tags: ['React', 'TypeScript', 'IoT', 'AWS'],
    desc: 'Redesign of a compost robot control interface, migrating to a React-based frontend hosted on AWS. It adds real-time telemetry and remote command execution, replacing a legacy system with a low-latency, responsive dashboard.',
    points: [
      'Legacy IoT control panel migrated to React + TypeScript',
      'Real-time tracking of composting phases',
      'Remote command execution from the dashboard',
      'Demoed to international visitors at Osaka Expo 2025'
    ],
    link: { name: 'demo.url', href: 'https://youtu.be/EGb_1tSygwY?si=Uvd-SZnpOOjufzvJ', label: 'watch video' },
    imgs: ['OSIP_project.jpg', 'OSIP_main.png', 'OSIP_graph.png', 'OSIP_readings.png', 'OSIP_general.png', 'OSIP_conditions.png']
  },
  {
    slug: 'student-enrollment-system', title: 'Student Enrollment System', cat: 'software',
    when: 'Object Oriented Programming module',
    tags: ['Java', 'OOP'],
    desc: 'Object Oriented Programming project for school, with a design that mimics the Temasek Polytechnic School of Engineering site.',
    points: ['Written in Java around OOP principles', 'UI modelled on the TP School of Engineering site'],
    imgs: ['OOP_project.png', ...nums('OOP_p', 9)]
  },
  {
    slug: 'fitdash', title: 'FitDash: Personal Fitness Trainer', cat: 'software',
    when: 'Full Stack module · .NET and C#',
    tags: ['.NET', 'C#', 'Backend'],
    desc: 'FitDash lets users set and track fitness goals, log workouts, monitor water intake, and track macros and food consumption through the day.',
    points: ['Account creation and login', 'Workout designer, library and logging', 'Diet, macros, food diary and water tracking'],
    link: { name: 'source.url', href: 'https://github.com/Marcuswzh/FitDashMain', label: 'view source' },
    imgs: ['FitDash_logo.jpg', 'Fitdash.png', 'Fitdash_createAcc.png', 'Fitdash_login.png', 'Fitdash_workout.png', 'Fitdash_macros.png', 'Fitdash_designWorkout.png', 'Fitdash_workoutLib.png', 'Fitdash_diet.png', 'Fitdash_exercise.png', 'Fitdash_foodDiary.png', 'Fitdash_Foodlist.png', 'Fitdash_water.png']
  },
  {
    slug: 'component-cnn', title: 'Component Classification CNN', cat: 'ai',
    when: 'AIML module · regression models and image classification',
    tags: ['Python', 'TensorFlow', 'OpenCV'],
    desc: 'Multi-regression models plus a convolutional neural network (TensorFlow/Keras) that classifies electronic components.',
    points: ['Part A: EDA, missing values, skew, linear / polynomial / tree regression', 'Part B: VGG16-based CNN for component images, trained and tested'],
    imgs: ['AIML_CNN.png', 'AIML_partAdata.png', 'AIML_eda.png', 'AIML_missingval.png', 'AIML_graphs.png', 'AIML_skew.png', 'AIML_linear.png', 'AIML_polynomial.png', 'AIML_tree.png', 'AIML_partBsplit.png', 'AIML_partBVGG16.png', 'AIML_partBVGGgraph.png', 'AIML_partBVGGtrain.png', 'AIML_partBVGGtest.png']
  }
  // Add security labs, CTF write-ups or home-lab projects here as new objects
];

// ~/certificates: put the files in a certificates/ folder next to index.html
// (an image works too: point src at a .png/.jpg)
const CERTS = [
  { file: 'skills_transcript.pdf', src: '2304960D_Skills Transcript.pdf', title: 'Skills transcript', desc: 'Skills transcript' },
  { file: 'fit_certificate.png', src: 'fit cert.png', title: 'Certificate of completion', issuer: 'Fukuoka Institute of Technology', desc: 'Certificate of completion · Fukuoka Institute of Technology, Japan · overseas internship 2025' }
];

// skills/<group>/<file>: content shown when opened
const SKILLS = {
  languages: {
    'python.py': ['Python', ['Component Classification CNN (TensorFlow / Keras)']],
    'java.java': ['Java', ['Student Enrollment System (OOP)']],
    'csharp.cs': ['C# / .NET', ['FitDash: Personal Fitness Trainer']],
    'javascript.js': ['TypeScript / React', ['Smart Robot Compost dashboard']],
    // 'react.jsx': ['React', ['Smart Robot Compost dashboard']],  //comment out for now
  },
  systems: {
    'raspberry-pi.conf': ['Raspberry Pi', ['Anti-Theft Deterrence System (Raspberry Pi 5 + 12V triggers)']]
  },
  iot: {
    'mqtt.conf': ['MQTT', ['Anti-Theft Deterrence System (alerts between devices)']]
  },
  'ai-ml': {
    'tensorflow.py': ['TensorFlow', ['Component Classification CNN']],
    'opencv.py': ['OpenCV', ['Component Classification CNN']],
    'yolo.py': ['YOLOv12n + Hailo-8', ['Anti-Theft Deterrence System']]
  }
};

/* ---------- build the virtual filesystem ---------- */
const dir = (children = {}) => ({ type: 'dir', children });
const file = (content, extra = {}) => ({ type: 'file', content, ...extra });

function buildFS() {
  const projects = {};
  PROJECTS.forEach(p => {
    const kids = {
      'README.md': file(
`# ${p.title}

> ${p.when}

${p.desc}

## Highlights
${p.points.map(x => '- ' + x).join('\n')}

## Stack
${p.tags.map(t => '`' + t + '`').join(' ')}
${p.link ? `\n## Links\n[${p.link.label}](${p.link.href})\n` : ''}
## Files
- \`screenshots/\` ${p.imgs.length} images, click to open the viewer
- \`stack.json\` category and tags`),
      'stack.json': file(JSON.stringify({ project: p.title, category: p.cat, tags: p.tags }, null, 2)),
      'screenshots': dir(Object.fromEntries(p.imgs.map(src => [src, { type: 'file', img: 'images/' + src }])))
    };
    if (p.link) kids[p.link.name] = file(p.link.href, { url: p.link.href, label: p.link.label });
    Object.entries(p.extra || {}).forEach(([n, c]) => { kids[n] = file(c); });
    projects[p.slug] = { ...dir(kids), project: p };
  });

  const skills = {};
  Object.entries(SKILLS).forEach(([group, files]) => {
    skills[group] = dir(Object.fromEntries(Object.entries(files).map(([name, [label, used]]) =>
      [name, file(`# ${label}\n# where I've used it:\n${used.map(u => '#   - ' + u).join('\n')}\n\nstatus="in use"`)])));
  });
  skills.security = dir({
    'roadmap.md': file(`# Security roadmap

> White hat. Authorised scope only.

## Already in my projects
- Privacy-compliant video pipelines under PDPA (ROI masking)
- MQTT messaging between embedded devices
- Linux-based hardware (Raspberry Pi 5)

## Going deeper next
- Secure networking
- Defending the systems I build
- Labs, CTFs and write-ups, added here as I complete them`),
    'teams.md': file(`# Hats and teams

> Switch with the toggle in the top bar, or type \`hat white\`, \`hat red\` or \`hat green\` in the terminal.

## White hat
- Ethical hacker: tests only with permission, reports what they find

## Red team
- Authorised attackers who simulate real threats to test an organisation's defences
- Works under written rules of engagement and an agreed scope

## Green hat
- A newcomer still learning the craft: curious, asking questions, practising in labs

## Black hat
- No permission. Not welcome on this box.`),
    'code-of-conduct.txt': file(`# white hat code of conduct
1. get written permission before testing anything
2. stay inside the agreed scope
3. report what you find, responsibly
4. do no harm, leave systems as you found them`)
  });

  return dir({
    home: dir({
      marcus: dir({
        'projects': dir(projects),
        'skills': dir(skills),
        'about.txt': file(`I'm Marcus, a recent Computer Engineering graduate (Diploma, Temasek Polytechnic).
I started in Common Engineering, got hooked on how hardware and software talk to
each other, and I'm now pointing that curiosity at cybersecurity.

My projects already touch security: privacy-compliant video pipelines under PDPA,
MQTT messaging between embedded devices, and Linux-based hardware. Next I want to
go deeper on secure networking and defending the systems I build.`),
        'experience.log': file(`* a3f9c21 (HEAD -> main) 2025-10..2026-02  Major Project: anti-theft deterrence system @ Temasek Polytechnic
|           YOLOv12n + Hailo-8, PDPA ROI masking, Raspberry Pi 5, MQTT, 12V triggers
* 7be04d8 (overseas)    2025-05..2025-08  Overseas internship @ Fukuoka Institute of Technology, Japan
            React + TypeScript IoT panel, Osaka Expo 2025 demos, featured in Nishinippon Shimbun`),
        'contact.txt': file(`linkedin  https://www.linkedin.com/in/marcus-wong-0788242aa/
github    https://github.com/Yuutsuuu
resume    ~/resume.pdf
message   scroll to ./contact or run: contact`),
        'certificates': dir({
          'README.md': file(`# Certificates

> Click a file to view it, or download a copy.

${CERTS.map(c => `- \`${c.file}\` ${c.title}${c.issuer ? ' · ' + c.issuer : ''}`).join('\n')}`),
          ...Object.fromEntries(CERTS.map(c => [c.file, { type: 'file', pdf: c.src, title: c.title, desc: c.desc }]))
        }),
        'resume.pdf': { type: 'file', pdf: 'MarcusWong_Resume.pdf', title: 'Resume', desc: 'Marcus Wong · Computer Engineering · Temasek Polytechnic' }
      })
    })
  });
}
const FS = buildFS();

/* ---------- path helpers ---------- */
function resolve(p, cwd) {
  if (!p || p === '~') return HOME;
  if (p.startsWith('~')) p = HOME + p.slice(1);
  const parts = (p.startsWith('/') ? [] : cwd.split('/').filter(Boolean));
  p.split('/').filter(Boolean).forEach(seg => {
    if (seg === '.') return;
    if (seg === '..') parts.pop(); else parts.push(seg);
  });
  return '/' + parts.join('/');
}
function getNode(path) {
  let n = FS;
  for (const seg of path.split('/').filter(Boolean)) {
    if (!n || n.type !== 'dir' || !n.children[seg]) return null;
    n = n.children[seg];
  }
  return n;
}
const pretty = p => p === HOME ? '~' : p.startsWith(HOME + '/') ? '~' + p.slice(HOME.length) : p;
const extOf = name => (name.match(/\.([a-z0-9]+)$/i) || [, ''])[1].toLowerCase();
const parentOf = p => p.replace(/\/[^/]+$/, '') || '/';
const baseOf = p => p.split('/').filter(Boolean).pop() || '/';

/* =========================================================
   KALI PROMPT
   ========================================================= */
const ps1 = path => `┌──(<span class="u">${T().user}</span><span class="at">㉿</span><span class="h">${T().host}</span>)-[<span class="pt">${esc(pretty(path))}</span>]`;

/* =========================================================
   BOOT SEQUENCE
   ========================================================= */
const boot = $('#boot'), bootlog = $('#bootlog'), bootbar = $('#bootbar span');
let booted = false;
function endBoot() {
  if (booted) return;
  booted = true;
  store.set('booted', '1');
  boot.classList.add('out');
  setTimeout(() => { boot.remove(); typeHero(); }, reduce ? 0 : 600);
}
async function runBoot() {
  const now = new Date();
  const L = [
    ['bl', `marcus-kali · ${T().os}`],
    ['', '[    0.000000] Booting kernel 6.x-kali-amd64 ...'],
    ['', '[    0.214551] Loading hardware drivers: raspberry-pi, hailo-8, mqtt-broker'],
    ['ok', '[  OK  ] Started Network Manager.'],
    ['ok', '[  OK  ] Mounted /home/marcus/projects.'],
    ['ok', '[  OK  ] Mounted /home/marcus/skills.'],
    ['ok', '[  OK  ] Started Scope & Authorisation Check.'],
    ['w', '[ WARN ] Unauthorised offensive tooling disabled. Hack ethically.'],
    ['ok', '[  OK  ] Reached target Graphical Interface.'],
    ['', ''],
    ['fg', 'kali login: marcus'],
    ['fg', 'Password: ********'],
    ['', `Last login: ${now.toDateString()} on tty1`]
  ];
  for (let i = 0; i < L.length; i++) {
    if (booted) return;
    bootlog.insertAdjacentHTML('beforeend', `<span class="${L[i][0]}">${esc(L[i][1])}</span>\n`);
    bootbar.style.width = ((i + 1) / L.length * 100) + '%';
    await sleep(i < 2 ? 260 : 130 + Math.random() * 90);
  }
  await sleep(450);
  endBoot();
}
$('#skip').addEventListener('click', endBoot);
boot.addEventListener('click', e => { if (e.target !== $('#skip')) endBoot(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !booted) endBoot(); });
reduce ? endBoot() : runBoot();

/* =========================================================
   HERO TYPING
   ========================================================= */
async function typeInto(el, text, speed = 42) {
  for (const ch of text) { el.textContent += ch; if (!reduce) await sleep(speed + Math.random() * 30); }
}
async function typeHero() {
  const out = $('#tty');
  const seq = [
    ['whoami', '<div class="o big">Marcus Wong</div>'],
    ['cat role.txt', '<div class="o">computer engineering graduate → ethical hacking &amp; cybersecurity</div>'],
    ['ls focus/', '<div class="o dirs"><span>linux/</span><span>network-security/</span><span>secure-iot/</span><span>data-privacy/</span></div>']
  ];
  for (const [cmd, html] of seq) {
    out.insertAdjacentHTML('beforeend', `<div class="ln ps1">${ps1(HOME)}</div>`);
    const row = document.createElement('div');
    row.className = 'ln';
    row.innerHTML = `<span class="ps1">└─${SIG()} </span><span class="typed"></span>`;
    out.append(row);
    await typeInto($('.typed', row), cmd);
    if (!reduce) await sleep(200);
    out.insertAdjacentHTML('beforeend', html);
    if (!reduce) await sleep(240);
  }
  out.insertAdjacentHTML('beforeend', `<div class="ln ps1">${ps1(HOME)}</div><div class="ln"><span class="ps1">└─${SIG()} </span><span class="car"></span></div>`);
}

/* =========================================================
   SECTION HEADERS (typed on view) + REVEALS
   ========================================================= */
const cmdPaths = { about: HOME, experience: HOME, files: HOME, contact: HOME };
const io = new IntersectionObserver(entries => entries.forEach(async en => {
  if (!en.isIntersecting) return;
  io.unobserve(en.target);
  const t = en.target;
  if (t.classList.contains('cmd')) {
    t.innerHTML = `<span class="stitle">${esc(t.dataset.title)}</span><div class="ps1">${ps1(HOME)}</div><div><span class="ps1">└─${SIG()} </span><span class="typed"></span><span class="car"></span></div>`;
    await typeInto($('.typed', t), t.dataset.cmd, 32);
  } else t.classList.add('in');
}), { threshold: .2 });
$$('.cmd, .reveal').forEach(el => io.observe(el));

/* =========================================================
   CLOCK
   ========================================================= */
const clock = $('#clock');
const tick = () => { clock.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); };
tick(); setInterval(tick, 10000);

/* =========================================================
   PARALLAX + SCROLL EFFECTS (single rAF loop)
   ========================================================= */
const prog = $('#prog span');
const hero = $('#home');
const speedEls = $$('[data-speed]', hero);
const hexl = $('.hexl'), floor = $('.floor');
const tracks = $$('.marquee .track');
const exp = $('#experience'), htrack = $('.htrack'), hrail = $('.hrail span'), hc = $('#hc');
const commits = $$('.commit');
const wsLinks = $$('#ws a');
const sections = wsLinks.map(a => $('#' + a.dataset.s));
const wide = matchMedia('(min-width: 761px)');
let mx = 0, my = 0;
addEventListener('pointermove', e => { mx = e.clientX / innerWidth - .5; my = e.clientY / innerHeight - .5; }, { passive: true });

function frame(t) {
  const y = scrollY, vh = innerHeight;
  const max = document.documentElement.scrollHeight - vh;
  prog.style.width = (max > 0 ? y / max * 100 : 0) + '%';

  if (!reduce) {
    // hero parallax layers (+ subtle mouse tilt)
    if (y < vh * 1.3) speedEls.forEach(el => {
      const s = +el.dataset.speed;
      const tilt = el.classList.contains('hero-win') ? ` rotateY(${mx * 6}deg) rotateX(${-my * 6}deg)` : '';
      el.style.transform = `perspective(1000px) translate3d(${mx * s * -60}px, ${y * s}px, 0)${tilt}`;
    });
    hexl.style.transform = `translate3d(0, ${-y * .15}px, 0)`;
    floor.style.backgroundPosition = `0 ${y * .5}px, ${mx * 40}px 0`;

    // marquee slider: driven by scroll + slow drift
    tracks.forEach(tr => {
      const half = tr.scrollWidth / 2 || 1;
      const d = +tr.dataset.dir;
      const off = ((y * .45 + t * .02) % half);
      tr.style.transform = `translate3d(${d > 0 ? -off : off - half}px, 0, 0)`;
    });

    // experience: horizontal scroll while pinned
    if (wide.matches) {
      const r = exp.getBoundingClientRect();
      const total = exp.offsetHeight - vh;
      const p = clamp(-r.top / total);
      const shift = Math.max(0, htrack.scrollWidth - innerWidth * .8);
      htrack.style.transform = `translate3d(${-p * shift}px, 0, 0)`;
      hrail.style.width = p * 100 + '%';
      const idx = Math.round(p * (commits.length - 1));
      commits.forEach((c, i) => c.classList.toggle('active', i === idx));
      hc.textContent = String(idx + 1).padStart(2, '0');
    }
  }

  // active workspace in panel
  let cur = 0;
  sections.forEach((s, i) => { if (s.getBoundingClientRect().top < vh * .45) cur = i; });
  wsLinks.forEach((a, i) => a.classList.toggle('on', i === cur));

  drawNet(t, y);
  requestAnimationFrame(frame);
}

/* ---------- network constellation canvas ---------- */
const cv = $('#net'), cx = cv.getContext('2d');
let nodes = [], W = 0, H = 0, DPR = 1;
function sizeNet() {
  DPR = Math.min(2, devicePixelRatio || 1);
  W = cv.width = innerWidth * DPR; H = cv.height = innerHeight * DPR;
  const n = Math.round(Math.min(90, innerWidth * innerHeight / 18000));
  nodes = Array.from({ length: n }, () => ({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .25, vy: (Math.random() - .5) * .25, r: Math.random() * 1.6 + .6 }));
}
function drawNet(t, scroll) {
  cx.clearRect(0, 0, W, H);
  const off = (scroll * .25 * DPR) % H;
  const link = 140 * DPR;
  const pts = nodes.map(n => {
    if (!reduce) { n.x += n.vx; n.y += n.vy; }
    if (n.x < 0 || n.x > W) n.vx *= -1;
    if (n.y < 0 || n.y > H) n.vy *= -1;
    return [n.x + mx * 20 * DPR, ((n.y - off) % H + H) % H, n.r];
  });
  cx.lineWidth = DPR * .6;
  for (let i = 0; i < pts.length; i++) {
    for (let j = i + 1; j < pts.length; j++) {
      const dx = pts[i][0] - pts[j][0], dy = pts[i][1] - pts[j][1];
      const d = Math.hypot(dx, dy);
      if (d < link) {
        cx.strokeStyle = `rgba(${T().net[0]},${(1 - d / link) * .28})`;
        cx.beginPath(); cx.moveTo(pts[i][0], pts[i][1]); cx.lineTo(pts[j][0], pts[j][1]); cx.stroke();
      }
    }
  }
  pts.forEach(([x, y, r], i) => {
    cx.fillStyle = i % 9 === 0 ? `rgba(${T().net[1]},.9)` : `rgba(${T().net[2]},.55)`;
    cx.beginPath(); cx.arc(x, y, r * DPR, 0, 7); cx.fill();
  });
}
sizeNet();
addEventListener('resize', sizeNet);

/* ---------- data rain (hex characters, team colour, speeds up while scrolling) ---------- */
const rc = $('#rain'), rx = rc.getContext('2d');
const GLYPHS = '0123456789abcdef<>/{}[]$#:;=+*';
let drops = [], RW = 0, RH = 0, RFS = 16, lastRain = 0, lastY = scrollY, boost = 0;
function sizeRain() {
  const d = Math.min(2, devicePixelRatio || 1);
  RW = rc.width = innerWidth * d; RH = rc.height = innerHeight * d;
  RFS = 15 * d;
  const cols = Math.ceil(RW / (RFS * 1.4));
  drops = Array.from({ length: cols }, () => ({ y: Math.random() * -RH, v: .5 + Math.random() * .9, on: Math.random() < .55 }));
  rx.fillStyle = '#0a0e14'; rx.fillRect(0, 0, RW, RH);
}
function rain(t) {
  if (!reduce) requestAnimationFrame(rain);
  boost = boost * .9 + Math.abs(scrollY - lastY) * .08;
  lastY = scrollY;
  if (t - lastRain < 55) return;
  lastRain = t;
  rx.fillStyle = 'rgba(10,14,20,0.14)';
  rx.fillRect(0, 0, RW, RH);
  rx.font = `${RFS}px 'JetBrains Mono', monospace`;
  const [main, hi] = T().net;
  drops.forEach((d, i) => {
    if (!d.on) { if (Math.random() < .002) d.on = true; return; }
    const ch = GLYPHS[Math.random() * GLYPHS.length | 0];
    const x = i * RFS * 1.4;
    rx.fillStyle = `rgba(${hi},.95)`;
    rx.fillText(ch, x, d.y);
    rx.fillStyle = `rgba(${main},.6)`;
    rx.fillText(GLYPHS[Math.random() * GLYPHS.length | 0], x, d.y - RFS);
    d.y += RFS * d.v * (1 + Math.min(boost, 4));
    if (d.y > RH + RFS * 2) { d.y = Math.random() * -RH * .3; d.v = .5 + Math.random() * .9; d.on = Math.random() < .7; }
  });
}
sizeRain();
addEventListener('resize', sizeRain);
if (!reduce) requestAnimationFrame(rain);
requestAnimationFrame(frame);

/* =========================================================
   FILE EXPLORER
   ========================================================= */
const fm = {
  cwd: HOME + '/projects', back: [], fwd: [], tag: null, view: 'grid',
  grid: $('#fmGrid'), readme: $('#fmReadme'), crumbs: $('#crumbs'), status: $('#fmStatus'), filter: $('#fmFilter')
};

function iconFor(name, node) {
  if (node.type === 'dir') {
    const label = node.project ? node.project.cat : name === 'screenshots' ? 'IMG' : name === 'certificates' ? 'CERT' : '';
    return `<span class="fic folder"><b>${esc(label.toUpperCase())}</b></span>`;
  }
  if (node.img) return `<span class="fic img"><img loading="lazy" src="${esc(node.img)}" alt="" onerror="this.parentNode.classList.add('broken');this.remove()"></span>`;
  const e = extOf(name);
  const cls = { md: 'md', json: 'json', url: 'url', txt: 'txt', pdf: 'pdf', log: 'log' }[e] || 'code';
  return `<span class="fic file ${cls}"><b>${esc(e || 'FILE')}</b></span>`;
}

function sortedEntries(node) {
  return Object.entries(node.children).sort(([a, x], [b, y]) =>
    (x.type === y.type ? 0 : x.type === 'dir' ? -1 : 1) || (a === 'README.md' ? -1 : b === 'README.md' ? 1 : a.localeCompare(b)));
}

function fmRender() {
  const node = getNode(fm.cwd);
  const q = fm.filter.value.trim().toLowerCase();
  let entries = sortedEntries(node);
  if (fm.tag && fm.cwd === HOME + '/projects') entries = entries.filter(([, n]) => n.project && n.project.cat === fm.tag);
  if (q) entries = entries.filter(([n, nd]) => n.toLowerCase().includes(q) || (nd.project && nd.project.title.toLowerCase().includes(q)));

  fm.grid.className = 'fm-grid' + (fm.view === 'list' ? ' list' : '');
  fm.grid.innerHTML = entries.length ? '' : '<div class="empty">nothing here matches. try clearing the filter.</div>';
  entries.forEach(([name, n], i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'fi';
    b.setAttribute('role', 'listitem');
    b.style.animationDelay = (reduce ? 0 : i * 28) + 'ms';
    const sub = n.project ? n.project.title : n.type === 'dir' ? Object.keys(n.children).length + ' items' : '';
    b.innerHTML = `${iconFor(name, n)}<span class="nm">${esc(name)}${n.type === 'dir' ? '/' : ''}</span>${sub ? `<span class="sub">${esc(sub)}</span>` : ''}`;
    b.title = n.project ? n.project.title : name;
    b.addEventListener('click', () => fmOpen(fm.cwd + '/' + name));
    fm.grid.append(b);
  });

  // README preview below the grid (GitHub style)
  const rd = node.children['README.md'];
  fm.readme.hidden = !rd;
  if (rd) {
    fm.readme.innerHTML = `<header><span class="fic file md" style="transform:scale(.4);margin:-1rem -.7rem"><b>md</b></span><b>README.md</b></header><div class="md">${md(rd.content)}</div>`;
  }

  // breadcrumbs
  const rel = fm.cwd.startsWith(HOME) ? fm.cwd.slice(HOME.length).split('/').filter(Boolean) : fm.cwd.split('/').filter(Boolean);
  const base = fm.cwd.startsWith(HOME) ? HOME : '';
  fm.crumbs.innerHTML = '';
  const mk = (label, path) => {
    const c = document.createElement('button');
    c.type = 'button'; c.textContent = label;
    c.addEventListener('click', () => fmGo(path));
    fm.crumbs.append(c);
  };
  mk(base ? '~' : '/', base || '/');
  let acc = base;
  rel.forEach(seg => { acc += '/' + seg; fm.crumbs.insertAdjacentHTML('beforeend', '<i>/</i>'); mk(seg, acc); });
  fm.crumbs.scrollLeft = fm.crumbs.scrollWidth;

  $('#fmTitle').textContent = `${baseOf(fm.cwd) === 'marcus' ? 'home' : baseOf(fm.cwd)} - File Manager`;
  $('#fmBack').disabled = !fm.back.length;
  $('#fmFwd').disabled = !fm.fwd.length;
  $('#fmUp').disabled = fm.cwd === '/';
  $$('.fm-side [data-go]').forEach(b => b.classList.toggle('on', b.dataset.go === fm.cwd && !fm.tag));
  $$('.fm-side [data-tag]').forEach(b => b.classList.toggle('on', b.dataset.tag === fm.tag));
  fm.status.innerHTML = `<span>${entries.length} item${entries.length === 1 ? '' : 's'}${fm.tag ? ' · tag #' + fm.tag : ''}</span><span>${esc(pretty(fm.cwd))}</span>`;
}

function fmGo(path, { push = true, keepTag = false } = {}) {
  const n = getNode(path);
  if (!n || n.type !== 'dir') return false;
  if (push && path !== fm.cwd) { fm.back.push(fm.cwd); fm.fwd = []; }
  fm.cwd = path;
  if (!keepTag) fm.tag = null;
  fm.filter.value = '';
  closeViewer();
  fmRender();
  return true;
}
function fmOpen(path) {
  const n = getNode(path);
  if (!n) return;
  if (n.type === 'dir') fmGo(path); else openViewer(path);
}

$('#fmBack').addEventListener('click', () => { if (fm.back.length) { fm.fwd.push(fm.cwd); fmGo(fm.back.pop(), { push: false }); } });
$('#fmFwd').addEventListener('click', () => { if (fm.fwd.length) { fm.back.push(fm.cwd); fmGo(fm.fwd.pop(), { push: false }); } });
$('#fmUp').addEventListener('click', () => fmGo(parentOf(fm.cwd)));
$('#fmView').addEventListener('click', () => { fm.view = fm.view === 'grid' ? 'list' : 'grid'; $('#fmView').innerHTML = fm.view === 'grid' ? '&#9638;' : '&#9776;'; fmRender(); });
fm.filter.addEventListener('input', fmRender);
$$('.fm-side [data-go]').forEach(b => b.addEventListener('click', () => fmGo(b.dataset.go)));
$$('.fm-side [data-tag]').forEach(b => b.addEventListener('click', () => {
  const t = b.dataset.tag;
  fmGo(HOME + '/projects', { keepTag: true });
  fm.tag = fm.tag === t ? null : t;
  fmRender();
}));
$('#fmTerm').addEventListener('click', () => { openTerm(); term.cwd = fm.cwd; tPrompt(); tPrint(`<span class="t-dim">cd ${esc(pretty(fm.cwd))}</span>`); });
$('#fm').addEventListener('keydown', e => {
  if (e.key === 'Backspace' && e.target.tagName !== 'INPUT' && viewer.hidden) { e.preventDefault(); fmGo(parentOf(fm.cwd)); }
});

/* ---------- tiny markdown renderer ---------- */
function inline(s) {
  return esc(s)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>')
    .replace(/\[([^\]]+)\]\((https?:[^)\s]+)\)/g, '<a class="btn" href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
}
function md(src) {
  let html = '', list = false;
  src.split('\n').forEach(line => {
    const isLi = /^- /.test(line);
    if (list && !isLi) { html += '</ul>'; list = false; }
    if (/^# /.test(line)) html += `<h1>${inline(line.slice(2))}</h1>`;
    else if (/^## /.test(line)) html += `<h2>${inline(line.slice(3))}</h2>`;
    else if (/^> /.test(line)) html += `<blockquote>${inline(line.slice(2))}</blockquote>`;
    else if (isLi) { if (!list) { html += '<ul>'; list = true; } html += `<li>${inline(line.slice(2))}</li>`; }
    else if (line.trim()) html += `<p>${inline(line)}</p>`;
  });
  return html + (list ? '</ul>' : '');
}
function hl(src) { // light syntax colour for code / text files
  return src.split('\n').map(l => {
    const e = esc(l);
    if (/^\s*#/.test(l)) return `<span class="c">${e}</span>`;
    return e.replace(/(&quot;[^&]*&quot;)/g, '<span class="s">$1</span>').replace(/^(\s*[\w.-]+)(=|:)/, '<span class="k">$1</span>$2');
  }).join('\n');
}

/* ---------- viewer (text / image / link / pdf) ---------- */
const viewer = $('#viewer'), vBody = $('#vBody'), vNav = $('#vNav');
let vList = [], vIdx = 0, vReturn = null;
function openViewer(path) {
  const n = getNode(path), name = baseOf(path);
  vReturn = document.activeElement;
  vNav.hidden = true;
  vBody.innerHTML = '';
  if (n.img) {
    const d = getNode(parentOf(path));
    vList = sortedEntries(d).filter(([, x]) => x.img).map(([nm]) => parentOf(path) + '/' + nm);
    vIdx = vList.indexOf(path);
    showImg();
    vNav.hidden = vList.length < 2;
  } else if (n.url) {
    $('#vTitle').textContent = name;
    const yt = n.url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
    if (yt) {
      $('#vTitle').textContent = name + ' - Video Player';
      vBody.innerHTML = `<div class="vid"><iframe src="https://www.youtube-nocookie.com/embed/${yt[1]}?rel=0" title="${esc(baseOf(parentOf(path)))} demo video" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>
        <p class="vid-alt">video not loading? <a href="${esc(n.url)}" target="_blank" rel="noopener noreferrer">watch it on YouTube</a></p>`;
    } else {
      vBody.innerHTML = `<div class="md"><h1>${esc(name)}</h1><p>[InternetShortcut]<br>URL=<code>${esc(n.url)}</code></p><a class="btn" href="${esc(n.url)}" target="_blank" rel="noopener noreferrer">${esc(n.label || 'open link')}</a></div>`;
    }
  } else if (n.pdf) {
    $('#vTitle').textContent = name + ' - Document Viewer';
    const isImg = /\.(png|jpe?g|webp|gif)$/i.test(n.pdf);
    vBody.innerHTML = `<div class="md doc"><h1>${esc(n.title || name)}</h1>${n.desc ? `<p>${esc(n.desc)}</p>` : ''}
      <p><a class="btn" href="${esc(n.pdf)}" download>download</a><a class="btn ghost" href="${esc(n.pdf)}" target="_blank" rel="noopener">open in new tab</a></p>
      ${isImg ? `<img class="docimg" src="${esc(n.pdf)}" alt="${esc(n.title || name)}">`
        : `<object class="pdf" data="${esc(n.pdf)}" type="application/pdf"><p class="miss">preview not available here. use download or open in new tab.<br><code>${esc(n.pdf)}</code></p></object>`}</div>`;
  } else {
    $('#vTitle').textContent = name + ' - Mousepad';
    vBody.innerHTML = extOf(name) === 'md' ? `<div class="md">${md(n.content)}</div>` : `<pre class="raw">${hl(n.content)}</pre>`;
  }
  viewer.hidden = false;
  $('#vClose').focus();
}
function showImg() {
  const path = vList[vIdx], n = getNode(path);
  $('#vTitle').textContent = `${baseOf(path)} - Image Viewer`;
  $('#vCount').textContent = `${vIdx + 1} / ${vList.length}`;
  vBody.innerHTML = '';
  const img = new Image();
  img.alt = baseOf(path);
  img.onerror = () => { vBody.innerHTML = `<div class="miss"><b>404: image not found</b>expected at <code>${esc(n.img)}</code><br>put your screenshots in the <code>images/</code> folder</div>`; };
  img.src = n.img;
  vBody.append(img);
}
function closeViewer() {
  if (viewer.hidden) return;
  viewer.hidden = true;
  vBody.innerHTML = ''; // stops any playing video
  if (vReturn && document.contains(vReturn)) vReturn.focus();
}
$('#vClose').addEventListener('click', closeViewer);
$('#vPrev').addEventListener('click', () => { vIdx = (vIdx - 1 + vList.length) % vList.length; showImg(); });
$('#vNext').addEventListener('click', () => { vIdx = (vIdx + 1) % vList.length; showImg(); });
viewer.addEventListener('keydown', e => {
  if (e.key === 'Escape') { e.stopPropagation(); closeViewer(); }
  if (!vNav.hidden && e.key === 'ArrowLeft') $('#vPrev').click();
  if (!vNav.hidden && e.key === 'ArrowRight') $('#vNext').click();
});
fmRender();

/* =========================================================
   BASH TERMINAL
   ========================================================= */
const termEl = $('#term'), tOut = $('#tOut'), tIn = $('#tIn'), tBody = $('#tBody');
const term = { cwd: HOME, hist: [], hi: 0, greeted: false, events: [] };
const tPrint = html => { tOut.insertAdjacentHTML('beforeend', `<div>${html}</div>`); tBody.scrollTop = tBody.scrollHeight; };
const tPrompt = () => { $('.ps1', $('#tLine')).innerHTML = ps1(term.cwd); $('#tPath').textContent = pretty(term.cwd); };

function openTerm() {
  termEl.hidden = false;
  termEl.classList.remove('min');
  if (!term.greeted) {
    term.greeted = true;
    tPrint(`<span class="t-b">marcus-kali</span> <span class="t-dim">GNU bash · ${T().os}</span>
<span class="t-dim">The programs included are for authorised, ethical use only.</span>
Type <span class="t-cy">help</span> for commands, <span class="t-cy">ls</span> to look around, <span class="t-cy">neofetch</span> for a summary.
Switch sides with <span class="t-cy">hat white</span>, <span class="t-cy">hat red</span> or <span class="t-cy">hat green</span>.
`);
  }
  tPrompt();
  setTimeout(() => tIn.focus(), 30);
}
function closeTerm() { termEl.hidden = true; termEl.classList.remove('max', 'min'); }
$('#termBtn').addEventListener('click', () => termEl.hidden ? openTerm() : closeTerm());
$$('[data-open-term]').forEach(b => b.addEventListener('click', openTerm));
$('#tClose').addEventListener('click', closeTerm);
$('#tMin').addEventListener('click', () => termEl.classList.toggle('min'));
$('#tMax').addEventListener('click', () => { termEl.classList.toggle('max'); termEl.classList.remove('min'); });
tBody.addEventListener('click', () => { if (!getSelection().toString()) tIn.focus(); });
addEventListener('keydown', e => {
  const typing = /INPUT|TEXTAREA/.test(document.activeElement.tagName);
  if ((e.ctrlKey && e.altKey && e.key.toLowerCase() === 't') || (e.key === '`' && !typing)) {
    e.preventDefault();
    termEl.hidden ? openTerm() : (document.activeElement === tIn ? closeTerm() : tIn.focus());
  }
});

// drag the window by its title bar
(() => {
  const bar = $('#termBar');
  let sx, sy, ox, oy, drag = false;
  bar.addEventListener('pointerdown', e => {
    if (e.target.closest('button') || termEl.classList.contains('max') || !wide.matches) return;
    const r = termEl.getBoundingClientRect();
    drag = true; sx = e.clientX; sy = e.clientY; ox = r.left; oy = r.top;
    bar.setPointerCapture(e.pointerId);
  });
  bar.addEventListener('pointermove', e => {
    if (!drag) return;
    const x = clamp(ox + e.clientX - sx, 0, innerWidth - 120), y = clamp(oy + e.clientY - sy, 42, innerHeight - 40);
    Object.assign(termEl.style, { left: x + 'px', top: y + 'px', right: 'auto', bottom: 'auto' });
  });
  bar.addEventListener('pointerup', () => { drag = false; });
  bar.addEventListener('dblclick', () => $('#tMax').click());
})();

function lsLine(path, long) {
  const n = getNode(path);
  if (!n) return null;
  if (n.type === 'file') return `<span class="t-file">${esc(baseOf(path))}</span>`;
  const items = sortedEntries(n).map(([name, x]) => {
    const cls = x.type === 'dir' ? 't-dir' : x.img ? 't-img' : x.url ? 't-url' : 't-file';
    const label = esc(name) + (x.type === 'dir' ? '/' : '');
    if (!long) return `<span class="${cls}">${label}</span>`;
    const perm = x.type === 'dir' ? 'drwxr-xr-x' : '-rw-r--r--';
    const size = x.type === 'dir' ? 4096 : (x.content || x.img || x.pdf || '').length * 7;
    return `<span class="t-dim">${perm} 1 marcus marcus ${String(size).padStart(6)}</span> <span class="${cls}">${label}</span>`;
  });
  return long ? items.join('\n') : `<span class="t-grid">${items.join('')}</span>`;
}
function treeOf(path, prefix = '', depth = 0) {
  const n = getNode(path);
  let out = '';
  const kids = sortedEntries(n);
  kids.forEach(([name, x], i) => {
    const last = i === kids.length - 1;
    const cls = x.type === 'dir' ? 't-dir' : x.img ? 't-img' : 't-file';
    if (x.type === 'dir' && name === 'screenshots') {
      out += `${prefix}${last ? '└── ' : '├── '}<span class="${cls}">${name}/</span> <span class="t-dim">(${Object.keys(x.children).length} images)</span>\n`;
      return;
    }
    out += `${prefix}${last ? '└── ' : '├── '}<span class="${cls}">${esc(name)}${x.type === 'dir' ? '/' : ''}</span>\n`;
    if (x.type === 'dir' && depth < 3) out += treeOf(path + '/' + name, prefix + (last ? '    ' : '│   '), depth + 1);
  });
  return out;
}
function goSection(id) {
  const el = $('#' + id);
  if (!el) return false;
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
  return true;
}
function openInExplorer(path) {
  const n = getNode(path);
  goSection('files');
  if (n.type === 'dir') fmGo(path);
  else { fmGo(parentOf(path)); setTimeout(() => openViewer(path), reduce ? 0 : 500); }
}

const logEvent = (sev, msg) => term.events.push([new Date(), sev, msg]);
function offensive(tool) {
  logEvent('HIGH', `offensive tool launched: ${tool}`);
  if (team === 'red') return `<span class="t-b">[red team]</span> ${esc(tool)} loaded. checking rules of engagement…
<span class="t-ok">[+]</span> written sign-off: yes   <span class="t-ok">[+]</span> scope: marcus.wong (127.0.0.1) only
<span class="t-warn">[!]</span> no exploitable targets in scope. this portfolio is the target, and it's read-only.
<span class="t-dim">red team rule: attack only what the client agreed to, then report everything.</span> try <span class="t-cy">nmap</span>`;
  if (team === 'green') return `<span class="t-b">[green hat]</span> easy there. ${esc(tool)} is powerful stuff.
<span class="t-cy">tip:</span> practise it in your own lab or a legal practice range first, never on live targets.
<span class="t-dim">the rules:</span> <span class="t-cy">man ethics</span>   <span class="t-dim">what got noticed:</span> <span class="t-cy">logs</span>`;
  return `<span class="t-err">[!] scope check failed:</span> no written authorisation for this target.
<span class="t-dim">This is a white hat box. Offensive tools only run against systems you own
or are explicitly permitted to test. Try</span> <span class="t-cy">man ethics</span> <span class="t-dim">or</span> <span class="t-cy">hat red</span>`;
}

const CMDS = {
  help: () => `<span class="t-b">navigation</span>   ls [-l] [dir]  cd &lt;dir&gt;  pwd  tree  cat &lt;file&gt;  open &lt;path&gt;
<span class="t-b">about me</span>     whoami  neofetch  about  projects  skills  certs  experience  resume  contact
<span class="t-b">security</span>     hat [white|red|green]  nmap  logs  man ethics  sudo
<span class="t-b">system</span>       clear  history  echo  date  uname [-a]  id  goto &lt;section&gt;  exit
<span class="t-dim">tab completes, ↑/↓ for history, ctrl+l clears, ctrl+c cancels</span>`,
  ls: args => {
    const long = args.some(a => /^-\w*l/.test(a));
    const target = args.find(a => !a.startsWith('-'));
    const p = resolve(target || '.', term.cwd);
    return lsLine(p, long) ?? `<span class="t-err">ls: cannot access '${esc(target)}': No such file or directory</span>`;
  },
  ll: args => CMDS.ls(['-l', ...args]),
  cd: args => {
    const p = resolve(args[0] || '~', term.cwd), n = getNode(p);
    if (!n) return `<span class="t-err">cd: ${esc(args[0])}: No such file or directory</span>`;
    if (n.type !== 'dir') return `<span class="t-err">cd: ${esc(args[0])}: Not a directory</span>`;
    term.cwd = p; return '';
  },
  pwd: () => term.cwd,
  tree: args => {
    const p = resolve(args[0] || '.', term.cwd), n = getNode(p);
    if (!n || n.type !== 'dir') return `<span class="t-err">tree: ${esc(args[0] || '.')}: not a directory</span>`;
    return `<span class="t-dir">${esc(pretty(p))}</span>\n` + treeOf(p).trimEnd();
  },
  cat: args => {
    if (!args.length) return '<span class="t-err">cat: missing file operand</span>';
    return args.map(a => {
      const n = getNode(resolve(a, term.cwd));
      if (!n) return `<span class="t-err">cat: ${esc(a)}: No such file or directory</span>`;
      if (n.type === 'dir') return `<span class="t-err">cat: ${esc(a)}: Is a directory</span>`;
      if (n.img || n.pdf) return `<span class="t-warn">cat: ${esc(a)}: binary file. try</span> <span class="t-cy">open ${esc(a)}</span>`;
      return esc(n.content);
    }).join('\n');
  },
  open: args => {
    const p = resolve(args[0] || '.', term.cwd);
    if (!getNode(p)) return `<span class="t-err">open: ${esc(args[0])}: No such file or directory</span>`;
    openInExplorer(p);
    return `<span class="t-ok">opening ${esc(pretty(p))} in file manager…</span>`;
  },
  'xdg-open': a => CMDS.open(a), thunar: a => CMDS.open(a),
  clear: () => { tOut.innerHTML = ''; return null; },
  whoami: () => 'marcus',
  id: () => 'uid=1000(marcus) gid=1000(marcus) groups=1000(marcus),27(sudo),1337(white-hat)',
  uname: args => args.includes('-a') ? 'Linux kali 6.x-kali-amd64 #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux' : 'Linux',
  date: () => new Date().toString(),
  echo: args => esc(args.join(' ')),
  history: () => term.hist.map((h, i) => `${String(i + 1).padStart(4)}  ${esc(h)}`).join('\n'),
  neofetch: () => {
    const art = ['   .-~~~~~~~-.   ', ' .\'  _______  \'. ', '/   |       |   \\', '|   |_______|   |', '|_______________|', '(_______________)'];
    const info = [
      `<span class="t-b">${T().user}</span>@<span class="t-b">${T().host}</span>`, '<span class="t-dim">-----------</span>',
      `<span class="t-b">OS</span>: Marcus Wong · ${T().os}`,
      '<span class="t-b">Education</span>: Dip. Computer Engineering, Temasek Poly',
      '<span class="t-b">Focus</span>: network security, secure IoT, data privacy',
      '<span class="t-b">Projects</span>: ' + PROJECTS.length + ' (ls ~/projects)'
    ];
    return art.map((a, i) => `<span class="t-b">${esc(a)}</span>  ${info[i] || ''}`).join('\n');
  },
  about: () => esc(getNode(HOME + '/about.txt').content),
  projects: () => { term.cwd = HOME + '/projects'; return lsLine(term.cwd) + '\n<span class="t-dim">tip: cd into one and cat README.md, or</span> <span class="t-cy">open .</span>'; },
  skills: () => '<span class="t-dir">~/skills</span>\n' + treeOf(HOME + '/skills').trimEnd(),
  experience: () => esc(getNode(HOME + '/experience.log').content),
  certs: () => { term.cwd = HOME + '/certificates'; return lsLine(term.cwd) + '\n<span class="t-dim">view one:</span> <span class="t-cy">open ' + CERTS[0].file + '</span>'; },
  resume: () => { openInExplorer(HOME + '/resume.pdf'); return '<span class="t-ok">opening resume.pdf…</span>'; },
  contact: () => { goSection('contact'); setTimeout(() => $('#name').focus({ preventScroll: true }), reduce ? 0 : 700); return '<span class="t-ok">opening secure channel → ./contact</span>'; },
  goto: args => goSection((args[0] || '').replace(/^#/, '')) ? '' : '<span class="t-err">goto: sections are home, about, experience, files, contact</span>',
  nmap: args => {
    const tgt = (args.filter(a => !a.startsWith('-'))[0] || 'localhost').toLowerCase();
    if (!/^(localhost|127\.0\.0\.1|marcus|marcus\.wong|kali|lab)$/.test(tgt)) {
      logEvent('MED', `out-of-scope scan attempted: ${tgt}`);
      return team === 'red'
        ? `<span class="t-err">[red team] ${esc(tgt)} is out of scope.</span> <span class="t-dim">scanning it without sign-off is just crime with extra steps.</span>`
        : offensive('nmap ' + tgt);
    }
    logEvent('LOW', 'port scan of marcus.wong (in scope)');
    const head = team === 'red' ? '<span class="t-b">[red team] recon · target in scope · sign-off on file</span>\n'
      : team === 'green' ? '<span class="t-b">[green hat] practising recon on my own box</span>\n' : '';
    const tail = team === 'red' ? '<span class="t-warn">next step:</span> document findings, do not exploit without approval.'
      : team === 'green' ? '<span class="t-cy">tip:</span> -sV adds service versions. only scan hosts you own or have permission to test.'
      : '<span class="t-dim">Nmap done: 1 IP address (1 host up). Scanned with permission, obviously.</span>';
    return `${head}Starting Nmap ( https://nmap.org ) at ${new Date().toLocaleString()}
Nmap scan report for marcus.wong (127.0.0.1)
Host is up (0.00042s latency).

<span class="t-b">PORT      STATE  SERVICE</span>
22/tcp    <span class="t-ok">open</span>   github      → github.com/Yuutsuuu
25/tcp    <span class="t-ok">open</span>   message     → run: contact
443/tcp   <span class="t-ok">open</span>   linkedin    → linkedin.com/in/marcus-wong-0788242aa
8080/tcp  <span class="t-ok">open</span>   resume      → run: resume

${tail}`;
  },
  logs: () => {
    if (team === 'red') return '<span class="t-dim">red team doesn\'t read the logs, it tries to stay out of them.</span> switch sides: <span class="t-cy">hat white</span>';
    const fmt = d => d.toTimeString().slice(0, 8);
    const sevC = { HIGH: 't-err', MED: 't-warn', LOW: 't-cy', INFO: 't-dim' };
    const base = [[new Date(Date.now() - 6e4), 'INFO', 'visitor session opened · tls ok'], [new Date(Date.now() - 3e4), 'INFO', 'file manager accessed ~/projects']];
    const rows = [...base, ...term.events].map(([d, sev, m]) => `${fmt(d)}  <span class="${sevC[sev]}">${sev.padEnd(4)}</span>  ${esc(m)}`);
    return `<span class="t-b">[soc] tail -f /var/log/soc/visitor.log</span>
${rows.join('\n')}
<span class="t-dim">${term.events.length ? term.events.length + ' event(s) from your session. try something sneaky and run logs again.' : 'all quiet. try nmap or hack, then come back.'}</span>`;
  },
  man: args => args[0] === 'ethics'
    ? esc(getNode(HOME + '/skills/security/code-of-conduct.txt').content)
    : `<span class="t-dim">What manual page do you want? try</span> <span class="t-cy">man ethics</span>`,
  hat: args => {
    const t = (args[0] || '').toLowerCase().replace(/^(hat|team)$/, '');
    if (!t) return `current: <span class="t-b">${T().label}</span>\nusage: hat white | hat red | hat green   <span class="t-dim">(more: cat ~/skills/security/teams.md)</span>`;
    if (t === 'black') { logEvent('HIGH', 'attempted switch to black hat'); return '<span class="t-err">black hat: permission denied.</span> <span class="t-dim">not on this box.</span>'; }
    if (!TEAMS[t]) return `<span class="t-err">hat: unknown team '${esc(t)}'</span>  usage: hat white | red | green`;
    setTeam(t);
    return { white: '<span class="t-ok">[*] white hat mode.</span> ethical hacking, permission first.',
      red: '<span class="t-ok">[*] red team engagement started.</span> you are now <span class="t-b">root</span>. scope: this site only.',
      green: '<span class="t-ok">[*] green hat mode.</span> curious, careful, always learning. try <span class="t-cy">nmap</span>.' }[t];
  },
  team: a => CMDS.hat(a),
  sudo: args => {
    const c = args.join(' ');
    if (/rm\s+-rf/.test(c)) { logEvent('HIGH', 'destructive command: sudo ' + c); return '<span class="t-warn">nice try. this box is read-only, and so is my sense of humour.</span>'; }
    if (!c) return 'usage: sudo &lt;command&gt;';
    logEvent('MED', 'privilege escalation: sudo ' + c);
    return `[sudo] password for ${T().user}: ********\n<span class="t-dim">permission granted, but there's nothing to escalate to here.</span>\n` + (runCmd(c) ?? '');
  },
  exit: () => { setTimeout(closeTerm, 150); return 'logout'; },
  hack: () => offensive('hack'), msfconsole: () => offensive('msfconsole'), hydra: () => offensive('hydra'), sqlmap: () => offensive('sqlmap'), metasploit: () => offensive('metasploit')
};

function parse(line) {
  return (line.match(/"[^"]*"|'[^']*'|\S+/g) || []).map(s => s.replace(/^["']|["']$/g, ''));
}
function runCmd(line) {
  const parts = line.split(/\s*&&\s*/);
  return parts.map(part => {
    const [cmd, ...args] = parse(part);
    if (!cmd) return '';
    const fn = Object.prototype.hasOwnProperty.call(CMDS, cmd) ? CMDS[cmd] : null;
    if (!fn) return `<span class="t-err">${esc(cmd)}: command not found</span> <span class="t-dim">(try help)</span>`;
    return fn(args);
  }).filter(x => x !== '' && x != null).join('\n');
}

tIn.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    const line = tIn.value;
    tPrint(`<span class="ps1">${ps1(term.cwd)}</span>\n<span class="dollar">└─${SIG()}</span> <span class="t-cmd">${esc(line)}</span>`);
    tIn.value = '';
    if (line.trim()) { term.hist.push(line); }
    term.hi = term.hist.length;
    const out = runCmd(line.trim());
    if (out) tPrint(out);
    tPrompt();
    tBody.scrollTop = tBody.scrollHeight;
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    if (term.hi > 0) { term.hi--; tIn.value = term.hist[term.hi]; }
  } else if (e.key === 'ArrowDown') {
    e.preventDefault();
    if (term.hi < term.hist.length - 1) { term.hi++; tIn.value = term.hist[term.hi]; } else { term.hi = term.hist.length; tIn.value = ''; }
  } else if (e.key === 'Tab') {
    e.preventDefault();
    complete();
  } else if (e.ctrlKey && e.key.toLowerCase() === 'l') {
    e.preventDefault(); tOut.innerHTML = '';
  } else if (e.ctrlKey && e.key.toLowerCase() === 'c') {
    if (getSelection().toString()) return;
    e.preventDefault();
    tPrint(`<span class="ps1">${ps1(term.cwd)}</span>\n<span class="dollar">└─${SIG()}</span> ${esc(tIn.value)}^C`);
    tIn.value = '';
  } else if (e.key === 'Escape') {
    tIn.blur();
  }
});

function complete() {
  const v = tIn.value;
  const parts = v.split(' ');
  const word = parts[parts.length - 1];
  let options;
  if (parts.length === 1) {
    options = Object.keys(CMDS).filter(c => c.startsWith(word));
  } else {
    const slash = word.lastIndexOf('/');
    const dirPart = slash >= 0 ? word.slice(0, slash + 1) : '';
    const stem = word.slice(slash + 1);
    const d = getNode(resolve(dirPart || '.', term.cwd));
    if (!d || d.type !== 'dir') return;
    options = Object.entries(d.children).filter(([n]) => n.startsWith(stem)).map(([n, x]) => dirPart + n + (x.type === 'dir' ? '/' : ''));
  }
  if (options.length === 1) {
    parts[parts.length - 1] = options[0] + (parts.length === 1 ? ' ' : '');
    tIn.value = parts.join(' ');
  } else if (options.length > 1) {
    let pre = options[0];
    options.forEach(o => { while (!o.startsWith(pre)) pre = pre.slice(0, -1); });
    parts[parts.length - 1] = pre;
    tIn.value = parts.join(' ');
    tPrint(`<span class="ps1">${ps1(term.cwd)}</span>\n<span class="dollar">└─${SIG()}</span> ${esc(v)}\n<span class="t-grid">${options.map(o => `<span>${esc(o.split('/').filter(Boolean).pop() + (o.endsWith('/') ? '/' : ''))}</span>`).join('')}</span>`);
  }
}

/* =========================================================
   CONTACT: encrypt animation + Formspree
   ========================================================= */
const form = $('#form'), fs = $('#fs'), msg = $('#msg'), cipher = $('#cipher'), tunnel = $('.tunnel'), hs = $('#hs');
msg.addEventListener('input', () => { $('#chars').textContent = new Blob([msg.value]).size + ' bytes'; });
const HEX = '0123456789abcdef';
async function encryptFx(text) {
  if (reduce) return;
  cipher.classList.add('on');
  const len = Math.max(48, Math.min(text.length * 2, 360));
  const target = Array.from({ length: len }, () => HEX[Math.random() * 16 | 0]).join('');
  for (let f = 0; f <= 14; f++) {
    const k = Math.floor(len * f / 14);
    cipher.textContent = target.slice(0, k) + text.slice(Math.floor(k / 2), Math.floor(len / 2));
    await sleep(45);
  }
  cipher.textContent = '-----BEGIN ENCRYPTED MESSAGE-----\n' + target + '\n-----END ENCRYPTED MESSAGE-----';
}
async function handshake() {
  tunnel.classList.add('hand');
  for (const s of ['SYN →', '← SYN-ACK', 'ACK →', 'key exchange…']) { hs.textContent = s; if (!reduce) await sleep(260); }
}
form.addEventListener('submit', async e => {
  e.preventDefault();
  const btn = form.querySelector('button');
  btn.disabled = true;
  btn.textContent = 'encrypting…';
  fs.className = ''; fs.textContent = '';
  await Promise.all([encryptFx(msg.value), handshake()]);
  btn.textContent = 'sending…';
  try {
    const res = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
    if (!res.ok) throw new Error(res.status);
    form.reset();
    $('#chars').textContent = '0 bytes';
    tunnel.classList.add('live');
    hs.textContent = 'channel established · delivered';
    fs.className = 'ok';
    fs.textContent = '[+] message delivered. I will reply soon.';
  } catch (err) {
    hs.textContent = 'connection reset';
    fs.className = 'er';
    fs.textContent = '[-] could not send. Try again, or message me on LinkedIn.';
  } finally {
    tunnel.classList.remove('hand');
    cipher.classList.remove('on');
    btn.disabled = false;
    btn.textContent = 'encrypt & send';
  }
});

/* =========================================================
   TEAM SWITCHER
   ========================================================= */
function applyTeamText() {
  const t = T();
  document.documentElement.dataset.team = team;
  $$('.ps1 .u, .nu').forEach(e => { e.textContent = t.user; });
  $$('.ps1 .h, .nh').forEach(e => { e.textContent = t.host; });
  $$('.sig').forEach(e => { e.textContent = t.sig; });
  $('#hatLabel').textContent = t.label;
  $('#hatNote').textContent = t.note;
  $('#giant').textContent = t.giant;
  $('#ledeTerm').textContent = t.lede;
  $('#osLine').textContent = t.os;
  $('#asciiMode').textContent = (t.label + ' mode').padEnd(14).slice(0, 14);
  $('#asciiNote').textContent = (team === 'red' ? 'in scope only' : team === 'green' ? 'still learning' : 'authorised only').padEnd(14).slice(0, 14);
  $$('#teams button, #teamPop [data-team]').forEach(b => b.setAttribute('aria-pressed', b.dataset.team === team));
  tPrompt();
}
function setTeam(name) {
  if (!TEAMS[name]) return;
  const changed = name !== team;
  team = name;
  try { localStorage.setItem('team', name); } catch {}
  applyTeamText();
  if (changed && !reduce) {
    const f = $('#flash');
    $('#flashTxt').textContent = `[ ${TEAMS[name].label} ]`;
    f.classList.remove('go'); void f.offsetWidth; f.classList.add('go');
  }
}
$$('#teams button, #teamPop [data-team]').forEach(b => b.addEventListener('click', () => {
  setTeam(b.dataset.team);
  if (!termEl.hidden) tPrint(`<span class="t-dim">[*] switched to ${T().label}</span>`);
}));
applyTeamText();

const teamHelp = $('#teamHelp'), teamPop = $('#teamPop');
function togglePop(open = teamPop.hidden) {
  teamPop.hidden = !open;
  teamHelp.setAttribute('aria-expanded', open);
}
teamHelp.addEventListener('click', e => { e.stopPropagation(); togglePop(); });
document.addEventListener('click', e => { if (!teamPop.hidden && !teamPop.contains(e.target)) togglePop(false); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !teamPop.hidden) { togglePop(false); teamHelp.focus(); } });
