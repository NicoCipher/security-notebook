import Link from "next/link";
import LogTodayButton from "./LogTodayButton";

export function StatCard({ label, value }) {
  return (
    <div className="bg-paper2 border border-rule rounded-lg px-5 py-4">
      <p className="text-2xl font-display text-cream">{value}</p>
      <p className="text-xs text-mute uppercase tracking-wide mt-1">{label}</p>
    </div>
  );
}

export function QuickLink({ href, label }) {
  return (
    <Link
      href={href}
      className="block bg-paper2 border border-rule rounded-lg px-5 py-4 text-cream hover:border-glow transition-colors"
    >
      {label} <span aria-hidden="true">→</span>
    </Link>
  );
}

export function LogTodayCard({ loggedToday }) {
  return (
    <div className="pinned-note bg-paper2 border border-rule rounded-lg px-5 py-5">
      <p className="text-sm text-cream mb-3">
        {loggedToday
          ? "Today's already on the heatmap. Nice."
          : "Doesn't need to be a write-up. Twenty minutes counts."}
      </p>
      <LogTodayButton disabled={loggedToday} />
    </div>
  );
}
