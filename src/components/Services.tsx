import {
  Braces,
  Palette,
  Smartphone,
  Layers,
  Wand2,
  Gauge,
  ArrowUpRight,
} from 'lucide-react';

const codeLines = [
  {t: 'export const', c: 'const'},
  {t: 'studio = build({', c: 'plain'},
  {t: '  precision: true,', c: 'prop'},
  {t: '  motion: "fluid",', c: 'prop'},
  {t: '  scale: Infinity,', c: 'prop'},
  {t: '})', c: 'plain'},
];

export default function Services() {
  return (
    <section id="services" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="reveal mb-16 max-w-2xl">
          <div className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-copper">
            / What we do
          </div>
          <h2 className="font-display text-4xl font-extrabold tracking-tight text-alabaster sm:text-5xl">
            Two disciplines.
            <br />
            <span className="text-copper-gradient">One obsession with craft.</span>
          </h2>
          <p className="mt-5 text-lg text-alabaster/60">
            Kyventis runs on two tightly-integrated arms — the engineers who
            ship it and the artists who make it unforgettable.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* ------- Web & Mobile Development ------- */}
          <article className="card-hover group relative overflow-hidden rounded-3xl border border-alabaster/8 bg-amethyst-deep/60 p-8">
            <div className="mb-6 flex items-center justify-between">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-copper/15 text-copper ring-1 ring-copper/30">
                <Braces className="h-6 w-6" />
              </span>
              <ArrowUpRight className="h-6 w-6 text-alabaster/30 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-copper" />
            </div>

            <h3 className="font-display text-2xl font-bold text-alabaster">
              Web &amp; Mobile Development
            </h3>
            <p className="mt-3 text-alabaster/60">
              Structured, type-safe systems with buttery micro-interactions and
              a dark, considered UI. Built to scale and maintained to last.
            </p>

            {/* Code block mock */}
            <div className="mt-7 overflow-hidden rounded-2xl border border-alabaster/10 bg-amethyst-black/80 font-mono text-[0.8rem] shadow-inner">
              <div className="flex items-center gap-1.5 border-b border-alabaster/10 px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-copper/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-amethyst-soft" />
                <span className="h-2.5 w-2.5 rounded-full bg-alabaster/20" />
                <span className="ml-2 text-[0.7rem] text-alabaster/30">
                  studio.ts
                </span>
              </div>
              <pre className="px-4 py-4 leading-relaxed">
                {codeLines.map((l, i) => (
                  <div key={i} className="flex gap-4">
                    <span className="w-4 select-none text-alabaster/20">
                      {i + 1}
                    </span>
                    <code
                      className={
                        l.c === 'const'
                          ? 'text-copper-light'
                          : l.c === 'prop'
                            ? 'text-alabaster/80'
                            : 'text-alabaster/50'
                      }
                    >
                      {l.t}
                    </code>
                  </div>
                ))}
              </pre>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {['React / Next.js', 'React Native', 'TypeScript', 'Node · Firebase'].map(
                (t) => (
                  <span
                    key={t}
                    className="rounded-full border border-alabaster/10 px-3 py-1 text-xs text-alabaster/60"
                  >
                    {t}
                  </span>
                ),
              )}
            </div>
          </article>

          {/* ------- Graphic & Digital Design ------- */}
          <article className="card-hover group relative overflow-hidden rounded-3xl border border-copper/20 p-8">
            {/* fluid copper backdrop */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-amethyst via-amethyst-deep to-amethyst-black" />
            <div
              className="absolute -right-16 -top-16 -z-10 h-64 w-64 rounded-full opacity-60 blur-3xl transition-transform duration-700 group-hover:scale-125"
              style={{
                background:
                  'radial-gradient(circle, #e07a5f, #b76e4e 40%, transparent 70%)',
              }}
            />

            <div className="mb-6 flex items-center justify-between">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-alabaster/10 text-copper-light ring-1 ring-copper/40">
                <Palette className="h-6 w-6" />
              </span>
              <ArrowUpRight className="h-6 w-6 text-alabaster/40 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-copper-light" />
            </div>

            <h3 className="font-display text-2xl font-bold text-alabaster">
              Graphic &amp; Digital Design
            </h3>
            <p className="mt-3 text-alabaster/70">
              Fluid animation, rich visuals and copper-drenched brand systems.
              From identity to portfolio-grade mockups that stop the scroll.
            </p>

            {/* Visual swatch mock */}
            <div className="mt-7 grid grid-cols-3 gap-3">
              <div
                className="aspect-square rounded-2xl shadow-lg"
                style={{
                  background:
                    'linear-gradient(135deg, #f0997e, #e07a5f 50%, #b76e4e)',
                }}
              />
              <div className="aspect-square rounded-2xl bg-amethyst-black/70 ring-1 ring-alabaster/10 grid place-items-center">
                <Wand2 className="h-7 w-7 text-copper" />
              </div>
              <div
                className="aspect-square rounded-2xl shadow-lg"
                style={{
                  background:
                    'linear-gradient(135deg, #3a2a63, #2a1b4e 60%, #120a24)',
                }}
              />
              <div className="col-span-2 flex items-center gap-3 rounded-2xl bg-alabaster/5 px-4 py-3 ring-1 ring-alabaster/10">
                <div className="h-3 flex-1 rounded-full bg-gradient-to-r from-copper to-copper-light" />
                <div className="h-3 w-8 rounded-full bg-alabaster/20" />
              </div>
              <div className="aspect-square rounded-2xl bg-alabaster/90 grid place-items-center">
                <span className="font-display text-2xl font-extrabold text-amethyst">
                  K
                </span>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {['Brand Identity', 'Motion & 3D', 'Art Direction', 'Figma'].map(
                (t) => (
                  <span
                    key={t}
                    className="rounded-full border border-copper/25 px-3 py-1 text-xs text-copper-light"
                  >
                    {t}
                  </span>
                ),
              )}
            </div>
          </article>
        </div>

        {/* Capability strip */}
        <div className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-4">
          {[
            {icon: Smartphone, label: 'Mobile Apps', sub: 'iOS · Android'},
            {icon: Layers, label: 'Design Systems', sub: 'Scalable UI kits'},
            {icon: Gauge, label: 'Performance', sub: 'Core Web Vitals'},
            {icon: Wand2, label: 'Micro-motion', sub: 'Delight in detail'},
          ].map((c) => (
            <div
              key={c.label}
              className="reveal rounded-2xl border border-alabaster/8 bg-amethyst-deep/40 p-5 transition-colors hover:border-copper/30"
            >
              <c.icon className="mb-3 h-6 w-6 text-copper" />
              <div className="font-display font-bold text-alabaster">
                {c.label}
              </div>
              <div className="text-xs text-alabaster/45">{c.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
