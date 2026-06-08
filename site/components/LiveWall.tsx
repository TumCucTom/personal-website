"use client";

import { motion } from "framer-motion";
import live from "@/data/live.json";
import commits from "@/data/live-commits.json";
import f1 from "@/data/f1.json";
import chess from "@/data/live-chess.json";
import spotify from "@/data/live-spotify.json";

type Tile = {
  kind: string;
  label: string;
  value: string;
  meta?: string;
  tone: "fresh" | "calm";
};

type CommitRow = {
  repo: string;
  branch: string;
  sha: string;
  message: string;
  short: string;
  url: string;
  time: string;
};

type CommitSummary = {
  commits: number;
  repoCount: number;
  topRepos: string[];
};

type CommitData = {
  user: string;
  fetchedAt: string;
  latest: CommitRow | null;
  last24h: CommitRow[];
  last7d: CommitRow[];
  capped?: boolean;
  summary: {
    last24h: CommitSummary;
    last7d: CommitSummary;
  };
};

type F1Race = {
  round: number;
  name: string;
  circuit: string;
  city: string;
  country: string;
  raceDate: string;
  raceTime: string;
  sprint?: boolean;
  pb?: string;
};

type F1Data = {
  season: number;
  races: F1Race[];
  simPB: { track: string; time: string; sim: string; car: string; setOn: string };
};

type ChessCategory = {
  rating: number | null;
  best: number | null;
  bestDate: number | null;
  wins: number;
  losses: number;
  draws: number;
  lastGameDate: number | null;
};

type ChessData = {
  user: string;
  profileUrl: string;
  avatar?: string;
  country?: string | null;
  fetchedAt: string;
  rapid: ChessCategory | null;
  blitz: ChessCategory | null;
  bullet: ChessCategory | null;
  daily: ChessCategory | null;
  error?: string;
};

const KIND_TONE: Record<string, string> = {
  commit: "text-domain-ai",
  paper: "text-domain-quantum",
  book: "text-accent2",
  puzzle: "text-domain-puzzle",
  swim: "text-accent",
  climb: "text-accent",
  ironman: "text-accent2",
  lab: "text-domain-hpc",
  society: "text-domain-quantum",
  race: "text-domain-f1",
  sim: "text-domain-f1",
  run: "text-accent",
  rehab: "text-accent2",
  boardgame: "text-domain-chess",
  music: "text-accent",
};

const C = commits as unknown as CommitData;
const F1 = f1 as F1Data;
const CH = chess as ChessData;

type SpotifyData = {
  user: string;
  fetchedAt: string;
  current: {
    name: string;
    artist: string;
    album: string;
    url: string;
    image: string | null;
    isNowPlaying: boolean;
    playedAt: string | null;
  } | null;
  weeklyStats: { totalScrobbles: number } | null;
  topArtists: { name: string; playCount: string }[];
  totalScrobbles: string | null;
};

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.round(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.round(h / 24);
  if (d < 7) return `${d}d ago`;
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

function LatestCommitTile({ row }: { row: CommitRow }) {
  const isFallback = row.message.startsWith("→");
  return (
    <motion.a
      href={row.url}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="group relative col-span-2 p-5 rounded border border-line bg-surface lift overflow-hidden fresh"
    >
      <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-muted mb-3">
        <span>Recent work · {row.short}</span>
        <span className="text-domain-ai">·</span>
      </div>
      <p
        className={`leading-snug line-clamp-2 font-mono ${
          isFallback
            ? "text-sm text-muted"
            : "text-base md:text-lg text-ink"
        }`}
      >
        {isFallback
          ? `pushed to ${row.branch} — view recent commits ↗`
          : row.message}
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-mono text-muted">
        <span className="text-accent tabular">{row.sha}</span>
        <span>·</span>
        <span>{row.branch}</span>
        <span>·</span>
        <span>{timeAgo(row.time)}</span>
      </div>
    </motion.a>
  );
}

function CommitStatTile({
  label,
  summary,
  windowLabel,
  delay,
  capped,
}: {
  label: string;
  summary: CommitSummary;
  windowLabel: string;
  delay: number;
  capped?: boolean;
}) {
  // Backward compat: old schema used "pushes", new uses "commits"
  const commitCount = summary.commits ?? (summary as { pushes?: number }).pushes ?? 0;
  const empty = commitCount === 0;
  return (
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.25 }}
      className={`group relative p-4 rounded border border-line bg-surface lift overflow-hidden ${
        empty ? "" : "fresh"
      }`}
    >
      <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-muted mb-3">
        <span>{label}</span>
        <span className="text-domain-ai">·</span>
      </div>
      {empty ? (
        <p className="text-sm text-muted leading-snug">
          No commits in the last {windowLabel}.
        </p>
      ) : (
        <>
          <p className="font-mono text-3xl text-ink tabular leading-none">
            {capped ? "300+" : commitCount}
            <span className="text-xs text-muted ml-1.5">
              {commitCount === 1 ? "commit" : "commits"}
            </span>
          </p>
          {summary.topRepos.length > 0 && (
            <p className="mt-3 text-[11px] font-mono text-muted line-clamp-2">
              {summary.topRepos.join(" · ")}
            </p>
          )}
        </>
      )}
    </motion.article>
  );
}

