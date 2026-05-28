/* =====================================================================
   MobileHack Lab — Main Application
   ===================================================================== */

/* ── State ───────────────────────────────────────────────────────────── */
const state = {
  page: 'dashboard',
  pathId: null,
  roomId: null,
  taskIdx: 0,
  progress: {}, // { roomId: { completedTasks: [], answers: {} } }
  xp: 0,
  achievements: new Set(),
  ctfSolved: new Set(),
};

/* ── Persistence ─────────────────────────────────────────────────────── */
function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem('mobilehack_state') || '{}');
    if (saved.progress)     state.progress     = saved.progress;
    if (saved.xp !== undefined) state.xp       = saved.xp;
    if (saved.achievements) state.achievements = new Set(saved.achievements);
    if (saved.ctfSolved)    state.ctfSolved    = new Set(saved.ctfSolved);
  } catch(e) { /* ignore */ }
}
function saveState() {
  try {
    localStorage.setItem('mobilehack_state', JSON.stringify({
      progress:     state.progress,
      xp:           state.xp,
      achievements: [...state.achievements],
      ctfSolved:    [...state.ctfSolved],
    }));
  } catch(e) { /* ignore */ }
}

/* ── Terminal instance ───────────────────────────────────────────────── */
let terminal = null;

/* ── Helpers ─────────────────────────────────────────────────────────── */
function getRoomProgress(roomId) {
  return state.progress[roomId] || { completedTasks: [], answers: {} };
}
function getTaskXP(task) { return task.xp || 20; }

function totalXPForRoom(room) {
  return (room.tasks || []).reduce((s, t) => s + getTaskXP(t), 0);
}
function earnedXPForRoom(room) {
  const prog = getRoomProgress(room.id);
  return (room.tasks || [])
    .filter(t => prog.completedTasks.includes(t.id))
    .reduce((s, t) => s + getTaskXP(t), 0);
}
function roomCompletionPct(room) {
  if (!room.tasks || !room.tasks.length) return 0;
  const prog = getRoomProgress(room.id);
  return Math.round(100 * prog.completedTasks.length / room.tasks.length);
}

function pathCompletionPct(pathId) {
  const path = PATHS[pathId];
  if (!path) return 0;
  let done = 0, total = 0;
  path.rooms_list.forEach(rid => {
    const room = ROOMS[rid];
    if (!room || !room.tasks) return;
    total += room.tasks.length;
    done  += getRoomProgress(rid).completedTasks.length;
  });
  return total ? Math.round(100 * done / total) : 0;
}

function getRank() {
  const x = state.xp;
  let rank = RANKS[0];
  for (const r of RANKS) { if (x >= r.minXP) rank = r; }
  return rank;
}
function getRankClass(name) {
  const map = { NOVICE: 'rank-novice', STUDENT: 'rank-student', HACKER: 'rank-hacker', 'ELITE HACKER': 'rank-elite', MASTER: 'rank-master' };
  return map[name] || 'rank-novice';
}

function countCompletedTasks() {
  return Object.values(state.progress).reduce((s, p) => s + (p.completedTasks || []).length, 0);
}
function countCompletedRooms() {
  return Object.entries(ROOMS).filter(([id, room]) => {
    if (!room.tasks || !room.tasks.length) return false;
    const prog = getRoomProgress(id);
    return prog.completedTasks.length === room.tasks.length;
  }).length;
}

