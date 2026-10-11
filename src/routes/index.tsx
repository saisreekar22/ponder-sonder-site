import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Accessibility, Dog, Smartphone } from "lucide-react";
import hero from "@/assets/hero-runner.jpg";
import { Reveal, Shell, useInView } from "@/components/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PonderSonder — Running shouldn't require a guide" },
      { name: "description", content: "Your phone becomes a pair of ears. Real-time spatial audio for blind and low-vision runners." },
      { property: "og:title", content: "PonderSonder — Running shouldn't require a guide" },
      { property: "og:description", content: "Your phone becomes a pair of ears for blind and low-vision runners." },
    ],
  }),
  component: Home,
});

function Counter() {
  const { ref, inView } = useInView<HTMLDivElement>(0.5);
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - start) / 1600, 1);
      setN(Math.round(250 * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView]);
  return (
    <div ref={ref} className="font-display text-[28vw] leading-none text-primary text-glow md:text-[16vw]" aria-label="250 milliseconds">
      {n}<span className="text-[0.35em] text-foreground">ms</span>
    </div>
  );
}

const gap = [
  { Icon: Accessibility, label: "White cane", text: "Finds the curb. Misses the cyclist.", hi: false },
  { Icon: Dog, label: "Guide dog", text: "Life-changing. But $40k and a waitlist.", hi: false },
  { Icon: Smartphone, label: "Phone apps", text: "Point. Tap. Wait. Too slow for a sprint.", hi: true },
];

const values = [
  ["Empathy", "Tested blindfolded."],
  ["Kindness", "Zero data. Zero cost."],
  ["Compassion", "We don't replace the cane. We clear the path."],
];

function Home() {
  return (
    <Shell>
      <section className="relative flex min-h-screen items-end overflow-hidden px-6 pb-20 md:px-16">
        <img src={hero} alt="Silhouette of a runner on an empty road at dawn, amber light on the horizon" className="animate-drift absolute inset-0 h-full w-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="relative max-w-5xl">
          <Reveal>
            <h1 className="font-display text-6xl md:text-[9rem]">
              Running shouldn't <em className="text-primary">require</em> a guide.
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-8 max-w-sm text-muted-foreground">We turned the phone in your pocket into a pair of ears.</p>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="gap" className="px-6 py-32 md:px-16">
        <Reveal><h2 id="gap" className="mb-16 text-sm uppercase tracking-[0.3em] text-muted-foreground">The gap</h2></Reveal>
        <div className="grid gap-4 md:grid-cols-3 md:grid-rows-2">
          {gap.map(({ Icon, label, text, hi }, i) => (
            <Reveal key={label} delay={i * 120} className={i === 0 ? "md:row-span-2" : i === 2 ? "md:col-span-2" : ""}>
              <article className={`flex h-full min-h-64 flex-col justify-between rounded-3xl border bg-card p-8 transition-transform duration-500 hover:-translate-y-1 ${hi ? "border-primary" : "border-border"}`}>
                <Icon aria-hidden className={hi ? "text-primary" : "text-muted-foreground"} size={36} strokeWidth={1.25} />
                <div>
                  <p className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">{label}</p>
                  <p className="font-display text-4xl md:text-5xl">{text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section aria-labelledby="shift" className="relative h-[180vh] px-6 md:px-16">
        <div className="sticky top-0 flex min-h-screen flex-col justify-center gap-8 md:flex-row md:items-center md:gap-16">
          <Counter />
          <h2 id="shift" className="max-w-sm font-display text-4xl md:text-6xl">
            Capture to sound. <span className="text-muted-foreground">A quarter of a second.</span>
          </h2>
        </div>
      </section>

      <section aria-label="Humanity 101" className="px-6 py-40 md:px-16">
        <div className="grid gap-20 md:grid-cols-3 md:gap-12">
          {values.map(([k, v], i) => (
            <Reveal key={k} delay={i * 150}>
              <p className="mb-4 text-xs uppercase tracking-[0.3em] text-primary">{k}</p>
              <p className="font-display text-4xl">{v}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-6 py-40 text-center">
        <Reveal>
          <blockquote className="mx-auto max-w-4xl font-display text-5xl md:text-7xl">
            “Silence doesn't mean safe. <em className="text-primary">We make sure it never has to.</em>”
          </blockquote>
        </Reveal>
      </section>
    </Shell>
  );
}
