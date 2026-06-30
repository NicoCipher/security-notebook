---
title: "Threat Modeling Is Just Asking Better Questions"
date: "2025-05-12"
difficulty: "medium"
timeSpent: "ongoing"
status: "active"
tags: ["Threat Modeling", "Risk Management"]
---

## 1. Objective

Get through the threat modeling module and actually apply STRIDE to something, instead of just memorizing the acronym.

## 2. Setup

Picked a small sample system — a basic login flow — from the course material and worked through each STRIDE category against it by hand.

## 3. Raw Data

```
S - Spoofing
T - Tampering
R - Repudiation
I - Information Disclosure
D - Denial of Service
E - Elevation of Privilege
```

## 4. Breakdown

- Spoofing and Tampering: an attacker pretending to be someone, or altering something, they shouldn't.
- Repudiation: someone denying they did something, and whether the logs can prove otherwise.
- Information Disclosure and Denial of Service map to confidentiality and availability, the two parts of the CIA triad that aren't Integrity.
- Elevation of Privilege: ending up with more access than you started with.

## 5. The "D'oh!" Moment (So Far)

I kept lumping Repudiation and Information Disclosure into the same mental bucket — "something got exposed" — when they're actually answering different questions. Repudiation is about accountability and evidence, not exposure.

## 6. Where This Stands

Still mid-module. No tidy takeaway yet — this entry gets updated once I've applied STRIDE to something outside the course material.
