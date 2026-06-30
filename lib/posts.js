import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

const DIFFICULTY_EMOJI = {
  easy: "🟢",
  medium: "🟡",
  hard: "🔴",
};

function readPostFile(filename) {
  const slug = filename.replace(/\.md$/, "");
  const fullPath = path.join(POSTS_DIR, filename);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title || slug,
    date: data.date || "",
    difficulty: data.difficulty || "medium",
    difficultyEmoji: DIFFICULTY_EMOJI[data.difficulty] || "🟡",
    timeSpent: data.timeSpent || "",
    status: data.status || "done",
    tags: data.tags || [],
    content,
  };
}

/**
 * Returns every post's metadata + raw markdown body, newest first.
 * Used for list views (home page preview, full Mission Log).
 */
export function getAllPosts() {
  const files = fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"));

  const posts = files.map(readPostFile);

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

/**
 * Returns a single post with its body rendered to HTML.
 * Throws if the slug doesn't exist on disk — callers should catch this
 * and call notFound() from next/navigation.
 */
export function getPostBySlug(slug) {
  const post = readPostFile(`${slug}.md`);
  return {
    ...post,
    html: marked.parse(post.content),
  };
}

/**
 * All known slugs, for generateStaticParams().
 */
export function getAllSlugs() {
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}
