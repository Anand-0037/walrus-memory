/**
 * Continuum — cross-tool build memory for AI coding agents.
 *
 * This package is a prompt + a thin SDK wiring around Walrus Memory.
 * There is no long-running server; use the scripts below.
 */
console.log(`Continuum — Walrus Memory build memory

Run one of:
  bun --env-file=.env.local run scripts/status.ts       # agent id + blob count + recall
  bun --env-file=.env.local run scripts/test-memwal.ts  # health + write/recall smoke test
  bun --env-file=.env.local run scripts/seed-memories.ts # (re)write project memories

The prompt itself lives in PROMPT.md and .cursor/rules/walrus-memory.mdc.
`);
