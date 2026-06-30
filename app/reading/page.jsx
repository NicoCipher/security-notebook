import reading from "@/data/reading.json";

export const metadata = { title: "Things I'm Studying — NICOCIPHER" };

const STATUS_LABEL = {
  "in-progress": "in progress",
  reading: "reading",
  completed: "done",
};

export default function ReadingPage() {
  return (
    <div className="py-12 md:py-16">
      <header className="mb-8">
        <h1 className="font-display text-[28px] font-semibold text-cream mb-2">
          Things I&apos;m Studying
        </h1>
        <p className="text-[14px] text-mute max-w-[480px] leading-relaxed">
          Not a polished syllabus — just what I&apos;m actually reading or
          working through right now, and my honest take on it.
        </p>
      </header>
      <div className="space-y-3">
        {reading.map((r) => (
          <div
            key={r.title}
            className="p-4 rounded-md bg-paper border border-rule"
          >
            <div className="flex items-start justify-between gap-3 mb-1.5">
              <h2 className="font-display text-[15px] font-semibold text-cream">
                {r.title}
              </h2>
              <span className="font-mono text-[10px] text-mute shrink-0 px-2 py-0.5 rounded border border-rule">
                {STATUS_LABEL[r.status] || r.status}
              </span>
            </div>
            {(r.author || r.source) && (
              <div className="font-mono text-[10.5px] text-mute mb-2">
                {r.author || r.source}
              </div>
            )}
            <p className="font-serif text-[13px] text-mute leading-relaxed italic">
              {r.note}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
