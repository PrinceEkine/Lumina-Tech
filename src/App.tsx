import {useEffect, useState} from 'react';
import {ArrowUp} from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Work from './components/Work';
import Studio from './components/Studio';
import Contact from './components/Contact';
import Footer from './components/Footer';
import {useReveal} from './hooks/useReveal';

export default function App() {
  useReveal();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="grain relative min-h-screen bg-amethyst-black">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Work />
        <Studio />
        <Contact />
      </main>
      <Footer />

      <button
        aria-label="Back to top"
        onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
        className={`fixed bottom-6 right-6 z-40 grid h-12 w-12 place-items-center rounded-full glass-strong text-copper transition-all duration-500 hover:bg-copper hover:text-amethyst-black ${
          showTop ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
        }`}
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </div>
  );
}
