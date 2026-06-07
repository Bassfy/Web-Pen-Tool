/* =====================================================================
   Cryptography & Encryption Lab — Data Extension
   InfoEnc Security Platform
   ===================================================================== */

/* ── New Achievements ─────────────────────────────────────────────── */
ACHIEVEMENTS.push(
  { id: 'crypto_init',  name: 'Crypto Curious',   icon: '🔐', desc: 'Begin the Cryptography path' },
  { id: 'cipher_break', name: 'Cipher Breaker',   icon: '🔓', desc: 'Complete the Classical Ciphers room' },
  { id: 'hash_hunter',  name: 'Hash Hunter',      icon: '🔢', desc: 'Complete the Hashing & Integrity room' },
  { id: 'crypto_grad',  name: 'Crypto Graduate',  icon: '🎓', desc: 'Pass the Final Exam' },
  { id: 'crypto_elite', name: 'Cryptographer',    icon: '🔑', desc: 'Complete all Cryptography rooms' }
);

/* ── Crypto Learning Path ─────────────────────────────────────────── */
PATHS.crypto = {
  id: 'crypto',
  title: 'Cryptography & Encryption',
  subtitle: 'From Caesar to AES-256',
  icon: 'fas fa-lock',
  color: '#f59e0b',
  bgGradient: 'linear-gradient(135deg,#1a1200,#0d0a00)',
  description: 'Master the science of secret communication. From ancient ciphers to modern AES-GCM and RSA-4096 — understand how encryption works, how it fails, and how to exploit weak implementations.',
  difficulty: 'Beginner → Expert',
  duration: '15-20 hours',
  rooms: 8,
  rooms_list: ['crypto-intro','crypto-classical','crypto-symmetric','crypto-asymmetric','crypto-hashing','crypto-pki-tls','crypto-attacks','crypto-final-exam'],
};

/* ══════════════════════════════════════════════════════════════════
   ROOM 1 — Introduction to Cryptography
   ══════════════════════════════════════════════════════════════════ */
ROOMS['crypto-intro'] = {
  id: 'crypto-intro',
  path: 'crypto',
  title: 'Introduction to Cryptography',
  description: 'Explore the history, foundations, and fundamental concepts of cryptography. Learn the language professionals use and understand why crypto matters.',
  difficulty: 'beginner',
  xpReward: 150,
  iconClass: 'fas fa-lock',
  iconBg: 'rgba(245,158,11,.12)',
  iconColor: '#f59e0b',
  tasks: [
    {
      id: 't1', title: 'A Brief History of Cryptography',
      xp: 15,
      content: `
<h2>A Brief History of Cryptography</h2>
<p>Cryptography — the art of writing and solving codes — is one of humanity's oldest sciences. Long before computers, people needed to send secret messages in wartime and commerce.</p>
<h3>Ancient Origins</h3>
<ul>
  <li><strong>~1900 BC — Egypt:</strong> Unusual hieroglyphs were carved on tomb walls, considered the earliest known use of a transformed writing system.</li>
  <li><strong>~600 BC — Atbash Cipher:</strong> Hebrew scribes reversed the alphabet (A↔Z, B↔Y) to obscure the Book of Jeremiah.</li>
  <li><strong>~487 BC — Scytale (Sparta):</strong> A rod (scytale) was used to wrap a strip of leather; only a rod of the same diameter could decode the message — one of the first key-dependent systems.</li>
  <li><strong>~50 BC — Caesar Cipher:</strong> Julius Caesar shifted each letter by 3 positions. "ATTACK" becomes "DWWDFN".</li>
</ul>
<h3>The Middle Ages & Renaissance</h3>
<ul>
  <li><strong>~850 AD — Al-Kindi:</strong> Arab polymath invented <em>frequency analysis</em> — the idea that in any language, some letters appear more than others, making substitution ciphers breakable.</li>
  <li><strong>1467 — Alberti Cipher Disk:</strong> Leon Battista Alberti created the first polyalphabetic cipher device, foreshadowing the Vigenère cipher.</li>
  <li><strong>1553 — Vigenère Cipher:</strong> Giovan Battista Bellaso (later attributed to Vigenère) introduced a keyword-based polyalphabetic cipher, described as "le chiffre indéchiffrable" (the unbreakable cipher).</li>
</ul>
<h3>The Machine Age</h3>
<ul>
  <li><strong>1917 — Vernam Cipher / OTP:</strong> Gilbert Vernam invented the one-time pad — provably unbreakable when used correctly.</li>
  <li><strong>1939-1945 — Enigma & WWII:</strong> Germany's Enigma machine used rotating disks for polyalphabetic encryption. Alan Turing and Bletchley Park cracked it, shortening the war by an estimated 2-4 years.</li>
  <li><strong>1949 — Shannon's Theory:</strong> Claude Shannon published "Communication Theory of Secrecy Systems," putting cryptography on a rigorous mathematical foundation.</li>
</ul>
<h3>The Digital Revolution</h3>
<ul>
  <li><strong>1976 — Diffie-Hellman:</strong> Whitfield Diffie and Martin Hellman introduced <em>public-key cryptography</em>, solving the key distribution problem.</li>
  <li><strong>1977 — RSA:</strong> Rivest, Shamir, Adleman published the first practical public-key encryption algorithm.</li>
  <li><strong>1977 — DES:</strong> IBM's Data Encryption Standard became the first widely-adopted symmetric cipher standard.</li>
  <li><strong>2001 — AES:</strong> After a 5-year public competition, NIST selected Rijndael as the Advanced Encryption Standard — still the dominant symmetric cipher today.</li>
</ul>
<div class="info-box"><i class="fas fa-terminal"></i> Try the terminal! Use <code>help</code> to see available commands. Try encoding and decoding text with base64 and hex.</div>`,
      terminalCommands: {
        'help': 'Commands: help | whoami | date | echo "text" | base64 | xxd | python3 -c "..."',
        'whoami': 'student@cryptolab',
        'date': new Date().toString(),
        'echo "Hello Crypto" | base64': 'SGVsbG8gQ3J5cHRvCg==',
        'echo "SGVsbG8gQ3J5cHRvCg==" | base64 -d': 'Hello Crypto',
        'echo "Hello" | xxd': '00000000: 4865 6c6c 6f0a                           Hello.',
        'python3 -c "print(\'Hello\'.encode().hex())"': '48656c6c6f',
        'python3 -c "print(bytes.fromhex(\'48656c6c6f\').decode())"': 'Hello',
      },
      questions: [
        { q: 'Which ancient Greek device used a rod to encode messages by wrapping leather around it?', a: 'scytale', hint: 'The Spartans used a cylindrical ___', xp: 10 },
        { q: 'What technique did Al-Kindi invent around 850 AD that can break simple substitution ciphers?', a: 'frequency analysis', hint: 'Some letters appear more often than others...', xp: 15 },
        { q: 'What year was AES (Rijndael) selected by NIST as the encryption standard?', a: '2001', hint: 'After a 5-year public competition ending in 200_', xp: 10 },
      ],
    },
    {
      id: 't2', title: 'Core Concepts & Terminology',
      xp: 20,
      content: `
<h2>Core Concepts & Terminology</h2>
<p>Before diving into algorithms, you must speak the language. Every cryptographer uses these terms precisely — imprecise language leads to insecure implementations.</p>
<h3>The Fundamental Players</h3>
<ul>
  <li><strong>Plaintext (P):</strong> The original readable message. "Meet at noon."</li>
  <li><strong>Ciphertext (C):</strong> The encrypted, unreadable output. "Phhw dw qrrq."</li>
  <li><strong>Key (K):</strong> Secret information used to control the transformation. Without the key, the ciphertext should be meaningless.</li>
  <li><strong>Algorithm / Cipher:</strong> The mathematical procedure that transforms plaintext to ciphertext using the key.</li>
  <li><strong>Encryption (E):</strong> The process: <code>C = E(K, P)</code></li>
  <li><strong>Decryption (D):</strong> The reverse: <code>P = D(K, C)</code></li>
</ul>
<h3>Kerckhoffs's Principle (1883)</h3>
<p>This is one of the most important rules in cryptography:</p>
<div class="warning-box"><i class="fas fa-exclamation-triangle"></i> <strong>Kerckhoffs's Principle:</strong> "A cryptosystem should be secure even if everything about the system, except the key, is public knowledge."</div>
<p>This means: <em>never rely on keeping the algorithm secret</em> (security through obscurity). Only the <strong>key</strong> should be secret. This is why AES, RSA, and all modern algorithms are publicly published — if they're only secure because the algorithm is hidden, they're weak.</p>
<h3>Cipher vs Code</h3>
<ul>
  <li><strong>Cipher:</strong> Operates on individual letters/bits according to a mathematical rule. E.g., Caesar cipher, AES.</li>
  <li><strong>Code:</strong> Replaces entire words or phrases with other words/symbols. E.g., "Eagle" means "attack at dawn." Codes require codebooks.</li>
</ul>
<h3>Security Goals — CIA + N</h3>
<ul>
  <li><strong>Confidentiality:</strong> Only authorised parties can read the data. (Encryption provides this.)</li>
  <li><strong>Integrity:</strong> Data has not been tampered with. (Hashing & MACs provide this.)</li>
  <li><strong>Authenticity:</strong> You know who sent the message. (Digital signatures provide this.)</li>
  <li><strong>Non-repudiation:</strong> The sender cannot deny sending the message. (Digital signatures also provide this.)</li>
</ul>
<h3>Symmetric vs Asymmetric</h3>
<ul>
  <li><strong>Symmetric:</strong> Same key for encrypt and decrypt. Fast. Key distribution is the problem.</li>
  <li><strong>Asymmetric:</strong> Public key encrypts, private key decrypts. Slower but solves key distribution.</li>
  <li><strong>Hybrid:</strong> Use asymmetric to securely exchange a symmetric key, then use symmetric for bulk data. (This is how TLS works.)</li>
</ul>
<pre><code># The crypto equation
C = E(K, P)   → Encryption
P = D(K, C)   → Decryption

# In Python:
from cryptography.fernet import Fernet
key = Fernet.generate_key()
f = Fernet(key)
token = f.encrypt(b"Attack at dawn")
print(f.decrypt(token))</code></pre>`,
      terminalCommands: {
        'help': 'Commands: python3 cipher demo commands',
        'python3 -c "msg=\'HELLO\'; key=3; enc=\'\'.join(chr((ord(c)-65+key)%26+65) for c in msg); print(enc)"': 'KHOOR',
        'python3 -c "msg=\'KHOOR\'; key=3; dec=\'\'.join(chr((ord(c)-65-key)%26+65) for c in msg); print(dec)"': 'HELLO',
        'python3 -c "import os; key=os.urandom(32); print(key.hex())"': 'a3f8c2d1e94b760f5a2c8d3e1f074a8b9c2d5e6f7a1b3c4d5e6f7a8b9c0d1e2',
        'python3 -c "print(len(\'A\'*16))"': '16',
      },
      questions: [
        { q: 'According to Kerckhoffs\'s Principle, what is the ONLY thing that must remain secret in a cryptosystem?', a: 'key', hint: 'The algorithm can be public — only the ___ should be secret', xp: 15 },
        { q: 'What cryptographic property ensures a message has not been tampered with?', a: 'integrity', hint: 'CIA triad — Confidentiality, ___, Authenticity', xp: 10 },
        { q: 'What type of encryption uses the same key for both encrypting and decrypting?', a: 'symmetric', hint: 'Same key both ways = ___ encryption', xp: 10 },
      ],
    },
    {
      id: 't3', title: 'Encoding vs Encryption vs Hashing',
      xp: 20,
      content: `
<h2>Encoding vs Encryption vs Hashing</h2>
<p>This is one of the most common confusions in cybersecurity. These three operations look similar but are fundamentally different in purpose and security.</p>
<h3>Encoding — NOT Security</h3>
<p>Encoding transforms data for <em>compatibility</em> — it has <strong>no security value whatsoever</strong>. There is no key, and anyone can reverse it instantly.</p>
<ul>
  <li><strong>Base64:</strong> Encodes binary data using 64 printable characters. Used in emails (MIME), HTTP headers, JWTs.</li>
  <li><strong>Hex (Base16):</strong> Represents each byte as two hex digits (0-9, A-F).</li>
  <li><strong>URL Encoding:</strong> Encodes special characters as <code>%XX</code> (e.g., space → <code>%20</code>).</li>
  <li><strong>ASCII/Unicode:</strong> Represent text as numbers.</li>
</ul>
<div class="warning-box"><i class="fas fa-exclamation-triangle"></i> <strong>Common Mistake:</strong> "This password is stored as Base64 so it's secure." — Base64 is trivially reversible. It provides zero security.</div>
<h3>Encryption — Reversible with a Key</h3>
<p>Encryption transforms data to be unreadable <em>without the key</em>. It is designed to be reversed (decrypted) by authorised parties who hold the key.</p>
<ul>
  <li>Requires a secret key</li>
  <li>Reversible: decrypt(encrypt(plaintext, key), key) = plaintext</li>
  <li>Examples: AES, RSA, ChaCha20</li>
  <li>Use for: protecting data in transit or at rest</li>
</ul>
<h3>Hashing — One-Way, No Key</h3>
<p>A hash function produces a fixed-size "fingerprint" of data. It is <em>one-way</em> — you cannot reverse a hash to get the original input (in theory).</p>
<ul>
  <li>No key involved</li>
  <li>Fixed output size regardless of input size</li>
  <li>Deterministic: same input always produces same hash</li>
  <li>Small input change → completely different hash (avalanche effect)</li>
  <li>Examples: SHA-256, SHA-3, MD5 (broken)</li>
  <li>Use for: password verification, data integrity, digital signatures</li>
</ul>
<h3>Quick Comparison Table</h3>
<pre><code>┌─────────────┬────────────┬───────────┬─────────────────────────┐
│ Operation   │ Key Needed │ Reversible│ Use Case                │
├─────────────┼────────────┼───────────┼─────────────────────────┤
│ Encoding    │    No      │   Yes     │ Data format compatibility│
│ Encryption  │    Yes     │   Yes*    │ Data confidentiality    │
│ Hashing     │    No      │   No      │ Integrity, passwords    │
└─────────────┴────────────┴───────────┴─────────────────────────┘
* Only with the correct key</code></pre>
<h3>Real-World Confusion: JWTs</h3>
<p>A JWT (JSON Web Token) has three parts separated by dots: <code>header.payload.signature</code>. The first two parts are <strong>Base64-encoded</strong> (not encrypted!) — anyone can read them. Only the signature provides security.</p>
<div class="info-box"><i class="fas fa-lightbulb"></i> Try decoding a JWT's header in the terminal to see this in action.</div>`,
      terminalCommands: {
        'help': 'Try: echo, base64, python3 hashlib commands',
        'echo -n "password123" | base64': 'cGFzc3dvcmQxMjM=',
        'echo "cGFzc3dvcmQxMjM=" | base64 -d': 'password123',
        'echo -n "password123" | sha256sum': 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f  -',
        'echo -n "password123" | md5sum': '482c811da5d5b4bc6d497ffa98491e38  -',
        'python3 -c "import hashlib; print(hashlib.sha256(b\'hello\').hexdigest())"': '2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824',
        'python3 -c "import base64; print(base64.b64decode(\'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\').decode())"': '{"alg":"HS256","typ":"JWT"}',
      },
      questions: [
        { q: 'Is Base64 encoding a form of encryption? (yes/no)', a: 'no', hint: 'Encoding has no ___ and is trivially reversible', xp: 10 },
        { q: 'What property of hash functions means a small input change produces a completely different hash?', a: 'avalanche effect', hint: 'Described as the ___ effect', xp: 15 },
        { q: 'In a JWT, the header and payload are encoded using which scheme?', a: 'base64', hint: 'They are ___-encoded, NOT encrypted', xp: 10 },
      ],
    },
    {
      id: 't4', title: 'Types of Cryptographic Attacks',
      xp: 25,
      content: `
<h2>Types of Cryptographic Attacks</h2>
<p>Understanding how cryptography is attacked is just as important as understanding how it works. Attackers don't always need to "break the math" — they exploit weak implementations, poor key management, and protocol flaws.</p>
<h3>Attack Classification by What the Attacker Knows</h3>
<ul>
  <li><strong>Ciphertext-Only Attack (COA):</strong> Attacker only has encrypted messages. They try to deduce the key or plaintext. The weakest attack model. Example: frequency analysis on a Caesar cipher.</li>
  <li><strong>Known-Plaintext Attack (KPA):</strong> Attacker has some plaintext–ciphertext pairs. Goal: derive the key. WWII Allies used known German message openings ("Heil Hitler") to attack Enigma.</li>
  <li><strong>Chosen-Plaintext Attack (CPA):</strong> Attacker can choose arbitrary plaintexts and get them encrypted. They study how the cipher behaves. Modern ciphers must resist CPA.</li>
  <li><strong>Chosen-Ciphertext Attack (CCA):</strong> Attacker can submit ciphertexts for decryption and observe results. Padding oracle attacks are CCA attacks. This is the strongest model.</li>
</ul>
<h3>Attack Types by Method</h3>
<ul>
  <li><strong>Brute Force:</strong> Try every possible key. A 128-bit key has 2<sup>128</sup> possibilities — infeasible even with all computers on Earth running for billions of years.</li>
  <li><strong>Dictionary Attack:</strong> Try common passwords/keys from a wordlist. Effective against weak passwords.</li>
  <li><strong>Birthday Attack:</strong> Exploits the birthday paradox to find hash collisions in <em>O(2<sup>n/2</sup>)</em> operations (not O(2<sup>n</sup>)).</li>
  <li><strong>Man-in-the-Middle (MitM):</strong> Attacker intercepts communication between two parties, relaying messages while reading/modifying them. Defeated by proper authentication.</li>
  <li><strong>Replay Attack:</strong> Attacker captures a valid message and re-sends it later. Defeated by nonces (numbers used once) and timestamps.</li>
  <li><strong>Side-Channel Attack:</strong> Attacks the implementation, not the algorithm. Timing, power consumption, electromagnetic emissions, and even sound can leak key information.</li>
</ul>
<h3>Protocol-Level Attacks</h3>
<ul>
  <li><strong>Downgrade Attack:</strong> Forces the use of a weaker algorithm. POODLE and BEAST attacks forced use of SSLv3.</li>
  <li><strong>Length Extension Attack:</strong> Against MD5/SHA-1/SHA-2: given H(m), you can compute H(m||extra) without knowing m.</li>
  <li><strong>Padding Oracle:</strong> Use a server's "invalid padding" error message to decrypt data byte by byte. (Covered in detail in Room 7.)</li>
</ul>
<div class="warning-box"><i class="fas fa-exclamation-triangle"></i> <strong>Key Insight:</strong> Most real-world crypto attacks don't break the math. They exploit how crypto is <em>implemented</em> and <em>used</em>.</div>`,
      terminalCommands: {
        'help': 'Commands: python3 brute force simulation',
        'python3 -c "keys=2**128; print(f\'AES-128 keyspace: {keys:.2e} possible keys\')"': 'AES-128 keyspace: 3.40e+38 possible keys',
        'python3 -c "keys=2**56; print(f\'DES keyspace: {keys:.2e} possible keys (crackable!)\')"': 'DES keyspace: 7.21e+16 possible keys (crackable!)',
        'python3 -c "import time; attempts=0\nwhile attempts<1000000:\n    attempts+=1\nprint(f\'1M attempts done in simulation\')"': '1M attempts done in simulation',
        'python3 -c "import hashlib; [print(f\'Try {w}: {hashlib.md5(w.encode()).hexdigest()}\') for w in [\'password\',\'123456\',\'admin\',\'secret\']]"': 'Try password: 5f4dcc3b5aa765d61d8327deb882cf99\nTry 123456: e10adc3949ba59abbe56e057f20f883e\nTry admin: 21232f297a57a5a743894a0e4a801fc3\nTry secret: 5ebe2294ecd0e0f08eab7690d2a6ee69',
      },
      questions: [
        { q: 'In a Chosen-Ciphertext Attack, what can the attacker do that distinguishes it from a Chosen-Plaintext Attack?', a: 'submit ciphertexts for decryption', hint: 'The attacker submits ___ to a decryption oracle', xp: 15 },
        { q: 'A birthday attack reduces the effort to find a hash collision from O(2^n) to roughly what complexity?', a: '2^(n/2)', hint: 'Square root of the full space: O(2^___)', xp: 20 },
        { q: 'What type of attack intercepts communication between two parties while relaying messages?', a: 'man in the middle', hint: 'MitM — ___ in the ___', xp: 10 },
      ],
    },
    {
      id: 't5', title: 'Cryptographic Goals & Perfect Secrecy',
      xp: 30,
      content: `
<h2>Cryptographic Goals & Perfect Secrecy</h2>
<p>Modern cryptography is built on rigorous mathematical definitions of security. Understanding these formal goals helps you evaluate whether a cryptosystem is truly secure.</p>
<h3>Shannon's Information Theory</h3>
<p>Claude Shannon's 1949 paper defined what "secure" means mathematically. His key insight was that a cipher is secure if the ciphertext gives an attacker <em>no information</em> about the plaintext — formally called <strong>perfect secrecy</strong> or <strong>information-theoretic security</strong>.</p>
<h3>Perfect Secrecy (Information-Theoretic Security)</h3>
<p>A cipher has perfect secrecy if and only if:</p>
<pre><code>P(plaintext | ciphertext) = P(plaintext)</code></pre>
<p>Knowing the ciphertext gives you zero information about the plaintext. The <strong>One-Time Pad (OTP)</strong> is the only cipher proven to achieve perfect secrecy — but it requires a random key as long as the message, which is impractical at scale.</p>
<h3>Computational Security</h3>
<p>Since perfect secrecy is impractical, modern cryptography uses <em>computational security</em>: breaking the cipher is <em>computationally infeasible</em> given current hardware and algorithms. This is based on the assumption that certain mathematical problems (integer factorisation, discrete logarithm) are hard.</p>
<h3>Security Models: IND-CPA and IND-CCA2</h3>
<ul>
  <li><strong>IND-CPA (Indistinguishability under Chosen Plaintext Attack):</strong> An attacker who can encrypt messages of their choice cannot distinguish between encryptions of two different plaintexts. AES-CBC with a random IV satisfies this. AES-ECB does NOT.</li>
  <li><strong>IND-CCA2 (Adaptive Chosen Ciphertext Attack):</strong> Stronger: even with decryption oracle access (except for the challenge ciphertext), the attacker cannot break the scheme. AES-GCM provides this. AES-CBC alone does NOT.</li>
</ul>
<h3>Perfect Forward Secrecy (PFS)</h3>
<p>If a server's long-term private key is compromised later, PFS ensures past sessions cannot be decrypted. Achieved by generating ephemeral (temporary) session keys using Diffie-Hellman. TLS 1.3 mandates PFS.</p>
<div class="success-box"><i class="fas fa-check-circle"></i> <strong>Rule of Thumb:</strong> Always prefer authenticated encryption (AES-GCM, ChaCha20-Poly1305) over unauthenticated encryption (AES-CBC, AES-CTR alone). Authentication prevents ciphertext tampering.</div>
<h3>The Random Oracle Model</h3>
<p>Many proofs assume hash functions behave as "random oracles" — truly random functions. In practice, hash functions approximate this, but it remains an assumption, not a proven fact.</p>`,
      terminalCommands: {
        'help': 'Commands: openssl rand, python3 crypto concepts',
        'openssl rand -hex 32': 'a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456',
        'openssl rand -base64 32': 'pBF4GV9f8K3m2NqR7tY1ZxQw0eHcAsDv+jUgXkLiOW4=',
        'python3 -c "import secrets; print(secrets.token_hex(32))"': '8f3a2c1d9e4b5f6a7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b',
        'python3 -c "import secrets; print(secrets.token_urlsafe(32))"': 'xK3mN8pQ2rT5vW9yA1bC4dE7fG0hJ6kL',
      },
      questions: [
        { q: 'Which cipher is the ONLY one proven to achieve perfect secrecy?', a: 'one-time pad', hint: 'It requires a key as long as the message: the ___-___ ___', xp: 15 },
        { q: 'What security property ensures past session keys cannot be derived even if the server\'s long-term private key is compromised?', a: 'perfect forward secrecy', hint: 'PFS — ___ ___ ___', xp: 20 },
        { q: 'AES-GCM provides authenticated encryption. What does the "authenticated" part protect against?', a: 'tampering', hint: 'Prevents ciphertext ___ / modification', xp: 15 },
      ],
    },
  ],
};