function F1Tile() {
  const now = Date.now();
  const next =
    F1.races.find(
      (r) => new Date(r.raceDate + "T23:59:59Z").getTime() >= now
    ) ?? F1.races[0];
  const raceDate = new Date(next.raceDate + "T" + next.raceTime + ":00Z");
  const formatted = raceDate.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    timeZone: "Europe/London",
  });
  return (
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="group relative col-span-2 p-4 rounded border border-line bg-surface lift overflow-hidden"
    >
      <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-muted mb-3">
        <span>F1</span>
        <span className="text-domain-f1">·</span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-widest text-muted">
            Next · R{next.round}
          </p>
          <p className="text-sm text-ink leading-snug mt-1">
            {next.name.replace(" GP", "")}
          </p>
          <p className="text-[11px] font-mono text-muted mt-1">{formatted}</p>
        </div>
        {next.pb ? (
          <div>
            <p className="text-[10px] font-mono uppercase tracking-widest text-muted">
              Sim PB
            </p>
            <p className="font-mono text-lg text-ink tabular leading-none mt-1">
              {next.pb}
            </p>
            <p className="text-[11px] font-mono text-muted mt-1">
              {F1.simPB.track.replace("Circuit de ", "")} · {F1.simPB.sim}
            </p>
          </div>
        ) : (
          <div>
            <p className="text-[10px] font-mono uppercase tracking-widest text-muted">
              Sim PB
            </p>
            <p className="font-mono text-lg text-muted tabular leading-none mt-1">
              —
            </p>
          </div>
        )}
      </div>
    </motion.article>
  );
}

function timeSinceEpoch(epoch: number | null) {
  if (!epoch) return "—";
  const diff = Date.now() - epoch * 1000;
  if (diff < 60_000) return "just now";
  const m = Math.round(diff / 60_000);
  if (m < 60) return `${m}m ago`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.round(h / 24);
  return `${d}d ago`;
}

function ChessTile() {
  const rapid = CH.rapid;
  const error = !rapid;
  return (
    <motion.a
      href={CH.profileUrl}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: 0.04 }}
      className="group relative col-span-2 p-4 rounded border border-line bg-surface lift overflow-hidden"
    >
      <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-muted mb-3">
        <span>Chess</span>
        <span className="text-domain-chess">·</span>
      </div>
      {error ? (
        <p className="text-sm text-muted leading-snug">
          {CH.error ? "chess.com fetch failed — try again in an hour" : "no rapid games yet"}
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-widest text-muted">
              Rapid
            </p>
            <p className="font-mono text-lg text-ink tabular leading-none mt-1">
              {rapid.rating ?? "—"}
            </p>
            <p className="text-[11px] font-mono text-muted mt-1">
              best {rapid.best ?? "—"} · last {timeSinceEpoch(rapid.lastGameDate)}
            </p>
          </div>
          <div>
            <p className="text-[10px] font-mono uppercase tracking-widest text-muted">
              Record
            </p>
            <p className="font-mono text-lg text-ink tabular leading-none mt-1">
              {rapid.wins}-{rapid.losses}-{rapid.draws}
            </p>
            <p className="text-[11px] font-mono text-muted mt-1">
              w-l-d · @{CH.user}
            </p>
          </div>
        </div>
      )}
    </motion.a>
  );
}

