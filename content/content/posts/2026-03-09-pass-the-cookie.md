---
title: 'Stealing My Own Session: A Pass-the-Cookie Test'
date: '2026-03-09'
difficulty: medium
timeSpent: 3h
status: done
tags: ['Web Security', 'Cookies', 'Authentication']
---

## Objective

Understand how session cookies actually work in authentication — not the
textbook version, the "what happens if someone gets a copy of mine" version.

## Setup

My own Cisco account, logged in normally in one browser session. Browser
dev tools open to inspect what gets stored after login.

## Raw data

Logged into my Cisco account, opened dev tools, and pulled the session
cookie out of storage. Opened an incognito window — no login, no
credentials entered — and manually set that same cookie value before
loading the account page.

## Breakdown

The incognito session loaded straight into my account. No password, no
MFA prompt, nothing. The cookie *was* the proof of identity as far as the
server was concerned — it didn't care which browser or device presented
it, only that the value matched.

## The "D'oh!" moment

I'd known "cookies handle sessions" as a fact for a while without it
really landing. Watching an incognito window with zero credentials walk
straight into a logged-in account made it concrete: if a cookie leaks —
XSS, a sniffed unencrypted connection, a shared machine — that's
functionally the same as handing someone your password, and MFA never
even gets a chance to trigger.

## Takeaway

This is why `HttpOnly` and `Secure` flags on cookies aren't optional
extras, and why session tokens need short expiries and rotation. Next:
look at what actually stops this in practice — token binding, IP/device
fingerprinting, that kind of thing.
