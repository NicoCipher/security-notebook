import Link from "next/link";
import Heatmap from "@/components/Heatmap";
import ToolboxBars from "@/components/ToolboxBars";
import StruggleNote from "@/components/StruggleNote";
import MissionLogRow from "@/components/MissionLogRow";
import { getAllPosts } from "@/lib/posts";
import activity from "@/data/activity.json";
import skills from "@/data/skills.json";
import struggle from "@/data/struggle.json";

export default function Home() {
  const posts = getAllPosts().slice(0, 4);

  return (
    <div className="py-12 md:py-16">
      <header className="mb-10">
        <p className="font-mono text-[11px] tracking-[0.18em] text-mute uppercase mb-3">
          field notebook — cybersecurity, in progress
        </p>
        <h1 className="font-display text-[34px] md:text-[42px] font-semibold text-cream leading-[1.05] mb-3">
          NICOCIPHER
        </h1>
        <p className="text-[15px] text-mute leading-relaxed max-w-[480px]">
          I don&apos;t know most of this yet. This is the record of me
          learning it anyway — what I tried, what broke, and what
          I&apos;m stuck on right now.
        </p>
      </header>

      <section className="mb-12 p-5 md:p-6 rounded-lg bg-paper border border-rule">
        <h2 className="font-mono text-[11px] tracking-[0.14em] text-mute uppercase mb-4">
          practice log
        </h2>
        <Heatmap activity={activity} />
      </section>

      <div className="grid md:grid-cols-[1fr_260px] gap-8">
        <section>
          <div className="flex items-baseline justify-between mb-5">
            <h2 className="font-display text-[19px] font-semibold text-cream">
              Mission Log
            </h2>
            <Link
              href="/log"
              className="font-mono text-[11px] text-glow hover:underline"
            >
              view all →
            </Link>
          </div>
          <div className="space-y-3">
            {posts.map((p) => (
              <MissionLogRow key={p.slug} post={p} />
            ))}
          </div>
        </section>

        <aside className="space-y-6">
          <div>
            <h2 className="font-mono text-[11px] tracking-[0.14em] text-mute uppercase mb-4">
              toolbox
            </h2>
            <ToolboxBars skills={skills} />
          </div>
          <StruggleNote struggle={struggle} />
        </aside>
      </div>
    </div>
  );
}
