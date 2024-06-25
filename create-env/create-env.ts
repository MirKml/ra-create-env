#!/usr/bin/env -S deno run --allow-read --allow-write
import { parseArgs } from "./deps.ts";

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

  transformEnvFile("./env-template.ts", "./env.js");
}

async function transformEnvFile(inputFileName: string, outputFileName: string) {
  const inputLines = Deno.readTextFileSync(inputFileName).split(/\r?\n/);

  const outputFile = await Deno.open(outputFileName, {
    create: true,
    write: true,
    truncate: true,
  });
  const outputWriter = outputFile.writable.getWriter();
  const encoder = new TextEncoder();
  for (const line of inputLines) {
    outputWriter.write(encoder.encode(processLine(line)));
  }
  outputWriter.close();
}

function processLine(line: string) {
  const outputLine = line.replace("<base_url>", "outputbaseurl");
  return outputLine + "\n";
}

main();