function esc(str) {
  return String(str || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

/* ── XP & Achievements ───────────────────────────────────────────────── */
function awardXP(amount, label) {
  state.xp += amount;
  updateNavXP();
  saveState();
  showToast(`+${amount} XP — ${label}`, 'xp', 'fas fa-bolt');
}

function checkAchievements() {
  const done = countCompletedTasks();
  const roomsDone = countCompletedRooms();
  const tryUnlock = (id, cond) => {
    if (cond && !state.achievements.has(id)) {
      state.achievements.add(id);
      const ach = ACHIEVEMENTS.find(a => a.id === id);
      if (ach) showToast(`Achievement Unlocked: ${ach.icon} ${ach.name}`, 'info', 'fas fa-trophy');
      saveState();
    }
  };
  tryUnlock('first_blood',  done >= 1);
  tryUnlock('android_init', Object.keys(state.progress).some(k => k.startsWith('android')));
  tryUnlock('ios_init',     Object.keys(state.progress).some(k => k.startsWith('ios')));
  tryUnlock('net_sniffer',  Object.keys(state.progress).some(k => k.startsWith('network')));
  tryUnlock('ctf_1',        state.ctfSolved.size >= 1);
  tryUnlock('ctf_5',        state.ctfSolved.size >= 5);
  tryUnlock('completionist', roomsDone >= 5);
}

function updateNavXP() {
  const xpEl = document.getElementById('nav-xp');
  if (xpEl) xpEl.textContent = state.xp;
  const rankEl = document.getElementById('nav-rank');
  const rank = getRank();
  if (rankEl) { rankEl.textContent = rank.name; rankEl.className = 'rank-badge ' + getRankClass(rank.name); }
}

/* ── Toast ───────────────────────────────────────────────────────────── */
function showToast(msg, type = 'info', icon = 'fas fa-info-circle') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.innerHTML = `<i class="${icon}"></i><span>${esc(msg)}</span>`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}

/* ── Navigation ──────────────────────────────────────────────────────── */
function navigate(page, params = {}) {
  state.page   = page;
  state.pathId = params.pathId || null;
  state.roomId = params.roomId || null;

  // Update sidebar active state
  document.querySelectorAll('.sidebar-item').forEach(el => {
    el.classList.remove('active');
    if (el.dataset.page === page) {
      if (page === 'path' && el.dataset.path !== state.pathId) return;
      el.classList.add('active');
    }
  });

  const main = document.getElementById('main-content');
  main.innerHTML = '';

  switch (page) {
    case 'dashboard': renderDashboard(main); break;
    case 'paths':     renderPaths(main);     break;
    case 'path':      renderPath(main, state.pathId); break;
    case 'room':      renderRoom(main, state.roomId); break;
    case 'ctf':       renderCTF(main);       break;
    case 'tools':     renderTools(main);     break;
    case 'profile':   renderProfile(main);   break;
    default:          renderDashboard(main);
  }

  updateBreadcrumb();
  updateNavXP();
}

function updateBreadcrumb() {
  const bc = document.getElementById('breadcrumb');
  if (!bc) return;
  let html = '';
  if (state.page === 'path' && state.pathId) {
    const path = PATHS[state.pathId];
    html = `<span class="bc-item" data-page="paths" style="cursor:pointer">Paths</span>
            <span class="bc-sep"><i class="fas fa-chevron-right"></i></span>
            <span class="bc-item bc-current">${esc(path ? path.title : state.pathId)}</span>`;
  } else if (state.page === 'room' && state.roomId) {
    const room = ROOMS[state.roomId];
    const path = room ? PATHS[room.path] : null;
    html = `<span class="bc-item" style="cursor:pointer" data-page="paths">Paths</span>
            <span class="bc-sep"><i class="fas fa-chevron-right"></i></span>
            <span class="bc-item" style="cursor:pointer" data-page="path" data-path="${esc(room ? room.path : '')}">${esc(path ? path.title : '')}</span>
            <span class="bc-sep"><i class="fas fa-chevron-right"></i></span>
            <span class="bc-item bc-current">${esc(room ? room.title : state.roomId)}</span>`;
  }
  bc.innerHTML = html;
  bc.querySelectorAll('[data-page]').forEach(el => {
    el.addEventListener('click', () => navigate(el.dataset.page, { pathId: el.dataset.path }));
  });
}

/* ── Dashboard ───────────────────────────────────────────────────────── */
function renderDashboard(el) {
  const done = countCompletedTasks();
  const rooms = countCompletedRooms();
  const totalRooms = Object.values(ROOMS).filter(r => r.tasks && r.tasks.length).length;

  el.innerHTML = `
  <div class="fade-in">
    <div class="dashboard-hero">
      <div class="hero-label">InfoEnc Security — Mobile Hacking Lab</div>
      <h1 class="hero-title">Master <span class="hl">Mobile</span> Security<br>From Zero to Professional</h1>
      <p class="hero-sub">Hands-on labs covering Android & iOS hacking, network analysis, and real-world mobile CTF challenges. Learn by doing — every room has an interactive terminal.</p>
      <div class="hero-actions">
        <button class="btn btn--primary btn--lg" id="hero-start-btn"><i class="fab fa-android"></i> Start Android Path</button>
        <button class="btn btn--ghost btn--lg" data-page="paths"><i class="fas fa-route"></i> Browse All Paths</button>
      </div>
    </div>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon stat-icon--green"><i class="fas fa-check-circle"></i></div>
        <div><div class="stat-value">${done}</div><div class="stat-label">Tasks Completed</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon stat-icon--blue"><i class="fas fa-door-open"></i></div>
        <div><div class="stat-value">${rooms}/${totalRooms}</div><div class="stat-label">Rooms Completed</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon stat-icon--purple"><i class="fas fa-flag"></i></div>
        <div><div class="stat-value">${state.ctfSolved.size}/10</div><div class="stat-label">CTF Flags Captured</div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon stat-icon--yellow"><i class="fas fa-bolt"></i></div>
        <div><div class="stat-value">${state.xp}</div><div class="stat-label">Total XP</div></div>
      </div>
    </div>

    <div class="section-header">
      <h2 class="section-title"><i class="fas fa-route"></i> Learning Paths</h2>
      <button class="btn btn--ghost btn--sm" data-page="paths">View All</button>
    </div>
    <div class="path-cards-grid">
      ${Object.values(PATHS).map(p => `
        <div class="path-card path-card--${p.id}" data-path="${p.id}">
          <div class="path-card-icon"><i class="${p.icon}"></i></div>
          <div class="path-card-title">${esc(p.title)}</div>
          <div class="path-card-desc">${esc(p.description.substring(0,120))}...</div>
          <div class="path-card-meta">
            <span><i class="fas fa-door-open"></i> ${p.rooms} Rooms</span>
            <span><i class="fas fa-clock"></i> ${p.duration}</span>
          </div>
          <div class="progress-bar-wrap">
            <div class="progress-bar-fill" style="width:${pathCompletionPct(p.id)}%"></div>
          </div>
        </div>`).join('')}
    </div>

    <div class="dashboard-grid">
      <div class="card">
        <div class="section-title" style="margin-bottom:16px"><i class="fas fa-trophy"></i> Recent Achievements</div>
        ${state.achievements.size === 0
          ? '<p style="color:var(--text-muted);font-size:.82rem">Complete tasks to unlock achievements.</p>'
          : ACHIEVEMENTS.filter(a => state.achievements.has(a.id)).slice(0,4).map(a => `
            <div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--border)">
              <span style="font-size:1.2rem">${a.icon}</span>
              <div><div style="font-size:.82rem;font-weight:700;color:var(--text-primary)">${esc(a.name)}</div>
              <div style="font-size:.72rem;color:var(--text-muted)">${esc(a.desc)}</div></div>
            </div>`).join('')}
      </div>
      <div class="card">
        <div class="section-title" style="margin-bottom:16px"><i class="fas fa-flag"></i> CTF Progress</div>
        <div style="margin-bottom:12px">
          <div style="display:flex;justify-content:space-between;font-size:.78rem;color:var(--text-muted);margin-bottom:6px">
            <span>${state.ctfSolved.size} / 10 Solved</span>
            <span>${Math.round(state.ctfSolved.size*100/10)}%</span>
          </div>
          <div class="progress-bar-wrap"><div class="progress-bar-fill" style="width:${Math.round(state.ctfSolved.size*100/10)}%;background:var(--accent-red)"></div></div>
        </div>
        <button class="btn btn--outline btn--sm" data-page="ctf"><i class="fas fa-flag"></i> Go to CTF Challenges</button>
      </div>
    </div>
  </div>`;

  el.querySelector('#hero-start-btn').addEventListener('click', () => navigate('path', { pathId: 'android' }));
  el.querySelectorAll('[data-page]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      navigate(btn.dataset.page, { pathId: btn.dataset.path });
    });
  });
  el.querySelectorAll('.path-card[data-path]').forEach(card => {
    card.addEventListener('click', () => navigate('path', { pathId: card.dataset.path }));
  });
}

