#!/usr/bin/env -S deno run --allow-read --allow-write
import { parseArgs } from "./deps.ts";
import { createDefaultOptions, envFileConvert, setOptionsByMockServer, buildOptionsPipe } from "./../env-file-convert/mod.ts";

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


  const options = buildOptionsPipe(
    (options) => setOptionsByMockServer(options, "local"),
  )(createDefaultOptions())  ;

  envFileConvert("../env-file-convert/__tests__/env-template.ts", "../env-file-convert/__tests__/env.js", options);
}

main();