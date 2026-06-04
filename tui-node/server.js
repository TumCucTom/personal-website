import fs from "node:fs";
import path from "node:path";
import { generateKeyPairSync } from "node:crypto";
import pkg from "ssh2";
const { Server } = pkg;

const ESC = "\x1b[";
const RESET = `${ESC}0m`;
const DIM = `${ESC}90m`;
const BRIGHT = `${ESC}97m`;
const HIGHLIGHT = `${ESC}7m`;
const CYAN = `${ESC}96m`;
const MAGENTA = `${ESC}95m`;
const YELLOW = `${ESC}93m`;
const GREEN = `${ESC}92m`;
const HIDE_CURSOR = `${ESC}?25l`;
const SHOW_CURSOR = `${ESC}?25h`;
const ALT_SCREEN = `${ESC}?1049h`;
const MAIN_SCREEN = `${ESC}?1049l`;
const CLEAR = `${ESC}2J`;
const HOME = `${ESC}H`;

const DEFAULT_HOST_KEY_PATH = path.join(process.cwd(), "data", "tui-host-key.pem");

const profile = {
  name: "Thomas Bale",
  tagline: "Founder | Athlete | Developer",
  bio: "I represented the UK in High Performance Computing at ISC'25. I'm a competitive swimmer of 11 years — national and international meets — and a former long-distance triathlete now climbing and training Muay Thai. I'm graduating from the University of Bristol with a BSc Computer Science, expected First Class — ranked 1/211 for computer systems programming coursework. I love puzzles, problem solving, board games, and building. I'm also an open source contributor to MiniMax, PyTorch, and more.",
  location: "Bristol, UK",
  email: "tokbale@outlook.com",
  websites: [
    { label: "thomasbale.com", url: "https://thomasbale.com" },
    { label: "GitHub", url: "https://github.com/TumCucTom" },
    { label: "LinkedIn", url: "https://linkedin.com/in/thomas-bale" },
  ],
  education: [
    {
      institution: "University of Bristol",
      degree: "BSc Computer Science — First Class",
      dates: "Sep 2023 – Current",
      grade: "86% AI, 87% ML, 86% Systems",
      detail: "Treasurer & Planning & Control Lead — Formula Student AI. Founder & President of UoB Quantum Computing Society.",
      modules: ["High Performance Computing", "Types and Lambda Calculus", "Image Processing and Computer Vision", "Machine Learning", "Artificial Intelligence"],
    },
    {
      institution: "Colchester Royal Grammar School",
      degree: "A-Levels: A*A*AA",
      dates: "Sep 2021 – Jul 2023",
      grade: "100% CS NEA, 1st in CS cohort",
      detail: "Computer Science, Maths, Further Maths, Physics. President — Computer Science Society.",
    },
    {
      institution: "Felsted School",
      degree: "GCSEs: 9,9,9,9,9,9,9,9,9,Distinction",
      dates: "Sep 2018 – Jul 2021",
      grade: "Academic Scholarship",
      detail: "Further Maths, Computer Science, D&T, Triple Science, Maths, Double English, SLE.",
    },
  ],
  experience: [
    {
      role: "Demonstrator and Graduate Teacher",
      org: "University of Bristol",
      dates: "Aug 2025 - Current",
      detail: "Delivering lectures, workshops. Mentoring students through year-long Software Engineering Project.",
    },
    {
      role: "UK HPC Student Team — UKSCC",
      org: "ISC Student Cluster Competition",
      dates: "May 2025 - Jun 2025",
      detail: "Represented the UK at ISC SCC. Optimised OpenMX and LLMs (llama) on 208-core, 8xH100 cluster.",
    },
    {
      role: "Machine Learning Research Assistant",
      org: "University of Bristol",
      dates: "Feb 2025 - Aug 2025",
      detail: "Developed scalable ML workflow for generating photorealistic emotional faces for psychological research.",
    },
    {
      role: "Co-Founder & Operator",
      org: "Veloworks Components",
      dates: "Sep 2024 - Current",
      detail: "Co-founded business producing 3D-printed performance cycling components.",
    },
  ],
  projects: [
    {
      name: "VLM-memory",
      description: "Adding memory and query based frame selection to VLM-3R-7B model for 3D reconstruction.",
      tags: ["Python", "PyTorch", "VLM"],
      link: "github.com/TumCucTom/VLM-memory",
    },
    {
      name: "F1 Ghost Car",
      description: "Overhead F1 qualifying lap visualization comparing two drivers' fastest laps.",
      tags: ["Python", "FastF1", "Matplotlib"],
      link: "github.com/TumCucTom/f1-ghost-car",
    },
    {
      name: "Llama 8B @ ISC'25",
      description: "8×H100 fine-tuning with FlashAttention 3, FP8, DoRA — UKSCC entry representing UK.",
      tags: ["PyTorch", "HPC", "CUDA", "FP8"],
      link: "github.com/TumCucTom/llama-8b-ISC-25",
    },
    {
      name: "AI for Chess in 3D",
      description: "First ever 3D chess engine + game. A-Level NEA — 100% (75/75), 1st in CS cohort.",
      tags: ["Unity", "C#", "Neural Network"],
      link: "github.com/TumCucTom/ai-chess-3d",
    },
    {
      name: "Quantum Cross-Chain Arbitrage",
      description: "QAOA + Flare FTSO + Vyper flash loans — ETH Oxford DeFi hackathon winners.",
      tags: ["Vyper", "Python", "QAOA"],
      link: "github.com/TumCucTom/quantum-cross-chain-arbitrage",
    },
  ],
  links: [
    { label: "GitHub", url: "github.com/TumCucTom" },
    { label: "LinkedIn", url: "linkedin.com/in/thomas-bale" },
    { label: "Email", url: "tokbale@outlook.com" },
    { label: "thomasbale.com", url: "thomasbale.com" },
  ],
};

