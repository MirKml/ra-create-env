#!/usr/bin/env -S deno run --allow-read --allow-env
import { parseArgs, existsSync } from "./deps.ts";

function printHelp() {
  console.log(
    "deploy.ts [-h|help] --artifacts-dir=<dir> --source-branch=<dir>",
  );
}

function main() {
  const args = parseArgs(Deno.args, {
    alias: { "h": "help" },
    boolean: ["help"],
    string: ["artifacts-dir", "source-branch"],
  });

  if (args.help) {
    printHelp();
    Deno.exit();
  }

  if (!args["artifacts-dir"] || !args["source-branch"]) {
    console.error("error: artifact dir, source branch are mandatory");
    console.error("see --help for more info");
    Deno.exit(1);
  }

  const artifactsDir = args["artifacts-dir"];
  if (!existsSync(artifactsDir, { isDirectory: true })) {
    console.log(`error: directory ${artifactsDir} isn't accessible`)
    Deno.exit(1);
  }

  const sourceBranch = args["source-branch"];
}

main();