/* ══════════════════════════════════════════════════════════════════
   ROOM 2 — Classical Ciphers
   ══════════════════════════════════════════════════════════════════ */
ROOMS['crypto-classical'] = {
  id: 'crypto-classical',
  path: 'crypto',
  title: 'Classical Ciphers',
  description: 'Study the ciphers used throughout history — from Caesar to the Vigenère cipher and the One-Time Pad. Learn how to break them using cryptanalysis.',
  difficulty: 'beginner',
  xpReward: 200,
  iconClass: 'fas fa-scroll',
  iconBg: 'rgba(245,158,11,.12)',
  iconColor: '#f59e0b',
  tasks: [
    {
      id: 't1', title: 'Caesar Cipher & ROT13',
      xp: 20,
      content: `
<h2>Caesar Cipher & ROT13</h2>
<p>The Caesar cipher is the simplest and most well-known substitution cipher. It works by shifting each letter of the alphabet by a fixed number of positions.</p>
<h3>How It Works</h3>
<pre><code>Plaintext:  A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
Shift +3:   D E F G H I J K L M N O P Q R S T U V W X Y Z A B C

Encrypt: Each letter → letter + 3 (mod 26)
Decrypt: Each letter → letter - 3 (mod 26)</code></pre>
<p>Example: "HELLO" with shift 3 → "KHOOR"</p>
<p>Mathematical formula:</p>
<pre><code>Encryption: C = (P + K) mod 26
Decryption: P = (C - K) mod 26

Where: P = plaintext letter (0=A, 1=B, ..., 25=Z)
       C = ciphertext letter
       K = key (shift value, 1-25)</code></pre>
<h3>Breaking the Caesar Cipher</h3>
<p>The Caesar cipher has only <strong>25 possible keys</strong> (shifts 1-25). Brute force takes at most 25 attempts — trivial even by hand.</p>
<pre><code># Brute force all 25 shifts
ciphertext = "KHOOR"
for shift in range(1, 26):
    decrypted = ''.join(chr((ord(c) - 65 - shift) % 26 + 65) for c in ciphertext)
    print(f"Shift {shift:2d}: {decrypted}")</code></pre>
<h3>ROT13 — Caesar-13</h3>
<p>ROT13 is simply a Caesar cipher with shift 13. Since 26/2 = 13, ROT13 is its own inverse: applying ROT13 twice returns the original text.</p>
<pre><code>ROT13("HELLO") = "URYYB"
ROT13("URYYB") = "HELLO"  ← same operation decrypts!</code></pre>
<p>ROT13 is commonly used online to <em>hide spoilers</em>, not for security.</p>
<div class="info-box"><i class="fas fa-terminal"></i> Use the terminal to brute-force decrypt "KHOOR" and to apply ROT13.</div>`,
      terminalCommands: {
        'help': 'Try: python3 Caesar and ROT13 commands, echo | tr ROT13',
        'echo "KHOOR" | tr \'A-Z\' \'XYZABCDEFGHIJKLMNOPQRSTUVW\'': 'EBIIL',
        'echo "HELLO WORLD" | tr \'A-Za-z\' \'N-ZA-Mn-za-m\'': 'URYYB JBEYQ',
        'echo "URYYB JBEYQ" | tr \'A-Za-z\' \'N-ZA-Mn-za-m\'': 'HELLO WORLD',
        'python3 -c "ct=\'KHOOR\'; [print(f\'Shift {k}: {\"\".join(chr((ord(c)-65-k)%26+65) for c in ct)}\') for k in range(1,26)]"': 'Shift  1: JGNNQ\nShift  2: IFMMP\nShift  3: HELLO\nShift  4: GDKKN\nShift  5: FCJJM\nShift  6: EBIIL\nShift  7: DAHH K\nShift  8: CZGGJ\nShift  9: BYFFI\nShift 10: AXEEH\nShift 11: ZWDDG\nShift 12: YVCCE\nShift 13: XUBBF\nShift 14: WTAAE\nShift 15: VS99D\nShift 16: UR88C\nShift 17: TQ77B\nShift 18: SP66A\nShift 19: RO559\nShift 20: QN448\nShift 21: PM337\nShift 22: OL226\nShift 23: NK115\nShift 24: MJ004\nShift 25: LIPPS',
        'python3 -c "ct=\'KHOOR\'; k=3; print(\'\'.join(chr((ord(c)-65-k)%26+65) for c in ct))"': 'HELLO',
      },
      questions: [
        { q: 'Decrypt "KHOOR" using the Caesar cipher. What is the plaintext? (shift = 3)', a: 'HELLO', hint: 'Shift each letter back by 3 positions', xp: 15 },
        { q: 'How many possible keys does the Caesar cipher have?', a: '25', hint: 'Shifts 1 through ___ (shift 0 = no change)', xp: 10 },
        { q: 'ROT13 applied twice to any text returns the original. What is this mathematical property called?', a: 'involution', hint: 'A function that is its own inverse is called an ___', xp: 20 },
      ],
    },
    {
      id: 't2', title: 'Vigenère Cipher',
      xp: 25,
      content: `
<h2>Vigenère Cipher</h2>
<p>The Vigenère cipher was called "le chiffre indéchiffrable" (the unbreakable cipher) for 300 years. It extends Caesar by using a <em>keyword</em> to create a different shift for each letter position.</p>
<h3>How It Works</h3>
<p>The keyword is repeated to match the length of the plaintext. Each letter of the plaintext is shifted by the corresponding letter of the keyword (A=0, B=1, ..., Z=25).</p>
<pre><code>Plaintext:  A T T A C K A T D A W N
Keyword:    L E M O N L E M O N L E
            ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓
Ciphertext: L X F O P V E F R N H R

A+L = 0+11 = 11 = L
T+E = 19+4 = 23 = X
T+M = 19+12 = 31 mod 26 = 5 = F
...</code></pre>
<h3>Encryption Formula</h3>
<pre><code>C[i] = (P[i] + K[i mod len(K)]) mod 26
P[i] = (C[i] - K[i mod len(K)]) mod 26</code></pre>
<h3>Why It's Stronger Than Caesar</h3>
<p>The same plaintext letter is encrypted differently depending on its position. This defeats simple frequency analysis. The letter "E" (most common in English) might appear as any ciphertext letter depending on the key.</p>
<h3>Breaking the Vigenère Cipher</h3>
<p>Despite its reputation, the Vigenère cipher was broken in the 1800s by two independent methods:</p>
<ol>
  <li><strong>Kasiski Test (1863):</strong> Find repeated sequences in the ciphertext. Their distances are likely multiples of the key length. The GCD of these distances reveals the key length.</li>
  <li><strong>Index of Coincidence:</strong> Measures how "non-random" the distribution of letters is. Once you know the key length, you split the ciphertext into columns (each encrypted with the same Caesar shift) and use frequency analysis on each column.</li>
</ol>
<div class="warning-box"><i class="fas fa-exclamation-triangle"></i> The Vigenère cipher is completely insecure by modern standards. Never use it for real data. It's a useful teaching tool only.</div>`,
      terminalCommands: {
        'help': 'Commands: python3 Vigenere encrypt/decrypt',
        'python3 -c "pt=\'ATTACKATDAWN\'; key=\'LEMON\'; ct=\'\'.join(chr((ord(p)-65+ord(key[i%len(key)])-65)%26+65) for i,p in enumerate(pt)); print(ct)"': 'LXFOPVEFRNHR',
        'python3 -c "ct=\'LXFOPVEFRNHR\'; key=\'LEMON\'; pt=\'\'.join(chr((ord(c)-65-(ord(key[i%len(key)])-65))%26+65) for i,c in enumerate(ct)); print(pt)"': 'ATTACKATDAWN',
        'python3 -c "ct=\'LXFOPVEFRNHR\'; print(\'Key length guess: checking GCD of repeated pattern distances...\')\nprint(\'Found key length: 5\')"': 'Key length guess: checking GCD of repeated pattern distances...\nFound key length: 5',
        'python3 -c "from collections import Counter; text=\'ETAOINSRHLDCUMFPGWYBVKXJQZ\'; freq=Counter(text); [print(f\'{c}: {n}\') for c,n in freq.most_common(5)]"': 'E: 2\nT: 2\nA: 2\nO: 1\nI: 1',
      },
      questions: [
        { q: 'Encrypt "HELLO" with the Vigenère cipher using key "KEY". What is the ciphertext?', a: 'RIJVS', hint: 'H+K=R, E+E=I, L+Y=J, L+K=V, O+E=S', xp: 20 },
        { q: 'What 1863 technique finds the Vigenère key length by looking at repeated sequences in ciphertext?', a: 'kasiski', hint: 'Named after Friedrich Kasiski — the ___ test', xp: 20 },
        { q: 'Once you know the Vigenère key length, each column is essentially which simpler cipher?', a: 'caesar', hint: 'Each column has a single fixed shift = a ___ cipher', xp: 15 },
      ],
    },
    {
      id: 't3', title: 'Substitution & Transposition Ciphers',
      xp: 20,
      content: `
<h2>Substitution & Transposition Ciphers</h2>
<p>Beyond Caesar and Vigenère, classical cryptographers developed more complex systems. These fall into two fundamental categories: <strong>substitution</strong> (replace letters) and <strong>transposition</strong> (rearrange letters).</p>
<h3>Simple Substitution Cipher</h3>
<p>Instead of a fixed shift, a random permutation of the alphabet is used as the key. The key space is 26! ≈ 4×10<sup>26</sup> — larger than many modern keys. Yet it's still breakable with frequency analysis.</p>
<pre><code>Plaintext:  A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
Key (perm): Q W E R T Y U I O P A S D F G H J K L Z X C V B N M

"HELLO" → "ITSSG"</code></pre>
<h3>Atbash Cipher</h3>
<p>A specific substitution: reverse the alphabet. A↔Z, B↔Y, C↔X, etc. Used in the Hebrew Bible. Like ROT13, it is its own inverse.</p>
<pre><code>A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
Z Y X W V U T S R Q P O N M L K J I H G F E D C B A

"HELLO" → "SVOOL"</code></pre>
<h3>Playfair Cipher</h3>
<p>Encrypts <em>digraphs</em> (pairs of letters) using a 5×5 key square. Harder to crack than monoalphabetic ciphers because it partially defeats frequency analysis (26² = 676 digraphs vs 26 letters). Used by the British in WWI and WWII.</p>
<h3>Rail Fence Cipher (Transposition)</h3>
<p>Text is written in a zigzag pattern across multiple "rails", then read off row by row.</p>
<pre><code>Plaintext: "WEAREDISCOVERED"
Rails: 3

W . . . E . . . I . . . V . .    Rail 1
. E . R . D . S . O . E . E .    Rail 2
. . A . . . I . . . C . . . D   Rail 3

Ciphertext: WEIVERDSOEEAIICD</code></pre>
<h3>Columnar Transposition</h3>
<p>Write plaintext in rows under a keyword, then read columns in alphabetical order of the keyword letters.</p>
<pre><code>Key: ZEBRA → column order is 5,2,1,3,4
Plaintext (padded): WEAREDISCOVERED
Written under key:
  Z E B R A
  W E A R E
  D I S C O
  V E R E D

Read columns in order A,B,E,R,Z: AESREIDCREEVWDOV</code></pre>
<div class="info-box"><i class="fas fa-lightbulb"></i> Modern block ciphers like AES combine both substitution (SubBytes step) AND transposition (ShiftRows step) — a Substitution-Permutation Network (SPN).</div>`,
      terminalCommands: {
        'help': 'Commands: python3 atbash, substitution demos',
        'python3 -c "msg=\'HELLO\'; atbash=\'\'.join(chr(90-(ord(c)-65)) for c in msg); print(atbash)"': 'SVOOL',
        'python3 -c "msg=\'SVOOL\'; atbash=\'\'.join(chr(90-(ord(c)-65)) for c in msg); print(atbash)"': 'HELLO',
        'python3 -c "import string; alpha=string.ascii_uppercase; key=\'QWERTYUIOPASDFGHJKLZXCVBNM\'; table=str.maketrans(alpha,key); print(\'HELLO\'.translate(table))"': 'ITSSG',
        'python3 -c "msg=\'WEAREDISCOVERED\'; rails=3; fence=[[] for _ in range(rails)]; rail,direction=0,1\nfor c in msg:\n    fence[rail].append(c); rail+=direction\n    if rail==rails-1 or rail==0: direction*=-1\nprint(\'\'.join(\'\'.join(r) for r in fence))"': 'WECIDEAORVEERED',
      },
      questions: [
        { q: 'What is the Atbash encryption of "HELLO"?', a: 'SVOOL', hint: 'Reverse the alphabet: H(8)→S(19), E(5)→V(22), L(12)→O(15), O(15)→L(12)', xp: 15 },
        { q: 'A cipher that rearranges the positions of letters without changing them is called a what?', a: 'transposition', hint: 'It trans-poses (re-positions) letters rather than substituting them', xp: 10 },
        { q: 'What modern block cipher step is analogous to classical substitution?', a: 'SubBytes', hint: 'In AES: ___ (substitution) and ShiftRows (transposition)', xp: 20 },
      ],
    },
    {
      id: 't4', title: 'The One-Time Pad',
      xp: 25,
      content: `
<h2>The One-Time Pad — Perfect Secrecy</h2>
<p>The One-Time Pad (OTP) is the only cipher ever proven to be <strong>perfectly secure</strong>. Invented by Gilbert Vernam in 1917, its security is mathematically provable — not just computationally hard.</p>
<h3>How It Works</h3>
<p>The key is a string of random bytes (or letters) that is exactly as long as the message. Encryption is simple XOR (or modular addition):</p>
<pre><code>Plaintext:  H  E  L  L  O   (72  69  76  76  79)
Key:        X  M  C  K  P   (88  77  67  75  80)
XOR:        ↓  ↓  ↓  ↓  ↓
Ciphertext: (8) (8) (27)(3) (31) → binary XOR result</code></pre>
<p>In binary (XOR is the core operation):</p>
<pre><code>H = 01001000
K = 01011000
  ─────────
C = 00010000  (XOR)

Decrypt: C XOR K = P  (XOR is its own inverse)</code></pre>
<h3>Why It's Perfectly Secure</h3>
<p>Every possible plaintext is equally likely given any ciphertext. If the key is truly random, seeing the ciphertext gives you zero information. An attacker who tries every possible key will get every possible plaintext — and has no way to know which is correct.</p>
<h3>Requirements for OTP Security</h3>
<div class="warning-box"><i class="fas fa-exclamation-triangle"></i> The OTP is only perfectly secure if ALL of these conditions hold:
<ol>
  <li><strong>Key is truly random</strong> (not pseudorandom)</li>
  <li><strong>Key is as long as the message</strong></li>
  <li><strong>Key is NEVER reused</strong> — even for a different message</li>
  <li><strong>Key is kept completely secret</strong></li>
</ol>
Violating ANY condition destroys security completely.</div>
<h3>Why It's Impractical</h3>
<ul>
  <li>Key is as large as all data you'll ever send</li>
  <li>Must securely distribute keys in advance</li>
  <li>Key management is a nightmare at scale</li>
</ul>
<h3>The Two-Time Pad — A Fatal Mistake</h3>
<p>If you reuse a key: <code>C1 = P1 XOR K</code> and <code>C2 = P2 XOR K</code>, then:</p>
<pre><code>C1 XOR C2 = P1 XOR P2</code></pre>
<p>The key cancels out! An attacker can XOR the two ciphertexts and get the XOR of the two plaintexts. With enough cribbing (trying known words), both messages can be fully recovered.</p>
<p><strong>Historical Example:</strong> The US and USSR used Venona one-time pads during WWII, but Soviet intelligence reused some pads under wartime pressure. The NSA exploited this and spent decades decrypting Soviet spy communications.</p>`,
      terminalCommands: {
        'help': 'Commands: python3 OTP XOR demos',
        'python3 -c "import os; key=os.urandom(5); msg=b\'HELLO\'; ct=bytes(a^b for a,b in zip(msg,key)); print(f\'Key: {key.hex()}\nCT:  {ct.hex()}\')"': 'Key: a3f8c2d1e9\nCT:  ebbface79e',
        'python3 -c "ct=bytes.fromhex(\'ebbface79e\'); key=bytes.fromhex(\'a3f8c2d1e9\'); pt=bytes(a^b for a,b in zip(ct,key)); print(pt.decode())"': 'HELLO',
        'python3 -c "c1=b\'\\x4f\\x6a\\x3c\'; c2=b\'\\x27\\x1e\\x5b\'; xored=bytes(a^b for a,b in zip(c1,c2)); print(xored.hex(),\'← XOR of two PTs if key reused!\')"': '68 74 67 ← XOR of two PTs if key reused!',
        'python3 -c "p1=b\'HI!\'; p2=b\'NO!\'; xored=bytes(a^b for a,b in zip(p1,p2)); print(xored.hex())"': '062300',
      },
      questions: [
        { q: 'What happens if you XOR two ciphertexts that were encrypted with the same OTP key?', a: 'XOR of plaintexts', hint: 'C1 XOR C2 = P1 XOR ___ (key cancels out)', xp: 20 },
        { q: 'What is the minimum key length requirement for a One-Time Pad?', a: 'same length as message', hint: 'Key must be ___ ___ ___ ___ the plaintext', xp: 15 },
        { q: 'What NSA program successfully decrypted Soviet OTP communications by exploiting key reuse?', a: 'Venona', hint: 'The ___ project ran from 1943 to 1980', xp: 15 },
      ],
    },
    {
      id: 't5', title: 'Cryptanalysis of Classical Ciphers',
      xp: 30,
      content: `
<h2>Cryptanalysis of Classical Ciphers</h2>
<p>Cryptanalysis is the science of breaking ciphers without knowledge of the key. The techniques developed for classical ciphers laid the foundation for modern cryptanalysis.</p>
<h3>Frequency Analysis</h3>
<p>In English, letters appear with known frequencies:</p>
<pre><code>E: 12.7%   T: 9.1%   A: 8.2%   O: 7.5%   I: 7.0%
N: 6.7%   S: 6.3%   H: 6.1%   R: 6.0%   D: 4.3%</code></pre>
<p>In a monoalphabetic cipher (including Caesar and simple substitution), these frequencies are preserved in the ciphertext. The most frequent ciphertext letter is likely the encryption of 'E'.</p>
<h3>Index of Coincidence (IC)</h3>
<p>The IC measures how likely two randomly chosen letters from a text are the same:</p>
<pre><code>IC = Σ(f_i * (f_i - 1)) / (N * (N-1))

Random text IC ≈ 0.038 (uniform distribution)
English text IC ≈ 0.065
Vigenère IC ≈ 0.038-0.065 (depends on key length)</code></pre>
<p>A low IC suggests a polyalphabetic cipher. By testing different key lengths, the key length that produces columns with IC ≈ 0.065 is likely correct.</p>
<h3>Kasiski Examination</h3>
<ol>
  <li>Find repeated trigrams (3-letter sequences) in the ciphertext</li>
  <li>Record the distances between their occurrences</li>
  <li>The GCD of these distances is likely the key length</li>
  <li>Now split the ciphertext into groups by position mod key_length</li>
  <li>Each group was encrypted with the same Caesar shift → frequency analysis</li>
</ol>
<h3>Practical Attack Example</h3>
<pre><code>Ciphertext: "LXFOPVEFRNHRLXFOPVEFRNHR..."
Step 1: "LXFOPV" repeats at positions 0 and 12 → distance 12
Step 2: GCD(12, ...) = probably 5 or 6
Step 3: Test key length 5: split into 5 columns
Step 4: Frequency analysis on each column
Step 5: Most frequent letter in each col → shift amount → key letter
Step 6: Key = "LEMON"</code></pre>
<div class="success-box"><i class="fas fa-check-circle"></i> <strong>Key takeaway:</strong> Classical ciphers are completely broken. They are valuable only for teaching cryptanalysis principles. Never use them for real security.</div>
<h3>Quiz: Apply Your Knowledge</h3>
<p>Use the terminal to perform frequency analysis and attempt to break the following ciphertext (Caesar cipher, unknown shift):</p>
<p><code>WKH TXLFN EURZQ IRA MXPSV RYHU WKH ODCB GRJ</code></p>`,
      terminalCommands: {
        'help': 'Commands: python3 frequency analysis, crack caesar',
        'python3 -c "from collections import Counter; ct=\'WKH TXLFN EURZQ IRA MXPSV RYHU WKH ODCB GRJ\'; letters=[c for c in ct.upper() if c.isalpha()]; freq=Counter(letters); [print(f\'{c}: {n} ({100*n/len(letters):.1f}%)\') for c,n in freq.most_common(8)]"': 'H: 5 (14.3%)\nR: 4 (11.4%)\nW: 3 (8.6%)\nX: 3 (8.6%)\nK: 3 (8.6%)\nU: 3 (8.6%)\nJ: 2 (5.7%)\nQ: 2 (5.7%)',
        'python3 -c "ct=\'WKHWXLFNEURZQIRAMXPSVRYHUWHKODCBGRJ\'; shift=ord(\'H\')-ord(\'E\'); print(f\'Likely shift: {shift}\')\ndec=\'\'.join(chr((ord(c)-65-shift)%26+65) if c.isalpha() else c for c in ct.upper()); print(dec)"': 'Likely shift: 3\nTHETUICKBROWNFOXJUMPSOVERTHELAZYDOG',
        'python3 -c "ct=\'WKH TXLFN EURZQ IRA MXPSV RYHU WKH ODCB GRJ\'; k=3; print(\'\'.join(chr((ord(c)-65-k)%26+65) if c.isalpha() else c for c in ct.upper()))"': 'THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG',
        'python3 -c "import math; text=\'LXFOPVEFRNHRLXFOPV\'; [print(f\'i={i}, found match\') for i in range(3,len(text)//2) if text[:3]==text[i:i+3]]"': 'i=12, found match',
      },
      questions: [
        { q: 'Decrypt the ciphertext "WKH TXLFN EURZQ IRA" using the Caesar cipher. What is the plaintext? (hint: shift=3)', a: 'THE QUICK BROWN FOX', hint: 'Most common letter H=E, shift is 3 positions back', xp: 20 },
        { q: 'What English letter has the highest frequency (~12.7%) and is the prime target for frequency analysis?', a: 'E', hint: 'The most common letter in the English alphabet is ___', xp: 10 },
        { q: 'In the Kasiski examination, what mathematical operation on the distances between repeated sequences reveals the key length?', a: 'GCD', hint: 'Greatest Common ___ of the distances', xp: 20 },
      ],
    },
  ],
};

/* ══════════════════════════════════════════════════════════════════
   ROOM 3 — Symmetric Encryption
   ══════════════════════════════════════════════════════════════════ */
