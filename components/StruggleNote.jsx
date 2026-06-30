export default function StruggleNote({ struggle }) {
  if (!struggle) return null;

  return (
    <div className="pinned-note p-4 rounded-sm bg-paper2 border border-rule shadow-lg shadow-black/20">
      <div className="font-mono text-[10px] tracking-[0.14em] text-warm uppercase mb-2">
        currently stuck on
      </div>
      <div className="font-display text-[14px] text-cream mb-2 leading-snug">
        {struggle.topic}
      </div>
      <p className="font-serif text-[12.5px] text-mute leading-relaxed italic">
        {struggle.note}
      </p>
      <p className="font-mono text-[10px] text-mute mt-3">
        if you've got a clean way to think about this, I'd love to hear it.
      </p>
    </div>
  );
}
