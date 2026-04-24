/* global React */
const { useState: _useStateCD, useEffect: _useEffectCD } = React;

// Target: 25 June 2026, 00:00 (Europe/Bucharest)
// We use a fixed epoch relative to UTC+3 (Romanian summer time).
const LAUNCH_ISO = "2026-06-25T00:00:00+03:00";
const LAUNCH_TS = new Date(LAUNCH_ISO).getTime();

function calcRemaining() {
  const now = Date.now();
  const diff = Math.max(0, LAUNCH_TS - now);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds, done: diff === 0 };
}

function pad(n, digits = 2) {
  return String(n).padStart(digits, "0");
}

function CountdownUnit({ value, label, digits = 2 }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className="font-serif text-ink leading-[0.95]"
        style={{
          fontSize: "clamp(44px, 10vw, 112px)",
          fontVariantNumeric: "tabular-nums",
          letterSpacing: "-0.035em",
          fontVariationSettings: '"opsz" 144',
        }}
      >
        {pad(value, digits)}
      </div>
      <div
        className="mt-2 sm:mt-3 font-mono uppercase tracking-[0.18em] text-muted"
        style={{ fontSize: "clamp(10px, 1.1vw, 12px)" }}
      >
        {label}
      </div>
    </div>
  );
}

function Separator() {
  return (
    <div
      className="font-serif text-ink/25 leading-[0.95] pb-7 sm:pb-9"
      style={{
        fontSize: "clamp(32px, 7vw, 80px)",
        letterSpacing: "-0.03em",
      }}
      aria-hidden="true"
    >
      :
    </div>
  );
}

function Countdown() {
  const [t, setT] = _useStateCD(calcRemaining());

  _useEffectCD(() => {
    const id = setInterval(() => setT(calcRemaining()), 1000);
    return () => clearInterval(id);
  }, []);

  if (t.done) {
    return (
      <div className="text-center">
        <div className="font-serif italic text-[32px] sm:text-[44px] text-ink" style={{letterSpacing:"-0.02em"}}>
          Suntem live.
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[780px]">
      <div className="flex items-start justify-center gap-2 sm:gap-5 md:gap-7">
        <CountdownUnit value={t.days} label="Zile" digits={3} />
        <Separator />
        <CountdownUnit value={t.hours} label="Ore" />
        <Separator />
        <CountdownUnit value={t.minutes} label="Minute" />
        <Separator />
        <CountdownUnit value={t.seconds} label="Secunde" />
      </div>
    </div>
  );
}

Object.assign(window, { Countdown });
