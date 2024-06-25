#!/usr/bin/env -S deno run --allow-read --allow-write
import { parseArgs } from "./deps.ts";
import { envFileConvert } from "./../env-file-convert/mod.ts";

function printHelp() {
  console.log(
    "create-env.ts [-h|help]",
  );
}

function main() {
  const args = parseArgs(Deno.args, {
    alias: { "h": "help" },
    boolean: ["help"],
  });

  if (args.help) {
    printHelp();
    Deno.exit();
  }

  envFileConvert("./env-template.ts", "./env.js", {});
}

main();