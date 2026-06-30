---
title: "Walking the Building Like an Attacker Would"
date: "2024-09-10"
difficulty: "easy"
timeSpent: "3h"
status: "done"
tags: ["Physical Security", "Access Control"]
---

## 1. Objective

Complete the course's site-walkthrough exercise: assess a building's physical access controls the way an attacker would, not the way a checklist would.

## 2. Setup

Walked the access points — main entrance, side doors, loading area — and logged what was actually enforced versus what was just signage.

## 3. Raw Data

```
Door:         Loading dock, rear entrance
Control type: Badge reader (preventive)
Observed:     Propped open with a pallet, 10:15-11:40 AM
```

## 4. Breakdown

- Preventive controls (badge readers, locks) are supposed to stop unauthorized entry before it happens.
- Detective controls (cameras, logs) catch it after the fact, assuming anyone reviews them.
- A propped door defeats the preventive control entirely, and rarely gets caught by the detective one either, since footage usually only gets reviewed after something's already gone wrong.

## 5. The "D'oh!" Moment

I'd assumed the building was secure because every door had a badge reader. The actual failure had nothing to do with the technology. A delivery routine propped the rear door open for over an hour, every single day, because nobody wanted to keep badging back in.

## 6. Takeaway

Most physical security failures aren't broken hardware, they're convenient habits. A control is only as strong as the procedure built around it.
