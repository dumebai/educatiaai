// Tension, mechanism, emoji-reasoning, age groups, overheard, for/not-for sections.

// Wraps children in a scroll-driven parallax transform.
// speed > 0 = moves slower than scroll (drifts up); < 0 = moves faster.
function ParallaxY({ children, speed = 0.08, className = "", style = {} }) {
  const ref = useRef(null);
  const [ty, setTy] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const update = () => {
      if (!ref.current) {raf = requestAnimationFrame(update);return;}
      const r = ref.current.getBoundingClientRect();
      const vh = window.innerHeight;
      // progress: -1 when section just above viewport, 0 when centered, 1 when just below
      const center = r.top + r.height / 2;
      const progress = (center - vh / 2) / vh;
      setTy(-progress * speed * 100);
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [speed, reduced]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ ...style, transform: `translate3d(0, ${ty}px, 0)`, willChange: "transform" }}>
      
      {children}
    </div>);

}

function Tension() {
  return (
    <section id="tensiune" className="relative py-32 md:py-44">
      <ParallaxY speed={0.12}>
      <div className="max-w-[1100px] mx-auto px-6 sm:px-10 text-center">
        <div className="flex items-center justify-center gap-3 mb-10">
          <span className="h-px w-10 bg-line"></span>
          <span className="eyebrow">O pauză sinceră</span>
          <span className="h-px w-10 bg-line"></span>
        </div>

        <p className="headline text-[32px] sm:text-[42px] md:text-[52px] lg:text-[58px] text-ink max-w-[24ch] mx-auto" style={{ textWrap: "balance" }}>
          În ziua de azi, atenția copilului tău e <span className="italic" style={{ color: "#B44A3C" }}>cea mai căutată resursă</span> de pe internet. Sute de companii investesc miliarde ca să o obțină.
        </p>

        <p className="mt-10 font-serif italic text-[22px] sm:text-[26px] text-muted max-w-[38ch] mx-auto">
          Noi o cerem 20 de minute pe zi. Și o dăm înapoi cu dobândă, peste ani.
        </p>
      </div>
      </ParallaxY>
    </section>);

}

function Mechanism() {
  const steps = [
  {
    num: "01",
    emoji: "🧭",
    title: "Alege grupa de vârstă",
    body: "6–9 ani sau 9–12 ani. Curriculum adaptat pentru fiecare etapă de dezvoltare."
  },
  {
    num: "02",
    emoji: "🎯",
    title: "Ghidat după ritmul lui",
    body: "După primele 3 lecții, platforma ajustează dificultatea și subiectele după ritmul copilului tău."
  },
  {
    num: "03",
    emoji: "🌱",
    title: "20 de minute pe zi",
    body: "Suficient pentru progres real. Prea puțin ca să devină obsesie cu ecranul."
  }];


  return (
    <section id="cum-functioneaza" className="relative py-24 md:py-32 border-t border-line">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <div className="eyebrow mb-4">Cum funcționează</div>
            <h2 className="headline text-[36px] sm:text-[46px] md:text-[54px] text-ink max-w-[16ch]">
              Trei pași.
              <span className="italic text-muted"> Nici unul complicat.</span>
            </h2>
          </div>
          <p className="text-[17px] text-muted md:max-w-[340px]">Am construit-o în așa fel încât să o poată porni și bunica. Tu deschizi platforma. 
AI-ul face restul.

          </p>
        </div>

        <ol className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((s, i) =>
          <li key={s.num} className="soft-card-warm rounded-[28px] p-8 flex flex-col">
              <div className="flex items-start justify-between">
                <div
                className="text-[72px] leading-none"
                style={{ filter: "drop-shadow(0 8px 14px rgba(27,26,23,0.08))" }}
                aria-hidden="true">
                
                  {s.emoji}
                </div>
                <span className="font-serif italic text-[22px] text-muted/70">{s.num}</span>
              </div>
              <h3 className="font-serif text-[26px] mt-8 text-ink leading-tight" style={{ letterSpacing: "-0.02em" }}>
                {s.title}
              </h3>
              <p className="mt-3 text-[16.5px] text-muted leading-[1.65]">{s.body}</p>
              {i < steps.length - 1 &&
            <div className="hidden md:flex items-center gap-1.5 mt-6 text-muted/60">
                  <div className="h-px w-8 bg-line"></div>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6" /></svg>
                </div>
            }
            </li>
          )}
        </ol>
      </div>
    </section>);

}

