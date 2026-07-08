import { getMemWal } from "../lib/memwal.ts";

const memwal = getMemWal();

const memories = [
  "DECISION | SDK setup | bun + @mysten-incubation/memwal@0.0.7 + lib/memwal.ts helper | official SDK writes directly to Mainnet, no local-then-promote wrapper",
  "DECISION | env config | .env.local with MEMWAL_PRIVATE_KEY, MEMWAL_ACCOUNT_ID, MEMWAL_SERVER_URL | credentials must never be hardcoded in committed source",
  "DECISION | namespace | hackathon:walrus-prompt-jam | per-project isolation for this hackathon submission",
  "GOTCHA | memwal SDK | rememberAndWait takes ~40s for first write; recall works immediately after | use rememberAndWait for demo-critical writes, not fire-and-forget remember",
  "GOTCHA | submission form | MEMWAL_AGENT_ID is delegate public key hex (getPublicKeyHex), not MEMWAL_ACCOUNT_ID or Sui address | confirmed in GitHub issues #357/#364",
];

for (const text of memories) {
  const result = await memwal.rememberAndWait(text, undefined, { timeoutMs: 60000 });
  console.log("stored:", result.blob_id, text.slice(0, 60) + "...");
}
