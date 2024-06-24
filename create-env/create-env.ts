#!/usr/bin/env -S deno run --allow-read
import { parseArgs, TextLineStream } from "./deps.ts";

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
}

async function transformFile(fileName: string) {
  const file = await Deno.open(fileName, { read: true });
  file.readable.pipeThrough(new TextLineStream());
}

main();
