const Status = (() => {
  let statuses     = [];
  let viewerQueue  = [];
  let viewerIndex  = 0;
  let progressTimer = null;
  const DURATION   = 5000;
  const SEEN_KEY   = 'wa_seen_statuses';

  function seenSet() {
    try { return new Set(JSON.parse(localStorage.getItem(SEEN_KEY) || '[]')); } catch { return new Set(); }
  }
  function markSeen(id) {
    const s = seenSet();
    s.add(id);
    localStorage.setItem(SEEN_KEY, JSON.stringify([...s]));
  }

  function timeAgo(iso) {
    const secs = Math.floor((Date.now() - new Date(iso)) / 1000);
    if (secs < 60)   return 'just now';
    if (secs < 3600) return `${Math.floor(secs / 60)}m ago`;
    if (secs < 86400) return `${Math.floor(secs / 3600)}h ago`;
    return new Date(iso).toLocaleDateString();
  }

  function groupByAuthor(list) {
    const map = {};
    list.forEach(s => {
      if (!map[s.authorId]) map[s.authorId] = [];
      map[s.authorId].push(s);
    });
    return map;
  }

  function renderList(currentUser) {
    const container = document.getElementById('status-list');
    if (!container) return;
    const now = Date.now();
    const active = statuses.filter(s => s.expiresAt > now && s.authorId !== currentUser);
    const seen   = seenSet();
    const grouped = groupByAuthor(active);

    container.innerHTML = '';
    if (Object.keys(grouped).length === 0) {
      container.innerHTML = '<div style="padding:20px;text-align:center;color:var(--text-secondary);font-size:14px">No recent updates</div>';
      return;
    }

    Object.entries(grouped).forEach(([author, authorStatuses]) => {
      const allSeen = authorStatuses.every(s => seen.has(s.id));
      const item    = document.createElement('div');
      item.className = 'status-item';
      item.dataset.author = author;

      const ring = document.createElement('div');
      ring.className = 'status-ring-avatar' + (allSeen ? ' seen' : '');
      ring.textContent = UI.avatarInitials(author);
      ring.style.background = UI.avatarColor(author);

      const info = document.createElement('div');
      info.className = 'status-item-info';
      const latest = authorStatuses[authorStatuses.length - 1];
      info.innerHTML = `
        <div class="status-item-name">${author}</div>
        <div class="status-item-time">${timeAgo(latest.timestamp)}</div>`;

      item.appendChild(ring);
      item.appendChild(info);
      item.addEventListener('click', () => openViewer(author, authorStatuses));
      container.appendChild(item);
    });
  }

  function openViewer(author, authorStatuses) {
    viewerQueue = authorStatuses;
    viewerIndex = 0;
    showViewerSlide();
    document.getElementById('status-viewer-modal').style.display = 'flex';
  }

  function showViewerSlide() {
    const status = viewerQueue[viewerIndex];
    if (!status) { closeViewer(); return; }

    markSeen(status.id);

    document.getElementById('sv-author').textContent = status.authorId;
    document.getElementById('sv-time').textContent   = timeAgo(status.timestamp);

    const avatar = document.getElementById('sv-avatar');
    avatar.textContent   = UI.avatarInitials(status.authorId);
    avatar.style.background = UI.avatarColor(status.authorId);

    const body = document.getElementById('sv-body');
    body.innerHTML = '';
    if (status.imageUrl) {
      const img = document.createElement('img');
      img.src = status.imageUrl;
      body.appendChild(img);
    }
    if (status.text) {
      const p = document.createElement('p');
      p.textContent = status.text;
      body.appendChild(p);
    }

    // Progress bar
    clearTimeout(progressTimer);
    const bar = document.getElementById('sv-progress');
    bar.style.transition = 'none';
    bar.style.width = '0%';
    requestAnimationFrame(() => {
      bar.style.transition = `width ${DURATION}ms linear`;
      bar.style.width = '100%';
    });
    progressTimer = setTimeout(() => advanceViewer(1), DURATION);
  }

  function advanceViewer(delta) {
    viewerIndex += delta;
    if (viewerIndex < 0) viewerIndex = 0;
    if (viewerIndex >= viewerQueue.length) { closeViewer(); return; }
    showViewerSlide();
  }

  function closeViewer() {
    clearTimeout(progressTimer);
    document.getElementById('status-viewer-modal').style.display = 'none';
    // Refresh ring styles
    const currentUser = window.__currentUser;
    if (currentUser) renderList(currentUser);
  }

  function openComposer() {
    const modal = document.getElementById('status-composer-modal');
    if (modal) {
      modal.style.display = 'flex';
      document.getElementById('status-text-input').value = '';
      document.getElementById('status-image-name').textContent = '';
      modal.dataset.imageUrl = '';
    }
  }

  function closeComposer() {
    const modal = document.getElementById('status-composer-modal');
    if (modal) modal.style.display = 'none';
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('sv-close')?.addEventListener('click', closeViewer);
    document.getElementById('status-viewer-overlay')?.addEventListener('click', closeViewer);
    document.getElementById('sv-nav-left')?.addEventListener('click',  () => advanceViewer(-1));
    document.getElementById('sv-nav-right')?.addEventListener('click', () => advanceViewer(1));

    document.getElementById('status-composer-close')?.addEventListener('click', closeComposer);
    document.getElementById('status-composer-overlay')?.addEventListener('click', closeComposer);
    document.getElementById('status-composer-cancel')?.addEventListener('click', closeComposer);

    document.getElementById('status-image-btn')?.addEventListener('click', () => {
      document.getElementById('status-image-input')?.click();
    });

    document.getElementById('status-image-input')?.addEventListener('change', async e => {
      const file = e.target.files[0];
      if (!file) return;
      if (file.size > Media.MAX_SIZE) { UI.showToast('File too large (max 25 MB)', 'error'); return; }
      try {
        UI.showToast('Uploading image…', 'info');
        const { url } = await fetch('/upload', {
          method: 'POST',
          body: (() => { const f = new FormData(); f.append('file', file); return f; })(),
        }).then(r => r.json());
        const modal = document.getElementById('status-composer-modal');
        if (modal) modal.dataset.imageUrl = url;
        document.getElementById('status-image-name').textContent = file.name;
      } catch {
        UI.showToast('Image upload failed', 'error');
      }
    });

    document.getElementById('status-composer-post')?.addEventListener('click', () => {
      const text     = document.getElementById('status-text-input')?.value.trim() || '';
      const modal    = document.getElementById('status-composer-modal');
      const imageUrl = modal?.dataset.imageUrl || null;
      if (!text && !imageUrl) { UI.showToast('Add some text or an image', 'info'); return; }
      WS.send('status:post', { text, imageUrl: imageUrl || undefined });
      closeComposer();
    });

    document.getElementById('my-status-row')?.addEventListener('click', openComposer);
    document.getElementById('status-compose-btn')?.addEventListener('click', openComposer);
  });

  return {
    setStatuses(list) {
      statuses = list;
    },
    addStatus(status) {
      statuses.push(status);
    },
    renderList,
    openViewer,
    openComposer,
  };
})();
