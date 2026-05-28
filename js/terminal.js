/* =====================================================================
   MobileHack Lab — Terminal Emulator
   ===================================================================== */

class Terminal {
  constructor(outputEl, inputEl, promptEl) {
    this.output   = outputEl;
    this.input    = inputEl;
    this.promptEl = promptEl;
    this.history  = [];
    this.histIdx  = -1;
    this.commands = {};
    this.promptText = 'attacker@mobilehack:~$';

    this._bindEvents();
    this._printWelcome();
  }

  setCommands(commands, promptText) {
    this.commands = commands || {};
    if (promptText) {
      this.promptText = promptText;
      this.promptEl.textContent = promptText + ' ';
    }
    this.clear();
    this._printWelcome();
  }

  _bindEvents() {
    this.input.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        const cmd = this.input.value.trim();
        this.input.value = '';
        this.histIdx = -1;
        if (cmd) {
          this.history.unshift(cmd);
          this._execCommand(cmd);
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (this.histIdx < this.history.length - 1) {
          this.histIdx++;
          this.input.value = this.history[this.histIdx];
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (this.histIdx > 0) {
          this.histIdx--;
          this.input.value = this.history[this.histIdx];
        } else {
          this.histIdx = -1;
          this.input.value = '';
        }
      } else if (e.key === 'Tab') {
        e.preventDefault();
        this._autocomplete();
      } else if (e.key === 'l' && e.ctrlKey) {
        e.preventDefault();
        this.clear();
      }
    });
  }

  _autocomplete() {
    const partial = this.input.value.trim();
    if (!partial) return;
    const matches = Object.keys(this.commands).filter(c => c.startsWith(partial));
    if (matches.length === 1) {
      this.input.value = matches[0];
    } else if (matches.length > 1) {
      this._printLine('');
      this._printLine(matches.join('    '), 't-info');
    }
  }

  _execCommand(raw) {
    this._printPromptLine(raw);

    const cmd = raw.trim();

    if (cmd === 'clear' || cmd === 'cls') { this.clear(); return; }
    if (cmd === 'help' && !this.commands['help']) {
      this._printBuiltinHelp();
      return;
    }
    if (cmd === 'history') {
      this.history.forEach((h, i) => this._printLine(`  ${i+1}  ${h}`, 't-info'));
      return;
    }

    // Exact match
    if (this.commands[cmd] !== undefined) {
      this._printOutput(this.commands[cmd]);
      return;
    }

    // Partial / fuzzy match (strip flags for lookup)
    const baseCmd = cmd.replace(/\s+(-{1,2}[a-z-]+)/g, '').trim();
    if (this.commands[baseCmd] !== undefined) {
      this._printOutput(this.commands[baseCmd]);
      return;
    }

    // Try matching with any key that starts with the command
    const fuzzy = Object.keys(this.commands).find(k => k.startsWith(cmd.split(' ')[0]) && k.length > cmd.split(' ')[0].length);
    if (fuzzy) {
      // Look for the full command that matches best
      const fullMatch = Object.keys(this.commands).find(k => cmd.includes(k.split(' ')[0]) && k.split(' ')[0] === cmd.split(' ')[0]);
      if (fullMatch) { this._printOutput(this.commands[fullMatch]); return; }
    }

    // Command not found
    this._printLine(`bash: ${cmd.split(' ')[0]}: command not found`, 't-err');
    this._printLine(`Type 'help' to see available commands.`, 't-comment');
  }

  _printOutput(text) {
    if (!text && text !== 0) return;
    const lines = String(text).split('\n');
    lines.forEach(line => {
      const cls = this._classifyLine(line);
      this._printLine(line, cls);
    });
    this._scroll();
  }

  _classifyLine(line) {
    if (line.startsWith('[+]') || line.includes('Success') || line.includes('Done') || line.includes('bypassed')) return 't-success';
    if (line.startsWith('[*]')) return 't-info';
    if (line.startsWith('[!]') || line.toLowerCase().includes('error') || line.toLowerCase().includes('fail')) return 't-err';
    if (line.includes('CTF{') || line.includes('VULN{') || line.includes('IOS{') || line.includes('NET{') || line.includes('FLAG{')) return 't-flag';
    if (line.startsWith('#')) return 't-comment';
    return '';
  }

  _printPromptLine(cmd) {
    const row = document.createElement('div');
    row.className = 't-line';
    row.innerHTML = `<span class="t-prompt">${this._escHtml(this.promptText)}</span> <span class="t-cmd">${this._escHtml(cmd)}</span>`;
    this.output.appendChild(row);
    this._scroll();
  }

  _printLine(text, cls = '') {
    const el = document.createElement('span');
    el.className = 't-line' + (cls ? ' ' + cls : '');
    el.textContent = text;
    this.output.appendChild(el);
  }

  _printWelcome() {
    const lines = [
      '╔══════════════════════════════════════════════════╗',
      '║     MobileHack Lab — InfoEnc Security            ║',
      '║     Interactive Terminal v1.0                    ║',
      '╚══════════════════════════════════════════════════╝',
      '',
      "Type 'help' to see available commands.",
      '',
    ];
    lines.forEach(l => this._printLine(l, l.startsWith('╔') || l.startsWith('║') || l.startsWith('╚') ? 't-info' : 't-comment'));
  }

  _printBuiltinHelp() {
    this._printLine('Built-in commands:', 't-info');
    this._printLine('  clear / cls     Clear the terminal', '');
    this._printLine('  history         Show command history', '');
    this._printLine('  Tab             Autocomplete command', '');
    this._printLine('  ↑ / ↓           Navigate command history', '');
    this._printLine('  Ctrl+L          Clear terminal', '');
    this._printLine('', '');
    if (Object.keys(this.commands).length) {
      this._printLine('Lab commands:', 't-info');
      Object.keys(this.commands).forEach(c => this._printLine(`  ${c}`, ''));
    }
  }

  clear() {
    this.output.innerHTML = '';
    this._printWelcome();
  }

  _scroll() {
    this.output.scrollTop = this.output.scrollHeight;
  }

  _escHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  focus() { this.input.focus(); }
}
