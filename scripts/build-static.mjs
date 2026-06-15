import { spawnSync } from "node:child_process";

const nextCommand = process.platform === "win32" ? "node_modules\\.bin\\next.cmd" : "node_modules/.bin/next";
const gitVersion = spawnSync("git", ["rev-parse", "--short=12", "HEAD"], {
  encoding: "utf8"
}).stdout.trim();
const result = spawnSync(nextCommand, ["build"], {
  env: {
    ...process.env,
    NEXT_OUTPUT: "export",
    NEXT_PUBLIC_ASSET_VERSION: process.env.NEXT_PUBLIC_ASSET_VERSION || gitVersion || String(Date.now())
  },
  shell: process.platform === "win32",
  stdio: "inherit"
});

if (result.error) {
  console.error(result.error);
}

process.exit(result.status ?? 1);