/* ── Paths Overview ──────────────────────────────────────────────────── */
function renderPaths(el) {
  el.innerHTML = `
  <div class="fade-in">
    <div class="section-header">
      <h1 class="section-title" style="font-size:1.3rem"><i class="fas fa-route"></i> All Learning Paths</h1>
    </div>
    ${Object.values(PATHS).map(p => `
    <div style="background:${p.bgGradient};border:1px solid var(--border-light);border-radius:var(--radius-lg);padding:28px 32px;margin-bottom:20px;cursor:pointer" class="path-overview-hero" data-path="${p.id}">
      <div class="path-overview-icon" style="background:rgba(0,0,0,.2);color:${p.color}"><i class="${p.icon}"></i></div>
      <div style="flex:1">
        <div class="path-overview-title" style="color:${p.color}">${esc(p.title)}</div>
        <div style="font-size:.8rem;color:var(--text-secondary);margin-bottom:4px">${esc(p.subtitle)}</div>
        <div class="path-overview-desc">${esc(p.description)}</div>
        <div class="path-overview-meta">
          <span><i class="fas fa-door-open" style="color:${p.color}"></i> ${p.rooms} Rooms</span>
          <span><i class="fas fa-clock" style="color:${p.color}"></i> ${p.duration}</span>
          <span><i class="fas fa-signal" style="color:${p.color}"></i> ${p.difficulty}</span>
          <span><i class="fas fa-chart-line" style="color:${p.color}"></i> ${pathCompletionPct(p.id)}% Complete</span>
        </div>
      </div>
      <button class="btn btn--outline btn--sm" style="border-color:${p.color};color:${p.color};flex-shrink:0">Explore <i class="fas fa-arrow-right"></i></button>
    </div>`).join('')}
  </div>`;

  el.querySelectorAll('.path-overview-hero[data-path]').forEach(card => {
    card.addEventListener('click', () => navigate('path', { pathId: card.dataset.path }));
  });
}

/* ── Single Path ─────────────────────────────────────────────────────── */
function renderPath(el, pathId) {
  const path = PATHS[pathId];
  if (!path) { navigate('paths'); return; }

  const roomCards = path.rooms_list.map((rid, i) => {
    const room = ROOMS[rid];
    if (!room) return '';
    const pct = roomCompletionPct(room);
    const locked = room.locked;
    return `
    <div class="room-card ${locked ? 'room-card--locked' : ''}" data-room="${rid}" style="${locked ? 'opacity:.5;cursor:not-allowed' : ''}">
      <div class="room-card-header">
        <div class="room-card-icon" style="background:${room.iconBg};color:${room.iconColor}">
          <i class="${locked ? 'fas fa-lock' : room.iconClass}"></i>
        </div>
        <div style="flex:1">
          <div style="font-size:.7rem;font-family:var(--font-mono);color:var(--text-muted);margin-bottom:3px">ROOM ${i+1}</div>
          <div class="room-card-title">${esc(room.title)}</div>
        </div>
        ${pct === 100 ? '<i class="fas fa-circle-check" style="color:var(--success);font-size:1.1rem"></i>' : ''}
      </div>
      <div class="room-card-desc">${esc(room.description)}</div>
      <div style="margin:8px 0">
        <div style="display:flex;justify-content:space-between;font-size:.72rem;color:var(--text-muted);margin-bottom:5px">
          <span>${getRoomProgress(rid).completedTasks.length}/${room.tasks ? room.tasks.length : 0} tasks</span>
          <span>${pct}%</span>
        </div>
        <div class="progress-bar-wrap"><div class="progress-bar-fill" style="width:${pct}%;background:${room.iconColor}"></div></div>
      </div>
      <div class="room-card-footer">
        <span class="difficulty-badge diff--${room.difficulty}">${esc(room.difficulty)}</span>
        <span class="xp-tag"><i class="fas fa-bolt"></i> ${room.xpReward} XP</span>
      </div>
    </div>`;
  }).join('');

  el.innerHTML = `
  <div class="fade-in">
    <div style="background:${path.bgGradient};border:1px solid var(--border-light);border-radius:var(--radius-lg);padding:28px 32px;margin-bottom:28px;display:flex;align-items:center;gap:20px">
      <div style="width:64px;height:64px;border-radius:16px;display:flex;align-items:center;justify-content:center;font-size:1.8rem;background:rgba(0,0,0,.2);color:${path.color};flex-shrink:0">
        <i class="${path.icon}"></i>
      </div>
      <div style="flex:1">
        <div style="font-size:1.5rem;font-weight:800;color:${path.color};margin-bottom:4px">${esc(path.title)}</div>
        <div style="font-size:.85rem;color:var(--text-secondary);line-height:1.7;max-width:600px;margin-bottom:10px">${esc(path.description)}</div>
        <div style="display:flex;gap:20px;font-size:.78rem;color:var(--text-muted)">
          <span><i class="fas fa-door-open" style="color:${path.color}"></i> ${path.rooms} Rooms</span>
          <span><i class="fas fa-clock" style="color:${path.color}"></i> ${path.duration}</span>
          <span><i class="fas fa-chart-line" style="color:${path.color}"></i> ${pathCompletionPct(pathId)}% Complete</span>
        </div>
      </div>
    </div>
    <div class="section-header">
      <h2 class="section-title"><i class="fas fa-door-open"></i> Rooms</h2>
    </div>
    <div class="rooms-grid">${roomCards}</div>
  </div>`;

  el.querySelectorAll('.room-card[data-room]').forEach(card => {
    if (!card.dataset.room || ROOMS[card.dataset.room]?.locked) return;
    card.addEventListener('click', () => navigate('room', { roomId: card.dataset.room }));
  });
}

