import { getAllPosts } from "@/lib/posts";
import MissionLogRow from "@/components/MissionLogRow";

export const metadata = { title: "Mission Log — NICOCIPHER" };

export default function LogPage() {
  const posts = getAllPosts();
  const doneCount = posts.filter((p) => p.status === "done").length;
  const activeCount = posts.filter((p) => p.status === "active").length;

  return (
    <div className="py-12 md:py-16">
      <header className="mb-8">
        <h1 className="font-display text-[28px] font-semibold text-cream mb-2">
          Mission Log
        </h1>
        <p className="font-mono text-[11px] text-mute">
          {posts.length} entries — {doneCount} closed, {activeCount} open
        </p>
      </header>
      <div className="space-y-3">
        {posts.map((p) => (
          <MissionLogRow key={p.slug} post={p} />
        ))}
      </div>
    </div>
  );
}
