import { NextResponse } from "next/server";
import skills from "@/data/skills.json";

// Statically generated at build time — this is portfolio data that
// only changes when you edit data/skills.json and redeploy, not
// per-request data, so there's no reason to compute it dynamically.
export const dynamic = "force-static";

export async function GET() {
  return NextResponse.json({
    updated: new Date().toISOString().slice(0, 10),
    skills,
  });
}
