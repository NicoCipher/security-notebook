import Link from "next/link";

export default function MissionLogRow({ post }) {
  return (
    <Link
      href={`/log/${post.slug}`}
      className="flex items-center gap-3 p-3.5 rounded-md bg-paper border border-rule hover:border-glow/40 transition-colors group"
    >
      <span className="text-[15px] shrink-0" aria-hidden="true">
        {post.difficultyEmoji}
      </span>
      <span className="font-mono text-[10px] text-mute shrink-0 w-[76px]">
        {post.date}
      </span>
      <span className="font-display text-[14px] text-cream flex-1 group-hover:text-glow transition-colors truncate">
        {post.title}
      </span>
      {post.status === "active" && (
        <span className="font-mono text-[9px] text-warm shrink-0 px-1.5 py-0.5 rounded border border-warm/30 bg-warm/10">
          open
        </span>
      )}
      {post.timeSpent && (
        <span className="font-mono text-[10px] text-mute shrink-0">
          {post.timeSpent}
        </span>
      )}
    </Link>
  );
}
