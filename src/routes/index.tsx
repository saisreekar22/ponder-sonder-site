import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Accessibility, ArrowRight, Dog, Smartphone } from "lucide-react";
import hero from "@/assets/hero-runner.jpg";
import caneImg from "@/assets/gap-cane.jpg";
import dogImg from "@/assets/gap-dog.jpg";
import phoneImg from "@/assets/gap-phone.jpg";
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
  { Icon: Accessibility, label: "White cane", text: "Finds the curb. Misses the cyclist.", hi: false, img: caneImg },
  { Icon: Dog, label: "Guide dog", text: "Life-changing. But $40k and a waitlist.", hi: false, img: dogImg },
  { Icon: Smartphone, label: "Phone apps", text: "Point. Tap. Wait. Too slow for a sprint.", hi: true, img: phoneImg },
];

const hears = [
  ["A person ahead", "a soft blip"],
  ["A car pulling up", "a low hum"],
  ["Something on your left", "your left ear"],
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

      <section aria-labelledby="reality" className="px-6 py-40 md:px-16">
        <Reveal><p className="mb-8 text-sm uppercase tracking-[0.3em] text-muted-foreground">The reality</p></Reveal>
        <Reveal><h2 id="reality" className="max-w-5xl font-display text-6xl md:text-8xl">Independence shouldn't require a <em className="text-primary">chaperone.</em></h2></Reveal>
        <div className="mt-16 max-w-xl space-y-8 text-lg leading-relaxed text-muted-foreground">
          <Reveal><p>For blind and visually impaired athletes, a morning run isn't just a workout—it's a logistical puzzle.</p></Reveal>
          <Reveal delay={100}><p>White canes only detect the curb after you've stumbled. Guide dogs are life-changing, but cost $40,000 and have years-long waitlists. Sighted guides are incredible, but relying on someone else's schedule kills autonomy.</p></Reveal>
          <Reveal delay={200}><p className="text-foreground">We believe the freedom to run shouldn't depend on who is available to hold the tether.</p></Reveal>
        </div>
      </section>

      <section aria-labelledby="gap" className="px-6 py-32 md:px-16">
        <Reveal><h2 id="gap" className="mb-16 text-sm uppercase tracking-[0.3em] text-muted-foreground">The gap</h2></Reveal>
        <div className="grid gap-4 md:grid-cols-3 md:grid-rows-2">
          {gap.map(({ Icon, label, text, hi, img }, i) => (
            <Reveal key={label} delay={i * 120} className={i === 0 ? "md:row-span-2" : i === 2 ? "md:col-span-2" : ""}>
              <article className={`relative flex h-full min-h-64 flex-col justify-between overflow-hidden rounded-3xl border bg-card p-8 transition-transform duration-500 hover:-translate-y-1 ${hi ? "border-primary" : "border-border"}`}>
                <img src={img} alt="" aria-hidden loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-background/70" />
                <Icon aria-hidden className={`relative ${hi ? "text-primary" : "text-muted-foreground"}`} size={36} strokeWidth={1.25} />
                <div className="relative">
                  <p className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">{label}</p>
                  <p className="font-display text-4xl md:text-5xl">{text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section aria-labelledby="answer" className="px-6 py-32 md:px-16">
        <Reveal><p className="mb-8 text-sm uppercase tracking-[0.3em] text-muted-foreground">The answer</p></Reveal>
        <Reveal><h2 id="answer" className="max-w-4xl font-display text-5xl md:text-7xl">An app, <em className="text-primary">and the phone already in your pocket.</em></h2></Reveal>
        <div className="mt-16 grid gap-12 md:grid-cols-2 md:gap-20">
          <div className="max-w-xl space-y-6 text-lg leading-relaxed text-muted-foreground">
            <Reveal><p>EchoPath is a free app. Open it, put your headphones in, start running. The phone's camera watches the path ahead of you and turns everything it notices into a simple sound in your ears.</p></Reveal>
            <Reveal delay={100}><p className="text-foreground">Nothing to tap, nothing to read. You listen, and you keep moving.</p></Reveal>
            <Reveal delay={200}><p>All of it happens on your phone — no internet needed, nothing recorded, nothing sent anywhere. It stays free, and it never replaces the cane. It just clears the path.</p></Reveal>
          </div>
          <Reveal delay={150} className="md:self-center">
            <ul className="glass divide-y divide-border overflow-hidden rounded-3xl border border-border">
              {hears.map(([saw, heard]) => (
                <li key={saw} className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 p-6">
                  <span className="text-xs uppercase tracking-widest text-muted-foreground">{saw}</span>
                  <span className="font-display text-2xl text-primary md:text-3xl">{heard}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <Reveal delay={250}>
          <Link to="/how-it-works" className="mt-12 inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-primary underline-offset-8 hover:underline">
            See how it works <ArrowRight aria-hidden size={16} />
          </Link>
        </Reveal>
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
