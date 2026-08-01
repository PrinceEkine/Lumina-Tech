import {useEffect, useState} from 'react';
import {ArrowUpRight, Menu, X} from 'lucide-react';

const links = [
  {label: 'Services', href: '#services'},
  {label: 'Work', href: '#work'},
  {label: 'Studio', href: '#studio'},
  {label: 'Contact', href: '#contact'},
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-3 border-b border-alabaster/5 glass-strong'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <a href="#top" className="group flex items-center gap-2.5">
          <img
            src="/images/kyventis-mark.png"
            alt="Kyventis Tech"
            className="h-11 w-11 object-contain transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3"
          />
          <span className="font-display text-lg font-extrabold tracking-tight text-alabaster">
            Kyventis <span className="text-copper">Tech</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="link-underline text-sm font-medium text-alabaster/70 transition-colors hover:text-alabaster"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <a
            href="#contact"
            className="btn-liquid inline-flex items-center gap-1.5 px-5 py-2.5 text-sm"
          >
            Start a project
            <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-lg text-alabaster md:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden transition-all duration-500 md:hidden ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="mx-4 mt-3 flex flex-col gap-1 rounded-2xl glass-strong p-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3 text-sm font-medium text-alabaster/80 transition-colors hover:bg-copper/10 hover:text-copper"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="btn-liquid mt-2 px-4 py-3 text-center text-sm"
          >
            Start a project
          </a>
        </nav>
      </div>
    </header>
  );
}
