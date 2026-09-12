"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";

// Scroll-scrubbed SVG scenes, one per project. Each receives a 0→1 progress
// value tied to the scrollbar and draws itself in stages as the reader moves
// through the section — nothing plays on a timer, so scrolling back rewinds it.

type P = MotionValue<number>;
export type SceneProps = { p: P; bright: string };

const dim = (a: number) => `rgba(255,255,255,${a})`;

function useSeg(p: P, a: number, b: number, from = 0, to = 1) {
  return useTransform(p, [a, b], [from, to]);
}

// Offsets a stagger window inside [start, end] for item i of n.
function window_(start: number, end: number, i: number, n: number, overlap = 0.5) {
  const span = end - start;
  const a = start + span * (1 - overlap) * (i / Math.max(n - 1, 1));
  return [a, a + span * overlap] as const;
}

/* ---------- primitives ---------- */

function Draw({
  p,
  d,
  start,
  end,
  stroke,
  width = 1.5,
  opacity = 1,
}: {
  p: P;
  d: string;
  start: number;
  end: number;
  stroke: string;
  width?: number;
  opacity?: number;
}) {
  const pathLength = useSeg(p, start, end);
  // A zero-length dash still paints its round cap as a dot, so stay hidden
  // until there's something to draw.
  const visible = useTransform(pathLength, (v) => (v > 0.002 ? opacity : 0));
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={stroke}
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ pathLength, opacity: visible }}
    />
  );
}

function Fade({
  p,
  start,
  end,
  from = 0,
  to = 1,
  children,
}: {
  p: P;
  start: number;
  end: number;
  from?: number;
  to?: number;
  children: React.ReactNode;
}) {
  const opacity = useSeg(p, start, end, from, to);
  return <motion.g style={{ opacity }}>{children}</motion.g>;
}

function Label({
  x,
  y,
  children,
  anchor = "start",
  color = dim(0.5),
  size = 9,
}: {
  x: number;
  y: number;
  children: string;
  anchor?: "start" | "middle" | "end";
  color?: string;
  size?: number;
}) {
  return (
    <text
      x={x}
      y={y}
      fontSize={size}
      fill={color}
      textAnchor={anchor}
      fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
      letterSpacing="0.02em"
    >
      {children}
    </text>
  );
}

/* ---------- 01 NexDerm: photo → scan → network → class probabilities ---------- */

const IN = [58, 92, 126, 160];
const HID = [42, 71, 100, 129, 158, 187];
const OUT = [70, 100, 130];
const CLASSES = [
  { name: "melanoma", len: 52, hot: true },
  { name: "nevus", len: 24, hot: false },
  { name: "eczema", len: 12, hot: false },
];

function Node({ p, x, y, start, end, bright }: { p: P; x: number; y: number; start: number; end: number; bright: string }) {
  const opacity = useSeg(p, start, end);
  return (
    <>
      <circle cx={x} cy={y} r={4} fill={dim(0.18)} />
      <motion.circle cx={x} cy={y} r={4} fill={bright} style={{ opacity }} />
    </>
  );
}

