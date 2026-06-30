import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllSlugs } from "@/lib/posts";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    const post = getPostBySlug(slug);
    return { title: `${post.title} — NICOCIPHER` };
  } catch {
    return { title: "Entry not found — NICOCIPHER" };
  }
}

export default async function PostPage({ params }) {
  const { slug } = await params;

  let post;
  try {
    post = getPostBySlug(slug);
  } catch {
    notFound();
  }

  return (
    <article className="py-12 md:py-16">
      <Link
        href="/log"
        className="font-mono text-[11px] text-mute hover:text-glow transition-colors"
      >
        ← mission log
      </Link>

      <header className="mt-5 mb-8 pb-6 border-b border-rule">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] text-mute mb-3">
          <span>
            {post.difficultyEmoji} {post.difficulty}
          </span>
          <span>·</span>
          <span>{post.date}</span>
          {post.timeSpent && (
            <>
              <span>·</span>
              <span>{post.timeSpent}</span>
            </>
          )}
          {post.status === "active" && (
            <span className="text-warm px-1.5 py-0.5 rounded border border-warm/30 bg-warm/10">
              open
            </span>
          )}
        </div>
        <h1 className="font-display text-[26px] md:text-[32px] font-semibold text-cream leading-tight mb-3">
          {post.title}
        </h1>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((t) => (
            <span
              key={t}
              className="font-mono text-[10px] px-2 py-0.5 rounded border border-rule text-mute"
            >
              {t}
            </span>
          ))}
        </div>
      </header>

      <div
        className="prose-log font-serif text-[15.5px] leading-[1.8] text-cream"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </article>
  );
}