ROOMS['crypto-symmetric'] = {
  id: 'crypto-symmetric',
  path: 'crypto',
  title: 'Symmetric Encryption',
  description: 'Deep dive into modern symmetric encryption: block ciphers, stream ciphers, DES, 3DES, AES, and modes of operation. Understand the ECB penguin problem.',
  difficulty: 'intermediate',
  xpReward: 250,
  iconClass: 'fas fa-key',
  iconBg: 'rgba(245,158,11,.12)',
  iconColor: '#f59e0b',
  tasks: [
    {
      id: 't1', title: 'Block Ciphers & Stream Ciphers',
      xp: 20,
      content: `
<h2>Block Ciphers & Stream Ciphers</h2>
<p>Modern symmetric ciphers fall into two categories based on how they process data.</p>
<h3>Block Ciphers</h3>
<p>A block cipher encrypts data in fixed-size chunks called <em>blocks</em>. AES uses 128-bit (16-byte) blocks. DES uses 64-bit blocks.</p>
<pre><code>Input:  [Plaintext Block 1][Plaintext Block 2][Plaintext Block 3]
           ↓ E(K)              ↓ E(K)              ↓ E(K)
Output: [Ciphertext Block 1][Ciphertext Block 2][Ciphertext Block 3]</code></pre>
<p>If the last block is shorter than the block size, <strong>padding</strong> is added (PKCS#7, ANSI X.923, ISO 7816-4).</p>
<h3>Stream Ciphers</h3>
<p>A stream cipher generates a continuous <em>keystream</em> from the key and XORs it with the plaintext byte by byte. Very fast, no padding needed.</p>
<pre><code>Keystream: K₁ K₂ K₃ K₄ K₅ K₆ K₇ K₈ ...  (generated from key)
Plaintext: P₁ P₂ P₃ P₄ P₅ P₆ P₇ P₈ ...
XOR:       ↓  ↓  ↓  ↓  ↓  ↓  ↓  ↓
Ciphertext:C₁ C₂ C₃ C₄ C₅ C₆ C₇ C₈ ...</code></pre>
<h3>Common Stream Ciphers</h3>
<ul>
  <li><strong>RC4:</strong> Widely used in WEP and early TLS. <strong>Broken</strong> — do not use. Biased keystream, multiple vulnerabilities.</li>
  <li><strong>ChaCha20:</strong> Modern, secure stream cipher by Daniel Bernstein. Used in TLS 1.3, WireGuard. Very fast in software, constant-time (resistant to timing attacks).</li>
  <li><strong>Salsa20:</strong> Predecessor to ChaCha20, also secure.</li>
</ul>
<h3>Block Ciphers as Stream Ciphers</h3>
<p>Block ciphers can be turned into stream ciphers using <strong>CTR mode</strong> or <strong>OFB mode</strong>. This is how AES-CTR works: encrypt a counter value to produce keystream blocks, then XOR with plaintext.</p>
<h3>PKCS#7 Padding</h3>
<pre><code>Block size: 16 bytes
Input: "Hello" (5 bytes) → need 11 more bytes
PKCS#7: append 11 bytes of value 0x0B (decimal 11)
Result: "Hello" + b'\x0b\x0b\x0b\x0b\x0b\x0b\x0b\x0b\x0b\x0b\x0b'

If input is exactly 16 bytes → add a full block of 0x10 padding!</code></pre>`,
      terminalCommands: {
        'help': 'Commands: python3 block/stream cipher demos',
        'python3 -c "msg=b\'Hello World!\'; block_size=16; pad_len=block_size-(len(msg)%block_size); padded=msg+bytes([pad_len]*pad_len); print(padded.hex())"': '48656c6c6f20576f726c642100000004',
        'python3 -c "ks=bytes([0x41]*16); pt=b\'Attack at noon!!\'; ct=bytes(a^b for a,b in zip(pt,ks)); print(ct.hex())"': '00350736001514104e3b14160b480100',
        'python3 -c "from Crypto.Cipher import AES; import os; key=os.urandom(16); cipher=AES.new(key,AES.MODE_CTR); ct=cipher.encrypt(b\'Stream mode test\'); print(ct.hex())"': 'a3f8c2d1e94b760f5a2c8d3e1f074a8b',
      },
      questions: [
        { q: 'What size blocks does AES use (in bits)?', a: '128', hint: 'AES has a fixed block size of ___ bits (16 bytes)', xp: 10 },
        { q: 'A stream cipher XORs the plaintext with what?', a: 'keystream', hint: 'A pseudo-random ___ generated from the key', xp: 10 },
        { q: 'RC4 stream cipher is considered broken. Which modern stream cipher replaced it in TLS 1.3?', a: 'ChaCha20', hint: 'Named after a dance: ___ ___', xp: 15 },
      ],
    },
    {
      id: 't2', title: 'DES & 3DES',
      xp: 20,
      content: `
<h2>DES & 3DES</h2>
<p>DES (Data Encryption Standard) was the world's first widely-deployed standard for symmetric encryption. Understanding its design and weaknesses is essential cryptography education.</p>
<h3>DES — Data Encryption Standard (1977)</h3>
<ul>
  <li><strong>Block size:</strong> 64 bits (8 bytes)</li>
  <li><strong>Key size:</strong> 56 bits (technically 64 bits, but 8 are parity bits)</li>
  <li><strong>Structure:</strong> 16-round Feistel network</li>
  <li><strong>Designer:</strong> IBM, with input from the NSA</li>
</ul>
<h3>The Feistel Network</h3>
<p>DES uses a Feistel structure, which is elegant because the same hardware can encrypt and decrypt (just reverse the round keys):</p>
<pre><code>Each round:
1. Split block into Left (L) and Right (R) halves (32 bits each)
2. L[i+1] = R[i]
3. R[i+1] = L[i] XOR F(R[i], K[i])
   where F is the round function using the round key K[i]

After 16 rounds, swap halves to produce ciphertext</code></pre>
<h3>DES Key Weaknesses</h3>
<ul>
  <li><strong>56-bit key is too small.</strong> 2<sup>56</sup> ≈ 72 quadrillion keys. In 1998, the EFF's "Deep Crack" machine cracked DES in 22 hours for $250,000. Today it's possible in under a day with cheap hardware or cloud GPUs.</li>
  <li><strong>Weak keys:</strong> 4 keys that produce all identical round subkeys (e.g., all zeros, all ones).</li>
  <li><strong>Semi-weak key pairs:</strong> Pairs (K1, K2) where Encrypt(K1, Encrypt(K2, P)) = P.</li>
</ul>
<h3>3DES (Triple DES)</h3>
<p>3DES applies DES three times to increase security:</p>
<pre><code>C = DES_K3(DES_K2⁻¹(DES_K1(P)))   (EDE mode: Encrypt-Decrypt-Encrypt)

3-key 3DES: K1 ≠ K2 ≠ K3 → effective key = 112 bits
2-key 3DES: K1 = K3 ≠ K2 → effective key = 80 bits (vulnerable to meet-in-the-middle)</code></pre>
<div class="warning-box"><i class="fas fa-exclamation-triangle"></i> <strong>3DES is deprecated.</strong> NIST deprecated 3DES in 2017 and disallowed it after 2023. It's vulnerable to the SWEET32 birthday attack and is extremely slow. Use AES instead.</div>`,
      terminalCommands: {
        'help': 'Commands: openssl DES/3DES demos (educational only)',
        'openssl enc -des -K "0123456789ABCDEF" -nosalt -e -in /dev/stdin': 'Warning: DES is deprecated and insecure!\nUse AES instead. This is for educational purposes only.',
        'openssl speed des des3 aes-128-cbc 2>&1 | grep -E "des|aes"': 'Doing des cbc for 3s on 8 size blocks...\ndes3 cbc     7832.4k bytes/s\naes-128 cbc  825471.3k bytes/s   ← ~100x faster than 3DES',
        'python3 -c "print(f\'DES keyspace: 2^56 = {2**56:,} possible keys\')\nprint(f\'Time to crack @ 1B keys/sec: {2**56/1e9/3600/24:.0f} days\')"': 'DES keyspace: 2^56 = 72,057,594,037,927,936 possible keys\nTime to crack @ 1B keys/sec: 834 days\n(but modern hardware does trillions/sec — hours to crack)',
      },
      questions: [
        { q: 'What is the effective key size (in bits) of DES?', a: '56', hint: '64 bits total minus 8 parity bits = ___ effective bits', xp: 15 },
        { q: 'What design structure does DES use, where the same circuit handles both encryption and decryption?', a: 'Feistel', hint: 'Named after Horst ___, who designed it at IBM', xp: 15 },
        { q: 'In 3DES EDE mode, the operations are performed in what order?', a: 'Encrypt Decrypt Encrypt', hint: 'EDE: ___ - ___ - ___', xp: 15 },
      ],
    },
    {
      id: 't3', title: 'AES: The Gold Standard',
      xp: 30,
      content: `
<h2>AES: The Advanced Encryption Standard</h2>
<p>AES (Rijndael) is the most important symmetric cipher in use today. Designed by Belgian cryptographers Joan Daemen and Vincent Rijmen, it won NIST's 5-year public competition in 2001 and has remained unbroken since.</p>
<h3>AES Parameters</h3>
<pre><code>Block size: 128 bits (16 bytes) — ALWAYS
Key sizes:  128 bits → 10 rounds
            192 bits → 12 rounds
            256 bits → 14 rounds</code></pre>
<h3>The Four Operations Per Round</h3>
<p>AES operates on a 4×4 matrix of bytes called the "State". Each round applies four transformations:</p>
<ol>
  <li><strong>SubBytes:</strong> Non-linear substitution — each byte is replaced using a fixed lookup table (S-Box). Provides <em>confusion</em>. The S-Box is based on the multiplicative inverse in GF(2<sup>8</sup>).</li>
  <li><strong>ShiftRows:</strong> Cyclic shift of each row of the State. Row 0 unchanged, Row 1 shifts left 1, Row 2 shifts left 2, Row 3 shifts left 3. Provides <em>diffusion</em>.</li>
  <li><strong>MixColumns:</strong> Matrix multiplication in GF(2<sup>8</sup>). Mixes each column, ensuring each output byte depends on all 4 input bytes. Provides <em>diffusion</em>. (Skipped in the final round.)</li>
  <li><strong>AddRoundKey:</strong> XOR the State with the round key (derived from the original key via the key schedule). Adds the secret.</li>
</ol>
<pre><code>AES-128 encryption:
KeyExpansion(key) → 11 round keys (RK0 to RK10)

Initial: AddRoundKey(State, RK0)
Rounds 1-9:
  SubBytes(State)
  ShiftRows(State)
  MixColumns(State)
  AddRoundKey(State, RKi)
Round 10 (final):
  SubBytes(State)
  ShiftRows(State)
  AddRoundKey(State, RK10)  ← No MixColumns!</code></pre>
<h3>Why AES Is Secure</h3>
<ul>
  <li><strong>Confusion:</strong> SubBytes uses a complex, non-linear S-Box</li>
  <li><strong>Diffusion:</strong> ShiftRows + MixColumns spread changes across the entire block</li>
  <li><strong>Key whitening:</strong> Every round uses a different round key</li>
  <li><strong>No known practical attacks</strong> against full AES with a random key</li>
  <li>Best known attack: biclique cryptanalysis reduces complexity from 2<sup>128</sup> to 2<sup>126.1</sup> — still completely infeasible</li>
</ul>
<div class="success-box"><i class="fas fa-check-circle"></i> <strong>AES is recommended for all new symmetric encryption.</strong> Use AES-128 for normal use, AES-256 for top-secret data. Combined with an authenticated mode (GCM), it is the gold standard.</div>`,
      terminalCommands: {
        'help': 'Commands: openssl AES encrypt/decrypt',
        'openssl enc -aes-256-cbc -pbkdf2 -iter 100000 -k "MySecretPassword" -in /dev/null -out /dev/null 2>&1': 'AES-256-CBC encryption ready. Block size: 16 bytes, Key size: 32 bytes',
        'python3 -c "from Crypto.Cipher import AES; from Crypto.Util.Padding import pad; key=b\'0\'*32; cipher=AES.new(key,AES.MODE_CBC,b\'0\'*16); ct=cipher.encrypt(pad(b\'Hello AES World!\',16)); print(ct.hex())"': '7e8b1c2a3f4d5e6f7a8b9c0d1e2f3a4b',
        'python3 -c "print(\'AES-128: 10 rounds\')\nprint(\'AES-192: 12 rounds\')\nprint(\'AES-256: 14 rounds\')"': 'AES-128: 10 rounds\nAES-192: 12 rounds\nAES-256: 14 rounds',
        'openssl speed aes-128-cbc aes-256-cbc': 'Doing aes-128 cbc for 3s: 3147161600 bytes in 3.00s\nDoing aes-256 cbc for 3s: 2198118400 bytes in 3.00s\naes-128-cbc: 1049053.9k bytes/s\naes-256-cbc:  732706.1k bytes/s',
      },
      questions: [
        { q: 'How many rounds does AES-128 perform?', a: '10', hint: 'AES-128 → ___ rounds, AES-192 → 12, AES-256 → 14', xp: 10 },
        { q: 'Which AES step provides confusion by replacing each byte using a non-linear S-Box lookup?', a: 'SubBytes', hint: '___ ___ replaces (substitutes) each byte', xp: 15 },
        { q: 'Which AES step is skipped in the FINAL round?', a: 'MixColumns', hint: 'Rounds 1-(N-1) use all four steps; the final round skips ___', xp: 20 },
      ],
    },
    {
      id: 't4', title: 'Block Cipher Modes of Operation',
      xp: 30,
      content: `
<h2>Block Cipher Modes of Operation</h2>
<p>A block cipher alone only encrypts a single fixed-size block. <em>Modes of operation</em> define how to use a block cipher to encrypt arbitrarily long messages. The choice of mode is critical — using the wrong mode can completely undermine security.</p>
<h3>ECB — Electronic Codebook (⚠️ NEVER USE)</h3>
<p>Each block is encrypted independently with the same key.</p>
<pre><code>C[i] = E(K, P[i])</code></pre>
<div class="warning-box"><i class="fas fa-exclamation-triangle"></i> <strong>ECB is fatally broken for structured data.</strong> Identical plaintext blocks produce identical ciphertext blocks. This leaks patterns.
The famous "ECB penguin": encrypt a bitmap of Tux the penguin with AES-ECB and the penguin's outline is still clearly visible in the ciphertext.</div>
<h3>CBC — Cipher Block Chaining (Common but Vulnerable to Oracle Attacks)</h3>
<pre><code>Encryption: C[i] = E(K, P[i] XOR C[i-1])    (C[0] = IV)
Decryption: P[i] = D(K, C[i]) XOR C[i-1]</code></pre>
<ul>
  <li>Requires a random IV (Initialization Vector) — must be unpredictable</li>
  <li>Encryption is sequential (cannot be parallelized)</li>
  <li>Decryption CAN be parallelized</li>
  <li><strong>Weakness:</strong> Vulnerable to padding oracle attacks if error messages leak padding validity</li>
</ul>
<h3>CTR — Counter Mode (Makes Block Cipher a Stream Cipher)</h3>
<pre><code>Keystream[i] = E(K, Nonce || Counter[i])
C[i] = P[i] XOR Keystream[i]</code></pre>
<ul>
  <li>Both encryption and decryption are fully parallelizable</li>
  <li>No padding needed (stream cipher behaviour)</li>
  <li><strong>Critical:</strong> Never reuse Nonce+Key combination (two-time pad vulnerability)</li>
</ul>
<h3>GCM — Galois/Counter Mode (RECOMMENDED)</h3>
<p>GCM = CTR mode + GHASH authentication. It provides <strong>Authenticated Encryption with Associated Data (AEAD)</strong>: both confidentiality AND integrity in a single pass.</p>
<pre><code>GCM output: (Ciphertext, Authentication Tag)
The tag verifies both the ciphertext AND any associated data (e.g., headers)</code></pre>
<ul>
  <li>IND-CCA2 secure</li>
  <li>Parallelizable</li>
  <li>Used in TLS 1.3, SSH, IPsec</li>
  <li>128-bit authentication tag</li>
  <li><strong>Warning:</strong> Nonce reuse in GCM leaks the authentication key (GCM is "nonce-misuse catastrophic")</li>
</ul>
<h3>Mode Comparison</h3>
<pre><code>Mode   │ Parallel Enc │ Parallel Dec │ Auth │ Padding │ Safe?
───────┼──────────────┼──────────────┼──────┼─────────┼──────
ECB    │     YES      │     YES      │  No  │  Yes    │  NO ✗
CBC    │     No       │     YES      │  No  │  Yes    │  Risky
CTR    │     YES      │     YES      │  No  │  No     │  OK
GCM    │     YES      │     YES      │ YES  │  No     │  YES ✓</code></pre>`,
      terminalCommands: {
        'help': 'Commands: python3 mode demos',
        'python3 -c "from Crypto.Cipher import AES; key=b\'A\'*16; ct_ecb=AES.new(key,AES.MODE_ECB).encrypt(b\'AAAAAAAAAAAAAAAA\'*2); print(\'ECB same block:\',ct_ecb[:16].hex()==ct_ecb[16:].hex())"': 'ECB same block: True  ← IDENTICAL ciphertext for identical blocks!',
        'python3 -c "from Crypto.Cipher import AES; import os; key=b\'A\'*16; iv=os.urandom(16); c=AES.new(key,AES.MODE_CBC,iv); ct=c.encrypt(b\'AAAAAAAAAAAAAAAA\'*2); print(ct[:16].hex()==ct[16:].hex())"': 'False  ← CBC: different ciphertext even for identical blocks (due to chaining)',
        'python3 -c "from Crypto.Cipher import AES; import os; key=b\'A\'*16; nonce=os.urandom(16); c=AES.new(key,AES.MODE_GCM,nonce=nonce); ct,tag=c.encrypt_and_digest(b\'Secret message here!\'); print(f\'CT: {ct.hex()}\nTag: {tag.hex()}\')"': 'CT: 7f3a2c1d9e4b5f6a7c8d9e0f1a2b3c4d\nTag: a3f8c2d1e94b760f5a2c8d3e1f074a8b',
      },
      questions: [
        { q: 'Why is ECB mode dangerous for encrypting structured data?', a: 'identical blocks produce identical ciphertext', hint: 'Same plaintext block → same ___text block, leaking patterns', xp: 20 },
        { q: 'What does GCM provide that plain CTR mode does not?', a: 'authentication', hint: 'GCM provides AEAD — Authenticated Encryption with ___ Data', xp: 15 },
        { q: 'In CBC mode, what value is XORed with the first plaintext block before encryption?', a: 'IV', hint: 'The ___: Initialization Vector', xp: 10 },
      ],
    },
    {
      id: 't5', title: 'Key Management & The Key Distribution Problem',
      xp: 25,
      content: `
<h2>Key Management & The Key Distribution Problem</h2>
<p>Symmetric encryption is fast and secure, but has a critical limitation: how do two parties securely share a key before they can communicate securely?</p>
<h3>The Key Distribution Problem</h3>
<p>If Alice and Bob want to communicate securely using a symmetric cipher, they need to agree on a shared key. But if they communicate over an insecure channel to exchange the key, an eavesdropper (Eve) gets the key.</p>
<p>This is the fundamental problem symmetric cryptography cannot solve on its own. The solutions are:</p>
<ol>
  <li><strong>Physical key exchange:</strong> Meet in person, pass a key on a USB drive. Impractical at internet scale.</li>
  <li><strong>Key Distribution Center (KDC):</strong> A trusted third party (used in Kerberos). Has its own security problems.</li>
  <li><strong>Public-key cryptography (asymmetric):</strong> Use RSA/ECDH to securely exchange a symmetric key over an insecure channel. This is how TLS works.</li>
</ol>
<h3>Key Stretching</h3>
<p>When users choose passwords (which have low entropy), <em>key stretching</em> increases the cost of brute-force attacks by repeatedly hashing:</p>
<pre><code>PBKDF2: key = PBKDF2(password, salt, iterations=600000, keylen=32)
bcrypt: designed for passwords, work factor adjustable
Argon2: winner of Password Hashing Competition 2015, memory-hard</code></pre>
<h3>Key Derivation Functions (KDFs)</h3>
<p>HKDF (HMAC-based Key Derivation Function) is the standard way to derive multiple keys from a single key or shared secret:</p>
<pre><code>HKDF:  Extract → PRK = HMAC(salt, IKM)
       Expand  → OKM = HMAC(PRK, info || counter)</code></pre>
<h3>Best Practices</h3>
<ul>
  <li>Use a <strong>Cryptographically Secure PRNG (CSPRNG)</strong> for key generation: <code>os.urandom()</code> in Python, <code>openssl rand</code>, <code>crypto.randomBytes()</code> in Node.js</li>
  <li>Rotate keys regularly</li>
  <li>Never hardcode keys in source code</li>
  <li>Use key management systems (AWS KMS, HashiCorp Vault, Azure Key Vault)</li>
  <li>Use envelope encryption: encrypt data with a Data Encryption Key (DEK), encrypt DEK with a Key Encryption Key (KEK)</li>
</ul>`,
      terminalCommands: {
        'help': 'Commands: openssl key generation, python3 PBKDF2',
        'openssl rand -hex 32': '7a3f8c2d1e94b760f5a2c8d3e1f074a8b9c2d5e6f7a1b3c4d5e6f7a8b9c0d1e2',
        'python3 -c "import hashlib,os; salt=os.urandom(16); key=hashlib.pbkdf2_hmac(\'sha256\',b\'mypassword\',salt,600000,32); print(f\'Salt: {salt.hex()}\nDerived key: {key.hex()}\')"': 'Salt: a3f8c2d1e94b760f5a2c8d3e\nDerived key: 7e8b1c2a3f4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0',
        'python3 -c "from cryptography.hazmat.primitives.kdf.hkdf import HKDF; from cryptography.hazmat.primitives import hashes; import os; ikm=os.urandom(32); print(\'HKDF ready — deriving session keys from master key...\')"': 'HKDF ready — deriving session keys from master key...',
      },
      questions: [
        { q: 'What is the name of the fundamental problem in symmetric cryptography: how to securely exchange a key over an insecure channel?', a: 'key distribution problem', hint: 'The ___ ___ problem', xp: 15 },
        { q: 'What Python function should you use to generate cryptographically secure random keys?', a: 'os.urandom', hint: 'import os; ___.___(32) gives 32 random bytes', xp: 10 },
        { q: 'Name the 2015 Password Hashing Competition winner that is memory-hard and resistant to GPU attacks.', a: 'Argon2', hint: 'Named after argon (noble gas): ___', xp: 20 },
      ],
    },
  ],
};

/* ══════════════════════════════════════════════════════════════════
   ROOM 4 — Asymmetric Encryption
   ══════════════════════════════════════════════════════════════════ */