/* ── Room Detail ─────────────────────────────────────────────────────── */
function renderRoom(el, roomId) {
  const room = ROOMS[roomId];
  if (!room) { navigate('dashboard'); return; }
  const path = PATHS[room.path];
  const prog = getRoomProgress(roomId);

  const taskItems = (room.tasks || []).map((t, i) => {
    const done = prog.completedTasks.includes(t.id);
    return `
    <div class="task-list-item ${done ? 'completed' : ''}" data-task-idx="${i}">
      <div class="task-num">${i+1}</div>
      <div class="task-info">
        <div class="task-info-title">${esc(t.title)}</div>
        <div class="task-info-sub">${getTaskXP(t)} XP${t.questions ? ` · ${t.questions.length} question${t.questions.length>1?'s':''}` : ''}</div>
      </div>
      ${done ? '<i class="fas fa-circle-check task-check"></i>' : ''}
    </div>`;
  }).join('');

  el.innerHTML = `
  <div class="fade-in">
    <div class="room-detail-header">
      <div class="room-detail-icon" style="background:${room.iconBg};color:${room.iconColor}">
        <i class="${room.iconClass}"></i>
      </div>
      <div style="flex:1">
        <div class="room-detail-title">${esc(room.title)}</div>
        <div class="room-detail-desc">${esc(room.description)}</div>
        <div class="room-detail-meta">
          <span><i class="fas fa-layer-group"></i> ${(room.tasks||[]).length} Tasks</span>
          <span><i class="fas fa-bolt"></i> ${room.xpReward} XP Total</span>
          <span><i class="fas fa-signal"></i> ${esc(room.difficulty)}</span>
          <span><i class="fas fa-chart-bar"></i> ${roomCompletionPct(room)}% Complete</span>
          ${path ? `<span><i class="${path.icon}"></i> ${esc(path.title)}</span>` : ''}
        </div>
      </div>
      <button class="btn btn--primary" id="start-room-btn"><i class="fas fa-play"></i> ${prog.completedTasks.length ? 'Continue' : 'Start Room'}</button>
    </div>

    <div style="display:grid;grid-template-columns:1fr 2fr;gap:20px">
      <div>
        <div class="section-header"><h2 class="section-title"><i class="fas fa-list-check"></i> Tasks</h2></div>
        <div class="task-list">${taskItems}</div>
      </div>
      <div>
        <div class="section-header"><h2 class="section-title"><i class="fas fa-info-circle"></i> About this Room</h2></div>
        <div class="card">
          <p style="font-size:.85rem;color:var(--text-secondary);line-height:1.75;margin-bottom:16px">${esc(room.description)}</p>
          <div style="display:flex;gap:16px;flex-wrap:wrap">
            <div style="flex:1;min-width:120px">
              <div style="font-size:.68rem;color:var(--text-muted);letter-spacing:1px;margin-bottom:6px">DIFFICULTY</div>
              <span class="difficulty-badge diff--${room.difficulty}">${esc(room.difficulty)}</span>
            </div>
            <div style="flex:1;min-width:120px">
              <div style="font-size:.68rem;color:var(--text-muted);letter-spacing:1px;margin-bottom:6px">REWARD</div>
              <span style="font-family:var(--font-mono);font-size:.85rem;font-weight:700;color:var(--accent-yellow)">
                <i class="fas fa-bolt"></i> ${room.xpReward} XP
              </span>
            </div>
          </div>
        </div>
        ${prog.completedTasks.length > 0 ? `
        <div class="card" style="margin-top:16px">
          <div style="font-size:.82rem;font-weight:700;color:var(--text-primary);margin-bottom:10px">Your Progress</div>
          <div style="margin-bottom:8px">
            <div style="display:flex;justify-content:space-between;font-size:.73rem;color:var(--text-muted);margin-bottom:5px">
              <span>${prog.completedTasks.length}/${(room.tasks||[]).length} tasks done</span>
              <span>${roomCompletionPct(room)}%</span>
            </div>
            <div class="progress-bar-wrap"><div class="progress-bar-fill" style="width:${roomCompletionPct(room)}%;background:${room.iconColor}"></div></div>
          </div>
        </div>` : ''}
      </div>
    </div>
  </div>`;

  el.querySelector('#start-room-btn').addEventListener('click', () => openLab(roomId, prog.completedTasks.length || 0));

  el.querySelectorAll('.task-list-item[data-task-idx]').forEach(item => {
    item.addEventListener('click', () => openLab(roomId, parseInt(item.dataset.taskIdx)));
  });
}

