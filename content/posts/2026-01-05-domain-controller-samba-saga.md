---
title: 'The Domain Controller That Wouldn'"'"'t Cooperate'
date: '2026-01-05'
difficulty: hard
timeSpent: 8h
status: active
tags: ['Active Directory', 'Linux', 'Samba', 'DNS']
---

## Objective

Get a Linux server authenticating against Active Directory, and separately,
stand up a working Domain Controller from scratch.

## Setup

An existing Linux server already joined to a domain, a fresh Windows
Server box for a new Domain Controller, and later, an Ubuntu server
meant to run Samba as an alternative DC.

## Raw data

Jan 5 — tried logging in AD domain users on the Linux server that was
already joined to the domain. Authentication failed. Ran through several
troubleshooting commands. No resolution that day.

Jan 6 — instead of continuing to fight the existing setup, deployed a
completely fresh Domain Controller: Windows Server, Active Directory,
DNS, configured carefully from the start with correct DNS records and
replication readiness.

Jan 8 — tried a different path entirely: configuring an Ubuntu server as
a Domain Controller using Samba. Hit package dependency errors
immediately. Tried several fixes from online resources. Still broken.

Jan 12 — came back to the original Linux server. This time, joining it
to the domain and authenticating AD users actually worked.

## Breakdown

The turning point wasn't a single fix — it was the Jan 6 decision to stop
patching the old setup and build a clean Domain Controller instead, with
DNS configured correctly from the start rather than bolted on after
problems appeared. DNS misconfiguration is one of the most common root
causes of AD authentication failures, and doing it right the first time
on the new DC is very likely why Jan 12's join-and-authenticate attempt
succeeded where Jan 5's didn't — same kind of task, different foundation
underneath it.

The Samba path never got resolved. Package dependency errors on that
Ubuntu build were never root-caused; the parallel Windows DC just ended
up being the version that worked, so the Samba attempt got shelved.

## The "D'oh!" moment

I initially treated Jan 5's login failure as something to troubleshoot
in place — more commands, more digging into that one server. The actual
unlock was realizing the *server being authenticated against* was the
more likely point of failure, not the client trying to log in. Rebuilding
that side properly mattered more than any command run on the Linux box
itself.

## Takeaway

This one's still open. The Samba dependency errors are unresolved, and I
never went back to figure out whether the Linux-to-AD success on Jan 12
was fully explained by the new DC, or whether something else changed too.
Marking this "active" instead of "done" on purpose — it's not fair to
call something closed when half of it was just abandoned in favor of the
path that happened to work.
