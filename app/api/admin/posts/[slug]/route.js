import { NextResponse } from "next/server";
import matter from "gray-matter";
import { getFile, putFile, deleteFile } from "@/lib/github";

const DIR = "content/posts";

export async function GET(request, { params }) {
  const { slug } = await params;
  try {
    const file = await getFile(`${DIR}/${slug}.md`);
    if (!file) return NextResponse.json({ error: "Not found." }, { status: 404 });
    const { data, content } = matter(file.content);
    return NextResponse.json({ ...data, content, sha: file.sha });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  const { slug } = await params;
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { title, date, difficulty, timeSpent, status, tags, content, sha } = body;
  if (!title || !title.trim()) {
    return NextResponse.json({ error: "Title is required." }, { status: 400 });
  }

  try {
    const fileContent = matter.stringify(content || "", {
      title,
      date,
      difficulty,
      timeSpent,
      status,
      tags: Array.isArray(tags) ? tags : [],
    });

    const result = await putFile(`${DIR}/${slug}.md`, fileContent, `log: update "${title}"`, sha);
    return NextResponse.json({
      ok: true,
      sha: result.content.sha,
      commitUrl: result.commit?.html_url,
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { slug } = await params;
  let body = {};
  try {
    body = await request.json();
  } catch {
    // no body is fine
  }

  try {
    const result = await deleteFile(`${DIR}/${slug}.md`, `chore: remove post "${slug}"`, body.sha);
    return NextResponse.json({ ok: true, commitUrl: result.commit?.html_url });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