/* ── Lab Overlay ─────────────────────────────────────────────────────── */
function openLab(roomId, taskIdx = 0) {
  const room = ROOMS[roomId];
  if (!room || !room.tasks || !room.tasks.length) return;

  state.roomId = roomId;
  state.taskIdx = Math.min(taskIdx, room.tasks.length - 1);

  const overlay = document.getElementById('lab-overlay');
  overlay.classList.remove('hidden');
  document.body.style.overflow = 'hidden';

  document.getElementById('lab-room-name').textContent = room.title;

  // Init terminal
  if (!terminal) {
    terminal = new Terminal(
      document.getElementById('terminal-output'),
      document.getElementById('terminal-input'),
      document.getElementById('terminal-prompt')
    );
    document.getElementById('terminal-clear-btn').addEventListener('click', () => terminal.clear());
  }

  renderLabTask();

  // Keyboard shortcuts
  document.getElementById('lab-exit-btn').onclick    = closeLab;
  document.getElementById('lab-next-btn').onclick    = labNextTask;
  document.getElementById('lab-prev-btn').onclick    = labPrevTask;

  document.getElementById('terminal-input').focus();
}

function closeLab() {
  const overlay = document.getElementById('lab-overlay');
  overlay.classList.add('hidden');
  document.body.style.overflow = '';
  // Re-render room page to reflect progress
  if (state.roomId) navigate('room', { roomId: state.roomId });
}

function renderLabTask() {
  const room = ROOMS[state.roomId];
  const task = room.tasks[state.taskIdx];
  if (!task) return;

  // Update topbar
  document.getElementById('lab-task-name').textContent = task.title;
  const total = room.tasks.length;
  const idx   = state.taskIdx;
  document.getElementById('lab-task-counter').textContent = `${idx+1} / ${total}`;
  document.getElementById('lab-task-progress').style.width = `${Math.round(100*(idx+1)/total)}%`;
  document.getElementById('lab-prev-btn').disabled = idx === 0;
  document.getElementById('lab-next-btn').textContent = idx === total-1 ? 'Finish ' : 'Next ';
  document.getElementById('lab-next-btn').innerHTML = idx === total-1
    ? 'Finish <i class="fas fa-check"></i>'
    : 'Next <i class="fas fa-chevron-right"></i>';

  // Theory content
  document.getElementById('lab-theory-content').innerHTML = task.content || '';

  // Questions
  renderLabQuestions(room, task);

  // Terminal
  terminal.setCommands(task.terminalCommands || {}, 'attacker@mobilehack:~$');
}

function renderLabQuestions(room, task) {
  const container = document.getElementById('lab-questions');
  if (!task.questions || !task.questions.length) { container.innerHTML = ''; return; }

  const prog = getRoomProgress(room.id);
  const answers = prog.answers || {};

  container.innerHTML = `<div class="lab-questions-title"><i class="fas fa-question-circle"></i> Questions</div>` +
    task.questions.map((q, qi) => {
      const key = `${task.id}_${qi}`;
      const solved = answers[key] === true;
      return `
      <div class="question-item">
        <div class="question-text"><strong>Q${qi+1}.</strong> ${esc(q.q)}</div>
        <div class="question-input-row">
          <input type="text" class="question-input ${solved ? 'correct' : ''}"
            id="q-input-${qi}" placeholder="${solved ? '✓ Answered' : 'Your answer...'}"
            value="${solved ? '✓ Correct' : ''}" ${solved ? 'readonly' : ''}
            data-qi="${qi}" data-answer="${esc(q.a)}">
          ${solved ? '' : `<button class="question-submit-btn" data-qi="${qi}">Submit</button>`}
        </div>
        ${q.hint ? `<div class="question-hint" data-qi="${qi}"><i class="fas fa-lightbulb"></i> Show hint</div>` : ''}
        <div class="question-feedback" id="q-fb-${qi}"></div>
      </div>`;
    }).join('');

  // Bind submit buttons
  container.querySelectorAll('.question-submit-btn').forEach(btn => {
    btn.addEventListener('click', () => submitAnswer(room, task, parseInt(btn.dataset.qi)));
  });
  container.querySelectorAll('.question-input').forEach(inp => {
    inp.addEventListener('keydown', e => {
      if (e.key === 'Enter') submitAnswer(room, task, parseInt(inp.dataset.qi));
    });
  });
  container.querySelectorAll('.question-hint').forEach(hint => {
    hint.addEventListener('click', () => {
      const qi = parseInt(hint.dataset.qi);
      const q  = task.questions[qi];
      const fb = document.getElementById(`q-fb-${qi}`);
      fb.className = 'question-feedback';
      fb.innerHTML = `<i class="fas fa-lightbulb"></i> Hint: ${esc(q.hint)}`;
    });
  });
}

