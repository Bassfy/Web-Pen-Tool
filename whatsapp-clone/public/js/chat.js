(() => {
  // ── State ─────────────────────────────────────────────────────────────────
  let currentUser   = null;
  let activeContact = null;
  let contacts      = [];
  const messages    = {};  // username → Message[]
  const unread      = {};  // username → count
  const lastMsgText = {};  // username → preview string

  window.__currentUser = null;

  let typingTimer = null;
  let isTyping    = false;

  // ── Helpers ───────────────────────────────────────────────────────────────

  function rerender() {
    UI.renderContactList(contacts, currentUser, unread, activeContact, lastMsgText);
  }

  function previewText(msg) {
    if (msg.type === 'image') return '📷 Photo';
    if (msg.type === 'video') return '📹 Video';
    if (msg.type === 'audio') return '🎵 Audio';
    if (msg.type === 'file')  return '📎 ' + (msg.body || 'File');
    return msg.body || '';
  }

  async function openConversation(username) {
    activeContact = username;
    unread[username] = 0;
    UI.setActiveContact(username);

    const user = contacts.find(u => u.username === username) || { username, online: false };
    UI.renderChatHeader(user);
    UI.clearMessages();
    UI.hideTypingIndicator();

    document.getElementById('chat-empty-state').style.display = 'none';
    document.getElementById('chat-conversation').style.display = 'flex';
    document.getElementById('sidebar')?.classList.add('hidden');

    // Load history
    try {
      const res = await fetch(`/api/messages?with=${encodeURIComponent(username)}&user=${encodeURIComponent(currentUser)}`);
      const history = await res.json();
      messages[username] = history;
      history.forEach(msg => {
        const isMine = msg.from === currentUser;
        UI.appendMessage(msg, isMine, currentUser);
        // Mark as read
        if (!isMine && !(msg.readBy || []).includes(currentUser)) {
          WS.send('message:read', { messageId: msg.id });
        }
      });
    } catch {
      UI.showToast('Could not load message history', 'error');
    }

    rerender();
    document.getElementById('message-input')?.focus();
  }

  function sendMessage(body, extra = {}) {
    if (!activeContact || (!body.trim() && !extra.mediaUrl)) return;
    WS.send('message:send', {
      to:  activeContact,
      body: body.trim(),
      type: extra.type || 'text',
      mediaUrl: extra.mediaUrl || null,
    });
    document.getElementById('message-input').value = '';
    stopTyping();
  }

  function stopTyping() {
    if (isTyping && activeContact) {
      WS.send('typing:stop', { to: activeContact });
    }
    isTyping = false;
    clearTimeout(typingTimer);
  }

  // ── Login ─────────────────────────────────────────────────────────────────

  WS.on('__connected__', () => {
    if (currentUser) WS.send('user:join', { username: currentUser });
  });

  document.getElementById('login-form')?.addEventListener('submit', e => {
    e.preventDefault();
    const username = document.getElementById('login-username')?.value.trim();
    if (!username) return;
    currentUser = username;
    window.__currentUser = username;
    UI.setMyAvatar(username);
    WS.send('user:join', { username });
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('app').style.display = 'grid';
  });

  // ── WebSocket event handlers ──────────────────────────────────────────────

  WS.on('user:list', ({ users }) => {
    contacts = users;
    rerender();
  });

  WS.on('user:joined', ({ user }) => {
    UI.updateContactStatus(user.username, true, null);
  });

  WS.on('user:left', ({ username }) => {
    UI.updateContactStatus(username, false, new Date().toISOString());
    UI.hideTypingIndicator(username);
  });

  WS.on('message:receive', ({ message }) => {
    const peer = message.from === currentUser ? message.to : message.from;

    if (!messages[peer]) messages[peer] = [];
    // Deduplicate
    if (!messages[peer].find(m => m.id === message.id)) {
      messages[peer].push(message);
    }

    lastMsgText[peer] = previewText(message);

    if (peer === activeContact || message.from === currentUser) {
      const isMine = message.from === currentUser;
      UI.appendMessage(message, isMine, currentUser);

      if (!isMine) {
        WS.send('message:read', { messageId: message.id });
      }
    } else {
      unread[peer] = (unread[peer] || 0) + 1;
    }

    rerender();
  });

  WS.on('message:read_receipt', ({ messageId }) => {
    UI.upgradeReadReceipt(messageId);
  });

  WS.on('typing:indicator', ({ from, to }) => {
    if (from !== currentUser && from === activeContact) {
      UI.showTypingIndicator(from);
    }
  });

  WS.on('typing:stopped', ({ from }) => {
    UI.hideTypingIndicator(from);
  });

  WS.on('status:list', ({ statuses }) => {
    Status.setStatuses(statuses);
    if (currentUser) Status.renderList(currentUser);
  });

  WS.on('status:new', ({ status }) => {
    Status.addStatus(status);
    if (currentUser) Status.renderList(currentUser);
  });

  // ── Contact click ─────────────────────────────────────────────────────────

  document.getElementById('contact-list')?.addEventListener('click', e => {
    const item = e.target.closest('.contact-item');
    if (item) openConversation(item.dataset.username);
  });

  // ── Back button (mobile) ──────────────────────────────────────────────────

  document.getElementById('back-btn')?.addEventListener('click', () => {
    document.getElementById('sidebar')?.classList.remove('hidden');
    activeContact = null;
    document.getElementById('chat-conversation').style.display = 'none';
    document.getElementById('chat-empty-state').style.display = 'flex';
  });

  // ── Send message ──────────────────────────────────────────────────────────

  document.getElementById('send-btn')?.addEventListener('click', () => {
    const input = document.getElementById('message-input');
    sendMessage(input?.value || '');
  });

  document.getElementById('message-input')?.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(e.target.value);
    }
  });

  // ── Typing detection ──────────────────────────────────────────────────────

  document.getElementById('message-input')?.addEventListener('input', () => {
    if (!activeContact) return;
    if (!isTyping) {
      isTyping = true;
      WS.send('typing:start', { to: activeContact });
    }
    clearTimeout(typingTimer);
    typingTimer = setTimeout(stopTyping, 1000);
  });

  // ── File attachment ───────────────────────────────────────────────────────

  document.getElementById('attach-btn')?.addEventListener('click', () => {
    document.getElementById('file-input')?.click();
  });

  document.getElementById('file-input')?.addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) return;
    e.target.value = '';
    if (file.size > Media.MAX_SIZE) {
      UI.showToast('File too large (max 25 MB)', 'error');
      return;
    }
    Media.openModal(file, extra => sendMessage(extra.body || '', extra));
  });

  // ── Tab switching ─────────────────────────────────────────────────────────

  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      const tab = document.getElementById(`${btn.dataset.tab}-tab`);
      if (tab) {
        tab.classList.add('active');
        if (btn.dataset.tab === 'status' && currentUser) Status.renderList(currentUser);
      }
    });
  });

  // ── Search ────────────────────────────────────────────────────────────────

  document.getElementById('search-input')?.addEventListener('input', () => rerender());
})();