const sections = ["About", "Education", "Experience", "Projects", "Contact"];

function getHostKey() {
  if (process.env.TUI_HOST_KEY) {
    return process.env.TUI_HOST_KEY.replaceAll("\\n", "\n");
  }

  const keyPath = process.env.TUI_HOST_KEY_PATH || DEFAULT_HOST_KEY_PATH;
  if (fs.existsSync(keyPath)) {
    return fs.readFileSync(keyPath, "utf8");
  }

  const { privateKey } = generateKeyPairSync("rsa", {
    modulusLength: 2048,
    privateKeyEncoding: {
      type: "pkcs1",
      format: "pem",
    },
  });

  fs.mkdirSync(path.dirname(keyPath), { recursive: true });
  fs.writeFileSync(keyPath, privateKey, { mode: 0o600 });
  return fs.readFileSync(keyPath, "utf8");
}

class TuiSession {
  constructor(stream, size = {}) {
    this.stream = stream;
    this.cols = Number(size.cols) || 100;
    this.rows = Number(size.rows) || 32;
    this.currentSection = 0;
    this.scroll = 0;
    this.closed = false;
    this.lastInfo = "j/k: navigate  |  q: quit";
    this.typedSections = new Set();
    this.typeIndex = 0;
    this.typeTimer = null;
    this.pulseOn = false;
    this.pulseTimer = null;
    this.wipeTimer = null;
    this.startPulse();
  }

  start() {
    this.stream.write(`${ALT_SCREEN}${HIDE_CURSOR}${CLEAR}${HOME}`);
    this.stream.on("data", (data) => this.handleInput(data));
    this.stream.on("close", () => this.close(false));
    this.stream.on("error", () => this.close(false));
    this.render();
  }

  resize(size = {}) {
    this.cols = Number(size.cols) || this.cols;
    this.rows = Number(size.rows) || this.rows;
    this.render();
  }

  handleInput(data) {
    const input = data.toString("utf8");

    if (input.includes("\x03") || input.includes("q")) {
      this.stopPulse();
      this.stopTyping();
      this.close(true);
      return;
    }

    if (input.includes("k") || input.includes("\x1b[B")) {
      this.currentSection = (this.currentSection + 1) % sections.length;
      this.scroll = 0;
    } else if (input.includes("j") || input.includes("\x1b[A")) {
      this.currentSection = (this.currentSection - 1 + sections.length) % sections.length;
      this.scroll = 0;
    } else if (input.includes(" ")) {
      this.currentSection = (this.currentSection + 1) % sections.length;
      this.scroll = 0;
    } else {
      return;
    }

    this.animateWipe(() => {
      if (this.closed) return;
      this.typedSections.delete(this.currentSection);
      this.typeIndex = 0;
      this.render();
      this.startTyping();
    });
  }

