const Media = (() => {
  const MAX_SIZE = 25 * 1024 * 1024;
  let pendingFile   = null;
  let onSendCallback = null;

  function mimeToType(file) {
    const t = file.type;
    if (t.startsWith('image/'))  return 'image';
    if (t.startsWith('video/'))  return 'video';
    if (t.startsWith('audio/'))  return 'audio';
    return 'file';
  }

  function renderPreview(file, area) {
    const type = mimeToType(file);
    const url  = URL.createObjectURL(file);

    if (type === 'image') {
      area.innerHTML = `<img src="${url}" style="max-width:100%;max-height:360px;border-radius:8px" />`;
    } else if (type === 'video') {
      area.innerHTML = `<video src="${url}" controls style="max-width:100%;max-height:360px;border-radius:8px"></video>`;
    } else {
      area.innerHTML = `
        <div class="media-file-preview">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
          </svg>
          <p>${file.name}</p>
        </div>`;
    }
  }

  async function upload(file) {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('/upload', { method: 'POST', body: formData });
    if (!res.ok) throw new Error('Upload failed');
    return res.json();
  }

  // ── Modal wiring ────────────────────────────────────────────────────────

  function openModal(file, callback) {
    pendingFile    = file;
    onSendCallback = callback;
    const modal = document.getElementById('media-modal');
    const area  = document.getElementById('media-preview-area');
    const cap   = document.getElementById('media-caption');
    if (!modal || !area) return;
    renderPreview(file, area);
    if (cap) cap.value = '';
    modal.style.display = 'flex';
  }

  function closeModal() {
    const modal = document.getElementById('media-modal');
    if (modal) modal.style.display = 'none';
    pendingFile    = null;
    onSendCallback = null;
    URL.revokeObjectURL('');
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('media-modal-close')?.addEventListener('click', closeModal);
    document.getElementById('media-modal-overlay')?.addEventListener('click', closeModal);

    document.getElementById('media-send-btn')?.addEventListener('click', async () => {
      if (!pendingFile || !onSendCallback) return;
      const caption  = document.getElementById('media-caption')?.value || '';
      const file     = pendingFile;
      const callback = onSendCallback;
      closeModal();

      try {
        UI.showToast('Uploading…', 'info');
        const { url, name } = await upload(file);
        callback({ type: mimeToType(file), mediaUrl: url, body: caption || name });
      } catch {
        UI.showToast('Upload failed', 'error');
      }
    });
  });

  return {
    openModal,
    MAX_SIZE,
    mimeToType,
  };
})();
