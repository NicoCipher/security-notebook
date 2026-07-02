"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "./Toast";

export default function LogTodayButton({ disabled }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const toast = useToast();

  async function handleClick() {
    setLoading(true);
    try {
      const getRes = await fetch("/api/admin/data/activity");
      const { data, sha } = await getRes.json();
      const today = new Date().toISOString().slice(0, 10);
      if (data.includes(today)) {
        toast({ message: "Already logged for today." });
        return;
      }
      const next = [...data, today].sort();
      const putRes = await fetch("/api/admin/data/activity", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: next, sha, message: `log: practice day ${today}` }),
      });
      const body = await putRes.json();
      if (!putRes.ok) throw new Error(body.error || "Save failed.");
      toast({ message: "Logged today's practice.", href: body.commitUrl });
      router.refresh();
    } catch (err) {
      toast({ message: err.message, type: "error" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={disabled || loading}
      className="bg-glow text-ink font-semibold rounded px-4 py-2 text-sm disabled:opacity-40 transition-opacity"
    >
      {loading ? "Logging…" : disabled ? "Logged ✓" : "Log today's practice"}
    </button>
  );
}
