import { NextResponse } from "next/server";
import matter from "gray-matter";
import { listDir, getFile, putFile } from "@/lib/github";

const DIR = "content/posts";

export async function GET() {
  try {
    const entries = await listDir(DIR);
    const files = entries.filter((e) => e.type === "file" && e.name.endsWith(".md"));
    const posts = await Promise.all(
      files.map(async (f) => {
        const file = await getFile(`${DIR}/${f.name}`);
        const { data } = matter(file.content);
        return {
          slug: f.name.replace(/\.md$/, ""),
          sha: file.sha,
          title: data.title || f.name,
          date: data.date || "",
          difficulty: data.difficulty || "medium",
          timeSpent: data.timeSpent || "",
          status: data.status || "done",
          tags: data.tags || [],
        };
      })
    );
    posts.sort((a, b) => (a.date < b.date ? 1 : -1));
    return NextResponse.json({ posts });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { slug, title, date, difficulty, timeSpent, status, tags, content } = body;

  if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
    return NextResponse.json(
      { error: "Slug must be lowercase letters, numbers, and hyphens only." },
      { status: 400 }
    );
  }
  if (!title || !title.trim()) {
    return NextResponse.json({ error: "Title is required." }, { status: 400 });
  }

  try {
    const path = `${DIR}/${slug}.md`;
    const existing = await getFile(path);
    if (existing) {
      return NextResponse.json({ error: "A post with that slug already exists." }, { status: 409 });
    }

    const fileContent = matter.stringify(content || "", {
      title,
      date,
      difficulty,
      timeSpent,
      status,
      tags: Array.isArray(tags) ? tags : [],
    });

    const result = await putFile(path, fileContent, `log: add "${title}"`, undefined);
    return NextResponse.json({ ok: true, slug, commitUrl: result.commit?.html_url });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
