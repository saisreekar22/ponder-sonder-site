import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";

export function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setInView(true), io.disconnect()),
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);
  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }} className={`reveal ${inView ? "is-visible" : ""} ${className}`}>
      {children}
    </div>
  );
}

const links = [
  { to: "/", label: "Story" },
  { to: "/how-it-works", label: "How it works" },
  { to: "/team", label: "Team" },
] as const;

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-5 z-50 flex justify-center px-4">
      <nav aria-label="Main" className="glass flex items-center gap-1 rounded-full border border-border px-2 py-2 text-sm">
        <Link to="/" aria-label="PonderSonder home" className="px-3 font-display text-lg text-primary">PS</Link>
        {links.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className="rounded-full px-4 py-1.5 text-muted-foreground transition-colors hover:text-foreground"
            activeProps={{ className: "bg-muted text-foreground" }}
            activeOptions={{ exact: true }}
          >
            {l.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-12 text-center text-sm text-muted-foreground">
      Team #21 — Hacks for Humanity 2026. Built with empathy. No data collected.
    </footer>
  );
}

export function Shell({ children }: { children: ReactNode }) {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground">
        Skip to content
      </a>
      <Nav />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
