// Hero — the signature moment.
// Hero — the signature moment.
const { useState: useStateH } = React;

// Shared waitlist count. Base number + small drift so the number feels alive
// without being dishonest (pinned to starting baseline).
const WAITLIST_BASE = 327;
const WAITLIST_CAP = 500;

function useWaitlistCount() {
  const [n, setN] = React.useState(WAITLIST_BASE);
  React.useEffect(() => {
    // Simulate organic +1 every ~45–90s — subtle, not flashy.
    let cancelled = false;
    const tick = () => {
      if (cancelled) return;
      setN((prev) => Math.min(prev + 1, WAITLIST_CAP - 5));
      const next = 45000 + Math.random() * 45000;
      window.setTimeout(tick, next);
    };
    const init = window.setTimeout(tick, 12000 + Math.random() * 8000);
    return () => {cancelled = true;window.clearTimeout(init);};
  }, []);
  return n;
}

function WaitlistCounter({ size = "md" }) {
  const n = useWaitlistCount();
  const pct = Math.min(100, Math.round(n / WAITLIST_CAP * 100));
  const remaining = Math.max(0, WAITLIST_CAP - n);
  const cls = size === "sm" ?
  { num: "text-[22px]", lbl: "text-[12px]", w: "w-[260px]" } :
  { num: "text-[28px]", lbl: "text-[12.5px]", w: "w-[300px]" };

  return (
    <div className={`inline-flex flex-col items-start gap-2 ${cls.w} max-w-full`}>
      <div className="flex items-baseline gap-2.5">
        <span className={`font-serif ${cls.num} text-ink tabular-nums`} style={{ fontVariationSettings: '"opsz" 144, "SOFT" 50' }}>
          {n.toLocaleString("ro-RO")}
        </span>
        <span className={`${cls.lbl} text-muted`}>
          din <span className="text-ink tabular-nums">{WAITLIST_CAP}</span> de locuri cu 50% reducere pe viață
        </span>
      </div>
      <div className="h-[5px] w-full rounded-full overflow-hidden" style={{ background: "#EFE7D6" }}>
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${pct}%`,
            background: "linear-gradient(90deg, #FF7A6B 0%, #FF5B4A 100%)",
            boxShadow: "0 0 0 1px rgba(255,91,74,0.2)"
          }}>
        </div>
      </div>
      <div className="flex items-center gap-2 text-[12px] text-muted">
        <span className="inline-flex items-center gap-1.5">
          <span className="relative inline-block h-1.5 w-1.5">
            <span className="absolute inset-0 rounded-full" style={{ background: "#FF5B4A" }}></span>
            <span className="absolute inset-0 rounded-full animate-ping" style={{ background: "#FF5B4A", opacity: 0.55 }}></span>
          </span>
          înscrieri în timp real
        </span>
        <span className="divider-dot"></span>
        <span>{remaining} locuri rămase</span>
      </div>
    </div>);

}

function EmailForm({ id = "hero", placeholder = "numele@email.ro", cta = "Vreau acces prioritar" }) {
  const [email, setEmail] = useStateH("");
  const [state, setState] = useStateH("idle"); // idle | sending | ok | error
  const [error, setError] = useStateH("");

  const onSubmit = (e) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError("Te rog verifică adresa de email.");
      setState("error");
      return;
    }
    setError("");
    setState("sending");
    // Simulate submit
    console.log("[waitlist] submit", { id, email: trimmed });
    setTimeout(() => setState("ok"), 700);
  };

  if (state === "ok") {
    return (
      <div className="flex items-start gap-3 rounded-2xl border border-line bg-white px-5 py-4 soft-card">
        <div
          className="check-pop flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white"
          style={{ background: "#FF5B4A" }}
          aria-hidden="true">
          
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <div>
          <div className="font-serif text-[20px] leading-tight text-ink">Ești pe listă.</div>
          <p className="text-[15px] text-muted mt-1">
            Îți scriem când deschidem accesul. Între timp, respiră — nu-ți trimitem nimic altceva.
          </p>
        </div>
      </div>);

  }

  return (
    <form onSubmit={onSubmit} className="w-full" noValidate>
      <div className="email-row flex flex-col sm:flex-row gap-2 sm:gap-2 rounded-2xl transition-shadow">
        <label htmlFor={`email-${id}`} className="sr-only">Adresă de email</label>
        <input
          id={`email-${id}`}
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          placeholder={placeholder}
          value={email}
          onChange={(e) => {setEmail(e.target.value);if (state === "error") setState("idle");}}
          className="input-warm flex-1 rounded-2xl px-5 py-4 text-[17px] text-ink placeholder:text-[#9E978A]"
          aria-invalid={state === "error"}
          aria-describedby={state === "error" ? `err-${id}` : undefined} />
        
        <button
          type="submit"
          disabled={state === "sending"}
          className="btn-coral rounded-2xl px-6 py-4 text-[16px] font-medium tracking-tight whitespace-nowrap disabled:opacity-75">
          
          {state === "sending" ? "Se trimite…" : cta}
        </button>
      </div>
      {state === "error" &&
      <p id={`err-${id}`} className="mt-2 pl-2 text-[14px]" style={{ color: "#C7392A" }}>
          {error}
        </p>
      }
    </form>);

}

function Hero() {
  const scrollY = useScrollY ? useScrollY() : 0;
  const reduced = useReducedMotion ? useReducedMotion() : false;
  const parY = reduced ? 0 : Math.min(scrollY, 800) * 0.15;
  return (
    <section className="relative isolate grain" style={{ minHeight: "100vh" }}>
      {/* Emoji parallax backdrop — blends behind text, no safe zone */}
      <div className="absolute inset-0 overflow-hidden">
        <EmojiField seed={7} dense={true} opacityScale={0.9} />
      </div>
      {/* Soft radial vignette keeps text legible while emojis drift beneath */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
          "radial-gradient(ellipse 55% 50% at 50% 55%, rgba(251,248,243,0.7) 0%, rgba(251,248,243,0.25) 50%, rgba(251,248,243,0) 80%)"
        }}
        aria-hidden="true" />
      

      {/* Top nav */}
      <header className="relative z-20 max-w-[1280px] mx-auto px-6 sm:px-10 pt-7 flex items-center justify-between">
        <a href="#" className="group" aria-label="Educatia.AI acasă">
          <span className="font-serif text-[20px] sm:text-[42px] tracking-tight text-ink" style={{ letterSpacing: "-0.02em", fontFamily: "Fraunces", fontSize: "3px" }}>
            Educatia<span style={{ color: "#FF5B4A" }}>.</span>AI
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-[14.5px] text-muted">
          <a href="#cum-functioneaza" className="link-underline hover:text-ink">Cum funcționează</a>
          <a href="#varste" className="link-underline hover:text-ink">Vârste</a>
        </nav>
        <a
          href="#final-cta"
          className="hidden md:inline-flex items-center gap-1.5 rounded-full border border-line bg-white/70 backdrop-blur px-4 py-2 text-[14px] text-ink hover:bg-white transition">
          
          Ne vedem pe 25 iunie
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
        </a>
      </header>

      {/* Hero content — safe zone */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 sm:px-10 pt-20 sm:pt-28 md:pt-32 pb-28">
        <div
          className="max-w-[900px] mx-auto text-center"
          style={{ transform: `translate3d(0, ${parY * 0.4}px, 0)` }}>
          
          <div className="inline-flex items-center gap-2 rounded-full border border-line bg-white/70 backdrop-blur px-3.5 py-1.5">
            <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: "#FF5B4A" }}></span>
            <span className="eyebrow" style={{ color: "#3D3A34" }}>În curând · 2026</span>
          </div>

          <h1 className="headline mt-8 text-[42px] sm:text-[56px] md:text-[68px] lg:text-[76px] text-ink" style={{ letterSpacing: "-0.032em", lineHeight: "1.02" }}>
            <span className="block">Copiii de azi</span>
            <span className="block italic text-ink/80" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 80', lineHeight: "1.05" }}>
              vor construi lumea de mâine.
            </span>
            <span className="block mt-4 sm:mt-5 text-[30px] sm:text-[38px] md:text-[46px] lg:text-[52px] text-muted" style={{ letterSpacing: "-0.025em", lineHeight: "1.1", color: "black" }}>
              Merită <span className="text-ink">unelte pe măsură</span>.
            </span>
          </h1>

          <p className="mt-7 mx-auto max-w-[680px] text-[19px] sm:text-[21px] leading-[1.55] text-muted">
            Pentru copii 6–12 ani. <span className="text-ink">20 de minute pe zi</span> de
            învățare bazată pe emoji. Lumea se schimbă — ne adaptăm.
            <span className="text-ink"> Și pentru copiii noștri.</span>
          </p>

          <div className="mt-14 sm:mt-16 mx-auto">
            <Countdown />
            <p className="mt-10 sm:mt-12 text-center font-serif text-[19px] sm:text-[22px] text-ink" style={{ letterSpacing: "-0.01em", fontSize: "3px", fontWeight: "500", fontFamily: "ui-sans-serif", color: "orange" }}>
              Educatia<span style={{ color: "#FF5B4A" }}>.</span>AI se lansează pe
              <span className="italic"> 25 iunie 2026</span>.
            </p>
            <p className="mt-4 mx-auto max-w-[560px] text-center text-[15.5px] sm:text-[16px] leading-[1.65] text-muted">
              Prima lună va fi gratuită pentru toți copiii care se alătură în prima săptămână.
              Apoi, abonament lunar <span className="text-ink">cât o pizza</span>.
            </p>
          </div>
        </div>
      </div>

      {/* Soft bottom fade into next section */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32"
        style={{
          background:
          "linear-gradient(180deg, rgba(251,248,243,0) 0%, #FBF8F3 75%)"
        }}
        aria-hidden="true" />
      
      <a
        href="#tensiune"
        className="absolute left-1/2 -translate-x-1/2 bottom-6 z-10 inline-flex flex-col items-center gap-1.5 text-muted hover:text-ink transition"
        aria-label="Derulează în jos">
        
        <span className="eyebrow">Citește mai departe</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="animate-bounce">
          <path d="M12 5v14" /><path d="m19 12-7 7-7-7" />
        </svg>
      </a>
    </section>);

}

Object.assign(window, { Hero, EmailForm, WaitlistCounter, useWaitlistCount });
