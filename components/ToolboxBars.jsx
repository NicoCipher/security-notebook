"use client";

import { useEffect, useRef, useState } from "react";

export default function ToolboxBars({ skills = [] }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="space-y-4">
      {skills.map((s) => (
        <div key={s.name}>
          <div className="flex justify-between items-baseline mb-1.5">
            <span className="font-mono text-[12px] text-cream">{s.name}</span>
            <span className="font-mono text-[11px] text-mute">
              {s.percent}%
            </span>
          </div>
          <div className="h-[5px] rounded-full bg-rule overflow-hidden">
            <div
              className="h-full rounded-full bg-glow transition-[width] duration-1000 ease-out"
              style={{ width: visible ? `${s.percent}%` : "0%" }}
            />
          </div>
          {s.note && (
            <p className="mt-1.5 font-serif text-[12px] italic text-mute leading-snug">
              {s.note}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
