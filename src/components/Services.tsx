import {
  Globe,
  Palette,
  Clapperboard,
  Lightbulb,
  LayoutDashboard,
  Brush,
  ArrowUpRight,
} from 'lucide-react';
import type {LucideIcon} from 'lucide-react';

type Service = {
  icon: LucideIcon;
  title: string;
  body: string;
  tags: string[];
};

const services: Service[] = [
  {
    icon: Globe,
    title: 'Web Development',
    body: 'Responsive, high-performance websites built with the latest technologies.',
    tags: ['React / Next.js', 'SEO', 'Core Web Vitals'],
  },
  {
    icon: Palette,
    title: 'Graphic Design',
    body: 'Visual identities and branding assets that capture attention and drive results.',
    tags: ['Brand Identity', 'Logos', 'Marketing'],
  },
  {
    icon: Clapperboard,
    title: 'Video Editing',
    body: 'Cinematic editing and motion graphics for social media and advertising.',
    tags: ['Motion', 'Color Grade', 'Ads'],
  },
  {
    icon: Lightbulb,
    title: 'Tech Consultation',
    body: 'Strategic advisory to plan, scale, and optimize your digital presence.',
    tags: ['Strategy', 'Architecture', 'Growth'],
  },
  {
    icon: LayoutDashboard,
    title: 'Web App Development',
    body: 'Custom, interactive web applications built to scale with your business.',
    tags: ['Dashboards', 'APIs', 'Firebase'],
  },
  {
    icon: Brush,
    title: 'Artistic Drawings',
    body: 'Hand-crafted illustration and original artwork that give your brand a signature voice.',
    tags: ['Illustration', 'Concept Art', 'Portraits'],
  },
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
            Six ways we bring
            <br />
            <span className="text-copper-gradient">ideas to life.</span>
          </h2>
          <p className="mt-5 text-lg text-alabaster/60">
            From the first line of code to the final brushstroke — a full-stack
            studio for building, shipping and standing out.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <article
              key={s.title}
              className="reveal card-hover group relative overflow-hidden rounded-3xl border border-alabaster/8 bg-amethyst-deep/50 p-7"
            >
              {/* copper top line reveal */}
              <span className="absolute inset-x-0 top-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-copper via-copper-light to-transparent transition-transform duration-500 group-hover:scale-x-100" />
              {/* corner glow */}
              <span
                className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-60"
                style={{
                  background:
                    'radial-gradient(circle, #e07a5f, transparent 70%)',
                }}
              />

              <div className="mb-6 flex items-start justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-copper/12 text-copper ring-1 ring-copper/25 transition-colors duration-300 group-hover:bg-copper/20">
                  <s.icon className="h-6 w-6" />
                </span>
                <span className="font-display text-4xl font-black text-alabaster/8 transition-colors duration-300 group-hover:text-copper/15">
                  0{i + 1}
                </span>
              </div>

              <h3 className="font-display text-xl font-bold text-alabaster">
                {s.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-alabaster/60">
                {s.body}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {s.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-alabaster/10 px-2.5 py-1 text-[0.7rem] text-alabaster/55"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <ArrowUpRight className="mt-6 h-5 w-5 text-alabaster/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-copper" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
