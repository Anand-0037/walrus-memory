import { getMemWal } from "../lib/memwal.ts";

const memwal = getMemWal();

console.log("=== Health check ===");
const health = await memwal.health();
console.log(health);

console.log("\n=== Write + recall test ===");
const job = await memwal.rememberAndWait("Test hackathon setup", undefined, {
  timeoutMs: 30000,
});
console.log("job:", job);

const result = await memwal.recall({ query: "test hackathon setup" });
console.log("recall results:", result.results);
