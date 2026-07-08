import { getMemWal } from "../lib/memwal.ts";

const NS = "hackathon:walrus-prompt-jam";
const memwal = getMemWal(NS);

console.log("=== Agent ID (getPublicKeyHex) ===");
const agentId = await memwal.getPublicKeyHex();
console.log(agentId);

console.log("\n=== Health ===");
const health = await memwal.health();
console.log("status:", health.status, "| mode:", health.mode, "| version:", health.version);

console.log("\n=== Restore (blob count on Mainnet) ===");
const restored = await memwal.restore(NS, 200);
console.log(`restored=${restored.restored} skipped=${restored.skipped} total(on-chain blobs)=${restored.total}`);

console.log("\n=== Recall: decisions/rejected/gotchas/mistakes ===");
const recall = await memwal.recall({
  query: "decisions rejected gotchas mistakes for walrus-prompt-jam",
  limit: 50,
  maxDistance: 0.6,
});
console.log(`matches: ${recall.results.length} (total indexed: ${recall.total})`);
for (const m of recall.results) {
  console.log(`  [${m.distance.toFixed(3)}] ${m.text}`);
}
