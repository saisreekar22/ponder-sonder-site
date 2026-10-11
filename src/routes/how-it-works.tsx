import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Brain, Camera, Headphones, ArrowRight, Film } from "lucide-react";
import { Reveal, Shell } from "@/components/site";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How it works — PonderSonder" },
      { name: "description", content: "Camera, on-device AI, spatial audio. No cloud. Works in airplane mode." },
      { property: "og:title", content: "How it works — PonderSonder" },
      { property: "og:description", content: "Sound becomes sight. Camera to spatial audio in 250ms, fully on-device." },
    ],
  }),
  component: How,
});

const steps = [
  { Icon: Camera, n: "01", t: "Camera", d: "Wear your phone on a chest mount. Its camera scans the path ahead and detects obstacles, turns, and boundaries in real time." },
  { Icon: Brain, n: "02", t: "The app sends audio and haptic signals through headphones, so you still hear traffic and your surroundings." },
  { Icon: Headphones, n: "03", t: "Spatial audio", d: "Follow clear, instant signals and run your route without relying on a guide for every workout." },
];

function Bars({ count, dur, width, h }: { count: number; dur: number; width: string; h: string }) {
  return (
    <div className={`flex items-center gap-1 ${h}`} aria-hidden>
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className={`animate-wave h-full rounded-full bg-primary ${width}`}
          style={{ ["--dur" as string]: `${dur}s`, animationDelay: `${(i * dur) / count}s` }}
        />
      ))}
    </div>
  );
}

function How() {
  return (
    <Shell>
      <section className="px-6 pb-24 pt-48 md:px-16">
        <Reveal><h1 className="font-display text-7xl md:text-[10rem]">Sound becomes <em className="text-primary">sight.</em></h1></Reveal>
      </section>

      <section aria-labelledby="pipe" className="px-6 py-24 md:px-16">
        <h2 id="pipe" className="mb-12 text-sm uppercase tracking-[0.3em] text-muted-foreground">The pipeline</h2>
        <ol className="flex flex-col items-stretch gap-4 md:flex-row md:items-center">
          {steps.map(({ Icon, n, t, d }, i) => (
            <li key={n} className="contents">
              <Reveal delay={i * 150} className="flex-1">
                <div tabIndex={0} aria-label={`Step ${n}: ${t}. ${d}`} className="group rounded-3xl border border-border bg-card p-8 transition-all duration-500 hover:-translate-y-2 hover:border-primary focus:border-primary">
                  <div className="mb-12 flex items-center justify-between">
                    <Icon aria-hidden size={32} strokeWidth={1.25} className="text-muted-foreground transition-colors group-hover:text-primary" />
                    <span className="font-display text-3xl text-muted-foreground">{n}</span>
                  </div>
                  <p className="font-display text-4xl">{t}</p>
                  <p className="mt-2 text-muted-foreground">{d}</p>
                </div>
              </Reveal>
              {i < steps.length - 1 && <ArrowRight aria-hidden className="mx-auto shrink-0 rotate-90 text-primary md:rotate-0" />}
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="palette" className="px-6 py-32 md:px-16">
        <h2 id="palette" className="mb-12 text-sm uppercase tracking-[0.3em] text-muted-foreground">The sound palette</h2>
        <Reveal>
          <div className="glass mx-auto max-w-3xl divide-y divide-border rounded-3xl border border-border">
            <Track name="Person" sound="Soft blip"><Bars count={24} dur={0.6} width="w-1" h="h-8" /></Track>
            <Track name="Vehicle" sound="Low hum"><Bars count={10} dur={2.2} width="w-3" h="h-14" /></Track>
            <Track name="Blocked path" sound="Guide tone">
              <div className="relative h-10 w-48 overflow-hidden" aria-hidden>
                <ArrowRight className="animate-pan absolute inset-0 m-auto text-primary" size={36} />
              </div>
            </Track>
          </div>
        </Reveal>
      </section>

      <section className="px-6 pb-24 md:px-16">
        <p className="mx-auto max-w-md text-center text-sm text-muted-foreground">
          All processing happens on the device. Zero frames leave the phone. Works in airplane mode.
        </p>
      </section>

      <section aria-labelledby="demo" className="px-6 pb-40 md:px-16">
        <Reveal><h2 id="demo" className="mb-12 font-display text-6xl md:text-8xl">See it in <em className="text-primary">action.</em></h2></Reveal>
        <div className="grid gap-6 md:grid-cols-2">
          <Reveal><Demo src="/assets/prototype-1.gif" alt="EchoPath tracking a person walking across the room" /></Reveal>
          <Reveal delay={150}><Demo src="/assets/prototype-2.gif" alt="EchoPath audio guidance panning left to right" /></Reveal>
        </div>
        <p className="mt-6 text-sm text-muted-foreground">Live capture from our Android test device. Audio cues visualized.</p>
      </section>
    </Shell>
  );
}

function Demo({ src, alt }: { src: string; alt: string }) {
  const [err, setErr] = useState(false);
  return (
    <div className="glass flex aspect-video items-center justify-center overflow-hidden rounded-3xl border border-border bg-muted">
      {err ? (
        <div role="img" aria-label={`${alt} (coming soon)`} className="flex flex-col items-center gap-3 text-muted-foreground">
          <Film aria-hidden size={36} strokeWidth={1.25} />
          <span className="text-xs uppercase tracking-widest">Demo coming soon</span>
        </div>
      ) : (
        <img src={src} alt={alt} loading="lazy" onError={() => setErr(true)} className="h-full w-full object-cover" />
      )}
    </div>
  );
}

function Track({ name, sound, children }: { name: string; sound: string; children: React.ReactNode }) {
  return (
    <div role="group" aria-label={`${name}: ${sound}`} className="flex flex-col gap-4 p-8 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="font-display text-3xl">{name}</p>
        <p className="text-sm text-muted-foreground">{sound}</p>
      </div>
      {children}
    </div>
  );
}