export function LiveWall() {
  const tiles = (live as { tiles: Tile[] }).tiles;
  const baseDelay = C.latest ? 0 : 0;
  const commitDelayBase = baseDelay + 0.04;
  const tileDelayBase = commitDelayBase + 0.04 * 2;

  return (
    <section className="px-6 md:px-10 py-16">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 flex items-end justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-muted">
              02 · live wall
            </p>
            <h2 className="font-serif text-3xl md:text-4xl mt-2">
              What I'm up to, right now.
            </h2>
            <p className="text-muted text-sm mt-2 max-w-prose">
              A grid of small tiles — what I'm reading, current targets
              and PBs, rehab progress, the monthly puzzle. Data as identity.
              <span className="text-accent2"> Chess data is live from chess.com and GitHub.</span>
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-muted">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span>live</span>
          </div>
        </header>

        {/* Commit row: hero + two stat tiles */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
          {C.latest ? (
            <LatestCommitTile row={C.latest} />
          ) : (
            <div className="col-span-2 p-5 rounded border border-line bg-surface">
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
                Recent work
              </p>
              <p className="text-sm text-muted mt-2">
                No public pushes in the last week. Fetched{" "}
                {timeAgo(C.fetchedAt)}.
              </p>
            </div>
          )}
          <CommitStatTile
            label="Last 24h"
            summary={C.summary.last24h}
            windowLabel="24 hours"
            delay={commitDelayBase}
            capped={C.capped}
          />
          <CommitStatTile
            label="Last 7d"
            summary={C.summary.last7d}
            windowLabel="7 days"
            delay={commitDelayBase + 0.04}
            capped={C.capped}
          />
        </div>

        {/* F1 + Chess side by side, full row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
          <F1Tile />
          <ChessTile />
        </div>

        {/* Spotify currently playing */}
        {(() => {
          const SP = spotify as unknown as SpotifyData;
          const track = SP.current;
          return (
            <div className="mb-3">
              {track ? (
                <motion.a
                  href={track.url}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: tileDelayBase, duration: 0.25 }}
                  className="group relative flex items-stretch gap-4 p-4 rounded border border-line bg-surface lift overflow-hidden fresh"
                >
                  <div className="flex flex-col justify-between py-0.5 shrink-0">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-muted">
                      {track.isNowPlaying ? "Listening to" : "Last played"}
                    </div>
                    {track.image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={track.image}
                        alt={track.album}
                        className="w-14 h-14 rounded mt-2"
                      />
                    )}
                  </div>
                  <div className="flex flex-col justify-center min-w-0 flex-1">
                    <p className="font-mono text-sm text-ink leading-snug truncate">{track.name}</p>
                    <p className="font-mono text-xs text-muted mt-0.5 truncate">{track.artist}</p>
                    <p className="font-mono text-[10px] text-muted mt-0.5 truncate">
                      {track.album}
                      {track.playedAt && !track.isNowPlaying && ` · ${track.playedAt}`}
                    </p>
                  </div>
                  {/* Desktop stats — hidden on mobile */}
                  <div className="hidden md:flex flex-col gap-4 justify-center pl-6 border-l border-line min-w-32 text-right shrink-0">
                    {SP.topArtists?.length > 0 && (
                      <div>
                        <p className="text-[9px] font-mono uppercase tracking-widest text-muted mb-1">Top artists</p>
                        {SP.topArtists.slice(0, 2).map((a) => (
                          <p key={a.name} className="text-[10px] font-mono text-muted truncate">{a.name} ({a.playCount})</p>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.a>
              ) : (
                <div className="p-4 rounded border border-line bg-surface">
                  <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-muted mb-2">
                    <span>Listening to</span>
                    <span className="text-muted">—</span>
                  </div>
                  <p className="font-mono text-sm text-muted">Nothing in your recent history.</p>
                </div>
              )}
            </div>
          );
        })()}

        {/* Static curated tiles */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {tiles.map((t, i) => (
            <motion.article
              key={`${t.kind}-${i}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: tileDelayBase + i * 0.04, duration: 0.2 }}
              className={`group relative p-4 rounded border border-line bg-surface lift overflow-hidden ${
                t.tone === "fresh" ? "fresh" : ""
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-muted mb-3">
                <span>{t.label}</span>
                <span className={KIND_TONE[t.kind] ?? "text-muted"}>·</span>
              </div>
              <p className="text-sm text-ink leading-snug line-clamp-3">{t.value}</p>
              {t.meta && (
                <p className="mt-3 text-[11px] font-mono text-muted">{t.meta}</p>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}