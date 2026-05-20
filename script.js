<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>MIT VPU — Help Desk</title>
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap" rel="stylesheet">
<style>
  :root {
    --bg: #0a0f1e;
    --surface: #111827;
    --surface2: #1a2235;
    --border: rgba(99,179,237,0.15);
    --accent: #3b82f6;
    --accent2: #06b6d4;
    --accent3: #8b5cf6;
    --gold: #f59e0b;
    --text: #e2e8f0;
    --text-muted: #64748b;
    --user-bubble: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
    --bot-bubble: #1a2235;
    --glow: rgba(59,130,246,0.3);
    --glow2: rgba(139,92,246,0.2);
    --radius: 20px;
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'DM Sans', sans-serif;
    height: 100dvh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
  }

  /* Animated BG */
  body::before {
    content: '';
    position: fixed;
    inset: 0;
    background:
      radial-gradient(ellipse 80% 60% at 10% 0%, rgba(59,130,246,0.12) 0%, transparent 60%),
      radial-gradient(ellipse 60% 50% at 90% 100%, rgba(139,92,246,0.10) 0%, transparent 55%),
      radial-gradient(ellipse 40% 40% at 50% 50%, rgba(6,182,212,0.05) 0%, transparent 60%);
    pointer-events: none;
    z-index: 0;
    animation: bgShift 12s ease-in-out infinite alternate;
  }

  @keyframes bgShift {
    0% { opacity: 1; }
    100% { opacity: 0.6; filter: hue-rotate(30deg); }
  }

  /* Floating particles */
  .particles {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    overflow: hidden;
  }
  .particle {
    position: absolute;
    width: 2px;
    height: 2px;
    border-radius: 50%;
    background: var(--accent);
    opacity: 0;
    animation: floatUp linear infinite;
  }
  @keyframes floatUp {
    0% { transform: translateY(100vh) scale(0); opacity: 0; }
    10% { opacity: 0.6; }
    90% { opacity: 0.3; }
    100% { transform: translateY(-10vh) scale(1.5); opacity: 0; }
  }

  /* HEADER */
  header {
    position: relative;
    z-index: 10;
    background: rgba(17,24,39,0.85);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--border);
    padding: 0 24px;
    height: 72px;
    display: flex;
    align-items: center;
    gap: 16px;
    flex-shrink: 0;
  }

  .logo-ring {
    width: 44px;
    height: 44px;
    border-radius: 14px;
    background: linear-gradient(135deg, var(--accent), var(--accent3));
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: 16px;
    color: #fff;
    box-shadow: 0 0 20px var(--glow);
    flex-shrink: 0;
    position: relative;
    overflow: hidden;
  }
  .logo-ring::after {
    content: '';
    position: absolute;
    inset: -4px;
    border-radius: 16px;
    background: linear-gradient(135deg, var(--accent), var(--accent3));
    z-index: -1;
    animation: rotateBorder 4s linear infinite;
    opacity: 0.4;
  }
  @keyframes rotateBorder {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .header-info { flex: 1; }
  .header-title {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: 18px;
    background: linear-gradient(90deg, #e2e8f0, #93c5fd, #c4b5fd);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: -0.3px;
  }
  .header-sub {
    font-size: 12px;
    color: var(--text-muted);
    letter-spacing: 0.5px;
    margin-top: 2px;
  }

  .status-badge {
    display: flex;
    align-items: center;
    gap: 6px;
    background: rgba(16,185,129,0.1);
    border: 1px solid rgba(16,185,129,0.25);
    border-radius: 20px;
    padding: 5px 12px;
    font-size: 12px;
    color: #34d399;
    font-weight: 500;
    flex-shrink: 0;
  }
  .status-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #34d399;
    animation: pulse 2s ease-in-out infinite;
  }
  @keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 1; box-shadow: 0 0 0 0 rgba(52,211,153,0.4); }
    50% { transform: scale(1.2); opacity: 0.8; box-shadow: 0 0 0 4px rgba(52,211,153,0); }
  }

  /* CHAT AREA */
  .chat-wrapper {
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 1;
  }

  #chat-messages {
    flex: 1;
    overflow-y: auto;
    padding: 28px 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    scroll-behavior: smooth;
  }
  #chat-messages::-webkit-scrollbar { width: 4px; }
  #chat-messages::-webkit-scrollbar-track { background: transparent; }
  #chat-messages::-webkit-scrollbar-thumb { background: rgba(99,179,237,0.2); border-radius: 4px; }

  /* Welcome */
  .welcome-card {
    margin: 0 auto;
    max-width: 560px;
    width: 100%;
    text-align: center;
    padding: 36px 28px;
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 24px;
    animation: fadeSlideUp 0.7s cubic-bezier(0.16,1,0.3,1) forwards;
    position: relative;
    overflow: hidden;
  }
  .welcome-card::before {
    content: '';
    position: absolute;
    top: -40px; left: -40px; right: -40px;
    height: 120px;
    background: linear-gradient(135deg, rgba(59,130,246,0.12), rgba(139,92,246,0.08));
    border-radius: 50%;
  }
  .welcome-icon {
    font-size: 48px;
    margin-bottom: 12px;
    display: block;
    animation: bounce 2.5s ease-in-out infinite;
  }
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-6px); }
  }
  .welcome-card h2 {
    font-family: 'Syne', sans-serif;
    font-size: 22px;
    font-weight: 800;
    background: linear-gradient(90deg, #93c5fd, #c4b5fd);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 8px;
  }
  .welcome-card p {
    color: #94a3b8;
    font-size: 14px;
    line-height: 1.7;
  }

  .quick-btns {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: center;
    margin-top: 20px;
  }
  .quick-btn {
    padding: 7px 14px;
    border-radius: 20px;
    background: rgba(59,130,246,0.1);
    border: 1px solid rgba(59,130,246,0.25);
    color: #93c5fd;
    font-size: 12px;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    transition: all 0.2s;
    white-space: nowrap;
  }
  .quick-btn:hover {
    background: rgba(59,130,246,0.2);
    border-color: rgba(59,130,246,0.5);
    transform: translateY(-1px);
    color: #bfdbfe;
  }

  /* Messages */
  .msg-row {
    display: flex;
    gap: 12px;
    animation: fadeSlideUp 0.4s cubic-bezier(0.16,1,0.3,1) forwards;
    max-width: 820px;
    width: 100%;
    margin: 0 auto;
  }
  .msg-row.user { flex-direction: row-reverse; }

  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(18px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .avatar {
    width: 36px;
    height: 36px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    flex-shrink: 0;
    margin-top: 4px;
  }
  .avatar.bot {
    background: linear-gradient(135deg, var(--accent), var(--accent2));
    box-shadow: 0 0 12px rgba(59,130,246,0.3);
  }
  .avatar.user-av {
    background: linear-gradient(135deg, var(--accent3), #ec4899);
    box-shadow: 0 0 12px rgba(139,92,246,0.3);
  }

  .bubble {
    padding: 14px 18px;
    border-radius: 18px;
    max-width: calc(100% - 56px);
    font-size: 14.5px;
    line-height: 1.75;
    position: relative;
  }
  .msg-row.bot .bubble {
    background: var(--bot-bubble);
    border: 1px solid var(--border);
    border-top-left-radius: 4px;
    color: var(--text);
  }
  .msg-row.user .bubble {
    background: var(--user-bubble);
    border-top-right-radius: 4px;
    color: #fff;
    box-shadow: 0 4px 20px rgba(59,130,246,0.25);
  }

  .bubble strong { color: #93c5fd; font-weight: 600; }
  .msg-row.user .bubble strong { color: #e0f2fe; }
  .bubble ul { padding-left: 18px; margin-top: 6px; }
  .bubble ul li { margin-bottom: 4px; }
  .bubble .tag {
    display: inline-block;
    background: rgba(59,130,246,0.15);
    border: 1px solid rgba(59,130,246,0.3);
    color: #93c5fd;
    padding: 2px 8px;
    border-radius: 6px;
    font-size: 12px;
    margin: 2px 2px;
  }
  .bubble table { width: 100%; border-collapse: collapse; margin-top: 8px; font-size: 13px; }
  .bubble th { background: rgba(59,130,246,0.15); color: #93c5fd; padding: 7px 10px; text-align: left; border-bottom: 1px solid var(--border); }
  .bubble td { padding: 6px 10px; border-bottom: 1px solid rgba(99,179,237,0.07); }
  .bubble tr:last-child td { border-bottom: none; }

  .timestamp {
    font-size: 11px;
    color: var(--text-muted);
    margin-top: 5px;
    padding: 0 4px;
  }
  .msg-row.user .timestamp { text-align: right; }

  /* Typing indicator */
  .typing-row {
    display: flex;
    gap: 12px;
    max-width: 820px;
    width: 100%;
    margin: 0 auto;
    animation: fadeSlideUp 0.3s ease forwards;
  }
  .typing-bubble {
    background: var(--bot-bubble);
    border: 1px solid var(--border);
    padding: 14px 18px;
    border-radius: 18px;
    border-top-left-radius: 4px;
    display: flex;
    gap: 5px;
    align-items: center;
  }
  .dot {
    width: 7px; height: 7px;
    border-radius: 50%;
    background: var(--accent);
    animation: typingDot 1.2s ease-in-out infinite;
  }
  .dot:nth-child(2) { animation-delay: 0.2s; background: var(--accent2); }
  .dot:nth-child(3) { animation-delay: 0.4s; background: var(--accent3); }
  @keyframes typingDot {
    0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
    30% { transform: translateY(-5px); opacity: 1; }
  }

  /* INPUT */
  .input-area {
    position: relative;
    z-index: 10;
    background: rgba(17,24,39,0.9);
    backdrop-filter: blur(20px);
    border-top: 1px solid var(--border);
    padding: 16px 20px 20px;
    flex-shrink: 0;
  }

  .input-inner {
    max-width: 820px;
    margin: 0 auto;
    display: flex;
    gap: 10px;
    align-items: flex-end;
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 10px 10px 10px 18px;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .input-inner:focus-within {
    border-color: rgba(59,130,246,0.5);
    box-shadow: 0 0 0 3px rgba(59,130,246,0.1), 0 0 30px rgba(59,130,246,0.08);
  }

  #user-input {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    color: var(--text);
    font-family: 'DM Sans', sans-serif;
    font-size: 14.5px;
    resize: none;
    max-height: 120px;
    min-height: 24px;
    line-height: 1.6;
  }
  #user-input::placeholder { color: var(--text-muted); }

  #send-btn {
    width: 42px;
    height: 42px;
    border-radius: 12px;
    background: linear-gradient(135deg, var(--accent), var(--accent3));
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s;
    box-shadow: 0 4px 16px rgba(59,130,246,0.3);
  }
  #send-btn:hover:not(:disabled) {
    transform: scale(1.05);
    box-shadow: 0 6px 24px rgba(59,130,246,0.4);
  }
  #send-btn:active:not(:disabled) { transform: scale(0.96); }
  #send-btn:disabled { opacity: 0.4; cursor: not-allowed; }
  #send-btn svg { width: 18px; height: 18px; fill: white; }

  .input-hint {
    text-align: center;
    font-size: 11px;
    color: var(--text-muted);
    margin-top: 10px;
  }

  /* Responsive */
  @media (max-width: 600px) {
    header { padding: 0 14px; height: 62px; }
    .header-title { font-size: 15px; }
    .status-badge span { display: none; }
    .status-badge { padding: 5px 8px; }
    #chat-messages { padding: 18px 12px; gap: 16px; }
    .input-area { padding: 12px 12px 16px; }
    .welcome-card { padding: 24px 18px; }
    .quick-btns { gap: 6px; }
    .quick-btn { font-size: 11px; padding: 6px 11px; }
    .bubble { font-size: 13.5px; padding: 12px 14px; }
  }

  /* Shimmer on send */
  @keyframes shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  .shimmer-text {
    background: linear-gradient(90deg, #93c5fd, #c4b5fd, #67e8f9, #93c5fd);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 3s linear infinite;
  }
</style>
</head>
<body>

<!-- Particles -->
<div class="particles" id="particles"></div>

<!-- Header -->
<header>
  <div class="logo-ring">MIT</div>
  <div class="header-info">
    <div class="header-title">MIT VPU Help Desk</div>
    <div class="header-sub">Maharashtra Institute of Technology — Vishwashanti Gurukul</div>
  </div>
  <div class="status-badge">
    <div class="status-dot"></div>
    <span>Online</span>
  </div>
</header>

<!-- Chat -->
<div class="chat-wrapper">
  <div id="chat-messages">
    <!-- Welcome card -->
    <div class="welcome-card" id="welcome-card">
      <span class="welcome-icon">🎓</span>
      <h2 class="shimmer-text">Welcome to MIT VPU Help Desk</h2>
      <p>Hi there! I'm your AI-powered college assistant. Ask me anything about admissions, courses, fees, eligibility, or anything else!</p>
      <div class="quick-btns">
        <button class="quick-btn" onclick="sendQuick('What courses are available?')">📚 Courses</button>
        <button class="quick-btn" onclick="sendQuick('What is the fee structure?')">💰 Fees</button>
        <button class="quick-btn" onclick="sendQuick('How can I take admission?')">📝 Admission</button>
        <button class="quick-btn" onclick="sendQuick('What is the eligibility?')">✅ Eligibility</button>
        <button class="quick-btn" onclick="sendQuick('What is the hostel fee?')">🏠 Hostel</button>
        <button class="quick-btn" onclick="sendQuick('What is MIT VPU?')">🏫 About College</button>
      </div>
    </div>
  </div>
</div>

<!-- Input -->
<div class="input-area">
  <div class="input-inner">
    <textarea id="user-input" rows="1" placeholder="Ask about courses, fees, admission…" autocomplete="off"></textarea>
    <button id="send-btn" onclick="handleSend()" title="Send">
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
      </svg>
    </button>
  </div>
  <div class="input-hint">Press Enter to send · Shift+Enter for new line</div>
</div>

<script>
// ── COLLEGE KNOWLEDGE BASE ──────────────────────────────────────
const KB = {
  name: "MIT VPU (Maharashtra Institute of Technology — Vishwashanti Gurukul University)",
  location: "Pune, Maharashtra, India",
  courses: {
    "B.Tech CSE": { fee: "₹1,75,000 per year", duration: "4 years", eligibility: "12th with PCM (Physics, Chemistry, Mathematics)" },
    "BCA": { fee: "₹90,000 per year", duration: "3 years", eligibility: "12th pass (any stream)" },
    "MCA": { fee: "₹1,10,000 per year", duration: "2 years", eligibility: "Graduation in a relevant field (BCA/B.Sc. IT/CS or equivalent)" },
    "B.Tech AI/ML": { fee: "₹1,75,000 per year", duration: "4 years", eligibility: "12th with PCM (Physics, Chemistry, Mathematics)" },
    "IT (Information Technology)": { fee: "₹1,75,000 per year", duration: "3 years", eligibility: "12th with PCM (Physics, Chemistry, Mathematics)" }
  },
  admission: [
    "Contact the MIT VPU Help Desk or visit the admissions office.",
    "Fill the official admission form (online or offline).",
    "Submit required documents (marksheets, ID proof, photographs, etc.).",
    "Admission is confirmed after successful fee payment."
  ],
  hostel: {
    fee: "₹2,00,000 per year",
    includes: ["Accommodation (shared/single rooms available)", "Mess & dining facility", "24/7 security & CCTV surveillance", "Wi-Fi connectivity", "Laundry & common room facilities"],
    note: "Hostel fee is separate from the course tuition fee. Seats are limited — early registration recommended."
  }
};

// ── AI RESPONSE ENGINE ──────────────────────────────────────────
function getMITResponse(msg) {
  const q = msg.toLowerCase().trim();

  // College name / about
  if (/college name|what is mit|about mit|about college|tell me about mit|who are you/.test(q)) {
    return `🏫 <strong>${KB.name}</strong><br><br>MIT VPU is a prestigious private university located in <strong>Pune, Maharashtra</strong>. It offers a wide range of undergraduate and postgraduate technology programs with modern facilities and industry-focused curriculum.`;
  }

  // All courses list
  if (/courses?|programs?|what do you offer|available course|list of course|all course/.test(q) && !/fee|fees|duration|eligib/.test(q)) {
    let rows = Object.entries(KB.courses).map(([c, d]) =>
      `<tr><td>📘 ${c}</td><td>${d.duration}</td><td>${d.fee}</td></tr>`
    ).join('');
    return `📚 <strong>Courses offered at MIT VPU:</strong>
      <table>
        <tr><th>Course</th><th>Duration</th><th>Fee/Year</th></tr>
        ${rows}
      </table>
      <br>Ask me about any specific course for more details!`;
  }

  // Fee structure
  if (/fee|fees|cost|price|how much|tuition/.test(q)) {
    for (const [c, d] of Object.entries(KB.courses)) {
      const aliases = getCourseAliases(c);
      if (aliases.some(a => q.includes(a))) {
        return `💰 The fee for <strong>${c}</strong> at MIT VPU is <span class="tag">${d.fee}</span><br><br>📅 Duration: <strong>${d.duration}</strong><br>✅ Eligibility: ${d.eligibility}`;
      }
    }
    let rows = Object.entries(KB.courses).map(([c, d]) =>
      `<tr><td>${c}</td><td>${d.fee}</td></tr>`
    ).join('');
    return `💰 <strong>MIT VPU Fee Structure:</strong>
      <table>
        <tr><th>Course</th><th>Fee Per Year</th></tr>
        ${rows}
      </table>`;
  }

  // Duration
  if (/duration|how long|years?|semester|time/.test(q)) {
    for (const [c, d] of Object.entries(KB.courses)) {
      const aliases = getCourseAliases(c);
      if (aliases.some(a => q.includes(a))) {
        return `📅 <strong>${c}</strong> at MIT VPU is a <span class="tag">${d.duration}</span> program.<br><br>💰 Fee: ${d.fee}<br>✅ Eligibility: ${d.eligibility}`;
      }
    }
    let rows = Object.entries(KB.courses).map(([c, d]) =>
      `<tr><td>${c}</td><td>${d.duration}</td></tr>`
    ).join('');
    return `📅 <strong>Course Durations at MIT VPU:</strong>
      <table>
        <tr><th>Course</th><th>Duration</th></tr>
        ${rows}
      </table>`;
  }

  // Eligibility
  if (/eligib|qualif|require|criteria|12th|graduation|pcm/.test(q)) {
    for (const [c, d] of Object.entries(KB.courses)) {
      const aliases = getCourseAliases(c);
      if (aliases.some(a => q.includes(a))) {
        return `✅ <strong>Eligibility for ${c}:</strong><br><br>${d.eligibility}<br><br>💰 Fee: ${d.fee} &nbsp;|&nbsp; 📅 Duration: ${d.duration}`;
      }
    }
    let rows = Object.entries(KB.courses).map(([c, d]) =>
      `<tr><td>${c}</td><td>${d.eligibility}</td></tr>`
    ).join('');
    return `✅ <strong>Eligibility Criteria at MIT VPU:</strong>
      <table>
        <tr><th>Course</th><th>Eligibility</th></tr>
        ${rows}
      </table>`;
  }

  // Admission
  if (/admission|apply|enroll|register|join|how to get|how to take/.test(q)) {
    const steps = KB.admission.map((s, i) => `<li>${s}</li>`).join('');
    return `📝 <strong>Admission Process at MIT VPU:</strong><br><ol style="padding-left:18px;margin-top:8px;">${steps}</ol><br>💡 For more info, visit the MIT VPU campus or call the admissions office directly!`;
  }

  // Specific course detail
  for (const [c, d] of Object.entries(KB.courses)) {
    const aliases = getCourseAliases(c);
    if (aliases.some(a => q.includes(a))) {
      return `📘 <strong>${c} at MIT VPU</strong><br><br>
        💰 <strong>Fee:</strong> ${d.fee}<br>
        📅 <strong>Duration:</strong> ${d.duration}<br>
        ✅ <strong>Eligibility:</strong> ${d.eligibility}<br><br>
        Want to know about <strong>admission process</strong>? Just ask!`;
    }
  }

  // Hostel
  if (/hostel|accommodation|stay|room|boarding|mess|lodge|pg|dormitor/.test(q)) {
    const items = KB.hostel.includes.map(i => `<li>${i}</li>`).join('');
    return `🏠 <strong>MIT VPU Hostel Facility</strong><br><br>
      💰 <strong>Hostel Fee:</strong> <span class="tag">${KB.hostel.fee}</span><br><br>
      <strong>Facilities Included:</strong>
      <ul style="margin-top:6px;">${items}</ul>
      <br>⚠️ <em>${KB.hostel.note}</em>`;
  }

  // General knowledge
  return null; // falls to Claude API
}

function getCourseAliases(course) {
  const map = {
    "B.Tech CSE": ["b.tech cse", "btech cse", "computer science engineering", "cse", "b tech cse"],
    "BCA": ["bca", "bachelor of computer application", "b.c.a"],
    "MCA": ["mca", "master of computer application", "m.c.a"],
    "B.Tech AI/ML": ["b.tech ai", "btech ai", "ai/ml", "aiml", "artificial intelligence", "machine learning", "b tech ai"],
    "IT (Information Technology)": ["it course", "information technology", "b.tech it", "btech it", "b tech it"]
  };
  return (map[course] || [course.toLowerCase()]);
}

// ── CLAUDE API ──────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are the MIT VPU College Help Desk AI assistant. MIT VPU (Maharashtra Institute of Technology — Vishwashanti Gurukul University) is in Pune, India.

Available courses: B.Tech CSE (₹1,75,000/yr, 4 yrs, PCM), BCA (₹90,000/yr, 3 yrs, 12th pass), MCA (₹1,10,000/yr, 2 yrs, relevant graduation), B.Tech AI/ML (₹1,75,000/yr, 4 yrs, PCM), IT (₹1,75,000/yr, 3 yrs, PCM).

Hostel fee: ₹2,00,000 per year (separate from tuition). Includes accommodation, mess, Wi-Fi, security, laundry. Limited seats.

Admission: contact helpdesk → fill form → submit docs → pay fee.

Be friendly, helpful, and concise. For MIT VPU queries use the data above. For general questions (AI, CS topics, writing applications, etc.) answer helpfully like a knowledgeable college advisor. Keep responses student-friendly. If unclear, politely ask for clarification. Use plain text — no markdown symbols.`;

const conversationHistory = [];

async function askClaude(userMessage) {
  conversationHistory.push({ role: "user", content: userMessage });

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system: SYSTEM_PROMPT,
      messages: conversationHistory
    })
  });

  if (!response.ok) throw new Error("API error " + response.status);
  const data = await response.json();
  const reply = data.content.map(b => b.text || "").join("").trim();
  conversationHistory.push({ role: "assistant", content: reply });
  return reply;
}

// ── UI ──────────────────────────────────────────────────────────
const messagesEl = document.getElementById("chat-messages");
const inputEl = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
let isTyping = false;

function getTime() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function appendMessage(role, html, isHTML = false) {
  // Remove welcome card on first message
  const wc = document.getElementById("welcome-card");
  if (wc) wc.remove();

  const row = document.createElement("div");
  row.className = `msg-row ${role}`;

  const avatar = document.createElement("div");
  avatar.className = `avatar ${role === "bot" ? "bot" : "user-av"}`;
  avatar.textContent = role === "bot" ? "🤖" : "👤";

  const col = document.createElement("div");
  col.style.display = "flex";
  col.style.flexDirection = "column";
  col.style.maxWidth = "calc(100% - 48px)";

  const bubble = document.createElement("div");
  bubble.className = "bubble";
  if (isHTML) bubble.innerHTML = html;
  else bubble.textContent = html;

  const ts = document.createElement("div");
  ts.className = "timestamp";
  ts.textContent = getTime();

  col.appendChild(bubble);
  col.appendChild(ts);
  row.appendChild(avatar);
  row.appendChild(col);
  messagesEl.appendChild(row);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function showTyping() {
  const row = document.createElement("div");
  row.className = "typing-row";
  row.id = "typing-indicator";
  row.innerHTML = `
    <div class="avatar bot">🤖</div>
    <div class="typing-bubble">
      <div class="dot"></div><div class="dot"></div><div class="dot"></div>
    </div>`;
  messagesEl.appendChild(row);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function hideTyping() {
  const t = document.getElementById("typing-indicator");
  if (t) t.remove();
}

async function handleSend() {
  const msg = inputEl.value.trim();
  if (!msg || isTyping) return;

  inputEl.value = "";
  inputEl.style.height = "auto";
  isTyping = true;
  sendBtn.disabled = true;

  appendMessage("user", msg);
  showTyping();

  // Simulate natural delay
  await new Promise(r => setTimeout(r, 600 + Math.random() * 600));

  // Try local KB first
  const local = getMITResponse(msg);
  if (local) {
    hideTyping();
    appendMessage("bot", local, true);
  } else {
    try {
      const reply = await askClaude(msg);
      hideTyping();
      appendMessage("bot", reply, false);
    } catch (err) {
      hideTyping();
      appendMessage("bot", "Sorry, I'm having trouble connecting right now. Please try again in a moment! 🔄", false);
    }
  }

  isTyping = false;
  sendBtn.disabled = false;
  inputEl.focus();
}

function sendQuick(text) {
  inputEl.value = text;
  handleSend();
}

// Auto-resize textarea
inputEl.addEventListener("input", function () {
  this.style.height = "auto";
  this.style.height = Math.min(this.scrollHeight, 120) + "px";
});

// Enter to send
inputEl.addEventListener("keydown", function (e) {
  if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
});

// ── PARTICLES ──────────────────────────────────────────────────
(function spawnParticles() {
  const container = document.getElementById("particles");
  const colors = ["#3b82f6","#8b5cf6","#06b6d4","#f59e0b","#ec4899"];
  for (let i = 0; i < 28; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    p.style.left = Math.random() * 100 + "%";
    p.style.width = p.style.height = (1.5 + Math.random() * 2.5) + "px";
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    p.style.animationDuration = (8 + Math.random() * 14) + "s";
    p.style.animationDelay = (Math.random() * 12) + "s";
    container.appendChild(p);
  }
})();
</script>
</body>
</html>