export function NexDermScene({ p, bright }: SceneProps) {
  const scanY = useSeg(p, 0.02, 0.3, 44, 146);
  const bandY = useTransform(scanY, (v) => v - 28);
  const scanOpacity = useTransform(p, [0, 0.04, 0.27, 0.32], [0, 1, 1, 0]);
  const readout = useSeg(p, 0.9, 0.98);

  const edgesA: React.ReactNode[] = [];
  IN.forEach((y1, i) =>
    HID.forEach((y2, j) => {
      const k = i * HID.length + j;
      const [a, b] = window_(0.3, 0.56, k, IN.length * HID.length, 0.45);
      edgesA.push(
        <Draw key={`a${k}`} p={p} d={`M180 ${y1} L245 ${y2}`} start={a} end={b} stroke={dim(0.28)} width={0.8} />
      );
    })
  );
  const edgesB: React.ReactNode[] = [];
  HID.forEach((y1, i) =>
    OUT.forEach((y2, j) => {
      const k = i * OUT.length + j;
      const [a, b] = window_(0.44, 0.68, k, HID.length * OUT.length, 0.45);
      edgesB.push(
        <Draw key={`b${k}`} p={p} d={`M245 ${y1} L310 ${y2}`} start={a} end={b} stroke={dim(0.28)} width={0.8} />
      );
    })
  );

  return (
    <svg viewBox="0 0 400 260" className="h-full w-full" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <defs>
        <linearGradient id="nx-scan" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={bright} stopOpacity="0" />
          <stop offset="1" stopColor={bright} stopOpacity="0.45" />
        </linearGradient>
        <clipPath id="nx-clip">
          <rect x="19" y="39" width="110" height="110" rx="13" />
        </clipPath>
      </defs>

      {/* the uploaded photo */}
      <rect x="18" y="38" width="112" height="112" rx="14" fill={dim(0.05)} stroke={dim(0.18)} />
      <g fill={dim(0.12)}>
        {[[34, 58], [52, 130], [106, 62], [112, 120], [40, 100], [92, 138], [76, 52]].map(([x, y]) => (
          <circle key={`${x}${y}`} cx={x} cy={y} r={2} />
        ))}
      </g>
      <ellipse cx={74} cy={94} rx={27} ry={21} fill={bright} fillOpacity={0.2} stroke={bright} strokeOpacity={0.55} strokeWidth={1.2} />
      <ellipse cx={79} cy={90} rx={12} ry={9} fill={bright} fillOpacity={0.3} />
      <g clipPath="url(#nx-clip)">
        <motion.rect x={19} width={110} height={28} y={bandY} fill="url(#nx-scan)" style={{ opacity: scanOpacity }} />
        <motion.line x1={19} x2={129} y1={scanY} y2={scanY} stroke={bright} strokeWidth={1.5} style={{ opacity: scanOpacity }} />
      </g>
      <Label x={18} y={166}>uploaded photo</Label>

      {/* hand-off into the model */}
      <Draw p={p} d="M134 94 L172 94" start={0.22} end={0.3} stroke={dim(0.35)} width={1} />

      {/* network */}
      {edgesA}
      {edgesB}
      {IN.map((y, i) => (
        <Node key={`in${i}`} p={p} x={180} y={y} start={0.26 + i * 0.02} end={0.34 + i * 0.02} bright={bright} />
      ))}
      {HID.map((y, i) => (
        <Node key={`h${i}`} p={p} x={245} y={y} start={0.46 + i * 0.015} end={0.54 + i * 0.015} bright={bright} />
      ))}
      {OUT.map((y, i) => (
        <Node key={`o${i}`} p={p} x={310} y={y} start={0.62 + i * 0.02} end={0.7 + i * 0.02} bright={bright} />
      ))}
      <Label x={245} y={212} anchor="middle">DenseNet · ResNet · CLIP</Label>

      {/* class probabilities */}
      {CLASSES.map((c, i) => {
        const y = OUT[i];
        const [a, b] = window_(0.7, 0.9, i, CLASSES.length, 0.6);
        return (
          <g key={c.name}>
            <line x1={326} x2={326 + 56} y1={y} y2={y} stroke={dim(0.1)} strokeWidth={6} strokeLinecap="round" />
            <Draw p={p} d={`M326 ${y} L${326 + c.len} ${y}`} start={a} end={b} stroke={c.hot ? bright : dim(0.45)} width={6} />
            <Label x={326} y={y - 8} color={c.hot ? bright : dim(0.45)}>{c.name}</Label>
          </g>
        );
      })}
      <motion.g style={{ opacity: readout }}>
        <Label x={382} y={OUT[2] + 24} anchor="end" color={bright} size={10}>val acc 0.80</Label>
      </motion.g>
    </svg>
  );
}

/* ---------- 02 Local RAG: chunks → embeddings → top-5 → grounded answer ---------- */

const CHUNKS = [
  { len: 54, to: [212, 74] },
  { len: 40, to: [284, 58] },
  { len: 58, to: [236, 128] },
  { len: 34, to: [304, 112] },
  { len: 50, to: [190, 150] },
  { len: 44, to: [272, 150] },
];
const AMBIENT: [number, number][] = [
  [178, 58], [252, 48], [320, 76], [174, 108], [318, 148], [206, 176], [250, 176], [292, 178], [332, 112], [166, 82],
];
const QUERY: [number, number] = [258, 108];
const NEAREST = [0, 2, 3, 5, 1];

