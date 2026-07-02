"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useSearchParams();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const body = await res.json();
      if (!res.ok) {
        setError(body.error || "Something went wrong.");
        setLoading(false);
        return;
      }
      router.push(params.get("next") || "/admin/dashboard");
      router.refresh();
    } catch {
      setError("Couldn't reach the server. Check your connection.");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-paper2 border border-rule rounded-lg p-8">
        <h1 className="font-display text-xl text-cream mb-1">Notebook Admin</h1>
        <p className="text-sm text-mute mb-6">This gate exists so the git history stays honestly yours.</p>

        <label htmlFor="password" className="block text-xs uppercase tracking-wide text-mute mb-2">
          Password
        </label>
        <input
          id="password"
          type="password"
          autoFocus
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-ink border border-rule rounded px-3 py-2 text-cream mb-4 focus:outline-none focus:ring-2 focus:ring-glow"
        />

        {error && (
          <p role="alert" className="text-sm text-warm mb-4">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading || !password}
          className="w-full bg-glow text-ink font-semibold rounded px-4 py-2 disabled:opacity-50 transition-opacity"
        >
          {loading ? "Checking…" : "Enter"}
        </button>
      </form>
    </main>
  );
}