  startPulse() {
    this.pulseTimer = setInterval(() => {
      this.pulseOn = !this.pulseOn;
      if (!this.closed) this.renderPulse();
    }, 500);
  }

  renderPulse() {
    const pulseStyle = this.pulseOn ? HIGHLIGHT : RESET;
    const navItems = sections.map((sec, i) =>
      i === this.currentSection ? `${pulseStyle}${sec}${RESET}` : DIM + sec + RESET
    ).join("  ");
    this.stream.write(`\r\x1b[1A${HOME}${style(navItems, RESET)}`);
  }

  animateWipe(callback) {
    if (this.wipeTimer) clearInterval(this.wipeTimer);
    const lines = this.rows - 2;
    let i = 0;
    this.wipeTimer = setInterval(() => {
      if (this.closed) { clearInterval(this.wipeTimer); return; }
      this.stream.write(`\x1b[${i + 1};${this.cols}H${style("█", DIM)}\x1b[K`);
      i++;
      if (i >= lines) { clearInterval(this.wipeTimer); callback(); }
    }, 8);
  }

  startTyping() {
    if (this.typedSections.has(this.currentSection)) return;
    const text = this.getTypingText();
    if (!text) return;

    this.typedSections.add(this.currentSection);
    this.typeIndex = 0;
    if (this.typeTimer) clearInterval(this.typeTimer);

    this.typeTimer = setInterval(() => {
      if (this.closed) { clearInterval(this.typeTimer); return; }
      this.typeIndex++;
      this.stream.write(`${CLEAR}${HOME}${renderScreen(this, this.typeIndex)}`);
      if (this.typeIndex >= text.length) clearInterval(this.typeTimer);
    }, 15);
  }

  stopTyping() {
    if (this.typeTimer) clearInterval(this.typeTimer);
  }

  getTypingText() {
    switch (this.currentSection) {
      case 0: return profile.bio;
      case 2: return profile.experience.map(e => `${e.role} @ ${e.org}`).join(" ");
      default: return null;
    }
  }

  stopPulse() {
    if (this.pulseTimer) clearInterval(this.pulseTimer);
  }

  close(endStream) {
    if (this.closed) return;
    this.closed = true;
    if (this.pulseTimer) clearInterval(this.pulseTimer);
    if (this.typeTimer) clearInterval(this.typeTimer);
    if (this.wipeTimer) clearInterval(this.wipeTimer);
    this.stream.write(`${SHOW_CURSOR}${MAIN_SCREEN}${RESET}`);
    if (endStream) {
      this.stream.exit?.(0);
      this.stream.end();
    }
  }

  render() {
    if (this.closed) return;
    this.stream.write(`${CLEAR}${HOME}${renderScreen(this)}`);
    this.startTyping();
  }
}

function renderScreen(state, typeIndex) {
  const cols = Math.max(40, state.cols);
  const rows = Math.max(12, state.rows);

  const navItems = sections.map((sec, i) =>
    i === state.currentSection ? `${HIGHLIGHT}${sec}${RESET}` : sec
  ).join("  ");

  const header = navItems;
  const divider = style("-".repeat(cols), DIM);

  const bodyRows = rows - 4;
  let body = "";

  switch (state.currentSection) {
    case 0: body = renderAbout(state, cols, bodyRows, typeIndex); break;
    case 1: body = renderEducation(state, cols, bodyRows); break;
    case 2: body = renderExperience(state, cols, bodyRows, typeIndex); break;
    case 3: body = renderProjects(state, cols, bodyRows); break;
    case 4: body = renderContact(state, cols, bodyRows); break;
  }

  const footer = style(`ssh thomasbale.com | ${state.lastInfo}`, DIM);

  return [
    header,
    divider,
    ...body.split("\n").slice(0, bodyRows),
    divider,
    footer,
  ].slice(0, rows).map((line) => formatLine(line, cols)).join("\r\n");
}

function renderAbout(state, cols, rows, typeIndex) {
  const bio = typeIndex ? profile.bio.slice(0, typeIndex) : profile.bio;
  const cursor = typeIndex && typeIndex < profile.bio.length ? "█" : "";
  const lines = [
    style("▸ About", CYAN),
    "",
    bio + cursor,
    "",
    style(`Location: ${profile.location}`, DIM),
    style(`Email: ${profile.email}`, DIM),
  ];
  return visibleWindow(lines, rows, cols, state.scroll).join("\n");
}

