#!/usr/bin/env -S deno run --allow-read --allow-write
import { parseArgs } from "./deps.ts";
import { createDefaultOptions, envFileConvert, setOptionsByMockServer } from "./../env-file-convert/mod.ts";

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


  let options = createDefaultOptions();
  options = setOptionsByMockServer(options, "local");

  envFileConvert("../env-file-convert/__tests__/env-template.ts", "../env-file-convert/__tests__/env.js", options);
}

main();