ROOMS['crypto-asymmetric'] = {
  id: 'crypto-asymmetric',
  path: 'crypto',
  title: 'Asymmetric Encryption & RSA',
  description: 'Master public-key cryptography, RSA key generation, Diffie-Hellman key exchange, and Elliptic Curve Cryptography (ECC).',
  difficulty: 'intermediate',
  xpReward: 300,
  iconClass: 'fas fa-lock-open',
  iconBg: 'rgba(245,158,11,.12)',
  iconColor: '#f59e0b',
  tasks: [
    {
      id: 't1', title: 'Public Key Cryptography Fundamentals',
      xp: 20,
      content: `
<h2>Public Key Cryptography</h2>
<p>Public-key (asymmetric) cryptography was a revolutionary idea introduced by Diffie and Hellman in 1976. It solved the key distribution problem using mathematical <em>trapdoor functions</em>.</p>
<h3>The Core Idea</h3>
<p>Every participant has a <strong>key pair</strong>:</p>
<ul>
  <li><strong>Public key:</strong> Shared openly with everyone. Used to encrypt messages TO you, or verify signatures FROM you.</li>
  <li><strong>Private key:</strong> Kept absolutely secret. Used to decrypt messages encrypted with your public key, or to create signatures.</li>
</ul>
<pre><code>Encryption:   C = E(PublicKey_Bob, P)     ← Anyone can encrypt for Bob
Decryption:   P = D(PrivateKey_Bob, C)    ← Only Bob can decrypt

Signing:   Sig = Sign(PrivateKey_Alice, Message)  ← Only Alice can sign
Verify:    OK  = Verify(PublicKey_Alice, Message, Sig)  ← Anyone can verify</code></pre>
<h3>Trapdoor Functions</h3>
<p>A trapdoor function is easy to compute in one direction but computationally infeasible to reverse without the trapdoor (the private key):</p>
<ul>
  <li><strong>Integer factorisation (RSA):</strong> Multiplying two primes is easy. Factoring their product is hard. <code>n = p × q</code></li>
  <li><strong>Discrete logarithm (DH, DSA):</strong> <code>g^x mod p</code> is easy. Finding x given g^x mod p is hard.</li>
  <li><strong>Elliptic Curve DLP (ECDH, ECDSA):</strong> Scalar point multiplication is easy. Finding the scalar is hard.</li>
</ul>
<h3>Key Sizes: Asymmetric vs Symmetric</h3>
<pre><code>Symmetric Key   │ Asymmetric Equivalent Key Size
────────────────┼────────────────────────────────
AES-128 (128b)  │ RSA-3072 / ECC-256
AES-192 (192b)  │ RSA-7680 / ECC-384
AES-256 (256b)  │ RSA-15360 / ECC-521</code></pre>
<p>Asymmetric keys must be <em>much</em> larger than symmetric keys to achieve equivalent security. This is why asymmetric cryptography is used only for key exchange, not bulk data encryption.</p>`,
      terminalCommands: {
        'help': 'Commands: openssl key generation and inspection',
        'openssl genrsa -out rsa_private.pem 2048': 'Generating RSA private key, 2048 bit long modulus\n.............+++\n........+++\ne is 65537 (0x10001)',
        'openssl rsa -in rsa_private.pem -pubout -out rsa_public.pem': 'writing RSA key',
        'openssl rsa -in rsa_private.pem -text -noout | head -20': 'RSA Private-Key: (2048 bit, 2 primes)\nmodulus:\n    00:c4:7a:3f:8c:2d:1e:94:b7:60:f5:a2:c8:d3:e1:\n    ...\npublicExponent: 65537 (0x10001)\nprivateExponent:\n    ...',
        'openssl ecparam -genkey -name prime256v1 -noout -out ec_private.pem': 'ECC key generated (P-256 curve)',
      },
      questions: [
        { q: 'In asymmetric cryptography, which key is used to ENCRYPT a message to Bob?', a: 'public key', hint: 'Use Bob\'s ___ key to encrypt; only Bob\'s private key can decrypt', xp: 10 },
        { q: 'What mathematical problem makes RSA secure?', a: 'integer factorization', hint: 'Given n=p×q, finding p and q is the ___ ___ problem', xp: 15 },
        { q: 'Why is asymmetric encryption NOT used for bulk data encryption?', a: 'slow', hint: 'RSA/ECC is computationally ___ compared to AES', xp: 15 },
      ],
    },
    {
      id: 't2', title: 'RSA Deep Dive',
      xp: 35,
      content: `
<h2>RSA: Rivest-Shamir-Adleman</h2>
<p>RSA, published in 1977, was the first practical public-key encryption algorithm. It remains the most widely deployed asymmetric cipher, used in TLS, SSH, code signing, and email encryption.</p>
<h3>RSA Key Generation</h3>
<pre><code>1. Choose two large random primes: p and q
   (Each typically 1024-2048 bits for a 2048-4096 bit RSA key)

2. Compute modulus: n = p × q
   (This is your public modulus)

3. Compute Euler's totient: φ(n) = (p-1)(q-1)

4. Choose public exponent e:
   - 1 < e < φ(n)
   - gcd(e, φ(n)) = 1 (e must be coprime to φ(n))
   - Common values: 65537 (2^16+1), sometimes 3 or 17

5. Compute private exponent d:
   - d = e⁻¹ mod φ(n)  (modular inverse of e)
   - d·e ≡ 1 (mod φ(n))

Public key:  (n, e)
Private key: (n, d)   [p, q, φ(n) must be kept secret!]</code></pre>
<h3>RSA Encryption & Decryption</h3>
<pre><code>Encrypt:  C = Mᵉ mod n    (M = plaintext as integer, 0 ≤ M < n)
Decrypt:  M = Cᵈ mod n

This works because: (Mᵉ)ᵈ = M^(ed) ≡ M (mod n)
by Euler's theorem, since ed ≡ 1 (mod φ(n))</code></pre>
<h3>Small RSA Example (Toy)</h3>
<pre><code>p = 61, q = 53
n = p × q = 3233
φ(n) = (61-1)(53-1) = 3120
e = 17  (gcd(17, 3120) = 1 ✓)
d = 2753  (17 × 2753 = 46801 ≡ 1 mod 3120 ✓)

Public key: (3233, 17)
Private key: (3233, 2753)

Encrypt M=65: C = 65^17 mod 3233 = 2790
Decrypt C=2790: M = 2790^2753 mod 3233 = 65</code></pre>
<h3>RSA in Practice: PKCS#1 & OAEP</h3>
<p>Raw RSA (textbook RSA) is insecure for direct use. Proper padding must be applied:</p>
<ul>
  <li><strong>PKCS#1 v1.5:</strong> Old standard, vulnerable to Bleichenbacher's 1998 attack (ROBOT attack). Avoid for encryption.</li>
  <li><strong>OAEP (Optimal Asymmetric Encryption Padding):</strong> Secure padding scheme. Use RSA-OAEP for all new implementations.</li>
</ul>
<h3>RSA Weaknesses to Know</h3>
<ul>
  <li><strong>Small e with small message:</strong> If e=3 and M is small, M³ < n and C = M³ (no modular reduction). Extract cube root of C to get M.</li>
  <li><strong>Common factor attack:</strong> If two RSA keys share a prime factor, compute GCD to factor both.</li>
  <li><strong>Quantum threat:</strong> Shor's algorithm on a quantum computer can factor n in polynomial time — this would break RSA entirely.</li>
</ul>`,
      terminalCommands: {
        'help': 'Commands: openssl RSA, python3 RSA toy example',
        'python3 -c "n=3233; e=17; d=2753; M=65; C=pow(M,e,n); print(f\'Encrypt {M}: C={C}\')"': 'Encrypt 65: C=2790',
        'python3 -c "n=3233; e=17; d=2753; C=2790; M=pow(C,d,n); print(f\'Decrypt {C}: M={M}\')"': 'Decrypt 2790: M=65',
        'openssl genrsa 2048 2>/dev/null | openssl rsa -text -noout 2>/dev/null | grep -E "bit|Exponent"': 'RSA Private-Key: (2048 bit, 2 primes)\npublicExponent: 65537 (0x10001)',
        'python3 -c "from sympy import isprime; p,q=61,53; print(f\'p prime: {isprime(p)}, q prime: {isprime(q)}\nφ(n) = {(p-1)*(q-1)}\')"': 'p prime: True, q prime: True\nφ(n) = 3120',
        'python3 -c "import math; e=17; phi=3120; d=pow(e,-1,phi); print(f\'d = {d}\'); print(f\'Verify: {e*d % phi} (must be 1)\')"': 'd = 2753\nVerify: 1',
      },
      questions: [
        { q: 'In RSA key generation, what is φ(n) called?', a: "Euler's totient", hint: 'φ(n) = (p-1)(q-1) — named after ___\'s totient function', xp: 20 },
        { q: 'What is the standard public exponent used in RSA implementations?', a: '65537', hint: '2^16 + 1 = ___', xp: 15 },
        { q: 'What padding scheme should you use for RSA encryption (replacing the vulnerable PKCS#1 v1.5)?', a: 'OAEP', hint: 'Optimal Asymmetric Encryption Padding = ___', xp: 20 },
      ],
    },
    {
      id: 't3', title: 'Diffie-Hellman Key Exchange',
      xp: 25,
      content: `
<h2>Diffie-Hellman Key Exchange</h2>
<p>Published in 1976, Diffie-Hellman (DH) was the first published public-key protocol. It solves the key distribution problem: two parties can establish a shared secret over an insecure channel without ever having met or pre-shared anything.</p>
<h3>The Magic of DH</h3>
<p>DH works because of the <em>discrete logarithm problem</em>: given g, p, and g^x mod p, finding x is computationally infeasible for large p.</p>
<h3>DH Protocol Steps</h3>
<pre><code>Public parameters (shared openly):
  p = large prime (2048-bit recommended)
  g = generator (primitive root modulo p, usually 2 or 5)

Alice's steps:            Bob's steps:
1. Choose secret a        1. Choose secret b
2. Compute A = g^a mod p  2. Compute B = g^b mod p
3. Send A to Bob  ─────→  3. Send B to Alice  ←─────
4. Compute S = B^a mod p  4. Compute S = A^b mod p

Shared secret: S = g^(ab) mod p
(Alice and Bob compute the same value!)</code></pre>
<h3>Why It's Secure</h3>
<p>Eve sees g, p, A=g^a mod p, and B=g^b mod p. To compute g^(ab) mod p, she needs either a or b — which requires solving the discrete logarithm. This is computationally infeasible for large p (2048+ bits).</p>
<h3>Ephemeral DH (DHE) and ECDH</h3>
<p>Standard DH uses long-term keys, which means compromising the key compromises all past sessions. <strong>Ephemeral DH (DHE)</strong> generates fresh keys for each session, providing <strong>Perfect Forward Secrecy (PFS)</strong>.</p>
<p><strong>ECDH (Elliptic Curve DH)</strong> achieves the same result using elliptic curves, allowing much smaller keys (256-bit ECDH ≈ 3072-bit DH in security level).</p>
<div class="warning-box"><i class="fas fa-exclamation-triangle"></i> <strong>DH is vulnerable to Man-in-the-Middle attacks</strong> if not authenticated! Eve can intercept and perform two separate DH exchanges with Alice and Bob. Always authenticate DH with digital signatures (as in TLS).</div>`,
      terminalCommands: {
        'help': 'Commands: openssl DH parameter generation, python3 DH demo',
        'python3 -c "p=23; g=5; a=6; b=15; A=pow(g,a,p); B=pow(g,b,p); Sa=pow(B,a,p); Sb=pow(A,b,p); print(f\'p={p}, g={g}\nAlice: a={a}, A=g^a mod p={A}\nBob:   b={b}, B=g^b mod p={B}\nAlice shared secret: {Sa}\nBob shared secret:   {Sb}\nMatch: {Sa==Sb}\')"': 'p=23, g=5\nAlice: a=6, A=g^a mod p=8\nBob:   b=15, B=g^b mod p=19\nAlice shared secret: 2\nBob shared secret:   2\nMatch: True',
        'openssl dhparam -text -noout 2048 2>&1 | head -5': 'Generating DH parameters, 2048 bit long safe prime\n...\nDH Parameters: (2048 bit)',
        'openssl ecparam -name X25519 -genkey -noout -text 2>&1 | head -5': 'ASN1 OID: X25519\nPrivate-Key: (253 bit)',
      },
      questions: [
        { q: 'What mathematical problem makes Diffie-Hellman secure?', a: 'discrete logarithm', hint: 'Given g^x mod p, finding x is the ___ ___ problem', xp: 15 },
        { q: 'What property does Ephemeral DH provide that protects past sessions if a long-term key is later compromised?', a: 'perfect forward secrecy', hint: 'PFS — ___ ___ ___', xp: 20 },
        { q: 'What attack does DH require authentication to prevent?', a: 'man in the middle', hint: 'Without auth, Eve can intercept and become the ___ in the ___', xp: 15 },
      ],
    },
    {
      id: 't4', title: 'Elliptic Curve Cryptography (ECC)',
      xp: 30,
      content: `
<h2>Elliptic Curve Cryptography (ECC)</h2>
<p>ECC achieves the same security as RSA/DH with <em>much smaller keys</em>, making it ideal for mobile devices, IoT, and performance-critical applications. It is now the default in TLS 1.3.</p>
<h3>What Is an Elliptic Curve?</h3>
<p>An elliptic curve is defined by the equation:</p>
<pre><code>y² = x³ + ax + b (mod p)

Where 4a³ + 27b² ≠ 0 (non-singular condition)</code></pre>
<p>Over a finite field (mod p), this forms a group of discrete points. The group operation is <em>point addition</em>.</p>
<h3>Point Addition & Scalar Multiplication</h3>
<ul>
  <li><strong>Point Addition:</strong> Given two points P and Q on the curve, P + Q is geometrically defined by drawing a line through P and Q, finding the third intersection, and reflecting over the x-axis.</li>
  <li><strong>Scalar Multiplication:</strong> k × P = P + P + P + ... (k times). This is easy to compute (using double-and-add). Finding k given P and k×P is the <em>Elliptic Curve Discrete Logarithm Problem (ECDLP)</em> — computationally infeasible.</li>
</ul>
<h3>ECDH — Elliptic Curve Diffie-Hellman</h3>
<pre><code>Public parameters: Curve (a, b, p) and base point G

Alice: private key a, public key A = a × G
Bob:   private key b, public key B = b × G

Shared secret: a × B = b × A = ab × G</code></pre>
<h3>Common ECC Curves</h3>
<ul>
  <li><strong>P-256 (secp256r1/prime256v1):</strong> NIST curve, 256-bit, used in TLS, certificates. Suspected backdoor from NSA controversial.</li>
  <li><strong>Curve25519 (X25519 for DHKE):</strong> Designed by Bernstein. Efficient, constant-time, no suspicious constants. Preferred for modern use.</li>
  <li><strong>secp256k1:</strong> Used in Bitcoin and Ethereum.</li>
  <li><strong>P-384:</strong> 384-bit NIST curve for higher security requirements.</li>
</ul>
<h3>Key Size Comparison</h3>
<pre><code>Security Level │ RSA/DH Key Size │ ECC Key Size
───────────────┼─────────────────┼─────────────
   80-bit      │    1024 bits    │   160 bits
  112-bit      │    2048 bits    │   224 bits
  128-bit      │    3072 bits    │   256 bits
  192-bit      │    7680 bits    │   384 bits
  256-bit      │   15360 bits    │   521 bits</code></pre>
<div class="success-box"><i class="fas fa-check-circle"></i> <strong>Recommendation:</strong> Use Curve25519 (X25519) for key exchange and Ed25519 for signatures. These are faster, smaller, and have better security properties than P-256.</div>`,
      terminalCommands: {
        'help': 'Commands: openssl ECC key generation',
        'openssl ecparam -name prime256v1 -genkey -noout -out ec_key.pem': 'ECC P-256 private key generated.',
        'openssl ec -in ec_key.pem -text -noout 2>&1 | head -10': 'read EC key\nPrivate-Key: (256 bit)\npriv:\n    00:8f:3a:2c:1d:9e:4b:5f:6a:7c:8d:9e:0f:1a:2b:\n    ...\npub:\n    04:a3:f8:c2:d1:e9:4b:76:0f:5a:2c:8d:3e:1f:07:\n    ...',
        'openssl genpkey -algorithm X25519 -out x25519_key.pem': 'Generating EC key pair...\nX25519 (Curve25519) private key generated.',
        'python3 -c "from cryptography.hazmat.primitives.asymmetric.x25519 import X25519PrivateKey; k=X25519PrivateKey.generate(); print(f\'Key size: {len(k.private_bytes_raw())*8} bits\')"': 'Key size: 256 bits',
      },
      questions: [
        { q: 'What is the ECDLP — the hard problem that ECC security relies on?', a: 'discrete logarithm', hint: 'Finding the scalar k given point P and k×P: the Elliptic Curve ___ ___ Problem', xp: 20 },
        { q: 'Which ECC curve designed by Daniel Bernstein is preferred for modern key exchange due to efficiency and no suspicious constants?', a: 'Curve25519', hint: 'Named after the prime 2^255 - 19: ___', xp: 20 },
        { q: 'A 256-bit ECC key provides roughly equivalent security to what size RSA key?', a: '3072', hint: '128-bit security level requires RSA-___ or ECC-256', xp: 20 },
      ],
    },
    {
      id: 't5', title: 'Hybrid Encryption',
      xp: 25,
      content: `
<h2>Hybrid Encryption</h2>
<p>Hybrid encryption combines the best of both worlds: asymmetric crypto for key exchange, symmetric crypto for bulk data. This is how virtually all real-world secure communication works.</p>
<h3>Why Hybrid?</h3>
<ul>
  <li>RSA/ECC: Solves key distribution, but slow (~1000× slower than AES for large data)</li>
  <li>AES: Fast, but requires pre-shared key</li>
  <li><strong>Hybrid:</strong> Use RSA/ECDH to exchange an AES key, then use AES for all data</li>
</ul>
<h3>Hybrid Encryption Pattern</h3>
<pre><code>Alice wants to send a large file to Bob securely:

1. Alice generates a random 256-bit AES key (Data Encryption Key / DEK)
2. Alice encrypts the file with AES-256-GCM using the DEK
3. Alice encrypts the DEK with Bob's RSA/ECC public key
4. Alice sends: [Encrypted DEK] + [AES-GCM ciphertext + tag]

Bob:
1. Bob decrypts the DEK using his RSA/ECC private key
2. Bob decrypts the file using the recovered DEK</code></pre>
<h3>How TLS Uses Hybrid Encryption</h3>
<pre><code>TLS 1.3 Handshake (simplified):

Client → Server: ClientHello + supported cipher suites + ECDH key share
Server → Client: ServerHello + chosen cipher suite + ECDH key share + Certificate
                 (Both compute shared secret via ECDH)
                 (Derive session keys from shared secret using HKDF)
Client → Server: Finished (encrypted with session key)
─────────────────────────────────────────────────────
Now using: AES-256-GCM or ChaCha20-Poly1305 for all data</code></pre>
<h3>PGP/GPG: Hybrid in Email</h3>
<pre><code>Encrypt email to Bob:
1. Generate random session key (AES-256)
2. Encrypt message with AES-256
3. Encrypt session key with Bob's PGP public key
4. Send: [PGP-encrypted session key] + [AES-encrypted message]</code></pre>`,
      terminalCommands: {
        'help': 'Commands: hybrid encryption demo',
        'python3 -c "import os; from Crypto.PublicKey import RSA; from Crypto.Cipher import AES, PKCS1_OAEP; from Crypto.Util.Padding import pad; key=RSA.generate(2048); pub=key.publickey(); dek=os.urandom(32); cipher_rsa=PKCS1_OAEP.new(pub); enc_dek=cipher_rsa.encrypt(dek); cipher_aes=AES.new(dek,AES.MODE_GCM); ct,tag=cipher_aes.encrypt_and_digest(b\'Top secret message!\'); print(f\'Encrypted DEK: {len(enc_dek)} bytes\nCiphertext: {ct.hex()}\nAuth tag: {tag.hex()}\')"': 'Encrypted DEK: 256 bytes\nCiphertext: 7a3f8c2d1e94b760f5a2c8d3e1f074a8\nAuth tag: b9c2d5e6f7a1b3c4d5e6f7a8b9c0d1e2',
        'openssl s_client -connect google.com:443 2>&1 | grep -E "Protocol|Cipher|Session-ID" | head -5': 'Protocol  : TLSv1.3\nCipher    : TLS_AES_256_GCM_SHA384\nSession-ID: (TLS 1.3 uses session tickets)',
      },
      questions: [
        { q: 'In hybrid encryption, what is the Data Encryption Key (DEK) encrypted with?', a: "recipient's public key", hint: 'The DEK is wrapped using the recipient\'s asymmetric ___ key', xp: 15 },
        { q: 'What algorithm does TLS 1.3 mandate for key exchange (providing perfect forward secrecy)?', a: 'ECDHE', hint: 'Ephemeral ECDH: ___', xp: 20 },
        { q: 'What key derivation function does TLS 1.3 use to derive session keys from the ECDH shared secret?', a: 'HKDF', hint: 'HMAC-based Key Derivation Function: ___', xp: 20 },
      ],
    },
  ],
};

/* ══════════════════════════════════════════════════════════════════
   ROOM 5 — Hashing & Message Integrity
   ══════════════════════════════════════════════════════════════════ */
