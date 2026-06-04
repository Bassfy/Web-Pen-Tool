const express   = require('express');
const http      = require('http');
const WebSocket = require('ws');
const multer    = require('multer');
const { v4: uuid } = require('uuid');
const path      = require('path');
const fs        = require('fs');

const store  = require('./data/store');

const PORT    = process.env.PORT || 3000;
const UPLOADS = path.join(__dirname, 'uploads');
const PUBLIC  = path.join(__dirname, 'public');

fs.mkdirSync(UPLOADS, { recursive: true });

// ── Express ──────────────────────────────────────────────────────────────────

const app = express();
app.use(express.json());
app.use(express.static(PUBLIC));
app.use('/uploads', express.static(UPLOADS));

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS),
  filename:    (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, uuid() + ext);
  },
});
const upload = multer({ storage, limits: { fileSize: 25 * 1024 * 1024 } });

app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  res.json({ url: '/uploads/' + req.file.filename, name: req.file.originalname });
});

app.get('/api/users', (req, res) => {
  const users = [...store.users.values()];
  res.json(users);
});

app.get('/api/messages', (req, res) => {
  const { with: peer, user } = req.query;
  if (!peer || !user) return res.json([]);
  const history = store.messages
    .filter(m =>
      (m.from === user && m.to === peer) ||
      (m.from === peer && m.to === user) ||
      m.to === '__GROUP__'
    )
    .slice(-100);
  res.json(history);
});

app.get('/api/statuses', (req, res) => {
  const now = Date.now();
  res.json(store.statuses.filter(s => s.expiresAt > now));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(PUBLIC, 'index.html'));
});

// ── HTTP + WebSocket server ───────────────────────────────────────────────────

const server = http.createServer(app);
const wss    = new WebSocket.Server({ server });

// ── Helpers ──────────────────────────────────────────────────────────────────

function broadcast(data) {
  const msg = JSON.stringify(data);
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) client.send(msg);
  });
}

function sendTo(username, data) {
  const msg = JSON.stringify(data);
  for (const [, user] of store.users) {
    if (user.username === username && user.ws && user.ws.readyState === WebSocket.OPEN) {
      user.ws.send(msg);
    }
  }
}

function userList() {
  return [...store.users.values()].map(({ id, username, online, lastSeen }) => ({
    id, username, online, lastSeen,
  }));
}

// ── WebSocket connection handler ──────────────────────────────────────────────

wss.on('connection', ws => {
  const socketId = uuid();
  let registered = false;

  ws.on('message', raw => {
    let parsed;
    try { parsed = JSON.parse(raw); } catch { return; }
    const { event, payload = {} } = parsed;

    // ── user:join ──
    if (event === 'user:join') {
      const { username } = payload;
      if (!username || registered) return;

      // If user reconnects with same username, reclaim their slot
      for (const [sid, u] of store.users) {
        if (u.username === username) store.users.delete(sid);
      }

      store.users.set(socketId, { id: socketId, username, online: true, lastSeen: null, ws });
      registered = true;

      // Send current statuses to the new user
      const now = Date.now();
      const currentStatuses = store.statuses.filter(s => s.expiresAt > now);
      ws.send(JSON.stringify({ event: 'status:list', payload: { statuses: currentStatuses } }));

      broadcast({ event: 'user:joined', payload: { user: { id: socketId, username, online: true } } });
      broadcast({ event: 'user:list',   payload: { users: userList() } });
      return;
    }

    if (!registered) return;
    const me = store.users.get(socketId);
    if (!me) return;

    switch (event) {
      case 'message:send': {
        const { to, body, type = 'text', mediaUrl = null } = payload;
        if (!to || (!body && !mediaUrl)) return;

        const message = {
          id: uuid(),
          from: me.username,
          to,
          body: body || '',
          type,
          mediaUrl,
          timestamp: new Date().toISOString(),
          readBy: [],
        };
        store.messages.push(message);

        // Send to recipient
        if (to === '__GROUP__') {
          broadcast({ event: 'message:receive', payload: { message } });
        } else {
          sendTo(to, { event: 'message:receive', payload: { message } });
          // Echo back to sender as confirmation
          ws.send(JSON.stringify({ event: 'message:receive', payload: { message } }));
        }
        break;
      }

      case 'message:read': {
        const { messageId } = payload;
        const msg = store.messages.find(m => m.id === messageId);
        if (!msg || msg.readBy.includes(me.username)) break;
        msg.readBy.push(me.username);
        sendTo(msg.from, {
          event: 'message:read_receipt',
          payload: { messageId, readBy: msg.readBy },
        });
        break;
      }

      case 'typing:start': {
        const { to } = payload;
        if (to === '__GROUP__') {
          broadcast({ event: 'typing:indicator', payload: { from: me.username, to } });
        } else {
          sendTo(to, { event: 'typing:indicator', payload: { from: me.username, to } });
        }
        break;
      }

      case 'typing:stop': {
        const { to } = payload;
        if (to === '__GROUP__') {
          broadcast({ event: 'typing:stopped', payload: { from: me.username, to } });
        } else {
          sendTo(to, { event: 'typing:stopped', payload: { from: me.username, to } });
        }
        break;
      }

      case 'status:post': {
        const { text, imageUrl = null } = payload;
        const now = Date.now();
        const status = {
          id: uuid(),
          authorId: me.username,
          text: text || '',
          imageUrl,
          timestamp: new Date().toISOString(),
          expiresAt: now + 24 * 60 * 60 * 1000,
        };
        store.statuses.push(status);
        broadcast({ event: 'status:new', payload: { status } });
        break;
      }
    }
  });

  ws.on('close', () => {
    const user = store.users.get(socketId);
    if (!user) return;
    user.online  = false;
    user.lastSeen = new Date().toISOString();
    store.users.delete(socketId);
    broadcast({ event: 'user:left',  payload: { userId: socketId, username: user.username } });
    broadcast({ event: 'user:list',  payload: { users: userList() } });
  });

  ws.on('error', err => console.error('WS error:', err.message));
});

server.listen(PORT, () => {
  console.log(`WhatsApp Clone running on http://localhost:${PORT}`);
});
