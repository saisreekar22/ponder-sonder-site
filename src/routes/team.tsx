import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Reveal, Shell } from "@/components/site";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "The team — PonderSonder" },
      { name: "description", content: "Meet Team #21: the four humans behind PonderSonder." },
      { property: "og:title", content: "The team — PonderSonder" },
      { property: "og:description", content: "The humans behind the code. Team #21, Hacks for Humanity 2026." },
    ],
  }),
  component: Team,
});

const team = [
  { name: "Reya", img: "reya", bio: "Team Lead | Project Manager" },
  { name: "Sai Sreekar Vankayalapati", img: "sai", bio: "Coder | Mentor Liaison" },
  { name: "Kavya", img: "kavya", bio: "Entrepreneur | Community Advocate | Pitch Specialist" },
  { name: "Kiara", img: "kiara", bio: "Researcher | Designer | Content Creator" },
];

function Avatar({ name, img }: { name: string; img: string }) {
  const [err, setErr] = useState(false);
  return (
    <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border border-primary bg-muted font-display text-3xl text-primary">
      {err ? name[0] : <img src={`/assets/${img}.jpg`} alt={`Portrait of ${name}`} onError={() => setErr(true)} className="h-full w-full object-cover" />}
    </div>
  );
}

function Team() {
  return (
    <Shell>
      <section className="px-6 pb-16 pt-48 md:px-16">
        <Reveal><h1 className="max-w-5xl font-display text-7xl md:text-[8rem]">The humans behind the <em className="text-primary">code.</em></h1></Reveal>
      </section>
      <section aria-label="Team members" className="grid gap-4 px-6 pb-32 md:grid-cols-5 md:px-16">
        {team.map((m, i) => (
          <Reveal key={m.name} delay={i * 120} className={i === 0 || i === 3 ? "md:col-span-3" : "md:col-span-2"}>
            <article className="flex h-full min-h-72 flex-col justify-between gap-10 rounded-3xl border border-border bg-card p-8 transition-colors duration-500 hover:border-primary">
              <Avatar name={m.name} img={m.img} />
              <div>
                <h2 className="text-xl font-semibold">{m.name}</h2>
                <p className="mt-2 max-w-sm text-muted-foreground">{m.bio}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </section>
    </Shell>
  );
}
