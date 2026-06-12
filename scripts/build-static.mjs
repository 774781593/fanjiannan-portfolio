import { spawnSync } from "node:child_process";

const nextCommand = process.platform === "win32" ? "node_modules\\.bin\\next.cmd" : "node_modules/.bin/next";
const result = spawnSync(nextCommand, ["build"], {
  env: { ...process.env, NEXT_OUTPUT: "export" },
  shell: process.platform === "win32",
  stdio: "inherit"
});

if (result.error) {
  console.error(result.error);
}

process.exit(result.status ?? 1);
