"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DifficultyBadge } from "@/components/DifficultyBadge";
import { PUZZLES, isCorrect, type Puzzle, type PuzzleKind } from "@/lib/puzzles";

const STORAGE_KEY = "tb_splash_seen_v1";
const SEEN_THRESHOLD = 3;

function shuffleSeenOrder(): PuzzleKind[] {
  const order = PUZZLES.map((p) => p.kind);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}

export function SplashPuzzle() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [order, setOrder] = useState<PuzzleKind[]>([]);
  const [input, setInput] = useState("");
  const [solved, setSolved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const seen = Number(localStorage.getItem(STORAGE_KEY) ?? "0");
    if (seen < SEEN_THRESHOLD) {
      setOrder(shuffleSeenOrder());
      setOpen(true);
      localStorage.setItem(STORAGE_KEY, String(seen + 1));
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const puzzle: Puzzle | undefined = useMemo(() => {
    if (!order.length) return undefined;
    return PUZZLES.find((p) => p.kind === order[index % order.length]);
  }, [order, index]);

  function close() {
    setOpen(false);
    setInput("");
    setSolved(false);
    setError(null);
  }

  function next() {
    setError(null);
    setInput("");
    setSolved(false);
    setIndex((i) => i + 1);
  }

  function submit() {
    if (!puzzle) return;
    if (isCorrect(puzzle, input)) {
      setSolved(true);
      setTimeout(close, 700);
    } else {
      setError("Not quite — try again or skip");
    }
  }

  if (!open || !puzzle) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="splash"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-bg"
        style={{ minHeight: "100dvh" }}
        role="dialog"
        aria-modal="true"
        aria-label="Splash puzzle"
      >
        <motion.div
          key={puzzle.kind}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-xl mx-4 border border-line bg-surface p-8 rounded-md shadow-2xl"
        >
          <div className="flex items-center justify-between text-xs uppercase tracking-widest text-muted font-mono mb-6">
            <span>Splash · {String(index + 1).padStart(2, "0")} / {order.length}</span>
            <span className="text-domain-puzzle">{puzzle.kind}</span>
            <span className="ml-2">
              <DifficultyBadge difficulty={puzzle.difficulty} />
            </span>
          </div>

          <h2 className="font-serif text-2xl text-ink mb-2">{puzzle.title}</h2>
          <p className="text-muted text-sm mb-6">{puzzle.prompt}</p>

          <input
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            placeholder="type answer, then enter"
            className="w-full bg-bg border border-line focus:border-accent outline-none px-4 py-3 font-mono text-sm text-ink rounded"
            disabled={solved}
          />

          {puzzle.hint && !solved && (
            <p className="text-xs text-muted mt-2 font-mono">hint: {puzzle.hint}</p>
          )}

          {error && <p className="text-xs text-accent2 mt-2 font-mono">{error}</p>}
          {solved && <p className="text-xs text-accent mt-2 font-mono">solved — welcome in</p>}

          <div className="flex items-center justify-between mt-6 text-xs font-mono">
            <button
              onClick={submit}
              className="px-3 py-1.5 border border-line hover:border-accent text-ink rounded"
            >
              check
            </button>
            <div className="flex gap-3">
              <button
                onClick={next}
                className="px-3 py-1.5 text-muted hover:text-ink"
              >
                next puzzle →
              </button>
              <button
                onClick={close}
                className="px-3 py-1.5 text-muted hover:text-accent2"
              >
                skip
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