ROOMS['crypto-hashing'] = {
  id: 'crypto-hashing',
  path: 'crypto',
  title: 'Hashing & Message Integrity',
  description: 'Understand cryptographic hash functions, SHA families, HMAC, password hashing (bcrypt, Argon2), and hash attacks including rainbow tables and length extension.',
  difficulty: 'intermediate',
  xpReward: 250,
  iconClass: 'fas fa-hashtag',
  iconBg: 'rgba(245,158,11,.12)',
  iconColor: '#f59e0b',
  tasks: [
    {
      id: 't1', title: 'Cryptographic Hash Functions',
      xp: 20,
      content: `
<h2>Cryptographic Hash Functions</h2>
<p>A cryptographic hash function maps an arbitrary-length input to a fixed-length output ("digest"). It is a one-way function with special properties that make it useful for security.</p>
<h3>Five Required Properties</h3>
<ol>
  <li><strong>Deterministic:</strong> Same input always produces the same hash. SHA256("hello") is always the same value.</li>
  <li><strong>One-way (Pre-image resistant):</strong> Given hash H, it is infeasible to find any input M such that H(M) = H. You cannot "reverse" a hash.</li>
  <li><strong>Second Pre-image Resistant:</strong> Given M1, it is infeasible to find M2 ≠ M1 such that H(M1) = H(M2).</li>
  <li><strong>Collision Resistant:</strong> It is infeasible to find ANY two inputs M1 ≠ M2 such that H(M1) = H(M2). (Note: collisions must exist since infinite inputs map to finite outputs — they must just be hard to find.)</li>
  <li><strong>Avalanche Effect:</strong> A tiny change in input (even 1 bit) produces a completely different hash. "Hello" vs "hello" produce vastly different SHA256 values.</li>
</ol>
<h3>What Hash Functions Are Used For</h3>
<ul>
  <li><strong>Data Integrity:</strong> Verify a file hasn't been corrupted or tampered with (checksums)</li>
  <li><strong>Password Storage:</strong> Store H(password) instead of the password itself</li>
  <li><strong>Digital Signatures:</strong> Sign H(message) instead of the message (much smaller)</li>
  <li><strong>Message Authentication Codes (HMAC)</strong></li>
  <li><strong>Pseudorandom Generation:</strong> Hash functions as building blocks for PRNGs</li>
  <li><strong>Blockchain / Proof of Work:</strong> Bitcoin finds inputs where SHA256(SHA256(block)) < target</li>
</ul>
<h3>Hash Output Sizes</h3>
<pre><code>MD5:     128 bits  (16 bytes) — BROKEN, don't use for security
SHA-1:   160 bits  (20 bytes) — BROKEN, deprecated
SHA-256: 256 bits  (32 bytes) — Secure, widely used
SHA-384: 384 bits  (48 bytes) — Secure
SHA-512: 512 bits  (64 bytes) — Secure
SHA3-256:256 bits  (32 bytes) — Newer, different construction
BLAKE2b: 512 bits  (64 bytes) — Fast, secure</code></pre>`,
      terminalCommands: {
        'help': 'Commands: sha256sum, md5sum, python3 hashlib',
        'echo -n "hello" | sha256sum': '2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824  -',
        'echo -n "Hello" | sha256sum': '185f8db32921bd46d35980572fc5b0b01248d2b54c8af1d2e55e3d67f7a0e1d8  -',
        'echo -n "hello" | md5sum': '5d41402abc4b2a76b9719d911017c592  -',
        'echo -n "hello" | sha512sum': '9b71d224bd62f3785d96d46ad3ea3d73319bfbc2890caadae2dff72519673ca72323c3d99ba5c11d7c7acc6e14b8c5da0c4663475c2e5c3adef46f73bcdec043  -',
        'python3 -c "import hashlib; h1=hashlib.sha256(b\'hello\').hexdigest(); h2=hashlib.sha256(b\'Hello\').hexdigest(); print(f\'hello: {h1}\nHello: {h2}\nDifferent: {h1!=h2}\')"': 'hello: 2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824\nHello: 185f8db32921bd46d35980572fc5b0b01248d2b54c8af1d2e55e3d67f7a0e1d8\nDifferent: True',
      },
      questions: [
        { q: 'What property means that even a 1-bit change in input produces a completely different hash?', a: 'avalanche effect', hint: 'Named after how a small disturbance causes a large change: ___ effect', xp: 15 },
        { q: 'What is the output size of SHA-256 in bits?', a: '256', hint: 'It\'s in the name: SHA-___', xp: 10 },
        { q: 'Is it possible for two different inputs to have the same SHA-256 hash? (yes/no)', a: 'yes', hint: 'Infinite inputs → finite output space; collisions must exist but must be hard to find', xp: 15 },
      ],
    },
    {
      id: 't2', title: 'MD5, SHA-1, SHA-2, SHA-3',
      xp: 25,
      content: `
<h2>The Hash Function Family Tree</h2>
<h3>MD5 (Message Digest 5) — BROKEN</h3>
<ul>
  <li>Designed by Ron Rivest, 1992. Output: 128 bits.</li>
  <li><strong>Collisions found in 2004</strong> by Xiaoyun Wang. Can generate two different files with the same MD5 hash in seconds on a laptop.</li>
  <li><strong>Still widely misused</strong> for password storage (catastrophically insecure).</li>
  <li><strong>Acceptable uses:</strong> Non-security checksums (detecting accidental corruption, not tampering).</li>
</ul>
<h3>SHA-1 (Secure Hash Algorithm 1) — DEPRECATED</h3>
<ul>
  <li>Designed by NSA, standardised 1995. Output: 160 bits.</li>
  <li>Theoretical weaknesses known from 2005. First practical collision ("SHAttered") demonstrated by Google in 2017.</li>
  <li>Deprecated by NIST. Browsers reject SHA-1 TLS certificates.</li>
  <li><strong>Do not use</strong> for any new security-critical application.</li>
</ul>
<h3>SHA-2 Family — Currently Secure</h3>
<p>SHA-2 is a family designed by the NSA, standardised 2001. It shares structural similarities with SHA-1 (Merkle-Damgård construction) but with a much larger state:</p>
<pre><code>SHA-224:  224-bit output (truncated SHA-256)
SHA-256:  256-bit output  ← most common, use this
SHA-384:  384-bit output (truncated SHA-512)
SHA-512:  512-bit output  ← for ultra-high security
SHA-512/256: 256-bit output from SHA-512 internals (resistant to length extension)</code></pre>
<h3>SHA-3 (Keccak) — Different Construction</h3>
<ul>
  <li>Selected by NIST in 2012 after a 5-year competition. Designed by Bertoni, Daemen, Peeters, Van Assche.</li>
  <li>Uses a completely different construction: <strong>sponge function</strong> (not Merkle-Damgård).</li>
  <li>NOT faster than SHA-2 in software, but provides diversity (if SHA-2 is broken, SHA-3 remains secure).</li>
  <li>Immune to length-extension attacks.</li>
</ul>
<h3>BLAKE2 / BLAKE3 — Speed + Security</h3>
<p>BLAKE2 is faster than MD5 and SHA-2 in software while being at least as secure as SHA-3. Used in libsodium, WireGuard, and many modern systems. BLAKE3 (2020) is even faster.</p>`,
      terminalCommands: {
        'help': 'Commands: hash comparison and collision demo',
        'python3 -c "import hashlib; pw=\'password\'; print(f\'MD5:    {hashlib.md5(pw.encode()).hexdigest()}\nSHA1:   {hashlib.sha1(pw.encode()).hexdigest()}\nSHA256: {hashlib.sha256(pw.encode()).hexdigest()}\nSHA512: {hashlib.sha512(pw.encode()).hexdigest()[:64]}...\')"': 'MD5:    5f4dcc3b5aa765d61d8327deb882cf99\nSHA1:   5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8\nSHA256: ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f\nSHA512: b109f3bbbc244eb82441917ed06d618b9008dd09b3befd1b5e07394c706a8bb9...',
        'echo "MD5 collision example:"; python3 -c "print(\'Two different inputs with same MD5:\'); print(\'File1 MD5: d41d8cd98f00b204e9800998ecf8427e\'); print(\'File2 MD5: d41d8cd98f00b204e9800998ecf8427e\'); print(\'Collision generated in < 1 second!\')"': 'MD5 collision example:\nTwo different inputs with same MD5:\nFile1 MD5: d41d8cd98f00b204e9800998ecf8427e\nFile2 MD5: d41d8cd98f00b204e9800998ecf8427e\nCollision generated in < 1 second!',
        'python3 -c "import hashlib; print(hashlib.algorithms_available)"': "{\'md5\', \'sha1\', \'sha224\', \'sha256\', \'sha384\', \'sha512\', \'sha3_256\', \'sha3_512\', \'blake2b\', \'blake2s\', \'shake_128\', \'shake_256\'}",
      },
      questions: [
        { q: 'In what year was the first practical MD5 collision demonstrated?', a: '2004', hint: 'Xiaoyun Wang demonstrated MD5 collisions in ____', xp: 15 },
        { q: 'What construction does SHA-3 (Keccak) use, making it immune to length-extension attacks?', a: 'sponge', hint: 'SHA-3 uses a ___ function, not Merkle-Damgård', xp: 20 },
        { q: 'Which SHA-2 variant is most commonly used for general-purpose cryptographic hashing?', a: 'SHA-256', hint: 'SHA-___ is the standard choice for TLS certificates, Git commits, etc.', xp: 10 },
      ],
    },
    {
      id: 't3', title: 'HMAC & Message Authentication Codes',
      xp: 20,
      content: `
<h2>HMAC & Message Authentication Codes</h2>
<p>A plain hash provides integrity (detects accidental corruption) but NOT authentication (you can't tell who created it). Message Authentication Codes (MACs) add a secret key to provide both integrity and authentication.</p>
<h3>MAC: The Concept</h3>
<pre><code>Without MAC: Attacker can modify message AND update the hash
With MAC:    MAC = MAC(Key, Message) — cannot compute without the key

MAC(K, M) → tag
Verify: MAC(K, M) == received_tag ?</code></pre>
<h3>HMAC — Hash-based MAC</h3>
<p>HMAC is the most widely used MAC construction, defined in RFC 2104:</p>
<pre><code>HMAC(K, M) = H((K' XOR opad) || H((K' XOR ipad) || M))

Where:
  H    = hash function (SHA-256, SHA-512, etc.)
  K'   = key padded to hash block size
  opad = 0x5C repeated (outer padding)
  ipad = 0x36 repeated (inner padding)
  ||   = concatenation</code></pre>
<p>More simply: HMAC wraps the hash twice with the key to prevent length-extension attacks.</p>
<h3>Why Not Just H(Key || Message)?</h3>
<p>If you naively prepend the key: <code>tag = H(Key || Message)</code>, this is vulnerable to a <em>length-extension attack</em> against MD5/SHA-1/SHA-2 (not SHA-3). Given H(K||M), an attacker can compute H(K||M||extra) without knowing K. HMAC prevents this.</p>
<h3>Authenticated Encryption vs MAC</h3>
<ul>
  <li><strong>MAC (HMAC):</strong> Authenticates a message but does NOT encrypt it. "I know this was sent by the key holder."</li>
  <li><strong>Encryption alone:</strong> Hides content but doesn't prevent tampering. An attacker can flip ciphertext bits without knowing the key (especially in CTR/CBC).</li>
  <li><strong>AEAD (e.g., AES-GCM):</strong> Both encrypts AND authenticates in one operation. The right choice.</li>
</ul>
<h3>Timing Attacks on MAC Verification</h3>
<div class="warning-box"><i class="fas fa-exclamation-triangle"></i> Never compare MACs with regular string equality (<code>==</code>)! String comparison short-circuits on the first mismatched byte, leaking timing information. Always use <strong>constant-time comparison</strong>: <code>hmac.compare_digest()</code> in Python, <code>crypto.timingSafeEqual()</code> in Node.js.</div>`,
      terminalCommands: {
        'help': 'Commands: python3 HMAC demos',
        'python3 -c "import hmac, hashlib; key=b\'secretkey\'; msg=b\'Transfer $100 to Alice\'; tag=hmac.new(key,msg,hashlib.sha256).hexdigest(); print(f\'HMAC-SHA256: {tag}\')"': 'HMAC-SHA256: 7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069',
        'python3 -c "import hmac, hashlib; key=b\'secretkey\'; msg=b\'Transfer $100 to Alice\'; tag=hmac.new(key,msg,hashlib.sha256).digest(); msg2=b\'Transfer $100 to Alice\'; tag2=hmac.new(key,msg2,hashlib.sha256).digest(); print(f\'Safe compare: {hmac.compare_digest(tag,tag2)}\')"': 'Safe compare: True',
        'python3 -c "import hmac, hashlib; key=b\'secretkey\'; msg=b\'Transfer $100 to Alice\'; tag=hmac.new(key,msg,hashlib.sha256).digest(); tampered=b\'Transfer $999 to Bob\'; tag2=hmac.new(key,tampered,hashlib.sha256).digest(); print(f\'Tampered message valid: {hmac.compare_digest(tag,tag2)}\')"': 'Tampered message valid: False',
      },
      questions: [
        { q: 'What does HMAC stand for?', a: 'Hash-based Message Authentication Code', hint: 'H-M-A-C: ___-based ___ ___ ___', xp: 10 },
        { q: 'Why is naive H(Key || Message) insecure against SHA-256?', a: 'length extension attack', hint: 'An attacker can append data without knowing the key: ___ extension attack', xp: 20 },
        { q: 'What Python function should you use instead of == to compare HMAC tags to prevent timing attacks?', a: 'hmac.compare_digest', hint: 'hmac.___ ___(tag1, tag2)', xp: 15 },
      ],
    },
    {
      id: 't4', title: 'Password Hashing',
      xp: 25,
      content: `
<h2>Password Hashing</h2>
<p>Passwords must never be stored in plaintext. But even hashing with SHA-256 is dangerously wrong. Password hashing requires special algorithms designed to be <em>intentionally slow</em>.</p>
<h3>Why SHA-256 Is Wrong for Passwords</h3>
<ul>
  <li>SHA-256 is designed to be <em>fast</em> — 10 billion hashes/second on a GPU</li>
  <li>Attacker can crack simple passwords in seconds using dictionary attacks</li>
  <li>Same password = same hash: if two users have "password", they have the same hash — immediately visible in the database</li>
</ul>
<h3>The Solution: Salt + Slow Hash</h3>
<p><strong>Salt:</strong> A random value added to each password before hashing. Stored alongside the hash. Even if two users have the same password, their salted hashes will be different.</p>
<pre><code>Without salt:  hash = SHA256("password") → same for all users
With salt:     hash = SHA256(salt || "password"), store (salt, hash)

Attacker with database: must attack each hash separately
Invalidates precomputed rainbow tables</code></pre>
<h3>bcrypt</h3>
<p>bcrypt (1999) was designed specifically for password hashing by Niels Provos and David Mazières. Key features:</p>
<ul>
  <li>Built-in salt (128 bits)</li>
  <li><strong>Work factor (cost):</strong> The number of iterations is 2^cost. Currently cost=12 is recommended (4096 iterations). Increase as hardware gets faster.</li>
  <li>Maximum password length: 72 bytes (a limitation!)</li>
</ul>
<pre><code>$2b$12$saltsaltsaltsaltsalthash...
 ↑   ↑  ↑
 version cost  22-char salt + 31-char hash</code></pre>
<h3>Argon2 — The Modern Standard</h3>
<p>Winner of the 2015 Password Hashing Competition. Three variants:</p>
<ul>
  <li><strong>Argon2i:</strong> Resistant to side-channel attacks (use for password hashing)</li>
  <li><strong>Argon2d:</strong> Resistant to GPU attacks (use for cryptocurrencies)</li>
  <li><strong>Argon2id:</strong> Hybrid — recommended for most use cases</li>
</ul>
<pre><code>Argon2 parameters:
  time_cost:    number of iterations
  memory_cost:  memory in kilobytes (GPU can't parallelise if memory > GPU RAM)
  parallelism:  number of parallel threads
  
OWASP recommends: Argon2id, m=64MB, t=3, p=4</code></pre>
<div class="success-box"><i class="fas fa-check-circle"></i> <strong>Use Argon2id for new code.</strong> Use bcrypt if Argon2 is unavailable. Never use raw SHA/MD5 for passwords. Always use a unique salt per password.</div>`,
      terminalCommands: {
        'help': 'Commands: python3 bcrypt and Argon2 demos',
        'python3 -c "import bcrypt; pw=b\'mysecretpassword\'; salt=bcrypt.gensalt(rounds=12); hashed=bcrypt.hashpw(pw,salt); print(f\'Hash: {hashed.decode()[:30]}...\nCost: 12\')"': 'Hash: $2b$12$7HNojXpScrPJjbdm8zyM...\nCost: 12',
        'python3 -c "import bcrypt; pw=b\'mysecretpassword\'; hashed=b\'$2b$12$7HNojXpScrPJjbdm8zyMxeI.pqM7tFQgpPtF3Qs4j1K4ckqnV0sKS\'; print(bcrypt.checkpw(pw,hashed))"': 'True',
        'python3 -c "from argon2 import PasswordHasher; ph=PasswordHasher(time_cost=3,memory_cost=65536,parallelism=4); h=ph.hash(\'mysecretpassword\'); print(f\'Argon2id: {h[:40]}...\')"': 'Argon2id: $argon2id$v=19$m=65536,t=3,p=4$...',
        'python3 -c "import time; import bcrypt; import hashlib; pw=b\'password\'; t1=time.time(); [hashlib.sha256(pw).digest() for _ in range(100000)]; t2=time.time(); [bcrypt.hashpw(pw,bcrypt.gensalt(4)) for _ in range(10)]; t3=time.time(); print(f\'100K SHA256: {t2-t1:.3f}s\n10 bcrypt:   {t3-t2:.3f}s\')"': '100K SHA256: 0.003s\n10 bcrypt:   0.242s\n(bcrypt is intentionally ~1000x slower per hash)',
      },
      questions: [
        { q: 'What is the purpose of a "salt" in password hashing?', a: 'prevent rainbow table attacks', hint: 'Salt makes each hash unique, defeating precomputed ___ ___ ___', xp: 15 },
        { q: 'Which password hashing algorithm won the 2015 Password Hashing Competition?', a: 'Argon2', hint: 'Named after the noble gas argon: ___', xp: 15 },
        { q: 'What bcrypt parameter controls how slow the hashing is (and should be increased over time as hardware improves)?', a: 'work factor', hint: 'The ___ ___ (or cost) determines 2^N iterations', xp: 15 },
      ],
    },
    {
      id: 't5', title: 'Hash Attacks',
      xp: 25,
      content: `
<h2>Hash Attacks</h2>
<p>Despite being one-way functions, hash functions face several attack vectors. Understanding these attacks is essential for both exploiting weak crypto and implementing strong defences.</p>
<h3>Brute Force / Dictionary Attack</h3>
<p>The most basic attack: try many possible inputs and compare hashes.</p>
<pre><code># hashcat brute forcing MD5
hashcat -m 0 hashes.txt /usr/share/wordlists/rockyou.txt

# Benchmark: RTX 3090 GPU
MD5:     56,000 MH/s  (56 billion hashes/second)
SHA-256:  9,000 MH/s  (9 billion hashes/second)
bcrypt (cost 5): 80 kH/s  (80,000 hashes/second!)
Argon2:       ~1 kH/s  (even slower)</code></pre>
<h3>Rainbow Tables</h3>
<p>Precomputed hash-to-plaintext lookup tables. A rainbow table for MD5 of all 8-character passwords uses ~100GB of disk but enables instant cracking. <strong>Salting defeats rainbow tables entirely</strong> — each unique salt requires its own table.</p>
<h3>Birthday Attack</h3>
<p>Based on the birthday paradox: in a room of 23 people, there's a 50% chance two share a birthday. For hash collisions:</p>
<pre><code>Finding a pre-image: 2^n operations (n = hash size in bits)
Finding ANY collision: 2^(n/2) operations (birthday bound)

MD5 (128-bit): collision in ~2^64 ≈ 18 quintillion ops
SHA-256 (256-bit): collision in ~2^128 — still infeasible

But MD5's structural weaknesses allow collisions in ~2^18 ops!</code></pre>
<h3>Length Extension Attack</h3>
<p>Affects MD5, SHA-1, SHA-256, SHA-512 (all Merkle-Damgård constructions). If you know H(secret||message), you can compute H(secret||message||padding||extra) <em>without knowing the secret</em>.</p>
<pre><code>Vulnerable: tag = SHA256(secret || user_data)
Attack: Extend to SHA256(secret || user_data || padding || injected_data)
Immune: HMAC-SHA256, SHA-3, BLAKE2</code></pre>
<h3>Collision Attack on MD5 (Practical Example)</h3>
<pre><code># Two different files, same MD5!
md5sum good_contract.pdf malicious_contract.pdf
d41d8cd98f00b204e9800998ecf8427e  good_contract.pdf
d41d8cd98f00b204e9800998ecf8427e  malicious_contract.pdf

Real-world use: Flame malware (2012) used MD5 collisions to forge
a Microsoft code-signing certificate!</code></pre>`,
      terminalCommands: {
        'help': 'Commands: hashcat, john, python3 hash cracking demo',
        'hashcat -m 0 5f4dcc3b5aa765d61d8327deb882cf99 /usr/share/wordlists/rockyou.txt': '5f4dcc3b5aa765d61d8327deb882cf99:password\n\nSession..........: hashcat\nStatus...........: Cracked\nHash.Mode........: 0 (MD5)\nSpeed.#1.........: 56198.4 MH/s\nGuesses.#Pars....: 1/1 (100.00%)\nTime.Started.....: 0 secs ago\nTime.Estimated...: 0 secs',
        'john --format=raw-md5 hashes.txt': 'Using default input encoding: UTF-8\nLoaded 1 password hash (Raw-MD5 [MD5 256/256 AVX2 8x3])\npassword         (user1)\n1g 0:00:00:00 DONE (2024) 100g/s',
        'python3 -c "import hashlib; wordlist=[\'password\',\'123456\',\'admin\',\'letmein\',\'monkey\']; target=\'5f4dcc3b5aa765d61d8327deb882cf99\'; [print(f\'CRACKED: {w}\') for w in wordlist if hashlib.md5(w.encode()).hexdigest()==target]"': 'CRACKED: password',
        'python3 -c "import math; print(f\'MD5 birthday bound: 2^{128//2} = {2**(128//2):.2e} ops\'); print(f\'SHA256 birthday: 2^{256//2} = {2**(256//2):.2e} ops\')"': 'MD5 birthday bound: 2^64 = 1.84e+19 ops\nSHA256 birthday: 2^128 = 3.40e+38 ops',
      },
      questions: [
        { q: 'What attack uses precomputed hash-to-plaintext tables, defeated entirely by using a salt?', a: 'rainbow table', hint: '___ ___ attack — named after the colourful precomputed lookup structures', xp: 15 },
        { q: 'What is the birthday bound for finding a collision in a 256-bit hash function?', a: '2^128', hint: 'Birthday bound = 2^(n/2), and 256/2 = ___', xp: 20 },
        { q: 'Which hash function family is vulnerable to length extension attacks due to its Merkle-Damgard construction?', a: 'SHA-2', hint: 'MD5, SHA-1, and ___ are all Merkle-Damgård and vulnerable (SHA-3 is not)', xp: 20 },
      ],
    },
  ],
};

/* ══════════════════════════════════════════════════════════════════
   ROOM 6 — PKI, TLS & Digital Signatures
   ══════════════════════════════════════════════════════════════════ */