function submitAnswer(room, task, qi) {
  const q = task.questions[qi];
  if (!q) return;
  const inp = document.getElementById(`q-input-${qi}`);
  if (!inp) return;
  const userAns = inp.value.trim().toLowerCase();
  const correct = q.a.toLowerCase();
  const fb = document.getElementById(`q-fb-${qi}`);

  if (userAns === correct || userAns.includes(correct) || correct.includes(userAns)) {
    inp.classList.add('correct');
    inp.classList.remove('wrong');
    inp.value = '✓ Correct';
    inp.readOnly = true;
    const submitBtn = inp.parentElement.querySelector('.question-submit-btn');
    if (submitBtn) submitBtn.remove();

    fb.className = 'question-feedback correct';
    fb.innerHTML = '<i class="fas fa-check-circle"></i> Correct!';

    // Save progress
    const prog = getRoomProgress(room.id);
    if (!prog.answers) prog.answers = {};
    prog.answers[`${task.id}_${qi}`] = true;
    state.progress[room.id] = prog;

    // Award XP
    const xpGain = Math.round((q.xp || 15));
    awardXP(xpGain, `Q: ${q.q.substring(0,40)}...`);

    // Check if all questions in task answered → mark task complete
    checkTaskCompletion(room, task);
    checkAchievements();
  } else {
    inp.classList.add('wrong');
    inp.classList.remove('correct');
    fb.className = 'question-feedback wrong';
    fb.innerHTML = '<i class="fas fa-times-circle"></i> Incorrect — try again.';
    setTimeout(() => inp.classList.remove('wrong'), 400);
  }
}

function checkTaskCompletion(room, task) {
  if (!task.questions || !task.questions.length) {
    markTaskDone(room, task);
    return;
  }
  const prog = getRoomProgress(room.id);
  const allDone = task.questions.every((_, qi) => prog.answers && prog.answers[`${task.id}_${qi}`] === true);
  if (allDone) markTaskDone(room, task);
}

function markTaskDone(room, task) {
  const prog = getRoomProgress(room.id);
  if (!prog.completedTasks.includes(task.id)) {
    prog.completedTasks.push(task.id);
    state.progress[room.id] = prog;
    saveState();
    showToast(`Task Complete: ${task.title}`, 'success', 'fas fa-circle-check');
  }
}

function labNextTask() {
  const room = ROOMS[state.roomId];
  if (!room) return;

  // Mark current task as complete if no questions
  const task = room.tasks[state.taskIdx];
  if (task && (!task.questions || !task.questions.length)) markTaskDone(room, task);

  if (state.taskIdx >= room.tasks.length - 1) {
    // Room finished
    closeLab();
    showToast(`Room Complete: ${room.title}! +${room.xpReward} XP`, 'success', 'fas fa-trophy');
    awardXP(room.xpReward, room.title);
    saveState();
    checkAchievements();
    return;
  }
  state.taskIdx++;
  renderLabTask();
}
function labPrevTask() {
  if (state.taskIdx > 0) { state.taskIdx--; renderLabTask(); }
}

/* ── CTF ─────────────────────────────────────────────────────────────── */
function renderCTF(el) {
  el.innerHTML = `
  <div class="fade-in">
    <div class="section-header">
      <h1 class="section-title" style="font-size:1.3rem"><i class="fas fa-flag"></i> CTF Challenges</h1>
      <span style="font-size:.8rem;color:var(--text-muted)">${state.ctfSolved.size}/10 Solved</span>
    </div>
    <div style="margin-bottom:20px">
      <div class="progress-bar-wrap" style="height:8px">
        <div class="progress-bar-fill" style="width:${Math.round(state.ctfSolved.size*100/CTF_CHALLENGES.length)}%;background:var(--accent-red)"></div>
      </div>
    </div>
    <div class="ctf-grid">
      ${CTF_CHALLENGES.map(c => `
        <div class="ctf-card ${state.ctfSolved.has(c.id) ? 'solved' : ''}" data-ctf="${c.id}">
          <div class="ctf-card-category">${esc(c.category)}</div>
          <div class="ctf-card-title">${esc(c.title)}</div>
          <div class="ctf-card-desc">${esc(c.description)}</div>
          <div class="ctf-card-footer">
            <span class="difficulty-badge diff--${c.difficulty}">${esc(c.difficulty)}</span>
            <span class="ctf-points"><i class="fas fa-bolt"></i> ${c.points} pts</span>
          </div>
        </div>`).join('')}
    </div>
  </div>`;

  el.querySelectorAll('.ctf-card[data-ctf]').forEach(card => {
    card.addEventListener('click', () => openCTFModal(card.dataset.ctf));
  });
}

