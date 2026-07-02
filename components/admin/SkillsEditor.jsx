"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "./Toast";

export default function SkillsEditor({ initialSkills, initialSha }) {
  const [skills, setSkills] = useState(initialSkills);
  const [sha, setSha] = useState(initialSha);
  const [saving, setSaving] = useState(false);
  const router = useRouter();
  const toast = useToast();

  function update(i, field, value) {
    setSkills((s) => s.map((row, idx) => (idx === i ? { ...row, [field]: value } : row)));
  }

  function addRow() {
    setSkills((s) => [...s, { name: "", percent: 0, note: "" }]);
  }

  function removeRow(i) {
    setSkills((s) => s.filter((_, idx) => idx !== i));
  }

  async function save() {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/data/skills", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: skills, sha, message: "log: update toolbox percentages" }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || "Save failed.");
      setSha(body.sha);
      toast({ message: "Toolbox saved.", href: body.commitUrl });
      router.refresh();
    } catch (err) {
      toast({ message: err.message, type: "error" });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-4">
      {skills.map((skill, i) => (
        <div key={i} className="bg-paper2 border border-rule rounded-lg p-4">
          <div className="flex gap-3 mb-3">
            <div className="flex-1">
              <label className="block text-xs uppercase tracking-wide text-mute mb-1" htmlFor={`name-${i}`}>
                Skill
              </label>
              <input
                id={`name-${i}`}
                value={skill.name}
                onChange={(e) => update(i, "name", e.target.value)}
                className="w-full bg-ink border border-rule rounded px-3 py-2 text-cream focus:outline-none focus:ring-2 focus:ring-glow"
              />
            </div>
            <div className="w-24">
              <label className="block text-xs uppercase tracking-wide text-mute mb-1" htmlFor={`pct-${i}`}>
                Percent
              </label>
              <input
                id={`pct-${i}`}
                type="number"
                min={0}
                max={100}
                value={skill.percent}
                onChange={(e) => update(i, "percent", Number(e.target.value))}
                className="w-full bg-ink border border-rule rounded px-3 py-2 text-cream focus:outline-none focus:ring-2 focus:ring-glow"
              />
            </div>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={skill.percent}
            onChange={(e) => update(i, "percent", Number(e.target.value))}
            className="w-full mb-3 accent-[var(--color-glow)]"
            aria-label={`${skill.name || "Skill"} percent`}
          />
          <label className="block text-xs uppercase tracking-wide text-mute mb-1" htmlFor={`note-${i}`}>
            Note
          </label>
          <textarea
            id={`note-${i}`}
            value={skill.note}
            onChange={(e) => update(i, "note", e.target.value)}
            rows={2}
            className="w-full bg-ink border border-rule rounded px-3 py-2 text-cream text-sm focus:outline-none focus:ring-2 focus:ring-glow"
          />
          <button onClick={() => removeRow(i)} className="text-xs text-warm mt-2 hover:underline">
            Remove
          </button>
        </div>
      ))}

      <button
        onClick={addRow}
        className="w-full border border-dashed border-rule rounded-lg py-3 text-sm text-mute hover:text-cream hover:border-glow transition-colors"
      >
        + Add a skill
      </button>

      <button
        onClick={save}
        disabled={saving}
        className="bg-glow text-ink font-semibold rounded px-5 py-2.5 disabled:opacity-50 transition-opacity"
      >
        {saving ? "Saving…" : "Save changes"}
      </button>
    </div>
  );
    }