function Chunk({ p, i }: { p: P; i: number }) {
  const c = CHUNKS[i];
  const y0 = 52 + i * 15;
  const [a, b] = window_(0.05, 0.42, i, CHUNKS.length, 0.55);
  const cx = useSeg(p, a, b, 36 + c.len / 2, c.to[0]);
  const cy = useSeg(p, a, b, y0, c.to[1]);
  const lineOpacity = useSeg(p, a, a + 0.06, 1, 0.22);
  const dotOpacity = useSeg(p, a, a + 0.06, 0, 1);
  const r = useSeg(p, b - 0.04, b, 2.4, 3.2);
  return (
    <>
      <motion.line x1={36} x2={36 + c.len} y1={y0} y2={y0} stroke={dim(0.5)} strokeWidth={2.5} strokeLinecap="round" style={{ opacity: lineOpacity }} />
      <motion.circle cx={cx} cy={cy} r={r} fill={dim(0.7)} style={{ opacity: dotOpacity }} />
    </>
  );
}

export function RagScene({ p, bright }: SceneProps) {
  const ringR = useSeg(p, 0.44, 0.58, 4, 30);
  const ringOpacity = useSeg(p, 0.44, 0.58, 0.9, 0);
  const queryOpacity = useSeg(p, 0.42, 0.46);

  return (
    <svg viewBox="0 0 400 260" className="h-full w-full" preserveAspectRatio="xMidYMid meet" aria-hidden>
      {/* source document */}
      <rect x={22} y={32} width={90} height={116} rx={10} fill={dim(0.05)} stroke={dim(0.18)} />
      <Label x={22} y={164}>reviews.txt</Label>
      {CHUNKS.map((_, i) => (
        <Chunk key={i} p={p} i={i} />
      ))}

      {/* ambient vectors already in ChromaDB */}
      {AMBIENT.map(([x, y], i) => {
        const [a, b] = window_(0.08, 0.4, i, AMBIENT.length, 0.5);
        return (
          <Fade key={i} p={p} start={a} end={b} to={1}>
            <circle cx={x} cy={y} r={2.2} fill={dim(0.28)} />
          </Fade>
        );
      })}
      <Fade p={p} start={0.3} end={0.4}>
        <Label x={336} y={196} anchor="end">ChromaDB · embeddings</Label>
      </Fade>

      {/* the question lands in the space */}
      <motion.circle cx={QUERY[0]} cy={QUERY[1]} r={ringR} fill="none" stroke={bright} strokeWidth={1} style={{ opacity: ringOpacity }} />
      <motion.circle cx={QUERY[0]} cy={QUERY[1]} r={5} fill={bright} style={{ opacity: queryOpacity }} />

      {/* top-5 similarity retrieval */}
      {NEAREST.map((idx, i) => {
        const [x, y] = CHUNKS[idx].to;
        const [a, b] = window_(0.56, 0.8, i, NEAREST.length, 0.55);
        return (
          <g key={idx}>
            <Draw p={p} d={`M${QUERY[0]} ${QUERY[1]} L${x} ${y}`} start={a} end={b} stroke={bright} width={1} opacity={0.7} />
            <Fade p={p} start={b - 0.05} end={b}>
              <circle cx={x} cy={y} r={4.5} fill={bright} />
            </Fade>
          </g>
        );
      })}

      {/* grounded answer */}
      <Fade p={p} start={0.78} end={0.86}>
        <rect x={244} y={200} width={138} height={46} rx={12} fill={dim(0.06)} stroke={dim(0.2)} />
      </Fade>
      <Draw p={p} d="M256 216 L354 216" start={0.84} end={0.92} stroke={bright} width={2.5} />
      <Draw p={p} d="M256 230 L322 230" start={0.9} end={0.98} stroke={dim(0.55)} width={2.5} />
      <Fade p={p} start={0.92} end={1}>
        <Label x={382} y={258} anchor="end">llama3.2 · &lt; 2 s · no network</Label>
      </Fade>
    </svg>
  );
}

