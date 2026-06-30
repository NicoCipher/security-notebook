# NICOCIPHER — Lab Notebook

A working cybersecurity learning log, not a finished-looking dashboard. The
whole point is that it stays honest: a heatmap of real practice days, dated
write-ups that include what went wrong, skill bars you update by hand, and
a pinned note about whatever you're currently stuck on.

Built with Next.js (App Router) + Tailwind CSS v4. Content lives in plain
Markdown and JSON files, not a database — so your git history *is* your
chain of custody. Every honest commit is evidence of how you think.

---

## Requirements

- Node.js 20 or newer
- npm (or pnpm/yarn if you prefer — swap the commands below accordingly)

## Run it locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Project structure

```
app/                 routes (App Router)
  page.jsx           home — heatmap, recent log entries, toolbox, struggle note
  log/page.jsx        full Mission Log list
  log/[slug]/page.jsx  one rendered post
  reading/page.jsx     "Things I'm Studying"
  api/progress/        public JSON endpoint serving your skill data
components/          UI building blocks
content/posts/       your Mission Log entries, as Markdown files
data/                the stuff you'll edit constantly
  skills.json        toolbox percentages
  activity.json       dates you practiced (powers the heatmap)
  struggle.json        what's currently pinned to the sidebar
  reading.json          your reading log entries
lib/posts.js         reads + parses the Markdown files
```

---

## Updating it (this is the part that matters)

**Log a practice day.** Add today's date to `data/activity.json`:

```json
"2026-07-01"
```

Doesn't need to be a full write-up. Twenty minutes on TryHackMe counts.
The heatmap is about showing up, not output.

**Write a new Mission Log entry.** Copy any file in `content/posts/` as a
template. Name the new file `YYYY-MM-DD-short-slug.md` — the filename
becomes the URL. Frontmatter at the top controls the metadata:

```yaml
---
title: "What You Were Trying To Do"
date: "2026-07-01"
difficulty: "easy"   # easy | medium | hard
timeSpent: "2h"
status: "done"        # done | active
tags: ["Linux", "Whatever"]
---
```

For the body, the existing posts follow a six-step shape on purpose —
objective, setup, raw data, breakdown, the "D'oh!" moment, takeaway. You
don't have to follow it exactly, but the "what actually went wrong" part
is the most important section. That's the part a hiring manager can't get
from a certificate.

**Update your skills.** Edit the percentages and notes in
`data/skills.json`. Move them when you actually feel the difference, not
on a schedule.

**Update what you're stuck on.** Edit `data/struggle.json`. One topic,
one honest sentence. When you resolve it, either replace it with the next
thing or write a Mission Log entry about how you got unstuck — then
update the note.

**Update your reading list.** Edit `data/reading.json`. Status can be
whatever's true: `reading`, `in-progress`, `completed`.

---

## Deploying (Vercel, free)

1. Push this folder to a new GitHub repository.
2. Go to [vercel.com](https://vercel.com), sign in with GitHub, and import
   the repo.
3. Leave the defaults — Vercel detects Next.js automatically. Click Deploy.
4. Every future `git push` redeploys automatically.

No build step to babysit, no server to maintain.

## A note on commits

Make small, real commits as you go — `git add . && git commit -m "log:
linux permissions, day 3"`. Don't squash your mistakes out of the
history. A messy, honest commit log is more convincing than a perfect one;
it's proof you were actually the one doing the work.
