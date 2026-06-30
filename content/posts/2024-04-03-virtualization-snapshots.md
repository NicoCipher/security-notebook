---
title: "Snapshots Saved Me From Myself"
date: "2024-04-03"
difficulty: "easy"
timeSpent: "2h"
status: "done"
tags: ["Virtualization", "Hypervisor", "Lab Setup"]
---

## 1. Objective

Build a lab network I could break on purpose without putting my actual machine at risk.

## 2. Setup

Installed a Type-2 hypervisor, created two VMs on an internal virtual switch (not NAT, not bridged), and practiced taking and restoring snapshots between configuration changes.

## 3. Raw Data

```
Switch type:    Internal
VM1 IP:         192.168.100.10/24
VM2 IP:         192.168.100.11/24
Host adapter:   vEthernet (Internal) — no internet, no host LAN
```

## 4. Breakdown

- An internal switch lets VMs talk to each other and the host, but not the outside network — exactly what an isolated lab needs.
- An external switch bridges to the real LAN, which is risky for anything you're intentionally trying to break.
- A NAT switch gives outbound internet but isn't built for VM-to-VM visibility the way I needed here.

## 5. The "D'oh!" Moment

First attempt, I put both VMs on a NAT switch because I assumed that was the "safe" default. Each VM could reach the internet but couldn't ping the other at all. Took longer than I'd like to admit to realize NAT was the wrong tool for VM-to-VM communication. Switched both to the same internal switch and it worked immediately.

## 6. Takeaway

Snapshot before every change that might break something, not after you've already broken it. I now snapshot the clean baseline the moment a VM finishes installing, before I touch a single setting.
