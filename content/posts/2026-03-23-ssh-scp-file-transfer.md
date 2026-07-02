---
title: 'Getting a File Onto a Headless Linux Server'
date: '2026-03-23'
difficulty: easy
timeSpent: 2h
status: done
tags: ['Linux', 'SSH', 'Networking']
---

## Objective

Get a `.bin` installer onto a Linux server with no GUI, no shared drive,
and no physical access.

## Setup

A Linux server with no OpenSSH installed yet, and a `.bin` file sitting
on my own machine that needed to get across.

## Raw data

First attempt: worked with the team to install Jumpoint directly, checked
for missing dependencies, tried a couple of ways to get the file onto the
box. None of them worked — no clean path to actually move the file over.

Second attempt, a few days later: installed OpenSSH on the server,
enabled port 22, then used `scp` from my machine to push the file across.

## Breakdown

The first attempt failed for a boring but important reason: there was no
transfer mechanism running on the target box at all. Dependency-checking
and install troubleshooting couldn't fix that, because the actual gap was
one layer earlier — nothing was listening for an incoming file in the
first place.

Once SSH was running, `scp` handled the rest in one command. The one
extra snag: it also needs a destination directory to already exist on
the server, it won't create one for you mid-transfer.

## The "D'oh!" moment

I spent the first session trying to solve "how do I get this file over"
by troubleshooting the install itself, when the real blocker was that no
transfer service existed yet on that machine. Installing OpenSSH wasn't
a workaround — it was the actual missing prerequisite the whole time.

## Takeaway

Before troubleshooting *why* a file transfer or install keeps failing,
check the more basic question first: is there anything on the other end
actually able to receive it? Would've saved a full session.