function openCTFModal(ctfId) {
  const ctf = CTF_CHALLENGES.find(c => c.id === ctfId);
  if (!ctf) return;

  const solved = state.ctfSolved.has(ctfId);
  const existing = document.getElementById('ctf-modal');
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.id = 'ctf-modal';
  modal.style.cssText = 'position:fixed;inset:0;z-index:600;background:rgba(0,0,0,.8);display:flex;align-items:center;justify-content:center;padding:20px';
  modal.innerHTML = `
    <div style="background:var(--bg-card2);border:1px solid var(--border-light);border-radius:var(--radius-lg);max-width:800px;width:100%;max-height:90vh;overflow-y:auto">
      <div style="padding:24px;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:flex-start">
        <div>
          <div style="font-size:.65rem;font-weight:700;letter-spacing:2px;color:var(--accent-red);margin-bottom:6px">${esc(ctf.category)} · ${ctf.points} PTS</div>
          <div style="font-size:1.2rem;font-weight:800;color:var(--text-primary)">${esc(ctf.title)}</div>
        </div>
        <button id="ctf-close" style="background:none;border:none;color:var(--text-muted);font-size:1.2rem;cursor:pointer"><i class="fas fa-times"></i></button>
      </div>
      <div style="padding:24px">
        <div style="background:var(--bg-elevated);border-radius:var(--radius-sm);padding:14px;margin-bottom:18px;font-size:.85rem;color:var(--text-secondary);line-height:1.7;border-left:3px solid var(--accent-red)">
          <strong style="color:var(--text-primary)">Scenario:</strong> ${esc(ctf.story)}
        </div>
        <div style="font-size:.85rem;color:var(--text-secondary);margin-bottom:18px">${esc(ctf.description)}</div>

        <div style="background:var(--bg-terminal);border:1px solid var(--border-light);border-radius:var(--radius-sm);margin-bottom:18px;overflow:hidden">
          <div style="padding:8px 14px;border-bottom:1px solid var(--border);font-size:.72rem;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:var(--text-muted);display:flex;align-items:center;gap:8px">
            <i class="fas fa-terminal" style="color:var(--accent)"></i> Terminal
          </div>
          <div id="ctf-terminal-output" style="padding:12px 14px;font-family:var(--font-mono);font-size:.8rem;color:var(--terminal-green);min-height:120px;max-height:200px;overflow-y:auto;line-height:1.6"></div>
          <div style="display:flex;align-items:center;gap:10px;padding:8px 14px;border-top:1px solid var(--border)">
            <span style="color:var(--terminal-blue);font-family:var(--font-mono);font-size:.78rem;white-space:nowrap">attacker@ctf:~$</span>
            <input type="text" id="ctf-term-input" style="flex:1;background:none;border:none;outline:none;font-family:var(--font-mono);font-size:.8rem;color:var(--terminal-green)" autocomplete="off" spellcheck="false" placeholder="Type a command...">
          </div>
        </div>

        <div style="display:flex;gap:10px;align-items:center">
          <input type="text" id="ctf-flag-input" placeholder="Submit flag: CTF{...}"
            style="flex:1;background:var(--bg-terminal);border:1px solid var(--border-light);border-radius:var(--radius-sm);padding:10px 14px;font-family:var(--font-mono);font-size:.85rem;color:var(--text-primary);outline:none"
            ${solved ? 'value="' + esc(ctf.flag) + '" readonly' : ''}>
          ${solved
            ? '<span style="color:var(--success);font-weight:700;white-space:nowrap"><i class="fas fa-check-circle"></i> Solved!</span>'
            : '<button id="ctf-submit-btn" class="btn btn--primary">Submit Flag</button>'}
        </div>
        <div id="ctf-feedback" style="margin-top:10px;font-size:.8rem"></div>
        <div style="margin-top:12px">
          <span style="font-size:.75rem;color:var(--text-muted);cursor:pointer" id="ctf-hint-toggle"><i class="fas fa-lightbulb"></i> Show Hint</span>
          <div id="ctf-hint-text" style="display:none;margin-top:6px;font-size:.8rem;color:var(--accent-yellow);background:rgba(251,191,36,.06);padding:10px;border-radius:var(--radius-sm);border:1px solid rgba(251,191,36,.2)">
            <i class="fas fa-lightbulb"></i> ${esc(ctf.hint)}
          </div>
        </div>
      </div>
    </div>`;

  document.body.appendChild(modal);

  // Mini terminal for CTF
  const ctfOutput = document.getElementById('ctf-terminal-output');
  const ctfInput  = document.getElementById('ctf-term-input');
  ctfInput.addEventListener('keydown', e => {
    if (e.key !== 'Enter') return;
    const cmd = ctfInput.value.trim();
    ctfInput.value = '';
    if (!cmd) return;
    const pLine = document.createElement('div');
    pLine.style.cssText = 'color:var(--terminal-blue)';
    pLine.textContent = 'attacker@ctf:~$ ' + cmd;
    ctfOutput.appendChild(pLine);
    const resp = ctf.terminalCommands && ctf.terminalCommands[cmd];
    const respLine = document.createElement('div');
    respLine.style.cssText = 'white-space:pre-wrap;word-break:break-all;margin-bottom:4px';
    if (resp !== undefined) {
      respLine.textContent = resp;
      respLine.style.color = resp.includes('CTF{') ? '#fbbf24' : 'var(--terminal-green)';
    } else {
      respLine.textContent = `bash: ${cmd.split(' ')[0]}: command not found`;
      respLine.style.color = 'var(--terminal-red)';
    }
    ctfOutput.appendChild(respLine);
    ctfOutput.scrollTop = ctfOutput.scrollHeight;
  });

  // Hint toggle
  document.getElementById('ctf-hint-toggle').addEventListener('click', () => {
    const hintEl = document.getElementById('ctf-hint-text');
    hintEl.style.display = hintEl.style.display === 'none' ? 'block' : 'none';
  });

  // Flag submission
  const submitBtn = document.getElementById('ctf-submit-btn');
  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      const flag = document.getElementById('ctf-flag-input').value.trim();
      const fb   = document.getElementById('ctf-feedback');
      if (flag === ctf.flag) {
        fb.innerHTML = '<span style="color:var(--success)"><i class="fas fa-check-circle"></i> Correct flag! Challenge solved!</span>';
        state.ctfSolved.add(ctfId);
        awardXP(ctf.points, `CTF: ${ctf.title}`);
        saveState();
        checkAchievements();
        setTimeout(() => { modal.remove(); renderCTF(document.getElementById('main-content')); }, 1800);
      } else {
        fb.innerHTML = '<span style="color:var(--danger)"><i class="fas fa-times-circle"></i> Wrong flag. Try again.</span>';
      }
    });
  }

  modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
  document.getElementById('ctf-close').addEventListener('click', () => modal.remove());
}

