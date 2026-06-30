---
title: "Subnetting Finally Clicked"
date: "2024-06-21"
difficulty: "medium"
timeSpent: "5h"
status: "done"
tags: ["Cisco", "Subnetting", "TCP/IP"]
---

## 1. Objective

Stop relying on a subnet calculator and actually understand the math behind CIDR notation.

## 2. Setup

Built a small topology in Packet Tracer with three VLANs needing different host counts, and worked out the addressing by hand before checking myself against the tool.

## 3. Raw Data

```
Network:      192.168.10.0/27
Usable range: 192.168.10.1 - 192.168.10.30
Broadcast:    192.168.10.31
```

## 4. Breakdown

- `/27` means 27 bits are network, leaving 5 host bits: 2^5 = 32 total addresses in the block.
- Subtract the network address and the broadcast address: 30 usable host addresses.
- The formula worth memorizing cold: usable hosts = 2^(32 - prefix) - 2.

## 5. The "D'oh!" Moment

I assigned a /27 to a VLAN expecting the same usable count as a /28, mixing the two up in my head and undersizing the pool. Ran out of IPs halfway through adding devices and had to re-address the entire VLAN instead of just extending it.

## 6. Takeaway

Write out the host-count math before assigning a subnet, every time, even when it feels slow. Re-addressing later is slower.
