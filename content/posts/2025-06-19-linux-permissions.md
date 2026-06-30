---
title: "chmod Numbers Make Sense, Letters Don't (Yet)"
date: "2025-06-19"
difficulty: "medium"
timeSpent: "ongoing"
status: "active"
tags: ["Linux", "Permissions", "CLI"]
---

## 1. Objective

Get comfortable enough with file permissions that I can read and set them without stopping to think.

## 2. Setup

Working in a disposable VM, deliberately breaking and fixing permissions on test files and scripts instead of just reading about them.

## 3. Raw Data

```
-rwxr--r--  1 nico nico  220 Jun 19 09:14 backup.sh
```

## 4. Breakdown

- First character: file type. `-` is a regular file, `d` would mean directory.
- Next three (`rwx`): owner's permissions, read/write/execute.
- Next three (`r--`): group permissions, read only.
- Last three (`r--`): everyone else, read only.
- Numeric form of this exact line: 744.

## 5. The "D'oh!" Moment (So Far)

Hit a permission denied error on a script and, instead of figuring out what it actually needed, ran `chmod 777` just to make it run. It worked, which made it worse — I'd learned nothing and opened write and execute access to literally everyone. Went back afterward and worked out it only ever needed `chmod 744`.

## 6. Where This Stands

Numeric mode I can read on sight now. Symbolic mode (`u+x`, `g-w`, `o=r`) still makes me translate it in my head instead of typing it on instinct. That's the exact thing pinned in the Struggle widget on the home page right now.