/* ── Tools Reference ─────────────────────────────────────────────────── */
function renderTools(el) {
  el.innerHTML = `
  <div class="fade-in">
    <div class="section-header">
      <h1 class="section-title" style="font-size:1.3rem"><i class="fas fa-screwdriver-wrench"></i> Tools Reference</h1>
    </div>
    <div class="tools-grid">
      ${TOOLS.map(t => `
        <div class="tool-card">
          <div class="tool-card-name"><i class="${t.icon}"></i> ${esc(t.name)}</div>
          <div class="tool-card-desc">${esc(t.desc)}</div>
          <div class="tool-card-commands">
            ${t.cmds.map(c => `<code class="tool-cmd">${esc(c)}</code>`).join('')}
          </div>
        </div>`).join('')}
    </div>
  </div>`;
}

/* ── Profile ─────────────────────────────────────────────────────────── */
function renderProfile(el) {
  const rank = getRank();
  const nextRank = RANKS[RANKS.indexOf(rank) + 1];
  const xpForNext = nextRank ? nextRank.minXP : rank.minXP;
  const xpPct = nextRank ? Math.round(100 * (state.xp - rank.minXP) / (xpForNext - rank.minXP)) : 100;

  el.innerHTML = `
  <div class="fade-in">
    <div class="profile-header">
      <div class="profile-avatar"><i class="fas fa-user-ninja"></i></div>
      <div style="flex:1">
        <div class="profile-name">Security Researcher</div>
        <div class="profile-title">${esc(rank.name)} · InfoEnc Mobile Labs</div>
        <div class="profile-xp-bar" style="max-width:320px">
          <div class="xp-bar-label">
            <span>${state.xp} XP</span>
            <span>${nextRank ? `Next: ${nextRank.name} (${xpForNext} XP)` : 'MAX RANK'}</span>
          </div>
          <div class="xp-bar-track"><div class="xp-bar-fill" style="width:${xpPct}%"></div></div>
        </div>
      </div>
      <div style="text-align:right">
        <div style="font-size:2rem;font-weight:800;font-family:var(--font-mono);color:var(--accent)">${state.xp}</div>
        <div style="font-size:.75rem;color:var(--text-muted)">Total XP</div>
      </div>
    </div>

    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:28px">
      ${[
        ['fas fa-check-circle','stat-icon--green', countCompletedTasks(), 'Tasks Done'],
        ['fas fa-door-open','stat-icon--blue', countCompletedRooms(), 'Rooms Done'],
        ['fas fa-flag','stat-icon--red', state.ctfSolved.size, 'CTF Solved'],
        ['fas fa-trophy','stat-icon--yellow', state.achievements.size, 'Achievements'],
      ].map(([icon,cls,val,label]) => `
        <div class="stat-card">
          <div class="stat-icon ${cls}"><i class="${icon}"></i></div>
          <div><div class="stat-value">${val}</div><div class="stat-label">${label}</div></div>
        </div>`).join('')}
    </div>

    <div class="section-header"><h2 class="section-title"><i class="fas fa-trophy"></i> Achievements</h2></div>
    <div class="achievements-grid">
      ${ACHIEVEMENTS.map(a => {
        const unlocked = state.achievements.has(a.id);
        return `
        <div class="achievement-card ${unlocked ? 'unlocked' : 'locked'}">
          <div class="achievement-icon"><span style="font-size:1.3rem">${a.icon}</span></div>
          <div>
            <div class="achievement-name">${esc(a.name)}</div>
            <div class="achievement-desc">${esc(a.desc)}</div>
          </div>
        </div>`;
      }).join('')}
    </div>

    <div class="section-header" style="margin-top:28px"><h2 class="section-title"><i class="fas fa-chart-bar"></i> Path Progress</h2></div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:28px">
      ${Object.values(PATHS).map(p => `
        <div class="card">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px">
            <i class="${p.icon}" style="color:${p.color};font-size:1.1rem"></i>
            <span style="font-weight:700;font-size:.88rem">${esc(p.title)}</span>
          </div>
          <div style="display:flex;justify-content:space-between;font-size:.73rem;color:var(--text-muted);margin-bottom:5px">
            <span>Progress</span><span>${pathCompletionPct(p.id)}%</span>
          </div>
          <div class="progress-bar-wrap"><div class="progress-bar-fill" style="width:${pathCompletionPct(p.id)}%;background:${p.color}"></div></div>
        </div>`).join('')}
    </div>

    <div style="text-align:center;padding:20px">
      <button class="btn btn--ghost btn--sm" id="reset-btn" style="color:var(--danger);border-color:var(--danger)">
        <i class="fas fa-rotate-left"></i> Reset All Progress
      </button>
    </div>
  </div>`;

  document.getElementById('reset-btn').addEventListener('click', () => {
    if (confirm('Reset ALL progress, XP, and achievements? This cannot be undone.')) {
      state.progress     = {};
      state.xp           = 0;
      state.achievements = new Set();
      state.ctfSolved    = new Set();
      saveState();
      updateNavXP();
      showToast('Progress reset.', 'info', 'fas fa-rotate-left');
      renderProfile(el);
    }
  });
}

/* ── Init ────────────────────────────────────────────────────────────── */
function init() {
  loadState();
  updateNavXP();

  // Sidebar + navbar click handlers
  document.querySelectorAll('[data-page]').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      const page   = el.dataset.page;
      const pathId = el.dataset.path || null;
      if (!page) return;
      navigate(page, { pathId });
    });
  });

  // Mobile sidebar toggle
  document.getElementById('menu-toggle').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('open');
  });

  // Close sidebar on main content click (mobile)
  document.getElementById('main-content').addEventListener('click', () => {
    document.getElementById('sidebar').classList.remove('open');
  });

  // Avatar → profile
  document.getElementById('nav-avatar-btn').addEventListener('click', () => navigate('profile'));

  // Initial page
  navigate('dashboard');
}

document.addEventListener('DOMContentLoaded', init);
