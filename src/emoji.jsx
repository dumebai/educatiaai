// Emoji field — 3 parallax layers, continuous float, SCROLL parallax.
// Emojis blend behind text at low opacity (no safe zone avoidance).
// Respects prefers-reduced-motion.

const { useEffect, useRef, useState } = React;

function useReducedMotion() {
  const [r, setR] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const on = () => setR(mq.matches);
    on();
    mq.addEventListener?.('change', on);
    return () => mq.removeEventListener?.('change', on);
  }, []);
  return r;
}

function mulberry32(seed) {
  return function () {
    let t = (seed += 0x6D2B79F5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Generate emoji layout — free placement, no safe zone.
function generateField({ count, sizeRange, opacityRange, layerZ, seed, excludeEmojis = [] }) {
  const rand = mulberry32(seed);
  const allEmojis = [
    '🎨','📚','🚀','🧮','🔬','🎭','🌍','⭐','🎯','🧩',
    '💡','🦋','🌈','📐','🎵','🏆','✏️','🔢','🎲','🪐',
    '🦖','🔭','🎼','🗺️','🧪','🎪','💫'
  ];
  // Filter excluded, then shuffle deterministically.
  const pool = allEmojis.filter(e => !excludeEmojis.includes(e)).slice();
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  const out = [];
  let pi = 0;
  let tries = 0;
  while (out.length < count && tries < count * 60) {
    tries++;
    // Pick next emoji from pool, cycling if we run out.
    const emoji = pool[pi % pool.length];
    const size = sizeRange[0] + rand() * (sizeRange[1] - sizeRange[0]);
    const x = 3 + rand() * 94;
    const y = 3 + rand() * 94;
    // Reject if any existing emoji is close AND same
    let tooCloseSame = false;
    for (const o of out) {
      if (o.emoji === emoji) {
        const dx = o.x - x, dy = o.y - y;
        if (Math.hypot(dx, dy) < 28) { tooCloseSame = true; break; }
      }
    }
    if (tooCloseSame) { pi++; continue; }
    const opacity = opacityRange[0] + rand() * (opacityRange[1] - opacityRange[0]);
    const rot = (rand() - 0.5) * 10;
    const dur = 4 + rand() * 4;
    const delay = -rand() * dur;
    out.push({
      key: `${seed}-${out.length}`,
      emoji,
      x, y, size, opacity, rot, dur, delay,
      z: layerZ,
      wink: rand() < 0.06,
      winkDelay: rand() * 10,
    });
    pi++;
  }
  return out;
}

// Global scroll tracker hook — one rAF loop shared across all fields.
const scrollListeners = new Set();
let scrollTicking = false;
function tickScroll() {
  scrollTicking = false;
  const y = window.scrollY || window.pageYOffset;
  scrollListeners.forEach((fn) => fn(y));
}
function onScrollGlobal() {
  if (!scrollTicking) {
    scrollTicking = true;
    requestAnimationFrame(tickScroll);
  }
}
if (typeof window !== 'undefined') {
  window.addEventListener('scroll', onScrollGlobal, { passive: true });
  window.addEventListener('resize', onScrollGlobal, { passive: true });
}

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const fn = (yy) => setY(yy);
    scrollListeners.add(fn);
    setY(window.scrollY || 0);
    return () => scrollListeners.delete(fn);
  }, []);
  return y;
}

function EmojiField({ seed = 1, dense = true, opacityScale = 1 }) {
  const containerRef = useRef(null);
  const [containerTop, setContainerTop] = useState(0);
  const scrollY = useScrollY();
  const reduced = useReducedMotion();

  useEffect(() => {
    const measure = () => {
      if (!containerRef.current) return;
      const r = containerRef.current.getBoundingClientRect();
      setContainerTop(r.top + (window.scrollY || 0));
    };
    measure();
    const t = setTimeout(measure, 200);
    window.addEventListener('resize', measure);
    return () => { clearTimeout(t); window.removeEventListener('resize', measure); };
  }, []);

  // Build layers — front first, then middle excludes front, back excludes both,
  // so duplicates are avoided across the whole field.
  const front = React.useMemo(() => generateField({
    count: dense ? 4 : 3,
    sizeRange: [80, 120],
    opacityRange: [0.32 * opacityScale, 0.48 * opacityScale],
    layerZ: 1.0,
    seed: seed * 37,
  }), [seed, dense, opacityScale]);
  const mid = React.useMemo(() => generateField({
    count: dense ? 6 : 5,
    sizeRange: [48, 70],
    opacityRange: [0.24 * opacityScale, 0.36 * opacityScale],
    layerZ: 0.55,
    seed: seed * 23,
    excludeEmojis: front.map(f => f.emoji),
  }), [seed, dense, opacityScale, front]);
  const back = React.useMemo(() => generateField({
    count: dense ? 8 : 6,
    sizeRange: [28, 46],
    opacityRange: [0.16 * opacityScale, 0.28 * opacityScale],
    layerZ: 0.25,
    seed: seed * 11,
    excludeEmojis: [...front.map(f => f.emoji), ...mid.map(m => m.emoji)],
  }), [seed, dense, opacityScale, front, mid]);

  // Parallax: each layer moves at layerZ * speed relative to section top.
  const sectionScroll = reduced ? 0 : scrollY - containerTop;

  const renderLayer = (items) =>
    items.map((it) => {
      const parallaxY = reduced ? 0 : -sectionScroll * it.z * 0.35;
      return (
        <span
          key={it.key}
          className={`emoji-float ${reduced ? '' : 'emoji-bob'} ${it.wink && !reduced ? 'emoji-wink' : ''}`}
          style={{
            left: `${it.x}%`,
            top: `${it.y}%`,
            fontSize: `${it.size}px`,
            opacity: it.opacity,
            transform: `translate3d(-50%, calc(-50% + ${parallaxY}px), 0)`,
            '--rot': `${it.rot}deg`,
            '--dur': `${it.dur}s`,
            '--delay': `${it.delay}s`,
            '--wink-delay': `${it.winkDelay}s`,
          }}
          aria-hidden="true"
        >
          {it.emoji}
        </span>
      );
    });

  return (
    <div ref={containerRef} className="emoji-layer" aria-hidden="true">
      <div className="emoji-layer">{renderLayer(back)}</div>
      <div className="emoji-layer">{renderLayer(mid)}</div>
      <div className="emoji-layer">{renderLayer(front)}</div>
    </div>
  );
}