/* ---------- 03 US Accident Dataset: Optuna trials converging on three models ---------- */

const TRIALS = 26;
const X0 = 44;
const X1 = 372;
const Y0 = 206; // baseline
const Y1 = 34; // top

function noise(i: number, seed: number) {
  const s = Math.sin(i * 12.9898 + seed * 78.233) * 43758.5453;
  return s - Math.floor(s);
}

function series(seed: number, ceiling: number) {
  const pts: [number, number][] = [];
  let best = 0;
  const bestPts: [number, number][] = [];
  for (let i = 0; i < TRIALS; i++) {
    const t = i / (TRIALS - 1);
    // Early trials are all over the place; TPE homes in as it learns.
    const mean = 0.28 + (ceiling - 0.28) * (1 - Math.exp(-i / 9));
    const spread = 0.5 * (1 - t * 0.85);
    const score = Math.max(0.06, Math.min(0.94, mean + (noise(i, seed) - 0.5) * spread));
    // Rounded so server and client render identical attributes.
    const x = Math.round((X0 + 8 + (X1 - X0 - 16) * t) * 10) / 10;
    const y = Math.round((Y0 - score * (Y0 - Y1)) * 10) / 10;
    pts.push([x, y]);
    best = Math.max(best, score);
    bestPts.push([x, Math.round((Y0 - best * (Y0 - Y1)) * 10) / 10]);
  }
  const d = bestPts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x} ${y}`).join(" ");
  return { pts, d, best };
}

const MODELS = [
  { name: "XGBoost", seed: 1, ceiling: 0.84 },
  { name: "LightGBM", seed: 2, ceiling: 0.79 },
  { name: "Stacked", seed: 3, ceiling: 0.81 },
].map((m) => ({ ...m, ...series(m.seed, m.ceiling) }));

function Trial({ p, x, y, i, bright }: { p: P; x: number; y: number; i: number; bright: string }) {
  const [a, b] = window_(0.16, 0.7, i, TRIALS, 0.12);
  const r = useSeg(p, a, b, 0, 2.6);
  const opacity = useSeg(p, a, b, 0, 0.9);
  return <motion.circle cx={x} cy={y} r={r} fill={bright} style={{ opacity }} />;
}

export function BenchmarkScene({ p, bright }: SceneProps) {
  const [xgb, lgbm, stacked] = MODELS;
  const bestY = Y0 - xgb.best * (Y0 - Y1);
  const tones = [bright, dim(0.55), dim(0.3)];

  return (
    <svg viewBox="0 0 400 260" className="h-full w-full" preserveAspectRatio="xMidYMid meet" aria-hidden>
      {/* axes */}
      <Draw p={p} d={`M${X0} ${Y1} L${X0} ${Y0} L${X1} ${Y0}`} start={0.02} end={0.16} stroke={dim(0.3)} width={1} />
      <Label x={X0 - 6} y={Y1 + 4} anchor="end">F1</Label>
      <Label x={X1} y={Y0 + 14} anchor="end">Optuna trials →</Label>
      {[0.25, 0.5, 0.75].map((f) => (
        <line key={f} x1={X0} x2={X1} y1={Y0 - f * (Y0 - Y1)} y2={Y0 - f * (Y0 - Y1)} stroke={dim(0.07)} />
      ))}

      {/* running best for each model */}
      <Draw p={p} d={stacked.d} start={0.22} end={0.74} stroke={tones[2]} width={1.5} />
      <Draw p={p} d={lgbm.d} start={0.19} end={0.72} stroke={tones[1]} width={1.5} />
      <Draw p={p} d={xgb.d} start={0.16} end={0.7} stroke={tones[0]} width={2} />

      {/* individual trials of the lead model, scattering wide then converging */}
      {xgb.pts.map(([x, y], i) => (
        <Trial key={i} p={p} x={x} y={y} i={i} bright={bright} />
      ))}

      {/* best trial */}
      <Fade p={p} start={0.74} end={0.84}>
        <line x1={X0} x2={X1} y1={bestY} y2={bestY} stroke={bright} strokeOpacity={0.5} strokeDasharray="3 5" />
        <Label x={X1} y={bestY - 6} anchor="end" color={bright}>best trial · TPE</Label>
      </Fade>

      {/* legend */}
      {MODELS.map((m, i) => {
        const x = X0 + i * 96;
        return (
          <Fade key={m.name} p={p} start={0.8 + i * 0.05} end={0.88 + i * 0.05}>
            <line x1={x} x2={x + 14} y1={236} y2={236} stroke={tones[i]} strokeWidth={2} strokeLinecap="round" />
            <Label x={x + 20} y={239} color={dim(0.6)}>{m.name}</Label>
          </Fade>
        );
      })}
    </svg>
  );
}

/* ---------- 04 CityLab: interview notes → affinity clusters → the rebuilt layout ---------- */

const NOTE_W = 26;
const NOTE_H = 16;
const THEMES = ["Navigation", "Collaboration", "Workflow"];
// Where each interview note lands on the wall before it gets sorted.
const SCATTER: [number, number][] = [
  [58, 66], [318, 58], [176, 196], [242, 92], [96, 178], [352, 158],
  [136, 112], [284, 202], [206, 48], [44, 132], [330, 108], [162, 158],
];
const CLUSTER_X = [80, 200, 320];
// Browser-window wireframe of the new site.
const FRAME = { x: 30, y: 40, w: 340, h: 180 };
const NAV = { x: 44, y: 78, w: 58, h: 128 };
const NAV_ROWS = [96, 116, 136, 156];
const CARD_X = [118, 202, 286];
const CARD = { y: 78, w: 76, h: 128 };
const TARGET_CARD = 2;

function Note({ p, i, bright }: { p: P; i: number; bright: string }) {
  const theme = i % 3;
  const slot = Math.floor(i / 3);
  const [sx, sy] = SCATTER[i];
  const cx = CLUSTER_X[theme];
  const cy = 100 + slot * 28;
  const fx = CARD_X[theme] + CARD.w / 2;
  const fy = CARD.y + CARD.h / 2;
  const [a0, a1] = window_(0.02, 0.26, i, SCATTER.length, 0.3);
  const [b0, b1] = window_(0.28, 0.5, theme * 4 + slot, 12, 0.6);
  const [c0, c1] = window_(0.62, 0.78, theme * 4 + slot, 12, 0.6);
  const x = useTransform(p, [b0, b1, c0, c1], [sx, cx, cx, fx].map((v) => v - NOTE_W / 2));
  const y = useTransform(p, [b0, b1, c0, c1], [sy, cy, cy, fy].map((v) => v - NOTE_H / 2));
  const opacity = useTransform(p, [a0, a1, c1 - 0.03, c1], [0, 1, 1, 0]);
  return (
    <motion.g style={{ opacity }}>
      <motion.rect x={x} y={y} width={NOTE_W} height={NOTE_H} rx={3} fill={bright} fillOpacity={0.16} stroke={bright} strokeOpacity={0.55} />
      <motion.line x1={useTransform(x, (v) => v + 5)} x2={useTransform(x, (v) => v + 19)} y1={useTransform(y, (v) => v + 6)} y2={useTransform(y, (v) => v + 6)} stroke={dim(0.5)} strokeWidth={1.5} strokeLinecap="round" />
      <motion.line x1={useTransform(x, (v) => v + 5)} x2={useTransform(x, (v) => v + 13)} y1={useTransform(y, (v) => v + 11)} y2={useTransform(y, (v) => v + 11)} stroke={dim(0.3)} strokeWidth={1.5} strokeLinecap="round" />
    </motion.g>
  );
}

export function CityLabScene({ p, bright }: SceneProps) {
  const frameD = `M${FRAME.x + 8} ${FRAME.y} h${FRAME.w - 16} a8 8 0 0 1 8 8 v${FRAME.h - 16} a8 8 0 0 1 -8 8 h-${FRAME.w - 16} a8 8 0 0 1 -8 -8 v-${FRAME.h - 16} a8 8 0 0 1 8 -8z`;
  const routeD = `M${NAV.x + NAV.w - 6} ${NAV_ROWS[1]} H${NAV.x + NAV.w + 8} V${CARD.y + CARD.h / 2} H${CARD_X[TARGET_CARD]}`;

  return (
    <svg viewBox="0 0 400 260" className="h-full w-full" preserveAspectRatio="xMidYMid meet" aria-hidden>
      {/* research: notes go up on the wall, then get sorted into themes */}
      {THEMES.map((t, i) => (
        <Fade key={t} p={p} start={0.44 + i * 0.03} end={0.52 + i * 0.03}>
          <Fade p={p} start={0.6} end={0.66} from={1} to={0}>
            <Label x={CLUSTER_X[i]} y={80} anchor="middle" color={dim(0.6)}>{t}</Label>
            <line x1={CLUSTER_X[i] - 22} x2={CLUSTER_X[i] + 22} y1={86} y2={86} stroke={dim(0.2)} />
          </Fade>
        </Fade>
      ))}
      <Fade p={p} start={0.04} end={0.12}>
        <Fade p={p} start={0.58} end={0.64} from={1} to={0}>
          <Label x={200} y={236} anchor="middle">15+ interviews · surveys · workflow analyses</Label>
        </Fade>
      </Fade>

      {/* design: the wireframe draws itself around the themes */}
      <Draw p={p} d={frameD} start={0.58} end={0.72} stroke={dim(0.35)} width={1.2} />
      <Draw p={p} d={`M${FRAME.x} ${FRAME.y + 24} H${FRAME.x + FRAME.w}`} start={0.66} end={0.72} stroke={dim(0.2)} width={1} />
      <Fade p={p} start={0.7} end={0.76}>
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={FRAME.x + 12 + i * 8} cy={FRAME.y + 12} r={2} fill={dim(0.3)} />
        ))}
        <rect x={NAV.x} y={NAV.y} width={NAV.w} height={NAV.h} rx={4} fill={dim(0.05)} stroke={dim(0.22)} />
        {NAV_ROWS.map((y, i) => (
          <line key={y} x1={NAV.x + 8} x2={NAV.x + 8 + (i === 1 ? 34 : 24)} y1={y} y2={y} stroke={dim(i === 1 ? 0.5 : 0.28)} strokeWidth={2} strokeLinecap="round" />
        ))}
      </Fade>
      {CARD_X.map((x, i) => (
        <Fade key={x} p={p} start={0.74 + i * 0.02} end={0.82 + i * 0.02}>
          <rect x={x} y={CARD.y} width={CARD.w} height={CARD.h} rx={5} fill={dim(0.06)} stroke={dim(0.22)} />
          <Label x={x + 8} y={CARD.y + 18} size={8} color={dim(0.7)}>{THEMES[i]}</Label>
          {[0, 1, 2].map((k) => (
            <line key={k} x1={x + 8} x2={x + 8 + [52, 40, 46][k]} y1={CARD.y + 34 + k * 12} y2={CARD.y + 34 + k * 12} stroke={dim(0.2)} strokeWidth={2} strokeLinecap="round" />
          ))}
        </Fade>
      ))}

      {SCATTER.map((_, i) => (
        <Note key={i} p={p} i={i} bright={bright} />
      ))}

      {/* outcome: the path a staff member takes now */}
      <Draw p={p} d={routeD} start={0.86} end={0.96} stroke={bright} width={2} />
      <Fade p={p} start={0.92} end={0.98}>
        <rect x={CARD_X[TARGET_CARD]} y={CARD.y} width={CARD.w} height={CARD.h} rx={5} fill={bright} fillOpacity={0.1} stroke={bright} strokeWidth={1.5} />
        <line x1={NAV.x + 8} x2={NAV.x + 42} y1={NAV_ROWS[1]} y2={NAV_ROWS[1]} stroke={bright} strokeWidth={2} strokeLinecap="round" />
        <Label x={FRAME.x + FRAME.w} y={FRAME.y + FRAME.h + 18} anchor="end" color={bright}>30% faster navigation · 30+ staff</Label>
      </Fade>
    </svg>
  );
}

export const SCENES = [NexDermScene, RagScene, BenchmarkScene, CityLabScene];
