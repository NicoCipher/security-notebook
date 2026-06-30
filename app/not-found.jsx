import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-24 text-center">
      <p className="font-mono text-[11px] text-mute mb-3">404</p>
      <h1 className="font-display text-[22px] text-cream mb-4">
        No entry here.
      </h1>
      <Link
        href="/"
        className="font-mono text-[12px] text-glow hover:underline"
      >
        back to the log →
      </Link>
    </div>
  );
}
