import { MemWal } from "@mysten-incubation/memwal";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Missing env var ${name}. Copy .env.example to .env.local, fill in your ` +
        `Walrus Memory credentials, and run with: bun --env-file=.env.local run <script>`,
    );
  }
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
