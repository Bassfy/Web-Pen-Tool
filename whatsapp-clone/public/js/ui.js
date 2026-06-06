const UI = (() => {
  function avatarInitials(name) {
    return name ? name.slice(0, 2).toUpperCase() : '?';
  }

  function avatarColor(name) {
    const colors = ['#2e7d32','#1565c0','#6a1b9a','#ad1457','#e65100','#00695c','#283593'];
    let h = 0;
    for (let i = 0; i < (name || '').length; i++) h = (h * 31 + name.charCodeAt(i)) & 0x7fffffff;
    return colors[h % colors.length];
  }

  function formatTime(iso) {
    const d = new Date(iso);
    const now = new Date();
    const isToday = d.toDateString() === now.toDateString();
    if (isToday) return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return d.toLocaleDateString([], { month: 'short', day: 'numeric' });
  }

  function ticks(readBy, from, currentUser) {
    if (from !== currentUser) return '';
    const isRead = readBy && readBy.length > 0;
    return `<span class="bubble-ticks${isRead ? ' read' : ''}">
      <svg viewBox="0 0 16 11"><path d="M11.071.653a.75.75 0 011.06 1.061L5.95 8.894 2.97 5.914A.75.75 0 014.03 4.853l1.92 1.92 5.12-6.12z"/><path d="M14.071.653a.75.75 0 011.06 1.061L8.95 8.894 8.03 7.974l6.04-7.321z"/></svg>
    </span>`;
  }

  function buildAvatar(name, size = 40) {
    const el = document.createElement('div');
    el.style.cssText = `width:${size}px;height:${size}px;border-radius:50%;background:${avatarColor(name)};display:flex;align-items:center;justify-content:center;font-weight:700;font-size:${Math.round(size * 0.4)}px;color:white;flex-shrink:0`;
    el.textContent = avatarInitials(name);
    return el;
  }

  return {
    avatarColor,
    avatarInitials,

    setMyAvatar(name) {
      const el = document.getElementById('my-avatar');
      if (!el) return;
      el.textContent = avatarInitials(name);
      el.style.background = avatarColor(name);

      const sa = document.getElementById('my-status-avatar');
      if (sa) {
        sa.textContent = avatarInitials(name);
        sa.style.background = avatarColor(name);
      }
    },

    renderContactList(users, currentUser, unreadCounts, activeContact, lastMessages) {
      const list = document.getElementById('contact-list');
      if (!list) return;
      const term = (document.getElementById('search-input')?.value || '').toLowerCase();
      list.innerHTML = '';

      const others = users.filter(u => u.username !== currentUser);
      const filtered = term
        ? others.filter(u => u.username.toLowerCase().includes(term))
        : others;

      if (filtered.length === 0) {
        list.innerHTML = '<div style="padding:20px;text-align:center;color:var(--text-secondary);font-size:14px">No contacts online</div>';
        return;
      }

      filtered.forEach(user => {
        const div = document.createElement('div');
        div.className = 'contact-item' + (user.username === activeContact ? ' active' : '');
        div.dataset.username = user.username;

        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'contact-avatar';
        avatarDiv.textContent = avatarInitials(user.username);
        avatarDiv.style.background = avatarColor(user.username);

        if (user.online) {
          const dot = document.createElement('div');
          dot.className = 'online-dot';
          avatarDiv.appendChild(dot);
        }

        const info = document.createElement('div');
        info.className = 'contact-info';
        const last = lastMessages?.[user.username];
        info.innerHTML = `
          <div class="contact-name">${user.username}</div>
          <div class="contact-preview">${last || (user.online ? 'Online' : 'Offline')}</div>
        `;

        const meta = document.createElement('div');
        meta.className = 'contact-meta';
        const unread = unreadCounts?.[user.username] || 0;
        meta.innerHTML = unread > 0
          ? `<span class="unread-badge">${unread}</span>`
          : '';

        div.appendChild(avatarDiv);
        div.appendChild(info);
        div.appendChild(meta);
        list.appendChild(div);
      });
    },

    renderChatHeader(user) {
      const name = document.getElementById('chat-header-name');
      const status = document.getElementById('chat-header-status');
      const avatar = document.getElementById('chat-header-avatar');
      if (name)   name.textContent   = user.username;
      if (status) status.textContent = user.online ? 'Online' : `Last seen ${user.lastSeen ? formatTime(user.lastSeen) : 'recently'}`;
      if (avatar) {
        avatar.textContent  = avatarInitials(user.username);
        avatar.style.background = avatarColor(user.username);
      }
    },

    updateContactStatus(username, online, lastSeen) {
      const item = document.querySelector(`.contact-item[data-username="${username}"]`);
      if (!item) return;
      const preview = item.querySelector('.contact-preview');
      if (preview) preview.textContent = online ? 'Online' : `Last seen ${lastSeen ? formatTime(lastSeen) : 'recently'}`;
      const dot = item.querySelector('.online-dot');
      if (online && !dot) {
        const d = document.createElement('div');
        d.className = 'online-dot';
        item.querySelector('.contact-avatar')?.appendChild(d);
      } else if (!online && dot) {
        dot.remove();
      }

      if (document.getElementById('chat-header-name')?.textContent === username) {
        const headerStatus = document.getElementById('chat-header-status');
        if (headerStatus) headerStatus.textContent = online ? 'Online' : `Last seen ${lastSeen ? formatTime(lastSeen) : 'recently'}`;
      }
    },

    renderMessage(message, isMine, currentUser) {
      const row = document.createElement('div');
      row.className = `message-row ${isMine ? 'outgoing' : 'incoming'}`;
      row.dataset.id = message.id;

      const bubble = document.createElement('div');
      bubble.className = 'message-bubble';

      let content = '';
      if (message.type === 'image') {
        content = `<img class="bubble-image" src="${message.mediaUrl}" alt="image" loading="lazy" />`;
        if (message.body) content += `<div>${escHtml(message.body)}</div>`;
      } else if (message.type === 'video') {
        content = `<video class="bubble-video" src="${message.mediaUrl}" controls></video>`;
        if (message.body) content += `<div>${escHtml(message.body)}</div>`;
      } else if (message.type === 'audio') {
        content = `<audio class="bubble-audio" src="${message.mediaUrl}" controls></audio>`;
        if (message.body) content += `<div>${escHtml(message.body)}</div>`;
      } else if (message.type === 'file') {
        content = `<a class="bubble-file" href="${message.mediaUrl}" target="_blank" download>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          ${escHtml(message.body || 'File')}
        </a>`;
      } else {
        content = `<div>${escHtml(message.body)}</div>`;
      }

      bubble.innerHTML = content + `
        <div class="bubble-footer">
          <span class="bubble-time">${formatTime(message.timestamp)}</span>
          ${ticks(message.readBy, message.from, currentUser)}
        </div>`;

      row.appendChild(bubble);
      return row;
    },

    appendMessage(message, isMine, currentUser) {
      const list = document.getElementById('message-list');
      if (!list) return;
      const el = this.renderMessage(message, isMine, currentUser);
      list.appendChild(el);
      list.scrollTop = list.scrollHeight;
    },

    clearMessages() {
      const list = document.getElementById('message-list');
      if (list) list.innerHTML = '';
    },

    upgradeReadReceipt(messageId) {
      const row = document.querySelector(`.message-row[data-id="${messageId}"]`);
      if (!row) return;
      const ticks = row.querySelector('.bubble-ticks');
      if (ticks) ticks.classList.add('read');
    },

    showTypingIndicator(username) {
      const el = document.getElementById('typing-indicator');
      if (el) {
        el.dataset.from = username;
        el.style.display = 'block';
        const list = document.getElementById('message-list');
        if (list) list.scrollTop = list.scrollHeight;
      }
    },

    hideTypingIndicator(username) {
      const el = document.getElementById('typing-indicator');
      if (el && (!username || el.dataset.from === username)) {
        el.style.display = 'none';
      }
    },

    showToast(text, type = 'success') {
      const container = document.getElementById('toast-container');
      if (!container) return;
      const toast = document.createElement('div');
      toast.className = `toast ${type}`;
      toast.textContent = text;
      container.appendChild(toast);
      setTimeout(() => {
        toast.style.animation = 'toastOut 200ms ease forwards';
        setTimeout(() => toast.remove(), 200);
      }, 3000);
    },

    setActiveContact(username) {
      document.querySelectorAll('.contact-item').forEach(el => {
        el.classList.toggle('active', el.dataset.username === username);
      });
    },
  };

  function escHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
})();