function renderEducation(state, cols, rows) {
  const lines = [style("▸ Education", MAGENTA), ""];
  for (const edu of profile.education) {
    lines.push(style(edu.institution, BRIGHT));
    lines.push(`  ${edu.degree} (${edu.grade})`);
    lines.push(`  ${edu.dates}`);
    lines.push(`  ${edu.detail}`);
    if (edu.modules && edu.modules.length > 0) {
      lines.push(`  ${style("Modules:", DIM)} ${edu.modules.join(", ")}`);
    }
    lines.push("");
  }
  return visibleWindow(lines, rows, cols, state.scroll).join("\n");
}

function renderExperience(state, cols, rows, typeIndex) {
  const lines = [style("▸ Experience", YELLOW), ""];
  let idx = 0;
  for (const exp of profile.experience) {
    const expText = `${style(exp.role, BRIGHT)}  ${style("@", DIM)} ${exp.org}`;
    const showText = typeIndex ? expText.slice(0, Math.min(idx + typeIndex, expText.length)) : expText;
    lines.push(showText + (typeIndex && idx + typeIndex < expText.length ? "█" : ""));
    lines.push(`  ${style("─", DIM)} ${exp.dates}`);
    lines.push(`  ${exp.detail}`);
    lines.push("");
    idx += expText.length + exp.dates.length + exp.detail.length;
  }
  return visibleWindow(lines, rows, cols, state.scroll).join("\n");
}

function renderProjects(state, cols, rows) {
  const lines = [style("▸ Projects", GREEN), ""];
  for (const proj of profile.projects) {
    lines.push(style(`› ${proj.name}`, CYAN));
    lines.push(`  ${proj.description}`);
    lines.push(`  ${style(proj.tags.join(" · "), DIM)}`);
    lines.push(`  ${style(`→ ${proj.link}`, DIM)}`);
    lines.push("");
  }
  return visibleWindow(lines, rows, cols, state.scroll).join("\n");
}

function renderContact(state, cols, rows) {
  const lines = [style("▸ Contact", CYAN), ""];
  for (const link of profile.links) {
    lines.push(`  ${style("›", BRIGHT)} ${link.label}: ${link.url}`);
  }
  lines.push("");
  return visibleWindow(lines, rows, cols, state.scroll).join("\n");
}

function visibleWindow(lines, rows, width, scroll) {
  const maxScroll = Math.max(0, lines.length - rows);
  const start = Math.min(Math.max(0, scroll), maxScroll);
  return lines.slice(start, start + rows);
}

function formatLine(line, width) {
  const visible = stripAnsi(line);
  if (visible.length >= width) return line;
  return `${line}${" ".repeat(width - visible.length)}`;
}

function style(text, ansi) {
  return `${ansi}${text}${RESET}`;
}

function stripAnsi(text) {
  return String(text).replace(/\x1b\[[0-9;?]*[ -/]*[@-~]/g, "");
}

const server = new Server(
  {
    hostKeys: [getHostKey()],
    ident: "SSH-2.0-tui",
  },
  (client, info) => {
    console.log(`connection from ${info.ip}`);

    client
      .on("authentication", (ctx) => ctx.accept())
      .on("ready", () => {
        client.on("session", (accept) => {
          const session = accept();
          let size = { cols: 100, rows: 32 };
          let tui = null;

          session.on("pty", (acceptPty, _reject, info = {}) => {
            size = { cols: info.cols || size.cols, rows: info.rows || size.rows };
            acceptPty?.();
          });

          session.on("window-change", (acceptWindow, _reject, info = {}) => {
            size = { cols: info.cols || size.cols, rows: info.rows || size.rows };
            acceptWindow?.();
            tui?.resize(size);
          });

          session.on("shell", (acceptShell) => {
            const stream = acceptShell();
            tui = new TuiSession(stream, size);
            tui.start();
          });
        });
      })
      .on("error", (error) => {
        console.warn(`client error: ${error.message}`);
      });
  }
);

const port = Number(process.env.TUI_PORT || process.env.PORT || 2222);
const host = process.env.TUI_HOST || "0.0.0.0";

server.listen(port, host, () => {
  console.log(`Thomas Bale TUI listening on ${host}:${port}`);
});