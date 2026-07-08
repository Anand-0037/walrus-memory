# Continuum — agent guide

This repo is a **prompt + thin Walrus Memory SDK wiring**. There is no server,
no database, and no frontend — just TypeScript scripts run with Bun.

## Conventions

- Use **Bun**, not Node:
  - `bun install` (not npm/pnpm/yarn)
  - `bun run <script>` and `bun <file>` (not `node`/`ts-node`)
  - `bunx <pkg>` (not `npx`)
- Bun auto-loads env files; scripts are run with `--env-file=.env.local`.
  Don't add `dotenv`.
- Credentials live only in `.env.local` (gitignored). Never hardcode keys.
  `lib/memwal.ts` validates the three required env vars at startup.

## Scripts

- `bun run status` — agent id + Mainnet blob count + recall proof
- `bun run test:memwal` — health + throwaway write/recall smoke test
- `bun run seed` / `bun run seed:session2` — bulk-write project memories
- `bun run typecheck` — `tsc --noEmit`

## Memory discipline

The standing operating rules for this project (what to remember, when to
write, when to recall) live in `.cursor/rules/walrus-memory.mdc` and the
copy-paste prompt is in `PROMPT.md`. Follow them.
