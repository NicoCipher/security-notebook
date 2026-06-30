"use client";

import { useMemo, useState } from "react";

const WEEKS = 20;

function isoDay(d) {
  return d.toISOString().slice(0, 10);
}

function buildWeeks(today) {
  const endDay = new Date(today);
  const daysUntilSaturday = 6 - endDay.getDay();
  endDay.setDate(endDay.getDate() + daysUntilSaturday);

  const startDay = new Date(endDay);
  startDay.setDate(startDay.getDate() - (WEEKS * 7 - 1));

  const weeks = [];
  const cursor = new Date(startDay);

  for (let w = 0; w < WEEKS; w++) {
    const days = [];
    for (let d = 0; d < 7; d++) {
      const isFuture = cursor > today;
      days.push({ date: isoDay(cursor), isFuture });
      cursor.setDate(cursor.getDate() + 1);
    }
    weeks.push(days);
  }
  return weeks;
}

export default function Heatmap({ activity = [] }) {
  const activitySet = useMemo(() => new Set(activity), [activity]);
  const [hovered, setHovered] = useState(null);

  const weeks = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return buildWeeks(today);
  }, []);

  const loggedCount = activity.length;

  return (
    <div>
      <div className="flex gap-[3px] overflow-x-auto pb-1">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-[3px] shrink-0">
            {week.map((day) => {
              const active = activitySet.has(day.date);
              return (
                <div
                  key={day.date}
                  onMouseEnter={() => setHovered(day)}
                  onMouseLeave={() => setHovered(null)}
                  className={
                    "w-[11px] h-[11px] rounded-[2px] transition-colors " +
                    (day.isFuture
                      ? "bg-transparent"
                      : active
                      ? "bg-good"
                      : "bg-rule")
                  }
                />
              );
            })}
          </div>
        ))}
      </div>
      <div className="mt-3 font-mono text-[11px] text-mute h-4">
        {hovered
          ? `${hovered.date} — ${
              activitySet.has(hovered.date) ? "logged practice" : "no entry"
            }`
          : `${loggedCount} logged day${
              loggedCount === 1 ? "" : "s"
            } in the last ${WEEKS} weeks`}
      </div>
    </div>
  );
}
