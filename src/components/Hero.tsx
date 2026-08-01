import {ArrowUpRight, Play, Sparkles} from 'lucide-react';

const stats = [
  {value: '120+', label: 'Projects Shipped'},
  {value: '45+', label: 'Global Clients'},
  {value: '99%', label: 'Retention'},
];

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden pt-28"
    >
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-amethyst-deep via-amethyst-black to-amethyst-black" />
        <div
          className="orb h-[38rem] w-[38rem] -left-40 -top-40"
          style={{background: 'radial-gradient(circle, #e07a5f, transparent 65%)'}}
        />
        <div
          className="orb h-[32rem] w-[32rem] right-0 top-32"
          style={{
            background: 'radial-gradient(circle, #3a2a63, transparent 65%)',
            animationDelay: '3s',
          }}
        />
        {/* grid lines */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(#f4f1de 1px, transparent 1px), linear-gradient(90deg, #f4f1de 1px, transparent 1px)',
            backgroundSize: '64px 64px',
            maskImage:
              'radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent)',
          }}
        />
      </div>

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-[1.15fr_0.85fr]">
        {/* Left copy */}
        <div>
          <div className="reveal in mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-copper">
            <Sparkles className="h-3.5 w-3.5" />
            Premium Tech &amp; Design Studio
          </div>

          <h1 className="font-display text-5xl font-extrabold leading-[1.02] tracking-tight text-alabaster sm:text-6xl lg:text-7xl">
            Engineering
            <br />
            <span className="text-copper-liquid">Precision.</span>
            <br />
            Creative <span className="text-copper-liquid">Artistry.</span>
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-relaxed text-alabaster/65">
            We fuse disciplined engineering with editorial design to build
            digital products, brands and visuals that feel inevitable — crafted
            in liquid copper on deep amethyst.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="btn-liquid inline-flex items-center gap-2 px-7 py-3.5 text-base"
            >
              Start a project
              <ArrowUpRight className="h-5 w-5" strokeWidth={2.5} />
            </a>
            <a
              href="#work"
              className="btn-ghost inline-flex items-center gap-2 px-6 py-3.5 text-base"
            >
              <span className="grid h-6 w-6 place-items-center rounded-full bg-copper/20 text-copper">
                <Play className="h-3 w-3 fill-current" />
              </span>
              View our work
            </a>
          </div>

          <div className="mt-14 flex gap-10">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="font-display text-3xl font-extrabold text-alabaster">
                  {s.value}
                </div>
                <div className="mt-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-alabaster/45">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right visual — logo lockup */}
        <div className="relative mx-auto hidden aspect-square w-full max-w-md lg:block">
          <div className="conic-ring absolute inset-8 rounded-full opacity-40 blur-[2px]" />
          <div className="absolute inset-0 grid place-items-center">
            <div className="relative grid place-items-center rounded-[2rem] glass-strong p-10 shadow-2xl">
              <img
                src="/images/kyventis-logo.png"
                alt="Kyventis Tech"
                className="w-56 select-none drop-shadow-[0_20px_40px_rgba(224,122,95,0.35)]"
                draggable={false}
              />
            </div>
          </div>

          {/* Floating chips */}
          <div className="absolute -left-4 top-6 animate-[float_9s_ease-in-out_infinite] rounded-2xl glass px-4 py-3 shadow-xl">
            <div className="text-xs font-bold text-copper">/ engineering</div>
            <div className="text-[0.65rem] text-alabaster/50">
              type-safe · scalable
            </div>
          </div>
          <div
            className="absolute -right-4 bottom-10 animate-[float_11s_ease-in-out_infinite] rounded-2xl glass px-4 py-3 shadow-xl"
            style={{animationDelay: '2s'}}
          >
            <div className="text-xs font-bold text-copper">/ design</div>
            <div className="text-[0.65rem] text-alabaster/50">
              editorial · motion
            </div>
          </div>
        </div>
      </div>

      {/* Marquee strip */}
      <div className="mt-16 w-full border-y border-alabaster/5 bg-amethyst-black/40 py-4 lg:absolute lg:inset-x-0 lg:bottom-0 lg:mt-0">
        <div className="marquee-track text-sm font-semibold uppercase tracking-[0.25em] text-alabaster/30">
          {[...Array(2)].map((_, i) => (
            <span key={i} className="flex gap-16">
              <span>Web &amp; Mobile</span>
              <span className="text-copper">◆</span>
              <span>Brand Identity</span>
              <span className="text-copper">◆</span>
              <span>Motion &amp; 3D</span>
              <span className="text-copper">◆</span>
              <span>Product Design</span>
              <span className="text-copper">◆</span>
              <span>Creative Direction</span>
              <span className="text-copper">◆</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
