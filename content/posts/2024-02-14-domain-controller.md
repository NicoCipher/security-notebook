---
title: "Standing Up My First Domain Controller"
date: "2024-02-14"
difficulty: "medium"
timeSpent: "4h"
status: "done"
tags: ["Windows Server", "Active Directory", "DNS"]
---

## 1. Objective

I wanted to stand up a single Domain Controller from scratch and prove it actually worked — not just "the wizard finished," but a client machine successfully joining the domain and resolving internal names.

## 2. Setup

Windows Server 2022 on a clean VM, static IP, installed the AD DS role, ran the promotion wizard to create a new forest, and set up a forward lookup zone matching my internal domain name.

## 3. Raw Data

```
nslookup dc01.lab.local
Server:  UnKnown
Address:  192.168.50.10

Name:    dc01.lab.local
Address:  192.168.50.10
```

## 4. Breakdown

- `Server:` is whichever DNS server actually answered the query, not the record itself.
- The `Address:` under `Server` confirms which resolver handled this — useful for catching "wait, is this even hitting my DC's DNS?" before debugging anything else.
- The second `Name:` / `Address:` pair is the real answer: my DC resolving its own hostname to its own IP. Sounds trivial, but it's the first proof DNS is alive at all.

## 5. The "D'oh!" Moment

I joined a client to the domain and it kept failing with *"An Active Directory Domain Controller could not be contacted."* Spent 40 minutes checking firewall rules and service status before I checked the client's network adapter — it was still pointed at my router's IP for DNS instead of the DC. The DC has to be the DNS server before any of this works. Not optional, not "nice to have."

## 6. Takeaway

Check DNS first, every time, before troubleshooting anything else in AD. If a client can't see the DC's records, nothing downstream matters yet.