ROOMS['crypto-pki-tls'] = {
  id: 'crypto-pki-tls',
  path: 'crypto',
  title: 'PKI, TLS & Digital Signatures',
  description: 'Learn digital signatures, X.509 certificates, the PKI chain of trust, TLS/SSL handshake, common TLS attacks, and PGP/GPG.',
  difficulty: 'advanced',
  xpReward: 300,
  iconClass: 'fas fa-certificate',
  iconBg: 'rgba(245,158,11,.12)',
  iconColor: '#f59e0b',
  tasks: [
    {
      id: 't1', title: 'Digital Signatures',
      xp: 25,
      content: `
<h2>Digital Signatures</h2>
<p>A digital signature provides three security properties: <strong>authentication</strong> (you know who signed it), <strong>integrity</strong> (the data wasn't modified), and <strong>non-repudiation</strong> (the signer can't deny signing).</p>
<h3>How Digital Signatures Work</h3>
<pre><code>Signing (Alice):
1. Compute hash of message: H = SHA256(message)
2. Encrypt hash with private key: sig = RSA_Sign(privKey_Alice, H)
3. Send: (message, sig)

Verification (Bob):
1. Compute hash of received message: H' = SHA256(message)
2. Decrypt signature with public key: H_recovered = RSA_Verify(pubKey_Alice, sig)
3. Compare: H' == H_recovered ? → Valid signature</code></pre>
<h3>Why Hash First?</h3>
<p>RSA/ECDSA can only sign small data (limited by key size). By signing the hash instead of the message, we can sign arbitrarily large files. A 256-bit SHA-256 hash is always small enough for RSA/ECDSA to sign.</p>
<h3>RSA Signatures vs ECDSA</h3>
<ul>
  <li><strong>RSA-PSS:</strong> RSA with Probabilistic Signature Scheme padding. Secure, widely supported. Large signature size (256 bytes for RSA-2048).</li>
  <li><strong>ECDSA:</strong> Elliptic Curve Digital Signature Algorithm. Smaller signatures (64 bytes for P-256). Used in TLS, Bitcoin, JWT (ES256).</li>
  <li><strong>EdDSA (Ed25519):</strong> Edwards-curve DSA using Curve25519. Fast, secure, deterministic (no random nonce required → no nonce reuse vulnerability). Preferred for new systems.</li>
</ul>
<div class="warning-box"><i class="fas fa-exclamation-triangle"></i> <strong>ECDSA Nonce Reuse is Catastrophic!</strong> If you reuse the same random nonce k for two different signatures with the same private key, the private key can be recovered. This was exploited against the PlayStation 3 in 2010 to recover Sony's private signing key.</div>
<h3>Signature Schemes Comparison</h3>
<pre><code>Algorithm   │ Key Size │ Sig Size │ Speed   │ Security
────────────┼──────────┼──────────┼─────────┼─────────
RSA-2048    │ 256 B    │ 256 B    │ Slow    │ OK
RSA-4096    │ 512 B    │ 512 B    │ Slow    │ Good
ECDSA P-256 │  64 B    │  64 B    │ Fast    │ Good
Ed25519     │  32 B    │  64 B    │ Fastest │ Excellent</code></pre>`,
      terminalCommands: {
        'help': 'Commands: openssl sign/verify, Ed25519',
        'openssl genpkey -algorithm Ed25519 -out ed25519_priv.pem': 'Generating Ed25519 private key...',
        'openssl pkey -in ed25519_priv.pem -pubout -out ed25519_pub.pem': 'writing public key',
        'echo "Sign this document" > message.txt; openssl pkeyutl -sign -inkey ed25519_priv.pem -in message.txt -out signature.bin': 'Document signed. Signature: 64 bytes',
        'openssl pkeyutl -verify -pubin -inkey ed25519_pub.pem -in message.txt -sigfile signature.bin': 'Signature Verified Successfully',
      },
      questions: [
        { q: 'What three security properties does a digital signature provide?', a: 'authentication integrity non-repudiation', hint: 'Auth, ___rity, Non-___', xp: 20 },
        { q: 'Why is a message hashed before signing rather than signing the message directly?', a: 'size', hint: 'RSA can only sign small data; hashing makes the input fixed-___ regardless of message length', xp: 15 },
        { q: 'What catastrophic vulnerability occurs when ECDSA uses the same nonce (k) for two signatures?', a: 'private key recovery', hint: 'Nonce reuse allows the ___ key to be mathematically recovered', xp: 25 },
      ],
    },
    {
      id: 't2', title: 'X.509 Certificates & PKI',
      xp: 25,
      content: `
<h2>X.509 Certificates & Public Key Infrastructure</h2>
<p>A digital certificate binds a public key to an identity. Without certificates, you could receive a "public key" from an attacker claiming to be your bank — PKI prevents this.</p>
<h3>X.509 Certificate Structure</h3>
<pre><code>Certificate:
  Version: 3
  Serial Number: 04:00:00:00:00:01:15:4b:5a:c3:94
  Signature Algorithm: sha256WithRSAEncryption
  Issuer: C=US, O=DigiCert Inc, CN=DigiCert TLS RSA SHA256 2020 CA1
  Validity:
    Not Before: Jan  1 00:00:00 2024
    Not After:  Dec 31 23:59:59 2024
  Subject: CN=www.example.com, O=Example Corp, C=US
  Subject Public Key: RSA 2048-bit
  Extensions:
    Subject Alternative Names: DNS:www.example.com, DNS:example.com
    Key Usage: Digital Signature, Key Encipherment
    Extended Key Usage: TLS Web Server Authentication
    CRL Distribution Points: http://crl.digicert.com/...
    OCSP Stapling: http://ocsp.digicert.com
  Signature: [CA's digital signature over above data]</code></pre>
<h3>Chain of Trust</h3>
<pre><code>Root CA (self-signed, pre-installed in OS/browser)
    └── Intermediate CA (signed by Root CA)
            └── End-Entity Certificate (signed by Intermediate CA)
                  └── Your Server's Public Key + Identity</code></pre>
<ul>
  <li><strong>Root CAs:</strong> DigiCert, Comodo, Let's Encrypt (ISRG), GlobalSign. Their certificates are hardcoded in your OS/browser.</li>
  <li><strong>Intermediate CAs:</strong> Root CAs don't sign website certs directly (offline for security). Intermediates do.</li>
  <li><strong>Let's Encrypt:</strong> Free, automated certificate authority. Issuing billions of certificates since 2016.</li>
</ul>
<h3>Certificate Revocation</h3>
<ul>
  <li><strong>CRL (Certificate Revocation List):</strong> A downloadable list of revoked certificates. Slow, large, often not checked.</li>
  <li><strong>OCSP (Online Certificate Status Protocol):</strong> Real-time revocation check. Privacy concern (CA learns which sites you visit).</li>
  <li><strong>OCSP Stapling:</strong> Server includes OCSP response in TLS handshake. No privacy leakage. Best practice.</li>
</ul>`,
      terminalCommands: {
        'help': 'Commands: openssl certificate inspection',
        'openssl s_client -connect google.com:443 -showcerts 2>&1 | openssl x509 -noout -text | head -30': 'Certificate:\n    Data:\n        Version: 3 (0x2)\n        Serial Number: 0f:be:08:f0:a6:4c:f3:c7\n        Signature Algorithm: ecdsa-with-SHA256\n        Issuer: C=US, O=Google Trust Services, CN=WR2\n        Validity\n            Not Before: Nov 18 08:34:32 2024 GMT\n            Not After : Feb 10 08:34:31 2025 GMT\n        Subject: CN=*.google.com',
        'openssl x509 -in cert.pem -noout -dates': 'notBefore=Jan  1 00:00:00 2024 GMT\nnotAfter=Dec 31 23:59:59 2024 GMT',
        'openssl x509 -in cert.pem -noout -issuer -subject': 'issuer=C=US, O=DigiCert Inc, CN=DigiCert TLS RSA SHA256 2020 CA1\nsubject=CN=www.example.com, O=Example Corp',
      },
      questions: [
        { q: 'What structure do CAs use to establish trust, from Root CA down to your website\'s certificate?', a: 'chain of trust', hint: 'The ___ of ___ links Root CA → Intermediate CA → End-entity cert', xp: 15 },
        { q: 'What protocol allows a TLS server to staple a certificate status response to avoid clients contacting the OCSP server directly?', a: 'OCSP stapling', hint: '___ ___ includes the revocation proof in the TLS handshake', xp: 20 },
        { q: 'What free, automated CA has issued billions of certificates and dramatically increased HTTPS adoption?', a: "Let's Encrypt", hint: "___ 's ___ — free, automated, open CA", xp: 15 },
      ],
    },
    {
      id: 't3', title: 'TLS/SSL Protocol',
      xp: 30,
      content: `
<h2>TLS/SSL: Securing Web Communication</h2>
<p>TLS (Transport Layer Security) is the protocol that secures HTTPS, SMTPS, IMAPS, and dozens of other protocols. Understanding TLS is fundamental to web security.</p>
<h3>TLS Version History</h3>
<pre><code>SSL 2.0 (1995) — BROKEN, prohibited (DROWN attack)
SSL 3.0 (1996) — BROKEN, prohibited (POODLE attack)
TLS 1.0 (1999) — DEPRECATED (BEAST, POODLE)
TLS 1.1 (2006) — DEPRECATED
TLS 1.2 (2008) — Currently acceptable but declining
TLS 1.3 (2018) — CURRENT STANDARD — use this!</code></pre>
<h3>TLS 1.3 Handshake (Simplified)</h3>
<pre><code>Client                          Server
  │                               │
  │── ClientHello ───────────────▶│
  │   (supported ciphers, ECDH key share)
  │                               │
  │◀── ServerHello ───────────────│
  │    (chosen cipher, ECDH key share, Certificate)
  │    [Both compute shared secret via ECDHE]
  │    [Derive keys: client_key, server_key via HKDF]
  │                               │
  │◀── {EncryptedExtensions} ─────│
  │◀── {Certificate} ─────────────│
  │◀── {CertificateVerify} ───────│
  │◀── {Finished} ────────────────│
  │                               │
  │── {Finished} ────────────────▶│
  │                               │
  │══════ Encrypted Application Data ══════│</code></pre>
<h3>TLS 1.3 Improvements Over TLS 1.2</h3>
<ul>
  <li>1-RTT handshake (vs 2-RTT in TLS 1.2)</li>
  <li>0-RTT resumption (with replay attack caveats)</li>
  <li>All handshake after ServerHello is encrypted</li>
  <li>Removed weak ciphers: RC4, DES, 3DES, MD5, SHA-1</li>
  <li>Mandatory PFS: only (EC)DHE key exchange allowed</li>
  <li>Removed RSA key exchange (no PFS)</li>
  <li>Simplified cipher suite list</li>
</ul>
<h3>TLS 1.3 Cipher Suites</h3>
<pre><code>TLS_AES_128_GCM_SHA256          ← Most common
TLS_AES_256_GCM_SHA384          ← Higher security
TLS_CHACHA20_POLY1305_SHA256    ← For platforms without AES hardware</code></pre>`,
      terminalCommands: {
        'help': 'Commands: openssl s_client, nmap TLS scan',
        'openssl s_client -connect example.com:443 -tls1_3 2>&1 | grep -E "Protocol|Cipher|Verify"': 'Protocol  : TLSv1.3\nCipher    : TLS_AES_256_GCM_SHA384\nVerify return code: 0 (ok)',
        'openssl s_client -connect example.com:443 -tls1 2>&1 | head -5': 'CONNECTED(00000003)\n34456789:error:1409442E:SSL routines:ssl3_read_bytes:tlsv1 alert protocol version\n(Server rejected TLS 1.0 — good!)',
        'nmap --script ssl-enum-ciphers -p 443 example.com': 'PORT    STATE SERVICE\n443/tcp open  https\n| ssl-enum-ciphers:\n|   TLSv1.3:\n|     ciphers:\n|       TLS_AES_256_GCM_SHA384 (ecdh_x25519) - A\n|       TLS_AES_128_GCM_SHA256 (ecdh_x25519) - A\n|     cipher preference: server',
        'openssl s_client -connect bad-site.com:443 2>&1 | grep Verify': 'Verify return code: 21 (unable to verify the first certificate)',
      },
      questions: [
        { q: 'Which TLS version is the current standard and mandates Perfect Forward Secrecy?', a: 'TLS 1.3', hint: 'TLS ___ (2018) removed RSA key exchange and mandates ECDHE', xp: 10 },
        { q: 'What does the Finished message in a TLS handshake verify?', a: 'handshake integrity', hint: 'The Finished message is a MAC over all previous handshake messages, verifying ___ ___', xp: 20 },
        { q: 'In TLS 1.3, which algorithm is used to derive session keys from the ECDHE shared secret?', a: 'HKDF', hint: 'HMAC-based Key Derivation Function: ___', xp: 20 },
      ],
    },
    {
      id: 't4', title: 'Common TLS Attacks',
      xp: 30,
      content: `
<h2>Common TLS Attacks</h2>
<p>Despite TLS being secure in its modern form, the history of TLS is full of devastating attacks — mostly against old versions and weak configurations. As a penetration tester, you must know these.</p>
<h3>POODLE (2014) — CVE-2014-3566</h3>
<ul>
  <li><strong>Target:</strong> SSL 3.0</li>
  <li><strong>Attack:</strong> Padding Oracle On Downgraded Legacy Encryption. Attacker forces TLS downgrade to SSL 3.0, then exploits SSL 3.0's CBC padding to decrypt cookies.</li>
  <li><strong>Fix:</strong> Disable SSL 3.0. All modern browsers/servers do this.</li>
</ul>
<h3>BEAST (2011) — CVE-2011-3389</h3>
<ul>
  <li><strong>Target:</strong> TLS 1.0 CBC</li>
  <li><strong>Attack:</strong> Browser Exploit Against SSL/TLS. TLS 1.0 uses a predictable IV (last ciphertext block), enabling chosen-plaintext attacks against CBC-encrypted cookies.</li>
  <li><strong>Fix:</strong> Use TLS 1.1+. Mitigated by splitting records.</li>
</ul>
<h3>Heartbleed (2014) — CVE-2014-0160</h3>
<ul>
  <li><strong>Target:</strong> OpenSSL's implementation of TLS Heartbeat extension</li>
  <li><strong>Attack:</strong> A missing bounds check allowed reading up to 64KB of server memory per request — exposing private keys, session tokens, passwords. One of the most serious vulnerabilities ever discovered.</li>
  <li><strong>Fix:</strong> Patch OpenSSL. Revoke and reissue all certificates.</li>
</ul>
<h3>CRIME/BREACH (2012-2013)</h3>
<ul>
  <li><strong>Attack:</strong> Compression side-channel. If TLS compresses data (CRIME) or HTTP response body (BREACH) is compressed, oracle attacks on repeated guesses can extract secret cookies character by character.</li>
  <li><strong>Fix:</strong> Disable TLS compression (CRIME). Disable HTTP compression on pages with secrets (BREACH).</li>
</ul>
<h3>DROWN (2016) — CVE-2016-0800</h3>
<ul>
  <li><strong>Attack:</strong> Decrypting RSA with Obsolete and Weakened eNcryption. If a server supports SSLv2 (even on a different port), it can be used to attack TLS 1.2 sessions on the same server sharing the same RSA key.</li>
  <li><strong>Fix:</strong> Disable SSLv2 everywhere, regenerate private keys.</li>
</ul>
<h3>Testing for TLS Vulnerabilities</h3>
<pre><code># testssl.sh — comprehensive TLS security scanner
testssl.sh example.com

# nmap NSE scripts
nmap --script ssl-poodle -p 443 target.com
nmap --script ssl-heartbleed -p 443 target.com
nmap --script ssl-dh-params -p 443 target.com</code></pre>`,
      terminalCommands: {
        'help': 'Commands: testssl, nmap TLS vulnerability scanning',
        'nmap --script ssl-heartbleed -p 443 vulnerable.target.com': 'PORT    STATE SERVICE\n443/tcp open  https\n| ssl-heartbleed:\n|   VULNERABLE:\n|   The Heartbleed Bug is a serious vulnerability in the popular\n|   OpenSSL cryptographic software library.\n|_  State: VULNERABLE',
        'nmap --script ssl-poodle -p 443 target.com': 'PORT    STATE SERVICE\n443/tcp open  https\n| ssl-poodle:\n|   VULNERABLE:\n|   SSL POODLE information leak\n|_  State: VULNERABLE (Exploitable)',
        'nmap --script ssl-enum-ciphers -p 443 target.com | grep -E "TLS|WARN|FAIL"': 'TLSv1.0: PRESENT - WARN (deprecated)\nTLSv1.1: PRESENT - WARN (deprecated)\nRC4: PRESENT - FAIL (broken cipher!)\nSSLv3: PRESENT - FAIL (POODLE vulnerable!)',
      },
      questions: [
        { q: 'What does POODLE stand for?', a: 'Padding Oracle On Downgraded Legacy Encryption', hint: 'P-O-O-D-L-E: ___ ___ On ___ ___ ___', xp: 15 },
        { q: 'Heartbleed was a vulnerability in which popular cryptographic library?', a: 'OpenSSL', hint: '___ — the most widely used TLS library at the time', xp: 10 },
        { q: 'What attack exploits TLS compression to extract secret cookies by guessing characters one at a time?', a: 'CRIME', hint: '___ : Compression Ratio Info-leak Made Easy', xp: 20 },
      ],
    },
    {
      id: 't5', title: 'PGP & GPG',
      xp: 20,
      content: `
<h2>PGP & GPG: Encrypting Email and Files</h2>
<p>PGP (Pretty Good Privacy) was created by Phil Zimmermann in 1991 and caused an international controversy when it was distributed freely — the US government treated strong encryption as a munition. GPG (GNU Privacy Guard) is the free, open-source implementation of OpenPGP.</p>
<h3>PGP/GPG Operations</h3>
<ul>
  <li><strong>Encrypt:</strong> Hybrid encryption — generate session key, encrypt with recipient's public key, encrypt data with AES using session key</li>
  <li><strong>Sign:</strong> Hash the message, sign hash with sender's private key</li>
  <li><strong>Sign-then-Encrypt:</strong> Sign first, then encrypt (recommended)</li>
  <li><strong>Decrypt:</strong> Use private key to decrypt session key, then decrypt data</li>
  <li><strong>Verify:</strong> Use sender's public key to verify signature</li>
</ul>
<h3>Web of Trust</h3>
<p>Unlike PKI (where CAs are the authority), PGP uses a decentralized "Web of Trust":</p>
<ul>
  <li>Anyone can sign anyone else's key, vouching for their identity</li>
  <li>You trust keys that have been signed by people you trust</li>
  <li>Key servers (keyserver.ubuntu.com, keys.openpgp.org) distribute public keys</li>
</ul>
<pre><code># Generate a GPG key pair
gpg --gen-key

# Export public key
gpg --export --armor "alice@example.com" > alice_pub.asc

# Encrypt a file
gpg --encrypt --recipient "bob@example.com" secret.txt

# Sign and encrypt
gpg --sign --encrypt --recipient "bob@example.com" message.txt

# Decrypt
gpg --decrypt message.txt.gpg

# Verify signature
gpg --verify message.sig message.txt</code></pre>`,
      terminalCommands: {
        'help': 'Commands: gpg operations',
        'gpg --gen-key': 'gpg (GnuPG) 2.2.27; Copyright (C) 2021 g10 Code GmbH\nNote: Use "gpg --full-generate-key" for a full featured key generation dialog\nGPG key pair generated: Ed25519 / Curve25519',
        'gpg --encrypt --armor --recipient "bob@example.com" message.txt': '-----BEGIN PGP MESSAGE-----\nhQEMA7x+kcbpbwSWAQgAnMfZ3Y7bvqfGkLp2...\n-----END PGP MESSAGE-----',
        'gpg --decrypt message.txt.gpg': 'gpg: encrypted with 256-bit ECDH key\ngpg: Good signature from "Alice <alice@example.com>"\nDecrypted content: This is a secret message.',
        'gpg --verify message.sig message.txt': 'gpg: Signature made Mon 01 Jan 2024 12:00:00 UTC\ngpg:                using Ed25519 key A3F8C2D1E94B760F\ngpg: Good signature from "Alice <alice@example.com>" [ultimate]',
      },
      questions: [
        { q: 'What decentralized trust model does PGP use instead of Certificate Authorities?', a: 'web of trust', hint: 'PGP uses a ___ of ___ where users vouch for each other\'s keys', xp: 15 },
        { q: 'In PGP, what is the correct order of operations for a secure signed message?', a: 'sign then encrypt', hint: '___ the message first, then ___ it (never encrypt-then-sign)', xp: 20 },
        { q: 'Who created PGP in 1991, which was controversially exported as strong encryption was classified as a munition?', a: 'Phil Zimmermann', hint: 'First name Phil, last name starts with Z: ___ ___', xp: 15 },
      ],
    },
  ],
};

/* ══════════════════════════════════════════════════════════════════
   ROOM 7 — Crypto Vulnerabilities & Attacks
   ══════════════════════════════════════════════════════════════════ */
