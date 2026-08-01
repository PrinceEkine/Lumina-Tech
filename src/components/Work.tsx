import {useState} from 'react';
import {ArrowUpRight, Brush} from 'lucide-react';

type Project = {
  title: string;
  category: 'Development' | 'Design' | 'Motion';
  tag: string;
  gradient: string;
  glyph?: string;
};

const projects: Project[] = [
  {
    title: 'Cyber Stream',
    category: 'Development',
    tag: 'Web App',
    gradient: 'linear-gradient(135deg, #2a1b4e, #120a24)',
    glyph: '</>',
  },
  {
    title: 'Solace Finance',
    category: 'Development',
    tag: 'Mobile · iOS',
    gradient: 'linear-gradient(135deg, #3a2a63, #2a1b4e)',
    glyph: '◍',
  },
  {
    title: 'Ember Identity',
    category: 'Design',
    tag: 'Brand System',
    gradient: 'linear-gradient(135deg, #e07a5f, #b76e4e)',
    glyph: '✦',
  },
  {
    title: 'Aurora Motion',
    category: 'Motion',
    tag: '3D · Reel',
    gradient: 'linear-gradient(135deg, #f0997e, #d98a72, #2a1b4e)',
    glyph: '◐',
  },
  {
    title: 'Nomad Commerce',
    category: 'Development',
    tag: 'Full-stack',
    gradient: 'linear-gradient(135deg, #1a0f33, #3a2a63)',
    glyph: '⌘',
  },
  {
    title: 'Copper Bloom',
    category: 'Design',
    tag: 'Art Direction',
    gradient: 'linear-gradient(135deg, #b76e4e, #e07a5f, #f0997e)',
    glyph: '❖',
  },
];

const filters = ['All', 'Development', 'Design', 'Motion'] as const;

/* Curated artist / creative pieces */
const artistWorks = [
  {title: 'Liquid Copper', medium: 'Generative · Poster', hue: '#e07a5f'},
  {title: 'Amethyst Fold', medium: 'Editorial · Print', hue: '#3a2a63'},
  {title: 'Molten Type', medium: 'Lettering · Motion', hue: '#f0997e'},
  {title: 'Deep Field', medium: 'Concept · 3D', hue: '#2a1b4e'},
  {title: 'Rose Gold Waves', medium: 'Abstract · Loop', hue: '#d98a72'},
];

export default function Work() {
  const [active, setActive] = useState<(typeof filters)[number]>('All');
  const shown =
    active === 'All'
      ? projects
      : projects.filter((p) => p.category === active);

  return (
    <section id="work" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="reveal mb-12 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <div className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-copper">
              / Selected work
            </div>
            <h2 className="font-display text-4xl font-extrabold tracking-tight text-alabaster sm:text-5xl">
              Work that ships
              <span className="text-copper-gradient"> and stuns.</span>
            </h2>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                  active === f
                    ? 'bg-copper text-amethyst-black shadow-lg shadow-copper/30'
                    : 'border border-alabaster/12 text-alabaster/60 hover:border-copper/40 hover:text-copper'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((p) => (
            <article
              key={p.title}
              className="card-hover group relative aspect-[4/5] overflow-hidden rounded-3xl border border-alabaster/8"
            >
              <div
                className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                style={{background: p.gradient}}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-amethyst-black/90 via-amethyst-black/10 to-transparent" />

              {/* watermark glyph */}
              <span className="pointer-events-none absolute right-4 top-2 font-display text-8xl font-black text-alabaster/10">
                {p.glyph}
              </span>

              <div className="absolute inset-x-0 bottom-0 p-6">
                <span className="mb-2 inline-block rounded-full glass px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-wider text-copper-light">
                  {p.tag}
                </span>
                <div className="flex items-end justify-between">
                  <h3 className="font-display text-2xl font-bold text-alabaster">
                    {p.title}
                  </h3>
                  <ArrowUpRight className="h-7 w-7 translate-y-2 text-alabaster/50 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:text-copper group-hover:opacity-100" />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* ---------------- Artist Work ---------------- */}
        <div className="mt-24">
          <div className="reveal mb-8 flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-copper/15 text-copper ring-1 ring-copper/30">
              <Brush className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-display text-2xl font-extrabold text-alabaster">
                Artist Work
              </h3>
              <p className="text-sm text-alabaster/55">
                Experimental pieces from the studio's creative lab.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
            {artistWorks.map((a, i) => (
              <article
                key={a.title}
                className={`reveal card-hover group relative overflow-hidden rounded-2xl border border-alabaster/8 ${
                  i === 0 ? 'col-span-2 md:col-span-2 md:row-span-2' : ''
                }`}
                style={{aspectRatio: i === 0 ? '1 / 1' : '3 / 4'}}
              >
                <div
                  className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                  style={{
                    background: `radial-gradient(circle at 30% 20%, ${a.hue}, #120a24 75%)`,
                  }}
                />
                {/* liquid streak */}
                <div
                  className="absolute -inset-x-10 top-1/2 h-24 -rotate-12 opacity-50 blur-2xl transition-opacity duration-500 group-hover:opacity-80"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${a.hue}, transparent)`,
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-amethyst-black/90 to-transparent p-4">
                  <div className="font-display font-bold text-alabaster">
                    {a.title}
                  </div>
                  <div className="text-[0.7rem] uppercase tracking-wider text-alabaster/50">
                    {a.medium}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