// PageEmojiField — one giant field that spans the whole page, scroll-parallaxed.
// Rendered once as a fixed background; emojis drift up as user scrolls.
function PageEmojiField({ seed = 42 }) {
  const scrollY = useScrollY();
  const reduced = useReducedMotion();
  const [vh, setVh] = useState(typeof window !== 'undefined' ? window.innerHeight : 800);

  useEffect(() => {
    const r = () => setVh(window.innerHeight);
    r();
    window.addEventListener('resize', r);
    return () => window.removeEventListener('resize', r);
  }, []);

  // Generate a large pool — they sit in a tall virtual canvas; each layer moves at a different rate.
  // The virtual canvas is ~4x viewport height; positions given in vh units.
  const virtualH = 400; // in vh units

  const makePool = (count, sizeRange, opacityRange, z, seedOffset) => {
    const rand = mulberry32(seed + seedOffset);
    const emojis = [
      '🎨','📚','🚀','🧮','🔬','🎭','🌍','⭐','🎯','🧩',
      '💡','🦋','🌈','📐','🎵','🏆','✏️','🔢','🎲','🪐',
      '🦖','🔭','🎼','🗺️','🧪','🎪','💫'
    ];
    const out = [];
    for (let i = 0; i < count; i++) {
      const size = sizeRange[0] + rand() * (sizeRange[1] - sizeRange[0]);
      const x = 2 + rand() * 96; // % of viewport width
      const y = rand() * virtualH; // vh units within virtual canvas
      const opacity = opacityRange[0] + rand() * (opacityRange[1] - opacityRange[0]);
      const rot = (rand() - 0.5) * 10;
      const dur = 5 + rand() * 5;
      const delay = -rand() * dur;
      out.push({
        key: `p-${seedOffset}-${i}`,
        emoji: emojis[Math.floor(rand() * emojis.length)],
        x, y, size, opacity, rot, dur, delay, z,
        wink: rand() < 0.04,
        winkDelay: rand() * 12,
      });
    }
    return out;
  };

  const back = React.useMemo(() => makePool(70, [24, 42], [0.12, 0.22], 0.2, 1), [seed]);
  const mid = React.useMemo(() => makePool(45, [44, 68], [0.16, 0.28], 0.5, 2), [seed]);
  const front = React.useMemo(() => makePool(24, [76, 118], [0.18, 0.32], 0.9, 3), [seed]);

  const renderLayer = (items) =>
    items.map((it) => {
      // parallax: scroll-driven translate. Back moves slowest, front fastest.
      const drift = reduced ? 0 : -scrollY * it.z;
      return (
        <span
          key={it.key}
          className={`emoji-float ${reduced ? '' : 'emoji-bob'} ${it.wink && !reduced ? 'emoji-wink' : ''}`}
          style={{
            left: `${it.x}%`,
            top: `${it.y}vh`,
            fontSize: `${it.size}px`,
            opacity: it.opacity,
            transform: `translate3d(-50%, calc(-50% + ${drift}px), 0)`,
            '--rot': `${it.rot}deg`,
            '--dur': `${it.dur}s`,
            '--delay': `${it.delay}s`,
            '--wink-delay': `${it.winkDelay}s`,
          }}
          aria-hidden="true"
        >
          {it.emoji}
        </span>
      );
    });

  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      <div className="absolute inset-0">{renderLayer(back)}</div>
      <div className="absolute inset-0">{renderLayer(mid)}</div>
      <div className="absolute inset-0">{renderLayer(front)}</div>
    </div>
  );
}

Object.assign(window, { EmojiField, PageEmojiField, useReducedMotion, useScrollY });
