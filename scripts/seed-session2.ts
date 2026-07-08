import { getMemWal } from "../lib/memwal.ts";

const memwal = getMemWal();

const result = await memwal.rememberBulkAndWait(
  [
    {
      text: "DECISION | project name | 'Continuum' — cross-tool build memory for AI coding agents | brandable + signals persistence across session/tool handoffs; logo is a walrus whose tusks form an infinity/memory loop",
    },
    {
      text: "GOTCHA | repo hygiene | hack/notion-research.md contains the live MEMWAL_PRIVATE_KEY in plaintext and submission requires a PUBLIC github repo | added hack/ to .gitignore and shipped .env.example so the public repo leaks no secret",
    },
    {
      text: "DECISION | submission assets | README.md (writeup) + PROMPT.md (copy-paste prompt) + assets/continuum-logo.png at repo root | keeps the deliverables judges need in the public repo, research stays in gitignored hack/",
    },
  ],
  { timeoutMs: 90000 },
);

console.log("stored", result.results.length, "memories:");
for (const r of result.results) console.log("  ", r.blob_id);
