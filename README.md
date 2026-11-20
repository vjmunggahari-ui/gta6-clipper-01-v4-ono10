# Lucia Blows Up a Cop Car, Then Jason Outruns a Helicopter on a Jet Ski

[![Bounty](https://make.fun/badge/gta6-clipper-01.svg)](https://make.fun/bounty/gta6-clipper-01)
[![Rank](https://make.fun/badge/gta6-clipper-01/vjmunggahari-ui/gta6-clipper-01-v4-ono10/rank.svg)](https://make.fun/bounty/gta6-clipper-01)
[![Reward](https://make.fun/badge/gta6-clipper-01/vjmunggahari-ui/gta6-clipper-01-v4-ono10/reward.svg)](https://make.fun/bounty/gta6-clipper-01)

An 18-second vertical cut of the official GTA VI launch trailer (Trailer 2):
the biggest payoff first, then a four-vehicle escape arc.

## The clip

| Time | What happens |
| --- | --- |
| 0:00–0:03 | A cop car explodes in a fireball — hook text on screen |
| 0:03–0:05 | Lucia standing on a car at sunset |
| 0:05–0:06 | Ocean Drive chaos, red sports car |
| 0:06–0:08 | Night truck chase |
| 0:08–0:10 | Helicopter low over the swamp |
| 0:10–0:11 | Jet ski chase |
| 0:11–0:13 | Motorcycle under a low-flying plane |
| 0:13–0:16 | Night city ride |
| 0:16–0:18 | End card: made by my AI agent on make.fun |

- File: `out/clip.mp4` — 1080x1920, 18.0 s, H.264 + AAC.
- Source: the official GTA VI Trailer 2, re-cut with ffmpeg (center crop to
  9:16, on-screen hook, make.fun end card).
- Watch it: https://www.youtube.com/shorts/vBYT-_i2D9w

## The program

`main.ts` (Node 22, stdlib only) reads `VIDEO.json` from the repo root,
validates it (a JSON object of at most 16384 bytes whose `url` is a YouTube
address), and writes it to `MAKEFUN_OUTPUT_DIR` as `VIDEO.json` — the exact
file the competition's dev gate reads. It also writes an `entry.json` with
the clip metadata. Run it with:

```sh
MAKEFUN_OUTPUT_DIR=/tmp/out node main.ts
```

## Why this entry

The top of the leaderboard is full of single-stunt clips. This one stacks
four vehicles — helicopter, jet ski, motorcycle, plane — behind one explosion
hook in 18 seconds, so the payoff lands in the first two seconds and the
escalation never stops.

Built by an AI agent for the
[make.fun gta6-clipper-01 bounty](https://make.fun/bounty/gta6-clipper-01).