ROOMS['crypto-attacks'] = {
  id: 'crypto-attacks',
  path: 'crypto',
  title: 'Crypto Vulnerabilities & Attacks',
  description: 'Study real-world cryptographic vulnerabilities: ECB oracle attacks, padding oracle attacks, timing attacks, weak RNG, and famous historical failures.',
  difficulty: 'advanced',
  xpReward: 350,
  iconClass: 'fas fa-bug',
  iconBg: 'rgba(245,158,11,.12)',
  iconColor: '#f59e0b',
  tasks: [
    {
      id: 't1', title: 'ECB Mode Attacks',
      xp: 30,
      content: `
<h2>ECB Mode Attacks</h2>
<p>ECB (Electronic Codebook) mode is the simplest, most broken mode of operation. Real-world systems have been compromised by its use. Understanding ECB attacks is a fundamental penetration testing skill.</p>
<h3>The ECB Determinism Problem</h3>
<p>Since ECB encrypts each block independently with the same key, identical plaintext blocks always produce identical ciphertext blocks. This leaks structure.</p>
<h3>Attack 1: Block Detection / Pattern Recognition</h3>
<p>If you see repeated 16-byte blocks in ciphertext, you know the corresponding plaintext blocks are identical. This reveals:</p>
<ul>
  <li>User profiles with repeated fields</li>
  <li>File content with repeated sections</li>
  <li>Session tokens with repeated structure</li>
</ul>
<h3>Attack 2: ECB Cut-and-Paste (Block Manipulation)</h3>
<p>Classic scenario: a web app encrypts user profiles as:</p>
<pre><code>email=alice@test.com&uid=10&role=user
         Block 1         Block 2

Steps:
1. Register email: "aaaaaaaaaaaaaaadmin" (pads "admin" to its own block)
   email=aaaaaaaaaaaa | aaa&uid=10&role=u | ser
   └──── Block 1 ────┘ └───── Block 2 ────┘

2. Cut Block 2 from another user's token that ends with "admin"
3. Paste it where "user" block is in your token
4. Result: role=admin ✓</code></pre>
<h3>Attack 3: ECB Byte-at-a-Time Oracle</h3>
<pre><code>Scenario: oracle encrypts: ECB(key, attacker_input || secret)

Goal: recover secret one byte at a time

Step 1: Send 15 'A's → first block is [AAAAAAAAAAAAAAA?] where ? = first byte of secret
Step 2: Brute force: try ECB('A'*15 + each possible byte)
         Find which produces the same first block
Step 3: That byte is the first byte of secret!
Step 4: Repeat with 14 'A's to get second byte, etc.</code></pre>
<div class="warning-box"><i class="fas fa-exclamation-triangle"></i> <strong>Never use ECB mode.</strong> There is no legitimate use case for ECB in secure applications. Always use CBC, CTR, or preferably GCM.</div>`,
      terminalCommands: {
        'help': 'Commands: python3 ECB oracle attack simulation',
        'python3 -c "from Crypto.Cipher import AES; key=b\'A\'*16; cipher=AES.new(key,AES.MODE_ECB); pt=b\'AAAAAAAAAAAAAAAA\'; ct=cipher.encrypt(pt); print(f\'Block: {ct.hex()}\')"': 'Block: 3c441f32ce07822364d7a2990e50bb13',
        'python3 -c "from Crypto.Cipher import AES; key=b\'A\'*16; c=AES.new(key,AES.MODE_ECB); pt=b\'AAAAAAAAAAAAAAAA\'+b\'AAAAAAAAAAAAAAAA\'; ct=c.encrypt(pt); print(f\'Block1: {ct[:16].hex()}\nBlock2: {ct[16:].hex()}\nSame: {ct[:16]==ct[16:]}\')"': 'Block1: 3c441f32ce07822364d7a2990e50bb13\nBlock2: 3c441f32ce07822364d7a2990e50bb13\nSame: True  ← ECB reveals repeated blocks!',
        'python3 -c "from Crypto.Cipher import AES; import os; key=os.urandom(16); secret=b\'s3cr3t_data!\'; def oracle(inp): return AES.new(key,AES.MODE_ECB).encrypt((inp+secret).ljust(32,b\'\\x00\')); found=b\'\'; [found.__iadd__(bytes([b])) for b in range(256) if oracle(b\'A\'*15)[0:16]==oracle(b\'A\'*(15-0))[0:16]]; print(f\'Recovering secret...\nFirst byte: {found.hex()}\')"': 'Recovering secret...\nFirst byte: 73 (= "s")',
      },
      questions: [
        { q: 'In an ECB byte-at-a-time oracle attack, how do you recover the first byte of the unknown secret?', a: 'brute force the last position', hint: 'Align secret\'s first byte to the last position of a known block, then ___ ___ all 256 possibilities', xp: 25 },
        { q: 'What makes ECB cut-and-paste attacks possible?', a: 'blocks are encrypted independently', hint: 'Each block is encrypted in isolation — blocks can be reordered or swapped', xp: 20 },
        { q: 'If you see two identical 16-byte blocks in an AES-ECB ciphertext, what do you know about the plaintext?', a: 'identical blocks', hint: 'The corresponding plaintext blocks are ___ (same content)', xp: 15 },
      ],
    },
    {
      id: 't2', title: 'Padding Oracle Attacks',
      xp: 35,
      content: `
<h2>Padding Oracle Attacks</h2>
<p>The padding oracle attack is one of the most powerful and elegant attacks in cryptography. It demonstrates that even a small implementation detail — an informative error message — can completely break a cipher.</p>
<h3>Background: PKCS#7 Padding in CBC</h3>
<p>CBC mode requires all blocks to be exactly the block size. The last block is padded with PKCS#7:</p>
<pre><code>If 1 byte of padding needed:  append 0x01
If 2 bytes needed:             append 0x02 0x02
If 3 bytes needed:             append 0x03 0x03 0x03
...
If 16 bytes (full block):     append 0x10 * 16</code></pre>
<h3>The Oracle</h3>
<p>A "padding oracle" is any system that tells you whether decrypted data has valid padding. This could be:</p>
<ul>
  <li>An HTTP 500 error for "Invalid padding"</li>
  <li>A different error message for padding errors vs content errors</li>
  <li>Timing differences</li>
</ul>
<h3>How the Attack Works</h3>
<pre><code>Goal: Decrypt ciphertext block C2 without the key

CBC decryption: P2 = D(K, C2) XOR C1

1. Send modified ciphertext: C1' = C1 XOR guess XOR 0x01
2. If padding is valid: D(K, C2) XOR C1' = 0x01
   → D(K, C2)[15] = 0x01 XOR C1'[15] = C1[15] XOR guess
   → We know the last byte of D(K, C2) = guess XOR 0x01 XOR C1[15]
   → Therefore P2[15] = D(K,C2)[15] XOR C1[15] = guess XOR 0x01

3. Repeat for each byte, working backwards
   (for byte 14: target 0x02 0x02, etc.)

Result: Recover entire P2 in 128*16 = 2048 oracle calls maximum!</code></pre>
<h3>Real-World Examples</h3>
<ul>
  <li><strong>ASP.NET ViewState (2010):</strong> The MS10-070 vulnerability allowed reading ViewState through a padding oracle. Affected millions of ASP.NET applications.</li>
  <li><strong>POODLE (SSL3.0):</strong> SSL 3.0 padding oracle — the C in POODLE stands for CBC.</li>
  <li><strong>ROBOT (2017):</strong> Return Of Bleichenbacher's Oracle Threat — RSA PKCS#1 v1.5 padding oracle affecting major HTTPS servers including Facebook, PayPal, and others.</li>
</ul>
<div class="warning-box"><i class="fas fa-exclamation-triangle"></i> <strong>Fix:</strong> Use authenticated encryption (AES-GCM) which verifies integrity BEFORE decryption. Never give information about why decryption failed.</div>`,
      terminalCommands: {
        'help': 'Commands: padding oracle attack simulation',
        'python3 padding_oracle_attack.py http://target.com/decrypt': '[*] Starting padding oracle attack\n[*] Target: http://target.com/decrypt\n[*] Ciphertext: 7a3f8c2d1e94b760f5a2c8d3e1f074a8b9c0d1e2f3a4b5c6\n[*] Block 1: Trying byte 255... 254... 253... \n[+] Valid padding found at byte 118 (0x76)\n[+] Intermediate byte 15: 0x77\n[+] Plaintext byte 15: 0x73 = "s"\n[*] Progress: [s][][][][][][][][][][][][][][][]\n...\n[+] DECRYPTED: "secret_admin_token"',
        'python3 -c "# CBC Padding Oracle Simulation\nprint(\'Simulating padding oracle...\')\nprint(\'Block 2 recovery: starting...\')\nfor i in range(1,17):\n    print(f\'  Byte {16-i+1:2d}/16: trying 256 values... found!\')\nprint(\'[+] P2 = admin=true&id=1\')"': 'Simulating padding oracle...\nBlock 2 recovery: starting...\n  Byte 16/16: trying 256 values... found!\n  Byte 15/16: trying 256 values... found!\n...\n[+] P2 = admin=true&id=1',
      },
      questions: [
        { q: 'In a CBC padding oracle attack, what does the oracle tell the attacker?', a: 'padding validity', hint: 'The oracle reveals whether the decrypted block has ___ ___', xp: 20 },
        { q: 'What is the maximum number of oracle queries needed to decrypt a single 16-byte AES-CBC block?', a: '4096', hint: '16 bytes × 256 possibilities per byte = ___ maximum queries', xp: 25 },
        { q: 'What type of encryption prevents padding oracle attacks by verifying integrity BEFORE decryption?', a: 'authenticated encryption', hint: 'AES-GCM provides ___ encryption (checks MAC first)', xp: 20 },
      ],
    },
    {
      id: 't3', title: 'Timing & Side-Channel Attacks',
      xp: 30,
      content: `
<h2>Timing & Side-Channel Attacks</h2>
<p>Side-channel attacks don't attack the cryptographic algorithm mathematically. Instead, they observe physical characteristics of the implementation: time, power consumption, electromagnetic emissions, or even sound.</p>
<h3>Timing Attacks</h3>
<p>Many operations take different amounts of time depending on the data being processed. An attacker who can measure this time can extract secret information.</p>
<h3>String Comparison Timing Attack</h3>
<pre><code># VULNERABLE: early exit on first mismatched byte
def check_password(stored, provided):
    return stored == provided   # Exits early!

# Attack: Measure time for each character guess
# "a..." compared to "password" → fails at byte 0 (fast)
# "p..." → fails at byte 1 (slightly slower)
# "pa..." → fails at byte 2 (even slower)
# etc.

# FIX: Constant-time comparison
import hmac
hmac.compare_digest(stored, provided)  # Always compares all bytes</code></pre>
<h3>RSA Timing Attack (Kocher, 1996)</h3>
<p>The modular exponentiation in RSA processes bits of the private exponent d. The "square-and-multiply" algorithm spends different time for bits 0 (only square) vs 1 (square and multiply). By measuring thousands of decryption times, an attacker can recover d bit by bit.</p>
<h3>Cache-Timing Attacks (AES S-Box)</h3>
<p>AES uses lookup tables (S-Box) in software implementations. Table lookups depend on key material, causing cache hits/misses that vary with the key. FLUSH+RELOAD attacks can exploit this to extract AES keys from co-hosted VMs.</p>
<h3>Power Analysis (Against Hardware)</h3>
<ul>
  <li><strong>SPA (Simple Power Analysis):</strong> Directly read secret key bits from power trace</li>
  <li><strong>DPA (Differential Power Analysis):</strong> Statistical analysis of thousands of power traces</li>
  <li>Used to break cryptographic smart cards, HSMs, IoT devices</li>
</ul>
<div class="success-box"><i class="fas fa-check-circle"></i> <strong>Countermeasures:</strong> Constant-time implementations, blinding (add random noise to computations), hardware AES acceleration (removes table lookups), noise injection in hardware.</div>`,
      terminalCommands: {
        'help': 'Commands: timing attack measurement demo',
        'python3 -c "import time; def slow_compare(a,b): return a==b; def const_compare(a,b): import hmac; return hmac.compare_digest(a.encode(),b.encode()); secret=\'correct_password\'; t1=time.perf_counter_ns(); [slow_compare(secret,\'a\'*i+secret[i:]) for i in range(16)]; t2=time.perf_counter_ns(); print(f\'Non-constant compare: {t2-t1}ns (varies with match length!)\')"': 'Non-constant compare: timing varies with prefix length → leaks info',
        'python3 -c "import time,hmac; secret=b\'my_api_key_12345\'; times=[]\nfor guess in [b\'a\'*16,b\'m\'*16,b\'my_api_key_12345\']:\n    t=time.perf_counter_ns(); hmac.compare_digest(secret,guess); t2=time.perf_counter_ns()\n    times.append(t2-t)\nprint(f\'Timing (ns): {times}\')\nprint(\'Constant time: all similar\')"': 'Timing (ns): [312, 318, 315]\nConstant time: all similar',
      },
      questions: [
        { q: 'What Python function provides constant-time comparison to prevent timing attacks on MACs?', a: 'hmac.compare_digest', hint: 'hmac.___ ___() in Python\'s standard library', xp: 15 },
        { q: 'Paul Kocher\'s 1996 timing attack targets which RSA operation by measuring execution time differences?', a: 'modular exponentiation', hint: 'RSA decryption uses ___ ___, which takes different time for bit 0 vs bit 1', xp: 25 },
        { q: 'What AES implementation detail makes cache-timing attacks (like FLUSH+RELOAD) possible?', a: 'S-Box lookup tables', hint: 'Software AES uses ___ ___ whose memory access pattern depends on key material', xp: 25 },
      ],
    },
    {
      id: 't4', title: 'Weak Randomness Attacks',
      xp: 25,
      content: `
<h2>Weak Randomness in Cryptography</h2>
<p>Cryptography depends on randomness for key generation, IVs, nonces, and salts. Predictable or biased random numbers can completely break otherwise-secure cryptographic systems.</p>
<h3>PRNG vs CSPRNG</h3>
<ul>
  <li><strong>PRNG (Pseudo-Random Number Generator):</strong> Deterministic algorithm producing statistically random-looking output. Given the seed, output is fully predictable. Examples: Python's random, Java's Math.random(), C's rand().</li>
  <li><strong>CSPRNG (Cryptographically Secure PRNG):</strong> PRNG designed so that given part of the output, future outputs cannot be predicted. Uses entropy from the OS (hardware events, timing). Examples: /dev/urandom, os.urandom(), CryptGenRandom().</li>
</ul>
<div class="warning-box"><i class="fas fa-exclamation-triangle"></i> <strong>Never use PRNG for cryptographic purposes.</strong> Use os.urandom(), secrets module (Python), crypto.randomBytes() (Node.js), or hardware RNG.</div>
<h3>The Debian OpenSSL Disaster (2008)</h3>
<p>In 2006, a Debian developer "fixed" a Valgrind warning in OpenSSL's random seed code. The fix removed two lines that added process IDs and memory addresses as entropy sources. Result: OpenSSL keys generated on Debian/Ubuntu from 2006-2008 used only the PID as entropy — at most 32,767 possible values. A complete list of all vulnerable keys could be generated in hours.</p>
<pre><code>Affected: SSH keys, TLS certificates, OpenVPN keys on Debian systems
Severity: CATASTROPHIC — all affected keys must be regenerated</code></pre>
<h3>Predictable IV in WEP</h3>
<p>WEP (Wired Equivalent Privacy, 802.11) used RC4 with a 24-bit IV. The IV was often implemented as a simple counter, and the IV was sent in plaintext with each packet. With 2^24 = 16 million possible IVs, IV reuse was guaranteed after ~5000 packets (birthday paradox). Two packets with the same IV reveal P1 XOR P2 (the XOR of plaintexts), breaking confidentiality entirely. WEP was cracked in minutes with tools like Aircrack-ng.</p>
<h3>Nonce Reuse in AES-GCM</h3>
<p>AES-GCM is catastrophically sensitive to nonce reuse. If the same (key, nonce) pair is used twice:</p>
<pre><code>C1 = P1 XOR E(K, nonce||ctr)
C2 = P2 XOR E(K, nonce||ctr)   ← Same keystream!
C1 XOR C2 = P1 XOR P2          ← Plaintext XOR exposed

ALSO: The authentication key H = E(K, 0) is recoverable!
→ Forge any authenticated ciphertext → complete break</code></pre>`,
      terminalCommands: {
        'help': 'Commands: python3 PRNG vs CSPRNG, entropy',
        'python3 -c "import random; random.seed(42); print([random.randint(0,255) for _ in range(8)])"': '[102, 4, 173, 224, 201, 118, 177, 247]',
        'python3 -c "import random; random.seed(42); print([random.randint(0,255) for _ in range(8)])"': '[102, 4, 173, 224, 201, 118, 177, 247]',
        'python3 -c "import os; print([b for b in os.urandom(8)])"': '[183, 42, 219, 7, 165, 233, 89, 142]  ← Different every time',
        'python3 -c "import secrets; print(secrets.token_hex(16))"': 'a3f8c2d1e94b760f5a2c8d3e1f074a8b  ← Cryptographically secure',
        'python3 -c "print(f\'WEP IV space: 2^24 = {2**24:,} IVs\'); print(f\'Expected collision: ~{int(1.17*(2**24)**0.5):,} packets (birthday paradox)\')"': 'WEP IV space: 2^24 = 16,777,216 IVs\nExpected collision: ~4,793 packets (birthday paradox)',
      },
      questions: [
        { q: 'What Python module provides cryptographically secure random values for security-critical code?', a: 'secrets', hint: 'import ___ (Python 3.6+); also os.urandom()', xp: 10 },
        { q: 'In the 2008 Debian OpenSSL bug, what was the only source of entropy in the broken random number generator?', a: 'process ID', hint: 'Only the ___ ___ (PID) was used as entropy — at most 32,767 values', xp: 25 },
        { q: 'What wireless protocol is broken by predictable 24-bit IVs and can be cracked in minutes by Aircrack-ng?', a: 'WEP', hint: 'Wired Equivalent Privacy (___)... that never was', xp: 15 },
      ],
    },
    {
      id: 't5', title: 'Real-World Crypto Failures',
      xp: 30,
      content: `
<h2>Real-World Crypto Failures</h2>
<p>The history of cryptography is full of cautionary tales. These real incidents demonstrate that even small mistakes in implementing or deploying crypto can have catastrophic consequences.</p>
<h3>Apple's "goto fail" (2014)</h3>
<pre><code>// Actual Apple SSL/TLS code (SSLVerifySignedServerKeyExchange)
static OSStatus SSLVerifySignedServerKeyExchange(...) {
    ...
    if ((err = SSLHashSHA1.update(&hashCtx, &signedParams)) != 0)
        goto fail;
        goto fail;   // ← BUG: duplicate goto, always executed!
    ...
    err = sslRawVerify(...);  // NEVER REACHED
fail:
    ...
    return err;   // err = 0 (success) — VERIFICATION BYPASSED!
}</code></pre>
<p>A duplicate <code>goto fail</code> caused signature verification to be completely skipped. Any TLS certificate was accepted as valid. All iOS and Mac OS X devices were vulnerable to MitM attacks for months.</p>
<h3>Heartbleed (2014)</h3>
<p>A missing bounds check in OpenSSL's heartbeat extension allowed reading up to 64KB of server RAM per request. Over 17% of all HTTPS servers were vulnerable. Private keys, session tokens, and passwords were exposed. Named because the vulnerability was in the "heartbeat" TLS extension.</p>
<h3>KRACK (2017)</h3>
<p>Key Reinstallation Attack against WPA2 Wi-Fi. By replaying cryptographic handshake messages, an attacker could force reuse of nonces in AES-CCMP, breaking Wi-Fi encryption. Affected virtually all Wi-Fi clients and many access points.</p>
<h3>MD5 Collision: Flame Malware (2012)</h3>
<p>The nation-state malware "Flame" used an MD5 chosen-prefix collision to forge a Microsoft code-signing certificate. This allowed Flame to appear as legitimate Windows software, spreading via Windows Update infrastructure across the Middle East.</p>
<h3>LinkedIn Password Breach (2012)</h3>
<p>LinkedIn stored 117 million passwords as unsalted SHA-1 hashes. Within days of the breach, 90%+ were cracked. The lack of salting meant identical passwords had identical hashes, and precomputed rainbow tables worked perfectly.</p>
<div class="success-box"><i class="fas fa-check-circle"></i> <strong>Lessons Learned:</strong>
<ul>
  <li>Code review everything touching crypto, especially control flow</li>
  <li>Use memory-safe languages where possible</li>
  <li>Never roll your own crypto — use audited libraries</li>
  <li>Always salt passwords; use bcrypt/Argon2</li>
  <li>Patch and update cryptographic libraries immediately</li>
  <li>Fuzz test cryptographic implementations</li>
</ul></div>`,
      terminalCommands: {
        'help': 'Commands: vulnerability scanning reference',
        'nmap --script ssl-heartbleed target.com': '[+] ssl-heartbleed:\n  VULNERABLE: The Heartbleed Bug in OpenSSL\n  References:\n    https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2014-0160\n  Disclosure date: 2014-04-07\n  Affected versions: OpenSSL 1.0.1 through 1.0.1f',
        'openssl version': 'OpenSSL 3.0.13 30 Jan 2024  (patched)',
        'python3 -c "# MD5 collision check\nprint(\'Checking if this executable has a valid signature...\')\nprint(\'[!] Signature verified via MD5 — INSECURE!\')\nprint(\'[*] Flame malware used chosen-prefix MD5 collision to forge this cert\')"': 'Checking if this executable has a valid signature...\n[!] Signature verified via MD5 — INSECURE!\n[*] Flame malware used chosen-prefix MD5 collision to forge this cert',
      },
      questions: [
        { q: 'In the Apple "goto fail" bug, what security check was inadvertently bypassed?', a: 'signature verification', hint: 'TLS certificate ___ ___ was skipped, accepting any certificate', xp: 20 },
        { q: 'What was wrong with LinkedIn\'s password storage that made their 2012 breach so devastating?', a: 'unsalted SHA-1', hint: 'They used ___ SHA-1 hashes (no salt), allowing rainbow table attacks', xp: 20 },
        { q: 'The KRACK attack against WPA2 forced the reuse of what cryptographic primitive, breaking AES-CCMP encryption?', a: 'nonce', hint: 'KRACK: Key Reinstallation Attack — forced ___ reuse', xp: 20 },
      ],
    },
  ],
};

/* ══════════════════════════════════════════════════════════════════
   ROOM 8 — FINAL EXAM: The Cryptographer's Gauntlet
   ══════════════════════════════════════════════════════════════════ */
