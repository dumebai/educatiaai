/* global React */

// (FAQ has been retired — file kept for FinalCTA + Footer only.)

function FinalCTA() {
  return (
    <section id="final-cta" className="relative isolate overflow-hidden py-28 md:py-40 border-t border-line">
      <div className="absolute inset-0">
        <EmojiField seed={19} dense={false} opacityScale={0.75} />
      </div>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 55% at 50% 45%, rgba(251,248,243,0.82) 0%, rgba(251,248,243,0.35) 55%, rgba(251,248,243,0) 82%)",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-24"
        style={{ background: "linear-gradient(180deg, #FBF8F3 0%, rgba(251,248,243,0) 100%)" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
        style={{ background: "linear-gradient(0deg, #FBF8F3 0%, rgba(251,248,243,0) 100%)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[960px] mx-auto px-6 sm:px-10 text-center" data-safe-cta>
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="h-px w-10 bg-line"></span>
          <span className="eyebrow">Închidere</span>
          <span className="h-px w-10 bg-line"></span>
        </div>

        <h2
          className="headline text-[52px] sm:text-[72px] md:text-[96px] lg:text-[108px] text-ink"
          style={{ textWrap: "balance", letterSpacing: "-0.035em", lineHeight: "1.02" }}
        >
          Ne vedem pe{" "}
          <span className="italic" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 80' }}>
            25 mai
          </span>
          <span style={{ color: "#B44A3C" }}>.</span>
        </h2>

        <p className="mt-9 mx-auto max-w-[560px] text-[18px] sm:text-[20px] leading-[1.65] text-muted" style={{textWrap:"pretty"}}>
          Până atunci, construim. Dacă vrei să fii la curent cu ce facem,
          ne găsești pe LinkedIn.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
  
    href="https://linkedin.com/company/educatiaai"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2.5 rounded-full border border-line bg-white px-6 py-3.5 text-[15px] text-ink hover:bg-ink hover:text-white transition-colors"
  >
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
    LinkedIn
  </a>
</div>

        {/* Pricing promise */}
        <div className="mt-24 sm:mt-28 pt-14 border-t border-line max-w-[620px] mx-auto text-left">
          <div className="flex items-center gap-3 mb-7">
            <span className="h-px w-10 bg-line"></span>
            <span className="eyebrow">Ce va costa</span>
          </div>
          <div className="space-y-5 text-[17px] sm:text-[18px] leading-[1.7] text-ink/90" style={{textWrap:"pretty"}}>
            <p>
              <span className="text-ink font-medium">Prima lună:</span> gratis
              pentru toată lumea care se alătură în prima săptămână după lansare.
            </p>
            <p>
              <span className="text-ink font-medium">După aceea:</span> un abonament
              lunar, la prețul unei pizza. Suficient cât noi să putem construi în
              continuare. Puțin cât să nu fie o problemă pentru nicio familie.
            </p>
            <p className="font-serif italic text-[20px] sm:text-[22px] pt-2" style={{ color: "#B44A3C" }}>
              Fără reclame. Niciodată.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative border-t border-line py-12">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-[13.5px] text-muted">
          <span>
            © 2026 <span className="text-ink font-serif">Educatia<span style={{color:"#FF5B4A"}}>.</span>AI</span>
          <span className="font-mono text-[11px] uppercase tracking-wider">v. pre-launch</span>
          </span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { FinalCTA, Footer });
