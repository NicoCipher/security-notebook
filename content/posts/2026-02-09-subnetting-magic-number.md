---
title: 'The Subnetting "Magic Number" Finally Clicked'
date: '2026-02-09'
difficulty: medium
timeSpent: 4h
status: done
tags: ['Networking', 'Subnetting', 'Cisco', 'CLI']
---

## Objective

Get fast and accurate at IPv4 addressing — binary conversion, subnet
masks, and figuring out network/host ranges without a calculator crutch.

## Setup

Just the 8-bit matrix (128, 64, 32, 16, 8, 4, 2, 1) on paper, a CIDR
notation chart, and Cisco Packet Tracer for the hands-on part later in
the week.

## Raw data

Monday: converting decimal IPs to 32-bit binary by hand. Kept fumbling
"odd" values like 172 or 34 — miscounting bits under time pressure.

Tuesday: calculating custom subnet masks for CIDR notations like /25,
/26, /28. Kept losing track of the "increment" — the block size — when
moving bits from the host side to the network side in the 4th octet.

Thursday: built a 2-PC, 1-switch topology in Packet Tracer. Moved a host
to IP `.70` on a subnet masked to `.240` and pinged it. Got `Request
Timed Out`.

Friday: tried to build a 3-tier topology — core, distribution, access
layer switches. Didn't finish; kept hitting configuration errors and
logic loops connecting the layers.

## Breakdown

The Thursday failure was the useful one. `.70` didn't fall inside the
valid host range for that `/28`-equivalent mask — the block size (the
"increment") put that subnet's boundary somewhere `.70` wasn't part of.
Once I mapped it out, the timeout wasn't a bug, it was the network
correctly refusing to treat two devices as neighbors when they weren't.

That's the same "magic number" that was tripping me up on paper Tuesday:
find the value of the last network bit, and you can derive the network
ID, first/last usable host, and broadcast address for any subnet on the
spot — no calculator.

## The "D'oh!" moment

I'd been treating subnetting as a memorization problem — memorize the
CIDR chart, memorize the ranges. The `.70` timeout is what made it click
that it's actually just arithmetic with a boundary: once you can find the
increment, everything else falls out of it. Friday's failed 3-tier build
was a reminder I'm not there yet end-to-end — I can reason about one
subnet boundary cleanly, but chaining multiple layers together under
time pressure still breaks down.

## Takeaway

Multi-layer switching (core/distribution/access) needs its own dedicated
pass — I was trying to bolt it onto a week that was really about single-
subnet math. Splitting those apart next time instead of cramming both
into five days.