ROOMS['crypto-final-exam'] = {
  id: 'crypto-final-exam',
  path: 'crypto',
  title: 'FINAL EXAM: The Cryptographer\'s Gauntlet',
  description: 'The ultimate test. Comprehensive theoretical and practical exam covering all cryptography topics. Hard questions, no hints, real terminal challenges.',
  difficulty: 'expert',
  xpReward: 500,
  iconClass: 'fas fa-graduation-cap',
  iconBg: 'rgba(244,63,94,.12)',
  iconColor: '#f43f5e',
  tasks: [
    {
      id: 't1', title: 'Exam Section 1 — Foundations & Classical Crypto',
      xp: 60,
      content: `
<div style="background:linear-gradient(135deg,rgba(244,63,94,.15),rgba(244,63,94,.05));border:2px solid rgba(244,63,94,.4);border-radius:12px;padding:20px;margin-bottom:24px">
  <div style="font-size:.65rem;font-weight:800;letter-spacing:3px;color:#f43f5e;margin-bottom:8px">FINAL EXAM — SECTION 1 OF 4</div>
  <div style="font-size:1.3rem;font-weight:800;margin-bottom:8px">Foundations & Classical Cryptography</div>
  <p style="font-size:.85rem;color:var(--text-secondary)">This is the comprehensive final examination. You must demonstrate mastery of every topic covered in this course. Answer all questions without hints. There are no second chances on this exam.</p>
</div>
<h3>Instructions</h3>
<ul>
  <li>Answer all questions in this section before proceeding</li>
  <li>Answers are case-insensitive but must be precise</li>
  <li>Use the terminal to verify and compute answers where needed</li>
  <li>No hints available on exam questions</li>
</ul>
<h3>Background: Caesar Cipher Exam Challenge</h3>
<p>The following ciphertext was intercepted. It was encrypted with a Caesar cipher. Your task is to decrypt it and answer the questions that follow.</p>
<pre><code>Intercepted: "FTUE DRO MKOCKB MSFROB SC DBSFSKVVI LBYVOX"</code></pre>
<h3>Background: Vigenère Exam Challenge</h3>
<p>A message was encrypted with the Vigenère cipher using a 5-letter keyword. The ciphertext is:</p>
<pre><code>Ciphertext: "LXFOPVEFRNHR"
Keyword:    "LEMON"</code></pre>
<h3>Core Theory Questions</h3>
<p>Answer these questions based on your knowledge from all rooms. Use the terminal to verify computations.</p>`,
      terminalCommands: {
        'help': 'Final exam terminal — all previous commands available',
        'python3 -c "ct=\'FTUE DRO MKOCKB MSFROB SC DBSFSKVVI LBYVOX\'; [print(f\'Shift {k}: {\'\'.join(chr((ord(c)-65-k)%26+65) if c.isalpha() else c for c in ct.upper())}\') for k in range(1,26)]"': 'Shift  1: ESTD CQN LJNBJA LREHNA RB CAQERAPPE KAXVNW\nShift  2: DRSC BPM KIMAIZ KQDGMZ QA BZPDQZOOD JZWUMV\nShift  3: CQRB AOL JHLZHY JPCFLY PZ AYOCYNNNC IYVTLU\nShift  4: BPQA ZNK IGKYG X IOBFKX OY ZXNBXMMMB HXUKSKT\nShift  5: AOPZ YMJ HFJXFW HNAE JW NXWMAWLLA GWTJRJS\nShift  6: ZNOY XLI GEIW EV GMZDI V MWVLZVKKZ FVSIQIR\nShift  7: YMNX WKH FDHVDU FLYC HU LVUKUYJJY EURHRH Q\nShift 10: VKJU THQ CAESTY CIZY ER ISRHRW GGV BROFQEN\nShift 14: RQGF PML YWAOPU YVVUA AN EONSDSS CS XNKBQA J\nShift 16: POPE NK K WWYMNSS WTTSY YL CMLQAQQA A VLIZYY H\nShift 22: JUST THE CAESAR CIPHER IS TRIVIALLY BROKEN',
        'python3 -c "ct=\'LXFOPVEFRNHR\'; key=\'LEMON\'; pt=\'\'.join(chr((ord(c)-65-(ord(key[i%len(key)])-65))%26+65) for i,c in enumerate(ct)); print(pt)"': 'ATTACKATDAWN',
        'python3 -c "print(f\'Caesar brute-force: only {25} possible keys\'); print(f\'Vigenere with 5-letter key: {26**5:,} possible keys\')"': 'Caesar brute-force: only 25 possible keys\nVigenere with 5-letter key: 11,881,376 possible keys',
        'echo -n "The One-Time Pad" | sha256sum': '7dcfe3e0e07a451fcb4c5a7a2f8038a52f4b96cc5abae3f7e0f97d9e11c7b6f2  -',
      },
      questions: [
        { q: 'Decrypt "FTUE DRO MKOCKB MSFROB SC DBSFSKVVI LBYVOX" (Caesar cipher). What is the plaintext?', a: 'JUST THE CAESAR CIPHER IS TRIVIALLY BROKEN', hint: '', xp: 30 },
        { q: 'Decrypt "LXFOPVEFRNHR" using Vigenère with keyword "LEMON". What is the plaintext?', a: 'ATTACKATDAWN', hint: '', xp: 25 },
        { q: 'Kerckhoffs\'s Principle states that a cryptosystem should be secure even if everything is public except what?', a: 'the key', hint: '', xp: 20 },
        { q: 'What cipher achieves perfect secrecy (provably unbreakable) when used correctly?', a: 'one-time pad', hint: '', xp: 20 },
        { q: 'In a birthday attack on a 256-bit hash, approximately how many operations are needed to find a collision?', a: '2^128', hint: '', xp: 25 },
      ],
    },
    {
      id: 't2', title: 'Exam Section 2 — Symmetric & Asymmetric Encryption',
      xp: 70,
      content: `
<div style="background:linear-gradient(135deg,rgba(244,63,94,.15),rgba(244,63,94,.05));border:2px solid rgba(244,63,94,.4);border-radius:12px;padding:20px;margin-bottom:24px">
  <div style="font-size:.65rem;font-weight:800;letter-spacing:3px;color:#f43f5e;margin-bottom:8px">FINAL EXAM — SECTION 2 OF 4</div>
  <div style="font-size:1.3rem;font-weight:800;margin-bottom:8px">Symmetric & Asymmetric Encryption</div>
</div>
<h3>RSA Exam Challenge</h3>
<p>You are given the following RSA parameters:</p>
<pre><code>p = 61,  q = 53
n = p × q = 3233
e = 17
Ciphertext: C = 2790

Task: Decrypt the ciphertext to recover plaintext M.</code></pre>
<h3>AES Mode Analysis Challenge</h3>
<p>Examine the following ciphertext blocks from an AES-encrypted message:</p>
<pre><code>Block 1: 7e3af71c2b4d5e6f7a8b9c0d1e2f3a4b
Block 2: 7e3af71c2b4d5e6f7a8b9c0d1e2f3a4b  ← IDENTICAL!
Block 3: a1b2c3d4e5f6789012345678901234ab
Block 4: 7e3af71c2b4d5e6f7a8b9c0d1e2f3a4b  ← IDENTICAL AGAIN!</code></pre>
<p>Identify the vulnerability and explain what information is leaked.</p>
<h3>Diffie-Hellman Challenge</h3>
<pre><code>Public parameters:  p = 23,  g = 5
Alice's public key: A = 8   (Alice chose secret a)
Bob's public key:   B = 19  (Bob chose secret b = 15)

Task: Compute the shared secret S = A^b mod p</code></pre>`,
      terminalCommands: {
        'help': 'RSA, AES, DH exam challenges',
        'python3 -c "p=61;q=53;n=p*q;phi=(p-1)*(q-1);e=17;d=pow(e,-1,phi);C=2790;M=pow(C,d,n);print(f\'n={n}, phi={phi}, d={d}\nDecrypted M = {M}\')"': 'n=3233, phi=3120, d=2753\nDecrypted M = 65',
        'python3 -c "p=23;g=5;A=8;b=15;S=pow(A,b,p);print(f\'Shared secret S = A^b mod p = {A}^{b} mod {p} = {S}\')"': 'Shared secret S = A^b mod p = 8^15 mod 23 = 2',
        'python3 -c "print(\'Block analysis:\')\nprint(\'Blocks 1,2,4 are IDENTICAL — same ciphertext blocks\')\nprint(\'This means blocks 1,2,4 of PLAINTEXT are identical\')\nprint(\'Mode: ECB (Electronic Codebook)\')\nprint(\'Vulnerability: leaks block-level plaintext patterns\')"': 'Block analysis:\nBlocks 1,2,4 are IDENTICAL — same ciphertext blocks\nThis means blocks 1,2,4 of PLAINTEXT are identical\nMode: ECB (Electronic Codebook)\nVulnerability: leaks block-level plaintext patterns',
        'python3 -c "print(\'AES round counts:\')\nfor bits,rounds in [(128,10),(192,12),(256,14)]:\n    print(f\'  AES-{bits}: {rounds} rounds\')"': 'AES round counts:\n  AES-128: 10 rounds\n  AES-192: 12 rounds\n  AES-256: 14 rounds',
        'python3 -c "print(\'Key equivalence table:\')\nfor sym,rsa,ecc in [(128,3072,256),(192,7680,384),(256,15360,521)]:\n    print(f\'  AES-{sym} ≈ RSA-{rsa} ≈ ECC-{ecc}\')"': 'Key equivalence table:\n  AES-128 ≈ RSA-3072 ≈ ECC-256\n  AES-192 ≈ RSA-7680 ≈ ECC-384\n  AES-256 ≈ RSA-15360 ≈ ECC-521',
      },
      questions: [
        { q: 'Using RSA with p=61, q=53, e=17, decrypt C=2790. What is the plaintext M?', a: '65', hint: '', xp: 30 },
        { q: 'Compute the Diffie-Hellman shared secret: p=23, g=5, A=8, b=15. What is S = A^b mod p?', a: '2', hint: '', xp: 30 },
        { q: 'The ciphertext shows repeated identical 16-byte blocks. Which AES mode was used?', a: 'ECB', hint: '', xp: 20 },
        { q: 'Which AES operation provides CONFUSION by replacing each byte with a non-linear S-Box substitution?', a: 'SubBytes', hint: '', xp: 20 },
        { q: 'What is the name of the AES GCM nonce-reuse vulnerability that allows authentication key recovery?', a: 'nonce misuse', hint: '', xp: 25 },
        { q: 'Which ECC curve designed by Bernstein (used in X25519) is preferred over NIST P-256 for key exchange?', a: 'Curve25519', hint: '', xp: 20 },
      ],
    },
    {
      id: 't3', title: 'Exam Section 3 — Hashing, PKI & TLS',
      xp: 60,
      content: `
<div style="background:linear-gradient(135deg,rgba(244,63,94,.15),rgba(244,63,94,.05));border:2px solid rgba(244,63,94,.4);border-radius:12px;padding:20px;margin-bottom:24px">
  <div style="font-size:.65rem;font-weight:800;letter-spacing:3px;color:#f43f5e;margin-bottom:8px">FINAL EXAM — SECTION 3 OF 4</div>
  <div style="font-size:1.3rem;font-weight:800;margin-bottom:8px">Hashing, PKI & TLS</div>
</div>
<h3>Password Storage Audit</h3>
<p>You are reviewing a database that stores passwords. Identify each storage method and classify its security:</p>
<pre><code>User  | Stored Value
──────┼────────────────────────────────────────────────────────
Alice | password123                                    (A)
Bob   | cGFzc3dvcmQxMjM=                              (B)
Carol | 482c811da5d5b4bc6d497ffa98491e38              (C)
Dave  | ef92b778bafe771e89245b89ecbc08a44a4e166c0...  (D)
Eve   | $2b$12$7HNojXpScrPJjbdm8zyMxe...             (E)
Frank | $argon2id$v=19$m=65536,t=3,p=4$...           (F)</code></pre>
<h3>TLS Configuration Analysis</h3>
<p>Analyse this server's TLS configuration and identify all security problems:</p>
<pre><code>Server: example-bank.com
Protocols: SSLv3, TLS 1.0, TLS 1.1, TLS 1.2, TLS 1.3
Ciphers: RC4-MD5, DES-CBC-SHA, AES128-SHA, TLS_AES_256_GCM_SHA384
Certificate: SHA-1 signature, expires 2019-12-31
Certificate revocation: None configured</code></pre>
<h3>HMAC Analysis</h3>
<p>A web application uses <code>tag = SHA256(secret_key + user_data)</code> for message authentication. Identify the vulnerability.</p>`,
      terminalCommands: {
        'help': 'Hashing, PKI, TLS exam challenges',
        'python3 -c "import base64,hashlib; vals={\'B\':\'cGFzc3dvcmQxMjM=\',\'C\':\'482c811da5d5b4bc6d497ffa98491e38\'}; print(f\'B decoded: {base64.b64decode(vals[\"B\"]).decode()}\'); print(f\'C = MD5? Test: {hashlib.md5(b\"password123\").hexdigest()==vals[\"C\"]}\')"': 'B decoded: password123\nC = MD5? Test: True',
        'python3 -c "# TLS config analysis\nproblems=[\'SSLv3 — POODLE vulnerable\',\'TLS 1.0 — BEAST vulnerable\',\'TLS 1.1 — deprecated\',\'RC4-MD5 — broken cipher\',\'DES-CBC-SHA — broken cipher\',\'SHA-1 cert — deprecated\',\'Expired certificate (2019)\',\'No certificate revocation\']\nprint(f\'Found {len(problems)} security issues:\')\nfor p in problems: print(f\'  [!] {p}\')"': 'Found 8 security issues:\n  [!] SSLv3 — POODLE vulnerable\n  [!] TLS 1.0 — BEAST vulnerable\n  [!] TLS 1.1 — deprecated\n  [!] RC4-MD5 — broken cipher\n  [!] DES-CBC-SHA — broken cipher\n  [!] SHA-1 cert — deprecated\n  [!] Expired certificate (2019)\n  [!] No certificate revocation',
        'echo -n "password123" | sha256sum': 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f  -',
        'python3 -c "# Length extension attack demo\nimport hashlib\nsecret=b\'s3cr3t\'; data=b\'user=alice\'; tag=hashlib.sha256(secret+data).hexdigest()\nprint(f\'Original tag: {tag[:32]}...\')\nprint(\'Attack: Attacker can extend this without knowing secret!\')\nprint(\'Result: valid tag for secret || user=alice || padding || &admin=true\')"': 'Original tag: a3f8c2d1e94b760f5a2c8d3e...\nAttack: Attacker can extend this without knowing secret!\nResult: valid tag for secret || user=alice || padding || &admin=true',
      },
      questions: [
        { q: 'In the password audit, which user\'s password is stored in the MOST SECURE way?', a: 'Frank', hint: '', xp: 20 },
        { q: 'User B\'s password is stored using Base64 encoding. Is this secure? (yes/no)', a: 'no', hint: '', xp: 15 },
        { q: 'The application uses SHA256(key + data) for authentication. What attack does this enable?', a: 'length extension attack', hint: '', xp: 30 },
        { q: 'How many security issues are present in the TLS configuration above?', a: '8', hint: '', xp: 20 },
        { q: 'What TLS attack would the SSLv3 support in that configuration enable?', a: 'POODLE', hint: '', xp: 20 },
        { q: 'The certificate expired in 2019 and uses SHA-1. What current TLS version should this server ONLY support?', a: 'TLS 1.3', hint: '', xp: 15 },
      ],
    },
    {
      id: 't4', title: 'Exam Section 4 — Attack Scenarios & Final Challenge',
      xp: 80,
      content: `
<div style="background:linear-gradient(135deg,rgba(244,63,94,.15),rgba(244,63,94,.05));border:2px solid rgba(244,63,94,.4);border-radius:12px;padding:20px;margin-bottom:24px">
  <div style="font-size:.65rem;font-weight:800;letter-spacing:3px;color:#f43f5e;margin-bottom:8px">FINAL EXAM — SECTION 4 OF 4 · EXPERT LEVEL</div>
  <div style="font-size:1.3rem;font-weight:800;margin-bottom:8px">Attack Scenarios & Practical Final Challenge</div>
  <p style="color:var(--text-secondary);font-size:.85rem">The hardest section. Requires deep understanding of all attack types covered in the course.</p>
</div>
<h3>Scenario 1: The Padding Oracle</h3>
<p>You are testing a banking application. When you submit a malformed AES-CBC encrypted session token, the server returns:</p>
<ul>
  <li>Valid padding but bad MAC → "Invalid session data" (200 OK)</li>
  <li>Invalid padding → "Cryptographic error" (500 error)</li>
</ul>
<p>You have captured a valid encrypted token: <code>IV:C1 = a3f8c2d1e94b760f:7e3af71c2b4d5e6f</code></p>
<h3>Scenario 2: The Weak Key</h3>
<p>You've captured RSA-encrypted data. On examining the server, you find two RSA public keys that appear to be from different servers:</p>
<pre><code>Server A: n_A = 16637... (1024-bit modulus)
Server B: n_B = 16619... (1024-bit modulus)
gcd(n_A, n_B) = 4049... (NOT 1!)</code></pre>
<h3>Scenario 3: The Code Review</h3>
<p>Review this cryptographic code and identify ALL security vulnerabilities:</p>
<pre><code>import os, hashlib
from Crypto.Cipher import AES

KEY = b"hardcoded_key_16"     # Line 3
IV  = b"\x00" * 16            # Line 4

def encrypt(data):
    cipher = AES.new(KEY, AES.MODE_CBC, IV)   # Line 7
    return cipher.encrypt(data)

def store_password(user, password):
    h = hashlib.md5(password.encode())        # Line 11
    db.store(user, h.hexdigest())

def verify_token(token, expected):
    return token == expected                  # Line 15</code></pre>
<h3>Scenario 4: The Final Decryption Challenge</h3>
<p>You have found the following encrypted flag in a CTF challenge. The system uses AES-ECB with a known weak key (all zeros). Decrypt it to find the flag.</p>
<pre><code>Encrypted (hex): 56cc62987f0a97c6db0b4c4f8640c012
AES key: 0000000000000000  (16 zero bytes)
Mode: ECB</code></pre>`,
      terminalCommands: {
        'help': 'All commands available — this is the final challenge',
        'python3 -c "# Scenario 1: Padding Oracle\nprint(\'[*] Padding Oracle Attack Analysis\')\nprint(\'[+] Server DOES expose padding validity via different error codes\')\nprint(\'[+] This IS a padding oracle — AES-CBC fully decryptable!\')\nprint(\'[*] Attack: byte-flip IV to test each possible byte value\')\nprint(\'[*] ~128 queries per byte, 128 bytes total = ~16,384 oracle calls\')    "': '[*] Padding Oracle Attack Analysis\n[+] Server DOES expose padding validity via different error codes\n[+] This IS a padding oracle — AES-CBC fully decryptable!\n[*] Attack: byte-flip IV to test each possible byte value\n[*] ~128 queries per byte, 128 bytes total = ~16,384 oracle calls',
        'python3 -c "import math; nA=16637; nB=16619; g=math.gcd(nA,nB); print(f\'GCD(n_A, n_B) = {g}\'); print(f\'Shared prime p = {g}\'); print(f\'n_A / p = {nA//g} (other factor of n_A)\'); print(f\'n_B / p = {nB//g} (other factor of n_B)\'); print(f\'BOTH PRIVATE KEYS COMPROMISED!\') if g>1 else None"': 'GCD(n_A, n_B) = 4049\nShared prime p = 4049\nn_A / p = 4109 (other factor of n_A)\nn_B / p = 4105 (other factor of n_B)\nBOTH PRIVATE KEYS COMPROMISED!',
        'python3 -c "# Code review analysis\nvulns=[(3,\'Hardcoded key in source code — key rotation impossible; source leak = full compromise\'),\n       (4,\'Static zero IV — same IV for every encryption; identical plaintexts produce identical ciphertexts\'),\n       (7,\'AES-CBC with fixed IV — not IND-CPA secure; IV must be random per encryption\'),\n       (11,\'MD5 for password hashing — must use bcrypt/Argon2 with salt\'),\n       (15,\'Non-constant-time comparison — timing oracle on session tokens\')]\nfor line,desc in vulns: print(f\'Line {line}: {desc}\')"': 'Line  3: Hardcoded key in source code — key rotation impossible; source leak = full compromise\nLine  4: Static zero IV — same IV for every encryption; identical plaintexts produce identical ciphertexts\nLine  7: AES-CBC with fixed IV — not IND-CPA secure; IV must be random per encryption\nLine 11: MD5 for password hashing — must use bcrypt/Argon2 with salt\nLine 15: Non-constant-time comparison — timing oracle on session tokens',
        'python3 -c "from Crypto.Cipher import AES; key=bytes(16); ct=bytes.fromhex(\'56cc62987f0a97c6db0b4c4f8640c012\'); c=AES.new(key,AES.MODE_ECB); pt=c.decrypt(ct); print(pt)"': "b'CTF{ecb_z3r0_k3y_f4il}'",
        'python3 -c "# Summary: all attack vectors\nprint(\'=== CRYPTOGRAPHER EXAM FINAL SUMMARY ===\')\nprint(\'Padding Oracle: Server leaks padding validity → full CBC decryption\')\nprint(\'Weak Keys:      Shared RSA prime → GCD attack → both keys broken\')\nprint(\'Code Review:    5 critical vulnerabilities identified\')\nprint(\'ECB Decrypt:    AES-ECB(\\\\x00*16) decrypted → flag recovered\')\nprint(\'\\nCongratulations! You have mastered cryptography.\')"': '=== CRYPTOGRAPHER EXAM FINAL SUMMARY ===\nPadding Oracle: Server leaks padding validity → full CBC decryption\nWeak Keys:      Shared RSA prime → GCD attack → both keys broken\nCode Review:    5 critical vulnerabilities identified\nECB Decrypt:    AES-ECB(\\x00*16) decrypted → flag recovered\n\nCongratulations! You have mastered cryptography.',
      },
      questions: [
        { q: 'In Scenario 1, is the different error message ("Cryptographic error" vs "Invalid session data") sufficient to execute a padding oracle attack? (yes/no)', a: 'yes', hint: '', xp: 20 },
        { q: 'In Scenario 2, what mathematical operation reveals the shared prime factor between the two RSA moduli?', a: 'GCD', hint: '', xp: 25 },
        { q: 'How many security vulnerabilities exist in the Scenario 3 code? (count all lines with issues)', a: '5', hint: '', xp: 25 },
        { q: 'In Scenario 3 Line 15, what type of attack does non-constant-time token comparison enable?', a: 'timing attack', hint: '', xp: 25 },
        { q: 'Decrypt the AES-ECB ciphertext with all-zero key. What is the flag?', a: 'CTF{ecb_z3r0_k3y_f4il}', hint: '', xp: 40 },
        { q: 'Having completed all four sections: what is the fundamental principle that states security must come from the key, not the algorithm?', a: "Kerckhoffs's principle", hint: '', xp: 25 },
      ],
    },
  ],
};

/* ══════════════════════════════════════════════════════════════════
   NEW CTF CHALLENGES — Crypto Category
   ══════════════════════════════════════════════════════════════════ */
CTF_CHALLENGES.push(
  {
    id: 'crypto-ctf-1',
    category: 'Cryptography',
    title: 'Ancient Secrets',
    description: 'A message was intercepted, encrypted with a classical cipher. Decrypt it to retrieve the flag hidden within.',
    points: 150,
    difficulty: 'beginner',
    hint: 'Try all 25 Caesar shifts. The flag format is CTF{...}',
    flag: 'CTF{c4es4r_sh1ft_3}',
    story: 'Your team intercepted a message from an operative using ancient encryption techniques. The encrypted message reads: "PGS{p4rf4e_fu1sg_3}". Decrypt it to reveal the flag.',
    terminalCommands: {
      'help': 'Commands: python3 Caesar brute force',
      'python3 -c "ct=\'PGS{p4rf4e_fu1sg_3}\'; [print(f\'Shift {k}: {\'\'.join(chr((ord(c)-65-k)%26+65) if c.isupper() else chr((ord(c)-97-k)%26+97) if c.islower() else c for c in ct)}\') for k in range(1,26)]"': 'Shift  1: OFR{o4qe4d_et0rf_2}\nShift  2: NEQ{n4pd4c_ds0qe_1}\nShift  3: CTF{c4es4r_sh1ft_3}\nShift  4: BSE{b4dr4q_rg0es_2}\n...',
      'python3 -c "ct=\'PGS{p4rf4e_fu1sg_3}\'; k=13; print(\'\'.join(chr((ord(c)-65-k)%26+65) if c.isupper() else chr((ord(c)-97-k)%26+97) if c.islower() else c for c in ct))"': 'CTF{c4es4r_sh1ft_3}',
    },
  },
  {
    id: 'crypto-ctf-2',
    category: 'Cryptography',
    title: 'Hash & Slash',
    description: 'A database backup was found containing MD5 hashes of admin passwords. Crack them to gain access and find the flag.',
    points: 200,
    difficulty: 'beginner',
    hint: 'MD5 is broken. Try common passwords against these hashes using hashcat or a dictionary.',
    flag: 'CTF{md5_1s_d3ad_us3_argon2}',
    story: 'You found a backup of the admin database: admin:5f4dcc3b5aa765d61d8327deb882cf99. Crack the MD5 hash and log in to find the flag in /admin/flag.txt.',
    terminalCommands: {
      'help': 'Commands: hashcat, john, python3 hash cracking',
      'hashcat -m 0 5f4dcc3b5aa765d61d8327deb882cf99 /usr/share/wordlists/rockyou.txt': 'Session..........: hashcat\nStatus...........: Cracked\n5f4dcc3b5aa765d61d8327deb882cf99:password\nSpeed: 56,198 MH/s | Cracked in 0 seconds',
      'python3 -c "import hashlib; target=\'5f4dcc3b5aa765d61d8327deb882cf99\'; words=[\'admin\',\'password\',\'123456\',\'letmein\']; [print(f\'CRACKED: {w}\') for w in words if hashlib.md5(w.encode()).hexdigest()==target]"': 'CRACKED: password',
      'curl -X POST http://target.com/admin/login -d "user=admin&pass=password"': 'HTTP/1.1 200 OK\nWelcome, admin!\nYour flag is stored at /admin/flag.txt',
      'curl http://target.com/admin/flag.txt -H "Cookie: session=admin_token_abc123"': 'CTF{md5_1s_d3ad_us3_argon2}',
    },
  },
  {
    id: 'crypto-ctf-3',
    category: 'Cryptography',
    title: 'The ECB Oracle',
    description: 'A web service encrypts your input with AES-ECB and appends a secret flag. Use the ECB byte-at-a-time oracle attack to recover the flag.',
    points: 350,
    difficulty: 'intermediate',
    hint: 'Control the prefix length to align the unknown bytes to block boundaries. Compare blocks.',
    flag: 'CTF{ecb_0r4cl3_4tt4ck}',
    story: 'The vault service at oracle.vault.ctf encrypts: AES-ECB(key, your_input + secret_flag). You control your_input. Recover the flag byte by byte.',
    terminalCommands: {
      'help': 'Commands: python3 ECB oracle attack',
      'curl "http://oracle.vault.ctf/encrypt?input=AAAAAAAAAAAAAAAA"': '{"ciphertext":"3c441f32ce07822364d7a2990e50bb133c441f32ce07822364d7a2990e50bb13..."}',
      'python3 ecb_oracle.py --url http://oracle.vault.ctf/encrypt': '[*] Detecting ECB mode...\n[+] ECB mode confirmed (repeated blocks detected)\n[*] Detecting block size... 16 bytes\n[*] Starting byte-at-a-time recovery...\n[*] Byte 1/22: C\n[*] Byte 2/22: T\n[*] Byte 3/22: F\n[*] Byte 4/22: {\n...\n[+] FLAG RECOVERED: CTF{ecb_0r4cl3_4tt4ck}',
      'python3 -c "from Crypto.Cipher import AES; import os; key=os.urandom(16); secret=b\'CTF{ecb_0r4cl3_4tt4ck}\'\ndef oracle(inp):\n    return AES.new(key,AES.MODE_ECB).encrypt((inp+secret).ljust(48,b\'\\x00\'))\nfound=b\'\'\nfor i in range(len(secret)):\n    block=i//16; pos=i%16; pad=b\'A\'*(15-pos)\n    target=oracle(pad)[block*16:(block+1)*16]\n    for b in range(256):\n        if oracle(pad+found+bytes([b]))[block*16:(block+1)*16]==target:\n            found+=bytes([b]); break\nprint(found.decode())"': 'CTF{ecb_0r4cl3_4tt4ck}',
    },
  },
  {
    id: 'crypto-ctf-4',
    category: 'Cryptography',
    title: 'Padding Oracle',
    description: 'A vulnerable web app uses AES-CBC and leaks padding validity through error codes. Exploit the padding oracle to decrypt the encrypted session token containing the flag.',
    points: 400,
    difficulty: 'advanced',
    hint: 'Different error messages for padding error vs MAC error. Use padbuster or write a custom oracle script.',
    flag: 'CTF{p4dd1ng_0r4cl3_m4st3r}',
    story: 'The banking app encrypts sessions with AES-CBC. HTTP 500 = padding error. HTTP 200 with "bad data" = valid padding, bad content. You have a valid encrypted token. Decrypt it.',
    terminalCommands: {
      'help': 'Commands: padbuster, python3 padding oracle',
      'padbuster http://target-bank.ctf/api/session ENCRYPTEDTOKEN 16 -encoding 0': '[+] Starting PadBuster v0.3.3\n[*] Block 1 of 2\n[*] Attempting padding bytes: 256 requests per byte\n[+] Block 1 Result: 73657373696f6e3d\n[*] Block 2 of 2\n[+] Block 2 Result: 61646d696e3d74727565\n[+] DECRYPTED: session=CTF{p4dd1ng_0r4cl3_m4st3r}',
      'python3 padding_oracle_ctf.py --url http://target-bank.ctf/api/session --token ENCRYPTEDTOKEN': '[*] Padding Oracle Attack starting...\n[*] Block size: 16 bytes\n[*] Recovering Block 2...\n[+] Byte 16: 0x65 = "e"\n[+] Byte 15: 0x72 = "r"\n...\n[+] PLAINTEXT: CTF{p4dd1ng_0r4cl3_m4st3r}',
    },
  },
  {
    id: 'crypto-ctf-5',
    category: 'Cryptography',
    title: 'RSA Weak Primes',
    description: 'An RSA public key was generated with a flawed random number generator that produced two public keys sharing a prime factor. Factor the modulus and decrypt the ciphertext.',
    points: 450,
    difficulty: 'expert',
    hint: 'Compute GCD of both moduli. If GCD != 1, you have a shared prime — factor both keys instantly.',
    flag: 'CTF{rs4_c0mm0n_f4ct0r_pwn3d}',
    story: 'Two servers used a buggy OpenSSL fork that reused prime factors. You have their public keys and an intercepted ciphertext from Server A. Factor n_A using n_B, then decrypt.',
    terminalCommands: {
      'help': 'Commands: python3 RSA GCD attack, openssl',
      'python3 -c "import math; nA=0xde9b2e; nB=0xf3a817; g=math.gcd(nA,nB); print(f\'GCD = {g}\'); print(f\'p = {g}\'); print(f\'q_A = {nA//g}, q_B = {nB//g}\')"': 'GCD = 51941\np = 51941\nq_A = 275934, q_B = 306407',
      'python3 rsa_common_factor.py --n1 pubkey_a.pem --n2 pubkey_b.pem': '[*] Loading public keys...\n[*] Extracting moduli...\n[*] Computing GCD(n_A, n_B)...\n[+] Shared prime found: p = 0x...cb3f\n[+] Factored n_A: p × q_A\n[+] Computing private key d_A...\n[+] Decrypting ciphertext...\n[+] PLAINTEXT: CTF{rs4_c0mm0n_f4ct0r_pwn3d}',
      'python3 -c "# Full RSA common factor attack\nimport math; e=65537\nnA=3233; nB=3337; g=math.gcd(nA,nB); p=g\nqA=nA//p; phi=(p-1)*(qA-1); d=pow(e,-1,phi)\nC=2790; M=pow(C,d,nA); print(f\'Flag: CTF{{rs4_c0mm0n_f4ct0r_pwn3d}} | M={M}\')"': 'Flag: CTF{rs4_c0mm0n_f4ct0r_pwn3d} | M=65',
    },
  }
);

/* ══════════════════════════════════════════════════════════════════
   NEW CRYPTO TOOLS
   ══════════════════════════════════════════════════════════════════ */
TOOLS.push(
  { name: 'OpenSSL', icon: 'fas fa-lock', desc: 'Swiss-army knife for TLS/SSL, certificate management, key generation, and encryption.',
    cmds: ['openssl genrsa -out key.pem 4096', 'openssl s_client -connect host:443', 'openssl x509 -in cert.pem -text -noout', 'openssl enc -aes-256-cbc -pbkdf2 -in plain.txt -out enc.bin'] },
  { name: 'hashcat', icon: 'fas fa-hammer', desc: 'World\'s fastest CPU/GPU-based hash cracking tool. Supports 300+ hash types.',
    cmds: ['hashcat -m 0 hashes.txt wordlist.txt', 'hashcat -m 1800 shadow.txt -a 3 ?a?a?a?a?a', 'hashcat -m 3200 bcrypt.txt rockyou.txt', 'hashcat --show cracked.txt'] },
  { name: 'John the Ripper', icon: 'fas fa-key', desc: 'Classic password cracking tool. Excellent for shadow file cracking and format detection.',
    cmds: ['john --format=raw-md5 hashes.txt', 'john --wordlist=rockyou.txt shadow', 'john --show cracked.txt', 'john --list=formats'] },
  { name: 'CyberChef', icon: 'fas fa-flask', desc: 'Web-based "Cyber Swiss Army Knife" for encoding, decoding, encryption, and analysis. Runs in browser.',
    cmds: ['Base64 Encode/Decode', 'AES Encrypt/Decrypt', 'RSA Encrypt/Decrypt', 'Hash (SHA256/MD5)', 'XOR operations', 'URL Encode/Decode'] },
  { name: 'PadBuster', icon: 'fas fa-border-all', desc: 'Automated tool for executing Padding Oracle Attacks against CBC-mode encrypted data.',
    cmds: ['padbuster URL ENCTOKEN 8 -encoding 0', 'padbuster URL ENCTOKEN 16 -plaintext "admin=true"', 'padbuster URL TOKEN 16 -noiv'] },
  { name: 'RsaCtfTool', icon: 'fas fa-key', desc: 'CTF tool for attacking weak RSA implementations: small e, common factors, Wiener\'s attack, and more.',
    cmds: ['python3 RsaCtfTool.py --publickey key.pem --uncipher cipher.txt', 'python3 RsaCtfTool.py --n N --e E --attack all', 'python3 RsaCtfTool.py --publickey *.pem --attack commonfactors'] }
);
