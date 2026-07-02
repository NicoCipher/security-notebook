import { NextResponse } from "next/server";
import { getFile, putFile } from "@/lib/github";

const ALLOWED = {
  skills: "data/skills.json",
  activity: "data/activity.json",
  struggle: "data/struggle.json",
  reading: "data/reading.json",
};

export async function GET(request, { params }) {
  const { file: key } = await params;
  const path = ALLOWED[key];
  if (!path) return NextResponse.json({ error: "Unknown data file." }, { status: 404 });

  try {
    const file = await getFile(path);
    if (!file) return NextResponse.json({ error: "Not found." }, { status: 404 });
    return NextResponse.json({ data: JSON.parse(file.content), sha: file.sha });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  const { file: key } = await params;
  const path = ALLOWED[key];
  if (!path) return NextResponse.json({ error: "Unknown data file." }, { status: 404 });

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { data, sha, message } = body;
  const content = JSON.stringify(data, null, 2) + "\n";

  try {
    const result = await putFile(path, content, message || `chore: update ${key}`, sha);
    return NextResponse.json({
      ok: true,
      sha: result.content.sha,
      commitUrl: result.commit?.html_url,
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
