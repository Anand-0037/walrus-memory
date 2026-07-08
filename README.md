<p align="center">
  <img src="assets/continuum-logo.png" alt="Continuum logo" width="160" />
</p>

<h1 align="center">Continuum</h1>

<p align="center"><em>Cross-tool build memory for AI coding agents, powered by Walrus Memory.</em></p>

<p align="center">
  <strong>Walrus Session 5 — Walrus Memory Prompt Jam</strong><br/>
  Track: Walrus Memory · Network: Sui Mainnet
</p>

---

## The problem

Builders who run several hackathon projects in parallel and hand work between
AI tools (Cursor, Claude Code, Gemini) lose **all** project context every time
a session resets. The same architecture decisions get re-litigated, rejected
approaches get re-proposed, sponsor-API quirks get rediscovered by trial and
error, and fixed bugs recur because the agent forgot the root cause. During a
multi-day hackathon — where 5–10 fresh sessions per project is normal — this
tax is paid *daily*, and it gets worse the moment you switch tools mid-task.

## What it does

`Continuum` is a single system prompt that turns every project into a durable,
per-project long-term memory on Walrus Mainnet. The agent writes a structured
entry the **instant** a decision, rejection, gotcha, or fixed bug happens, and
reads all of them back **before** doing anything in a new session — so it never
re-asks, never re-proposes a rejected idea, and never re-makes a fixed mistake.

Four memory types, written the moment they occur:

| Type | When | Format |
| --- | --- | --- |
| `DECISION` | user agrees to an architecture/library/approach | `DECISION \| topic \| what was chosen \| why` |
| `REJECTED` | an approach is explicitly ruled out | `REJECTED \| topic \| what was rejected \| why` |
| `GOTCHA` | a sponsor API/SDK quirk is found by trial and error | `GOTCHA \| system \| the quirk \| the fix` |
| `MISTAKE` | a bug is introduced and later fixed | `MISTAKE \| what broke \| root cause \| the fix` |

The killer property is **cross-tool portability**: the same delegate key +
namespace resolves identically whether the agent is running in Cursor, Claude
Code, or Gemini. A `DECISION` written from Cursor at 10am is recalled verbatim
from Claude Code at 2pm — no shared local file, no IDE cache. The only source
of truth is what `memwal_recall` returns for the namespace, right now.

## The prompt

Full copy-paste text: **[`PROMPT.md`](./PROMPT.md)**.

It is also wired into this repo as a live Cursor rule at
[`.cursor/rules/walrus-memory.mdc`](./.cursor/rules/walrus-memory.mdc), so any
agent working in this project adopts it automatically.

## Proof it works

Deployed against the official SDK (`@mysten-incubation/memwal`) writing real
blobs to **Walrus Mainnet**.

| | |
| --- | --- |
| **Agent ID** (`getPublicKeyHex`) | `97a527052c1f8c64d2353f58ae53c11cd2353013d2bf1d5380611822c6c5c6e3` |
| **Namespace** | `hackathon:walrus-prompt-jam` |
| **Mainnet blobs written** | 12 and growing (via `restore()` `total`) |
| **Relayer health** | `status: ok`, `mode: production` |
| **Sample recall** | query "test hackathon setup" → hit at distance `0.045` |

Reproduce it yourself:

```bash
cp .env.example .env.local   # fill in your MEMWAL_* credentials
bun install
bun --env-file=.env.local run scripts/status.ts   # agent id + blob count + recall
```

## How it's wired

```
lib/memwal.ts              # getMemWal(namespace) — configured SDK client (env-validated)
scripts/test-memwal.ts     # health + throwaway write/recall smoke test
scripts/seed-memories.ts   # bulk-writes the project's initial DECISION/GOTCHA memories
scripts/seed-session2.ts   # bulk-writes session-2 DECISION/GOTCHA memories
scripts/seed-session3.ts   # bulk-writes session-3 fixes (doc drift, SDK mapping, env validation)
scripts/status.ts          # agent id + Mainnet blob count + recall proof
.cursor/rules/walrus-memory.mdc  # the prompt, as a standing Cursor rule
PROMPT.md                  # the copy-paste prompt (the actual submission)
```

```ts
// lib/memwal.ts
import { MemWal } from "@mysten-incubation/memwal";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing env var ${name}`);
  return value;
}

export function getMemWal(namespace = "hackathon:walrus-prompt-jam") {
  return MemWal.create({
    key: requireEnv("MEMWAL_PRIVATE_KEY"),
    accountId: requireEnv("MEMWAL_ACCOUNT_ID"),
    serverUrl: requireEnv("MEMWAL_SERVER_URL"),
    namespace,
  });
}
```

## Demo

Under-3-minute walkthrough: **[demo video link — see submission]**.

Cold session re-asks a solved question → show the prompt + namespace rule →
live Cursor session recalls at start, skips a `REJECTED` approach, auto-applies
a stored `GOTCHA` → switch to Claude Code, same namespace, same key, recall the
exact same memory with no shared local file → show the Mainnet blob count.

## Credentials & safety

Credentials live only in `.env.local` (gitignored). `.env.example` documents
the three required vars. No keys are committed to this repo.

---

Built for the Walrus Memory Prompt Jam. Prompt, code, and proof are all in this repo.
