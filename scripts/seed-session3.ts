import { getMemWal } from "../lib/memwal.ts";

const memwal = getMemWal();

const result = await memwal.rememberBulkAndWait(
  [
    {
      text: "MISTAKE | README doc drift | README claimed '6 blobs' and its file map omitted scripts/seed-session2.ts after later memories/scripts were added | fix: rerun `bun run status` for the live blob count right before submitting, and keep the README file map in sync with scripts/",
    },
    {
      text: "GOTCHA | prompt portability | PROMPT.md used MCP-style memwal_* tool names, but this repo is SDK-only (no MCP server) so an agent following it literally would call tools that don't exist | fix: added explicit memwal_* -> getMemWal() client-method mapping (rememberAndWait/recall/restore/health/analyzeAndWait) in PROMPT.md and .cursor/rules/walrus-memory.mdc",
    },
    {
      text: "DECISION | code quality | lib/memwal.ts validates MEMWAL_* env vars at startup; seed scripts use rememberBulkAndWait; CLAUDE.md trimmed to bun-only conventions | keeps a clean, consistent submission repo with clear errors instead of opaque SDK failures",
    },
  ],
  { timeoutMs: 120000 },
);

console.log(`total=${result.total} succeeded=${result.succeeded} failed=${result.failed}`);
for (const r of result.results) {
  console.log(`  status=${r.status} blob_id=${r.blob_id || "(none)"} ${r.error ? "err=" + r.error : ""}`);
}