function WhyEmoji() {
  const rows = [
  {
    emoji: "🦖",
    title: "Imagini înainte de cuvinte",
    body: "Copiii înțeleg imagini înainte să citească fluent. Un 🦖 spune mai mult decât cuvântul „dinozaur” la 7 ani."
  },
  {
    emoji: "🌍",
    title: "Un limbaj universal",
    body: "Funcționează pentru copilul bilingv, pentru cel cu dislexie, pentru cel care încă învață să scrie."
  },
  {
    emoji: "🧪",
    title: "Jucăuș la suprafață, serios sub",
    body: "Fiecare emoji ancorează un concept — matematică, știință, literatură, logică. Joacă, pe structura unui curriculum."
  }];


  return (
    <section className="relative py-24 md:py-36 border-t border-line">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-10 grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-24">
            <div className="eyebrow mb-4">De ce emoji?</div>
            <h2 className="headline text-[36px] sm:text-[46px] md:text-[54px] text-ink">
              De ce <span className="italic">funcționează</span><br />
              emoji-urile?
            </h2>
            <p className="mt-6 text-[18px] text-muted max-w-[42ch] leading-[1.7]">
              Pare un truc. Nu e. E cel mai vechi sistem de scriere din lume —
              hieroglife, ideograme — doar că l-am uitat.
            </p>

            {/* The "visual" right side — abstracted collage */}
            <div className="mt-10 relative hidden lg:block">
              <div className="soft-card rounded-[24px] p-8 relative overflow-hidden" style={{ background: "#FDFBF6" }}>
                <div className="grid grid-cols-4 gap-3 text-[44px] leading-none">
                  {['🦖', '📔', '🥚', '🌿', '🎨', '✨', '🎼', '🎵', '🔢', '➕', '🏺', '📚'].map((e, i) =>
                  <div key={i} className="aspect-square flex items-center justify-center rounded-xl" style={{ background: "#FBF8F3", border: "1px solid #EFE7D6" }}>
                      <span>{e}</span>
                    </div>
                  )}
                </div>
                <p className="mt-5 font-mono text-[11px] tracking-wider uppercase text-muted/80">
                  Fragment dintr-o lecție · grupa 6–9 ani
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-8 md:space-y-12">
          {rows.map((r, i) =>
          <div key={i} className="soft-card rounded-[24px] p-8 md:p-10 flex gap-6 md:gap-8">
              <div className="text-[64px] md:text-[80px] leading-none shrink-0" aria-hidden="true">{r.emoji}</div>
              <div>
                <h3 className="font-serif text-[24px] md:text-[28px] leading-tight text-ink" style={{ letterSpacing: "-0.02em" }}>
                  {r.title}
                </h3>
                <p className="mt-3 text-[17px] md:text-[18px] text-muted leading-[1.7] max-w-[52ch]">
                  {r.body}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

}

function AgeGroups() {
  const groups = [
  {
    label: "Grupa mică",
    age: "6–9 ani",
    emojis: ["🎨", "🧩", "🔢", "📚"],
    body: "Alfabetizare vizuală, matematică de bază, explorarea lumii.",
    detail: "Sesiuni de 15–20 minute. Fără citit lung. Fără presiune de performanță.",
    accent: "#FFB8A8"
  },
  {
    label: "Grupa mare",
    age: "9–12 ani",
    emojis: ["🔬", "🌍", "💡", "🚀"],
    body: "Gândire critică, proiecte mici, curiozitate științifică.",
    detail: "Sesiuni de 25–30 minute. Întrebări deschise. Primele conexiuni între materii.",
    accent: "#C7D1FF"
  }];


  return (
    <section id="varste" className="relative py-24 md:py-32 border-t border-line">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-10">
        <div className="text-center mb-14 md:mb-20">
          <div className="eyebrow mb-4">Două grupe de vârstă</div>
          <h2 className="headline text-[36px] sm:text-[46px] md:text-[56px] text-ink max-w-[22ch] mx-auto">
            Un copil de 7 ani nu învață ca unul de 11.
            <span className="italic text-muted"> Nici platforma noastră nu-i tratează la fel.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {groups.map((g, i) =>
          <article key={i} className="soft-card rounded-[28px] p-8 md:p-10 relative overflow-hidden group">
              {/* Emoji cluster */}
              <div
              className="absolute -top-4 -right-4 w-40 h-40 rounded-full blur-2xl opacity-60"
              style={{ background: g.accent }}
              aria-hidden="true">
            </div>
              <div className="relative">
                <div className="eyebrow" style={{ color: "#B44A3C" }}>{g.label}</div>
                <div className="mt-3 flex items-baseline gap-3">
                  <h3 className="headline text-[52px] md:text-[64px] text-ink leading-none">{g.age}</h3>
                </div>
                <div className="mt-6 flex items-center gap-2 text-[44px]" aria-hidden="true">
                  {g.emojis.map((e, j) =>
                <span
                  key={j}
                  className="transition-transform group-hover:-translate-y-0.5"
                  style={{ transitionDelay: `${j * 40}ms` }}>
                  
                      {e}
                    </span>
                )}
                </div>
                <p className="mt-7 text-[18px] text-ink leading-[1.55] max-w-[38ch]">{g.body}</p>
                <p className="mt-3 text-[15.5px] text-muted leading-[1.7] max-w-[42ch]">{g.detail}</p>

                <div className="mt-8 flex items-center gap-2 pt-6 border-t border-line">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-muted">
                    Curriculum:
                  </span>
                  <span className="text-[14px] text-ink/80">
                    {i === 0 ? "Română · Matematică · Lumea din jur" : "Inteligență emoțională si financiară · Logică · Creativitate"}
                  </span>
                </div>
              </div>
            </article>
          )}
        </div>
      </div>
    </section>);

}

function FounderNote() {
  return (
    <section className="relative py-28 md:py-40 border-t border-line overflow-hidden">
      <div className="max-w-[820px] mx-auto px-6 sm:px-10">
        <div className="flex items-center gap-3 mb-12">
          <span className="h-px w-10 bg-line"></span>
          <span className="eyebrow">De ce construim asta</span>
        </div>

        <div className="space-y-7 text-[19px] leading-[1.75] text-ink/90" style={{ textWrap: "pretty" }}>
          <p className="font-serif italic text-[28px] md:text-[36px] leading-[1.22] text-ink" style={{ letterSpacing: "-0.022em" }}>
            Construim Educatia.AI pentru că nu am găsit-o deja construită — și copiii noștri
            nu pot aștepta.
          </p>

          <p>
            Vedem același lucru de la locurile noastre de muncă: lumea în care va trăi copilul
            tău la 25 de ani nu seamănă cu asta. Nu pentru că e mai bună sau mai rea.
            Pentru că mașinile cu care vorbești deja azi vor fi la nivelul unei echipe
            întregi peste 10 ani.
          </p>

          <p>
            <span className="text-ink font-medium">Nu ne sperie. Ne responsabilizează.</span>
          </p>

          <p>
            Dacă tu, părintele care citește asta, simți cumva că școala nu e tot ce trebuie,
            că timpul petrecut cu tableta nu construiește nimic, că ai vrea să-i dai copilului
            ceva mai bun dar nu știi exact ce — ai dreptate. Intuiția ta e corectă.
          </p>

          <p>
            Construim ca să-ți dăm o opțiune. Nu o soluție perfectă.
            <span style={{ color: "#B44A3C" }}> O opțiune.</span> 20 de minute pe zi, făcute
            cu grijă, construite pentru lumea care vine — nu pentru lumea care a fost.
          </p>

          <p className="font-serif italic text-[21px] text-muted pt-4 border-t border-line">
            Dacă peste 20 de ani copilul tău se uită înapoi și îți spune „mulțumesc că ai
            fost atent” — și noi am contribuit puțin la asta — înseamnă că am făcut ce
            trebuie.
          </p>

          <div className="pt-2">
            <a href="mailto:salut@educatia.ai" className="text-[14px] text-muted link-underline">
              salut@educatia.ai
            </a>
          </div>
        </div>
      </div>
    </section>);

}

// Emotional interlude — imagine your child at 25.
function WhatChanges() {
  return (
    <section className="relative py-32 md:py-44 border-t border-line overflow-hidden">
      <div className="max-w-[820px] mx-auto px-6 sm:px-10">
        <div className="flex items-center gap-3 mb-14 justify-center">
          <span className="h-px w-10 bg-line"></span>
          <span className="eyebrow">Ce se schimbă</span>
          <span className="h-px w-10 bg-line"></span>
        </div>

        <div className="space-y-8 text-[20px] sm:text-[22px] leading-[1.7] text-ink/90" style={{ textWrap: "pretty" }}>
          <p className="font-serif italic text-[28px] sm:text-[36px] md:text-[42px] leading-[1.2] text-ink" style={{ letterSpacing: "-0.022em" }}>
            Încearcă ceva pentru un minut.
          </p>

          <p>
            Închide ochii și gândește-te la copilul tău la 25 de ani.
          </p>

          <p>
            Unde trăiește? Ce face dimineața când se trezește? Cu cine vorbește prima
            dată — un om, o mașină, amândoi? Ce meserie are?
            <span style={{ color: "#B44A3C" }}> Există meseria aia astăzi?</span>
          </p>

          <p className="font-serif italic text-[26px] sm:text-[30px] text-muted pl-6 border-l-2" style={{ borderColor: "#E8E0D1" }}>
            Nu știi. Nici noi.
          </p>

          <p>
            Dar știm ceva: peste 20 de ani, copilul tău nu va fi judecat după ce a
            memorat la școală. Va fi judecat după cum gândește, cum întreabă, cum
            înțelege o lume în care mașinile scriu, desenează, răspund, decid.
          </p>

          <p>
            Părinții noștri ne-au pregătit pentru o lume care semăna cu a lor. Nu avem
            cum să facem același lucru pentru copiii noștri — pentru că lumea lor nu
            va semăna cu a noastră.
          </p>

          <p className="text-ink">
            Ce putem face: să-i învățăm cum să se adapteze. Cum să-și pună întrebări
            mai bune decât răspunsurile pe care le primesc. Cum să fie curioși când
            totul e ușor de aflat.
          </p>

          <p>
            Asta nu se predă în 45 de minute de clasă. Se construiește, zi după zi,
            din lucruri mici.
          </p>

          <p className="font-serif italic text-[30px] sm:text-[38px] text-ink pt-4" style={{ letterSpacing: "-0.022em", lineHeight: "1.2" }}>
            20 de minute pe zi, câteva emoji, o întrebare bună.
          </p>

          <p className="font-serif text-[22px] sm:text-[26px] text-ink" style={{ color: "#B44A3C" }}>
            Începe devreme.
          </p>
        </div>
      </div>
    </section>);

}

function ForWhom() {
const yes = [
  "Vor să-și vadă copilul curios și implicat.",
  "Cred că învățarea ar trebui să fie ceva natural, nu forțat.",
  "Își doresc un copil care descoperă, nu doar memorează.",
  "Simt că educația bună începe cu încredere și răbdare."
];

const no = [
  "Caută doar o soluție rapidă ca să-l țină ocupat.",
  "Nu sunt interesați de proces, doar de rezultat.",
  "Nu vor să se implice deloc în experiența copilului."
];


  return (
    <section className="relative py-24 md:py-32 border-t border-line">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-10">
        <div className="max-w-[720px] mb-14">
          <div className="eyebrow mb-4">Sinceritate</div>
          <h2 className="headline text-[36px] sm:text-[46px] md:text-[54px] text-ink" style={{ textWrap: "balance" }}>
            Nu e pentru toată lumea.
            <span className="italic text-muted"> Și e în regulă.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* For */}
          <div className="soft-card-warm rounded-[24px] p-8 md:p-10">
            <div className="flex items-center gap-3 mb-7">
              <span
                className="inline-flex h-8 w-8 items-center justify-center rounded-full text-white text-[14px]"
                style={{ background: "#1B1A17" }}>
                
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              </span>
              <span className="font-serif text-[22px] text-ink">Pentru părinții care…</span>
            </div>
            <ul className="space-y-5">
              {yes.map((t, i) =>
              <li key={i} className="flex gap-4 text-[17px] text-ink/90 leading-[1.65]">
                  <span className="font-mono text-[12px] text-muted mt-1.5 shrink-0">0{i + 1}</span>
                  <span>{t}</span>
                </li>
              )}
            </ul>
          </div>

          {/* Not for */}
          <div className="rounded-[24px] p-8 md:p-10 relative" style={{ background: "#FBF8F3", border: "1px dashed #D8CFBC" }}>
            <div className="flex items-center gap-3 mb-7">
              <span
                className="inline-flex h-8 w-8 items-center justify-center rounded-full"
                style={{ background: "#FFE7E2", color: "#B44A3C" }}>
                
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
              </span>
              <span className="font-serif text-[22px] text-muted">NU e pentru părinții care…</span>
            </div>
            <ul className="space-y-5">
              {no.map((t, i) =>
              <li key={i} className="flex gap-4 text-[17px] text-muted leading-[1.65]">
                  <span className="font-mono text-[12px] text-muted/70 mt-1.5 shrink-0">0{i + 1}</span>
                  <span>{t}</span>
                </li>
              )}
            </ul>
            <p className="mt-8 pt-6 border-t border-dashed border-line text-[14.5px] text-muted italic">
              Preferăm să-ți spunem acum decât să te dezamăgim în luna a doua.
            </p>
          </div>
        </div>
      </div>
    </section>);

}

Object.assign(window, { Tension, Mechanism, WhyEmoji, WhatChanges, AgeGroups, FounderNote, ForWhom });
