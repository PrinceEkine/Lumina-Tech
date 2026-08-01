import {Compass, PenTool, Code2, Rocket} from 'lucide-react';

const steps = [
  {
    icon: Compass,
    n: '01',
    title: 'Discover',
    body: 'We map the problem, audience and ambition before a pixel moves.',
  },
  {
    icon: PenTool,
    n: '02',
    title: 'Design',
    body: 'Editorial systems, motion studies and copper-forward direction.',
  },
  {
    icon: Code2,
    n: '03',
    title: 'Engineer',
    body: 'Type-safe, tested builds with performance baked in from day one.',
  },
  {
    icon: Rocket,
    n: '04',
    title: 'Launch',
    body: 'We ship, measure and iterate — partners long after go-live.',
  },
];

export default function Studio() {
  return (
    <section id="studio" className="relative py-28">
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-40"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 0%, #2a1b4e, transparent 70%)',
        }}
      />
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="reveal">
            <div className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-copper">
              / The studio
            </div>
            <h2 className="font-display text-4xl font-extrabold leading-tight tracking-tight text-alabaster sm:text-5xl">
              A small studio with
              <span className="text-copper-gradient"> outsized standards.</span>
            </h2>
            <p className="mt-6 text-lg text-alabaster/60">
              Kyventis is a senior-only collective of engineers and artists. No
              hand-offs, no juniors learning on your budget — just a tight team
              obsessed with precision and beauty in equal measure.
            </p>

            <div className="mt-10 grid grid-cols-3 gap-6">
              {[
                {v: '7+', l: 'Years crafting'},
                {v: '12', l: 'Countries served'},
                {v: '4.9', l: 'Avg. client score'},
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-display text-3xl font-extrabold text-copper">
                    {s.v}
                  </div>
                  <div className="mt-1 text-xs uppercase tracking-wider text-alabaster/45">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Process cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {steps.map((s, i) => (
              <div
                key={s.title}
                className={`reveal card-hover rounded-3xl border border-alabaster/8 bg-amethyst-deep/50 p-6 ${
                  i % 2 === 1 ? 'sm:translate-y-8' : ''
                }`}
              >
                <div className="mb-5 flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-copper/15 text-copper ring-1 ring-copper/30">
                    <s.icon className="h-5 w-5" />
                  </span>
                  <span className="font-display text-3xl font-black text-alabaster/10">
                    {s.n}
                  </span>
                </div>
                <h3 className="font-display text-lg font-bold text-alabaster">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm text-alabaster/55">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
