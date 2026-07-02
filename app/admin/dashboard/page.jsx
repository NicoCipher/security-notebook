import { listDir, getFile } from "@/lib/github";
import { StatCard, QuickLink, LogTodayCard } from "@/components/admin/Overview";

export const dynamic = "force-dynamic";

function isoDate(d) {
  return d.toISOString().slice(0, 10);
}

function currentStreak(dates) {
  const set = new Set(dates);
  const cursor = new Date();
  cursor.setHours(0, 0, 0, 0);
  if (!set.has(isoDate(cursor))) cursor.setDate(cursor.getDate() - 1);
  let streak = 0;
  while (set.has(isoDate(cursor))) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

export default async function AdminOverviewPage() {
  const [postsDir, activityFile] = await Promise.all([
    listDir("content/posts").catch(() => []),
    getFile("data/activity.json").catch(() => null),
  ]);

  const postCount = postsDir.filter((f) => f.type === "file" && f.name.endsWith(".md")).length;
  const activity = activityFile ? JSON.parse(activityFile.content) : [];
  const streak = currentStreak(activity);
  const loggedToday = activity.includes(isoDate(new Date()));

  return (
    <div>
      <h1 className="font-display text-2xl text-cream mb-1">Overview</h1>
      <p className="text-mute text-sm mb-8">Every change here lands as a real commit on the live repo.</p>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <StatCard label="Mission Log entries" value={postCount} />
        <StatCard label="Current streak" value={`${streak} day${streak === 1 ? "" : "s"}`} />
      </div>

      <LogTodayCard loggedToday={loggedToday} />

      <div className="grid gap-3 mt-8">
        <QuickLink href="/admin/dashboard/posts/new" label="Write a new Mission Log entry" />
        <QuickLink href="/admin/dashboard/skills" label="Update the Toolbox percentages" />
        <QuickLink href="/admin/dashboard/struggle" label="Update what you're stuck on" />
      </div>
    </div>
  );
}
