import Link from "next/link";

export default function Nav() {
  return (
    <nav className="max-w-[860px] mx-auto px-5 md:px-8 pt-8 pb-2 flex items-baseline justify-between relative z-10">
      <Link
        href="/"
        className="font-display text-[15px] font-semibold text-cream tracking-tight"
      >
        NICOCIPHER<span className="text-mute font-normal">.log</span>
      </Link>
      <div className="flex gap-5 font-mono text-[11px] text-mute tracking-wide">
        <Link href="/log" className="hover:text-cream transition-colors">
          log
        </Link>
        <Link href="/reading" className="hover:text-cream transition-colors">
          reading
        </Link>
      </div>
    </nav>
  );
}
