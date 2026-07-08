import { MemWal } from "@mysten-incubation/memwal";

export function getMemWal(namespace = "hackathon:walrus-prompt-jam") {
  return MemWal.create({
    key: process.env.MEMWAL_PRIVATE_KEY!,
    accountId: process.env.MEMWAL_ACCOUNT_ID!,
    serverUrl: process.env.MEMWAL_SERVER_URL!,
    namespace,
  });
}
