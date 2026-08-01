import {ArrowUpRight} from 'lucide-react';
import type {SVGProps} from 'react';

/* lucide dropped brand icons — inline the socials we need */
const iconProps: SVGProps<SVGSVGElement> = {
  viewBox: '0 0 24 24',
  fill: 'currentColor',
  className: 'h-4 w-4',
};

const XLogo = () => (
  <svg {...iconProps}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
  </svg>
);
const LinkedinLogo = () => (
  <svg {...iconProps}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
const InstagramLogo = () => (
  <svg {...iconProps}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.332.014 7.052.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
  </svg>
);
const GithubLogo = () => (
  <svg {...iconProps}>
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.5 11.5 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const socials = [XLogo, LinkedinLogo, InstagramLogo, GithubLogo];

const groups = [
  {
    title: 'Studio',
    links: [
      {label: 'Services', href: '#services'},
      {label: 'Work', href: '#work'},
      {label: 'About', href: '/about.html'},
      {label: 'Contact', href: '#contact'},
    ],
  },
  {
    title: 'Company',
    links: [
      {label: 'Booking', href: '/booking.html'},
      {label: 'Blog', href: '/blog.html'},
      {label: 'Privacy', href: '/privacy.html'},
      {label: 'Terms', href: '/terms.html'},
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-alabaster/8 bg-amethyst-black">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <a href="#top" className="flex items-center gap-2.5">
              <img
                src="/images/kyventis-mark.png"
                alt="Kyventis Tech"
                className="h-12 w-12 object-contain"
              />
              <span className="font-display text-lg font-extrabold text-alabaster">
                Kyventis <span className="text-copper">Tech</span>
              </span>
            </a>
            <p className="mt-5 max-w-xs text-sm text-alabaster/50">
              Engineering precision. Creative artistry. A premium tech &amp;
              design studio building the memorable web.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="grid h-10 w-10 place-items-center rounded-xl border border-alabaster/10 text-alabaster/60 transition-all hover:border-copper/50 hover:text-copper"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {groups.map((g) => (
            <div key={g.title}>
              <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-alabaster/40">
                {g.title}
              </h4>
              <ul className="space-y-3">
                {g.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="group inline-flex items-center gap-1 text-sm text-alabaster/70 transition-colors hover:text-copper"
                    >
                      {l.label}
                      <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-alabaster/8 pt-8 sm:flex-row">
          <p className="text-xs text-alabaster/40">
            © {new Date().getFullYear()} Kyventis Tech. All rights reserved.
          </p>
          <p className="text-xs text-alabaster/40">
            Crafted in <span className="text-copper">liquid copper</span> on deep
            amethyst.
          </p>
        </div>
      </div>
    </footer>
  );
}
